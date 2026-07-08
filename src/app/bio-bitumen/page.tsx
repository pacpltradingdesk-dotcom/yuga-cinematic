import type { Metadata } from "next";
import { Leaf, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { serviceLd, breadcrumbLd, jsonLd } from "@/lib/seo";
import { CTASection } from "@/components/page/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ProcessTimeline } from "@/components/visual/ProcessTimeline";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Term } from "@/components/ui/Term";
import { FinanceTools } from "@/components/tools/FinanceTools";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { ParallaxGallery } from "@/components/visual/ParallaxGallery";
import { plantTypes, bioProcess, capacities, marketOpportunity } from "@/lib/site";
import { Media } from "@/components/visual/Media";
import type { ImgKey } from "@/lib/media";

const ptImg: ImgKey[] = ["bio0", "bio1", "bio2", "bio3"];

export const metadata: Metadata = {
  title: "Pyrolysis Plant PMC",
  alternates: { canonical: "/bio-bitumen" },
  description:
    "Pyrolysis bio-bitumen, plastic-to-fuel and tyre-to-oil plant consultancy - CSIR-CRRI KrishiBind aligned, NHAI/MoRTH compliant, from DPR to commissioning.",
};

export default function BioBitumenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceLd({
              name: "Pyrolysis Plant PMC",
              description:
                "End-to-end consultancy for pyrolysis bio-bitumen, plastic-to-fuel and tyre-to-oil plants — CSIR-CRRI KrishiBind aligned, NHAI/MoRTH compliant, from DPR to commissioning.",
              path: "/bio-bitumen",
            }),
            breadcrumbLd([{ name: "Pyrolysis Plants", path: "/bio-bitumen" }]),
          ),
        }}
      />
      <NoiseOverlay />
      <PageHero
        eyebrow="Vertical A · YUGA PMC"
        title="Pyrolysis & Bio-Bitumen Plant Consultancy"
        intro={<>Agro-waste becomes road. We design and plan bio-bitumen, plastic-to-fuel and tyre-to-oil plants end to end — CSIR-CRRI (KrishiBind) aligned and <Term id="nhai-morth">NHAI/MoRTH</Term> compliant.</>}
        accent="amber"
        image="bioHero"
      >
        <Reveal index={3}>
          <div className="mt-9 flex flex-wrap gap-4">
            <MagneticButton href="/contact" variant="glow">
              Request a DPR <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="/industrial-consulting" variant="ghost">
              See full PMC scope
            </MagneticButton>
            <MagneticButton href="/products/bio-bitumen" variant="ghost">
              Bio-Bitumen plant: specs &amp; cost
            </MagneticButton>
          </div>
        </Reveal>
      </PageHero>

      {/* Parallax image grid — all plant images stay visible, each drifts on scroll */}
      <section className="relative bg-[var(--color-void)] pt-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Agro-waste → Road"
            title="Inside the pyrolysis world."
            align="center"
          />
        </div>
        <div className="mt-12">
          <ParallaxGallery />
        </div>
      </section>

      {/* What we build */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="What We Build"
            title="Four categories of sustainable industrial plant."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {plantTypes.map((p, i) => (
              <Reveal key={p.code} index={i % 2}>
                <GlowCard accent={i % 2 ? "cyan" : "amber"} className="h-full">
                  <div className="flex h-full flex-col">
                    <div className="relative">
                      <Media
                        name={ptImg[i]}
                        overlay="bottom"
                        animate
                        sizes="(max-width:768px) 100vw, 50vw"
                        className="h-44 w-full rounded-t-[calc(1.5rem-1px)]"
                      />
                      <div className="absolute left-6 top-6 rounded-full bg-[var(--color-void)]/75 backdrop-blur-sm">
                        <Badge accent={i % 2 ? "cyan" : "amber"}>{p.code}</Badge>
                      </div>
                      <Leaf size={20} className="absolute right-6 top-6 text-[var(--color-ink)]/80" />
                    </div>
                    <div className="flex flex-1 flex-col p-8 pt-6">
                      <h3 className="font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{p.desc}</p>
                      <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-6">
                        {p.items.map((it) => (
                          <span
                            key={it}
                            className="rounded-full bg-[var(--color-raised)] px-3 py-1 text-xs text-[var(--color-muted)]"
                          >
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="The 4-Stage Process"
            title="From agricultural waste to certified road bitumen."
            intro="A continuous, NHAI-spec pipeline - heat, refine, blend, certify."
          />
          <div className="mt-16">
            <ProcessTimeline steps={bioProcess} />
          </div>
        </div>
      </section>

      {/* Capacities */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Capacities & Investment"
            title="Sized for every scale of investor."
            intro="Indicative only - exact cost depends on location, land, biomass availability and process stages."
          />
          <div className="mt-12 overflow-hidden rounded-3xl border border-[var(--color-line)]">
            <div className="grid grid-cols-[1.2fr_1fr_1.4fr] bg-[var(--color-raised)] px-6 py-4 text-xs uppercase tracking-wider text-[var(--color-faint)]">
              <span>Capacity</span>
              <span>Investment</span>
              <span>Best for</span>
            </div>
            {capacities.map((c, i) => (
              <div
                key={c.cap}
                className="grid grid-cols-[1.2fr_1fr_1.4fr] items-center border-t border-[var(--color-line)] px-6 py-4 text-sm transition-colors hover:bg-[var(--color-raised)]/50"
              >
                <span className="font-display font-medium">{c.cap}</span>
                <span className="text-gradient-warm font-medium">{c.inv}</span>
                <span className="text-[var(--color-muted)]">{c.best}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance & valuation tools */}
      <section className="relative isolate border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <SectionBackdrop name="bioHero" />
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Size & Finance It"
            title="Configure your plant, then size the loan."
            intro="Build a CAPEX with add-ons, then see the term-loan split, EMI and CGTMSE eligibility — all indicative, instant."
          />
          <div className="mt-12">
            <FinanceTools />
          </div>
        </div>
      </section>

      {/* Opportunity strip */}
      <section className="border-t border-[var(--color-line)] py-20">
        <div className="maxw container-x">
          <SectionHeading eyebrow="Why Now" title="A market created in January 2026." align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketOpportunity.slice(0, 3).map((m, i) => (
              <Reveal key={m.stat} index={i} className="rounded-2xl border border-[var(--color-line)] p-7 text-center">
                <div className="font-display text-4xl font-bold text-gradient">{m.stat}</div>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{m.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Plan your bio-bitumen plant with YUGA." />
    </>
  );
}
