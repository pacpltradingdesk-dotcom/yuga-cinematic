"use client";

import { useMemo, useState } from "react";
import { products, getCalc, addons, type CalcTier } from "@/lib/catalog";
import { crRange, numRange } from "@/lib/format";
import { cn } from "@/lib/utils";

const withCalc = products.filter((p) => (getCalc(p.slug)?.tiers.length ?? 0) > 0);
/** Add-on that boosts output (≈50–100% more) when selected. */
const SECOND_LINE = addons.findIndex((a) => /reactor|second line/i.test(a.name));

/**
 * Project Valuation builder — pick a plant + capacity, tick add-ons, and the
 * total CAPEX (and output, if a second line is added) updates live.
 */
export function ProjectValuation() {
  const [slug, setSlug] = useState(withCalc[0]?.slug ?? "");
  const [tierIdx, setTierIdx] = useState(0);
  const [picked, setPicked] = useState<ReadonlySet<number>>(new Set());

  const calc = getCalc(slug);
  const tiers = calc?.tiers ?? [];
  const tier: CalcTier | undefined = tiers[Math.min(tierIdx, tiers.length - 1)];

  const result = useMemo(() => {
    if (!tier) return null;
    let addLow = 0;
    let addHigh = 0;
    for (const i of picked) {
      addLow += addons[i].cost[0];
      addHigh += addons[i].cost[1];
    }
    const totalLow = tier.invest[0] + addLow;
    const totalHigh = tier.invest[1] + addHigh;
    const boosted = picked.has(SECOND_LINE);
    const output =
      tier.output && boosted
        ? ([Math.round(tier.output[0] * 1.5), tier.output[1] * 2] as [number, number])
        : tier.output;
    return { addLow, addHigh, totalLow, totalHigh, output, boosted };
  }, [tier, picked]);

  const toggle = (i: number) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const onSlug = (s: string) => {
    setSlug(s);
    setTierIdx(0);
  };

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-semibold tracking-tight">Project valuation builder</h3>
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Configure CAPEX</span>
      </div>

      <label className="mt-6 block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-faint)]">Plant</span>
        <select
          value={slug}
          onChange={(e) => onSlug(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-raised)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-amber)] sm:max-w-md"
        >
          {withCalc.map((p) => (
            <option key={p.slug} value={p.slug} className="bg-[var(--color-surface)]">{p.title}</option>
          ))}
        </select>
      </label>

      <div className="mt-5 flex flex-wrap gap-2">
        {tiers.map((t, idx) => (
          <button
            key={t.cap}
            onClick={() => setTierIdx(idx)}
            data-cursor="hover"
            aria-pressed={idx === tierIdx}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              idx === tierIdx
                ? "border-[color-mix(in_oklch,var(--color-amber)_45%,transparent)] bg-[var(--color-raised)] text-[var(--color-ink)] ring-glow"
                : "border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-ink)]",
            )}
          >
            {t.cap}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {addons.map((a, i) => {
          const on = picked.has(i);
          return (
            <button
              key={a.name}
              onClick={() => toggle(i)}
              data-cursor="hover"
              aria-pressed={on}
              className={cn(
                "flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                on
                  ? "border-[color-mix(in_oklch,var(--color-amber)_40%,transparent)] bg-[var(--color-raised)]/50"
                  : "border-[var(--color-line)] hover:border-[color-mix(in_oklch,var(--color-ink)_18%,transparent)]",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px]",
                  on ? "border-[var(--color-amber)] bg-[var(--color-amber)] text-[var(--color-void)]" : "border-[var(--color-line)]",
                )}
              >
                {on ? "✓" : ""}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-[var(--color-ink)]">{a.name}</span>
                <span className="block text-xs text-[var(--color-faint)]">+{crRange(a.cost)} · {a.effect}</span>
              </span>
            </button>
          );
        })}
      </div>

      {result && tier && (
        <div className="mt-6 rounded-2xl border border-[color-mix(in_oklch,var(--color-amber)_25%,transparent)] bg-[var(--color-raised)]/40 p-6 ring-glow">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Total project cost</div>
              <div className="mt-1 font-display text-3xl font-bold tracking-tight text-gradient">
                {crRange([result.totalLow, Math.round(result.totalHigh * 10) / 10] as [number, number])}
              </div>
            </div>
            {result.output && (
              <div className="text-right">
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">
                  Output / yr {result.boosted && <span className="text-[var(--color-cyan)]">↑ boosted</span>}
                </div>
                <div className="mt-1 font-display text-lg font-semibold text-gradient-cool">
                  {numRange(result.output)} {tier.outUnit}
                </div>
              </div>
            )}
          </div>
          <div className="mt-3 text-xs text-[var(--color-faint)]">
            Base {crRange(tier.invest)} + add-ons {crRange([result.addLow, result.addHigh] as [number, number])}
          </div>
        </div>
      )}

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-faint)]">
        Indicative — actual CAPEX depends on vendor quotes, location and scope. Contact us for an exact DPR.
      </p>
    </div>
  );
}
