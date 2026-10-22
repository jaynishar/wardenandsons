import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, MessageSquare, Compass, ExternalLink, Car, Ruler, ArrowRight } from 'lucide-react';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/config/business';
import { getCanonicalUrl } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: 'Visit Kids Clothing Shop at Kemps Corner | Warden & Sons' },
  description:
    'Find cotton kids clothes near Pedder Road flyover & St. Stephen’s. Open daily 9am–9pm. In-store fitting & WhatsApp delivery.',
  alternates: {
    canonical: getCanonicalUrl('/visit-us'),
  },
};

export default function VisitUsPage() {
  const googleMapsUrl = BUSINESS_CONFIG.location.googleMapsSearchUrl;

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Visit Us', url: getCanonicalUrl('/visit-us') },
        ]}
      />
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
          Our Shop
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          Visit Our Kemps Corner Store
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          Step inside our South Mumbai shop to touch our breathable cotton fabrics, check sizes in
          person, and meet our family team.
        </p>
      </div>

      {/* Main Grid: Details + Store Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Store Info Cards */}
        <div className="lg:col-span-7 space-y-6">
          {/* Address & Direct Link */}
          <div className="bg-white rounded-3xl border border-border-soft p-7 shadow-xs space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-forest text-white flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-lg text-near-black">Store Location</h2>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  <strong>Warden & Sons Kids Wear</strong>
                  <br />
                  {BUSINESS_CONFIG.location.shopNumber}, {BUSINESS_CONFIG.location.building}
                  <br />
                  {BUSINESS_CONFIG.location.streetAddress}
                  <br />
                  Near St. Stephen’s Church, Kemps Corner, Mumbai 400036
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={BUSINESS_CONFIG.location.googleBusinessShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions_click"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest text-white hover:bg-forest-dark font-bold text-xs shadow-xs transition-all"
              >
                <span>Google Business Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions_click"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-forest text-forest hover:bg-bg-cream font-bold text-xs shadow-xs transition-all"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="page"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-xs shadow-xs transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white text-whatsapp" />
                <span>WhatsApp for Directions</span>
              </a>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="bg-white rounded-3xl border border-border-soft p-7 shadow-xs space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-forest text-white flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-lg text-near-black">Opening Hours</h2>
                <div className="space-y-1 text-xs sm:text-sm text-muted pt-1">
                  <div className="flex justify-between py-1 border-b border-border-soft/60">
                    <span className="font-semibold text-near-black">Monday – Sunday:</span>
                    <span className="text-forest font-bold">9:00 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 text-forest font-semibold">
                    <span>Sunday:</span>
                    <span className="font-bold">Open (9:00 AM – 9:00 PM)</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 pt-2">
                  Open every day of the week. WhatsApp enquiries answered during store hours.
                </p>
              </div>
            </div>
          </div>

          {/* Landmarks, Directions & Parking Notes */}
          <div className="bg-bg-cream rounded-3xl border border-border-soft p-7 space-y-4">
            <div className="flex items-center gap-2 text-forest">
              <Compass className="w-5 h-5 text-gold" />
              <h3 className="font-serif font-bold text-base">Landmark Proximity &amp; Directions</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Our boutique is located on the ground floor of <strong>Haji Habib Building, 155/157 August Kranti Marg</strong>, directly opposite St. Stephen’s Church and right next to the Pedder Road Flyover junction. We are within 5 to 10 minutes from{' '}
              <strong>Pedder Road, Altamount Road, Carmichael Road, Malabar Hill, Breach Candy, Nepean Sea Road</strong>, and Tardeo.
            </p>
            <div className="pt-2 border-t border-border-soft/60 flex items-start gap-3 text-xs text-muted">
              <Car className="w-4 h-4 text-forest shrink-0 mt-0.5" />
              <div>
                <strong className="text-near-black block">Parking &amp; Transit Guidance:</strong>
                <span>Quick car drop-off is straightforward right in front of the store on August Kranti Marg. Curb-side short-stay parking is generally accessible during morning and early afternoon hours. For train commuters, Grant Road railway station is approximately 1.5 km away (a 5–7 minute taxi ride).</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Store Photo & Contact Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative h-[320px] sm:h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="/store_front.webp"
              alt="Warden & Sons Kids Wear Boutique Storefront"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>

          <div className="bg-white rounded-3xl border border-border-soft p-6 shadow-xs space-y-3 text-center">
            <h3 className="font-serif font-bold text-lg text-forest">Can’t Make It In Person?</h3>
            <p className="text-xs text-muted leading-relaxed">
              Order through our WhatsApp service! We pull live items from the rack, verify measurements with a tape, and arrange delivery across Mumbai.
            </p>
            <div className="space-y-2 pt-1">
              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="page"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 fill-white text-whatsapp" />
                <span>Start WhatsApp Shopping</span>
              </a>
              <Link
                href="/how-it-works"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-forest hover:text-gold transition-colors"
              >
                <span>Read how WhatsApp ordering works</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* In-Store Departments & Contextual Authority Links */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-border-soft shadow-xs space-y-6 text-near-black">
        <div className="space-y-2 border-b border-border-soft pb-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-gold block">
            What You Will Find In-Store
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Explore Physical Collections at Our Kemps Corner Boutique
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
            When you visit our store in person, you have access to hundreds of rotated cotton prints, school accessories, and everyday essentials not always visible online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed">
          <div className="bg-bg-cream/40 rounded-2xl p-5 border border-border-soft space-y-2.5">
            <h3 className="font-serif font-bold text-base text-forest">
              Boys’ Cotton Playwear &amp; Sports
            </h3>
            <p className="text-muted">
              Browse breathable 180 GSM combed cotton t-shirts, cricket coaching academy whites, dryfit sports coordinate sets, and hosiery nightwear.
            </p>
            <Link
              href="/shop/boys"
              className="inline-flex items-center gap-1 font-bold text-forest hover:text-gold transition-colors underline pt-1"
            >
              <span>Explore Boys’ Wear (0–16Y)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-bg-cream/40 rounded-2xl p-5 border border-border-soft space-y-2.5">
            <h3 className="font-serif font-bold text-base text-forest">
              Newborn Sets &amp; Muslin Swaddles
            </h3>
            <p className="text-muted">
              Delicate combed cotton jhablas, open-weave double-gauze swaddles, hospital take-home sets, and baby shower gift packages.
            </p>
            <Link
              href="/shop/newborn"
              className="inline-flex items-center gap-1 font-bold text-forest hover:text-gold transition-colors underline pt-1"
            >
              <span>Explore Newborn Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-bg-cream/40 rounded-2xl p-5 border border-border-soft space-y-2.5">
            <h3 className="font-serif font-bold text-base text-forest">
              Live Sizing &amp; Fitting Checks
            </h3>
            <p className="text-muted">
              Bring your child or their favorite well-fitting garment. Our counter team measures dimensions live to ensure total comfort.
            </p>
            <Link
              href="/size-guide"
              className="inline-flex items-center gap-1 font-bold text-forest hover:text-gold transition-colors underline pt-1"
            >
              <Ruler className="w-3.5 h-3.5 text-gold" />
              <span>View Kids Clothes Size Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
