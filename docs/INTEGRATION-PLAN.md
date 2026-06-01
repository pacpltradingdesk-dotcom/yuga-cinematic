# YUGA_Website_Package → Site Integration Plan

**Created:** 2026-06-01
**Goal:** Port all content, data and tool-logic from `YUGA_Website_Package.zip` into the existing
cinematic Next.js site — **keeping our UI/UX** (graphite-black + amber/cyan, Lenis/GSAP/Framer).
The package's vanilla HTML site is a *reference only*; we re-skin its content into our components.

## Backup (pre-integration)
- Git tag: `backup-pre-package-2026-06-01` (HEAD `38464fb`)
- Branch: `backup/pre-package-integration`
- Zip: `D:\rahul\company\yuga\_backups\p4-site-backup-2026-06-01.zip`
- Inspect copy of package (outside repo): `D:\rahul\company\yuga\_pkg_inspect\`

## Locked decisions
| # | Decision | Locked value |
|---|---|---|
| Design | Theme for tools & product pages | **Our dark cinematic** (amber/cyan) everywhere — override package light theme |
| Routing | Product structure | **New `/products` hub + `/products/[slug]` × 9**; existing verticals stay as service pages |
| Hosting | Dynamic capability | **Static now** (tools + Web3Forms + GA4 work). AI chatbot + backend = Phase 5 (needs Vercel/Cloudflare) |
| Start | Sequencing | **Phase 0 + 1** first (data + tools + product pages) |

## Reconciliation (brand facts)
- **Addresses:** keep REMOVED (per prior session) — do not re-add from package §2. _(default; confirm)_
- **Email spelling:** package client-confirms `ppsanatams` (one 'n') for email/CRM/WhatsApp →
  fix `sales.ppsanantams@gmail.com` → `sales.ppsanatams@gmail.com`. _(default; confirm)_
- **Trust numbers:** keep "verify" framing (G7).

## Architecture mapping
```
products.json          → src/data/catalog.json            (single source of truth, imported)
                       → src/lib/catalog.ts                (typed interfaces + accessors)
7 tools (demo)         → src/components/tools/*.tsx         (client, dark, reuse our primitives)
9 product pages        → src/app/products/page.tsx (hub)
                       → src/app/products/[slug]/page.tsx   (generateStaticParams × 9, 16-section)
legal/DPDP             → src/app/legal/{privacy,cookies,terms,disclaimer,refund}/page.tsx
consent banner         → src/components/chrome/ConsentBanner.tsx (in layout)
Web3Forms              → upgrade src/components/page/ContactForm.tsx (POST + WhatsApp fallback)
FAQ schema             → JSON-LD in product page metadata
chatbot (Phase 5)      → src/components/chrome/ChatBot.tsx + app/api/chat/route.ts (needs server)
```

## Phases
- **Phase 0 — Foundation:** gitignore zip ✅ · this plan ✅ · port `products.json` → `src/data` + `lib/catalog.ts` · reconcile brand facts · expand nav.
- **Phase 1 — Depth + Tools ⭐:** `/products` hub + 9 detail pages (16-section) with Cost-ROI + Q&A; Investment Explorer + Best-Fit Finder + Subsidy-by-State on Home & Consulting; cross-sell "You may also need" blocks.
- **Phase 2 — Capital + Software:** Project Valuation + Loan/EMI; Company Valuation + IPO readiness on capital-market; Software 7-product detail.
- **Phase 3 — Proof + Capture:** Case studies → real plants; About trust; Market Intel teaser + newsletter; brochure PDF downloads.
- **Phase 4 — Compliance + SEO (launch-blocking):** DPDP legal pages + cookie consent + Web3Forms + Turnstile; FAQ JSON-LD; GA4 + Clarity.
- **Phase 5 — Live/AI (needs server):** Gemini RAG chatbot; TradingView/Frankfurter market widgets; Google-Sheet price CMS; optional analytics backend.

## Tool formulas (from package 02-master-build-blueprint §4)
```
Project valuation:  project_cost = tier.invest + Σ(addon.cost);  output = tier.output × (extra reactor? 1.5–2 : 1)
Loan/EMI:           term_loan = cost × 0.70;  promoter = cost × 0.30;  own = promoter − capital_subsidy
                    EMI = P·r·(1+r)^n / ((1+r)^n − 1),  r = interest/12/100,  n = tenure×12
                    CGTMSE collateral-free if term_loan ≤ ₹2 Cr
Company valuation:  EV = revenue × (1–3×)  OR  EBITDA × (5–8×)  → show as RANGE
```
Every tool output ends with: *"Indicative — actual figures depend on capacity/location/raw-material; contact us for an exact DPR."*

## products.json shape (17 keys)
`products[9]{id,slug,title,subtitle,intro,benefits,applications,specs,plant,financials,qa}` ·
`calc[slug].tiers[{cap,invest,output,outUnit,revenue,profit,area,payback}]` ·
`subsidy{central[],states{12}}` · `feasibility[9]` · `stateProducts` · `trust` ·
`addons[7]` · `finance{termLoanPct,promoterPct,interestPct,tenureYears,notes}` ·
`funding` · `standards` · `market` · `software[7]` · `io` · `verticalQA` · `social` · `fundraising`
