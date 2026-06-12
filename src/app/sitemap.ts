import type { MetadataRoute } from "next";
import { nav, siteUrl } from "@/lib/site";
import { productSlugs } from "@/lib/catalog";
import { legalSlugs } from "@/lib/legal";
import { projectIds } from "@/lib/projects";

export const dynamic = "force-static";

/** Per-route priority — commercial-intent verticals rank above utility/legal pages. */
const NAV_PRIORITY: Readonly<Record<string, number>> = {
  "/products": 0.9,
  "/bio-bitumen": 0.9,
  "/it-software": 0.9,
  "/capital-market": 0.9,
  "/industrial-consulting": 0.8,
  "/case-studies": 0.8,
  "/about": 0.7,
  "/contact": 0.7,
  "/market-intelligence": 0.7,
  "/explore": 0.5,
  "/glossary": 0.5,
};

/**
 * Static sitemap covering every indexable route: home, the nav/service pages,
 * all 9 product detail pages and the legal/DPDP pages. Priorities rank
 * commercial-intent pages above legal boilerplate so crawlers weight them right.
 * A single build-time `lastModified` stamp is applied to every entry.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Trailing slash matches how GitHub Pages serves the site (non-slash URLs 301).
  const entry = (route: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${route}/`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("", 1),
    ...nav.map((item) => entry(item.href, NAV_PRIORITY[item.href] ?? 0.7)),
    ...productSlugs.map((slug) => entry(`/products/${slug}`, 0.8)),
    ...projectIds.map((id) => entry(`/projects/${id}`, 0.7)),
    entry("/sources", 0.4),
    ...legalSlugs.map((slug) => entry(`/legal/${slug}`, 0.3)),
  ];
}
