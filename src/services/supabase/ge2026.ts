// src/services/supabase/ge2026.ts
//
// ดึงข้อมูล GE2026 โดยใช้ RPC function ที่ JOIN กับ members table
// เพื่อให้ได้ band, image_url, team, gen ครบตาม Ge2026ResultRow
// โดยไม่ต้องแก้ view เดิม

import { getSupabase } from "@/services/supabase/server";
import type { Ge2026Category, Ge2026ResultGroup, Ge2026ResultRow } from "@/types/ge2026";

// ไม่ต้องใช้ TABLE คงที่อีกต่อไป

const CATEGORY_RANGES: Array<{
    category: Ge2026Category;
    title: string;
    min: number;
    max: number;
    centerRank: number;
}> = [
        { category: "senbatsu", title: "Senbatsu Members", min: 1, max: 12, centerRank: 1 },
        { category: "undergirls", title: "Under Girls", min: 13, max: 24, centerRank: 13 },
        { category: "nextgirls", title: "Next Girls", min: 25, max: 36, centerRank: 25 },
    ];

/**
 * Fetches GE2026 results from the view + members join via RPC.
 * Returns an empty array if Supabase isn't configured or error occurs.
 */
export async function getGe2026FinalResults(): Promise<Ge2026ResultRow[]> {
    const supabase = getSupabase();
    if (!supabase) return [];

    // เรียก RPC function ที่สร้างไว้
    const { data, error } = await supabase.rpc("get_ge2026_results_with_members");

    if (error) {
        console.error("[GE2026] RPC error:", error.message);
        return [];
    }

    return (data ?? []) as Ge2026ResultRow[];
}

/**
 * Splits the flat rank list into the 3 category groups the UI renders.
 */
export function groupGe2026Results(
    rows: Ge2026ResultRow[],
    round: Ge2026ResultRow["round"] = "final"
): Ge2026ResultGroup[] {
    const roundRows = rows.filter((r) => r.round === round);
    return CATEGORY_RANGES.map(({ category, title, min, max }) => {
        const groupRows = roundRows.filter((r) => r.rank >= min && r.rank <= max);
        return {
            category,
            title,
            song: null, // ยังไม่ใช้ในตอนนี้
            rows: groupRows,
        };
    });
}

export async function getGe2026ResultGroups(): Promise<Ge2026ResultGroup[]> {
    return groupGe2026Results(await getGe2026FinalResults());
}