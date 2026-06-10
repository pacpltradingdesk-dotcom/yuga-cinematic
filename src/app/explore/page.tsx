import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTASection } from "@/components/page/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoalRouter } from "@/components/page/GoalRouter";
import { Reveal } from "@/components/ui/Reveal";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { Term } from "@/components/ui/Term";
import { SiteMap } from "@/components/page/SiteMap";

export const metadata: Metadata = {
  title: "Explore the YUGA Site — Plants, Software & Capital",
  alternates: { canonical: "/explore" },
  description:
    "A map of the whole YUGA site. Find what you need by goal — set up a plant, fund a project, or run your sales on AI software — or browse every section in one place.",
};

export default function ExplorePage() {
  return (
    <>
      <NoiseOverlay />
      <PageHero
        eyebrow="Start Here"
        title="The whole site, on one page."
        intro="Not sure where to look? Pick your goal below, or browse every section. Hover a term like the DPR or VG-30 anywhere on the site to see what it means."
        accent="cyan"
        crumbs={[{ label: "Home", href: "/" }, { label: "Explore" }]}
      />

      {/* By goal */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="By Goal" title="What do you want to do?" />
          <div className="mt-12">
            <GoalRouter />
          </div>
        </div>
      </section>

      {/* Full site map (grouped by vertical) */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Everything, By Section"
            title="The full map."
            intro="The same four areas as the top menu — Plants, Software, Capital and Company — with every page underneath."
          />
          <div className="mt-12">
            <SiteMap />
          </div>

          {/* Glossary teaser */}
          <Reveal className="mt-10">
            <Link
              href="/glossary"
              data-cursor="hover"
              className="glass flex items-center justify-between gap-4 rounded-3xl border border-[var(--color-line)] p-7 transition-colors hover:border-[color-mix(in_oklch,var(--color-cyan)_35%,transparent)]"
            >
              <div className="flex items-center gap-4">
                <Compass size={24} className="shrink-0 text-[var(--color-cyan)]" />
                <div>
                  <div className="font-display text-lg font-semibold tracking-tight">New to bitumen? Start with the glossary.</div>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    Plain-language definitions for <Term id="dpr">DPR</Term>, <Term id="vg-30">VG-30</Term>,{" "}
                    <Term id="crmb">CRMB</Term>, <Term id="cgtmse">CGTMSE</Term> and every other term on the site.
                  </p>
                </div>
              </div>
              <ArrowUpRight size={18} className="shrink-0 text-[var(--color-faint)]" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection title="Found what you need?" sub="Book a free consultation, or ask the assistant anything." />
    </>
  );
}
