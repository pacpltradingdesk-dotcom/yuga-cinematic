import type { Metadata } from "next";
import { BadgeCheck, Globe } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTASection } from "@/components/page/CTASection";
import { PlantGallery } from "@/components/page/PlantGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { Leadership } from "@/components/page/Leadership";
import { ProcessTimeline } from "@/components/visual/ProcessTimeline";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { Services } from "@/components/page/Services";
import { trust } from "@/lib/catalog";
import { company, career, partnerships, keyFacts } from "@/lib/site";

/** Address mentions are filtered out site-wide per project decision. */
const trustBlocks = Object.values(trust).map((b) => ({
  ...b,
  points: b.points.filter((p) => !/address/i.test(p)),
}));

export const metadata: Metadata = {
  title: "About YUGA",
  alternates: { canonical: "/about" },
  description:
    "PPS Anantams Corporation (PACPL) - India's full-service pyrolysis & bitumen plant PMC, founded by 25-year industry veteran and BSE-listed entrepreneur Prince Pratap Shah.",
};

export default function AboutPage() {
  return (
    <>
      <NoiseOverlay />
      <PageHero
        eyebrow="About · PACPL"
        title="Vision · Strategy · Execution"
        intro={`${company.legal} is India's leading full-service PMC for pyrolysis & bitumen plants - and a builder of AI software for the industry. One-point solution from feasibility to post-commissioning hand-holding.`}
        accent="amber"
        image="aboutHero"
      />

      {/* Key facts */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="At a Glance" title="A track record you can underwrite." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {keyFacts.map((f, i) => (
              <Reveal key={f} index={i % 3}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-[var(--color-line)] p-6">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                  <span className="text-sm text-[var(--color-muted)]">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership + founder journey */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Leadership"
            title="Who you're actually working with."
            intro="Senior, hands-on operators who have personally commissioned plants — accountable from feasibility to commissioning, not desk consultants."
          />
          <div className="mt-12">
            <Leadership />
          </div>

          <div className="mt-16 border-t border-[var(--color-line)] pt-14">
            <SectionHeading eyebrow="Founder's Journey" title="25 years, plant by plant." />
            <div className="mt-12">
              <ProcessTimeline steps={career.map((c) => ({ n: c.yr.slice(2, 4), t: c.t, d: `${c.yr} · ${c.d}` }))} />
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="International Partnerships" title="Trusted across borders." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {partnerships.map((p, i) => (
              <Reveal key={p.p} index={i}>
                <GlowCard accent={i % 2 ? "cyan" : "amber"} className="h-full">
                  <div className="flex h-full flex-col p-7">
                    <Globe size={22} className="text-[var(--color-faint)]" />
                    <h3 className="mt-6 font-display text-lg font-semibold leading-snug">{p.p}</h3>
                    <p className="mt-auto pt-4 text-sm text-[var(--color-muted)]">{p.d}</p>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust YUGA */}
      <section className="relative isolate border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <SectionBackdrop name="indHero" />
        <div className="maxw container-x">
          <SectionHeading eyebrow="Why Trust YUGA" title="Proof across every dimension." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {trustBlocks.map((b, i) => (
              <Reveal key={b.title} index={i % 2}>
                <div className="h-full rounded-3xl border border-[var(--color-line)] p-8">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{b.title}</h3>
                  <ul className="mt-5 grid gap-2.5">
                    {b.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--color-muted)]">
                        <BadgeCheck size={16} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to work with us */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Ways to Work With Us"
            title="Joint venture, collaboration or job work."
            intro="Beyond consulting — co-invest, partner across the value chain, use our network for contract production, or start with a research & feasibility report."
          />
          <div className="mt-12">
            <Services />
          </div>
        </div>
      </section>

      <PlantGallery slug="journey" title="The client journey, in pictures." />

      <CTASection title="Partner with proven operators." />
    </>
  );
}
