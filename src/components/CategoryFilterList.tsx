'use client';

import React, { useState, useMemo } from 'react';
import { MessageSquare, Phone, ShieldCheck, ArrowUpDown } from 'lucide-react';
import { Product } from '@/lib/products';

interface CategoryFilterListProps {
  products: Product[];
  category: string;
}

export default function CategoryFilterList({ products, category }: CategoryFilterListProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'low-high', 'high-low'

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
    if (sortBy === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedSubCategory, sortBy]);

  const handleWhatsappOrder = (product: Product) => {
    const message = `Hello Warden & Sons! I am interested in buying this item from your catalog:
Product: ${product.name}
Category: ${product.category.toUpperCase()}
Subcategory: ${product.subCategory}
Fabric: ${product.fabric}
Price: ₹${product.price}
Sizes: Please advise on size options.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919920751567?text=${encoded}`, '_blank');
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Filtering and Sorting Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-primary-50 p-6 rounded-2xl shadow-sm">
        {/* Subcategory Filter Buttons */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-none scroll-smooth">
          <span className="text-xs font-bold text-slate-500 shrink-0 font-sans">Filters:</span>
          <div className="flex gap-1.5">
            {subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors min-h-[38px] cursor-pointer ${
                  selectedSubCategory === sub
                    ? 'bg-primary-800 text-white'
                    : 'bg-warm-bg text-primary-800 border border-primary-100 hover:bg-primary-50'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <ArrowUpDown className="w-4 h-4 text-slate-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
          >
            <option value="default">Sort: Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {processedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-primary-50 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-accent-500 font-bold uppercase tracking-wider">
                      {product.subCategory}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-primary-800 mt-1">{product.name}</h3>
                  </div>
                  <span className="text-lg font-bold text-slate-800 shrink-0">₹{product.price}</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-sans">{product.description}</p>
                
                <div className="space-y-1.5 pt-2 text-[10px] font-semibold text-slate-400 font-sans border-t border-primary-50">
                  <div className="flex justify-between">
                    <span>Sizes Available:</span>
                    <span className="text-slate-600">{product.sizes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fabric Sourcing:</span>
                    <span className="text-slate-600">{product.fabric}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-3 bg-warm-bg/25 border-t border-primary-50">
                <button
                  onClick={() => handleWhatsappOrder(product)}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] text-xs uppercase tracking-wider font-sans focus:outline-none flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                  id={`cta-product-order-${product.id}`}
                >
                  <MessageSquare className="w-4 h-4" /> Order on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-primary-50 rounded-2xl shadow-sm">
          <p className="text-slate-400 text-sm font-sans">No products found in this subcategory.</p>
          <button
            onClick={() => setSelectedSubCategory('All')}
            className="text-xs font-bold text-accent-500 hover:underline mt-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
