import type { MetadataRoute } from "next";
import { nav, siteUrl } from "@/lib/site";
import { productSlugs } from "@/lib/catalog";
import { legalSlugs } from "@/lib/legal";

export const dynamic = "force-static";

/**
 * Static sitemap covering every indexable route: home, the nav/service pages,
 * all 9 product detail pages and the legal/DPDP pages. Priorities rank
 * commercial-intent pages above legal boilerplate so crawlers weight them right.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (route: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${route}`,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("", 1),
    ...nav.map((item) => entry(item.href, 0.8)),
    ...productSlugs.map((slug) => entry(`/products/${slug}`, 0.7)),
    ...legalSlugs.map((slug) => entry(`/legal/${slug}`, 0.3)),
  ];
}
