import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { ListSheet, AddSheet } from '@/components/list';
import { SearchContainer } from '@/components/search';
import TrackingProvider from '@/components/TrackingProvider';
import ConsentBanner from '@/components/ConsentBanner';
import ChatHelperContainer from '@/components/chat/ChatHelperContainer';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { SITE_URL, SITE_CONFIG, ANALYTICS_CONFIG, getCanonicalUrl } from '@/config/site';

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      ANALYTICS_CONFIG.googleSiteVerification ||
      undefined,
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
    <html lang="en-IN" className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        {/* Google Consent Mode v2 & DataLayer Initialization */}
        <script
          id="google-consent-mode"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              (function() {
                var saved = null;
                try { saved = localStorage.getItem('ws_consent_choice'); } catch(e) {}
                var isAll = saved === 'all';
                gtag('consent', 'default', {
                  'analytics_storage': isAll ? 'granted' : 'denied',
                  'ad_storage': isAll ? 'granted' : 'denied',
                  'ad_user_data': isAll ? 'granted' : 'denied',
                  'ad_personalization': isAll ? 'granted' : 'denied',
                  'wait_for_update': 500
                });
              })();
            `,
          }}
        />

        {/* Load Tag Manager if configured in environment, else direct GA4 */}
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        ) : ANALYTICS_CONFIG.gaMeasurementId ? (
          <GoogleAnalytics gaId={ANALYTICS_CONFIG.gaMeasurementId} />
        ) : null}

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
      <body className="min-h-full flex flex-col bg-ivory text-ink selection:bg-paper selection:text-ink">
        {/* Accessible skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--ink)] focus:text-[var(--ivory)] focus:rounded-[4px] focus:outline-2 focus:outline-[var(--blue)] font-medium text-sm shadow-md"
        >
          Skip to content
        </a>
        <TrackingProvider />
        <Header />
        <SearchContainer />
        <ListSheet />
        <AddSheet />
        <main id="main-content" className="flex-grow pb-[calc(4.5rem+var(--sab))] md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomNav />
        <ConsentBanner />
        <ChatHelperContainer />
      </body>
    </html>
  );
}
