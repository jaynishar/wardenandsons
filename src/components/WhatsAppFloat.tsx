'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function WhatsAppFloat() {
  const defaultMessage = `Hello Warden & Sons! I am browsing your catalogue from Mumbai and would like assistance with kids clothing and sizes.`;
  const whatsappUrl = BUSINESS_CONFIG.whatsappUrl(defaultMessage);

  return (
    <div className="hidden md:flex fixed bottom-8 right-8 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Concierge"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-whatsapp hover:bg-whatsapp/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-white cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageSquare className="w-5 h-5 fill-white text-whatsapp" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          WhatsApp Desk
        </span>
      </a>
    </div>
  );
}
