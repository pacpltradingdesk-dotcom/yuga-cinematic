/**
 * YUGA Assistant — bitumen / bio-bitumen / plant-business knowledge base.
 *
 * This is the "brains" of the static (no-server) assistant: a curated set of
 * domain answers so the widget can speak knowledgeably about bitumen, the
 * plants we set up, costs, subsidy, funding, licences, land and the market —
 * not just echo the product catalog.
 *
 * Pure data (content/layout split): the search engine lives in
 * `src/lib/assistant.ts`, the widget stays layout-only. To improve an answer,
 * edit the text here — never a component. Figures are grounded in
 * `src/lib/site.ts` / `src/data/catalog.json`; keep them in sync if those change.
 */

export interface KnowledgeEntry {
  /** Stable id (debugging / keys). */
  readonly id: string;
  /** Human topic shown as the answer heading + used as a "did you mean" chip. */
  readonly title: string;
  /** Trigger words/phrases — the more natural variants, the better the match. */
  readonly keywords: readonly string[];
  /** The answer, 2–4 sentences, plain text. */
  readonly answer: string;
  /** Optional deep link to the most relevant page. */
  readonly href?: string;
}

export const KNOWLEDGE: readonly KnowledgeEntry[] = [
  /* ---------------- bitumen fundamentals ---------------- */
  {
    id: "what-is-bitumen",
    title: "What is bitumen?",
    keywords: ["bitumen", "what is bitumen", "asphalt binder", "tar", "black material", "road material", "definition"],
    answer:
      "Bitumen is the black, sticky, petroleum-derived binder that holds road aggregate together — about 5% of a road by weight but the part that makes it a road. India consumes ~9 million tonnes a year, and nearly half of it is imported. That import gap is exactly why bio-bitumen and local production are such a big opportunity.",
    href: "/market-intelligence",
  },
  {
    id: "bitumen-vs-asphalt",
    title: "Bitumen vs asphalt vs tar",
    keywords: ["bitumen vs asphalt", "difference", "asphalt", "tar", "same thing", "vs"],
    answer:
      "They get mixed up: bitumen is the binder (refined from crude oil); asphalt is the finished mix of bitumen + stone aggregate laid on the road; tar is the older coal-derived binder, now largely phased out for being toxic. In India 'bitumen' usually means the binder, and that's what every plant we set up produces or modifies.",
  },
  {
    id: "vg-grades",
    title: "VG (viscosity) grades",
    keywords: ["vg", "vg30", "vg 30", "vg10", "vg40", "viscosity grade", "grades", "is 73", "grade"],
    answer:
      "Indian bitumen is sold by Viscosity Grade per IS 73 — VG-10, VG-20, VG-30 and VG-40. VG-30 is the workhorse for most highways and dense traffic; VG-40 for very heavy traffic and toll roads; VG-10 for spray/emulsion work in colder regions. Our bio-bitumen blends bio-oil ~20–30% into a VG-30 base while still meeting the spec.",
  },
  {
    id: "penetration-grades",
    title: "Penetration grades",
    keywords: ["penetration", "pen grade", "60 70", "80 100", "soft hard", "hardness"],
    answer:
      "The older penetration grading (e.g. 60/70, 80/100) measures how far a needle sinks into the bitumen — lower number = harder. India has largely moved to VG grading for road work, but pen grades still show up in older specs and some industrial uses.",
  },

  /* ---------------- product types ---------------- */
  {
    id: "bitumen-emulsion",
    title: "Bitumen Emulsion",
    keywords: ["emulsion", "bitumen emulsion", "cold mix", "tack coat", "ss1", "rs1", "water based"],
    answer:
      "Emulsion is bitumen dispersed in water so it can be used cold — no heating on site. It's used for tack coats, prime coats, cold-mix patching and surface dressing, and is a favourite of PWD road-maintenance teams. A 5 MT/day emulsion line is one of the lowest-entry plants we set up.",
    href: "/products/bitumen-emulsion",
  },
  {
    id: "pmb",
    title: "PMB — Polymer Modified Bitumen",
    keywords: ["pmb", "polymer modified", "polymer", "is 15462", "sbs", "modified bitumen"],
    answer:
      "PMB blends polymers (typically SBS) into bitumen to IS 15462:2019, giving roads that resist rutting in heat and cracking in cold. It's specified for highways, heavy-traffic corridors and airports. We set up PMB plants standalone or as an add-on line to an existing bitumen operation.",
    href: "/products/pmb-polymer-modified-bitumen",
  },
  {
    id: "crmb",
    title: "CRMB — Crumb Rubber Modified Bitumen",
    keywords: ["crmb", "crumb rubber", "rubber modified", "waste tyre rubber", "nhai durable"],
    answer:
      "CRMB modifies bitumen with crumb rubber recovered from waste tyres — durable, cost-effective surfacing favoured by NHAI, and a tidy way to consume scrap rubber. It pairs naturally with a rubber-to-oil plant if you want to control your own feedstock.",
    href: "/products/crmb-crumb-rubber-modified-bitumen",
  },
  {
    id: "blown-bitumen",
    title: "Blown / Oxidised Bitumen",
    keywords: ["blown", "oxidised", "oxidized", "blowing", "roofing", "industrial bitumen", "85 25"],
    answer:
      "Blown (oxidised) bitumen is air-blown at 230–250°C to harden it for non-road uses — roofing felts, waterproofing, pipe coating, battery cases and paints. Grades like 85/25 and 90/15 sell into industrial markets rather than highways.",
    href: "/products/blown-oxidised-bitumen",
  },
  {
    id: "decanter",
    title: "Bitumen Decanter",
    keywords: ["decanter", "recovery", "separation", "drum cleaning", "reprocessing", "handling"],
    answer:
      "A decanter system recovers and separates bitumen — a handling/packaging unit rather than a production plant, so it has no MT/day output of its own. It's the right pick for refineries and reprocessors that need clean recovery and re-drumming.",
    href: "/products/bitumen-decanter",
  },
  {
    id: "micro-surfacing",
    title: "Micro Surfacing Emulsion",
    keywords: ["micro surfacing", "microsurfacing", "preventive", "thin overlay", "slurry seal"],
    answer:
      "Micro-surfacing is a polymer-modified emulsion slurry laid thin to renew a road surface and extend its life — a cheaper, faster alternative to full re-laying, increasingly used for preventive maintenance by road agencies.",
    href: "/products/micro-surfacing-emulsion",
  },
  {
    id: "cutback",
    title: "Cutback bitumen",
    keywords: ["cutback", "cut back", "kerosene", "solvent", "mc rc sc"],
    answer:
      "Cutback bitumen is thinned with a solvent (instead of water like emulsion) so it can be used without heavy heating — graded MC/RC/SC by how fast it cures. It's used for priming and surface work; emulsion has replaced much of it for environmental reasons.",
  },

  /* ---------------- bio-bitumen + pyrolysis ---------------- */
  {
    id: "what-is-bio-bitumen",
    title: "What is bio-bitumen?",
    keywords: ["bio bitumen", "biobitumen", "bio modified", "krishibind", "csir", "crri", "green bitumen", "bio oil"],
    answer:
      "Bio-bitumen replaces ~20–30% of conventional VG-30 with bio-oil made from agro-waste via pyrolysis (450–550°C), to the CSIR-CRRI 'KrishiBind' specification. It is designed to meet NHAI/MoRTH specs, with CSIR lab trials showing no performance loss — and India became the first country to commercially produce it in January 2026.",
    href: "/products/bio-bitumen",
  },
  {
    id: "pyrolysis",
    title: "Pyrolysis process",
    keywords: ["pyrolysis", "process", "how made", "how it works", "reactor", "450", "550", "heat", "oxygen free"],
    answer:
      "Pyrolysis heats biomass (or plastic, or tyres) to 450–550°C in an oxygen-free reactor so it breaks down into oil, gas and char instead of burning. For bio-bitumen the bio-oil yield is ~20–25%, which is then refined and blended into VG-30. The same core process drives our plastic-to-fuel and tyre-to-oil plants.",
    href: "/bio-bitumen",
  },
  {
    id: "feedstock",
    title: "Feedstock / raw material",
    keywords: ["feedstock", "raw material", "agro waste", "biomass", "rice straw", "stubble", "bagasse", "groundnut", "cotton stalk", "input"],
    answer:
      "Bio-bitumen runs on agro-waste — rice straw, groundnut shells, cotton stalk, bagasse — ideally sourced within 50–100 km and pelletized before pyrolysis. Using stubble this way also cuts the crop-burning that chokes north India each winter, which is part of the carbon-credit and subsidy story.",
  },
  {
    id: "plastic-to-fuel",
    title: "Plastic-to-Fuel",
    keywords: ["plastic", "plastic to fuel", "plastic pyrolysis", "epr", "waste plastic", "fuel oil"],
    answer:
      "Plastic-to-fuel converts waste plastic via pyrolysis into usable fuel/oil — aligned with India's Extended Producer Responsibility (EPR) push on plastic waste. It's a strong fit where plastic waste is abundant and disposal is a problem.",
    href: "/products/plastic-to-fuel",
  },
  {
    id: "rubber-to-fuel",
    title: "Rubber / Tyre-to-Oil (RPO)",
    keywords: ["rubber", "tyre", "tire", "rubber to fuel", "rpo", "pyrolysis oil", "carbon black", "end of life tyre"],
    answer:
      "Tyre/rubber pyrolysis turns end-of-life tyres into Recovered Pyrolysis Oil (RPO), carbon black and steel — a circular-economy play, and a feedstock source if you also run a CRMB line.",
    href: "/products/rubber-to-fuel",
  },

  /* ---------------- the business: cost, ROI, land ---------------- */
  {
    id: "cost",
    title: "Plant cost / investment",
    keywords: ["cost", "investment", "price", "kitna", "kitne", "paisa", "budget", "capex", "how much", "lagat", "kharcha"],
    answer:
      "Indicative bio-bitumen plant cost by capacity: 5 MT/day ≈ ₹1.5 Cr, 10 MT ≈ ₹3 Cr, 15 MT ≈ ₹4.5 Cr, 20 MT ≈ ₹8 Cr, 25 MT ≈ ₹10 Cr, 30–50 MT ≈ ₹12–16 Cr. The final number depends on capacity, land, product mix and how many stages you build — and MSME financing (CGTMSE/SIDBI) plus eligible state industrial incentives can ease the capex. Use the cost & ROI calculator on any product page for live figures.",
    href: "/products/bio-bitumen",
  },
  {
    id: "roi",
    title: "ROI, profit & payback",
    keywords: ["roi", "profit", "return", "payback", "margin", "income", "earning", "kamai", "munafa", "break even", "irr"],
    answer:
      "Returns scale with capacity and how cheaply you source feedstock — agro/CSIR-licensee setups get the lowest raw-material cost and the best margins. Every product page has a Cost & ROI calculator that shows indicative output, revenue, profit and payback by tier; we then build a proper 5-year financial model (P&L, cash flow, IRR, break-even) during feasibility.",
    href: "/products/bio-bitumen",
  },
  {
    id: "land",
    title: "Land requirement",
    keywords: ["land", "area", "zameen", "jagah", "plot", "space", "how much land", "acre", "square"],
    answer:
      "Land scales with capacity — a small 5 MT/day plant needs far less than a 25–50 MT commercial line. Each product page lists an indicative plot size per tier under 'Site & Footprint'; we lock the exact figure to your layout and feedstock plan during feasibility. Proximity to agro-waste (50–100 km) matters as much as the plot size itself.",
    href: "/products/bio-bitumen",
  },
  {
    id: "capacity",
    title: "Plant capacities",
    keywords: ["capacity", "mt", "mt per day", "tpd", "size", "how big", "small", "large", "tonnes"],
    answer:
      "We set up plants from 5 MT/day (trial/entry) through 10/15/20/25 MT (MSME to medium scale) up to 30–100 MT/day for commercial-industrial operations. Start small to prove the model, then scale — the consultancy is the same A-to-Z either way.",
    href: "/bio-bitumen",
  },
  {
    id: "how-to-start",
    title: "How to set up a plant",
    keywords: ["how to start", "setup", "set up", "begin", "process to start", "steps", "kaise shuru", "start plant", "first step"],
    answer:
      "Our pipeline runs the same disciplined path for everyone: identify the right product → location & feasibility (DPR, financial model) → funding (loan/subsidy/equity) → licences & civil → machinery & commissioning → market & sales support. We de-risk each stage before the next, and hand-hold for ~6 months after commissioning while you find buyers.",
    href: "/industrial-consulting",
  },
  {
    id: "timeline",
    title: "How long to set up",
    keywords: ["timeline", "how long", "duration", "time", "kitna time", "months", "kab tak", "ready"],
    answer:
      "A typical small-to-mid plant runs roughly 6–12 months from go-ahead to commissioning — feasibility & funding first, then licences and civil in parallel, then machinery, installation and trial runs. The biggest swing factors are land readiness, pollution-board clearances and loan sanction; we run them in parallel to compress the timeline.",
    href: "/industrial-consulting",
  },

  /* ---------------- money: subsidy, loans, funding, IPO ---------------- */
  {
    id: "subsidy",
    title: "Subsidy & grants",
    keywords: ["subsidy", "sabsidi", "anudaan", "chhoot", "grant", "government scheme", "mnre", "central state", "incentive"],
    answer:
      "Funding is mostly MSME-based — CGTMSE collateral-free guarantee (up to ₹5 Cr), plus SIDBI and bank term loans — alongside state industrial incentives that vary by location (capital subsidy, SGST refund, power/interest support). Subsidy eligibility depends on current scheme rules, so we identify and file for every scheme you actually qualify for. Verify rates and windows on the official portal before relying on them.",
    href: "/capital-market",
  },
  {
    id: "loan",
    title: "Bank loans / finance",
    keywords: ["loan", "karz", "karza", "bank", "finance", "cgtmse", "msme loan", "credit", "term loan", "sidbi", "fund the plant"],
    answer:
      "Most plants are bank-funded: CGTMSE gives collateral-free loans up to ₹5 Cr (~12%), and MSME term loans run up to ₹25 Cr against plant & machinery. We prepare a bankable DPR + CMA data in bank format to maximise approval — typically a 70:30 term-loan-to-promoter structure.",
    href: "/capital-market",
  },
  {
    id: "funding-equity",
    title: "Equity funding & investors",
    keywords: ["funding", "investor", "equity", "venture", "vc", "angel", "series a", "raise capital", "private equity", "fundraise"],
    answer:
      "Beyond debt, we structure equity — seed, Series A/B/C, strategic/JV, all the way to an IPO. The founder took Omnipotent Industries, a bitumen company, to a BSE SME listing in 2021, so the fundraising advice is first-hand, not theoretical. We build the pitch deck, valuation, data room and term sheets.",
    href: "/capital-market",
  },
  {
    id: "ipo",
    title: "IPO & public listing",
    keywords: ["ipo", "listing", "public", "bse", "nse", "sme ipo", "go public", "stock exchange"],
    answer:
      "We prepare companies for SME and Main-Board listings — readiness, valuation, DRHP support and investor positioning. This is lived experience: the founder listed Omnipotent Industries, a bitumen company, on the BSE SME platform in 2021, so we know what the journey actually demands.",
    href: "/capital-market",
  },
  {
    id: "valuation",
    title: "Business valuation",
    keywords: ["valuation", "value", "worth", "dcf", "company value", "equity value", "how much worth"],
    answer:
      "We value businesses using DCF, comparable-company and asset-based methods, packaged with a 5-year financial model, DPR/CMA and a data room — whether you're raising capital, bringing in a JV partner or preparing to list.",
    href: "/capital-market",
  },

  /* ---------------- licences, deliverables, quality ---------------- */
  {
    id: "licences",
    title: "Licences & permissions",
    keywords: ["licence", "license", "permission", "permit", "anumati", "approval", "pcb", "peso", "factory", "cte", "cto", "compliance", "regulatory"],
    answer:
      "A plant needs 25+ approvals — Factory/Fire/PESO, Pollution Control Board CTE/CTO, EIA where applicable, GST/Udyam, plus NHAI/MoRTH empanelment to supply roads. Each product page lets you pick your state to see the relevant nodal authorities; we handle the full filing as part of the PMC.",
    href: "/industrial-consulting",
  },
  {
    id: "deliverables",
    title: "Documents & deliverables",
    keywords: ["documents", "deliverables", "dastavej", "drawings", "what you provide", "reports", "working list", "papers"],
    answer:
      "You get the full pack that takes a plant from paper to production: DPR, financial model, layout & engineering drawings, working procedures, vendor/machinery lists, licence filings and compliance docs. Editable formats so your team and bankers can work from them directly.",
    href: "/industrial-consulting",
  },
  {
    id: "dpr",
    title: "What is a DPR?",
    keywords: ["dpr", "detailed project report", "report", "feasibility report", "bankable"],
    answer:
      "A DPR (Detailed Project Report) is the master document for your plant — market, technical design, costing, financials (ROI/IRR/break-even), risk and compliance — in a format banks and investors accept. We also produce a separate Bank DPR + CMA for loan sanction. A full research & feasibility report for any product, PAN-India, starts at ₹5 lakh as part of the PMC.",
    href: "/market-intelligence",
  },
  {
    id: "standards",
    title: "Quality, IS codes & testing",
    keywords: ["standards", "quality", "testing", "is code", "astm", "msds", "spec", "penetration test", "softening", "ductility", "certification"],
    answer:
      "We build the QC lab and test to the right specs — penetration, softening point, ductility and rutting tests, against IS/ASTM standards (e.g. PMB to IS 15462:2019) with proper MSDS/SDS. Each product page lists the applicable IS, ASTM and safety standards.",
    href: "/products/bio-bitumen",
  },

  /* ---------------- carbon, market, buyers ---------------- */
  {
    id: "carbon",
    title: "Carbon credits",
    keywords: ["carbon", "credit", "carbon credit", "co2", "emission", "puro", "mrv", "green revenue", "offset", "environment"],
    answer:
      "Bio-bitumen may qualify to earn carbon credits — illustratively around 0.35 t CO₂ saved per MT — via voluntary mechanisms (e.g. Puro.earth MRV or India's BEE offset route). Eligibility, methodology approval, volume and price are not guaranteed and prices vary, so treat any figure as illustrative, not assured revenue. We help structure the MRV pathway.",
    href: "/market-intelligence",
  },
  {
    id: "market",
    title: "Market size & opportunity",
    keywords: ["market", "opportunity", "demand", "import", "size", "how big market", "scope", "future", "growth"],
    answer:
      "India imports ~40% of its bitumen (≈60% met domestically), against annual consumption of ~87 lakh tonnes — a large import-substitution gap. India became the first country to commercially produce bio-bitumen (CSIR-CRRI / CSIR-IIP, Jan 2026), with ~1,000 km of pilot roads planned by 2027. Early movers capture that gap.",
    href: "/market-intelligence",
  },
  {
    id: "nhai-mandate",
    title: "NHAI / MoRTH mandate",
    keywords: ["nhai", "morth", "mandate", "government", "highway", "policy", "2030", "15 percent", "regulation"],
    answer:
      "NHAI/MoRTH back bio-bitumen: MoRTH's bitumen circular governs grade/spec on national highways, and CSIR-CRRI/CSIR-IIP's bio-bitumen is being piloted on NH stretches (~1,000 km of pilot roads planned by 2027). That regulatory pull, plus import-substitution economics, is what opens the window for new plants.",
    href: "/market-intelligence",
  },
  {
    id: "buyers",
    title: "Who buys it / finding buyers",
    keywords: ["buyers", "customers", "sell", "market support", "who buys", "demand", "contractors", "off take", "sales"],
    answer:
      "Buyers are road contractors, PWD, NHAI, traders and exporters. Our edge is a multi-thousand-contact live database of contractors, traders and importers across 18 states (150,000 contacts total) — so you're not setting up a plant and then wondering who to sell to. We give active sales support for ~6 months after commissioning.",
    href: "/market-intelligence",
  },

  /* ---------------- company / verticals ---------------- */
  {
    id: "who-is-yuga",
    title: "About YUGA / the founder",
    keywords: ["yuga", "who are you", "about", "company", "founder", "prince", "experience", "pacpl", "pps anantams", "background", "credentials"],
    answer:
      "YUGA is the brand of PPS Anantams Corporation (PACPL). The founder, Prince Pratap Shah, has 25+ years in bitumen, has personally commissioned 9 plants across India, and took Omnipotent Industries, a bitumen company, to a BSE SME listing in 2021 — so this is a hands-on operator, not a desk consultant. We cover plant PMC, AI software and capital-markets fundraising.",
    href: "/about",
  },
  {
    id: "software",
    title: "AI software products",
    keywords: ["software", "ai", "crm", "dashboard", "technology", "app", "dialsync", "whatsapp bulk", "excel maker", "tools"],
    answer:
      "We built AI software to run our own bitumen operations — a sales dashboard, bitumen CRM, Excel Maker AI, DialSync, WhatsApp bulk and automated market reports — and now offer them to clients to sharpen market intelligence and grow sales.",
    href: "/it-software",
  },
  {
    id: "jv-collaboration",
    title: "JV, collaboration & job work",
    keywords: ["jv", "joint venture", "collaboration", "partnership", "job work", "tie up", "associate", "franchise", "collaborate"],
    answer:
      "Beyond pure consultancy we do Joint Ventures (domestic and international), collaborations and job work — useful if you want a partner with skin in the game rather than just an advisor. We also handle international supply tie-ups (US/UK/Korea buyers in the past).",
    href: "/about",
  },
  {
    id: "contact",
    title: "Talk to a person",
    keywords: ["contact", "call", "phone", "talk", "expert", "consultation", "reach", "whatsapp", "email", "book", "meeting", "human"],
    answer:
      "Happy to connect you with the team — a quick call usually answers more than any page. Use the Contact page to book a feasibility call, or message us on WhatsApp for a fast reply. Tell us the product and state you're thinking about and we'll come prepared.",
    href: "/contact",
  },
];
