"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  "Audited financials for the last 3+ years?",
  "Annual revenue above ₹25 Cr?",
  "Profitable / positive EBITDA?",
  "Board, governance & statutory compliance in place?",
  "Clear growth plan & defined use of funds?",
];

interface Verdict {
  title: string;
  detail: string;
  accent: "amber" | "cyan";
}

function verdictFor(score: number): Verdict {
  if (score <= 1) return { title: "Seed / early stage", detail: "Build traction and clean books first. Angel/seed capital and a solid DPR are the right next step.", accent: "amber" };
  if (score <= 3) return { title: "Private fundraise ready", detail: "Series A/B / strategic capital is realistic. Tighten governance and an investor data room before raising.", accent: "amber" };
  if (score === 4) return { title: "SME IPO candidate", detail: "You're close to a listing. Address the open item and prepare for SME-board readiness.", accent: "cyan" };
  return { title: "Main-board IPO ready", detail: "Strong profile across all checks. A structured listing path (like our founder's BSE IPO, 2020) is on the table.", accent: "cyan" };
}

/** Five-question funding/IPO readiness self-check → score + stage guidance. */
export function IpoReadiness() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(QUESTIONS.length).fill(null));
  const score = answers.filter((a) => a === true).length;
  const answered = answers.filter((a) => a !== null).length;
  const verdict = verdictFor(score);

  const set = (i: number, val: boolean) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));

  return (
    <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 sm:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-semibold tracking-tight">IPO / funding readiness</h3>
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">5-point check</span>
      </div>

      <div className="mt-6 grid gap-3">
        {QUESTIONS.map((q, i) => (
          <div key={q} className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-line)] p-4">
            <span className="text-sm text-[var(--color-ink)]">{q}</span>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => set(i, true)}
                aria-label={`Yes: ${q}`}
                aria-pressed={answers[i] === true}
                data-cursor="hover"
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full border transition-colors",
                  answers[i] === true
                    ? "border-transparent bg-[var(--color-cyan)] text-[var(--color-void)]"
                    : "border-[var(--color-line)] text-[var(--color-faint)] hover:text-[var(--color-ink)]",
                )}
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => set(i, false)}
                aria-label={`No: ${q}`}
                aria-pressed={answers[i] === false}
                data-cursor="hover"
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full border transition-colors",
                  answers[i] === false
                    ? "border-transparent bg-[var(--color-raised)] text-[var(--color-ink)]"
                    : "border-[var(--color-line)] text-[var(--color-faint)] hover:text-[var(--color-ink)]",
                )}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "mt-6 rounded-2xl border p-6 text-center transition-colors",
          answered === 0
            ? "border-[var(--color-line)]"
            : verdict.accent === "cyan"
              ? "border-[color-mix(in_oklch,var(--color-cyan)_30%,transparent)] ring-glow-cool"
              : "border-[color-mix(in_oklch,var(--color-amber)_30%,transparent)] ring-glow",
        )}
      >
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">
          {answered === 0 ? "Answer the 5 questions" : `Score ${score} / 5`}
        </div>
        {answered > 0 && (
          <>
            <div className={cn("mt-1 font-display text-2xl font-bold tracking-tight", verdict.accent === "cyan" ? "text-gradient-cool" : "text-gradient-warm")}>
              {verdict.title}
            </div>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-muted)]">{verdict.detail}</p>
          </>
        )}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--color-faint)]">
        Indicative self-assessment — not investment advice. Listing eligibility is decided by exchange/SEBI norms and due diligence.
      </p>
    </div>
  );
}
