import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTASection } from "@/components/page/CTASection";
import { PlantGallery } from "@/components/page/PlantGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { MarketTicker } from "@/components/visual/MarketTicker";
import { Candlestick } from "@/components/visual/Charts";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { CapitalTools } from "@/components/tools/CapitalTools";
import { Term } from "@/components/ui/Term";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { VerticalFaq } from "@/components/page/VerticalFaq";
import { funding, fundraising } from "@/lib/catalog";
import { fundStages, loans, finPrep } from "@/lib/site";

export const metadata: Metadata = {
  title: "Capital Markets & Fundraising",
  alternates: { canonical: "/capital-market" },
  description:
    "From seed to IPO - fundraising, valuation, bank DPRs, subsidies and financial preparation, backed by first-hand BSE listing experience.",
};

export default function CapitalMarketPage() {
  return (
    <>
      <NoiseOverlay />
      <PageHero
        eyebrow="Vertical C · Capital Markets"
        title="From First Seed Cheque to Public Listing"
        intro="Full-spectrum fundraising and finance advisory - backed by a real, first-hand BSE SME listing (Omnipotent Industries, bitumen, 2021)."
        accent="amber"
        image="capHero"
      />

      {/* Live market ticker (TradingView, free embed) */}
      <MarketTicker />

      {/* Terminal + stages */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="glass overflow-hidden rounded-[2rem] p-8 ring-glow">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">
                  Market Research Terminal
                </span>
                <Badge accent="cyan">Live</Badge>
              </div>
              <Candlestick seed={14} height={220} className="h-56 w-full" />
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--color-line)] pt-6 text-center">
                {[["Pre-market", "8:45 AM"], ["Closing", "4:00 PM"], ["Coverage", "FII/DII"]].map(([a, b]) => (
                  <div key={a}>
                    <div className="font-display text-lg font-semibold text-gradient-warm">{b}</div>
                    <div className="text-xs text-[var(--color-faint)]">{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading eyebrow="Fundraising · Every Stage" title="Capital, matched to your moment." />
            <div className="mt-8 grid gap-4">
              {fundStages.map((s, i) => (
                <Reveal key={s.t} index={i}>
                  <div className="rounded-2xl border border-[var(--color-line)] p-5 transition-colors hover:bg-[var(--color-surface)]">
                    <h3 className="font-display text-lg font-semibold">{s.t}</h3>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capital tools */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Value It Yourself"
            title="Valuation & readiness, instantly."
            intro="Estimate enterprise value, self-check IPO/funding readiness, and size debt — before the first call."
          />
          <div className="mt-12">
            <CapitalTools />
          </div>
        </div>
      </section>

      {/* Loans table */}
      <section id="loans" className="scroll-mt-28 py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Debt & Government Funding"
            title="Bankable from day one."
            intro={<>We prepare <Term id="dpr">DPR</Term> + <Term id="cma">CMA</Term> data in bank format to maximise approval across these schemes.</>}
          />
          <div className="mt-12 overflow-x-auto">
            <div className="min-w-[640px] overflow-hidden rounded-3xl border border-[var(--color-line)]">
              <div className="grid grid-cols-4 bg-[var(--color-raised)] px-6 py-4 text-xs uppercase tracking-wider text-[var(--color-faint)]">
                <span>Scheme</span>
                <span>Interest</span>
                <span>Max Loan</span>
                <span>Collateral</span>
              </div>
              {loans.map((l) => (
                <div
                  key={l.scheme}
                  className="grid grid-cols-4 items-center border-t border-[var(--color-line)] px-6 py-4 text-sm transition-colors hover:bg-[var(--color-raised)]/50"
                >
                  <span className="font-medium">{l.scheme}</span>
                  <span className="text-[var(--color-cyan)]">{l.rate}</span>
                  <span className="text-gradient-warm font-display font-medium">{l.max}</span>
                  <span className="text-[var(--color-muted)]">{l.collateral}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who funds what */}
      <section className="relative isolate py-[var(--space-section)]">
        <SectionBackdrop name="capHero" />
        <div className="maxw container-x">
          <SectionHeading eyebrow="Who Funds What" title="Promoter money vs funder money." intro={funding.intro} />
          <div className="mt-12 overflow-x-auto">
            <div className="min-w-[760px] overflow-hidden rounded-3xl border border-[var(--color-line)]">
              <div className="grid grid-cols-[1.4fr_1.6fr_0.8fr_0.8fr_0.9fr] bg-[var(--color-raised)] px-6 py-4 text-xs uppercase tracking-wider text-[var(--color-faint)]">
                <span>Instrument</span>
                <span>For what</span>
                <span>Promoter</span>
                <span>Funder</span>
                <span>Tenure</span>
              </div>
              {funding.instruments.map((f) => (
                <div
                  key={f.key}
                  className="grid grid-cols-[1.4fr_1.6fr_0.8fr_0.8fr_0.9fr] items-center border-t border-[var(--color-line)] px-6 py-4 text-sm transition-colors hover:bg-[var(--color-raised)]/50"
                >
                  <span className="font-medium">{f.name}</span>
                  <span className="text-[var(--color-muted)]">{f.forWhat}</span>
                  <span className="text-gradient-warm font-display font-medium">{f.promoter}</span>
                  <span className="text-[var(--color-cyan)]">{f.funderShare}</span>
                  <span className="text-[var(--color-muted)]">{f.tenure}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fundraising process pipeline */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="How We Raise" title="A clear path from check to closure." />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fundraising.pipeline.map((step, i) => (
              <Reveal key={step} index={i % 3}>
                <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] p-5">
                  <span className="font-display text-sm font-bold text-[var(--color-amber)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-[var(--color-muted)]">{step}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Funding routes at a glance (IPO / VC / Bank) */}
      <section id="routes" className="scroll-mt-28 py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Funding Routes"
            title="Every route, summarised."
            intro="Three broad paths to capital — here's the approximate process for each, so you know what the journey looks like before you start."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                t: "IPO / Listing",
                best: "Scale-ups with ₹25 Cr+ revenue",
                steps: ["Eligibility & SME vs main-board", "Restructuring + audited financials", "Merchant banker & DRHP", "Marketing, subscription & listing"],
                accent: "amber" as const,
              },
              {
                t: "VC / Private equity",
                best: "High-growth, fundable story",
                steps: ["Valuation + pitch deck & PIM", "Investor outreach & data room", "Term sheet & due diligence", "SHA, closing & cap-table"],
                accent: "cyan" as const,
              },
              {
                t: "Bank / Institutional debt",
                best: "Asset-backed plant projects",
                steps: ["Bankable DPR + CMA data", "Scheme match (CGTMSE/MSME/SIDBI)", "Appraisal & sanction", "Disbursement & compliance"],
                accent: "amber" as const,
              },
            ].map((r, i) => (
              <Reveal key={r.t} index={i}>
                <GlowCard accent={r.accent} className="h-full">
                  <div className="flex h-full flex-col p-7">
                    <Badge accent={r.accent}>{r.t}</Badge>
                    <p className="mt-4 text-xs uppercase tracking-wider text-[var(--color-faint)]">Best for</p>
                    <p className="text-sm text-[var(--color-muted)]">{r.best}</p>
                    <ol className="mt-5 grid gap-2.5 border-t border-[var(--color-line)] pt-5">
                      {r.steps.map((s, j) => (
                        <li key={s} className="flex items-start gap-2.5 text-sm text-[var(--color-muted)]">
                          <span className="font-display text-xs font-bold text-[var(--color-amber)]">{String(j + 1).padStart(2, "0")}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--color-faint)]">
            Indicative process summaries — actual steps, timelines and eligibility depend on the company and the funder.
          </p>
        </div>
      </section>

      {/* Financial prep */}
      <section id="valuation" className="scroll-mt-28 py-[var(--space-section)]">
        <div className="maxw container-x grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading
            eyebrow="Valuation & Financial Prep"
            title="Investor & bank-ready, end to end."
          />
          <GlowCard className="h-full">
            <ul className="grid gap-4 p-8 sm:grid-cols-2">
              {finPrep.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-muted)]">
                  <Check size={15} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                  {f}
                </li>
              ))}
            </ul>
          </GlowCard>
        </div>
        <div className="maxw container-x mt-8">
          <p className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 text-xs leading-relaxed text-[var(--color-faint)]">
            Compliance note: paid trading advice/signals in India require SEBI (Research Analyst / Investment
            Adviser) registration. Until registered, these are presented as research &amp; tools, not advisory.
          </p>
        </div>
      </section>

      <VerticalFaq vkey="fundraising" eyebrow="Fundraising Q&A" />

      <PlantGallery slug="capital" title="From boardroom to commissioned plant." />

      <CTASection
        title="Raise capital with someone who's done it."
        sub="Seed to IPO - valuation, documents and the room to pitch in."
      />
    </>
  );
}
