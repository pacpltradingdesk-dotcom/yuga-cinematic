/**
 * Legal & DPDP page content (India — DPDP Act 2023, IT Act 2000, Contract Act
 * 1872). Drafted from the package's finalised legal pack — the data fiduciary is
 * identified by entity name, CIN, GST, email and phone. (The full registered
 * address now lives in `site.ts` and can be added here too if legal prefers.)
 * Confirm with a company secretary and set the effective date before public launch.
 */
import { company } from "@/lib/site";

export const GRIEVANCE_OFFICER = company.founder; // Prince Pratap Shah (default per pack)
export const EFFECTIVE_DATE = "1 June 2026";

/**
 * Short, site-wide legal line rendered as visible text in the footer (appears on
 * every page) so the disclaimer is "clear & conspicuous", not just linked.
 */
export const FOOTER_DISCLAIMER = `Information on this site is indicative and for general guidance only — not investment, legal, tax or financial advice, and not a solicitation of securities. Regulated or certified work is carried out through duly authorised, licensed or certified professionals as required by law.`;
const LEGAL_EMAIL = "princeshah@yuga-pmc.in";
const LEGAL_PHONE = company.phones[0];

export interface LegalSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface LegalDoc {
  readonly slug: string;
  readonly title: string;
  readonly intro: string;
  readonly sections: readonly LegalSection[];
}

const ENTITY = `${company.legal} ("PACPL", "YUGA", "we", "us", "our"), CIN ${company.cin}, GST ${company.gst}`;

