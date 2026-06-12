# Unique-Image + Effects Plan (2026-06-12) — EXECUTE LATER (user: "baad me karo sab")

USER RULE: **har placement pe unique image** — koi bhi image site pe 2 jagah nahi dikhni chahiye.
Effects: 21st.dev se inspired, alag-alag per page. Stack: framer-motion + GSAP + Lenis (already in repo, NO new deps).

## 1. Current problem (uniqueness audit)
- Slots (27) sab unique ✓
- Galleries (gen_gallery.py) me har product ke SAARE 5 B-scenes hain — jo slot me bhi lagi hai woh gallery me REPEAT hoti hai (e.g. B3.2 = bio-1 card + bio gallery dono) ✗
- /products "company" gallery me B1.1/1.2/1.4/1.5 repeat (home/about/cs slots me bhi) ✗
- FIX: gen_gallery.py me SLOT_USED exclude-list — gallery sirf unused assets dikhaye.

## 2. Final unique allocation (120 assets, har ek EXACTLY 1 jagah)

### Slots — 27 (LIVE, change nahi)
B1.1 home-hero · B1.2 p-eng · B1.4 cs-hero · B1.5 about-hero · B2.1 contact-hero · B2.4 p-impact ·
B3.1 bio-hero · B3.2 bio-1 · B3.3 cs-1 · B4.1 bio-2 · B4.2 cs-2 · B5.1 bio-3 · B6.2 prod-0 ·
B7.1 cs-0 · B7.2 prod-1 · B8.2 prod-2 · B9.2 prod-4 · B10.2 bio-0 · B11.2 prod-3 · B12.1 v-pmc ·
B12.2 ind-hero · B13.1 soft-hero · B13.2 mi-hero · B13.4 v-soft · B14.1 cap-hero · B14.4 v-cap · A3-q1 cs-3

### Page galleries — dedupe ke baad (93 assets)
| Page | Assets (unique) | Effect (21st.dev-inspired) | Kyun yahan |
|---|---|---|---|
| /products index | A1 sheet + A1-q1..q4 + B1.3 (6) | **3D overlapping perspective gallery** (rotateY −45°, hover lift; mobile = infinite marquee) | "One YUGA plant, every angle" — sabse showpiece section, index = sabse zyada traffic |
| /products/bio-bitumen | A3-q2,q3,q4 + B3.4, B3.5 (5) | **Hover-expand strip** (flex-grow 1→full on hover) | Flagship product, premium feel; 5 images strip me fit |
| /products/plastic-to-fuel | A4-q1..q4 + B4.3,4.4,4.5 (7) | **Expandable gallery + lightbox** (click → fullscreen modal, prev/next) | Process-heavy product — log detail zoom karke dekhna chahte hain |
| /products/rubber-to-fuel | A5-q1..q4 + B5.2..5.5 (8) | **Bento grid** (mixed spans: 2×2 hero tile + 1×1s, hover tilt) | 8 images = bento ka sweet spot |
| /products/bitumen-emulsion | A6-q1..q4 + B6.1,6.3,6.4,6.5 (8) | **Masonry + hover-zoom** (column flow, scale 1.05 + caption reveal) | Brown-product shots vertical/horizontal mix me acche |
| /products/pmb | A7-q1..q4 + B7.3,7.4,7.5 (7) | **Scroll-stacking cards** (GSAP pin, cards ek-pe-ek stack hote) | Tall blend-tank shots vertical stack me dramatic |
| /products/crmb | A8-q1..q4 + B8.1,8.3,8.4,8.5 (8) | **Diagonal marquee** (2 rows opposite direction, pause on hover) | Energetic feel; crumb-rubber action shots motion me acche |
| /products/bitumen-decanter | A9-q1..q4 + B9.1,9.3,9.4,9.5 (8) | **Film-strip horizontal scroll** (Lenis-driven, HorizontalStory pattern reuse) | Long oven-box machine = horizontal pan natural fit |
| /products/micro-surfacing | B10.1,10.3,10.4,10.5 (4) | **Spotlight cards** (cursor-follow glow + lift) | Sirf 4 — spotlight chhote set ko premium banata |
| /products/blown | A11-q1..q4 + B11.1,11.3,11.4,11.5 (8) | **Expandable flex gallery** (hover flex 2 / others 0.5) | Tall column shots — vertical expand striking |
| /products/asphalt-shingle | A-sheet "blueprint" only (niche dekho) | — | koi B-set generate nahi hua |
| /industrial-consulting | A12 sheet + A12-q1..q4 + B12.3,12.4,12.5 (8) | **Zoom-parallax v2** (home se ALAG layout — center-out spiral) | Complete-plant walkthrough = immersive zoom story |
| /it-software | B13.3, B13.5 (2) | **Spotlight hover pair** (side-by-side, glow border) | Sirf 2 bachi; pair layout clean |
| /capital-market | B14.2, B14.3, B14.5 (3) | **Story strip** (3 steps: boardroom → signing → plant; scroll-reveal L/R alternate) | Fundraising = journey narrative |
| /about | B2.2, B2.3, B2.5 (3) | **Timeline reveals** (career timeline ke beech interleaved, clip-path wipe) | Client-journey photos About ki story ke saath |

### A-sheet "blueprint" panels — 8 product pages (8 assets)
A3..A9, A11 ka FULL sheet apne product page pe "Plant from all four angles" panel:
**scroll-driven scale 0.9→1 + subtle rotate** (ek hi bada image, grid lines visible — blueprint feel).
(A1 → products index 3D gallery me; A12 → industrial zoom-parallax me.)

**Count check: 27 slots + 93 gallery/panels = 120 ✓ — har asset exactly ek jagah.**

## 3. Common rules
- Har effect ka `prefers-reduced-motion` fallback = static grid (ZoomParallaxStatic pattern).
- Mobile: 3D/marquee effects → simple swipe-scroll ya marquee (21st.dev pattern me built-in tha).
- Sab framer-motion/GSAP se — NO new dependency.
- Data `lib/gallery.ts` me hi rahega (effect-type field add hoga: `effect: "bento" | "strip" | ...`), components layout-only.
- Lightbox = ek shared `GalleryLightbox.tsx`, sab effects optionally use karein.

## 4. Implementation order (jab user bole "shuru karo")
1. **Phase 1 (30 min):** gen_gallery.py me SLOT_USED exclude → uniqueness turant fix (current grid layout me hi). Deploy.
2. **Phase 2:** showpieces — /products 3D overlap, bio-bitumen hover-expand, industrial zoom-parallax v2. Deploy.
3. **Phase 3:** baki product effects 2-3 per deploy (bento, masonry, stacking, marquee, film-strip, spotlight…).
4. **Phase 4:** blueprint panels + capital/about/software strips + shared lightbox + mobile/reduced-motion pass + Lighthouse check.
