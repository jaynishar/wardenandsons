/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconSearch,
  IconList,
  IconMenu,
  IconChevron,
} from '@/components/icons';
import { MenuSheet } from '@/components/MenuSheet';
import { useListStore, useListCount } from '@/lib/list-store';
import { useSearchStore } from '@/lib/search-store';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [shouldFlipLogo, setShouldFlipLogo] = useState(false);
  const [isBumping, setIsBumping] = useState(false);
  const prevTotalRef = useRef(0);
  const moreRef = useRef<HTMLDivElement>(null);
  const toggleList = useListStore((state) => state.toggleList);
  const openSearch = useSearchStore((state) => state.openSearch);
  const totalItems = useListCount();

  // One-time logo flip on first load of the homepage (keep under 600ms total: 550ms)
  useEffect(() => {
    if (pathname === '/') {
      try {
        const flipped = sessionStorage.getItem('warden_logo_flip');
        if (!flipped) {
          setShouldFlipLogo(true);
          sessionStorage.setItem('warden_logo_flip', 'true');
          const timer = setTimeout(() => setShouldFlipLogo(false), 550);
          return () => clearTimeout(timer);
        }
      } catch {
        // ignore
      }
    }
  }, [pathname]);

  // Short bump animation when an item is added to the list
  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 260);
      prevTotalRef.current = totalItems;
      return () => clearTimeout(timer);
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const moreLinks = [
    { label: 'How it works', href: '/how-it-works/' },
    { label: 'About', href: '/about/' },
    { label: 'Visit us', href: '/visit-us/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Contact', href: '/contact/' },
  ];

  return (
    <>
      {/* =========================================================================
          DESKTOP HEADER (768px and wider): sticky, 64px high
         ========================================================================= */}
      <header className="hidden md:block sticky top-0 z-40 h-16 bg-[var(--ivory)] border-b border-[var(--line)]">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo on Left */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-[var(--blue)] shrink-0"
          >
            <div className={`relative w-11 h-8 rounded-[3px] bg-white border border-[var(--line)] shrink-0 p-0.5 overflow-hidden ${shouldFlipLogo ? 'animate-logo-flip' : ''}`}>
              <img
                src="/brand_logo.webp"
                alt="Warden & Sons Kids Wear Official Logo"
                width={44}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-semibold text-base tracking-tight text-[var(--ink)]">
                Warden &amp; Sons
              </span>
              <span className="text-[10px] label-upper text-[var(--ink-soft)] tracking-wider">
                Kemps Corner · 1994
              </span>
            </div>
          </Link>

          {/* Centre Navigation Links */}
          <nav aria-label="Main catalogue navigation" className="flex items-center space-x-6 text-sm font-medium">
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
              href="/shop/men/"
              className="text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1"
            >
              Men
            </Link>
            <Link
              href="/shop/women/"
              className="text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1"
            >
              Women
            </Link>
            <Link
              href="/bulk-orders/"
              className="text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1"
            >
              Uniforms &amp; Bulk
            </Link>

            {/* "More" Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-1 text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)] rounded-[2px]"
              >
                <span>More</span>
                <IconChevron direction={moreOpen ? 'up' : 'down'} size={14} />
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  aria-label="More boutique links"
                  className="absolute right-0 top-full mt-2 w-48 bg-[var(--paper)] border border-[var(--line)] rounded-[4px] shadow-md py-1.5 z-50 animate-in fade-in duration-100"
                >
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--line)] hover:text-[var(--ink)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search catalogue"
              className="inline-flex items-center gap-1.5 h-10 px-3 rounded-[4px] text-sm font-medium text-[var(--ink)] hover:bg-[var(--paper)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <IconSearch size={18} />
              <span className="hidden lg:inline">Search</span>
            </button>

            {/* My List Button */}
            <button
              type="button"
              onClick={toggleList}
              aria-label={`My list with ${totalItems} items`}
              className="inline-flex items-center gap-2 h-10 px-3.5 rounded-[4px] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[#203155] active:scale-[0.98] transition-all duration-[80ms] cursor-pointer text-sm font-medium focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <IconList size={18} />
              <span>My list</span>
              <span className={`min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--ivory)] text-[var(--ink)] text-[11px] font-bold inline-flex items-center justify-center leading-none ${isBumping ? 'animate-badge-bump' : ''}`}>
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE TOP BAR (under 768px): 56px high, NOT sticky
         ========================================================================= */}
      <header className="md:hidden relative h-14 bg-[var(--ivory)] border-b border-[var(--line)]">
        <div className="px-4 h-full flex items-center justify-between">
          {/* Menu Button on Left */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className="p-2 -ml-2 text-[var(--ink)] hover:text-[var(--ink-soft)] rounded-[4px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
          >
            <IconMenu size={22} />
          </button>

          {/* Logo Centre */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
          >
            <div className={`w-8 h-6 rounded-[2px] bg-white border border-[var(--line)] shrink-0 p-0.5 overflow-hidden ${shouldFlipLogo ? 'animate-logo-flip' : ''}`}>
              <img
                src="/brand_logo.webp"
                alt="Warden & Sons"
                width={32}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display font-semibold text-base text-[var(--ink)] leading-none">
              Warden &amp; Sons
            </span>
          </Link>

          {/* Search & My List on Right */}
          <div className="flex items-center gap-1 -mr-1">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search catalogue"
              className="p-2 text-[var(--ink)] hover:text-[var(--ink-soft)] rounded-[4px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <IconSearch size={20} />
            </button>

            <button
              type="button"
              onClick={toggleList}
              aria-label={`My list, ${totalItems} items`}
              className="p-2 text-[var(--ink)] hover:text-[var(--ink-soft)] rounded-[4px] cursor-pointer relative focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <IconList size={20} />
              {totalItems > 0 && (
                <span className={`absolute top-1 right-1 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-[9px] font-bold flex items-center justify-center leading-none ${isBumping ? 'animate-badge-bump' : ''}`}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Sheet */}
      <MenuSheet open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
