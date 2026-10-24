'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import Garment, { GarmentName } from '@/components/Garment';
import { useAddToList } from '@/lib/list-store';
import type { TileColor } from '@/data/specimens';

interface ShowcaseItem {
  id: string;
  categorySlug: string;
  subSlug: string;
  name: string;
  tag: string;
  garment: GarmentName;
  color: TileColor;
  photo?: string;
  fact: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'jhabla',
    categorySlug: 'newborn',
    subSlug: 'bodysuits-jhablas',
    name: 'Pure Cotton Jhabla',
    tag: 'Newborn Essential',
    garment: 'jhabla',
    color: 'yellow',
    photo: '/products/nb-bodysuit.webp',
    fact: 'Flat-lock interior seams with zero tags touching newborn skin.',
  },
  {
    id: 'swaddle',
    categorySlug: 'newborn',
    subSlug: 'swaddles-blankets',
    name: 'Open-Weave Swaddle',
    tag: 'Infant Wrap',
    garment: 'swaddle',
    color: 'red',
    photo: '/products/nb-swaddle.webp',
    fact: 'Pure double-layer muslin suited for Mumbai humidity.',
  },
  {
    id: 'cricket',
    categorySlug: 'boys',
    subSlug: 'sportswear-cricket-whites',
    name: 'Maidan Cricket Whites',
    tag: 'Sports Kit',
    garment: 'sportswear',
    color: 'red',
    photo: '/products/by-cricket.webp',
    fact: 'Heavyweight cotton drill with reinforced knee panels.',
  },
  {
    id: 'nightsuit',
    categorySlug: 'boys',
    subSlug: 'nightwear',
    name: 'Hosiery Nightsuit',
    tag: 'Daily Sleepwear',
    garment: 'nightsuit',
    color: 'ink',
    photo: '/products/by-nightsuit.webp',
    fact: '100% combed cotton jersey that softens with every machine wash.',
  },
  {
    id: 'uniform',
    categorySlug: 'bulk',
    subSlug: 'school-uniforms',
    name: 'South Mumbai School Uniform',
    tag: 'Bespoke Cut',
    garment: 'uniform',
    color: 'blue',
    photo: '/products/bk-uniform.webp',
    fact: 'Exact fabric specs for Cathedral, Scottish, and St. Mary’s.',
  },
];

export default function CuratedShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SHOWCASE_ITEMS[activeIdx];
  const { openAddSheet } = useAddToList();

  const colorStyles: Record<TileColor, { bg: string; fg: string }> = {
    red: { bg: 'bg-[var(--red)]', fg: 'text-white' },
    blue: { bg: 'bg-[var(--blue)]', fg: 'text-white' },
    yellow: { bg: 'bg-[var(--yellow)]', fg: 'text-[var(--ink)]' },
    ink: { bg: 'bg-[var(--ink)]', fg: 'text-white' },
  };

  const { bg, fg } = colorStyles[active.color];

  return (
    <section className="py-12 sm:py-16 bg-[var(--surface)]">
      <Container>
        <div className="max-w-2xl mb-8 sm:mb-12">
          <h2 className="font-sans font-medium text-2xl sm:text-3xl text-[var(--ink)] tracking-tight">
            Kemps Corner Essentials
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] mt-1">
            Everyday South Mumbai staples stocked fresh year-round.
          </p>
        </div>

        {/* 5-item Shelf Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {SHOWCASE_ITEMS.map((item, idx) => {
            const isCurrent = idx === activeIdx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-4 py-2 text-sm font-sans whitespace-nowrap transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)] ${
                  isCurrent
                    ? 'bg-[var(--ink)] text-white font-medium'
                    : 'bg-white text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Disc / Mat Stage Presentation */}
        <div className="bg-white border-2 border-[var(--ink)] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Disc with Garment */}
            <div className="md:col-span-6 flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center p-8 transition-colors duration-300 bg-[var(--surface)]">
                {/* Circular mat accent */}
                <div
                  className={`w-48 h-48 sm:w-60 sm:h-60 rounded-full ${bg} flex items-center justify-center p-8 transition-transform duration-300 hover:scale-105 shadow-none`}
                >
                  <Garment
                    name={active.garment}
                    className={`w-full h-full object-contain ${fg}`}
                    aria-label={active.name}
                  />
                </div>
              </div>
            </div>

            {/* Information & Action */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="font-sans font-medium text-2xl sm:text-3xl text-[var(--ink)]">
                {active.name}
              </h3>
              <p className="text-base text-[var(--ink)] leading-relaxed font-normal">
                {active.fact}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    openAddSheet({
                      categorySlug: active.categorySlug,
                      subSlug: active.subSlug,
                    })
                  }
                  className="h-[52px] px-8 inline-flex items-center justify-center font-sans font-medium text-[15px] bg-[var(--ink)] text-white hover:bg-[var(--blue)] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
                >
                  Add to list
                </button>
                <Link
                  href={`/shop/${active.categorySlug}/${active.subSlug}/`}
                  className="text-sm font-medium text-[var(--ink)] hover:text-[var(--blue)] underline underline-offset-4"
                >
                  View full details &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
