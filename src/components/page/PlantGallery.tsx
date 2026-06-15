import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ImageSwiper } from "@/components/ui/image-swiper";
import { PlantMasonry } from "@/components/ui/image-masonry-grid";
import { plantGallery } from "@/lib/gallery";

/**
 * "Inside the plant" gallery — AI-rendered views of the product's plant
 * (4-angle sheet crops + scene photos). Data lives in lib/gallery.ts;
 * this component stays layout-only. Renders nothing when a product has
 * no gallery set, so pages without renders are unaffected.
 */
export function PlantGallery({
  slug,
  title = "Inside the plant.",
  variant = "swiper",
}: {
  slug: string;
  title?: string;
  /** "swiper" = draggable 3D card stack · "masonry" = animated column grid */
  variant?: "swiper" | "masonry";
}) {
  const imgs = plantGallery[slug];
  if (!imgs?.length) return null;
  return (
    <section id="gallery" className="scroll-mt-28 border-t border-[var(--color-line)] py-[var(--space-section)]">
      <div className="maxw container-x">
        <SectionHeading eyebrow="Plant views" title={title} />
        {variant === "masonry" ? (
          <div className="mt-10">
            <PlantMasonry imgs={imgs} />
          </div>
        ) : (
          <Reveal>
            <div className="mt-10 flex flex-col items-center gap-4">
              <ImageSwiper images={imgs} cardWidth={420} cardHeight={280} />
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-faint)]">
                Drag to flip through {imgs.length} views
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
