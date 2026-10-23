import type { ClothingStore, BreadcrumbList, WebSite, BlogPosting, WithContext } from 'schema-dts';
import { SITE_URL, getCanonicalUrl } from '@/config/site';

/**
 * Generates typed ClothingStore JSON-LD schema for Warden & Sons
 * Populated from official business profile details.
 */
export function getClothingStoreSchema(pagePath = '/'): WithContext<ClothingStore> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Warden & Sons Kids Wear',
    url: getCanonicalUrl(pagePath),
    logo: `${SITE_URL}/brand_logo.webp`,
    image: `${SITE_URL}/store_front.webp`,
    telephone: '+91 99207 51567',
    sameAs: [
      'https://share.google/iwNowyZv9IlLRTv8Z',
      'https://www.instagram.com/wardenandsonskidswear/',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Shop No. 7, Ground Floor, Haji Habib Building, 155/157 August Kranti Marg, Near St. Stephen’s Church, Kemps Corner',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400036',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.9654,
      longitude: 72.8152,
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
          'https://schema.org/Sunday',
        ],
        opens: '09:00',
        closes: '21:00',
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
 * Generates typed BlogPosting JSON-LD schema for blog articles.
 */
export function getBlogPostingSchema(post: {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
}): WithContext<BlogPosting> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'The Warden & Sons Team',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Warden & Sons Kids Wear',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand_logo.jpg`,
      },
    },
    image: `${SITE_URL}/brand_logo.jpg`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getCanonicalUrl(`/blog/${post.slug}`),
    },
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
