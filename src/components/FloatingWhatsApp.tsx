'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/message/NBG6MFUV3EXYG1"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 bg-green-600 text-white p-3.5 rounded-full shadow-2xl hover:bg-green-500 transition-all duration-300 flex items-center justify-center min-w-[56px] min-h-[56px] animate-pulse-subtle focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2"
      id="floating-whatsapp-btn"
      aria-label="Chat with Warden & Sons on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white text-green-600" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}
