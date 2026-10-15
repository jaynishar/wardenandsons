'use client';

import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#EBE7DF] shadow-2xl px-2 py-2 flex items-center justify-around pb-safe font-sans">
      <a
        href={BUSINESS_CONFIG.phone.telLink}
        className="flex flex-col items-center justify-center flex-1 py-1.5 px-3 min-h-[48px] text-[#1B4332] hover:text-[#143527] transition-colors focus:outline-none rounded-lg"
        id="cta-mobile-call"
        aria-label="Call Store"
      >
        <Phone className="w-5 h-5 mb-1" />
        <span className="text-xs font-semibold uppercase tracking-wider">Call</span>
      </a>

      <div className="h-8 w-[1px] bg-[#EBE7DF]" />

      <a
        href={BUSINESS_CONFIG.phone.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center flex-1 py-1.5 px-3 min-h-[48px] text-[#25D366] hover:text-[#20ba59] transition-colors focus:outline-none rounded-lg"
        id="cta-mobile-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 mb-1" />
        <span className="text-xs font-semibold uppercase tracking-wider">WhatsApp</span>
      </a>

      <div className="h-8 w-[1px] bg-[#EBE7DF]" />

      <a
        href={BUSINESS_CONFIG.location.googleMapsSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center flex-1 py-1.5 px-3 min-h-[48px] text-[#D4A574] hover:text-[#b88c5d] transition-colors focus:outline-none rounded-lg"
        id="cta-mobile-directions"
        aria-label="Get Directions to Store"
      >
        <MapPin className="w-5 h-5 mb-1" />
        <span className="text-xs font-semibold uppercase tracking-wider">Directions</span>
      </a>
    </div>
  );
}
