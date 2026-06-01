"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products, getCalc, type CalcTier } from "@/lib/catalog";
import { crRange, numRange } from "@/lib/format";
import { cn } from "@/lib/utils";

const MIN = 0.25;
const MAX = 35;

interface Match {
  slug: string;
  title: string;
  tier: CalcTier;
  affordable: boolean;
}

/** Best plant tier for a budget: largest you can afford, else the cheapest. */
function bestTier(tiers: readonly CalcTier[], budget: number): { tier: CalcTier; affordable: boolean } {
  const within = tiers.filter((t) => t.invest[0] <= budget);
  if (within.length > 0) {
    return { tier: within.reduce((a, b) => (b.invest[0] > a.invest[0] ? b : a)), affordable: true };
  }
  return { tier: tiers.reduce((a, b) => (b.invest[0] < a.invest[0] ? b : a)), affordable: false };
}

/**
 * Investment Explorer — drag a budget, instantly see which plants fit and
 * their output / profit / payback. Pure client math over `calc` tiers.
 */
export function InvestmentExplorer() {
  const [budget, setBudget] = useState(3);

  const matches: Match[] = useMemo(() => {
    const rows: Match[] = [];
    for (const p of products) {
      const calc = getCalc(p.slug);
      if (!calc || calc.tiers.length === 0) continue;
      const { tier, affordable } = bestTier(calc.tiers, budget);
      rows.push({ slug: p.slug, title: p.title, tier, affordable });
    }
    // affordable first, then by larger upper-output (null output → sorts last)
    return rows.sort((a, b) => {
      if (a.affordable !== b.affordable) return a.affordable ? -1 : 1;
      return (b.tier.output?.[1] ?? -1) - (a.tier.output?.[1] ?? -1);
    });
  }, [budget]);

  const fitCount = matches.filter((m) => m.affordable).length;

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-9">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Your budget</span>
          <div className="font-display text-4xl font-bold tracking-tight text-gradient-warm">₹{budget} Cr</div>
        </div>
        <span className="text-sm text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-cyan)]">{fitCount}</span> of {matches.length} plants fit
        </span>
      </div>

      <input
        type="range"
        min={MIN}
        max={MAX}
        step={0.25}
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        aria-label="Investment budget in crore rupees"
        className="mt-5 w-full accent-[var(--color-amber)]"
      />
      <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-[var(--color-faint)]">
        <span>₹{MIN} Cr</span>
        <span>₹{MAX} Cr</span>
      </div>

      <div className="mt-7 grid gap-3">
        {matches.map((m) => (
          <Link
            key={m.slug}
            href={`/products/${m.slug}`}
            data-cursor="hover"
            className={cn(
              "group flex flex-col gap-3 rounded-2xl border p-5 transition-colors sm:flex-row sm:items-center sm:justify-between",
              m.affordable
                ? "border-[var(--color-line)] bg-[var(--color-raised)]/40 hover:border-[color-mix(in_oklch,var(--color-cyan)_35%,transparent)]"
                : "border-[var(--color-line)] opacity-55 hover:opacity-90",
            )}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold tracking-tight">{m.title}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider",
                    m.affordable
                      ? "bg-[color-mix(in_oklch,var(--color-cyan)_18%,transparent)] text-[var(--color-cyan)]"
                      : "text-[var(--color-faint)]",
                  )}
                >
                  {m.affordable ? "Within budget" : `from ${crRange([m.tier.invest[0], m.tier.invest[0]])}`}
                </span>
              </div>
              <div className="mt-1 text-xs text-[var(--color-faint)]">
                {m.tier.cap}
                {m.tier.output ? ` · ${numRange(m.tier.output)} ${m.tier.outUnit}` : ""} · payback {m.tier.payback}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gradient-warm font-display font-semibold">{crRange(m.tier.invest)}</span>
              {m.tier.profit && (
                <span className="hidden text-[var(--color-muted)] sm:inline">profit {crRange(m.tier.profit)}/yr</span>
              )}
              <ArrowUpRight size={15} className="text-[var(--color-faint)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-faint)]">
        Indicative — actual cost depends on capacity, location, raw-material price and utilisation. Contact us for an exact DPR.
      </p>
    </div>
  );
}
