import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://monimonetfans.vercel.app',
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),


  integrations: [
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],

  image: {
    domains: [
      'ekiockkaoxakovrdssva.storage.supabase.co',
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'ekiockkaoxakovrdssva.storage.supabase.co' },
    ],
  },

  compressHTML: true,

  vite: {
    build: {
      minify: 'esbuild',
      target: 'es2020',
      cssCodeSplit: true,
      assets: '_astro',
      chunkSizeWarningLimit: 600,
    },
    css: {
      devSourcemap: false,
    },
  },
});