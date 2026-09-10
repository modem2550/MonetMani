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
        storage_medium?: string;
        storage_large?: string;
        synced_at?: string;
    };
    [key: string]: unknown;
}