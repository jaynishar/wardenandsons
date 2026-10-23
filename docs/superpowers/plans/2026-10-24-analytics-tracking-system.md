# Advanced Analytics, Customer Tracking & Conversion Optimisation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a robust, privacy-conscious, type-safe GA4 & conversion tracking system for Warden & Sons Kids Wear that tracks discovery, product interactions, WhatsApp enquiries, forms, and attribution without degrading performance, SEO, or user experience.

**Architecture:** Next.js 15 App Router static export compatible client tracking architecture. Centralizes event tracking through `src/lib/analytics.ts` with Google Consent Mode v2 defaults, automated client-side route tracking via `AnalyticsNavigationTracker`, validation-safe lead tracking in forms, privacy-preserving session attribution (`src/lib/attribution.ts`), and an accessible, Zara-inspired consent banner (`src/components/ConsentBanner.tsx`).

**Tech Stack:** Next.js 15.5.28, React 19.3.1, TypeScript 5.9.3, Tailwind CSS 4, `@next/third-parties/google`, Playwright 1.64.1.

**Spec:** Master Prompt instructions for Warden & Sons Kids Wear advanced tracking.

## Global Constraints
- Preserve existing branding, editorial Zara-inspired aesthetic, and real logo asset (`/brand_logo.jpg`).
- Never transmit personally identifiable information (names, emails, phone numbers, custom notes) in GA4 or dataLayer.
- Never block user navigation or delay outbound WhatsApp links.
- Static export compatibility (`output: 'export'`) with Next.js 15 App Router.
- Support environment variables (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) with verified fallback IDs from `src/config/site.ts`.

## Review Focus
1. Route transition deduplication: ensure Next.js App Router client navigation does not double-fire `page_view` in React Strict Mode.
2. Form submission accuracy: ensure validation failures never trigger `form_submit` or `generate_lead`.
3. WhatsApp outbound reliability: ensure tracking does not prevent or delay opening `wa.me` links in mobile Safari/Chrome.
4. Attribution safety: ensure UTM capturing in `sessionStorage` fails gracefully if cookies/storage are disabled and contains zero PII.
5. Consent Mode v2: ensure default consent state is established before gtag loads so Google tags respect user choices.

---

### Task 1: Environment & Search Console Configuration
**Files:**
- Modify: `src/config/site.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `process.env.NEXT_PUBLIC_GA_ID`, `process.env.NEXT_PUBLIC_GTM_ID`, `process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- Produces: `ANALYTICS_CONFIG` with Google verification and measurement IDs wired to Next.js metadata.

- [ ] **Step 1: Write verification test in Playwright**
  Add test checking that Google Search Console meta tag is present when configured and layout renders without errors.
- [ ] **Step 2: Update `src/config/site.ts`**
  Ensure `ANALYTICS_CONFIG` exports verified defaults and verification tokens cleanly.
- [ ] **Step 3: Update `src/app/layout.tsx`**
  Add `verification.google` to Next.js `metadata`.

---

