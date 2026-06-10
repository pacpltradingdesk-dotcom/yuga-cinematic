/**
 * AI assistant data + transport layer (kept out of the component so the widget
 * stays layout-only). Two modes:
 *
 *  1. Static (default): the component searches the catalog index in the browser.
 *  2. LLM (optional): when `NEXT_PUBLIC_AI_ENDPOINT` is set, we POST the user's
 *     query + grounding context to that client-hosted serverless proxy, which
 *     holds the model key server-side and returns a grounded answer.
 *
 * The proxy contract is intentionally tiny so the client can implement it on any
 * platform (Vercel/Cloudflare/Lambda):
 *   POST { query: string, context: string, history: ChatMessage[] }
 *   200  { answer: string }            ← rendered as the assistant reply
 *   non-200 / bad shape                ← caller shows a graceful fallback
 */
import { products, getProduct } from "@/lib/catalog";
import { faqs, company, capacities, loans, keyFacts } from "@/lib/site";
import { config } from "@/lib/config";
import { KNOWLEDGE } from "@/lib/knowledge";

export interface ChatMessage {
  readonly role: "user" | "assistant";
  readonly content: string;
}

interface ChatResponse {
  readonly answer: string;
}

function isChatResponse(v: unknown): v is ChatResponse {
  return typeof v === "object" && v !== null && typeof (v as ChatResponse).answer === "string";
}

/**
 * Compact, grounding context sent to the LLM proxy so answers stay factual to
 * YUGA's catalog. Trimmed to the essentials to keep the payload small.
 */
export function buildAiContext(): string {
  const lines: string[] = [
    `Company: ${company.legal} (brand ${company.brand}). ${company.oneLiner}`,
    `Contact: ${company.phones[0]} · ${company.emails[0]}.`,
    "",
    "KEY FACTS / CREDENTIALS (all indicative / verified per the site):",
    ...keyFacts.map((f) => `- ${f}`),
    "",
    "PRODUCTS / PLANTS:",
    ...products.map(
      (p) => `- ${p.title} (/products/${p.slug}): ${p.subtitle}`,
    ),
    "",
    "INDICATIVE PLANT CAPACITY → COST (bio-bitumen; varies with scope):",
    ...capacities.map((c) => `- ${c.cap}: ${c.inv} (${c.best})`),
    "",
    "FINANCE / LOAN SCHEMES (indicative — eligibility & rates depend on current rules):",
    ...loans.map((l) => `- ${l.scheme}: rate ${l.rate}, up to ${l.max}, collateral ${l.collateral}`),
    "",
    "DOMAIN KNOWLEDGE (bitumen / bio-bitumen / plant business):",
    ...KNOWLEDGE.map((k) => `- ${k.title}: ${k.answer}`),
    "",
    "FAQs:",
    ...faqs.map((f) => `- Q: ${f.q}\n  A: ${f.a}`),
  ];
  return lines.join("\n");
}

/**
 * What page the visitor is on right now, so the LLM can answer "what's on this
 * page?" specifically instead of generically. Derived from the route.
 */
const PAGE_INFO: Readonly<Record<string, string>> = {
  "/": "Home — overview of YUGA's three verticals: bitumen / bio-bitumen plant PMC, AI software, and capital-markets fundraising.",
  "/bio-bitumen": "Bio-Bitumen & Pyrolysis — how YUGA sets up bio-bitumen, plastic-to-fuel and tyre-to-oil plants (CSIR-CRRI KrishiBind aligned), capacities and the 4-stage process.",
  "/products": "Products — all the plants YUGA sets up (bio-bitumen, PMB, CRMB, emulsion, decanter, blown, plastic-to-fuel, tyre-to-oil, asphalt shingle).",
  "/it-software": "Software — YUGA's in-house AI tools (sales dashboard, CRM, WhatsApp automation, market reports) offered to clients.",
  "/capital-market": "Capital Markets & Fundraising — seed to IPO: bank loans, subsidy (CGTMSE/SIDBI), equity, valuation and DPR. The founder took Omnipotent Industries to a BSE SME listing (2021).",
  "/industrial-consulting": "Industrial Consulting — the 7-phase PMC process from feasibility to market support.",
  "/market-intelligence": "Market & Research — bitumen market data, the bio-bitumen opportunity, and the ₹5 lakh research report.",
  "/about": "About — YUGA / PPS Anantams and founder Prince Pratap Shah's 25-year track record.",
  "/case-studies": "Case Studies — live YUGA plant projects and the report library.",
  "/contact": "Contact — phone, WhatsApp, email and office cities (Vadodara, Mumbai).",
  "/explore": "Explore — a map of the whole site by goal.",
  "/glossary": "Glossary — bitumen and finance terms explained.",
  "/sources": "Sources & Disclosures — official sources behind every claim on the site.",
};

export function currentPageContext(pathname: string): string {
  // Static export uses trailingSlash:true, so pathname arrives as "/capital-market/".
  // Normalise to match the keys below (keep root as "/").
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const productMatch = path.match(/^\/products\/([^/]+)/);
  if (productMatch) {
    const p = getProduct(productMatch[1]);
    if (p) return `Product detail — ${p.title}: ${p.subtitle}`;
  }
  if (path.startsWith("/legal")) return "A legal / policy page (privacy, terms, disclaimer, etc.).";
  return PAGE_INFO[path] ?? "A page on the YUGA site.";
}

/**
 * Ask the client-hosted AI proxy. Throws on any failure so the caller can fall
 * back to static search and show a friendly message — never silently swallow.
 * `pageContext` (from currentPageContext) lets the LLM answer "what's on this page?".
 */
export async function askAi(query: string, history: readonly ChatMessage[], pageContext?: string): Promise<string> {
  const context = pageContext
    ? `CURRENT PAGE the visitor is viewing right now: ${pageContext}\n\n${buildAiContext()}`
    : buildAiContext();
  const res = await fetch(config.aiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, context, history }),
  });
  if (!res.ok) throw new Error(`AI endpoint responded ${res.status}`);
  const data: unknown = await res.json();
  if (!isChatResponse(data)) throw new Error("AI endpoint returned an unexpected shape");
  return data.answer.trim();
}
