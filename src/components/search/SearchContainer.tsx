'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useSearchStore } from '@/lib/search-store';

const SearchOverlay = dynamic(() => import('./SearchOverlay'), {
  ssr: false,
});

export function SearchContainer() {
  const isOpen = useSearchStore((state) => state.isOpen);

  if (!isOpen) return null;

  return <SearchOverlay />;
}

export default SearchContainer;
