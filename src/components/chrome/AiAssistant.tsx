"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, ArrowUpRight, Send, Loader2 } from "lucide-react";
import { hasAiChat } from "@/lib/config";
import { askAi, type ChatMessage } from "@/lib/ai";
import { searchAssistant, isThinFollowUp, type AssistantResult } from "@/lib/assistant";
import { submitLead, leadWaLink } from "@/lib/leads";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * YUGA Assistant. Default mode is a static, browser-side engine
 * (`searchAssistant`) that answers from a bitumen knowledge base + product Q&A +
 * FAQs, does live calculator answers, tolerates typos/Hinglish, remembers the
 * last topic and never dead-ends — all on the static export, no server.
 *
 * Both modes are CONVERSATIONAL: typing a question and pressing Enter posts it as
 * a chat turn (your question as a bubble, the answer below) and the thread builds
 * up above. When `NEXT_PUBLIC_AI_ENDPOINT` is set, the static engine is replaced
 * by a real LLM chat (key stays server-side).
 */
const SUGGESTIONS = ["What is bio-bitumen?", "How much investment?", "Can I get a loan?", "Carbon credits?"];
const WA_HINDI = waLink("Namaste YUGA, mujhe Hindi mein jaankari chahiye.");

/** One static-mode conversation turn: the question + its computed answer. */
interface StaticTurn {
  readonly id: number;
  readonly query: string;
  readonly result: AssistantResult;
}

