import { defineMiddleware } from 'astro:middleware';

/**
 * Basic security headers for every response.
 * Previously this middleware was a no-op stub; the comment implied it did
 * auth/header checks but nothing actually happened. This adds a minimal,
 * safe-by-default set of headers. Tighten CSP further if/when all external
 * script/iframe/image sources used by the site are enumerated (Supabase,
 * YouTube, TikTok, Instagram, cdnjs, Vercel, Google Fonts, etc.).
 */
export const onRequest = defineMiddleware(async (context, next) => {
    const response = await next();

    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Permissions-Policy',
        'geolocation=(), microphone=(), camera=()',
    );

    return response;
});
