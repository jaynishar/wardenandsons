'use client';

import React, { useState, useMemo } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { CatalogueItem } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import StickyMobileBar from '@/components/StickyMobileBar';
import { BUSINESS_CONFIG } from '@/config/business';

interface ShopCatalogProps {
  products: CatalogueItem[];
  initialCategory?: string;
  categoryTitle?: string;
}

const categories = [
  { id: 'all', label: 'All Catalogue' },
  { id: 'newborn', label: 'Newborns (0-24M)' },
  { id: 'boys', label: 'Boys (0-16Y)' },
  { id: 'girls', label: 'Girls (0-16Y)' },
  { id: 'men', label: 'Men Basics' },
  { id: 'women', label: 'Women Basics' },
  { id: 'bulk', label: 'School Uniforms & Bulk' },
];

export default function ShopCatalog({
  products,
  initialCategory = 'all',
  categoryTitle,
}: ShopCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Filter subcategories dynamically based on active category
  const subCategories = useMemo(() => {
    let pool = products;
    if (activeCategory !== 'all') {
      pool = pool.filter(p => p.category === activeCategory);
    }
    const set = new Set(pool.map(p => p.subCategory));
    return ['all', ...Array.from(set)];
  }, [products, activeCategory]);

  // Main filtered products
  const filteredProducts = useMemo(() => {
    let result = products;

    // 1. Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. SubCategory Filter
    if (selectedSubCategory !== 'all') {
      result = result.filter(p => p.subCategory === selectedSubCategory);
    }

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabricDetails.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.ageOrSizeRange.toLowerCase().includes(q),
      );
    }

    // 4. Sort (Alphabetical or Default)
    if (sortBy === 'az') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'za') {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [products, activeCategory, selectedSubCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-8 font-sans">
      {/* Category Pills & Search Controls */}
      <div className="bg-white rounded-3xl border border-border-soft p-6 shadow-xs space-y-5">
        {/* Search Bar + Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by garment, fabric (e.g. muslin, combed cotton)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-gray-500 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-border-soft bg-bg-cream text-xs font-medium focus:outline-none focus:ring-2 focus:ring-forest"
            >
              <option value="featured">Featured</option>
              <option value="az">Alphabetical: A to Z</option>
              <option value="za">Alphabetical: Z to A</option>
            </select>
          </div>
        </div>

        {/* Category Pills Row */}
        <div className="border-t border-border-soft/80 pt-4 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedSubCategory('all');
                  }}
                  className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-forest text-white shadow-xs'
                      : 'bg-bg-cream text-near-black border border-border-soft hover:border-forest'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Subcategory Pills Row */}
          {subCategories.length > 2 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-gray-400 font-semibold uppercase shrink-0">
                Filter:
              </span>
              {subCategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedSubCategory === sub
                      ? 'bg-gold text-white'
                      : 'bg-white text-gray-600 border border-border-soft hover:bg-gray-50'
                  }`}
                >
                  {sub === 'all' ? 'All Types' : sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Single Catalogue Pricing Reassurance Notice */}
      <div className="bg-bg-cream border border-border-soft rounded-2xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-whatsapp shrink-0" />
          <span className="font-semibold text-forest">
            Prices and current stock are confirmed on WhatsApp with live photos & measuring-tape
            checks.
          </span>
        </div>
        <a
          href={BUSINESS_CONFIG.phone.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
          data-track-location="catalog_notice"
          className="text-[11px] font-bold text-forest hover:text-gold inline-flex items-center gap-1 shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5 text-whatsapp" />
          <span>Ask Store Desk</span>
        </a>
      </div>

      {/* Results Count Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2">
        <p className="text-xs font-semibold text-muted">
          Showing <span className="text-forest font-bold">{filteredProducts.length}</span> items
          {categoryTitle ? ` in ${categoryTitle}` : ''}
        </p>

        <a
          href={BUSINESS_CONFIG.phone.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
          data-track-location="catalog_help"
          className="text-xs font-bold text-forest hover:text-gold flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-whatsapp" />
          <span>Don&apos;t see what you need? Inquire on WhatsApp</span>
        </a>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-border-soft p-12 text-center space-y-4">
          <p className="font-serif text-lg text-near-black">
            No items matched your search.
          </p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Our Kemps Corner shop stocks hundreds of additional designs, colors, and sizes.
            Message our team directly with a photo or description!
          </p>
          <a
            href={BUSINESS_CONFIG.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="catalog_empty_state"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-white text-xs font-bold cursor-pointer hover:bg-forest-dark"
          >
            <MessageSquare className="w-4 h-4 text-whatsapp" />
            Ask Store Desk on WhatsApp
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Sticky Mobile "Add to Request" Bar on scroll */}
      <StickyMobileBar />
    </div>
  );
}
