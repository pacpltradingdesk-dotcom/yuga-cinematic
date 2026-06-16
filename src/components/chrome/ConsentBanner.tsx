"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { config } from "@/lib/config";

const KEY = "yuga_consent_v1";
/** Footer "Cookie preferences" dispatches this to reopen the modal. */
export const OPEN_PREFS_EVENT = "yuga:open-cookie-prefs";

interface Consent {
  essential: true;
  analytics: boolean;
  marketing: boolean;
}

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/** Inject GA4 + Clarity once, only when analytics consent is granted and IDs exist. */
let loaded = false;
function loadAnalytics(): void {
  if (loaded) return;
  loaded = true;
  if (config.ga4Id) {
    const g = document.createElement("script");
    g.async = true;
    g.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`;
    document.head.appendChild(g);
    const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer.push(args);
    };
    w.gtag("js", new Date());
    w.gtag("config", config.ga4Id);
  }
  if (config.clarityId) {
    const c = document.createElement("script");
    c.async = true;
    c.src = `https://www.clarity.ms/tag/${config.clarityId}`;
    document.head.appendChild(c);
  }
}

function apply(c: Consent): void {
  if (c.analytics) loadAnalytics();
}

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = read();
    if (existing) {
      apply(existing);
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    } else {
      setShowBanner(true);
    }
    const openPrefs = () => {
      const c = read();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setShowPrefs(true);
    };
    window.addEventListener(OPEN_PREFS_EVENT, openPrefs);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, openPrefs);
  }, []);

  const save = useCallback((c: Consent) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch {
      /* storage blocked — consent simply not persisted */
    }
    apply(c);
    setShowBanner(false);
    setShowPrefs(false);
  }, []);

  const acceptAll = () => save({ essential: true, analytics: true, marketing: true });
  const rejectNonEssential = () => save({ essential: true, analytics: false, marketing: false });
  const savePrefs = () => save({ essential: true, analytics, marketing });

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Cookie consent"
            className="glass fixed inset-x-3 bottom-3 z-[160] mx-auto max-w-md rounded-2xl p-5 ring-glow sm:inset-x-auto sm:left-4 sm:mx-0 sm:max-w-sm"
          >
            <div className="flex items-start gap-3">
              <Cookie size={18} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                We use cookies to operate this site, analyse traffic and improve your experience. Accept all,
                reject non-essential, or set preferences. See our{" "}
                <Link href="/legal/cookie-policy" className="text-[var(--color-amber)] underline">Cookie</Link> and{" "}
                <Link href="/legal/privacy-policy" className="text-[var(--color-amber)] underline">Privacy</Link> policies.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                onClick={acceptAll}
                data-cursor="hover"
                className="rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-deep)] px-5 py-2 text-sm font-medium text-[var(--color-void)] transition-transform hover:scale-[1.03]"
              >
                Accept all
              </button>
              <button
                onClick={rejectNonEssential}
                data-cursor="hover"
                className="rounded-full border border-[var(--color-line)] px-5 py-2 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-raised)]"
              >
                Reject non-essential
              </button>
              <button
                onClick={() => setShowPrefs(true)}
                data-cursor="hover"
                className="rounded-full px-5 py-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                Preferences
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences modal */}
      <AnimatePresence>
        {showPrefs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[170] grid place-items-center bg-[var(--color-void)]/70 p-4 backdrop-blur-sm"
            onClick={() => setShowPrefs(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Cookie preferences"
              className="glass w-full max-w-md rounded-3xl p-7"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold tracking-tight">Cookie preferences</h3>
                <button onClick={() => setShowPrefs(false)} aria-label="Close" data-cursor="hover" className="text-[var(--color-faint)] hover:text-[var(--color-ink)]">
                  <X size={18} />
                </button>
              </div>
              <div className="mt-6 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl border border-[var(--color-line)] p-4">
                  <div>
                    <div className="text-sm font-medium text-[var(--color-ink)]">Essential</div>
                    <div className="text-xs text-[var(--color-faint)]">Required for the site to work</div>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-[var(--color-faint)]">Always on</span>
                </div>
                {[
                  { label: "Analytics", sub: "Google Analytics 4, Microsoft Clarity", val: analytics, set: setAnalytics },
                  { label: "Marketing", sub: "Ads / retargeting (if used)", val: marketing, set: setMarketing },
                ].map((row) => (
                  <button
                    key={row.label}
                    onClick={() => row.set(!row.val)}
                    data-cursor="hover"
                    aria-pressed={row.val}
                    className="flex items-center justify-between rounded-2xl border border-[var(--color-line)] p-4 text-left transition-colors hover:border-[color-mix(in_oklch,var(--color-ink)_18%,transparent)]"
                  >
                    <div>
                      <div className="text-sm font-medium text-[var(--color-ink)]">{row.label}</div>
                      <div className="text-xs text-[var(--color-faint)]">{row.sub}</div>
                    </div>
                    <span
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${row.val ? "bg-[var(--color-amber)]" : "bg-[var(--color-raised)]"}`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-[var(--color-ink)] transition-transform ${row.val ? "translate-x-[1.4rem]" : "translate-x-0.5"}`}
                      />
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={savePrefs}
                data-cursor="hover"
                className="mt-6 w-full rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-deep)] px-6 py-3 text-sm font-medium text-[var(--color-void)] ring-glow transition-transform hover:scale-[1.01]"
              >
                Save preferences
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
