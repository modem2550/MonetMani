/* types/event.ts */

export interface Event {
    id: string;
    title?: string;
    description?: string;
    date: string;
    end_date?: string | null;
    location?: string;
    live?: string;
    link?: string;
    image_url?: string;
    image_urls?: {
        medium?: string;
        large?: string;
    };
    [key: string]: any;
}

export interface ThemeConfig {
    primary?: string;
    primaryHover?: string;
    bg?: string;
    surface?: string;
    surfaceAlt?: string;
    border?: string;
    content?: string;
    textMuted?: string;
    primaryGradient?: string;
}