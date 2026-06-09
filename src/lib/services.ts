/**
 * Engagement models (client note: "Joint venture — domestic & international,
 * collaborations, job work" + "PMC → research & feasibility report of any product
 * in PAN India, ₹5 lakh onwards, part of PMC"). How clients can work with YUGA.
 */

export interface EngagementModel {
  readonly key: string;
  readonly title: string;
  readonly summary: string;
  readonly points: readonly string[];
  readonly accent: "amber" | "cyan";
  /** Optional headline price tag. */
  readonly price?: string;
}

export const engagementModels: readonly EngagementModel[] = [
  {
    key: "jv",
    title: "Joint Venture — Domestic & International",
    summary: "Co-invest and operate together. We bring the technology, network and execution; you bring capital, land or market access.",
    points: [
      "Domestic JV with investors, land-owners or existing plants",
      "International JV for technology transfer & supply",
      "Equity / profit-share structures with clear governance",
      "Joint ventures structured under the founder's BSE-listed venture",
    ],
    accent: "amber",
  },
  {
    key: "collab",
    title: "Collaborations & Partnerships",
    summary: "Strategic tie-ups across the value chain — feedstock, machinery, off-take and distribution.",
    points: [
      "Biomass / feedstock supply partnerships",
      "OEM & machinery vendor collaborations",
      "Off-take & buyer-network agreements (NHAI / PWD / contractors)",
      "Research tie-ups (CSIR-CRRI aligned bio-bitumen)",
    ],
    accent: "cyan",
  },
  {
    key: "jobwork",
    title: "Job Work & Contract Manufacturing",
    summary: "Don't want to build yet? Use our network for contract production and processing on a job-work basis.",
    points: [
      "Contract blending / processing",
      "Toll manufacturing arrangements",
      "Capacity sharing during ramp-up",
      "Quality-controlled, tender-ready output",
    ],
    accent: "amber",
  },
  {
    key: "research",
    title: "Research & Feasibility Report",
    summary: "A bankable research & feasibility report for any product, anywhere in India — the starting point of every PMC engagement.",
    points: [
      "Any product · PAN-India location analysis",
      "Techno-economic feasibility + financial model",
      "Biomass / feedstock & market deep-dive",
      "Part of full PMC engagement",
    ],
    accent: "cyan",
    price: "₹5 Lakh onwards",
  },
] as const;
