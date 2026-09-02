import { getSupabase } from "@/services/supabase/server";

export interface Member {
  id: number;
  name: string;
  brand: string;
  gen: string;
  team: string;
  profile_image_url: string | null;
  graduated_at: string | null;
  real_name: string | null;
}

/**
 * Fetches all active members from Supabase (where graduated_at is null).
 */
export async function getActiveMembers(): Promise<Member[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .is("graduated_at", null);

  if (error) {
    console.error("[Members] Supabase error fetching members:", error.message);
    return [];
  }

  return (data ?? []) as Member[];
}
