# REDESIGN V2 for wardenandsons.in (run with the taste-skill)

You are a senior front-end engineer and art director. Do the whole job below, phase by phase (P0 to P9), without waiting for approval between phases. Commit at the end of every phase. This file is the single brief; it replaces the DESIGN RULES in REDESIGN_CONTEXT.md and keeps everything else in that file.

## 0. How to work

1. Read these first, fully: AGENT_CONTEXT.md, REPO_MAP.md, REDESIGN_CONTEXT.md, REDESIGN_PROGRESS.md, CHANGES.md. They hold the business facts, the information architecture, the My List spec, the phone-capture spec, the tech rules and the PRESERVE list.
2. Create REDESIGN_V2_PROGRESS.md with a checklist P0 to P9. Tick each phase as it finishes and add short notes.
3. If you are running low on context or usage: finish the small piece you are on, commit it as "WIP Pn", and write RESTART.md listing exactly what is left, in order. The owner will then paste: "Continue the redesign: read REDESIGN_V2.md and REDESIGN_V2_PROGRESS.md and continue from the first unchecked phase."
4. Never deploy, never merge, never push to main. Never invent facts (prices, ratings, stock, client names, photos). Missing facts become a TODO in code and a line under "Needs the owner" in CHANGES.md.
5. The owner is on Windows. Prefer Node scripts (.mjs) to shell one-liners, quote every path (the repo folder name has spaces), and never rely on bash-only syntax.
6. Reply at the very end in 10 lines or fewer. Do not narrate each step.

## 1. What the owner said about version 1 (fix every point; each has a test)

| Owner's complaint | What it means | How we prove it is fixed |
| --- | --- | --- |
| "Looks very simple and basic. No effects or animations. Make it fancy, and fast." | The motion layer was too thin and the look was generic. | P6 motion layer. The taste inspector counts at least 16 elements that really move, with 0 FAIL. Lighthouse mobile stays fast (P7). |
| "The logo is badly shown with white spaces." | The logo file is a JPG/WebP with a white background and padding. | P2: logo rebuilt without white margins. No white box on any coloured surface. The logo is large and obvious on the first screen. |
| "Emptiness." | Big areas with nothing in them; tiles with placeholder boxes. | P3 drawn specimen art on every tile, P4 fuller sections, inspector rule "empty-screens" passes. |
| "Fonts and colour combination I didn't like." | Fraunces serif headings and the ivory/ink-blue palette felt wrong. | P1 new sans type and a palette taken from the logo's own red, blue and yellow on a clean white ground. |
| "The green WhatsApp chat button looks broken." | Unknown cause: could be clipping, wrong icon size, overlap with the bottom bar, or label wrapping. | P5: diagnose with screenshots first, then rebuild it as one component used everywhere. Automated overlap test passes at four screen sizes. |
| Keep: the flow, the phone layout, the new menu. | He likes category, sub-category, "+", My List, Send on WhatsApp, the bottom bar and the menu sheet. | Behaviour and structure stay. Only the look changes. |
| "Few words. Fast. Professional." | | Word budget in P4. Performance budget in P7. |

## 2. Precedence when two instructions disagree

1. The PRESERVE list, business facts, SEO fields, analytics events and the My List and phone-capture specs (REDESIGN_CONTEXT.md).
2. This file.
3. The taste-skill's house rules and laws.
4. The direction sheet the skill deals.
5. Everything else.

Known conflicts, already decided: the skill likes full content, the owner wants few words. Fullness here comes from scale, colour fields, drawn or real pictures and real catalogue content (names, ages, hours, reviews), never from paragraphs. The skill suggests found stock pictures; we do not use them (see P1). The skill bans thin rules, outlines, uppercase micro-labels, gradients, glass, emoji, monospace and shadows at rest: those bans are adopted and replace the older design rules (so the 1px hairline borders, uppercase 0.08em labels and ivory ground from R1 are removed).

## 3. P0: Preflight (no design changes yet)

