import type { GarmentName } from '@/components/Garment';

export type TileColor = 'red' | 'blue' | 'yellow' | 'ink';

export interface SpecimenInfo {
  categorySlug: string;
  subSlug: string;
  garment: GarmentName;
  color: TileColor;
  photo?: string | null;
  label: string;
  ageRange: string;
}

/**
 * Authentic specimen tiles mapping every catalogue category and subcategory
 * to one of 17 flat garment silhouettes and rotating authentic store colors.
 * Photo is populated only when an authentic rack photograph exists in public/.
 */
export const SPECIMEN_MAP: Record<string, SpecimenInfo> = {
  // Newborn (0-24M)
  'newborn/bodysuits-jhablas': {
    categorySlug: 'newborn',
    subSlug: 'bodysuits-jhablas',
    garment: 'jhabla',
    color: 'yellow',
    photo: '/products/nb-bodysuit.webp',
    label: 'Bodysuits & Jhablas',
    ageRange: '0–24M',
  },
  'newborn/rompers-sleepsuits': {
    categorySlug: 'newborn',
    subSlug: 'rompers-sleepsuits',
    garment: 'romper',
    color: 'blue',
    photo: '/products/nb-romper.webp',
    label: 'Rompers & Sleepsuits',
    ageRange: '0–24M',
  },
  'newborn/swaddles-blankets': {
    categorySlug: 'newborn',
    subSlug: 'swaddles-blankets',
    garment: 'swaddle',
    color: 'red',
    photo: '/products/nb-swaddle.webp',
    label: 'Swaddles & Blankets',
    ageRange: '0–12M',
  },
  'newborn/bath-towels': {
    categorySlug: 'newborn',
    subSlug: 'bath-towels',
    garment: 'towel',
    color: 'yellow',
    photo: '/products/nb-towel.webp',
    label: 'Bath Towels & Wraps',
    ageRange: '0–24M',
  },
  'newborn/caps-mittens-booties': {
    categorySlug: 'newborn',
    subSlug: 'caps-mittens-booties',
    garment: 'cap-mittens',
    color: 'blue',
    photo: '/products/nb-accessories.webp',
    label: 'Caps, Mittens & Booties',
    ageRange: '0–6M',
  },

  // Boys (0-16Y)
  'boys/t-shirts-shirts': {
    categorySlug: 'boys',
    subSlug: 't-shirts-shirts',
    garment: 'tshirt',
    color: 'red',
    photo: '/products/by-tee.webp',
    label: 'T-Shirts & Shirts',
    ageRange: '0–16Y',
  },
  'boys/shorts-joggers-cargos': {
    categorySlug: 'boys',
    subSlug: 'shorts-joggers-cargos',
    garment: 'shorts',
    color: 'yellow',
    photo: '/products/by-cargos.webp',
    label: 'Shorts & Cargos',
    ageRange: '0–16Y',
  },
  'boys/jeans-trousers': {
    categorySlug: 'boys',
    subSlug: 'jeans-trousers',
    garment: 'jeans',
    color: 'blue',
    photo: null,
    label: 'Jeans & Trousers',
    ageRange: '2–16Y',
  },
  'boys/nightwear': {
    categorySlug: 'boys',
    subSlug: 'nightwear',
    garment: 'nightsuit',
    color: 'ink',
    photo: '/products/by-nightsuit.webp',
    label: 'Nightwear Sets',
    ageRange: '0–16Y',
  },
  'boys/sportswear-cricket-whites': {
    categorySlug: 'boys',
    subSlug: 'sportswear-cricket-whites',
    garment: 'sportswear',
    color: 'red',
    photo: '/products/by-cricket.webp',
    label: 'Sportswear & Cricket Whites',
    ageRange: '4–16Y',
  },
  'boys/hoodies-jackets': {
    categorySlug: 'boys',
    subSlug: 'hoodies-jackets',
    garment: 'hoodie',
    color: 'blue',
    photo: '/products/by-layering.webp',
    label: 'Hoodies & Jackets',
    ageRange: '2–16Y',
  },
  'boys/thermals-innerwear-socks': {
    categorySlug: 'boys',
    subSlug: 'thermals-innerwear-socks',
    garment: 'thermals',
    color: 'yellow',
    photo: null,
    label: 'Thermals & Innerwear',
    ageRange: '0–16Y',
  },
  'boys/swimwear': {
    categorySlug: 'boys',
    subSlug: 'swimwear',
    garment: 'swimwear',
    color: 'ink',
    photo: null,
    label: 'Swimwear & Trunks',
    ageRange: '2–16Y',
  },

  // Girls (0-16Y)
  'girls/dresses-frocks': {
    categorySlug: 'girls',
    subSlug: 'dresses-frocks',
    garment: 'frock',
    color: 'red',
    photo: '/products/gl-dress.webp',
    label: 'Dresses & Frocks',
    ageRange: '0–16Y',
  },
  'girls/tops': {
    categorySlug: 'girls',
    subSlug: 'tops',
    garment: 'tshirt',
    color: 'yellow',
    photo: '/products/gl-top.webp',
    label: 'Tops & Tees',
    ageRange: '0–16Y',
  },
  'girls/leggings-tights': {
    categorySlug: 'girls',
    subSlug: 'leggings-tights',
    garment: 'leggings',
    color: 'blue',
    photo: '/products/gl-leggings.webp',
    label: 'Leggings & Tights',
    ageRange: '0–16Y',
  },
  'girls/nightwear': {
    categorySlug: 'girls',
    subSlug: 'nightwear',
    garment: 'nightsuit',
    color: 'ink',
    photo: '/products/gl-nightsuit.webp',
    label: 'Nightwear Sets',
    ageRange: '0–16Y',
  },
  'girls/hoodies-jackets': {
    categorySlug: 'girls',
    subSlug: 'hoodies-jackets',
    garment: 'hoodie',
    color: 'red',
    photo: '/products/gl-jacket.webp',
    label: 'Hoodies & Jackets',
    ageRange: '2–16Y',
  },
  'girls/innerwear-socks': {
    categorySlug: 'girls',
    subSlug: 'innerwear-socks',
    garment: 'thermals',
    color: 'yellow',
    photo: null,
    label: 'Innerwear & Socks',
    ageRange: '0–16Y',
  },
  'girls/sportswear': {
    categorySlug: 'girls',
    subSlug: 'sportswear',
    garment: 'sportswear',
    color: 'blue',
    photo: '/products/gl-sportswear.webp',
    label: 'Sportswear & Active',
    ageRange: '4–16Y',
  },
  'girls/swimwear': {
    categorySlug: 'girls',
    subSlug: 'swimwear',
    garment: 'swimwear',
    color: 'ink',
    photo: null,
    label: 'Swimwear & Costumes',
    ageRange: '2–16Y',
  },

  // Men
  'men/innerwear': {
    categorySlug: 'men',
    subSlug: 'innerwear',
    garment: 'thermals',
    color: 'blue',
    photo: null,
    label: 'Innerwear & Vests',
    ageRange: 'S–XXL',
  },
  'men/t-shirts': {
    categorySlug: 'men',
    subSlug: 't-shirts',
    garment: 'tshirt',
    color: 'red',
    photo: '/products/mn-tee.webp',
    label: 'Cotton T-Shirts',
    ageRange: 'S–XXL',
  },
  'men/shorts-track-pants': {
    categorySlug: 'men',
    subSlug: 'shorts-track-pants',
    garment: 'shorts',
    color: 'yellow',
    photo: '/products/mn-shorts.webp',
    label: 'Shorts & Trackpants',
    ageRange: 'S–XXL',
  },
  'men/gym-wear': {
    categorySlug: 'men',
    subSlug: 'gym-wear',
    garment: 'sportswear',
    color: 'ink',
    photo: null,
    label: 'Gym Wear & Active',
    ageRange: 'S–XXL',
  },
  'men/thermals': {
    categorySlug: 'men',
    subSlug: 'thermals',
    garment: 'thermals',
    color: 'blue',
    photo: null,
    label: 'Winter Thermals',
    ageRange: 'S–XXL',
  },
  'men/socks-handkerchiefs': {
    categorySlug: 'men',
    subSlug: 'socks-handkerchiefs',
    garment: 'thermals',
    color: 'red',
    photo: null,
    label: 'Socks & Handkerchiefs',
    ageRange: 'Free Size',
  },

  // Women
  'women/nightsuits': {
    categorySlug: 'women',
    subSlug: 'nightsuits',
    garment: 'nightsuit',
    color: 'red',
    photo: '/products/wm-muslin-set.webp',
    label: 'Nightsuits & Lounge',
    ageRange: 'S–XXL',
  },
  'women/leggings-tights': {
    categorySlug: 'women',
    subSlug: 'leggings-tights',
    garment: 'leggings',
    color: 'yellow',
    photo: '/products/wm-leggings.webp',
    label: 'Leggings & Tights',
    ageRange: 'S–XXL',
  },
  'women/tops-kaftans': {
    categorySlug: 'women',
    subSlug: 'tops-kaftans',
    garment: 'kaftan',
    color: 'blue',
    photo: '/products/wm-kaftan.webp',
    label: 'Tops & Kaftans',
    ageRange: 'S–XXL',
  },
  'women/t-shirts': {
    categorySlug: 'women',
    subSlug: 't-shirts',
    garment: 'tshirt',
    color: 'ink',
    photo: '/products/wm-top.webp',
    label: 'Everyday T-Shirts',
    ageRange: 'S–XXL',
  },
  'women/gym-wear': {
    categorySlug: 'women',
    subSlug: 'gym-wear',
    garment: 'sportswear',
    color: 'red',
    photo: null,
    label: 'Active & Gym Wear',
    ageRange: 'S–XXL',
  },
  'women/innerwear': {
    categorySlug: 'women',
    subSlug: 'innerwear',
    garment: 'thermals',
    color: 'yellow',
    photo: null,
    label: 'Cotton Innerwear',
    ageRange: 'S–XXL',
  },
  'women/socks-thermals': {
    categorySlug: 'women',
    subSlug: 'socks-thermals',
    garment: 'thermals',
    color: 'blue',
    photo: null,
    label: 'Thermals & Socks',
    ageRange: 'Free Size',
  },

  // Uniforms / Bulk
  'bulk/school-uniforms': {
    categorySlug: 'bulk',
    subSlug: 'school-uniforms',
    garment: 'uniform',
    color: 'blue',
    photo: '/products/bk-uniform.webp',
    label: 'School Uniforms',
    ageRange: 'All Sizes',
  },
  'bulk/cricket-kits': {
    categorySlug: 'bulk',
    subSlug: 'cricket-kits',
    garment: 'sportswear',
    color: 'red',
    photo: '/products/bk-cricket-kit.webp',
    label: 'Cricket Whites & Kits',
    ageRange: 'All Sizes',
  },
};

