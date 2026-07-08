import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page/PageHero";
import { serviceLd, breadcrumbLd, jsonLd } from "@/lib/seo";
import { CTASection } from "@/components/page/CTASection";
import { PlantGallery } from "@/components/page/PlantGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ProcessTimeline } from "@/components/visual/ProcessTimeline";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { InstantTools } from "@/components/tools/InstantTools";
import { VerticalFaq } from "@/components/page/VerticalFaq";
import { sevenPhases, products, clientTypes, fees } from "@/lib/site";
import { Media } from "@/components/visual/Media";
import type { ImgKey } from "@/lib/media";

const prodImg: ImgKey[] = ["prod0", "prod1", "prod2", "prod3", "prod4"];

export const metadata: Metadata = {
  title: "Industrial Consulting",
  alternates: { canonical: "/industrial-consulting" },
  description:
    "End-to-end bitumen plant consultancy - PMB, CRMB, Emulsion, Decanter and Blown bitumen - across a 7-phase A-to-Z delivery model.",
};

export default function IndustrialConsultingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceLd({
              name: "Industrial Consulting — 7-phase Plant PMC",
              description:
                "Project Management Consultancy for pyrolysis and bitumen-product plants — a 7-phase model from feasibility, DPR and licences through machinery, commissioning and first buyers.",
              path: "/industrial-consulting",
            }),
            breadcrumbLd([{ name: "Industrial Consulting", path: "/industrial-consulting" }]),
          ),
        }}
      />
      <NoiseOverlay />
      <PageHero
        eyebrow="Vertical A · PMC / EPC"
        title="Pyrolysis & Bitumen Plant Consulting, A to Z"
        intro="A 7-phase delivery model that takes a pyrolysis plant (plastic-to-fuel, tyre/rubber-to-oil, bio-bitumen) or a bitumen-product plant (PMB, CRMB, Emulsion, Decanter, Blown) from feasibility to commercial production - and your first buyers."
        accent="amber"
        image="indHero"
      />

      {/* Founder consulting at the pyrolysis plant */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="On the ground"
            title="Consulting where it matters — at the plant."
            intro="Not a desk report. From the pyrolysis reactor to the dispatch gate, our founder and team are on-site through every phase."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { src: "/assets/img/gen/founder-pyrolysis-reactor.jpg", alt: "YUGA founder explaining the pyrolysis reactor to an engineer" },
              { src: "/assets/img/gen/founder-pyrolysis-team.jpg", alt: "YUGA founder leading a client walkthrough of a pyrolysis plant" },
            ].map((im, i) => (
              <Reveal key={im.src} index={i}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-[var(--color-line)]">
                  <Image src={im.src} alt={im.alt} fill sizes="(max-width: 640px) 100vw, 45vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 phases */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Our A-to-Z Services"
            title="Seven phases. One accountable partner."
            intro="We don't hand you a report and disappear - we stay through commissioning and six months of sales hand-holding."
          />
          <div className="mt-16">
            <ProcessTimeline steps={sevenPhases} />
          </div>
        </div>
      </section>

      {/* Product plants */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="Bitumen Product Plants" title="Five proven product lines." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.name} index={i % 3}>
                <GlowCard accent={i % 2 ? "cyan" : "amber"} className="h-full">
                  <div className="flex h-full flex-col">
                    <Media
                      name={prodImg[i]}
                      overlay="bottom"
                      sizes="(max-width:1024px) 100vw, 33vw"
                      className="h-36 w-full rounded-t-[calc(1.5rem-1px)]"
                    />
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-display text-xl font-semibold tracking-tight">{p.name}</h3>
                      <p className="mt-2 text-sm text-[var(--color-amber)]">{p.spec}</p>
                      <p className="mt-auto pt-6 text-sm text-[var(--color-muted)]">
                        <span className="text-[var(--color-faint)]">Industries · </span>
                        {p.industries}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="Who We Serve" title="Five client journeys, one outcome." />
          <div className="mt-12 grid gap-4">
            {clientTypes.map((c, i) => (
              <Reveal key={c.t} index={Math.min(i, 3)}>
                <div className="group flex flex-col gap-2 rounded-2xl border border-[var(--color-line)] p-6 transition-colors hover:bg-[var(--color-surface)] sm:flex-row sm:items-center sm:justify-between">
                  <div className="sm:max-w-2xl">
                    <h3 className="font-display text-lg font-semibold">{c.t}</h3>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{c.d}</p>
                  </div>
                  <Badge accent="amber" className="w-fit shrink-0">
                    {c.inv}
                  </Badge>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Instant tools */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Plan it yourself"
            title="Size the investment before you commit."
            intro="Pick a budget and state — see which plant fits, the output and payback, and the subsidy you can claim."
          />
          <div className="mt-12">
            <InstantTools />
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Consulting Fees" title="Transparent, scope-based pricing." />
          <div className="overflow-hidden rounded-3xl border border-[var(--color-line)]">
            {fees.map((f) => (
              <div
                key={f.service}
                className="flex items-center justify-between border-b border-[var(--color-line)] px-6 py-5 text-sm last:border-0 transition-colors hover:bg-[var(--color-raised)]/50"
              >
                <span className="text-[var(--color-muted)]">{f.service}</span>
                <span className="font-display font-medium text-gradient-warm">{f.fee}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VerticalFaq vkey="pmc" eyebrow="Why a PMC" />

      <PlantGallery slug="complete" title="Inside a complete YUGA plant setup." variant="masonry" />

      <CTASection title="Build your plant the right way." />
    </>
  );
}
