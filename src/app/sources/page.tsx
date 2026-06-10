import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/page/Breadcrumbs";
import { sourceGroups, SOURCES_INTRO } from "@/lib/sources";

export const metadata: Metadata = {
  title: "Sources & Disclosures",
  description:
    "Every market, technology, funding, regulatory and carbon figure on the YUGA site, mapped to its official source — PPAC, CPCB, CGTMSE, BIS, SEBI, PIB, IBEF and more.",
  alternates: { canonical: "/sources" },
  robots: { index: true, follow: true },
};

export default function SourcesPage() {
  return (
    <>
      <NoiseOverlay />
      <article className="pb-[var(--space-section)] pt-36 sm:pt-44">
        <div className="maxw container-x max-w-3xl">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Sources & Disclosures" }]} />

          <header className="relative isolate mt-8 overflow-hidden rounded-3xl border-b border-[var(--color-line)] p-8 pb-10">
            <SectionBackdrop name="aboutHero" opacity="opacity-[0.07]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-amber)]">Transparency</span>
            <h1 className="mt-4 font-display text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
              Sources &amp; Disclosures
            </h1>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{SOURCES_INTRO}</p>
          </header>

          <div className="mt-12 grid gap-12">
            {sourceGroups.map((group, gi) => (
              <Reveal key={group.id} index={Math.min(gi, 4)}>
                <section>
                  <h2 className="font-display text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                    {group.title}
                  </h2>

                  {group.note && (
                    <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-[color-mix(in_oklch,var(--color-amber)_22%,transparent)] bg-[var(--color-surface)] p-4">
                      <Info size={16} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                      <p className="text-sm leading-relaxed text-[var(--color-muted)]">{group.note}</p>
                    </div>
                  )}

                  <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--color-line)]">
                    {group.items.map((item, i) => (
                      <div
                        key={`${item.source}:${i}`}
                        className={`grid gap-2 px-6 py-4 sm:grid-cols-[1fr_minmax(11rem,15rem)] sm:items-center sm:gap-5 ${
                          i > 0 ? "border-t border-[var(--color-line)]" : ""
                        }`}
                      >
                        <span className="text-sm leading-relaxed text-[var(--color-ink)]">{item.claim}</span>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="hover"
                          className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-amber)] sm:justify-end"
                        >
                          <span>{item.source}</span>
                          <ArrowUpRight size={14} className="shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          {/* Closing — point to the full disclaimer + contact */}
          <div className="mt-16 rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
            <h2 className="font-display text-lg font-semibold tracking-tight text-[var(--color-ink)]">
              How to read our numbers
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--color-muted)]">
              All cost, capacity, output, revenue, profit, payback, area and subsidy figures on this site are
              indicative — for preliminary planning only, and not a guarantee of returns or approval. Final numbers
              come from a project-specific feasibility study or DPR. For the full terms, see our{" "}
              <Link href="/legal/disclaimer" data-cursor="hover" className="text-[var(--color-amber)] hover:underline">
                Disclaimer
              </Link>
              . If you spot anything that needs correcting,{" "}
              <Link href="/contact" data-cursor="hover" className="text-[var(--color-amber)] hover:underline">
                tell us
              </Link>{" "}
              — we&apos;ll fix it.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
