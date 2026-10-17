import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CartDrawer from '@/components/CartDrawer';
import Analytics from '@/components/Analytics';
import { BUSINESS_CONFIG } from '@/config/business';
import { SITE_URL, SITE_CONFIG, ANALYTICS_CONFIG, getCanonicalUrl } from '@/config/site';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Warden & Sons Kids Wear | Kemps Corner, South Mumbai',
    template: '%s | Warden & Sons Kids Wear',
  },
  description:
    'Heritage children’s clothing boutique in Kemps Corner, South Mumbai. Serving families for over 30 years with breathable cotton newborn essentials, boys & girls playwear, nightsuits, and custom school uniforms via WhatsApp.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: getCanonicalUrl('/'),
    siteName: SITE_CONFIG.name,
    title: 'Warden & Sons Kids Wear | Kemps Corner, South Mumbai',
    description:
      'Heritage children’s clothing boutique in Kemps Corner, South Mumbai. Serving families for over 30 years with quality cotton newborn essentials, playwear, and custom uniforms via WhatsApp.',
    images: [
      {
        url: `${SITE_URL}/brand_logo.jpg`,
        width: 1200,
        height: 630,
        alt: 'Warden & Sons Kids Wear Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warden & Sons Kids Wear | Kemps Corner, South Mumbai',
    description:
      'Heritage children’s clothing boutique in Kemps Corner, South Mumbai. Quality cotton newborn essentials, boys & girls playwear, and custom uniforms.',
    images: [`${SITE_URL}/brand_logo.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Factual ClothingStore JSON-LD derived directly from owner-verified location and business config
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: BUSINESS_CONFIG.name,
    image: `${SITE_URL}/brand_logo.jpg`,
    url: getCanonicalUrl('/'),
    telephone: BUSINESS_CONFIG.phone.display,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_CONFIG.location.neighborhood,
      addressLocality: BUSINESS_CONFIG.location.city,
      addressRegion: BUSINESS_CONFIG.location.state,
      postalCode: BUSINESS_CONFIG.location.postalCode,
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:30',
        closes: '20:30',
      },
    ],
  };

  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect for WhatsApp links */}
        <link rel="preconnect" href="https://wa.me" />
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {/* Analytics & Tag Manager */}
        <Analytics />
      </head>
      <body className="min-h-full flex flex-col bg-bg-cream text-near-black selection:bg-gold/30 selection:text-forest">
        {/* Google Tag Manager (noscript) */}
        {ANALYTICS_CONFIG.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${ANALYTICS_CONFIG.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Header />
        <CartDrawer />
        <main className="flex-grow pb-20 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
