import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/visual/Media";
import { plantGallery } from "@/lib/gallery";

/**
 * "Inside the plant" gallery — AI-rendered views of the product's plant
 * (4-angle sheet crops + scene photos). Data lives in lib/gallery.ts;
 * this component stays layout-only. Renders nothing when a product has
 * no gallery set, so pages without renders are unaffected.
 */
export function PlantGallery({ slug, title = "Inside the plant." }: { slug: string; title?: string }) {
  const imgs = plantGallery[slug];
  if (!imgs?.length) return null;
  return (
    <section id="gallery" className="scroll-mt-28 border-t border-[var(--color-line)] py-[var(--space-section)]">
      <div className="maxw container-x">
        <SectionHeading eyebrow="Plant views" title={title} />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {imgs.map((im, i) => (
            <Reveal key={im.src} index={i % 4}>
              <div
                className={`group relative overflow-hidden rounded-md ${
                  i % 9 === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                }`}
              >
                <Media
                  src={im.src}
                  alt={im.alt}
                  overlay="none"
                  className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
