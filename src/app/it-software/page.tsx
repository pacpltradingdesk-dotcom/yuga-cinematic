import type { Metadata } from "next";
import { Check, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTASection } from "@/components/page/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { LineChart } from "@/components/visual/Charts";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { VerticalFaq } from "@/components/page/VerticalFaq";
import { softwareProducts } from "@/lib/software";
import { softwareMeta } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "AI Software Services",
  description:
    "Seven in-house AI products for the bitumen and sales industry - AI sales dashboard, WhatsApp CRM, Excel lead cleaner, bulk messaging, call analytics, automated market reports and a voice agent.",
};

export default function ITSoftwarePage() {
  return (
    <>
      <NoiseOverlay />
      <PageHero
        eyebrow="Vertical B · Technology"
        title="AI Software That Runs the Business"
        intro="The same in-house stack that powers our own bitumen operations - pricing intelligence, CRM, automation and market signals - now available to clients."
        accent="cyan"
        image="softHero"
      />

      {/* Dashboard mock */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-[2rem] p-6 ring-glow-cool sm:p-10">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[var(--color-amber)]" />
                  <span className="h-3 w-3 rounded-full bg-[var(--color-line)]" />
                  <span className="h-3 w-3 rounded-full bg-[var(--color-line)]" />
                </div>
                <Badge accent="cyan">Live · AI Sales Dashboard</Badge>
              </div>
              <div className="grid gap-5 lg:grid-cols-3">
                <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
                  <div className="text-xs uppercase tracking-wider text-[var(--color-faint)]">VG-30 Landed</div>
                  <div className="mt-2 font-display text-3xl font-bold">₹48,250</div>
                  <div className="text-xs text-[var(--color-cyan)]">▲ 2.4% · 24-mo AI forecast</div>
                  <LineChart seed={5} accent="cyan" height={90} className="mt-4 h-20 w-full" />
                </div>
                <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
                  <div className="text-xs uppercase tracking-wider text-[var(--color-faint)]">Market Signal</div>
                  <div className="mt-2 font-display text-3xl font-bold text-gradient">7.8/10</div>
                  <div className="text-xs text-[var(--color-muted)]">10-signal composite · Brent · USD-INR</div>
                  <LineChart seed={9} accent="amber" height={90} className="mt-4 h-20 w-full" />
                </div>
                <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
                  <div className="text-xs uppercase tracking-wider text-[var(--color-faint)]">Pipeline</div>
                  <div className="mt-4 space-y-3">
                    {[["HOT", 64], ["WARM", 38], ["COLD", 22]].map(([k, v]) => (
                      <div key={k as string}>
                        <div className="flex justify-between text-xs text-[var(--color-muted)]">
                          <span>{k}</span>
                          <span>{v}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--color-raised)]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-cyan)]"
                            style={{ width: `${(v as number)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product suite */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="The Product Suite"
            title="Seven products. Built for bitumen, sales and intelligence."
            intro="Each one runs our own operations first — then we license it. Available on subscription with four feature tiers; prices on request."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {softwareProducts.map((s, i) => (
              <Reveal key={s.slug} index={i % 2}>
                <GlowCard accent={s.accent} className="h-full">
                  <div className="flex h-full flex-col p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-semibold tracking-tight">{s.name}</h3>
                        <span className="mt-1 block text-xs text-[var(--color-faint)]">{s.tag}</span>
                      </div>
                      {s.status && (
                        <Badge accent={s.status === "Experimental" ? "neutral" : s.accent} className="shrink-0">
                          {s.status}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-4 font-display text-sm font-medium leading-snug text-[var(--color-ink)]">{s.oneLiner}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{s.what}</p>
                    <ul className="mt-6 grid gap-2.5 border-t border-[var(--color-line)] pt-6 sm:grid-cols-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-[var(--color-muted)]">
                          <Check size={13} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-line)] pt-6">
                      {s.stats.map((st) => (
                        <div key={st.label}>
                          <div className="font-display text-lg font-bold tracking-tight text-gradient-warm">{st.value}</div>
                          <div className="text-[11px] uppercase tracking-wider text-[var(--color-faint)]">{st.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <a
              href="https://crm.ppsanatams.online"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-cyan)]"
            >
              Visit the live CRM <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Subscription tiers */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Subscription"
            title="Four tiers. Enable only what you need."
            intro={softwareMeta.intro}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {softwareMeta.tierKeys.map((t, i) => (
              <Reveal key={t.key} index={i}>
                <GlowCard accent={i % 2 ? "cyan" : "amber"} className="h-full">
                  <div className="flex h-full flex-col p-7">
                    <span className="font-display text-4xl font-bold text-gradient-warm">{t.key}</span>
                    <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{t.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{t.for}</p>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--color-faint)]">
            <span>Billing:</span>
            {softwareMeta.billing.map((b) => (
              <span key={b} className="rounded-full border border-[var(--color-line)] px-4 py-1.5">{b}</span>
            ))}
            <span>· Prices on request</span>
          </Reveal>
        </div>
      </section>

      <VerticalFaq vkey="it" />

      <CTASection
        title="Put AI to work in your sales floor."
        sub="License the platform, or have us tailor a stack to your operation."
      />
    </>
  );
}
