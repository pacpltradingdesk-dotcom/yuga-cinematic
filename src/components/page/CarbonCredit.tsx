import { Leaf } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessTimeline } from "@/components/visual/ProcessTimeline";
import { carbonStats, carbonClaimSteps, carbonIntro, carbonNote } from "@/lib/carbon";

/** Compact 4-stat carbon strip — for the home page and product pages. */
export function CarbonStats({ showIntro = false }: { showIntro?: boolean }) {
  return (
    <div>
      {showIntro && (
        <p className="mb-8 max-w-2xl leading-relaxed text-[var(--color-muted)]">{carbonIntro}</p>
      )}
      <div className="grid gap-px overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
        {carbonStats.map((s) => (
          <div key={s.label} className="bg-[var(--color-surface)] p-6">
            <div className="flex items-center gap-2 text-[var(--color-faint)]">
              <Leaf size={15} className="text-[var(--color-cyan)]" />
              <span className="text-[11px] uppercase tracking-wider">Carbon</span>
            </div>
            <div className="mt-2 font-display text-2xl font-bold tracking-tight text-gradient-cool">{s.value}</div>
            <div className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-[var(--color-faint)]">{carbonNote}</p>
    </div>
  );
}

/** Full carbon-credit claim process (7 steps) on the vertical timeline. */
export function CarbonClaim() {
  return (
    <Reveal>
      <ProcessTimeline steps={carbonClaimSteps} />
    </Reveal>
  );
}
