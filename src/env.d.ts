/// <reference types="astro/client" />


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
