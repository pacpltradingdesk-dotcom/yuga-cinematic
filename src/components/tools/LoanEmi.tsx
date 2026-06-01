"use client";

import { useState } from "react";
import { Banknote, Wallet, CalendarClock, ShieldCheck } from "lucide-react";
import { finance } from "@/lib/catalog";

/** Monthly EMI via the standard amortisation formula. P in rupees. */
function emi(principal: number, annualRatePct: number, years: number): number {
  const r = annualRatePct / 12 / 100;
  const n = years * 12;
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

function cr(n: number): string {
  return `₹${n.toFixed(2)} Cr`;
}
/** ₹ per month, shown in lakh when large. */
function perMonth(rupees: number): string {
  const lakh = rupees / 1e5;
  return lakh >= 1 ? `₹${lakh.toFixed(2)} L/mo` : `₹${Math.round(rupees).toLocaleString("en-IN")}/mo`;
}

/**
 * Loan & EMI eligibility — enter a project cost, see the term-loan / promoter
 * split, monthly EMI and CGTMSE collateral-free eligibility. Uses `finance`
 * defaults (≈70% term loan, ≈30% promoter, ~11%, 7 yr).
 */
export function LoanEmi() {
  const [cost, setCost] = useState(3);

  const termLoan = cost * finance.termLoanPct;
  const promoter = cost * finance.promoterPct;
  const monthly = emi(termLoan * 1e7, finance.interestPct, finance.tenureYears);
  const cgtmseEligible = termLoan <= 2; // collateral-free up to ₹2 Cr

  const tiles = [
    { icon: Banknote, label: `Term loan (${Math.round(finance.termLoanPct * 100)}%)`, value: cr(termLoan) },
    { icon: Wallet, label: `Promoter contribution (${Math.round(finance.promoterPct * 100)}%)`, value: cr(promoter) },
    { icon: CalendarClock, label: `EMI · ${finance.interestPct}% · ${finance.tenureYears} yr`, value: perMonth(monthly) },
  ];

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-semibold tracking-tight">Loan &amp; EMI eligibility</h3>
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Debt finance</span>
      </div>

      <div className="mt-6 flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-wider text-[var(--color-faint)]">Project cost</span>
        <span className="font-display text-2xl font-bold text-gradient-warm">₹{cost} Cr</span>
      </div>
      <input
        type="range"
        min={0.5}
        max={35}
        step={0.25}
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
        aria-label="Project cost in crore rupees"
        className="mt-2 w-full accent-[var(--color-amber)]"
      />

      <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-3">
        {tiles.map((t) => (
          <div key={t.label} className="bg-[var(--color-surface)] p-5">
            <div className="flex items-center gap-2 text-[var(--color-faint)]">
              <t.icon size={15} className="text-[var(--color-amber)]" />
              <span className="text-xs uppercase tracking-wider">{t.label}</span>
            </div>
            <div className="mt-2 font-display text-xl font-semibold tracking-tight text-gradient-warm">{t.value}</div>
          </div>
        ))}
      </div>

      <div
        className={`mt-4 flex items-center gap-2 rounded-2xl border p-4 text-sm ${
          cgtmseEligible
            ? "border-[color-mix(in_oklch,var(--color-cyan)_30%,transparent)] text-[var(--color-cyan)]"
            : "border-[var(--color-line)] text-[var(--color-muted)]"
        }`}
      >
        <ShieldCheck size={16} className="shrink-0" />
        {cgtmseEligible
          ? "Likely CGTMSE collateral-free (term loan ≤ ₹2 Cr) — subject to bank appraisal."
          : "Above ₹2 Cr term loan — typically needs collateral / fixed-asset security."}
      </div>

      <ul className="mt-5 grid gap-1.5 text-xs leading-relaxed text-[var(--color-faint)]">
        {finance.notes.map((n) => (
          <li key={n}>· {n}</li>
        ))}
        <li>· Indicative — actual terms depend on bank appraisal, credit profile and CMA data. Verify on application.</li>
      </ul>
    </div>
  );
}
