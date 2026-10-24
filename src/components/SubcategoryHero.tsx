'use client';

import React, { useState } from 'react';
import { Photo } from '@/components/ui/Photo';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Marker } from '@/components/ui/Marker';
import { IconPlus } from '@/components/icons';
import { useAddToList } from '@/lib/list-store';
import { Subcategory, Category, ageOptionsFor } from '@/data/catalogue';
import { CatalogueItem } from '@/lib/products';
import { getProductPriceFrom } from '@/lib/owner-inputs';

interface SubcategoryHeroProps {
  sub: Subcategory;
  category: Category;
  featuredStyles: CatalogueItem[];
}

export default function SubcategoryHero({
  sub,
  category,
  featuredStyles,
}: SubcategoryHeroProps) {
  const { openAddSheet } = useAddToList();
  const ageOptions = ageOptionsFor(sub.categorySlug, sub.slug);
  const [selectedAge, setSelectedAge] = useState<string | undefined>(undefined);

  // If sub has its own photo, use it; otherwise fallback to first featured style photo or null
  const displayPhoto = sub.photo || (featuredStyles[0]?.image ?? null);

  const handleAddMain = () => {
    openAddSheet({
      categorySlug: sub.categorySlug,
      subSlug: sub.slug,
      age: selectedAge,
    });
  };

  const handleAddStyle = (styleId: string) => {
    openAddSheet({
      categorySlug: sub.categorySlug,
      subSlug: sub.slug,
      styleId,
      age: selectedAge,
    });
  };

  return (
    <div className="space-y-12">
      {/* Hero Visual & Direct Add Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Large 4:5 Photo */}
        <div className="lg:col-span-6">
          <div className="w-full aspect-[4/5] overflow-hidden rounded-[6px] border border-[var(--line)] bg-[var(--paper)]">
            <Photo
              src={displayPhoto}
              alt={`${sub.label} - ${category.label}`}
              ratio="4/5"
              priority
              placeholderLabel={sub.label}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details, Age Selection & Add to List */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Marker color="blue" />
              <span className="text-xs uppercase tracking-widest text-[var(--ink-soft)] font-medium">
                {category.label} · {category.ageLine}
              </span>
            </div>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-[var(--ink)]">
              {sub.label}
            </h2>
            <p className="text-base text-[var(--ink-soft)] leading-relaxed">
              {sub.seoDescription}
            </p>
          </div>

          {/* Age selection chips */}
          {ageOptions.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-[var(--line)]">
              <div className="flex items-center justify-between text-xs text-[var(--ink-soft)]">
                <span className="font-medium text-[var(--ink)]">Select size / age:</span>
                {selectedAge && (
                  <button
                    type="button"
                    onClick={() => setSelectedAge(undefined)}
                    className="underline hover:text-[var(--ink)] cursor-pointer"
                  >
                    Clear selection
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {ageOptions.map((age) => {
                  const isSelected = selectedAge === age;
                  return (
                    <Chip
                      key={age}
                      selected={isSelected}
                      onClick={() => setSelectedAge(isSelected ? undefined : age)}
                      className="text-xs sm:text-sm"
                    >
                      {age}
                    </Chip>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add to List CTA Button */}
          <div className="pt-2">
            <Button
              variant="primary"
              fullWidth
              onClick={handleAddMain}
              className="text-sm font-medium tracking-wide uppercase"
            >
              Add to list {selectedAge ? `(${selectedAge})` : ''}
            </Button>
            <p className="text-xs text-[var(--ink-soft)] mt-2 text-center sm:text-left">
              Select what you need, add optional sizing notes, and send your list on WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Styles Section */}
      {featuredStyles.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-[var(--line)]">
          <div>
            <h2 className="font-display font-medium text-xl sm:text-2xl text-[var(--ink)]">
              Featured styles
            </h2>
            <p className="text-sm text-[var(--ink-soft)] mt-1">
              Popular designs in stock at our Kemps Corner store.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredStyles.map((item) => {
              const price = item.priceFrom ?? getProductPriceFrom(item.id);

              return (
                <div
                  key={item.id}
                  className="group bg-[var(--paper)] border border-[var(--line)] rounded-[6px] overflow-hidden hover:border-[var(--ink-soft)] transition-colors flex flex-col justify-between"
                >
                  <div className="w-full aspect-[4/5] overflow-hidden bg-[var(--paper)]">
                    <Photo
                      src={item.image}
                      alt={item.title}
                      ratio="4/5"
                      placeholderLabel={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>

                  <div className="p-3.5 sm:p-4 space-y-2 border-t border-[var(--line)] bg-[var(--paper)] flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="font-display font-medium text-sm sm:text-base text-[var(--ink)] line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[var(--ink-soft)] line-clamp-1">
                        {item.fabricDetails} · {item.ageOrSizeRange}
                      </p>

                      {price != null && (
                        <div className="pt-1">
                          <span className="font-medium text-sm text-[var(--ink)]">From ₹{price}</span>
                          <span className="text-[10px] text-[var(--ink-soft)] block leading-tight">
                            Final price confirmed on WhatsApp
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleAddStyle(item.id)}
                        className="w-full min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-[4px] bg-white border border-[var(--line)] text-xs font-medium text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ivory)] active:scale-[0.98] transition-all cursor-pointer"
                        aria-label={`Add ${item.title} to list`}
                      >
                        <IconPlus size={16} />
                        <span>Add to list</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
