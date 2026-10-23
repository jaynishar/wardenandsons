import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES_DATA, getCatalogueItemsByCategory } from '@/lib/products';
import { getCategoryPriceFrom } from '@/lib/owner-inputs';

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-1">
            Collections & Sizing
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest">
            Shop by Age
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted max-w-md">
          Cotton and muslin everyday wear, comfortable nightsuits, and school uniforms. Select an age group to
          explore styles and build your Request List.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {CATEGORIES_DATA.map(cat => {
          const itemCount = getCatalogueItemsByCategory(cat.slug).length;
          const displayCount = itemCount > 0 ? `${itemCount} Styles` : 'View Styles';
          const priceFrom = cat.priceFrom ?? getCategoryPriceFrom(cat.slug);
          const href = cat.slug === 'bulk' ? '/bulk-orders/' : `/shop/${cat.slug}/`;

          return (
            <Link
              key={cat.slug}
              href={href}
              className="group relative rounded-2xl overflow-hidden border border-border-soft min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-6 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2"
            >
              {/* Background Image with Scale Animation */}
              <div className="absolute inset-0 z-0 bg-near-black">
                {cat.image && (
                  <Image
                    src={cat.image}
                    alt={`${cat.name} department clothing collection at Warden & Sons`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/55 to-near-black/20" />
              </div>

              {/* Top Meta Bar */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest bg-white px-3 py-1 rounded-full shadow-2xs border border-white/40">
                  {cat.ageOrSizeRange}
                </span>
                <span className="text-[11px] font-medium text-white/90 bg-near-black/70 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                  {displayCount}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-3 pt-12">
                {priceFrom != null && (
                  <div className="bg-near-black/70 backdrop-blur-xs p-2.5 rounded-xl border border-white/20">
                    <span className="font-bold text-gold text-sm block">From ₹{priceFrom}</span>
                    <span className="text-[10px] text-gray-300 block">Final price confirmed on WhatsApp</span>
                  </div>
                )}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-gold transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">{cat.summary}</p>

                <div className="pt-2 flex items-center text-xs font-bold text-white uppercase tracking-wider group-hover:text-gold transition-colors">
                  <span>View Collection</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
