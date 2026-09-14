/* types/gallery.ts */

export interface PhotoItem {
    id: number;
    event?: string | null;
    time_upload?: string | null;
    date_event?: string | null;
    link_post: string;
    thumbnail_url?: string | null;
    /** URL รูปที่ sync เข้า Supabase Storage แล้ว (path แบบ /assets/images/...) ใช้แสดงผลก่อน thumbnail_url เสมอถ้ามี */
    storage_url?: string | null;
    place?: string | null;
    updated_at?: string | null;
}

export interface VideoItem {
    id: number;
    event?: string | null;
    date_event?: string | null;
    date_upload?: string | null;
    url: string;
    thumbnail_url?: string | null;
    /** URL thumbnail ที่ sync เข้า Supabase Storage แล้ว (path แบบ /assets/images/...) ใช้แสดงผลก่อน thumbnail_url เสมอถ้ามี */
    storage_url?: string | null;
    place?: string | null;
    title: string;
    updated_at?: string | null;
}

export type GelleryKind = "photo" | "video";
export type GelleryItem = PhotoItem | VideoItem;
