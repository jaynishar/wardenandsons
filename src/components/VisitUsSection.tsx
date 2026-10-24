'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_CONFIG } from '@/config/business';
import { getStoreStatus, StoreStatus } from '@/lib/store-hours';
import { IconPin, IconPhone, IconWhatsApp } from '@/components/icons';

export default function VisitUsSection() {
  const [status, setStatus] = useState<StoreStatus>({
    isOpen: true,
    text: 'Open daily 9:00 AM – 9:00 PM',
    badgeText: 'Open daily',
  });

  useEffect(() => {
    setStatus(getStoreStatus(new Date()));
    const interval = setInterval(() => {
      setStatus(getStoreStatus(new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-14 sm:py-20 bg-[var(--surface)] font-sans border-t border-[var(--line)]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-[12px] uppercase tracking-wider text-[var(--terracotta)] font-medium">
              Kemps Corner Boutique
            </span>
            <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] tracking-tight mt-1">
              Visit Our Store
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full ${
                status.isOpen
                  ? 'bg-emerald-100 text-[var(--wa)]'
                  : 'bg-zinc-200 text-zinc-700'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpen ? 'bg-[var(--wa)] animate-pulse' : 'bg-zinc-400'
                }`}
              />
              <span>{status.text}</span>
            </span>
          </div>
        </div>

        {/* 2-Column Storefront Presentation */}
        <div className="bg-white border border-[var(--line)] rounded-md overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
          {/* Storefront Photograph */}
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[420px] bg-[var(--surface)] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/store_front.webp"
              alt="Warden & Sons Kids Wear Storefront at Shop No. 7, Haji Habib Building, Kemps Corner"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
              <p className="text-xs font-medium tracking-wide uppercase opacity-90">
                Shop No. 7, Haji Habib Building
              </p>
              <p className="text-sm font-semibold">Kemps Corner, South Mumbai</p>
            </div>
          </div>

          {/* Store Details & Action Buttons */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Address */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                  Store Address
                </span>
                <p className="font-sans font-medium text-base sm:text-lg text-[var(--ink)] mt-1.5 leading-snug">
                  {BUSINESS_CONFIG.location.shopNumber}, {BUSINESS_CONFIG.location.building}, {BUSINESS_CONFIG.location.streetAddress}, Kemps Corner, Mumbai 400036
                </p>
                <p className="text-[13px] text-[var(--muted)] mt-1.5 leading-relaxed font-normal">
                  Near St. Stephen’s Church and Pedder Road Flyover. Serving Altamount Road, Breach Candy, and Nepean Sea Road families.
                </p>
              </div>

              {/* Operating Hours */}
              <div className="pt-2 border-t border-[var(--line)]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                  Operating Hours (IST)
                </span>
                <p className="font-sans font-medium text-base text-[var(--ink)] mt-1">
                  Monday – Sunday: 9:00 AM – 9:00 PM
                </p>
                <p className="text-[13px] text-[var(--muted)] mt-0.5">
                  Open all 7 days for counter shopping, tape measurements, and pickup.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-[var(--line)] flex flex-wrap items-center gap-3">
              <a
                href={BUSINESS_CONFIG.location.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions_click"
                className="h-[46px] px-6 inline-flex items-center gap-2 font-medium text-[13px] bg-[var(--ink)] text-white hover:bg-[var(--blue)] active:scale-[0.98] transition-all cursor-pointer rounded-sm"
              >
                <IconPin size={16} />
                <span>Get Directions</span>
              </a>

              <a
                href={BUSINESS_CONFIG.phone.telLink}
                data-track="phone_click"
                className="h-[46px] px-5 inline-flex items-center gap-2 font-medium text-[13px] bg-white border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)] active:scale-[0.98] transition-all cursor-pointer rounded-sm"
              >
                <IconPhone size={15} />
                <span>Call Store</span>
              </a>

              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="visit_us"
                className="h-[46px] px-5 inline-flex items-center gap-2 font-medium text-[13px] bg-white border border-[var(--line)] text-[var(--wa)] hover:border-[var(--wa)] active:scale-[0.98] transition-all cursor-pointer rounded-sm"
              >
                <IconWhatsApp size={16} />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
