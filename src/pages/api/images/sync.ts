import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '@/services/supabase/admin';
import { syncImageToStorage } from '@/services/images/syncToStorage';

export const prerender = false; // ต้องเป็น server endpoint

export const POST: APIRoute = async ({ request }) => {
    // กันคนเรียกมั่ว
    const secret = request.headers.get('x-sync-secret');
    if (secret !== import.meta.env.IMAGE_SYNC_SECRET) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let body: {
        eventId: string;
        table?: 'events_upcoming' | 'events_past';
        sourceUrl?: string;
        sourceUrls?: { medium?: string; large?: string };
    };

    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { eventId, table = 'events_upcoming' } = body;
    if (!eventId) {
        return new Response(JSON.stringify({ error: 'eventId required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const admin = getSupabaseAdmin();

    // ดึงข้อมูล event ถ้ายังไม่ได้ส่ง URL มา
    let mediumUrl = body.sourceUrls?.medium ?? body.sourceUrl;
    let largeUrl = body.sourceUrls?.large;

    if (!mediumUrl) {
        const { data, error } = await admin
            .from(table)
            .select('image_url, image_urls')
            .eq('id', eventId)
            .single();

        if (error || !data) {
            return new Response(JSON.stringify({ error: 'Event not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        mediumUrl =
            data.image_urls?.medium ?? data.image_url ?? undefined;
        largeUrl = data.image_urls?.large ?? undefined;
    }

    if (!mediumUrl) {
        return new Response(JSON.stringify({ error: 'No image URL' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const storageMedium = await syncImageToStorage(mediumUrl, {
            eventId,
            variant: 'medium',
        });

        let storageLarge: string | undefined;
        if (largeUrl && largeUrl !== mediumUrl) {
            storageLarge = await syncImageToStorage(largeUrl, {
                eventId,
                variant: 'large',
            });
        }

        // อัปเดตกลับไปที่ตาราง
        const { data: current } = await admin
            .from(table)
            .select('image_urls')
            .eq('id', eventId)
            .single();

        const nextImageUrls = {
            ...(current?.image_urls ?? {}),
            medium: mediumUrl,
            large: largeUrl ?? mediumUrl,
            storage_medium: storageMedium,
            storage_large: storageLarge ?? storageMedium,
            synced_at: new Date().toISOString(),
        };

        const { error: updateError } = await admin
            .from(table)
            .update({ image_urls: nextImageUrls })
            .eq('id', eventId);

        if (updateError) throw updateError;

        return new Response(
            JSON.stringify({
                ok: true,
                eventId,
                storage_medium: storageMedium,
                storage_large: storageLarge ?? storageMedium,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
    } catch (e) {
        console.error('[sync-image]', e);
        return new Response(
            JSON.stringify({
                error: e instanceof Error ? e.message : 'Sync failed',
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
        );
    }
};