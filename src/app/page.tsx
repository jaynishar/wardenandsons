import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, MapPin, Clock, Phone } from 'lucide-react';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import FAQ from '@/components/FAQ';
import GoogleReviewsBlock from '@/components/GoogleReviewsBlock';
import { getFeaturedCatalogueItems } from '@/lib/products';
import { BUSINESS_CONFIG } from '@/config/business';
import { getClothingStoreSchema, getWebSiteSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';

export default function HomePage() {
  const featuredProducts = getFeaturedCatalogueItems(6);
  const storeSchema = getClothingStoreSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <div className="space-y-12 md:space-y-16 font-sans">
      <JsonLd schema={[storeSchema, websiteSchema]} />
      {/* 1. Hero with Announcement */}
      <Hero />

      {/* 2. How It Works (High-priority on mobile, immediately visible) */}
      <HowItWorks />

      {/* 3. Category Grid (Shop by Age) */}
      <CategoryGrid />

      {/* 4. Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-1">
              Everyday Essentials
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest">
              Featured Cotton Basics
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1 max-w-lg">
              A selection of our everyday cotton clothing. Our Kemps Corner store carries
              hundreds more prints, colors, and sizes.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-gold transition-colors active:scale-[0.98]"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. WhatsApp Direct CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest-dark relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-gold block mb-1">
              Direct WhatsApp Service
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Looking for a Specific Size, Print, or Gift Set?
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              Text our Kemps Corner store desk with your requirements. We’ll check live racks and
              share photos with flat measuring tape dimensions.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="page"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white text-whatsapp" />
                <span>Chat on WhatsApp ({BUSINESS_CONFIG.phone.display})</span>
              </a>

              <Link
                href="/visit-us"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all active:scale-[0.98]"
              >
                <MapPin className="w-4 h-4 text-gold" />
                <span>Directions to Store</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Social Proof & Google Reviews */}
      <GoogleReviewsBlock />

      {/* 7. Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center space-y-3 mb-8">
          <span className="editorial-label text-gold bg-white px-3 py-1 rounded-full border border-gold/30 inline-block">
            Clear & Transparent
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest">
            Questions Parents Often Ask
          </h2>
        </div>
        <FAQ />
      </section>

      {/* 8. Store Info & Hours */}
      <section className="bg-white border-t border-border-soft py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Address */}
            <div className="flex gap-4 p-6 bg-bg-cream rounded-2xl border border-border-soft">
              <div className="w-12 h-12 rounded-xl bg-forest text-white flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-serif font-bold text-base text-near-black">
                  Kemps Corner Store
                </h3>
                <p className="text-muted">{BUSINESS_CONFIG.location.fullAddress}</p>
                <p className="text-gray-400">Near St. Stephen’s Church &amp; Pedder Road Flyover</p>
                <Link
                  href="/visit-us"
                  className="font-bold text-forest hover:text-gold transition-colors underline pt-1 block"
                >
                  Store directions, hours &amp; parking &rarr;
                </Link>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex gap-4 p-6 bg-bg-cream rounded-2xl border border-border-soft">
              <div className="w-12 h-12 rounded-xl bg-forest text-white flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-serif font-bold text-base text-near-black">Opening Hours</h3>
                <p className="text-near-black font-semibold">{BUSINESS_CONFIG.hours.display}</p>
                <p className="text-forest font-medium">Open all 7 days of the week</p>
                <p className="text-gray-400">WhatsApp enquiries answered during store hours</p>
              </div>
            </div>

            {/* Direct Phone / WhatsApp */}
            <div className="flex gap-4 p-6 bg-bg-cream rounded-2xl border border-border-soft">
              <div className="w-12 h-12 rounded-xl bg-forest text-white flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-serif font-bold text-base text-near-black">Get in Touch</h3>
                <p className="text-near-black font-bold">
                  <a href={BUSINESS_CONFIG.phone.telLink} className="hover:text-forest">
                    {BUSINESS_CONFIG.phone.display}
                  </a>
                </p>
                {BUSINESS_CONFIG.phone.landline && (
                  <p className="text-gray-500">Landline: {BUSINESS_CONFIG.phone.landline}</p>
                )}
                <p className="text-muted">Call or text for immediate size assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
