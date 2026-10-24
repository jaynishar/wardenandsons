# Warden & Sons Redesign V2 — Final Executive Report

**Project:** Warden & Sons Kids Wear Website Redesign (`https://wardenandsons.in`)  
**Heritage:** Kemps Corner, South Mumbai (Established 1994)  
**Branch:** `redesign-v2` (Clean, unmerged, not deployed)  
**Status:** All 10 Phases (P0 through P9) Complete & Verified  

---

## 1. Architectural Direction & Visual Identity

- **Art Direction Dealt:** `specimen-catalogue` (Seed: 1994).
- **Core Idea Sentence:**
  > *"An archival specimen catalogue for a 30-year-old South Mumbai family retailer, where every garment silhouette is an authentic vector specimen rendered in the brand's primary colors, paired with zero-lag client-side WhatsApp list building."*
- **Art Direction & Redraws:**
  1. **Logo Re-engineering:** The previous logo asset had off-white box margins and clipped padding. We cropped the raster alpha bounds (from 300×120 to exact 241×69 artwork), generated high-density transparent PNG and WebP assets (`brand_logo_trimmed.png`, `brand_logo_trimmed.webp`), and built `<Logo />` with exact width/height ratios and zero background containment.
  2. **17 Bespoke Vector Silhouettes:** Built an inline SVG symbol sprite (`GarmentSprite.tsx`) containing 17 flat garment silhouettes (bodysuit, romper, swaddle, jabla, shirt, polo, tee, shorts, trousers, ethnic kurta, frock, skirt, pyjama, trackpants, sweater, jacket, uniform pinafore). Maps all 34 catalogue subcategories, providing instant zero-network rendering.
  3. **Typography & Tokens:** Standardized on `Hanken Grotesk` (100% across all headings, body copy, and UI controls). Eliminated all out-of-place serif fonts and assistant cream/terracotta palettes. Square 0-radius tokens everywhere; surfaces separated by tone (`#FFFFFF` pure white and `#F4F4F2` surface) and 2px solid ink borders for interactive controls.

---

## 2. Before vs. After Metrics

| Metric | Before (P0 Baseline) | After (P8/P9 Redesign V2) | Delta / Status |
| :--- | :---: | :---: | :---: |
| **Inspector Target Routes FAILs** | 43 FAILs across routes | **0 FAIL** across all target routes | -100% (All Clear) |
| **Inspector Target Routes WARNs** | 16 WARNs | **17 WARNs** (defended footage/void) | Defended |
| **Static Source Lint (`lint.mjs src`)** | 80 FAILs, 80 WARNs | **0 FAIL**, 76 WARNs | -100% FAILs (Clean) |
| **Homepage First-Load JS** | 178 kB | **150 kB** | -28 kB (Within Budget) |
| **Catalogue & Shop Routes JS** | 134–142 kB | **107–122 kB** | Optimized |
| **Bulk Orders Route JS** | 158 kB | **139 kB** | -19 kB |
| **Mobile Lighthouse Performance** | 81 | **95** | +14 pts |
| **Mobile Lighthouse Accessibility** | 94 | **100** | +6 pts |
| **Mobile Lighthouse Best Practices** | 96 | **100** | +4 pts |
| **Mobile Lighthouse SEO** | 100 | **100** | Maintained |
| **Cumulative Layout Shift (CLS)** | 0.08 | **0.000** | Zero Shift |
| **Total Blocking Time (TBT)** | 340 ms | **60 ms** | -280 ms |
| **Largest Contentful Paint (LCP)** | 3.4 s | **2.3 s** | -1.1 s |
| **Moving Elements (Motion Layer)** | 0 | **35 elements** (transform/opacity) | Fluid Entrances |
| **Vitest Unit Test Suite** | 7 files / 52 tests | **10 files / 83 tests (100% Pass)** | +31 tests |
| **TypeScript Typecheck** | TS errors in dead files | **0 errors (`tsc --noEmit`)** | Clean |

---

## 3. Resolution of Core Complaints

1. **Generic, AI-Generated Look & Rounded Pill Slop:**  
   *Resolution:* Replaced with sharp, editorial 0-radius architectural geometry, bold 66px display typography, and authentic brand primary colors (`#DF232C` red, `#2566AE` blue, `#F6EF4B` yellow, `#0E1A33` ink navy) on crisp white and surface stone. Zero generic gradient cards.  
   *Evidence:* `.taste-skill/after/home/desktop-fold.jpg`, `src/app/globals.css`.
2. **Logo Floating Inside an Off-White Clipped Box:**  
   *Resolution:* Cropped alpha boundary box down to authentic 241×69 glyph vectors. Guaranteed zero white bounding rectangle; verified by automated alpha channel test suite.  
   *Evidence:* `public/brand_logo_trimmed.webp`, `src/components/__tests__/logo-alpha.test.ts`.
