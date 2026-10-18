# Warden & Sons Kids Wear Website

A complete, production-ready, ultra-fast, mobile-first marketing website for **Warden & Sons Kids Wear**, located at Kemps Corner, South Mumbai (South Bombay).

Built using **Next.js 15 (App Router)**, **Tailwind CSS v4**, **TypeScript**, and **Framer Motion**, the site is designed to drive local SEO visibility and support multiple sales channels: offline walk-ins, WhatsApp orders, live video call shopping, custom bulk orders, and a limited online store catalog.

---

## 🚀 How to Run Locally

Since the project is structured with modern tooling, follow these commands to run it locally:

### 1. Install Dependencies

Although the dependencies are configured for `pnpm`, you can use `pnpm` or fall back to `npm` if needed:

```bash
# Using pnpm (Recommended)
pnpm install

# Or using npm
npm install
```

### 2. Start the Development Server

Run the local development server:

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the live site.

### 3. Build & Export Statically

To generate the static production build (which compiles all pages, category grids, and MDX articles into static HTML/CSS files in the `out/` folder):

```bash
# Using pnpm
pnpm build

# Or using npm
npm run build
```

---

## 📝 How to Add a New Blog Post

The website includes a lightweight, ultra-fast, static MDX blog reader that compiles markdown articles into fully styled SEO-friendly pages.

To add a new article:

1. Create a new file in the `src/content/blog/` directory (e.g. `your-article-slug.mdx`).
2. Add the metadata header (frontmatter) at the very top of the file:
   ```markdown
   ---
   title: 'Your SEO-Optimized Catchy Title'
   metaTitle: 'Meta Title for Google Indexing (max 60 chars)'
   metaDescription: 'Meta description showing in Google Search results (max 160 chars)'
   date: '2026-07-23'
   author: 'Warden Editorial'
   excerpt: 'A brief summary of your article that displays on the blog list page.'
   coverImage: '/images/blog/your-image-placeholder.jpg'
   category: 'Newborn' # e.g. Newborn, Boys, Girls, Nightwear, Sportswear, Winterwear, Shopping Guides, Local Guides
   tags: ['Tag1', 'Tag2']
   readTime: '4 min read'
   ---
   ```
3. Write your article in standard Markdown below the header. The website automatically parses subheadings (`##`, `###`), lists (`-`, `1.`), blockquotes (`>`), and tables to display them in a polished local-South Bombay typography theme.
4. Run `npm run build` or `pnpm build` to compile the new route `/blog/your-article-slug` and automatically inject it into the dynamic sitemap XML.

---

## 🎟️ How to Swap the Video-Shopping Fee Flag

We built a dedicated config-driven feature flag to allow toggling a video shopping booking fee at a later date without refactoring any code.

1. Open the file [src/config/features.ts](file:///C:/Users/jayni/OneDrive/Desktop/warden%20and%20sons%20kids%20wear%20website/src/config/features.ts).
2. Change the `videoShoppingBookingFee` value:
   - **Free Mode (Default):** Set `videoShoppingBookingFee: 0`. The video shopping page and booking widget will show the green **"🎁 100% FREE RIGHT NOW"** badge.
   - **Fee Mode:** Set to a positive number, e.g., `videoShoppingBookingFee: 199`. The widget will automatically transition to show the orange **"🎟️ Booking Fee: ₹199"** badge, with a footnote explaining that the fee is fully adjustable against purchase.
3. Re-build or push your changes to redeploy.

---

## 🚢 GitHub Actions & Hostinger Deployment

The project includes an automated deployment workflow located in `.github/workflows/deploy.yml`. On pushing code to the `main` branch, it installs dependencies, compiles the static build (`out/`), and deploys it to your Hostinger server via FTP.

### How to Configure Deployments:

1. Create a GitHub repository and push your project code.
2. In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
3. Add the following **Repository Secrets**:
   - `HOSTINGER_FTP_SERVER`: The FTP hostname for your Hostinger account (e.g. `ftp.yourdomain.com` or Hostinger FTP IP).
   - `HOSTINGER_FTP_USERNAME`: Your Hostinger FTP account username.
   - `HOSTINGER_FTP_PASSWORD`: Your Hostinger FTP account password.
4. On every commit to `main`, GitHub Actions will trigger and automatically deploy the updated site to Hostinger's `/public_html/` folder.

---

## 💡 Lighthouse, SEO & Customization Checklist

The project is fully structured to achieve high scores (Performance ≥95, SEO = 100, Accessibility ≥95) by utilizing Next.js 15 App Router static generation. Here is a brief verification checklist for launch:

1. **GSC & Analytics Tags:** Open [src/app/layout.tsx](file:///C:/Users/jayni/OneDrive/Desktop/warden%20and%20sons%20kids%20wear%20website/src/app/layout.tsx) and swap the placeholder strings for `GOOGLE_SEARCH_CONSOLE_VERIFICATION_PLACEHOLDER`, `BING_WEBMASTER_VERIFICATION_PLACEHOLDER`, and `G-GA4_MEASUREMENT_ID_PLACEHOLDER` with your live Google Search Console & GA4 property tokens.
2. **Canonical Domain Name:** Swap the fallback URL `https://wardenandsons.com` inside [src/app/layout.tsx](file:///C:/Users/jayni/OneDrive/Desktop/warden%20and%20sons%20kids%20wear%20website/src/app/layout.tsx), [src/app/sitemap.ts](file:///C:/Users/jayni/OneDrive/Desktop/warden%20and%20sons%20kids%20wear%20website/src/app/sitemap.ts), and [src/app/robots.ts](file:///C:/Users/jayni/OneDrive/Desktop/warden%20and%20sons%20kids%20wear%20website/src/app/robots.ts) to match your registered domain.
3. **Product Imagery:** All catalog items serve dynamic descriptions and sizes. You can place actual product catalog photos inside the `/public/images/` directory and update the `coverImage` or logo paths.
