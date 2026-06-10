import Link from "next/link";
import { ArrowUpRight, Factory, Landmark, Cpu } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "By goal" router — the fastest way for a visitor to self-route to the right
 * vertical (set up a plant / fund a project / run sales on AI software). Shown
 * both up-front on the home page and on the Explore page. Layout-only; the three
 * goals are stable config tied to the three business verticals.
 */
const goals = [
  { icon: Factory, t: "I want to set up a plant", d: "Bio-bitumen, pyrolysis, PMB/CRMB, emulsion — DPR to production.", href: "/products", cta: "See the 9 plants", accent: "amber" as const },
  { icon: Landmark, t: "I want to fund a project", d: "Bank loan, subsidy, equity or IPO — with bankable documents.", href: "/capital-market", cta: "Funding options", accent: "cyan" as const },
  { icon: Cpu, t: "I want AI sales software", d: "The in-house stack that runs our own bitumen business.", href: "/it-software", cta: "See the software", accent: "amber" as const },
];

export function GoalRouter() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {goals.map((g, i) => (
        <Reveal key={g.t} index={i}>
          <Link href={g.href} data-cursor="hover">
            <GlowCard accent={g.accent} className="h-full">
              <div className="flex h-full flex-col p-8">
                <g.icon size={26} className="text-[var(--color-amber)]" />
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{g.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{g.d}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-ink)]">
                  {g.cta} <ArrowUpRight size={14} />
                </span>
              </div>
            </GlowCard>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
