/* eslint-disable @next/next/no-img-element */
import React from 'react';
import manifestData from '@/data/image-manifest.json';

interface ManifestEntry {
  width: number;
  height: number;
  blur: string;
  widths: number[];
}

const manifest = manifestData as Record<string, ManifestEntry | undefined>;

export interface PhotoProps {
  /**
   * Key in src/data/image-manifest.json (e.g. "newborn/bodysuits-jhablas/1")
   */
  imageKey?: string | null;
  /**
   * Direct image path fallback (e.g. "/products/cat-nb-01.webp" or "/hero-editorial.webp")
   */
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
  imageKey,
  src,
  alt,
  ratio = '4/5',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  placeholderLabel,
  className = '',
  width,
  height,
}: PhotoProps) {
  // Normalize ratio string into a valid CSS aspect-ratio value (e.g. '4/5' -> '4 / 5')
  const cssAspectRatio = ratio.includes('/') ? ratio.replace('/', ' / ') : ratio;

  // 1. Pipeline manifest-based responsive picture
  if (imageKey && manifest[imageKey]) {
    const entry = manifest[imageKey]!;
    const avifSrcSet = entry.widths.map((w) => `/img/${imageKey}-${w}.avif ${w}w`).join(', ');
    const webpSrcSet = entry.widths.map((w) => `/img/${imageKey}-${w}.webp ${w}w`).join(', ');
    const fallbackSrc = `/img/${imageKey}-800.webp`;
    const imgWidth = width ?? entry.width;
    const imgHeight = height ?? entry.height;

    return (
      <div
        className={`relative w-full overflow-hidden rounded-[6px] bg-[var(--paper)] ${className}`.trim()}
        style={{ aspectRatio: cssAspectRatio }}
      >
        <picture className="w-full h-full block">
          <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
          <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
          <img
            src={fallbackSrc}
            alt={alt}
            width={imgWidth}
            height={imgHeight}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{
              aspectRatio: cssAspectRatio,
              backgroundImage: entry.blur ? `url("${entry.blur}")` : undefined,
              backgroundSize: 'cover',
            }}
          />
        </picture>
      </div>
    );
  }

  // 2. Legacy direct src (e.g. existing /products/*.webp)
  if (src && src.trim() !== '') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-[6px] bg-[var(--paper)] ${className}`.trim()}
        style={{ aspectRatio: cssAspectRatio }}
      >
        <img
          src={src}
          alt={alt}
          width={width ?? 800}
          height={height ?? 1000}
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

  // 3. Calm placeholder tile when neither manifest key nor src is available
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

export default Photo;
