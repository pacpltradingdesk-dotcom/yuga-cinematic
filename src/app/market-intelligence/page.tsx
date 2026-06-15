import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, FileSearch, Check } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTASection } from "@/components/page/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LineChart, Candlestick } from "@/components/visual/Charts";
import { FAQ } from "@/components/page/FAQ";
import { NewsletterSignup } from "@/components/page/NewsletterSignup";
import { LeadGate } from "@/components/page/LeadGate";
import { MarketTicker } from "@/components/visual/MarketTicker";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { market } from "@/lib/catalog";
import { marketOpportunity, impact, statesCovered, faqs, reportLibrary } from "@/lib/site";

export const metadata: Metadata = {
  title: "Market Intelligence",
  alternates: { canonical: "/market-intelligence" },
  description:
    "Bio-bitumen market opportunity for 2026 - India's ~40% bitumen import gap, CSIR-CRRI technology, environmental impact and the pan-India network behind YUGA.",
};

export default function MarketIntelligencePage() {
  return (
    <>
      <NoiseOverlay />
      <PageHero
        eyebrow="Market Intelligence"
        title="The Bio-Bitumen Opportunity, Quantified"
        intro="India became the first country to commercially produce bio-bitumen in January 2026. The market it created is one of the largest sustainable-infrastructure opportunities of the decade."
        accent="cyan"
        image="miHero"
      />

      {/* Live market ticker (TradingView, free embed) */}
      <MarketTicker />

      {/* Opportunity grid */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="The Numbers" title="Why the timing is now." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketOpportunity.map((m, i) => (
              <Reveal key={m.label} index={i % 3}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-[var(--color-line)] p-8 transition-colors hover:bg-[var(--color-surface)]">
                  <div className="font-display text-[clamp(2.4rem,4vw,3.4rem)] font-bold leading-none tracking-tight text-gradient">
                    {m.stat}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* India bitumen market (sourced national figures) */}
      <section className="relative isolate border-t border-[var(--color-line)] py-[var(--space-section)]">
        <SectionBackdrop name="miHero" />
        <div className="maxw container-x">
          <SectionHeading eyebrow="India Bitumen Market" title="The demand the imports can't meet." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Annual demand", value: market.national.demand },
              { label: "Met domestically", value: market.national.production },
              { label: "Imported", value: market.national.importGap },
              { label: "Demand drivers", value: market.national.drivers },
            ].map((m, i) => (
              <Reveal key={m.label} index={i}>
                <div className="h-full rounded-3xl border border-[var(--color-line)] p-7">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">{m.label}</div>
                  <div className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">{m.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-[var(--color-faint)]">{market.national.src}</p>
        </div>
      </section>

      {/* Behind the research — founder */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-[var(--color-line)]">
              <Image
                src="/assets/img/gen/founder-market.jpg"
                alt="YUGA founder Prince Shah reviewing bitumen market data and price trends"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal index={1}>
            <SectionHeading
              eyebrow="Behind the research"
              title="Read by people who've sold the product."
              intro="Our market view isn't desk theory — it's built by a team that has traded bitumen, run plants and tracked this market for 25+ years. The same intelligence powers our own operations before it reaches you."
            />
          </Reveal>
        </div>
      </section>

      {/* Charts band */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Import substitution</span>
                <span className="text-xs text-[var(--color-amber)]">~40% imported</span>
              </div>
              <LineChart seed={31} accent="amber" height={200} className="h-52 w-full" />
            </div>
          </Reveal>
          <Reveal index={1}>
            <div className="glass rounded-3xl p-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Bitumen price action</span>
                <span className="text-xs text-[var(--color-cyan)]">VG-30 · live model</span>
              </div>
              <Candlestick seed={44} height={200} className="h-52 w-full" />
            </div>
          </Reveal>
          <div className="lg:col-span-2">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading eyebrow="Environmental & Social Impact" title="Every plant pays a dividend to the land." />
          <div className="grid gap-3">
            {impact.map((it, i) => (
              <Reveal key={it} index={Math.min(i, 3)}>
                <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] p-5">
                  <Leaf size={17} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                  <span className="text-sm text-[var(--color-muted)]">{it}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* States covered */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Network"
            title="18 states. 150,000 contacts. Market access from day one."
            align="center"
          />
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {statesCovered.map((s, i) => (
              <Reveal key={s} index={Math.min(i % 6, 3)}>
                <span className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-muted)] transition-colors hover:border-[var(--color-amber)] hover:text-[var(--color-ink)]">
                  {s}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Research report — gated lead magnet (₹5 Lakh onwards, part of PMC) */}
      <section className="relative isolate border-t border-[var(--color-line)] py-[var(--space-section)]">
        <SectionBackdrop name="pCap" />
        <div className="maxw container-x">
          <div className="glass grid gap-10 rounded-[2rem] p-8 ring-glow sm:p-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--color-amber)]">
                <FileSearch size={14} /> Research & Feasibility Report
              </div>
              <h2 className="mt-5 font-display text-[length:var(--text-h2)] font-semibold leading-[1.05] tracking-tight">
                Any product. PAN-India. Bankable.
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-[var(--color-muted)]">
                A deep research & feasibility report for any product, anywhere in India — the same
                analysis we run before every PMC engagement. <span className="text-[var(--color-ink)]">₹5 Lakh onwards · part of PMC.</span>
              </p>
              <div className="mt-7">
                <LeadGate
                  label="Request the report"
                  interest="Industry Research & Feasibility Report (₹5 Lakh onwards)"
                  source="market-intelligence:research-report"
                  variant="glow"
                  icon={<FileSearch size={15} />}
                  title="Request the research report"
                  subtitle="Share your details and the product/region you're after — we'll scope the report and revert within a business day."
                />
              </div>
            </div>
            <ul className="grid gap-3 self-center">
              {reportLibrary.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
                  <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="FAQ" title="Questions investors actually ask." />
          <div className="mt-10">
            <FAQ items={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Move before the rest of the market does."
        sub="India is the first country to commercially produce bio-bitumen, with ~1,000 km of pilot roads planned by 2027. Position early."
      />
    </>
  );
}