export function AiAssistant() {
  const chatMode = hasAiChat();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Static-mode conversation transcript.
  const [turns, setTurns] = useState<StaticTurn[]>([]);
  const turnIdRef = useRef(0);

  // Inline lead capture (shown on buying/contact intent).
  const [lead, setLead] = useState({ name: "", phone: "" });
  const [leadState, setLeadState] = useState<"idle" | "sending" | "done">("idle");

  // Chat-mode state (only used when an AI endpoint is configured).
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasQuery = query.trim().length > 0;

  // Page-aware context: on a product page, calc answers default to that product.
  const pathname = usePathname();
  const pageSlug = useMemo(() => pathname.match(/^\/products\/([^/]+)/)?.[1], [pathname]);

  // Follow-up memory: the last substantive topic, so a thin query ("20 tpd",
  // "iska kitna?") stays in context across turns.
  const lastTopicRef = useRef("");

  const lastTurn = turns.length > 0 ? turns[turns.length - 1] : null;

  function scrollToEnd(): void {
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }));
  }

  /** Static-mode turn: compute the answer, remember the topic, append to thread. */
  function askStatic(text: string): void {
    const q = text.trim();
    if (!q) return;
    const result = searchAssistant(q, pageSlug, lastTopicRef.current);
    const tokens = q.split(/\s+/).filter(Boolean);
    if (result.cards.length > 0 && tokens.length >= 2 && !isThinFollowUp(q)) lastTopicRef.current = q;
    turnIdRef.current += 1;
    setTurns((prev) => [...prev, { id: turnIdRef.current, query: q, result }]);
    setQuery("");
    scrollToEnd();
  }

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
      scrollToEnd();
    }
  }

  function onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (chatMode) void sendToAi(query);
    else askStatic(query);
  }

  function onSuggestion(s: string): void {
    if (chatMode) void sendToAi(s);
    else askStatic(s);
  }

  /** Human handoff — WhatsApp link carrying what the visitor asked. */
  function waForQuery(q: string, fallbackHref: string): string {
    const topic = (q || lastTopicRef.current).slice(0, 200);
    return topic ? waLink(`Hi YUGA — I was asking the assistant about: "${topic}". Can you help?`) : fallbackHref;
  }

  /** Submit the inline lead — emails via Web3Forms, else opens WhatsApp. Never loses the lead. */
  async function submitAssistantLead(): Promise<void> {
    if (!lead.name.trim() || !lead.phone.trim() || leadState === "sending") return;
    const input = {
      name: lead.name.trim(),
      phone: lead.phone.trim(),
      interest: lastTurn?.query || lastTopicRef.current || "General enquiry (site assistant)",
      source: pageSlug ? `assistant:${pageSlug}` : "assistant",
    };
    setLeadState("sending");
    try {
      const r = await submitLead(input);
      if (r === "whatsapp") window.open(leadWaLink(input), "_blank", "noopener");
    } catch {
      window.open(leadWaLink(input), "_blank", "noopener");
    } finally {
      setLeadState("done");
    }
  }

  /** Render the rich answer for one static turn (everything except the lead form). */
  function renderAnswer(result: AssistantResult, q: string) {
    const showFallback = result.cards.length === 0 && result.productHits.length === 0 && !result.smallTalk;
    return (
      <div className="mr-auto max-w-[92%]">
        {result.smallTalk && (
          <div className="mb-2 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 text-sm leading-relaxed text-[var(--color-muted)]">
            {result.smallTalk}
          </div>
        )}

        {result.hindiNote && (
          <a
            href={WA_HINDI}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="mb-2 block rounded-2xl border border-[color-mix(in_oklch,var(--color-cyan)_28%,transparent)] bg-[var(--color-surface)] p-3 text-sm leading-relaxed text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
          >
            {result.hindiNote}
          </a>
        )}

        {result.cards.map((a, i) => (
          <div key={`${a.tag}:${a.q}:${i}`} className="mb-2 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
            <div className="text-[11px] uppercase tracking-wider text-[var(--color-faint)]">{a.tag}</div>
            <div className="mt-1 text-sm font-medium text-[var(--color-ink)]">{a.q}</div>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{a.a}</p>
            {a.href && (
              <Link href={a.href} onClick={() => setOpen(false)} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-amber)]">
                Open page <ArrowUpRight size={12} />
              </Link>
            )}
          </div>
        ))}

        {result.productHits.length > 0 && (
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

        {result.actions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {result.actions.map((act) =>
              act.external ? (
                <a
                  key={act.label}
                  href={act.label === "WhatsApp" ? waForQuery(q, act.href) : act.href}
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

        {showFallback && (
          <div className="grid gap-2">
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              {result.fallback.split("message us on WhatsApp")[0]}
              <Link href="/contact" className="text-[var(--color-amber)]" onClick={() => setOpen(false)}>
                message us on WhatsApp
              </Link>
              {result.fallback.split("message us on WhatsApp")[1] ?? ""}
            </p>
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
    );
  }

  const showSuggestions = chatMode ? messages.length === 0 : turns.length === 0;

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
              {/* Suggestions — shown until the first question */}
              {showSuggestions && (
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

              {/* CHAT MODE — LLM conversation transcript */}
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

              {/* STATIC MODE — conversation transcript (question bubble + rich answer) */}
              {!chatMode &&
                turns.map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4"
                  >
                    <div className="ml-auto mb-2 w-fit max-w-[88%] rounded-2xl bg-[var(--color-amber)] px-4 py-2.5 text-sm font-medium text-[var(--color-void)]">
                      {t.query}
                    </div>
                    {renderAnswer(t.result, t.query)}
                  </motion.div>
                ))}

              {/* STATIC MODE — inline lead form (once, when the latest turn shows buying intent) */}
              {!chatMode && lastTurn?.result.leadIntent && (
                <div className="mt-1 rounded-2xl border border-[color-mix(in_oklch,var(--color-amber)_30%,transparent)] bg-[var(--color-surface)] p-4">
                  {leadState === "done" ? (
                    <p className="text-sm text-[var(--color-muted)]">Thanks! 🙏 The team will reach out shortly. For an instant reply, ping us on WhatsApp.</p>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-[var(--color-ink)]">Want a callback or a quote?</p>
                      <p className="mt-0.5 text-xs text-[var(--color-faint)]">Leave your number — our team will reach out.</p>
                      <div className="mt-3 grid gap-2">
                        <input
                          value={lead.name}
                          onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                          placeholder="Your name"
                          className="rounded-xl border border-[var(--color-line)] bg-[var(--color-raised)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-faint)]"
                        />
                        <input
                          value={lead.phone}
                          onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))}
                          placeholder="Phone / WhatsApp"
                          inputMode="tel"
                          className="rounded-xl border border-[var(--color-line)] bg-[var(--color-raised)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-faint)]"
                        />
                        <button
                          onClick={() => void submitAssistantLead()}
                          disabled={leadState === "sending" || !lead.name.trim() || !lead.phone.trim()}
                          data-cursor="hover"
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-amber)] px-4 py-2 text-sm font-medium text-[var(--color-void)] transition-opacity disabled:opacity-50"
                        >
                          {leadState === "sending" ? <Loader2 size={14} className="animate-spin" /> : null}
                          {leadState === "sending" ? "Sending…" : "Request a callback"}
                        </button>
                      </div>
                    </>
                  )}
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
                {chatMode ? "AI assistant · grounded in the YUGA catalog" : "Catalog-powered · ask follow-ups, it remembers context"}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
