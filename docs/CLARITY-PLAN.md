# YUGA — Site Clarity Plan ("konsi cheez kahaan hai")

**Created:** 2026-06-04 · **Goal:** make the site self-explanatory — a visitor always knows
where they are, what each area is, and where to go next. No jargon left unexplained.
**Decisions (user-approved):** grouped mega-menu by the 3 verticals · full clarity overhaul.

> Stays within the content/layout rule: all new structure (nav groups, glossary, breadcrumb
> trails, jump-links) lives in `src/lib/*` data; components stay layout-only. Labels are
> data, so the client can rename anything with a one-line edit.

---

## Root cause (from the audit)
The brand's 3-vertical model (Plants · Software · Capital) never reaches the navigation:
8 flat links, 3 of them ("Products", "Bio-Bitumen", "Industrial Consulting") pointing at the
same business, "Bio-Bitumen" living in 3 places, label mismatch vs the homepage, vague
"Market Intel", and unexplained jargon (DPR, PMB, CRMB, VG-30, RPO, CTE/CTO, CMA, MRV…).

---

## PHASE 1 — Navigation: grouped mega-menu  *(biggest win)* ✅ DONE (2026-06-04, live-tested)
- [x] 1.1 `src/lib/nav.ts` — typed `navGroups` (Plants/Software/Capital/Company) + `navFlat`.
      Proposed groups (labels are data — easy to tweak):
      - **Plants ▾** — "Set up & run a bitumen / bio-bitumen plant"
        → All Products (9) · Bio-Bitumen (vertical overview) · Industrial Consulting (7-phase PMC)
      - **Software ▾** — "AI tools that run a bitumen business"
        → Software overview · (key AI products from `software.ts`)
      - **Capital ▾** — "Fund the project — loan, subsidy, equity, IPO"
        → Capital Markets · Funding process · Valuation & DPR/CMA
      - **Company ▾** — "Who we are & proof"
        → About · Case Studies · Market & Research (was "Market Intel") · Contact
- [x] 1.2 `Navbar.tsx` desktop — hover/focus/click mega-menu panels w/ blurb + labelled
      sub-links; `aria-haspopup`/`aria-expanded`, Esc-to-close, closes on route change.
- [x] 1.3 `Navbar.tsx` mobile — flat list replaced with collapsible **accordion groups**.
- [x] 1.4a Software/Capital dropdowns made real via section anchors (#suite, #pricing on
      /it-software; #loans, #routes, #valuation on /capital-market, all with `scroll-mt-28`).
- [ ] 1.4b Bio-Bitumen overlap: still add a note on `/bio-bitumen` linking to the product
      page (menu already labels them distinctly: "Bio-Bitumen" overview vs the product).

## PHASE 2 — Consistent labels & vocabulary
- [ ] 2.1 Align nav labels with the homepage vertical names (or vice-versa) so the same thing
      has ONE name everywhere. Canonical: Plants · Software · Capital · Company.
- [x] 2.2 Renamed "Market Intel" → **"Market & Research"** (menu + footer via site.ts nav).
- [ ] 2.3 Group blurbs (one line each) shown in the mega-menu so each area explains itself.

## PHASE 3 — Wayfinding surfaces
- [ ] 3.1 `src/components/page/Breadcrumbs.tsx` — visible breadcrumb trail (Home › Products ›
      Bio-Bitumen) on deep pages (`/products/[slug]`, `/legal/[slug]`, vertical pages).
      Reuses the data already in the BreadcrumbList JSON-LD.
- [ ] 3.2 New **"Start Here / Explore"** overview page (`/explore`): a human site-map — the 3
      verticals each with their pages, the instant tools, and a "by goal" router
      ("I want to set up a plant" / "…raise funds" / "…use the software"). One screen that
      answers "konsi cheez kahaan hai." Link it from the navbar + footer + homepage hero.
- [ ] 3.3 "On this page" jump-nav (anchor chips) on long pages (product page, vertical pages):
      Overview · Cost & ROI · Land · Licences · Carbon · FAQ — so users jump, not scroll-hunt.
- [ ] 3.4 Add `/explore` + `/glossary` to `sitemap.ts`.

## PHASE 4 — Plain-language orientation
- [ ] 4.1 Audit every `PageHero` intro: rewrite to plainly say *what's on this page and who
      it's for* (most exist; tighten + de-jargon). Data already lives in the page files.
- [ ] 4.2 Short "what you'll find here" line at the top of each vertical landing.

## PHASE 5 — Jargon glossary
- [ ] 5.1 `src/lib/glossary.ts` — typed terms + plain one-line definitions (DPR, PMB, CRMB,
      VG-30, RPO, CTE/CTO, PESO, CMA, MRV, COD, EPR, EOU, SEZ, NHAI/MoRTH…).
- [ ] 5.2 `src/components/ui/Term.tsx` — accessible tooltip (`<button>` + popover, hover/tap,
      keyboard, aria-describedby) that wraps a jargon word and shows its definition inline.
- [ ] 5.3 `/glossary` page — full A–Z list (also the tooltip's "learn more" target).
- [ ] 5.4 Wire the highest-frequency terms on the product + vertical pages (don't over-wrap).

## PHASE 6 — Verify & ship
- [ ] 6.1 `tsc --noEmit` clean (run while dev is up; never `pnpm build` during `pnpm dev`).
- [ ] 6.2 chrome-devtools: desktop mega-menu (mouse + keyboard), mobile accordion, breadcrumbs,
      glossary tooltips, `/explore` + `/glossary` load, all existing routes still 200,
      mobile overflow = 0, zero new console errors.
- [ ] 6.3 Commit in logical conventional-commit chunks (don't push until asked).

---

## Build order (recommended)
P1 (nav) → P3.1 breadcrumbs → P3.2 explore page → P2 labels → P4 intros → P5 glossary → P6.
P1 alone removes ~70% of the confusion; the rest is polish toward "everything clear."

## Open choices the client can tweak later (all data-driven)
Group names/labels, which sub-links appear in each menu, "Market & Research" rename,
glossary term list & wording, whether the overview route is `/explore` or `/start-here`.
