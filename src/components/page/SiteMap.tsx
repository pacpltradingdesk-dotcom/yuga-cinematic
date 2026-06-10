import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { navGroups } from "@/lib/nav";

/**
 * Full site map grouped by the four top-menu areas (Plants · Software · Capital ·
 * Company), with every page and its one-line description underneath. Pure layout
 * over `navGroups` (single source of truth) — shown on the home page and Explore.
 */
export function SiteMap() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {navGroups.map((group, i) => (
        <Reveal key={group.label} index={i}>
          <div className="rounded-3xl border border-[var(--color-line)] p-7">
            <h3 className="font-display text-lg font-semibold tracking-tight text-[var(--color-ink)]">
              {group.label}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-faint)]">{group.blurb}</p>
            <ul className="mt-5 grid gap-3 border-t border-[var(--color-line)] pt-5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} data-cursor="hover" className="group block transition-colors">
                    <span className="flex items-center gap-1 text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-amber)]">
                      {item.label}
                      <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="block text-xs text-[var(--color-muted)]">{item.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
