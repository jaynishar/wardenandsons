/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Garment, { GarmentName } from './Garment';
import { getSpecimen, TileColor } from '@/data/specimens';

export interface SpecimenProps {
  category: string;
  sub?: string;
  garment?: GarmentName;
  color?: TileColor;
  aspect?: '4:5' | '1:1';
  photo?: string | null;
  label?: string;
  ageRange?: string;
  priority?: boolean;
  className?: string;
  showCaption?: boolean;
  children?: React.ReactNode;
}

const CATEGORY_FALLBACK_PHOTOS: Record<string, string> = {
  newborn: '/categories/newborn.webp',
  boys: '/categories/boys.webp',
  girls: '/categories/girls.webp',
  bulk: '/categories/bulk.webp',
  men: '/categories/men.webp',
  women: '/categories/women.webp',
};

export function Specimen({
  category,
  sub,
  garment: propGarment,
  color: propColor,
  aspect = '4:5',
  photo: propPhoto,
  label: propLabel,
  ageRange: propAgeRange,
  priority = false,
  className = '',
  showCaption = true,
  children,
}: SpecimenProps) {
  const spec = getSpecimen(category, sub);
  const garment = propGarment || spec.garment;
  void (propColor || spec.color);
  // Use explicit photo if passed, or specimen photo, or category fallback photo
  const photo =
    propPhoto !== undefined
      ? propPhoto
      : spec.photo || CATEGORY_FALLBACK_PHOTOS[category] || null;
  const label = propLabel || spec.label;
  const ageRange = propAgeRange !== undefined ? propAgeRange : spec.ageRange;

  const aspectClass = aspect === '1:1' ? 'aspect-square' : 'aspect-[4/5]';

  return (
    <div className={`group flex flex-col font-sans ${className}`}>
      {/* Specimen Visual Box */}
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-sm bg-[var(--surface)] border border-[var(--line)] transition-all duration-300 group-hover:border-[var(--ink)]`}
      >
        {photo ? (
          <img
            src={photo}
            alt={label}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 bg-[var(--surface)] text-[var(--ink)]">
            <Garment
              name={garment}
              className="w-full h-full max-h-[70%] object-contain text-[var(--ink)] transition-transform duration-300 group-hover:scale-105"
              aria-label={label}
            />
          </div>
        )}

        {children}
      </div>

      {/* Caption beneath tile */}
      {showCaption && (
        <div className="pt-2.5 sm:pt-3">
          <div className="font-sans font-medium text-[14px] leading-tight text-[var(--ink)] truncate group-hover:text-[var(--terracotta)] transition-colors">
            {label}
          </div>
          {ageRange ? (
            <div className="text-[12px] text-[var(--muted)] leading-normal mt-0.5">
              {ageRange}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Specimen;
