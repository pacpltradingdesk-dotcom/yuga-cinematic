# YUGA Assistant — Tier 3 roadmap

Tier 1 (smart static) is **live**. Tier 2 (real LLM proxy) is **built and dormant**
— deploy the worker + set `NEXT_PUBLIC_AI_ENDPOINT` to turn it on.

Tier 3 items below are deliberately **not built yet** — each is premature today
(YAGNI) and untestable until Tier 2 is live. This is the build order + the trigger
that makes each one worth doing.

## Already shipped from "Tier 3"
- **Human handoff** ✅ — the WhatsApp action carries what the visitor was asking,
  so the team picks up with context. (`waWithContext` in `AiAssistant.tsx`.)

## 1. Tool-calling — *build when Tier 2 is live*
Let the LLM call real functions instead of only reading context:
- `getPlantCost(product, capacity)` → exact tier from `catalog.calc`
- `getStateSubsidy(state)` → from `catalog.subsidy.states`
- `bookCall(name, phone)` → reuse `submitLead`
**How:** add Anthropic `tools` to the worker + a tool-execution loop; the tool
handlers run on the worker and read the same catalog JSON. **Trigger:** users ask
precise "what's the cost for 22 TPD in Odisha" questions the static calc can't
compose. Until then the grounded context already lets the LLM quote calc figures.

## 2. RAG / vector retrieval — *build when the context outgrows one prompt*
Today `buildAiContext()` sends the **entire** catalog + KB + FAQs in one prompt and
it fits comfortably — so "retrieval" = "send everything", which is simpler and
loses nothing. RAG only pays off once content (blog, many products, long docs)
exceeds the token budget.
**How:** precompute embeddings at build time into a JSON; retrieve top-k by cosine
(client-side or in the worker) and send only those chunks as context.
**Trigger:** `buildAiContext()` length approaches model input limits, or answers
start missing newly-added content.

## 3. Voice — *build when there's demand + Tier 2 live*
PACPL already has a Voice Agent stack (Deepgram STT + GPT-4o + Deepgram Aura TTS —
see `software.ts` "voice-agent"). Wire mic input → existing chat endpoint → TTS out.
**How:** a WebRTC/mic capture hook in the widget feeding `askAi`, TTS on the reply.
**Trigger:** measured demand from mobile/low-literacy users; meaningful for Hindi.

## 4. Full chat-mode parity — *build alongside Tier 2 go-live*
When chat mode is on, also surface the static-mode goodies inside the LLM thread:
inline lead form on buying intent, calculator cards, and **streaming** replies
(switch the worker + `ai.ts` to SSE for token-by-token output).
**Trigger:** right after the worker is deployed, as polish.

## Principle
Don't build speculative AI infra. Each tier earns its place when its trigger fires.
The static assistant already answers, calculates, remembers context, captures leads
and hands off to humans — with **zero** server cost.
