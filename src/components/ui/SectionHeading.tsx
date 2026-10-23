import React from 'react';
import Marker, { MarkerColor } from './Marker';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  kicker?: string;
  description?: string;
  markerColor?: MarkerColor;
  markerIndex?: number;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export function SectionHeading({
  title,
  kicker,
  description,
  markerColor,
  markerIndex,
  align = 'left',
  as: Component = 'h2',
  className = '',
  ...props
}: SectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div className={`space-y-2 ${isCentered ? 'text-center' : 'text-left'} ${className}`.trim()} {...props}>
      {kicker && (
        <div
          className={`flex items-center gap-2 label-upper text-[var(--ink-soft)] ${
            isCentered ? 'justify-center' : 'justify-start'
          }`}
        >
          {(markerColor || markerIndex !== undefined) && (
            <Marker color={markerColor} index={markerIndex} />
          )}
          <span>{kicker}</span>
        </div>
      )}

      <Component className="font-display font-medium text-[var(--ink)] tracking-tight">
        {title}
      </Component>

      {description && (
        <p className={`text-[var(--ink-soft)] max-w-xl text-base ${isCentered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