1. `git status` must be clean. Create a tag `pre-v2` and a branch `redesign-v2` from the current head (the `redesign` branch if it exists). Note which branch you started from.
2. Check `node -v`. The skill needs Node 22 or newer and an installed Chrome, Edge or Chromium. If Node is older than 22, STOP and tell the owner to install Node 22 LTS from nodejs.org, then continue after he confirms. If Chrome/Edge/Chromium is missing, say so and use the fallback in P8.
3. Find the taste-skill that the owner already installed. Search for a SKILL.md whose frontmatter says `name: design-taste-frontend` in: `.agents/skills`, `.claude/skills`, `.gemini`, `.codex/skills` inside the repo, then the same folders in the user's home folder. Call the folder that contains that SKILL.md `SKILL_DIR`. Check that `SKILL_DIR/scripts/draw.mjs`, `lint.mjs` and `inspect.mjs` exist and that `SKILL_DIR/references/` exists. If it is not found, run `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"` and search again. Record the path in REDESIGN_V2_PROGRESS.md. Wherever the skill text says `<skill>`, it means `SKILL_DIR`.
4. Read in full: `SKILL_DIR/SKILL.md`, and in `references/`: copy.md, type.md, colour.md, layout.md, imagery.md, motion.md, critique.md, tells.md. Skip app-screens.md and scenes.md.
5. Add `.taste-skill/` to `.gitignore`. Create `scripts/serve-out.mjs`: a tiny static server with no dependencies (Node `http` only) that serves the `out/` folder on port 4173, maps `/path/` to `/path/index.html`, and answers unknown URLs with `out/404.html` and status 404. Add the npm script `serve:out`.
6. Record the BEFORE state. Run `npm run build`, start the server in the background, then run for `/`, `/shop/`, `/shop/boys/` and `/shop/boys/shorts-joggers-cargos/`:
   `node "SKILL_DIR/scripts/inspect.mjs" http://localhost:4173/<path> --out .taste-skill/before/<name>`
   and `node "SKILL_DIR/scripts/lint.mjs" src`. Summarise the FAIL and WARN counts in docs/redesign-v2/before.md and copy 4 key screenshots there. If Lighthouse is available, record mobile Performance, LCP, CLS and TBT for `/`.
7. Work from the LOCAL build, not from the live site. (The live homepage may still be an older deploy than the shop pages; that is a deployment matter for the owner, not part of this job.)
8. Commit "P0: preflight and before-state".

## 4. P1: Direction from the taste-skill

Follow `SKILL.md` steps 1 to 5 (inventory, argument, draw, idea, copy deck), with these decisions already made so you do not wander.

**Subject inventory (use this, add nothing invented):**
- The shop's sign: the name WARDEN&SONS as letter tiles in red, blue and yellow, with KIDS WEAR below in blue. Open `public/brand_logo.*` and look at it before designing anything.
- Since 1994. Family-run. Shop No. 7, Ground Floor, Haji Habib Building, 155/157 August Kranti Marg, near St. Stephen's Church, Kemps Corner, Mumbai 400036. Open daily 9am to 9pm. WhatsApp +91 99207 51567, landline +91 22 23684640.
- Newborn essentials, kids 0 to 16 years, school uniforms and bulk orders, a few men's and women's basics.
- Shop vocabulary: jhabla, nightsuit, cricket whites, swaddle, thermals.
- No online payment: the visitor builds a list, sends it on WhatsApp, the shop replies with photos and sizes. Free video call. Sizing checks done live on WhatsApp.

**The argument (claims, one per section, in this order):** Everything the shop sells is here by category. Pick what you need and send the list. The shop replies with photos and sizes. A family shop since 1994 you can visit. (Add nothing about prices, stock, delivery speed or awards.)

