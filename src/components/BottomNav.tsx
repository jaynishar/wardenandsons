'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, ClipboardList, MessageSquare, Layers } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { BUSINESS_CONFIG } from '@/config/business';

export default function BottomNav() {
  const pathname = usePathname();
  const { toggleCart, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  const links = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Catalogue', href: '/shop', icon: Grid },
    { label: 'How It Works', href: '/how-it-works', icon: Layers },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EBE7DF] md:hidden shadow-lg pb-safe">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
                isActive ? 'text-[#1B4332]' : 'text-gray-500 hover:text-[#1B4332]'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">{link.label}</span>
            </Link>
          );
        })}

        {/* Request List Item with badge */}
        <button
          onClick={toggleCart}
          aria-label="Request List"
          className="flex flex-col items-center justify-center h-full min-h-[44px] text-gray-500 hover:text-[#1B4332] relative transition-colors cursor-pointer"
        >
          <div className="relative">
            <ClipboardList className="w-5 h-5 mb-1" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#1B4332] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">Request</span>
        </button>

        {/* WhatsApp Button */}
        <a
          href={BUSINESS_CONFIG.phone.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Store Desk"
          className="flex flex-col items-center justify-center h-full min-h-[44px] text-[#25D366] hover:text-[#20ba59] transition-colors"
        >
          <MessageSquare className="w-5 h-5 mb-1 fill-[#25D366]/20" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
