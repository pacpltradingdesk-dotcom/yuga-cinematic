"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { company } from "@/lib/site";
import { navGroups } from "@/lib/nav";
import { YugaMark } from "@/components/ui/YugaMark";
import { cn } from "@/lib/utils";

/** A group is "active" when the current route matches one of its links (ignoring #hash). */
function groupIsActive(pathname: string, hrefs: readonly string[]): boolean {
  return hrefs.some((h) => {
    const base = h.split("#")[0];
    return base !== "/" && pathname === base;
  });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile overlay
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // desktop dropdown
  const [expanded, setExpanded] = useState<string | null>(null); // mobile accordion
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change.
  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
    setExpanded(null);
  }, [pathname]);

  // Escape closes the open desktop menu / mobile overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[130] transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div
          className={cn(
            "maxw container-x flex items-center justify-between rounded-2xl transition-all duration-500",
            scrolled && "glass mx-3 px-5 py-3 md:mx-auto",
          )}
        >
          <Link href="/" className="group relative z-10 flex items-center gap-2.5" data-cursor="hover">
            <YugaMark className="h-7 w-auto transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink)]">{company.brand}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.25em] text-[var(--color-faint)] sm:inline">
                {company.short}
              </span>
            </span>
          </Link>

          {/* Desktop mega-menu */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navGroups.map((g) => {
              const active = groupIsActive(pathname, g.items.map((i) => i.href));
              const isOpen = activeMenu === g.label;
              return (
                <div
                  key={g.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(g.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setActiveMenu(null);
                  }}
                >
                  <button
                    type="button"
                    data-cursor="hover"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => setActiveMenu((m) => (m === g.label ? null : g.label))}
                    onFocus={() => setActiveMenu(g.label)}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors",
                      active || isOpen ? "text-[var(--color-ink)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                    )}
                  >
                    {(active || isOpen) && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-[var(--color-raised)] ring-1 ring-[var(--color-line)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {g.label}
                    <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        role="menu"
                        aria-label={g.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className="glass absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-[var(--color-line)] p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
                      >
                        <p className="px-3 pb-2 pt-2 text-xs leading-relaxed text-[var(--color-faint)]">{g.blurb}</p>
                        {g.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            data-cursor="hover"
                            onClick={() => setActiveMenu(null)}
                            className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--color-raised)]"
                          >
                            <span className="block text-sm font-medium text-[var(--color-ink)]">{item.label}</span>
                            <span className="block text-xs text-[var(--color-muted)]">{item.desc}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              data-cursor="hover"
              className="hidden rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-void)] transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Free Consultation
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 grid h-11 w-11 place-items-center rounded-full ring-1 ring-[var(--color-line)] lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              data-cursor="hover"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay — accordion grouped by vertical */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] overflow-y-auto bg-[var(--color-void)]/97 backdrop-blur-xl lg:hidden"
          >
            <nav className="container-x flex min-h-full flex-col gap-1 pb-12 pt-24">
              {navGroups.map((g, gi) => {
                const isExpanded = expanded === g.label;
                return (
                  <motion.div
                    key={g.label}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * gi }}
                    className="border-b border-[var(--color-line)]"
                  >
                    <button
                      type="button"
                      onClick={() => setExpanded((e) => (e === g.label ? null : g.label))}
                      aria-expanded={isExpanded}
                      className="flex w-full items-center justify-between py-4 text-left"
                    >
                      <span className="font-display text-2xl font-medium text-[var(--color-ink)]">{g.label}</span>
                      <ChevronDown size={20} className={cn("text-[var(--color-faint)] transition-transform", isExpanded && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-1 pb-3">
                            {g.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-xl px-3 py-2.5 text-base text-[var(--color-muted)] transition-colors hover:bg-[var(--color-raised)] hover:text-[var(--color-ink)]"
                              >
                                <span className="block font-medium text-[var(--color-ink)]">{item.label}</span>
                                <span className="block text-xs text-[var(--color-faint)]">{item.desc}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              <Link
                href="/contact"
                className="mt-6 inline-flex w-fit rounded-full bg-[var(--color-amber)] px-6 py-3 font-medium text-[var(--color-void)]"
              >
                Free Consultation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
