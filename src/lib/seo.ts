/**
 * Shared SEO defaults.
 *
 * Next.js merges route metadata SHALLOWLY: when a page sets its own `openGraph`
 * (or `twitter`) object, it REPLACES the layout's entirely — it does not deep-merge.
 * So any page that overrides `openGraph` must re-include the default share image,
 * or social previews (WhatsApp / LinkedIn / X) render with no image. Spread
 * `OG_IMAGE` into that page's `openGraph.images` to keep the default card.
 */
import { siteUrl } from "./site";

/** Default social-share card — a 1200×630 branded image at `public/og-default.jpg`. */
export const OG_IMAGE = {
  url: `${siteUrl}/og-default.jpg`,
  width: 1200,
  height: 630,
  alt: "YUGA — Pyrolysis Plant PMC, AI Software & Capital Markets in India",
} as const;
