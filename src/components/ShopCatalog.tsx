'use client';

import React, { useState, useMemo } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

interface ShopCatalogProps {
  products: Product[];
  initialCategory?: string;
  categoryTitle?: string;
}

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'newborn', label: 'Newborns (0-24M)' },
  { id: 'boys', label: 'Boys (0-16Y)' },
  { id: 'girls', label: 'Girls (0-16Y)' },
  { id: 'men', label: 'Men Basics' },
  { id: 'women', label: 'Women Basics' },
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
      pool = pool.filter((p) => p.category === activeCategory);
    }
    const set = new Set(pool.map((p) => p.subCategory));
    return ['all', ...Array.from(set)];
  }, [products, activeCategory]);

  // Main filtered products
  const filteredProducts = useMemo(() => {
    let result = products;

    // 1. Category Filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. SubCategory Filter
    if (selectedSubCategory !== 'all') {
      result = result.filter((p) => p.subCategory === selectedSubCategory);
    }

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q)
      );
    }

    // 4. Sort
    if (sortBy === 'low-high') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, activeCategory, selectedSubCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-8 font-sans">
      {/* Category Pills & Search Controls */}
      <div className="bg-white rounded-3xl border border-[#EBE7DF] p-6 shadow-xs space-y-5">
        {/* Search Bar + Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by garment, fabric (e.g. muslin, cotton, dryfit)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-gray-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            >
              <option value="featured">Featured Collection</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills Row */}
        <div className="border-t border-[#EBE7DF]/80 pt-4 space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
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
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#1A1A1A] border border-[#EBE7DF] hover:border-[#1B4332]'
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
              {subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedSubCategory === sub
                      ? 'bg-[#D4A574] text-white'
                      : 'bg-white text-gray-600 border border-[#EBE7DF] hover:bg-gray-50'
                  }`}
                >
                  {sub === 'all' ? 'All Types' : sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-semibold text-[#666666]">
          Showing <span className="text-[#1B4332] font-bold">{filteredProducts.length}</span> sample items
          {categoryTitle ? ` in ${categoryTitle}` : ''}
        </p>

        <a
          href="https://wa.me/919920751567"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-[#1B4332] hover:text-[#D4A574] flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
          <span>Don’t see what you need? Inquire on WhatsApp</span>
        </a>
      </div>

      {/* Product Cards Grid: 2 cols on mobile, 3-4 cols on desktop */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#EBE7DF] p-12 text-center space-y-4">
          <p className="font-serif text-lg text-[#1A1A1A]">No sample products matched your search.</p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Our Kemps Corner store stocks hundreds of additional designs, sizes, and colors. Message our team directly with a photo or request!
          </p>
          <a
            href="https://wa.me/919920751567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B4332] text-white text-xs font-bold"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            Ask Store Desk on WhatsApp
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
