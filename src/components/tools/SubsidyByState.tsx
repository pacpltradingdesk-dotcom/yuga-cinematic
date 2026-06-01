"use client";

import { useState } from "react";
import { Landmark, Building2 } from "lucide-react";
import { catalog } from "@/lib/catalog";

const STATES = Object.keys(catalog.subsidy.states);

/**
 * Subsidy & Finance by State — pick a state, see its incentives + the central
 * schemes + which plants suit it. Read-only display over `subsidy` + `stateProducts`.
 */
export function SubsidyByState() {
  const [state, setState] = useState(STATES[0]);
  const data = catalog.subsidy.states[state];
  const central = catalog.subsidy.central;
  const bestProducts = catalog.stateProducts[state] ?? [];

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-9">
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-faint)]">Select your state</span>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-raised)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-amber)] sm:max-w-sm"
        >
          {STATES.map((s) => (
            <option key={s} value={s} className="bg-[var(--color-surface)]">{s}</option>
          ))}
        </select>
      </label>

      {data && (
        <p className="mt-5 text-sm leading-relaxed text-[var(--color-muted)]">
          <span className="font-medium text-[var(--color-amber)]">{state}: </span>
          {data.summary}
        </p>
      )}

      {/* State incentives */}
      {data && data.benefits.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">
            <Building2 size={14} className="text-[var(--color-amber)]" /> State incentives
          </div>
          <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--color-line)]">
            {data.benefits.map((b, i) => (
              <div
                key={b.name}
                className={`grid gap-1 px-5 py-4 sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:gap-4 ${
                  i > 0 ? "border-t border-[var(--color-line)]" : ""
                }`}
              >
                <span className="text-sm font-medium text-[var(--color-ink)]">{b.name}</span>
                <span className="text-sm text-[var(--color-muted)]">{b.benefit}</span>
                <span className="text-sm text-gradient-warm font-medium sm:text-right">{b.cap}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Central schemes */}
      <div className="mt-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">
          <Landmark size={14} className="text-[var(--color-cyan)]" /> Central schemes (all states)
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {central.map((c) => (
            <div key={c.scheme} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-raised)]/40 p-4">
              <div className="font-display text-sm font-semibold tracking-tight">{c.scheme}</div>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{c.benefit}</p>
              <div className="mt-2 text-xs text-gradient-cool font-medium">{c.cap}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Best products for this state */}
      {bestProducts.length > 0 && (
        <div className="mt-6">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">Best-suited plants here</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {bestProducts.map((p) => (
              <span key={p} className="rounded-full bg-[var(--color-raised)] px-3 py-1.5 text-xs text-[var(--color-muted)]">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-xs leading-relaxed text-[var(--color-faint)]">
        Eligibility and caps depend on current government policy and category — verify on application. Contact us to structure the optimal subsidy + loan mix.
      </p>
    </div>
  );
}