**Draw command (run once, from the repo root):**
```
node "SKILL_DIR/scripts/draw.mjs" --sector fashion --brief "Family-run kids and family clothing shop in Kemps Corner Mumbai since 1994; visitors pick categories, build a list and send it on WhatsApp" --sections showcase,how-it-works,testimonial,contact,footer --tone warm --have product-photo --options 3
```
- Choose `specimen-catalogue` ("The specimen catalogue": each item alone on a flat colour tile, same scale, named plainly). It is the right fit because the shop's own sign is flat coloured letter tiles. If it is not among the three dealt, deal it directly by repeating the command without `--options` and with `--direction specimen-catalogue`. Do not choose dark-room, type-only-statement, editorial-report or dense-tiles.
- Then deal the full sheet with `--direction specimen-catalogue` and the same other arguments. Run the draw once; reprint with `--show`. Do not keep re-running it hoping for a different answer (it is random, and each run differs).
- **Type:** it must be a sans-serif (grotesk or rounded) available through `next/font/google`. The owner disliked the serif headings of v1. If the dealt face is a serif, monospace, script or very condensed face, run `--redraw type`, up to three times, until you get a suitable sans. Record every redraw and the reason.
- **Colour:** the dealt palette is only a set of proportions (one ground, one ink, one accent, flat fields). The shop owns unmistakable colours, so take the colours from its logo (the skill allows this): fields are the logo's red, blue and yellow plus an ink navy, on a white ground. Record this as a deliberate redraw.
- **Hero and sections:** accept the dealt hero and section blueprints. If a dealt section cannot hold the real content (for example a coupon form when no endpoint exists, or a photo strip when there are fewer than eight photos), list the options with `--alternatives <role>` and take one with `--redraw section:<role>=<id>`, with the reason in the report.
- **Pictures:** ignore the dealt "People" photographs from picsum and do NOT use `assets.mjs` or any stock, archival or found images. This is a shop selling real garments; pictures of hikers, fog or old postcards would misrepresent it. Real pictures are the shop's own files only (`public/hero-editorial.webp`, `public/products/*.webp`, anything in `assets/photos/`). Where a tile has no real photo, use the drawn garment specimens of P3. If the inspector's "at least four real pictures" check fails only because the shop owns fewer than four photos, allow that one rule with `--allow` and say so in the report.
- **Scroll scenes:** if the sheet deals any, skip them (they need GSAP from a CDN and heavy pinned scrolling; both break our speed rules).

**The idea sentence (use this unless you can write a better one that passes the competitor test):** "On this page, the red, blue and yellow letter tiles of the Warden & Sons sign become the specimen tiles: every category is one flat colour tile with one garment on it, named plainly beneath."
**The one live thing:** the hero's category picker (choose Newborn, Boys, Girls, Men, Women or Uniforms: the specimen and tile colour swap) plus a live "Open now / Opens at 9am" line computed in India time.

Write the copy deck to `src/content/copy.ts` (replace the old strings; keep the facts). Rules: sentence case, no eyebrows, headlines at most two lines at every width, tile labels at most three words, no paragraph over 30 words on shop pages, banned words from REDESIGN_CONTEXT.md still apply. Keep the page H1 and every title, description and canonical exactly as they are today.

Commit "P1: direction and copy deck" after saving `.taste-skill/direction.json`'s key values (direction, seed, type, redraws) into docs/redesign-v2/direction.md.

## 5. P2: Tokens, type and the logo

**Tokens** (CSS variables, wired into Tailwind the way the project already does it). Sample the real logo colours with a small `sharp` script (`scripts/sample-logo.mjs`) and use the sampled values. Only if sampling fails, use red #D8402F, blue #2F5FA7, yellow #F1B434.
- `--bg` #FFFFFF; `--surface` #F4F4F2; `--ink` near-black navy about #0E1A33; `--muted` about #55607A (4.5:1 or better on both bg and surface).
- Fields: `--red`, `--blue`, `--yellow` from the logo, and `--ink` as the fourth field. Text on yellow is ink. Text on blue is white. Text on red is white only if it reaches 4.5:1; otherwise darken the red in the smallest steps until it does, or keep text off red tiles (names sit beneath tiles anyway). Record any adjustment.
- `--wa` for WhatsApp actions only: start at #0F7B4F; white text and glyph must reach 4.5:1 and 3:1 respectively.
- No gradients, no glows, no shadows on things at rest. One allowed shadow: the floating WhatsApp tile and open dialogs.
- Update `scripts/check-contrast.mjs` to test every text/background pair above and fail under 4.5.

**Shape:** one corner radius for the whole site: square (0). It echoes the logo's square letter tiles. Buttons are 52px tall, square, flat: primary = ink with white text; whatsapp = `--wa`; secondary = `--surface` fill with ink text (no outlines, no hairlines). Focus ring: 3px `--blue`, 2px offset. Chips are square, filled `--surface`, selected = ink with white text. No uppercase labels, no eyebrows, no icons inside coloured circles.

