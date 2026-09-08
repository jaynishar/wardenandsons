import type { Metadata } from 'next';
import { Quicksand, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MobileStickyBar from '@/components/MobileStickyBar';

const quicksand = Quicksand({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Primary Site Suffix and Fallback Metadata
export const metadata: Metadata = {
  title: {
    default: 'Warden & Sons Kids Wear | Kemps Corner, South Mumbai',
    template: '%s | Warden & Sons Kids Wear',
  },
  description:
    'Warden & Sons Kids Wear is South Bombay’s trusted family-run clothing boutique at Kemps Corner since 1994. Shop newborn baby clothes, boys/girls wear, and quality basics.',
  keywords: [
    'kids wear shop Kemps Corner',
    'children\'s clothing store South Bombay',
    'newborn baby clothes Mumbai',
    'kids clothes shop near me Mumbai',
    'buy kids clothes on WhatsApp Mumbai',
    'custom bulk kids clothing Mumbai',
    'school uniform bulk order Mumbai',
    'video shopping kids clothes India',
    'boys girls clothing store Kemps Corner',
  ],
  metadataBase: new URL('https://wardenandsons.com'), // Replace with actual domain after deployment
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Warden & Sons Kids Wear | Kemps Corner, South Mumbai',
    description:
      'South Bombay’s trusted kids and family clothing store at Kemps Corner. Shop newborn essentials, boys & girls playwear, school uniforms, and custom bulk orders.',
    url: 'https://wardenandsons.com',
    siteName: 'Warden & Sons Kids Wear',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/brand_logo.jpg',
        width: 800,
        height: 800,
        alt: 'Warden & Sons Kids Wear - Kemps Corner, South Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warden & Sons Kids Wear | Kemps Corner, South Mumbai',
    description:
      'South Bombay’s trusted kids and family clothing store at Kemps Corner. Shop newborn essentials, boys & girls playwear, school uniforms, and custom bulk orders.',
    images: ['/brand_logo.jpg'],
  },
  verification: {
    google: 'GOOGLE_SEARCH_CONSOLE_VERIFICATION_PLACEHOLDER',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      'msvalidate.01': 'BING_WEBMASTER_VERIFICATION_PLACEHOLDER',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness (ClothingStore) JSON-LD schema markup
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Warden & Sons Kids Wear',
    image: 'https://wardenandsons.com/brand_logo.jpg',
    '@id': 'https://wardenandsons.com/#store',
    url: 'https://wardenandsons.com',
    telephone: '+919920751567',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kemps Corner, South Mumbai',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400036',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.9634,
      longitude: 72.8055,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:30',
        closes: '20:30',
      },
    ],
    sameAs: [
      'https://g.page/r/CRi_iIq4yd6gEBM/review',
      'https://wa.me/message/NBG6MFUV3EXYG1',
    ],
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Kemps Corner',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'South Mumbai',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'South Bombay',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Mumbai',
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        {/* Local SEO Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Google Analytics 4 Script Placeholders */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GA4_MEASUREMENT_ID_PLACEHOLDER"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GA4_MEASUREMENT_ID_PLACEHOLDER', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-warm-bg text-slate-dark selection:bg-primary-100 selection:text-primary-800">
        <Header />
        <main className="flex-grow pb-16 md:pb-0">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileStickyBar />
      </body>
    </html>
  );
}
