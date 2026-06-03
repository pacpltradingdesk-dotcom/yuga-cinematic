/**
 * Approx number of plants running (client note: "Approx number of plants running,
 * as per product, state-wise, all"). INDICATIVE market-structure estimates for
 * context — not an exact registry. Client to replace with verified counts.
 */

export interface ProductPlantCount {
  readonly slug: string;
  readonly product: string;
  /** Approx operational units in India (indicative). */
  readonly running: number;
  /** Indicative 5–7 yr requirement (where known). */
  readonly potential?: number;
  readonly topStates: string;
}

export const productPlantCounts: readonly ProductPlantCount[] = [
  { slug: "bio-bitumen", product: "Bio-Bitumen", running: 6, potential: 200, topStates: "Punjab · Haryana · UP · MP · Odisha" },
  { slug: "plastic-to-fuel", product: "Plastic-to-Fuel", running: 120, topStates: "Maharashtra · Gujarat · TN · UP" },
  { slug: "rubber-to-fuel", product: "Tyre / Rubber-to-Oil (RPO)", running: 90, topStates: "Gujarat · Rajasthan · MP · TN" },
  { slug: "pmb-polymer-modified-bitumen", product: "PMB", running: 140, topStates: "Maharashtra · Gujarat · UP · Karnataka" },
  { slug: "crmb-crumb-rubber-modified-bitumen", product: "CRMB", running: 70, topStates: "Maharashtra · Rajasthan · TN" },
  { slug: "bitumen-emulsion", product: "Bitumen Emulsion", running: 220, topStates: "Across all 18 active states" },
  { slug: "micro-surfacing-emulsion", product: "Micro-Surfacing Emulsion", running: 60, topStates: "Maharashtra · Karnataka · Gujarat" },
  { slug: "blown-oxidised-bitumen", product: "Blown / Oxidised", running: 45, topStates: "Gujarat · Maharashtra · WB" },
  { slug: "bitumen-decanter", product: "Decanter Systems", running: 35, topStates: "Gujarat · Maharashtra" },
];

/** Approx YUGA-network plants commissioned / live, state-wise (indicative). */
export const networkByState: readonly { readonly state: string; readonly count: number }[] = [
  { state: "Gujarat", count: 3 },
  { state: "Maharashtra", count: 2 },
  { state: "Haryana", count: 1 },
  { state: "Odisha", count: 2 },
  { state: "Karnataka", count: 1 },
  { state: "Uttar Pradesh", count: 1 },
];

export const plantsNote =
  "Indicative market-structure estimates for context only — not an official registry. Figures to be verified before publishing; contact us for a state- and product-specific assessment.";
