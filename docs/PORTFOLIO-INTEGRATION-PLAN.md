# Portfolio Integration Plan — PERFECT/COMPLETE version (2026-06-12)

Sources: `PPS_Project_Master_Table_2026-06-11 (1).xlsx` (25 projects, sheets: Master/Website-Ready/
Services/Manual-Review/Summary) + `PPS_Project_Portfolio_Master_Report_2026-06-11 (1).docx`
(web-dev summary §1 + detailed entries §3). Both in `D:\New folder (2)\ai codes\`.

## ✅ ALREADY LIVE (2026-06-12, commit "feat(portfolio)")
- caseStudies 4 → **12** in `site.ts` (P01 LPG/PESO, P03 Liquigas-type subsidy, P04 60TPD
  feasibility, P10 Technobit DPR+JV, P11 KASEZ shingle EOU, P12 20TPD P2F, P18 estate
  (anonymised), P19 healthcare VC-IPO) — copy from xlsx "Suggested Website Text" (pre-approved)
- Stats band on /case-studies: 9 plants · 10 product lines · 35+ deliverables · ₹65Cr+ (5-60 TPD)
- `reportLibrary` +6 lines (LPG fee notes, EOU DPR, SBS, CBG, DPR suite, investor deep-search)
- Setu KB +3 (lpg-peso-licensing, portfolio-track-record, sez-eou-export-plant)

## 🔜 REMAINING — phases (execute on user GO)

### Phase 1 — SEO project detail pages (BIGGEST WIN, report §3 ka asli use)
New route `/projects/[id]` for the **5 featured** projects only (rich text + strong keywords):
| id | Project | SEO target (from xlsx keywords col) |
|---|---|---|
| lpg-import-licence-peso | P01 PBR LPG | "LPG import licence India", "PESO consultant" |
| bio-bitumen-plastic-fuel-odisha | P05 BBPF | "bio-bitumen plant DPR", "combined plant Odisha" |
| asphalt-shingle-eou-kasez | P11 | "asphalt shingle plant DPR", "KASEZ project report" |
| plastic-to-fuel-20tpd-dpr | P12 | "plastic to fuel DPR", "20 TPD pyrolysis" |
| vc-fundraising-ipo-roadmap | P19 | "startup fundraising consultant India" |
Each page: hero (related gen-image, UNIQUE — abhi unused pool se), challenge→approach→
deliverables→outcome sections (docx §3 detailed entries se), related product/service links,
LeadGate CTA ("Similar project? Get a proposal"), Breadcrumb+Article JSON-LD, canonical,
sitemap entries. Case-study cards pe "Read full case →" link (sirf in 5 pe).
Data: new `src/lib/projects.ts` (full text extract from docx §3 at build time of this phase).

### Phase 2 — Services ↔ proof wiring ("Services to Promote" sheet, 10 services)
- `src/lib/services.ts` me new export `servicePillars` (10 services + supporting case-study refs)
- /industrial-consulting "Seven phases" ke baad NAYA section "Proven by past work" — service →
  linked case studies (xlsx mapping: DPR→P05/06/07/11/12, Licensing→P01/02, Subsidy→P03/11/17…)
- Home service mentions me "Licensing & Regulatory (PESO/LPG)" add (report §1 hero-pills item)
- /capital-market pe P19-based "fundraising proof" blurb

### Phase 3 — Downloadable sample + remaining content
- P13 pyrolysis tech report = "downloadable sample" (report's suggestion): /market-intelligence
  ke gated ₹5L research section me FREE sample teaser via LeadGate (file client se chahiye —
  ask for the PDF; placeholder = summary section till then)
- Setu KB +4: property-advisory, healthcare/VC-fundraising, CBG/SATAT, projects-page pointers
- portfolioStats ko /about pe bhi (small strip; home already image-heavy)

### Phase 4 — SEO/meta polish
- New /projects/* in sitemap (with the trailing-slash fix — pending item, same commit me)
- case-studies meta keywords from xlsx SEO column (aggregate)
- OG images for the 5 project pages (gen-image pool se unique)

## ❌ NEVER (master table ke apne flags)
P14/P20/P23 (manual review — files not located/role unconfirmed), P24 MOU + P25 trading IP
(internal-only), client KYC/financials, P18 family names, unconfirmed client names (P06/P07/
P12/P15 generic rahenge).

## ⏳ CLIENT INPUTS NEEDED (blocked items)
- P22 software website-copy .txt files (DialSync etc. — owner's PC `Downloads\`, is machine pe NAHI)
- P13 report PDF (downloadable sample ke liye)
- Written OK before naming: PBR Energy explicitly (abhi "foreign-owned energy-trading company"),
  REC/Raydiant, MR REX identity
- P21 ke QA-audit/benchmark docs agar website improvements list chahiye

## Estimated effort
Phase 1 ≈ 1 session (docx extract + 5 pages + template). Phases 2-4 ≈ 1 session combined.
