'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useAddToList } from '@/lib/list-store';
import { IconPlus } from '@/components/icons';

interface EssentialItem {
  id: string;
  categorySlug: string;
  subSlug: string;
  name: string;
  tag: string;
  age: string;
  fabric: string;
  photo: string;
  detail: string;
}

const ESSENTIAL_ITEMS: EssentialItem[] = [
  {
    id: 'nb-jhabla',
    categorySlug: 'newborn',
    subSlug: 'bodysuits-jhablas',
    name: 'Combed Cotton Bodysuits & Jhablas',
    tag: 'Newborn Essential',
    age: '0–24 Months',
    fabric: '100% Breathable Combed Cotton',
    photo: '/products/nb-bodysuit.webp',
    detail: 'Flat-lock interior seams with zero tags touching sensitive newborn skin. Diaper-rise room built in.',
  },
  {
    id: 'nb-swaddle',
    categorySlug: 'newborn',
    subSlug: 'swaddles-blankets',
    name: 'Open-Weave Double-Gauze Muslin Swaddles',
    tag: 'Infant Wrap',
    age: 'Generous 47" x 47"',
    fabric: 'Pure Double-Layer Muslin',
    photo: '/products/nb-swaddle.webp',
    detail: 'Generously sized open-weave swaddles that prevent heat buildup in Mumbai’s humid coastal climate.',
  },
  {
    id: 'by-cargos',
    categorySlug: 'boys',
    subSlug: 'shorts-joggers-cargos',
    name: 'Reinforced Cotton Cargo Shorts',
    tag: 'Playwear Staple',
    age: '0–16 Years',
    fabric: 'High-Durability Cotton Twill',
    photo: '/products/by-cargos.webp',
    detail: 'Deep utility pockets, ribbed elastic waist with functional drawstrings. Built for active outdoor play.',
  },
  {
    id: 'gl-frock',
    categorySlug: 'girls',
    subSlug: 'dresses-frocks',
    name: 'Airy Muslin & Cambric Summer Frocks',
    tag: 'Daily & Occasion',
    age: '0–16 Years',
    fabric: '100% Pure Cotton Cambric',
    photo: '/products/gl-dress.webp',
    detail: 'Pre-washed cotton poplin with soft 100% cotton inner linings and zero scratchy tulle on skin.',
  },
  {
    id: 'bk-uniform',
    categorySlug: 'bulk',
    subSlug: 'school-uniforms',
    name: 'South Mumbai School Uniforms',
    tag: 'Cathedral · St. Mary’s',
    age: 'Ages 3–18',
    fabric: 'Institutional Poly-Viscose & Cotton',
    photo: '/products/bk-uniform.webp',
    detail: 'Tailored precisely to South Mumbai school dress codes with reinforced stress seams.',
  },
  {
    id: 'by-cricket',
    categorySlug: 'boys',
    subSlug: 'sportswear-cricket-whites',
    name: 'Maidan Cricket Academy Whites',
    tag: 'Sports Kit',
    age: 'Junior & Senior Sizes',
    fabric: 'Heavyweight Breathable Cotton Drill',
    photo: '/products/by-cricket.webp',
    detail: 'Reinforced knee panels and breathable mesh inserts for long weekend cricket training on the Maidans.',
  },
];

export default function CuratedShowcase() {
  const { openAddSheet } = useAddToList();
  const [filter, setFilter] = useState<'all' | 'newborn' | 'kids' | 'uniforms'>('all');

  const filteredItems = ESSENTIAL_ITEMS.filter((item) => {
    if (filter === 'newborn') return item.categorySlug === 'newborn';
    if (filter === 'kids') return item.categorySlug === 'boys' || item.categorySlug === 'girls';
    if (filter === 'uniforms') return item.categorySlug === 'bulk';
    return true;
  });

  return (
    <section className="py-14 sm:py-20 font-sans">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-2">
            <span className="text-[12px] uppercase tracking-wider text-[var(--terracotta)] font-medium">
              Kemps Corner Staples
            </span>
            <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] tracking-tight">
              Essential Cotton Pieces
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[var(--muted)] max-w-xl font-normal leading-relaxed">
              Everyday staples stocked fresh year-round at our August Kranti Marg boutique. Add items to your Request List for live tape measurements on WhatsApp.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Staples' },
              { id: 'newborn', label: 'Newborn' },
              { id: 'kids', label: 'Boys & Girls' },
              { id: 'uniforms', label: 'Uniforms & Cricket' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-3.5 py-1.5 text-[13px] font-medium transition-all cursor-pointer rounded-sm border ${
                  filter === tab.id
                    ? 'bg-[var(--ink)] border-[var(--ink)] text-white shadow-xs'
                    : 'bg-white border-[var(--line)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Item Lookbook Grid: 3 cols on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between bg-white border border-[var(--line)] rounded-md overflow-hidden hover:border-[var(--ink)] transition-all duration-300 shadow-xs"
            >
              <div>
                {/* 4:5 Vertical Portrait Fashion Photograph */}
                <Link
                  href={`/shop/${item.categorySlug}/${item.subSlug}/`}
                  className="block relative aspect-[4/5] w-full overflow-hidden bg-[var(--surface)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.photo}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Age Badge */}
                  <div aria-hidden="true" className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium text-[var(--ink)] border border-[var(--line)] rounded-sm">
                    {item.age}
                  </div>

                  {/* Tag Badge */}
                  <div aria-hidden="true" className="absolute top-3 right-3 bg-[var(--ink)] text-white px-2.5 py-1 text-[11px] font-medium rounded-sm">
                    {item.tag}
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-5 space-y-2">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-[var(--terracotta)]">
                    {item.fabric}
                  </div>
                  <Link
                    href={`/shop/${item.categorySlug}/${item.subSlug}/`}
                    className="block group-hover:text-[var(--blue)] transition-colors"
                  >
                    <h3 className="font-sans font-medium text-lg leading-snug text-[var(--ink)]">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-[13px] text-[var(--muted)] leading-relaxed font-normal">
                    {item.detail}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-3 border-t border-[var(--line)]">
                <Link
                  href={`/shop/${item.categorySlug}/${item.subSlug}/`}
                  className="text-[13px] font-medium text-[var(--ink)] hover:text-[var(--terracotta)] inline-flex items-center gap-1 group-hover:underline underline-offset-4"
                >
                  <span>Details</span>
                  <span>&rarr;</span>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    openAddSheet({
                      categorySlug: item.categorySlug,
                      subSlug: item.subSlug,
                    })
                  }
                  className="h-10 px-4 inline-flex items-center gap-1.5 text-[13px] font-medium bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white active:scale-95 transition-all cursor-pointer rounded-sm border border-[var(--line)]"
                  aria-label={`Add to List: ${item.name}`}
                >
                  <IconPlus size={15} />
                  <span>Add to List</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
