"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Banknote, Factory, Map, Timer, Coins } from "lucide-react";
import { getCalc, type CalcTier } from "@/lib/catalog";
import { crRange as money, numRange as num } from "@/lib/format";
import { cn } from "@/lib/utils";

const reveal = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

/**
 * Cost & ROI calculator — pick a plant capacity tier, see indicative
 * investment / output / revenue / profit / area / payback as ranges.
 * Pure client-side math over `calc[slug].tiers` (works in static export).
 */
export function CostRoiCalculator({ slug, className }: { slug: string; className?: string }) {
  const calc = getCalc(slug);
  const [i, setI] = useState(0);
  if (!calc || calc.tiers.length === 0) return null;

  const tier: CalcTier = calc.tiers[Math.min(i, calc.tiers.length - 1)];

  // output/revenue/profit are null for non-production units (e.g. decanter) → omit those tiles.
  const metrics: { icon: typeof Banknote; label: string; value: string }[] = [
    { icon: Banknote, label: "Investment (CAPEX)", value: money(tier.invest) },
    ...(tier.output ? [{ icon: Factory, label: "Output / year", value: `${num(tier.output)} ${tier.outUnit}` }] : []),
    ...(tier.revenue ? [{ icon: TrendingUp, label: "Revenue / year", value: money(tier.revenue) }] : []),
    ...(tier.profit ? [{ icon: Coins, label: "Profit / year", value: money(tier.profit) }] : []),
    { icon: Map, label: "Land required", value: tier.area },
    { icon: Timer, label: "Payback", value: tier.payback },
  ];

  return (
    <div
      className={cn(
        "rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-9",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-semibold tracking-tight">{calc.title}</h3>
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Cost &amp; ROI</span>
      </div>
      <p className="mt-1 text-sm text-[var(--color-muted)]">{calc.utility}</p>

      {/* capacity selector */}
      <div className="mt-6 flex flex-wrap gap-2">
        {calc.tiers.map((t, idx) => {
          const active = idx === i;
          return (
            <button
              key={t.cap}
              onClick={() => setI(idx)}
              data-cursor="hover"
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                active
                  ? "border-[color-mix(in_oklch,var(--color-amber)_45%,transparent)] bg-[var(--color-raised)] text-[var(--color-ink)] ring-glow"
                  : "border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-ink)]",
              )}
            >
              {t.cap}
            </button>
          );
        })}
      </div>

      {/* result grid */}
      <motion.div
        key={i}
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.05 }}
        className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3"
      >
        {metrics.map((m) => (
          <motion.div key={m.label} variants={reveal} className="bg-[var(--color-surface)] p-5">
            <div className="flex items-center gap-2 text-[var(--color-faint)]">
              <m.icon size={15} className="text-[var(--color-amber)]" />
              <span className="text-xs uppercase tracking-wider">{m.label}</span>
            </div>
            <div className="mt-2 font-display text-xl font-semibold tracking-tight text-gradient-warm">
              {m.value}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-faint)]">
        Indicative only — actual figures depend on capacity, location, raw-material price and utilisation.
        Contact us for an exact DPR.
      </p>
    </div>
  );
}
