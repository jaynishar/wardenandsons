# Repository Map: wardenandsons.in

## Framework & Environment
- **Framework**: Next.js 15.5.28 (App Router, Static Export `output: 'export'`)
- **UI / Runtime**: React 19.3.1, TypeScript 5.9.3, Tailwind CSS 4.3.3
- **Hosting / Server**: Hostinger / LiteSpeed (Static export with `.htaccess`)

## Commands
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Key File Paths

| Feature | Path |
| :--- | :--- |
| **Shared Head / Metadata** | `src/app/layout.tsx` (Root metadata)<br>`src/config/site.ts` (Site metadata config)<br>`src/config/business.ts` (Store & contact details)<br>`src/components/JsonLd.tsx` & `src/lib/schema.ts` (JSON-LD structured data) |
| **Navigation** | `src/components/Header.tsx` (Desktop/mobile header navigation)<br>`src/components/StickyMobileBar.tsx` (Mobile bottom sticky bar) |
| **Footer** | `src/components/Footer.tsx` |
| **Sitemap** | `src/app/sitemap.ts` |
| **Robots** | `src/app/robots.ts` |
| **Redirects Config** | `public/.htaccess` (Hostinger/Apache rewrite & 301 canonical redirects)<br>`next.config.ts` (Next.js export config) |
| **Catalogue Data** | `src/lib/products.ts` (Categories, products, and size specifications)<br>`src/components/ShopCatalog.tsx` (Catalog display & category filter component)<br>`src/data/reviews.json` (Customer reviews dataset) |
| **Blog Posts** | `src/content/blog/` (MDX posts directory)<br>`src/lib/blog.ts` (Blog metadata extraction & MDX parsing)<br>`src/app/blog/page.tsx` (Blog index)<br>`src/app/blog/[slug]/page.tsx` (Individual blog article route) |
| **WhatsApp Link Builder** | `src/lib/whatsapp.ts` (WhatsApp phone numbers, URLs, and encoded inquiry messages)<br>`src/components/WhatsAppFloat.tsx` (Floating WhatsApp action button) |

## Initial Build Verification
- **Command**: `npm run build`
- **Status**: PASS (Exit code 0, 38/38 static pages successfully generated)

---

## Redesign Discovery (Step R0)

### Versions & Tooling
- **Next.js**: `15.5.28`
- **React**: `19.3.1` (react-dom `19.3.1`)
- **TypeScript**: `5.9.3`
- **Tailwind CSS**: `4.3.3` (Tailwind v4 using CSS `@theme` in `src/app/globals.css`; no `tailwind.config.js`)
- **next.config.ts Settings**: Confirmed `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`

### App Router Structure (`src/app/`)
- `layout.tsx` (Root metadata, fonts, Consent Mode v2 script, GA4/GTM loaders, tracking provider, global layout components)
- `page.tsx` (Homepage)
- `globals.css` (Tailwind 4 `@theme` tokens, root CSS custom properties)
- `robots.ts` & `sitemap.ts` (Static SEO routes)
- `about/page.tsx` (Heritage & brand story)
- `blog/page.tsx` (Blog index)
- `blog/[slug]/page.tsx` (Dynamic SSG blog posts from MDX)
- `bulk-orders/page.tsx` (Uniform & institutional orders)
- `contact/page.tsx` (General store contact form)
- `how-it-works/page.tsx` (WhatsApp ordering flow guide)
- `our-shops/page.tsx` (Kemps Corner shop family, noindexed)
- `privacy-policy/page.tsx` (Customer privacy & WhatsApp care)
- `shipping-returns/page.tsx` (Delivery & exchange details)
- `shop/page.tsx` (All catalogue products)
- `shop/[category]/page.tsx` (Category catalogue: newborn, boys, girls, men, women)
- `size-guide/page.tsx` (Measuring tape & size tables)
- `terms/page.tsx` (Terms of service)
- `visit-us/page.tsx` (Kemps Corner store directions & hours)

### Request List Architecture (Redesigned R4)
- **State Store & Hook**: `src/lib/list-store.ts` (`useListStore`, `useListCount`, `useAddToList`, `ListLine`, persisted in localStorage key `warden-list-v1`, fail-safe storage wrapper, max 30 lines, qty 1-20, note max 140 chars)
- **UI Sheets**: `src/components/list/` (`AddSheet.tsx`, `ListSheet.tsx`, Radix Dialog modals)
- **Message Builder**: `src/lib/whatsapp-list.ts` (`buildListMessage`, `getListUrl`, strict 1,200 character cap with +N truncation, `>` separators)
- **Triggers**: `src/components/Header.tsx`, `src/components/BottomNav.tsx`, `src/components/ProductCard.tsx`

### All Components in `src/components/` (25 files)
- `AnalyticsNavigationTracker.tsx`: Client-side route change tracking with deduplication
- `BlogFilterList.tsx`: Blog category filter tabs
- `BottomNav.tsx`: Mobile fixed bottom navigation
- `BreadcrumbJsonLd.tsx`: Breadcrumb schema structured data
- `Breadcrumbs.tsx`: Visual navigational breadcrumbs
- `BulkOrderForm.tsx`: Bulk uniform enquiry form
- `list/`: `AddSheet.tsx`, `ListSheet.tsx`, `index.ts` (My list modal & add sheets)
- `CategoryTiles.tsx`: Visual department category tiles with Marker square motifs
- `ConsentBanner.tsx`: Google Consent Mode v2 user consent banner
- `ContactForm.tsx`: General store query form
- `FAQ.tsx`: Accordion frequently asked questions
- `Footer.tsx`: Boutique contact banner, department links, store timings, cookie preferences
- `GoogleReviewsBlock.tsx`: Local Google review summary badge
- `Header.tsx`: Responsive navigation header with brand logo crest
- `Hero.tsx`: Homepage hero section (responsive photo-first mobile, editorial typography, dual CTAs)
- `HowItWorks.tsx`: Single-line WhatsApp purchasing summary with video-call action chip
- `JsonLd.tsx`: Storefront schema.org JSON-LD
- `ProductCard.tsx`: Catalogue item card with instant WhatsApp and request list actions
- `ReplyPromise.tsx`: Response time assurance badge
- `ReviewsCarousel.tsx`: Testimonials carousel
- `SchoolsServedSection.tsx`: Supplied schools and sports academies showcase
- `ShopCatalog.tsx`: Catalogue grid with category tabs, search, and sorting
- `StoreStrip.tsx`: Store introduction, store line, directions link, real Google reviews, and schools section
- `StickyMobileBar.tsx`: Mobile floating catalogue assistance bar
- `TrackingProvider.tsx`: Global tracking and navigation tracker wrapper
- `WhatsAppFloat.tsx`: Floating WhatsApp assistance button with pulsing beacon

### Products & Tracking System
- **Catalogue Data (`src/lib/products.ts`)**: 28 authentic products with ID, title, category, subCategory, description, fabric details, size ranges, image paths.
- **Tracking Core (`src/lib/analytics.ts` & `src/lib/track.ts`)**: Typed GA4 events (`page_view`, `view_item_list`, `select_item`, `view_item`, `search`, `add_to_cart`, `remove_from_cart`, `view_cart`, `whatsapp_click`, `generate_lead`, `form_submit`, `get_directions`, `phone_click`).
- **Tracking Dictionary**: Documented in `docs/ANALYTICS_TRACKING_GUIDE.md` (Section 2) and `CHANGES.md` (Step 5). Valid `button_location` values: `header`, `hero`, `product`, `request_list`, `footer`, `sticky_bar`, `video_call`.
