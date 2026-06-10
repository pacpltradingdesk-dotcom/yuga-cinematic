"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import { Media } from "@/components/visual/Media";
import type { ImgKey } from "@/lib/media";

/**
 * Scroll-driven "zoom parallax": a sticky frame of bio-bitumen images where the
 * centre image scales up to fill the screen while the others spread outward — an
 * immersive reveal as you scroll. Pure framer-motion useScroll (works with the
 * site's Lenis smooth scroll). The 300vh wrapper is the scroll runway.
 */
/** 7 images, centre-out. Defaults to the bio-bitumen set; pass your own to reuse. */
const DEFAULT_IMAGES: readonly ImgKey[] = ["bioHero", "bio1", "bio0", "bio2", "prod1", "bio3", "prod3"];

export function ZoomParallax({ images = DEFAULT_IMAGES }: { images?: readonly ImgKey[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

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
              <Media name={images[i % images.length]} overlay="none" className="absolute inset-0 rounded-md" sizes="60vw" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
