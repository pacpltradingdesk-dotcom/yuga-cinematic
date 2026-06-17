"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import { Media } from "@/components/visual/Media";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { ImgKey } from "@/lib/media";

/**
 * Scroll-driven "zoom parallax": a sticky frame of bio-bitumen images where the
 * centre image scales up to fill the screen while the others spread outward — an
 * immersive reveal as you scroll. Pure framer-motion useScroll (works with the
 * site's Lenis smooth scroll). The 300vh wrapper is the scroll runway.
 *
 * The 1→9× scroll zoom is exactly the kind of vestibular-trigger motion that
 * `prefers-reduced-motion` users opt out of — and the JS-driven `style={{ scale }}`
 * transforms bypass the global CSS reduced-motion block. So reduced-motion users
 * get the same imagery as a calm static montage instead (content kept, motion cut).
 */
/** 7 images, centre-out. Defaults to the bio-bitumen set; pass your own to reuse. */
const DEFAULT_IMAGES: readonly ImgKey[] = ["bioHero", "bio1", "bio0", "bio2", "prod1", "bio3", "prod3"];

export function ZoomParallax({ images = DEFAULT_IMAGES }: { images?: readonly ImgKey[] }) {
  const reduce = usePrefersReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  // Hooks must run unconditionally; the values are simply unused under reduced motion.
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Calm, motion-free fallback — same images, no 300vh runway and no scroll zoom.
  if (reduce) return <ZoomParallaxStatic images={images} />;

  // Fixed centre-out layout; images are slotted in from the prop.
  const layout: { scale: MotionValue<number>; pos: string }[] = [
    { scale: scale4, pos: "w-[25vw] h-[25vh]" },
    { scale: scale5, pos: "top-[-30vh] left-[5vw] w-[35vw] h-[30vh]" },
    { scale: scale6, pos: "top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]" },
    { scale: scale5, pos: "left-[27.5vw] w-[25vw] h-[25vh]" },
    { scale: scale6, pos: "top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]" },
    { scale: scale8, pos: "top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]" },
    { scale: scale9, pos: "top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]" },
  ];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--color-void)]">
        {layout.map(({ scale, pos }, i) => (
          <motion.div
            key={i}
            style={{ scale }}
            className="absolute top-0 flex h-full w-full items-center justify-center"
          >
            <div className={`relative ${pos}`}>
              <Media name={images[i % images.length]} overlay="none" loading="eager" className="absolute inset-0 rounded-md" sizes="100vw" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Static montage shown to `prefers-reduced-motion` users — the same image set as
 * a responsive grid, so the visual content survives without any scroll-zoom.
 */
function ZoomParallaxStatic({ images }: { images: readonly ImgKey[] }) {
  return (
    <div className="bg-[var(--color-void)] px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((name, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Media
              name={name}
              overlay="none"
              className="absolute inset-0"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
