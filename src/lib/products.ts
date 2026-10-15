/**
 * Warden & Sons Kids Wear — Catalogue & Representative Offerings
 *
 * NOTE ON CATALOGUE HONESTY:
 * Warden & Sons carries a broad, daily-rotating physical inventory at Kemps Corner.
 * Rather than displaying fabricated prices or AI-invented individual stock levels,
 * this catalogue presents authentic department categories and representative clothing types.
 *
 * Actual designs, colors, fabrics, sizes, and pricing are confirmed directly by the
 * shop team on WhatsApp with real photographs and measuring-tape verifications.
 */

export type CategorySlug = 'newborn' | 'boys' | 'girls' | 'men' | 'women' | 'bulk';

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  ageOrSizeRange: string;
  summary: string;
  typicalItems: string[];
  image: string;
}

export interface CatalogueItem {
  id: string;
  title: string;
  category: CategorySlug;
  subCategory: string;
  ageOrSizeRange: string;
  fabricDetails: string;
  description: string;
  image: string;
  isRepresentativeSample: true;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    slug: 'newborn',
    name: 'Newborns & Infants',
    ageOrSizeRange: '0 – 24 Months',
    summary:
      'Ultra-soft, breathable combed cotton jhablas, bodysuits, muslin swaddles, rompers, bath towels, and infant accessories designed for sensitive newborn skin.',
    typicalItems: [
      'Bodysuits & Onesies',
      'Muslin Swaddle Blankets',
      'Traditional Jhablas & Nappies',
      'Hooded Towels & Washcloths',
      'Rompers & Sleepsuits',
      'Caps, Mittens & Booties',
      'Teething Bandana Bibs',
    ],
    image: '/store_front.jpg',
  },
  {
    slug: 'boys',
    name: 'Boys’ Wear',
    ageOrSizeRange: '0 – 16 Years',
    summary:
      'Durable, breathable everyday cotton playwear, comfortable nightsuits, sportswear, cargo joggers, and classic cricket whites built for active children.',
    typicalItems: [
      'Everyday Cotton T-Shirts',
      'Sports Dryfit Coordinate Sets',
      'Cricket Whites & Academy Kits',
      'Hosiery Cotton Nightsuits',
      'Twill Cargo Joggers & Shorts',
      'Light Cotton Hoodies & Shackets',
      'Tagless Cotton Innerwear',
    ],
    image: '/store_front.jpg',
  },
  {
    slug: 'girls',
    name: 'Girls’ Wear',
    ageOrSizeRange: '0 – 16 Years',
    summary:
      'Airy cotton and muslin summer dresses, comfortable notched-collar nightsuits, everyday tops, stretch leggings, and light layering jackets.',
    typicalItems: [
      'Muslin Summer Frocks & Dresses',
      'Soft Hosiery Nightsuit Sets',
      'Casual Cotton Tops & Voiles',
      'Cotton Lycra Stretch Leggings',
      'Active Sportswear & Cycling Shorts',
      'Cotton Cardigans & Denim Jackets',
    ],
    image: '/store_front.jpg',
  },
  {
    slug: 'men',
    name: 'Men’s Basics & Loungewear',
    ageOrSizeRange: 'Sizes S – XXL',
    summary:
      'High-grade everyday cotton essentials including crew-neck tees, breathable gym shorts, durable track pants, and comfortable sleep pajamas.',
    typicalItems: [
      'Heavyweight Cotton Crew Tees',
      'Cotton Lounge & Gym Shorts',
      'Interlock Cotton Track Pants',
      'Woven Poplin Sleep Pajamas',
      'Ribbed Athletic Undershirts',
    ],
    image: '/store_front.jpg',
  },
  {
    slug: 'women',
    name: 'Women’s Basics & Loungewear',
    ageOrSizeRange: 'Sizes S – XXL',
    summary:
      'Breezy double-layer muslin nightwear, opaque cotton Lycra leggings, relaxed-fit slub tops, kaftans, and lightweight cotton slip shorts.',
    typicalItems: [
      'Double-Layer Muslin Night Suits',
      'Opaque Cotton Lycra Leggings',
      'Free-Size Cotton Slub Tops',
      'Hand-Dyed Cotton Kaftans',
      'Cotton Everyday Cycling Shorts',
    ],
    image: '/store_front.jpg',
  },
  {
    slug: 'bulk',
    name: 'Custom Uniforms & Bulk Orders',
    ageOrSizeRange: 'Schools, Academies & Teams',
    summary:
      'Bespoke school uniform manufacturing, cricket coaching whites, athletic event jerseys, and institutional clothing tailored to institutional specifications.',
    typicalItems: [
      'School Uniform Shirts & Trousers',
      'School Skirts & Pinafores',
      'Cricket Academy Whites',
      'Dryfit Sports & House T-Shirts',
      'Annual Day & Event Apparel',
    ],
    image: '/store_front.jpg',
  },
];