**Type:** load only the dealt face (at most two families, at most three weights) through `next/font/google`, latin subset, `display: swap`, and preload only the weight used on the first screen. Use the dealt five size steps as tokens; body 17px or more on phones, small text 13px or more. Display type: the dealt weight, tight tracking, leading about 0.9 to 1.05, sentence case. Remove Fraunces, DM Sans and any other font loading.

**The logo, done properly:**
1. Look at the actual logo file. Write down its exact structure: how many tiles, the letters, the tile colour order, the stagger, the "KIDS WEAR" line, its colour and size.
2. Build `src/components/Logo.tsx`: the wordmark as inline SVG (or tiny HTML tiles) with NO background and no padding, `viewBox` cropped tight to the artwork, `role="img"` and `aria-label="Warden & Sons Kids Wear"`. Props: `variant` ("full" with KIDS WEAR, "mark" tiles only), `height`. It must be visually faithful to the real logo: same letters, same colour order, same arrangement. Do not restyle or "improve" the logo.
3. If an exact vector rebuild is not achievable after a good attempt, instead produce a tight-cropped, transparent version with `sharp` (trim the white border, then turn near-white pixels to alpha, then check the edges for halos) saved to `public/brand/logo.webp` and `logo.png`, and use that. Never leave a white rectangle behind the logo on any coloured surface.
4. Sizes: header logo at least 32px tall on phones and 40px on desktop; footer logo large; the home hero shows the full logo large (see P4). Add a favicon and app icon from one tile (the W tile) if they do not already look right.
5. Social card: generate `public/og-card.jpg` (1200x630, logo centred on white with at least 10% padding) with `sharp` and use it as the default og:image and twitter:image. Change nothing else in `buildPageMetadata`.
6. Test: the logo's corner pixels have alpha 0 (or the SVG has no background rect); a screenshot of the header, the footer and the logo on a yellow and a blue surface shows no white box.

Commit "P2: tokens, type, logo".

## 6. P3: Drawn specimens and imagery (this removes the emptiness)

1. Create one SVG sprite (a single `<svg>` of `<symbol>`s inserted once in the root layout) and a `Garment` component that renders `<use href="#g-...">`. Draw about 16 flat garment silhouettes in ONE consistent graphic language (flat fills, no outlines, no gradients, simple fold or neckline details): bodysuit/jhabla, romper/sleepsuit, swaddle, towel, cap and mittens, t-shirt, shorts/cargos, jeans/trousers, nightsuit, sportswear/cricket whites, hoodie/jacket, thermals/socks, swimwear, frock/dress, leggings, top/kaftan, school uniform. Each fits a 400x500 box, the garment about 70% of the height, centred, with fills chosen to read on red, blue, yellow and ink tiles (white, ink or yellow as needed).
2. Map every sub-category slug in `src/data/catalogue.ts` to a garment and to a tile colour, rotating red, blue, yellow, ink in a steady order. The mapping lives in `src/data/specimens.ts`.
3. Extend the existing `Photo` component into `Specimen`: if the image manifest has a real photo for that sub-category, show the photo (4:5, `object-fit: cover`); otherwise show the flat colour tile with the drawn garment. Nothing may ever say "placeholder", show a grey box or shift the layout. The real photos from the shoot (see PHOTO_SHOTLIST.md) then replace the drawings automatically without code changes.
4. Real photos that already exist (`hero-editorial.webp`, `products/*.webp`): use each one where it fits its slot (a single item on a plain background can sit on a tile; a lifestyle picture becomes a large picture block). Give every image `width`, `height` and meaningful alt text.

Commit "P3: specimen art".

## 7. P4: Pages

Build every page from the dealt blueprints, with the shop's content. Keep geometry, change the subject. Neighbouring sections must not share a layout. Every section has a heading that names it. Both outer margins are equal at every width. No empty stretch taller than half a screen.

