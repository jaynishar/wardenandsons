'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Check, MessageSquare } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCartStore } from '@/store/cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory,
      image: product.image,
    });

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  const handleWhatsAppQuickAsk = () => {
    const message = `Hello Warden & Sons! I am inquiring about "${product.name}" (SKU: ${product.id}, ₹${product.price}). Could you please share available sizes and actual photos?`;
    window.open(`https://wa.me/919920751567?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Box */}
      <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden">
        <Image
          src={product.image || '/store_front.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Category Pill Tag */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1B4332] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs border border-[#EBE7DF]">
          {product.subCategory}
        </span>

        {/* Quick Inquire Button */}
        <button
          onClick={handleWhatsAppQuickAsk}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-xs cursor-pointer"
          title="Inquire directly on WhatsApp"
          aria-label="Inquire on WhatsApp"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
      </div>

      {/* Details Box */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A] line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#666666] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="pt-1 flex flex-wrap gap-1 text-[10px] text-[#D4A574] font-semibold">
            <span>{product.fabric}</span>
            <span>•</span>
            <span>{product.sizes}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-[#EBE7DF] flex items-center justify-between gap-3">
          <div className="leading-tight">
            <span className="text-[10px] uppercase font-semibold text-gray-400 block">Sample Price</span>
            <span className="font-serif font-bold text-base sm:text-lg text-[#1B4332]">
              ₹{product.price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
              justAdded
                ? 'bg-[#1B4332] text-white'
                : 'bg-[#1B4332] hover:bg-[#143527] text-white active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
