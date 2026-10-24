import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import AgeCard from '@/components/AgeCard';
import CategoryTiles from '@/components/CategoryTiles';
import HowItWorks from '@/components/HowItWorks';
import StoreStrip from '@/components/StoreStrip';
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

      {/* 1. HERO */}
      <Hero />

      {/* AGE SELECTION CARD */}
      <AgeCard />

      {/* 2. CATEGORY TILES */}
      <CategoryTiles />

      {/* 3. HOW IT WORKS */}
      <HowItWorks />

      {/* 4. STORE STRIP */}
      <StoreStrip />
    </div>
  );
}
