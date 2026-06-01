"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Mail } from "lucide-react";
import { waLink } from "@/lib/site";

/**
 * Market-intel lead magnet. With no backend, a valid email opens a prefilled
 * WhatsApp subscribe request (same no-backend pattern as the contact form).
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    window.open(
      waLink(`Subscribe me to the YUGA monthly bitumen price & subsidy update. Email: ${email}`),
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  if (sent) {
    return (
      <div className="glass flex items-center gap-3 rounded-2xl p-6 ring-glow">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-amber)] text-[var(--color-void)]">
          <Check size={20} />
        </span>
        <p className="text-sm text-[var(--color-muted)]">
          Almost done — just hit send on WhatsApp and you&apos;re on the monthly list.
        </p>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      className="glass rounded-2xl p-6 sm:p-8"
    >
      <div className="flex items-center gap-2 text-[var(--color-amber)]">
        <Mail size={16} />
        <span className="text-xs uppercase tracking-[0.25em]">Monthly market update</span>
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
        Bitumen price &amp; subsidy update — free, monthly.
      </h3>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        Price trends, subsidy changes and tender signals from our 150,000-contact network — straight to you.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="w-full rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-faint)] focus:border-[var(--color-amber)]"
        />
        <button
          type="submit"
          data-cursor="hover"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-amber-deep)] px-6 py-3 text-sm font-medium text-[var(--color-void)] ring-glow transition-transform hover:scale-[1.02]"
        >
          Subscribe <ArrowRight size={15} />
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-[var(--color-amber)]">{error}</p>}
    </motion.form>
  );
}
