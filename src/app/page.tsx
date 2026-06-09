import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HorizontalStory } from "@/components/home/HorizontalStory";
import { Verticals } from "@/components/home/Verticals";
import { Stats } from "@/components/home/Stats";
import { Founder } from "@/components/home/Founder";
import { CTASection } from "@/components/page/CTASection";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstantTools } from "@/components/tools/InstantTools";
import { SectionBackdrop } from "@/components/visual/SectionBackdrop";
import { ClientJourney } from "@/components/page/ClientJourney";
import { CarbonStats, CarbonClaim } from "@/components/page/CarbonCredit";
import { PricingTables } from "@/components/page/PricingTables";

export const metadata: Metadata = {
  title: {
    absolute: "Bio-Bitumen Plant PMC, AI Software & Capital Markets in India | YUGA",
  },
  description:
    "YUGA (PPS Anantams) is India's full-service PMC for bio-bitumen, PMB, CRMB & pyrolysis plants — feasibility to commissioning, AI software and seed-to-IPO funding.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bio-Bitumen Plant PMC, AI Software & Capital Markets in India | YUGA",
    description:
      "End-to-end PMC for bio-bitumen, PMB, CRMB & pyrolysis plants — engineered with AI software and funded by real BSE-IPO capital-markets expertise.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <NoiseOverlay />
      <Hero />
      <Stats />
      <section className="relative isolate py-[var(--space-section)]">
        <SectionBackdrop name="pIntel" />
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Answers in 30 seconds"
            title="Find your fit before you call."
            intro="Drag a budget, pick your state, check a subsidy — instant, indicative numbers across all nine plants. No form, no wait."
          />
          <div className="mt-12">
            <InstantTools />
          </div>
        </div>
      </section>
      <HorizontalStory />
      <Verticals />

      {/* Journey with clients */}
      <section className="border-t border-[var(--color-line)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Journey with Clients"
            title="One pipeline, from idea to income."
            intro="Every engagement runs the same disciplined path — we de-risk each stage before the next."
          />
          <div className="mt-12">
            <ClientJourney />
          </div>
        </div>
      </section>

      {/* Carbon credits */}
      <section className="relative isolate border-t border-[var(--color-line)] bg-[var(--color-surface)] py-[var(--space-section)]">
        <SectionBackdrop name="pImpact" />
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Carbon Credits"
            title="An extra revenue stream, certified."
          />
          <div className="mt-10">
            <CarbonStats showIntro />
          </div>
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading eyebrow="Claim Process" title="How carbon credits are earned." />
            <CarbonClaim />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-[var(--color-line)] py-[var(--space-section)]">
        <div className="maxw container-x">
          <SectionHeading
            eyebrow="Transparent Pricing"
            title="Indicative pricing, up front."
            intro="PMC, AI software and capital-markets — minimum to typical. Real numbers depend on scope; here's the range to plan with."
          />
          <div className="mt-12">
            <PricingTables />
          </div>
        </div>
      </section>

      <Founder />
      <CTASection
        title="Industrial intelligence, end to end."
        sub="Bio-bitumen plants, AI software and capital - under one accountable partner."
      />
    </>
  );
}
