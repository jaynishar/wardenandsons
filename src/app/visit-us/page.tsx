import React from 'react';
import Image from 'next/image';
import { MapPin, Clock, MessageSquare, Compass, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/config/business';
import { getCanonicalUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Visit Us | Kemps Corner Store Locator',
  description:
    'Find Warden & Sons Kids Wear boutique at Kemps Corner, South Mumbai. Operating hours, location directions near Pedder Road flyover, and Google Maps link.',
  alternates: {
    canonical: getCanonicalUrl('/visit-us'),
  },
};

export default function VisitUsPage() {
  const googleMapsUrl = BUSINESS_CONFIG.location.googleMapsSearchUrl;

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          Physical Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4332] tracking-tight">
          Visit Our Kemps Corner Store
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Step inside our South Mumbai shop to touch our breathable cotton fabrics, check sizes in person, and meet our family team.
        </p>
      </div>

      {/* Main Grid: Details + Store Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Store Info Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Address & Direct Link */}
          <div className="bg-white rounded-3xl border border-[#EBE7DF] p-7 shadow-xs space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#D4A574]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-lg text-[#1A1A1A]">
                  Boutique Location
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  <strong>Warden & Sons Kids Wear</strong>
                  <br />
                  Kemps Corner, South Mumbai
                  <br />
                  Mumbai, Maharashtra 400036, India
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4332] text-white hover:bg-[#143527] font-bold text-xs shadow-xs transition-all"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-xs transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
                <span>WhatsApp for Directions</span>
              </a>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-white rounded-3xl border border-[#EBE7DF] p-7 shadow-xs space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#D4A574]" />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-lg text-[#1A1A1A]">
                  Opening Hours
                </h2>
                <div className="space-y-1 text-xs sm:text-sm text-[#666666] pt-1">
                  <div className="flex justify-between py-1 border-b border-[#EBE7DF]/60">
                    <span className="font-semibold text-[#1A1A1A]">Monday – Saturday:</span>
                    <span className="text-[#1B4332] font-bold">{BUSINESS_CONFIG.hours.display}</span>
                  </div>
                  <div className="flex justify-between py-1 text-red-600 font-semibold">
                    <span>Sunday:</span>
                    <span>{BUSINESS_CONFIG.hours.sunday}</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 italic pt-2">
                  *{BUSINESS_CONFIG.hours.note}
                </p>
              </div>
            </div>
          </div>

          {/* Landmarks & Accessibility */}
          <div className="bg-[#FAF8F5] rounded-3xl border border-[#EBE7DF] p-7 space-y-3">
            <div className="flex items-center gap-2 text-[#1B4332]">
              <Compass className="w-5 h-5 text-[#D4A574]" />
              <h3 className="font-serif font-bold text-base">Landmark Proximity</h3>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed">
              We are located in the landmark shopping district of Kemps Corner, conveniently accessible from <strong>Pedder Road, Altamount Road, Breach Candy, Nepean Sea Road</strong>, and Grant Road. If you need assistance finding parking or store access, call us directly at <a href={BUSINESS_CONFIG.phone.telLink} className="font-bold text-[#1B4332] underline">{BUSINESS_CONFIG.phone.display}</a>.
            </p>
          </div>
        </div>

        {/* Right Side: Store Photo & Contact Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative h-[320px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="/store_front.jpg"
              alt="Warden & Sons Kids Wear Boutique Storefront"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>

          <div className="bg-white rounded-3xl border border-[#EBE7DF] p-6 shadow-xs space-y-3 text-center">
            <h3 className="font-serif font-bold text-lg text-[#1B4332]">
              Can’t Make It In Person?
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Shop via our WhatsApp catalogue! We will show you current racks live and arrange delivery across Mumbai.
            </p>
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Start WhatsApp Shopping</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
