import type { Metadata } from 'next';

/**
 * Warden & Sons Kids Wear — Central Site & SEO Configuration
 * Single source of truth for canonical URL, metadata defaults,
 * robots, sitemap, and Open Graph settings.
 */

export const SITE_URL = 'https://wardenandsons.in';

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
  themeColor: '#FFFFFF',
  ogImage: `${SITE_URL}/og-card.jpg`,
  storefrontImage: `${SITE_URL}/store_front.webp`,
};

export interface PageMetadataInput {
  path: string;
  title: NonNullable<Metadata['title']>;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
  noindex?: boolean;
}

/**
 * Single shared helper to construct BOTH canonical and og:url together.
 * Guarantees:
 * 1. canonical and og:url always match each page's own URL, derived from the same path with trailing slash.
 * 2. og:title, og:description, og:url, and og:image are always provided and match page metadata.
 * 3. No page ever defaults or falls back to the homepage URL as its og:url.
 * 4. og:image dimensions match real pixel size (default og-card: 1200x630).
 */
export function buildPageMetadata({
  path,
  title,
  description,
  image = `${SITE_URL}/og-card.jpg`,
  imageAlt,
  type = 'website',
  publishedTime,
  authors,
  noindex,
}: PageMetadataInput): Metadata {
  const pageUrl = getCanonicalUrl(path);
  const titleString =
    typeof title === 'string'
      ? title
      : typeof title === 'object' && title !== null
        ? 'absolute' in title
          ? title.absolute
          : 'default' in title
            ? title.default
            : SITE_CONFIG.name
        : SITE_CONFIG.name;

  const isBrandLogo = image.includes('brand_logo');
  const imageWidth = isBrandLogo ? 800 : 1200;
  const imageHeight = isBrandLogo ? 399 : 630;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type,
      locale: SITE_CONFIG.locale,
      url: pageUrl,
      siteName: SITE_CONFIG.name,
      title: titleString,
      description,
      images: [
        {
          url: image,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt || `${titleString} | Warden & Sons`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: titleString,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * Analytics & Measurement Configuration
 * Single source of truth for GA4 & GTM. Replace placeholders with verified production IDs.
 */
export const ANALYTICS_CONFIG = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID || 'G-FNQNXJJVQ3',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-PK75ST2X',
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
};
