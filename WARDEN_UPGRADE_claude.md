# WARDEN & SONS — Website Upgrade Brief
For: Gemini (Flash 3.8, high) in Antigravity CLI. Repo: the existing live Next.js site at https://wardenandsons.in.
Written Oct 2026 from a live audit of the site. Read this file ONCE, then execute Phase 0 → Phase 10 in order.

---

## 0. Mission

Warden & Sons is a 30-year-old kids' wear retail store at Kemps Corner, South Mumbai. The website does **not** sell online.
Its one job: **let a customer pick what they need, then open WhatsApp with a ready-written, itemised message.** All business (photos, prices, payment, delivery) happens on WhatsApp.

- Primary conversion = tap on **"Send on WhatsApp"**. Everything is judged by whether it makes that tap more likely.
- Most visitors are on phones (India is ~77% mobile per StatCounter, Sept 2026). **Design at 390px width first**, then scale up.
- Keep the stack: **Next.js (App Router) + React + TypeScript + Tailwind**. Do NOT rewrite in another framework. Fix what is wrong; do not rebuild what works.

## 1. Run rules (the daily token limit is real — obey these)

1. Work on a new branch: `git checkout -b upgrade/oct-2026`. Commit locally after every phase: `phase N: <summary>`. **Never push, never merge to main.** Jay reviews first.
2. After each phase, append ≤10 lines to `PROGRESS.md`: phase number, ✅/⚠️, what changed, numbers measured. Tick the phase checkbox.
3. Do not paste file contents, diffs or long explanations into chat. Use `grep`/`rg` to locate code. Do not re-read a file you already read. Batch related edits into one step.
4. Chat output per phase: max 3 lines. No summaries of this brief.
5. If a command fails, show the **exact error text** in `PROGRESS.md` under `## BLOCKERS`, try ONE different fix, and if it still fails, log it and move to the next phase. Never loop.
6. Never leave the repo unbuildable. Run `npm run build` at the end of every phase; fix before committing.
7. **Resume protocol:** if `PROGRESS.md` already exists, read it and continue from the first unticked phase. Do not redo finished phases.
8. If you are about to run out of budget, finish the current phase cleanly, commit, write `PROGRESS.md`, and stop.
9. Phases 0–5 and 10 are MUST. Phases 6–9 are SHOULD (do them in order, as budget allows).
10. Never invent facts (prices, fabric, GST number, reviews, policies, coordinates, years). Where a fact is missing, write `TODO_JAY` in the code, add a line to `NEEDS_JAY.md`, and keep going.

## 2. Verified business facts (use exactly; do not change)

| Item | Value |
|---|---|
| Name | Warden & Sons Kids Wear |
| Canonical site | https://wardenandsons.in |
| Address | Kemps Corner, South Mumbai, Mumbai, Maharashtra 400036 (near Pedder Road Flyover) |
| Hours | Mon–Sat 10:30–20:30, Sunday closed (timezone Asia/Kolkata) |
| Phone | +91 99207 51567 |
| WhatsApp | https://wa.me/919920751567 |
| Instagram | @wardenandsonskidswear |
| Claim | "30+ years" serving South Mumbai families |
| Categories | Newborns & Infants (0–24M) · Boys (0–16Y) · Girls (0–16Y) · Men's Basics (S–XXL) · Women's Basics (S–XXL) · School Uniforms & Bulk |
| Brand | Logo = "WARDEN&SONS" in alternating red/blue/yellow letter tiles, slightly tilted, "KIDS WEAR" in bold blue beneath, on cream. Use the existing logo file; never re-draw it. |
| Content rule | Kids dominate visually. Adults appear only as two small categories (basics/comfort). |

## 3. Audit findings you must fix (verified on the live site, Oct 2026)

