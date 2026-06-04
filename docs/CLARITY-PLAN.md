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
- [x] 3.1 `Breadcrumbs.tsx` — visible trail; wired into `/products/[slug]` (via a new
      `crumbs` prop on PageHero) and `/legal/[slug]` (replaced the bare "back to home").
- [x] 3.2 `/explore` "Start Here" page — "by goal" router (plant / fund / software) + a
      full grouped site-map (reuses `navGroups`) + glossary teaser. Linked from nav (Company)
      + footer. Live-tested; "Company" nav highlights as active on it.
- [x] 3.3 "On this page" jump-nav (`OnThisPage.tsx`) on product pages — sticky chip bar
      (Overview · Cost & ROI · Licences · Documents · FAQ), targets `scroll-mt-28`. Live-tested.
- [x] 3.4 `/explore` + `/glossary` enter `sitemap.ts` automatically (added to site.ts `nav`).

## PHASE 4 — Plain-language orientation ✅ DONE (inline-explainer approach)
- [x] 4.1 Widened `SectionHeading` + `PageHero` `intro` to `ReactNode` so jargon can be wrapped
      in `<Term>` without rewriting copy. Wired the densest spots: NHAI/MoRTH (bio-bitumen hero),
      DPR + CMA (capital-market loans). Copy unchanged — terms are now hoverable/tappable.
      (More `<Term>` wraps can be added anywhere over time; the component + glossary are in place.)
- [x] 4.2 Orientation carried by `/explore` "by goal" router + breadcrumbs + jump-nav.

## PHASE 5 — Jargon glossary ✅ DONE
- [x] 5.1 `src/lib/glossary.ts` — 21 typed terms + plain definitions.
- [x] 5.2 `src/components/ui/Term.tsx` — accessible hover/focus/tap tooltip → "More" to glossary.
- [x] 5.3 `/glossary` page — full list, anchored per term (`#id`), live-tested (21 terms).
- [x] 5.4 Wired on the Explore page teaser; `<Term>` is available to wrap terms anywhere.

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
