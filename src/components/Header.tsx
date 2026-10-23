'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ClipboardList, MessageSquare, Menu, X, Phone } from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'motion/react';
import { useCartStore } from '@/store/cart';
import { BUSINESS_CONFIG } from '@/config/business';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  const navLinks = [
    { name: 'Catalogue', href: '/shop/' },
    { name: 'Size Guide', href: '/size-guide/' },
    { name: 'How It Works', href: '/how-it-works/' },
    { name: 'Our Heritage', href: '/about/' },
    {
      name: 'Bulk & Uniforms',
      href: '/bulk-orders/',
    },
    {
      name: 'Blog',
      href: '/blog/',
    },
    { name: 'Visit Store', href: '/visit-us/' },
  ];

  const prefersReduced = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReduced);

  return (
    <LazyMotion features={domAnimation}>
      <header className="sticky top-0 z-40 bg-bg-cream/95 backdrop-blur-md border-b border-border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Name */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Authentic Unclipped Logo Artwork Container */}
              <div className="relative w-14 h-11 rounded-md overflow-hidden bg-white border border-gold/40 shadow-xs shrink-0 p-0.5">
                <Image
                  src="/brand_logo.webp"
                  alt="Warden & Sons Kids Wear Official Logo"
                  fill
                  className="object-contain"
                  sizes="56px"
                  priority
                />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-forest block leading-none">
                  Warden &amp; Sons
                </span>
                <span className="text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold font-semibold mt-1 block">
                  {BUSINESS_CONFIG.establishment.badgeText}
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center space-x-7">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-near-black hover:text-forest transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-forest hover:after:w-full after:transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3">
              {/* WhatsApp Quick Link */}
              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Us: Chat on WhatsApp"
                data-track="whatsapp_click"
                data-track-location="header"
                data-track-category="header"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-forest text-white hover:bg-forest-dark transition-all shadow-xs active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-whatsapp" />
                <span>WhatsApp Us</span>
              </a>

              {/* Request List Button */}
              <button
                type="button"
                onClick={toggleCart}
                aria-label="Request List"
                title="View Request List"
                className="relative p-2.5 rounded-full bg-white border border-border-soft text-forest hover:bg-bg-cream transition-all shadow-xs cursor-pointer flex items-center justify-center active:scale-[0.98]"
              >
                <ClipboardList className="w-5 h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <m.span
                      key={totalItems}
                      initial={shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }}
                      animate={{ scale: [1.35, 1], opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-1 -right-1 bg-forest text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-bg-cream pointer-events-none"
                    >
                      {totalItems}
                    </m.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full bg-white border border-border-soft text-near-black hover:bg-bg-cream cursor-pointer active:scale-[0.98]"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden bg-bg-cream border-b border-border-soft px-6 py-6 space-y-4 shadow-lg overflow-hidden"
            >
              <nav className="flex flex-col space-y-3">
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-near-black hover:text-forest py-2 border-b border-border-soft/60"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={BUSINESS_CONFIG.phone.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  data-track-location="header"
                  data-track-category="header"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-forest text-white font-semibold text-sm shadow-xs active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4 text-whatsapp" />
                  WhatsApp Store Desk ({BUSINESS_CONFIG.phone.display})
                </a>
                <a
                  href={BUSINESS_CONFIG.phone.telLink}
                  data-track="call_click"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border-soft bg-white text-near-black text-xs font-semibold active:scale-[0.98]"
                >
                  <Phone className="w-3.5 h-3.5 text-forest" />
                  Call Store Directly
                </a>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </LazyMotion>
  );
}
