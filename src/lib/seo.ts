/**
 * Shared SEO defaults.
 *
 * Next.js merges route metadata SHALLOWLY: when a page sets its own `openGraph`
 * (or `twitter`) object, it REPLACES the layout's entirely — it does not deep-merge.
 * So any page that overrides `openGraph` must re-include the default share image,
 * or social previews (WhatsApp / LinkedIn / X) render with no image. Spread
 * `OG_IMAGE` into that page's `openGraph.images` to keep the default card.
 */
import { siteUrl, company } from "./site";
import { leadership } from "./team";

/** Default social-share card — a 1200×630 branded image at `public/og-default.jpg`. */
export const OG_IMAGE = {
  url: `${siteUrl}/og-default.jpg`,
  width: 1200,
  height: 630,
  alt: "YUGA — Pyrolysis Plant PMC, AI Software & Capital Markets in India",
} as const;

/** Reference to the Organization node defined once in layout.tsx (@id = siteUrl/#org). */
const ORG_ID = `${siteUrl}/#org`;

/** Founder Person schema — feeds Google E-E-A-T signals on /about. */
export function founderPersonLd() {
  const f = leadership[0];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: f.name,
    jobTitle: f.role,
    description: f.bio,
    worksFor: { "@type": "Organization", "@id": ORG_ID, name: company.legal },
    ...(f.linkedin ? { sameAs: [f.linkedin] } : {}),
    knowsAbout: ["Pyrolysis plants", "Bio-bitumen", "Bitumen production", "Capital markets", "IPO advisory"],
  };
}

/** Service schema for a vertical/offering page. */
export function serviceLd(o: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: o.name,
    serviceType: o.serviceType ?? o.name,
    description: o.description,
    provider: { "@type": "Organization", "@id": ORG_ID, name: company.legal },
    areaServed: { "@type": "Country", name: "India" },
    url: `${siteUrl}${o.path}`,
  };
}

/** BreadcrumbList — pass the trail after Home, e.g. [{name:"About",path:"/about"}]. */
export function breadcrumbLd(trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteUrl}${c.path}`,
    })),
  };
}

/** Render helper — serialize one or more JSON-LD objects for a <script> tag. */
export function jsonLd(...objects: object[]): string {
  return JSON.stringify(objects.length === 1 ? objects[0] : objects);
}
