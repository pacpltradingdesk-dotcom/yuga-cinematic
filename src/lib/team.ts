/**
 * Leadership / team — single source of truth for the people behind YUGA.
 * Layout-only components (Leadership.tsx) read this; never hardcode a person
 * in a component.
 *
 * Only the founder is real and verified today. To add a real team member,
 * copy the founder block below and fill in genuine details — do NOT invent
 * people. When a second member is added, the Leadership grid renders a team
 * automatically (no component change).
 */
import { company } from "@/lib/site";

export interface LeadershipMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  /** Short credibility points — qualifications, track record. */
  readonly credentials: readonly string[];
  /** Portrait path under public/ (e.g. "/assets/img/founder.jpg"), or null for an initials monogram. */
  readonly photo: string | null;
  /** Monogram shown when `photo` is null. */
  readonly initials: string;
  /** Full profile URL (LinkedIn), optional. */
  readonly linkedin?: string;
}

export const leadership: readonly LeadershipMember[] = [
  {
    name: company.founder,
    role: company.founderTitle,
    bio: "A 25-year bitumen-industry veteran and MCA-registered company director who has personally commissioned 9 plants. Founder of a BSE-listed bitumen company (IPO 2020) — 3 plants, 11 joint ventures and 1.2 Lakh MT annual trading — bringing rare first-hand listing and fundraising experience to every engagement.",
    credentials: [
      "25+ years in bitumen, since 2001",
      "Founder of a BSE-listed bitumen company — IPO 2020",
      "9 plants personally commissioned across India",
      "MBA, Marketing & Finance",
      "Pride of India Icon 2021 — Best Fast-Growing Business",
    ],
    // Reuses the same drop-in flag as the homepage: set company.founderPhoto
    // (in lib/site.ts) once the real photo is added to public/assets/img/.
    photo: company.founderPhoto,
    initials: "PPS",
    linkedin: `https://${company.linkedin}`,
  },
  // --- Add real team members below (copy the block above). Do not invent people. ---
];
