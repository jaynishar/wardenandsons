---
name: E-Commerce Conversion UX & Mobile Patterns
description: World-class conversion rate optimization, thumb-zone mobile navigation, sticky action bars, instant cart drawers, and frictionless checkout flows for luxury e-commerce.
---

# E-Commerce Conversion UX & Mobile Patterns

Best practices for optimizing user experience, reducing abandonment, and driving seamless multi-channel conversions on mobile and desktop.

## 1. Mobile Thumb-Zone Architecture
Over 80% of Indian fashion traffic is mobile. Optimize all interactions for single-hand thumb navigation:
- **Sticky Bottom Action Bar:**
  - On product detail pages (PDP), maintain a persistent bottom bar once user scrolls past the primary hero.
  - Dual action buttons: `Add to Bag` + `WhatsApp Order`.
  - Always keep primary CTA within the natural thumb sweep area (bottom 30% of viewport).
- **Persistent Bottom Navigation (Storewide):**
  - Essential 4-5 icons: *Shop*, *Categories*, *Search*, *Wishlist/Bag*, *WhatsApp*.
  - Floating WhatsApp badge anchored safely above the bottom nav bar with z-index isolation.

---

## 2. Slide-Out Cart Drawer UX
Avoid redirecting users to a separate cart page on "Add to Bag":
- Trigger an instant slide-over drawer from the right on desktop, or slide-up sheet on mobile.
- **Cart Drawer Elements:**
  - Free shipping progress bar (e.g., "Add ₹201 more for Free Express Delivery across Mumbai").
  - Clear item thumbnail, title, selected size/color, quantity stepper, and unit price.
  - Dual Action CTAs:
    - **Proceed to Payment Gateway** (Online payment via UPI / Card / Netbanking).
    - **Order via WhatsApp** (Dispatches entire cart summary directly to sales team).
  - Cross-sell / "Complete the Look" slider (curated 1-click add-on items like socks, swaddles, or accessories).

---

## 3. Size & Fit UX (Kidswear Critical)
Kids sizing is the #1 cause of return friction:
- Interactive Size Selector with clear age ranges and garment measurements (Chest in inches, Length in cm).
- Visual "Size Guide" modal accessible directly above the size selector.
- Visual stock feedback:
  - In-stock sizes enabled with clear visual border.
  - Low-stock indicator (`Only 2 left in 4-5Y - order soon`).
  - Out-of-stock sizes strike-through with "Notify on WhatsApp" fallback.

---

## 4. Frictionless Checkout UX
- Single-page accordion or 2-step checkout flow.
- Support **Guest Checkout** by default (phone number or email, no mandatory password creation).
- Auto-detect City and State from 6-digit Indian PIN code.
- Provide instant payment options (UPI intent apps: GPay, PhonePe, Paytm, plus Credit/Debit Cards & Netbanking).
- WhatsApp order confirmation sent automatically after order placement.
