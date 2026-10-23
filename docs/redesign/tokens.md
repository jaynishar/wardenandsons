# Design Tokens & Palette Documentation (Step R1)

**Date:** 2026-10-24  
**Project:** Warden & Sons Kids Wear  
**Baseline Logo Asset:** `public/brand_logo.webp` (and `brand_logo.jpg`)

---

## 1. Brand Logo Asset Color Sampling

Using Node.js and `sharp`, the authentic brand logo (`public/brand_logo.webp`, dimensions 280x140) was analyzed by sampling non-background and non-text pixels across the emblem, banner, and crest:

- **Blue:**
  - Logo Sample Median: `#2F6BAB` (RGB: 47, 107, 171)
  - Logo Sample Average: `#4B7FAD` (RGB: 75, 127, 173)
  - Design Rule Token: `--blue: #2F5FA7` (RGB: 47, 95, 167)
  - **Verdict:** The listed `--blue: #2F5FA7` is a deep royal blue that is almost identical to the crest median (`#2F6BAB`) and offers superior contrast (5.93:1 vs 5.16:1 against `#FBF7F0`). Retained `--blue: #2F5FA7`.

- **Red:**
  - Logo Sample Median: `#E2282A` (RGB: 226, 40, 42)
  - Logo Sample Average: `#DF413E` (RGB: 223, 65, 62)
  - Design Rule Token: `--red: #D8402F` (RGB: 216, 64, 47)
  - **Verdict:** The logo red is a bright banner red, while `--red: #D8402F` is an editorial terracotta red. Since red is reserved strictly for tiny accents (e.g. 8x8 marker squares) and never used for body text or backgrounds, `--red: #D8402F` is preserved for its refined editorial warmth, matching the Zara-inspired aesthetic.

- **Yellow:**
  - Logo Sample Median: `#F2EE58` (RGB: 242, 238, 88)
  - Logo Sample Average: `#EFEC59` (RGB: 239, 236, 89)
  - Design Rule Token: `--yellow: #F1B434` (RGB: 241, 180, 52)
  - **Verdict:** The logo yellow is a bright canary yellow (`#F2EE58`), which has very poor visibility against warm ivory surfaces. `--yellow: #F1B434` (marigold gold) is preserved for the marker rotation as it provides distinct, visible warmth without washing out.

---

## 2. Core Color Tokens

| Token Name | Hex Value | Purpose / Usage |
| :--- | :--- | :--- |
| `--ivory` | `#FBF7F0` | Default page background |
| `--paper` | `#F3EDE2` | Elevated surface / card / placeholder tile |
| `--line` | `#E3DAC9` | Hairline borders (1px) |
| `--ink` | `#16233F` | Primary deep navy/black text and primary button fill |
| `--ink-soft` | `#4A5470` | Secondary muted text |
| `--blue` | `#2F5FA7` | Focus visible ring, active accents, links |
| `--red` | `#D8402F` | Accent marker square rotation |
| `--yellow` | `#F1B434` | Accent marker square rotation |
| `--wa` | `#0F7B4F` | WhatsApp action button fill with white text |

---

## 3. WCAG Contrast Verification

All text/background pairs pass WCAG AA (minimum 4.5:1):

| Pair | Role | Contrast Ratio | Result |
| :--- | :--- | :---: | :---: |
| `ink` on `ivory` (`#16233F` on `#FBF7F0`) | Primary body text | **14.61 : 1** | PASS |
| `ink-soft` on `ivory` (`#4A5470` on `#FBF7F0`) | Secondary text | **7.04 : 1** | PASS |
| `ink-soft` on `paper` (`#4A5470` on `#F3EDE2`) | Secondary text on tiles | **6.45 : 1** | PASS |
| `white` on `wa` (`#FFFFFF` on `#0F7B4F`) | WhatsApp CTA | **5.29 : 1** | PASS |
| `ivory` on `ink` (`#FBF7F0` on `#16233F`) | Primary CTA text | **14.61 : 1** | PASS |
| `blue` on `ivory` (`#2F5FA7` on `#FBF7F0`) | Focus / text link | **5.93 : 1** | PASS |

---

## 4. Typography Scale

- **Display Font:** `Fraunces` (weights: 500, 600) via `next/font/google` (`--font-display`)
- **Body Font:** `DM Sans` (weights: 400, 500, 700) via `next/font/google` (`--font-body`)
- **H1:** `clamp(34px, 8vw, 56px)` with line-height 1.15
- **Body:** `16px` base (`1rem`), line-height 1.6, never below `14px`
- **Uppercase Labels:** `12px` - `13px`, tracking `0.08em` (`letter-spacing: 0.08em`), uppercase
