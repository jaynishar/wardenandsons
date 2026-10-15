import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, MapPin, Clock, Phone } from 'lucide-react';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import FAQ from '@/components/FAQ';
import { getFeaturedCatalogueItems } from '@/lib/products';
import { BUSINESS_CONFIG } from '@/config/business';

export default function HomePage() {
  const featuredProducts = getFeaturedCatalogueItems(6);

  return (
    <div className="space-y-12 md:space-y-16 font-sans">
      {/* 1. Hero with Marquee */}
      <Hero />

      {/* 2. How It Works (High-priority on mobile) */}
      <HowItWorks />

      {/* 3. Category Grid (Curated Departments) */}
      <CategoryGrid />

      {/* 4. Featured Representative Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3 py-1 rounded-full border border-[#D4A574]/30 inline-block mb-2">
              Representative Offerings
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B4332]">
              Featured Atelier Basics
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-lg">
              A curated preview of our everyday essentials. Actual store inventory carries hundreds more prints, colors, and sizes.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] hover:text-[#D4A574] transition-colors"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. WhatsApp Direct CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B4332] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#143527] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4A574] bg-[#143527] px-3.5 py-1.5 rounded-full inline-block">
              💬 Direct Concierge Shopping
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Looking for a Specific Size, Print, or Gift Set?
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              Don’t spend hours searching through filters. Text our Kemps Corner store desk with your requirements. We’ll immediately check live racks and share photos with accurate dimensions.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all hover:scale-102 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp ({BUSINESS_CONFIG.phone.display})</span>
              </a>

              <Link
                href="/visit-us"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
              >
                <MapPin className="w-4 h-4 text-[#D4A574]" />
                <span>Directions to Store</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center space-y-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3 py-1 rounded-full border border-[#D4A574]/30 inline-block">
            Clear &amp; Transparent
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B4332]">
            Questions Parents Often Ask
          </h2>
        </div>
        <FAQ />
      </section>

      {/* 7. Store Info & Hours */}
      <section className="bg-white border-t border-[#EBE7DF] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Address */}
            <div className="flex gap-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF]">
              <div className="w-12 h-12 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#D4A574]" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Kemps Corner Store</h3>
                <p className="text-[#666666]">
                  {BUSINESS_CONFIG.location.fullAddress}
                </p>
                <p className="text-gray-400">Near Pedder Road Flyover</p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex gap-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF]">
              <div className="w-12 h-12 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#D4A574]" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Opening Hours</h3>
                <p className="text-[#1A1A1A] font-semibold">{BUSINESS_CONFIG.hours.display}</p>
                <p className="text-red-600 font-medium">Sunday: {BUSINESS_CONFIG.hours.sunday}</p>
                <p className="text-gray-400">WhatsApp orders answered continuously</p>
              </div>
            </div>

            {/* Direct Phone / WhatsApp */}
            <div className="flex gap-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF]">
              <div className="w-12 h-12 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-[#D4A574]" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Get in Touch</h3>
                <p className="text-[#1A1A1A] font-bold">
                  <a href={BUSINESS_CONFIG.phone.telLink} className="hover:text-[#1B4332]">
                    {BUSINESS_CONFIG.phone.display}
                  </a>
                </p>
                <p className="text-[#666666]">Call or text for immediate size assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
