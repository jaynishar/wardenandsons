PURPOSE
Redesign wardenandsons.in into an elegant, fast, mobile-first kidswear storefront. Visitors browse categories, build a "My List", and send it on WhatsApp. No online payment, no accounts, no checkout. The shop closes sales on WhatsApp or by phone.

PRINCIPLES
1. Few words. Photos and clear tiles lead. Details live in WhatsApp and in the shop.
2. Four taps from home to WhatsApp: category tile, sub-category "+", size sheet "Add to list", "Send list on WhatsApp".
3. Elegant, not templated. Follow the DESIGN RULES exactly.
4. Fast on a mid-range Android phone on 4G.
5. Preserve everything in PRESERVE.

INFORMATION ARCHITECTURE (slugs are final)
KIDS (large tiles everywhere)
- newborn "Newborn" ages 0-3M, 3-6M, 6-12M, 12-18M, 18-24M
  bodysuits-jhablas "Bodysuits & Jhablas"; rompers-sleepsuits "Rompers & Sleepsuits"; swaddles-blankets "Swaddles & Blankets"; bath-towels "Bath & Towels"; caps-mittens-booties "Caps, Mittens & Booties"
- boys "Boys" ages 2-3Y, 4-5Y, 6-7Y, 8-9Y, 10-12Y, 13-16Y
  t-shirts-shirts "T-shirts & Shirts"; shorts-joggers-cargos "Shorts, Joggers & Cargos"; jeans-trousers "Jeans & Trousers"; nightwear "Nightwear"; sportswear-cricket-whites "Sportswear & Cricket Whites"; hoodies-jackets "Hoodies & Jackets"; thermals-innerwear-socks "Thermals, Innerwear & Socks"; swimwear "Swimwear"
- girls "Girls" same ages as boys
  dresses-frocks "Dresses & Frocks"; tops "Tops"; leggings-tights "Leggings & Tights"; nightwear "Nightwear"; hoodies-jackets "Hoodies & Jackets"; innerwear-socks "Innerwear & Socks"; sportswear "Sportswear"; swimwear "Swimwear"
