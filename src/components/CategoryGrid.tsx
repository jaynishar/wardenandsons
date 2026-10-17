import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA, getCatalogueItemsByCategory } from '@/lib/products';

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 font-sans">
      <div className="text-center space-y-3 mb-10 md:mb-14">
        <span className="editorial-label text-gold bg-bg-cream px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
          Curated Department Collections
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest">
          Explore by Category
        </h2>
        <p className="text-xs sm:text-sm text-muted max-w-xl mx-auto leading-relaxed">
          Select a department to view representative styles and fabric details. All garments are available for personalized WhatsApp enquiries and Kemps Corner store pickup.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {CATEGORIES_DATA.map((cat) => {
          const itemCount = getCatalogueItemsByCategory(cat.slug).length;
          const displayCount = itemCount > 0 ? `${itemCount} Representative Styles` : `${cat.typicalItems.length} Key Styles`;
          const href = cat.slug === 'bulk' ? '/bulk-orders' : `/shop/${cat.slug}`;

          return (
            <Link
              key={cat.slug}
              href={href}
              className="group relative rounded-2xl overflow-hidden border border-border-soft min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-6 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2"
            >
              {/* Background Image with Scale Animation */}
              <div className="absolute inset-0 z-0 bg-near-black">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={`${cat.name} Collection`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-forest/30 to-near-black flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-gold/40" />
                  </div>
                )}
                {/* Refined Luxury Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/55 to-near-black/20" />
              </div>

              {/* Top Meta Bar */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest bg-white/95 px-3 py-1 rounded-full shadow-2xs border border-white/40">
                  {cat.ageOrSizeRange}
                </span>
                <span className="text-[11px] font-medium text-gold bg-near-black/70 backdrop-blur-xs px-3 py-1 rounded-full border border-gold/30">
                  {displayCount}
                </span>
              </div>

              {/* Bottom Editorial Content */}
              <div className="relative z-10 space-y-3 pt-12">
                <div>
                  <span className="editorial-label text-gold text-[10px] tracking-widest block mb-1">
                    Department Door
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-gold transition-colors">
                    {cat.name}
                  </h3>
                </div>

                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                  {cat.summary}
                </p>

                {/* Micro tags for top typical items */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.typicalItems.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/15 text-white/90 border border-white/20 backdrop-blur-xs"
                    >
                      {item}
                    </span>
                  ))}
                  {cat.typicalItems.length > 3 && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-white/70">
                      +{cat.typicalItems.length - 3} more
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-gold group-hover:text-white transition-colors">
                  <span>Explore Department</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
