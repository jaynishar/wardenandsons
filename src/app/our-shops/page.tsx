import React from 'react';
import type { Metadata } from 'next';
import { MapPin, ShoppingBag, ExternalLink, AlertCircle } from 'lucide-react';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';
import { SHOPS_DATA } from '@/data/shops';

export const metadata: Metadata = buildPageMetadata({
  path: '/our-shops',
  title: { absolute: 'Our family of shops at Kemps Corner | Warden & Sons' },
  description:
    'Our family of retail shops in Kemps Corner, South Mumbai. Warden & Sons Kids Wear, Twinkle Collection, and Warden Collection.',
  noindex: true,
});

export default function OurShopsPage() {
  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Our Shops', url: getCanonicalUrl('/our-shops') },
        ]}
      />

      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
          Retail Locations
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          Our family of shops at Kemps Corner
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          Family-operated retail establishments serving South Mumbai families across August Kranti Marg and Kemps Corner.
        </p>
      </div>

      {/* Internal Notice / Unverified Details Banner */}
      <div className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-800">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Notice: Pending Owner Verification</p>
          <p className="text-amber-700 mt-0.5">
            Do not publish until the owner has filled in verified details. Twinkle Collection and Warden Collection details are currently marked as TODO.
          </p>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SHOPS_DATA.map((shop, index) => {
          const isTodo = shop.whatItSells === 'TODO' || shop.address === 'TODO';
          const hasValidMapLink = shop.googleMapsLink && shop.googleMapsLink !== 'TODO';

          return (
            <div
              key={index}
              className="bg-white rounded-3xl border border-border-soft p-7 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-forest text-white flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-near-black leading-snug">
                      {shop.name}
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      Kemps Corner, Mumbai
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                  <div>
                    <strong className="text-near-black block mb-0.5 font-sans text-xs">
                      What we sell:
                    </strong>
                    <p className={isTodo ? 'text-amber-700 italic' : 'text-muted'}>
                      {shop.whatItSells}
                    </p>
                  </div>

                  <div>
                    <strong className="text-near-black block mb-0.5 font-sans text-xs">
                      Address:
                    </strong>
                    <p className={isTodo ? 'text-amber-700 italic' : 'text-muted'}>
                      {shop.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-soft/60">
                {hasValidMapLink ? (
                  <a
                    href={shop.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="directions_click"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest text-white hover:bg-forest-dark font-bold text-xs shadow-xs transition-all w-full justify-center"
                  >
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <div className="text-center py-2 px-4 rounded-xl bg-bg-cream text-[11px] text-muted italic font-mono border border-border-soft/60">
                    Maps link: {shop.googleMapsLink}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
