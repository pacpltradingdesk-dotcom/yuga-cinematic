import Image from "next/image";
import { Linkedin, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { leadership } from "@/lib/team";

/**
 * Leadership cards — layout-only. Reads src/lib/team.ts and renders each member.
 * One member today (the founder); becomes a multi-person grid automatically when
 * real team members are added to the data module. Shows a photo when present,
 * else an initials monogram (no broken image).
 */
export function Leadership() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {leadership.map((m, i) => (
        <Reveal key={m.name} index={i % 3}>
          <article className="flex h-full flex-col rounded-3xl border border-[var(--color-line)] p-7">
            <div className="flex items-center gap-4">
              {m.photo ? (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-[var(--color-line)]">
                  <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="64px" className="object-cover" />
                </div>
              ) : (
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-[var(--color-line)] bg-[var(--color-raised)] font-display text-base font-bold text-gradient-warm ring-glow">
                  {m.initials}
                </div>
              )}
              <div>
                <h3 className="font-display text-lg font-semibold leading-tight tracking-tight">{m.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-amber)]">{m.role}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[var(--color-muted)]">{m.bio}</p>

            <ul className="mt-5 grid gap-2">
              {m.credentials.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                  <BadgeCheck size={15} className="mt-0.5 shrink-0 text-[var(--color-amber)]" />
                  {c}
                </li>
              ))}
            </ul>

            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-amber)]"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}