| ID | Severity | Finding | Fixed in |
|---|---|---|---|
| F1 | Critical | Canonical URL, `robots.txt` and `sitemap.xml` point to **wardenandsons.com**, but pages and links live on **wardenandsons.in**. Search engines are told the wrong home. | P1 |
| F2 | Critical | Catalogue cards reuse `store_front.jpg` (hero + 6 cards) and `brand_logo.jpg`. No real product/category photos. All images are `.jpg` (no WebP/AVIF). | P3, P7 |
| F3 | High | Literal `&amp;` shows in `<title>`, meta description and logo alt text (double-encoding). | P1 |
| F4 | High | Sitemap lists `/whatsapp-shopping`, `/video-shopping`, `/shop/newborn`… but live nav uses `/how-it-works/`, `/shop/`, `/visit-us/`. Every static page has the same `lastmod` (build date). | P1 |
| F5 | High | Request flow is hard to see: no visible request list/count/drawer, no size/colour/qty on cards, no sample message. Only a generic greeting template exists. | P4 |
| F6 | High | 28 cards with overlapping categories (Sportswear ×3, Nightwear ×3 + Night Suits, T-Shirts + Plain T-Shirts, Bottoms ×2), a 24-option type filter, A–Z sort, and "Pricing: Confirmed on WhatsApp" repeated on every card. | P3 |
| F7 | High | Site claims "100% pure / organic combed cotton" while some items are polyester, microfibre, poly-cotton or cotton-spandex. | P3 |
| F8 | Medium | FAQ: only 1 of 6 answers is visible. | P5 |
| F9 | Medium | `/reviews` page has zero reviews under a "Customer Stories" heading. | P8 |
| F10 | Medium | Inconsistent names: Store/Atelier/Boutique; South Mumbai/South Bombay; Request/Request List/Add to Request. Size ranges inconsistent across category vs card; "Night Suits" audience unclear; "Free Size (Fitted S–XL)" unclear. | P3, P6 |
| F11 | Medium | H1 "Pure Cotton Comfort For Your Little Ones." contains no search terms (kids clothing / Kemps Corner / Mumbai). | P6 |
| F12 | Unverified | `lang` attribute, Open Graph/Twitter tags, JSON-LD, Core Web Vitals, real mobile rendering were NOT verified. Measure/inspect in P0 and fix if missing. | P0, P2, P7 |
| F14 | High | Live `robots.txt` has `Disallow: /_next/`, which blocks the CSS, JS and optimised images Google needs to render the site. | P1 |
| F13 | Medium | Trust gaps: map is a link only, no social links, no email, no GST/registration shown, no reviews. | P8 |

## 4. Phases

### ☐ PHASE 0 — Recon + baseline (read-only, cheap)
1. Read `package.json`, `next.config.*`, `tailwind.config.*` / CSS entry, `app/` (or `pages/`) tree, `public/` listing, and the files that build the request list + WhatsApp message (`grep -ri "wa.me\|request" src app components lib`).
2. `npm ci` (or `npm i`), `npm run build`.
3. Serve the production build and run Lighthouse mobile:
   `npx lighthouse http://localhost:3000 --form-factor=mobile --only-categories=performance,seo,accessibility,best-practices --output=json --output-path=./lh-baseline.json --quiet --chrome-flags="--headless=new"`
   Repeat for `/shop/`.
4. Write `PROGRESS.md` with: Next.js version; App Router or Pages; **output mode** (`output: 'export'` static, or server/SSR; any real `/api` routes used by the UI); image handling; font handling; where request-list state lives; whether `lang`, OG/Twitter tags and JSON-LD exist; baseline Lighthouse scores + LCP/CLS/TBT.
5. Create empty `NEEDS_JAY.md`.
**Done when:** PROGRESS.md has all items above. No source code changed.

### ☐ PHASE 1 — Fix the SEO bugs (F1, F3, F4, F12, F14)
1. Create `lib/site.ts`: `export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wardenandsons.in"` plus business constants from §2 (name, phone, WhatsApp number, address, hours). **Every** canonical, `metadataBase`, OG url, sitemap entry, robots sitemap line and JSON-LD url must come from `SITE_URL`. Remove all hard-coded `wardenandsons.com`.
2. Replace the double-encoded `&amp;`: titles, descriptions and alt text must be plain strings with `&`. Then `grep -r "&amp;" .next out 2>/dev/null` (built HTML) must return nothing.
3. `app/sitemap.ts`: generate entries **only for routes that exist** (derive from the catalogue data + blog posts + static page list). Drop sitemap URLs with no real page; do NOT create thin pages just to match the old sitemap. `lastmod` = real content date (blog frontmatter date) or omit; never the build date for everything.
4. `app/robots.ts`: `Allow: /`, `Disallow: /api/` only. **Remove the current `Disallow: /_next/`** (F14) — it blocks the CSS/JS/image files Google needs to render the page. Sitemap line uses `SITE_URL`.
5. Per-page `metadata` (every route): unique `title` ≤ 60 chars and `description` ≤ 155 chars, `alternates.canonical`, `openGraph` + `twitter` (summary_large_image, 1200×630 image at `public/og.jpg` — if missing, generate a simple cream card with the logo via a build script, or add `TODO_JAY`), `<html lang="en-IN">`, `viewport` with `themeColor`, favicon/apple-touch-icon, `manifest.webmanifest` (name, short_name "Warden & Sons", `display: "standalone"`, icons). No service worker.
6. Redirects: do not rename any live route. If you must move one, add a 301 (`redirects()` in server mode; `.htaccess` rule in static mode).
**Done when:** build passes; built HTML for `/` has exactly one canonical pointing to `https://wardenandsons.in/`; no `&amp;` in output; sitemap contains only existing routes.

