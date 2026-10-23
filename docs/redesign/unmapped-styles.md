# Unmapped Catalogue Styles (Step R3)

**Date:** 2026-10-24  
**Source Catalogue:** `src/lib/products.ts` (28 total authentic styles)

---

## 1. Overview

Per the redesign Information Architecture in `REDESIGN_CONTEXT.md`, the 28 representative styles in `src/lib/products.ts` are mapped directly to `/shop/<category>/<sub>/` subcategories via their `id`.

- **Mapped to `/shop/` subcategories:** 25 styles
- **Unmapped to `/shop/`:** 3 styles (preserved in `src/lib/products.ts`)

---

## 2. Unmapped Styles Log

| Product ID | Title | Category in `products.ts` | Reason Unmapped from `/shop/` Subcategories |
| :--- | :--- | :--- | :--- |
| `cat-mn-04` | Classic Poplin Cotton Sleepwear Pajamas | `men` | The Men's IA explicitly defines: `innerwear`, `t-shirts`, `shorts-track-pants`, `gym-wear`, `thermals`, `socks-handkerchiefs`. There is no separate `nightwear` slug for Men in the IA spec. Preserved in `products.ts`. |
| `cat-bk-01` | Custom School Uniforms (Shirts, Pinafores & Trousers) | `bulk` | Belongs exclusively to `/bulk-orders/` (Institutional Orders), which sits at its own route outside the `/shop/` hierarchy per IA rule: *"UNIFORMS & BULK stays at /bulk-orders/ (not under /shop/)."* |
| `cat-bk-02` | Academy Sports Kits & House T-Shirts | `bulk` | Belongs exclusively to `/bulk-orders/` (Sports & School Academies). Preserved in `products.ts`. |

---

## 3. Preservation Guarantee

None of these 3 styles are deleted. They remain fully exported by `src/lib/products.ts` for `/bulk-orders/` and catalogue backward-compatibility.
