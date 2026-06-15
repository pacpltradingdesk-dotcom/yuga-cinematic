import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTASection } from "@/components/page/CTASection";
import { PlantGallery } from "@/components/page/PlantGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { Media } from "@/components/visual/Media";
import { products } from "@/lib/catalog";
import { productImg } from "@/lib/media";

export const metadata: Metadata = {
  title: "Products — Plant & Manufacturing",
  alternates: { canonical: "/products" },
  description:
    "Nine pyrolysis & bitumen plants YUGA takes from DPR to commercial production — plastic-to-fuel, tyre/rubber-to-oil, bio-bitumen, PMB, CRMB, decanter, emulsion, micro-surfacing and blown bitumen.",
};

export default function ProductsPage() {
  return (
    <>
      <NoiseOverlay />
      <PageHero
        eyebrow="Plant & Manufacturing"
        title="Nine plants we take from DPR to production."
        intro="Each product is a complete, bankable business — feedstock to finished grade. Open any one for specs, plant, machinery, indicative cost & ROI, best states and a full Q&A."
        accent="amber"
        image="indHero"
      />

      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="The Catalogue" title="Choose a plant to explore." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} index={i % 3}>
                <GlowCard accent={i % 2 ? "cyan" : "amber"} className="h-full">
                  <Link
                    href={`/products/${p.slug}`}
                    data-cursor="hover"
                    className="flex h-full flex-col"
                  >
                    <Media
                      name={productImg[p.slug]}
                      overlay="bottom"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="h-40 w-full rounded-t-[calc(1.5rem-1px)]"
                    />
                    <div className="flex flex-1 flex-col p-7 pt-6">
                      <h3 className="font-display text-xl font-semibold leading-tight tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                        {p.subtitle}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-ink)]">
                        Explore plant
                        <ArrowUpRight
                          size={15}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PlantGallery slug="company" title="One YUGA plant, every angle." />

      <CTASection title="Not sure which plant fits your budget?" sub="Tell us your capital and state — we'll map the best-fit product, subsidy and payback." />
    </>
  );
}
