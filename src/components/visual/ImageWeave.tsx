"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Media } from "@/components/visual/Media";
import type { WeaveImage } from "@/lib/pageImagery";

/**
 * In-page image effects (21st.dev-inspired) for weaving plant renders through
 * content sections — distributed placements instead of one gallery block.
 * All motion respects prefers-reduced-motion (falls back to static layouts).
 */

/** Hover-expand strip: each image grows to dominate the row on hover. */
export function QuadStrip({ imgs, id }: { imgs: WeaveImage[]; id?: string }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  if (!imgs.length) return null;
  return (
    <div id={id} className="flex h-56 gap-2 sm:h-72 md:h-80">
      {imgs.map((im, i) => (
        <motion.div
          key={im.src}
          className="relative cursor-pointer overflow-hidden rounded-md"
          style={{ flex: 1 }}
          animate={reduce ? undefined : { flex: hovered === null ? 1 : hovered === i ? 2.4 : 0.6 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <Media src={im.src} alt={im.alt} overlay="none" className="absolute inset-0" sizes="40vw" />
          <div
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-void)]/80 to-transparent p-3 text-xs text-[var(--color-muted)] transition-opacity duration-300 ${
              hovered === i ? "opacity-100" : "opacity-0"
            }`}
          >
            {im.alt.split(" - ")[1] ?? im.alt}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** Full-width parallax banner between sections — slow drift + scrim. */
export function AmbientBanner({ img, caption }: { img: WeaveImage; caption?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <div ref={ref} className="relative h-[42vh] overflow-hidden sm:h-[55vh]">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-[-14%_0]">
        <Media src={img.src} alt={img.alt} overlay="full" className="absolute inset-0" sizes="100vw" />
      </motion.div>
      {caption && (
        <div className="absolute inset-x-0 bottom-6 text-center text-sm tracking-wide text-white/80">
          {caption}
        </div>
      )}
    </div>
  );
}

/** 4-angle sheet shown as a "blueprint" panel that settles into place on scroll. */
export function BlueprintPanel({ img }: { img: WeaveImage }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);
  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { scale, opacity }}
      className="relative mx-auto aspect-square w-full max-w-3xl overflow-hidden rounded-lg border border-[var(--color-line)]"
    >
      <Media src={img.src} alt={img.alt} overlay="none" className="absolute inset-0" sizes="(max-width: 768px) 100vw, 768px" />
    </motion.div>
  );
}

/** Sticky side image beside a text column — gentle reveal + ken-burns ambience. */
export function SideImage({ img, className = "" }: { img: WeaveImage; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-md ${className}`}
    >
      <Media src={img.src} alt={img.alt} overlay="none" animate className="absolute inset-0" sizes="(max-width: 1024px) 100vw, 40vw" />
    </motion.div>
  );
}