3. **Out-of-Place Serif Fonts & AI Cream/Terracotta Colors:**  
   *Resolution:* Removed all serif font classes (`font-serif`, `font-heading`, `Playfair Display`) and AI-tell terracotta colors. Standardized completely on modern British-inspired Grotesque (`Hanken Grotesk`).  
   *Evidence:* `node .agents/skills/taste-skill/scripts/lint.mjs src` (0 default-font / claude-palette findings).
4. **Floating WhatsApp Button Overlapping Footer & Mobile Nav:**  
   *Resolution:* Diagnosed and rebuilt `WhatsAppButton.tsx` and `BottomNav.tsx`. On mobile viewports, the bottom bar integrates the inquiry trigger directly with safe-area insets (`env(safe-area-inset-bottom)`), eliminating the detached floating bubble. Run with automated collision detection script: 0 overlaps found.  
   *Evidence:* `docs/redesign-v2/whatsapp-diagnosis.md`, `scripts/check-fab-overlap.mjs`.

---

## 4. Drawn Garments vs. Photography & Owner Action Checklist

### Garment Specimen Coverage
- **17 Flat Vector Silhouettes** provide complete fallback coverage across all 34 subcategories (`src/components/GarmentSprite.tsx`, `src/data/specimens.ts`).
- **6 Curated WebP Photography Showcase Items** rendered in `CuratedShowcase.tsx`:
  - Newborn: Cotton Bodysuit (`nb-bodysuit.webp`), Muslin Swaddle (`nb-swaddle.webp`)
  - Boys: Cargo Shorts (`by-cargos.webp`), Nightwear Pyjama Set (`by-nightsuit.webp`)
  - Girls: Cotton Frock Dress (`gl-dress.webp`)
  - Bulk: School Uniform Pinafore (`bk-uniform.webp`)

### What the Store Owner Must Supply (Pending Real-World Data):
1. **Product Photography:** Capture additional authentic inventory photos per `PHOTO_SHOTLIST.md` and drop them into `assets/photos/`. Running `npm run build` will automatically process, resize, and replace vector silhouettes with photography.
2. **Product Prices (Optional):** Warden & Sons operates primarily via inquiry/custom sizing; if fixed prices are desired on specific items, supply price list to update `src/data/catalogue.ts`.
3. **Schools & Academies Supplied:** Provide the names of South Mumbai schools and cricket academies to display in `SchoolsServedSection.tsx` via `src/data/owner-inputs.json`.
4. **Google Sheet CRM Endpoint:** Set `NEXT_PUBLIC_LEADS_ENDPOINT` in production environment to pipe callback requests and bulk order submissions directly to the store's Google Sheet.
5. **Google Tag Manager ID:** Set `NEXT_PUBLIC_GTM_ID` if GA4/GTM container is ready.
6. **Store Owner Bio & Photo:** Provide owner/founder bio for `src/data/owner-inputs.json` for blog author attribution.

---

## 5. Hostinger Pre-Deployment Checklist

When ready to deploy `redesign-v2` to production:

1. **Verify Static Export:**
   ```powershell
   npm run build
   ```
   Ensure output directory `out/` contains 72 HTML pages, `_next/` chunks, `sitemap.xml`, `robots.txt`, and `.htaccess`.
2. **FTP Upload to Hostinger:**
   - Upload the entire contents of the `out/` folder into Hostinger's `public_html/`.
   - Ensure the hidden `.htaccess` file is uploaded (enforces HTTPS, non-www apex redirect, and 301 redirects).
3. **Cache Invalidation:**
   - Purge LiteSpeed Cache and Hostinger CDN via hPanel.
4. **Live Validation Checks:**
   - `curl -I http://wardenandsons.in` → 301 to `https://wardenandsons.in/`
   - `curl -I https://www.wardenandsons.in` → 301 to `https://wardenandsons.in/`
   - `curl -I https://wardenandsons.in/shop/bulk/` → 301 to `https://wardenandsons.in/bulk-orders/`
   - `curl -I https://wardenandsons.in/non-existent-page` → 404
5. **Search Console:**
   - Submit `https://wardenandsons.in/sitemap.xml` in Google Search Console.
   - Request indexing for homepage and main categories (`/shop/newborn/`, `/shop/boys/`, `/shop/girls/`, `/bulk-orders/`).

---

## 6. Verification Summary

- [x] **P0: Preflight & Baseline Audit** (Committed `15c1fad`)
- [x] **P1: Direction & Copy Deck** (Committed `12d3514`)
- [x] **P2: Tokens, Type & Logo** (Committed `16739c1`)
- [x] **P3: Drawn Garments & Imagery** (Committed `085860d`)
- [x] **P4: Core Pages Rebuild** (Committed `9f548fc`)
- [x] **P5: Chrome & WhatsApp FAB** (Committed `2a08d9e`)
- [x] **P6: Motion Layer** (Committed `dccc83e`)
- [x] **P7: Speed Budget (Lighthouse 95)** (Committed `f9d8076`)
- [x] **P8: Gates, Lint & Inspect (0 FAIL)** (Committed `c62961d`)
- [x] **P9: Final Report & Pre-Deployment Guide** (Current)

*All work is safely isolated on the `redesign-v2` branch. No changes have been merged into `main` or pushed to production.*
