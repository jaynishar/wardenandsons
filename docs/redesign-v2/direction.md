# Direction Sheet & Art Direction (P1)

- **Direction**: `specimen-catalogue` ("The specimen catalogue")
- **Seed**: `13704476`
- **Sector**: `fashion`
- **Tone**: `warm`
- **Archetype**: Split / Specimen Mosaic
- **Total Redraws**: 2

---

## Redraws and Decisions

1. **Type Redraw**:
   - *Dealt*: `Roundo` (Fontshare via `api.fontshare.com`).
   - *Redrawn to*: `Hanken Grotesk` (Google Fonts via `next/font/google`).
   - *Reason*: Stated engineering constraint in `REDESIGN_V2.md`: type must be a sans-serif available through `next/font/google` with no third-party CDN stylesheets. Loaded weights: 400 and 500 (plus 600 for emphasis).
2. **Contact Section Redraw**:
   - *Dealt*: `contact-clip-out-coupon` ("Clip-out coupon form").
   - *Redrawn to*: `contact-address-display-rows` ("Address in display rows").
   - *Reason*: Stated rule in `REDESIGN_V2.md`: "If a dealt section cannot hold the real content (for example a coupon form when no endpoint exists... take one with `--redraw section:<role>=<id>`)". Warden & Sons is a brick-and-mortar boutique with real physical address, hours, landline, and WhatsApp.
3. **Palette Adjustment**:
   - *Dealt*: Navy on white (`#ffffff` ground, `#1f2b4d` ink).
   - *Adjusted to*: Authentic brand logo colors sampled from `public/brand_logo.webp`: red, blue, yellow fields with ink navy, on clean white ground (`#ffffff`), with `--wa` (#0F7B4F) for WhatsApp.
4. **Imagery Policy**:
   - No stock or third-party placeholder pictures. Real assets only: `public/hero-editorial.webp`, `public/products/*.webp`, and drawn SVG garment specimens for categories lacking photography.

---

## The Idea Sentence

> "On this page, the red, blue and yellow letter tiles of the Warden & Sons sign become the specimen tiles: every category is one flat colour tile with one garment on it, named plainly beneath."

### The One Live Thing
1. Interactive hero category picker (Newborn, Boys, Girls, Men, Women, Uniforms & Bulk): selects active department and dynamically swaps specimen silhouette and tile color with clean crossfade.
2. Live store status indicator computed in India Standard Time (IST): dynamically displays "Open now · until 9pm" or "Opens at 9am" without layout shift (SSR fallback: "Open daily 9am to 9pm").

---

## Blueprints Accepted

- **Hero**: `anchored-text-specimen-half` (split stage with big brand wordmark, H1, live category picker, and specimen tile).
- **Catalogue**: Specimen grid with rotating color fields (red, blue, yellow, ink navy), sub-category names, age ranges, and 44px "+" touch targets.
- **Showcase**: `showcase-object-on-a-disc` (garment silhouettes on rotating flat color discs with facts and "Add to list").
- **How it works**: `how-it-works-tiles-that-grow` (three size-stepped stages: Pick, Send on WhatsApp, We reply with photos and sizes + Free video call).
- **Testimonial**: `testimonial-paper-slips` (authentic Google reviews from `reviews.json`).
- **Contact / Visit**: `contact-address-display-rows` (display rows for address, hours, phone, directions).
- **Footer**: `footer-back-of-the-card` (clean reverse-card layout with brand wordmark, contact facts, and legal links).
