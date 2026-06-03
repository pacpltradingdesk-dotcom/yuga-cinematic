/**
 * Land / footprint requirement per product, derived from the existing calc
 * tiers' `area` (client note: "Land requirement, product × capacity").
 *
 * No new numbers are invented here — this is a thin read-layer over the calc
 * data already in catalog.json, so a single edit there stays the source of
 * truth. Components consume `getLandRequirement()` and stay layout-only.
 */
import { getCalc } from "@/lib/catalog";

export interface LandTier {
  /** Capacity label, e.g. "10 TPD". */
  readonly cap: string;
  /** Indicative plot footprint, e.g. "1.5–3 acres". */
  readonly area: string;
}

/** Capacity → indicative land footprint for a product (empty if no calc data). */
export function getLandRequirement(slug: string): readonly LandTier[] {
  const calc = getCalc(slug);
  if (!calc) return [];
  return calc.tiers.map((t) => ({ cap: t.cap, area: t.area }));
}

export const landNote =
  "Indicative footprint per capacity tier. Actual plot size depends on layout, " +
  "feedstock storage, effluent/ZLD provisions, future expansion and statutory " +
  "setbacks — finalised in the feasibility / DPR stage.";
