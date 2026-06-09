"use client";

import Link from "next/link";
import { ArrowUpRight, Linkedin, Youtube, Instagram, Facebook, Twitter, MessageCircle, type LucideIcon } from "lucide-react";
import { company, nav, socials } from "@/lib/site";
import { Marquee } from "@/components/ui/Marquee";
import { YugaMark } from "@/components/ui/YugaMark";
import { legalDocs, GRIEVANCE_OFFICER } from "@/lib/legal";
import { CookiePrefsButton } from "@/components/chrome/CookiePrefsButton";

const SOCIAL_ICON: Record<string, LucideIcon> = {
  whatsapp: MessageCircle,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
  x: Twitter,
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-surface)] grain">
      <Marquee className="border-b border-[var(--color-line)] py-6 text-[clamp(2rem,6vw,5rem)] font-display font-semibold text-[var(--color-raised)]">
        VISION&nbsp;·&nbsp;STRATEGY&nbsp;·&nbsp;EXECUTION&nbsp;·&nbsp;
      </Marquee>

      <div className="maxw container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <YugaMark className="h-10 w-auto" />
            <div className="font-display text-3xl font-bold text-[var(--color-ink)]">{company.brand}</div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
            {company.legal} - PMC brand YUGA. {company.oneLiner}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-wider text-[var(--color-faint)]">
            <span className="rounded-full border border-[var(--color-line)] px-3 py-1">CIN {company.cin}</span>
            <span className="rounded-full border border-[var(--color-line)] px-3 py-1">GST {company.gst}</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Explore</h4>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="hover"
                  className="group inline-flex items-center gap-1 py-1 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {item.label}
                  <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">Connect</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-muted)]">
            {company.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/\s/g, "")}`} data-cursor="hover" className="inline-flex py-1 hover:text-[var(--color-ink)]">
                  {p}
                </a>
              </li>
            ))}
            {company.emails.map((e) => (
              <li key={e}>
                <a href={`mailto:${e}`} data-cursor="hover" className="inline-flex py-1 hover:text-[var(--color-ink)]">
                  {e}
                </a>
              </li>
            ))}
          </ul>

          {/* Social / messaging */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {socials.map((s) => {
              const Icon = SOCIAL_ICON[s.icon] ?? ArrowUpRight;
              const disabled = s.href === "#";
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  data-cursor="hover"
                  target={disabled ? undefined : "_blank"}
                  rel={disabled ? undefined : "noopener noreferrer"}
                  aria-disabled={disabled}
                  className={`grid h-11 w-11 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] transition-colors hover:border-[color-mix(in_oklch,var(--color-amber)_45%,transparent)] hover:text-[var(--color-amber)] ${
                    disabled ? "pointer-events-none opacity-40" : ""
                  }`}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legal / compliance */}
      <div className="maxw container-x border-t border-[var(--color-line)] py-6">
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--color-faint)]">
          {legalDocs.map((d) => (
            <Link key={d.slug} href={`/legal/${d.slug}`} data-cursor="hover" className="inline-flex items-center py-1 transition-colors hover:text-[var(--color-ink)]">
              {d.title}
            </Link>
          ))}
          <CookiePrefsButton className="inline-flex items-center py-1 transition-colors hover:text-[var(--color-ink)]" />
        </nav>
        <p className="mt-3 text-xs leading-relaxed text-[var(--color-faint)]">
          Grievance Officer: {GRIEVANCE_OFFICER} ·{" "}
          <a href={`mailto:${company.emails[1]}`} className="hover:text-[var(--color-ink)]">{company.emails[1]}</a>
        </p>
      </div>

      <div className="maxw container-x flex flex-col gap-2 border-t border-[var(--color-line)] py-6 text-xs text-[var(--color-faint)] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {company.legal}. All rights reserved.</span>
        <span>
          {company.founder} - {company.founderTitle}
        </span>
      </div>
    </footer>
  );
}
