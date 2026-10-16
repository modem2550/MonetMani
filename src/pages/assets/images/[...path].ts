import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const path = params.path;
    if (!path) {
        return new Response('Not Found', { status: 404 });
    }

    const supabaseUrl = import.meta.env.SUPABASE_URL;
    if (!supabaseUrl) {
        return new Response('Server configuration error', { status: 500 });
    }

    const baseUrl = supabaseUrl.replace(/\/$/, '');
    const targetUrl = `${baseUrl}/storage/v1/object/public/event-images/${path}`;

    try {
        const res = await fetch(targetUrl);
        if (!res.ok) {
            return new Response('Image Not Found', { status: res.status });
        }

        const contentType = res.headers.get('content-type') || 'image/webp';
        const cacheControl =
            res.headers.get('cache-control') ||
            'public, max-age=31536000, immutable';

        return new Response(res.body, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': cacheControl,
            },
        });
    } catch (e) {
        console.error('[image-proxy] Fetch error:', e);
        return new Response('Error fetching image', { status: 500 });
    }
};
