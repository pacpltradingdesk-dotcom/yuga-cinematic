import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/page/FAQ";
import { getVerticalQA } from "@/lib/catalog";

/**
 * Per-vertical Q&A section (PMC / fundraising / IT) from catalog verticalQA.
 * Renders nothing if the key is missing.
 */
export function VerticalFaq({ vkey, eyebrow = "Questions" }: { vkey: string; eyebrow?: string }) {
  const entry = getVerticalQA(vkey);
  if (!entry) return null;
  return (
    <section className="border-t border-[var(--color-line)] py-[var(--space-section)]">
      <div className="maxw container-x">
        <SectionHeading eyebrow={eyebrow} title={entry.title} />
        <div className="mt-10">
          <FAQ items={entry.qa} />
        </div>
      </div>
    </section>
  );
}
