import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CartDrawer from '@/components/CartDrawer';
import { BUSINESS_CONFIG } from '@/config/business';

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
    'Heritage children’s clothing boutique in Kemps Corner, South Mumbai. Serving families for over 30 years with 100% pure cotton newborn essentials, boys & girls playwear, nightsuits, and custom school uniforms via WhatsApp.',
  metadataBase: new URL('https://wardenandsons.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Warden & Sons Kids Wear',
    image: 'https://wardenandsons.com/brand_logo.jpg',
    url: 'https://wardenandsons.com',
    telephone: BUSINESS_CONFIG.phone.display,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kemps Corner',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400036',
      addressCountry: 'IN',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Warden & Sons',
    url: 'https://wardenandsons.com',
    logo: 'https://wardenandsons.com/brand_logo.jpg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS_CONFIG.phone.display,
      contactType: 'customer service',
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://wa.me" />
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#D4A574]/30 selection:text-[#1B4332]">
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