**Home (`/`), in this order:**
1. **Hero** (the dealt hero blueprint). The big logo is the first thing seen (about 28% of the viewport width on desktop, about 70% on phones, top-left). The page H1 keeps its exact current text ("Kids Clothes in Kemps Corner, South Mumbai") as real visible text beside or under the logo, two lines at most. One sentence of at most 15 words, then two buttons: "Shop" and "Chat on WhatsApp" (the shared WhatsApp button, tracked with button_location "hero"). The category picker lists Newborn, Boys, Girls, Men, Women, Uniforms & Bulk; the selected one drives the large specimen tile. It works without JavaScript (all names are real links). On the home page the header logo stays hidden until the hero has scrolled away.
2. **Catalogue**, heading "Shop by category": Kids first and big (Newborn double size, then Boys, Girls), then Men and Women smaller, then a wide Uniforms & Bulk tile. Under each kids category, a native drag row (scroll-snap, no library) of its sub-category specimen tiles, each with the name beneath, one short fact (the age range from the catalogue) and a 44px "+" that opens the Add sheet. Every tile also links to its page. One tile in six or seven is double size. Never show a price unless `priceFrom` really exists.
3. **Showcase** (the dealt blueprint): a short list of real items (jhabla, swaddle, cricket whites, nightsuit, school uniform) that swap the object and the field colour; one fact line from the catalogue; an "Add to list" button. Heading of two to four words with no claims in it.
4. **How it works** (tiles that grow): three stages in order, named by words, no numbering: Pick, Send on WhatsApp, We reply with photos and sizes. Two short lines each. Add the "Free video call" link (WhatsApp, button_location "video_call").
5. **Reviews:** the two real reviews from `src/data/reviews.json`, text unchanged, large, plus the existing "View on Google" link. Never add reviews or a rating number that is not in the data.
6. **Visit us** (the dealt contact blueprint, adapted): address, a live "Open now, until 9pm" or "Opens at 9am" line (India time; server-rendered default "Open daily 9am to 9pm", then update after load without layout shift), Directions, Call, WhatsApp. If `NEXT_PUBLIC_LEADS_ENDPOINT` is set, include the "Prefer a call?" bar (name, phone, consent, submit) using the existing lead code; if not, leave it out. The existing SchoolsServedSection stays (it renders nothing when empty).
7. **Footer** (the dealt "back of the card"): sign-off, address and contact lines, social and Google links exactly as configured, legal links, the big logo. No text below 13px.

Word budget: about 150 to 220 visible words on the home page, tile names included. Never hide text. Move nothing that exists only on the home page without first copying it to /how-it-works/, /about/ or /shop/ (log in docs/redesign-v2/moved-content.md).

**Shop pages:** `/shop/` (hub), `/shop/<category>/` and `/shop/<category>/<sub>/` use the same specimen tiles: Kids tiles large, adults smaller, 2 columns on phones, 3 on tablets, 4 on desktop, names and age lines beneath, "+" on every sub-category tile. Long SEO text stays inside `<details>` accordions, fully present in the HTML. Keep every existing URL, title, description, H1, canonical, breadcrumb and JSON-LD.

**Every other page** (about, how-it-works, visit-us, contact, bulk-orders, size-guide, blog index and posts, legal): inherit the new tokens, type, header and footer; fix anything that breaks; do not redesign their content.

Commit "P4: pages".

## 8. P5: App chrome and the WhatsApp button

1. **Header and bottom bar:** keep structure and behaviour (the owner likes them). Restyle: a plain white bar (a tone step, no hairline), the logo at the sizes in P2, links Newborn, Boys, Girls, Men, Women, Uniforms & Bulk, More; Search and My list on the right. Mobile bottom bar: Home, Shop, Search, List, flat, with an ink square badge for the count. The List item turns into a green "Send list (n)" when the list is not empty (existing behaviour).
2. **Menu sheet:** keep it as is functionally; restyle with the new tokens, and let its items arrive with a short stagger.
3. **Add sheet and List sheet:** restyle (square, flat, large tap targets). Keep the list logic, the message format and the character limit untouched.
4. **WhatsApp tile (the thing that looks broken).** First diagnose: screenshot the current floating button at 360x640, 390x844, 768x1024 and 1280x800 and write the real cause (clipping, wrong icon size, overlap with the bottom bar, wrapping label, z-index) to docs/redesign-v2/whatsapp-diagnosis.md. Then rebuild:
   - One component, `WhatsAppButton`, used for EVERY WhatsApp button on the site (hero, footer, list, store, chat panel). Official-looking WhatsApp glyph as inline SVG, 20px in text buttons with a 10px gap, vertically centred with the text, label never wrapping, tracked with the existing helper.
   - The floating tile: 56x56 square in `--wa` with a 28px white glyph optically centred, a soft shadow (it floats), fixed at right 16px and `bottom: calc(var(--bar-h, 64px) + env(safe-area-inset-bottom) + 16px)` on phones (24px from the bottom on desktop). No pulse and no glow. On desktop only, a "Chat with us" label slides out once after 6 seconds, then folds away and never returns in that session.
   - It opens the existing guided chat panel (restyled to the same language: square, flat, chips as filled squares, the WhatsApp button as the only green). The panel is a bottom sheet on phones and a small panel on desktop. Keep the existing prefilled messages.
   - It is hidden while any dialog or sheet is open, and never covers the bottom bar, the header, the Send-list button or any primary button.
   - Automated check (agent-browser or Playwright): at the four sizes above, the tile's bounding box does not intersect the bottom bar, the header or any element marked as a primary action; save the result in docs/redesign-v2/fab-check.md.

