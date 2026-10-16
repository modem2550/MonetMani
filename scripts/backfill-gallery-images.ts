/**
 * scripts/backfill-gallery-images.ts
 *
 * สคริปต์ backfill รันครั้งเดียว:
 * วนทุกแถวใน photo_data / video_data ที่ยังไม่มี storage_url
 * -> ดาวน์โหลดรูปจาก thumbnail_url เดิม -> แปลงเป็น WebP -> อัปโหลดเข้า
 *    Supabase Storage bucket "event-images" -> อัปเดตคอลัมน์ storage_url กลับ
 *
 * เขียนแบบ standalone (ไม่พึ่ง import.meta.env ของ Astro) เพื่อรันตรงๆ ด้วย
 * tsx / ts-node นอก build ของเว็บได้เลย
 *
 * วิธีรัน:
 *   1. ตั้งค่า env vars (ในไฟล์ .env ที่ root โปรเจกต์ หรือ export ก่อนรัน):
 *        SUPABASE_URL=...
 *        SUPABASE_SERVICE_ROLE_KEY=...
 *   2. ติดตั้ง dependency ที่ยังไม่มี (ถ้ายังไม่มี):
 *        npm install -D tsx dotenv
 *   3. รัน:
 *        npx tsx scripts/backfill-gallery-images.ts
 *      หรือระบุเฉพาะ table:
 *        npx tsx scripts/backfill-gallery-images.ts --only=photo
 *        npx tsx scripts/backfill-gallery-images.ts --only=video
 *      โหมดทดสอบ (ไม่เขียนอะไรจริง แค่ print ว่าจะทำอะไร):
 *        npx tsx scripts/backfill-gallery-images.ts --dry-run
 *      โหมดบังคับทำซ้ำ (แม้แถวนั้นจะมี storage_url อยู่แล้ว):
 *        npx tsx scripts/backfill-gallery-images.ts --force
 *        npx tsx scripts/backfill-gallery-images.ts --only=video --force
 */

import crypto from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import sharp from 'sharp';

dotenv.config({
    path: resolve(dirname(fileURLToPath(import.meta.url)), '../.env'),
});

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const BUCKET = 'event-images';
const FETCH_TIMEOUT_MS = 15_000;
const MAX_BYTES = 20 * 1024 * 1024;
const BATCH_SIZE = 200; // ดึงทีละ batch กัน query ใหญ่เกินไป
const CONCURRENCY = 3; // จำกัดจำนวนรูปที่ sync พร้อมกัน กันโดน rate limit ต้นทาง

type Kind = 'photo' | 'video';

const TABLE_BY_KIND: Record<Kind, 'photo_data' | 'video_data'> = {
    photo: 'photo_data',
    video: 'video_data',
};

interface Row {
    id: number | string;
    thumbnail_url: string | null;
    storage_url: string | null;
}

function parseArgs() {
    const args = process.argv.slice(2);
    const only = args
        .find((a) => a.startsWith('--only='))
        ?.split('=')[1] as Kind | undefined;
    const dryRun = args.includes('--dry-run');
    const force = args.includes('--force');
    return { only, dryRun, force };
}

function hashUrl(url: string): string {
    return crypto.createHash('md5').update(url).digest('hex').slice(0, 12);
}

function publicUrl(path: string): string {
    return `/assets/images/${path}`;
}

