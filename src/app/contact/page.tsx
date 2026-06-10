import type { Metadata } from "next";
import { Phone, Mail, Globe, MonitorSmartphone, MessageCircle, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/page/ContactForm";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { company, waLink, businessHours, mapsEmbedUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description:
    "Talk to YUGA / PPS Anantams about bio-bitumen plants, AI software or capital. Offices in Vadodara and Mumbai.",
};

export default function ContactPage() {
  return (
    <>
      <NoiseOverlay />
      <PageHero
        eyebrow="Contact"
        title="Let's build the future of infrastructure."
        intro="Whether you're planning a plant, evaluating software, or raising capital - start the conversation. We respond within one business day."
        accent="amber"
        image="contactHero"
      />

      <section className="pb-[var(--space-section)] pt-4">
        <div className="maxw container-x grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Details */}
          <div className="grid content-start gap-5">
            <Reveal>
              <div className="rounded-3xl border border-[var(--color-line)] p-7">
                <h3 className="font-display text-lg font-semibold">{company.founder}</h3>
                <p className="text-sm text-[var(--color-amber)]">{company.founderTitle}</p>
                <div className="mt-6 space-y-3 text-sm">
                  {company.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      data-cursor="hover"
                      className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    >
                      <Phone size={15} className="text-[var(--color-amber)]" /> {p}
                    </a>
                  ))}
                  <a
                    href={waLink("Hi YUGA, I'd like to discuss a project.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  >
                    <MessageCircle size={15} className="text-[var(--color-amber)]" /> Chat on WhatsApp
                  </a>
                  {company.emails.map((e) => (
                    <a
                      key={e}
                      href={`mailto:${e}`}
                      data-cursor="hover"
                      className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    >
                      <Mail size={15} className="text-[var(--color-amber)]" /> {e}
                    </a>
                  ))}
                  <a
                    href={`https://${company.web}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  >
                    <Globe size={15} className="text-[var(--color-amber)]" /> {company.web}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal index={2}>
              <div className="rounded-3xl border border-[var(--color-line)] p-7">
                <MonitorSmartphone size={18} className="text-[var(--color-cyan)]" />
                <h4 className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">Software Access</h4>
                <div className="mt-3 flex flex-col gap-2 text-sm">
                  <a href={`https://${company.apps.crm}`} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">
                    CRM · {company.apps.crm}
                  </a>
                  <a href={`https://${company.apps.whatsapp}`} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">
                    WhatsApp · {company.apps.whatsapp}
                  </a>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-5 text-[11px] uppercase tracking-wider text-[var(--color-faint)]">
                  <span>CIN {company.cin}</span>
                  <span>·</span>
                  <span>GST {company.gst}</span>
                </div>
              </div>
            </Reveal>

            {/* Offices + business hours */}
            <Reveal index={3}>
              <div className="rounded-3xl border border-[var(--color-line)] p-7">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <MapPin size={18} className="text-[var(--color-amber)]" />
                    <h4 className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">Offices</h4>
                    <div className="mt-3 space-y-4 text-sm">
                      {company.offices.map((o) => (
                        <div key={o.label}>
                          <div className="font-medium text-[var(--color-ink)]">{o.label}</div>
                          <div className="mt-1 text-[var(--color-muted)]">{o.city}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Clock size={18} className="text-[var(--color-cyan)]" />
                    <h4 className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--color-faint)]">Business Hours</h4>
                    <dl className="mt-3 space-y-2.5 text-sm">
                      {businessHours.map((h) => (
                        <div key={h.days} className="flex items-baseline justify-between gap-4">
                          <dt className="text-[var(--color-muted)]">{h.days}</dt>
                          <dd className={h.opens ? "text-[var(--color-ink)]" : "text-[var(--color-faint)]"}>{h.hours}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 text-xs leading-relaxed text-[var(--color-faint)]">
                      IST · we reply to enquiries within one business day.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal index={1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Registered office map */}
      <section className="pb-[var(--space-section)]">
        <div className="maxw container-x">
          <div className="mb-5 flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <MapPin size={15} className="text-[var(--color-amber)]" />
            <span>{company.offices[0].label} — {company.offices[0].city}</span>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[var(--color-line)]">
            <iframe
              src={mapsEmbedUrl}
              title={`${company.brand} — ${company.offices[0].city}`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, display: "block", filter: "grayscale(0.2) contrast(1.05)" }}
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