/**
 * Category-level default specimen definitions
 */
export const CATEGORY_SPECIMENS: Record<string, SpecimenInfo> = {
  newborn: {
    categorySlug: 'newborn',
    subSlug: 'all',
    garment: 'jhabla',
    color: 'yellow',
    photo: '/categories/newborn.webp',
    label: 'Newborn',
    ageRange: '0–24 months',
  },
  boys: {
    categorySlug: 'boys',
    subSlug: 'all',
    garment: 'tshirt',
    color: 'blue',
    photo: '/categories/boys.webp',
    label: 'Boys',
    ageRange: '0–16 years',
  },
  girls: {
    categorySlug: 'girls',
    subSlug: 'all',
    garment: 'frock',
    color: 'red',
    photo: '/categories/girls.webp',
    label: 'Girls',
    ageRange: '0–16 years',
  },
  men: {
    categorySlug: 'men',
    subSlug: 'all',
    garment: 'tshirt',
    color: 'ink',
    photo: '/categories/men.webp',
    label: 'Men',
    ageRange: 'Basics & Innerwear',
  },
  women: {
    categorySlug: 'women',
    subSlug: 'all',
    garment: 'kaftan',
    color: 'red',
    photo: '/categories/women.webp',
    label: 'Women',
    ageRange: 'Nightwear & Comfort',
  },
  uniforms: {
    categorySlug: 'bulk',
    subSlug: 'school-uniforms',
    garment: 'uniform',
    color: 'blue',
    photo: '/categories/bulk.webp',
    label: 'Uniforms & Bulk',
    ageRange: 'Schools & Sports',
  },
  bulk: {
    categorySlug: 'bulk',
    subSlug: 'school-uniforms',
    garment: 'uniform',
    color: 'blue',
    photo: '/categories/bulk.webp',
    label: 'Uniforms & Bulk',
    ageRange: 'Schools & Sports',
  },
};

/**
 * Helper to get specimen for any category and optional subcategory
 */
export function getSpecimen(categorySlug: string, subSlug?: string): SpecimenInfo {
  if (subSlug) {
    const key = `${categorySlug}/${subSlug}`;
    if (SPECIMEN_MAP[key]) return SPECIMEN_MAP[key];
  }
  if (CATEGORY_SPECIMENS[categorySlug]) {
    return CATEGORY_SPECIMENS[categorySlug];
  }
  // Safe fallback
  return {
    categorySlug,
    subSlug: subSlug || 'default',
    garment: 'tshirt',
    color: 'blue',
    photo: null,
    label: subSlug || categorySlug,
    ageRange: '',
  };
}