### ☐ PHASE 2 — Structured data (JSON-LD)
1. Add one `<script type="application/ld+json">` on the home page with `@type: "ClothingStore"`: `name`, `url`, `logo`, `image`, `telephone: "+919920751567"`, `address` (PostalAddress: Kemps Corner, Mumbai, Maharashtra, 400036, IN), `openingHoursSpecification` (Mon–Sat 10:30–20:30), `sameAs` (Instagram profile URL; Google Maps/Business URL if Jay supplies it, else `TODO_JAY`). **Omit `geo` unless Jay supplies coordinates. Omit `priceRange`.**
2. `BreadcrumbList` on category pages. `Article` on blog posts (headline, datePublished, author = the store).
3. **Do NOT add** `AggregateRating`/`Review` markup (self-serving reviews are not eligible) and **do NOT add `FAQPage`** (Google stopped showing FAQ rich results in May 2026).
4. Validate JSON-LD parses (`JSON.parse` in a tiny script over the built HTML).
**Done when:** valid JSON-LD present; no rating/FAQ schema.

### ☐ PHASE 3 — Rebuild the catalogue structure (F2, F6, F7, F10)
1. Create typed data file `data/catalog.ts` as the single source of truth. Six categories (§2). Each category has ≤ 8 **types** (merge duplicates):
   - Sportswear + Sportswear & Academy + Sports & Event Apparel → **"Sportswear & Team Kits"**
   - Nightwear ×3 + Night Suits → **"Nightwear"** (state audience per category: kids / men / women)
   - T-Shirts + Plain T-Shirts → **"T-Shirts"**
   - Bottoms + Innerwear & Bottoms → **"Bottoms"** and a separate **"Innerwear & Socks"**
   Each item: `slug`, `name`, `category`, `type`, `sizes` (one consistent format, e.g. `"2–3Y to 13–16Y"`), `fabric` (exact wording from the current site), `blurb` (≤ 90 chars), `image?` (optional).
2. Routes: `/shop` (all categories as big tiles), `/shop/[category]` (static params for all 6). Delete the A–Z/Z–A sort. Replace the 24-option dropdown with **horizontally scrollable chips** (category) and collapsible type chips. Chips must be real links/buttons with ≥ 44px tap height.
3. Cards: image, name, sizes, fabric (one short line), **"Add to request"** button. Remove the per-card "Pricing: Confirmed on WhatsApp"; say it **once** in a slim note under the page title: "Prices & live stock are shared on WhatsApp."
4. **Images:** if `image` is missing, render an intentional brand tile (solid cream/red/blue/yellow rotating, large category name, small icon) — **never** reuse `store_front.jpg` or `brand_logo.jpg` as a product image. Use `store_front.jpg` once, as the hero only.
5. **Fabric claims (F7):** remove every site-wide "100% pure/organic cotton" claim. Replace with "Cotton & muslin essentials — fabric listed on every item". Then write to `NEEDS_JAY.md` a table of every item whose text says pure/100%/organic/combed but whose fabric mentions poly/micro/spandex/blend, for Jay to confirm. Do not decide for him.
6. Fix naming everywhere (F10): the shop is **"our Kemps Corner store"**; area is **"South Mumbai"** (mention "South Bombay" once in About text for search); list is **"Request list"**; button is **"Add to request"**; final action is **"Send on WhatsApp"**. Delete "Atelier", "Boutique", "Crest".
**Done when:** build passes; 6 category routes render; no duplicate types; no card uses the storefront/logo as product image.