export const CATALOGUE_ITEMS: CatalogueItem[] = [
  // ==================== NEWBORN & INFANTS ====================
  {
    id: 'cat-nb-01',
    title: 'Pure Combed Cotton Bodysuits & Jhablas',
    category: 'newborn',
    subCategory: 'Bodysuits & Jhablas',
    ageOrSizeRange: '0-3M, 3-6M, 6-12M, 12-18M',
    fabricDetails: '100% Organic Combed Cotton',
    description:
      'Envelope necklines and nickel-free snap closures for gentle diaper changes. Soft, pre-washed, chemical-free cotton suited for delicate newborn skin.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-nb-02',
    title: 'Open-Weave Double-Gauze Muslin Swaddles',
    category: 'newborn',
    subCategory: 'Swaddles & Blankets',
    ageOrSizeRange: 'Generous 47" x 47" Size',
    fabricDetails: '100% Breathable Muslin Cotton',
    description:
      'Lightweight open-weave swaddle blanket that prevents heat buildup in Mumbai’s humid coastal climate. Gets softer with each wash.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-nb-03',
    title: 'Plush Hooded Baby Towel & Washcloth Set',
    category: 'newborn',
    subCategory: 'Bath & Towels',
    ageOrSizeRange: 'Infants & Toddlers',
    fabricDetails: 'Pure Cotton Terry (High Absorbency)',
    description:
      'Absorbent hooded bath towel to gently wrap newborns dry instantly after bathing. Soft corner hood keeps baby warm.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-nb-04',
    title: 'Breezy Muslin Daytime Rompers',
    category: 'newborn',
    subCategory: 'Rompers',
    ageOrSizeRange: '0-3M to 18-24M',
    fabricDetails: 'Double-Layer Muslin Cotton',
    description:
      'Sleeveless and short-sleeve daytime rompers with easy crotch snaps. Roomy cut that comfortably fits both cloth and disposable diapers.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-nb-05',
    title: 'Baby Scratch Mittens, Caps & Booties Kit',
    category: 'newborn',
    subCategory: 'Accessories',
    ageOrSizeRange: '0-3M, 3-6M',
    fabricDetails: '100% Cotton Rib-Knit',
    description:
      'Protects delicate newborn faces from fingernail scratches. Soft ribbed cuffs stay secure without leaving tight elastic marks.',
    image: '/brand_logo.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-nb-06',
    title: 'Cotton Zip-Up Sleepsuits & Sleepers',
    category: 'newborn',
    subCategory: 'Sleepsuits',
    ageOrSizeRange: '3-6M, 6-12M, 12-18M, 18-24M',
    fabricDetails: '100% Interlock Cotton',
    description:
      'Two-way zip sleepers with protective chin guard for easy late-night diaper checks. Tagless collars prevent neckline irritation.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },

  // ==================== BOYS' WEAR ====================
  {
    id: 'cat-by-01',
    title: 'Everyday Combed Cotton T-Shirts',
    category: 'boys',
    subCategory: 'T-Shirts',
    ageOrSizeRange: '2-3Y to 13-16Y',
    fabricDetails: '180 GSM Pure Combed Cotton',
    description:
      'Opaque, durable everyday tees in solid neutrals and subtle prints. Pre-shrunk to retain shape through regular school and play cycles.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-by-02',
    title: 'Dryfit Active Sportswear Quad-Sets',
    category: 'boys',
    subCategory: 'Sportswear',
    ageOrSizeRange: '4-5Y to 13-16Y',
    fabricDetails: 'Microfiber Active Wicking Polyester',
    description:
      'Moisture-wicking athletic t-shirt and shorts coordinate set. Ideal for Mumbai football turfs, coaching academies, and sports days.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-by-03',
    title: 'Match Cricket Whites Kit (Polo & Pants)',
    category: 'boys',
    subCategory: 'Sportswear & Academy',
    ageOrSizeRange: '6-7Y to 13-16Y',
    fabricDetails: 'Breathable Poly-Cotton Blend',
    description:
      'Polo-collar match jersey with reinforced pants. Tailored specifically for morning cricket academy training at local Mumbai maidaans.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-by-04',
    title: 'Stretchy Cotton Hosiery Nightsuits',
    category: 'boys',
    subCategory: 'Nightwear',
    ageOrSizeRange: '2-3Y to 13-16Y',
    fabricDetails: '100% Knitted Cotton Hosiery',
    description:
      'Button-down shirt and relaxed pajama set with non-pinching elastic waistbands. Gentle on active skin for restful sleep.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-by-05',
    title: 'Cotton Twill Cargo Joggers & Shorts',
    category: 'boys',
    subCategory: 'Bottoms',
    ageOrSizeRange: '4-5Y to 13-16Y',
    fabricDetails: '100% Breathable Cotton Twill',
    description:
      'Rugged, multi-pocket cargo pants and casual shorts with adjustable drawstring waists. Ideal for evening outdoor play.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-by-06',
    title: 'Lightweight French Terry Zip Hoodies',
    category: 'boys',
    subCategory: 'Winterwear & Layering',
    ageOrSizeRange: '4-5Y to 13-16Y',
    fabricDetails: 'Unbrushed Cotton French Terry',
    description:
      'Light zip-up sweater suited for mild Mumbai winter mornings, AC study rooms, and travel.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },

  // ==================== GIRLS’ WEAR ====================
  {
    id: 'cat-gr-01',
    title: 'Hand-Block & Floral Muslin Summer Frocks',
    category: 'girls',
    subCategory: 'Dresses',
    ageOrSizeRange: '2-3Y to 10-12Y',
    fabricDetails: '100% Double-Layer Muslin Cotton',
    description:
      'Airy A-line summer dresses with delicate flutter sleeves. Designed with generous cuts to allow natural movement and prevent underarm chafing.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-gr-02',
    title: 'Soft Hosiery Pajama Nightsuit Sets',
    category: 'girls',
    subCategory: 'Nightwear',
    ageOrSizeRange: '2-3Y to 13-16Y',
    fabricDetails: 'Knitted Hosiery Cotton',
    description:
      'Comfortable sleepwear sets with non-roll soft waistbands and tagless collars to prevent itching during warm nights.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-gr-03',
    title: 'Frilled Cotton Voile Tops & Tunics',
    category: 'girls',
    subCategory: 'Tops',
    ageOrSizeRange: '2-3Y to 10-12Y',
    fabricDetails: '100% Pure Cotton Voile',
    description:
      'Lightweight summer tops featuring neat gathered shoulder ruffles and breathable cuts for tropical warmth.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-gr-04',
    title: 'Cotton Lycra Stretch Leggings & Tights',
    category: 'girls',
    subCategory: 'Bottoms',
    ageOrSizeRange: '2-3Y to 13-16Y',
    fabricDetails: '95% Combed Cotton, 5% Elastane',
    description:
      'Opaque 4-way stretch leggings with non-digging waistbands. Resilient for dance practice, school sports, and everyday wear.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-gr-05',
    title: 'Active Cycling Shorts & Top Sets',
    category: 'girls',
    subCategory: 'Sportswear',
    ageOrSizeRange: '4-5Y to 13-16Y',
    fabricDetails: 'Sweat-Wicking Microfiber & Cotton',
    description:
      'Flexible workout set for tennis, gymnastics, sports drills, and playground activities. Dries rapidly after wash.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-gr-06',
    title: 'Pre-Washed Soft Denim Shackets',
    category: 'girls',
    subCategory: 'Winterwear & Layering',
    ageOrSizeRange: '4-5Y to 13-16Y',
    fabricDetails: 'Enzyme-Washed Soft Cotton Denim',
    description:
      'Lightweight, wind-resistant outer layer that feels buttery soft against arms rather than stiff and heavy.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },

  // ==================== MEN’S BASICS ====================
  {
    id: 'cat-mn-01',
    title: 'Men’s Heavyweight Cotton Crew T-Shirts',
    category: 'men',
    subCategory: 'Plain T-Shirts',
    ageOrSizeRange: 'Sizes S, M, L, XL, XXL',
    fabricDetails: '180 GSM Combed Cotton',
    description:
      'Solid non-transparent everyday crew tees. Opaque, durable, and highly absorbent in humid Mumbai heat.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-mn-02',
    title: 'Double-Knit Cotton Gym & Lounge Shorts',
    category: 'men',
    subCategory: 'Shorts',
    ageOrSizeRange: 'Sizes S, M, L, XL, XXL',
    fabricDetails: 'Double-Knit Cotton Hosiery',
    description:
      'Features deep zippered pockets and a wide adjustable drawstring waist for gym workouts or home comfort.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-mn-03',
    title: 'Breathable Cotton Interlock Track Pants',
    category: 'men',
    subCategory: 'Track Pants',
    ageOrSizeRange: 'Sizes S, M, L, XL, XXL',
    fabricDetails: '100% Interlock Cotton',
    description:
      'Tapered joggers with zippered side pockets. Retains color and elasticity through repeated machine washes.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-mn-04',
    title: 'Classic Poplin Cotton Sleepwear Pajamas',
    category: 'men',
    subCategory: 'Nightwear',
    ageOrSizeRange: 'Sizes S, M, L, XL, XXL',
    fabricDetails: '100% Crisp Cotton Poplin',
    description:
      'Button-down shirt and relaxed-cut trousers with dual pockets and fly button for cool, comfortable night sleep.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },

  // ==================== WOMEN’S BASICS ====================
  {
    id: 'cat-wm-01',
    title: 'Double-Layer Muslin Notched Pajama Sets',
    category: 'women',
    subCategory: 'Night Suits',
    ageOrSizeRange: 'Sizes S, M, L, XL',
    fabricDetails: '100% Pure Double-Gauze Muslin',
    description:
      'Notched-collar button-down shirt with straight-leg trousers. High-breathability sleepwear suited for hot weather.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-wm-02',
    title: 'Premium Opaque Cotton Lycra Leggings',
    category: 'women',
    subCategory: 'Leggings',
    ageOrSizeRange: 'Free Size (Comfort Stretch)',
    fabricDetails: '95% Combed Cotton, 5% Lycra',
    description:
      'Matte black ankle leggings with a wide contour waistband that resists pilling and sagging at knees.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-wm-03',
    title: 'Cotton Slub Relaxed Lounge Tops & Kaftans',
    category: 'women',
    subCategory: 'Loungewear & Tops',
    ageOrSizeRange: 'Free Size (Fitted S - XL)',
    fabricDetails: '180 GSM Soft Slub Cotton / Mulmul',
    description:
      'Drop-shoulder relaxed silhouettes and airy kaftans with adjustable waist ties for effortless daily comfort.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-wm-04',
    title: 'Everyday Cotton Anti-Chafing Slip Shorts',
    category: 'women',
    subCategory: 'Innerwear & Bottoms',
    ageOrSizeRange: 'Sizes S, M, L, XL',
    fabricDetails: '95% Cotton, 5% Spandex',
    description:
      'Mid-thigh modesty shorts designed to be worn comfortably beneath dresses, tunics, and kurtas.',
    image: '/brand_logo.jpg',
    isRepresentativeSample: true,
  },

  // ==================== BULK & INSTITUTIONAL ====================
  {
    id: 'cat-bk-01',
    title: 'Bespoke School Uniforms (Shirts, Pinafores & Trousers)',
    category: 'bulk',
    subCategory: 'School Uniforms',
    ageOrSizeRange: 'Nursery to Standard XII',
    fabricDetails: 'Durable Poly-Cotton & Pure Cotton Weaves',
    description:
      'Custom school uniforms with bespoke pocket crest embroidery, color-matched trims, and reinforced stitching.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
  {
    id: 'cat-bk-02',
    title: 'Academy Sports Kits & House T-Shirts',
    category: 'bulk',
    subCategory: 'Sports & Event Apparel',
    ageOrSizeRange: 'All Junior & Senior Sizes',
    fabricDetails: 'Moisture-Wicking Dryfit & 180 GSM Cotton',
    description:
      'Sublimation-printed and screen-printed athletic shirts, shorts, and tracksuits for sports days, tournaments, and annual events.',
    image: '/store_front.jpg',
    isRepresentativeSample: true,
  },
];

// Helper functions
export function getAllCategories(): CategoryInfo[] {
  return CATEGORIES_DATA;
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES_DATA.find((c) => c.slug === slug);
}

export function getAllCatalogueItems(): CatalogueItem[] {
  return CATALOGUE_ITEMS;
}

export function getCatalogueItemsByCategory(category: CategorySlug): CatalogueItem[] {
  return CATALOGUE_ITEMS.filter((item) => item.category === category);
}

export function getCatalogueItemById(id: string): CatalogueItem | undefined {
  return CATALOGUE_ITEMS.find((item) => item.id === id);
}

export function getFeaturedCatalogueItems(count = 6): CatalogueItem[] {
  const featuredIds = ['cat-nb-01', 'cat-by-01', 'cat-gr-01', 'cat-nb-02', 'cat-by-02', 'cat-wm-01'];
  return CATALOGUE_ITEMS.filter((item) => featuredIds.includes(item.id)).slice(0, count);
}

// Backward compatibility alias for any existing imports
export type Product = CatalogueItem;
export const productsData = CATALOGUE_ITEMS;
export const getAllProducts = getAllCatalogueItems;
export const getProductsByCategory = (cat: CategorySlug) => getCatalogueItemsByCategory(cat);
export const getProductById = getCatalogueItemById;
export const getFeaturedProducts = getFeaturedCatalogueItems;