Commit "P5: chrome and WhatsApp".

## 9. P6: The motion layer (this is the "fancy")

Follow `SKILL_DIR/references/motion.md` (tokens, recipes, reduced motion). Transform, opacity and clip-path only. Every hidden state lives inside `prefers-reduced-motion: no-preference` and behind a `js` class so content is visible without JavaScript. No preloader, no custom cursor, no scroll hijacking, no smooth-scroll library, no scenes. Build these:

1. **Load sequence, settled in 1.2s:** the logo's letter tiles drop in and settle one after another (about 40ms apart, once per browser session); the H1 lines rise from behind a mask; the sentence and buttons rise at about 420ms; the hero specimen tile opens like a shutter. This is the signature move.
2. **Hero picker:** choosing a name crossfades the garment (opacity plus a 12px rise, 300ms) and the tile colour (two stacked colour layers crossfading by opacity, not an animated colour). If the dealt signature move is "Slow crossfade", the specimens also rotate every 5 to 6 seconds until the visitor touches the picker, pausing when the tab is hidden. If it is "Index with preview", use hover and focus on the name list for the preview. If it is "Shutter image", use it on the hero tile and the first photograph.
3. **Section entrances:** one shared IntersectionObserver; each section's parts arrive in reading order (heading, text, tiles), 70ms apart, rising 16 to 24px, once, never replayed, never hiding anything in view for more than 900ms. Vary the manner per section (rows arrive item by item, tiles open from a mask) instead of one fade everywhere.
4. **Tiles:** on fine pointers, the garment lifts 6px and tilts 2 degrees on hover (transform only); on press every button and tile scales to 0.98 in 140ms. Hover styles sit behind `(hover: hover)`.
5. **Add to list:** pressing "+" flies a small copy of the tile's garment to the List icon along a short curve (Web Animations API, 500ms, transform and opacity), then the badge bumps for 280ms. Reduced motion: only the badge changes.
6. **One marquee:** a slow strip of big type (the age ranges, or the category names) between two sections; pauses on hover and focus and when off screen; stops under reduced motion.
7. **Rolling figure:** "1994" rolls into place once in the visit/about section (the real number stays in the text for screen readers).
8. **Sheets:** menu, add, list and chat panels open in 240 to 320ms with ease-out; their rows arrive 50ms apart.
9. **Page change:** a tiny `template.tsx` wrapper gives `<main>` a 320ms rise-and-fade on every route change (CSS keyframes, no library, off under reduced motion).
10. **Header:** the logo fades in on the home page once the hero has scrolled away.

Use the curve tokens from motion.md (ease-out, ease-expo, ease-in-out). Pause loops off screen and when the tab is hidden. Put the motion code in small vanilla modules (IntersectionObserver, Web Animations API, CSS). Use the already-installed `motion` package only where a component truly needs it, loaded lazily. Install nothing new.

Commit "P6: motion".

## 10. P7: Speed budget (hard limits)

