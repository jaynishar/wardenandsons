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

  const isHomeActive = pathname === '/';
  const isShopActive = pathname.startsWith('/shop');

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--ivory)] border-t border-[var(--line)] md:hidden h-16 pb-safe"
    >
      <div className="grid grid-cols-4 h-full items-stretch">
        {/* 1. Home */}
        <Link
          href="/"
          className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            isHomeActive ? 'text-[var(--ink)] font-semibold' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
          }`}
        >
          <span className="text-xs uppercase tracking-wider">Home</span>
          {isHomeActive && (
            <span
              className="absolute bottom-1 w-6 h-[2px] bg-[var(--ink)] rounded-full"
              aria-hidden="true"
            />
          )}
        </Link>

        {/* 2. Shop */}
        <Link
          href="/shop/"
          className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
            isShopActive ? 'text-[var(--ink)] font-semibold' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
          }`}
        >
          <span className="text-xs uppercase tracking-wider">Shop</span>
          {isShopActive && (
            <span
              className="absolute bottom-1 w-6 h-[2px] bg-[var(--ink)] rounded-full"
              aria-hidden="true"
            />
          )}
        </Link>

        {/* 3. Search */}
        <button
          type="button"
          onClick={openSearch}
          aria-label="Search catalogue"
          className="relative flex flex-col items-center justify-center h-full min-h-[44px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors cursor-pointer"
        >
          <IconSearch size={18} />
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Search</span>
        </button>

        {/* 4. List */}
        <button
          type="button"
          onClick={toggleList}
          aria-label={`My list, ${totalItems} items`}
          className="relative flex flex-col items-center justify-center h-full min-h-[44px] text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors cursor-pointer"
        >
          <div className="relative flex items-center justify-center">
            <IconList size={18} />
            {totalItems > 0 && (
              <span className={`absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-[10px] font-bold flex items-center justify-center leading-none ${isBumping ? 'animate-badge-bump' : ''}`}>
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider mt-0.5">List</span>
        </button>
      </div>
    </nav>
  );
}
