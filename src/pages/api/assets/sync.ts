import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '@/services/supabase/admin';
import { syncAssetToStorage, type AssetKind } from '@/services/images/syncAssetToStorage';

export const prerender = false;
const TABLE_BY_KIND: Record<AssetKind, 'event_data' | 'photo_data' | 'video_data'> = {
    event: 'event_data', photo: 'photo_data', video: 'video_data',
};

export const POST: APIRoute = async ({ request }) => {
    const expected = import.meta.env.IMAGE_SYNC_SECRET;
    const provided = request.headers.get('x-sync-secret');
    if (!expected || !provided || provided !== expected) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    let body: { kind?: AssetKind; id?: number | string; sourceUrl?: string };
    try { body = await request.json(); } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }
    const { kind, id } = body;
    if (!kind || !Object.hasOwn(TABLE_BY_KIND, kind)) return Response.json({ error: 'kind must be event, photo, or video' }, { status: 400 });
    if (id === undefined || id === null || !/^[A-Za-z0-9_-]{1,100}$/.test(String(id))) return Response.json({ error: 'Valid id is required' }, { status: 400 });

    try {
        const admin = getSupabaseAdmin();
        const table = TABLE_BY_KIND[kind];
        let sourceUrl = body.sourceUrl?.trim();
        if (!sourceUrl) {
            // event_data may store its source image under image_url or image_urls,
            // while photo_data/video_data use thumbnail_url.
            const { data, error } = await admin.from(table).select('*').eq('id', id).single();
            if (error || !data) return Response.json({ error: 'Row not found' }, { status: 404 });

            const imageUrls = data.image_urls && typeof data.image_urls === 'object'
                ? data.image_urls as Record<string, unknown>
                : {};
            const candidate = kind === 'event'
                ? data.thumbnail_url
                    ?? data.image_url
                    ?? imageUrls.storage_large
                    ?? imageUrls.large
                    ?? imageUrls.storage_medium
                    ?? imageUrls.medium
                : data.thumbnail_url;

            if (typeof candidate !== 'string' || !candidate.trim()) {
                return Response.json({ error: 'Row found but no usable thumbnail_url/image_url is set' }, { status: 404 });
            }
            sourceUrl = candidate.trim();
        }
        const storageUrl = await syncAssetToStorage(sourceUrl, kind, id);
        const { error: updateError } = await admin.from(table).update({ storage_url: storageUrl }).eq('id', id);
        if (updateError) throw updateError;
        return Response.json({ ok: true, kind, id, storage_url: storageUrl });
    } catch (error) {
        console.error('[asset-sync]', error);
        return Response.json({ error: error instanceof Error ? error.message : 'Asset sync failed' }, { status: 500 });
    }
};
