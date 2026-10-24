import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Specimen } from '@/components/Specimen';
import { TrustMarquee } from '@/components/TrustMarquee';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  path: '/shop',
  title: { absolute: 'Shop Kids Clothes by Age, Mumbai | Warden & Sons' },
  description:
    "Browse cotton and muslin children's clothing by age group. Select everyday playwear, sleepwear, and infant essentials to order on WhatsApp.",
});

interface ShopCategoryCard {
  slug: string;
  href: string;
  label: string;
  ageLine: string;
  garment: 'jhabla' | 'tshirt' | 'frock' | 'kaftan' | 'uniform';
  color: 'yellow' | 'blue' | 'red' | 'ink';
  photo?: string | null;
}

const ALL_SHOP_CATEGORIES: ShopCategoryCard[] = [
  {
    slug: 'newborn',
    href: '/shop/newborn/',
    label: 'Newborn',
    ageLine: '0–24 months',
    garment: 'jhabla',
    color: 'yellow',
    photo: '/categories/newborn.webp',
  },
  {
    slug: 'boys',
    href: '/shop/boys/',
    label: 'Boys',
    ageLine: '0–16 years',
    garment: 'tshirt',
    color: 'blue',
    photo: '/categories/boys.webp',
  },
  {
    slug: 'girls',
    href: '/shop/girls/',
    label: 'Girls',
    ageLine: '0–16 years',
    garment: 'frock',
    color: 'red',
    photo: '/categories/girls.webp',
  },
  {
    slug: 'men',
    href: '/shop/men/',
    label: 'Men',
    ageLine: 'Sizes S – XXL',
    garment: 'tshirt',
    color: 'ink',
    photo: '/categories/men.webp',
  },
  {
    slug: 'women',
    href: '/shop/women/',
    label: 'Women',
    ageLine: 'Sizes S – XXL',
    garment: 'kaftan',
    color: 'red',
    photo: '/categories/women.webp',
  },
  {
    slug: 'bulk',
    href: '/bulk-orders/',
    label: 'Uniforms & Bulk',
    ageLine: 'Schools & Sports',
    garment: 'uniform',
    color: 'blue',
    photo: '/categories/bulk.webp',
  },
];

export default function ShopPage() {
  return (
    <div className="py-6 sm:py-10 font-sans">
      <Container>
        <Breadcrumbs
          items={[
            { name: 'Home', url: getCanonicalUrl('/') },
            { name: 'Shop', url: getCanonicalUrl('/shop') },
          ]}
        />

        {/* Page Header */}
        <div className="pt-2 pb-8 sm:pb-12">
          <h1 className="font-sans font-medium text-4xl sm:text-5xl lg:text-[66px] leading-[1.05] text-[var(--ink)] tracking-tight">
            Shop Kids Clothes by Age
          </h1>
          <p className="text-base sm:text-lg text-[var(--ink)] mt-3 max-w-2xl leading-relaxed">
            Select items for your Request List. Send us your list on WhatsApp to confirm live colors,
            sizes measured with a tape, and daily pricing directly from our Kemps Corner shop.
          </p>
        </div>

        {/* Specimen Tiles Grid: 2 cols mobile, 3 tablet, 4 desktop */}
        <div className="py-4 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {ALL_SHOP_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.href}
                className="group block bg-[var(--surface)] p-3 sm:p-4 hover-lift transition-all focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
              >
                <Specimen
                  category={cat.slug}
                  garment={cat.garment}
                  color={cat.color}
                  photo={cat.photo}
                  label={cat.label}
                  ageRange={cat.ageLine}
                  aspect="4:5"
                />
              </Link>
            ))}
          </div>
        </div>
      </Container>

      {/* Brand Trust Strip */}
      <div className="mt-12 sm:mt-16">
        <TrustMarquee />
      </div>
    </div>
  );
}
