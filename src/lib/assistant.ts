/**
 * YUGA Assistant — static (no-server) search engine.
 *
 * Turns a free-text query into a structured result the widget renders. It is
 * deliberately smart-but-honest: it understands bitumen via the knowledge base
 * (src/lib/knowledge.ts) plus the product catalog + FAQs, tolerates typos and
 * Hindi/Hinglish, and NEVER dead-ends — every query gets a useful reply.
 *
 * Component stays layout-only; all matching logic lives here.
 */
import { KNOWLEDGE } from "@/lib/knowledge";
import { products, getCalc, type CalcTier, type Product } from "@/lib/catalog";
import { faqs, waLink } from "@/lib/site";
import { crRange, numRange } from "@/lib/format";

export interface AssistantCard {
  readonly tag: string;
  readonly q: string;
  readonly a: string;
  readonly href?: string;
}

export interface ProductHit {
  readonly title: string;
  readonly href: string;
  readonly subtitle: string;
}

export interface AssistantAction {
  readonly label: string;
  readonly href: string;
  /** External link (opens in a new tab) vs an internal route. */
  readonly external?: boolean;
}

export interface AssistantResult {
  /** Conversational reply for greetings / small talk (shown above cards). */
  readonly smallTalk: string | null;
  /** Best knowledge/FAQ/catalog answers, highest score first. */
  readonly cards: readonly AssistantCard[];
  /** Related product pages. */
  readonly productHits: readonly ProductHit[];
  /** Helpful reply used only when there are no cards/hits — never empty. */
  readonly fallback: string;
  /** Topic chips to offer (smart "did you mean" when possible). */
  readonly suggestions: readonly string[];
  /** Contextual next-step CTAs shown under a substantive answer. */
  readonly actions: readonly AssistantAction[];
}

const DEFAULT_SUGGESTIONS: readonly string[] = [
  "What is bio-bitumen?",
  "How much investment?",
  "Can I get a loan?",
  "Carbon credits?",
];

/** Words that carry no search signal. */
const STOP = new Set([
  "the", "a", "an", "is", "are", "was", "of", "for", "to", "and", "or", "what",
  "how", "much", "many", "do", "does", "you", "your", "can", "i", "me", "my",
  "in", "on", "at", "it", "this", "that", "with", "about", "tell", "give", "want",
  "need", "please", "hai", "ka", "ki", "ke", "ko", "me", "mein", "kya", "hota",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/**
 * Small, capped Levenshtein for typo tolerance ("bitumin" → "bitumen").
 * Bails out early past `max` so it stays cheap on every keystroke.
 */
function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      curr.push(v);
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev = curr;
  }
  return prev[b.length];
}

/** How well a single query token matches one target token (0–1). */
function tokenMatch(qt: string, target: string): number {
  if (qt === target) return 1;
  const maxLen = Math.max(qt.length, target.length);
  // prefix/substring (e.g. "subsid" ↔ "subsidy", "invest" ↔ "investment")
  if (qt.length >= 4 && target.length >= 4 && (target.startsWith(qt) || qt.startsWith(target))) {
    return 0.85;
  }
  // typo tolerance, scaled to word length
  const budget = maxLen >= 8 ? 2 : maxLen >= 5 ? 1 : 0;
  if (budget > 0 && editDistance(qt, target, budget) <= budget) return 0.7;
  return 0;
}

/** Best match of a query token against a set of target tokens. */
function bestMatch(qt: string, targets: readonly string[]): number {
  let best = 0;
  for (const t of targets) {
    const m = tokenMatch(qt, t);
    if (m > best) best = m;
    if (best === 1) break;
  }
  return best;
}

/**
 * Hindi/Hinglish → catalog-term expansion so keyword search still hits when the
 * user types in Hindi (e.g. "kitna paisa" → cost, "zameen" → land).
 */
