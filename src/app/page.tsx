import { Hero } from "@/components/home/Hero";
import { HorizontalStory } from "@/components/home/HorizontalStory";
import { Verticals } from "@/components/home/Verticals";
import { Stats } from "@/components/home/Stats";
import { Founder } from "@/components/home/Founder";
import { CTASection } from "@/components/page/CTASection";
import { NoiseOverlay } from "@/components/visual/Backdrop";

export default function HomePage() {
  return (
    <>
      <NoiseOverlay />
      <Hero />
      <Stats />
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
