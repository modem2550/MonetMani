import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * IMPORTANT: this client uses the public anon key, which is inherently
 * exposed (it ships to the browser/build). Do not rely on this file for
 * access control — make sure Row Level Security (RLS) is enabled on
 * `events_upcoming` / `events_past` (and any other table reachable via
 * this key) in the Supabase dashboard, with policies that only allow
 * read access and never allow writes from the anon role.
 */
let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const url = import.meta.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Supabase environment variables not found — returning null as fallback
    return null;
  }

  supabaseInstance = createClient(url, key);
  return supabaseInstance;
}
