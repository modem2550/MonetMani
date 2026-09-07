/// <reference types="astro/client" />


interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  readonly ADMIN_TOKEN?: string;
  readonly SPEED_INSIGHTS_TOKEN?: string;
  readonly VERCEL?: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
  readonly IMAGE_SYNC_SECRET?: string;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: 'config' | 'event' | 'js' | 'set', ...args: any[]) => void;
    va?: (...args: any[]) => void;
    vaq?: any[];
    vam?: string;
  }
}

export { };
