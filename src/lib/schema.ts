import type { ClothingStore, BreadcrumbList, WebSite, WithContext } from 'schema-dts';
import { SITE_URL, getCanonicalUrl } from '@/config/site';

/**
 * Generates typed ClothingStore JSON-LD schema for Warden & Sons
 * Follows schema.org specifications strictly.
 * Geo coordinates and sameAs links are omitted per owner instructions.
 */
export function getClothingStoreSchema(): WithContext<ClothingStore> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Warden & Sons Kids Wear',
    url: getCanonicalUrl('/'),
    logo: `${SITE_URL}/brand_logo.webp`,
    image: `${SITE_URL}/store_front.webp`,
    telephone: '+91 99207 51567',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kemps Corner',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400036',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'https://schema.org/Monday',
          'https://schema.org/Tuesday',
          'https://schema.org/Wednesday',
          'https://schema.org/Thursday',
          'https://schema.org/Friday',
          'https://schema.org/Saturday',
        ],
        opens: '10:30',
        closes: '20:30',
      },
    ],
  };
}

/**
 * Generates typed WebSite JSON-LD schema for Homepage.
 */
export function getWebSiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Warden & Sons Kids Wear',
    url: getCanonicalUrl('/'),
  };
}

/**
 * Generates typed BreadcrumbList JSON-LD schema for inner pages.
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
