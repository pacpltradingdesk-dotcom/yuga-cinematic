/**
 * Documents & deliverables YUGA provides (client note: "What docs we provide —
 * list, drawing, list of working, all info"). Grouped by category so product
 * pages and the consulting page can render the full deliverable set.
 */

export interface DeliverableGroup {
  readonly title: string;
  readonly icon: "file" | "drawing" | "workflow" | "shield";
  readonly items: readonly string[];
}

export const deliverableGroups: readonly DeliverableGroup[] = [
  {
    title: "Reports & financials",
    icon: "file",
    items: [
      "Detailed Project Report (DPR)",
      "Bank DPR + CMA data (bank format)",
      "5-year financial model — P&L, balance sheet, cash flow",
      "ROI / IRR / break-even & sensitivity analysis",
      "Feasibility & techno-economic report",
      "Subsidy & loan eligibility memo",
    ],
  },
  {
    title: "Drawings & engineering",
    icon: "drawing",
    items: [
      "Plant layout & general-arrangement drawings",
      "Process flow diagram (PFD) & P&ID",
      "Civil & foundation drawings",
      "Electrical & utility layout",
      "Equipment & machinery specification sheets",
      "Site plan & location scoring",
    ],
  },
  {
    title: "Working & process docs",
    icon: "workflow",
    items: [
      "Standard Operating Procedures (SOPs)",
      "Production & blending process manual",
      "Quality-control test protocols (penetration, softening, ductility)",
      "Raw-material & input–output (mass balance) sheets",
      "Operator training & safety manual",
      "Vendor / OEM list with negotiated pricing",
    ],
  },
  {
    title: "Compliance & market",
    icon: "shield",
    items: [
      "Licence & permission checklist (product + state)",
      "Standards pack — IS / ASTM / MSDS",
      "Tender & empanelment documentation (NHAI / PWD)",
      "Buyer network & sales-support pack",
      "Carbon-credit MRV documentation (optional)",
    ],
  },
] as const;

export const deliverableNote =
  "Exact deliverables are scoped per engagement and product. The full pack is provided as part of PMC — contact us for a project-specific document list.";
