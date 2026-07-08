"use client";

import { useState } from "react";
import { TrendingUp, Layers } from "lucide-react";

const REV_MULT: [number, number] = [1, 3]; // revenue multiple (sector indicative)
const EBITDA_MULT: [number, number] = [5, 8];

function cr(n: number): string {
  return `₹${n % 1 === 0 ? n : n.toFixed(1)} Cr`;
}
function range(a: number, b: number): string {
  return `${cr(a)} – ${cr(b)}`;
}

/**
 * Indicative company / enterprise valuation for fundraise or IPO talk.
 * EV on a revenue basis (1–3×) and an EBITDA basis (5–8×), shown as ranges.
 */
export function CompanyValuation() {
  const [revenue, setRevenue] = useState(20);
  const [ebitda, setEbitda] = useState(4);

  // EBITDA can never exceed revenue — clamp so the valuation stays realistic even
  // if revenue is dragged below the current EBITDA (which would otherwise show an
  // impossible EBITDA-basis range far above the revenue basis).
  const eb = Math.min(ebitda, revenue);

  const revLow = revenue * REV_MULT[0];
  const revHigh = revenue * REV_MULT[1];
  const ebLow = eb * EBITDA_MULT[0];
  const ebHigh = eb * EBITDA_MULT[1];
  const blendLow = Math.min(revLow, ebLow);
  const blendHigh = Math.max(revHigh, ebHigh);

  const slider =
    "mt-2 w-full accent-[var(--color-amber)]";

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-semibold tracking-tight">Company valuation</h3>
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Fundraise / IPO</span>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-wider text-[var(--color-faint)]">Annual revenue</span>
            <span className="font-display font-semibold text-gradient-warm">₹{revenue} Cr</span>
          </div>
          <input type="range" min={1} max={200} step={1} value={revenue} onChange={(e) => { const v = Number(e.target.value); setRevenue(v); if (ebitda > v) setEbitda(v); }} aria-label="Annual revenue in crore" className={slider} />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-wider text-[var(--color-faint)]">EBITDA</span>
            <span className="font-display font-semibold text-gradient-cool">₹{eb} Cr</span>
          </div>
          <input type="range" min={0} max={revenue} step={0.5} value={eb} onChange={(e) => setEbitda(Number(e.target.value))} aria-label="EBITDA in crore" className={slider} />
        </div>
      </div>

      <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
        <div className="bg-[var(--color-surface)] p-5">
          <div className="flex items-center gap-2 text-[var(--color-faint)]">
            <TrendingUp size={15} className="text-[var(--color-amber)]" />
            <span className="text-xs uppercase tracking-wider">Revenue basis ({REV_MULT[0]}–{REV_MULT[1]}×)</span>
          </div>
          <div className="mt-2 font-display text-lg font-semibold tracking-tight text-gradient-warm">{range(revLow, revHigh)}</div>
        </div>
        <div className="bg-[var(--color-surface)] p-5">
          <div className="flex items-center gap-2 text-[var(--color-faint)]">
            <Layers size={15} className="text-[var(--color-cyan)]" />
            <span className="text-xs uppercase tracking-wider">EBITDA basis ({EBITDA_MULT[0]}–{EBITDA_MULT[1]}×)</span>
          </div>
          <div className="mt-2 font-display text-lg font-semibold tracking-tight text-gradient-cool">{range(ebLow, ebHigh)}</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[color-mix(in_oklch,var(--color-amber)_25%,transparent)] bg-[var(--color-raised)]/40 p-5 text-center ring-glow">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Indicative enterprise value</div>
        <div className="mt-1 font-display text-3xl font-bold tracking-tight text-gradient">{range(blendLow, blendHigh)}</div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-faint)]">
        Indicative only — a real valuation needs audited financials, due diligence and market context. Not investment advice or a securities solicitation.
      </p>
    </div>
  );
}
