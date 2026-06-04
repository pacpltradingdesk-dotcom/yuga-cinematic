import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  readonly label: string;
  /** Omit on the current (last) page. */
  readonly href?: string;
}

/** Visible breadcrumb trail — tells the visitor exactly where they are. */
export function Breadcrumbs({ trail, className }: { trail: readonly Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-faint)]">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  data-cursor="hover"
                  className="transition-colors hover:text-[var(--color-ink)]"
                >
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn(last && "text-[var(--color-muted)]")}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight size={13} className="text-[var(--color-line)]" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
