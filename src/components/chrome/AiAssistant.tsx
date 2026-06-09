"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, ArrowUpRight, Send, Loader2 } from "lucide-react";
import { hasAiChat } from "@/lib/config";
import { askAi, type ChatMessage } from "@/lib/ai";
import { searchAssistant } from "@/lib/assistant";
import { cn } from "@/lib/utils";

/**
 * AI Assistance (client note). Default mode is a static, browser-side engine
 * (`searchAssistant`) that answers from a bitumen knowledge base + the product
 * Q&A + FAQs, tolerates typos and Hinglish, and never dead-ends — so it ships
 * on the static export with no server.
 *
 * When the client sets `NEXT_PUBLIC_AI_ENDPOINT` (their serverless proxy that
 * holds the model key), the widget upgrades to a real chat that POSTs the query
 * + grounded catalog context there. No key ever touches the browser.
 */
const SUGGESTIONS = ["What is bio-bitumen?", "How much investment?", "Can I get a loan?", "Carbon credits?"];

export function AiAssistant() {
  const chatMode = hasAiChat();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Chat-mode state (only used when an AI endpoint is configured).
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasQuery = query.trim().length > 0;

  // Page-aware context: on a product page, calc answers default to that product.
  const pathname = usePathname();
  const pageSlug = useMemo(() => pathname.match(/^\/products\/([^/]+)/)?.[1], [pathname]);

  /** Static-mode result — recomputed as the user types. */
  const result = useMemo(() => searchAssistant(query, pageSlug), [query, pageSlug]);
  const showFallback = hasQuery && result.cards.length === 0 && result.productHits.length === 0;

  async function sendToAi(text: string): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const history = messages;
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setQuery("");
    setError(null);
    setBusy(true);
    try {
      const answer = await askAi(trimmed, history);
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch {
      setError("Couldn't reach the assistant just now. Please try again, or message us on WhatsApp.");
    } finally {
      setBusy(false);
      requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }));
    }
  }

  function onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (chatMode) void sendToAi(query);
    // Static mode filters live via the memo — nothing to submit.
  }

  function onSuggestion(s: string): void {
    if (chatMode) void sendToAi(s);
    else setQuery(s);
  }

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

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4">
              {/* Suggestions (both modes, shown until the user engages) */}
              {((chatMode && messages.length === 0) || (!chatMode && !hasQuery)) && (
                <div className="grid gap-2">
                  <p className="text-sm text-[var(--color-muted)]">Try asking:</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => onSuggestion(s)}
                      data-cursor="hover"
                      className="rounded-xl border border-[var(--color-line)] px-3 py-2 text-left text-sm text-[var(--color-muted)] transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_35%,transparent)] hover:text-[var(--color-ink)]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* CHAT MODE — conversation transcript */}
              {chatMode && (
                <div className="grid gap-3">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={cn(
                        "max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                        m.role === "user"
                          ? "ml-auto bg-[var(--color-amber)] text-[var(--color-void)]"
                          : "mr-auto border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)]",
                      )}
                    >
                      {m.content}
                    </div>
                  ))}
                  {busy && (
                    <div className="mr-auto flex items-center gap-2 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-faint)]">
                      <Loader2 size={14} className="animate-spin" /> Thinking…
                    </div>
                  )}
                  {error && <p className="text-sm text-[var(--color-muted)]">{error}</p>}
                </div>
              )}

              {/* STATIC MODE — conversational reply (greetings, "kaise ho", thanks…) */}
              {!chatMode && hasQuery && result.smallTalk && (
                <div className="mb-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 text-sm leading-relaxed text-[var(--color-muted)]">
                  {result.smallTalk}
                </div>
              )}

              {/* STATIC MODE — knowledge / FAQ / catalog answers */}
              {!chatMode &&
                result.cards.map((a, i) => (
                  <div key={`${a.tag}:${a.q}:${i}`} className="mb-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
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

              {/* STATIC MODE — related plants */}
              {!chatMode && result.productHits.length > 0 && (
                <div className="mt-1">
                  <div className="mb-2 text-[11px] uppercase tracking-wider text-[var(--color-faint)]">Related plants</div>
                  <div className="grid gap-2">
                    {result.productHits.map((p) => (
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

              {/* STATIC MODE — contextual next-step CTAs under a substantive answer */}
              {!chatMode && result.actions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.actions.map((act) =>
                    act.external ? (
                      <a
                        key={act.label}
                        href={act.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_40%,transparent)] hover:text-[var(--color-amber)]"
                      >
                        {act.label}
                      </a>
                    ) : (
                      <Link
                        key={act.label}
                        href={act.href}
                        onClick={() => setOpen(false)}
                        data-cursor="hover"
                        className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_40%,transparent)] hover:text-[var(--color-ink)]"
                      >
                        {act.label}
                      </Link>
                    ),
                  )}
                </div>
              )}

              {/* STATIC MODE — no direct answer: help with closest topics (never dead-end) */}
              {!chatMode && showFallback && (
                <div className="grid gap-2">
                  {!result.smallTalk && (
                    <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                      {result.fallback.split("message us on WhatsApp")[0]}
                      <Link href="/contact" className="text-[var(--color-amber)]" onClick={() => setOpen(false)}>
                        message us on WhatsApp
                      </Link>
                      {result.fallback.split("message us on WhatsApp")[1] ?? ""}
                    </p>
                  )}
                  {result.suggestions.map((s, i) => (
                    <button
                      key={`${s}:${i}`}
                      onClick={() => onSuggestion(s)}
                      data-cursor="hover"
                      className="rounded-xl border border-[var(--color-line)] px-3 py-2 text-left text-sm text-[var(--color-muted)] transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_35%,transparent)] hover:text-[var(--color-ink)]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-[var(--color-line)] bg-[var(--color-surface)] p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-[var(--color-line)] bg-[var(--color-raised)] px-3 py-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={chatMode ? "Ask the assistant…" : "Ask a question…"}
                  disabled={busy}
                  className="flex-1 bg-transparent text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-faint)] disabled:opacity-60"
                />
                <button type="submit" aria-label="Send" disabled={busy || !hasQuery} data-cursor="hover">
                  {busy ? (
                    <Loader2 size={15} className="animate-spin text-[var(--color-amber)]" />
                  ) : (
                    <Send size={15} className={cn("shrink-0", hasQuery ? "text-[var(--color-amber)]" : "text-[var(--color-faint)]")} />
                  )}
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-[var(--color-faint)]">
                {chatMode ? "AI assistant · grounded in the YUGA catalog" : "Catalog-powered search · full AI chat coming soon"}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
