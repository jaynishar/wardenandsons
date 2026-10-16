# Owner Decisions Required — Jay's Confirmation List

The following operational, legal, and product decisions are required from the business owner (Jay). In accordance with the non-negotiable rules, no facts, policies, credentials, or stock details are invented. Until explicitly confirmed, conservative, truthful defaults are maintained in the codebase.

---

## 1. Store Identity & Legal Details
- [ ] **Exact Legal Business Name:** Currently represented as "Warden & Sons" / "Warden & Sons Kids Wear". Please confirm exact legal / registered trade entity name.
- [ ] **Physical Street Address & Landmarks:** Currently displayed as `Kemps Corner, South Mumbai, Mumbai, Maharashtra 400036` (Near Pedder Road flyover, Altamount Road, Breach Candy, and Nepean Sea Road). Please provide full shop/building number and street name if required.
- [ ] **Google Business Profile & Map Link:** Currently using generic search link `https://maps.google.com/?q=Kemps+Corner+Mumbai+400036`. Please confirm official Google Maps place / CID link.
- [ ] **Establishment Year / "30+ Years":** Project files previously cited both 1994 and 1995. Current copy uses "Serving South Mumbai families for over 30 years". Please confirm whether this wording is approved or if an exact verified incorporation year is preferred.
- [ ] **Phone & WhatsApp Number:** Currently using `+91 99207 51567`. Please confirm this is the official primary WhatsApp number for catalogue requests and customer orders.
- [ ] **Email Address & GST Number:** Confirm if an official customer service email address or GSTIN should be published in the footer or contact page.
- [ ] **Instagram / Social Profiles:** Confirm official Instagram/social handle URLs, or confirm omission from the site.

---

## 2. Canonical Hostname & Domain Architecture
- [ ] **Canonical Hostname:** Live website currently resolves at `https://wardenandsons.in/`, but codebase historically contained `wardenandsons.com`. We recommend standardizing 100% of canonical links, sitemaps, Open Graph, and JSON-LD schemas to `https://wardenandsons.in`. Please confirm.
- [ ] **Apex vs WWW:** Confirm whether `www.wardenandsons.in` should permanently 301-redirect to `https://wardenandsons.in`.

---

## 3. Product Catalogue & Material Claims
- [ ] **Approved Six Categories:**
  1. Newborns & Infants (0–24 Months)
  2. Boys' Wear (0–16 Years)
  3. Girls' Wear (0–16 Years)
  4. Men's Basics & Loungewear (Sizes S–XXL)
  5. Women's Basics & Loungewear (Sizes S–XXL)
  6. Custom Uniforms & Bulk Orders (Schools, Academies, Institutional)
  *Confirm whether all six categories remain active, and whether adult basics remain in scope.*
- [ ] **Fabric & Material Claims:** Verify cotton composition claims. Remove unverified blanket claims of "100% organic cotton" or "pure combed cotton" where synthetic blends (e.g. poly-cotton cricket whites, dryfit microfibers, elastane stretch leggings) are present.
- [ ] **Product Photography:** The storefront image (`/store_front.jpg`) and brand logo (`/brand_logo.jpg`) were previously used as fallback photos for individual garments. Confirm approval to use clean, labeled SVG/neutral category placeholders instead of misrepresenting the shop sign as garment photos.

---

## 4. Fulfillment, Delivery & Exchange Policies
- [ ] **Store Pickup:** Confirm in-store pickup procedures and operating hours (currently Mon–Sat 10:30 AM – 8:30 PM, Sunday closed).
- [ ] **Local Mumbai Delivery:** Confirm delivery partners, approximate delivery timeframes, and courier fee policy.
- [ ] **Pan-India Delivery:** Confirm courier coverage outside Mumbai and associated policies.
- [ ] **Exchanges / Returns:** Confirm whether size exchanges are permitted within a specified window (e.g. 7 days with tags attached) and whether newborn innerwear has hygiene restrictions.
- [ ] **Custom School Uniform Minimums:** Confirm minimum order quantities (MOQ) for bulk uniform orders.

---

## 5. Analytics & Search Console Access
- [ ] **Google Analytics 4 (GA4):** Provide GA4 Measurement ID (e.g., `G-XXXXXXXXXX`) if analytics tracking is requested. (Left uninitialized until supplied to protect load performance and consent privacy).
- [ ] **Google Search Console:** Confirm who manages GSC domain verification and sitemap submissions.
