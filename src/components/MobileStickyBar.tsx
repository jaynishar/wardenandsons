'use client';

import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-primary-100 shadow-2xl px-2 py-2 flex items-center justify-around pb-safe">
      <a
        href="tel:+919920751567"
        className="flex flex-col items-center justify-center flex-1 py-1.5 px-3 min-h-[48px] text-primary-800 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
        id="cta-mobile-call"
        aria-label="Call Store"
      >
        <Phone className="w-5 h-5 mb-1" />
        <span className="text-xs font-semibold uppercase tracking-wider font-sans">Call</span>
      </a>

      <div className="h-8 w-[1px] bg-primary-100" />

      <a
        href="https://wa.me/919920751567"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center flex-1 py-1.5 px-3 min-h-[48px] text-green-600 hover:text-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
        id="cta-mobile-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 mb-1" />
        <span className="text-xs font-semibold uppercase tracking-wider font-sans">WhatsApp</span>
      </a>

      <div className="h-8 w-[1px] bg-primary-100" />

      <a
        href="https://www.google.com/maps/search/?api=1&query=Warden+%26+Sons+Kids+Wear+Kemps+Corner+Mumbai"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center flex-1 py-1.5 px-3 min-h-[48px] text-accent-500 hover:text-accent-600 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 rounded-lg"
        id="cta-mobile-directions"
        aria-label="Get Directions to Store"
      >
        <MapPin className="w-5 h-5 mb-1" />
        <span className="text-xs font-semibold uppercase tracking-wider font-sans">Directions</span>
      </a>
    </div>
  );
}
