import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import BottomNav from '@/components/BottomNav';
import SlideOutCart from '@/components/SlideOutCart';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Warden & Sons | Heritage Kidswear Mumbai',
    template: '%s | Warden & Sons',
  },
  description: 'Premium kids clothing, school uniforms, and custom B2B printing in South Bombay since 1994.',
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
    telephone: '+919920751567',
    priceRange: '$$',
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
      telephone: '+919920751567',
      contactType: 'customer service',
    },
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');`,
          }}
        />
        {/* GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');`,
          }}
        />
        {/* JSON-LD Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-black selection:bg-gray-200 selection:text-black">
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>
        
        <Header />
        <SlideOutCart />
        <main className="flex-grow pb-16 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
