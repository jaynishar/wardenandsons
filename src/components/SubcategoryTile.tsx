'use client';

import React from 'react';
import Link from 'next/link';
import { IconPlus } from '@/components/icons';
import { useAddToList } from '@/lib/list-store';
import { useAgeStore, subCoversAge } from '@/lib/age-store';
import { Subcategory } from '@/data/catalogue';
import { Specimen } from '@/components/Specimen';

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
    <div className="group relative w-full h-full bg-[var(--surface)] p-3.5 flex flex-col justify-between hover-lift active:scale-[0.98] transition-all duration-140">
      <Link href={href} className="block w-full relative">
        {coversAge && (
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-[var(--ink)] text-white text-xs font-medium">
            Fits {ageBadgeLabel}
          </span>
        )}
        <Specimen
          category={sub.categorySlug}
          sub={sub.slug}
          label={sub.label}
          aspect="4:5"
          showCaption={false}
        />
      </Link>

      <div className="pt-3 mt-2 flex items-center justify-between gap-2">
        <Link href={href} className="min-w-0 flex-1 hover:text-[var(--blue)]">
          <h3 className="font-sans font-medium text-base text-[var(--ink)] truncate">
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
          className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center bg-white text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white active:scale-95 transition-all shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
          aria-label={`Add ${sub.label} to list`}
        >
          <IconPlus size={18} />
        </button>
      </div>
    </div>
  );
}