export const legalDocs: readonly LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    intro: `Effective from ${EFFECTIVE_DATE}. How YUGA collects, uses and protects your personal data under the Digital Personal Data Protection Act, 2023.`,
    sections: [
      {
        heading: "1. Who we are",
        paragraphs: [
          `This website is operated by ${ENTITY}. We are the Data Fiduciary for personal data collected through this website under the Digital Personal Data Protection Act, 2023 ("DPDP Act").`,
        ],
      },
      {
        heading: "2. Personal data we collect",
        paragraphs: [
          "You provide: name, phone/WhatsApp number, email, company name, state/city, project type, investment range, land/feedstock status, and any message or documents you submit via forms, the chatbot, WhatsApp or calls.",
          "Collected automatically: IP address, device/browser type, pages visited, tools used and time on site (via cookies/analytics — see our Cookie Policy).",
        ],
      },
      {
        heading: "3. Why we process it",
        paragraphs: [
          "To (i) respond to your enquiry; (ii) prepare feasibility studies, DPRs, quotes and proposals; (iii) provide consulting, fundraising-support and software services; (iv) send you updates/market information only if you opt in; (v) improve our website and services; and (vi) comply with law. We process your data only for these stated purposes.",
        ],
      },
      {
        heading: "4. Lawful basis — consent",
        paragraphs: [
          "We process your personal data on the basis of your free, specific, informed, unconditional and unambiguous consent, given when you submit a form, start a chat, or tick a consent box. We do not use pre-ticked boxes or bundled consent. Where applicable, we may also process data for legitimate uses permitted under the DPDP Act.",
        ],
      },
      {
        heading: "5. Sharing & disclosure",
        paragraphs: [
          "We do not sell your personal data. We share it only with (a) Data Processors acting on our behalf under confidentiality (e.g. CRM, email, hosting, analytics, payment and WhatsApp providers), and (b) authorities where required by law. Some providers may process data outside India in line with applicable law.",
        ],
      },
      {
        heading: "6. Retention",
        paragraphs: [
          "We keep personal data only as long as necessary for the purpose collected or as required by law, after which it is deleted or anonymised. Enquiry data is typically retained for 24 months unless you request earlier erasure.",
        ],
      },
      {
        heading: "7. Security",
        paragraphs: [
          "We apply reasonable technical and organisational safeguards — access controls, encryption in transit, and restricted, role-based access. In the event of a personal-data breach, we will notify the Data Protection Board and affected users within the prescribed timeframe.",
        ],
      },
      {
        heading: "8. Your rights (DPDP Act)",
        paragraphs: [
          "You have the right to (a) access a summary of your personal data and processing; (b) correction, completion, updating and erasure; (c) grievance redressal; and (d) nominate another individual to exercise your rights. To exercise any right, contact our Grievance Officer (§10). We respond within a reasonable period (target 7 working days).",
        ],
      },
      {
        heading: "9. Withdraw consent",
        paragraphs: [
          "You may withdraw consent at any time by emailing the Grievance Officer or using the unsubscribe link in our messages. Withdrawal does not affect processing done before withdrawal; we will then stop further processing unless law requires retention.",
        ],
      },
      {
        heading: "10. Grievance Officer",
        paragraphs: [
          `${GRIEVANCE_OFFICER}, ${company.legal}. Email: ${LEGAL_EMAIL} · Phone: ${LEGAL_PHONE}. If unsatisfied, you may approach the Data Protection Board of India.`,
        ],
      },
      {
        heading: "11. Children",
        paragraphs: [
          "We do not knowingly process the personal data of children (under 18) without verifiable parental/guardian consent, and we do not undertake tracking or targeted advertising directed at children.",
        ],
      },
      {
        heading: "12. Changes",
        paragraphs: ['We may update this Policy; the "Effective from" date will reflect the latest version.'],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    intro: "How we use cookies, and how you control them. Analytics and marketing scripts load only after you consent.",
    sections: [
      {
        heading: "Your choice",
        paragraphs: [
          "On your first visit we show a banner: you can Accept all, Reject non-essential, or set Preferences. You can change your choice anytime via the “Cookie preferences” link in the footer.",
        ],
      },
      {
        heading: "Cookie categories",
        paragraphs: [
          "Essential (always on) — required for site function and security.",
          "Analytics — Google Analytics 4 and Microsoft Clarity, to understand traffic and improve the site.",
          "Marketing — only if/when used.",
          "Analytics and Marketing scripts load only after you consent, and never before.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    intro: `Effective from ${EFFECTIVE_DATE}. The terms on which you may use this website and our services.`,
    sections: [
      {
        heading: "1. Acceptance",
        paragraphs: [
          "By accessing or using this website you agree to these Terms, the Privacy Policy and Disclaimer. If you do not agree, do not use the site.",
        ],
      },
      {
        heading: "2. About our services",
        paragraphs: [
          "YUGA (PACPL) provides project-management consultancy (PMC), fundraising/capital support and subscription software, as described on the site. Website content is informational and does not create a client relationship until a written engagement is signed.",
        ],
      },
      {
        heading: "3. Indicative figures",
        paragraphs: [
          "All cost, capacity, output, revenue, margin, profit, payback, area and subsidy figures on the site are indicative, for preliminary planning only, and are not a guarantee of returns, savings or approval. Final figures require a project-specific feasibility study / DPR.",
        ],
      },
      {
        heading: "4. No funding/approval guarantee",
        paragraphs: [
          "Funding, subsidy, loan and investment outcomes depend on eligibility, documentation, credit/lender/investor evaluation, due diligence, market conditions and regulatory requirements. We support preparation, strategy and process; we do not guarantee sanction, grant or investment.",
        ],
      },
      {
        heading: "5. No securities advice",
        paragraphs: [
          "We do not provide securities-market investment advice, research recommendations, or regulated intermediary services. Such activities require SEBI-registered professionals; engage them separately.",
        ],
      },
      {
        heading: "6. Acceptable use",
        paragraphs: [
          "You will not misuse the site, attempt unauthorised access, upload unlawful/harmful content, or infringe rights.",
        ],
      },
      {
        heading: "7. Intellectual property",
        paragraphs: [
          `All site content, tools, calculators, reports and trademarks (including "YUGA") are owned by ${company.legal}; do not copy, reproduce or distribute without written permission.`,
        ],
      },
      {
        heading: "8. Third-party links/tools",
        paragraphs: ["We are not responsible for third-party websites or services linked from our site."],
      },
      {
        heading: "9. Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, we are not liable for any indirect or consequential loss, or for decisions taken solely on the basis of indicative website information.",
        ],
      },
      {
        heading: "10. General",
        paragraphs: ["Force majeure, severability, no waiver and entire-agreement provisions apply."],
      },
      {
        heading: "11. Governing law & jurisdiction",
        paragraphs: [
          "Indian law (including the Indian Contract Act 1872 and IT Act 2000) governs these Terms; the courts at Vadodara, Gujarat have exclusive jurisdiction.",
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    intro: `Effective from ${EFFECTIVE_DATE}. Please read this alongside our Terms of Use.`,
    sections: [
      {
        heading: "Nature of our services",
        paragraphs: [
          `${company.legal} ("YUGA") provides project-management, engineering and business consulting and documentation services only. YUGA is not registered with SEBI as an Investment Adviser, Research Analyst or Merchant Banker, and does not provide securities, investment, trading or portfolio advice.`,
          "Where any service requires a statutory licence, registration or professional certification — including SEBI-registered intermediaries, Chartered Accountants, registered valuers, merchant bankers, or licensed/chartered engineers — that work is performed by or through duly authorised and certified professionals engaged for that purpose. YUGA does not itself undertake activities requiring registrations it does not hold.",
        ],
      },
      {
        heading: "Indicative figures & no advice",
        paragraphs: [
          "All project costs, capacity, output, revenue, margin, profit, payback, area and subsidy figures on this website are indicative and for preliminary planning only — not a guarantee of returns or approval.",
          "Final numbers depend on feedstock, location, plant design, buyer price, pollution-control requirements, bank terms, taxes, working capital and current government policy, and are provided only after a feasibility study or DPR.",
          "Business claims, track-record numbers and partnerships are indicative and subject to verification. Nothing on this site is investment, legal or tax advice.",
        ],
      },
      {
        heading: "Subsidies, loans & funding",
        paragraphs: [
          "We assist with documentation and applications only. Sanction of any loan or subsidy is at the sole discretion of the lender or government. No approval, rate or amount is guaranteed, and scheme rules change — verify current eligibility on the official portal before relying on it.",
        ],
      },
      {
        heading: "Regulatory approvals",
        paragraphs: [
          "Setting up a plant requires statutory approvals (e.g. CPCB / State PCB consent, and factory, fire, electrical and PESO licences). These rest solely with the authorities. Tyre and plastic pyrolysis units must comply with the applicable CPCB SOP. We support the filings; we do not guarantee any clearance.",
        ],
      },
      {
        heading: "Carbon credits",
        paragraphs: [
          "Carbon-credit eligibility, methodology approval, volume and price are not guaranteed and depend on the registry/scheme. Any carbon figures shown are illustrative, not assured revenue.",
        ],
      },
      {
        heading: "Software & AI products",
        paragraphs: [
          "Our software and AI tools (including the site assistant) are provided without any uptime, performance or result guarantee except as expressly set out in a signed agreement. AI-generated answers may contain errors and should be verified with our team before you rely on them.",
        ],
      },
      {
        heading: "No securities or trading advice",
        paragraphs: [
          "Nothing on this site is investment advice or a solicitation of securities. Capital-markets content is general information only. Paid trading or investment advice in India requires SEBI registration.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, YUGA is not liable for any indirect or consequential loss, or for decisions taken on the basis of indicative information on this website.",
        ],
      },
      {
        heading: "Governing law & jurisdiction",
        paragraphs: [
          "This Disclaimer is governed by the laws of India; the courts at Vadodara, Gujarat have exclusive jurisdiction.",
        ],
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund & Engagement Terms",
    intro: "How fees, refunds and cancellations work for our consulting and software services.",
    sections: [
      {
        heading: "1. Consulting / PMC engagements",
        paragraphs: [
          "These are governed by a signed proposal/engagement letter that sets out scope, fees, milestones, timelines and refund terms; those terms prevail.",
        ],
      },
      {
        heading: "2. Advance / retainer fees",
        paragraphs: [
          "Advance and retainer fees are non-refundable once work has commenced, except as expressly stated in the engagement letter.",
        ],
      },
      {
        heading: "3. Software subscriptions",
        paragraphs: [
          `Billing cycle, renewal, cancellation notice and any refund window are stated at purchase. GST is charged as applicable (GSTIN ${company.gst}); invoices are issued for each payment.`,
        ],
      },
      {
        heading: "4. Cancellations",
        paragraphs: [`Cancellations must be requested in writing to ${LEGAL_EMAIL}.`],
      },
    ],
  },
];

export const legalSlugs: readonly string[] = legalDocs.map((d) => d.slug);

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((d) => d.slug === slug);
}
