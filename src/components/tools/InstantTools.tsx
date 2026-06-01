"use client";

import { SlidersHorizontal, Compass, Landmark } from "lucide-react";
import { ToolTabs } from "./ToolTabs";
import { InvestmentExplorer } from "./InvestmentExplorer";
import { BestFitFinder } from "./BestFitFinder";
import { SubsidyByState } from "./SubsidyByState";

/** Home / Consulting instant-tools strip: Explorer · Finder · Subsidy. */
export function InstantTools() {
  return (
    <ToolTabs
      layoutId="instant-tools-tab"
      tabs={[
        { key: "explorer", label: "Investment Explorer", icon: SlidersHorizontal, render: () => <InvestmentExplorer /> },
        { key: "finder", label: "Best-Fit Finder", icon: Compass, render: () => <BestFitFinder /> },
        { key: "subsidy", label: "Subsidy by State", icon: Landmark, render: () => <SubsidyByState /> },
      ]}
    />
  );
}
