# YUGA — per-image AI render prompts

Generate each image, export it, and **save over the exact filename listed** in
`assets/img/` — no code change needed (the site already points at these names).

- **Aspect:** all **16:10 landscape**, except `founder.jpg` which is **3:4 portrait**.
- **Format:** `.jpg`, ideally ≥ 1600px wide, web-optimised (the build serves them as-is).
- The site applies its own dark gradient scrim on top, so images can be mid-bright;
  keep important detail away from the bottom edge (text sits there).

## HOUSE STYLE — append this to EVERY prompt
> cinematic, dark graphite near-black background (#0b0c10), warm amber (#f5a623) and
> electric-cyan (#4cc7e6) accent lighting, dramatic rim light, volumetric haze, photoreal,
> ultra-detailed, shot on 35mm, shallow depth of field, premium and editorial,
> no text, no logos, no watermark, no people's faces unless specified — 16:10

---

## 1) Page heroes (big, wide, cinematic)

| File | Prompt seed (+ HOUSE STYLE) |
|------|------------------------------|
| `home-hero.jpg` | Wide establishing shot of a vast modern bitumen / petroleum complex at blue hour — distillation towers, pipelines and storage tanks, faint amber facility lights, epic scale |
| `bio-hero.jpg` | Baled agricultural straw & crop residue stacked at the edge of a high-tech bio-refinery at dusk — feedstock-to-fuel scene |
| `ind-hero.jpg` | Interior of a bitumen plant — stainless pipework, reactors and control gantries, one engineer in PPE walking through, cinematic depth |
| `soft-hero.jpg` | Futuristic data-centre aisle, cyan-lit server racks receding into haze, subtle holographic data overlays |
| `cap-hero.jpg` | A wall of trading terminals and candlestick charts in a dark room, market heatmaps glowing — finance command-centre |
| `about-hero.jpg` | Sweeping industrial skyline at dawn — refineries, cranes and infrastructure silhouetted, sense of legacy and scale |
| `mi-hero.jpg` | Abstract data-driven market visualization — flowing graphs and an India-map node network, analytics atmosphere |
| `contact-hero.jpg` | A port / logistics terminal at dusk — bitumen tankers, gantry cranes and containers, import-export scene |
| `cs-hero.jpg` | An operational bio-bitumen plant lit at twilight, gentle steam and amber glow, a "live project" feel |

## 2) Vertical cards (home — the 3 business pillars)

| File | Prompt seed (+ HOUSE STYLE) |
|------|------------------------------|
| `v-pmc.jpg` | Oil & bitumen processing facility — tanks and towers in a warm amber industrial mood |
| `v-soft.jpg` | Server / AI-software infrastructure — clean cyan-lit racks, modern tech mood |
| `v-cap.jpg` | Capital-markets imagery — a trading floor of screens and market data |

## 3) Section backdrops (faint, abstract — sit behind text at low opacity)

| File | Prompt seed (+ HOUSE STYLE) |
|------|------------------------------|
| `p-eng.jpg` | Abstract close-up of plant engineering — pipework, valves and steel structures, moody industrial texture |
| `p-intel.jpg` | Abstract AI / data-intelligence texture — glowing cyan circuit-like network nodes on dark |
| `p-cap.jpg` | Abstract finance texture — faint candlestick charts and ticker glow on dark graphite |
| `p-impact.jpg` | Abstract sustainability texture — solar panels & green-energy infrastructure at soft dawn |

## 4) Bio-Bitumen page

| File | Prompt seed (+ HOUSE STYLE) |
|------|------------------------------|
| `bio-0.jpg` | A petroleum & bitumen product plant — drums and reactors in warm light |
| `bio-1.jpg` | Indian farm fields supplying agro-waste biomass at golden hour — straw bales, rural scale |
| `bio-2.jpg` | Plastic waste sorted for plastic-to-fuel — shredded plastic on a conveyor feeding a reactor |
| `bio-3.jpg` | Neatly stacked end-of-life tyres at a rubber-to-oil pyrolysis facility |

## 5) Product images (also used on the product detail pages)

| File | Used for | Prompt seed (+ HOUSE STYLE) |
|------|----------|------------------------------|
| `prod-0.jpg` | Bitumen Emulsion | Asphalt road surfacing — bitumen emulsion / tack coat being applied to a road |
| `prod-1.jpg` | PMB | A freshly paved highway of polymer-modified bitumen — smooth black surface to the horizon |
| `prod-2.jpg` | CRMB | Close-up of durable road pavement made with crumb-rubber modified bitumen, textured asphalt |
| `prod-3.jpg` | Blown/Oxidised **+ Asphalt Shingle** | Industrial bitumen drums & oxidised/blown grades stacked in a warehouse, amber light |
| `prod-4.jpg` | Decanter | Process piping and decanter separation systems — stainless vessels and pumps |

> **Optional — dedicated Asphalt-Shingle image:** right now the shingle product reuses
> `prod-3.jpg`. If you'd rather it have its own roofing image (sloped roof of fibreglass
> asphalt shingles, premium villa, golden light), make `shingle.jpg` and tell me — it's a
> 2-line code change to point the asphalt-shingle product at it.

## 6) Case studies

| File | Prompt seed (+ HOUSE STYLE) |
|------|------------------------------|
| `cs-0.jpg` | A compact MSME-scale bio-bitumen / PMB plant (Bahadurgarh-style), tidy industrial yard |
| `cs-1.jpg` | An agricultural region in Odisha with a small bio-bitumen plant, rural-industrial blend |
| `cs-2.jpg` | A plastic-to-fuel recycling plant — conveyors feeding a pyrolysis reactor |
| `cs-3.jpg` | Lush green forest / offset landscape at dawn — carbon-credit structuring theme |

## 7) Software cards (3 are AI-able; 2 are real screenshots)

| File | Prompt seed (+ HOUSE STYLE) |
|------|------------------------------|
| `sw-data.jpg` | A dark analytics dashboard UI — data cleaning & lead-scoring, cyan charts on near-black (abstract, illegible placeholder text only) |
| `sw-call.jpg` | A call-centre agent wearing a headset mid-call, warm focused lighting — AI call-capture theme |
| `sw-voice.jpg` | A person on a live phone call — AI voice-agent concept, soft cyan-amber light |

> **Do NOT AI-generate these two — they are REAL product screenshots:**
> `app-crm.jpg` (PPS CRM login) and `sw-whatsapp.jpg` (WA Automation login). Replace only
> with fresh real screenshots if you want to update them.

## 8) Real photos (not AI)

- **`founder.jpg`** — needs a REAL professional headshot of **Prince Pratap Shah**,
  **3:4 portrait**, clean/neutral background. AI is not appropriate for a real person.
  When you add it, I'll flip `company.founderPhoto` in `site.ts` to `/assets/img/founder.jpg`
  so it auto-shows on the homepage + About.
- **`yuga-logo.jpg`** — the brand logo. Keep as the official logo; don't AI-generate.

---
**Real beats stock/AI:** genuine photos of your actual plants, machinery, team or the
founder are more credible than any render — drop them in with the same filenames to use them.
