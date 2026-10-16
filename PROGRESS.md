# Warden & Sons Website Revamp — Progress Tracker

## Branch & Execution Environment
- **Branch:** `upgrade/warden-safe-revamp`
- **Base Commit:** `08835a1` (`feat: align digital catalogue with WhatsApp enquiry request model`)
- **Hosting Model:** Next.js 15.1.7 static export (`output: 'export'`) deployed to Hostinger
- **E-Commerce Paradigm:** WhatsApp-first Digital Catalogue & Enquiry Request Builder (No cart checkout / payment gateway)

---

## Phase Status Summary

### Phase 0: Baseline & Safeguards
- **Status:** COMPLETED
- **Actions Run:**
  - Git repository inspected: Clean working directory on `upgrade/warden-safe-revamp`.
  - Type check: `npx tsc --noEmit` passed with 0 errors.
  - ESLint check: `npx eslint "src/**/*.{ts,tsx}"` passed with 0 errors.
  - Baseline static export build inspected: 39 static routes generated.
  - Baseline audit of exported HTML (`out/index.html` & `out/shop/index.html`):
    - `lang`: `en` (needs update to `en-IN` per brief)
    - `canonical`: Missing on home; hardcoded `wardenandsons.com` on shop
    - `.com` occurrences in HTML: 8 on home, 10 on shop
    - Literal `&amp;` in HTML: 42 on home, 82 on shop (caused by literal `&amp;` written in JSX text nodes)
    - Robots.txt disallows `/_next/` (blocks crawler CSS/JS asset rendering) and points to `.com` sitemap
    - Zustand store key: `warden-request-list-storage`
  - Created `NEEDS_JAY.md` with complete owner confirmation checklists.

---

### Phase 1: Technical SEO & Indexability
- **Status:** PENDING
- **Plan:**
  - Create centralized site config (`src/config/site.ts`) with canonical `.in` fallback.
  - Unify metadata across all routes using `site.ts`.
  - Eliminate all hardcoded `wardenandsons.com` references.
  - Fix literal `&amp;` in JSX source files to standard `&` text.
  - Update `robots.ts` to allow `/_next/` and point to `https://wardenandsons.in/sitemap.xml`.
  - Update `sitemap.ts` to output clean `.in` canonical routes with accurate dates.
  - Update `html lang` to `en-IN`.

---

### Phase 2: Truthful Local Structured Data
- **Status:** PENDING
- **Plan:**
  - Consolidate JSON-LD to use factual `ClothingStore` data with canonical `.in` URLs.
  - Remove disputed price range and fabricated schema fields.
  - Ensure schema matches owner facts.

---

### Phase 3: Catalogue & Copy Cleanup
- **Status:** PENDING
- **Plan:**
  - Keep 6-category model intact.
  - Ensure uniform note: "Prices and current stock are confirmed on WhatsApp" once per catalogue page.
  - Eliminate storefront and brand logo misrepresentation as product image thumbnails; introduce clean, neutral category badges/placeholders.
  - Standardize terminology: "Kemps Corner store", "South Mumbai", "Request list", "Add to request", "Send on WhatsApp".

---

### Phase 4: WhatsApp Request Flow
- **Status:** PENDING
- **Plan:**
  - Preserve `warden-request-list-storage` Zustand key and state shape.
  - Replace `window.open` with accessible outbound anchor (`target="_blank"` with `rel="noopener noreferrer"`).
  - Ensure touch targets meet 44px minimum dimensions.
  - Create pure unit tests for message formatting (empty, single item, special chars, Hindi, emoji, URL decoding).

---

### Phase 5: UX & Trust
- **Status:** PENDING
- **Plan:**
  - Add clear 3-step explanation beneath hero and atop shop ("Pick representative items", "Send on WhatsApp", "Receive live photos & prices").
  - Accessible FAQ native disclosures (`<details>/<summary>`).
  - No auto-playing carousels or marquee animations.

---

### Phase 6: Performance & Accessibility
- **Status:** PENDING
- **Plan:**
  - Check image attributes (width/height, priority on hero, lazy below fold).
  - Test keyboard focus in drawer and navigation.
  - Re-run build without error suppressions in `next.config.ts`.

---

### Phase 7: Hostinger Deployment Safety
- **Status:** PENDING
- **Plan:**
  - Verify static export `out/` completeness.
  - Prepare exact .htaccess instructions for Hostinger (redirects, caching).
  - Prepare handoff summary for Jay without making unapproved live changes.
