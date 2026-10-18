'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, ClipboardList, MessageSquare, Layers } from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'motion/react';
import { useCartStore } from '@/store/cart';
import { BUSINESS_CONFIG } from '@/config/business';

export default function BottomNav() {
  const pathname = usePathname();
  const { toggleCart, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReduced);

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
    <LazyMotion features={domAnimation}>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border-soft md:hidden shadow-lg pb-safe">
        <div className="grid grid-cols-5 h-16 items-center px-1">
          {links.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
                  isActive ? 'text-forest' : 'text-gray-500 hover:text-forest'
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
            className="flex flex-col items-center justify-center h-full min-h-[44px] text-gray-500 hover:text-forest relative transition-colors cursor-pointer active:scale-[0.98]"
          >
            <div className="relative">
              <ClipboardList className="w-5 h-5 mb-1" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <m.span
                    key={totalItems}
                    initial={shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1.35, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1.5 -right-2 bg-forest text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white pointer-events-none"
                  >
                    {totalItems}
                  </m.span>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[10px] font-semibold">Request</span>
          </button>

          {/* WhatsApp Button */}
          <a
            href={BUSINESS_CONFIG.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Store Desk"
            data-track="whatsapp_click"
            data-track-location="sticky"
            className="flex flex-col items-center justify-center h-full min-h-[44px] text-whatsapp hover:text-whatsapp/90 transition-colors"
          >
            <MessageSquare className="w-5 h-5 mb-1 fill-whatsapp/20" />
            <span className="text-[10px] font-bold">WhatsApp</span>
          </a>
        </div>
      </nav>
    </LazyMotion>
  );
}
