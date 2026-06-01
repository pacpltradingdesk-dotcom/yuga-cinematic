/**
 * YUGA software vertical — the in-house AI products PACPL runs its own bitumen
 * business on, now offered to clients. Content sourced from the product briefs
 * in `pacpl-website/product files for website`. Layout-only components read this.
 */

export interface SoftwareStat {
  readonly value: string;
  readonly label: string;
}

export interface SoftwareProduct {
  readonly slug: string;
  readonly name: string;
  /** Category or live URL shown as a tag. */
  readonly tag: string;
  readonly oneLiner: string;
  readonly what: string;
  readonly features: readonly string[];
  readonly stats: readonly SoftwareStat[];
  /** Optional status pill (e.g. "Live", "Experimental"). */
  readonly status?: string;
  readonly accent: "amber" | "cyan";
}

export const softwareProducts: readonly SoftwareProduct[] = [
  {
    slug: "ai-sales-dashboard",
    name: "YUGA AI Sales Dashboard",
    tag: "Enterprise · PMC",
    status: "Live",
    accent: "amber",
    oneLiner: "AI-powered bitumen trading intelligence — pricing, CRM, logistics and market signals in one platform.",
    what:
      "An enterprise BI platform built in-house for India's bitumen trade. It fuses live market data, ML forecasting, CRM and logistics into one interface — a full landing-cost and PDF quote for any Indian city in under 30 seconds.",
    features: [
      "24-month AI price forecast (Prophet + ARIMA + LightGBM)",
      "10-signal composite market signal (crude, FX, news, tenders…)",
      "Maritime vessel tracking + 28-state demand heatmap",
      "AI negotiation assistant with 3-tier offers",
      "Instant PDF quotes with WhatsApp sharing",
    ],
    stats: [
      { value: "80+", label: "Pages" },
      { value: "60+", label: "Analytics engines" },
      { value: "25", label: "API integrations" },
      { value: "24,000+", label: "Contacts" },
    ],
  },
  {
    slug: "bitumen-crm",
    name: "YUGA Bitumen CRM",
    tag: "crm.ppsanatams.online",
    status: "Live",
    accent: "cyan",
    oneLiner: "WhatsApp-integrated CRM purpose-built for bitumen sales teams.",
    what:
      "Two-way WhatsApp chat, AI lead scoring and a Kanban pipeline designed around how bitumen actually sells — from first enquiry to dispatch — with a live price board and bilingual AI assistant.",
    features: [
      "AI HOT / WARM / COLD lead scoring",
      "6-stage Kanban sales pipeline",
      "Two-way WhatsApp inbox per lead",
      "English / Hindi AI assistant",
      "Live bitumen price board",
    ],
    stats: [
      { value: "4,000+", label: "Contacts tested" },
      { value: "6", label: "Pipeline stages" },
      { value: "2-way", label: "WhatsApp" },
    ],
  },
  {
    slug: "whatsapp-campaign",
    name: "YUGA WhatsApp Campaign & Bot",
    tag: "whatsapp.ppsanatams.cloud",
    status: "Live",
    accent: "amber",
    oneLiner: "Multi-account bulk messaging to thousands of groups with anti-ban protection.",
    what:
      "A web dashboard to manage multiple WhatsApp accounts and send text, images and PDFs to thousands of groups at once — with human-like delays, resume/dedup and AI group categorisation.",
    features: [
      "Multi-account management (phone-pair or QR)",
      "Anti-ban delays + cooldowns",
      "Stop / resume / dedup — no duplicate sends",
      "Group folders + content library",
      "AI group categorisation",
    ],
    stats: [
      { value: "1,000+", label: "Groups tested" },
      { value: "784", label: "Sent in ~80 min" },
      { value: "Multi", label: "Account" },
    ],
  },
  {
    slug: "excel-lead-cleaner",
    name: "YUGA Excel & Lead Cleaner AI",
    tag: "Data Engine",
    status: "Live",
    accent: "cyan",
    oneLiner: "Turn messy Excel/CSV into clean, deduplicated, AI-scored contact lists.",
    what:
      "Upload any spreadsheet, describe what you need in plain English or Hindi, and get a clean, scored, CRM-ready workbook — phone numbers standardised, duplicates merged, every lead ranked 0–100.",
    features: [
      "Auto column detection (Mobile / Ph. / Cell…)",
      "E.164 phone standardisation + city/state fix",
      "3-pass dedup (phone → email → name)",
      "AI lead scoring 0–100 (HOT/WARM/COLD)",
      "11-sheet pro workbook + flat CRM export",
    ],
    stats: [
      { value: "0–100", label: "Lead score" },
      { value: "11", label: "Output sheets" },
      { value: "5,000", label: "Rows / 45 s" },
    ],
  },
  {
    slug: "dialsync",
    name: "YUGA DialSync Call Analytics",
    tag: "Call Analytics",
    status: "Live",
    accent: "amber",
    oneLiner: "Auto-capture every sales call, AI-transcribe it, and coach every agent.",
    what:
      "An Android agent app silently captures call logs and recordings; an n8n + Gemini pipeline transcribes and extracts objections, questions and outcomes; managers see it all live in a web dashboard.",
    features: [
      "Real-time call capture & status classification",
      "Gemini AI transcripts, objections & summaries",
      "Agent health alerts (battery / permission issues)",
      "OTA app updates from the admin panel",
      "FCM keep-alive defeats OEM background killers",
    ],
    stats: [
      { value: "v3.9", label: "In production" },
      { value: "Auto", label: "Capture" },
      { value: "Live", label: "Dashboard" },
    ],
  },
  {
    slug: "market-report",
    name: "YUGA Market Report Automation",
    tag: "Automated Research",
    status: "Live",
    accent: "cyan",
    oneLiner: "Daily Nifty/BankNifty PDF + image reports, auto-delivered to WhatsApp.",
    what:
      "Two professional market reports generated and delivered to WhatsApp groups every trading day — a pre-market briefing at 8:45 AM and a closing summary at 4:00 PM — fully automated and NSE-holiday aware.",
    features: [
      "8:45 AM pre-market + 4:00 PM closing",
      "Global indices, FII/DII flows, key levels",
      "PDF → per-page image conversion for channels",
      "Self-monitoring with WhatsApp failure alerts",
      "NSE-holiday calendar built in",
    ],
    stats: [
      { value: "2×", label: "Reports / day" },
      { value: "24/7", label: "Mumbai VPS" },
      { value: "Auto", label: "Holiday-aware" },
    ],
  },
  {
    slug: "voice-agent",
    name: "YUGA AI Voice Agent",
    tag: "Labs",
    status: "Experimental",
    accent: "amber",
    oneLiner: "Real-time, natural voice conversations with AI — straight in the browser.",
    what:
      "An R&D project: speak into your mic and hear an intelligent spoken reply within seconds, over a live WebRTC stream — Deepgram speech-to-text, GPT-4o reasoning and Deepgram Aura voice. A preview of voice-first support and sales assistants.",
    features: [
      "Zero-latency WebRTC audio in the browser",
      "Deepgram streaming speech-to-text",
      "OpenAI GPT-4o responses",
      "Deepgram Aura natural text-to-speech",
      "Use cases: support bot, sales assistant, help desk",
    ],
    stats: [
      { value: "WebRTC", label: "Live audio" },
      { value: "GPT-4o", label: "Reasoning" },
      { value: "R&D", label: "Preview" },
    ],
  },
];
