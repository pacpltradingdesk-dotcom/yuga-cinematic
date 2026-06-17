"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Site-wide motion policy — single source of truth.
 *
 * The brand wants the full visual experience (zoom-parallax, smooth scroll, custom
 * cursor, preloader intro, particle field, ken-burns) to show for EVERY visitor,
 * regardless of the operating system's "reduce motion" accessibility setting.
 *
 * So by default motion is forced ON. Flip this single flag to `false` to restore
 * OS-driven reduced motion everywhere (JS effects + the global CSS block, which
 * also reads the OS setting directly).
 */
export const FORCE_MOTION = true;

/**
 * Drop-in replacement for framer-motion's `useReducedMotion` that honours
 * {@link FORCE_MOTION}. Returns `false` (i.e. "do animate") whenever motion is
 * forced on; otherwise defers to the OS preference.
 */
export function usePrefersReducedMotion(): boolean {
  const reduce = useReducedMotion();
  return FORCE_MOTION ? false : Boolean(reduce);
}

/**
 * Non-hook variant for canvas / effect / event code that checks the preference
 * imperatively via `matchMedia`. Honours {@link FORCE_MOTION} the same way.
 */
export function prefersReducedMotion(): boolean {
  if (FORCE_MOTION) return false;
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
