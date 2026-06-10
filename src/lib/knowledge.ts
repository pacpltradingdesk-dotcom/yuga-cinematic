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
      "The black petroleum binder that holds a road together — about 5% of it by weight. India uses ~87 lakh tonnes a year and imports ~40%, which is the bio-bitumen opportunity.",
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
      "Indian bitumen is graded by viscosity (IS 73): VG-10/20/30/40. VG-30 is the workhorse for most highways, VG-40 for very heavy traffic. Our bio-bitumen blends bio-oil into a VG-30 base while meeting the spec.",
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
  {
    id: "asphalt-shingle",
    title: "Asphalt Roofing Shingle",
    keywords: ["shingle", "shingles", "asphalt shingle", "roofing", "roof", "fibreglass", "fiberglass", "villa roof", "sloped roof", "roofing sheet"],
    answer:
      "Asphalt shingles are fibreglass mats coated with oxidised bitumen and ceramic granules — the most common sloped-roof covering worldwide. For a bitumen operation it's a value-added, downstream line: you turn your own oxidised bitumen into a finished roofing product at a higher margin than bulk bitumen. Indian demand (villas, resorts, premium housing) is rising and still largely import-met. Indicative CAPEX is ₹8–25 Cr; we size capacity and economics in the DPR.",
    href: "/products/asphalt-shingle",
  },

  /* ---------------- bio-bitumen + pyrolysis ---------------- */
  {
    id: "what-is-bio-bitumen",
    title: "What is bio-bitumen?",
    keywords: ["bio bitumen", "biobitumen", "bio modified", "krishibind", "csir", "crri", "green bitumen", "bio oil"],
    answer:
      "Part of conventional VG-30 replaced with bio-oil from agro-waste via pyrolysis, to the CSIR-CRRI 'KrishiBind' spec — ~15% in field use, up to ~20–30% in lab trials. India launched it commercially in Jan 2026.",
    href: "/products/bio-bitumen",
  },
  {
    id: "pyrolysis",
    title: "Pyrolysis process",
    keywords: ["pyrolysis", "process", "how made", "how it works", "reactor", "450", "550", "heat", "oxygen free"],
    answer:
      "Heating biomass/plastic/tyres to 450–550°C without oxygen so they break into oil, gas and char. For bio-bitumen the bio-oil (~20–25% yield) is refined and blended into VG-30.",
    href: "/bio-bitumen",
  },
  {
    id: "feedstock",
    title: "Feedstock / raw material",
    keywords: ["feedstock", "raw material", "agro waste", "biomass", "rice straw", "stubble", "bagasse", "groundnut", "cotton stalk", "input"],
    answer:
      "Agro-waste — rice straw, groundnut shells, cotton stalk, bagasse — ideally sourced within 50–100 km. Using stubble this way also cuts crop-burning, part of the carbon-credit story.",
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
  {
    id: "why-bio-bitumen",
    title: "Why switch to bio-bitumen?",
    keywords: ["why bio", "advantage", "advantages", "benefit", "benefits", "why switch", "why bio bitumen", "better", "vs normal bitumen", "fayda", "import substitution", "why"],
    answer:
      "Three reasons: it cuts dependence on imported bitumen (India imports ~40%), it uses agro-waste that would otherwise be burnt (reducing stubble-burning pollution and opening carbon-credit potential), and as a green, import-substituting industry it can attract government and MSME support. In CSIR trials it meets road spec with no performance loss — so it's a sustainability story with real economics behind it.",
    href: "/bio-bitumen",
  },

  /* ---------------- the business: cost, ROI, land ---------------- */
  {
    id: "cost",
    title: "Plant cost / investment",
    keywords: ["cost", "investment", "price", "kitna", "kitne", "paisa", "budget", "capex", "how much", "lagat", "kharcha"],
    answer:
      "Indicative bio-bitumen cost: 5 MT/day ≈ ₹1.5 Cr, 10 MT ≈ ₹3 Cr, 25 MT ≈ ₹10 Cr, 30–50 MT ≈ ₹12–16 Cr. MSME finance (CGTMSE/SIDBI) and state incentives can ease it — use the Cost & ROI calculator for live figures.",
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
      "One disciplined path: product → feasibility & DPR → funding → licences & civil → machinery & commissioning → market support. We de-risk each stage, and hand-hold for ~6 months after commissioning.",
    href: "/industrial-consulting",
  },
  {
    id: "timeline",
    title: "How long to set up",
    keywords: ["timeline", "how long", "duration", "time", "kitna time", "months", "kab tak", "ready"],
    answer:
      "Roughly 6–12 months from go-ahead to commissioning. Land readiness, pollution-board clearances and loan sanction are the big swing factors — we run them in parallel to compress the timeline.",
    href: "/industrial-consulting",
  },
  {
    id: "which-plant",
    title: "Which plant is right for me?",
    keywords: ["which plant", "best plant", "what should i make", "which product", "recommend", "suggest", "best fit", "konsa", "kaunsa", "right for me", "where to start", "confused", "help me choose"],
    answer:
      "It depends on your budget, location and goals — a new investor often starts with a small bio-bitumen or emulsion line; an existing bitumen company adds PMB, CRMB or blown bitumen; feedstock owners go plastic-to-fuel or tyre-to-oil. Tell me your budget and state, or use the Best-Fit Finder on the homepage, and we'll match you to the most viable plant.",
    href: "/products",
  },
  {
    id: "machinery",
    title: "Machinery & equipment",
    keywords: ["machinery", "machine", "equipment", "oem", "vendor", "reactor", "supplier", "install", "installation", "commissioning", "plant equipment"],
    answer:
      "We work through a verified OEM vendor network — reactors, blending units, storage, control panels and lab equipment — negotiate best price, and handle installation, commissioning and a QC lab as part of the PMC. You're not left to source machinery alone or guess at quality.",
    href: "/industrial-consulting",
  },
  {
    id: "training",
    title: "Training & manpower",
    keywords: ["training", "manpower", "staff", "operator", "hr", "recruitment", "skill", "team", "run the plant", "who will operate", "labour", "workers"],
    answer:
      "We help recruit and train your operators — pyrolysis, blending and QC — plus safety and environmental compliance, so the plant runs reliably from day one. Operating know-how is part of the hand-over, not an afterthought.",
    href: "/industrial-consulting",
  },

  /* ---------------- money: subsidy, loans, funding, IPO ---------------- */
  {
    id: "subsidy",
    title: "Subsidy & grants",
    keywords: ["subsidy", "sabsidi", "anudaan", "chhoot", "grant", "government scheme", "mnre", "central state", "incentive"],
    answer:
      "Mostly MSME-based — CGTMSE collateral-free guarantee (up to ₹5 Cr), SIDBI and bank loans — plus state incentives that vary by location. We identify and file every scheme you qualify for; verify current rules on the official portal.",
    href: "/capital-market",
  },
  {
    id: "loan",
    title: "Bank loans / finance",
    keywords: ["loan", "karz", "karza", "bank", "finance", "cgtmse", "msme loan", "credit", "term loan", "sidbi", "fund the plant"],
    answer:
      "CGTMSE gives collateral-free loans up to ₹5 Cr; MSME term loans run up to ₹25 Cr. We prepare a bankable DPR + CMA to maximise approval, typically a 70:30 loan-to-promoter split.",
    href: "/capital-market",
  },
  {
    id: "funding-equity",
    title: "Equity funding & investors",
    keywords: ["funding", "investor", "equity", "venture", "vc", "angel", "series a", "raise capital", "private equity", "fundraise"],
    answer:
      "Beyond debt we structure equity — seed to IPO. The founder took Omnipotent Industries to a BSE SME listing in 2021, so the advice is first-hand. We build the deck, valuation, data room and term sheets.",
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
      "A plant needs 25+ approvals — Factory/Fire/PESO, PCB CTE/CTO, GST/Udyam, plus NHAI/MoRTH empanelment. Pick your state on any product page to see the authorities; we handle the full filing.",
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
      "A Detailed Project Report — market, design, costing, financials, risk and compliance — in a format banks and investors accept. A full feasibility report for any product starts at ₹5 lakh.",
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
      "Bio-bitumen may earn carbon credits — illustratively ~0.35 t CO₂/MT — via voluntary routes (Puro.earth, BEE). Eligibility, volume and price aren't guaranteed, so treat figures as illustrative. We help structure the MRV pathway.",
    href: "/market-intelligence",
  },
  {
    id: "market",
    title: "Market size & opportunity",
    keywords: ["market", "opportunity", "demand", "import", "size", "how big market", "scope", "future", "growth"],
    answer:
      "India imports ~40% of its bitumen against ~87 lakh tonnes a year — a big import-substitution gap. India became the first country to commercially produce bio-bitumen (Jan 2026), with ~1,000 km of pilot roads planned by 2027.",
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
      "Buyers are road contractors, PWD, NHAI, traders and exporters. Our edge is a 150,000-contact live database across 18 states, plus ~6 months of active sales support after commissioning.",
    href: "/market-intelligence",
  },

  /* ---------------- company / verticals ---------------- */
  {
    id: "who-is-yuga",
    title: "About YUGA / the founder",
    keywords: ["yuga", "who are you", "about", "company", "founder", "prince", "experience", "pacpl", "pps anantams", "background", "credentials"],
    answer:
      "YUGA is the brand of PPS Anantams (PACPL). Founder Prince Pratap Shah has 25+ years in bitumen, commissioned 9 plants, and took Omnipotent Industries to a BSE SME listing in 2021 — a hands-on operator. We cover plant PMC, AI software and fundraising.",
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
    id: "export-international",
    title: "Exports & international work",
    keywords: ["export", "exports", "international", "abroad", "foreign", "overseas", "global", "uk", "usa", "korea", "supply abroad", "import export"],
    answer:
      "Yes — alongside Indian plants we handle international supply tie-ups and JVs; past engagements include US, UK (GITCA) and Korea / SE-Asia bulk buyers. If you want to export bitumen / bio-bitumen or set up with an overseas partner, we can structure the supply contract and the venture.",
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
