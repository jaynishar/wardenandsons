---
name: Luxury E-commerce SEO & Rich Schema
description: Industry-leading fashion e-commerce technical SEO, dynamic JSON-LD schemas, localized Mumbai store discovery, and Google Merchant Center readiness.
---

# Luxury Fashion E-Commerce SEO & Structured Data Mastery

Guidelines for dominating Google Search, Image Search, Google Merchant Center, and Local South Bombay discovery for Warden & Sons.

## 1. Structured Data Hierarchy (JSON-LD)
Every page must output deterministic, validated Schema.org JSON-LD scripts:

### Product Schema (`@type: Product`)
- `name`: Clean, brand-consistent title.
- `image`: Array of high-resolution image URLs with aspect ratio 1:1 or 4:5.
- `description`: Fabric-detailed, rich editorial description.
- `sku`: Unique identifier (e.g., `WS-NB-001`).
- `brand`: `{"@type": "Brand", "name": "Warden & Sons"}`.
- `offers`:
  - `@type: "Offer"`
  - `price`: Clean number (e.g., 799).
  - `priceCurrency`: `"INR"`.
  - `availability`: `"https://schema.org/InStock"` or `"https://schema.org/OutOfStock"`.
  - `itemCondition`: `"https://schema.org/NewCondition"`.
  - `seller`: `{"@type": "Organization", "name": "Warden & Sons"}`.
- `aggregateRating` (when reviews exist): Valid ratingValue and reviewCount.

### Local Business & Store Schema (`@type: ClothingStore`)
- Geolocation coordinates for South Bombay (Kemps Corner, Mumbai 400036).
- `telephone`: `+919920751567`.
- `openingHours`: Opening schedules for physical store visits.
- `hasMap`: Google Maps CID link.
- `priceRange`: `"$$"`.

### Breadcrumbs (`@type: BreadcrumbList`)
- Dynamic hierarchical itemListElement (`Home > Shop > Boys > Cotton T-Shirts`).

---

## 2. Dynamic Metadata Generation (`generateMetadata`)
- **Title Structure:** `<Product or Category Name> | Warden & Sons — Heritage Kidswear Mumbai`
- **Meta Description:** Must include key intent words (e.g., "100% combed cotton", "Kemps Corner Mumbai", "handcrafted kids wear", "WhatsApp ordering available").
- **Canonical URLs:** Self-referential `canonical` URL to avoid duplicate parameter indexing.
- **OpenGraph & Twitter:**
  - `og:type`: `"website"` or `"product"`.
  - High-res luxury 1200x630 OG image.
  - WhatsApp and iMessage rich preview support.

---

## 3. Image SEO & High-Fashion Indexing
- File naming convention: `warden-and-sons-<category>-<product-name>-<color>.webp`.
- Meaningful descriptive `alt` tags describing fabric, cut, and age suitability (e.g. `Warden & Sons Organic Cotton Bodysuits 3-pack for newborns 0-12M`).
- XML Image sitemap entries for Google Image search.

---

## 4. Crawl Optimization & Semantic HTML
- Automated `sitemap.xml` and `robots.txt` generated via Next.js App Router route handlers.
- Strictly semantic HTML: `<header>`, `<main>`, `<article>`, `<section>`, `<nav>`, and single `<h1>` per page.
- Clean heading hierarchy (`h1` -> `h2` -> `h3`) without skipping levels.
- Zero broken links, zero duplicate H1s, zero unindexed orphan pages.
