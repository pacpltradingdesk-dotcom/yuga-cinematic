/**
 * Indicative pricing (client note: "Software pricing & options → all PMC and
 * capital-market pricing, minimum to avg"). All figures INDICATIVE placeholders
 * — client replaces with confirmed numbers here (one edit, no component change).
 */

export interface PriceRow {
  readonly service: string;
  /** Entry / minimum figure. */
  readonly min: string;
  /** Typical / average figure. */
  readonly avg: string;
  readonly note?: string;
}

export interface PriceTable {
  readonly key: string;
  readonly title: string;
  readonly blurb: string;
  readonly rows: readonly PriceRow[];
}

/**
 * Per-product software subscription plans (monthly, billed quarterly/yearly).
 * INDICATIVE — benchmarked against comparable Indian SaaS (CRM suites, WhatsApp
 * marketing platforms, call-analytics and BI tools). "min" = tier A · Basic,
 * "avg" = tier C · Professional. Tier D · Enterprise is always custom-quoted.
 * `slug` matches `softwareProducts` in lib/software.ts.
 */
export interface SoftwarePlan {
  readonly slug: string;
  readonly product: string;
  /** Tier A · Basic — entry price per month. */
  readonly min: string;
  /** Tier C · Professional — typical price per month. */
  readonly avg: string;
  readonly note?: string;
}

export const softwareSubscriptions: readonly SoftwarePlan[] = [
  { slug: "ai-sales-dashboard", product: "YUGA AI Sales Dashboard", min: "₹24,999/mo", avg: "₹49,999/mo", note: "Enterprise BI · market intelligence" },
  { slug: "bitumen-crm", product: "YUGA Bitumen CRM", min: "₹4,999/mo", avg: "₹12,999/mo", note: "WhatsApp CRM · by seats" },
  { slug: "whatsapp-campaign", product: "YUGA WhatsApp Campaign & Bot", min: "₹3,999/mo", avg: "₹8,999/mo", note: "Multi-account bulk messaging" },
  { slug: "excel-lead-cleaner", product: "YUGA Excel & Lead Cleaner AI", min: "₹2,499/mo", avg: "₹5,999/mo", note: "By rows processed" },
  { slug: "dialsync", product: "YUGA DialSync Call Analytics", min: "₹5,999/mo", avg: "₹12,999/mo", note: "Per ~10 agents" },
  { slug: "market-report", product: "YUGA Market Report Automation", min: "₹3,499/mo", avg: "₹7,499/mo", note: "2 reports / trading day" },
  { slug: "voice-agent", product: "YUGA AI Voice Agent", min: "Pilot", avg: "Custom", note: "Experimental · R&D engagement" },
] as const;

export const softwareSubscriptionNote =
  "Indicative monthly pricing, billed quarterly or yearly (yearly saves ~2 months). GST extra. Tier D · Enterprise, bundles and on-prem are custom-quoted — contact us for a written quote.";

export const pricingTables: readonly PriceTable[] = [
  {
    key: "pmc",
    title: "PMC & Consulting",
    blurb: "Project management consultancy — from feasibility to commissioning and market support.",
    rows: [
      { service: "Detailed Project Report (DPR)", min: "₹2 Lakh", avg: "₹5 Lakh" },
      { service: "Bank DPR + CMA / financial model", min: "₹1 Lakh", avg: "₹2 Lakh" },
      { service: "End-to-end plant setup consulting", min: "₹8 Lakh", avg: "₹25 Lakh", note: "By capacity & scope" },
      { service: "Monthly retainer (post-setup)", min: "₹1 Lakh/mo", avg: "₹2 Lakh/mo" },
      { service: "Research & feasibility report (any product, PAN-India)", min: "₹5 Lakh", avg: "₹5 Lakh+", note: "Onwards · part of PMC" },
    ],
  },
  {
    key: "software",
    title: "AI Software",
    blurb: "Subscription access to the in-house AI stack — four tiers, enable only what you need.",
    rows: [
      { service: "Starter (single tool)", min: "₹2,499/mo", avg: "₹9,999/mo", note: "By tool — see per-product plans" },
      { service: "Growth (CRM + dashboard)", min: "₹24,999/mo", avg: "₹39,999/mo" },
      { service: "Pro (full suite)", min: "₹49,999/mo", avg: "₹79,999/mo" },
      { service: "Enterprise / custom build", min: "Custom", avg: "Custom", note: "Tailored stack + on-prem" },
    ],
  },
  {
    key: "capital",
    title: "Capital Markets & Fundraising",
    blurb: "Fundraising and finance advisory — typically a retainer plus a success fee on funds raised.",
    rows: [
      { service: "Valuation & investor docs (deck, PIM, data room)", min: "₹2 Lakh", avg: "₹6 Lakh" },
      { service: "Debt / bank loan facilitation", min: "₹1 Lakh", avg: "₹3 Lakh", note: "+ % on sanction" },
      { service: "Private fundraise (seed / Series A-C)", min: "₹3 Lakh retainer", avg: "+ 3–6% success fee" },
      { service: "IPO / listing readiness", min: "On scope", avg: "On scope", note: "SME / main-board" },
    ],
  },
] as const;

export const pricingNote =
  "Indicative only — final pricing depends on product, capacity, scope and engagement length. Not an offer; contact us for a written quote.";
