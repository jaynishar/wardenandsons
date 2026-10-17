/**
 * Warden & Sons Kids Wear — Central Site & SEO Configuration
 * Single source of truth for canonical URL, metadata defaults,
 * robots, sitemap, and Open Graph settings.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wardenandsons.in';
// Clean up any extraneous trailing slash for consistent base joining
export const SITE_URL = rawSiteUrl.replace(/\/+$/, '');

/**
 * Returns an absolute canonical URL respecting Next.js trailingSlash: true convention.
 * e.g. getCanonicalUrl('/shop') => 'https://wardenandsons.in/shop/'
 *      getCanonicalUrl('/')     => 'https://wardenandsons.in/'
 */
export function getCanonicalUrl(path = ''): string {
  const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!cleanPath) {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}/${cleanPath}/`;
}

export const SITE_CONFIG = {
  name: 'Warden & Sons Kids Wear',
  legalName: 'Warden & Sons',
  tagline: 'Quality Kidswear & Cotton Essentials in South Mumbai',
  description:
    'Heritage children’s clothing boutique at Kemps Corner, South Mumbai. Serving families for over 30 years with breathable cotton newborn essentials, boys & girls playwear, nightsuits, and custom school uniforms via WhatsApp.',
  url: SITE_URL,
  canonicalBase: SITE_URL,
  locale: 'en_IN',
  themeColor: '#FAF8F5',
  ogImage: `${SITE_URL}/brand_logo.jpg`,
  storefrontImage: `${SITE_URL}/store_front.webp`,
};

/**
 * Analytics & Measurement Configuration
 * Single source of truth for GA4 & GTM. Replace placeholders with verified production IDs.
 */
export const ANALYTICS_CONFIG = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX',
};

