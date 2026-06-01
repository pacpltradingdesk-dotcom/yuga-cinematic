/**
 * Product catalog — typed wrapper over src/data/catalog.json (ported from the
 * YUGA_Website_Package `web_content/products.json`, the single source of truth
 * for the 9 products, calculators, subsidy, finance and add-on data).
 *
 * Phase-1 shapes are typed precisely. Keys consumed in later phases
 * (software, funding, market, io, verticalQA, fundraising) are typed as
 * `unknown` for now and narrowed when those features are built — never `any`.
 */
import catalogJson from "@/data/catalog.json";

/* ---------- shared primitives ---------- */
/** [min, max] inclusive range used across calc/finance/add-on figures. */
export type Range = readonly [number, number];

export interface LabelValue {
  readonly label: string;
  readonly value: string;
}

export interface QA {
  readonly q: string;
  readonly a: string;
}

/* ---------- products[] ---------- */
export interface Plant {
  readonly details: readonly LabelValue[];
  readonly machinery: readonly string[];
}

export interface Financials {
  readonly note: string;
  readonly rows: readonly LabelValue[];
}

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly intro: readonly string[];
  readonly benefits: readonly string[];
  readonly applications: readonly string[];
  readonly specs: readonly LabelValue[];
  readonly plant: Plant;
  readonly financials: Financials;
  readonly qa: readonly QA[];
}

/* ---------- calc[slug] (Cost-ROI / Investment Explorer) ---------- */
export interface CalcTier {
  readonly cap: string;
  readonly invest: Range;
  /** null for non-production units (e.g. decanter is a handling/packaging system). */
  readonly output: Range | null;
  readonly outUnit: string;
  readonly revenue: Range | null;
  readonly profit: Range | null;
  readonly area: string;
  readonly payback: string;
}

export interface CalcEntry {
  readonly title: string;
  readonly unit: string;
  readonly utility: string;
  readonly tiers: readonly CalcTier[];
}

/* ---------- subsidy ---------- */
export interface CentralSubsidy {
  readonly scheme: string;
  readonly benefit: string;
  readonly cap: string;
}

export interface StateBenefit {
  readonly name: string;
  readonly benefit: string;
  readonly cap: string;
}

export interface StateSubsidy {
  readonly summary: string;
  readonly benefits: readonly StateBenefit[];
}

export interface Subsidy {
  readonly central: readonly CentralSubsidy[];
  readonly states: Readonly<Record<string, StateSubsidy>>;
}

/* ---------- feasibility / finance / add-ons / trust ---------- */
export interface Feasibility {
  readonly product: string;
  readonly slug: string;
  readonly states: string;
  readonly why: string;
}

export interface Finance {
  readonly termLoanPct: number;
  readonly promoterPct: number;
  readonly interestPct: number;
  readonly tenureYears: number;
  readonly notes: readonly string[];
}

export interface Addon {
  readonly name: string;
  readonly cost: Range;
  readonly effect: string;
}

export interface TrustBlock {
  readonly title: string;
  readonly points: readonly string[];
}

/* ---------- io (raw material → output) + standards (per product) ---------- */
export type IoRow = readonly [string, string];

export interface IoEntry {
  readonly basis: string;
  readonly input: readonly IoRow[];
  readonly output: readonly IoRow[];
}

export interface Standards {
  readonly is: string;
  readonly astm: string;
  readonly msds: string;
}

/* ---------- vertical Q&A / funding / market / software tiers ---------- */
export interface VerticalQAEntry {
  readonly title: string;
  readonly qa: readonly QA[];
}

export interface FundingInstrument {
  readonly key: string;
  readonly name: string;
  readonly forWhat: string;
  readonly promoter: string;
  readonly funder: string;
  readonly funderShare: string;
  readonly basis: string;
  readonly tenure: string;
  readonly note: string;
}

export interface Funding {
  readonly intro: string;
  readonly instruments: readonly FundingInstrument[];
}

export interface MarketNational {
  readonly demand: string;
  readonly production: string;
  readonly importGap: string;
  readonly drivers: string;
  readonly src: string;
}

export interface MarketData {
  readonly national: MarketNational;
  readonly note: string;
}

export interface SoftwareTier {
  readonly key: string;
  readonly name: string;
  readonly for: string;
}

export interface SoftwareMeta {
  readonly intro: string;
  readonly billing: readonly string[];
  readonly tierKeys: readonly SoftwareTier[];
}

export interface Fundraising {
  readonly pipeline: readonly string[];
}

/* ---------- full catalog shape ---------- */
export interface Catalog {
  readonly products: readonly Product[];
  readonly calc: Readonly<Record<string, CalcEntry>>;
  readonly subsidy: Subsidy;
  readonly feasibility: readonly Feasibility[];
  readonly stateProducts: Readonly<Record<string, readonly string[]>>;
  readonly trust: Readonly<Record<string, TrustBlock>>;
  readonly addons: readonly Addon[];
  readonly finance: Finance;
  readonly standards: Readonly<Record<string, Standards>>;
  readonly io: Readonly<Record<string, IoEntry>>;
  readonly funding: Funding;
  readonly market: MarketData;
  readonly software: SoftwareMeta;
  readonly verticalQA: Readonly<Record<string, VerticalQAEntry>>;
  readonly fundraising: Fundraising;
  /** Social links — mostly placeholder URLs in source; not surfaced yet. */
  readonly social: unknown;
}

export const catalog = catalogJson as unknown as Catalog;

/* ---------- accessors ---------- */
export const products: readonly Product[] = catalog.products;

/** Map of slug → product for O(1) detail-page lookup. */
const productBySlug: ReadonlyMap<string, Product> = new Map(
  products.map((p) => [p.slug, p]),
);

export function getProduct(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function getCalc(slug: string): CalcEntry | undefined {
  return catalog.calc[slug];
}

export function getFeasibility(slug: string): Feasibility | undefined {
  return catalog.feasibility.find((f) => f.slug === slug);
}

export function getIo(slug: string): IoEntry | undefined {
  return catalog.io[slug];
}

export function getStandards(slug: string): Standards | undefined {
  return catalog.standards[slug];
}

/** All product slugs — drives `generateStaticParams` for /products/[slug]. */
export const productSlugs: readonly string[] = products.map((p) => p.slug);

export const { finance, addons } = catalog;
export const subsidy: Subsidy = catalog.subsidy;
export const funding: Funding = catalog.funding;
export const market: MarketData = catalog.market;
export const softwareMeta: SoftwareMeta = catalog.software;
export const fundraising: Fundraising = catalog.fundraising;
export const trust: Readonly<Record<string, TrustBlock>> = catalog.trust;

export function getVerticalQA(key: string): VerticalQAEntry | undefined {
  return catalog.verticalQA[key];
}
