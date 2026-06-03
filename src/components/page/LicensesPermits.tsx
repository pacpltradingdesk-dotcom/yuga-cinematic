"use client";

import { useState } from "react";
import { ShieldCheck, Landmark } from "lucide-react";
import { coreLicences, productLicences, stateAuthorityNote, licenceNote, type Licence } from "@/lib/licenses";

const STATES = Object.keys(stateAuthorityNote);

/**
 * Licences & permissions for a product, with a state picker that surfaces the
 * nodal/single-window authority note (client note: "as per product & state →
 * applicable licence & permission, all"). Static data; runs in the browser.
 */
export function LicensesPermits({ slug }: { slug: string }) {
  const [state, setState] = useState(STATES[0]);
  const extra: readonly Licence[] = productLicences[slug] ?? [];
  const all: readonly Licence[] = [...coreLicences, ...extra];

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-display text-xl font-semibold tracking-tight">Licences & permissions</h3>
        <label className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[var(--color-faint)]">State</span>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="rounded-xl border border-[var(--color-line)] bg-[var(--color-raised)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-amber)]"
          >
            {STATES.map((s) => (
              <option key={s} value={s} className="bg-[var(--color-surface)]">{s}</option>
            ))}
          </select>
        </label>
      </div>

      {/* state authority note */}
      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[color-mix(in_oklch,var(--color-cyan)_25%,transparent)] bg-[var(--color-raised)]/40 p-4">
        <Landmark size={16} className="mt-0.5 shrink-0 text-[var(--color-cyan)]" />
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">{stateAuthorityNote[state]}</p>
      </div>

      {/* licence list */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-line)]">
        {all.map((l, i) => (
          <div
            key={l.name}
            className={`grid gap-1 px-5 py-4 sm:grid-cols-[1.6fr_1.2fr_auto] sm:items-center sm:gap-4 ${
              i > 0 ? "border-t border-[var(--color-line)]" : ""
            }`}
          >
            <span className="flex items-start gap-2 text-sm font-medium text-[var(--color-ink)]">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
              {l.name}
            </span>
            <span className="text-sm text-[var(--color-muted)] sm:pl-0 pl-7">{l.authority}</span>
            <span className="pl-7 text-xs text-gradient-cool sm:pl-0 sm:text-right">{l.stage}</span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-faint)]">{licenceNote}</p>
    </div>
  );
}
