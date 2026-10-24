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
      className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[var(--surface)] md:hidden h-16 pb-[env(safe-area-inset-bottom)] font-sans"
    >
      <div className="grid grid-cols-4 h-full items-stretch">
        {/* 1. Shop */}
        <Link
          href="/shop/"
          className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors rounded-none ${
            isShopActive
              ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <span className="text-xs uppercase tracking-wider">Shop</span>
          {isShopActive && (
            <span
              className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--ink)]"
              aria-hidden="true"
            />
          )}
        </Link>

        {/* 2. Categories */}
        <Link
          href="/shop/"
          className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors rounded-none ${
            isCategoryActive
              ? 'bg-[var(--surface)] text-[var(--ink)] font-semibold'
              : 'text-[var(--muted)] hover:text-[var(--ink)]'
          }`}
        >
          <span className="text-xs uppercase tracking-wider">Categories</span>
          {isCategoryActive && (
            <span
              className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--ink)]"
              aria-hidden="true"
            />
          )}
        </Link>

        {/* 3. Search */}
        <button
          type="button"
          onClick={openSearch}
          aria-label="Search catalogue"
          className="relative flex flex-col items-center justify-center h-full min-h-[44px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer rounded-none"
        >
          <IconSearch size={18} />
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Search</span>
        </button>

        {/* 4. List */}
        <button
          type="button"
          onClick={toggleList}
          aria-label={`My list, ${totalItems} items`}
          className="relative flex flex-col items-center justify-center h-full min-h-[44px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer rounded-none"
        >
          <div className="relative flex items-center justify-center">
            <IconList size={18} />
            {totalItems > 0 && (
              <span
                className={`absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-none bg-[var(--red)] text-white text-[10px] font-bold flex items-center justify-center leading-none ${
                  isBumping ? 'animate-badge-bump' : ''
                }`}
              >
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
