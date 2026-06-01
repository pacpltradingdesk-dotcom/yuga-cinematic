import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BadgeCheck, MapPin, Check, FileDown, ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTASection } from "@/components/page/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { FAQ } from "@/components/page/FAQ";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { Media } from "@/components/visual/Media";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CostRoiCalculator } from "@/components/tools/CostRoiCalculator";
import { products, getProduct, getFeasibility, getIo, getStandards, productSlugs, type LabelValue } from "@/lib/catalog";
import { productImg } from "@/lib/media";
import { waLink } from "@/lib/site";

type Params = { slug: string };

/** Pre-render all 9 product pages at build time (required for static export). */
export function generateStaticParams(): Params[] {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product" };
  return {
    title: `${p.title} Plant — PMC India`,
    description: p.subtitle,
  };
}

/** Label/value rows shared by specs + plant details. */
function InfoTable({ rows }: { rows: readonly LabelValue[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-line)]">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-[minmax(10rem,14rem)_1fr] sm:gap-4 ${
            i > 0 ? "border-t border-[var(--color-line)]" : ""
          }`}
        >
          <span className="text-sm font-medium text-[var(--color-faint)]">{r.label}</span>
          <span className="text-sm leading-relaxed text-[var(--color-ink)]">{r.value}</span>
        </div>
      ))}
    </div>
  );
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const feas = getFeasibility(slug);
  const io = getIo(slug);
  const standards = getStandards(slug);
  const related = products.filter((x) => x.slug !== slug).slice(0, 3);

  // FAQ rich-result schema (SEO) built from the product Q&A.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <NoiseOverlay />
      {/* JSON-LD from our own static catalog; escape `<` so a stray `</script>` in data can't break out. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />

      <PageHero eyebrow="Product · YUGA PMC" title={p.title} intro={p.subtitle} accent="amber" image={productImg[slug]}>
        <Reveal index={3}>
          <div className="mt-9 flex flex-wrap gap-4">
            <MagneticButton href={waLink(`Hi YUGA, I'd like a DPR for a ${p.title} plant.`)} variant="glow">
              Request a DPR <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton href={waLink(`Hi YUGA, please send me the brochure for ${p.title}.`)} variant="ghost">
              <FileDown size={15} /> Get the brochure
            </MagneticButton>
            <MagneticButton href="/contact" variant="ghost">
              Book a feasibility call
            </MagneticButton>
          </div>
        </Reveal>
      </PageHero>

      {/* Overview */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="Overview" title={`What is ${p.title}?`} />
          <div className="mt-8 grid max-w-3xl gap-5">
            {p.intro.map((para, i) => (
              <Reveal key={i} index={i}>
                <p className="text-lg leading-relaxed text-[var(--color-muted)]">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Applications */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why this business" title="Benefits" />
            <ul className="mt-8 grid gap-3">
              {p.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[var(--color-muted)]">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Demand" title="Applications & buyers" />
            <ul className="mt-8 grid gap-3">
              {p.applications.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-[var(--color-muted)]">
                  <Check size={18} className="mt-0.5 shrink-0 text-[var(--color-cyan)]" />
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Specs + Plant & machinery */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Technical" title="Specifications" />
            <div className="mt-8">
              <InfoTable rows={p.specs} />
            </div>
          </Reveal>
          <Reveal index={1}>
            <SectionHeading eyebrow="Setup" title="Plant & machinery" />
            <div className="mt-8">
              <InfoTable rows={p.plant.details} />
              <div className="mt-5 flex flex-wrap gap-2">
                {p.plant.machinery.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-[var(--color-raised)] px-3 py-1.5 text-xs text-[var(--color-muted)]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feedstock & output (io) + Quality standards */}
      {(io || standards) && (
        <section className="py-[var(--space-section)]">
          <div className="maxw container-x grid gap-12 lg:grid-cols-2">
            {io && (
              <Reveal>
                <SectionHeading eyebrow="Feedstock & Output" title="What goes in, what comes out." />
                <p className="mt-4 text-sm text-[var(--color-faint)]">{io.basis}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {[
                    { label: "Input", rows: io.input, icon: ArrowRight, accent: "var(--color-amber)" },
                    { label: "Output", rows: io.output, icon: ArrowRight, accent: "var(--color-cyan)" },
                  ].map((col) => (
                    <div key={col.label}>
                      <div className="text-xs uppercase tracking-[0.2em]" style={{ color: col.accent }}>{col.label}</div>
                      <div className="mt-3 grid gap-2">
                        {col.rows.map(([k, v]) => (
                          <div key={k} className="rounded-xl border border-[var(--color-line)] p-3">
                            <div className="text-sm font-medium text-[var(--color-ink)]">{k}</div>
                            <div className="text-xs text-[var(--color-muted)]">{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
            {standards && (
              <Reveal index={1}>
                <SectionHeading eyebrow="Quality & Compliance" title="Standards & testing." />
                <div className="mt-6 grid gap-3">
                  {[
                    { label: "IS (BIS)", value: standards.is },
                    { label: "ASTM", value: standards.astm },
                    { label: "MSDS / SDS", value: standards.msds },
                  ].map((s) => (
                    <div key={s.label} className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] p-4">
                      <ShieldCheck size={17} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                      <div>
                        <div className="text-sm font-medium text-[var(--color-ink)]">{s.label}</div>
                        <div className="text-sm leading-relaxed text-[var(--color-muted)]">{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Cost & ROI */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Investment & Returns"
            title="Indicative cost, output & payback."
            intro={p.financials.note}
          />
          <Reveal className="mt-10">
            <CostRoiCalculator slug={slug} />
          </Reveal>
          <div className="mt-8 max-w-3xl">
            <InfoTable rows={p.financials.rows} />
          </div>
        </div>
      </section>

      {/* Best states */}
      {feas && (
        <section className="py-[var(--space-section)]">
          <div className="maxw container-x">
            <SectionHeading eyebrow="Where to build" title="Best Indian states for this plant." />
            <Reveal className="mt-8">
              <div className="glass flex flex-col gap-4 rounded-3xl p-8 sm:flex-row sm:items-start">
                <MapPin size={22} className="shrink-0 text-[var(--color-amber)]" />
                <div>
                  <div className="font-display text-lg font-semibold tracking-tight">{feas.states}</div>
                  <p className="mt-2 leading-relaxed text-[var(--color-muted)]">{feas.why}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="Questions" title="Top questions, answered." />
          <div className="mt-10">
            <FAQ items={p.qa} />
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="You may also need" title="Pairs well with." align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} index={i}>
                <Link href={`/products/${r.slug}`} data-cursor="hover">
                  <GlowCard accent={i % 2 ? "cyan" : "amber"} className="h-full">
                    <div className="flex h-full flex-col p-7">
                      <Badge accent={i % 2 ? "cyan" : "amber"}>Plant</Badge>
                      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{r.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{r.subtitle}</p>
                      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-ink)]">
                        Explore <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </GlowCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={`Plan your ${p.title} plant with YUGA.`} />
    </>
  );
}
