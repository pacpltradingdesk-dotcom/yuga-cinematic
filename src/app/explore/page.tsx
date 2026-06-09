import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Factory, Landmark, Cpu, Compass } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTASection } from "@/components/page/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { Term } from "@/components/ui/Term";
import { navGroups } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Explore the YUGA Site — Plants, Software & Capital",
  alternates: { canonical: "/explore" },
  description:
    "A map of the whole YUGA site. Find what you need by goal — set up a plant, fund a project, or run your sales on AI software — or browse every section in one place.",
};

/** "By goal" router — the fastest way for a visitor to self-route. */
const goals = [
  { icon: Factory, t: "I want to set up a plant", d: "Bio-bitumen, pyrolysis, PMB/CRMB, emulsion — DPR to production.", href: "/products", cta: "See the 9 plants", accent: "amber" as const },
  { icon: Landmark, t: "I want to fund a project", d: "Bank loan, subsidy, equity or IPO — with bankable documents.", href: "/capital-market", cta: "Funding options", accent: "cyan" as const },
  { icon: Cpu, t: "I want AI sales software", d: "The in-house stack that runs our own bitumen business.", href: "/it-software", cta: "See the software", accent: "amber" as const },
];

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
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {goals.map((g, i) => (
              <Reveal key={g.t} index={i}>
                <Link href={g.href} data-cursor="hover">
                  <GlowCard accent={g.accent} className="h-full">
                    <div className="flex h-full flex-col p-8">
                      <g.icon size={26} className="text-[var(--color-amber)]" />
                      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{g.t}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{g.d}</p>
                      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-ink)]">
                        {g.cta} <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </GlowCard>
                </Link>
              </Reveal>
            ))}
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
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {navGroups.map((group, i) => (
              <Reveal key={group.label} index={i}>
                <div className="rounded-3xl border border-[var(--color-line)] p-7">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                    {group.label}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-faint)]">{group.blurb}</p>
                  <ul className="mt-5 grid gap-3 border-t border-[var(--color-line)] pt-5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          data-cursor="hover"
                          className="group block transition-colors"
                        >
                          <span className="flex items-center gap-1 text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-amber)]">
                            {item.label}
                            <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                          </span>
                          <span className="block text-xs text-[var(--color-muted)]">{item.desc}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
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
