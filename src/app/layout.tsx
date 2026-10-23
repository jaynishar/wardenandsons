import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CartDrawer from '@/components/CartDrawer';
import TrackingProvider from '@/components/TrackingProvider';
import { GoogleTagManager } from '@next/third-parties/google';
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
    default: 'Kids Clothing Store in South Mumbai | Warden & Sons',
    template: '%s | Warden & Sons',
  },
  description:
    'Kids clothing in Kemps Corner, South Mumbai since 1994. Cotton newborn sets, playwear, nightsuits & uniforms on WhatsApp.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    siteName: SITE_CONFIG.name,
    title: 'Kids Clothing Store in South Mumbai | Warden & Sons',
    description:
      'Heritage children’s clothing boutique in Kemps Corner, South Mumbai. Serving families for over 30 years with quality cotton newborn essentials, playwear, and custom uniforms via WhatsApp.',
    images: [
      {
        url: `${SITE_URL}/brand_logo.jpg`,
        width: 800,
        height: 399,
        alt: 'Warden & Sons Kids Wear Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kids Clothing Store in South Mumbai | Warden & Sons',
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
  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <script
          id="datalayer-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];`,
          }}
        />
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        ) : (
          /* TODO: Set NEXT_PUBLIC_GTM_ID in environment variables to activate Google Tag Manager */
          null
        )}
        {/* High-priority LCP hero image preload for instant discovery */}
        <link
          rel="preload"
          as="image"
          href="/hero-editorial.webp"
          type="image/webp"
          fetchPriority="high"
        />
        {/* Favicon & Web App Icons */}
        <link rel="icon" href="/favicon.ico?v=5" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=5" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=5" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=5" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-cream text-near-black selection:bg-gold/30 selection:text-forest">
        <TrackingProvider />
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
