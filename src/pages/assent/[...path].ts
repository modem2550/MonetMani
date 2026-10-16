import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '@/services/supabase/admin';

export const prerender = false;
const BUCKET = 'media';
const ALLOWED_ROOTS = new Set(['event', 'photo', 'video']);
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

function validAssetPath(value: string): boolean {
    if (!value || value.includes('\\') || value.includes('\0')) return false;
    const parts = value.split('/');
    if (parts.length < 3 || parts.some((part) => !part || part === '.' || part === '..' || part.includes('%'))) return false;
    if (!ALLOWED_ROOTS.has(parts[0])) return false;
    if (!/^[A-Za-z0-9_-]{1,100}$/.test(parts[1])) return false;
    if (parts.some((part) => !/^[A-Za-z0-9._-]+$/.test(part))) return false;
    return ALLOWED_EXTENSIONS.has(parts.at(-1)?.split('.').pop()?.toLowerCase() ?? '');
}

export const GET: APIRoute = async ({ params }) => {
    const path = params.path ?? '';
    // This endpoint only accepts an allowlisted Storage path, never a user-supplied target URL.
    if (!validAssetPath(path)) return new Response('Not Found', { status: 404 });
    try {
        const { data, error } = await getSupabaseAdmin().storage.from(BUCKET).download(`assent/${path}`);
        if (error || !data) return new Response('Image Not Found', {
            status: 404,
            headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' },
        });
        const extension = path.split('.').pop()?.toLowerCase() ?? '';
        const mime: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', avif: 'image/avif' };
        return new Response(data.stream(), {
            status: 200,
            headers: {
                'Content-Type': mime[extension] ?? 'application/octet-stream',
                'X-Content-Type-Options': 'nosniff',
                // Public embedding is intentional; only the upstream Storage bucket remains private.
                'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
                'CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
            },
        });
    } catch (error) {
        console.error('[asset-proxy] Failed to read asset:', error);
        return new Response('Image service unavailable', { status: 500 });
    }
};
