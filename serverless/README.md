# YUGA Assistant — real LLM chat (Tier 2)

The website ships with a smart **static** assistant (catalog search, calculator
answers, follow-up memory, Hindi help, lead capture) that needs no server and no
key. This folder turns on the **real LLM chat** upgrade.

Nothing here is part of the website build. It's a tiny **proxy** you deploy once.
The moment you set `NEXT_PUBLIC_AI_ENDPOINT` on the site, the widget switches from
static search to live chat automatically — no code change.

## How it works

```
Browser (static site)  ──POST { query, context, history }──▶  Worker (holds API key)  ──▶  Claude API
                       ◀──────────── { answer } ───────────────┘
```

- The **API key never reaches the browser** — it lives as a Worker secret.
- Every answer is **grounded** in the catalog `context` the site sends, and a
  **hard anti-hallucination prompt** forbids inventing figures/claims — so the AI
  can never re-introduce the unverified claims we removed (IPO year, import %,
  fake subsidies, awards, etc.).

## Deploy (Cloudflare Workers — free tier is enough)

1. Install Wrangler and log in:
   ```bash
   npm i -g wrangler
   wrangler login
   ```
2. From this `serverless/` folder, create `wrangler.toml`:
   ```toml
   name = "yuga-assistant"
   main = "yuga-assistant-worker.js"
   compatibility_date = "2026-01-01"
   ```
3. Add your Anthropic key as a secret (never commit it):
   ```bash
   wrangler secret put ANTHROPIC_API_KEY
   # paste the key when prompted
   ```
   Get a key at https://console.anthropic.com/ (Billing → add a small cap, e.g. $10/mo).
4. Deploy:
   ```bash
   wrangler deploy
   ```
   You'll get a URL like `https://yuga-assistant.<account>.workers.dev`.
5. Open `yuga-assistant-worker.js` → confirm your live domain is in `ALLOWED_ORIGINS`
   (defaults to `yuga-pmc.in`). Re-deploy if you edit it.

## Turn it on for the site

Set the env var wherever the site builds (GitHub Actions secret / repo variable),
then redeploy the site:

```
NEXT_PUBLIC_AI_ENDPOINT = https://yuga-assistant.<account>.workers.dev
```

The footer caption flips to "AI assistant · grounded in the YUGA catalog" and the
widget becomes a real chat. If the endpoint is ever removed or down, the widget
falls back to the static search — it never dead-ends.

## Cost (rough)

Model is `claude-haiku-4-5` (fast + cheap). A typical grounded answer is well
under a cent. A small monthly cap on the Anthropic key keeps spend bounded.
For deeper answers, change `MODEL` in the worker to `claude-sonnet-4-6`.

## Use OpenAI instead (optional)

Swap the `fetch(...)` block in the worker for:
```js
res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "content-type": "application/json" },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    max_tokens: MAX_TOKENS,
    messages: [{ role: "system", content: system }, ...messages],
  }),
});
// answer = data.choices?.[0]?.message?.content
```
and set `OPENAI_API_KEY` as the secret instead.

## Security (this proxy spends your paid API budget — read this)

A public static site can't hold a true secret (anything in the browser bundle is
readable), so the proxy is layered:

1. **Hard Origin allow-list** — requests whose `Origin` isn't in `ALLOWED_ORIGINS`
   get `403` before any work. (CORS alone is *not* access control — `Origin` is
   forgeable by non-browser callers, which is why the next layer matters.)
2. **Turnstile (recommended in production)** — the real defense against curl/bot
   abuse. The site already integrates Cloudflare Turnstile (`NEXT_PUBLIC_TURNSTILE_KEY`).
   Set the secret on the worker:
   ```bash
   wrangler secret put TURNSTILE_SECRET   # Turnstile "secret key" from Cloudflare
   ```
   When set, every request MUST include a valid `turnstileToken`. (Extend
   `src/lib/ai.ts` to solve a Turnstile challenge and pass the token — until then,
   leave `TURNSTILE_SECRET` unset and rely on Origin + rate-limit.)
3. **Cloudflare rate-limiting** — add a per-IP rate-limit rule on the worker route
   (dashboard → Security → WAF/Rate limiting), e.g. 20 req/min/IP.
4. **Size caps** — query, context, per-message and total payload are all bounded
   in the worker (amplification guard).
5. **Prompt-injection** — the client sends `context`, so it's treated as untrusted
   *reference data* and the prompt forbids obeying instructions inside it. A
   visitor can only affect their own reply (the worker holds no other data). For
   maximum isolation, build the context **inside the worker** from an embedded
   catalog bundle and ignore the request's `context` field entirely.
6. **Never commit the API key** — it only ever lives as a Worker secret.
