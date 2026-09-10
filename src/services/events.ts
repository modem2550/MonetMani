import { getSupabaseAdmin } from '@/services/supabase/admin';
import { toEventSlug } from '@/shared/utils/slug';
import type { Event } from '@/types/event';

function withSlugs(events: Event[]): Event[] {
  return events.map((event) => ({
    ...event,
    generated_slug: toEventSlug(event.title, event.id),
  }));
}

export async function fetchUpcomingEvents(): Promise<Event[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  try {
    const { data } = await supabase
      .from('events_upcoming')
      .select('*')
      .order('date', { ascending: false });
    console.log('Fetched upcoming events count:', data?.length);
    return withSlugs(data ?? []);
  } catch (e) {
    console.error('Error fetching upcoming events:', e);
    return [];
  }
}

export async function fetchAllEvents(): Promise<Event[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  try {
    const [upcomingRes, pastRes] = await Promise.all([
      supabase.from('events_upcoming').select('*').order('date', { ascending: false }),
      supabase.from('events_past').select('*').order('date', { ascending: false }),
    ]);

    if (upcomingRes.error) console.error('Upcoming events error:', upcomingRes.error);
    if (pastRes.error) console.error('Past events error:', pastRes.error);

    return withSlugs([...(upcomingRes.data ?? []), ...(pastRes.data ?? [])]);
  } catch (e) {
    console.error('Error fetching events:', e);
    return [];
  }
}
