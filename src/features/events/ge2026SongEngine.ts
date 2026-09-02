// src/features/events/logic/ge2026SongEngine.ts
//
// Pure functions — no I/O, no Supabase. Safe to call at build time, at
// request time (SSR), or from a client-side island.
//
// Rule set (mirrors the original GE fansite's "Song Checker"):
//   1. Whoever wins the #1 (Senbatsu), #13 (Under Girls) and #25 (Next Girls)
//      center spot each get to pick a song from the AKB48-group catalogue,
//      using the 3 songs they listed on their application (in order).
//   2. Priority order is #1 > #13 > #25. The higher-priority center always
//      gets their 1st-choice song.
//   3. If a lower-priority center's song has already been claimed by a
//      higher-priority center, they fall through to their 2nd choice, then
//      their 3rd choice (last resort — always available since nobody can
//      collide 3 times across only 3 people).

import type {
    Ge2026Candidate,
    Ge2026Category,
    Ge2026CenterResolution,
    Ge2026SongProbability,
    Ge2026SongStat,
} from "@/types/ge2026";

const CATEGORY_BY_RANK: Record<1 | 13 | 25, Ge2026Category> = {
    1: "senbatsu",
    13: "undergirls",
    25: "nextgirls",
};

export const CATEGORY_LABEL: Record<Ge2026Category, string> = {
    senbatsu: "Senbatsu",
    undergirls: "Under Girls",
    nextgirls: "Next Girls",
};

// ── 1) Song popularity across all applications ──────────────────────────────

export function aggregateSongStats(candidates: Ge2026Candidate[]): Ge2026SongStat[] {
    const bySong = new Map<string, Ge2026SongStat>();

    for (const candidate of candidates) {
        candidate.songs.forEach((song, idx) => {
            const priority = (idx + 1) as 1 | 2 | 3;
            const existing = bySong.get(song);
            if (existing) {
                existing.count += 1;
                existing.picks.push({ candidate, priority });
            } else {
                bySong.set(song, { song, count: 1, picks: [{ candidate, priority }] });
            }
        });
    }

    return [...bySong.values()].sort(
        (a, b) => b.count - a.count || a.song.localeCompare(b.song),
    );
}

/** Groups songs by their trailing "(Artist)" tag, e.g. "... (AKB48)" -> "AKB48". */
export function aggregateArtistStats(candidates: Ge2026Candidate[]): Array<{ artist: string; count: number }> {
    const counts = new Map<string, number>();
    for (const stat of aggregateSongStats(candidates)) {
        const artist = stat.song.match(/\(([^)]+)\)\s*$/)?.[1] ?? "Unknown";
        counts.set(artist, (counts.get(artist) ?? 0) + 1);
    }
    return [...counts.entries()]
        .map(([artist, count]) => ({ artist, count }))
        .sort((a, b) => b.count - a.count || a.artist.localeCompare(b.artist));
}

// ── 2) Resolve which song each center position actually gets ───────────────

export interface CenterPicks {
    rank1Id: string | null;
    rank13Id: string | null;
    rank25Id: string | null;
}

/**
 * Resolves the 3 category songs for one specific (rank1, rank13, rank25)
 * assignment. Positions are processed in priority order so a higher rank
 * always claims their top available choice first.
 */
export function resolveCenterSongs(
    picks: CenterPicks,
    candidates: Ge2026Candidate[],
): Ge2026CenterResolution[] {
    const byId = new Map(candidates.map((c) => [c.id, c]));
    const used = new Set<string>();
    const order: Array<1 | 13 | 25> = [1, 13, 25];
    const idByRank: Record<1 | 13 | 25, string | null> = {
        1: picks.rank1Id,
        13: picks.rank13Id,
        25: picks.rank25Id,
    };

    return order.map((rankLabel) => {
        const category = CATEGORY_BY_RANK[rankLabel];
        const candidate = idByRank[rankLabel] ? byId.get(idByRank[rankLabel]!) ?? null : null;

        if (!candidate) {
            return { category, rankLabel, candidate: null, priorityUsed: null, song: null };
        }

        for (let i = 0; i < candidate.songs.length; i++) {
            const song = candidate.songs[i];
            if (!used.has(song)) {
                used.add(song);
                return {
                    category,
                    rankLabel,
                    candidate,
                    priorityUsed: (i + 1) as 1 | 2 | 3,
                    song,
                };
            }
        }

        // Should not happen with only 3 competitors and 3 picks each, but guard anyway.
        return { category, rankLabel, candidate, priorityUsed: null, song: null };
    });
}

// ── 3) "What are the odds this song makes the next single?" ────────────────

/**
 * Brute-forces every ordered (rank1, rank13, rank25) combination — treating
 * every candidate as equally likely to land any center spot — and tallies,
 * for each song, how many of those combinations would actually put it to
 * use in *some* category. Cheap: N·(N-1)·(N-2) iterations of O(1) work
 * (≈185k for a 58-person roster), well under a second.
 */
export function computeSongProbabilities(
    candidates: Ge2026Candidate[],
): Ge2026SongProbability[] {
    const n = candidates.length;
    const totalCombinations = n * (n - 1) * (n - 2);
    const hits = new Map<string, number>();

    if (totalCombinations <= 0) return [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (j === i) continue;
            for (let k = 0; k < n; k++) {
                if (k === i || k === j) continue;

                const resolved = resolveCenterSongs(
                    { rank1Id: candidates[i].id, rank13Id: candidates[j].id, rank25Id: candidates[k].id },
                    candidates,
                );

                const distinctSongs = new Set(
                    resolved.map((r) => r.song).filter((s): s is string => Boolean(s)),
                );
                for (const song of distinctSongs) {
                    hits.set(song, (hits.get(song) ?? 0) + 1);
                }
            }
        }
    }

    return [...hits.entries()]
        .map(([song, hitCount]) => ({
            song,
            hitCount,
            totalCombinations,
            percent: (hitCount / totalCombinations) * 100,
        }))
        .sort((a, b) => b.percent - a.percent || a.song.localeCompare(b.song));
}