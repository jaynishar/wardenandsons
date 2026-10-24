# Moved Content Audit: Step R5 (Homepage)

In accordance with Step R5 instructions, all long-form text, product grids, steps, FAQs, and heritage copy removed from the homepage are verified to exist on their dedicated pages before removal.

## 1. Featured Products Grid
- **Removed from homepage**: 6-item ProductCard grid, section header "Featured Cotton Basics", and "View Full Catalogue" link.
- **Destination**: `/shop/` (and category routes `/shop/newborn/`, `/shop/boys/`, `/shop/girls/`, `/shop/men/`, `/shop/women/`).
- **Status**: Verified intact. All 28 styles are preserved in `src/lib/products.ts` and rendered across catalogue pages.

## 2. "How to Buy" 3-Step Process
- **Removed from homepage**:
  - "1. Add to Request: Browse our shop by age including our boys playwear & nightsuits (0–16Y). Add items to your Request List without creating an account."
  - "2. Send on WhatsApp: Click send to open WhatsApp with your prefilled list directly to our Kemps Corner shop desk."
  - "3. Photos & Flat Sizing: Our shop team checks live racks, measures dimensions flat with a tape, and confirms pricing."
- **Destination**: `/how-it-works/`
- **Status**: Verified intact. `/how-it-works/` contains detailed 3-step cards ("01 Browse Catalogue & Build Request List", "02 Review & Send Request on WhatsApp", "03 Live Photos, Sizing & Confirmation") along with the deep-dive section "Why Our WhatsApp Shopping Flow Protects Parents" detailing live rack checks, measuring tape accuracy, and flexible pickup or delivery.

## 3. Frequently Asked Questions (FAQ)
- **Removed from homepage**: Full FAQ accordion with 6 questions:
  1. *How does WhatsApp enquiry and ordering work?*
  2. *How do you ensure the right fit and sizing for my child?*
  3. *What delivery and pickup options do you offer?*
  4. *Can I visit the physical shop at Kemps Corner in person?*
  5. *How do exchanges work if a size doesn't fit?*
  6. *Do you take custom school uniform or bulk institutional enquiries?*
- **Destination**: `/how-it-works/`
- **Status**: Verified intact. `src/app/how-it-works/page.tsx` renders the exact same `<FAQ />` component containing all 6 questions and answers verbatim. No questions were lost.

## 4. Heritage Copy & Trust Strip
- **Removed from homepage**:
  - "Serving generations of families from our Kemps Corner shop. Explore breathable newborn essentials, playwear, and everyday comfort basics crafted for Mumbai’s tropical climate."
  - Trust strip ("Breathable Cotton", "30+ Years in Kemps Corner", "WhatsApp Personal Care").
  - Announcement ticker strip.
- **Destination**: `/about/` (and `/visit-us/`).
- **Status**: Verified intact. `/about/` presents the complete 30-year heritage story: "Dressing South Mumbai’s Children For Generations", "Where Quality Meets Family Warmth", "Three Decades of Family Trust", and store location details.
