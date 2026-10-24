'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBumping, setIsBumping] = useState(false);
  const prevTotalRef = useRef(0);
  const toggleList = useListStore((state) => state.toggleList);
  const openSearch = useSearchStore((state) => state.openSearch);
  const totalItems = useListCount();

  // Short bump animation when an item is added to the list
  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 260);
      return () => clearTimeout(timer);
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  return (
    <>
      {/* =========================================================================
          DESKTOP HEADER (768px and wider): sticky, 68px high, Warm Alabaster
          Logo left, Nav center, Search & List right
         ========================================================================= */}
      <header className="hidden md:block sticky top-0 z-40 h-[68px] bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--line)] transition-colors font-sans">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Brand Logo on Left */}
          <Link
            href="/"
            aria-label="Warden & Sons Kids Wear Home"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-[var(--blue)] shrink-0 py-1"
          >
            <Logo height={42} />
          </Link>

          {/* Centre Navigation Links: Editorial typography */}
          <nav aria-label="Main catalogue navigation" className="flex items-center space-x-7 text-[14px] font-medium tracking-normal text-[var(--ink)]">
            <Link
              href="/shop/"
              className="hover:text-[var(--terracotta)] transition-colors py-1.5"
            >
              Shop
            </Link>
            <Link
              href="/shop/newborn/"
              className="hover:text-[var(--terracotta)] transition-colors py-1.5"
            >
              Newborn
            </Link>
            <Link
              href="/shop/boys/"
              className="hover:text-[var(--terracotta)] transition-colors py-1.5"
            >
              Boys
            </Link>
            <Link
              href="/shop/girls/"
              className="hover:text-[var(--terracotta)] transition-colors py-1.5"
            >
              Girls
            </Link>
            <Link
              href="/bulk-orders/"
              className="hover:text-[var(--terracotta)] transition-colors py-1.5"
            >
              Uniforms
            </Link>
            <Link
              href="/visit-us/"
              className="hover:text-[var(--terracotta)] transition-colors py-1.5"
            >
              Visit Us
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Search Button */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search catalogue"
              className="inline-flex items-center gap-2 h-10 px-3.5 text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer rounded-sm border border-[var(--line)] focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <IconSearch size={16} />
              <span className="hidden lg:inline">Search</span>
            </button>

            {/* List Button */}
            <button
              type="button"
              onClick={toggleList}
              aria-label={`My list with ${totalItems} items`}
              className={`inline-flex items-center gap-2 h-10 px-4 active:scale-[0.98] transition-all duration-150 cursor-pointer text-[13px] font-medium rounded-sm border focus-visible:outline-2 focus-visible:outline-[var(--blue)] ${
                totalItems > 0
                  ? 'bg-[var(--ink)] border-[var(--ink)] text-white hover:bg-[var(--blue)]'
                  : 'bg-[var(--surface)] border-[var(--line)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white'
              }`}
            >
              <IconList size={16} />
              <span>{totalItems > 0 ? `My List (${totalItems})` : 'My List'}</span>
              {totalItems > 0 && (
                <span
                  className={`min-w-[18px] h-[18px] px-1 bg-[var(--wa)] text-white text-[11px] font-semibold inline-flex items-center justify-center leading-none rounded-full ${
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
          MOBILE TOP BAR (under 768px): 58px high, Warm Alabaster
          Clean bar: Logo left, Search, List trigger right, hamburger
         ========================================================================= */}
      <header className="md:hidden sticky top-0 z-40 h-[58px] bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--line)] font-sans">
        <div className="px-4 h-full flex items-center justify-between">
          {/* Logo on Left */}
          <Link
            href="/"
            aria-label="Warden & Sons Kids Wear Home"
            className="flex items-center focus-visible:outline-2 focus-visible:outline-[var(--blue)] py-1"
          >
            <Logo height={34} />
          </Link>

          {/* Search, My List & Hamburger on Right */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search catalogue"
              className="p-2 text-[var(--ink)] hover:text-[var(--muted)] cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <IconSearch size={20} />
            </button>

            <button
              type="button"
              onClick={toggleList}
              aria-label={`My list, ${totalItems} items`}
              className="p-2 text-[var(--ink)] hover:text-[var(--muted)] cursor-pointer relative rounded-sm focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <IconList size={20} />
              {totalItems > 0 && (
                <span
                  className={`absolute top-1 right-1 min-w-[16px] h-[16px] px-0.5 bg-[var(--wa)] text-white text-[10px] font-bold flex items-center justify-center leading-none rounded-full ${
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
              className="p-2 text-[var(--ink)] hover:text-[var(--muted)] cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
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
