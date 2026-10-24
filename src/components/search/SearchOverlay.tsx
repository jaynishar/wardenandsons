'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { IconSearch, IconClose, IconWhatsApp } from '@/components/icons';
import { Photo } from '@/components/ui/Photo';
import { useSearchStore } from '@/lib/search-store';
import { createSearchIndex, searchCatalogue, SearchResultItem } from '@/lib/search';
import { COPY_DECK } from '@/content/copy';
import { BUSINESS_CONFIG } from '@/config/business';
import { trackWhatsAppClick } from '@/lib/analytics';

export function SearchOverlay() {
  const isOpen = useSearchStore((state) => state.isOpen);
  const closeSearch = useSearchStore((state) => state.closeSearch);
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isIndexReady, setIsIndexReady] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize search index on first open
  useEffect(() => {
    if (isOpen && !isIndexReady) {
      createSearchIndex();
      setIsIndexReady(true);
    }
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      // Focus input with slight delay for dialog animation
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, isIndexReady]);

  // Execute search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const items = searchCatalogue(query);
    setResults(items);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation: ArrowDown, ArrowUp, Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev - 1 + results.length) % results.length : 0,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0) {
        const target = results[selectedIndex] || results[0];
        if (target) {
          closeSearch();
          router.push(target.href);
        }
      }
    }
  };

  const handleSelect = (href: string) => {
    closeSearch();
    router.push(href);
  };

  // WhatsApp query message for empty search fallback
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.phone.raw}?text=${encodeURIComponent(
    'Hi Warden & Sons, I was searching on your website and could not find what I needed. Could you please assist me?',
  )}`;

  const handleWhatsAppEmptyClick = () => {
    trackWhatsAppClick({
      button_location: 'search',
      category: 'search_empty',
      enquiry_type: 'general',
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeSearch()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-none transition-opacity" />

        <Dialog.Content
          aria-describedby="search-overlay-description"
          className="fixed inset-0 z-50 bg-[var(--ivory)] flex flex-col focus:outline-none md:inset-auto md:top-12 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl md:rounded-[8px] md:border md:border-[var(--line)] md:shadow-2xl md:max-h-[80vh]"
        >
          {/* Search Header Bar */}
          <div className="p-4 sm:p-5 border-b border-[var(--line)] bg-[var(--paper)] flex items-center gap-3">
            <div className="text-[var(--ink-soft)] shrink-0">
              <IconSearch size={20} />
            </div>

            <Dialog.Title className="sr-only">Search Catalogue</Dialog.Title>
            <p id="search-overlay-description" className="sr-only">
              Search children and family clothing categories across Warden &amp; Sons catalogue.
            </p>

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={COPY_DECK.search.placeholder}
              className="flex-1 bg-transparent text-base sm:text-lg text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />

            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search query"
                className="p-1 text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer"
              >
                <IconClose size={18} />
              </button>
            )}

            <Dialog.Close
              aria-label="Close search"
              className="p-1.5 -mr-1 text-[var(--ink-soft)] hover:text-[var(--ink)] rounded-[4px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            >
              <IconClose size={22} />
            </Dialog.Close>
          </div>

          {/* Search Results Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
            {query.trim().length === 0 ? (
              <div className="py-12 text-center space-y-2 text-[var(--ink-soft)]">
                <p className="text-sm font-medium">Type a garment or size to search</p>
                <p className="text-xs">Examples: jhabla, nightsuit, cricket whites, cargo shorts, frock</p>
              </div>
            ) : results.length > 0 ? (
              <ul className="space-y-1.5" role="listbox" aria-label="Search suggestions">
                {results.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item.href)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center gap-3.5 p-2.5 rounded-[6px] border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--paper)] border-[var(--ink)]'
                          : 'bg-transparent border-transparent hover:bg-[var(--paper)] hover:border-[var(--line)]'
                      }`}
                    >
                      {/* Photo Thumbnail */}
                      <div className="w-12 h-15 shrink-0 rounded-[4px] overflow-hidden bg-[var(--paper)] border border-[var(--line)]">
                        <Photo
                          src={item.photo}
                          alt={item.subLabel}
                          ratio="4/5"
                          placeholderLabel={item.subLabel.slice(0, 8)}
                        />
                      </div>

                      {/* Labels */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] label-upper text-[var(--ink-soft)] truncate">
                          {item.categoryLabel}
                        </p>
                        <h4 className="font-display font-medium text-sm sm:text-base text-[var(--ink)] truncate">
                          {item.subLabel}
                        </h4>
                      </div>

                      {/* Select hint on desktop */}
                      {isSelected && (
                        <span className="hidden md:inline-block text-[11px] text-[var(--ink-soft)] font-mono pr-2">
                          ↵ Enter
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="py-12 text-center space-y-4">
                <p className="text-sm text-[var(--ink)] font-medium">
                  No matching garments found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-[var(--ink-soft)] max-w-sm mx-auto">
                  {COPY_DECK.search.empty}
                </p>

                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppEmptyClick}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] bg-[var(--wa)] text-white text-xs font-medium hover:bg-[#0d6b44] transition-colors"
                  >
                    <IconWhatsApp size={16} />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default SearchOverlay;
