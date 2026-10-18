---
name: Zara-Inspired Editorial UI Design System
description: Editorial luxury e-commerce UI design principles, high-fashion layout grammar, typography hierarchies, and minimalist aesthetic inspired by Zara, The Row, and luxury ateliers.
---

# Zara-Inspired Editorial UI Design System

Architectural UI guidelines for creating a minimalist, editorial, high-fashion storefront for Warden & Sons.

## 1. Visual Philosophy & Editorial Grammar
- **Extreme Restraint & Breathing Space:** Generous negative space, uncluttered margins, minimal distraction. Let the garment photographs and craftsmanship breathe.
- **Asymmetry & Lookbook Grids:** Avoid generic marketplace grids. Alternate between 1-column immersive editorial heroes, 2-column staggered portraits, and horizontal lookbook carousels.
- **Hairline Precision:** Thin 1px borders (`border-neutral-200` or `border-black/10`), crisp rectangular buttons, razor-sharp dividers.
- **Micro-Typography Labels:**
  - Micro-caps for metadata: `text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-500`.
  - Category tags, fabric specs, and SKU labels kept understated and dignified.

---

## 2. Typography Hierarchy
Combine a timeless high-fashion serif with a modern grotesque sans-serif:
- **Editorial Headings & Brand Accents:**
  - Playfair Display, Cormorant Garamond, or Bodoni.
  - Used for hero banners, collection titles, atelier notes, and heritage callouts.
  - Font styling: `font-serif text-3xl md:text-5xl font-normal tracking-tight leading-[1.1]`.
- **Primary Body & Interface Elements:**
  - Geist Sans or Inter.
  - Used for navigation, product names, prices, size selectors, and button labels.
  - Clean, neutral, high-legibility geometry: `font-sans text-xs md:text-sm tracking-normal text-neutral-900`.
- **Price Displays:**
  - Understated: `₹799` with currency symbol aligned, never aggressive neon discount stickers. Compare-at prices rendered with a discrete line-through (`text-neutral-400 font-light line-through`).

---

## 3. Component Architecture & Design Patterns
- **Header:**
  - Slim, sticky, transparent-to-solid transition on scroll.
  - Centered brand monogram/wordmark with minimal icon actions (Search, Cart, WhatsApp Concierge).
  - Slide-over full-height mobile navigation drawer with smooth stagger animations.
- **Product Card (Zara Lookbook Style):**
  - Tall portrait ratio (`aspect-[3/4]` or `aspect-[4/5]`).
  - Subtle hover transition revealing secondary detail or model angle (`group-hover:scale-105 duration-700 ease-out`).
  - Bottom card layout: Product name in clean sentence case (`text-xs font-normal`), subtle category or fabric subtitle, and discrete price.
  - Discrete "Quick Add" / Size select pills sliding up on hover/tap.
- **Product Detail Page (PDP):**
  - Desktop: Split layout with sticky right rail (product details, sizes, dual-checkout buttons) and scrolling vertical image gallery on the left.
  - Mobile: Full-width edge-to-edge swipe gallery with micro dot indicators.
  - Collapsible accordions for: *Fabric & Care*, *Size & Fit Guide*, *South Bombay Delivery & Store Pickup*, *Heritage Craftsmanship*.

---

## 4. Buttons & Interactive States
- **Primary Action (Buy / Checkout):** Solid black (`bg-black text-white hover:bg-neutral-800`), rectangular or subtly rounded (`rounded-none` or `rounded-sm`), uppercase `tracking-wider text-xs font-medium py-3.5 px-6`.
- **Secondary Action (WhatsApp Order / Inquire):** Crisp bordered (`border border-neutral-300 text-neutral-900 hover:border-black`), or understated forest green accent for WhatsApp with brand harmony.
- **Interactive States:** No abrupt color changes; all transitions must use gentle easing (`duration-300 ease-out`).
