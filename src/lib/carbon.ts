/**
 * Carbon-credit content (client note: add carbon-credit info to hero + per-product,
 * and a carbon-credit claim process). Indicative figures drawn from the bio-bitumen
 * impact model — client to confirm exact MRV pathway and rates before publishing.
 * Layout-only components read this; edit facts here.
 */

export interface CarbonStat {
  readonly value: string;
  readonly label: string;
}

export interface CarbonStep {
  readonly n: string;
  readonly t: string;
  readonly d: string;
}

export const carbonIntro =
  "Bio-modified bitumen and pyrolysis plants don't just save on imports — they generate verifiable carbon credits. Diverting agro-waste from open burning and displacing fossil bitumen both cut CO₂, which can be measured, certified and sold as an extra revenue stream.";

/** Headline carbon economics (indicative — verify with an MRV partner). */
export const carbonStats: readonly CarbonStat[] = [
  { value: "~0.35 t", label: "CO₂ saved per MT of bio-bitumen" },
  { value: "₹2,500+", label: "Indicative credit value / MT" },
  { value: "~2.5 MT", label: "Crop residue diverted / MT output" },
  { value: "MRV", label: "Puro.earth-style verified pathway" },
] as const;

/** The carbon-credit claim journey, end to end. */
export const carbonClaimSteps: readonly CarbonStep[] = [
  { n: "01", t: "Baseline & eligibility", d: "Establish the project baseline (feedstock, displaced fossil binder) and pick a methodology — Puro.earth, Verra or Gold Standard — that fits the plant." },
  { n: "02", t: "MRV setup", d: "Instrument the plant for Monitoring, Reporting & Verification: feedstock logs, mass-balance, output certificates and emission factors." },
  { n: "03", t: "Project registration", d: "Register the project with the chosen registry and submit the project design document (PDD) for listing." },
  { n: "04", t: "Independent validation", d: "A third-party validator audits the methodology and baseline assumptions before issuance." },
  { n: "05", t: "Monitoring period", d: "Run the plant and record verified production data over the crediting period." },
  { n: "06", t: "Verification & issuance", d: "The verifier confirms tonnes of CO₂ removed/avoided; the registry issues tradable carbon credits." },
  { n: "07", t: "Sale & revenue", d: "Sell credits on a marketplace or to a corporate buyer — recurring revenue on top of binder sales." },
] as const;

export const carbonNote =
  "Indicative — actual eligibility, methodology, credit volume and price depend on the registry, feedstock and verification. We structure the MRV pathway as part of PMC; contact us for a project-specific assessment.";
