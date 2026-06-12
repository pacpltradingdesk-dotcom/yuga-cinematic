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
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { Media } from "@/components/visual/Media";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CostRoiCalculator } from "@/components/tools/CostRoiCalculator";
import { LicensesPermits } from "@/components/page/LicensesPermits";
import { Deliverables } from "@/components/page/Deliverables";
import { OnThisPage } from "@/components/page/OnThisPage";
import { PlantGallery } from "@/components/page/PlantGallery";
import { CarbonStats } from "@/components/page/CarbonCredit";
import { LeadGate } from "@/components/page/LeadGate";
import { products, getProduct, getFeasibility, getIo, getStandards, productSlugs, type LabelValue } from "@/lib/catalog";
import { productPlantCounts } from "@/lib/plants";
import { getLandRequirement, landNote } from "@/lib/land";
import { productImg, img } from "@/lib/media";
import { siteUrl, company } from "@/lib/site";

type Params = { slug: string };

/** Pre-render all 9 product pages at build time (required for static export). */
export function generateStaticParams(): Params[] {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product" };
  const ogImage = `${siteUrl}${img[productImg[slug]].src}`;
  const canonical = `${siteUrl}/products/${slug}`;
  // Prefer the per-product SEO copy from the catalog; fall back to derived values.
  const titleTag = p.titleTag ?? `${p.title} Plant — PMC India`;
  const metaDesc = p.metaDesc ?? p.subtitle;
  return {
    title: { absolute: titleTag },
    description: metaDesc,
    alternates: { canonical },
    openGraph: {
      title: titleTag,
      description: metaDesc,
      url: canonical,
      type: "website",
      siteName: company.brand,
      images: [{ url: ogImage, alt: img[productImg[slug]].alt }],
    },
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
  const plantCount = productPlantCounts.find((x) => x.slug === slug);
  const land = getLandRequirement(slug);
  const related = products.filter((x) => x.slug !== slug).slice(0, 3);

  // Rich-result schemas (SEO). One @graph keeps FAQ + Product + Breadcrumb
  // in a single JSON-LD block so crawlers parse them together.
  const canonical = `${siteUrl}/products/${slug}`;
  const ldGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${canonical}#product`,
        name: p.title,
        description: p.subtitle,
        image: `${siteUrl}${img[productImg[slug]].src}`,
        category: "Industrial plant / equipment",
        brand: { "@type": "Brand", name: company.brand },
        manufacturer: { "@id": `${siteUrl}/#org` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
          { "@type": "ListItem", position: 3, name: p.title, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: p.qa.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <NoiseOverlay />
      {/* JSON-LD from our own static catalog; escape `<` so a stray `</script>` in data can't break out. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldGraph).replace(/</g, "\\u003c") }}
      />

      <PageHero
        eyebrow="Product · YUGA PMC"
        title={p.title}
        intro={p.subtitle}
        accent="amber"
        image={productImg[slug]}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: p.title }]}
      >
        <Reveal index={3}>
          <div className="mt-9 flex flex-wrap gap-4">
            <LeadGate
              label="Request a DPR"
              interest={`DPR — ${p.title} Plant`}
              source={`product:${slug}`}
              variant="glow"
              title="Get your DPR pack"
              subtitle={`Tell us where to send the ${p.title} DPR + cost model. We reply within a business day.`}
            />
            <LeadGate
              label="Get the brochure"
              interest={`Brochure — ${p.title} Plant`}
              source={`product:${slug}`}
              variant="ghost"
              icon={<FileDown size={15} />}
              title="Get the brochure"
              subtitle={`We'll send the ${p.title} brochure to your WhatsApp.`}
            />
            <MagneticButton href="/contact" variant="ghost">
              Book a feasibility call
            </MagneticButton>
          </div>
        </Reveal>
      </PageHero>

      <OnThisPage
        items={[
          { id: "overview", label: "Overview" },
          { id: "cost", label: "Cost & ROI" },
          { id: "licences", label: "Licences" },
          { id: "docs", label: "Documents" },
          { id: "gallery", label: "Gallery" },
          { id: "faq", label: "FAQ" },
        ]}
      />

      {/* Overview */}
      <section id="overview" className="scroll-mt-28 py-[var(--space-section)]">
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
      <section id="cost" className="scroll-mt-28 border-y border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Investment & Returns"
            title="Cost, output & payback."
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

      {/* Land requirement (product × capacity) — derived from calc tiers */}
      {land.length > 0 && (
        <section className="border-t border-[var(--color-line)] py-[var(--space-section)]">
          <div className="maxw container-x">
            <SectionHeading
              eyebrow="Site & Footprint"
              title="How much land you'll need."
              intro="Indicative plot size by capacity — we lock the exact figure to your layout and feedstock plan during feasibility."
            />
            <Reveal className="mt-10">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {land.map((t) => (
                  <div key={t.cap} className="glass rounded-3xl p-7">
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">Capacity</div>
                    <div className="mt-1 font-display text-xl font-semibold tracking-tight">{t.cap}</div>
                    <div className="mt-5 flex items-center gap-2 text-[var(--color-muted)]">
                      <MapPin size={16} className="shrink-0 text-[var(--color-amber)]" />
                      <span className="font-display text-lg font-semibold text-gradient-warm">{t.area}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <p className="mt-6 max-w-3xl text-sm text-[var(--color-faint)]">{landNote}</p>
          </div>
        </section>
      )}

      {/* Licences & permissions (product × state) */}
      <section id="licences" className="scroll-mt-28 border-t border-[var(--color-line)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Regulatory"
            title="Licences & permissions you'll need."
            intro="Core approvals plus the extras specific to this plant — pick your state to see the nodal authority. We handle the full filing as part of PMC."
          />
          <Reveal className="mt-10">
            <LicensesPermits slug={slug} />
          </Reveal>
        </div>
      </section>

      {/* Carbon credits + plants running */}
      <section className="relative isolate border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <SectionBackdrop name="pImpact" />
        <div className="maxw container-x">
          <SectionHeading eyebrow="Carbon & Market" title="Extra revenue, and where it's running." />
          <div className="mt-10">
            <CarbonStats />
          </div>
          {plantCount && (
            <Reveal className="mt-8">
              <div className="glass flex flex-col gap-4 rounded-3xl p-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">Approx plants running (India)</div>
                  <div className="mt-1 font-display text-3xl font-bold tracking-tight text-gradient-warm">
                    ~{plantCount.running}
                    {plantCount.potential && (
                      <span className="ml-3 text-base font-medium text-[var(--color-cyan)]">
                        · ~{plantCount.potential} needed in 5–7 yr (est.)
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-sm text-[var(--color-muted)] sm:text-right">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">Top states</div>
                  <div className="mt-1">{plantCount.topStates}</div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Documents & deliverables */}
      <section id="docs" className="scroll-mt-28 border-t border-[var(--color-line)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="What You Get"
            title="Documents & deliverables we provide."
            intro="Reports, drawings, working procedures and compliance docs — the full pack that takes the plant from paper to production."
          />
          <div className="mt-10">
            <Deliverables />
          </div>
        </div>
      </section>

      {/* Plant gallery (AI-rendered views; hidden when a product has no set) */}
      <PlantGallery slug={slug} title={`Inside a ${p.title} plant.`} />

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
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
