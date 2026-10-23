# Redesign Baseline Report (Step R0)

**Date:** 2026-10-24  
**Branch:** `redesign` (branched from `main` at `c2fb9a1`, tagged `pre-redesign`)  
**Commit Baseline:** `c2fb9a1` ("Step 10 fixes: analytics, tracking and conversion optimisation")

---

## 1. Quality & Build Checks

- **Lint (`npm run lint`):** PASS (0 errors, 0 warnings)
- **Production Build (`npm run build`):** PASS (Static HTML export generated successfully)

---

## 2. Next.js First-Load JS Sizes (Production Export)

From Next.js 15.5.28 static export build:

```text
Route (app)                                        Size  First Load JS
┌ ○ /                                           2.23 kB         167 kB
├ ○ /_not-found                                   993 B         104 kB
├ ○ /about                                        184 B         113 kB
├ ○ /apple-icon.png                                 0 B            0 B
├ ○ /blog                                       2.27 kB         110 kB
├ ● /blog/[slug]                                  179 B         108 kB
├   ├ /blog/newborn-clothing-essentials-mumbai
├   ├ /blog/kids-winterwear-guide-mumbai
├   ├ /blog/how-to-buy-kids-clothes-whatsapp
├   └ [+9 more paths]
├ ○ /bulk-orders                                5.86 kB         139 kB
├ ○ /contact                                    5.06 kB         138 kB
├ ○ /how-it-works                                 179 B         108 kB
├ ○ /icon.png                                       0 B            0 B
├ ○ /our-shops                                    181 B         108 kB
├ ○ /privacy-policy                               181 B         108 kB
├ ○ /robots.txt                                   127 B         103 kB
├ ○ /shipping-returns                             181 B         108 kB
├ ○ /shop                                         134 B         169 kB
├ ● /shop/[category]                              134 B         169 kB
├   ├ /shop/newborn
├   ├ /shop/boys
├   ├ /shop/girls
├   └ [+2 more paths]
├ ○ /sitemap.xml                                  127 B         103 kB
├ ○ /size-guide                                   179 B         108 kB
├ ○ /terms                                        181 B         108 kB
└ ○ /visit-us                                     184 B         113 kB
+ First Load JS shared by all                    103 kB
  ├ chunks/255-1f92380adbc6ec99.js              46.7 kB
  ├ chunks/4bd1b696-c023c6e3521b1417.js         54.2 kB
  └ other shared chunks (total)                 1.99 kB
```

---

## 3. Mobile Lighthouse Audits

Measured using Lighthouse 12.6.1 with headless Chrome (mobile emulation):

| Page | Performance | Accessibility | SEO | LCP | CLS | TBT |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `/` (Homepage) | 57 | 96 | 100 | 8.7 s | 0 | 280 ms |
| `/shop/newborn/` | 75 | 93 | 100 | 7.0 s | 0 | 20 ms |
| `/bulk-orders/` | 76 | 93 | 100 | 6.7 s | 0 | 40 ms |
| `/blog/newborn-clothing-essentials-mumbai/` | 64 | 96 | 100 | 8.5 s | 0.037 | 40 ms |

---

## 4. Visual Baseline Screenshots

Saved in `docs/redesign/baseline-shots/` via `agent-browser`:

- Mobile (`390x844`):
  - `home-mobile-390x844.png`
  - `shop-mobile-390x844.png`
  - `boys-mobile-390x844.png`
  - `how-it-works-mobile-390x844.png`
- Desktop (`1280x800`):
  - `home-desktop-1280x800.png`
  - `shop-desktop-1280x800.png`
  - `boys-desktop-1280x800.png`
  - `how-it-works-desktop-1280x800.png`
