'use client';

import React, { useState, useMemo } from 'react';
import { MessageSquare, ArrowUpDown } from 'lucide-react';
import { CatalogueItem } from '@/lib/products';
import { BUSINESS_CONFIG } from '@/config/business';

interface CategoryFilterListProps {
  products: CatalogueItem[];
  category?: string;
}

export default function CategoryFilterList({ products }: CategoryFilterListProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Extract distinct subcategories
  const subCategories = useMemo(() => {
    const list = new Set(products.map((p) => p.subCategory));
    return ['All', ...Array.from(list)];
  }, [products]);

  // Filter and sort products
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Filter
    if (selectedSubCategory !== 'All') {
      result = result.filter((p) => p.subCategory === selectedSubCategory);
    }

    // Sort
    if (sortBy === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'za') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [products, selectedSubCategory, sortBy]);

  const handleWhatsappOrder = (product: CatalogueItem) => {
    const message = `Hello Warden & Sons! I am interested in this item from your catalogue:
Product: ${product.title}
Category: ${product.category.toUpperCase()}
Subcategory: ${product.subCategory}
Fabric: ${product.fabricDetails}
Size/Age: ${product.ageOrSizeRange}
Please advise on available colours and pricing.`;

    window.open(BUSINESS_CONFIG.whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Filtering and Sorting Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-[#EBE7DF] p-6 rounded-2xl shadow-xs">
        {/* Subcategory Filter Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-none scroll-smooth">
          <span className="text-xs font-bold text-gray-500 shrink-0 font-sans">Filters:</span>
          <div className="flex gap-1.5">
            {subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors min-h-[38px] cursor-pointer ${
                  selectedSubCategory === sub
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-[#FAF8F5] text-[#1B4332] border border-[#EBE7DF] hover:bg-gray-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 rounded-lg border border-[#EBE7DF] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] bg-[#FAF8F5] focus:bg-white"
          >
            <option value="default">Sort: Default</option>
            <option value="az">Alphabetical: A to Z</option>
            <option value="za">Alphabetical: Z to A</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {processedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-[#EBE7DF] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-[#D4A574] font-bold uppercase tracking-wider">
                      {product.subCategory}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#1B4332] mt-1">{product.title}</h3>
                  </div>
                  <span className="text-xs font-bold text-[#1B4332] bg-[#FAF8F5] px-2.5 py-1 rounded-md border border-[#EBE7DF] shrink-0">
                    Enquire on WhatsApp
                  </span>
                </div>

                <p className="text-xs text-[#666666] leading-relaxed font-sans">{product.description}</p>

                <div className="space-y-1.5 pt-2 text-[10px] font-semibold text-gray-500 font-sans border-t border-[#EBE7DF]">
                  <div className="flex justify-between">
                    <span>Range / Sizes:</span>
                    <span className="text-gray-800">{product.ageOrSizeRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fabric Sourcing:</span>
                    <span className="text-gray-800">{product.fabricDetails}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-3 bg-[#FAF8F5] border-t border-[#EBE7DF]">
                <button
                  onClick={() => handleWhatsappOrder(product)}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition-all duration-300 text-xs uppercase tracking-wider font-sans focus:outline-none flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                  id={`cta-product-order-${product.id}`}
                >
                  <MessageSquare className="w-4 h-4" /> Enquire on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-[#EBE7DF] rounded-2xl shadow-xs">
          <p className="text-gray-500 text-sm font-sans">No products found in this subcategory.</p>
          <button
            onClick={() => setSelectedSubCategory('All')}
            className="text-xs font-bold text-[#D4A574] hover:underline mt-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
