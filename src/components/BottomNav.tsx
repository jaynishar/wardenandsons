'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconSearch, IconList } from '@/components/icons';
import { useListStore, useListCount } from '@/lib/list-store';
import { useSearchStore } from '@/lib/search-store';

export default function BottomNav() {
  const pathname = usePathname();
  const toggleList = useListStore((state) => state.toggleList);
  const openSearch = useSearchStore((state) => state.openSearch);
  const totalItems = useListCount();
  const [isBumping, setIsBumping] = useState(false);
  const prevTotalRef = useRef(0);

  // Short bump on badge when item is added
  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setIsBumping(true);
      const timer = setTimeout(() => setIsBumping(false), 260);
      prevTotalRef.current = totalItems;
      return () => clearTimeout(timer);
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  const isShopActive = pathname === '/shop' || pathname === '/shop/';
  const isCategoryActive = pathname.startsWith('/shop/') && pathname !== '/shop/';

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-30 bg-[var(--bg)]/95 backdrop-blur-md border-t border-[var(--line)] md:hidden h-16 pb-[env(safe-area-inset-bottom)] font-sans"
    >
      <div className="grid grid-cols-4 h-full items-stretch">
        {/* 1. Shop */}
        <Link
          href="/shop/"
          className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            isShopActive
              ? 'text-[var(--ink)] font-semibold'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-[11px] tracking-tight">Shop</span>
          {isShopActive && (
            <span
              className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--ink)]"
              aria-hidden="true"
            />
          )}
        </Link>

        {/* 2. Categories */}
        <Link
          href="/shop/"
          className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            isCategoryActive
              ? 'text-[var(--ink)] font-semibold'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[11px] tracking-tight">Categories</span>
          {isCategoryActive && (
            <span
              className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--ink)]"
              aria-hidden="true"
            />
          )}
        </Link>

        {/* 3. Search */}
        <button
          type="button"
          onClick={openSearch}
          aria-label="Search catalogue"
          className="relative flex flex-col items-center justify-center h-full min-h-[44px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
        >
          <IconSearch size={19} className="mb-0.5" />
          <span className="text-[11px] tracking-tight">Search</span>
        </button>

        {/* 4. List */}
        <button
          type="button"
          onClick={toggleList}
          aria-label={`My list, ${totalItems} items`}
          className="relative flex flex-col items-center justify-center h-full min-h-[44px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
        >
          <div className="relative flex items-center justify-center mb-0.5">
            <IconList size={19} />
            {totalItems > 0 && (
              <span
                className={`absolute -top-1 -right-2.5 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[var(--wa)] text-white text-[10px] font-bold flex items-center justify-center leading-none ${
                  isBumping ? 'animate-badge-bump' : ''
                }`}
              >
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight">My List</span>
        </button>
      </div>
    </nav>
  );
}
