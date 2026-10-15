import React from 'react';
import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import ShopCatalog from '@/components/ShopCatalog';

export const metadata: Metadata = {
  title: 'All Categories & Sample Catalog',
  description:
    'Browse our pure cotton sample catalog for newborns, boys, girls, men, and women. Add items to your bag and order instantly via WhatsApp from Warden & Sons, Kemps Corner.',
  alternates: {
    canonical: '/shop',
  },
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          Kemps Corner Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4332] tracking-tight">
          Browse Department Samples
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Add any items to your bag to generate an itemized WhatsApp order. Our team at Kemps Corner will verify sizes, share photos of live colorways, and dispatch directly to you.
        </p>
      </div>

      {/* Main Interactive Catalog */}
      <ShopCatalog products={products} initialCategory="all" />
    </div>
  );
}