### Task 2: Google Consent Mode v2 & Consent Banner
**Files:**
- Create: `src/components/ConsentBanner.tsx`
- Create: `src/lib/consent.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `localStorage` consent state (`ws_consent_state`)
- Produces: `initConsentMode()`, `setConsentState('granted' | 'denied')`, `<ConsentBanner />`

- [ ] **Step 1: Create `src/lib/consent.ts`**
  Implement type-safe Consent Mode v2 helper: sets default denied/granted, reads/writes storage, updates `gtag('consent', 'update', ...)`.
- [ ] **Step 2: Create `src/components/ConsentBanner.tsx`**
  Build minimal, editorial banner with "Accept All" and "Essential Only" buttons, adhering to web design and accessibility guidelines.
- [ ] **Step 3: Integrate with `src/app/layout.tsx`**
  Add inline Consent Mode v2 default setup script before GTM/GA4 loads, and mount `<ConsentBanner />`.

---

### Task 3: Unified Type-Safe Analytics Engine (`src/lib/analytics.ts`)
**Files:**
- Create: `src/lib/analytics.ts`
- Modify: `src/lib/track.ts` (backward compatibility wrapper)
- Create: `src/components/AnalyticsNavigationTracker.tsx`

**Interfaces:**
- Consumes: `window.gtag`, `window.dataLayer`
- Produces: `trackEvent`, `trackPageView`, `trackWhatsAppClick`, `trackProductView`, `trackAddToCart`, `trackLead`, `trackSearch`, etc.

- [ ] **Step 1: Implement `src/lib/analytics.ts`**
  Create typed GA4 recommended events, safe parameter sanitization (stripping PII, normalizing URLs and button locations), and dual dispatch to `gtag` and `dataLayer`.
- [ ] **Step 2: Implement `AnalyticsNavigationTracker.tsx`**
  Use `usePathname()` and `useSearchParams()` with deduplication ref to track client-side `page_view` events accurately on route changes.
- [ ] **Step 3: Refactor `src/lib/track.ts`**
  Make legacy functions delegate to `src/lib/analytics.ts` to preserve backwards compatibility without duplicated logic.

---

### Task 4: Attribution Engine & WhatsApp Message Enrichment
**Files:**
- Create: `src/lib/attribution.ts`
- Modify: `src/lib/whatsapp.ts`
- Modify: `src/components/TrackingProvider.tsx`

**Interfaces:**
- Consumes: `window.location.search`, `document.referrer`
- Produces: `getStoredAttribution()`, `buildAttributionTag()`, enriched WhatsApp messages.

- [ ] **Step 1: Implement `src/lib/attribution.ts`**
  Capture `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and referrer on initial session landing; store safely in `sessionStorage`.
- [ ] **Step 2: Update `src/lib/whatsapp.ts`**
  Append a clean, concise internal attribution reference (e.g., `(Sent from website | Ref: IG-Bio)`) to pre-filled WhatsApp messages.
- [ ] **Step 3: Initialize in `TrackingProvider.tsx`**
  Record initial landing attribution once per session.

---

### Task 5: Component Event Wiring & Form Refactoring
**Files:**
- Modify: `src/components/BulkOrderForm.tsx`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/components/ShopCatalog.tsx`
- Modify: `src/components/ProductCard.tsx`
- Modify: `src/store/cart.ts`

**Interfaces:**
- Consumes: `src/lib/analytics.ts`
- Produces: Triggering of `form_submit`, `generate_lead`, `view_item_list`, `select_item`, `search`, `add_to_cart`, `remove_from_cart`.

- [ ] **Step 1: Refactor `BulkOrderForm.tsx`**
  Ensure `form_submit` and `generate_lead` fire only inside `onSubmit` when Zod validation succeeds.
- [ ] **Step 2: Refactor `ContactForm.tsx`**
  Ensure `form_submit` and `generate_lead` fire only inside `onSubmit` when validation succeeds.
- [ ] **Step 3: Connect `ShopCatalog.tsx` & `ProductCard.tsx`**
  Track search queries with debounce, track category filtering (`view_item_list`), and track product views/clicks.
- [ ] **Step 4: Connect Cart / Request List interactions**
  Track `add_to_cart` and `remove_from_cart` with safe item metadata (id, name, category).

---

### Task 6: Automated Playwright Tests & End-to-End Verification
**Files:**
- Create: `e2e/analytics.spec.ts`

- [ ] **Step 1: Write E2E tests in `e2e/analytics.spec.ts`**
  Test initial dataLayer setup, Consent Mode defaults, `whatsapp_click` event parameters, valid vs invalid form submissions, and route navigation.
- [ ] **Step 2: Execute `npm run typecheck`**
- [ ] **Step 3: Execute `npm run lint`**
- [ ] **Step 4: Execute `npm run test:e2e`**
- [ ] **Step 5: Execute `npm run build`**

---

### Task 7: Comprehensive Documentation & Delivery
**Files:**
- Create: `docs/ANALYTICS_TRACKING_GUIDE.md`

- [ ] **Step 1: Compile tracking dictionary, GA4 DebugView guide, GSC verification instructions, monthly CRO routine, and offline sales attribution sheet template.**
- [ ] **Step 2: Prepare final executive response answering all 15 required deliverables.**
