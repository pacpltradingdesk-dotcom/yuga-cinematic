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

## Security / hygiene

- CORS is locked to the site origin(s) in `ALLOWED_ORIGINS`.
- Query length is capped (`MAX_QUERY_CHARS`) and history clamped (`MAX_HISTORY`).
- For heavier traffic, add Cloudflare rate-limiting / Turnstile in front of the Worker.
- Never commit the API key. It only ever lives as a Worker secret.
