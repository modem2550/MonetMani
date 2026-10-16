import { getSupabaseAdmin } from '@/services/supabase/admin';   // ← เปลี่ยนจาก admin.ts
import { toEventSlug } from '@/shared/utils/slug';
import type { Event } from '@/types/event';

function normalizeEvents(events: Event[]): Event[] {
  return events.map((event) => {
    const title = event.title ?? event.event ?? '';
    const location = event.location ?? event.place ?? '';
    const imageUrl = event.storage_url ?? event.image_urls?.storage_large ?? event.image_urls?.storage_medium ?? event.image_urls?.large ?? event.image_urls?.medium ?? event.image_url ?? event.thumbnail_url ?? '';

    return {
      ...event,
      title,
      event: event.event ?? title,
      location,
      place: event.place ?? location,
      image_url: imageUrl,
      thumbnail_url: event.thumbnail_url ?? imageUrl,
      generated_slug: toEventSlug(title, event.id),
    };
  });
}

export async function fetchUpcomingEvents(): Promise<Event[]> {
  const supabase = getSupabaseAdmin();   // ← ใช้ anon client, คืนค่า null ได้ ไม่ throw
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('events_upcoming')
      .select('*')
      .order('date', { ascending: false });

    if (error) console.error('Upcoming events error:', error);
    return normalizeEvents(data ?? []);
  } catch (e) {
    console.error('Error fetching upcoming events:', e);
    return [];
  }
}

export async function fetchAllEvents(): Promise<Event[]> {
  const supabase = getSupabaseAdmin();   // ← ใช้ anon client
  if (!supabase) return [];

  try {
    const [upcomingRes, pastRes] = await Promise.all([
      supabase.from('events_upcoming').select('*').order('date', { ascending: false }),
      supabase.from('events_past').select('*').order('date', { ascending: false }),
    ]);

    if (upcomingRes.error) console.error('Upcoming events error:', upcomingRes.error);
    if (pastRes.error) console.error('Past events error:', pastRes.error);

    return normalizeEvents([...(upcomingRes.data ?? []), ...(pastRes.data ?? [])]);
  } catch (e) {
    console.error('Error fetching events:', e);
    return [];
  }
}