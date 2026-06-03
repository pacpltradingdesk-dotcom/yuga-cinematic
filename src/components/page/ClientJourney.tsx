import { Search, MapPinned, Banknote, Factory, TrendingUp, Megaphone, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Journey with clients" pipeline (client note): the end-to-end path YUGA runs
 * every engagement through — identify → feasibility → funding → implementation
 * → valuation/fundraise → sale & marketing. Layout-only; data is local.
 */
interface JourneyStep {
  readonly icon: LucideIcon;
  readonly t: string;
  readonly d: string;
  readonly highlight?: boolean;
}

const STEPS: readonly JourneyStep[] = [
  { icon: Search, t: "Project identified", d: "Goal, product and budget defined with the client." },
  { icon: MapPinned, t: "Location feasibility check", d: "Site scoring — biomass, logistics, power, subsidy." },
  { icon: Banknote, t: "Project funding", d: "Debt, subsidy and equity stack arranged." },
  { icon: Factory, t: "Project implementation", d: "DPR → licences → build → commissioning." },
  { icon: TrendingUp, t: "Valuation & fundraise", d: "Enterprise value, investor docs, capital raised.", highlight: true },
  { icon: Megaphone, t: "Product sale & marketing", d: "Buyer network, tenders and 6-month hand-holding." },
];

export function ClientJourney() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STEPS.map((s, i) => (
        <Reveal key={s.t} index={i % 3}>
          <div
            className={`group relative flex h-full flex-col rounded-3xl border p-7 transition-colors ${
              s.highlight
                ? "border-[color-mix(in_oklch,var(--color-amber)_40%,transparent)] bg-[var(--color-raised)]/50 ring-glow"
                : "border-[var(--color-line)] hover:border-[color-mix(in_oklch,var(--color-cyan)_30%,transparent)]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`grid h-11 w-11 place-items-center rounded-2xl border ${
                  s.highlight
                    ? "border-[color-mix(in_oklch,var(--color-amber)_45%,transparent)] text-[var(--color-amber)]"
                    : "border-[var(--color-line)] text-[var(--color-cyan)]"
                }`}
              >
                <s.icon size={19} />
              </span>
              <span className="font-display text-3xl font-bold text-[var(--color-raised)] transition-colors group-hover:text-[var(--color-line)]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{s.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
