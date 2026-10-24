'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_CONFIG } from '@/config/business';
import { getStoreStatus, StoreStatus } from '@/lib/store-hours';
import ContactForm from '@/components/ContactForm';

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

  const hasLeadEndpoint = Boolean(process.env.NEXT_PUBLIC_LEADS_ENDPOINT);

  return (
    <section className="py-12 sm:py-16 border-b border-[var(--ink)]">
      <Container>
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="text-xs font-semibold tracking-wider uppercase text-[var(--muted)]">
            Store Location
          </span>
          <h2 className="font-sans font-medium text-2xl sm:text-3xl text-[var(--ink)] tracking-tight mt-1">
            Visit our store
          </h2>
        </div>

        {/* Address Display Rows */}
        <div className="bg-[var(--surface)] p-6 sm:p-10 divide-y divide-[var(--ink)]/15">
          {/* Row 1: Address */}
          <div className="py-4 first:pt-0">
            <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
              Address
            </span>
            <p className="font-sans font-medium text-base sm:text-lg text-[var(--ink)] mt-1">
              Shop No. 7, Ground Floor, Haji Habib Building, 155/157 August Kranti Marg, Kemps Corner, Mumbai 400036
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Near St. Stephen’s Church and Pedder Road Flyover
            </p>
          </div>

          {/* Row 2: Live IST Hours Status */}
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                Store Hours (IST)
              </span>
              <p className="font-sans font-medium text-base sm:text-lg text-[var(--ink)] mt-1">
                Mon – Sun: 9:00 AM – 9:00 PM
              </p>
            </div>
            <div className="h-8 flex items-center">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium ${
                  status.isOpen
                    ? 'bg-[var(--wa)] text-white'
                    : 'bg-[var(--ink)] text-white'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpen ? 'bg-white animate-pulse' : 'bg-gray-400'
                  }`}
                />
                <span>{status.text}</span>
              </span>
            </div>
          </div>

          {/* Row 3: Actions */}
          <div className="py-6 last:pb-0 flex flex-wrap gap-3">
            <a
              href={BUSINESS_CONFIG.location.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="directions_click"
              className="h-[52px] px-6 inline-flex items-center justify-center font-sans font-medium text-sm bg-[var(--ink)] text-white hover:bg-[var(--blue)] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
            >
              Get Directions
            </a>
            <a
              href={BUSINESS_CONFIG.phone.telLink}
              data-track="phone_click"
              className="h-[52px] px-6 inline-flex items-center justify-center font-sans font-medium text-sm bg-white border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--surface)] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
            >
              Call Store ({BUSINESS_CONFIG.phone.display})
            </a>
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="visit_us"
              className="h-[52px] px-6 inline-flex items-center justify-center font-sans font-medium text-sm bg-[var(--wa)] text-white hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--wa)]"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>

        {/* Conditional Lead Capture Form */}
        {hasLeadEndpoint && (
          <div className="mt-8 pt-8 border-t border-[var(--ink)]/15">
            <ContactForm />
          </div>
        )}
      </Container>
    </section>
  );
}
