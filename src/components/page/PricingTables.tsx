"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { pricingTables, pricingNote } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/**
 * Tabbed indicative pricing (min → avg) across PMC, Software and Capital Markets
 * (client note). Pure presentation over `pricing.ts` — client edits figures there.
 */
export function PricingTables() {
  const [active, setActive] = useState(0);
  const table = pricingTables[active];

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-9">
      {/* tab switcher */}
      <div className="flex flex-wrap gap-2">
        {pricingTables.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setActive(i)}
            data-cursor="hover"
            aria-pressed={i === active}
            className={cn(
              "relative rounded-full border px-4 py-2 text-sm transition-colors",
              i === active
                ? "border-[color-mix(in_oklch,var(--color-amber)_45%,transparent)] text-[var(--color-ink)]"
                : "border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-ink)]",
            )}
          >
            {i === active && (
              <motion.span
                layoutId="pricing-tab"
                className="absolute inset-0 -z-10 rounded-full bg-[var(--color-raised)] ring-glow"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {t.title}
          </button>
        ))}
      </div>

      <p className="mt-5 max-w-2xl text-sm text-[var(--color-muted)]">{table.blurb}</p>

      {/* rows */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-line)]"
      >
        <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr] bg-[var(--color-raised)] px-5 py-3 text-[11px] uppercase tracking-wider text-[var(--color-faint)] sm:px-6">
          <span>Service</span>
          <span className="text-right">From</span>
          <span className="text-right">Typical</span>
        </div>
        {table.rows.map((r, i) => (
          <div
            key={r.service}
            className={cn(
              "grid grid-cols-[1.6fr_0.8fr_0.8fr] items-center px-5 py-4 text-sm sm:px-6",
              i > 0 && "border-t border-[var(--color-line)]",
            )}
          >
            <span className="pr-3">
              <span className="font-medium text-[var(--color-ink)]">{r.service}</span>
              {r.note && <span className="mt-0.5 block text-xs text-[var(--color-faint)]">{r.note}</span>}
            </span>
            <span className="text-right text-[var(--color-muted)]">{r.min}</span>
            <span className="text-right font-display font-medium text-gradient-warm">{r.avg}</span>
          </div>
        ))}
      </motion.div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-faint)]">{pricingNote}</p>
    </div>
  );
}
