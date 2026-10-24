# Baseline Before State (P0 Preflight)

Date: October 24, 2026
Branch: `redesign-v2` (from `main` at `41f94f9`, tagged `pre-v2`)
Local Server: `http://localhost:4173/` (serving production `out/` build)

---

## 1. Taste Lint Audit (`lint.mjs src`)

- **Files Scanned**: 104 files
- **Total FAIL**: 129
- **Total WARN**: 96

### Breakdown of FAILs
- `[micro-label]` (36×): Tiny uppercase letter-spaced labels across pages and components.
- `[shadow]` (25×): Shadows on resting elements (`shadow-xl`, `shadow-sm`, `shadow-md`).
- `[hairline]` (53×): 1px divider lines and thin rules across components.
- `[mono]` (9×): Monospace type outside code blocks.
- `[numbering]` (3×): Decorative index numbers (`'01'`, `'02'`, `'03'`).
- `[emoji]` (3×): Emoji in UI (stars `★` and pencil `✎`).

### Breakdown of WARNs
- `[outlined-box]` (34×): 1px outlined boxes.
- `[transition-all]` (44×): Unspecific `transition: all`.
- `[glass]` (7×): Backdrop blur on panels.
- `[ease-in]` (6×): Sluggish `ease-in` animation curves.
- `[copy]` (3×): Stock marketing phrasing ("In today's", "seamless", "effortless").
- `[h-screen]` (1×): `height: 100vh` on mobile.
- `[em-dash]` (1×): 11 em-dashes across copy.

---

## 2. Taste Inspector Audit (`inspect.mjs`)

| Route | Viewport Metrics | FAIL Count | WARN Count | Key Violations |
| :--- | :--- | :--- | :--- | :--- |
| **`/` (Home)** | 3.2 screens, 344 words, 9 images, 56px Fraunces | **11 FAIL** | **2 WARN** | micro-label, emoji, hairline (9), outlined-box (11), small-text (15), focal-point, still-page (1 moving elem), overflow @768, covered-text @768, headline-lines (3 lines @390), eyebrow @390 |
| **`/shop/` (Hub)** | 2.0 screens, 220 words, 8 images, 56px Fraunces | **10 FAIL** | **3 WARN** | eyebrow, micro-label, emoji, hairline (7), outlined-box (7), few-pictures (3), small-text (10), focal-point, still-page (0 moving), overflow @768 |
| **`/shop/boys/` (Category)** | 2.5 screens, 268 words, 3 images, 56px Fraunces | **12 FAIL** | **5 WARN** | eyebrow, micro-label, emoji, hairline (19), outlined-box (18), few-pictures (0), small-text (15), focal-point, covered-text, still-page (0 moving), overflow @768, reduced-hidden (8 invisible text blocks) |
| **`/shop/boys/shorts-joggers-cargos/` (Subcategory)** | 2.8 screens, 328 words, 5 images, 56px Fraunces | **12 FAIL** | **2 WARN** | eyebrow, micro-label, emoji, hairline (9), outlined-box (4), few-pictures (2), small-text (12), focal-point, covered-text, still-page (0 moving), headline-lines @768, overflow @768 |

---

## 3. Mobile Lighthouse Audit (`http://localhost:4173/`)

- **Performance**: 76
- **Largest Contentful Paint (LCP)**: 6.4 s
- **Cumulative Layout Shift (CLS)**: 0
- **Total Blocking Time (TBT)**: 90 ms

---

## 4. Key Baseline Screenshots

Key before screenshots saved to `docs/redesign-v2/shots/`:
1. `docs/redesign-v2/shots/before-home-mobile.jpg` (Home mobile 390px fold)
2. `docs/redesign-v2/shots/before-home-desktop.jpg` (Home desktop 1440px fold)
3. `docs/redesign-v2/shots/before-shop-mobile.jpg` (Shop mobile 390px fold)
4. `docs/redesign-v2/shots/before-boys-desktop.jpg` (Boys desktop 1440px fold)
