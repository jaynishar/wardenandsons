import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageSquare, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg-cream pt-6 pb-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-border-soft px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="editorial-label text-forest">
                {BUSINESS_CONFIG.establishment.displayText}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest leading-[1.12]">
              Breathable Cotton Comfort, Since 1994.
            </h1>

            <p className="text-sm sm:text-base text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
              Serving generations of families from our Kemps Corner boutique. Explore breathable
              newborn essentials, playwear, and everyday comfort basics tailored for Mumbai’s
              tropical climate.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-xl bg-forest text-white hover:bg-forest-dark font-bold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <span>Browse Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-white border border-border-soft text-near-black hover:bg-bg-cream font-bold text-sm shadow-xs transition-all hover:border-forest active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-whatsapp" />
                <span>Chat with Kemps Corner Store</span>
              </a>
            </div>

            {/* Trust Strip (3-up on mobile, clean luxury icons) */}
            <div className="pt-6 border-t border-border-soft/80 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white border border-border-soft flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-forest" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-near-black leading-tight">
                    Breathable Cotton
                  </p>
                  <p className="text-[10px] text-muted hidden sm:block">Pre-washed natural yarn</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white border border-border-soft flex items-center justify-center shrink-0 shadow-2xs">
                  <Heart className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-near-black leading-tight">
                    30+ Years in Kemps Corner
                  </p>
                  <p className="text-[10px] text-muted hidden sm:block">Neighborhood boutique</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white border border-border-soft flex items-center justify-center shrink-0 shadow-2xs">
                  <MessageSquare className="w-4 h-4 text-whatsapp" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-near-black leading-tight">
                    WhatsApp Personal Care
                  </p>
                  <p className="text-[10px] text-muted hidden sm:block">Live tape sizing checks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Editorial Image Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative h-[380px] sm:h-[460px] lg:h-[490px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/hero-editorial.webp"
                  alt="Warden & Sons pure cotton luxury children's clothing atelier"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Kemps Corner Boutique Heritage Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-serif font-bold text-sm text-forest leading-tight">
                      Kemps Corner Boutique
                    </p>
                    <p className="text-[11px] text-muted">
                      Near Pedder Road Flyover • Walk-ins & WhatsApp Welcome
                    </p>
                  </div>
                  <span className="editorial-label text-gold bg-bg-cream px-2.5 py-1.5 rounded-lg border border-gold/30 shrink-0">
                    Est. 1994
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Announcement Strip */}
      <div className="mt-12 bg-forest text-white py-3.5 border-y border-forest-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-center text-xs tracking-wider uppercase font-semibold text-gold font-mono">
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
