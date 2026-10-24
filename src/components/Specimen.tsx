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
  const color = propColor || spec.color;
  const photo = propPhoto !== undefined ? propPhoto : spec.photo;
  const label = propLabel || spec.label;
  const ageRange = propAgeRange !== undefined ? propAgeRange : spec.ageRange;

  // Background and foreground token pairings guaranteed WCAG AA >= 4.5:1
  const colorStyles: Record<TileColor, { bg: string; fg: string }> = {
    red: { bg: 'bg-[var(--red)]', fg: 'text-white' },
    blue: { bg: 'bg-[var(--blue)]', fg: 'text-white' },
    yellow: { bg: 'bg-[var(--yellow)]', fg: 'text-[var(--ink)]' },
    ink: { bg: 'bg-[var(--ink)]', fg: 'text-white' },
  };

  const { bg, fg } = colorStyles[color] || colorStyles.blue;
  const aspectClass = aspect === '1:1' ? 'aspect-square' : 'aspect-[4/5]';

  return (
    <div className={`group flex flex-col ${className}`}>
      {/* Specimen Visual Box */}
      <div
        className={`relative w-full ${aspectClass} overflow-hidden ${
          photo ? 'bg-[var(--surface)]' : `${bg} ${fg}`
        } transition-transform duration-140`}
      >
        {photo ? (
          <img
            src={photo}
            alt={label}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 sm:p-8">
            <Garment
              name={garment}
              className={`w-full h-full max-h-[72%] transition-transform duration-300 group-hover:scale-105 ${fg}`}
              aria-label={label}
            />
          </div>
        )}

        {children}
      </div>

      {/* Caption beneath tile */}
      {showCaption && (
        <div className="pt-2 sm:pt-3">
          <div className="font-sans font-medium text-[14px] sm:text-[15px] leading-tight text-[var(--ink)] truncate">
            {label}
          </div>
          {ageRange ? (
            <div className="text-[12px] sm:text-[13px] text-[var(--muted)] leading-normal mt-0.5">
              {ageRange}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Specimen;
