// src/features/events/data/ge2026-data.ts
//
// Merged data + config module for the BNK48 & CGM48 Senbatsu General
// Election 2026 (GE6). Combines what used to be three separate files:
//   - ge2026-candidates.ts  (static candidate roster)
//   - ge2026-song-meta.ts   (song catalogue metadata)
//   - ge2026.config.ts      (UnifiedEventConfig / plugin registration)
//
// All original export names are preserved so existing imports elsewhere in
// the codebase (e.g. src/pages/planner/ge-2026.astro) do not need to change:
//   ge2026Candidates, getGe2026ImageUrl, getGe2026CandidateById
//   ge2026SongMeta, normalizeGe2026SongTitle, getGe2026SongMeta,
//   getGe2026SongBandCounts, eventConfig
//
// NOTE: only one `export default` is allowed per module. The event registry
// pattern (see ge2026.config.ts precedent) treats the config object as the
// module's default export, so `eventConfig` is the default export here —
// `ge2026Candidates` is available as a named export only (no longer default).
// If anything elsewhere does `import candidates from ".../ge2026-data"`
// expecting the candidate list, switch it to
// `import { ge2026Candidates } from ".../ge2026-data"`.
//
// Only the *final results* (src/services/supabase/ge2026.ts) are
// database-backed — everything in this file stays hardcoded by design.
//
// Image CDN follows the same convention used across the community:
//   https://cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@4.2/optimized/{slug}.webp

import type { Ge2026Candidate } from "@/types/ge2026";
import type { UnifiedEventConfig } from "../logic/types";

// =============================================================================
// ── Candidates ───────────────────────────────────────────────────────────────
// =============================================================================

const CDN_BASE =
    "https://cdn.jsdelivr.net/gh/withmywish/48th-members-cdn@4.2/optimized";

/** e.g. "Niya" -> "niya", "L" -> "l" */
function imageSlug(name: string): string {
    return name.trim().toLowerCase();
}

export function getGe2026ImageUrl(candidate: Pick<Ge2026Candidate, "name" | "imageUrl">): string {
    return candidate.imageUrl ?? `${CDN_BASE}/${imageSlug(candidate.name)}.webp`;
}

