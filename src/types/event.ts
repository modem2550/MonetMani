/* types/event.ts */

export interface Event {
    id: string | number;
    title?: string;
    event?: string;
    description?: string;
    date: string;
    end_date?: string | null;
    location?: string;
    place?: string;
    live?: string | null;
    link?: string;
    image_url?: string;
    thumbnail_url?: string | null;
    /** Local same-domain proxy path for the private Supabase media bucket. */
    storage_url?: string | null;
    image_urls?: {
        medium?: string;
        large?: string;
        storage_medium?: string;
        storage_large?: string;
        synced_at?: string;
    } | null;
    image_path?: string | null;
    generated_slug?: string;
    [key: string]: unknown;
}