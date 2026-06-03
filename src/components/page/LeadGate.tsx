"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, ArrowRight, MessageCircle } from "lucide-react";
import { company } from "@/lib/site";
import { hasWeb3Forms } from "@/lib/config";
import { submitLead, leadWaLink, type LeadInput } from "@/lib/leads";
import { cn } from "@/lib/utils";

/**
 * Gated download / request. Renders a CTA button that opens a modal capturing
 * name + phone, emails the lead to the client (Web3Forms), then hands off to a
 * prefilled WhatsApp chat to deliver the document — so a lead is captured even
 * if the visitor never finishes the chat. Reusable across DPR / brochure /
 * research-report CTAs.
 */
interface LeadGateProps {
  /** Button text, e.g. "Request a DPR". */
  readonly label: string;
  /** What's being requested, e.g. "DPR — Bio-Bitumen Plant". */
  readonly interest: string;
  /** Origin context for the lead, e.g. "product:bio-bitumen". */
  readonly source: string;
  readonly variant?: "glow" | "ghost";
  readonly title?: string;
  readonly subtitle?: string;
  readonly icon?: React.ReactNode;
}

export function LeadGate({ label, interest, source, variant = "glow", title, subtitle, icon }: LeadGateProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const reset = () => {
    setName(""); setPhone(""); setEmail(""); setConsent(false);
    setError(""); setDone(false); setBusy(false);
  };
  const close = () => { setOpen(false); reset(); };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Please enter your name.");
    if (!/[0-9]{7,}/.test(phone.replace(/\D/g, ""))) return setError("Please enter a valid phone number.");
    if (email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError("Please enter a valid email (or leave it blank).");
    if (!consent) return setError("Please tick the consent box to continue.");
    setError("");
    setBusy(true);

    const lead: LeadInput = { name, phone, email: email || undefined, interest, source };
    try {
      const result = await submitLead(lead);
      if (result === "whatsapp") window.open(leadWaLink(lead), "_blank", "noopener,noreferrer");
    } catch {
      // hard failure → never lose the lead, hand off to WhatsApp
      window.open(leadWaLink(lead), "_blank", "noopener,noreferrer");
    } finally {
      setBusy(false);
      setDone(true);
    }
  }

  const btnCls =
    variant === "glow"
      ? "bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-deep)] text-[var(--color-void)] ring-glow hover:scale-[1.02]"
      : "border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[color-mix(in_oklch,var(--color-amber)_40%,transparent)]";
  const inputCls =
    "w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-faint)] focus:border-[var(--color-amber)]";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-cursor="hover"
        className={cn("inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-transform", btnCls)}
      >
        {label} {icon ?? <ArrowRight size={16} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-void)]/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative w-full max-w-md rounded-3xl border border-[color-mix(in_oklch,var(--color-amber)_20%,transparent)] p-7 ring-glow"
            >
              <button onClick={close} aria-label="Close" className="absolute right-5 top-5 text-[var(--color-faint)] hover:text-[var(--color-ink)]">
                <X size={20} />
              </button>

              {done ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-amber)] text-[var(--color-void)]">
                    <Check size={26} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">Thanks, {name.split(" ")[0]}!</h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {hasWeb3Forms()
                      ? "Your request is in — our team will send it across and reply within one business day."
                      : "We've opened WhatsApp with your request — just hit send and we'll share it right away."}
                  </p>
                  <a
                    href={leadWaLink({ name, phone, email: email || undefined, interest, source })}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_40%,transparent)]"
                  >
                    <MessageCircle size={15} /> Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{title ?? "Get it on WhatsApp"}</h3>
                  <p className="mt-1.5 text-sm text-[var(--color-muted)]">{subtitle ?? `We'll send you: ${interest}.`}</p>

                  <div className="mt-6 grid gap-3">
                    <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                    <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone / WhatsApp (+91 …)" inputMode="tel" />
                    <input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" inputMode="email" />
                  </div>

                  <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[var(--color-muted)]">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-amber)]" />
                    <span>
                      I agree to {company.brand} contacting me about this request per the{" "}
                      <Link href="/legal/privacy-policy" target="_blank" className="text-[var(--color-amber)] underline">Privacy Policy</Link>. Figures shared are indicative.
                    </span>
                  </label>

                  {error && <p className="mt-3 text-sm text-[var(--color-amber)]">{error}</p>}

                  <button
                    type="submit"
                    disabled={busy}
                    data-cursor="hover"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-deep)] px-7 py-3.5 text-sm font-medium text-[var(--color-void)] ring-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
                  >
                    {busy ? "Sending…" : "Send my request"} <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
