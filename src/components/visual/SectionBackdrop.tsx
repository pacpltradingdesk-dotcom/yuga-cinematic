import { Media } from "@/components/visual/Media";
import type { ImgKey } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Faint photographic backdrop for otherwise text-only sections, so the whole
 * site feels image-rich without hurting legibility. Sits behind the section's
 * own surface (parent must be `relative isolate`); content stays on top.
 * Default opacity is intentionally low for the dark cinematic theme.
 */
export function SectionBackdrop({
  name,
  className,
  opacity = "opacity-[0.10]",
}: {
  name: ImgKey;
  className?: string;
  opacity?: string;
}) {
  return (
    <>
      <Media
        name={name}
        overlay="none"
        sizes="100vw"
        className={cn("pointer-events-none absolute inset-0 -z-10 h-full w-full", opacity, className)}
      />
      {/* readability scrim */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[var(--color-void)]/40" />
    </>
  );
}
