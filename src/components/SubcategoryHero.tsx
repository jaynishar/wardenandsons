'use client';

import React, { useState } from 'react';
import { Specimen } from '@/components/Specimen';
import { Chip } from '@/components/ui/Chip';
import { IconPlus } from '@/components/icons';
import { useAddToList } from '@/lib/list-store';
import { Subcategory, Category, ageOptionsFor } from '@/data/catalogue';
import { CatalogueItem } from '@/lib/products';
import { getProductPriceFrom } from '@/lib/owner-inputs';
import { BUSINESS_CONFIG } from '@/config/business';

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

  const directInquiryText = `Hi Warden & Sons! I'm inquiring about ${sub.label} for ${category.label}${
    selectedAge ? ` (Size: ${selectedAge})` : ''
  }. Please share available options and measurements from your Kemps Corner store.`;
  const directInquiryUrl = BUSINESS_CONFIG.whatsappUrl(directInquiryText);

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
    <div className="space-y-12 font-sans">
      {/* Hero Visual & Direct Add Action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Large 4:5 Specimen */}
        <div className="lg:col-span-6">
          <div className="w-full aspect-[4/5] overflow-hidden bg-[var(--surface)]">
            <Specimen
              category={sub.categorySlug}
              sub={sub.slug}
              label={sub.label}
              aspect="4:5"
              priority
              showCaption={false}
            />
          </div>
        </div>

        {/* Details, Age Selection & CTAs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <p className="text-base sm:text-lg text-[var(--ink)] leading-relaxed">
              {sub.seoDescription}
            </p>
          </div>

          {/* Age selection chips */}
          {ageOptions.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                <span className="font-medium text-[var(--ink)]">Select size / age:</span>
                {selectedAge && (
                  <button
                    type="button"
                    onClick={() => setSelectedAge(undefined)}
                    className="underline hover:text-[var(--ink)] cursor-pointer text-sm"
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
                      className="text-sm font-medium"
                    >
                      {age}
                    </Chip>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons: Inquiry on WhatsApp & Add to list */}
          <div className="pt-2 flex flex-col gap-3">
            <a
              href={directInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="product"
              data-track-category={sub.categorySlug}
              className="h-[52px] px-8 inline-flex items-center justify-center font-sans font-medium text-[15px] bg-[var(--wa)] text-white hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--wa)]"
            >
              Send inquiry on WhatsApp
            </a>
            <button
              type="button"
              onClick={handleAddMain}
              className="h-[52px] px-8 inline-flex items-center justify-center font-sans font-medium text-[15px] bg-[var(--ink)] text-white hover:bg-[var(--blue)] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
            >
              Add to list {selectedAge ? `(${selectedAge})` : ''}
            </button>
            <p className="text-sm text-[var(--muted)] mt-1">
              Shop desk measures items flat with a measuring tape before you confirm.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Styles Section */}
      {featuredStyles.length > 0 && (
        <div className="space-y-6 pt-6">
          <div>
            <h2 className="font-sans font-medium text-xl sm:text-2xl text-[var(--ink)]">
              Featured styles
            </h2>
            <p className="text-base text-[var(--muted)] mt-1">
              Popular designs in stock at our Kemps Corner store.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredStyles.map((item) => {
              const price = item.priceFrom ?? getProductPriceFrom(item.id);

              return (
                <div
                  key={item.id}
                  className="group bg-[var(--surface)] p-3.5 flex flex-col justify-between hover-lift transition-all"
                >
                  <div className="w-full aspect-[4/5] overflow-hidden bg-white">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-[var(--muted)]">
                        {item.title}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-2 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="font-sans font-medium text-sm sm:text-base text-[var(--ink)] line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--muted)] line-clamp-1">
                        {item.fabricDetails} · {item.ageOrSizeRange}
                      </p>

                      {price != null && (
                        <div className="pt-1">
                          <span className="font-medium text-sm text-[var(--ink)]">From ₹{price}</span>
                          <span className="text-xs text-[var(--muted)] block leading-tight">
                            Final price confirmed on WhatsApp
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleAddStyle(item.id)}
                        className="w-full min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-sm font-medium text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white active:scale-[0.98] transition-all cursor-pointer"
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
