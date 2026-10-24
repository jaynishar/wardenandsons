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
import { Logo } from '@/components/Logo';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [isBumping, setIsBumping] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const prevTotalRef = useRef(0);
  const moreRef = useRef<HTMLDivElement>(null);
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

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const moreLinks = [
    { label: 'Size guide', href: '/size-guide/' },
    { label: 'How it works', href: '/how-it-works/' },
    { label: 'About', href: '/about/' },
    { label: 'Visit us', href: '/visit-us/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Contact', href: '/contact/' },
  ];

  const logoVisibilityClass =
    pathname === '/' && !scrolledPastHero
      ? 'opacity-0 pointer-events-none'
      : 'opacity-100';

  return (
    <>
      {/* =========================================================================
          DESKTOP HEADER (768px and wider): sticky, 64px high, plain white bar
         ========================================================================= */}
      <header className="hidden md:block sticky top-0 z-40 h-16 bg-[var(--bg)] transition-colors">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo on Left: at least 40px on desktop */}
          <Link
            href="/"
            className={`flex items-center gap-2.5 focus-visible:outline-3 focus-visible:outline-[var(--blue)] shrink-0 transition-opacity duration-300 ${logoVisibilityClass}`}
          >
            <Logo height={40} />
          </Link>

          {/* Centre Navigation Links: plain nouns, sentence case */}
          <nav aria-label="Main catalogue navigation" className="flex items-center space-x-6 text-[15px] font-medium">
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
                className="inline-flex items-center gap-1 text-[var(--ink)] hover:text-[var(--blue)] transition-colors py-1 cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--blue)] rounded-none"
              >
                <span>More</span>
                <IconChevron direction={moreOpen ? 'up' : 'down'} size={14} />
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  aria-label="More boutique links"
                  className="absolute right-0 top-full mt-2 w-48 bg-[var(--surface)] shadow-lg py-1.5 z-50 animate-in fade-in duration-100 rounded-none border-0"
                >
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-[14px] text-[var(--ink)] hover:bg-[#eae8e4] transition-colors"
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
              className="inline-flex items-center gap-1.5 h-10 px-3 text-[14px] font-medium text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer rounded-none border-0 focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
            >
              <IconSearch size={18} />
              <span className="hidden lg:inline">Search</span>
            </button>

            {/* My List Button */}
            <button
              type="button"
              onClick={toggleList}
              aria-label={`My list with ${totalItems} items`}
              className="inline-flex items-center gap-2 h-10 px-3.5 bg-[var(--ink)] text-white hover:bg-[#1a2d52] active:scale-[0.98] transition-transform duration-[140ms] cursor-pointer text-[14px] font-medium rounded-none border-0 focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
            >
              <IconList size={18} />
              <span>My list</span>
              <span className={`min-w-[18px] h-[18px] px-1 bg-white text-[var(--ink)] text-[11px] font-bold inline-flex items-center justify-center leading-none rounded-none ${isBumping ? 'animate-badge-bump' : ''}`}>
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE TOP BAR (under 768px): 56px high, plain white bar
         ========================================================================= */}
      <header className="md:hidden relative h-14 bg-[var(--bg)]">
        <div className="px-4 h-full flex items-center justify-between">
          {/* Menu Button on Left */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className="p-2 -ml-2 text-[var(--ink)] hover:text-[var(--muted)] cursor-pointer rounded-none border-0 focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
          >
            <IconMenu size={22} />
          </button>

          {/* Logo Centre: at least 32px on phones */}
          <Link
            href="/"
            className={`flex items-center focus-visible:outline-3 focus-visible:outline-[var(--blue)] transition-opacity duration-300 ${logoVisibilityClass}`}
          >
            <Logo height={32} />
          </Link>

          {/* Search & My List on Right */}
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
                <span className={`absolute top-1 right-1 min-w-[16px] h-[16px] px-0.5 bg-[var(--ink)] text-white text-[10px] font-bold flex items-center justify-center leading-none rounded-none ${isBumping ? 'animate-badge-bump' : ''}`}>
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