ADULTS (smaller, always secondary; sizes S, M, L, XL, XXL; women's tops also Free size)
- men "Men": innerwear; t-shirts; shorts-track-pants "Shorts & Track Pants"; gym-wear "Gym Wear"; thermals; socks-handkerchiefs "Socks & Handkerchiefs"
- women "Women": nightsuits "Nightsuits"; leggings-tights "Leggings & Tights"; tops-kaftans "Tops & Kaftans"; t-shirts; gym-wear "Gym Wear"; innerwear; socks-thermals "Socks & Thermals"
UNIFORMS & BULK stays at /bulk-orders/ (not under /shop/).
"Kids" is a navigation group only (Newborn, Boys, Girls). There is NO /shop/kids/ page.
URLs: /shop/ ; /shop/<category>/ ; /shop/<category>/<sub>/ (new). Keep every existing URL.
The existing 28 product styles in src/lib/products.ts are kept and mapped to sub-categories as "featured styles". Never delete product data.

MY LIST SPEC
- A list line = {category, sub, age or size (optional, "Not sure" allowed), qty 1-20, note optional max 140 chars}. Same sub + same age merges (qty adds). Max 30 lines. Stored on the device only (localStorage key warden-list-v1).
- Flow: tile "+" opens the Add sheet (age chips, qty stepper, optional note, "Add to list"). The My List sheet shows lines and the primary button "Send list on WhatsApp" (an <a> link to https://wa.me/919920751567?text=<encoded>). The list is NOT cleared automatically after sending (we cannot know if they pressed send); show the note "WhatsApp opened. Press send there to share your list." and a "Clear list" button.
- Message format, exactly:
  Hi Warden & Sons! My list from the website:
  1. Boys > Shorts, Joggers & Cargos: age 6-7Y, qty 2
  2. Newborn > Swaddles & Blankets: 0-3M, qty 1
  Note: <only if the visitor typed one, per line as "(note: ...)" after that line>
  (Sent from the website)
  Use the ">" character in the message; the UI may show a chevron. Keep the whole message under 1,200 characters; if longer, keep the first lines that fit and end with "+N more items, I will send them in chat".

PHONE CAPTURE SPEC
1. Default path: the visitor's number reaches the shop when they press send in WhatsApp. No form.
2. Secondary path "Prefer a call?": phone (required), name (optional), preferred time chips Morning/Afternoon/Evening (optional), unticked consent checkbox, saved to a private Google Sheet through a Google Apps Script web app. The payload carries only: phone (+91XXXXXXXXXX), name, preferred time, list summary (category and sub labels with quantities, NEVER notes), source path, UTM source/medium/campaign if present, a short reference, timestamp, consent=true. Never send children's details, ages or free text anywhere. Never send phone numbers to analytics or the console.

DESIGN RULES
Colours (verify contrast with scripts/check-contrast.mjs, text must pass 4.5:1):
  --ivory #FBF7F0 page; --paper #F3EDE2 surfaces; --line #E3DAC9 hairlines; --ink #16233F text; --ink-soft #4A5470 secondary text; --blue #2F5FA7; --red #D8402F; --yellow #F1B434; --wa #0F7B4F WhatsApp send button with white text.
  Red and yellow are small accents only (marker squares, tiny details), never text colours and never behind small text. Sample the real logo colours from the brand logo file and adjust the accents if they differ.
Type: Fraunces (headings only, weights 500-600) + DM Sans (everything else, 400/500/700). Body 16px minimum, never below 14px. H1 clamp(34px, 8vw, 56px). Uppercase labels 12-13px with 0.08em letter spacing.
Shape: buttons 48px tall, 4px radius, rectangular. Chips fully rounded. Cards and tiles 6px radius, 1px --line border, no shadow (or at most 0 1px 2px rgba(0,0,0,.06)).
Logo motif: a small 8x8 square marker (red, blue, yellow in rotation) before category labels on tiles. Use it only there.
Grid: mobile 2 columns, 16px gutters; tablet 3; desktop 4; container max 1200px. Product and tile photos 4:5.
BANNED: gradients; glassmorphism or backdrop-blur; emoji in the UI; icon-in-coloured-circle feature cards; "three feature columns" blocks; Inter or any third font; purple; rounded-2xl or larger; centred paragraphs longer than 2 lines; stock or AI-generated imagery; auto-playing carousels; pop-ups or interstitials; parallax; cursor effects; any sticky element other than the desktop header and the mobile bottom bar.
Icons: only inline SVG components in src/components/icons.tsx: search, list, menu, close, whatsapp, phone, pin, plus, minus, check, chevron.

COPY DECK (put these strings in src/content/copy.ts and use them; do not invent new marketing copy)
hero.sub "Since 1994. Pick what you like and send us your list on WhatsApp."
hero.shop "Shop"; hero.chat "Chat on WhatsApp"
how.line "Pick  ·  Send on WhatsApp  ·  We reply with photos and sizes"
video.chip "Free video call"
store.line "Shop 7, Haji Habib Building, Kemps Corner · Open daily 9am-9pm"
list.title "My list"; list.empty "Your list is empty. Pick a category to start."; list.send "Send list on WhatsApp"; list.sentNote "WhatsApp opened. Press send there to share your list."; list.clear "Clear list"; list.call "Prefer a call?"
add.cta "Add to list"; add.age "Age or size"; add.notSure "Not sure"; add.note "Note (optional)"; add.noteHelp "No personal details, please."
age.prompt "Shopping for?"; age.set "Showing sizes for {age}"; age.change "Change"
search.placeholder "Search, e.g. jhabla, nightsuit"; search.empty "Can't find it? Ask us on WhatsApp."
call.title "Prefer a call?"; call.sub "Leave your number and we'll ring you."; call.consent "I agree to be contacted on this number about my enquiry."; call.success "Thanks. We'll call you soon."; call.fail "Couldn't save your number. Please message us on WhatsApp instead."
chat.greeting "Hi! What are you shopping for?"
Text limits: tile labels max 3 words; sub-category intro max 25 words; no paragraph over 40 words on shop pages. Banned words: curated, elevate, seamless, premium experience, journey, unlock, tapestry, delve.

TECH RULES
- Keep Next.js output: 'export', trailingSlash: true, images.unoptimized: true. The default next/image loader does not work in a static export; use our Photo component (picture + srcset from build-time files).
- Fonts only through next/font/google. Dependencies allowed: zustand, motion, minisearch, @radix-ui/react-dialog (dev: sharp, vitest). Nothing else without writing it to NEEDS_APPROVAL.md.
- Motion: use LazyMotion with domAnimation and the "m" component only. Prefer CSS for simple transitions. Animate only transform and opacity. Respect prefers-reduced-motion everywhere.
- PERFORMANCE BUDGET: first-load JS 150 KB gzipped or less per route (as reported by next build); LCP image preloaded with fetchpriority high; CLS 0.05 or less (every image has width/height or aspect-ratio); no third-party scripts before the first interaction except Google Tag Manager (only if NEXT_PUBLIC_GTM_ID is set) loaded after idle; dynamic-import the search, call form, chat helper and Motion features.
- ACCESSIBILITY: WCAG AA contrast; 44px minimum touch targets; visible focus rings; full keyboard use; labelled dialogs that trap and return focus; meaningful alt text; semantic landmarks; no content hidden from crawlers with CSS tricks (use <details> for collapsed text).
- TRACKING: use src/lib/track.ts and the event names in the analytics tracking dictionary. Allowed button_location values may be extended only by updating the dictionary and CHANGES.md. Never send phone numbers, notes, children's ages or message text to analytics.

PRESERVE (do not break)
All current URLs; src/config/site.ts buildPageMetadata (canonical + og:url); all JSON-LD (ClothingStore, BreadcrumbList, BlogPosting); Breadcrumbs component (restyle only); src/app/sitemap.ts; robots; public/.htaccess (www/https redirects, the /shop/bulk/ 301, ErrorDocument 404); src/data/owner-inputs.json (priceFrom, schoolsServed, replyPromise, authorName, authorBio); src/data/reviews.json text; src/data/shops.ts and the noindex /our-shops/ page; html lang en-IN; page titles, descriptions and H1s set in the SEO steps; blog content and its internal links; the analytics events and dataLayer pushes.

WORKING RULES FOR EVERY STEP
1. Read AGENT_CONTEXT.md, REPO_MAP.md and this file first. Do only the current step; ignore later steps.
2. Never invent facts (prices, ratings, client names, stock, photos). Missing information becomes a TODO in code and a line under "Needs the owner" in CHANGES.md.
3. Make focused edits. Do not rewrite files that don't need it. Run the build after each major piece.
4. Definition of done for every step: npm run lint, npm run build and npm test all pass; screenshots at 390x844 and 1280x800 for every page you touched saved to docs/redesign/shots/<step>-<page>.png (via agent-browser); no console errors; REDESIGN_PROGRESS.md updated; one commit on branch redesign named "Rn: ..."; reply in 6 lines or fewer; stop.
5. Never deploy. Never merge. Never push to main.