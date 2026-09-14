import { getSupabaseAdmin } from '@/services/supabase/admin';
import type { PhotoItem, VideoItem } from '@/types/gallery';

export const GALLERY_PAGE_SIZE = 24;

export interface GalleryPage<T> {
  items: T[];
  hasMore: boolean;
}

export async function fetchPhotos(
  offset = 0,
  limit = GALLERY_PAGE_SIZE,
): Promise<GalleryPage<PhotoItem>> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return { items: [], hasMore: false };

    // ขอมาเกินมา 1 แถว (limit + 1) เพื่อเช็คว่ายังมีหน้าต่อไปไหม โดยไม่ต้องยิง count เพิ่ม
    const { data, error } = await supabase
      .from('photo_data')
      .select('*')
      .order('date_event', { ascending: false, nullsFirst: false })
      .order('time_upload', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit);

    if (error) console.error('Photo data error:', error);
    const rows = data ?? [];
    const hasMore = rows.length > limit;
    return { items: hasMore ? rows.slice(0, limit) : rows, hasMore };
  } catch (e) {
    console.error('Error fetching photo_data:', e);
    return { items: [], hasMore: false };
  }
}

export async function fetchVideos(
  offset = 0,
  limit = GALLERY_PAGE_SIZE,
): Promise<GalleryPage<VideoItem>> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return { items: [], hasMore: false };

    const { data, error } = await supabase
      .from('video_data')
      .select('*')
      .order('date_event', { ascending: false, nullsFirst: false })
      .order('date_upload', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit);

    if (error) console.error('Video data error:', error);
    const rows = data ?? [];
    const hasMore = rows.length > limit;
    return { items: hasMore ? rows.slice(0, limit) : rows, hasMore };
  } catch (e) {
    console.error('Error fetching video_data:', e);
    return { items: [], hasMore: false };
  }
}

export async function fetchPhotosCount(): Promise<number> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return 0;

    const { count, error } = await supabase
      .from('photo_data')
      .select('id', { count: 'exact', head: true });

    if (error) console.error('Photo count error:', error);
    return count ?? 0;
  } catch (e) {
    console.error('Error counting photo_data:', e);
    return 0;
  }
}

export async function fetchVideosCount(): Promise<number> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return 0;

    const { count, error } = await supabase
      .from('video_data')
      .select('id', { count: 'exact', head: true });

    if (error) console.error('Video count error:', error);
    return count ?? 0;
  } catch (e) {
    console.error('Error counting video_data:', e);
    return 0;
  }
}
