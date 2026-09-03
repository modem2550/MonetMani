import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
    // Logic ของ Middleware เช่น ดักจับ request, check auth, headers
    return next();
});