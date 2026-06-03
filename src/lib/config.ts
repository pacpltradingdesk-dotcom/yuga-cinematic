/**
 * Public, client-safe runtime config. All values come from NEXT_PUBLIC_* env
 * vars and are SAFE to expose by design (Web3Forms access key, GA4 measurement
 * ID, Clarity project ID, Turnstile site key are all public-facing).
 *
 * Everything degrades gracefully when unset:
 *  - no Web3Forms key  → contact form falls back to WhatsApp
 *  - no GA4 / Clarity  → analytics simply never loads (consent still respected)
 *  - no Turnstile key  → the widget is skipped
 *  - no AI endpoint    → AI assistant stays in static catalog-search mode
 */
export const config = {
  /** web3forms.com access key (client-side form → email). */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
  /** Google Analytics 4 measurement ID, e.g. "G-XXXXXXX". */
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  /** Microsoft Clarity project ID. */
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
  /** Cloudflare Turnstile site key (spam protection). */
  turnstileKey: process.env.NEXT_PUBLIC_TURNSTILE_KEY ?? "",
  /**
   * AI chat endpoint URL — a client-hosted serverless proxy that holds the LLM
   * API key server-side and answers `{ query, context, history }` POSTs. Kept
   * out of the static bundle on purpose: the secret never reaches the browser.
   * Unset → the assistant runs its built-in static catalog search instead.
   */
  aiEndpoint: process.env.NEXT_PUBLIC_AI_ENDPOINT ?? "",
} as const;

export const hasWeb3Forms = (): boolean => config.web3formsKey.length > 0;
export const hasAnalytics = (): boolean => config.ga4Id.length > 0 || config.clarityId.length > 0;
export const hasAiChat = (): boolean => config.aiEndpoint.length > 0;
