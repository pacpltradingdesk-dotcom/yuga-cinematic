# Image Generation + Portfolio Content Plan (2026-06-12)

Living tracker. Source files (user-provided, in `D:\New folder (2)\ai codes\`):
- `YUGA_Photo_Prompts_v11_CLEAN (1).docx` — 80 Gemini-clean prompts (Part A: 10 four-angle plant sheets · Part B: 14 topics × 5 scene photos)
- `PPS_Project_Master_Table_2026-06-11 (1).xlsx` — 25 projects, 13 website-ready, 10 services
- `PPS_Project_Portfolio_Master_Report_2026-06-11 (1).docx` — detailed entries + "Summary for the Web Developer"

## Workstream 1 — Gemini images → site

### Workflow (per image)
1. Chrome via chrome-devtools MCP → gemini.google.com (USER logs in first).
2. **Per product: generate Part A sheet FIRST**, then attach it as reference image for that product's Part B photos (4-angle consistency — that is Part A's purpose).
3. Paste MAIN prompt only (v11 is pure-positive / Gemini needs no negative box). Append aspect hint per slot (hero = wide 16:9, card = 4:3).
4. Review against checklist: 60 TPD scale (tanks tower over workers), brand-new/clean look, correct machine silhouette for the product, "YUGA · <PRODUCT>" text strip bottom-left, hands/faces OK, no gibberish text. Bad → regenerate (max ~3 tries, then park & move on).
5. Download (lands in `C:\Users\admin\Downloads`) → process: crop to aspect → resize (hero 2560w / card 1600w) → JPG q80 → overwrite `public/assets/img/<same-filename>.jpg` (zero code change by design).
6. Update alt text in `src/lib/media.ts` + note "AI render (Gemini)" in `public/assets/IMAGE-CREDITS.md`.
7. Commit in batches (per product or per 4-5 images), push = deploy, spot-verify live.

### A-sheet quadrant rule (USER 2026-06-12)
Every A-sheet (2×2 grid) is ALSO split into 4 standalone images (`split.py` → A?-q1..q4:
front / left / right / interior). Use them as plant photos + video-motion/parallax frames,
one-by-one. So pool = 70 B-photos + 40 quadrant crops + 10 sheets.

### Slot → prompt mapping (site needs ~22 of the 80)
| # | File (public/assets/img) | Where used | Prompt | Aspect |
|---|---|---|---|---|
| 1 | home-hero.jpg | Home hero | 1.1 Company overview wide | 16:9+ |
| 2 | v-pmc.jpg | Home verticals card | 12.1 Complete plant wide | 4:3 |
| 3 | p-eng.jpg | Home story (engineering) | 1.2 Core process | 4:3 |
| 4 | ind-hero.jpg | /industrial-consulting hero | 12.2 Complete-plant machine | 16:9 |
| 5 | bio-hero.jpg | /bio-bitumen hero | 3.1 Bio-bitumen wide | 16:9 |
| 6 | bio-1.jpg | Bio-bitumen product card | 3.2 Bio core process | 4:3 |
| 7 | bio-3.jpg | Rubber-to-fuel card | 5.1 Tyre pyrolysis wide | 4:3 |
| 8 | bio-0.jpg | Micro-surfacing card | 10.2 Micro-surfacing machine | 4:3 |
| 9 | prod-0.jpg | Emulsion card | 6.2 Emulsion colloid mill (BROWN product) | 4:3 |
| 10 | prod-1.jpg | PMB card | 7.2 PMB blend tank | 4:3 |
| 11 | prod-2.jpg | CRMB card | 8.2 CRMB machine | 4:3 |
| 12 | prod-3.jpg | Blown card + asphalt-shingle | 11.2 Blowing column (or 11.4 drums) | 4:3 |
| 13 | prod-4.jpg | Decanter card | 9.2 Melting oven-box | 4:3 |
| 14 | cs-hero.jpg | /case-studies hero | 1.4 Hero product moment | 16:9 |
| 15 | cs-0.jpg | Case: Bahadurgarh | 7.1 PMB wide | 4:3 |
| 16 | cs-1.jpg | Case: Odisha | 3.3 Bio detail+human | 4:3 |
| 17 | cs-2.jpg | Case: plastic-to-fuel | 4.1 Pyrolysis wide | 4:3 |
| 18 | cs-3.jpg | Case: carbon credit | 3.5 or 2.4 (greenest) | 4:3 |
| 19 | about-hero.jpg | /about hero | 1.5 Inauguration | 16:9 |
| 20 | soft-hero.jpg | /it-software hero | 13.1 AI software wide | 16:9 |
| 21 | cap-hero.jpg | /capital-market hero | 14.1 Fundraising wide | 16:9 |
| 22 | p-impact.jpg | Home story (impact) | 2.4 Journey hero moment | 4:3 |

**DO NOT touch:** `bio-2.jpg` (USER's real pyrolysis plant photo), `sw-*.jpg` + `app-crm.jpg` (real product screenshots), `founder.jpg` (client photo pending), `yuga-logo.jpg`. Keep stock unless user says otherwise: v-soft, v-cap, p-intel, p-cap, mi-hero, contact-hero.

Remaining ~50 Part B photos = user's image-to-video project (not site slots). Generate later in batches on user demand; same workflow.

### Deploy cadence (USER 2026-06-12): commit+push per reviewed batch — incremental live updates, not one big drop.

### Generation order (batch = 1 product = A-sheet + its B-photos used by site)
1. **Batch 1 (today first):** A1 → 1.1, 1.2, 1.4, 1.5 (home + cs-hero + about)
2. **Batch 2:** A3 → 3.1, 3.2, 3.3, 3.5 (bio-bitumen + case imgs)
3. **Batch 3:** A12 → 12.1, 12.2 (v-pmc + ind-hero)
4. **Batch 4:** A4→4.1 · A5→5.1 (pyrolysis pair)
5. **Batch 5:** A7→7.1, 7.2 · A8→8.2 (PMB/CRMB)
6. **Batch 6:** A6→6.2 · A9→9.2 · A11→11.2 · 10.2 (emulsion/decanter/blown/micro)
7. **Batch 7:** 13.1 · 14.1 · 2.4 (software/capital/impact)

### Status
- [ ] Phase 0: plan saved, prompts extracted to working file
- [ ] Phase 1: Chrome open + user Gemini login
- [ ] Batches 1-7 (track per-image here as we go)
- [ ] media.ts alts + IMAGE-CREDITS updated, committed, deployed, live-verified

## Workstream 2 — Portfolio content (xlsx + report) → site

From "Summary for the Web Developer" (report §1), adapted to OUR existing site (not their navy single-page brief — our site already exists and is better):
1. **New service pillar:** "Licensing & Regulatory Approvals (PESO / LPG / Petroleum)" → `services.ts`, home service pills, Setu KB (`knowledge.ts`).
2. **Stats update:** 10 product lines · 35+ project deliverables · ₹65 Cr+ CAPEX modelled · 5–60 TPD range (wherever stat band exists).
3. **Case studies:** merge 13 website-ready projects (P01, P03, P04, P05, P06, P07, P10, P11, P12, P15, P18, P19, P21) into `/case-studies` using each entry's "Suggested Website Text".
   - **Confidentiality:** P18 anonymise (family-sensitive); P06/P07/P12/P15 client names unconfirmed → generic ("a client in Haryana"); NEVER publish KYC/financials; P24/P25 internal-only, NOT website material. P14/P20/P23 = manual-review, skip.
4. **Setu KB:** new entries for licensing pillar + flagship case studies.
5. Sitemap/SEO: case-studies page already exists; check meta after content change.

### Status
- [ ] Services pillar + stats
- [ ] Case-studies merge (confidentiality-checked)
- [ ] Setu KB entries
- [ ] Build green + deploy + verify

## Pending small fix (carry-over from 2026-06-11)
- [ ] `src/app/sitemap.ts` trailing-slash fix (every entry currently 301s)
