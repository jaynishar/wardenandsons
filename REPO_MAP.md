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
- **Status**: PASS (Exit code 0, 37/37 static pages successfully generated)
