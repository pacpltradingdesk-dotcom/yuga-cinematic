"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, ArrowUpRight, Send } from "lucide-react";
import { products } from "@/lib/catalog";
import { faqs } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * AI Assistance (client note) — a static, browser-side catalog search that
 * answers from the product Q&A + FAQs and links to the right page. No server,
 * so it ships on the static export today; a full LLM/RAG bot is Phase 5.
 */
interface Answer {
  readonly q: string;
  readonly a: string;
  readonly href?: string;
  readonly tag: string;
}

interface ProductHit {
  readonly title: string;
  readonly href: string;
  readonly subtitle: string;
}

const STOP = new Set(["the", "a", "an", "is", "of", "for", "to", "and", "what", "how", "much", "do", "you", "can", "i", "my", "in", "on"]);

function tokens(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((t) => t.length > 1 && !STOP.has(t));
}

/** Flatten the catalog Q&A + site FAQs into one searchable answer index. */
const ANSWER_INDEX: readonly Answer[] = [
  ...faqs.map((f) => ({ q: f.q, a: f.a, tag: "FAQ" as const })),
  ...products.flatMap((p) =>
    p.qa.map((qa) => ({ q: qa.q, a: qa.a, href: `/products/${p.slug}`, tag: p.title })),
  ),
];

const SUGGESTIONS = ["What is bio-bitumen?", "How much investment?", "Can I get a loan?", "Carbon credits?"];

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { answers, productHits } = useMemo(() => {
    const qt = tokens(query);
    if (qt.length === 0) return { answers: [] as Answer[], productHits: [] as ProductHit[] };

    const score = (text: string): number => {
      const tt = tokens(text);
      return qt.reduce((acc, t) => acc + (tt.includes(t) ? 1 : 0), 0);
    };

    const answers = ANSWER_INDEX.map((item) => ({ item, s: score(`${item.q} ${item.a}`) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 3)
      .map((x) => x.item);

    const productHits = products
      .map((p) => ({ p, s: score(`${p.title} ${p.subtitle} ${p.benefits.join(" ")} ${p.applications.join(" ")}`) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 3)
      .map((x) => ({ title: x.p.title, href: `/products/${x.p.slug}`, subtitle: x.p.subtitle }));

    return { answers, productHits };
  }, [query]);

  const hasQuery = tokens(query).length > 0;

  return (
    <>
      {/* launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
        aria-label="Open AI assistant"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-amber-deep)] text-[var(--color-void)] shadow-[0_8px_40px_-8px_var(--color-amber-deep)] transition-transform hover:scale-105"
      >
        {open ? <X size={22} /> : <Sparkles size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="glass fixed bottom-24 right-5 z-50 flex max-h-[70vh] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-3xl border border-[color-mix(in_oklch,var(--color-amber)_22%,transparent)] ring-glow"
          >
            <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4">
              <Sparkles size={17} className="text-[var(--color-amber)]" />
              <div>
                <div className="font-display text-sm font-semibold tracking-tight">YUGA Assistant</div>
                <div className="text-[11px] text-[var(--color-faint)]">Ask about plants, costs, subsidy, carbon</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {!hasQuery && (
                <div className="grid gap-2">
                  <p className="text-sm text-[var(--color-muted)]">Try asking:</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      data-cursor="hover"
                      className="rounded-xl border border-[var(--color-line)] px-3 py-2 text-left text-sm text-[var(--color-muted)] transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_35%,transparent)] hover:text-[var(--color-ink)]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {hasQuery && answers.length === 0 && productHits.length === 0 && (
                <p className="text-sm text-[var(--color-muted)]">
                  No direct match. Try the{" "}
                  <Link href="/contact" className="text-[var(--color-amber)]" onClick={() => setOpen(false)}>
                    contact page
                  </Link>{" "}
                  — our team replies on WhatsApp fast.
                </p>
              )}

              {answers.map((a) => (
                <div key={a.q} className="mb-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
                  <div className="text-[11px] uppercase tracking-wider text-[var(--color-faint)]">{a.tag}</div>
                  <div className="mt-1 text-sm font-medium text-[var(--color-ink)]">{a.q}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{a.a}</p>
                  {a.href && (
                    <Link
                      href={a.href}
                      onClick={() => setOpen(false)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-amber)]"
                    >
                      Open page <ArrowUpRight size={12} />
                    </Link>
                  )}
                </div>
              ))}

              {productHits.length > 0 && (
                <div className="mt-1">
                  <div className="mb-2 text-[11px] uppercase tracking-wider text-[var(--color-faint)]">Related plants</div>
                  <div className="grid gap-2">
                    {productHits.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        onClick={() => setOpen(false)}
                        data-cursor="hover"
                        className="flex items-center justify-between gap-2 rounded-xl border border-[var(--color-line)] px-3 py-2 text-sm transition-colors hover:border-[color-mix(in_oklch,var(--color-cyan)_35%,transparent)]"
                      >
                        <span className="font-medium text-[var(--color-ink)]">{p.title}</span>
                        <ArrowUpRight size={13} className="shrink-0 text-[var(--color-faint)]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-[var(--color-line)] bg-[var(--color-raised)] px-3 py-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question…"
                  className="flex-1 bg-transparent text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-faint)]"
                />
                <Send size={15} className={cn("shrink-0", hasQuery ? "text-[var(--color-amber)]" : "text-[var(--color-faint)]")} />
              </div>
              <p className="mt-2 text-center text-[10px] text-[var(--color-faint)]">
                Catalog-powered search · full AI chat coming soon
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