- First-load JS 150 KB gzipped or less per route (read it from `next build`). Dynamic-import the search, call form, chat panel and any motion helper not needed for the first screen.
- The first screen needs no image download: the hero tile is inline SVG. If a hero photo exists, give it `fetchpriority="high"` and a ground colour so it opens onto its own colour.
- CLS 0.05 or less: every image, tile and the live "open now" line has reserved space. No third-party scripts before the first interaction except Google Tag Manager (only when `NEXT_PUBLIC_GTM_ID` is set), loaded after idle. No Google Fonts stylesheet link: fonts come only through `next/font`.
- Lab targets on the mobile Lighthouse profile: Performance 90 or more, LCP 2.5s or less, TBT 200ms or less. If a page misses a target, find the cause and fix it (heavy motion, big sprite, un-split bundle, font weights) before reporting.

Commit "P7: performance".

## 11. P8: Gates (run the skill's own checks)

1. `npm run lint`, `npm run build`, `npm test` pass. Update or remove tests that referred to deleted components; add tests for the sprite mapping (every sub-category has a garment and a colour), the open-now calculation (IST edge cases: 8:59am, 9:00am, 8:59pm, 9:00pm), and the logo alpha check.
2. Serve `out/` and run on `/`, `/shop/`, `/shop/boys/`, `/shop/boys/shorts-joggers-cargos/`, `/bulk-orders/` and one blog post:
   `node "SKILL_DIR/scripts/lint.mjs" src` and `node "SKILL_DIR/scripts/inspect.mjs" http://localhost:4173/<path> --out .taste-skill/after/<name>`
   Fix every FAIL. Treat every WARN as wrong unless you can defend it in one sentence. Re-run until 0 FAIL at 1440, 768 and 390. Allowed `--allow` rules: only the picture-floor rule (if the shop has under four photos) and `font-not-dealt` (only if the inspector cannot match the loaded face name to the dealt one, for example because `next/font` renames it), each recorded in the report.
3. Open EVERY screenshot the inspector lists, at all three widths, after the final change. Critique them with `references/critique.md` (the fourteen passes and the score). Write the critique down, fix the top three problems, run again, look again. At most three rounds.
4. If Node 22 or Chrome is missing: run `lint.mjs` (works on Node 18+), take screenshots with agent-browser at 360x640, 390x844, 768x1024 and 1280x800, critique those, and say plainly in the report that the inspector could not run.
5. Interaction test in a real browser: add three items (one from the home tile, one from a sub-category page, one from the showcase), open the list, change a quantity, press Send, decode the `wa.me` URL and confirm it matches the message spec; open the menu; use the chat panel; set reduced motion and confirm everything still shows and nothing travels; keyboard-tab through the home page; throttle to slow 4G; confirm no horizontal scroll at 320px and a clean console.
6. SEO parity against the P0 build (`scripts/audit-seo-tags.mjs` before and after): no lost URL; titles, descriptions, H1s, canonicals, og:url, JSON-LD, sitemap and `public/.htaccess` unchanged (the only allowed change is the default og:image from P2). No new Product, Offer, Review or FAQ schema. Page text still crawlable (no content hidden by CSS).
7. Privacy: no phone number, note, age band or message text in any analytics payload, console log or URL.

Commit "P8: gates and fixes".

## 12. P9: Report and stop

Write docs/redesign-v2/FINAL_REPORT.md and reply to the owner in 10 lines or fewer with:
- the direction dealt (name, seed) and every redraw with its reason, and the idea sentence;
- before and after: inspector FAIL/WARN counts, first-load JS per route, Lighthouse mobile numbers (or "not run"), moving-element count;
- confirmation of each complaint in section 1 with the evidence file;
- which tiles still use drawn garments instead of photos, and what the owner must supply: photos (PHOTO_SHOTLIST.md), prices (only if he wants them shown), schools served, the Google Sheet endpoint, the GTM ID, retention wording, the reply promise, author name and bio;
- anything not verified. Do not claim a check you did not run.

Then add a deploy checklist to the report: `npm run build`; upload the ENTIRE `out/` folder, including `index.html` and the hidden `.htaccess`; purge the Hostinger/LiteSpeed cache; check the live homepage, /shop/ and /shop/boys/ show the same new design; run the four curl checks (http to https, www to apex, /shop/bulk/ 301, a made-up URL returning 404); request indexing in Search Console for the home page and main categories. Tick P9 and stop. Do not deploy.