### ☐ PHASE 4 — The WhatsApp request flow (the core feature) (F5)
Build `lib/whatsapp.ts` (pure functions, unit-tested) and the UI.

**State:** `useRequestList` hook; items `{ id, name, category, size, qty, note }`; persist to `localStorage` key `ws_request_v1` in try/catch; hydrate after mount (no hydration mismatch); sync across tabs via the `storage` event.

**UI (mobile-first):**
- "Add to request" on a card toggles to a stepper (− qty +) with "✓ Added".
- When ≥ 1 item: a **floating pill** (rounded, centred, above the bottom safe-area; NOT a full-width coloured bar) reading `"3 items · Send on WhatsApp"`. Tapping opens a **bottom sheet** (`<dialog>` or an accessible primitive; focus trap, ESC/backdrop closes, scroll-locked body).
- Sheet contents: header "Your request list" + one-line how-it-works ("We reply on WhatsApp with photos & prices"); per item: name, qty stepper, **size chips** (age options by category, plus "Not sure"), optional note input (colour/print), remove. Optional "Your name". Radio: "Store pickup (Kemps Corner)" / "Delivery in Mumbai" / "Delivery outside Mumbai". Primary button **"Send on WhatsApp"**, secondary **"Copy message"**, small "Clear list".
- Page bottom padding so the pill never hides content. Honour `prefers-reduced-motion`. All targets ≥ 44×44px. `aria-live="polite"` on the count.
- Primary button is an **`<a href>`** with `target="_blank" rel="noopener"` (not `window.open` — avoids iOS popup blocking). Do NOT auto-clear the list after tap (they may not send); provide "Clear list".

**Message format** (exact; one emoji only):
```
Hello Warden & Sons! 👋
I'd like to enquire about:

1. Newborn – Bodysuits & Jhablas | Size: 3–6M | Qty: 2 | Note: white & pastel

Name: Priya
Preference: Store pickup
Please share photos and prices. Thank you!
```
**Link:** `https://wa.me/919920751567?text=${encodeURIComponent(message)}`.
**Length guard:** keep the full URL ≤ 1,800 chars. If longer, drop items from the end until it fits, insert `(+N more items – will send next)` **right after the item list** (before the closing line), and show the "Copy message" fallback prominently. Empty list → generic greeting link.
**Unit tests (Vitest):** empty list; 1 item; 30+ items (cap + "+N more"); special characters `& # ? % +`; emoji; Hindi/Devanagari note text; newline encodes to `%0A`; round-trip `decodeURIComponent(url.split("text=")[1]) === message`.
**Analytics (optional, lightweight):** if `NEXT_PUBLIC_GA_ID` is set, load GA4 via `next/script` `strategy="lazyOnload"` and fire `add_to_request`, `open_request_sheet`, `send_whatsapp_click` (the conversion). No ID → no script.
**Done when:** tests pass; on a 390px viewport you can add 2 items, open the sheet, change qty/size, and the Send link's decoded text matches the format above.

### ☐ PHASE 5 — Make "how to buy" impossible to miss (F8)
1. Home page, directly under the hero: a 3-step strip (icons, ≤ 8 words each): **① Pick what you need → ② Send on WhatsApp → ③ Get photos & price, pay by UPI, pick up or get delivery.** Same strip (compact) at the top of `/shop`.
2. Header: a persistent **"WhatsApp"** button (icon + text) and a **"Request list (n)"** link that opens the sheet.
3. `/how-it-works`: show a real **sample message** (the format above) and a 3-step explanation. Keep the page short.
4. FAQ as native `<details>/<summary>` (answers in the HTML, no JS needed), 6 questions: how ordering works; sizing/fit help; delivery & pickup; visiting the store; exchanges; school uniform/bulk. Write drafts only from facts already on the site; for anything not stated (exchange window, delivery charges, payment methods, uniform minimums) write `TODO_JAY` and add it to `NEEDS_JAY.md`. Never invent policy.
**Done when:** a first-time visitor sees the 3 steps without scrolling past the first screen after the hero; all 6 FAQ answers present (drafts flagged where unknown).

