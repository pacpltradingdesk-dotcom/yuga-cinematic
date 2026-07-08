import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BadgeCheck, FileText, MapPin } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { CTASection } from "@/components/page/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { LeadGate } from "@/components/page/LeadGate";
import { getFeaturedProject, projectIds } from "@/lib/projects";
import { company, siteUrl } from "@/lib/site";
import { OG_IMAGE } from "@/lib/seo";

type Params = { id: string };

export function generateStaticParams() {
  return projectIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const p = getFeaturedProject(id);
  if (!p) return { title: "Project" };
  return {
    title: { absolute: `${p.title} — YUGA Case File` },
    description: p.metaDesc,
    keywords: [...p.keywords],
    alternates: { canonical: `/projects/${id}` },
    openGraph: {
      title: p.title,
      description: p.metaDesc,
      type: "article",
      siteName: company.brand,
      images: [OG_IMAGE],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const p = getFeaturedProject(id);
  if (!p) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteUrl}/case-studies/` },
          { "@type": "ListItem", position: 3, name: p.title },
        ],
      },
      {
        "@type": "Article",
        headline: p.title,
        description: p.metaDesc,
        author: { "@type": "Organization", name: "YUGA — PPS Anantams Corporation Pvt Ltd" },
        mainEntityOfPage: `${siteUrl}/projects/${p.id}/`,
      },
    ],
  };

  return (
    <>
      <NoiseOverlay />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
      />

      <PageHero
        eyebrow={`Case File · ${p.tag}`}
        title={p.title}
        intro={p.summary}
        accent={p.accent}
        crumbs={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }, { label: p.title }]}
      />

      {/* Snapshot strip */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-surface)] py-10">
        <div className="maxw container-x flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-[var(--color-amber)]" /> {p.location}</span>
          <span>{p.sector}</span>
          <Badge accent={p.accent}>{p.tag}</Badge>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="Outcome" title="The numbers that mattered." intro="Modelled / indicative figures from the engagement documents — not guarantees." />
          <div className="mt-10 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {p.outcomes.map((o, i) => (
              <Reveal key={o.label} index={i}>
                <div className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-tight text-gradient">{o.stat}</div>
                <div className="mt-2 max-w-[16rem] text-sm text-[var(--color-muted)]">{o.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brief + what we did */}
      <section className="border-t border-[var(--color-line)] py-[var(--space-section)]">
        <div className="maxw container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="The Brief" title="What the client needed." />
            <p className="mt-8 text-lg leading-relaxed text-[var(--color-muted)]">{p.brief}</p>
          </Reveal>
          <Reveal index={1}>
            <SectionHeading eyebrow="The Work" title="What we did." />
            <ul className="mt-8 grid gap-3">
              {p.services.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-[var(--color-muted)]">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Deliverables */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <div className="maxw container-x grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading
            eyebrow="Deliverables"
            title="What the client received."
            intro="Every engagement ends in documents the client can take to a bank, an authority or an investor."
          />
          <div className="grid gap-3">
            {p.deliverables.map((d, i) => (
              <Reveal key={d} index={Math.min(i, 3)}>
                <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] p-5">
                  <FileText size={17} className="mt-0.5 shrink-0 text-[var(--color-cyan)]" />
                  <span className="text-sm text-[var(--color-muted)]">{d}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related + CTA */}
      <section className="border-t border-[var(--color-line)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading eyebrow="Next Step" title="Planning something similar?" align="center" />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <LeadGate
              label="Get a proposal for your project"
              interest={`Similar project — ${p.title}`}
              source={`project:${p.id}`}
              variant="glow"
              title="Tell us about your project"
              subtitle="Share your contact and we'll come back with a scoped proposal within a business day."
            />
            {p.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                data-cursor="hover"
                className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-raised)]"
              >
                {r.label}
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/case-studies" className="text-sm text-[var(--color-faint)] hover:text-[var(--color-ink)]">
              ← All case studies
            </Link>
          </div>
        </div>
      </section>

      <CTASection title="Your project could be the next case file." />
    </>
  );
}

export const dynamicParams = false;
