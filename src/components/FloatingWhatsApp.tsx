'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Only access window on the client side
    setCurrentUrl(window.location.href);
  }, []);

  const phoneNumber = '919920751567'; // Indian format without +
  const defaultMessage = `Hi! I'm interested in this product I found on your website: ${currentUrl}`;
  const encodedMessage = encodeURIComponent(defaultMessage);
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="w-6 h-6" />
      <span className="absolute right-full mr-4 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Shop via WhatsApp
      </span>
    </a>
  );
}
