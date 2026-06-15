"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import type { GalleryImage } from "@/lib/gallery";

/**
 * Masonry image grid (21st.dev "image testimonial grid", adapted):
 * CSS-columns masonry + per-card whileInView rise. Generic container plus a
 * plant-image card so mixed aspect ratios (16:9 scenes + square quads) flow
 * naturally. basePath prefix matches visual/Media for static export.
 */
interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ className, columns = 3, gap = 4, children, ...props }, ref) => {
    const style = { columnCount: columns, columnGap: `${gap * 0.25}rem` };
    return (
      <div ref={ref} style={style} className={cn("w-full", className)} {...props}>
        {React.Children.map(children, (child) => (
          <motion.div
            className="mb-4 break-inside-avoid"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  },
);
MasonryGrid.displayName = "MasonryGrid";

/** One plant image as a masonry card — caption from alt, hover lift, click to zoom. */
export function MasonryImageCard({ img, onOpen }: { img: GalleryImage; onOpen?: () => void }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const caption = img.alt.split(" - ")[1] ?? img.alt;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${img.alt}`}
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-amber)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- natural-height masonry needs a plain img */}
      <img src={`${base}${img.src}`} alt={img.alt} className="h-auto w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="absolute bottom-3 left-4 text-left text-sm font-medium text-white opacity-0 drop-shadow-md transition-opacity duration-300 group-hover:opacity-100">
        {caption}
      </p>
    </button>
  );
}

/** Responsive column count for the masonry (1/2/3 by breakpoint). */
export function useMasonryColumns(max = 3): number {
  const [cols, setCols] = React.useState(max);
  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 640 ? 1 : w < 1024 ? 2 : max);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [max]);
  return cols;
}

/** Ready-made responsive plant-image masonry (what PlantGallery renders for variant="masonry"). */
export function PlantMasonry({ imgs }: { imgs: readonly GalleryImage[] }) {
  const columns = useMasonryColumns(3);
  const [lightbox, setLightbox] = React.useState<number | null>(null);
  return (
    <>
      <MasonryGrid columns={columns} gap={4}>
        {imgs.map((im, i) => (
          <MasonryImageCard key={im.src} img={im} onOpen={() => setLightbox(i)} />
        ))}
      </MasonryGrid>
      <GalleryLightbox images={imgs} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
    </>
  );
}
