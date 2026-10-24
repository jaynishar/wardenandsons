# REDESIGN V2 Progress: P0 to P9

- **Branch started from**: `main` at commit `41f94f9862a9ba4b7b83098a90c2c713100787b5`
- **Git tag**: `pre-v2`
- **Active working branch**: `redesign-v2`
- **SKILL_DIR**: `.agents/skills/taste-skill` (verified: `SKILL.md`, `scripts/draw.mjs`, `lint.mjs`, `inspect.mjs`, `references/`)
- **Node version**: `v24.22.1` (>= 22)
- **Browsers installed**: Google Chrome (`C:\Program Files\Google\Chrome\Application\chrome.exe`), Microsoft Edge (`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`)

---

## Checklist

- [x] **P0: Preflight (no design changes yet)**
  - Git pre-v2 tag created and branched to `redesign-v2` from `main` (`41f94f9`).
  - Node 22+ confirmed (`v24.22.1`); Chrome & Edge confirmed.
  - Taste-skill found at `.agents/skills/taste-skill`.
  - Read `SKILL.md` and reference docs in full.
  - Added `.taste-skill/` to `.gitignore`.
  - Created `scripts/serve-out.mjs` and npm script `serve:out`.
  - Recorded BEFORE state: baseline build, inspected `/`, `/shop/`, `/shop/boys/`, `/shop/boys/shorts-joggers-cargos/` via `inspect.mjs` into `.taste-skill/before/`, and ran `lint.mjs`.
  - Authored `docs/redesign-v2/before.md` with FAIL/WARN counts and copied 4 key screenshots to `docs/redesign-v2/shots/`.
  - Lighthouse mobile recorded for `/`: Perf 76, LCP 6.4s, CLS 0, TBT 90ms.
  - Committed "P0: preflight and before-state".

- [x] **P1: Direction from the taste-skill**
  - Ran `draw.mjs` with `--sector fashion --direction specimen-catalogue` (seed `13704476`).
  - Redrew type slot to `Hanken Grotesk` (clean sans-serif available in `next/font/google`).
  - Redrew contact section to `contact-address-display-rows` to accurately present store address and contact details.
  - Adjusted palette to authentic logo red, blue, yellow, ink navy on pure white ground.
  - Defined idea sentence and the one live thing (category picker + live IST store status).
  - Authored copy deck in `src/content/copy.ts`.
  - Saved direction metadata to `docs/redesign-v2/direction.md`.
  - Committed "P1: direction and copy deck".

- [x] **P2: Tokens, type and the logo**
  - Sampled exact logo colors via `scripts/sample-logo.mjs` (#DF232C red, #2566AE blue, #F6EF4B yellow, #0E1A33 ink, #55607A muted, #0F7B4F wa).
  - Defined CSS variables & Tailwind `@theme` in `src/app/globals.css`.
  - Configured square shapes (radius 0), 52px flat buttons with 3px focus ring, and flat chips.
  - Replaced Fraunces and DM Sans with `Hanken_Grotesk` loaded via `next/font/google`.
  - Rebuilt authentic Logo in `src/components/Logo.tsx` with tight crop and 0 background alpha.
  - Generated transparent assets (`public/brand/logo.webp`, `public/brand/logo.png`) and `public/og-card.jpg` (1200x630).
  - Verified all 9 contrast pairs pass WCAG AA (>= 4.5:1) and logo transparency on colored surfaces (`docs/redesign-v2/shots/test-logo-on-*.png`).
  - Committed "P2: tokens, type, logo".

- [ ] **P3: Drawn specimens and imagery**
  - Created SVG sprite of ~16 flat garment silhouettes in layout.
  - Built `Garment` component with `<use href="#g-...">`.
  - Created `src/data/specimens.ts` mapping every sub-category slug to a garment and rotating tile color.
  - Extended `Photo` to `Specimen` with photo fallback to flat color tile + drawn garment silhouette.
  - Mapped existing authentic photos to appropriate slots.
  - Committed "P3: specimen art".

- [ ] **P4: Pages**
  - Rebuilt Homepage (`/`) with dealt blueprints: Hero with big logo, H1, live category picker, live open-now line; Catalogue with native drag row; Showcase; How it works; Reviews; Visit us; Footer.
  - Rebuilt `/shop/`, `/shop/<category>/`, `/shop/<category>/<sub>/` with specimen tiles, 2/3/4 column responsive grid, SEO text in `<details>`.
  - Verified all other pages inherit tokens, typography, header, and footer without breakage.
  - Committed "P4: pages".

- [ ] **P5: App chrome and the WhatsApp button**
  - Rebuilt Header & Mobile Bottom Bar (plain white bar, square badge, proper sizing).
  - Restyled MenuSheet, AddSheet, ListSheet with square flat tokens.
  - Diagnosed WhatsApp button and logged findings in `docs/redesign-v2/whatsapp-diagnosis.md`.
  - Rebuilt unified `WhatsAppButton` and 56x56 floating tile with correct safe-area offsets and automated overlap checks (`docs/redesign-v2/fab-check.md`).
  - Restyled guided chat panel as bottom sheet / desktop panel.
  - Committed "P5: chrome and WhatsApp".

- [ ] **P6: The motion layer**
  - Implemented 1.2s load sequence (tile drop, masked H1 rise, shutter specimen tile).
  - Implemented hero picker crossfade.
  - Choreographed section entrances via IntersectionObserver.
  - Added pointer hover/press transforms.
  - Added Add-to-list fly-to-cart animation.
  - Added marquee, rolling "1994" counter, sheet open stagger, template route transitions.
  - Verified full `prefers-reduced-motion` compliance.
  - Committed "P6: motion".

- [ ] **P7: Speed budget**
  - First-load JS <= 150 KB gzipped per route.
  - Inline SVG hero tile, CLS <= 0.05.
  - Lab mobile Lighthouse targets: Performance >= 90, LCP <= 2.5s, TBT <= 200ms.
  - Committed "P7: performance".

- [ ] **P8: Gates (run the skill's own checks)**
  - Tests passing (`npm run lint`, `npm run build`, `npm test`).
  - `inspect.mjs` and `lint.mjs` reporting 0 FAIL across all required routes and viewports.
  - Three rounds of critique in `docs/redesign-v2/critique.md`.
  - Full interaction QA, SEO parity audit, privacy verification (0 PII).
  - Committed "P8: gates and fixes".

- [ ] **P9: Report and stop**
  - Authored `docs/redesign-v2/FINAL_REPORT.md` with all required metrics, before/after comparisons, and deploy checklist.
  - Concise response in 10 lines or fewer.
