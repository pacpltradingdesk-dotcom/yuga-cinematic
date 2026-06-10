/**
 * Sources & Disclosures — every factual claim on the site mapped to its official
 * / authoritative source. This is the transparency layer behind our content: it
 * backs the market, technology, funding, regulatory, carbon and capital figures
 * with government and institutional references, and labels what is indicative.
 *
 * URLs are verified official portals (PPAC, CPCB, CGTMSE, BIS, SEBI, BSE, PIB,
 * IBEF, MoRTH, BEE, etc.). Pure data — the page (src/app/sources) stays
 * layout-only. Edit a source here and it updates everywhere it's surfaced.
 */
import { company } from "@/lib/site";

export interface SourceItem {
  /** The on-site claim this reference backs. */
  readonly claim: string;
  /** Authority / publisher name. */
  readonly source: string;
  /** Official, public URL. */
  readonly href: string;
}

export interface SourceGroup {
  readonly id: string;
  readonly title: string;
  /** Caveat that applies to the whole group (e.g. funding eligibility). */
  readonly note?: string;
  readonly items: readonly SourceItem[];
}

export const SOURCES_INTRO =
  "We back the numbers and claims on this site with official, public sources. Where a figure depends on your project, scheme rules or market conditions, we label it indicative — preliminary planning only, never a guarantee. The references below are grouped by topic; each links to the original authority.";

