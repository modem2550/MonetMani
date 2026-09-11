/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
  readonly ADMIN_TOKEN?: string;
  readonly IMAGE_SYNC_SECRET?: string;
  readonly SPEED_INSIGHTS_TOKEN?: string;
  readonly VERCEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: 'config' | 'event' | 'js' | 'set', ...args: unknown[]) => void;
    va?: (...args: unknown[]) => void;
    vaq?: unknown[];
    [key: string]: unknown;
    openPopup: () => void;
    closePopup: () => void;
  }
}

export { };