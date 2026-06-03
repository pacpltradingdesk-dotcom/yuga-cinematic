# YUGA — PPS Anantams Corporation (PACPL)

Marketing + product site for **YUGA**, India's full-service Project Management
Consultancy for Bio-Modified Bitumen, AI software, and capital-markets advisory.

Built as a **static Next.js export** so it can be hosted on GitHub Pages, Vercel,
or any static host / custom domain (`yuga-pmc.in`).

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) · React 19 · TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Motion | Framer Motion · GSAP · Lenis (smooth scroll) |
| Icons | lucide-react |
| Output | `next build` → static export (no server runtime needed) |

## Commands

```bash
pnpm install      # install deps
pnpm dev          # local dev server (http://localhost:3000)
pnpm build        # production build → static export
pnpm start        # serve the production build
pnpm lint         # eslint
```

## Architecture — content/layout separation

The hard rule on this codebase: **data lives in `src/lib/*` and `src/data/*`;
components stay layout-only.** To change a fact (price, licence, plant count,
land size, social URL) you edit one data file — never a component.

```
src/
├── data/catalog.json     # master catalog: products, calc tiers, funding, market…
├── lib/                  # typed read-layer + single-source content
│   ├── site.ts           # company facts, nav, stats, socials, siteUrl, waLink()
│   ├── catalog.ts        # typed accessors over catalog.json (getProduct, getCalc…)
│   ├── config.ts         # public runtime config from NEXT_PUBLIC_* env vars
│   ├── media.ts          # image slot map (one image per slot)
│   ├── carbon.ts         # carbon-credit info + claim process
│   ├── licenses.ts       # licences & permissions (product × state) — indicative
│   ├── deliverables.ts   # documents/drawings we provide
│   ├── plants.ts         # approx plants running (product, state-wise) — indicative
│   ├── land.ts           # land footprint per capacity (derived from calc tiers)
│   ├── pricing.ts        # software / PMC / capital pricing (min–avg) — indicative
│   └── services.ts       # JV / collaboration / job work + research report
├── components/           # layout-only React components (page/, chrome/, ui/, visual/)
└── app/                  # App Router routes + metadata + JSON-LD
```

> Items marked **"Indicative"** are representative placeholders sourced from the
> existing catalog + domain norms. The client swaps in verified figures by
> editing the relevant `src/lib/*` / `src/data/*` file — no component changes.

## Environment variables

All client-exposed config is `NEXT_PUBLIC_*` and **safe to expose by design**
(form access keys, analytics IDs, anti-spam site key are all public-facing).
Everything is optional — the site degrades gracefully when a var is unset.

| Variable | Purpose | If unset |
|----------|---------|----------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, OG, JSON-LD, sitemap) | Falls back to Vercel URL, else `https://yuga-pmc.in` |
| `NEXT_PUBLIC_BASE_PATH` | Path prefix for asset URLs (GitHub Pages subpaths) | `""` (root) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | [Web3Forms](https://web3forms.com) access key — contact form → email | Contact form falls back to WhatsApp |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 measurement ID | Analytics never loads |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID | Clarity never loads |
| `NEXT_PUBLIC_TURNSTILE_KEY` | Cloudflare Turnstile site key (spam protection) | Turnstile widget skipped |

Analytics (GA4 / Clarity) load **only after the user grants consent** via the
consent banner — see `src/components/chrome/ConsentBanner.tsx`.

Create a `.env.local` (git-ignored) for local overrides:

```bash
NEXT_PUBLIC_SITE_URL=https://yuga-pmc.in
NEXT_PUBLIC_WEB3FORMS_KEY=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_TURNSTILE_KEY=
```

> Secrets are the client's to set — none are hardcoded. For production, set these
> in the host's env (GitHub Actions secrets / Vercel project env).

## Deployment

`.github/workflows/deploy.yml` builds with pnpm and publishes the static export.
The sitemap (`src/app/sitemap.ts`) and `robots.txt` are generated at build time
and include every product, software, legal, and section route.

## Client-build status

The active build plan and checklist live in
[`docs/CLIENT-BUILD-PLAN.md`](docs/CLIENT-BUILD-PLAN.md) — including the open
data points the client still needs to finalise (real pricing, licence lists,
plant counts, social URLs, founder photo, analytics keys).
