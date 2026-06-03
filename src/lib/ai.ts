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
import { products } from "@/lib/catalog";
import { faqs, company } from "@/lib/site";
import { config } from "@/lib/config";

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
    "PRODUCTS / PLANTS:",
    ...products.map(
      (p) => `- ${p.title} (/products/${p.slug}): ${p.subtitle}`,
    ),
    "",
    "FAQs:",
    ...faqs.map((f) => `- Q: ${f.q}\n  A: ${f.a}`),
  ];
  return lines.join("\n");
}

/**
 * Ask the client-hosted AI proxy. Throws on any failure so the caller can fall
 * back to static search and show a friendly message — never silently swallow.
 */
export async function askAi(query: string, history: readonly ChatMessage[]): Promise<string> {
  const res = await fetch(config.aiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, context: buildAiContext(), history }),
  });
  if (!res.ok) throw new Error(`AI endpoint responded ${res.status}`);
  const data: unknown = await res.json();
  if (!isChatResponse(data)) throw new Error("AI endpoint returned an unexpected shape");
  return data.answer.trim();
}
