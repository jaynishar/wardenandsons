import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Marker, MarkerColor } from '@/components/ui/Marker';
import { Photo } from '@/components/ui/Photo';
import { ShopKidsTiles } from '@/components/ShopKidsTiles';
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

            <ShopKidsTiles />
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
