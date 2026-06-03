"use client";

import { useEffect, useRef } from "react";

/**
 * Live market ticker via TradingView's free ticker-tape embed (no API key).
 * Client-side only, so it works under static export. Shows crude/Brent/USD-INR/
 * gold + Nifty/BankNifty in our dark theme. Degrades to nothing if the embed is
 * blocked (e.g. offline / strict CSP) — never breaks the layout.
 */
// Energy + FX + metals — all reliably resolve in TradingView's free embed and
// are on-theme for a petroleum-products (bitumen) + capital-markets business.
// (NSE index symbols were dropped: the free ticker-tape embed can't serve live
// Indian-index data and rendered a red "invalid symbol" badge.)
const SYMBOLS = [
  { proName: "TVC:USOIL", title: "Crude (WTI)" },
  { proName: "TVC:UKOIL", title: "Brent" },
  { proName: "FX_IDC:USDINR", title: "USD-INR" },
  { proName: "TVC:GOLD", title: "Gold" },
  { proName: "TVC:SILVER", title: "Silver" },
  { proName: "FX:EURUSD", title: "EUR-USD" },
];

export function MarketTicker() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.replaceChildren();
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    el.appendChild(widget);
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    // TradingView reads its config from the script's text content (static, no user input).
    script.text = JSON.stringify({
      symbols: SYMBOLS,
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    });
    el.appendChild(script);
    return () => {
      el.replaceChildren();
    };
  }, []);

  return (
    <div className="border-y border-[var(--color-line)] bg-[var(--color-surface)]">
      <div ref={ref} className="tradingview-widget-container maxw" aria-label="Live market prices" />
    </div>
  );
}
