"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { getTerm } from "@/lib/glossary";

/**
 * Inline jargon explainer. Wrap a term — `<Term id="dpr">DPR</Term>` — to show a
 * plain-language definition on hover/focus/tap, with a link to the full glossary.
 * Accessible: a real button, aria-describedby, keyboard + pointer. Degrades to
 * plain text if the id is unknown.
 */
export function Term({ id, children }: { id: string; children: React.ReactNode }) {
  const t = getTerm(id);
  const [open, setOpen] = useState(false);
  const tipId = useId();

  if (!t) return <>{children}</>;

  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-describedby={open ? tipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="cursor-help underline decoration-dotted decoration-[var(--color-faint)] underline-offset-[3px] hover:decoration-[var(--color-amber)]"
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          id={tipId}
          className="glass absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-xl border border-[var(--color-line)] p-3 text-left text-xs leading-relaxed text-[var(--color-muted)] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)]"
        >
          {t.full && <span className="font-medium text-[var(--color-ink)]">{t.full}. </span>}
          {t.def}{" "}
          <Link href={`/glossary#${t.id}`} className="text-[var(--color-amber)]" onClick={() => setOpen(false)}>
            More
          </Link>
        </span>
      )}
    </span>
  );
}
