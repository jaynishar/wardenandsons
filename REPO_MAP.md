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

### Old Request List Architecture
- **State Store & Hook**: `src/store/cart.ts` (`useCartStore`, `RequestItem`, persisted in localStorage key `warden-request-list-storage` with deferred non-blocking storage writes)
- **UI Drawer**: `src/components/CartDrawer.tsx` (Slide-over drawer with item details, quantity, removal, and WhatsApp launch)
- **Message Builder**: `src/lib/whatsapp.ts` (`formatWhatsAppRequestMessage`, `buildWhatsAppRequestUrl`, max safe length guard 1,800 chars)
- **Triggers**: `src/components/Header.tsx` (toggle cart trigger with item count badge), `src/components/ProductCard.tsx` ("Add to Request" action button)

### All Components in `src/components/` (25 files)
- `AnalyticsNavigationTracker.tsx`: Client-side route change tracking with deduplication
- `BlogFilterList.tsx`: Blog category filter tabs
- `BottomNav.tsx`: Mobile fixed bottom navigation
- `BreadcrumbJsonLd.tsx`: Breadcrumb schema structured data
- `Breadcrumbs.tsx`: Visual navigational breadcrumbs
- `BulkOrderForm.tsx`: Bulk uniform enquiry form
- `CartDrawer.tsx`: Request list sliding drawer
- `CategoryGrid.tsx`: Visual department category tiles
- `ConsentBanner.tsx`: Google Consent Mode v2 user consent banner
- `ContactForm.tsx`: General store query form
- `FAQ.tsx`: Accordion frequently asked questions
- `Footer.tsx`: Boutique contact banner, department links, store timings, cookie preferences
- `GoogleReviewsBlock.tsx`: Local Google review summary badge
- `Header.tsx`: Responsive navigation header with brand logo crest
- `Hero.tsx`: Homepage hero section
- `HowItWorks.tsx`: WhatsApp ordering 3-step feature block
- `JsonLd.tsx`: Storefront schema.org JSON-LD
- `ProductCard.tsx`: Catalogue item card with instant WhatsApp and request list actions
- `ReplyPromise.tsx`: Response time assurance badge
- `ReviewsCarousel.tsx`: Testimonials carousel
- `SchoolsServedSection.tsx`: Supplied schools and sports academies showcase
- `ShopCatalog.tsx`: Catalogue grid with category tabs, search, and sorting
- `StickyMobileBar.tsx`: Mobile floating catalogue assistance bar
- `TrackingProvider.tsx`: Global tracking and navigation tracker wrapper
- `WhatsAppFloat.tsx`: Floating WhatsApp assistance button with pulsing beacon

### Products & Tracking System
- **Catalogue Data (`src/lib/products.ts`)**: 28 authentic products with ID, title, category, subCategory, description, fabric details, size ranges, image paths.
- **Tracking Core (`src/lib/analytics.ts` & `src/lib/track.ts`)**: Typed GA4 events (`page_view`, `view_item_list`, `select_item`, `view_item`, `search`, `add_to_cart`, `remove_from_cart`, `view_cart`, `whatsapp_click`, `generate_lead`, `form_submit`, `get_directions`, `phone_click`).
- **Tracking Dictionary**: Documented in `docs/ANALYTICS_TRACKING_GUIDE.md` (Section 2) and `CHANGES.md` (Step 5). Valid `button_location` values: `header`, `hero`, `product`, `request_list`, `footer`, `sticky_bar`, `video_call`.
