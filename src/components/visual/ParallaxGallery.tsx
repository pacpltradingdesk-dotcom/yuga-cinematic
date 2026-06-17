"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Media } from "@/components/visual/Media";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { ImgKey } from "@/lib/media";

/**
 * Parallax image grid: every image stays fully visible in a tidy masonry, and
 * each tile drifts vertically at its own speed as the section scrolls past —
 * giving a layered depth feel without any zoom that clips/overlaps images. Pure
 * framer-motion useScroll (works with the site's Lenis smooth scroll). Honours
 * the site motion policy: under reduced motion the tiles simply don't drift, but
 * the full grid still shows — same layout, motion cut.
 */
const DEFAULT_IMAGES: readonly ImgKey[] = ["bioHero", "bio1", "bio0", "bio2", "prod1", "bio3", "prod3"];

/** Per-tile shape + drift, cycled by index so the grid reads as intentional rhythm. */
const ASPECTS = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[1/1]"] as const;
const DRIFTS = [-34, 26, -22, 32, -28, 22, -30] as const;

export function ParallaxGallery({ images = DEFAULT_IMAGES }: { images?: readonly ImgKey[] }) {
  return (
    <div className="bg-[var(--color-void)] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl columns-2 gap-4 md:columns-3">
        {images.map((name, i) => (
          <ParallaxTile
            key={`${name}-${i}`}
            name={name}
            drift={DRIFTS[i % DRIFTS.length]}
            aspect={ASPECTS[i % ASPECTS.length]}
            eager={i < 3}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * One masonry tile. Owns its own scroll progress so it drifts independently of
 * its neighbours — the per-tile speed difference is what creates the depth.
 */
function ParallaxTile({
  name,
  drift,
  aspect,
  eager,
}: {
  name: ImgKey;
  drift: number;
  aspect: string;
  eager: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Drift from +drift to -drift across the time the tile is in view.
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <div
      ref={ref}
      className={`relative mb-4 overflow-hidden rounded-xl ring-1 ring-[var(--color-line)] [break-inside:avoid] ${aspect}`}
    >
      {/* Inner image is taller than the tile (inset -10% top/bottom) so the
          vertical drift never reveals an edge. */}
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-[-10%_0]">
        <Media
          name={name}
          overlay="none"
          loading={eager ? "eager" : undefined}
          className="absolute inset-0"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
        />
      </motion.div>
    </div>
  );
}
