---
name: Luxury Color Tokens & Haute Palette Architecture
description: Color tokens, design variables, and aesthetic guidelines matching the warm cream, deep forest green, and warm gold luxury boutique palette for Warden & Sons in Tailwind CSS v4.
---

# Luxury Color Tokens & Boutique Palette Architecture

A unified color token specification for Warden & Sons, creating a warm, premium, trustworthy family boutique feel.

## 1. Palette Foundation

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `color-warm-cream` | `#FAF8F5` | Site body background, soft warmth |
| `color-forest-green` | `#1B4332` | Primary brand color, headers, primary buttons, trust badges |
| `color-warm-gold` | `#D4A574` | Accent highlights, rating stars, category tags, CTAs |
| `color-near-black` | `#1A1A1A` | High-contrast typography, crisp product names |
| `color-card-white` | `#FFFFFF` | Product cards, modals, drawer surfaces with subtle shadow |
| `color-muted-slate` | `#666666` | Helper text, secondary descriptions, fabric notes |
| `color-border-subtle` | `#EBE7DF` | Soft hairline dividers, card outlines |
| `color-whatsapp` | `#25D366` | WhatsApp brand icon and checkout CTAs |

---

## 2. Tailwind CSS v4 `@theme` Configuration
In Tailwind v4, tokens are declared directly in CSS via `@theme`:
```css
@theme {
  --color-bg-cream: #FAF8F5;
  --color-forest: #1B4332;
  --color-forest-hover: #143527;
  --color-gold: #D4A574;
  --color-gold-hover: #C59663;
  --color-near-black: #1A1A1A;
  --color-border-soft: #EBE7DF;
  
  --font-serif: var(--font-playfair), Georgia, serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;
}
```

---

## 3. Aesthetic Rules & Principles
- **Warm & Trustworthy:** Clean, warm, premium family boutique aesthetic.
- **NO Harsh Brutalism:** No heavy black borders, no grayscale filters on product images, no cold newspaper styling.
- **Card Styling:** White cards with subtle shadow (`shadow-sm` or `shadow-md`), smooth rounded corners (`rounded-2xl`).
- **Touch-Friendly & Accessible:** Meets WCAG AAA contrast for body copy on `#FAF8F5` warm cream backgrounds. Minimum 44px+ touch targets on all interactive buttons.
