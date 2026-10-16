import sharp from 'sharp';
import { getSupabaseAdmin } from '@/services/supabase/admin';

export type AssetKind = 'event' | 'photo' | 'video';
const BUCKET = 'media';
const FETCH_TIMEOUT_MS = 15_000;
const MAX_BYTES = 20 * 1024 * 1024;

function validateSourceUrl(value: string): URL {
    let url: URL;
    try { url = new URL(value); } catch { throw new Error('Invalid source URL'); }
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Source URL must use HTTP or HTTPS');
    if (url.username || url.password) throw new Error('Source URL must not contain embedded credentials');
    const host = url.hostname.toLowerCase();
    const blocked = new Set(['localhost', 'localhost.localdomain', 'metadata.google.internal', 'metadata', '0.0.0.0', '127.0.0.1', '::1', '[::1]']);
    if (blocked.has(host) || host.endsWith('.localhost') || host.endsWith('.local') || /^10\./.test(host) || /^192\.168\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host) || /^169\.254\./.test(host)) {
        throw new Error('Private or local source hosts are not allowed');
    }
    return url;
}

async function fetchImage(sourceUrl: string): Promise<Buffer> {
    let current = validateSourceUrl(sourceUrl);
    for (let redirects = 0; redirects <= 3; redirects++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
        let response: Response;
        try {
            response = await fetch(current, {
                signal: controller.signal,
                redirect: 'manual',
                headers: { Accept: 'image/avif,image/webp,image/*;q=0.9,*/*;q=0.1' },
            });
        } finally { clearTimeout(timer); }

        if ([301, 302, 303, 307, 308].includes(response.status)) {
            const location = response.headers.get('location');
            if (!location || redirects === 3) throw new Error('Too many or invalid source redirects');
            current = validateSourceUrl(new URL(location, current).toString());
            continue;
        }
        if (!response.ok) throw new Error(`Image fetch failed: ${response.status}`);
        const type = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() ?? '';
        if (!type.startsWith('image/')) throw new Error(`Source did not return an image (${type || 'unknown content type'})`);
        const declared = Number(response.headers.get('content-length') ?? 0);
        if (declared > MAX_BYTES) throw new Error('Source image exceeds 20 MB');
        const bytes = Buffer.from(await response.arrayBuffer());
        if (bytes.byteLength > MAX_BYTES) throw new Error('Source image exceeds 20 MB');
        return bytes;
    }
    throw new Error('Unable to fetch source image');
}

/** Server-only importer. Stores a normalized JPEG at media/assent/{kind}/{id}/thumbnail.jpg. */
export async function syncAssetToStorage(sourceUrl: string, kind: AssetKind, id: number | string): Promise<string> {
    const safeId = String(id);
    if (!/^[A-Za-z0-9_-]{1,100}$/.test(safeId)) throw new Error('Invalid asset ID');
    const source = await fetchImage(sourceUrl);
    const jpeg = await sharp(source).rotate().flatten({ background: '#ffffff' }).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
    const objectPath = `assent/${kind}/${safeId}/thumbnail.jpg`;
    const { error } = await getSupabaseAdmin().storage.from(BUCKET).upload(objectPath, jpeg, {
        contentType: 'image/jpeg', upsert: true, cacheControl: '86400',
    });
    if (error) throw error;
    return `/assent/${kind}/${safeId}/thumbnail.jpg`;
}
