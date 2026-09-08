'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Video } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const shopCategories = [
  { name: 'Newborns / Infants (0-24M)', href: '/shop/newborn' },
  { name: 'Boys (0-16Y)', href: '/shop/boys' },
  { name: 'Girls (0-16Y)', href: '/shop/girls' },
  { name: 'Men\'s Basics', href: '/shop/men' },
  { name: 'Women\'s Basics', href: '/shop/women' },
];

const mainNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Story', href: '/about' },
  { name: 'Shop Categories', href: '/shop', hasDropdown: true },
  { name: 'WhatsApp Shopping', href: '/whatsapp-shopping' },
  { name: 'Video Shopping', href: '/video-shopping' },
  { name: 'Bulk Orders', href: '/bulk-orders' },
  { name: 'Blog', href: '/blog' },
  { name: 'Visit Us', href: '/visit-us' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setShopDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-warm-bg/95 backdrop-blur-md border-b border-primary-100 shadow-md'
            : 'bg-warm-bg/60 backdrop-blur-sm border-b border-primary-50'
        }`}
      >
        {/* Top Info Bar (Desktop only) */}
        <div className="hidden md:block bg-primary-800 text-white text-xs py-2 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-sans">📍 Kemps Corner, South Bombay’s Trusted Kidswear Store Since 1994</span>
            <div className="flex items-center space-x-4">
              <a
                href="tel:+919920751567"
                className="flex items-center hover:text-accent-200 transition-colors font-semibold"
              >
                <Phone className="w-3.5 h-3.5 mr-1" /> Call: +91 99207 51567
              </a>
              <Link
                href="/video-shopping"
                className="flex items-center hover:text-accent-200 transition-colors font-semibold bg-accent-500 px-2 py-0.5 rounded text-[11px]"
              >
                <Video className="w-3 h-3 mr-1" /> Free Video Call Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/brand_logo.jpg"
                  alt="Warden & Sons Kids Wear Logo"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-primary-800 object-cover w-12 h-12"
                  priority
                />
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-lg md:text-xl text-primary-800 leading-none">
                    Warden & Sons
                  </span>
                  <span className="font-sans text-[10px] md:text-xs text-accent-500 uppercase tracking-widest font-semibold mt-0.5">
                    Kids Wear • Kemps Corner
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-6">
              {mainNavLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative group"
                      onMouseEnter={() => setShopDropdownOpen(true)}
                      onMouseLeave={() => setShopDropdownOpen(false)}
                    >
                      <button
                        className={`flex items-center text-sm font-semibold transition-colors py-2 px-1 rounded-md min-h-[44px] cursor-pointer ${
                          pathname.startsWith('/shop')
                            ? 'text-accent-500'
                            : 'text-primary-800 hover:text-accent-500'
                        }`}
                        aria-expanded={shopDropdownOpen}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                      </button>
                      
                      {/* Mega Menu Dropdown */}
                      <AnimatePresence>
                        {shopDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-0 w-64 bg-white border border-primary-100 rounded-lg shadow-xl py-2 z-50"
                          >
                            <Link
                              href="/shop"
                              className="block px-4 py-2 text-sm font-bold text-primary-800 hover:bg-primary-50 hover:text-accent-500 border-b border-primary-50"
                            >
                              Browse All Catalog
                            </Link>
                            {shopCategories.map((cat) => (
                              <Link
                                key={cat.name}
                                href={cat.href}
                                className="block px-4 py-2 text-sm text-slate-dark hover:bg-primary-50 hover:text-primary-800 transition-colors"
                              >
                                {cat.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors py-2 px-1 min-h-[44px] flex items-center ${
                      isActive
                        ? 'text-accent-500 border-b-2 border-accent-500'
                        : 'text-primary-800 hover:text-accent-500'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden xl:flex items-center space-x-3">
              <a
                href="https://wa.me/919920751567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-colors flex items-center gap-1.5"
              >
                💬 WhatsApp Order
              </a>
              <Link
                href="/video-shopping"
                className="bg-accent-500 hover:bg-accent-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-md transition-all duration-300 hover:scale-105 flex items-center gap-1.5"
              >
                📹 Book Video Call
              </Link>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex xl:hidden items-center space-x-2">
              <Link
                href="/video-shopping"
                className="md:flex hidden bg-accent-500 hover:bg-accent-600 text-white text-xs font-semibold px-3 py-2 rounded-lg items-center gap-1 min-h-[40px]"
              >
                <Video className="w-3.5 h-3.5" /> Book Free Video Call
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-primary-800 hover:text-accent-500 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[44px] min-h-[44px] cursor-pointer"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden border-t border-primary-100 bg-white shadow-inner overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {mainNavLinks.map((link) => {
                  if (link.hasDropdown) {
                    return (
                      <div key={link.name} className="py-1">
                        <div className="font-semibold text-primary-800 px-3 py-2 text-sm border-b border-primary-50">
                          {link.name}
                        </div>
                        <div className="pl-4 mt-1 space-y-1">
                          <Link
                            href="/shop"
                            className="block px-3 py-2 rounded-md text-xs text-accent-500 font-bold hover:bg-primary-50"
                          >
                            All Categories
                          </Link>
                          {shopCategories.map((subLink) => (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              className="block px-3 py-2 rounded-md text-xs text-slate-dark hover:bg-primary-50"
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block px-3 py-2.5 rounded-lg text-base font-semibold min-h-[44px] flex items-center transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-accent-500 font-bold'
                          : 'text-primary-800 hover:bg-primary-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-primary-100 grid grid-cols-2 gap-3">
                  <a
                    href="tel:+919920751567"
                    className="flex items-center justify-center gap-1.5 bg-primary-100 text-primary-800 text-sm font-bold py-3 px-4 rounded-lg min-h-[44px]"
                  >
                    📞 Call Shop
                  </a>
                  <a
                    href="https://wa.me/message/NBG6MFUV3EXYG1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-green-600 text-white text-sm font-bold py-3 px-4 rounded-lg min-h-[44px]"
                  >
                    💬 WhatsApp Buy
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
