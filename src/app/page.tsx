import { Hero } from "@/components/home/Hero";
import { HorizontalStory } from "@/components/home/HorizontalStory";
import { Verticals } from "@/components/home/Verticals";
import { Stats } from "@/components/home/Stats";
import { Founder } from "@/components/home/Founder";
import { CTASection } from "@/components/page/CTASection";
import { NoiseOverlay } from "@/components/visual/Backdrop";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstantTools } from "@/components/tools/InstantTools";

export default function HomePage() {
  return (
    <>
      <NoiseOverlay />
      <Hero />
      <Stats />
      <section className="py-[var(--space-section)]">
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
      <Founder />
      <CTASection
        title="Industrial intelligence, end to end."
        sub="Bio-bitumen plants, AI software and capital - under one accountable partner."
      />
    </>
  );
}
