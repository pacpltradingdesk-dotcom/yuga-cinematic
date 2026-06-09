"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { catalog, getCalc, getProduct, type CalcTier } from "@/lib/catalog";
import { crRange, numRange, firstNumber } from "@/lib/format";

const STATES = Object.keys(catalog.subsidy.states);

type Goal = "cost" | "output" | "payback";
const GOALS: { key: Goal; label: string }[] = [
  { key: "cost", label: "Lowest entry cost" },
  { key: "output", label: "Highest output" },
  { key: "payback", label: "Fastest payback" },
];

/** Abbreviations used in feasibility.states free text → canonical dropdown name. */
const ALIAS: Record<string, string[]> = {
  "Uttar Pradesh": ["uttar pradesh", "up"],
  "Madhya Pradesh": ["madhya pradesh", "mp"],
  "Delhi-NCR": ["delhi-ncr", "delhi", "ncr"],
};

function matchesState(feasStates: string, state: string): boolean {
  const hay = feasStates.toLowerCase();
  if (hay.includes("all states")) return true;
  if (state === "Other state") return false; // only "all states" entries
  const tokens = ALIAS[state] ?? [state.toLowerCase()];
  return tokens.some((t) => new RegExp(`\\b${t}\\b`).test(hay));
}

function bestAffordable(tiers: readonly CalcTier[], budget: number): CalcTier | null {
  const within = tiers.filter((t) => t.invest[0] <= budget);
  return within.length ? within.reduce((a, b) => (b.invest[0] > a.invest[0] ? b : a)) : null;
}

/**
 * Best-Fit Finder — budget + state + goal → ranked plant recommendations,
 * matched to where they're feasible and what the visitor optimises for,
 * plus that state's headline subsidy.
 */
export function BestFitFinder() {
  const [budget, setBudget] = useState(3);
  const [state, setState] = useState(STATES[0]);
  const [goal, setGoal] = useState<Goal>("cost");

  const results = useMemo(() => {
    const rows = catalog.feasibility
      .filter((f) => matchesState(f.states, state))
      .map((f) => {
        const calc = getCalc(f.slug);
        const tier = calc ? bestAffordable(calc.tiers, budget) : null;
        return tier ? { ...f, tier, title: getProduct(f.slug)?.title ?? f.product } : null;
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);

    rows.sort((a, b) => {
      if (goal === "cost") return a.tier.invest[0] - b.tier.invest[0];
      if (goal === "output") return (b.tier.output?.[1] ?? -1) - (a.tier.output?.[1] ?? -1);
      return firstNumber(a.tier.payback) - firstNumber(b.tier.payback);
    });
    return rows.slice(0, 4);
  }, [budget, state, goal]);

  const subsidy = catalog.subsidy.states[state];

  const selectCls =
    "w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-raised)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-amber)]";

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-faint)]">Your state</span>
          <select className={selectCls} value={state} onChange={(e) => setState(e.target.value)}>
            {STATES.map((s) => (
              <option key={s} value={s} className="bg-[var(--color-surface)]">{s}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-faint)]">Priority</span>
          <select className={selectCls} value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
            {GOALS.map((g) => (
              <option key={g.key} value={g.key} className="bg-[var(--color-surface)]">{g.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs uppercase tracking-wider text-[var(--color-faint)]">Budget</span>
          <span className="font-display font-semibold text-gradient-warm">₹{budget} Cr</span>
        </div>
        <input
          type="range"
          min={0.25}
          max={35}
          step={0.25}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          aria-label="Investment budget in crore rupees"
          className="mt-1 w-full cursor-pointer py-2 accent-[var(--color-amber)]"
        />
      </div>

      {subsidy && (
        <div className="mt-6 rounded-2xl border border-[color-mix(in_oklch,var(--color-amber)_22%,transparent)] bg-[var(--color-raised)]/40 p-4 text-sm text-[var(--color-muted)]">
          <span className="font-medium text-[var(--color-amber)]">{state} incentive: </span>
          {subsidy.summary}
        </div>
      )}

      <div className="mt-6 grid gap-3">
        {results.length === 0 && (
          <p className="rounded-2xl border border-[var(--color-line)] p-5 text-sm text-[var(--color-muted)]">
            No plant fits ₹{budget} Cr in {state} for this priority. Raise the budget, or talk to us — many setups
            scale down with phased capex.
          </p>
        )}
        {results.map((r, i) => (
          <Link
            key={r.slug}
            href={`/products/${r.slug}`}
            data-cursor="hover"
            className="group rounded-2xl border border-[var(--color-line)] bg-[var(--color-raised)]/40 p-5 transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_35%,transparent)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {i === 0 && <Sparkles size={15} className="text-[var(--color-amber)]" />}
                <span className="font-display font-semibold tracking-tight">{r.title}</span>
                {i === 0 && (
                  <span className="rounded-full bg-[color-mix(in_oklch,var(--color-amber)_18%,transparent)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-amber)]">
                    Best fit
                  </span>
                )}
              </div>
              <ArrowUpRight size={15} className="text-[var(--color-faint)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{r.why}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-faint)]">
              <span>{r.tier.cap}</span>
              <span className="text-gradient-warm font-medium">{crRange(r.tier.invest)}</span>
              {r.tier.output && <span>{numRange(r.tier.output)} {r.tier.outUnit}</span>}
              <span>payback {r.tier.payback}</span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-faint)]">
        Indicative — eligibility, subsidy caps and figures depend on current policy, capacity and location. Verify on application; contact us for an exact DPR.
      </p>
    </div>
  );
}
