# YUGA — Client Build Plan (living doc)

**Created:** 2026-06-03 · **Owner:** autonomous build · **Status:** BUILD GREEN ✓ · ALL note-page items shipped & committed (Phases A2–A4, B, C, D, E1, E3, F1–F4). Pending: E2 localhost screenshots, push, and client's real data (incl. AI proxy URL).
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
- [x] A1. Commit existing sitemap + pnpm-deploy fixes (already in working tree)
- [x] A2. SEO polish: per-page OG image + canonical + Product/BreadcrumbList/FAQ @graph on product pages
- [x] A3. Env vars documented in root README (all NEXT_PUBLIC_*, graceful-when-unset; secrets client-set)
- [x] A4. Founder portrait — N/A: card uses Track-Record chart, no broken image (graceful by design)

## PHASE B — Global edits (Image 1: top list + About)
- [x] B1. "M.D / Managing Director" → "Key Person" sitewide (site.ts + components)
- [x] B2. Founder experience 17 → 25 years; anonymize company names in career timeline
- [x] B3. Social media links surfaced in Footer (from catalog.social / site.ts)
- [x] B4. IT-Software page: add images (media.ts slots + page wiring)

## PHASE C — New data layer (single source of truth)
- [x] C1. `src/lib/carbon.ts` — carbon-credit info + claim-process steps
- [x] C2. `src/lib/licenses.ts` — applicable licences & permissions (product × state)
- [x] C3. `src/lib/deliverables.ts` — documents we provide (list, drawings, working list)
- [x] C4. `src/lib/plants.ts` — approx plants running (product, state-wise)
- [x] C5. `src/lib/pricing.ts` — software / PMC / capital-market pricing (min–avg) + research report ₹5L
- [x] C6. `src/lib/services.ts` — Joint Venture (domestic/intl), Collaborations, Job work
- [x] C7. `src/lib/land.ts` — land requirement (product × capacity), derived from calc tiers' `area`; surfaced on product page

## PHASE D — New components & sections
- [x] D1. `CarbonCredit.tsx` — hero strip + product-wise block + claim-process steps (home + product page)
- [x] D2. `ClientJourney.tsx` — pipeline: identify → feasibility → funding → implementation
        → valuation/fundraise → sale & marketing (wired on home; about-page reuse optional)
- [x] D3. `PricingTables.tsx` — software/PMC/capital min–avg pricing (home)
- [x] D4. Product page additions: licences (`LicensesPermits`), docs (`Deliverables`), carbon block
- [x] D5. Capital-market: funding-process summary (IPO / VC / bank) — inline on capital-market page
- [x] D6. `Services.tsx` — JV / Collaboration / Job work + Research report (₹5L onwards) (about)
- [x] D7. AI Assistance widget — static catalog-search assistant (`AiAssistant.tsx`) (layout)

## PHASE E — Verify & ship
- [x] E1. `pnpm build` green — 30/30 static pages generated, no errors (2026-06-03)
- [ ] E2. Screenshot key pages; sanity-check on localhost
- [x] E3. Commit in logical conventional-commit chunks (4 commits on feature branch; not pushed)

## PHASE F — AI Assistance full build (user: "sab banado, baad me update")
Static export can't host a server LLM, so we keep the static catalog-search as the
default and add an OPTIONAL LLM upgrade that activates when the client provides an
endpoint — no key hardcoded (security rule), graceful fallback when unset.
- [x] F1. `config.ts` — add `aiEndpoint` (`NEXT_PUBLIC_AI_ENDPOINT`) + `hasAiChat()`
- [x] F2. `AiAssistant.tsx` — conversation UI; when endpoint set, POST {query, context}
        to the client's serverless proxy and render the AI reply; else static search
- [x] F3. Build catalog context (products + FAQs) sent to the endpoint as grounding
- [x] F4. README + env table document `NEXT_PUBLIC_AI_ENDPOINT` and the proxy contract
- [x] F6. Static assistant made genuinely smart (2026-06-04): added `src/lib/knowledge.ts`
        (36-topic bitumen domain KB — VG grades, every product, pyrolysis, cost ladder,
        subsidy, loans/IPO, carbon, market, how-to-start, timelines…) + `src/lib/assistant.ts`
        search engine with fuzzy/typo tolerance, Hinglish synonyms, answer de-dupe and a
        domain-aware fallback that NEVER dead-ends. `AiAssistant.tsx` now layout-only.
        KB also folded into `buildAiContext()` so LLM mode is better grounded too.
        Live-tested via chrome-devtools (typos, Hinglish, gibberish, greetings all handled;
        zero console errors). Fixed a duplicate-React-key bug surfaced during testing.
- [ ] F5. CLIENT later: deploy a serverless proxy (holds the LLM key), set the env var

## PHASE G — Lead generation (user picked "lead-gen / downloads")
Capture the lead BEFORE redirecting to WhatsApp, so a partial enquiry isn't lost.
- [x] G1. `src/lib/leads.ts` — submitLead (Web3Forms email) + leadWaLink fallback
- [x] G2. `src/components/page/LeadGate.tsx` — reusable modal (name+phone+email, DPDP consent)
- [x] G3. Product pages: DPR + brochure CTAs now capture-first via LeadGate
- [x] G4. Market-intelligence: gated "Industry Research Report (₹5L onwards)" section
- [ ] G5. CLIENT later: set `NEXT_PUBLIC_WEB3FORMS_KEY` so leads arrive by email
        (until then LeadGate still works — it routes the lead through WhatsApp)

---

## Open data the CLIENT must finalise later (tracked, not blocking)
- Real pricing numbers (software/PMC/capital) — placeholders shipped
- Real licence lists per product/state — indicative shipped
- Real plant counts per state — indicative shipped
- Social media account URLs — placeholders/`#` until accounts exist
- Web3Forms/GA4/Clarity/Turnstile keys — set in deploy env
- Founder photo — drop at /public/assets/img/founder.jpg
- Legal effective date + company-secretary review
