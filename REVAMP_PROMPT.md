# Warden & Sons Kids Wear - Website Revamp Instructions

You are rebuilding a Next.js 15 + React 19 + Tailwind CSS 4 + TypeScript website for "Warden & Sons Kids Wear", a heritage kids clothing store in Kemps Corner, Mumbai (since 1994). The site is deployed as a static export on Hostinger.

## BUSINESS MODEL
- NO online selling/payments
- Customers browse product categories, add items to cart
- "Checkout" = sending pre-filled WhatsApp order message to +91 9920751567
- Owner responds on WhatsApp with actual photos/availability
- Products shown are samples - actual inventory is much larger

## TECH STACK (DO NOT CHANGE)
- Next.js 15.1.7 (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS 4
- Zustand (with persist middleware) for cart state
- Framer Motion (subtle animations only)
- Lucide React icons
- next/font (Inter + Playfair Display)

## DESIGN SYSTEM
- Background: Warm cream (#FAF8F5)
- Primary: Deep forest green (#1B4332)
- Accent: Warm gold (#D4A574)
- Text: Near black (#1a1a1a)
- Cards: White with subtle shadow, rounded-2xl
- Mobile-first: single column, 44px+ touch targets
- NO heavy borders, NO grayscale filters, NO editorial newspaper style
- Clean, warm, premium family boutique feel
- Font: Inter (body) + Playfair Display (headings)

## PAGES TO BUILD

### 1. Homepage (/)
- Hero: Large heading, store photo, "Shop Now" CTA
- Marquee strip: "Est. 1994 | Kemps Corner | 100% Cotton"
- "How It Works" section (3 steps with icons, impossible to miss)
- Category grid (5 categories: Newborn, Boys, Girls, Men, Women)
- Featured products (6 items)
- WhatsApp CTA section
- Store info + hours
- Footer

### 2. Shop Page (/shop)
- All products with category filter pills
- Search bar
- Product cards: image, name, price, "Add to Cart" button
- Grid: 2 cols mobile, 3-4 cols desktop

### 3. Category Pages (/shop/[category])
- Filtered products for that category
- Same layout as shop page

### 4. How It Works (/how-it-works)
- Detailed 3-step guide
- FAQ section (accordion)
- WhatsApp CTA

### 5. About (/about)
- Heritage story since 1994
- Store photo
- Family business narrative

### 6. Visit Us (/visit-us)
- Store address with map link
- Opening hours
- Contact buttons

### 7. Contact (/contact)
- Contact form
- Phone, WhatsApp, address
- Opening hours

### 8. Bulk Orders (/bulk-orders)
- B2B inquiry form
- Minimum 50 pieces info

## CART SYSTEM (CRITICAL)
Use Zustand with persist middleware:

```typescript
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  subCategory: string;
}
```

Cart features:
- Add/remove items
- Quantity +/- controls
- Persist in localStorage
- Cart badge showing item count
- Slide-out cart drawer (right side on desktop, bottom sheet on mobile)
- "Send Order on WhatsApp" button

## WHATSAPP ORDER FORMAT
When customer clicks "Send Order on WhatsApp":
1. Show a small form asking for: Name, Delivery preference (Pickup/Home Delivery)
2. Generate this message:

```
Hello Warden & Sons! I'd like to place an order:

1. [Product Name] - ₹[Price] × [Qty]
2. [Product Name] - ₹[Price] × [Qty]

Total Items: [count]
Estimated Total: ₹[total]

Name: [name]
Delivery: [preference]

Please share availability & photos. Thank you!
```

3. Open: `https://wa.me/919920751567?text=${encodeURIComponent(message)}`
4. Clear cart after opening

## PRODUCT DATA
Use this TypeScript structure. Products should be realistic Indian kids wear:

```typescript
interface Product {
  id: string;
  name: string;
  category: 'newborn' | 'boys' | 'girls' | 'men' | 'women';
  subCategory: string;
  price: number; // in INR
  sizes: string;
  fabric: string;
  description: string;
  image: string; // path to image
  inStock: boolean;
}
```

Include 8-10 products per category (40-50 total). Use realistic Indian kids clothing items with proper pricing.

## COMPONENTS NEEDED
- Header (sticky, logo + nav + cart icon)
- Footer (contact info, categories, hours)
- BottomNav (mobile: Home, Shop, Categories, Cart, WhatsApp)
- ProductCard (image, name, price, add to cart)
- CartDrawer (slide-out cart)
- WhatsAppFloat (floating green button)
- CategoryGrid
- HowItWorks
- FAQ (accordion)
- ContactForm
- BulkOrderForm
- Hero

## PERFORMANCE REQUIREMENTS
- All images lazy loaded
- Minimal JS bundle
- Subtle animations only (fade-in on scroll)
- Preconnect fonts
- Target < 2s load on 4G mobile

## DEPLOYMENT
- `next.config.ts` must have `output: 'export'`
- Build with `npm run build`
- Output goes to `out/` folder for Hostinger upload

## FILE STRUCTURE
```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    shop/
      page.tsx
      [category]/page.tsx
    how-it-works/page.tsx
    about/page.tsx
    visit-us/page.tsx
    contact/page.tsx
    bulk-orders/page.tsx
  components/
    Header.tsx
    Footer.tsx
    BottomNav.tsx
    ProductCard.tsx
    CartDrawer.tsx
    WhatsAppFloat.tsx
    CategoryGrid.tsx
    HowItWorks.tsx
    FAQ.tsx
    ContactForm.tsx
    BulkOrderForm.tsx
    Hero.tsx
  lib/
    products.ts
  store/
    cart.ts
```

Build the complete working website. Every page must be fully functional. The cart must work. The WhatsApp integration must work. Make it look premium, warm, and trustworthy.

## STEP-BY-STEP EXECUTION ORDER

Execute these steps one at a time. After each step, verify the build works before moving to the next.

### Step 1: Install Dependencies & Configure
- Install zustand
- Configure next.config.ts for static export
- Set up Tailwind with custom color tokens
- Configure fonts (Inter + Playfair Display)

### Step 2: Create Product Data
- Build src/lib/products.ts with 40-50 products
- 8-10 per category: newborn, boys, girls, men, women
- Realistic Indian kids clothing with proper pricing

### Step 3: Create Cart Store
- Build src/store/cart.ts with Zustand + persist
- Add, remove, update quantity, clear functions

### Step 4: Build Layout & Global Styles
- Root layout with metadata, fonts, JSON-LD schema
- globals.css with Tailwind + custom properties
- Remove GTM placeholder scripts

### Step 5: Build Core Components
- Header (sticky, responsive, cart badge)
- Footer (contact, categories, hours)
- BottomNav (mobile sticky nav)
- WhatsAppFloat (floating green button)
- ProductCard (image, name, price, add to cart)
- CartDrawer (slide-out with WhatsApp checkout)

### Step 6: Build Homepage
- Hero section
- Marquee strip
- How It Works section
- Category grid
- Featured products
- WhatsApp CTA
- Store info

### Step 7: Build Shop Pages
- /shop with filters and search
- /shop/[category] for each category

### Step 8: Build Info Pages
- /how-it-works (3-step guide + FAQ)
- /about (heritage story)
- /visit-us (location + hours)
- /contact (form + details)
- /bulk-orders (B2B form)

### Step 9: Build & Deploy
- Run npm run build
- Verify out/ folder has all HTML files
- Test locally before deploying to Hostinger

### Step 10: Hostinger Deployment
- Upload out/ contents to Hostinger public_html via File Manager or FTP
- Point domain to the folder
- Test the live site

## IMPORTANT NOTES
- Do NOT use placeholder content everywhere - make it real and specific to Warden & Sons
- The WhatsApp number is +91 9920751567
- Store address: Kemps Corner, South Mumbai, Mumbai, Maharashtra 400036
- Store hours: Mon-Sat 10:30 AM - 8:30 PM, Sunday Closed
- Make sure the cart drawer works on mobile (bottom sheet style)
- The "How It Works" section must be visible without scrolling too much on mobile
- Every "Add to Cart" button must actually add to the cart
- The WhatsApp message must include all cart items formatted correctly
