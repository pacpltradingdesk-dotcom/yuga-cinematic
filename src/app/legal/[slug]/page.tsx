import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { getLegalDoc, legalSlugs, legalDocs } from "@/lib/legal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return legalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return { title: "Legal" };
  return { title: doc.title, description: doc.intro, robots: { index: true, follow: true } };
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <NoiseOverlay />
      <article className="pb-[var(--space-section)] pt-36 sm:pt-44">
        <div className="maxw container-x max-w-3xl">
          <Link
            href="/"
            data-cursor="hover"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>

          <header className="relative isolate mt-8 overflow-hidden rounded-3xl border-b border-[var(--color-line)] p-8 pb-10">
            <SectionBackdrop name="aboutHero" opacity="opacity-[0.07]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-amber)]">Legal</span>
            <h1 className="mt-4 font-display text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight">
              {doc.title}
            </h1>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">{doc.intro}</p>
          </header>

          <div className="mt-12 grid gap-10">
            {doc.sections.map((s, i) => (
              <Reveal key={s.heading} index={Math.min(i, 4)}>
                <section>
                  <h2 className="font-display text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                    {s.heading}
                  </h2>
                  <div className="mt-3 grid gap-3">
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="leading-relaxed text-[var(--color-muted)]">{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          {/* Other legal pages */}
          <nav className="mt-16 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--color-line)] pt-8 text-sm">
            {legalDocs
              .filter((d) => d.slug !== slug)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  data-cursor="hover"
                  className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-amber)]"
                >
                  {d.title}
                </Link>
              ))}
          </nav>
        </div>
      </article>
    </>
  );
}
