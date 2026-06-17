"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { GalleryImage } from "@/lib/gallery";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Shared fullscreen image lightbox for the plant galleries.
 *
 * Controlled — the parent owns the open index (`null` = closed) so any gallery
 * can opt in with a few lines. Keyboard (Esc / ← / →), backdrop click and the
 * on-screen controls navigate or close; body scroll is locked while open and
 * motion respects prefers-reduced-motion. Rendered through a portal so it
 * escapes transformed / overflow-hidden gallery containers.
 */
export function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: readonly GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const reduce = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const open = index !== null && index >= 0 && index < images.length;

  const go = useCallback(
    (dir: number) => {
      if (index === null || images.length === 0) return;
      onNavigate((index + dir + images.length) % images.length);
    },
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, go, onClose]);

  if (!mounted) return null;
  const current = open ? images[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[var(--color-void)]/95 backdrop-blur-sm"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="absolute left-1/2 top-5 -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">
            {index + 1} / {images.length}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-4 top-4 grid h-11 w-11 place-content-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/70 text-[var(--color-ink)] transition hover:bg-[var(--color-raised)]"
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-content-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/70 text-[var(--color-ink)] transition hover:bg-[var(--color-raised)] sm:left-6"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-content-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/70 text-[var(--color-ink)] transition hover:bg-[var(--color-raised)] sm:right-6"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <motion.figure
            key={current.src}
            className="mx-4 flex max-h-[88vh] max-w-[92vw] flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- fullscreen dynamic view, not a layout image */}
            <img
              src={`${BASE}${current.src}`}
              alt={current.alt}
              className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="max-w-2xl text-center text-sm text-[var(--color-muted)]">
              {current.alt}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
