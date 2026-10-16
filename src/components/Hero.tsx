import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageSquare, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-6 pb-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-[#EBE7DF] px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A574]" />
              <span className="text-[11px] font-bold text-[#1B4332] uppercase tracking-wider">
                {BUSINESS_CONFIG.establishment.displayText}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1B4332] leading-[1.15]">
              Breathable Cotton Comfort For Your Little Ones.
            </h1>

            <p className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Serving generations of families from our Kemps Corner boutique. Explore breathable newborn essentials, playwear, and family comfort basics tailored for Mumbai’s tropical climate.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-xl bg-[#1B4332] text-white hover:bg-[#143527] font-bold text-sm shadow-xs transition-all hover:scale-102"
              >
                <span>Browse Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-white border border-[#EBE7DF] text-[#1A1A1A] hover:bg-[#FAF8F5] font-bold text-sm shadow-xs transition-all hover:border-[#1B4332]"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Chat with Kemps Corner Store</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-[#EBE7DF]/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B4332] shrink-0" />
                <span className="text-[11px] font-medium text-[#1A1A1A]">Breathable Cotton</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#D4A574] shrink-0" />
                <span className="text-[11px] font-medium text-[#1A1A1A]">Family Boutique</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="text-[11px] font-medium text-[#1A1A1A]">WhatsApp Personal Care</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative h-[340px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/store_front.jpg"
                  alt="Inside Warden & Sons boutique at Kemps Corner, Mumbai"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl border border-white/50 shadow-md flex items-center justify-between">
                  <div>
                    <p className="font-serif font-bold text-xs text-[#1B4332]">Kemps Corner Store</p>
                    <p className="text-[10px] text-gray-500 font-medium">Walk-ins & WhatsApp Enquiries Welcome</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-[#FAF8F5] text-[#D4A574] border border-[#D4A574]/30">
                    Open Mon-Sat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Announcement Strip (Static, accessible, no moving marquee) */}
      <div className="mt-12 bg-[#1B4332] text-white py-3.5 border-y border-[#143527]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-center text-xs tracking-wider uppercase font-semibold text-[#D4A574]">
            <span>★ Kemps Corner, South Mumbai</span>
            <span className="hidden sm:inline">•</span>
            <span>Breathable Daily Cotton</span>
            <span className="hidden sm:inline">•</span>
            <span>Three Decades of Family Trust</span>
            <span className="hidden sm:inline">•</span>
            <span>WhatsApp Desk: {BUSINESS_CONFIG.phone.display}</span>
            <span className="hidden sm:inline">•</span>
            <span>Bespoke School & Sports Uniforms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
