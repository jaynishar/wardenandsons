import fs from 'fs';
import path from 'path';

console.log('Applying SEO Addendum fixes...');

// 1. Update public/.htaccess
const htaccessPath = 'public/.htaccess';
let htaccess = fs.readFileSync(htaccessPath, 'utf8');

// Ensure canonical redirect handles www to non-www and http to https
const htaccessRewriteRules = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Canonical 301 Redirect: www.wardenandsons.in -> https://wardenandsons.in/
  RewriteCond %{HTTP_HOST} ^www\\.wardenandsons\\.in$ [NC]
  RewriteRule ^(.*)$ https://wardenandsons.in/$1 [L,R=301]

  # 2. Canonical 301 Redirect: http -> https
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteRule ^(.*)$ https://wardenandsons.in/$1 [L,R=301]

  # 3. 301 Redirect legacy and obsolete routes
  RewriteRule ^whatsapp-shopping/?$ /how-it-works/ [L,R=301]
  RewriteRule ^video-shopping/?$ /how-it-works/ [L,R=301]
  RewriteRule ^reviews/?$ / [L,R=301]
  RewriteRule ^shop/bulk/?$ /bulk-orders/ [L,R=301]`;

htaccess = htaccess.replace(/<IfModule mod_rewrite\.c>[\s\S]*?RewriteRule \^reviews\/\?\$ \/ \[L,R=301\]/, htaccessRewriteRules);
fs.writeFileSync(htaccessPath, htaccess, 'utf8');
console.log('✅ Updated public/.htaccess');

// 2. Update src/app/sitemap.ts
const sitemapPath = 'src/app/sitemap.ts';
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
sitemap = sitemap.replace(/\s*['"]\/shop\/bulk['"],?/, '');
fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ Updated src/app/sitemap.ts');

// 3. Update src/components/Header.tsx
const headerPath = 'src/components/Header.tsx';
let header = fs.readFileSync(headerPath, 'utf8');
header = header.replace(
  /const navLinks = \[[\s\S]*?\];/,
  `const navLinks = [
    { name: 'Catalogue', href: '/shop/' },
    { name: 'Size Guide', href: '/size-guide/' },
    { name: 'How It Works', href: '/how-it-works/' },
    { name: 'Our Heritage', href: '/about/' },
    {
      name: 'Bulk & Uniforms',
      href: '/bulk-orders/',
    },
    {
      name: 'Blog',
      href: '/blog/',
    },
    { name: 'Visit Store', href: '/visit-us/' },
  ];`
);
fs.writeFileSync(headerPath, header, 'utf8');
console.log('✅ Updated src/components/Header.tsx');

// 4. Update src/components/Footer.tsx
const footerPath = 'src/components/Footer.tsx';
let footer = fs.readFileSync(footerPath, 'utf8');
footer = footer.replace(/href="\/shop\/newborn"/g, 'href="/shop/newborn/"');
footer = footer.replace(/href="\/shop\/boys"/g, 'href="/shop/boys/"');
footer = footer.replace(/href="\/shop\/girls"/g, 'href="/shop/girls/"');
footer = footer.replace(/href="\/shop\/men"/g, 'href="/shop/men/"');
footer = footer.replace(/href="\/shop\/women"/g, 'href="/shop/women/"');
footer = footer.replace(/href="\/bulk-orders"/g, 'href="/bulk-orders/"');
footer = footer.replace(/href="\/size-guide"/g, 'href="/size-guide/"');
footer = footer.replace(/href="\/how-it-works"/g, 'href="/how-it-works/"');
footer = footer.replace(/href="\/about"/g, 'href="/about/"');
footer = footer.replace(/href="\/visit-us"/g, 'href="/visit-us/"');
footer = footer.replace(/href="\/contact"/g, 'href="/contact/"');
footer = footer.replace(/href="\/shipping-returns"/g, 'href="/shipping-returns/"');
footer = footer.replace(/href="\/blog"/g, 'href="/blog/"');

// Ensure Store Information has Blog, Privacy Policy, and Terms
const storeInfoTarget = `              <li>
                <Link href="/blog/" className="hover:text-forest transition-colors">
                  Parenting & Sizing Guides
                </Link>
              </li>`;

const storeInfoReplacement = `              <li>
                <Link href="/blog/" className="hover:text-forest transition-colors">
                  Blog &amp; Sizing Guides
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy/" className="hover:text-forest transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-forest transition-colors">
                  Terms of Service
                </Link>
              </li>`;

if (footer.includes(storeInfoTarget)) {
  footer = footer.replace(storeInfoTarget, storeInfoReplacement);
}

// Add Privacy Policy and Terms to bottom strip
const bottomStripTarget = `<div className="mt-12 pt-8 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} Warden & Sons Kids Wear. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Kemps Corner, South Mumbai</span>
          </p>
        </div>`;

const bottomStripReplacement = `<div className="mt-12 pt-8 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} Warden & Sons Kids Wear. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <Link href="/privacy-policy/" className="hover:text-forest transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms/" className="hover:text-forest transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-300">•</span>
            <span>Kemps Corner, South Mumbai</span>
          </div>
        </div>`;

if (footer.includes(bottomStripTarget)) {
  footer = footer.replace(bottomStripTarget, bottomStripReplacement);
}

fs.writeFileSync(footerPath, footer, 'utf8');
console.log('✅ Updated src/components/Footer.tsx');

// 5. Update src/components/BottomNav.tsx
const bottomNavPath = 'src/components/BottomNav.tsx';
let bottomNav = fs.readFileSync(bottomNavPath, 'utf8');
bottomNav = bottomNav.replace("href: '/shop'", "href: '/shop/'");
bottomNav = bottomNav.replace("href: '/how-it-works'", "href: '/how-it-works/'");
fs.writeFileSync(bottomNavPath, bottomNav, 'utf8');
console.log('✅ Updated src/components/BottomNav.tsx');

// 6. Update src/components/Hero.tsx
const heroPath = 'src/components/Hero.tsx';
let hero = fs.readFileSync(heroPath, 'utf8');
hero = hero.replace('href="/shop"', 'href="/shop/"');
fs.writeFileSync(heroPath, hero, 'utf8');
console.log('✅ Updated src/components/Hero.tsx');

// 7. Update src/components/HowItWorks.tsx
const hiwPath = 'src/components/HowItWorks.tsx';
let hiw = fs.readFileSync(hiwPath, 'utf8');
hiw = hiw.replace('href="/shop/boys"', 'href="/shop/boys/"');
hiw = hiw.replace('href="/how-it-works"', 'href="/how-it-works/"');
hiw = hiw.replace('href="/visit-us"', 'href="/visit-us/"');
fs.writeFileSync(hiwPath, hiw, 'utf8');
console.log('✅ Updated src/components/HowItWorks.tsx');

// 8. Update src/components/CategoryGrid.tsx
const catGridPath = 'src/components/CategoryGrid.tsx';
let catGrid = fs.readFileSync(catGridPath, 'utf8');
catGrid = catGrid.replace(
  "const href = cat.slug === 'bulk' ? '/bulk-orders' : `/shop/${cat.slug}`;",
  "const href = cat.slug === 'bulk' ? '/bulk-orders/' : `/shop/${cat.slug}/`;"
);
fs.writeFileSync(catGridPath, catGrid, 'utf8');
console.log('✅ Updated src/components/CategoryGrid.tsx');

// 9. Update src/app/size-guide/page.tsx
const sizeGuidePath = 'src/app/size-guide/page.tsx';
let sizeGuide = fs.readFileSync(sizeGuidePath, 'utf8');
sizeGuide = sizeGuide.replace(
  "import { getCanonicalUrl } from '@/config/site';",
  "import { getCanonicalUrl, buildPageMetadata } from '@/config/site';"
);
sizeGuide = sizeGuide.replace(
  /export const metadata: Metadata = {[\s\S]*?canonical: getCanonicalUrl\('\/size-guide'\),\s*},\s*};/,
  `export const metadata: Metadata = buildPageMetadata({
  path: '/size-guide',
  title: { absolute: 'Kids Clothes Size Chart by Age (0-16Y) | Warden & Sons' },
  description:
    'Accurate kids clothing size chart by age, chest, and height. Find what size for age 2-16 or ask our desk for counter measurements.',
});`
);
sizeGuide = sizeGuide.replace('href="/shop"', 'href="/shop/"');
fs.writeFileSync(sizeGuidePath, sizeGuide, 'utf8');
console.log('✅ Updated src/app/size-guide/page.tsx');

// 10. Update src/app/visit-us/page.tsx
const visitUsPath = 'src/app/visit-us/page.tsx';
let visitUs = fs.readFileSync(visitUsPath, 'utf8');
visitUs = visitUs.replace(
  "import { getCanonicalUrl } from '@/config/site';",
  "import { getCanonicalUrl, buildPageMetadata } from '@/config/site';"
);
visitUs = visitUs.replace(
  /export const metadata: Metadata = {[\s\S]*?canonical: getCanonicalUrl\('\/visit-us'\),\s*},\s*};/,
  `export const metadata: Metadata = buildPageMetadata({
  path: '/visit-us',
  title: { absolute: 'Visit Kids Clothing Shop at Kemps Corner | Warden & Sons' },
  description:
    'Find cotton kids clothes near Pedder Road flyover & St. Stephen’s. Open daily 9am–9pm. In-store fitting & WhatsApp delivery.',
});`
);
visitUs = visitUs.replace('href="/how-it-works"', 'href="/how-it-works/"');
visitUs = visitUs.replace('href="/shop/boys"', 'href="/shop/boys/"');
visitUs = visitUs.replace('href="/shop/newborn"', 'href="/shop/newborn/"');
visitUs = visitUs.replace('href="/size-guide"', 'href="/size-guide/"');
fs.writeFileSync(visitUsPath, visitUs, 'utf8');
console.log('✅ Updated src/app/visit-us/page.tsx');

// 11. Update src/app/contact/page.tsx
const contactPath = 'src/app/contact/page.tsx';
let contact = fs.readFileSync(contactPath, 'utf8');
contact = contact.replace(
  "import { getCanonicalUrl } from '@/config/site';",
  "import { getCanonicalUrl, buildPageMetadata } from '@/config/site';"
);
contact = contact.replace(
  /export const metadata: Metadata = {[\s\S]*?canonical: getCanonicalUrl\('\/contact'\),\s*},\s*};/,
  `export const metadata: Metadata = buildPageMetadata({
  path: '/contact',
  title: { absolute: 'Contact Our Kemps Corner Store Desk | Warden & Sons' },
  description:
    'Get in touch with Warden & Sons Kids Wear at Kemps Corner, South Mumbai. Send sizing queries, newborn questions, or visit our shop.',
});`
);
fs.writeFileSync(contactPath, contact, 'utf8');
console.log('✅ Updated src/app/contact/page.tsx');

// 12. Update src/app/shipping-returns/page.tsx
const shippingPath = 'src/app/shipping-returns/page.tsx';
let shipping = fs.readFileSync(shippingPath, 'utf8');
shipping = shipping.replace(
  "import { getCanonicalUrl } from '@/config/site';",
  "import { getCanonicalUrl, buildPageMetadata } from '@/config/site';"
);
shipping = shipping.replace(
  /export const metadata: Metadata = {[\s\S]*?canonical: getCanonicalUrl\('\/shipping-returns'\),\s*},\s*};/,
  `export const metadata: Metadata = buildPageMetadata({
  path: '/shipping-returns',
  title: { absolute: 'Delivery, Store Pickup & Size Exchanges | Warden & Sons' },
  description:
    'Mumbai doorstep delivery, store pickup at Kemps Corner, and straightforward size exchanges handled directly on WhatsApp.',
});`
);
fs.writeFileSync(shippingPath, shipping, 'utf8');
console.log('✅ Updated src/app/shipping-returns/page.tsx');

// 13. Update src/app/privacy-policy/page.tsx
const privacyPath = 'src/app/privacy-policy/page.tsx';
let privacy = fs.readFileSync(privacyPath, 'utf8');
privacy = privacy.replace(
  "import { getCanonicalUrl } from '@/config/site';",
  "import { getCanonicalUrl, buildPageMetadata } from '@/config/site';"
);
privacy = privacy.replace(
  /export const metadata: Metadata = {[\s\S]*?canonical: getCanonicalUrl\('\/privacy-policy'\),\s*},\s*};/,
  `export const metadata: Metadata = buildPageMetadata({
  path: '/privacy-policy',
  title: { absolute: 'Customer Privacy Policy & WhatsApp Care | Warden & Sons' },
  description:
    'Read the privacy policy of Warden & Sons Kids Wear. How we protect your details, phone number, and WhatsApp enquiry privacy.',
});`
);
fs.writeFileSync(privacyPath, privacy, 'utf8');
console.log('✅ Updated src/app/privacy-policy/page.tsx');

// 14. Update src/app/terms/page.tsx
const termsPath = 'src/app/terms/page.tsx';
let terms = fs.readFileSync(termsPath, 'utf8');
terms = terms.replace(
  "import { getCanonicalUrl } from '@/config/site';",
  "import { getCanonicalUrl, buildPageMetadata } from '@/config/site';"
);
terms = terms.replace(
  /export const metadata: Metadata = {[\s\S]*?canonical: getCanonicalUrl\('\/terms'\),\s*},\s*};/,
  `export const metadata: Metadata = buildPageMetadata({
  path: '/terms',
  title: { absolute: 'Shop Policies & WhatsApp Order Terms | Warden & Sons' },
  description:
    'Read the terms of service of Warden & Sons Kids Wear Kemps Corner. Guidelines on retail requests, pricing, and size exchanges.',
});`
);
fs.writeFileSync(termsPath, terms, 'utf8');
console.log('✅ Updated src/app/terms/page.tsx');

console.log('All layout and page updates applied successfully!');
