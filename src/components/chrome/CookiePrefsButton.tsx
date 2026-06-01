"use client";

import { OPEN_PREFS_EVENT } from "@/components/chrome/ConsentBanner";

/** Footer trigger to reopen the cookie preferences modal. */
export function CookiePrefsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      data-cursor="hover"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFS_EVENT))}
      className={className}
    >
      Cookie preferences
    </button>
  );
}
