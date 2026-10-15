'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloat() {
  const defaultMessage = `Hello Warden & Sons! I am browsing your website from Mumbai and would like assistance with kids clothing collections and sizes.`;
  const whatsappUrl = `https://wa.me/919920751567?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Concierge"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-white"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          WhatsApp Desk
        </span>
      </a>
    </div>
  );
}
