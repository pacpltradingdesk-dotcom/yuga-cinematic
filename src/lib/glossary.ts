/**
 * Plain-language glossary for the jargon a first-time investor meets on the site
 * (bitumen, plant and finance terms). Pure data — the `<Term>` tooltip and the
 * /glossary page read it. Add/expand definitions here; never in a component.
 */
export interface GlossaryTerm {
  /** kebab-case id — used as the tooltip key and the /glossary#anchor. */
  readonly id: string;
  /** Display term, e.g. "DPR". */
  readonly term: string;
  /** Expanded form, e.g. "Detailed Project Report". */
  readonly full?: string;
  readonly def: string;
}

export const glossary: readonly GlossaryTerm[] = [
  { id: "dpr", term: "DPR", full: "Detailed Project Report", def: "The master document for a plant — market, technical design, costing and 5-year financials — in the format banks and investors accept." },
  { id: "cma", term: "CMA", full: "Credit Monitoring Arrangement", def: "The standardised financial-data format Indian banks require to appraise a loan; we prepare it alongside the DPR." },
  { id: "vg-30", term: "VG-30", full: "Viscosity Grade 30", def: "The most common road-grade bitumen in India (IS 73), used on most highways. Bio-bitumen blends bio-oil into a VG-30 base." },
  { id: "pmb", term: "PMB", full: "Polymer Modified Bitumen", def: "Bitumen blended with polymers (IS 15462) for roads that resist rutting in heat and cracking in cold — used on highways and airports." },
  { id: "crmb", term: "CRMB", full: "Crumb Rubber Modified Bitumen", def: "Bitumen modified with crumb rubber from waste tyres — durable, cost-effective surfacing favoured by NHAI." },
  { id: "bio-bitumen", term: "Bio-bitumen", def: "Road bitumen where part of conventional VG-30 is replaced with agro-waste bio-oil — ~15% in current field use, up to ~20–30% in CSIR lab trials — to the CSIR-CRRI 'KrishiBind' spec." },
  { id: "pyrolysis", term: "Pyrolysis", def: "Heating a material (biomass, plastic or tyres) to 450–550°C without oxygen so it breaks down into oil, gas and char instead of burning." },
  { id: "rpo", term: "RPO", full: "Recovered Pyrolysis Oil", def: "The oil recovered from tyre/rubber pyrolysis, alongside carbon black and steel — a circular-economy output." },
  { id: "emulsion", term: "Bitumen emulsion", def: "Bitumen dispersed in water so it can be used cold (no site heating) — for tack coats, cold-mix and surface dressing." },
  { id: "blown", term: "Blown / oxidised bitumen", def: "Air-blown, hardened bitumen for non-road uses — roofing, waterproofing, pipe coating and industrial products." },
  { id: "tpd", term: "TPD", full: "Tonnes Per Day", def: "A plant's daily output capacity. A 5 TPD plant makes about 1,250–1,500 tonnes a year." },
  { id: "cte-cto", term: "CTE / CTO", full: "Consent to Establish / Operate", def: "Pollution Control Board clearances — CTE before building, CTO before running. Mandatory for any plant." },
  { id: "peso", term: "PESO", full: "Petroleum & Explosives Safety Organisation", def: "The authority that licenses storage/handling of petroleum products and pressure vessels at a plant." },
  { id: "nhai-morth", term: "NHAI / MoRTH", def: "India's national highway authority and the Ministry of Road Transport & Highways — they set road-material specs and approve suppliers." },
  { id: "cgtmse", term: "CGTMSE", def: "A government scheme giving collateral-free MSME loans up to ₹5 crore — a common way to fund a first plant." },
  { id: "epr", term: "EPR", full: "Extended Producer Responsibility", def: "India's rule making producers responsible for their plastic waste — the policy push behind plastic-to-fuel plants." },
  { id: "sez-eou", term: "SEZ / EOU", full: "Special Economic Zone / Export-Oriented Unit", def: "Statuses for export-focused units with duty/tax benefits — relevant to export plants like the KASEZ roofing project." },
  { id: "mrv", term: "MRV", full: "Monitoring, Reporting & Verification", def: "The audited pathway that turns a plant's CO₂ savings into certified, sellable carbon credits." },
  { id: "dscr", term: "DSCR", full: "Debt Service Coverage Ratio", def: "How comfortably a project's cash flow covers its loan repayments; banks want this above ~1.2." },
  { id: "irr", term: "IRR", full: "Internal Rate of Return", def: "The annualised return a project earns on the money invested — a headline number investors and lenders check." },
  { id: "cod", term: "COD", full: "Commercial Operation Date", def: "The day a plant starts commercial production; our hand-holding support runs ~12 months post-COD." },
];

const byId: ReadonlyMap<string, GlossaryTerm> = new Map(glossary.map((t) => [t.id, t]));

export function getTerm(id: string): GlossaryTerm | undefined {
  return byId.get(id);
}
