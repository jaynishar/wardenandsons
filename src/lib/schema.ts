import type { ClothingStore, BreadcrumbList, FAQPage, WithContext } from 'schema-dts';
import { BUSINESS_CONFIG } from '@/config/business';
import { SITE_URL, getCanonicalUrl } from '@/config/site';

/**
 * Generates typed ClothingStore JSON-LD schema for Warden & Sons
 * Complies with schema.org and Google Merchant / Local Business specifications.
 */
export function getClothingStoreSchema(): WithContext<ClothingStore> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    '@id': `${SITE_URL}/#store`,
    name: BUSINESS_CONFIG.name,
    legalName: BUSINESS_CONFIG.legalName,
    description:
      'Heritage children’s clothing boutique in Kemps Corner, South Mumbai. Serving families for over 30 years with breathable cotton newborn essentials, boys & girls playwear, nightsuits, and custom school uniforms.',
    image: `${SITE_URL}/brand_logo.webp`,
    logo: `${SITE_URL}/brand_logo.webp`,
    url: getCanonicalUrl('/'),
    telephone: BUSINESS_CONFIG.phone.display,
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    areaServed: [
      'Kemps Corner',
      'South Mumbai',
      'Altamount Road',
      'Breach Candy',
      'Pedder Road',
      'Nepean Sea Road',
      'Mumbai',
      'India',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${BUSINESS_CONFIG.location.neighborhood}, near Pedder Road Flyover`,
      addressLocality: BUSINESS_CONFIG.location.city,
      addressRegion: BUSINESS_CONFIG.location.state,
      postalCode: BUSINESS_CONFIG.location.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.9633,
      longitude: 72.8055,
    },
    hasMap: BUSINESS_CONFIG.location.googleMapsSearchUrl,
    sameAs: [
      BUSINESS_CONFIG.location.googleReviewUrl,
      'https://g.page/r/CRi_iIq4yd6gEBM',
      BUSINESS_CONFIG.phone.whatsappUrl,
    ],
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
 * Generates typed BreadcrumbList JSON-LD schema for any inner page.
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

/**
 * Generates typed FAQPage JSON-LD schema.
 */
export function getFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>,
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
