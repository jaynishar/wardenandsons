import React from 'react';

export interface LogoProps {
  variant?: 'full' | 'mark';
  height?: number | string;
  className?: string;
  priority?: boolean;
}

/**
 * Warden & Sons Kids Wear Official Wordmark Component
 * Transparent, tight-cropped, authentic letter tiles.
 * Has NO white box or background rectangle.
 */
export function Logo({
  variant = 'full',
  height = 40,
  className = '',
}: LogoProps) {
  const isFull = variant === 'full';
  // 241 x 69 full artwork, 241 x 46 letter mark only
  const viewBox = isFull ? '0 0 241 69' : '0 0 241 46';
  const widthRatio = isFull ? 241 / 69 : 241 / 46;

  // Compute calculated dimensions if height is numeric
  const numericHeight = typeof height === 'number' ? height : parseInt(String(height), 10) || 40;
  const calculatedWidth = Math.round(numericHeight * widthRatio);

  return (
    <svg
      role="img"
      aria-label="Warden & Sons Kids Wear"
      viewBox={viewBox}
      width={calculatedWidth}
      height={numericHeight}
      className={`inline-block select-none overflow-hidden ${className}`}
      style={{ height, width: 'auto', aspectRatio: `${isFull ? '241 / 69' : '241 / 46'}` }}
    >
      <title>Warden & Sons Kids Wear</title>
      <image
        href="/brand/logo.webp"
        x="0"
        y="0"
        width="241"
        height="69"
        preserveAspectRatio="xMinYMin meet"
      />
    </svg>
  );
}

export default Logo;