// ── BNK48 (37 candidates) ───────────────────────────────────────────────────
const bnk48: Ge2026Candidate[] = [
    { id: "Arlee_BNK48", name: "Arlee", expectation: "Senbatsu (1-12) หรือ อันดับ 13", band: "BNK48", team: "Team NV", gen: "5" ,songs: ["Kuchibiru ni Be My Baby (AKB48)", "Nagiichi (NMB48)", "Ano Natsu no Bouhatei (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2084676636436513053", applicationText: "อาหลี–ชนากานต์ โอสถานุภาพ (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 4 สิงหาคม 2026 (22:49)\n\n [เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Kuchibiru ni Be My Baby (AKB48)\n2 Nagiichi (NMB48)\n3 Ano Natsu no Bouhatei (AKB48)", imageReg: "https://pbs.twimg.com/media/HO5CQAlacAAFaup.jpg?format=jpg&name=large" },
    { id: "Berry_BNK48", name: "Berry", expectation: "อันดับ 25", band: "BNK48", team: "Team NV", gen:"4", songs: ["Hayaokuri Calendar (HKT48)", "Hoshi ga Kienai Uchi ni (AKB48)", "Yumemite Gomen (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2087015458721415395", applicationText: "เบอร์รี่–จิรภิญญา จันทวรรณกูร (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 11 สิงหาคม 2026 (00:25)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Hayaokuri Calendar (HKT48)\n2 Hoshi ga Kienai Uchi ni (AKB48)\n3 Yumemite Gomen (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPaQ0p3aUAE2teN.jpg?format=jpg&name=large"},
    { id: "Blythe_BNK48", name: "Blythe", expectation: "Senbatsu (1-12) หรือ อันดับ 13", band: "BNK48", team: "Trainee", gen: "6", songs: ["Sherbet Pink (NGT48)", "Everyday, Kachuusha (AKB48)", "Namida no Seesaw Game (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2088101787232567483", applicationText: "บลายธ์–ณัฏฐ์รัญศา ศิริลาภวิบูรณ์ (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 14 สิงหาคม 2026 (02:22)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Sherbet Pink (NGT48)\n2 Everyday, Kachuusha (AKB48)\n3 Namida no Seesaw Game (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPqry2akA1YGM.jpg?format=jpg&name=large"},
    { id: "Cartoon_BNK48", name: "Cartoon", expectation: "อันดับ 27", band: "BNK48", team: "Trainee", gen:"6", songs: ["Sustainable (AKB48)", "Hoshi ga Kienai Uchi ni (AKB48)", "Durian Shounen (NMB48)"] , postUrl: "https://x.com/bnk48official/status/2085569507477913907", applicationText: "การ์ตูน–ณัฎฐธิดา ณ อัมภัย (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 7 สิงหาคม 2026 (07:07)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Sustainable (AKB48)\n2 Hoshi ga Kienai Uchi ni (AKB48)\n3 Durian Shounen (NMB48)" , imageReg: "https://pbs.twimg.com/media/HPNL9uEAZUpg.jpg?format=jpg&name=largehttps://pbs.twimg.com/media/HPFuXgIacAArVc8?format=jpg&name=large"},
    { id: "Emmy_BNK48", name: "Emmy", expectation: "อันดับ 7", band: "BNK48", team: "Team NV", gen:"4", songs: ["Seishun no Deadline (NMB48)", "Juuryoku Sympathy (AKB48 Team Surprise)", "Time Machine Fuyouron (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2083409629858656356", applicationText: "เอ็มมี่–อรณิชชา พรหมสุภา (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 1 สิงหาคม 2026 (11:22)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Seishun no Deadline (NMB48)\n2 Juuryoku Sympathy (AKB48 Team Surprise)\n3 Time Machine Fuyouron (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPU1X4aA80HG.jpg?format=jpg&name=large"},
    { id: "Fame_BNK48", name: "Fame", expectation: "Kami 7 (1-7)", band: "BNK48", team: "Team BIII", gen:"3", songs: ["Tick tack zack (SKE48)", "Hitsuzensei (IZ4648)", "Zettai Inspiration (SKE48)"] , postUrl: "https://x.com/bnk48official/status/2081652912208703906", applicationText: "เฟม–นันทภัค กิตติรัตนวิวัฒน์ (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 27 กรกฎาคม 2026 (14:55)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Tick tack zack (SKE48)\n2 Hitsuzensei (IZ4648)\n3 Zettai Inspiration (SKE48)" , imageReg: "https://pbs.twimg.com/media/HPUnthaaAWXxg.jpg?format=jpg&name=large"},
    { id: "Galeya_BNK48", name: "Galeya", expectation: "อันดับ 13", band: "BNK48", team: "Trainee", gen:"5", songs: ["Suki-ish (AKB48)", "Everyday, Kachuusha (AKB48)", "Sustainable (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2087109250069811334", applicationText: "เกลญ่า–นภภัค พชิรนันทกุล (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 11 สิงหาคม 2026 (15:15)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Suki-ish (AKB48)\n2 Everyday, Kachuusha (AKB48)\n3 Sustainable (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPkzfaoacAvtSE.jpg?format=jpg&name=large"},
    { id: "Grape_BNK48", name: "Grape", expectation: "อันดับ 19", band: "BNK48", team: "Trainee", gen:"6", songs: ["Ano Natsu no Bouhatei (AKB48)", "Hoshi ga Kienai Uchi ni (AKB48)", "Moto Kare Desu (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2087532550512353432", applicationText: "เกรฟ–เอมิกา ยอดแสง (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 12 สิงหาคม 2026 (20:11)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Ano Natsu no Bouhatei (AKB48)\n2 Hoshi ga Kienai Uchi ni (AKB48)\n3 Moto Kare Desu (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPkynNaYAOdc.jpg?format=jpg&name=large"},
    { id: "Hoop_BNK48", name: "Hoop", expectation: "อันดับ 1", band: "BNK48", team: "Team BIII", gen:"3", songs: ["Nagori Zakura (AKB48)", "Suki-ish (AKB48)", "Kokoro no Placard (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2087763112820895990", applicationText: "ฮูพ–ปาฏลี ประเสริฐธีระชัย (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 13 สิงหาคม 2026 (11:11)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Nagori Zakura (AKB48)\n2 Suki-ish (AKB48)\n3 Kokoro no Placard (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPqzZbYAAoEM.jpg?format=jpg&name=large"},
    { id: "Inkcha_BNK48", name: "Inkcha", expectation: "อันดับ 25", band: "BNK48", team: "Trainee", gen:"6", songs: ["Ano sa, Iya Betsu ni… (NGT48)", "Nagori Zakura (AKB48)", "Suki-ish (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2088215717992857822", applicationText: "อิ๊งชา–ชลิตา กิตติคุณ (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 14 สิงหาคม 2026 (17:31)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Ano sa, Iya Betsu ni… (NGT48)\n2 Nagori Zakura (AKB48)\n3 Suki-ish (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPnvoaMaAANyFA.jpg?format=jpg&name=large"},
    { id: "Janry_BNK48", name: "Janry", expectation: "อันดับ 3-7", band: "BNK48", team: "Team BIII", gen:"4", songs: ["Hayaokuri Calendar (HKT48)", "Sandal da ze (SKE48)", "Ano Natsu no Bouhatei (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2086698852326002966", applicationText: "แจนรี่–กัลยารัตน์ ปั้นพิพัฒน์ (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 10 สิงหาคม 2026 (13:10)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Hayaokuri Calendar (HKT48)\n2 Sandal da ze (SKE48)\n3 Ano Natsu no Bouhatei (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPsXgLwAeaWvY.jpg?format=jpg&name=large"},
    { id: "Jew_BNK48", name: "Jew", expectation: "Senbatsu (1-12) หรือ อันดับ 13", band: "BNK48", team: "Team NV", gen:"6" , songs: ["Utsukushii Inazuma (SKE48)", "Flying Get (AKB48)", "UZA (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2088188431369429087", applicationText: "จิว–ณัฐญาฐ์ บวรรัตนศิลป์ (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 14 สิงหาคม 2026 (15:25)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Utsukushii Inazuma (SKE48)\n2 Flying Get (AKB48)\n3 UZA (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPcJcUFaAErSS2g.jpg?format=jpg&name=large"},
    { id: "Khaimook_BNK48", name: "Khaimook", expectation: "อันดับ 25", band: "BNK48", team: "Trainee", gen:"6", songs: ["Hayaokuri Calendar (HKT48)", "12-Byou (HKT48)", "Hansode Tenshi (HKT48)"] , postUrl: "https://x.com/bnk48official/status/2083564493364416845", applicationText: "ไข่มุก–นันท์นภัส สมวัฒน์ (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 1 สิงหาคม 2026 (20:53)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Hayaokuri Calendar (HKT48)\n2 12-Byou (HKT48)\n3 Hansode Tenshi (HKT48)" , imageReg: "https://pbs.twimg.com/media/HPbmNnFMAA9IMg.jpg?format=jpg&name=large"},
    { id: "Khowjow_BNK48", name: "Khowjow", expectation: "อันดับ 13", band: "BNK48", team: "Trainee", gen:"6", songs: ["Seishun no Deadline (NMB48)", "UZA (AKB48)", "Flying Get (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2087793348409168012", applicationText: "ข้าวจ้าว–ชัญญานุช โผกรุด (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 13 สิงหาคม 2026 (13:13)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Seishun no Deadline (NMB48)\n2 UZA (AKB48)\n3 Flying Get (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPaQp0a3AUE2tN.jpg?format=jpg&name=large"},
    { id: "L_BNK48", name: "L", expectation: "อันดับ 4", band: "BNK48", team: "Team NV", gen:"4", songs: ["Wataridoritachi ni Sora wa Mienai (NGT48)", "Seishun no Deadline (NMB48)", "Bokura no Eureka (NMB48)"] , postUrl: "https://x.com/bnk48official/status/2083802979543716171", applicationText: "แอล–สิริกร นิลกษาปน์ (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 2 สิงหาคม 2026 (13:22)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Wataridoritachi ni Sora wa Mienai (NGT48)\n2 Seishun no Deadline (NMB48)\n3 Bokura no Eureka (NMB48)" , imageReg: "https://pbs.twimg.com/media/HPxAZoJMAA0Mtw.jpg?format=jpg&name=large"},
    { id: "Luksorn_BNK48", name: "Luksorn", expectation: "Senbatsu (1-12)", band: "BNK48", team: "Team BIII", gen:"6", songs: ["Everyday, Kachuusha (AKB48)", "Boku Datte Naichau yo (NMB48)", "Sentimental Train (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2084454183017852958", applicationText: "ลูกศร–ทัศน์ลักษณ์ แก้วบัวรบัติ (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 4 สิงหาคม 2026 (08:09)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Everyday, Kachuusha (AKB48)\n2 Boku Datte Naichau yo (NMB48)\n3 Sentimental Train (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPw-rlakAADFYK.jpg?format=jpg&name=large"},
    { id: "Mail_BNK48", name: "Mail", expectation: "อันดับ 20", band: "BNK48", team: "Team BIII", gen:"6", songs: ["Kokuhaku Shinpakusuu (SKE48)", "Hachinosu Dance (AKB48 Team 8)", "Ano Natsu no Bouhatei (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2085681131803013235", applicationText: "เมล–สิดาพร หลินถาวรดี (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 7 สิงหาคม 2026 (17:17)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Kokuhaku Shinpakusuu (SKE48)\n2 Hachinosu Dance (AKB48 Team 8)\n3 Ano Natsu no Bouhatei (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPvzdzbAWA2SX.jpg?format=jpg&name=large"},
    { id: "Marine_BNK48", name: "Marine", expectation: "Senbatsu (1-12)", band: "BNK48", team: "Team BIII", gen:"4", songs: ["Ano Natsu no Bouhatei (AKB48)", "Hoshi ga Kienai Uchi ni (AKB48)", "Suki! Suki! Skip! (HKT48)"] , postUrl: "https://x.com/bnk48official/status/2088170009994711338", applicationText: "มารีน–กชพร พรโชคชัย (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 14 สิงหาคม 2026 (14:14)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Ano Natsu no Bouhatei (AKB48)\n2 Hoshi ga Kienai Uchi ni (AKB48)\n3 Suki! Suki! Skip! (HKT48)" , imageReg: "https://pbs.twimg.com/media/HPVQb1A0A0A3K.jpg?format=jpg&name=large"},
    { id: "Mayji_BNK48", name: "Mayji", expectation: "อันดับ 25", band: "BNK48", team: "Trainee", gen:"6", songs: ["Ue Kara Mariko (AKB48)", "Sou Yuu Toko Aru yo ne? (SKE48)", "Ganbaranuwai (NMB48)"] , postUrl: "https://x.com/bnk48official/status/2087449006154907671", applicationText: "เมย์จิ–ศุภิสรา จิริวิภากร (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 12 สิงหาคม 2026 (14:22)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Ue Kara Mariko (AKB48)\n2 Sou Yuu Toko Aru yo ne? (SKE48)\n3 Ganbaranuwai (NMB48)" , imageReg: "https://pbs.twimg.com/media/HPQRA7bUAAf1a.jpg?format=jpg&name=large"},
    { id: "Micha_BNK48", name: "Micha", expectation: "อันดับ 13", band: "BNK48", team: "Team BIII", gen:"4", songs: ["Biisan wa Naze Nakunaru no ka? (HKT48)", "Ano Natsu no Bouhatei (AKB48)", "Sustainable (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2085623110888530116", applicationText: "มิชา–ณัฐรินีย์ กุศลพัฒน์ (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 7 สิงหาคม 2026 (12:16)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Biisan wa Naze Nakunaru no ka? (HKT48)\n2 Ano Natsu no Bouhatei (AKB48)\n3 Sustainable (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPNUNyrB0A1Thg.jpg?format=jpg&name=large"},
    { id: "Mint_BNK48", name: "Mint", expectation: "อันดับ 20", band: "BNK48", team: "Trainee", gen:"7", songs: ["Love Jump (AKB48 Team B)", "Sustainable (AKB48)", "Osaekirenai Shoudou (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2082096835599217018", applicationText: "มิ้นท์–ณัฐมณ วรพิทยุต (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 28 กรกฎาคม 2026 (20:20)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Love Jump (AKB48 Team B)\n2 Sustainable (AKB48)\n3 Osaekirenai Shoudou (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPtL5eCkAAnCw.jpg?format=jpg&name=large"},
    { id: "Mirin_BNK48", name: "Mirin", expectation: "อันดับ 26", band: "BNK48", team: "Trainee", gen:"6", songs: ["Kuchibiru ni Be My Baby (AKB48)", "Overtake (AKB48 Team A)", "Suzukake no Ki no Michi de... (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2086301482052436273", applicationText: "มิริน–รินณ์ลิสา บูรภากรณ์ (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 9 สิงหาคม 2026 (10:48)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Kuchibiru ni Be My Baby (AKB48)\n2 Overtake (AKB48 Team A)\n3 Suzukake no Ki no Michi de \"\"Kimi no Hohoemi wo Yume ni Miru\"\" to Itte Shimattara Bokutachi no Kankei wa Dou Kawatte Shimau no ka, Bokunari ni Nannichi ka Kangaeta Ue de no Yaya Kihazukashii Ketsuron no You na Mono (AKB48)" , imageReg: "https://pbs.twimg.com/media/HP1L-Eb5AASnJg.jpg?format=jpg&name=large"},
    { id: "Monet_BNK48", name: "Monet", expectation: "อันดับ 3", band: "BNK48", team: "Team BIII", gen:"3", songs: ["Manatsu no Sounds good ! (AKB48)", "Kiss wa Matsu Shikanai no deshou ka? (HKT48)", "Hachinosu Dance (AKB48 Team 8)"] , postUrl: "https://x.com/bnk48official/status/2083498514760560676", applicationText: "โมเน่ต์–ภาริตา ริเริ่มกุล (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 1 สิงหาคม 2026 (16:10)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Manatsu no Sounds good ! (AKB48)\n2 Kiss wa Matsu Shikanai no deshou ka? (HKT48)\n3 Hachinosu Dance (AKB48 Team 8)" , imageReg: "https://pbs.twimg.com/media/HPoTqQpA8t2wA.jpg?format=jpg&name=large"},
    { id: "Nall_BNK48", name: "Nall", expectation: "อันดับ 12", band: "BNK48", team: "Trainee", gen:"6", songs: ["Shoot Sign (AKB48)", "Seishun no Deadline (NMB48)", "Suki-ish (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2084305950287233198", applicationText: "แนล–แนลริยา วิภาคกิจ (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 3 สิงหาคม 2026 (22:12)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Shoot Sign (AKB48)\n2 Seishun no Deadline (NMB48)\n3 Suki-ish (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPuFALgAABR6Q.jpg?format=jpg&name=large"},
    { id: "Nammonn_BNK48", name: "Nammonn", expectation: "อันดับ 13", band: "BNK48", team: "Trainee", gen:"6", songs: ["Sekai wa Doko Made Aozora na no ka? (NGT48)", "Romantic Junbichuu (AKB48 Team A)", "Mazariau Mono (Nogizaka AKB)"] , postUrl: "https://x.com/bnk48official/status/2086701191384490365", applicationText: "น้ำมนต์–ณัฐมนต์ สองทิศ (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 10 สิงหาคม 2026 (13:13)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Sekai wa Doko Made Aozora na no ka? (NGT48)\n2 Romantic Junbichuu (AKB48 Team A)\n3 Mazariau Mono (Nogizaka AKB)" , imageReg: "https://pbs.twimg.com/media/HPV7QXJrJ5K0.jpg?format=jpg&name=large"},
    { id: "Neen_BNK48", name: "Neen", expectation: "อันดับ 13", band: "BNK48", team: "Trainee", gen:"5", songs: ["Yokuboumono (NMB48)", "Ishi (HKT48)", "Wataridoritachi ni Sora wa Mienai (NGT48)"] , postUrl: "https://x.com/bnk48official/status/2087792505937138126", applicationText: "นีน–นีร บุนนาค (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 13 สิงหาคม 2026 (13:13)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Yokuboumono (NMB48)\n2 Ishi (HKT48)\n3 Wataridoritachi ni Sora wa Mienai (NGT48)" , imageReg: "https://pbs.twimg.com/media/HPF2XyYHCrQRw.jpg?format=jpg&name=large"},
    { id: "Niya_BNK48", name: "Niya", expectation: "Senbatsu (1-12) หรือ อันดับ 13", band: "BNK48", team: "Trainee", gen:"5", songs: ["Ano sa, Iya Betsu ni… (NGT48)", "Hayaokuri Calendar (HKT48)", "Kokoro no Placard (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2086815501116936404", applicationText: "นีญ่า–สุวิภาส์ ลายถมยา (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 10 สิงหาคม 2026 (20:30)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Ano sa, Iya Betsu ni… (NGT48)\n2 Hayaokuri Calendar (HKT48)\n3 Kokoro no Placard (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPaA5C0W7koXc.jpg?format=jpg&name=large"},
    { id: "Palmmy_BNK48", name: "Palmmy", expectation: "อันดับ 13", band: "BNK48", team: "Team NV", gen:"5", songs: ["Halloween Night (AKB48)", "Mousou Girlfriend (NMB48)", "Neko Allergy (AKB48 Team 4)"] , postUrl: "https://x.com/bnk48official/status/2083751199556469012", applicationText: "ปาล์มมี่–ปุญญิสา แก้วสว่าง (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 2 สิงหาคม 2026 (09:33)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Halloween Night (AKB48)\n2 Mousou Girlfriend (NMB48)\n3 Neko Allergy (AKB48 Team 4)" , imageReg: "https://pbs.twimg.com/media/HPPjC0WwIYJgA.jpg?format=jpg&name=large"},
    { id: "Pancake_BNK48", name: "Pancake", expectation: "อันดับ 1", band: "BNK48", team: "Team NV", gen:"3", songs: ["Nagori Zakura (AKB48)", "Ano sa, Iya Betsu ni… (NGT48)", "Kuchibiru ni Be My Baby (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2087177627761316254", applicationText: "แพนเค้ก–พิทยาภรณ์ เกียรติฐิตินันท์ (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 11 สิงหาคม 2026 (21:01)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Nagori Zakura (AKB48)\n2 Ano sa, Iya Betsu ni… (NGT48)\n3 Kuchibiru ni Be My Baby (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPiWEzkA3uU4w.jpg?format=jpg&name=large"},
    { id: "Patt_BNK48", name: "Patt", expectation: "อันดับ 13", band: "BNK48", team: "Team BIII", gen:"4", songs: ["Hitsuzensei (IZ4648)", "Ano Natsu no Bouhatei (AKB48)", "Juuryoku Sympathy (AKB48 Team Surprise)"] , postUrl: "https://x.com/bnk48official/status/2083545654002114654", applicationText: "แพท–ภัทรา ธีระวาส (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 1 สิงหาคม 2026 (20:18)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Hitsuzensei (IZ4648)\n2 Ano Natsu no Bouhatei (AKB48)\n3 Juuryoku Sympathy (AKB48 Team Surprise)" , imageReg: "https://pbs.twimg.com/media/HP0QY6K9nQfI.jpg?format=jpg&name=large"},
    { id: "Praew_BNK48", name: "Praew", expectation: "Senbatsu (1-12)", band: "BNK48", team: "Team BIII", gen:"6", songs: ["Suki-ish (AKB48)", "Ano sa, Iya Betsu ni… (NGT48)", "Hoshi ga Kienai Uchi ni (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2087536281706451379", applicationText: "แพรว–แพรวา ศิริวัฒนศักดิกุล (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 12 สิงหาคม 2026 (20:36)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Suki-ish (AKB48)\n2 Ano sa, Iya Betsu ni… (NGT48)\n3 Hoshi ga Kienai Uchi ni (AKB48)" , imageReg: "https://pbs.twimg.com/media/HPsS9_bA9z9U.jpg?format=jpg&name=large"},
    { id: "Proud_BNK48", name: "Proud", expectation: "อันดับ 25", band: "BNK48", team: "Team NV", gen:"5", songs: ["Sandal da ze (SKE48)", "Seishun no Deadline (NMB48)", "Shidare Yanagi (NMB48)"] , postUrl: "https://x.com/bnk48official/status/2085201275990556862", applicationText: "ภราว–ภารวี จิรธาดาสกุล (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 6 สิงหาคม 2026 (06:25)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Sandal da ze (SKE48)\n2 Seishun no Deadline (NMB48)\n3 Shidare Yanagi (NMB48)" , imageReg: "https://pbs.twimg.com/media/HPn3HqM8y2v8.jpg?format=jpg&name=large"},
    { id: "Rose_BNK48", name: "Rose", expectation: "อันดับ 5", band: "BNK48", team: "Trainee", gen:"6", songs: ["Flying Get (AKB48)", "Shoot Sign (AKB48)", "Ue Kara Mariko (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2086132882322710702", applicationText: "โรส–ปาณิสรา บูรณาภา (BNK48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 8 สิงหาคม 2026 (23:40)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Flying Get (AKB48)\n2 Shoot Sign (AKB48)\n3 Ue Kara Mariko (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQ7p5pJ5j2w.jpg?format=jpg&name=large"},
    { id: "Saonoi_BNK48", name: "Saonoi", expectation: "อันดับ 7", band: "BNK48", team: "Team NV", gen:"5", songs: ["Kimi wa Motto Dekiru (HKT48)", "Hayaokuri Calendar (HKT48)", "Hitsuzensei (IZ4648)"] , postUrl: "https://x.com/bnk48official/status/2085569209480913154", applicationText: "สาวน้อย–พิชญ์สินี อิทธิรัตนะโกมล (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 7 สิงหาคม 2026 (07:07)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Kimi wa Motto Dekiru (HKT48)\n2 Hayaokuri Calendar (HKT48)\n3 Hitsuzensei (IZ4648)" , imageReg: "https://pbs.twimg.com/media/HQHQCg6k7O0.jpg?format=jpg&name=large"},
    { id: "Sindy_BNK48", name: "Sindy", expectation: "Center (1, 13, 25) หรือ Kami 7 (1-7)", band: "BNK48", team: "Team NV", gen:"4", songs: ["Nagiichi (NMB48)", "Hoshi ga Kienai Uchi ni (AKB48)", "Oh My God! (NMB48)"] , postUrl: "https://x.com/bnk48official/status/2087227658602184806", applicationText: "ซินดี้–กฤตชญา อุดมบุญดี (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 12 สิงหาคม 2026 (00:07)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Nagiichi (NMB48)\n2 Hoshi ga Kienai Uchi ni (AKB48)\n3 Oh My God! (NMB48)" , imageReg: "https://pbs.twimg.com/media/HQf0KhYg1tA.jpg?format=jpg&name=large"},
    { id: "Wawa_BNK48", name: "Wawa", expectation: "อันดับ 21 หรือ อันดับ 21", band: "BNK48", team: "Team BIII", gen:"4", songs: ["Moto Kare Desu (AKB48)", "Nagori Zakura (AKB48)", "Suki-ish (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2083124081801703634", applicationText: "วาว่า–พิมพ์นเรศ ลำใย (BNK48 Team BIII) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 31 กรกฎาคม 2026 (16:19)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Moto Kare Desu (AKB48)\n2 Nagori Zakura (AKB48)\n3 Suki-ish (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQhmmO2T0rs.jpg?format=jpg&name=large"},
    { id: "Yoghurt_BNK48", name: "Yoghurt", expectation: "Kami 7 (1-7) หรือ Senbatsu (1-12)", band: "BNK48", team: "Team NV", gen:"3", songs: ["Sentimental Train (AKB48)", "Everyday, Kachuusha (AKB48)", "Kimi wa Motto Dekiru (HKT48)"] , postUrl: "https://x.com/bnk48official/status/2087755860835795418", applicationText: "โยเกิร์ต–นพรดา เลิศวิริยะพร (BNK48 Team NV) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 13 สิงหาคม 2026 (01:27)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Sentimental Train (AKB48)\n2 Everyday, Kachuusha (AKB48)\n3 Kimi wa Motto Dekiru (HKT48)" , imageReg: "https://pbs.twimg.com/media/HQ5GOmG7h10.jpg?format=jpg&name=large"},
];

// ── CGM48 (21 candidates) ───────────────────────────────────────────────────
const cgm48: Ge2026Candidate[] = [
    { id: "Chifa_CGM48", name: "Chifa", expectation: "Next Girls (25-36)", band: "CGM48", team: "Trainee", gen:"5", songs: ["Yumemite Gomen (AKB48)", "1!2!3!4! Yoroshiku! (SKE48)", "Ano sa, Iya Betsu ni… (NGT48)"] , postUrl: "https://x.com/bnk48official/status/2082663362987774148", applicationText: "ชิฟา–จิณห์นิภา จงพุ่ม (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 30 กรกฎาคม 2026 (09:09)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Yumemite Gomen (AKB48)\n2 1!2!3!4! Yoroshiku! (SKE48)\n3 Ano sa, Iya Betsu ni… (NGT48)" , imageReg: "https://pbs.twimg.com/media/HQ3nQ8T7Bt4.jpg?format=jpg&name=large"},
    { id: "Else_CGM48", name: "Else", expectation: "อันดับ 13", band: "CGM48", team: "Team C", gen:"4", songs: ["Kuchibiru ni Be My Baby (AKB48)", "Time Machine Fuyouron (AKB48)", "Igai ni Mango (SKE48)"] , postUrl: "https://x.com/bnk48official/status/2087441595381772623", applicationText: "เอลฟ์–อนัญญา กุศลครอง (CGM48 Team C) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 12 สิงหาคม 2026 (13:13)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Kuchibiru ni Be My Baby (AKB48)\n2 Time Machine Fuyouron (AKB48)\n3 Igai ni Mango (SKE48)" , imageReg: "https://pbs.twimg.com/media/HQv5AeIegq8.jpg?format=jpg&name=large"},
    { id: "Emma_CGM48", name: "Emma", expectation: "อันดับ 22", band: "CGM48", team: "Trainee", gen:"2", songs: ["74-Okubun no 1 no Kimi e (HKT48)", "Sherbet Pink (NGT48)", "Hoshi ga Kienai Uchi ni (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2083769773872288142", applicationText: "เอมม่า–ศศิชา วงศ์วัฒนอนันต์ (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 2 สิงหาคม 2026 (11:11)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 74-Okubun no 1 no Kimi e (HKT48)\n2 Sherbet Pink (NGT48)\n3 Hoshi ga Kienai Uchi ni (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQnSaIu4f0Y.jpg?format=jpg&name=large"},
    { id: "Ginna_CGM48", name: "Ginna", expectation: "Next Girls (25-36)", band: "CGM48", team: "Team C", gen:"2", songs: ["Ano sa, Iya Betsu ni… (NGT48)", "Utsukushii Inazuma (SKE48)", "Cinderella Nante Inai (HKT48)"] , postUrl: "https://x.com/bnk48official/status/2084133548903276917", applicationText: "จีนน่า–มัญชุภา มูลกลาง (CGM48 Team C) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 3 สิงหาคม 2026 (10:59)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Ano sa, Iya Betsu ni… (NGT48)\n2 Utsukushii Inazuma (SKE48)\n3 Cinderella Nante Inai (HKT48)" , imageReg: "https://pbs.twimg.com/media/HQy79KMFQH0.jpg?format=jpg&name=large"},
    { id: "Hongyok_CGM48", name: "Hongyok", expectation: "อันดับ 27", band: "CGM48", team: "Trainee", gen:"4", songs: ["Suki! Suki! Skip! (HKT48)", "Nagiichi (NMB48)", "Sentimental Train (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2082361395774145020", applicationText: "หงษ์หยก–หงษ์หยก ควรประดิษฐ์ (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 29 กรกฎาคม 2026 (13:27)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Suki! Suki! Skip! (HKT48)\n2 Nagiichi (NMB48)\n3 Sentimental Train (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQYYvR3M3Rk.jpg?format=jpg&name=large"},
    { id: "Jingjing_CGM48", name: "Jingjing", expectation: "อันดับ 13", band: "CGM48", team: "Team C", gen:"2", songs: ["Seishun no Deadline (NMB48)", "Sandal da ze (SKE48)", "Cecile (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2082518214354059322", applicationText: "จิงจิง–อรัญญา แก้วมาลัย (CGM48 Team C) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 30 กรกฎาคม 2026 (00:07)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Seishun no Deadline (NMB48)\n2 Sandal da ze (SKE48)\n3 Cecile (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQfJ9kGzXyE.jpg?format=jpg&name=large"},
    { id: "Kwan_CGM48", name: "Kwan", expectation: "อันดับ 25", band: "CGM48", team: "Team C", gen:"3", songs: ["Romance Kenjuu (AKB48 Team B)", "12-Byou (HKT48)", "Hoshi ga Kienai Uchi ni (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2085771438884356136", applicationText: "ขวัญ–ธิดาทิพย์ จิระพันธุ์ (CGM48 Team C) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 7 สิงหาคม 2026 (22:14)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Romance Kenjuu (AKB48 Team B)\n2 12-Byou (HKT48)\n3 Hoshi ga Kienai Uchi ni (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQ8ro5kRlyI.jpg?format=jpg&name=large"},
    { id: "Lewlew_CGM48", name: "Lewlew", expectation: "Next Girls (25-36)", band: "CGM48", team: "Trainee", gen:"5", songs: ["Sentimental Train (AKB48)", "Suki! Suki! Skip! (HKT48)", "Sustainable (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2084136281114546367", applicationText: "หลิวหลิว–ณัฐณิชา เลิศเกียรติคุณ (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 3 สิงหาคม 2026 (11:25)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Sentimental Train (AKB48)\n2 Suki! Suki! Skip! (HKT48)\n3 Sustainable (AKB48)" , imageReg: "https://pbs.twimg.com/media/HOBCS8ZqhnM.jpg?format=jpg&name=large"},
    { id: "Lingling_CGM48", name: "Lingling", expectation: "อันดับ 13", band: "CGM48", team: "Team C", gen:"3", songs: ["Chikai no ni Hanareteru (AKB48)", "Ano sa, Iya Betsu ni… (NGT48)", "Suki-ish (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2082020545793806526", applicationText: "หลิงหลิง–ศิรตรีทิพย์ พนาชนาภัทร์ (CGM48 Team C) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 28 กรกฎาคม 2026 (14:44)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Chikai no ni Hanareteru (AKB48)\n2 Ano sa, Iya Betsu ni… (NGT48)\n3 Suki-ish (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQ1kLIn0U0A.jpg?format=jpg&name=large"},
    { id: "Lookked_CGM48", name: "Lookked", expectation: "senbatsu (dekkool susu)", band: "CGM48", team: "Team C", gen:"2", songs: ["Wataridoritachi ni Sora wa Mienai (NGT48)", "Cinderella Nante Inai (HKT48)", "Boku Datte Naichau yo (NMB48)"] , postUrl: "https://x.com/bnk48official/status/2085225898362737036", applicationText: "ลูกเกด–พิมพ์ลภัส สุวรรณน้อย (CGM48 Team C) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 6 สิงหาคม 2026 (11:11)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Wataridoritachi ni Sora wa Mienai (NGT48)\n2 Cinderella Nante Inai (HKT48)\n3 Boku Datte Naichau yo (NMB48)" , imageReg: "https://pbs.twimg.com/media/HQ2g4jQ4v7A.jpg?format=jpg&name=large"},
    { id: "Namphet_CGM48", name: "Namphet", expectation: "อันดับ 25", band: "CGM48", team: "Trainee", gen:"5", songs: ["Sekai no Hito e (NGT48)", "Hatsukoi Shijou Shugi (NMB48)", "Boku Datte Naichau yo (NMB48)"] , postUrl: "https://x.com/bnk48official/status/2085335487225659883", applicationText: "น้ำเพชร–เพชรไพลิน มากมี (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 6 สิงหาคม 2026 (18:19)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Sekai no Hito e (NGT48)\n2 Hatsukoi Shijou Shugi (NMB48)\n3 Boku Datte Naichau yo (NMB48)" , imageReg: "https://pbs.twimg.com/media/HQ0uF7ZNjDY.jpg?format=jpg&name=large"},
    { id: "Nana_CGM48", name: "Nana", expectation: "อันดับ เจ็ด , 7 , seven , 七 , ๗ , Nana", band: "CGM48", team: "Team C", gen:"2", songs: ["Labrador Retriever (AKB48)", "Ganbaranuwai (NMB48)", "Sentimental Train (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2084093819109458029", applicationText: "นานา–เพ็ญพิชญา บุญเสนอ (CGM48 Team C) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 3 สิงหาคม 2026 (04:56)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Labrador Retriever (AKB48)\n2 Ganbaranuwai (NMB48)\n3 Sentimental Train (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQ3wEwA5dXQ.jpg?format=jpg&name=large"},
    { id: "Nisha_CGM48", name: "Nisha", expectation: "อันดับ 25", band: "CGM48", team: "Team C", gen:"4", songs: ["Donchou wo Agete Kure! (AKB48)", "Sou Yuu Toko Aru yo ne? (SKE48)", "Pin to Kita (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2082415534902321578", applicationText: "นิชา–ณัฏฐณิชา สุภาพงษ์ (CGM48 Team C) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 29 กรกฎาคม 2026 (17:13)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Donchou wo Agete Kure! (AKB48)\n2 Sou Yuu Toko Aru yo ne? (SKE48)\n3 Pin to Kita (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQ4vA6CjsP0.jpg?format=jpg&name=large"},
    { id: "Ploen_CGM48", name: "Ploen", expectation: "Kami 7 (1-7)", band: "CGM48", team: "Team C", gen:"3", songs: ["Sekai no Hito e (NGT48)", "Nagori Zakura (AKB48)", "Kokoro no Placard (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2085638424774754757", applicationText: "เพลิน–ปณลี อักษรวนิช (CGM48 Team C) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 7 สิงหาคม 2026 (14:46)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Sekai no Hito e (NGT48)\n2 Nagori Zakura (AKB48)\n3 Kokoro no Placard (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQz9sHk9T8Y.jpg?format=jpg&name=large"},
    { id: "Prae_CGM48", name: "Prae", expectation: "Center (1, 13, 25) หรือ Front Member", band: "CGM48", team: "Team C", gen:"3", songs: ["Shisou de Shinai Kiss (NGT48)", "SNS WORLD (HKT48)", "Donchou wo Agete Kure! (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2082469408203473211", applicationText: "แพร–ณัฐภรณ์ ภิญโญยิ่ง (CGM48 Team C) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 29 กรกฎาคม 2026 (20:48)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Shisou de Shinai Kiss (NGT48)\n2 SNS WORLD (HKT48)\n3 Donchou wo Agete Kure! (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQ1s12ga5Q4.jpg?format=jpg&name=large"},
    { id: "Praifa_CGM48", name: "Praifa", expectation: "อันดับ 25", band: "CGM48", team: "Trainee", gen:"4", songs: ["Yasai Sisters (AKB48)", "Hayaokuri Calendar (HKT48)", "Yumemite Gomen (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2082385290078126308", applicationText: "ปลายฟ้า–กวินตรา คีรีสัตยกุล (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 29 กรกฎาคม 2026 (15:26)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Yasai Sisters (AKB48)\n2 Hayokuri Calendar (HKT48)\n3 Yumemite Gomen (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQ0O9rPlsV0.jpg?format=jpg&name=large"},
    { id: "Punpon_CGM48", name: "Punpon", expectation: "Next Girls (25-36)", band: "CGM48", team: "Trainee", gen:"5", songs: ["Hoshi ga Kienai Uchi ni (AKB48)", "Durian Shounen (NMB48)", "Cecile (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2082362823062217022", applicationText: "ปันผล–พัชรสรณ์ เก่งทางดี (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 29 กรกฎาคม 2026 (13:33)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Hoshi ga Kienai Uchi ni (AKB48)\n2 Durian Shounen (NMB48)\n3 Cecile (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQ_8B6ivZlo.jpg?format=jpg&name=large"},
    { id: "Satangpound_CGM48", name: "Satangpound", expectation: "อันดับ 25 (26-1)", band: "CGM48", team: "Trainee", gen:"4", songs: ["Ima, Happy (AKB48)", "Houtte Okenai yo Unicorn (SKE48)", "Seishun wa Hazukashii (SKE48)"] , postUrl: "https://x.com/bnk48official/status/2082379097649647649", applicationText: "สตางค์ปอนด์–เมธัสสินี อ่าวตระกูล (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 29 กรกฎาคม 2026 (14:49)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Ima, Happy (AKB48)\n2 Houtte Okenai yo Unicorn (SKE48)\n3 Seishun wa Hazukashii (SKE48)" , imageReg: "https://pbs.twimg.com/media/HQ5dVg9Zg4Q.jpg?format=jpg&name=large"},
    { id: "Shenae_CGM48", name: "Shenae", expectation: "อันดับ 25", band: "CGM48", team: "Trainee", gen:"5", songs: ["Shoot Sign (AKB48)", "Juuryoku Sympathy (AKB48 Team Surprise)", "Sasameyuki Regret (AKB48 Team K)"] , postUrl: "https://x.com/bnk48official/status/2082063172811571492", applicationText: "ชีเน่–ปวริศา สิงห์เพ็ชร (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 28 กรกฎาคม 2026 (18:08)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Shoot Sign (AKB48)\n2 Juuryoku Sympathy (AKB48 Team Surprise)\n3 Sasameyuki Regret (AKB48 Team K)" , imageReg: "https://pbs.twimg.com/media/HQePwXwF3uM.jpg?format=jpg&name=large"},
    { id: "Tara_CGM48", name: "Tara", expectation: "อันดับ 25", band: "CGM48", team: "Trainee", gen:"4", songs: ["Kokoro no Placard (AKB48)", "Love Jump (AKB48 Team B)", "Christmas ga Ippai (AKB48 Team K)"] , postUrl: "https://x.com/bnk48official/status/2086663891233431684", applicationText: "ธารา–ธารา โฆเกียรติมานนท์ (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 10 สิงหาคม 2026 (10:10)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Kokoro no Placard (AKB48)\n2 Love Jump (AKB48 Team B)\n3 Christmas ga Ippai (AKB48 Team K)" , imageReg: "https://pbs.twimg.com/media/HQ0V8Sg8a4I.jpg?format=jpg&name=large"},
    { id: "Valentine_CGM48", name: "Valentine", expectation: "อันดับ 25", band: "CGM48", team: "Trainee", gen:"4", songs: ["Biisan wa Naze Nakunaru no ka? (HKT48)", "Hansode Tenshi (HKT48)", "Nagori Zakura (AKB48)"] , postUrl: "https://x.com/bnk48official/status/2082685033652134018", applicationText: "วาเลนไทน์–รัญชนา คีรีสัตยกุล (CGM48 Trainee) ได้ลงสมัคร BNK48 & CGM48 Senbatsu General Election 2026 เมื่อวันที่ 30 กรกฎาคม 2026 (11:09)\n\n[เพลงที่ผู้สมัครต้องการเป็นเซ็นเตอร์]\n1 Biisan wa Naze Nakunaru no ka? (HKT48)\n2 Hansode Tenshi (HKT48)\n3 Nagori Zakura (AKB48)" , imageReg: "https://pbs.twimg.com/media/HQ2ZgYBpf9I.jpg?format=jpg&name=large"},
];

export const ge2026Candidates: Ge2026Candidate[] = [...bnk48, ...cgm48];

export function getGe2026CandidateById(id: string): Ge2026Candidate | undefined {
    return ge2026Candidates.find((c) => c.id === id);
}

// =============================================================================
// ── Song metadata ────────────────────────────────────────────────────────────
// =============================================================================
//
// Generated from ge2026-song-meta_reviewed.csv.
//
// Matching against the existing candidate song strings (e.g. songStats from
// ge2026SongEngine) is done by *normalized song title* — see
// normalizeGe2026SongTitle() below, which strips a trailing "(Band Name)"
// suffix so "Suki-ish (AKB48)" and "Suki-ish" both resolve to the same entry.
//
// links.* fields are left as null on purpose — this file only sets up the
// data shape. Fill in a real URL string (e.g. a YouTube Music watch link)
// for any song once you have it; the UI will only render a button for
// platforms that have a non-null value. Same for imageUrl: drop in a single
// cover art URL once available and the song card / modal will use it
// automatically instead of the placeholder icon.

export interface Ge2026SongLinks {
  youtube: string | null;
  spotify: string | null;
  apple: string | null;
}

export interface Ge2026SongMeta {
  songTitle: string;
  band: string;
  singleNo: string | null;
  singleName: string | null;
  release: string | null;
  note: string | null;
  imageUrl: string | null;
  links: Ge2026SongLinks;
}

export const ge2026SongMeta: Ge2026SongMeta[] = [
  {
    songTitle: "Hoshi ga Kienai Uchi ni",
    band: "AKB48",
    singleNo: "AKB48 63rd Single",
    singleName: "Colorcon Wink",
    release: "2024.03.13",
    note: "B-side (U-20 Senbatsu)",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/c/c0/AKB4863rdLA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=3Xjv2yi3cps&si=qySLOp-F59gHhn7i", spotify: "https://open.spotify.com/track/7Jjpt8s7d1Sm3lq3ljRPq9?si=88062b51da8a4e6c", apple: "https://music.apple.com/th/song/hoshiga-kienaiuchini/1733398948" },
  },
  {
    songTitle: "Ano Natsu no Bouhatei",
    band: "AKB48",
    singleNo: "AKB48 61st Single",
    singleName: "Doushitemo Kimi ga Suki da",
    release: "2023.04.26",
    note: "B-side (Kenkyuusei)",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/f/f2/AKB4861stLC.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=_utk9Xn0WGY&si=q6q3MIcZphJE3SOG", spotify: "https://open.spotify.com/track/4ij50AuhyA1zGqY95sJEyF?si=544a0b16b0144f0e", apple: "https://music.apple.com/th/song/anonatsuno-bouhatei/1681939942" },
  },
  {
    songTitle: "Suki-ish",
    band: "AKB48",
    singleNo: "AKB48 68th Single",
    singleName: "Suki-ish",
    release: "2026.08.19",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/5/5c/AKB4868thA.jpeg",
    links: { youtube: "https://music.youtube.com/watch?v=IT2X9ZtjHoI&si=RuPFZj2UXeX2FGRM", spotify: "https://open.spotify.com/track/1a7HYK6N9yKYqy4tOkHBxC?si=103c9d0d55ae4cc7", apple: "https://music.apple.com/th/album/sukish/6789484797?i=6789484803" },
  },
  {
    songTitle: "Ano sa, Iya Betsu ni…",
    band: "NGT48",
    singleNo: "NGT48 9th Single",
    singleName: "Ano sa, Iya Betsuni...",
    release: "2023.08.02",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/b/b4/NGT489thA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=yNtQmpFFJPg&si=fw3oirF-rScftsKT", spotify: "https://open.spotify.com/track/5HTBSOQoDyX1fmeto2xJt1?si=3cb86cc96caa487b", apple: "https://music.apple.com/th/album/anosa-iyabetsuni/1695857231?i=1695857235" },
  },
  {
    songTitle: "Hayaokuri Calendar",
    band: "HKT48",
    singleNo: "HKT48 11th Single",
    singleName: "Hayaokuri Calendar",
    release: "2018.05.02",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/c/c1/HKT4811thA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=E3LWp35TJ9A&si=Oht7ZPT4j7GhCzVx", spotify: "https://open.spotify.com/track/4NNNnP85sSFeRisg9P4Z6y?si=ea772ea703e94ad1", apple: "https://music.apple.com/th/music-video/hayaokuri-calendar/1378783605" },
  },
  {
    songTitle: "Seishun no Deadline",
    band: "NMB48",
    singleNo: "NMB48 32nd Single",
    singleName: "Seishun no Deadline",
    release: "2025.11.12",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/a/ac/NMB48_32nd_RA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=5GhdeAIxwxs&si=EEAJhMq6kU8DDmS7", spotify: "https://open.spotify.com/track/0xPmw717BMEauKEnaS7WIR?si=7ed871d91df24afd", apple: "https://music.apple.com/th/album/seishun-no-deadline/1850620602?i=1850620603" },
  },
  {
    songTitle: "Nagori Zakura",
    band: "AKB48",
    singleNo: "AKB48 67th Single",
    singleName: "Nagori Zakura",
    release: "2026.02.25",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/e/e5/AKB4867thA.jpeg",
    links: { youtube: "https://music.youtube.com/watch?v=Aw2NpveLOFs&si=FCGWsdsMzcK3lHrm", spotify: "https://open.spotify.com/track/1Fmz9ddcD55ZBrFdvW9Tuu?si=9ff1d3531f8a412f", apple: "https://music.apple.com/th/album/nagorizakura/1871393804?i=1871393810" },
  },
  {
    songTitle: "Sustainable",
    band: "AKB48",
    singleNo: "AKB48 56th Single",
    singleName: "Sustainable",
    release: "2019.09.18",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/b/b5/SustainableLimA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=0pKfxbCHLoU&si=Ad-0PRDs1CU_7kOh", spotify: "https://open.spotify.com/track/6RGhPL4YjqXhrBdPwhUs0B", apple: null },
  },
  {
    songTitle: "Sentimental Train",
    band: "AKB48",
    singleNo: "AKB48 53rd Single",
    singleName: "Sentimental Train",
    release: "2018.09.19",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/1/17/AKB48SentimentalLimA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=YAMF5Rypnrs&si=bEXCblRl1-xdAhNe", spotify: "https://open.spotify.com/track/6q3qkY1ixozDMRf4zcRqW5", apple: "https://music.apple.com/th/music-video/sentimental-train/1436172324" },
  },
  {
    songTitle: "Kuchibiru ni Be My Baby",
    band: "AKB48",
    singleNo: "AKB48 42nd Single",
    singleName: "唇にBe My Baby",
    release: "2015.12.09",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/b/b2/AKB48_-_Kuchibiru_ni_Be_My_Baby_Type_A.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=hfnCAjE8LsU&si=vsj-1y-rKxGlZjmi", spotify: "https://open.spotify.com/track/1ab56jWv0Igxr4gFe6AUCv", apple: "https://music.apple.com/th/album/kuchibiru-ni-be-my-baby/1194926814?i=1194926822" },
  },
  {
    songTitle: "Everyday, Kachuusha",
    band: "AKB48",
    singleNo: "AKB48 21st Single",
    singleName: "Everyday, Kachuusha",
    release: "2011.05.25",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/d/d2/Everyday.jpg",
    links: { youtube: "https://www.youtube.com/watch?v=vEVq_Bx7_KY", spotify: "https://open.spotify.com/track/6CJ3V6MRmcsjlJHZ48J5Ud", apple: "https://music.apple.com/jp/album/everyday-%E3%82%AB%E3%83%81%E3%83%A5%E3%83%BC%E3%82%B7%E3%83%A3/557508596?i=557508608" },
  },
  {
    songTitle: "Kokoro no Placard",
    band: "AKB48",
    singleNo: "AKB48 37th Single",
    singleName: "Kokoro no Placard",
    release: "2014.08.27",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/f/fe/AKB48_Kokoro_no_Placard_LimA.jpeg",
    links: { youtube: "https://music.youtube.com/watch?v=JhokU8SlmNg&si=qYN8QO9cLo93mDC7", spotify: "https://open.spotify.com/track/5ki1rwuKiQby52DL9udM0Z", apple: "https://music.apple.com/th/album/kokoro-no-placard/906251544?i=906251546" },
  },
  {
    songTitle: "Nagiichi",
    band: "NMB48",
    singleNo: "NMB48 4th Single",
    singleName: "Nagiichi",
    release: "2012.05.09",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/a/a8/608px-Typeanagiichi.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=XjuHFHxwvGI&si=PDqaFunGECw72Vhb", spotify: "https://open.spotify.com/track/5WstjKWPy74tf9G5YEkMz5", apple: "https://music.apple.com/th/album/%E3%83%8A%E3%82%AE%E3%82%A4%E3%83%81/785798544?i=785798553" },
  },
  {
    songTitle: "Yumemite Gomen",
    band: "AKB48",
    singleNo: "AKB48 64th Single (Koi Tsun Jatta)",
    singleName: "Koi Tsun Jatta",
    release: "2024.07.17",
    note: "B-side (U-21 Senbatsu)",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/6/62/AKB4864thLA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=ZbPCvL59yjA&si=Xv6awXl2-PqOVksw", spotify: "https://open.spotify.com/track/0S4HYtThzFzrgV0pVCmQ6E", apple: "https://music.apple.com/th/album/yumemite-gomen/1755714988?i=1755714992" },
  },
  {
    songTitle: "Juuryoku Sympathy",
    band: "AKB48 Team Surprise",
    singleNo: "Team Surprise 1st Stage (Theater song)",
    singleName: "Juuryoku Sympathy",
    release: "2012.09.12",
    note: "Team Surprise 1st Stage",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/9/9c/Team_Surprise_Juuryoku_Sympathy_Album_Cover.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=TIuZrE7dFs0&si=aqbBHVbELCVsWy9Q", spotify: "https://open.spotify.com/track/4ARFytHS8jZEE4phl1EpyU", apple: null },
  },
  {
    songTitle: "Hitsuzensei",
    band: "IZ4648",
    singleNo: "AKB48 55th Single (Jiwaru DAYS)",
    singleName: "Jiwaru DAYS",
    release: "2019.03.13",
    note: "B-side (IZ4648)",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/7/7d/JiwaruDaysLimC.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=sHiwHA33kPM&si=FPuTOikv7BQagCej", spotify: "https://open.spotify.com/track/1yxrDxKrnaKJWH6txyzGam", apple: "https://music.apple.com/th/album/hitsuzensei/1455054499?i=1455054502" },
  },
  {
    songTitle: "Sandal da ze",
    band: "SKE48",
    singleNo: "SKE48 36th Single",
    singleName: "Sandal Daze",
    release: "2026.03.18",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/b/b3/SKE4836thLA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=W-zR3045KPg&si=9sRWNqRn9xJSO_Pn", spotify: "https://open.spotify.com/track/4fX1yBO8oNZtQdEL6fIBwN", apple: "https://music.apple.com/th/album/sandarudaze/1872873618?i=1872873619" },
  },
  {
    songTitle: "Flying Get",
    band: "AKB48",
    singleNo: "AKB48 22nd Single",
    singleName: "Flying Get",
    release: "2011.08.24",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/2/29/AKB48_-_Flying_Get_lim_A.jpg",
    links: { youtube: "https://www.youtube.com/watch?v=WdhMjzfg6-k", spotify: "https://open.spotify.com/track/1BRnzFvrMsgJNjmDLnZ3Nh", apple: "https://music.apple.com/th/album/flying-get/454121897?i=454121925" },
  },
  {
    songTitle: "Wataridoritachi ni Sora wa Mienai",
    band: "NGT48",
    singleNo: "NGT48 8th Single",
    singleName: "Wataridoritachi ni Sora wa Mienai",
    release: "2022.12.28",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/1/15/NGT488thA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=N2UNXRsw5Eg&si=5kTZoU7Qa0t-xlcd", spotify: "https://open.spotify.com/track/5JNDBIlIJmJLacWz4uJbpw?si=317df01a656b438d", apple: "https://music.apple.com/th/album/wataridoritachini-sorahamienai/1656338078?i=1656338083" },
  },
  {
    songTitle: "Boku Datte Naichau yo",
    band: "NMB48",
    singleNo: "NMB48 19th Single",
    singleName: "Boku Datte Naichau yo",
    release: "2018.10.17",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/9/90/NMB4819thLimA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=h52EITY0YoU&si=6Fyu9y7Ugcdssq4O", spotify: "https://open.spotify.com/track/67zmO5h6MVkU89a6Y2A4QD?si=395c30b5c0b24aff", apple: "https://music.apple.com/th/album/bokudattenaichauyo/1672482606?i=1672482777" },
  },
  {
    songTitle: "Suki! Suki! Skip!",
    band: "HKT48",
    singleNo: "HKT48 1st Single",
    singleName: "Suki! Suki! Skip!",
    release: "2013.03.20",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/6/6d/HKTA.jpeg",
    links: { youtube: "https://music.youtube.com/watch?v=SUjvUN0vztY&si=g-UmC0JkfHM4CFt8", spotify: "https://open.spotify.com/track/4e09UVV8FRsRxC7NLEV3Up", apple: "https://music.apple.com/th/album/suki-suki-skip/1445028394?i=1445028554" },
  },
  {
    songTitle: "Shoot Sign",
    band: "AKB48",
    singleNo: "AKB48 47th Single",
    singleName: "Shoot Sign",
    release: "2017.03.15",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/6/6b/SSlimitedA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=sIgawh0g-PI&si=pGI6mWCl-VOAIT85", spotify: "https://open.spotify.com/track/1tDHgM62yjxovGQGCjB9qe", apple: "https://music.apple.com/th/album/shoot-sign/1209929602?i=1209929603" },
  },
  {
    songTitle: "Sherbet Pink",
    band: "NGT48",
    singleNo: "NGT48 5th Single",
    singleName: "Sherbet Pink",
    release: "2020.07.01",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/3/31/NGT485thA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=fv927dm26ws&si=UjcIToWWfLItv498", spotify: "https://open.spotify.com/track/3DcbT5l4EaiTtVoERjabZf", apple: "https://music.apple.com/th/album/sherbet-pink/1522392146?i=1522392154" },
  },
  {
    songTitle: "Durian Shounen",
    band: "NMB48",
    singleNo: "NMB48 12th Single",
    singleName: "Durian Shounen",
    release: "2015.07.15",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/1/18/DorianShounenA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=gTtz-dqj0fs&si=3H5ApCjK138H02sf", spotify: "https://open.spotify.com/track/0IqHWxlv6fPJxYiuC5DqYj", apple: null },
  },
  {
    songTitle: "Time Machine Fuyouron",
    band: "AKB48",
    singleNo: "AKB48 65th Single (Masaka no Confession)",
    singleName: "Masaka no Confession",
    release: "2025.04.02",
    note: "B-side (Universe Girls)",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/1/15/AKB4865thShop.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=UntVeKpdLP8&si=dNw2ox_NeMNEIEz_", spotify: "https://open.spotify.com/track/0j5I8uGxtYqoU8cbqM6iDA", apple: "https://music.apple.com/th/album/time-machine-fuyouron/1801123832?i=1801125128" },
  },
  {
    songTitle: "Moto Kare Desu",
    band: "AKB48",
    singleNo: "AKB48 59th Single",
    singleName: "Moto Kare Desu",
    release: "2022.05.18",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/f/f9/AKB48MotoKareDesuLimA.jpg",
    links: { youtube: "https://music.apple.com/th/album/motokare-desu/1617986141?i=1617986143", spotify: "https://open.spotify.com/track/1fnWrWpDw3gPRJBC9Zw4Mm?si=9a8a60bd42614480", apple: "https://music.apple.com/th/album/motokare-desu/1617986141?i=1617986143" },
  },
  {
    songTitle: "Utsukushii Inazuma",
    band: "SKE48",
    singleNo: "SKE48 12th Single",
    singleName: "Utsukushii Inazuma",
    release: "2013.07.17",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/7/7e/AVCD-48757.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=uxxzQ-uEPnE&si=J4nhgYqcs-ATTDi5", spotify: "https://open.spotify.com/track/0NdrL18VKLgnkKiduDb1dX?si=cc37f67ee6a74dcc", apple: "https://music.apple.com/th/album/utsukushii-inazuma/668955954?i=668956130" },
  },
  {
    songTitle: "UZA",
    band: "AKB48",
    singleNo: "AKB48 28th Single",
    singleName: "UZA",
    release: "2012.10.31",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/d/d4/20121010_akb48_uza_typea.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=WIdWXhV33vs&si=9KnF35SS9F3dOQuT", spotify: "https://open.spotify.com/track/0xmKLoOyMB76T0C5FCOPQz", apple: "https://music.apple.com/th/album/uza/570124917?i=570125037" },
  },
  {
    songTitle: "12-Byou",
    band: "HKT48",
    singleNo: "HKT48 5th Single",
    singleName: "12-Byou",
    release: "2015.04.22",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/6/68/12ByoA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=aI20JvHedIs&si=-7MqSKt0d6GY4PAq", spotify: "https://open.spotify.com/track/7589aZ7kiqj3KXzCnhlzNZ?si=fe2eff7fb7dd476c", apple: null },
  },
  {
    songTitle: "Hansode Tenshi",
    band: "HKT48",
    singleNo: "HKT48 19th Single",
    singleName: "Hansode Tenshi",
    release: "2025.07.23",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/4/47/HKT4819thA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=rjNP-vzdp6A&si=gsVawJFrb-nLEE5a", spotify: "https://open.spotify.com/track/3Ua6NloSy94uBapS9PXysh?si=3c4d837056164af4", apple: "https://music.apple.com/th/album/hansodetenshi/1822769897?i=1822769898" },
  },
  {
    songTitle: "Hachinosu Dance",
    band: "AKB48 Team 8",
    singleNo: "AKB48 52nd Single (Teacher Teacher)",
    singleName: "Teacher Teacher",
    release: "2018.05.30",
    note: "B-side (Team 8)",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/5/57/TeacherTeacherTheater.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=twjhHOYJe0A&si=wTaGaHDoL4s3aBmY", spotify: "https://open.spotify.com/track/7cLBuTgnDqzcxUZ3ZUn5lw?si=35dcc79a76df473c", apple: "https://music.apple.com/th/album/hachi-no-su-dance-team-8/1384376269?i=1384376274" },
  },
  {
    songTitle: "Ue Kara Mariko",
    band: "AKB48",
    singleNo: "AKB48 24th Single",
    singleName: "Ue Kara Mariko",
    release: "2011.12.07",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/e/e5/704px-AKBMarikoA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=-7YJkt-4R1A&si=hke1mV5LPuTSZcXH", spotify: "https://open.spotify.com/track/0vsgOfTLFru6SBOLl3MQPr", apple: "https://music.apple.com/th/album/ue-kara-mariko/480588541?i=480588542" },
  },
  {
    songTitle: "Sou Yuu Toko Aru yo ne?",
    band: "SKE48",
    singleNo: "SKE48 26th Single",
    singleName: "Sou Yuu Toko Aru yo ne?",
    release: "2014.03.19",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/a/a0/SKE4826thLimA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=nAJrs6Or_bI&si=janR1vpSqKAs1U31", spotify: null, apple: "https://music.apple.com/th/album/soyutokoaruyone/1492893173?i=1492893174" },
  },
  {
    songTitle: "Ganbaranuwai",
    band: "NMB48",
    singleNo: "NMB48 30th Single",
    singleName: "Ganbaranuwai",
    release: "2015.11.25",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/7/77/NMB4830thA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=DBZyaVcvg3Y&si=Ca0wrebJQ-xHSQBl", spotify: "https://open.spotify.com/track/47ALKR2duTbXAlff7dBnnz?si=850c3b1c1b084482", apple: "https://music.apple.com/th/album/ganbaranuwai/1769634856?i=1769635050" },
  },
  {
    songTitle: "Biisan wa Naze Nakunaru no ka?",
    band: "HKT48",
    singleNo: "HKT48 15th Single",
    singleName: "Biisan wa Naze Nakunaru no ka?",
    release: "2016.09.07",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/6/6c/HKT4815thA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=cTncJH7ro-w&si=MJted9si7PWKkWEm", spotify: null, apple: "https://music.apple.com/th/album/bisan-wa-naze-nakunarunoka/1625051605?i=1625051607" },
  },
  {
    songTitle: "Love Jump",
    band: "AKB48 Team B",
    singleNo: "AKB48 19rd Single",
    singleName: "Love Jump",
    release: "2010.03.24",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/2/21/600px-Chancenojunban-B.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=SjgsrGut__k&si=Q-Ojv3JdrUtMJC_e", spotify: "https://open.spotify.com/album/18m3oAEgFx8qm6eMHb6Qns?si=VhSJWx5fRuSUv07vqVgeTw", apple: "https://music.apple.com/th/music-video/love-jump-uta-team-b/440114421" },
  },
  {
    songTitle: "Kimi wa Motto Dekiru",
    band: "HKT48",
    singleNo: "HKT48 16th single",
    singleName: "Kimi wa Motto Dekiru",
    release: "2023.02.08",
    note: "Special",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/5/5d/HKT4816thA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=7ObGKlzoZkY&si=9k2CUHERIMCcD-OA", spotify: "https://open.spotify.com/track/1eVN4dA89T2AAKWdT0yrNs?si=3b671f85e0724e74", apple: "https://music.apple.com/th/album/kimiwa-mottodekiru/1667689715?i=1667689717" },
  },
  {
    songTitle: "Cinderella Nante Inai",
    band: "HKT48",
    singleNo: "HKT48 14th single",
    singleName: "Kimi to Doko ka e Ikitai",
    release: "2019.05.11",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/5/58/HKT4814thSingleSpecialEdition.jpg",
    links: { youtube: null, spotify: "https://open.spotify.com/track/2bOC7d0zbDwgHh28bGT04S?si=1083aaa841124dde", apple: "https://music.apple.com/th/album/cinderella-nante-inai/1564209103?i=1564209234" },
  },
  {
    songTitle: "Cecile",
    band: "AKB48",
    singleNo: "AKB48 67th Single (Nagori Zakura)",
    singleName: "Nagori Zakura",
    release: "2026.02.25",
    note: "B-side (Type-A)",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/e/e5/AKB4867thA.jpeg",
    links: { youtube: "https://music.youtube.com/watch?v=Aw2NpveLOFs&si=MoeLQpRr2NjijH4V", spotify: "https://open.spotify.com/track/1Fmz9ddcD55ZBrFdvW9Tuu?si=36cbee3fca544f3b", apple: "https://music.apple.com/th/album/nagorizakura/1871393804?i=1871393810" },
  },
  {
    songTitle: "Sekai no Hito e",
    band: "NGT48",
    singleNo: "NGT48 4st Single",
    singleName: "Sekai no Hito e",
    release: "2017.04.12",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/d/d0/NGT484thSingleTypeA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=j34jWQ0CTD4&si=6PyJ2H30UPTRawwi", spotify: "https://open.spotify.com/track/5wcE1l2oXNp1L1xAWXgEzb?si=9aa987df78b64ecc", apple: "https://music.apple.com/th/album/sekainohitoe/1536027096?i=1536027098" },
  },
  {
    songTitle: "Donchou wo Agete Kure!",
    band: "AKB48",
    singleNo: "AKB48 1st Stage",
    singleName: "AKB48 1st Stage",
    release: "2025.12.16",
    note: "Special",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/4/4c/AKB48_18th_Stage_Koko_Kara_Da_SRC.png",
    links: { youtube: "https://music.youtube.com/watch?v=YFQ4A_3Tdvs&si=D2wcPBDaaM7MQnPa", spotify: "https://open.spotify.com/track/4cvaCaawE873ZPr4snvEBp?si=6feedfc4a3404923", apple: "https://music.apple.com/th/album/donchouo-agetekure/1856281426?i=1856281700" },
  },
  {
    songTitle: "Namida no Seesaw Game",
    band: "AKB48",
    singleNo: "AKB48 17th Single",
    singleName: "Heavy Rotation",
    release: "2010.08.18",
    note: "B-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/9/95/700px-HeavyRotationA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=U1_7sqZa0wk&si=mMkQqqytg7I5Oh38", spotify: "https://open.spotify.com/track/36wII4gn093VTa8WMT956F?si=04ad9620dd534086", apple: "https://music.apple.com/th/music-video/namida-no-seesaw-game-uta-under-girls/398207973" },
  },
  {
    songTitle: "Tick tack zack",
    band: "SKE48",
    singleNo: "SKE48 34th Single",
    singleName: "Tick tack zack",
    release: "2025.03.12",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/7/7b/SKE4834thTheater.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=hukoGXW9KNw&si=ufS6DJtd3ilaamiN", spotify: "https://open.spotify.com/track/3YreelreNxPprx5rbwviJA?si=049b17d23466407f", apple: "https://music.apple.com/th/album/tick-tack-zack/1798606838?i=1798606839" },
  },
  {
    songTitle: "Zettai Inspiration",
    band: "SKE48",
    singleNo: "SKE48 30th Single",
    singleName: "Zettai Inspiration",
    release: "2015.03.31",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/8/81/SKE30T.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=JoSjHx2qsbg&si=VyvazUDXSuhxJZBf", spotify: "https://open.spotify.com/track/56Bhh9dPIuLLKuXgQc8BQI", apple: "https://music.apple.com/th/music-video/zettai-inspiration/1646034102" },
  },
  {
    songTitle: "Bokura no Eureka",
    band: "NMB48",
    singleNo: "NMB48 7th Single",
    singleName: "Bokura no Eureka",
    release: "2013.06.19",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/d/d2/Eureka1.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=4eUBKrczjIg&si=GCnUC_UqNoka9kJv", spotify: null, apple: null },
  },
  {
    songTitle: "Kokuhaku Shinpakusuu",
    band: "SKE48",
    singleNo: "SKE48 33rd Single",
    singleName: "Kokuhaku Shinpakusuu",
    release: "2024.10.02",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/8/85/SKE4833LA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=X2XAf_x7ws0&si=neGDKc1KskmDhUyG", spotify: "https://open.spotify.com/album/4Z1DRWaacP5YPfo1w1atLL?si=MvtJBUf0QPmWWkslhtcUVg", apple: "https://music.apple.com/th/album/kokuhakushinpakusu/1763774201?i=1763774202" },
  },
  {
    songTitle: "Osaekirenai Shoudou",
    band: "AKB48",
    singleNo: "AKB48 46th single",
    singleName: "High Tension",
    release: "2021.12.08",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/4/40/HighTensionLimA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=YoUPK9wlHC4&si=hWfcXoKI889LIaPC", spotify: "https://open.spotify.com/track/1lyYtGeL8hebmRbg1hn3mg?si=4fa8a36947134bb6", apple: "https://music.apple.com/th/song/osaekirenai-shoudou/1169940619" },
  },
  {
    songTitle: "Overtake",
    band: "AKB48 Team A",
    singleNo: "AKB48 first original album",
    singleName: "Koko ni Ita Koto",
    release: "2016.02.18",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/9/98/AKB48_-_Koko_ni_Ita_Koto_reg.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=HWxHoRn3n_M&si=Mrg4jN1X_EHN3kqN", spotify: "https://open.spotify.com/track/0AP7hKSkPTDmvjZeErHTTf?si=cf0f9de70454439b", apple: "https://music.apple.com/my/song/overtake-team-a/1529845183" },
  },
  {
    songTitle: "Suzukake no Ki no Michi de...",
    band: "AKB48",
    singleNo: "AKB48 34th Single",
    singleName: "Suzukake no Ki no Michi de...",
    release: "2013.12.11",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/2/2d/SuzukakeT.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=A-uBTtBdxyQ&si=XTV0yejuAMD4W2-U", spotify: "https://open.spotify.com/track/3h2pM0j1NjmedWqIgJFUSh?si=08eb5adf89bf40f1", apple: "https://music.apple.com/th/album/suzukake-no-ki-no-michi-de-kimi-no-hohoemi-wo-yume/765361954?i=765361957" },
  },
  {
    songTitle: "Manatsu no Sounds good !",
    band: "AKB48",
    singleNo: "AKB48 26th Single",
    singleName: "Manatsu no Sounds good !",
    release: "2012.05.23",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/0/04/20120418_akb48_manatsu_limited_A.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=MBuJ5R2KBKo&si=kACqtPFVZTozLRXb", spotify: "https://open.spotify.com/track/6sOkBtbkO04iZCsrsmEEqR", apple: "https://music.apple.com/th/album/manatsu-no-sounds-good/1542299186?i=1542299346" },
  },
  {
    songTitle: "Kiss wa Matsu Shikanai no deshou ka?",
    band: "HKT48",
    singleNo: "HKT48 10th Single",
    singleName: "Kiss wa Matsu Shikanai no deshou ka?",
    release: "2017.02.15",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/f/fa/HKT4810thTheater.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=DPZVAiObKOE&si=O2-kJEoNpIAHwdkM", spotify: "https://open.spotify.com/track/79WstEMUylIx1atjIXOtRF?si=70906fcaf96e46e7", apple: "https://music.apple.com/th/album/kiss-wa-matsushika-nainodesyouka/1445033708?i=1445033937" },
  },
  {
    songTitle: "Sekai wa Doko Made Aozora na no ka?",
    band: "NGT48",
    singleNo: "NGT48 2nd Single",
    singleName: "Sekai wa Doko Made Aozora na no ka?",
    release: "2017.12.06",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/6/69/CD_Only_Sekai_wa_Doko_Made_Aozora_na_no_ka.jpg",
    links: { youtube: "https://music.youtube.com/playlist?list=OLAK5uy_lBIFexRIBVtv_iInCaDJ6spsfH9biGhyI&si=iDl5NYXcVWyR1ijm", spotify: "https://open.spotify.com/track/4ZxoCkJGI4MmdBJEv9IObK?si=49b49225a9ce4545", apple: "https://music.apple.com/th/album/sekai-ha-dokomade-aozara-nanoka/1535979598?i=1535979601" },
  },
  {
    songTitle: "Romantic Junbichuu",
    band: "AKB48 Team A",
    singleNo: "AKB48 52th single",
    singleName: "Teacher Teacher",
    release: "2018.05.30",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/5/58/TeacherTeacherALim.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=mf3q-Ar1I2s&si=-Q6LPNhv1LX9ViPb", spotify: "https://open.spotify.com/track/0tTByAASUY2t8pBEaVSa1P?si=f41d08d0c72d45ce", apple: "https://music.apple.com/th/album/romantic-junbichu-team-a/1383122261?i=1383122269" },
  },
  {
    songTitle: "Mazariau Mono",
    band: "Nogizaka AKB",
    singleNo: "AKB48 43rd Single",
    singleName: "Kimi wa Melody",
    release: "2016.03.09",
    note: "A-side ( Nogizaka AKB)",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/5/5a/AKB48_-_Kimi_wa_Melody_Type-E_Lim.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=68d_7PpmYhQ&si=kNoPMTde3U-ajHjP", spotify: "https://open.spotify.com/track/5J3ibBxHq4ep9TN3ziJ5qk?si=135aabcff52a409c", apple: "https://music.apple.com/th/album/mazariau-mono/1086544653?i=1086544656" },
  },
  {
    songTitle: "Yokuboumono",
    band: "NMB48",
    singleNo: "NMB48 18th Single",
    singleName: "Yokuboumono",
    release: "2018.04.04",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/9/94/YokubomonoTE.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=VUfMsIB6sJE&si=aDnZzOw8k9qg3RZh", spotify: "https://open.spotify.com/track/0Pe2RG3A9KdccACdiv5PjM?si=674699724a974a0d", apple: "https://music.apple.com/th/album/yokuboumono/1672482606?i=1672482773" },
  },
  {
    songTitle: "Ishi",
    band: "HKT48",
    singleNo: "HKT48 12th Single",
    singleName: "Ishi",
    release: "2019.04.10",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/7/75/HKT4812thA.jpg",
    links: { youtube: null, spotify: "https://open.spotify.com/track/6UcmOKMcdOISoOsKkVo2nI?si=3b2631eaa24f45c5", apple: "https://music.apple.com/th/music-video/ishi/1459090476" },
  },
  {
    songTitle: "Halloween Night",
    band: "AKB48",
    singleNo: "AKB48 41st Single",
    singleName: "Halloween Night",
    release: "2015.08.26",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/a/ac/14518421_f1024.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=1zUFu-aUVW4&si=Ia6j1d8-nL-A9sfb", spotify: "https://open.spotify.com/track/7tZwPsVGv8PEWwmlU63YrL", apple: "https://music.apple.com/th/album/halloween-night/1031429394?i=1031429395" },
  },
  {
    songTitle: "Mousou Girlfriend",
    band: "NMB48",
    singleNo: "NMB48 5th Single",
    singleName: "Virginity,",
    release: "2012.08.08",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/7/71/YRCS-90018.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=TeCIDX2fZZ0&si=kreWDRCbh_kZOVqE", spotify: "https://open.spotify.com/track/0nw510vVgjemQVdqnEdzLB?si=58772b3c72964bcf", apple: "https://music.apple.com/th/album/%E5%A6%84%E6%83%B3%E3%82%AC%E3%83%BC%E3%83%AB%E3%83%95%E3%83%AC%E3%83%B3%E3%83%89/544221065?i=544221137" },
  },
  {
    songTitle: "Neko Allergy",
    band: "AKB48 Team 4",
    singleNo: "AKB48 52nd single",
    singleName: "Teacher Teacher",
    release: "2018.05.30",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/1/12/TeacherTeacherDLim.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=0AFsowWdO9o&si=Aow48aba9xJh4fXa", spotify: "https://open.spotify.com/track/6MCAUevCAr5U5aQaJK0FOm?si=382229f317b24d41", apple: "https://music.apple.com/th/album/neko-allergies-team-4/1384374494?i=1384374499" },
  },
  {
    songTitle: "Shidare Yanagi",
    band: "NMB48",
    singleNo: "NMB48 25th Single",
    singleName: "Shidare Yanagi",
    release: "2021.06.16",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/2/2b/NMB48_25th_Single_Type-A.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=QOLmFzM48Zk&si=uWFPIFYYB6zl0qEM", spotify: "https://open.spotify.com/track/5FA0kHnV7IoQu8D9VkCfc2?si=c5c7196e078e49b0", apple: "https://music.apple.com/th/album/shidareyanagi/1672482606?i=1672482795" },
  },
  {
    songTitle: "Oh My God!",
    band: "NMB48",
    singleNo: "NMB48 2nd Single",
    singleName: "Oh My God!",
    release: "2011.10.19",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/8/8b/NMB48_-_Oh_My_God%21_A.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=ty6bKRNh6oE&si=Zm0ql2vZkxU6GWQP", spotify: "https://open.spotify.com/track/1IfGLhgwu1NzknVt9Hjy0E", apple: "https://music.youtube.com/watch?v=ty6bKRNh6oE&si=m51Weke0svLxFtSI" },
  },
  {
    songTitle: "1!2!3!4! Yoroshiku!",
    band: "SKE48",
    singleNo: "SKE48 4th Single",
    singleName: "1!2!3!4! Yoroshiku!",
    release: "2010.11.7",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/3/31/News_large_SKE48_tsujoA_JK.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=UGn0lVGgopo&si=pKluW1TYlfSxoVUL", spotify: "https://open.spotify.com/track/4oFFTp2DdymJEl7NfZbmiy", apple: "https://music.apple.com/th/album/1-2-3-4-yoroshiku/401824314?i=401824316" },
  },
  {
    songTitle: "Igai ni Mango",
    band: "SKE48",
    singleNo: "SKE48 21th Single",
    singleName: "Igai ni Mango",
    release: "2017.07.19",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/8/89/SKE48InM_Theater.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=IlQdymvnFAg&si=_BZswUDnekNAeywM", spotify: "https://open.spotify.com/track/3LMVBwBu6TD37AhiOQLSql?si=d38cb36111fc4ce3", apple: null },
  },
  {
    songTitle: "74-Okubun no 1 no Kimi e",
    band: "HKT48",
    singleNo: "HKT48 7th Single",
    singleName: "74-Okubun no 1 no Kimi e",
    release: "2016.04.13",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/8/8d/74okubunCDOnly.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=tSlJDGQKAMA&si=ZW1RhggaxjqLYJiK", spotify: "https://open.spotify.com/track/4W81NsjSTD9fhAEseyJiGL?si=faaf21c11e244ffc", apple: "https://music.apple.com/th/album/74okubunno1no-kimie/1444851100?i=1444851525" },
  },
  {
    songTitle: "Romance Kenjuu",
    band: "AKB48 Team B",
    singleNo: "AKB48 31st Single",
    singleName: "Sayonara Crawl",
    release: "2013.05.22",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/9/98/AKB48_-_Sayonara_Crawl_Type-B_Lim.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=3XMX3BTNKF4&si=MhSqMuD55whew1F2", spotify: "https://open.spotify.com/track/0YiTGi8J5p1BAvdpnV3wGf?si=547ec52f0c8643ff", apple: "https://music.apple.com/th/music-video/romance-kenju-team-b/657760941" },
  },
  {
    songTitle: "Chikai no ni Hanareteru",
    band: "AKB48",
    singleNo: "AKB48 4th digital single",
    singleName: "Koibito Inai Senshuken / Chikai no ni Hanareteru",
    release: "2021.11.03",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/b/b2/AKB48_Beat_Carnival_Digital.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=P9Rsyyp7Ylc&si=eonSSwCY6hgq6T8_", spotify: "https://open.spotify.com/track/3HddRwEQitMHE8mo8EyGr5?si=0a00b388f72d417b", apple: "https://music.apple.com/th/album/chikainoni-hanareteru/1591553085?i=1591553088" },
  },
  {
    songTitle: "Hatsukoi Shijou Shugi",
    band: "NMB48",
    singleNo: "NMB48 22nd Single",
    singleName: "Hatsukoi Shijou Shugi",
    release: "2019.11.06",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/0/06/Hatsukoi_Shijo_Shugi_%28Type-A%29.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=YIORXMz4VwE&si=yhY_EFVedUVrIp4W", spotify: "https://open.spotify.com/track/5dvHRx4wDwGroofVjCf4V4?si=f14b2faf91b746a6", apple: "https://music.apple.com/th/album/%E5%88%9D%E6%81%8B%E8%87%B3%E4%B8%8A%E4%B8%BB%E7%BE%A9/1484771111?i=1484771112" },
  },
  {
    songTitle: "Labrador Retriever",
    band: "AKB48",
    singleNo: "AKB48 36th Single",
    singleName: "Labrador Retriever",
    release: "2014.05.21",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/b/b8/LRT.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=tzdhDr4t84I&si=yrbTN25tZqM4E1aR", spotify: "https://open.spotify.com/track/2rvZFJBjmR32BaawshAYVL", apple: "https://music.apple.com/th/album/labrador-retriever/955709931?i=955709950" },
  },
  {
    songTitle: "Pin to Kita",
    band: "AKB48",
    singleNo: "AKB48 64th single",
    singleName: "Koi Tsunjatta",
    release: "2024.07.17",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/6/62/AKB4864thLA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=zGkK7tywYiA&si=4aKuCb91XmblTDbQ", spotify: "https://open.spotify.com/track/737tzjFw2TXwpjk3oKYe8u?si=399dadc3951343b8", apple: "https://music.apple.com/th/album/pinto-kita/1755714988?i=1755714998" },
  },
  {
    songTitle: "Shisou de Shinai Kiss",
    band: "NGT48",
    singleNo: "NGT48 1st Album",
    singleName: "Mikansei no Mirai",
    release: "2021.06.21",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/3/36/MikanseinoMiraiRegA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=YoKAK6fETfU&si=EbPgkOcy0X27ND0w", spotify: "https://open.spotify.com/track/3x6TwRaL35TkM1HFh4C0Ht?si=3ee2bab6c7a84def", apple: "https://music.apple.com/th/album/shisoude-shinai-kiss/1628764979?i=1628765346" },
  },
  {
    songTitle: "SNS WORLD",
    band: "HKT48",
    singleNo: "HKT48 2nd Album",
    singleName: "Outstanding",
    release: "2021.12.01",
    note: "Special",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/e/e3/HKT48OutstandingTypeA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=XdVkd-YFLKU&si=BFbNjfoyvS7fzY20", spotify: "https://open.spotify.com/track/1E9KqSUYe1f9aZcJ4M9a7P?si=cca8a5ef900d4cb5", apple: "https://music.apple.com/th/album/sns-world/1594824006?i=1594825266" },
  },
  {
    songTitle: "Yasai Sisters",
    band: "AKB48",
    singleNo: "AKB48 17th single",
    singleName: "Heavy Rotation",
    release: "2010.08.18",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/9/95/700px-HeavyRotationA.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=pizw3Wf8MHM&si=oMP68Ja22wY9EKgh", spotify: "https://open.spotify.com/track/4xFPZhLEXZXcoRqcBy3fnS?si=ee61c64e68be465b", apple: "https://music.apple.com/th/album/yasai-sisters/385919647?i=385919651" },
  },
  {
    songTitle: "Ima, Happy",
    band: "AKB48",
    singleNo: "AKB48 38th single",
    singleName: "Kibouteki Refrain",
    release: "2014.11.26",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/e/e9/Kibouteki_Refrain_Limited_A.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=zs5m3CUZga8&si=-98lo1jZlnLFgimZ", spotify: "https://open.spotify.com/track/5bAOkUY3D9f66XgI76FRef?si=2181cabb2ad34e4a", apple: "https://music.apple.com/th/album/ima-happy-baragumi/935156303?i=935156311" },
  },
  {
    songTitle: "Houtte Okenai yo Unicorn",
    band: "SKE48",
    singleNo: "SKE48 36th Single (Sandal Daze)",
    singleName: "Sandal Daze",
    release: "2016.09.07",
    note: "B-side (Shirogumi)",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/c/c7/SKE4836thLB.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=vIn7B_swLg4&si=FJRUZTFch2v-fGbz", spotify: "https://open.spotify.com/track/3OH9PrhrWy6uHF5vp74cCO?si=33c868b51ced4e4a", apple: "https://music.apple.com/th/album/houtteokenaiyo-unicorn/1877591366?i=1877591759" },
  },
  {
    songTitle: "Seishun wa Hazukashii",
    band: "SKE48",
    singleNo: "SKE48 4th Single",
    singleName: "1!2!3!4! YOROSHIKU!",
    release: "2010.11.17",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/0/0b/News_large_SKE48_tsujoB_JK.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=7lLFy0i4ik4&si=K_QGiv62Lq-A2Ela", spotify: "https://open.spotify.com/track/52JB3fzsBR1mjypSc6F7Gu?si=a51503e6191546dd", apple: "https://music.apple.com/th/album/seisyunwahazukashii/401824314?i=401824318" },
  },
  {
    songTitle: "Sasameyuki Regret",
    band: "AKB48 Team K",
    singleNo: "AKB48 33rd single",
    singleName: "Heart Ereki",
    release: "2013.10.30",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/9/9e/Tumblr_mu70iuaJLi1s2ve5uo3_1280.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=TmEJ1X677Rc&si=X9R_tP-iDPvorfgs", spotify: "https://open.spotify.com/track/2zZEmO3R26mh203msW97fb?si=1b8293e040b84b70", apple: "https://music.apple.com/th/album/sasameyuki-regret-oshima-team-k/720674463?i=720674609" },
  },
  {
    songTitle: "Christmas ga Ippai",
    band: "AKB48 Team K",
    singleNo: "AKB48 Team K 3rd Stage",
    singleName: "Team K 3rd Stage Studio Recording Collection",
    release: "2013.01.09",
    note: "A-side",
    imageUrl: "https://static.wikia.nocookie.net/akb48/images/d/de/Team_K_3rd_Stage_Record_Collection.jpg",
    links: { youtube: "https://music.youtube.com/watch?v=R-9_Q7TZBjI&si=Js_gf9oZofHYvEeL", spotify: "https://open.spotify.com/track/3KTwCCOey5AQd4x6389EsL?si=8b7d449632ed4010", apple: "https://music.apple.com/th/album/christmas-ga-ippai-team-k-ver/1536122654?i=1536122665" },
  },
];

// Strips a trailing "(...)" group and normalizes case/whitespace so that
// song strings stored on candidates (which may carry a "(Band)" suffix,
// e.g. "Biisan wa Naze Nakunaru no ka? (HKT48)") match the clean titles in
// this file (e.g. "Biisan wa Naze Nakunaru no ka?").
export function normalizeGe2026SongTitle(title: string): string {
  return title
    .replace(/\s*\([^)]*\)\s*$/, "")
    .trim()
    .toLowerCase();
}

const ge2026SongMetaByTitle = new Map<string, Ge2026SongMeta>(
  ge2026SongMeta.map((entry) => [
    normalizeGe2026SongTitle(entry.songTitle),
    entry,
  ]),
);

/**
 * Looks up metadata for a song by title. Accepts either the clean title or
 * a title with a trailing "(Band)" suffix — both normalize to the same key.
 * Returns null if this song isn't in the reviewed CSV yet.
 */
export function getGe2026SongMeta(rawTitle: string): Ge2026SongMeta | null {
  return ge2026SongMetaByTitle.get(normalizeGe2026SongTitle(rawTitle)) ?? null;
}

/**
 * Unique bands present in the song catalogue, sorted by how many songs
 * each band has (most first). Powers the left-hand band filter.
 */
export function getGe2026SongBandCounts(): Array<{
  band: string;
  count: number;
}> {
  const counts = new Map<string, number>();
  for (const entry of ge2026SongMeta) {
    counts.set(entry.band, (counts.get(entry.band) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([band, count]) => ({ band, count }))
    .sort((a, b) => b.count - a.count);
}

// =============================================================================
// ── Event config (plugin registration) ──────────────────────────────────────
// =============================================================================
//
// Colors below are pulled 1:1 from the global design tokens (:root in the
// site's SCSS) rather than the group colors (--c-bnk / --c-cgm), since this
// event covers both BNK48 and CGM48 and isn't tied to a single brand color.

export const eventConfig: UnifiedEventConfig = {
    id: "ge2026",
    type: "election",
    rounds: "auto",
    data: [],
    plugin: {
        slug: "ge2026",
        name: "BNK48 & CGM48 General Election 2026",
        primaryColor: "#fc809f",
        primaryHover: "#fb4774",
        theme: {
            primary: "#fc809f",
            primaryHover: "#fb4774",
            bg: "#F7F7F8",
            surface: "#f4ebef",
            surfaceAlt: "#e7e7e7",
            border: "#D8D8DA",
            content: "#222233",
            textMuted: "#000000"
        },
        features: {
            election: {
                enabled: true,
                pageTitle: "BNK48 & CGM48 General Election 2026 - Niya BNK48's",
                description: "รายชื่อเมมเบอร์ที่ลงสมัคร และ รายชื่อเพลงที่เมมเบอร์สมัตร ภายใน BNK48 & CGM48 Senbatsu General Election 2026",
                storageKey: "ge-2026",
                listingImage: "/img/GE-2026.jpeg",
                heroImage: "/img/GE-2026.jpeg",
                officialLink: "https://www.facebook.com/share/p/14peJucrDuj/",
            }
        }
    }
};

export default eventConfig;