const SYNONYMS: Readonly<Record<string, string>> = {
  kitna: "cost investment", kitne: "cost investment", lagat: "cost", kharch: "cost", kharcha: "cost",
  paisa: "cost investment", paise: "cost investment", daam: "cost price", rupaye: "cost", rupees: "cost",
  invest: "investment cost", lagana: "investment", lagao: "investment",
  kamai: "profit income", munafa: "profit", profit: "profit return roi", return: "profit return roi",
  karz: "loan", karza: "loan", loan: "loan finance bank", bank: "loan bank finance", finance: "loan finance",
  fund: "funding finance", funding: "funding finance equity", paisa_kaha: "funding",
  subsidy: "subsidy grant", sabsidi: "subsidy", sabsidy: "subsidy", anudaan: "subsidy", chhoot: "subsidy",
  zameen: "land area", jagah: "land area", land: "land area", plot: "land area plot",
  licence: "licence permission", license: "licence permission", anumati: "licence permission",
  permission: "licence permission", permit: "licence permission",
  carbon: "carbon credit", credit: "carbon credit",
  document: "documents dpr report", dastavej: "documents", drawing: "documents drawing", dpr: "dpr report documents",
  plant: "plant", machine: "plant machinery", machinery: "plant machinery",
  bio: "bio-bitumen", bitumen: "bitumen", plastic: "plastic-to-fuel", rubber: "rubber-to-fuel tyre", tyre: "rubber-to-fuel tyre",
  emulsion: "emulsion", pmb: "pmb polymer", crmb: "crmb rubber",
  shuru: "start setup begin", suru: "start setup begin", banana: "setup start", lagana_plant: "setup",
  samay: "timeline time", waqt: "timeline time", kab: "timeline time",
};

function expandTokens(raw: string): string[] {
  const base = tokenize(raw);
  const extra: string[] = [];
  for (const w of base) {
    const syn = SYNONYMS[w];
    if (syn) extra.push(...syn.split(" "));
  }
  return [...base, ...extra];
}

/** Any sign the user is in our domain — used to pick the right fallback. */
const DOMAIN_HINT = /\b(bitumen|bitumin|asphalt|tar|plant|road|pmb|crmb|emulsion|pyrolysis|bio|plastic|rubber|tyre|tire|cost|invest|loan|subsidy|carbon|land|licen|dpr|ipo|fund|nhai|morth|vg|profit|roi|machine|factory)/i;

/**
 * Conversational intents in English + Hindi/Hinglish, matched in priority order.
 * Keeps the assistant warm so it never dead-ends on "kaise ho" or "thanks".
 */
