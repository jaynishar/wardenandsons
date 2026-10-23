import React from 'react';

export type MarkerColor = 'red' | 'blue' | 'yellow';

export interface MarkerProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: MarkerColor;
  index?: number;
  className?: string;
}

const ROTATION_COLORS: MarkerColor[] = ['red', 'blue', 'yellow'];

const COLOR_CLASSES: Record<MarkerColor, string> = {
  red: 'bg-[var(--red)]',
  blue: 'bg-[var(--blue)]',
  yellow: 'bg-[var(--yellow)]',
};

export function Marker({ color, index, className = '', ...props }: MarkerProps) {
  const resolvedColor: MarkerColor =
    color ?? (index !== undefined ? ROTATION_COLORS[Math.abs(index) % ROTATION_COLORS.length] : 'red');

  return (
    <span
      className={`inline-block w-2 h-2 shrink-0 rounded-[1px] ${COLOR_CLASSES[resolvedColor]} ${className}`.trim()}
      aria-hidden="true"
      {...props}
    />
  );
}

export default Marker;