async function syncOne(
    admin: SupabaseClient,
    sourceUrl: string,
    eventId: string,
): Promise<string> {
    const downloadUrl = new URL(sourceUrl);
    if (downloadUrl.hostname.endsWith('.fbcdn.net')) {
        const expiry = downloadUrl.searchParams.get('oe');
        if (expiry?.endsWith('$0')) {
            downloadUrl.searchParams.set('oe', expiry.slice(0, -2));
        }
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    let res: Response;
    try {
        res = await fetch(downloadUrl, { signal: controller.signal });
    } finally {
        clearTimeout(timer);
    }

    if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.startsWith('image/')) {
        throw new Error(`Not an image: ${contentType}`);
    }

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength > MAX_BYTES) {
        throw new Error(`Image too large: ${buf.byteLength} bytes`);
    }

    const webp = await sharp(buf).webp({ quality: 80 }).toBuffer();

    const h = hashUrl(sourceUrl);
    const path = `${eventId}/main-${h}.webp`;

    const { error } = await admin.storage.from(BUCKET).upload(path, webp, {
        contentType: 'image/webp',
        upsert: true,
        cacheControl: '31536000',
    });

    if (error) throw error;

    return publicUrl(path);
}

async function processKind(
    admin: SupabaseClient,
    kind: Kind,
    dryRun: boolean,
    force: boolean,
) {
    const table = TABLE_BY_KIND[kind];
    console.log(`\n=== ${table} (force=${force}) ===`);

    let lastId = 0;
    let totalOk = 0;
    let totalFail = 0;
    let totalSkip = 0;

    // วนดึงทีละ batch ตาม cursor id
    for (;;) {
        let query = admin
            .from(table as string)
            .select('id, thumbnail_url, storage_url')
            .not('thumbnail_url', 'is', null)
            .gt('id', lastId)
            .order('id', { ascending: true })
            .limit(BATCH_SIZE);

        if (!force) {
            query = query.is('storage_url', null);
        }

        const { data, error } = await query;

        if (error) {
            console.error(`  ! Query error:`, error.message);
            break;
        }

        const rows = (data ?? []) as Row[];
        if (rows.length === 0) break;

        // อัปเดต lastId เสมอสำหรับ cursor batch ถัดไป
        lastId = Number(rows[rows.length - 1].id);

        // ประมวลผลแบบจำกัด concurrency
        for (let i = 0; i < rows.length; i += CONCURRENCY) {
            const chunk = rows.slice(i, i + CONCURRENCY);
            await Promise.all(
                chunk.map(async (row) => {
                    if (!row.thumbnail_url) {
                        totalSkip += 1;
                        return;
                    }

                    if (dryRun) {
                        console.log(
                            `  [dry-run] would sync ${kind} id=${row.id} <- ${row.thumbnail_url}`,
                        );
                        totalOk += 1;
                        return;
                    }

                    try {
                        const storageUrl = await syncOne(
                            admin,
                            row.thumbnail_url,
                            `gallery-${kind}-${row.id}`,
                        );

                        const { error: updateError } = await admin
                            .from(table as string)
                            .update({ storage_url: storageUrl })
                            .eq('id', row.id);

                        if (updateError) throw updateError;

                        console.log(`  ✓ ${kind} id=${row.id} -> ${storageUrl}`);
                        totalOk += 1;
                    } catch (e) {
                        const msg = e instanceof Error ? e.message : String(e);
                        console.error(`  ✗ ${kind} id=${row.id}: ${msg}`);
                        totalFail += 1;
                    }
                }),
            );
        }

        if (rows.length < BATCH_SIZE) break;
    }

    console.log(
        `--- ${table} done: ok=${totalOk} fail=${totalFail} skip(no thumbnail)=${totalSkip} ---`,
    );
}

async function main() {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        console.error(
            'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.',
        );
        process.exit(1);
    }

    const { only, dryRun, force } = parseArgs();
    if (dryRun) console.log('*** DRY RUN — จะไม่มีการเขียนข้อมูลจริง ***');
    if (force) console.log('*** FORCE MODE — จะประมวลผลซ้ำแม้มี storage_url แล้ว ***');

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
    });

    const kinds: Kind[] = only ? [only] : ['photo', 'video'];
    for (const kind of kinds) {
        await processKind(admin, kind, dryRun, force);
    }
}

main().catch((e) => {
    console.error('Fatal error:', e);
    process.exit(1);
});
