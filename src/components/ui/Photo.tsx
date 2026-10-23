/* eslint-disable @next/next/no-img-element */
import React from 'react';

export interface PhotoProps {
  src?: string | null;
  alt: string;
  ratio?: '4/5' | '1/1' | '16/9' | string;
  priority?: boolean;
  sizes?: string;
  placeholderLabel?: string;
  className?: string;
  width?: number;
  height?: number;
}

export function Photo({
  src,
  alt,
  ratio = '4/5',
  priority = false,
  sizes,
  placeholderLabel,
  className = '',
  width,
  height,
}: PhotoProps) {
  // Normalize ratio string into a valid CSS aspect-ratio value (e.g. '4/5' -> '4 / 5')
  const cssAspectRatio = ratio.includes('/') ? ratio.replace('/', ' / ') : ratio;

  // Placeholder state when src is missing, null, or empty
  if (!src || src.trim() === '') {
    const label = placeholderLabel || alt || 'Warden & Sons';

    return (
      <div
        className={`relative w-full flex flex-col items-center justify-center bg-[var(--paper)] border border-[var(--line)] rounded-[6px] p-4 text-center select-none overflow-hidden ${className}`.trim()}
        style={{ aspectRatio: cssAspectRatio }}
        role="img"
        aria-label={alt}
      >
        <span className="font-display font-medium text-[var(--ink-soft)] text-sm sm:text-base leading-snug max-w-[85%]">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[6px] bg-[var(--paper)] ${className}`.trim()}
      style={{ aspectRatio: cssAspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ aspectRatio: cssAspectRatio }}
      />
    </div>
  );
}

export default Photo;
