"use client";

import { Calculator, Banknote } from "lucide-react";
import { ToolTabs } from "./ToolTabs";
import { ProjectValuation } from "./ProjectValuation";
import { LoanEmi } from "./LoanEmi";

/** Plant-financing strip: configure CAPEX, then size the loan & EMI. */
export function FinanceTools() {
  return (
    <ToolTabs
      layoutId="finance-tools-tab"
      tabs={[
        { key: "valuation", label: "Project Valuation", icon: Calculator, render: () => <ProjectValuation /> },
        { key: "loan", label: "Loan & EMI", icon: Banknote, render: () => <LoanEmi /> },
      ]}
    />
  );
}
