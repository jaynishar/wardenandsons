import React from 'react';

export type GarmentName =
  | 'jhabla'
  | 'romper'
  | 'swaddle'
  | 'towel'
  | 'cap-mittens'
  | 'tshirt'
  | 'shorts'
  | 'jeans'
  | 'nightsuit'
  | 'sportswear'
  | 'hoodie'
  | 'thermals'
  | 'swimwear'
  | 'frock'
  | 'leggings'
  | 'kaftan'
  | 'uniform';

export interface GarmentProps extends React.SVGProps<SVGSVGElement> {
  name: GarmentName;
  className?: string;
}

/**
 * Garment component referencing the central GarmentSprite symbols
 * 400x500 box, centered flat graphic, no outlines or gradients
 */
export function Garment({ name, className = 'w-full h-full', ...props }: GarmentProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      aria-hidden={!props['aria-label']}
      {...props}
    >
      <use href={`#g-${name}`} />
    </svg>
  );
}

export default Garment;
