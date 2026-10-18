import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CartDrawer from '@/components/CartDrawer';
import Analytics from '@/components/Analytics';
import { GoogleTagManager } from '@next/third-parties/google';
import { getClothingStoreSchema } from '@/lib/schema';
import { SITE_URL, SITE_CONFIG, getCanonicalUrl } from '@/config/site';

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
  icons: {
    icon: [
      { url: '/favicon.ico?v=5', sizes: 'any' },
      { url: '/favicon-32x32.png?v=5', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=5', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png?v=5', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=5', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=5', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico?v=5',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = getClothingStoreSchema();

  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <GoogleTagManager gtmId="GTM-PK75ST2X" />
        {/* High-priority LCP hero image preload for instant discovery */}
        <link
          rel="preload"
          as="image"
          href="/hero-editorial.webp"
          type="image/webp"
          fetchPriority="high"
        />
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {/* Favicon & Web App Icons */}
        <link rel="icon" href="/favicon.ico?v=5" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=5" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=5" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=5" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Additional Analytics */}
        <Analytics />
      </head>
      <body className="min-h-full flex flex-col bg-bg-cream text-near-black selection:bg-gold/30 selection:text-forest">
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
