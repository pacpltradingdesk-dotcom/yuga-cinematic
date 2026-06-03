/**
 * Lead capture for gated downloads / requests (DPR, brochure, research report).
 * Static-export friendly: submits to Web3Forms (client-side, key is public by
 * design) so the client gets the lead by email, with a WhatsApp deep-link as a
 * guaranteed fallback — the lead is never lost even with no key or a failed POST.
 */
import { company, waLink } from "@/lib/site";
import { config, hasWeb3Forms } from "@/lib/config";

export interface LeadInput {
  readonly name: string;
  readonly phone: string;
  readonly email?: string;
  /** What the visitor is requesting, e.g. "DPR — Bio-Bitumen Plant". */
  readonly interest: string;
  /** Where the request came from, e.g. "product:bio-bitumen". */
  readonly source: string;
  readonly marketing?: boolean;
}

export type LeadResult = "emailed" | "whatsapp";

/** WhatsApp deep link prefilled with the lead's request and details. */
export function leadWaLink(input: LeadInput): string {
  const msg =
    `Hi ${company.brand} — I'd like: ${input.interest}\n` +
    `Name: ${input.name}\n` +
    (input.phone.trim() ? `Phone: ${input.phone}\n` : "") +
    (input.email?.trim() ? `Email: ${input.email}\n` : "") +
    `(requested via ${input.source})`;
  return waLink(msg);
}

/**
 * Email the lead to the client via Web3Forms. Returns "emailed" on success.
 * Returns "whatsapp" when no key is configured (caller should open WhatsApp).
 * Throws on a hard network/HTTP failure so the caller can fall back too.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  if (!hasWeb3Forms()) return "whatsapp";
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: config.web3formsKey,
      subject: `Download/Request: ${input.interest} — ${company.brand}`,
      from_name: input.name,
      name: input.name,
      phone: input.phone,
      email: input.email ?? "",
      requested: input.interest,
      source: input.source,
      marketing_optin: input.marketing ? "yes" : "no",
      consent: "yes",
    }),
  });
  if (!res.ok) throw new Error(`Web3Forms responded ${res.status}`);
  return "emailed";
}
