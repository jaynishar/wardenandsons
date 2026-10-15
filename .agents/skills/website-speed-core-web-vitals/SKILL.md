---
name: Website Speed & Core Web Vitals Optimization
description: Highly-recommended practices from Vercel & Web.dev for achieving sub-second LCP, 0 CLS, and <100ms INP in Next.js 15 e-commerce storefronts.
---

# Website Speed & Core Web Vitals Optimization (Next.js 15)

Expert guidelines for maximizing speed, minimizing bundle size, and ensuring 100/100 Core Web Vitals (LCP, INP, CLS) in Next.js 15 luxury e-commerce platforms.

## Core Web Vitals Targets
- **Largest Contentful Paint (LCP):** < 1.2s on 4G mobile.
- **Interaction to Next Paint (INP):** < 100ms (instant touch feedback).
- **Cumulative Layout Shift (CLS):** 0.00 (zero visual jitter).
- **First Contentful Paint (FCP):** < 0.8s.
- **Time to First Byte (TTFB):** < 200ms at edge.

---

## 1. Image Optimization (`next/image`)
- **Above-The-Fold Hero Images:**
  - Always mark the primary hero product/banner with `priority={true}` and `fetchPriority="high"`.
  - Provide explicit `sizes` attribute (e.g. `sizes="(max-width: 768px) 100vw, 50vw"`).
  - Use modern formats (`image/avif`, `image/webp`) enabled in `next.config.ts`.
- **Below-The-Fold Product Cards:**
  - Standard lazy loading (default in Next.js).
  - Fixed aspect ratio containers (`aspect-[3/4]` or `aspect-[4/5]`) with CSS `object-fit: cover` to eliminate CLS completely.
  - Implement low-quality blur placeholders (`placeholder="blur"` with base64 data URL).

## 2. Server Components (RSC) & Streaming Suspense
- Keep 80%+ of components as **React Server Components**.
- Offload heavy calculations, data transformation, and metadata generation to the server.
- Wrap dynamic UI widgets (cart preview, live inventory, reviews feed) in `<Suspense fallback={<Skeleton />}>` to unlock instantaneous initial HTML streaming.
- Use Next.js Partial Prerendering (PPR) patterns where static shell renders in 0ms and dynamic checkout parts stream in.

## 3. Font & Asset Optimization
- Use `next/font/google` with `display: 'swap'` and `subsets: ['latin']`.
- Inject font variables directly into the root `<html>` tag to prevent FOIT (Flash of Invisible Text) and layout shifts.
- Preconnect to critical third-party origins (CDN, payment gateways) only when necessary.

## 4. Script & Third-Party Tag Management
- Never use raw `<script>` tags for Google Tag Manager, GA4, Meta Pixel, or payment SDKs.
- Use `next/script` with appropriate loading strategies:
  - `strategy="afterInteractive"` for essential analytics.
  - `strategy="lazyOnload"` for chat widgets, reviews widgets, and non-critical trackers.
- Avoid main-thread blocking by batching events.

## 5. CSS & Bundle Hygiene
- Utilize Tailwind CSS v4's high-speed JIT compiler and modern `@theme` variables.
- Eliminate unused CSS classes and inline style recalculations.
- Use dynamic imports (`next/dynamic`) for heavy interactive modals (Size Guide, Video Booking Modal, Slide-out Drawer) so their JavaScript only downloads on user interaction.
- Keep total First Load JS shared by all pages under 110 kB.

## 6. HTTP & Caching Headers
- Leverage Next.js `revalidate` cache tags for catalog and product data.
- Ensure static assets in `/public` have `Cache-Control: public, max-age=31536000, immutable`.
- Enable Gzip / Brotli compression on edge deployment.