export const sourceGroups: readonly SourceGroup[] = [
  {
    id: "market",
    title: "Market & industry data",
    note: "Official estimates that move year to year. Bio-replacement percentages differ between CSIR lab trials and current field use, and are shown as indicative ranges.",
    items: [
      {
        claim: "India is the first country to commercially produce bio-bitumen for roads (Jan 2026); technology by CSIR-CRRI & CSIR-IIP.",
        source: "PIB, Government of India",
        href: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2212118",
      },
      {
        claim: "India becomes the first country to commercially produce bio-bitumen.",
        source: "IBEF (India Brand Equity Foundation)",
        href: "https://www.ibef.org/news/india-becomes-first-country-to-commercially-produce-bio-bitumen",
      },
      {
        claim: "Bio-bitumen developed via pyrolysis of agro-waste by CSIR-CRRI & CSIR-IIP.",
        source: "CSIR-CRRI / CSIR-IIP (via Indian Chemical News)",
        href: "https://www.indianchemicalnews.com/rd/csir-crri-and-csir-iip-develops-bio-bitumen-via-pyrolysis-28847",
      },
      {
        claim: "India's annual bitumen consumption ≈ 87 lakh MT (FY2025).",
        source: "PPAC, Ministry of Petroleum & Natural Gas",
        href: "https://ppac.gov.in/archives/reports",
      },
      {
        claim: "≈40% of India's bitumen is imported (≈60% met domestically).",
        source: "Argus Media (industry market news)",
        href: "https://www.argusmedia.com/en/news-and-insights/latest-market-news/2776527-india-s-bitumen-consumption-growth-slows-in-2025",
      },
      {
        claim: "~1,000 km of bio-bitumen pilot roads planned by 2027.",
        source: "PIB, Government of India",
        href: "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2212118",
      },
      {
        claim: "New material/technology approvals for use on National Highways.",
        source: "MoRTH (Ministry of Road Transport & Highways)",
        href: "https://morth.gov.in/circulars-regarding-new-materialtechnology-national-highways",
      },
    ],
  },
  {
    id: "standards",
    title: "Technology & product standards",
    items: [
      {
        claim: "PMB & CRMB produced to IS 15462:2019 (Polymer & Crumb-Rubber Modified Bitumen).",
        source: "Bureau of Indian Standards (BIS)",
        href: "https://www.services.bis.gov.in/",
      },
      {
        claim: "Bitumen Emulsion produced to IS 8887:2018 (Cationic bitumen emulsion).",
        source: "Bureau of Indian Standards (BIS)",
        href: "https://www.services.bis.gov.in/",
      },
      {
        claim: "Road-construction codes and standard practice.",
        source: "Indian Roads Congress (IRC)",
        href: "https://www.irc.nic.in/",
      },
      {
        claim: "Highway material & technology specifications.",
        source: "MoRTH (Ministry of Road Transport & Highways)",
        href: "https://morth.gov.in/",
      },
    ],
  },
  {
    id: "funding",
    title: "Funding & subsidy schemes",
    note: "Eligibility, rates, caps and timelines depend on current scheme rules and lender/government discretion. We assist with preparation only — sanction of any loan, grant or subsidy is never guaranteed. Always verify current terms on the official portal.",
    items: [
      {
        claim: "Collateral-free credit guarantee for MSMEs (up to ₹5 Cr).",
        source: "CGTMSE",
        href: "https://www.cgtmse.in/",
      },
      {
        claim: "MSME term lending & refinance.",
        source: "SIDBI",
        href: "https://www.sidbi.in/",
      },
      {
        claim: "MSME (Udyam) registration.",
        source: "Udyam Registration, Ministry of MSME",
        href: "https://udyamregistration.gov.in/",
      },
      {
        claim: "PMEGP margin-money subsidy.",
        source: "KVIC — PMEGP e-Portal",
        href: "https://www.kviconline.gov.in/pmegpeportal/",
      },
      {
        claim: "Stand-Up India loans for greenfield enterprises.",
        source: "Stand-Up India",
        href: "https://www.standupmitra.in/",
      },
      {
        claim: "MUDRA loans for micro & small units.",
        source: "MUDRA",
        href: "https://www.mudra.org.in/",
      },
      {
        claim: "Startup India Seed Fund Scheme.",
        source: "Startup India (DPIIT)",
        href: "https://seedfund.startupindia.gov.in/",
      },
      {
        claim: "MNRE Waste-to-Energy programme.",
        source: "Ministry of New & Renewable Energy",
        href: "https://mnre.gov.in/en/waste-to-energy/",
      },
      {
        claim: "Agriculture Infrastructure Fund.",
        source: "Dept. of Agriculture & Farmers Welfare",
        href: "https://agriinfra.dac.gov.in/",
      },
      {
        claim: "State industrial incentives (e.g. Haryana, Odisha).",
        source: "Invest Haryana / Invest Odisha",
        href: "https://investharyana.in/",
      },
    ],
  },
  {
    id: "regulatory",
    title: "Regulatory & compliance",
    note: "Statutory clearances rest solely with the authorities. We support the filings as part of PMC; no approval is guaranteed. Tyre and plastic pyrolysis units must comply with the applicable CPCB SOP.",
    items: [
      {
        claim: "Pollution-control consent (CTE/CTO), rules & SOPs.",
        source: "Central Pollution Control Board (CPCB)",
        href: "https://cpcb.nic.in/sop-s-and-guidelines/",
      },
      {
        claim: "Tyre/rubber pyrolysis oil — Standard Operating Procedure.",
        source: "CPCB — SOP for Tyre Pyrolysis Oil",
        href: "https://cpcb.nic.in/uploads/Projects/Waste-Tyre/SOP_TPO_16012024.pdf",
      },
      {
        claim: "Plastic Waste EPR (Extended Producer Responsibility) registration.",
        source: "CPCB — EPR Portal for Plastic Packaging",
        href: "https://eprplastic.cpcb.gov.in/",
      },
      {
        claim: "GST registration & filing.",
        source: "Goods & Services Tax (GST)",
        href: "https://www.gst.gov.in/",
      },
      {
        claim: "Company & director records.",
        source: "Ministry of Corporate Affairs (MCA)",
        href: "https://www.mca.gov.in/",
      },
    ],
  },
  {
    id: "carbon",
    title: "Carbon credits",
    note: "Carbon-credit eligibility, methodology, volume and price are not guaranteed and depend on the registry/scheme. Any carbon figures we show are illustrative, not assured revenue.",
    items: [
      {
        claim: "India's Carbon Credit Trading Scheme (CCTS).",
        source: "Bureau of Energy Efficiency (BEE)",
        href: "https://www.beeindia.gov.in/carbon-market.php",
      },
      {
        claim: "Voluntary carbon-removal registry (MRV pathway).",
        source: "Puro.earth",
        href: "https://puro.earth/",
      },
      {
        claim: "Voluntary carbon standard.",
        source: "Verra (VCS)",
        href: "https://verra.org/",
      },
      {
        claim: "Voluntary carbon standard.",
        source: "Gold Standard",
        href: "https://www.goldstandard.org/",
      },
      {
        claim: "UN climate framework.",
        source: "UNFCCC",
        href: "https://unfccc.int/",
      },
    ],
  },
  {
    id: "capital",
    title: "Capital markets",
    note: "Capital-markets content on this site is general information only — not investment advice or a securities solicitation. Paid investment advice in India requires SEBI registration.",
    items: [
      {
        claim: "Securities-market regulation.",
        source: "SEBI (Securities & Exchange Board of India)",
        href: "https://www.sebi.gov.in/",
      },
      {
        claim: "Stock exchange (Main Board & SME).",
        source: "BSE",
        href: "https://www.bseindia.com/",
      },
      {
        claim: "Stock exchange (Main Board & SME).",
        source: "NSE",
        href: "https://www.nseindia.com/",
      },
      {
        claim: "Founder's prior BSE SME listing — Omnipotent Industries (Nov 2021). Search the exchange for symbol OMNIPOTENT.",
        source: "BSE / NSE listing records",
        href: "https://www.bseindia.com/",
      },
    ],
  },
  {
    id: "company",
    title: "Company registrations",
    items: [
      {
        claim: `CIN ${company.cin} — company status & filings.`,
        source: "Ministry of Corporate Affairs (MCA)",
        href: "https://www.mca.gov.in/",
      },
      {
        claim: `GSTIN ${company.gst}.`,
        source: "GST Portal",
        href: "https://www.gst.gov.in/",
      },
    ],
  },
];
