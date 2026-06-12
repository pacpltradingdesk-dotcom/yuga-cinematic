/**
 * Featured project case files — full-depth pages at /projects/[id].
 * Source: PPS Project Portfolio Master Report (compiled 11 Jun 2026), §3 detailed
 * entries + per-project "Suggested Website Text" (client's pre-approved copy).
 *
 * CONFIDENTIALITY (master-table flags, do not relax without written client OK):
 * - LPG client presented as "a foreign-owned LPG trading company, Chennai" (no name).
 * - Plastic-to-fuel promoter + Odisha developer + healthcare venture stay generic.
 * - Technobit Industries may be named (their own approved text names them).
 * - Figures are modelled/indicative — framed as such, never as guarantees.
 */

export interface FeaturedProject {
  readonly id: string;
  readonly title: string;
  readonly sector: string;
  readonly location: string;
  readonly tag: string;
  readonly accent: "amber" | "cyan";
  /** One-paragraph approved summary (hero intro). */
  readonly summary: string;
  /** "The brief" — what the client needed. */
  readonly brief: string;
  /** What we did. */
  readonly services: readonly string[];
  /** What the client received. */
  readonly deliverables: readonly string[];
  /** Outcome stat chips (modelled/indicative where applicable). */
  readonly outcomes: readonly { stat: string; label: string }[];
  /** SEO */
  readonly keywords: readonly string[];
  readonly metaDesc: string;
  /** Related links on-site. */
  readonly related: readonly { label: string; href: string }[];
}

