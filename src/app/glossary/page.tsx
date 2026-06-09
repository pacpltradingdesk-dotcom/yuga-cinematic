import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { CTASection } from "@/components/page/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { glossary } from "@/lib/glossary";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Glossary — bitumen & finance terms",
  alternates: { canonical: "/glossary" },
  description:
    "Plain-language definitions of the bitumen, plant and finance jargon used across the YUGA site — DPR, VG-30, PMB, CRMB, pyrolysis, CGTMSE, IRR, MRV and more.",
};

/**
 * DefinedTermSet structured data — lets search engines index each glossary term
 * as a defined term (richer entity understanding, eligible for definition results).
 */
const glossaryLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${siteUrl}/glossary#termset`,
  name: "YUGA Bitumen & Finance Glossary",
  url: `${siteUrl}/glossary`,
  hasDefinedTerm: glossary.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `${siteUrl}/glossary#${t.id}`,
    name: t.full ? `${t.term} (${t.full})` : t.term,
    description: t.def,
    inDefinedTermSet: `${siteUrl}/glossary#termset`,
  })),
};

export default function GlossaryPage() {
  return (
    <>
      <NoiseOverlay />
      {/* Escape `<` so any stray markup in a definition can't break out of the script. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="Plain Language"
        title="Every term, explained."
        intro="New to bitumen or project finance? Here's the jargon you'll meet on this site — in one line each, no assumptions."
        accent="cyan"
        crumbs={[{ label: "Home", href: "/" }, { label: "Glossary" }]}
      />

      <section className="py-[var(--space-section)]">
        <div className="maxw container-x max-w-4xl">
          <dl className="grid gap-3">
            {glossary.map((t, i) => (
              <Reveal key={t.id} index={Math.min(i % 4, 3)}>
                <div
                  id={t.id}
                  className="scroll-mt-28 rounded-2xl border border-[var(--color-line)] p-6 transition-colors hover:bg-[var(--color-surface)]"
                >
                  <dt className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-display text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                      {t.term}
                    </span>
                    {t.full && <span className="text-sm text-[var(--color-faint)]">{t.full}</span>}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-[var(--color-muted)]">{t.def}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <CTASection title="Still unsure about something?" sub="Ask the YUGA assistant, or talk to a person — no jargon required." />
    </>
  );
}
