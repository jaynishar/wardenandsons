'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Check, MessageSquare, Sparkles } from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'motion/react';
import { CatalogueItem } from '@/lib/products';
import { useCartStore } from '@/store/cart';
import { BUSINESS_CONFIG } from '@/config/business';

interface ProductCardProps {
  product: CatalogueItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToRequest = () => {
    addItem({
      productId: product.id,
      name: product.title,
      category: product.category,
      subCategory: product.subCategory,
      image: product.image,
      ageGroup: product.ageOrSizeRange,
    });

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  const directInquiryMessage = `Hello Warden & Sons! I am inquiring about "${product.title}" (${product.subCategory}, ${product.ageOrSizeRange}). Could you please share available colors, prints, and confirm current pricing?`;
  const directInquiryUrl = BUSINESS_CONFIG.whatsappUrl(directInquiryMessage);

  // Check if item has an authentic garment photo (never reuse storefront or logo as garment photo)
  const hasRealProductImage = Boolean(
    product.image &&
    product.image !== '/store_front.jpg' &&
    product.image !== '/brand_logo.jpg' &&
    product.image !== '/brand_logo.webp',
  );

  const prefersReduced = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReduced);

  return (
    <LazyMotion features={domAnimation}>
      <div className="group bg-white rounded-2xl border border-border-soft overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
        {/* Product Image / Category Visual Container */}
        <div className="relative aspect-[4/5] bg-bg-cream overflow-hidden">
          {hasRealProductImage ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-bg-cream to-border-soft/40 border-b border-border-soft/60">
              <div className="w-11 h-11 rounded-xl bg-white border border-border-soft flex items-center justify-center text-gold mb-2 shadow-2xs">
                <Sparkles className="w-5 h-5 text-forest" />
              </div>
              <span className="font-serif font-bold text-xs text-forest px-2 line-clamp-1">
                {product.subCategory}
              </span>
              <span className="text-[10px] text-muted mt-1 font-medium">
                Live photos shared on WhatsApp
              </span>
            </div>
          )}

          {/* Category Pill Tag */}
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-forest text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs border border-border-soft">
            {product.subCategory}
          </span>

          {/* Quick Inquire Direct Anchor (Min 44x44px touch target) */}
          <a
            href={directInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 min-w-[44px] min-h-[44px] rounded-full bg-white/95 backdrop-blur-xs text-whatsapp hover:bg-whatsapp hover:text-white transition-all shadow-xs flex items-center justify-center cursor-pointer active:scale-[0.98]"
            title="Inquire directly on WhatsApp"
            aria-label={`Inquire about ${product.title} on WhatsApp`}
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>

        {/* Details Box */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <h3 className="font-serif font-bold text-sm sm:text-base text-near-black line-clamp-2 leading-snug">
              {product.title}
            </h3>
            <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">
              {product.description}
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-gold font-semibold">
              <span>{product.fabricDetails}</span>
              <span>•</span>
              <span>{product.ageOrSizeRange}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-border-soft">
            {/* Add to Request Button (Springs to forest, icon morphs Plus -> Check, label -> Added) */}
            <m.button
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              animate={justAdded ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={handleAddToRequest}
              className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-[0.98] ${
                justAdded ? 'bg-forest text-white' : 'bg-forest hover:bg-forest-dark text-white'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <m.span
                    key="added"
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-gold" />
                    <span>Added!</span>
                  </m.span>
                ) : (
                  <m.span
                    key="add"
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Request</span>
                  </m.span>
                )}
              </AnimatePresence>
            </m.button>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
