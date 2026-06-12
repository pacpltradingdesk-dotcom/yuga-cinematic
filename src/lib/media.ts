/**
 * Image map - ONE unique image per slot across the whole site.
 *
 * Files live in /public/assets/img (real topic-related stock as base).
 * To swap any slot for your own plant photo or an AI render, drop the
 * file at the same path and keep the filename - nothing else changes.
 * See /public/assets/AI-PROMPTS.md for per-slot render prompts.
 */
export const img = {
  // Home
  homeHero: { src: "/assets/img/home-hero.jpg", alt: "YUGA 60 TPD bitumen & pyrolysis plant - wide view with dispatch bay and road tanker" },
  vPmc: { src: "/assets/img/v-pmc.jpg", alt: "Oil & bitumen processing facility" },
  vSoft: { src: "/assets/img/v-soft.jpg", alt: "Server infrastructure powering AI software" },
  vCap: { src: "/assets/img/v-cap.jpg", alt: "Stock exchange and capital markets" },
  pEng: { src: "/assets/img/p-eng.jpg", alt: "Insulated process pipework and racks inside a YUGA plant" },
  pIntel: { src: "/assets/img/p-intel.jpg", alt: "AI technology and data intelligence" },
  pCap: { src: "/assets/img/p-cap.jpg", alt: "Trading screens and market data" },
  pImpact: { src: "/assets/img/p-impact.jpg", alt: "Solar energy and sustainable infrastructure" },

  // Bio-Bitumen
  bioHero: { src: "/assets/img/bio-hero.jpg", alt: "Baled agricultural straw - bio-bitumen feedstock" },
  bio0: { src: "/assets/img/bio-0.jpg", alt: "Petroleum and bitumen product plant" },
  bio1: { src: "/assets/img/bio-1.jpg", alt: "Farm fields supplying agro-waste biomass" },
  bio2: { src: "/assets/img/bio-2.jpg", alt: "Plastic-to-fuel pyrolysis plant — waste plastic converted to oil, gas and char" },
  bio3: { src: "/assets/img/bio-3.jpg", alt: "End-of-life tyres for rubber-to-oil pyrolysis" },

  // Industrial Consulting
  indHero: { src: "/assets/img/ind-hero.jpg", alt: "Bitumen plant interior and machinery" },
  prod0: { src: "/assets/img/prod-0.jpg", alt: "Asphalt surfacing - emulsion application" },
  prod1: { src: "/assets/img/prod-1.jpg", alt: "Highway built with polymer modified bitumen" },
  prod2: { src: "/assets/img/prod-2.jpg", alt: "Road pavement - crumb rubber modified bitumen" },
  prod3: { src: "/assets/img/prod-3.jpg", alt: "Bitumen drums - blown / oxidised grades" },
  prod4: { src: "/assets/img/prod-4.jpg", alt: "Process piping and decanter systems" },

  // Other page heroes
  softHero: { src: "/assets/img/soft-hero.jpg", alt: "Data centre - AI software platform" },
  capHero: { src: "/assets/img/cap-hero.jpg", alt: "Financial markets and fundraising" },
  aboutHero: { src: "/assets/img/about-hero.jpg", alt: "Plant inauguration ceremony - ribbon cutting with marigold garlands" },
  miHero: { src: "/assets/img/mi-hero.jpg", alt: "Market economy and analytics" },
  contactHero: { src: "/assets/img/contact-hero.jpg", alt: "Port and logistics - bitumen import" },

  // Case Studies
  csHero: { src: "/assets/img/cs-hero.jpg", alt: "Engineer overlooking a commissioned YUGA plant at golden hour" },
  cs0: { src: "/assets/img/cs-0.jpg", alt: "Industrial plant - Bahadurgarh PMB project" },
  cs1: { src: "/assets/img/cs-1.jpg", alt: "Agriculture region - Malkangiri Odisha project" },
  cs2: { src: "/assets/img/cs-2.jpg", alt: "Recycling plant - plastic-to-fuel project" },
  cs3: { src: "/assets/img/cs-3.jpg", alt: "Forest / green - carbon-credit structuring" },

  // Software cards — one unique image per product (dark, on-theme)
  swData: { src: "/assets/img/sw-data.jpg", alt: "Dark analytics dashboard - data cleaning & lead scoring" },
  swWhatsapp: { src: "/assets/img/sw-whatsapp.jpg", alt: "WA Automation dashboard - WhatsApp bulk-messaging tool" },
  appCrm: { src: "/assets/img/app-crm.jpg", alt: "PPS CRM login - bitumen sales intelligence dashboard" },
  swCall: { src: "/assets/img/sw-call.jpg", alt: "Call-centre agent wearing a headset on a call - call capture & analytics" },
  swVoice: { src: "/assets/img/sw-voice.jpg", alt: "Person on a live phone call - AI voice agent" },

  // Founder portrait slot (no file yet → graceful gradient fallback)
  founder: { src: "/assets/img/founder.jpg", alt: "Prince Pratap Shah - Founder & Key Person" },
} as const;

export type ImgKey = keyof typeof img;

/**
 * Product slug → image slot. Reuses the existing topic-related stock so each
 * of the 9 catalog products gets a fitting visual (swap the underlying file in
 * /public/assets/img to upgrade any of them — see lib/media notes above).
 */
/**
 * Software product slug → image slot. Reuses the existing tech/infra stock so
 * each of the 7 software products gets a fitting visual (client note: "Software
 * — all images"). Swap the underlying file in /public/assets/img to upgrade.
 */
export const softwareImg: Record<string, ImgKey> = {
  "ai-sales-dashboard": "pIntel",
  "bitumen-crm": "appCrm",
  "whatsapp-campaign": "swWhatsapp",
  "excel-lead-cleaner": "swData",
  "dialsync": "swCall",
  "market-report": "pCap",
  "voice-agent": "swVoice",
};

export const productImg: Record<string, ImgKey> = {
  "bio-bitumen": "bio1",
  "plastic-to-fuel": "bio2",
  "rubber-to-fuel": "bio3",
  "pmb-polymer-modified-bitumen": "prod1",
  "crmb-crumb-rubber-modified-bitumen": "prod2",
  "bitumen-decanter": "prod4",
  "bitumen-emulsion": "prod0",
  "micro-surfacing-emulsion": "bio0",
  "blown-oxidised-bitumen": "prod3",
  // Roofing/oxidised-bitumen theme — reuses the blown-grade drum image (closest fit; no roofing photo yet).
  "asphalt-shingle": "prod3",
};