const SMALL_TALK: ReadonlyArray<{ re: RegExp; reply: string }> = [
  { re: /\b(thanks|thank you|thankyou|thx|dhanyavad|dhanyawad|shukriya)\b/i, reply: "You're welcome! 😊 Anything else — plant costs, subsidy, land, licences or funding?" },
  { re: /\b(bye|goodbye|alvida|tata)\b/i, reply: "Bye! 👋 Ping us anytime on WhatsApp for a quick reply." },
  { re: /(who are you|aap kaun|tum kaun|kaun ho|your name|tumhara naam)/i, reply: "I'm the YUGA Assistant — I help you explore bitumen / bio-bitumen plants, costs, subsidy, licences, land and funding. Ask me anything in this space!" },
  { re: /(kaise ho|kaise hain|kese ho|kya haal|kya hal|kaisa hai|how are you|how r u|sab badhiya|whats up|what's up|kya chal)/i, reply: "Doing great, thanks! 😊 I can help with plant costs, subsidy, land, licences, funding or carbon credits — what would you like to know?" },
  { re: /\b(help|madad|kya kar sakte|what can you do|kya bata sakte|options)\b/i, reply: "Sure! Ask me about any plant (bio-bitumen, plastic-to-fuel, PMB, CRMB…), its cost & ROI, subsidy, land needed, licences, funding or carbon credits. Pick a topic below 👇" },
  { re: /^\s*(hi+|hey+|hello+|helo|yo|hola|hlo|namaste|namaskar|namaskaar|salaam|ram ram|jai)\b/i, reply: "Hi! 👋 I'm the YUGA assistant. Ask me about bitumen, plant costs, subsidy, carbon credits, licences, land or funding — or pick a topic:" },
];

function smallTalkReply(raw: string): string | null {
  const q = raw.trim();
  if (!q) return null;
  for (const { re, reply } of SMALL_TALK) if (re.test(q)) return reply;
  return null;
}

/** Standard next-step CTAs offered under any substantive answer. */
const ACTIONS: readonly AssistantAction[] = [
  { label: "Request a DPR", href: "/contact" },
  { label: "Book a call", href: "/contact" },
  { label: "WhatsApp", href: waLink("Hi YUGA, I have a question from the site assistant."), external: true },
];

const COST_INTENT = /\b(cost|costs?|invest|investment|capex|price|pricing|profit|payback|roi|revenue|returns?|budget|setup|kitna|kitne|lagat|kharch|kharcha|paisa|paise|daam|kamai|munafa)\b/i;
/** Capacity like "25 tpd", "10 mt", "20 mt/day", "5 tph". */
const CAP_RE = /(\d+(?:\.\d+)?)\s*(tpd|tph|mt|ton)/i;

/** Leading number in a tier capacity label ("30-50 MT/Day" → 30). */
function tierCapNumber(cap: string): number {
  const m = cap.match(/\d+(?:\.\d+)?/);
  return m ? Number(m[0]) : NaN;
}

/** Product whose title/slug best matches the query; null if none clearly named. */
function detectProduct(raw: string): Product | null {
  const q = raw.toLowerCase();
  let best: { p: Product; score: number } | null = null;
  for (const p of products) {
    const words = [...tokenize(p.title), ...p.slug.split("-")];
    let score = 0;
    for (const w of words) if (w.length > 2 && q.includes(w)) score += 1;
    if (score > 0 && (!best || score > best.score)) best = { p, score };
  }
  return best?.p ?? null;
}

/**
 * Calculator-style direct answer for "cost of a 25 TPD bio-bitumen plant".
 * Grounds in the product's calc tiers (same numbers as the on-page Cost & ROI
 * tool — never invented). `pageSlug` lets a product page default to its own
 * product when the query doesn't name one. Returns null when the query isn't a
 * capacity/cost question we can answer from calc data.
 */
function calcAnswer(raw: string, pageSlug?: string): AssistantCard | null {
  const capM = raw.match(CAP_RE);
  if (!capM && !COST_INTENT.test(raw)) return null;

  const named = detectProduct(raw);
  const pageProduct = pageSlug ? products.find((p) => p.slug === pageSlug && getCalc(p.slug)) : undefined;
  const product = named ?? pageProduct ?? products.find((p) => p.slug === "bio-bitumen") ?? null;
  if (!product) return null;

  const calc = getCalc(product.slug);
  if (!calc || calc.tiers.length === 0) return null;

  let tier: CalcTier;
  if (capM) {
    const want = Number(capM[1]);
    tier = calc.tiers.reduce((bestT, t) => {
      const d = Math.abs(tierCapNumber(t.cap) - want);
      const bd = Math.abs(tierCapNumber(bestT.cap) - want);
      return Number.isNaN(d) ? bestT : d < bd ? t : bestT;
    }, calc.tiers[0]);
  } else {
    tier = calc.tiers[Math.min(1, calc.tiers.length - 1)];
  }

  const parts = [`CAPEX ${crRange(tier.invest)}`];
  if (tier.output) parts.push(`output ${numRange(tier.output)} ${tier.outUnit}`);
  if (tier.revenue) parts.push(`revenue ${crRange(tier.revenue)}/yr`);
  if (tier.profit) parts.push(`profit ${crRange(tier.profit)}/yr`);
  parts.push(`payback ${tier.payback}`);

  return {
    tag: `${product.title} · ${tier.cap}`,
    q: `~${tier.cap} ${product.title} plant`,
    a: `${parts.join(" · ")}. Indicative — actual figures depend on location, feedstock price and utilisation; get a DPR for exact numbers.`,
    href: `/products/${product.slug}#cost`,
  };
}

/**
 * A query is a "follow-up" when it names no product and is just a capacity, a
 * pronoun or a couple of words ("20 tpd", "and that?", "iska kitna"). In that
 * case we blend the previous topic so the answer stays in context.
 */
export function isThinFollowUp(raw: string): boolean {
  if (detectProduct(raw)) return false;
  if (CAP_RE.test(raw)) return true;
  if (/^\s*(aur|and|what about|iska|uska|isme|usme|ye|yeh|that|this|same|inka|unka)\b/i.test(raw.trim())) return true;
  return expandTokens(raw).length <= 1;
}

interface Scored<T> {
  readonly item: T;
  readonly score: number;
}

function scoreText(queryTokens: readonly string[], keywords: readonly string[], text: string): number {
  const keyTokens = keywords.flatMap((k) => tokenize(k));
  const textTokens = tokenize(text);
  let total = 0;
  for (const qt of queryTokens) {
    // keyword hits count double — they're the curated triggers
    const k = bestMatch(qt, keyTokens) * 2;
    const t = bestMatch(qt, textTokens);
    total += Math.max(k, t);
  }
  return total;
}

const MIN_CARD_SCORE = 1.2;

export function searchAssistant(raw: string, pageSlug?: string, prevTopic?: string): AssistantResult {
  const smallTalk = smallTalkReply(raw);
  // Follow-up: blend the previous topic when the new query is thin/contextual.
  const followUp = !!prevTopic && isThinFollowUp(raw);
  const effective = followUp ? `${prevTopic} ${raw}` : raw;
  const qt = expandTokens(effective);
  const calcCard = calcAnswer(raw, pageSlug) ?? (followUp ? calcAnswer(effective, pageSlug) : null);

  if (qt.length === 0 && !calcCard) {
    return {
      smallTalk,
      cards: [],
      productHits: [],
      fallback:
        smallTalk ??
        "Ask me anything about bitumen plants — costs, subsidy, land, licences, funding or carbon credits. Pick a topic to start 👇",
      suggestions: DEFAULT_SUGGESTIONS,
      actions: [],
    };
  }

  // Knowledge base (richest, domain answers).
  const kb: Scored<AssistantCard>[] = KNOWLEDGE.map((e) => ({
    item: { tag: "YUGA", q: e.title, a: e.answer, href: e.href },
    score: scoreText(qt, e.keywords, e.answer),
  }));

  // Catalog FAQs + per-product Q&A.
  const faqCards: Scored<AssistantCard>[] = faqs.map((f) => ({
    item: { tag: "FAQ", q: f.q, a: f.a },
    score: scoreText(qt, [f.q], `${f.q} ${f.a}`),
  }));
  const productQa: Scored<AssistantCard>[] = products.flatMap((p) =>
    p.qa.map((qa) => ({
      item: { tag: p.title, q: qa.q, a: qa.a, href: `/products/${p.slug}` },
      score: scoreText(qt, [qa.q, p.title], `${qa.q} ${qa.a}`),
    })),
  );

  const allCards = [...kb, ...faqCards, ...productQa].sort((a, b) => b.score - a.score);

  // Drop near-duplicate answers (e.g. a KB topic + a same-question FAQ) so the
  // top 3 are distinct — compare on normalised question text.
  const seen = new Set<string>();
  const ranked = allCards.filter((c) => {
    const key = c.item.q.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const baseCards = ranked.filter((c) => c.score >= MIN_CARD_SCORE).slice(0, 3).map((c) => c.item);
  // A calculator answer (deterministic, grounded in calc tiers) always leads.
  const cards = calcCard
    ? [calcCard, ...baseCards.filter((c) => c.q !== calcCard.q)].slice(0, 3)
    : baseCards;

  // Related product pages.
  const productHits: ProductHit[] = products
    .map((p) => ({
      p,
      score: scoreText(qt, [p.title], `${p.title} ${p.subtitle} ${p.benefits.join(" ")} ${p.applications.join(" ")}`),
    }))
    .filter((x) => x.score >= MIN_CARD_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => ({ title: x.p.title, href: `/products/${x.p.slug}`, subtitle: x.p.subtitle }));

  // Smart "did you mean": when nothing crosses the bar, offer the closest topics.
  const nearMisses = ranked
    .filter((c) => c.score > 0)
    .slice(0, 4)
    .map((c) => c.item.q);

  const inDomain = DOMAIN_HINT.test(raw);
  const fallback =
    cards.length > 0
      ? ""
      : inDomain
        ? "I want to get that right rather than guess — here are the closest topics, or message us on WhatsApp and the team will answer in detail:"
        : "I'm the YUGA assistant, focused on bitumen plants and the business around them — cost, subsidy, land, licences, funding and carbon credits. Try one of these, or message us on WhatsApp:";

  const suggestions = cards.length > 0
    ? DEFAULT_SUGGESTIONS
    : nearMisses.length > 0
      ? nearMisses
      : DEFAULT_SUGGESTIONS;

  const actions = cards.length > 0 || productHits.length > 0 ? ACTIONS : [];

  return { smallTalk, cards, productHits, fallback, suggestions, actions };
}
