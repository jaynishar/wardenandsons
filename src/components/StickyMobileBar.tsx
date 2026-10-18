'use client';

import React, { useState, useEffect } from 'react';
import { ClipboardList, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { useCartStore } from '@/store/cart';
import { BUSINESS_CONFIG } from '@/config/business';

export default function StickyMobileBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const prefersReduced = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReduced);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      // Show when scrolled past header & hero intro (260px)
      if (window.scrollY > 260) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  return (
    <LazyMotion features={domAnimation}>
      <aside
        aria-label="Quick Request Actions"
        className="fixed bottom-16 left-0 right-0 z-30 pointer-events-none md:hidden p-3"
      >
        <div className="max-w-md mx-auto pointer-events-auto">
          <m.div
            initial={shouldReduceMotion ? false : { y: 60, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 30,
            }}
          >
            {totalItems > 0 ? (
              /* Request List active state — High conversion CTA */
              <div className="bg-forest text-white rounded-2xl p-2.5 pl-4 pr-2.5 shadow-2xl border border-gold/40 flex items-center justify-between gap-3 backdrop-blur-md">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-forest-dark border border-gold/40 flex items-center justify-center text-gold">
                      <ClipboardList className="w-5 h-5" />
                    </div>
                    <span className="absolute -top-1 -right-1.5 bg-gold text-forest font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {totalItems}
                    </span>
                  </div>
                  <div className="truncate">
                    <p className="font-serif font-bold text-xs text-white leading-tight truncate">
                      {totalItems} {totalItems === 1 ? 'Garment' : 'Garments'} in Request
                    </p>
                    <p className="text-[10px] text-gold/90 truncate">Tap to review & enquire</p>
                  </div>
                </div>

                <button
                  onClick={toggleCart}
                  aria-label={`Review ${totalItems} items in Request List`}
                  className="bg-gold hover:bg-gold-hover text-forest font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 active:scale-[0.98] cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-forest fill-forest" />
                  <span>Review List</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              /* Empty state prompt — Guides user to pick items */
              <div className="bg-white/95 backdrop-blur-md text-forest rounded-2xl p-2.5 px-3.5 shadow-xl border border-border-soft flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-bg-cream border border-border-soft flex items-center justify-center shrink-0 text-gold">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] text-muted truncate">
                    Tap <span className="font-bold text-forest">+ Add</span> to create a WhatsApp
                    request
                  </p>
                </div>

                <a
                  href={BUSINESS_CONFIG.phone.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct WhatsApp Enquiry"
                  className="bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-[11px] px-3 py-2 rounded-xl shadow-2xs transition-all flex items-center gap-1.5 shrink-0 active:scale-[0.98]"
                >
                  <MessageSquare className="w-3 h-3 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            )}
          </m.div>
        </div>
      </aside>
    </LazyMotion>
  );
}