### ☐ PHASE 6 — Visual refresh: clean, modern, brand-true (F10, F11)  [SHOULD]
**Verdict: keep the structure and tone; refresh the visual system. Do not do a full re-theme.** Photography, not colour, is the biggest gap.
1. Tokens (CSS variables / Tailwind theme): `--cream #FBF7EE` background; `--ink #14213D` text; muted text ≥ 4.5:1 on cream; brand accents `--red #E63946`, `--blue #1F4FD8`, `--yellow #FFC53D` used only as small tiles, chips, underlines and icons — not for long text. WhatsApp CTA green: start at `#128C7E` and darken until **white text passes ≥ 4.5:1** (verify with a contrast script).
2. Type: ONE variable font via `next/font/google` (Plus Jakarta Sans, latin subset, `display: swap`). Headings 700–800 with tight tracking; body 16–17px, line-height 1.6. A small hand-drawn squiggle underline (inline SVG < 1 KB) under one headline word echoes the brand posters.
3. Layout: Zara-style minimal — generous whitespace, big photo-led category tiles (2 columns on mobile, 3–4 on desktop), one radius value, subtle shadows. **No** full-width coloured bars. Remove the scrolling keyword marquee and any badge row beyond 3 badges.
4. Hero: H1 = **"Kids & Newborn Clothing in Kemps Corner, Mumbai"**; subline = **"Pick what you need. We reply on WhatsApp with photos & prices."**; two buttons: **Browse categories** (primary) and **WhatsApp us** (secondary).
5. Motion: CSS only (transitions, optional `animation-timeline: view()` as progressive enhancement). No animation libraries. Respect `prefers-reduced-motion`.
6. Screenshot `/`, `/shop`, `/shop/boys` and the open request sheet at **390×844** and **1280×800** (Antigravity browser agent or Playwright). Save to `qa/`. Self-check: no horizontal scroll, no overlapping elements, tap targets ≥ 44px, text readable.
**Done when:** screenshots saved, checks pass, contrast verified.

### ☐ PHASE 7 — Speed (target the Good Core Web Vitals band) [SHOULD]
Targets at mobile Lighthouse (Slow 4G): **Performance ≥ 90, LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, TBT < 200 ms**; first-load JS ≤ 100 kB gzip on `/` and `/shop`; hero image ≤ 120 kB; category tile ≤ 40 kB.
1. **Image pipeline:** originals in `assets-src/`; `scripts/optimize-images.mjs` (dev-dep `sharp`) outputs AVIF + WebP at 480/768/1200 px into `public/img/`. Static-export mode → small `<Picture>` component (`<picture>` + `srcset`/`sizes`, explicit `width`/`height`, `loading="lazy"`, `decoding="async"`); server mode → `next/image`. **Only the hero** gets `priority`/`fetchpriority="high"`. Wire the script into `npm run build` (`prebuild`).
2. **JS diet:** Server Components by default; `"use client"` only for request list, sheet, chips. Load the sheet with `next/dynamic` (prefetch on idle). Analyze with `@next/bundle-analyzer`; remove unused deps.
3. **Fonts:** `next/font` only (self-hosted, no CSS `@import`, no layout shift).
4. **Third parties:** no chat widgets/sliders/embeds. Google Maps = a static image/button linking out (no iframe on load). Analytics lazy.
5. **Caching/compression (static mode on Hostinger/LiteSpeed):** add `public/.htaccess` with force-HTTPS, one canonical host (www→apex), gzip/Brotli, `Cache-Control: public, max-age=31536000, immutable` for `/_next/static/` and `/img/`, short cache for HTML. (Server mode: set equivalent headers in `next.config` `headers()`.)
6. Re-run Lighthouse (home + shop) and write before/after numbers to `PROGRESS.md`. Real-user data comes later from Search Console → Core Web Vitals (needs weeks of traffic).
**Done when:** targets met or the gap is logged with the top 3 causes.

### ☐ PHASE 8 — Trust and local presence (F9, F13) [SHOULD]
1. Footer + `/visit-us`: address, hours, phone (tap-to-call), WhatsApp, Instagram link, **Open Maps** button (link only), "Open today until 8:30 PM" computed client-side in IST (hide on Sunday: "Closed today, opens Monday 10:30 AM"). Show GST number only if Jay supplies it.
2. Reviews: build `components/Reviews` driven by `data/reviews.ts`. **Render the section only if the array has real entries** — never an empty "Customer Stories" heading. No invented names, ratings or quotes. Add a "Review us on Google" button. Add to `NEEDS_JAY.md`: "paste 5–10 real Google reviews (name/initial, text, date)".
3. Make sure Privacy, Terms and Shipping & Returns pages are linked in the footer and the Privacy page mentions localStorage and analytics.
4. Custom `not-found.tsx`: friendly message, 6 category links, WhatsApp button.
**Done when:** footer complete; reviews section hidden until real data exists; 404 page works.

