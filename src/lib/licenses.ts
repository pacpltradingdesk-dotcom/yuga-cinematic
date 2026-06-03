/**
 * Licences & permissions (client note: "As per product & state → applicable
 * licence & permission, all"). Core licences apply to every plant; product-
 * specific ones add on top; state authorities vary by location.
 *
 * Indicative regulatory map — exact requirements depend on capacity, category
 * and current state policy. Verify with the relevant authority / our PMC team.
 */

export interface Licence {
  readonly name: string;
  readonly authority: string;
  /** When in the project lifecycle it is obtained. */
  readonly stage: string;
}

/** Licences common to all bitumen / bio-bitumen / pyrolysis plants. */
export const coreLicences: readonly Licence[] = [
  { name: "Udyam (MSME) registration", authority: "Ministry of MSME", stage: "Setup" },
  { name: "GST registration", authority: "GST Department", stage: "Setup" },
  { name: "Company / firm incorporation", authority: "MCA / Registrar", stage: "Setup" },
  { name: "Factory licence", authority: "State Factories & Boilers Dept", stage: "Pre-build" },
  { name: "Fire NOC", authority: "State Fire Services", stage: "Pre-build" },
  { name: "Consent to Establish (CTE)", authority: "State Pollution Control Board", stage: "Pre-build" },
  { name: "Consent to Operate (CTO)", authority: "State Pollution Control Board", stage: "Pre-commissioning" },
  { name: "PESO licence (storage of petroleum/flammables)", authority: "PESO (Petroleum & Explosives Safety Org)", stage: "Pre-commissioning" },
  { name: "Trade / municipal licence", authority: "Local municipal body", stage: "Setup" },
  { name: "Electricity & power connection", authority: "State DISCOM", stage: "Pre-build" },
] as const;

/** Extra licences/clearances per product (in addition to the core set). */
export const productLicences: Readonly<Record<string, readonly Licence[]>> = {
  "bio-bitumen": [
    { name: "NHAI / MoRTH product empanelment", authority: "NHAI / MoRTH", stage: "Market" },
    { name: "Biomass / agro-residue sourcing compliance", authority: "State Agriculture Dept", stage: "Setup" },
  ],
  "plastic-to-fuel": [
    { name: "EPR registration (plastic waste)", authority: "CPCB", stage: "Setup" },
    { name: "Plastic-waste processor authorisation", authority: "State PCB", stage: "Pre-build" },
    { name: "Hazardous-waste authorisation (if applicable)", authority: "State PCB", stage: "Pre-build" },
  ],
  "rubber-to-fuel": [
    { name: "End-of-life tyre / EPR authorisation", authority: "CPCB", stage: "Setup" },
    { name: "Hazardous-waste authorisation", authority: "State PCB", stage: "Pre-build" },
  ],
  "pmb-polymer-modified-bitumen": [{ name: "BIS / IS 15462 product certification", authority: "BIS", stage: "Market" }],
  "crmb-crumb-rubber-modified-bitumen": [{ name: "NHAI / MoRTH product empanelment", authority: "NHAI / MoRTH", stage: "Market" }],
  "bitumen-emulsion": [{ name: "BIS / IS 8887 product certification", authority: "BIS", stage: "Market" }],
  "micro-surfacing-emulsion": [{ name: "IRC / MoRTH specification compliance", authority: "IRC / MoRTH", stage: "Market" }],
  "blown-oxidised-bitumen": [{ name: "BIS / IS 702 product certification", authority: "BIS", stage: "Market" }],
  "bitumen-decanter": [],
};

/** Short note on the single-window / nodal authority per state (indicative). */
export const stateAuthorityNote: Readonly<Record<string, string>> = {
  Gujarat: "Gujarat PCB + Investor Facilitation Portal (single-window) under the Gujarat Industrial Policy.",
  Maharashtra: "MPCB + MAITRI single-window; incentives under the Maharashtra Industrial Policy.",
  "Uttar Pradesh": "UPPCB + Nivesh Mitra single-window under the UP Industrial Investment Policy.",
  "Madhya Pradesh": "MPPCB + MP single-window; incentives under the MP MSME Policy.",
  Odisha: "OSPCB + GO-SWIFT single-window under Odisha IPR 2022.",
  Haryana: "HSPCB + Haryana single-window (HEPC) under the Haryana Enterprises Policy.",
  Rajasthan: "RSPCB + Raj-Nivesh single-window under RIPS.",
  Karnataka: "KSPCB + Karnataka single-window under the state Industrial Policy.",
  "Tamil Nadu": "TNPCB + TN single-window (Guidance) under the TN Industrial Policy.",
  Punjab: "PPCB + Invest Punjab single-window.",
  Bihar: "BSPCB + Bihar single-window under the Bihar Industrial Investment Promotion Policy.",
  "West Bengal": "WBPCB + Silpa Sathi single-window.",
};

export const licenceNote =
  "Indicative — the exact licence set depends on product, capacity, category (red/orange) and the latest state norms. We handle the full filing as part of PMC. Verify on application.";
