import { cn } from "@/lib/utils";

export interface PageAnchor {
  readonly id: string;
  readonly label: string;
}

/**
 * Sticky "on this page" chip bar for long pages — lets a visitor jump straight
 * to a section instead of scroll-hunting. Plain anchor links (work without JS);
 * targets carry `scroll-mt-28` so they clear the fixed navbar.
 */
export function OnThisPage({ items, className }: { items: readonly PageAnchor[]; className?: string }) {
  return (
    <nav
      aria-label="On this page"
      className={cn("sticky top-[4.75rem] z-30 border-y border-[var(--color-line)] bg-[var(--color-void)]/80 backdrop-blur-md", className)}
    >
      <div className="maxw container-x flex items-center gap-3 overflow-x-auto py-3">
        <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">On this page</span>
        <div className="flex gap-2">
          {items.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              data-cursor="hover"
              className="shrink-0 rounded-full border border-[var(--color-line)] px-3.5 py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_40%,transparent)] hover:text-[var(--color-ink)]"
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
