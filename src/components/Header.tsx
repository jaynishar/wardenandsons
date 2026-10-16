'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ClipboardList, MessageSquare, Menu, X, Phone } from 'lucide-react';
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
    { name: 'Catalogue', href: '/shop' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Our Heritage', href: '/about' },
    { name: 'Bulk & Uniforms', href: '/bulk-orders' },
    { name: 'Visit Store', href: '/visit-us' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE7DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Authentic Unclipped Logo Artwork Container */}
            <div className="relative w-14 h-11 rounded-md overflow-hidden bg-white border border-[#D4A574]/40 shadow-xs shrink-0 p-0.5">
              <Image
                src="/brand_logo.jpg"
                alt="Warden & Sons Kids Wear Official Logo"
                fill
                className="object-contain"
                sizes="56px"
                priority
              />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1B4332] block leading-none">
                Warden & Sons
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-widest uppercase text-[#D4A574] font-semibold mt-1 block">
                {BUSINESS_CONFIG.establishment.badgeText}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#1A1A1A] hover:text-[#1B4332] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1B4332] hover:after:w-full after:transition-all"
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
              aria-label="Chat on WhatsApp"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-[#1B4332] text-white hover:bg-[#143527] transition-all shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>

            {/* Request List Button */}
            <button
              onClick={toggleCart}
              aria-label="Request List"
              title="View Request List"
              className="relative p-2.5 rounded-full bg-white border border-[#EBE7DF] text-[#1B4332] hover:bg-[#FAF8F5] transition-all shadow-xs cursor-pointer flex items-center justify-center"
            >
              <ClipboardList className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1B4332] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF8F5] animate-in zoom-in-50">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-white border border-[#EBE7DF] text-[#1A1A1A] hover:bg-[#FAF8F5] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EBE7DF] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#1A1A1A] hover:text-[#1B4332] py-2 border-b border-[#EBE7DF]/60"
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1B4332] text-white font-semibold text-sm shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              WhatsApp Store Desk ({BUSINESS_CONFIG.phone.display})
            </a>
            <a
              href={BUSINESS_CONFIG.phone.telLink}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#EBE7DF] bg-white text-[#1A1A1A] text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#1B4332]" />
              Call Store Directly
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
