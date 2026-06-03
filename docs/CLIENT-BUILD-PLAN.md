# YUGA — Client Build Plan (living doc)

**Created:** 2026-06-03 · **Owner:** autonomous build · **Status:** IN PROGRESS
Source: 2 client WhatsApp notes (2026-06-03) + prior pending items.
Update the checkboxes as work lands. Nothing here is thrown away until shipped.

## Decisions (made autonomously — client said "tumhare hisab se", no re-asking)
1. **"MD → Key Person":** Change every "Managing Director" / "M.D" title to **"Key Person"**.
   Keep founder *name* (Prince Pratap Shah) — it anchors the brand (princeshah.com).
2. **"Company Name Ø":** Replace specific company brand names in the career timeline
   (Omnipotent, Southern Asphalt, Tiki Tar, Krush Tar, Teknobit) with **generic
   references** = role + plant type + location + years. Keeps credibility, drops names.
3. **Pricing:** Add **indicative min–avg ranges** as placeholders in the data layer,
   each marked "Indicative". Client swaps real numbers later (one data edit).
4. **Carbon credit / licenses / plants-count / land:** Build the **structure + representative
   indicative data** sourced from existing catalog + domain norms, all marked "Indicative —
   verify". Client fills real figures in `src/data/*` / `src/lib/*` without touching components.
5. **AI Assistance:** Ship a **static catalog-search assistant** (rule-based, runs in the
   browser over catalog.json) now. Full LLM/RAG chatbot stays Phase-5 (needs server).

---

## PHASE A — Prior pending (carry-over)
- [ ] A1. Commit existing sitemap + pnpm-deploy fixes (already in working tree)
- [ ] A2. SEO polish: per-page OG images, BreadcrumbList + Product JSON-LD on product pages
- [ ] A3. Env vars — documented in README (secrets are client's to set; can't hardcode)
- [ ] A4. Founder portrait — keep graceful gradient fallback (no real photo available)

## PHASE B — Global edits (Image 1: top list + About)
- [ ] B1. "M.D / Managing Director" → "Key Person" sitewide (site.ts + components)
- [ ] B2. Founder experience 17 → 25 years; anonymize company names in career timeline
- [ ] B3. Social media links surfaced in Footer (from catalog.social / site.ts)
- [ ] B4. IT-Software page: add images (media.ts slots + page wiring)

## PHASE C — New data layer (single source of truth)
- [ ] C1. `src/lib/carbon.ts` — carbon-credit info + claim-process steps
- [ ] C2. `src/lib/licenses.ts` — applicable licences & permissions (product × state)
- [ ] C3. `src/lib/deliverables.ts` — documents we provide (list, drawings, working list)
- [ ] C4. `src/lib/plants.ts` — approx plants running (product, state-wise)
- [ ] C5. `src/lib/pricing.ts` — software / PMC / capital-market pricing (min–avg) + research report ₹5L
- [ ] C6. `src/lib/services.ts` — Joint Venture (domestic/intl), Collaborations, Job work
- [ ] C7. Land requirement (product × capacity) — extend from calc tiers' `area`

## PHASE D — New components & sections
- [ ] D1. `CarbonCredit.tsx` — hero strip + product-wise block + claim-process steps
- [ ] D2. `ClientJourney.tsx` — pipeline: identify → feasibility → funding → implementation
        → valuation/fundraise → sale & marketing (home + about)
- [ ] D3. `PricingTable.tsx` — software/PMC/capital min–avg pricing
- [ ] D4. Product page additions: licences, land, docs/deliverables, plants-count, carbon block
- [ ] D5. Capital-market: funding-process summary (IPO / VC / bank)
- [ ] D6. `Services.tsx` — JV / Collaboration / Job work + Research report (₹5L onwards)
- [ ] D7. AI Assistance widget — static catalog-search assistant (`AiAssistant.tsx`)

## PHASE E — Verify & ship
- [ ] E1. `pnpm build` (GITHUB_PAGES) green; sitemap includes any new routes
- [ ] E2. Screenshot key pages; sanity-check on localhost
- [ ] E3. Commit in logical conventional-commit chunks

---

## Open data the CLIENT must finalise later (tracked, not blocking)
- Real pricing numbers (software/PMC/capital) — placeholders shipped
- Real licence lists per product/state — indicative shipped
- Real plant counts per state — indicative shipped
- Social media account URLs — placeholders/`#` until accounts exist
- Web3Forms/GA4/Clarity/Turnstile keys — set in deploy env
- Founder photo — drop at /public/assets/img/founder.jpg
- Legal effective date + company-secretary review
