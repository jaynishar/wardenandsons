# Project Engineering Instructions
Canonical source: Refer to [GEMINI.md](../GEMINI.md) for full project rules and brand direction.

## Business and goals
Warden & Sons Kids Wear is an established kidswear retailer in Kemps Corner, Mumbai. The website must help customers discover products, understand the store, and contact or visit us.

## Before changing code
Inspect architecture and package.json; read affected components and dependencies; establish baseline build, lint, test and performance results; never assume a file or feature exists without checking.

## Design standards
Premium, editorial, modern retail aesthetic. Mobile-first and fast. Consistent typography, spacing, colours and component states. Product photography is the visual priority. No generic AI-looking gradients, excessive animation or decorative clutter. Preserve the real Warden & Sons logo asset exactly. Never fabricate products, prices, reviews or business claims.

## Engineering standards
Use the installed framework's supported APIs (Next.js 15, React 19). Minimize client-side JavaScript. Use semantic HTML and accessible controls. Optimize responsive images and avoid layout shift. Keep dependencies lean and justified. Preserve existing functionality unless explicit approval is given.

## SEO and discoverability
Unique, accurate title and description per indexable page. Canonical URLs where appropriate with trailing slashes. Validate sitemap, robots and structured data. Descriptive headings, links and image alt text. Never promise rankings or fabricate SEO data.

## Research
Check official documentation (framework docs, web.dev, MDN) before using unfamiliar or recently changed APIs. Prefer maintained official repositories over random snippets. Use the installed skills when relevant.

## Testing and delivery
Review the Git diff before finishing. Run lint, type check, tests and production build. Test key pages at mobile and desktop widths. Check console errors and network failures. Report what changed, commands run and actual results. Never claim an unrun check passed. Never deploy, delete data or change production settings without explicit approval.

## Workflow
Investigate, then plan with acceptance criteria, then make a small coherent change, then run checks, then review and report.
