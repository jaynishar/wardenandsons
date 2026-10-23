import React from 'react';
import type { Metadata } from 'next';
import { getAllCatalogueItems } from '@/lib/products';
import ShopCatalog from '@/components/ShopCatalog';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';
import { ClipboardList, MessageSquare, Camera, Ruler } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = buildPageMetadata({
  path: '/shop',
  title: { absolute: "Shop Kids Clothes by Age, Mumbai | Warden & Sons" },
  description: "Browse cotton and muslin children's clothing by age group. Select everyday playwear, sleepwear, and infant essentials to order on WhatsApp.",
});

export default function ShopPage() {
  const products = getAllCatalogueItems();

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Shop', url: getCanonicalUrl('/shop') },
        ]}
      />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          Shop Kids Clothes by Age
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          Select items for your Request List. Send us your list on WhatsApp to confirm live colors,
          sizes measured with a tape, and daily pricing directly from our Kemps Corner shop.
        </p>
        <div className="pt-1">
          <Link
            href="/size-guide/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/5 hover:bg-forest/10 border border-forest/15 text-forest font-semibold text-xs transition-colors"
          >
            <Ruler className="w-3.5 h-3.5 text-gold" />
            <span>Need measurement help? View our Kids Clothes Size Guide</span>
            <span className="underline ml-0.5">Explore chart &rarr;</span>
          </Link>
        </div>
      </div>

      {/* 3-Step WhatsApp Request Explainer */}
      <div className="bg-white border border-border-soft rounded-2xl p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-near-black">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest text-white flex items-center justify-center shrink-0">
              <ClipboardList className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="font-bold text-forest">1. Add to Request</p>
              <p className="text-muted text-[11px]">Choose items, sizes and preferred colors</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="font-bold text-forest">2. Send List on WhatsApp</p>
              <p className="text-muted text-[11px]">Opens WhatsApp with your prefilled list</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest text-white flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="font-bold text-forest">3. Photos & Dimensions</p>
              <p className="text-muted text-[11px]">We confirm measurements with flat tape</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Catalog */}
      <ShopCatalog products={products} categoryTitle="All Clothes" />
    </div>
  );
}
