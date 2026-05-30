"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Glass card with a pointer-following radial spotlight. The spotlight
 * position is written to CSS vars on mousemove (no React re-render).
 */
export function GlowCard({
  children,
  className,
  accent = "amber",
}: {
  children: ReactNode;
  className?: string;
  accent?: "amber" | "cyan";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const glow =
    accent === "amber"
      ? "color-mix(in oklch, var(--color-amber) 22%, transparent)"
      : "color-mix(in oklch, var(--color-cyan) 22%, transparent)";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-px transition-colors hover:border-[color-mix(in_oklch,var(--color-ink)_18%,transparent)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--mx) var(--my), ${glow}, transparent 60%)`,
        }}
      />
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[var(--color-surface)]">{children}</div>
    </div>
  );
}
