"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, ArrowUpRight, Send, Loader2, RotateCcw, MessageCircle } from "lucide-react";
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
/** Short pivots always available above the input once a chat has started. */
const QUICK_CHIPS = ["Plant cost", "Subsidy", "Bank loan", "Land needed", "Which plant?"];
const NUDGE_KEY = "yuga-asst-nudge";

/** One static-mode conversation turn: the question + its computed answer. */
interface StaticTurn {
  readonly id: number;
  readonly query: string;
  readonly result: AssistantResult;
}

/** Small brand avatar shown beside the assistant's replies. */
function BotAvatar({ size = 28, icon = 14 }: { size?: number; icon?: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-amber-deep)] text-[var(--color-void)] shadow-[0_4px_14px_-4px_var(--color-amber-deep)]"
      style={{ height: size, width: size }}
    >
      <Sparkles size={icon} />
    </div>
  );
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
  const inputRef = useRef<HTMLInputElement>(null);

  // One-time launcher nudge (per browser session) to aid discovery.
  const [nudge, setNudge] = useState(false);

  const hasQuery = query.trim().length > 0;
  const hasConversation = chatMode ? messages.length > 0 : turns.length > 0;

  // Page-aware context: on a product page, calc answers default to that product.
  const pathname = usePathname();
  const pageSlug = useMemo(() => pathname.match(/^\/products\/([^/]+)/)?.[1], [pathname]);

  // Follow-up memory: the last substantive topic, so a thin query ("20 tpd",
  // "iska kitna?") stays in context across turns.
  const lastTopicRef = useRef("");

  const lastTurn = turns.length > 0 ? turns[turns.length - 1] : null;

  // Scroll to the newest turn AFTER it paints (single rAF fires too early).
  useEffect(() => {
    const c = scrollRef.current;
    if (c) c.scrollTo({ top: c.scrollHeight, behavior: "smooth" });
  }, [turns.length, messages.length, busy]);

  // When the panel opens: focus the input and allow Escape to close.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Gentle, once-per-session nudge — appears briefly, then retires itself.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(NUDGE_KEY) === "seen") return;
    } catch {
      return;
    }
    const show = setTimeout(() => setNudge(true), 2800);
    const hide = setTimeout(() => setNudge(false), 11000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  function dismissNudge(): void {
    setNudge(false);
    try {
      sessionStorage.setItem(NUDGE_KEY, "seen");
    } catch {
      /* ignore */
    }
  }

  function openPanel(): void {
    setOpen(true);
    dismissNudge();
  }

  /** Clear the whole conversation back to the welcome state. */
  function resetChat(): void {
    setTurns([]);
    setMessages([]);
    setError(null);
    setQuery("");
    setLead({ name: "", phone: "" });
    setLeadState("idle");
    lastTopicRef.current = "";
    turnIdRef.current = 0;
    inputRef.current?.focus();
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
  function renderAnswer(result: AssistantResult, q: string, isLatest: boolean) {
    const showFallback = result.cards.length === 0 && !result.smallTalk;
    return (
      <div className="flex max-w-[95%] items-start gap-2.5">
        <BotAvatar />
        <div className="min-w-0 flex-1">
          {result.smallTalk && (
            <div className="mb-2 rounded-2xl rounded-tl-sm border border-[var(--color-line)] bg-[var(--color-surface)] p-4 text-sm leading-relaxed text-[var(--color-muted)]">
              {result.smallTalk}
            </div>
          )}

          {result.cards.slice(0, 1).map((a, i) => (
            <div
              key={`${a.tag}:${a.q}:${i}`}
              className="mb-2 rounded-2xl rounded-tl-sm border border-[var(--color-line)] bg-[var(--color-surface)] p-4"
            >
              <div className="text-[11px] uppercase tracking-wider text-[var(--color-faint)]">{a.tag}</div>
              <div className="mt-1 text-sm font-medium text-[var(--color-ink)]">{a.q}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{a.a}</p>
              {a.href && (
                <Link
                  href={a.href}
                  onClick={() => setOpen(false)}
                  className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-amber)] transition-opacity hover:opacity-80"
                >
                  Open page <ArrowUpRight size={12} />
                </Link>
              )}
            </div>
          ))}

          {isLatest && result.actions.length > 0 && (
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
                  className="rounded-xl border border-[var(--color-line)] px-3 py-2 text-left text-sm text-[var(--color-muted)] outline-none transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_35%,transparent)] hover:text-[var(--color-ink)] focus-visible:border-[color-mix(in_oklch,var(--color-amber)_50%,transparent)] focus-visible:text-[var(--color-ink)]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const showSuggestions = chatMode ? messages.length === 0 : turns.length === 0;

  return (
    <>
      {/* launcher + one-time nudge */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5">
        <AnimatePresence>
          {nudge && !open && (
            <motion.button
              initial={{ opacity: 0, x: 16, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              onClick={openPanel}
              data-cursor="hover"
              className="glass hidden items-center gap-2 rounded-2xl border border-[color-mix(in_oklch,var(--color-amber)_25%,transparent)] py-2.5 pl-4 pr-3 text-sm font-medium text-[var(--color-ink)] shadow-xl shadow-black/30 sm:flex"
            >
              Need help? Ask me anything
              <ArrowUpRight size={14} className="text-[var(--color-amber)]" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => (open ? setOpen(false) : openPanel())}
          data-cursor="hover"
          aria-label={open ? "Close AI assistant" : "Open AI assistant"}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-amber-deep)] text-[var(--color-void)] shadow-[0_8px_40px_-8px_var(--color-amber-deep)] transition-transform hover:scale-105 active:scale-95"
        >
          {!open && (
            <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border-2 border-[var(--color-amber)] opacity-30" />
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "spark"}
              initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              {open ? <X size={22} /> : <Sparkles size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            role="dialog"
            aria-label="YUGA Assistant"
            // Let the chat scroll natively under the mouse; Lenis keeps driving the
            // page everywhere else (data-lenis-prevent excludes this subtree).
            data-lenis-prevent
            className="glass fixed bottom-24 right-5 z-50 flex max-h-[min(78vh,calc(100dvh-7rem))] w-[min(94vw,25rem)] flex-col overflow-hidden rounded-3xl border border-[color-mix(in_oklch,var(--color-amber)_22%,transparent)] shadow-2xl shadow-black/50 ring-glow"
          >
            {/* header */}
            <div className="relative flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3.5">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklch,var(--color-amber)_50%,transparent)] to-transparent" />
              <BotAvatar size={36} icon={17} />
              <div className="min-w-0 flex-1">
                <div className="font-display text-sm font-semibold tracking-tight">YUGA Assistant</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[var(--color-faint)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Online · instant replies
                </div>
              </div>
              {hasConversation && (
                <button
                  onClick={resetChat}
                  data-cursor="hover"
                  aria-label="Start a new chat"
                  title="New chat"
                  className="grid h-8 w-8 place-items-center rounded-full text-[var(--color-faint)] transition-colors hover:bg-[var(--color-raised)] hover:text-[var(--color-ink)]"
                >
                  <RotateCcw size={15} />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                data-cursor="hover"
                aria-label="Close assistant"
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--color-faint)] transition-colors hover:bg-[var(--color-raised)] hover:text-[var(--color-ink)]"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              {/* Welcome + suggestions — shown until the first question */}
              {showSuggestions && (
                <div className="grid gap-3">
                  <div className="flex items-start gap-2.5">
                    <BotAvatar />
                    <div className="rounded-2xl rounded-tl-sm border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--color-muted)]">
                      Namaste 👋 I&apos;m the YUGA assistant. Ask me about any plant — cost, subsidy, land, licences, funding or carbon credits.
                    </div>
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--color-faint)]">Try asking</p>
                  <div className="grid gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => onSuggestion(s)}
                        data-cursor="hover"
                        className="group flex items-center justify-between rounded-xl border border-[var(--color-line)] px-3.5 py-2.5 text-left text-sm text-[var(--color-muted)] outline-none transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_35%,transparent)] hover:text-[var(--color-ink)] focus-visible:border-[color-mix(in_oklch,var(--color-amber)_50%,transparent)] focus-visible:text-[var(--color-ink)]"
                      >
                        {s}
                        <ArrowUpRight size={13} className="shrink-0 text-[var(--color-faint)] opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-[var(--color-amber)]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CHAT MODE — LLM conversation transcript */}
              {chatMode && (
                <div className="grid gap-3">
                  {messages.map((m, i) =>
                    m.role === "user" ? (
                      <div
                        key={i}
                        className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[var(--color-amber)] px-4 py-2.5 text-sm font-medium leading-relaxed text-[var(--color-void)]"
                      >
                        {m.content}
                      </div>
                    ) : (
                      <div key={i} className="flex max-w-[92%] items-start gap-2.5">
                        <BotAvatar />
                        <div className="rounded-2xl rounded-tl-sm border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
                          {m.content}
                        </div>
                      </div>
                    ),
                  )}
                  {busy && (
                    <div className="flex items-center gap-2.5">
                      <BotAvatar />
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-faint)] [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-faint)] [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-faint)]" />
                      </div>
                    </div>
                  )}
                  {error && (
                    <p className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-muted)]">
                      {error}
                    </p>
                  )}
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
                    <div className="ml-auto mb-2.5 w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-[var(--color-amber)] px-4 py-2.5 text-sm font-medium text-[var(--color-void)]">
                      {t.query}
                    </div>
                    {renderAnswer(t.result, t.query, t.id === lastTurn?.id)}
                  </motion.div>
                ))}

              {/* STATIC MODE — inline lead form (once, when the latest turn shows buying intent) */}
              {!chatMode && lastTurn?.result.leadIntent && (
                <div className="ml-[2.4rem] mt-1 rounded-2xl border border-[color-mix(in_oklch,var(--color-amber)_30%,transparent)] bg-[var(--color-surface)] p-4">
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
                          className="rounded-xl border border-[var(--color-line)] bg-[var(--color-raised)] px-3 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[color-mix(in_oklch,var(--color-amber)_45%,transparent)] placeholder:text-[var(--color-faint)]"
                        />
                        <input
                          value={lead.phone}
                          onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))}
                          placeholder="Phone / WhatsApp"
                          inputMode="tel"
                          className="rounded-xl border border-[var(--color-line)] bg-[var(--color-raised)] px-3 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-colors focus:border-[color-mix(in_oklch,var(--color-amber)_45%,transparent)] placeholder:text-[var(--color-faint)]"
                        />
                        <button
                          onClick={() => void submitAssistantLead()}
                          disabled={leadState === "sending" || !lead.name.trim() || !lead.phone.trim()}
                          data-cursor="hover"
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-amber)] px-4 py-2.5 text-sm font-semibold text-[var(--color-void)] transition-opacity hover:opacity-90 disabled:opacity-50"
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

            {/* quick pivots — always available once a chat has started */}
            {hasConversation && (
              <div className="flex gap-2 overflow-x-auto border-t border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {QUICK_CHIPS.map((c) => (
                  <button
                    key={c}
                    onClick={() => onSuggestion(c)}
                    disabled={busy}
                    data-cursor="hover"
                    className="shrink-0 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] outline-none transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_40%,transparent)] hover:text-[var(--color-amber)] focus-visible:border-[color-mix(in_oklch,var(--color-amber)_55%,transparent)] focus-visible:text-[var(--color-amber)] disabled:opacity-50"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={onSubmit} className="border-t border-[var(--color-line)] bg-[var(--color-surface)] p-3">
              <div className="flex items-center gap-1.5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-raised)] px-2 py-1.5 transition-colors focus-within:border-[color-mix(in_oklch,var(--color-amber)_45%,transparent)]">
                <a
                  href={waForQuery("", waLink("Hi YUGA, I'd like to connect with the team."))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  aria-label="Connect on WhatsApp"
                  title="Chat on WhatsApp"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-emerald-400 outline-none transition-colors hover:bg-[color-mix(in_oklch,var(--color-ink)_8%,transparent)] hover:text-emerald-300"
                >
                  <MessageCircle size={17} />
                </a>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={chatMode ? "Ask the assistant…" : "Ask a question…"}
                  disabled={busy}
                  aria-label="Type your question"
                  className="flex-1 bg-transparent py-1 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-faint)] disabled:opacity-60"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  disabled={busy || !hasQuery}
                  data-cursor="hover"
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all",
                    hasQuery && !busy
                      ? "bg-[var(--color-amber)] text-[var(--color-void)] hover:scale-105"
                      : "text-[var(--color-faint)]",
                  )}
                >
                  {busy ? <Loader2 size={15} className="animate-spin text-[var(--color-amber)]" /> : <Send size={15} />}
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
