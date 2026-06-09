"use client";

import { useState, type ReactNode, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ToolTab {
  key: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
  render: () => ReactNode;
}

/**
 * Generic tabbed tool container: one tool visible at a time with an animated
 * pill. `layoutId` must be unique per instance on a page so multiple tab bars
 * don't share the same shared-layout animation.
 */
export function ToolTabs({ tabs, layoutId }: { tabs: ToolTab[]; layoutId: string }) {
  const [active, setActive] = useState(tabs[0].key);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              data-cursor="hover"
              aria-pressed={on}
              className={cn(
                "relative isolate inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-3 text-sm transition-colors",
                on ? "text-[var(--color-void)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
              )}
            >
              {on && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-deep)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <t.icon size={15} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {tabs.find((t) => t.key === active)?.render()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
