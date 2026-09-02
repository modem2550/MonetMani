// src/types/ge2026.ts
// Types for the BNK48 & CGM48 Senbatsu General Election 2026 (GE6) page.

export type Ge2026Band = "BNK48" | "CGM48";

/** A candidate's 3 song picks, in priority order (1st choice → 3rd choice). */
export type SongPickTuple = [string, string, string];

export interface Ge2026Candidate {
    /** Stable slug, e.g. "Niya_BNK48". Matches the CDN image folder naming. */
    id: string;
    name: string;
    band: Ge2026Band;
    team: string;
    gen: string;
    /** 3 songs the candidate requested, ordered by priority. */
    songs: SongPickTuple;
    /** Optional override; if omitted, derived from `id`/`name` + CDN base. */
    imageUrl?: string;
    imageReg?: string;
    /** Expected rank or position. */
    expectation?: string;
    /** X (Twitter) post URL */
    postUrl?: string;
    /** Full application text */
    applicationText?: string;
}

/** Aggregated info for a single song across all candidates who requested it. */
export interface Ge2026SongStat {
    song: string;
    count: number;
    picks: Array<{ candidate: Ge2026Candidate; priority: 1 | 2 | 3 }>;
}

export type Ge2026Category = "senbatsu" | "undergirls" | "nextgirls";

/** One resolved center position (#1, #13, or #25) and the song they unlocked. */
export interface Ge2026CenterResolution {
    category: Ge2026Category;
    rankLabel: 1 | 13 | 25;
    candidate: Ge2026Candidate | null;
    /** Which of the candidate's 3 picks actually got used (1st/2nd/3rd choice). */
    priorityUsed: 1 | 2 | 3 | null;
    song: string | null;
}

export interface Ge2026SongProbability {
    song: string;
    /** How many of the N·(N-1)·(N-2) ordered center combinations use this song. */
    hitCount: number;
    totalCombinations: number;
    percent: number;
}

/** A row from the `ge2026_final_results` Supabase table (rank 1–36). */
export interface Ge2026ResultRow {
   id: number;
   round: "prelim1" | "prelim2" | "final";
   rank: number;
   member_name: string;
   token: number;
   band: Ge2026Band | string | null;
   image_url: string | null;
   team: string | null;
   gen: string | null;
   updated_at?: string;
}

export interface Ge2026ResultGroup {
    category: Ge2026Category;
    title: string;
    song: string | null;
    rows: Ge2026ResultRow[];
}