### ☐ PHASE 9 — Content and search (light touch) [SHOULD]
1. One short, human, specific intro (80–150 words) per category page; internal links to the relevant blog posts and to neighbouring categories.
2. Blog: keep the existing posts. Ensure each has a real date, `Article` JSON-LD, a relevant internal link to a category, and an end-of-post CTA: "Send your list on WhatsApp". **Do not generate more posts and do NOT create many near-duplicate "kids clothes near <area>" pages** (doorway-page spam risk).
3. Add the 3 most important links (Shop, How it works, Visit us) to the footer; make sure no page is more than 2 clicks from home.
**Done when:** every indexable page has unique title/description/H1 and ≥ 2 internal links.

### ☐ PHASE 10 — QA, safety net, deployment notes (MUST)
1. `npm run build` clean (no warnings you can fix); `npm run lint`; `npm test`.
2. Playwright smoke test at 390×844 (`tests/smoke.spec.ts`): home loads; click "Browse categories"; add 2 items; open sheet; change qty; assert the Send link `href` starts with `https://wa.me/919920751567?text=` and decodes to the expected message. Add `@axe-core/playwright` on `/`, `/shop`, `/how-it-works`: **zero critical/serious** violations.
3. Final Lighthouse (mobile) on `/`, `/shop`, `/how-it-works`; write the before/after table to `PROGRESS.md`.
4. Write `DEPLOY.md` (plain steps for Jay, no jargon):
   - **Keep the current deployment mode** from P0 unless it's broken.
   - *Static export* (`output: 'export'`, `trailingSlash: true`): build in GitHub Actions and upload `out/` to Hostinger `public_html` via SFTP/FTP with repo secrets (`FTP_HOST`, `FTP_USER`, `FTP_PASS`) — never commit secrets; pin action versions.
   - *Server mode*: use Hostinger's Next.js/Node.js app deployment connected to the GitHub branch.
   - Jay's manual steps: (a) in Hostinger hPanel set **301 redirects** `wardenandsons.com → wardenandsons.in` and `www → apex`; (b) Google Search Console: add the **Domain** property, submit `/sitemap.xml`, request indexing for `/`, `/shop`, each category; (c) Google Business Profile: primary category "Children's clothing store", add the .in website link, add products/photos weekly, answer every review; (d) test the WhatsApp flow on a real iPhone and a real Android.
5. Finish `NEEDS_JAY.md` as a checklist: hero + 6 category photos (4:5 portrait, cream backdrop, saved to `assets-src/`); fabric confirmations (table from P3); FAQ facts (exchange window, delivery charges, payment methods, uniform minimums); GST display yes/no + number; email address; Google Maps + Google Business Profile links; real reviews; opening-year; GA4 ID (optional).
6. Update the phase checkboxes. Print one final line: `DONE phases: <list> | BLOCKERS: <n> | NEEDS_JAY: <n>`.

## 5. Never do
- No online checkout, payment gateway, login, database, backend or cart-to-order system.
- No fake reviews, ratings, stock counts, prices, urgency timers, or "only 2 left".
- No claims of "pure/organic cotton" unless the item's own fabric line says so.
- No full-width coloured "branding bars"; no marquees; no autoplay video; no chat popups; no cookie banner unless Jay asks.
- No new heavy dependencies. Allowed dev-deps: `sharp`, `vitest`, `@playwright/test`, `@axe-core/playwright`, `@next/bundle-analyzer`.
- Do not change existing public URLs without a 301.

## 6. Definition of done
- Single canonical domain everywhere; sitemap/robots correct; no `&amp;`.
- Request flow works end-to-end on 390px; tests pass.
- 6 clean categories, no duplicate types, no storefront/logo reused as product image.
- Lighthouse mobile: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95 (or gaps logged).
- `PROGRESS.md`, `NEEDS_JAY.md`, `DEPLOY.md` present; branch `upgrade/oct-2026` ready for Jay to review.
