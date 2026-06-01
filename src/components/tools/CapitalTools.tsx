"use client";

import { TrendingUp, ClipboardCheck, Banknote } from "lucide-react";
import { ToolTabs } from "./ToolTabs";
import { CompanyValuation } from "./CompanyValuation";
import { IpoReadiness } from "./IpoReadiness";
import { LoanEmi } from "./LoanEmi";

/** Capital-markets strip: value the company, check IPO readiness, size debt. */
export function CapitalTools() {
  return (
    <ToolTabs
      layoutId="capital-tools-tab"
      tabs={[
        { key: "valuation", label: "Company Valuation", icon: TrendingUp, render: () => <CompanyValuation /> },
        { key: "readiness", label: "IPO Readiness", icon: ClipboardCheck, render: () => <IpoReadiness /> },
        { key: "loan", label: "Loan & EMI", icon: Banknote, render: () => <LoanEmi /> },
      ]}
    />
  );
}
