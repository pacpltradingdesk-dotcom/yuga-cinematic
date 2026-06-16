/**
 * Primary navigation — grouped by the three business verticals + company, so the
 * brand's mental model (Plants · Software · Capital) is visible in the menu and a
 * visitor always knows "what's where". Pure data; the Navbar stays layout-only.
 *
 * Every group is a dropdown whose FIRST item is the section's overview page, so
 * the group is both a label and a real destination. All hrefs resolve to a live
 * page or an on-page anchor (anchors have `scroll-mt-28` on their target section).
 */
export interface NavLink {
  readonly label: string;
  readonly href: string;
  /** One-line description shown under the link in the mega-menu. */
  readonly desc: string;
}

export interface NavGroup {
  readonly label: string;
  /** One-line summary of the whole group, shown at the top of the dropdown. */
  readonly blurb: string;
  readonly items: readonly NavLink[];
}

export const navGroups: readonly NavGroup[] = [
  {
    label: "Plants",
    blurb: "Set up & run a pyrolysis plant — plastic/tyre-to-oil & bio-bitumen, DPR to production.",
    items: [
      { label: "All Products", href: "/products", desc: "All nine plants we build" },
      { label: "Pyrolysis Plants", href: "/bio-bitumen", desc: "Plastic/tyre-to-oil & bio-bitumen — the pyrolysis vertical" },
      { label: "Industrial Consulting", href: "/industrial-consulting", desc: "The 7-phase PMC process" },
    ],
  },
  {
    label: "Software",
    blurb: "AI tools that run a bitumen business — now offered to clients.",
    items: [
      { label: "Software overview", href: "/it-software", desc: "The in-house AI stack" },
      { label: "The 7 products", href: "/it-software#suite", desc: "Dashboard, CRM, automation…" },
      { label: "Pricing & tiers", href: "/it-software#pricing", desc: "Four subscription tiers" },
    ],
  },
  {
    label: "Capital",
    blurb: "Fund the project — loan, subsidy, equity, all the way to IPO.",
    items: [
      { label: "Capital Markets", href: "/capital-market", desc: "Seed to IPO advisory" },
      { label: "Bank loans & subsidy", href: "/capital-market#loans", desc: "CGTMSE, MSME, schemes" },
      { label: "Funding routes", href: "/capital-market#routes", desc: "IPO vs VC vs bank debt" },
      { label: "Valuation & DPR", href: "/capital-market#valuation", desc: "Investor / bank-ready docs" },
    ],
  },
  {
    label: "Company",
    blurb: "Who we are, and the proof on the ground.",
    items: [
      { label: "Explore the site", href: "/explore", desc: "A map of everything, by goal" },
      { label: "About", href: "/about", desc: "Founder & 25-year track record" },
      { label: "Case Studies", href: "/case-studies", desc: "Live projects & report library" },
      { label: "Market & Research", href: "/market-intelligence", desc: "Market data & ₹5L research report" },
      { label: "Glossary", href: "/glossary", desc: "Bitumen & finance terms, explained" },
      { label: "Contact", href: "/contact", desc: "Talk to the team" },
    ],
  },
];

/** Flat list of every primary destination — used by the footer & elsewhere. */
export const navFlat: readonly NavLink[] = navGroups.flatMap((g) => g.items);
