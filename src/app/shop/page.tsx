import React from 'react';
import type { Metadata } from 'next';
import { getAllCatalogueItems } from '@/lib/products';
import ShopCatalog from '@/components/ShopCatalog';
import { getCanonicalUrl } from '@/config/site';
import { ClipboardList, MessageSquare, Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Categories & Representative Catalogue',
  description:
    'Browse our breathable cotton representative catalogue for newborns, boys, girls, men, women, and school uniforms. Add items to your request list and enquire directly via WhatsApp from Warden & Sons, Kemps Corner.',
  alternates: {
    canonical: getCanonicalUrl('/shop'),
  },
};

export default function ShopPage() {
  const products = getAllCatalogueItems();

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          Kemps Corner Catalogue
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4332] tracking-tight">
          Browse Department Offerings
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Add representative styles to your Request List. Our team at Kemps Corner will check current live inventory, verify sizes with measuring tape dimensions, share photos of current colorways, and confirm pricing on WhatsApp.
        </p>
      </div>

      {/* 3-Step WhatsApp Request Explainer */}
      <div className="bg-[#FAF8F5] border border-[#EBE7DF] rounded-2xl p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-white flex items-center justify-center shrink-0">
              <ClipboardList className="w-4 h-4 text-[#D4A574]" />
            </div>
            <div>
              <p className="font-bold text-[#1B4332]">1. Pick Styles</p>
              <p className="text-[#666666] text-[11px]">Add representative garments to your Request List</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-white flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
            </div>
            <div>
              <p className="font-bold text-[#1B4332]">2. Send on WhatsApp</p>
              <p className="text-[#666666] text-[11px]">Include your age, size, or fit preferences</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-white flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4 text-[#D4A574]" />
            </div>
            <div>
              <p className="font-bold text-[#1B4332]">3. Live Photos & Prices</p>
              <p className="text-[#666666] text-[11px]">We confirm rack stock, tape measure & pricing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Catalog */}
      <ShopCatalog products={products} initialCategory="all" />
    </div>
  );
}
