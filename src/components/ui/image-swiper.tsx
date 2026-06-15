"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import type { GalleryImage } from "@/lib/gallery";

/**
 * Swipeable 3D card-stack gallery (21st.dev "image swiper", adapted):
 * - typed GalleryImage[] instead of a comma-separated URL string
 * - basePath prefix for static export (same rule as visual/Media)
 * - pointercancel/leave end the drag so cards never stick mid-swipe
 * Drag a card left/right past the threshold to send it to the back.
 */
interface ImageSwiperProps {
  images: readonly GalleryImage[];
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

export function ImageSwiper({ images, cardWidth = 340, cardHeight = 240, className = "" }: ImageSwiperProps) {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [cardOrder, setCardOrder] = useState<number[]>(() => Array.from({ length: images.length }, (_, i) => i));

  const getDurationFromCSS = useCallback((variableName: string, element?: HTMLElement | null): number => {
    const value = getComputedStyle(element || document.documentElement)?.getPropertyValue(variableName)?.trim();
    if (!value) return 0;
    if (value.endsWith("ms")) return parseFloat(value);
    if (value.endsWith("s")) return parseFloat(value) * 1000;
    return parseFloat(value) || 0;
  }, []);

  const getCards = useCallback((): HTMLElement[] => {
    if (!cardStackRef.current) return [];
    return [...cardStackRef.current.querySelectorAll(".image-card")] as HTMLElement[];
  }, []);

  const getActiveCard = useCallback((): HTMLElement | null => getCards()[0] || null, [getCards]);

  const updatePositions = useCallback(() => {
    getCards().forEach((card, i) => {
      card.style.setProperty("--i", (i + 1).toString());
      card.style.setProperty("--swipe-x", "0px");
      card.style.setProperty("--swipe-rotate", "0deg");
      card.style.opacity = "1";
    });
  }, [getCards]);

  const applySwipeStyles = useCallback(
    (deltaX: number) => {
      const card = getActiveCard();
      if (!card) return;
      card.style.setProperty("--swipe-x", `${deltaX}px`);
      card.style.setProperty("--swipe-rotate", `${deltaX * 0.2}deg`);
      card.style.opacity = (1 - Math.min(Math.abs(deltaX) / 100, 1) * 0.75).toString();
    },
    [getActiveCard],
  );

  const handleStart = useCallback(
    (clientX: number) => {
      if (isSwiping.current) return;
      isSwiping.current = true;
      startX.current = clientX;
      currentX.current = clientX;
      const card = getActiveCard();
      if (card) card.style.transition = "none";
    },
    [getActiveCard],
  );

  const handleEnd = useCallback(() => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    const deltaX = currentX.current - startX.current;
    const threshold = 50;
    const duration = getDurationFromCSS("--card-swap-duration", cardStackRef.current);
    const card = getActiveCard();

    if (card) {
      card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
      if (Math.abs(deltaX) > threshold) {
        const direction = Math.sign(deltaX);
        card.style.setProperty("--swipe-x", `${direction * 300}px`);
        card.style.setProperty("--swipe-rotate", `${direction * 20}deg`);
        setTimeout(() => {
          if (getActiveCard() === card) card.style.setProperty("--swipe-rotate", `${-direction * 20}deg`);
        }, duration * 0.5);
        setTimeout(() => {
          setCardOrder((prev) => (prev.length === 0 ? [] : [...prev.slice(1), prev[0]]));
        }, duration);
      } else {
        applySwipeStyles(0);
      }
    }
    isSwiping.current = false;
    startX.current = 0;
    currentX.current = 0;
  }, [getDurationFromCSS, getActiveCard, applySwipeStyles]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isSwiping.current) return;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = requestAnimationFrame(() => {
        currentX.current = clientX;
        const deltaX = currentX.current - startX.current;
        applySwipeStyles(deltaX);
        if (Math.abs(deltaX) > 50) handleEnd();
      });
    },
    [applySwipeStyles, handleEnd],
  );

  useEffect(() => {
    const el = cardStackRef.current;
    if (!el) return;
    const down = (e: PointerEvent) => handleStart(e.clientX);
    const move = (e: PointerEvent) => handleMove(e.clientX);
    const up = () => handleEnd();
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerleave", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerleave", up);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    updatePositions();
  }, [cardOrder, updatePositions]);

  return (
    <section
      className={`relative grid select-none place-content-center ${className}`}
      ref={cardStackRef}
      style={
        {
          width: cardWidth + 32,
          height: cardHeight + 48,
          touchAction: "none",
          transformStyle: "preserve-3d",
          "--card-perspective": "700px",
          "--card-z-offset": "12px",
          "--card-y-offset": "7px",
          "--card-max-z-index": images.length.toString(),
          "--card-swap-duration": "0.3s",
        } as React.CSSProperties
      }
    >
      {cardOrder.map((originalIndex, displayIndex) => (
        <article
          key={`${images[originalIndex].src}-${originalIndex}`}
          className="image-card absolute cursor-grab place-self-center overflow-hidden rounded-xl border border-[var(--color-line)] shadow-lg will-change-transform active:cursor-grabbing"
          style={
            {
              "--i": (displayIndex + 1).toString(),
              zIndex: images.length - displayIndex,
              width: cardWidth,
              height: cardHeight,
              transform: `perspective(var(--card-perspective))
                       translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                       translateY(calc(var(--card-y-offset) * var(--i)))
                       translateX(var(--swipe-x, 0px))
                       rotateY(var(--swipe-rotate, 0deg))`,
            } as React.CSSProperties
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- transforms need a plain img */}
          <img
            src={`${base}${images[originalIndex].src}`}
            alt={images[originalIndex].alt}
            className="pointer-events-none h-full w-full select-none object-cover"
            draggable={false}
          />
        </article>
      ))}
    </section>
  );
}
