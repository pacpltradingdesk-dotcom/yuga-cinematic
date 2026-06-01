import type { Range } from "@/lib/catalog";

/** "₹6–10 Cr" money range (deduped when min === max). */
export function crRange([a, b]: Range): string {
  return a === b ? `₹${a} Cr` : `₹${a}–${b} Cr`;
}

/** "900–1,500" plain range with Indian thousands separators. */
export function numRange([a, b]: Range): string {
  const f = (n: number): string => n.toLocaleString("en-IN");
  return a === b ? f(a) : `${f(a)}–${f(b)}`;
}

/** First integer found in a free-text payback string ("3–5 yr" → 3), else Infinity. */
export function firstNumber(text: string): number {
  const m = text.match(/\d+(\.\d+)?/);
  return m ? Number(m[0]) : Number.POSITIVE_INFINITY;
}
