'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconSearch,
  IconList,
  IconMenu,
} from '@/components/icons';
import { MenuSheet } from '@/components/MenuSheet';
import { useListStore, useListCount } from '@/lib/list-store';
import { useSearchStore } from '@/lib/search-store';
import { Logo } from '@/components/Logo';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBumping, setIsBumping] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const prevTotalRef = useRef(0);
  const toggleList = useListStore((state) => state.toggleList);
  const openSearch = useSearchStore((state) => state.openSearch);
  const totalItems = useListCount();

  // On the home page, the header logo stays hidden until the hero has scrolled away
  useEffect(() => {
    if (pathname !== '/') {
      setScrolledPastHero(true);
      return;
    }
    const checkScroll = () => {
      setScrolledPastHero(window.scrollY > 380);
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [pathname]);

  // Short bump animation when an item is added to the list
  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 260);
      return () => clearTimeout(timer);
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  const logoVisibilityClass =
    pathname === '/' && !scrolledPastHero
      ? 'opacity-0 pointer-events-none'
      : 'opacity-100';

  return (
    <>
      {/* =========================================================================
          DESKTOP HEADER (768px and wider): sticky, 64px high, plain white bar
          Logo left, Nav center (Shop, Newborn, Boys, Girls, Uniforms, Visit us), Search & List right
         ========================================================================= */}
      <header className="hidden md:block sticky top-0 z-40 h-16 bg-[var(--bg)] transition-colors font-sans">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo on Left: at least 40px on desktop, no border box or padding */}
          <Link
            href="/"
            aria-label="Warden & Sons Kids Wear Home"
            className={`flex items-center gap-2.5 focus-visible:outline-3 focus-visible:outline-[var(--blue)] shrink-0 transition-opacity duration-300 ${logoVisibilityClass}`}
          >
            <Logo height={40} />
          </Link>

          {/* Centre Navigation Links: plain nouns, sentence case */}
          <nav aria-label="Main catalogue navigation" className="flex items-center space-x-6 text-[15px] font-medium">
            <Link
              href="/shop/"
              className="text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1"
            >
              Shop
            </Link>
            <Link
              href="/shop/newborn/"
              className="text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1"
            >
              Newborn
            </Link>
            <Link
              href="/shop/boys/"
              className="text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1"
            >
              Boys
            </Link>
            <Link
              href="/shop/girls/"
              className="text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1"
            >
              Girls
            </Link>
            <Link
              href="/bulk-orders/"
              className="text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1"
            >
              Uniforms
            </Link>
            <Link
              href="/visit-us/"
              className="text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1"
            >
              Visit us
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search catalogue"
              className="inline-flex items-center gap-1.5 h-10 px-3 text-[14px] font-medium text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer rounded-none border-0 focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
            >
              <IconSearch size={18} />
              <span className="hidden lg:inline">Search</span>
            </button>

            {/* List Button: Turns into "Send list (n)" when items > 0 on desktop */}
            <button
              type="button"
              onClick={toggleList}
              aria-label={`My list with ${totalItems} items`}
              className={`inline-flex items-center gap-2 h-10 px-4 active:scale-[0.98] transition-transform duration-[140ms] cursor-pointer text-[14px] font-medium rounded-none border-0 focus-visible:outline-3 focus-visible:outline-[var(--blue)] ${
                totalItems > 0
                  ? 'bg-[var(--ink)] text-white hover:bg-[var(--blue)]'
                  : 'bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white'
              }`}
            >
              <IconList size={18} />
              <span>{totalItems > 0 ? `Send list (${totalItems})` : 'My list'}</span>
              {totalItems > 0 && (
                <span
                  className={`min-w-[18px] h-[18px] px-1 bg-[var(--red)] text-white text-[11px] font-bold inline-flex items-center justify-center leading-none rounded-none ${
                    isBumping ? 'animate-badge-bump' : ''
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE TOP BAR (under 768px): 56px high, plain white bar
          Clean bar: Logo left, Search, List trigger right, hamburger for full sheet
         ========================================================================= */}
      <header className="md:hidden sticky top-0 z-40 h-14 bg-[var(--bg)] font-sans">
        <div className="px-4 h-full flex items-center justify-between">
          {/* Logo on Left */}
          <Link
            href="/"
            aria-label="Warden & Sons Kids Wear Home"
            className={`flex items-center focus-visible:outline-3 focus-visible:outline-[var(--blue)] transition-opacity duration-300 ${logoVisibilityClass}`}
          >
            <Logo height={32} />
          </Link>

          {/* Search, My List & Hamburger on Right */}
          <div className="flex items-center gap-1 -mr-1">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search catalogue"
              className="p-2 text-[var(--ink)] hover:text-[var(--muted)] cursor-pointer rounded-none border-0 focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
            >
              <IconSearch size={20} />
            </button>

            <button
              type="button"
              onClick={toggleList}
              aria-label={`My list, ${totalItems} items`}
              className="p-2 text-[var(--ink)] hover:text-[var(--muted)] cursor-pointer relative rounded-none border-0 focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
            >
              <IconList size={20} />
              {totalItems > 0 && (
                <span
                  className={`absolute top-1 right-1 min-w-[16px] h-[16px] px-0.5 bg-[var(--red)] text-white text-[10px] font-bold flex items-center justify-center leading-none rounded-none ${
                    isBumping ? 'animate-badge-bump' : ''
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 text-[var(--ink)] hover:text-[var(--muted)] cursor-pointer rounded-none border-0 focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
            >
              <IconMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Sheet */}
      <MenuSheet open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
