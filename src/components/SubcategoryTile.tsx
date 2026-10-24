'use client';

import React from 'react';
import Link from 'next/link';
import { Photo } from '@/components/ui/Photo';
import { IconPlus } from '@/components/icons';
import { useAddToList } from '@/lib/list-store';
import { useAgeStore, subCoversAge } from '@/lib/age-store';
import { Subcategory } from '@/data/catalogue';
import { Reveal } from '@/components/motion/Reveal';

interface SubcategoryTileProps {
  sub: Subcategory;
}

export default function SubcategoryTile({ sub }: SubcategoryTileProps) {
  const { openAddSheet } = useAddToList();
  const ageBand = useAgeStore((state) => state.ageBand);
  const coversAge = subCoversAge(sub.categorySlug, sub.slug, ageBand);
  const ageBadgeLabel = ageBand === 'newborn' ? 'Newborn' : ageBand;
  const href = `/shop/${sub.categorySlug}/${sub.slug}/`;

  return (
    <Reveal className="h-full">
      <div className="group relative w-full h-full bg-[var(--paper)] border border-[var(--line)] rounded-[6px] overflow-hidden hover:border-[var(--ink-soft)] active:scale-[0.98] transition-transform duration-[80ms] flex flex-col justify-between">
        <Link href={href} className="block w-full relative">
          {coversAge && (
            <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-[3px] bg-[var(--ivory)] border border-[var(--line)] text-[10px] font-semibold text-[var(--ink)] shadow-xs">
              Fits {ageBadgeLabel}
            </span>
          )}
          <div className="w-full aspect-[4/5] overflow-hidden bg-[var(--paper)]">
            <Photo
              src={sub.photo}
              alt={sub.label}
              ratio="4/5"
              placeholderLabel={sub.label}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </Link>

        <div className="p-3 sm:p-4 flex items-center justify-between gap-2 border-t border-[var(--line)] bg-[var(--paper)]">
          <Link href={href} className="min-w-0 flex-1 hover:underline underline-offset-2">
            <h3 className="font-display font-medium text-sm sm:text-base text-[var(--ink)] truncate">
              {sub.label}
            </h3>
          </Link>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openAddSheet({ categorySlug: sub.categorySlug, subSlug: sub.slug });
            }}
            className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ivory)] active:scale-95 transition-all shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
            aria-label={`Add ${sub.label} to list`}
          >
            <IconPlus size={18} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}
