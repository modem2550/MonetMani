import type { APIRoute } from 'astro';
import { fetchPhotos, GALLERY_PAGE_SIZE } from '@/services/gallery';

export const prerender = false; // ต้องเป็น server endpoint (query offset/limit สด ๆ ทุกครั้ง)

const MAX_LIMIT = 48;

export const GET: APIRoute = async ({ url }) => {
    const offsetParam = Number(url.searchParams.get('offset'));
    const limitParam = Number(url.searchParams.get('limit'));

    const offset = Number.isFinite(offsetParam) && offsetParam > 0 ? Math.floor(offsetParam) : 0;
    const limit =
        Number.isFinite(limitParam) && limitParam > 0
            ? Math.min(Math.floor(limitParam), MAX_LIMIT)
            : GALLERY_PAGE_SIZE;

    try {
        const { items, hasMore } = await fetchPhotos(offset, limit);

        return new Response(JSON.stringify({ items, hasMore }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=0, s-maxage=120, stale-while-revalidate=3600',
            },
        });
    } catch (e) {
        console.error('[api/gallery/photos]', e);
        return new Response(JSON.stringify({ items: [], hasMore: false, error: 'Failed to load photos' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
