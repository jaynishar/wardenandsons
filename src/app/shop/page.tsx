import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Marker, MarkerColor } from '@/components/ui/Marker';
import { Photo } from '@/components/ui/Photo';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  path: '/shop',
  title: { absolute: 'Shop Kids Clothes by Age, Mumbai | Warden & Sons' },
  description:
    "Browse cotton and muslin children's clothing by age group. Select everyday playwear, sleepwear, and infant essentials to order on WhatsApp.",
});

interface CategoryTileItem {
  slug: string;
  href: string;
  label: string;
  ageLine: string;
  photo: string;
  markerColor: MarkerColor;
}

const KIDS_TILES: CategoryTileItem[] = [
  {
    slug: 'newborn',
    href: '/shop/newborn/',
    label: 'Newborn',
    ageLine: '0–24 months',
    photo: '/categories/newborn.webp',
    markerColor: 'red',
  },
  {
    slug: 'boys',
    href: '/shop/boys/',
    label: 'Boys',
    ageLine: '0–16 years',
    photo: '/categories/boys.webp',
    markerColor: 'blue',
  },
  {
    slug: 'girls',
    href: '/shop/girls/',
    label: 'Girls',
    ageLine: '0–16 years',
    photo: '/categories/girls.webp',
    markerColor: 'yellow',
  },
];

const FAMILY_TILES: CategoryTileItem[] = [
  {
    slug: 'men',
    href: '/shop/men/',
    label: 'Men',
    ageLine: 'Sizes S – XXL',
    photo: '/categories/men.webp',
    markerColor: 'red',
  },
  {
    slug: 'women',
    href: '/shop/women/',
    label: 'Women',
    ageLine: 'Sizes S – XXL',
    photo: '/categories/women.webp',
    markerColor: 'blue',
  },
];

export default function ShopPage() {
  const newborn = KIDS_TILES[0];
  const boys = KIDS_TILES[1];
  const girls = KIDS_TILES[2];

  return (
    <div className="py-6 sm:py-10">
      <Container>
        <Breadcrumbs
          items={[
            { name: 'Home', url: getCanonicalUrl('/') },
            { name: 'Shop', url: getCanonicalUrl('/shop') },
          ]}
        />

        {/* Page Header */}
        <div className="pt-2 pb-8 sm:pb-12 border-b border-[var(--line)]">
          <h1 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] tracking-tight">
            Shop Kids Clothes by Age
          </h1>
          <p className="text-base text-[var(--ink-soft)] mt-3 max-w-2xl leading-relaxed">
            Select items for your Request List. Send us your list on WhatsApp to confirm live colors,
            sizes measured with a tape, and daily pricing directly from our Kemps Corner shop.
          </p>
        </div>

        {/* Category Groups: Kids then Family */}
        <div className="py-8 sm:py-12 space-y-12">
          {/* 1. Kids Group */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 border-b border-[var(--line)] pb-2.5">
              <Marker color="blue" />
              <h2 className="font-display text-xs uppercase tracking-widest text-[var(--ink-soft)] font-medium">
                Kids
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {/* Newborn: Wide tile on mobile (col-span-2), 1-col on desktop */}
              <Link
                href={newborn.href}
                className="group col-span-2 md:col-span-1 bg-[var(--paper)] border border-[var(--line)] rounded-[6px] overflow-hidden hover:border-[var(--ink-soft)] transition-colors block"
              >
                <div className="flex flex-row md:flex-col items-center md:items-stretch">
                  <div className="w-32 sm:w-44 md:w-full shrink-0 aspect-[4/5] overflow-hidden bg-[var(--paper)]">
                    <Photo
                      src={newborn.photo}
                      alt={newborn.label}
                      ratio="4/5"
                      placeholderLabel={newborn.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Marker color={newborn.markerColor} />
                      <span className="font-display font-medium text-lg sm:text-xl text-[var(--ink)]">
                        {newborn.label}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--ink-soft)]">
                      {newborn.ageLine}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Boys: Side by side on mobile, 1-col on desktop */}
              <Link
                href={boys.href}
                className="group col-span-1 bg-[var(--paper)] border border-[var(--line)] rounded-[6px] overflow-hidden hover:border-[var(--ink-soft)] transition-colors flex flex-col"
              >
                <div className="w-full aspect-[4/5] overflow-hidden bg-[var(--paper)]">
                  <Photo
                    src={boys.photo}
                    alt={boys.label}
                    ratio="4/5"
                    placeholderLabel={boys.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 sm:p-5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Marker color={boys.markerColor} />
                    <span className="font-display font-medium text-base sm:text-xl text-[var(--ink)]">
                      {boys.label}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--ink-soft)]">
                    {boys.ageLine}
                  </p>
                </div>
              </Link>

              {/* Girls: Side by side on mobile, 1-col on desktop */}
              <Link
                href={girls.href}
                className="group col-span-1 bg-[var(--paper)] border border-[var(--line)] rounded-[6px] overflow-hidden hover:border-[var(--ink-soft)] transition-colors flex flex-col"
              >
                <div className="w-full aspect-[4/5] overflow-hidden bg-[var(--paper)]">
                  <Photo
                    src={girls.photo}
                    alt={girls.label}
                    ratio="4/5"
                    placeholderLabel={girls.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 sm:p-5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Marker color={girls.markerColor} />
                    <span className="font-display font-medium text-base sm:text-xl text-[var(--ink)]">
                      {girls.label}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--ink-soft)]">
                    {girls.ageLine}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* 2. Family Group */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 border-b border-[var(--line)] pb-2.5">
              <Marker color="yellow" />
              <h2 className="font-display text-xs uppercase tracking-widest text-[var(--ink-soft)] font-medium">
                Family
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl">
              {FAMILY_TILES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="group bg-[var(--paper)] border border-[var(--line)] rounded-[6px] p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-[var(--ink-soft)] transition-colors"
                >
                  <div className="w-12 sm:w-16 aspect-[4/5] rounded-[4px] overflow-hidden shrink-0 bg-[var(--paper)]">
                    <Photo
                      src={cat.photo}
                      alt={cat.label}
                      ratio="4/5"
                      placeholderLabel={cat.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Marker color={cat.markerColor} />
                      <span className="font-display font-medium text-sm sm:text-base text-[var(--ink)] truncate">
                        {cat.label}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--ink-soft)]">{cat.ageLine}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Uniforms & Bulk wide band */}
            <div>
              <Link
                href="/bulk-orders/"
                className="group w-full bg-[var(--paper)] border border-[var(--line)] rounded-[6px] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[var(--ink-soft)] transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <Marker color="yellow" />
                  <div>
                    <span className="font-display font-medium text-base sm:text-lg text-[var(--ink)] block">
                      Uniforms &amp; Bulk
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--ink-soft)]">
                      Custom school uniforms &amp; institutional bulk orders
                    </p>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-wider text-[var(--ink)] font-medium underline underline-offset-4 self-start sm:self-center">
                  Enquire for schools &amp; bulk &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
