"use client";

import { cn } from "@/lib/utils";

/** Infinite CSS marquee (duplicated track). GPU-friendly, no JS loop. */
export function Marquee({
  children,
  className,
  duration = 28,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("group flex w-full overflow-hidden whitespace-nowrap", className)}>
      <div
        className="flex shrink-0 animate-[marquee_linear_infinite] items-center"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {children}
        {children}
      </div>
      <style jsx global>{`
        @keyframes marquee {
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
