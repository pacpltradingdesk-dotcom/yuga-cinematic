import { Handshake, Network, Wrench, FileSearch, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";
import { engagementModels } from "@/lib/services";

/** Ways to work with YUGA — JV, collaborations, job work, research report. */
const ICON: Record<string, LucideIcon> = {
  jv: Handshake,
  collab: Network,
  jobwork: Wrench,
  research: FileSearch,
};

export function Services() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {engagementModels.map((m, i) => {
        const Icon = ICON[m.key] ?? Handshake;
        return (
          <Reveal key={m.key} index={i % 2}>
            <GlowCard accent={m.accent} className="h-full">
              <div className="flex h-full flex-col p-8">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--color-line)]"
                    style={{ color: `var(--color-${m.accent})` }}
                  >
                    <Icon size={20} />
                  </span>
                  {m.price && <Badge accent={m.accent}>{m.price}</Badge>}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{m.summary}</p>
                <ul className="mt-6 grid gap-2.5 border-t border-[var(--color-line)] pt-6">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: `var(--color-${m.accent})` }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </Reveal>
        );
      })}
    </div>
  );
}
