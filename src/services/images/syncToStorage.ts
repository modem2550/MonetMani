import crypto from 'node:crypto';
import sharp from 'sharp';
import { getSupabaseAdmin } from '@/services/supabase/admin';

const BUCKET = 'event-images';
const FETCH_TIMEOUT_MS = 15_000;
const MAX_BYTES = 20 * 1024 * 1024;

function hashUrl(url: string): string {
    return crypto.createHash('md5').update(url).digest('hex').slice(0, 12);
}

function publicUrl(path: string): string {
    const base = import.meta.env.SUPABASE_URL.replace(/\/$/, '');
    return `${base}/storage/v1/object/public/${BUCKET}/${path}`;
}

/**
 * ดาวน์โหลดรูปจาก URL ภายนอก → แปลง WebP → อัปโหลดเข้า Storage
 * คืน public URL ของไฟล์ใน Storage
 */
export async function syncImageToStorage(
    sourceUrl: string,
    options: { eventId: string; variant?: 'medium' | 'large' | 'main' } = {
        eventId: 'unknown',
    },
): Promise<string> {
    const { eventId, variant = 'main' } = options;
    const admin = getSupabaseAdmin();

    // 1. Download
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    let res: Response;
    try {
        res = await fetch(sourceUrl, { signal: controller.signal });
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

    // 2. Convert → WebP
    const webp = await sharp(buf).webp({ quality: 80 }).toBuffer();

    // 3. Path ใน bucket
    const h = hashUrl(sourceUrl);
    const path = `${eventId}/${variant}-${h}.webp`;

    // 4. Upload (upsert)
    const { error } = await admin.storage.from(BUCKET).upload(path, webp, {
        contentType: 'image/webp',
        upsert: true,
        cacheControl: '31536000', // 1 year
    });

    if (error) throw error;

    return publicUrl(path);
}