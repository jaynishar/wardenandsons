import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CategoryTiles from '@/components/CategoryTiles';
import CuratedShowcase from '@/components/CuratedShowcase';
import HowItWorks from '@/components/HowItWorks';
import ReviewsSection from '@/components/ReviewsSection';
import VisitUsSection from '@/components/VisitUsSection';
import { getClothingStoreSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import { buildPageMetadata } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  path: '/',
  title: {
    absolute: 'Kids Clothes in Kemps Corner, South Mumbai | Warden & Sons',
  },
  description:
    'Buy cotton and muslin kids clothes in Kemps Corner, South Mumbai since 1994. Browse newborn sets, daily playwear, nightsuits and uniforms on WhatsApp.',
});

export default function HomePage() {
  const storeSchema = getClothingStoreSchema('/');

  return (
    <div className="font-sans">
      <JsonLd schema={storeSchema} />

      {/* 1. HERO & CATEGORY PICKER */}
      <Hero />

      {/* 2. CATALOGUE & HORIZONTAL DRAG ROW */}
      <CategoryTiles />

      {/* 3. CURATED SHELF ON DISC */}
      <CuratedShowcase />

      {/* 4. HOW IT WORKS TILES */}
      <HowItWorks />

      {/* 5. VERBATIM CUSTOMER REVIEWS */}
      <ReviewsSection />

      {/* 6. VISIT US & LIVE IST STATUS */}
      <VisitUsSection />
    </div>
  );
}