export const featuredProjects: readonly FeaturedProject[] = [
  {
    id: "lpg-import-licence-peso",
    title: "LPG Import Licence & PESO Regulatory Advisory",
    sector: "LPG / Petroleum — Import & Regulatory Compliance",
    location: "Chennai · Visakhapatnam / Mundra terminal options",
    tag: "Licensing & Regulatory",
    accent: "cyan",
    summary:
      "End-to-end regulatory advisory for a foreign-owned energy trading company seeking to import bulk Propane and Butane into India — from legal eligibility under ITC(HS) and FDI policy to a complete cost-and-timeline roadmap to import-readiness in 10-14 weeks.",
    brief:
      "A foreign-owned trading company planned to import bulk Propane (HS 2711 12 00) and Butane (HS 2711 13 00) into India, with a first shipment of roughly 6,000 MT. Before a single tonne could move, the company needed certainty on import-policy and FDI eligibility — and a mapped path through every Indian approval that stood between incorporation and the first cargo.",
    services: [
      "Regulatory eligibility analysis — DGFT / ITC(HS) / FDI policy",
      "PESO and LPG Order 2000 licensing roadmap (consignee status, parallel-marketeer rating)",
      "MoPNG intimation, state GST, AD code and RBI FC-GPR mapping — all six approvals",
      "Statutory fee computation with a complete authority directory",
      "Consultancy, full-service and self-execution commercial proposals",
      "Travel and visit costing for authority interactions",
    ],
    deliverables: [
      "Final Complete Licensing, Procedure & Cost Report (validated, submission-ready)",
      "Authority Directory & Professional Deliverables pack",
      "Consultancy Proposal · Full-Service Proposal · Self-Execution Guide",
      "Travel & Visit Costing workbook",
    ],
    outcomes: [
      { stat: "6", label: "approvals mapped end-to-end" },
      { stat: "10-14 wk", label: "roadmap to import-ready" },
      { stat: "~6,000 MT", label: "first shipment planned" },
      { stat: "₹19-35 L", label: "headline statutory budget mapped" },
    ],
    keywords: [
      "LPG import licence India", "PESO consultant", "propane butane import licence",
      "LPG parallel marketeer rating", "MoPNG registration", "petroleum regulatory consultant",
      "DGFT IEC compliance", "gas import advisory India",
    ],
    metaDesc:
      "How YUGA mapped all six approvals — PESO, parallel-marketeer rating, MoPNG, GST, AD code, FC-GPR — and delivered a 10-14 week import-readiness roadmap for a foreign-owned LPG trading company.",
    related: [
      { label: "Capital & advisory services", href: "/capital-market" },
      { label: "All case studies", href: "/case-studies" },
    ],
  },
  {
    id: "bio-bitumen-plastic-to-fuel-odisha",
    title: "₹10 Cr Combined Bio-Bitumen + Plastic-to-Fuel Plant",
    sector: "Bio-Bitumen + Pyrolysis (combined waste-to-value)",
    location: "Odisha",
    tag: "Featured · Investor Proposal",
    accent: "amber",
    summary:
      "Our flagship combined-plant engagement: a ₹10 crore bio-bitumen and plastic-to-fuel facility in Odisha pairing a 5 TPD bio-modified bitumen line with a 10 TPD pyrolysis line — a complete 20-section investor proposal with founder Q&A support.",
    brief:
      "A waste-to-value developer wanted one facility with two revenue engines: 5 TPD of bio-modified bitumen and 10 TPD of plastic-to-fuel pyrolysis, on ₹10 Cr fixed capital plus ₹1.8 Cr working capital. Investors needed a single document that made the combined techno-economics bankable.",
    services: [
      "Combined-plant DPR / 20-section investor proposal",
      "Financial modelling and returns analysis across both lines",
      "Founder-level Q&A preparation for investor meetings",
      "Submission pack assembly and audit (full numbered client pack)",
    ],
    deliverables: [
      "Technical-Financial Submission (v07)",
      "Founder Q&A pack (v05)",
      "20-section investor proposal with plastic-waste line annexes",
    ],
    outcomes: [
      { stat: "31.4%", label: "modelled project IRR (equity 42.8%)" },
      { stat: "₹24.2 Cr", label: "modelled Year-2 revenue" },
      { stat: "3.1 yr", label: "modelled payback" },
      { stat: "5+10 TPD", label: "two lines, one site" },
    ],
    keywords: [
      "bio-bitumen plant DPR", "plastic to fuel plant Odisha", "combined pyrolysis plant",
      "waste to value investment proposal", "bio bitumen pyrolysis IRR", "green plant investor proposal India",
    ],
    metaDesc:
      "A ₹10 Cr combined bio-bitumen + plastic-to-fuel plant in Odisha — 20-section investor proposal, 31.4% modelled IRR, ₹24.2 Cr Year-2 revenue, 3.1-year payback. YUGA case file.",
    related: [
      { label: "Bio-bitumen plant", href: "/products/bio-bitumen" },
      { label: "Plastic-to-fuel plant", href: "/products/plastic-to-fuel" },
    ],
  },
  {
    id: "asphalt-shingle-eou-kasez",
    title: "Asphalt Shingle Export Plant — Kandla SEZ",
    sector: "Asphalt Shingles / Export-Oriented Manufacturing (SEZ)",
    location: "KASEZ — Kandla Special Economic Zone, Gujarat",
    tag: "Featured · Export EOU",
    accent: "cyan",
    summary:
      "For an export-oriented asphalt shingle plant in Kandla SEZ (Technobit Industries), we produced a ten-module, 24-section DPR — approval strategy, Gujarat subsidy map, a country-by-country global export feasibility matrix and full cash-flow structuring.",
    brief:
      "Technobit Industries planned an export-oriented, multi-product asphalt shingle plant inside Kandla SEZ. An EOU in a special economic zone needs more than a standard DPR: SEZ approval strategy, export-market evidence and financial structuring that holds up to both bankers and the SEZ authority.",
    services: [
      "Full EOU Detailed Project Report — 10 modules, 24 sections (V4.1)",
      "SEZ approval strategy and profitability & subsidy mapping (EOU + Gujarat benefits)",
      "Global 360° country-by-country export feasibility matrix",
      "Cash-flow and financial structuring; pricing, cost and competition analysis",
      "Raw-material, packaging and supplier/contact playbooks with job-work backup channels",
    ],
    deliverables: [
      "10 document modules (Word + PDF, V4.0 and V4.1 sets)",
      "Master investor/management presentation",
    ],
    outcomes: [
      { stat: "₹10.8 Cr", label: "project capex" },
      { stat: "38-45%", label: "modelled IRR with EOU + state benefits" },
      { stat: "5→10 TPD", label: "scale-up path (~3,000 MT/yr)" },
      { stat: "24", label: "DPR sections across 10 modules" },
    ],
    keywords: [
      "asphalt shingle plant DPR", "KASEZ project report", "EOU plant DPR Gujarat",
      "SEZ manufacturing project report", "export oriented unit consultant", "asphalt shingle manufacturing India",
    ],
    metaDesc:
      "Ten-module, 24-section EOU DPR for an asphalt shingle export plant in Kandla SEZ — ₹10.8 Cr capex, 38-45% modelled IRR, global export feasibility matrix. YUGA case file.",
    related: [
      { label: "Asphalt shingle plant", href: "/products/asphalt-shingle" },
      { label: "Industrial consulting", href: "/industrial-consulting" },
    ],
  },
  {
    id: "plastic-to-fuel-20tpd-dpr",
    title: "20 TPD Plastic-Waste-to-Fuel-Oil Plant DPR",
    sector: "Plastic-to-Fuel / Pyrolysis",
    location: "India",
    tag: "Featured · DPR",
    accent: "amber",
    summary:
      "The complete Detailed Project Report for a 20 TPD plastic-waste-to-fuel-oil plant producing light diesel oil and furnace oil — three controlled revisions, an investor presentation and a detailed plant cost model.",
    brief:
      "A clean-energy promoter needed a bankable case for converting 20 tonnes of waste plastic a day into LDO and furnace oil. The financing conversation demanded hard numbers: project cost, returns, debt-service cover and a process story a non-engineer could follow.",
    services: [
      "Full DPR preparation, iterated through three controlled versions",
      "Pyrolysis process documentation (plastic → LDO + furnace oil)",
      "Financial modelling with DSCR analysis",
      "Investor presentation and plant cost model",
    ],
    deliverables: [
      "Plastic-to-Fuel DPR v1-v3 (Word + PDF)",
      "Conversion-process presentation",
      "20 TPD plastic-to-oil cost model (Excel)",
    ],
    outcomes: [
      { stat: "₹45.68 Cr", label: "project cost" },
      { stat: "22-26%", label: "modelled IRR" },
      { stat: "₹40.5 Cr", label: "modelled annual revenue" },
      { stat: "1.7x", label: "average DSCR" },
    ],
    keywords: [
      "plastic to fuel DPR", "20 TPD pyrolysis plant", "plastic waste to fuel oil plant",
      "LDO furnace oil pyrolysis", "plastic recycling plant project report", "waste plastic pyrolysis India",
    ],
    metaDesc:
      "Complete DPR for a 20 TPD plastic-waste-to-fuel-oil plant — ₹45.68 Cr project cost, 22-26% modelled IRR, ₹40.5 Cr modelled revenue, 1.7x DSCR. YUGA case file.",
    related: [
      { label: "Plastic-to-fuel plant", href: "/products/plastic-to-fuel" },
      { label: "Cost & ROI calculator", href: "/products/plastic-to-fuel#cost" },
    ],
  },
  {
    id: "vc-fundraising-ipo-roadmap",
    title: "VC Fundraising Strategy & Roadmap to IPO",
    sector: "Healthcare / Venture Fundraising",
    location: "India",
    tag: "Capital Advisory",
    accent: "cyan",
    summary:
      "We guided a growing mental-healthcare venture through fundraising readiness — the valuation workbook, the strategic fundraising proposal and a financial roadmap running all the way to IPO, grounded in two years of audited financials.",
    brief:
      "A mental-healthcare venture with real traction needed to turn operating history into an investor-grade story: what is the company worth, what should it raise, on what terms — and what does the road from VC round to public listing actually look like?",
    services: [
      "Fundraising strategy and readiness assessment",
      "Venture valuation (full workbook, two years of audited financials analysed)",
      "Financial roadmap from the current round through to IPO",
      "Investor information packs and founder-material analysis",
    ],
    deliverables: [
      "Strategic Fundraising Proposal (final, Word + PDF)",
      "Fundraising Valuation Workbook (Excel)",
      "Financial Roadmap to IPO",
      "Investor information-request pack",
    ],
    outcomes: [
      { stat: "2 yrs", label: "audited financials analysed" },
      { stat: "VC → IPO", label: "single continuous roadmap" },
      { stat: "4", label: "investor-grade documents delivered" },
    ],
    keywords: [
      "startup fundraising consultant", "VC pitch advisory India", "healthcare startup valuation",
      "roadmap to IPO", "venture capital proposal", "fundraising documents startup",
    ],
    metaDesc:
      "Fundraising readiness for a healthcare venture — valuation workbook, strategic proposal and a financial roadmap from VC round to IPO. YUGA capital advisory case file.",
    related: [
      { label: "Capital market services", href: "/capital-market" },
      { label: "IPO readiness tool", href: "/capital-market#tools" },
    ],
  },
] as const;

export const projectIds = featuredProjects.map((p) => p.id);
export const getFeaturedProject = (id: string) => featuredProjects.find((p) => p.id === id);

/** caseStudies title → /projects id (cards that have a full case file). */
export const caseStudyProjectLinks: Readonly<Record<string, string>> = {
  "LPG Import Licence & PESO Advisory": "lpg-import-licence-peso",
  "Bio-Bitumen + Plastic-to-Fuel": "bio-bitumen-plastic-to-fuel-odisha",
  "Asphalt Shingle EOU Plant — Kandla SEZ": "asphalt-shingle-eou-kasez",
  "20 TPD Plastic-to-Fuel DPR": "plastic-to-fuel-20tpd-dpr",
  "Healthcare Venture — VC to IPO Roadmap": "vc-fundraising-ipo-roadmap",
};
