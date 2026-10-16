import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '@/services/supabase/admin';
import { syncImageToStorage } from '@/services/images/syncToStorage';

export const prerender = false; // ต้องเป็น server endpoint

type GalleryKind = 'photo' | 'video';

const TABLE_BY_KIND: Record<GalleryKind, 'photo_data' | 'video_data'> = {
    photo: 'photo_data',
    video: 'video_data',
};

export const POST: APIRoute = async ({ request }) => {
    // กันคนเรียกมั่ว (ใช้ secret ตัวเดียวกับ /api/images/sync)
    const secret = request.headers.get('x-sync-secret');
    if (secret !== import.meta.env.IMAGE_SYNC_SECRET) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let body: {
        kind: GalleryKind;
        id: number | string;
        sourceUrl?: string;
    };

    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { kind, id } = body;
    if (kind !== 'photo' && kind !== 'video') {
        return new Response(
            JSON.stringify({ error: 'kind must be "photo" or "video"' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } },
        );
    }
    if (id === undefined || id === null || id === '') {
        return new Response(JSON.stringify({ error: 'id required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const table = TABLE_BY_KIND[kind];

    try {
        const admin = getSupabaseAdmin();

        // ดึงข้อมูลแถวถ้ายังไม่ได้ส่ง URL มา
        let sourceUrl = body.sourceUrl;

        if (!sourceUrl) {
            const { data, error } = await admin
                .from(table)
                .select('thumbnail_url')
                .eq('id', id)
                .single();

            if (error || !data) {
                return new Response(
                    JSON.stringify({ error: `${kind} not found` }),
                    { status: 404, headers: { 'Content-Type': 'application/json' } },
                );
            }

            sourceUrl = data.thumbnail_url ?? undefined;
        }

        if (!sourceUrl) {
            return new Response(JSON.stringify({ error: 'No image URL' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // path ใน bucket: gallery-photo-<id> / gallery-video-<id> เพื่อไม่ชนกับโฟลเดอร์ของ events
        const storageUrl = await syncImageToStorage(sourceUrl, {
            eventId: `gallery-${kind}-${id}`,
            variant: 'main',
        });

        const { error: updateError } = await admin
            .from(table)
            .update({ storage_url: storageUrl })
            .eq('id', id);

        if (updateError) throw updateError;

        return new Response(
            JSON.stringify({ ok: true, kind, id, storage_url: storageUrl }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
    } catch (e) {
        console.error('[gallery-sync]', e);
        return new Response(
            JSON.stringify({
                error: e instanceof Error ? e.message : 'Sync failed',
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
        );
    }
};
