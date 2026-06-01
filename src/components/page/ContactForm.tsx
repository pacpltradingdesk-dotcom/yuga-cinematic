"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { company, waLink } from "@/lib/site";
import { config, hasWeb3Forms } from "@/lib/config";

type Field = "name" | "email" | "phone" | "interest" | "message";

const interests = ["Bio-Bitumen Plant", "Industrial Consulting", "AI Software", "Capital / Fundraising", "Other"];

/**
 * Lead-capture form with DPDP-compliant consent.
 * Submits to Web3Forms (email) when a key is configured; otherwise falls back
 * to a prefilled WhatsApp chat. A required consent checkbox gates submission.
 */
export function ContactForm() {
  const [form, setForm] = useState<Record<Field, string>>({
    name: "",
    email: "",
    phone: "",
    interest: interests[0],
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = (k: Field, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const openWhatsApp = () => {
    const message =
      `New enquiry — ${company.brand}\n` +
      `Name: ${form.name}\n` +
      `Interested in: ${form.interest}\n` +
      (form.phone.trim() ? `Phone: ${form.phone}\n` : "") +
      (form.email.trim() ? `Email: ${form.email}\n` : "") +
      (marketing ? `Marketing opt-in: yes\n` : "") +
      `\n${form.message}`;
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please share your name and a short message.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!consent) {
      setError("Please tick the consent box to continue.");
      return;
    }
    setError("");

    // No backend key → WhatsApp fallback (still validated + consented).
    if (!hasWeb3Forms()) {
      openWhatsApp();
      setSent(true);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: config.web3formsKey,
          subject: `New enquiry (${form.interest}) — ${company.brand}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          phone: form.phone,
          interested_in: form.interest,
          marketing_optin: marketing ? "yes" : "no",
          consent: "yes",
          message: form.message,
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        // graceful: fall back to WhatsApp so the lead is never lost
        openWhatsApp();
        setSent(true);
      }
    } catch {
      openWhatsApp();
      setSent(true);
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass flex flex-col items-center justify-center rounded-3xl p-12 text-center ring-glow"
      >
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-amber)] text-[var(--color-void)]">
          <Check size={26} />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold">Thank you, {form.name.split(" ")[0]}.</h3>
        <p className="mt-2 max-w-sm text-sm text-[var(--color-muted)]">
          {hasWeb3Forms()
            ? "Your enquiry is in — our team will reply within one business day."
            : "We've opened WhatsApp with your enquiry — just hit send and our team will reply within one business day."}
        </p>
      </motion.div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-faint)] focus:border-[var(--color-amber)]";

  return (
    <form onSubmit={submit} className="glass rounded-3xl p-7 sm:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-faint)]">Name</label>
          <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-faint)]">Phone</label>
          <input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 ..." />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-faint)]">Email</label>
          <input className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-faint)]">Interested in</label>
          <select className={inputCls} value={form.interest} onChange={(e) => set("interest", e.target.value)}>
            {interests.map((i) => (
              <option key={i} value={i} className="bg-[var(--color-surface)]">
                {i}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--color-faint)]">Message</label>
          <textarea
            className={`${inputCls} min-h-28 resize-none`}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell us about your plant, capacity or funding need…"
          />
        </div>
      </div>

      {/* DPDP consent — unticked by default, required */}
      <div className="mt-6 grid gap-3">
        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[var(--color-muted)]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-amber)]"
          />
          <span>
            I consent to {company.brand} ({company.legal}) contacting me about my enquiry and storing my details per the{" "}
            <Link href="/legal/privacy-policy" target="_blank" className="text-[var(--color-amber)] underline">
              Privacy Policy
            </Link>
            . I understand any figures shared are indicative.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[var(--color-muted)]">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-amber)]"
          />
          <span>Send me market, subsidy and product updates by WhatsApp/email (optional).</span>
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-[var(--color-amber)]">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        data-cursor="hover"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-deep)] px-7 py-3.5 text-sm font-medium text-[var(--color-void)] ring-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {busy ? "Sending…" : hasWeb3Forms() ? "Send enquiry" : "Send via WhatsApp"} <ArrowRight size={16} />
      </button>
    </form>
  );
}
