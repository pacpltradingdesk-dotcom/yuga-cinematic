"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, ArrowUpRight, Send, Loader2 } from "lucide-react";
import { products } from "@/lib/catalog";
import { faqs } from "@/lib/site";
import { hasAiChat } from "@/lib/config";
import { askAi, type ChatMessage } from "@/lib/ai";
import { cn } from "@/lib/utils";

/**
 * AI Assistance (client note). Default mode is a static, browser-side catalog
 * search that answers from the product Q&A + FAQs and links to the right page —
 * so it ships on the static export with no server.
 *
 * When the client sets `NEXT_PUBLIC_AI_ENDPOINT` (their serverless proxy that
 * holds the model key), the widget upgrades to a real chat that POSTs the query
 * + grounded catalog context there. No key ever touches the browser.
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

/**
 * Conversational (non-catalog) intents in English + Hindi/Hinglish, matched in
 * priority order. Each returns a friendly canned reply so the static assistant
 * never dead-ends on small talk like "kaise ho" or "thanks".
 */
const SMALL_TALK: ReadonlyArray<{ re: RegExp; reply: string }> = [
  { re: /\b(thanks|thank you|thankyou|thx|dhanyavad|dhanyawad|shukriya)\b/i, reply: "You're welcome! 😊 Anything else — plant costs, subsidy, land, licences or funding?" },
  { re: /\b(bye|goodbye|alvida|tata)\b/i, reply: "Bye! 👋 Ping us anytime on WhatsApp for a quick reply." },
  { re: /(who are you|aap kaun|tum kaun|kaun ho|your name|tumhara naam)/i, reply: "I'm the YUGA Assistant — I help you explore our bitumen / bio-bitumen plants, costs, subsidy, licences, land and funding. Ask away!" },
  { re: /(kaise ho|kaisे|kaise hain|kese ho|kaisा|kya haal|kya hal|kaisa hai|how are you|how r u|sab badhiya|whats up|what's up|kya chal)/i, reply: "I'm doing great, thanks for asking! 😊 I can help with plant costs, subsidy, land, licences, funding or carbon credits — what would you like to know?" },
  { re: /\b(help|madad|kya kar sakte|what can you do|kya bata sakte)\b/i, reply: "Sure! Ask me about any plant (bio-bitumen, plastic-to-fuel, PMB, CRMB…), its cost & ROI, subsidy, land needed, licences, or funding options. Pick a topic below 👇" },
  { re: /^\s*(hi+|hey+|hello+|helo|yo|hola|hlo|namaste|namaskar|namaskaar|salaam|ram ram|jai)\b/i, reply: "Hi! 👋 I'm the YUGA assistant. Ask me about plant costs, subsidy, carbon credits, licences, land or funding — or pick a topic:" },
];

function smallTalkReply(raw: string): string | null {
  const q = raw.trim();
  if (!q) return null;
  for (const { re, reply } of SMALL_TALK) if (re.test(q)) return reply;
  return null;
}

/**
 * Hindi/Hinglish → catalog-term expansion so keyword search hits even when the
 * user types in Hindi (e.g. "kitna paisa" → cost, "zameen" → land).
 */
const SYNONYMS: Readonly<Record<string, string>> = {
  kitna: "cost investment", kitne: "cost investment", lagat: "cost", kharch: "cost", kharcha: "cost",
  paisa: "cost investment", paise: "cost investment", daam: "cost price", rupaye: "cost", rupees: "cost",
  invest: "investment cost", lagana: "investment", lagao: "investment",
  kamai: "profit income", munafa: "profit", profit: "profit return", return: "profit return",
  karz: "loan", karza: "loan", loan: "loan finance", bank: "loan bank finance", finance: "loan finance",
  fund: "funding finance", funding: "funding finance", paisa_kaha: "funding",
  subsidy: "subsidy", sabsidi: "subsidy", sabsidy: "subsidy", anudaan: "subsidy", chhoot: "subsidy",
  zameen: "land area", zameer: "land", jagah: "land area", land: "land area", plot: "land area plot",
  licence: "licence permission", license: "licence permission", anumati: "licence permission",
  permission: "licence permission", permit: "licence permission",
  carbon: "carbon credit", credit: "carbon credit",
  document: "documents dpr report", dastavej: "documents", drawing: "documents drawing", dpr: "dpr report documents",
  plant: "plant", machine: "plant machinery", machinery: "plant machinery",
  bio: "bio-bitumen", bitumen: "bitumen", plastic: "plastic-to-fuel", rubber: "rubber-to-fuel tyre", tyre: "rubber-to-fuel tyre",
  emulsion: "emulsion", pmb: "pmb", crmb: "crmb",
};

function expandQuery(raw: string): string {
  const words = raw.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/);
  const extra = words.map((w) => SYNONYMS[w]).filter(Boolean);
  return [raw, ...extra].join(" ");
}

export function AiAssistant() {
  const chatMode = hasAiChat();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Chat-mode state (only used when an AI endpoint is configured).
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const talk = !chatMode ? smallTalkReply(query) : null;

  const { answers, productHits } = useMemo(() => {
    const qt = tokens(expandQuery(query));
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
              {!chatMode && hasQuery && talk && (
                <div className="grid gap-2">
                  <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 text-sm leading-relaxed text-[var(--color-muted)]">
                    {talk}
                  </div>
                  {answers.length === 0 && productHits.length === 0 &&
                    SUGGESTIONS.map((s) => (
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

              {/* STATIC MODE — genuine no-match: help, don't dead-end */}
              {!chatMode && hasQuery && !talk && answers.length === 0 && productHits.length === 0 && (
                <div className="grid gap-2">
                  <p className="text-sm text-[var(--color-muted)]">
                    I couldn&apos;t find that in the catalog yet. Try a topic below, or{" "}
                    <Link href="/contact" className="text-[var(--color-amber)]" onClick={() => setOpen(false)}>
                      message us on WhatsApp
                    </Link>{" "}
                    — we reply fast.
                  </p>
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

              {!chatMode &&
                answers.map((a) => (
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

              {!chatMode && productHits.length > 0 && (
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
