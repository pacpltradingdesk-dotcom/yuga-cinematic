import { FileText, PencilRuler, Workflow, ShieldCheck, Check, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { deliverableGroups, deliverableNote } from "@/lib/deliverables";

/** Documents & deliverables we provide (client note). Server component. */
const ICON: Record<string, LucideIcon> = {
  file: FileText,
  drawing: PencilRuler,
  workflow: Workflow,
  shield: ShieldCheck,
};

export function Deliverables() {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2">
        {deliverableGroups.map((g, i) => {
          const Icon = ICON[g.icon] ?? FileText;
          return (
            <Reveal key={g.title} index={i % 2}>
              <div className="h-full rounded-3xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-line)] text-[var(--color-amber)]">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{g.title}</h3>
                </div>
                <ul className="mt-5 grid gap-2.5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                      <Check size={14} className="mt-0.5 shrink-0 text-[var(--color-cyan)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-5 text-xs leading-relaxed text-[var(--color-faint)]">{deliverableNote}</p>
    </div>
  );
}
