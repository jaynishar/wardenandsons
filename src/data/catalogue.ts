import { CATALOGUE_ITEMS, type CatalogueItem } from '@/lib/products';

export interface CategoryIntroSection {
  heading: string;
  body: string;
}

export interface CategorySeo {
  title: string;
  description: string;
  h1: string;
  subheading?: string;
  introSections?: CategoryIntroSection[];
}

export interface Category {
  slug: string;
  label: string;
  group: 'kids' | 'adult';
  ageLine: string;
  ageOptions: string[];
  photo?: string | null;
  seo: CategorySeo;
}

export interface Subcategory {
  categorySlug: string;
  slug: string;
  label: string;
  ageOptions?: string[]; // Inherit from category if undefined
  photo?: string | null;
  seoDescription: string;
  searchTerms: string[];
  priceFrom: number | null; // Stays null unless owner-inputs holds real price
  styleIds: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'newborn',
    label: 'Newborn',
    group: 'kids',
    ageLine: '0–24 months',
    ageOptions: ['0-3M', '3-6M', '6-12M', '12-18M', '18-24M'],
    photo: '/categories/newborn.webp',
    seo: {
      title: 'Newborn Baby Clothes & Swaddles Mumbai | Warden & Sons',
      description:
        'Breathable combed cotton jhablas, onesies, rompers, and muslin swaddles for babies 0-24M. Request live photos from our Kemps Corner store racks.',
      h1: 'Newborn & Infant Clothes (0–24 Months)',
      subheading: 'Cotton basics, muslin swaddles, and everyday comfort for babies.',
      introSections: [
        {
          heading: 'Breathable Coastal Cotton Fabrics',
          body: 'Crafted from combed cotton and double-layer open-weave muslin. Soft fabrics suited for Mumbai’s humid coastal weather. Seams are stitched flat and care tags are placed away from sensitive newborn skin.',
        },
        {
          heading: 'Stages & Infant Sizing',
          body: 'Sized carefully for infants from birth up to 24 months across 0-3M, 3-6M, 6-12M, 12-18M, and 18-24M stages. Generous diaper-rise room is built into all onesies and rompers.',
        },
        {
          heading: 'Fit & Measurement Assistance',
          body: 'Babies grow quickly during the first six months. We suggest taking one size larger for sleepsuits to allow comfortable layering over cloth nappies. On WhatsApp, simply mention your baby’s age or approximate weight, and our shop team will verify dimensions with a physical measuring tape before packing.',
        },
      ],
    },
  },
  {
    slug: 'boys',
    label: 'Boys',
    group: 'kids',
    ageLine: '0–16 years',
    ageOptions: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y', '13-16Y'],
    photo: '/categories/boys.webp',
    seo: {
      title: "Boys' Clothes, 0-16 Years, Mumbai | Warden & Sons",
      description:
        'Durable combed cotton t-shirts, cargo shorts, cricket whites, and nightsuits for boys 0-16 years. Check counter tape sizing directly on WhatsApp.',
      h1: 'Boys Playwear & Clothes (0–16 Years)',
      subheading: 'Breathable cotton t-shirts, shorts, track pants, and nightsuits.',
      introSections: [
        {
          heading: 'Durable Everyday Fabrics',
          body: 'High-durability 180 to 220 GSM single-jersey cotton for t-shirts, reinforced cotton twill for cargo shorts, and 100% combed hosiery cotton for nightwear. Breathable everyday fabrics keep boys cool while playing outdoors in Mumbai’s heat.',
        },
        {
          heading: 'Age Ranges & Proportions',
          body: 'Full coverage from toddlers (0-2Y), junior boys (2-8Y), to older boys and teenagers (8-16Y). Available across standard Indian numbered sizes 20, 22-24, 26, 28-30, 32, and 34-36. Tops feature reinforced collar ribbing and double-needle hems.',
        },
        {
          heading: 'Fit & WhatsApp Tape Verification',
          body: 'Active boys need room through the shoulders and chest. For shorts and joggers, our waistbands feature soft ribbed elastic with functional drawstrings. When sending your Request List on WhatsApp, tell us your boy’s age and approximate height, and we will measure flat chest and length dimensions for you.',
        },
      ],
    },
  },
  {
    slug: 'girls',
    label: 'Girls',
    group: 'kids',
    ageLine: '0–16 years',
    ageOptions: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y', '13-16Y'],
    photo: '/categories/girls.webp',
    seo: {
      title: "Girls' Clothes, 0-16 Years, Mumbai | Warden & Sons",
      description:
        'Breathable cotton frocks, daily casual tops, leggings, and notched-collar nightsuits for girls 0-16 years. View current shop racks on WhatsApp.',
      h1: 'Girls Clothing & Sleepwear (0–16 Years)',
      subheading: 'Airy cotton dresses, comfortable nightsuits, tops, and leggings.',
      introSections: [
        {
          heading: 'Gentle Cotton & Breezy Weaves',
          body: 'Woven from fine combed cotton poplins, breezy cambric, and soft knit ribbing. Pre-washed fabrics stay soft after repeat laundering and keep cool in warm weather. Party and casual dresses include full cotton linings with zero scratching tulle touching the skin.',
        },
        {
          heading: 'Sizes & Silhouettes',
          body: 'Available across toddler (0-2Y), young girls (2-7Y), pre-teens (8-12Y), and teenage girls (13-16Y). Clean silhouettes with practical pockets and durable button closures.',
        },
        {
          heading: 'Fit & Length Assistance',
          body: 'For dresses, check shoulder-to-knee length. Our nightsuits are cut with a comfortable, relaxed fit for sleeping. Share your daughter’s height and chest measurement on WhatsApp, and our Kemps Corner store desk will confirm flat measurements directly.',
        },
      ],
    },
  },
  {
    slug: 'men',
    label: 'Men',
    group: 'adult',
    ageLine: 'Sizes S – XXL',
    ageOptions: ['S', 'M', 'L', 'XL', 'XXL'],
    photo: '/categories/men.webp',
    seo: {
      title: "Men's Cotton Loungewear & Basics | Warden & Sons",
      description:
        'Comfortable combed cotton crewneck t-shirts, lounge shorts, and woven pajama sets for men. Message our Kemps Corner shop desk for measurements.',
      h1: 'Men’s Cotton Loungewear & Basics',
      subheading: 'Combed cotton t-shirts, boxer shorts, and classic pajama sets.',
      introSections: [
        {
          heading: 'Heavyweight Cotton & Poplin Weaves',
          body: 'Constructed with 100% combed long-staple cotton jerseys and woven poplins. Pre-shrunk to prevent size loss in standard machine washing, ensuring airflow and all-day comfort in tropical temperatures.',
        },
        {
          heading: 'Adult Sizes S to 3XL',
          body: 'Available in adult sizes from Small to 3XL across solid crewneck t-shirts, relaxed lounge shorts, and traditional button-down pajama sets.',
        },
        {
          heading: 'Straight Cut Ease',
          body: 'Cut with a comfortable, straight drape rather than slim tailoring. If you prefer extra ease for lounging at home, select your usual collar or chest size. Our store team will gladly measure chest and waist dimensions on our counter tape.',
        },
      ],
    },
  },
  {
    slug: 'women',
    label: 'Women',
    group: 'adult',
    ageLine: 'Sizes S – XXL',
    ageOptions: ['S', 'M', 'L', 'XL', 'XXL'],
    photo: '/categories/women.webp',
    seo: {
      title: "Women's Muslin Sleepwear & Basics | Warden & Sons",
      description:
        'Soft double-gauze muslin pajama sets, breathable cotton tops, and comfortable daily leggings for women. Request live availability on WhatsApp.',
      h1: 'Women’s Muslin Sleepwear & Basics',
      subheading: 'Airy double-gauze muslin pajama sets, nightdresses, and cotton tops.',
      introSections: [
        {
          heading: 'Airy Double-Gauze Muslin',
          body: 'Soft double-gauze breathable cotton muslin and combed cotton knits. Extremely gentle on the skin, highly absorbent, and designed for comfortable sleep and daily home wear.',
        },
        {
          heading: 'Sizes XS to XXL',
          body: 'Offered in sizes XS through XXL across coordinated pajama sets, buttoned sleep shirts, and lightweight cotton casuals.',
        },
        {
          heading: 'Relaxed Silhouette Advice',
          body: 'Muslin fabrics have a natural, relaxed drape that softens with every wash. Let us know on WhatsApp whether you prefer a loose or standard fit, and our team will measure armhole, chest, and pant outseam lengths for you.',
        },
      ],
    },
  },
];

export const SUBCATEGORIES: Subcategory[] = [
  // ==========================================
  // NEWBORN
  // ==========================================
  {
    categorySlug: 'newborn',
    slug: 'bodysuits-jhablas',
    label: 'Bodysuits & Jhablas',
    seoDescription:
      'Pure combed cotton jhablas, wrap vests, and snap-bottom infant bodysuits for sensitive newborn skin.',
    searchTerms: [
      'jhabla',
      'jabla',
      'jhable',
      'bodysuit',
      'bodysuits',
      'onesie',
      'onesies',
      'vest',
      'vests',
      'cotton vest',
      'baby vest',
      'nappy',
      'diaper vest',
      'newborn top',
    ],
    priceFrom: null,
    styleIds: ['cat-nb-01'],
  },
  {
    categorySlug: 'newborn',
    slug: 'rompers-sleepsuits',
    label: 'Rompers & Sleepsuits',
    seoDescription:
      'Breathable muslin daytime rompers and two-way zipper sleepsuits for 0 to 24 month babies.',
    searchTerms: [
      'romper',
      'rompers',
      'sleepsuit',
      'sleepsuits',
      'sleeper',
      'footie',
      'dungaree',
      'baby suit',
      'play suit',
      'playsuit',
      'cotton romper',
      'muslin romper',
      'day suit',
    ],
    priceFrom: null,
    styleIds: ['cat-nb-04', 'cat-nb-06'],
  },
  {
    categorySlug: 'newborn',
    slug: 'swaddles-blankets',
    label: 'Swaddles & Blankets',
    seoDescription:
      'Generous open-weave double-gauze muslin swaddles and soft cotton receiving blankets.',
    searchTerms: [
      'swaddle',
      'swaddles',
      'swaddle wrap',
      'swaddling cloth',
      'baby blanket',
      'blanket',
      'blankets',
      'muslin cloth',
      'muslin swaddle',
      'double gauze',
      'wrap',
      'receiving blanket',
      'ac blanket',
    ],
    priceFrom: null,
    styleIds: ['cat-nb-02'],
  },
  {
    categorySlug: 'newborn',
    slug: 'bath-towels',
    label: 'Bath & Towels',
    seoDescription:
      'Plush combed cotton hooded baby bath towels and ultra-soft face washcloth sets.',
    searchTerms: [
      'bath towel',
      'baby towel',
      'towel',
      'towels',
      'hooded towel',
      'washcloth',
      'washcloths',
      'burp cloth',
      'napkin',
      'baby napkin',
      'cotton towel',
    ],
    priceFrom: null,
    styleIds: ['cat-nb-03'],
  },
  {
    categorySlug: 'newborn',
    slug: 'caps-mittens-booties',
    label: 'Caps, Mittens & Booties',
    seoDescription:
      'Soft scratch-prevention mittens, ribbed newborn knot caps, booties, and bandana bibs.',
    searchTerms: [
      'cap',
      'caps',
      'mittens',
      'scratch mittens',
      'booties',
      'bootie',
      'socks',
      'bib',
      'bibs',
      'bandana bib',
      'infant cap',
      'bonnet',
      'newborn kit',
      'accessories',
    ],
    priceFrom: null,
    styleIds: ['cat-nb-05'],
  },

  // ==========================================
  // BOYS
  // ==========================================
  {
    categorySlug: 'boys',
    slug: 't-shirts-shirts',
    label: 'T-shirts & Shirts',
    seoDescription:
      'Heavy-duty combed cotton daily tees, polo collars, and casual woven cotton shirts for boys.',
    searchTerms: [
      't-shirt',
      't shirt',
      'tshirt',
      'tshirts',
      'tee',
      'tees',
      'cotton t-shirt',
      'crew neck',
      'polo',
      'polo t-shirt',
      'casual shirt',
      'cotton shirt',
      'half sleeve shirt',
      'boys shirt',
    ],
    priceFrom: null,
    styleIds: ['cat-by-01'],
  },
  {
    categorySlug: 'boys',
    slug: 'shorts-joggers-cargos',
    label: 'Shorts, Joggers & Cargos',
    seoDescription:
      'Reinforced cotton twill cargo shorts, durable play joggers, and drawstring casual shorts.',
    searchTerms: [
      'shorts',
      'short',
      'cotton shorts',
      'cargo shorts',
      'cargos',
      'cargo',
      'cargo pant',
      'joggers',
      'jogger',
      'cotton joggers',
      'track pant',
      'track pants',
      'bermudas',
      'pants',
    ],
    priceFrom: null,
    styleIds: ['cat-by-05'],
  },
  {
    categorySlug: 'boys',
    slug: 'jeans-trousers',
    label: 'Jeans & Trousers',
    seoDescription:
      'Comfort-stretch denim jeans, soft cotton chinos, and smart trousers with adjustable waistbands.',
    searchTerms: [
      'jeans',
      'denim',
      'denim jeans',
      'trousers',
      'trouser',
      'cotton trousers',
      'chinos',
      'chino pants',
      'formal pants',
      'elastic waist jeans',
    ],
    priceFrom: null,
    styleIds: [],
  },
  {
    categorySlug: 'boys',
    slug: 'nightwear',
    label: 'Nightwear',
    seoDescription:
      'Two-piece combed hosiery cotton nightsuits, lounge shorts, and breathable sleep pants.',
    searchTerms: [
      'nightsuit',
      'night suit',
      'night suits',
      'nightwear',
      'pajama',
      'pajamas',
      'pyjama',
      'pyjamas',
      'sleepwear',
      'night dress',
      'cotton night suit',
      'hosiery nightsuit',
    ],
    priceFrom: null,
    styleIds: ['cat-by-04'],
  },
  {
    categorySlug: 'boys',
    slug: 'sportswear-cricket-whites',
    label: 'Sportswear & Cricket Whites',
    seoDescription:
      'Dryfit active sports coordinates and school academy match cricket whites (polo and pants).',
    searchTerms: [
      'cricket whites',
      'cricket uniform',
      'cricket kit',
      'cricket pant',
      'cricket polo',
      'sportswear',
      'sports kit',
      'dryfit',
      'active wear',
      'football jersey',
      'sports shorts',
      'house t-shirt',
      'pt uniform',
    ],
    priceFrom: null,
    styleIds: ['cat-by-02', 'cat-by-03'],
  },
  {
    categorySlug: 'boys',
    slug: 'hoodies-jackets',
    label: 'Hoodies & Jackets',
    seoDescription:
      'Lightweight French terry zipper hoodies, denim overshirts, and windbreakers for travel.',
    searchTerms: [
      'hoodie',
      'hoodies',
      'jacket',
      'jackets',
      'sweatshirt',
      'sweatshirts',
      'shacket',
      'denim jacket',
      'zipper hoodie',
      'cotton jacket',
      'winterwear',
      'light jacket',
    ],
    priceFrom: null,
    styleIds: ['cat-by-06'],
  },
  {
    categorySlug: 'boys',
    slug: 'thermals-innerwear-socks',
    label: 'Thermals, Innerwear & Socks',
    seoDescription:
      'Tagless pure cotton briefs, vests, winter thermals, and cushioned cotton sports socks.',
    searchTerms: [
      'thermal',
      'thermals',
      'thermal innerwear',
      'winter inner',
      'innerwear',
      'brief',
      'briefs',
      'boxer',
      'boxers',
      'vest',
      'banyan',
      'banian',
      'socks',
      'cotton socks',
      'ankle socks',
      'sports socks',
    ],
    priceFrom: null,
    styleIds: [],
  },
  {
    categorySlug: 'boys',
    slug: 'swimwear',
    label: 'Swimwear',
    seoDescription:
      'Chlorine-resistant boys swim shorts, rash guards, and UV protective swimming kits.',
    searchTerms: [
      'swimwear',
      'swim suit',
      'swimming costume',
      'swim shorts',
      'swimming trunks',
      'rash guard',
      'swim set',
    ],
    priceFrom: null,
    styleIds: [],
  },

  // ==========================================
  // GIRLS
  // ==========================================
  {
    categorySlug: 'girls',
    slug: 'dresses-frocks',
    label: 'Dresses & Frocks',
    seoDescription:
      'Breezy cotton cambric frocks, pure muslin summer dresses, and lined party wear frocks.',
    searchTerms: [
      'dress',
      'dresses',
      'frock',
      'frocks',
      'summer dress',
      'cotton frock',
      'muslin dress',
      'casual dress',
      'party dress',
      'cotton dress',
      'a-line dress',
    ],
    priceFrom: null,
    styleIds: ['cat-gr-01'],
  },
  {
    categorySlug: 'girls',
    slug: 'tops',
    label: 'Tops',
    seoDescription:
      'Frilled cotton voile tops, casual tunics, and comfortable daily knit t-shirts for girls.',
    searchTerms: [
      'top',
      'tops',
      'blouse',
      'tunic',
      'tunics',
      'cotton top',
      'voile top',
      't-shirt',
      'casual top',
      'peplum top',
      'sleeveless top',
    ],
    priceFrom: null,
    styleIds: ['cat-gr-03'],
  },
  {
    categorySlug: 'girls',
    slug: 'leggings-tights',
    label: 'Leggings & Tights',
    seoDescription:
      'Four-way stretch cotton lycra ankle leggings, cycling shorts, and daily slip shorts.',
    searchTerms: [
      'legging',
      'leggings',
      'tights',
      'tight',
      'stretch pants',
      'cotton lycra',
      'churidar',
      'ankle length leggings',
      'cycling shorts',
      'slip shorts',
    ],
    priceFrom: null,
    styleIds: ['cat-gr-04'],
  },
  {
    categorySlug: 'girls',
    slug: 'nightwear',
    label: 'Nightwear',
    seoDescription:
      'Notched-collar buttoned pajama sets, soft hosiery nightsuits, and sleep dresses.',
    searchTerms: [
      'nightsuit',
      'night suit',
      'night suits',
      'nightwear',
      'pajama',
      'pajamas',
      'pyjama',
      'pyjamas',
      'sleepwear',
      'notched collar',
      'cotton nightsuit',
      'sleep dress',
      'nighty',
    ],
    priceFrom: null,
    styleIds: ['cat-gr-02'],
  },
  {
    categorySlug: 'girls',
    slug: 'hoodies-jackets',
    label: 'Hoodies & Jackets',
    seoDescription:
      'Soft pre-washed denim shackets, cotton cardigans, and lightweight travel hoodies.',
    searchTerms: [
      'hoodie',
      'hoodies',
      'jacket',
      'jackets',
      'shacket',
      'denim jacket',
      'cardigan',
      'shrug',
      'sweatshirt',
      'winterwear',
      'cotton cardigan',
    ],
    priceFrom: null,
    styleIds: ['cat-gr-06'],
  },
  {
    categorySlug: 'girls',
    slug: 'innerwear-socks',
    label: 'Innerwear & Socks',
    seoDescription:
      'Soft cotton camisoles, bloomers, seamless slips, frill socks, and daily ankle socks.',
    searchTerms: [
      'innerwear',
      'panties',
      'bloomers',
      'camisole',
      'vest',
      'slip',
      'socks',
      'ankle socks',
      'frill socks',
      'tights',
      'toddler innerwear',
    ],
    priceFrom: null,
    styleIds: [],
  },
  {
    categorySlug: 'girls',
    slug: 'sportswear',
    label: 'Sportswear',
    seoDescription:
      'Breathable dryfit active sports sets, track pants, and comfortable cycling shorts.',
    searchTerms: [
      'sportswear',
      'sports set',
      'dryfit',
      'cycling shorts',
      'active wear',
      'gym wear',
      'track pant',
      'sports t-shirt',
    ],
    priceFrom: null,
    styleIds: ['cat-gr-05'],
  },
  {
    categorySlug: 'girls',
    slug: 'swimwear',
    label: 'Swimwear',
    seoDescription:
      'UV protective swimming frocks, one-piece swimsuits, and rash guard swimwear sets.',
    searchTerms: [
      'swimwear',
      'swimsuit',
      'swim suit',
      'swimming costume',
      'swimming frock',
      'rash guard',
      'swim set',
    ],
    priceFrom: null,
    styleIds: [],
  },

  // ==========================================
  // MEN
  // ==========================================
  {
    categorySlug: 'men',
    slug: 'innerwear',
    label: 'Innerwear',
    seoDescription:
      'Combed cotton tagless vests, classic briefs, and comfortable woven cotton boxers.',
    searchTerms: [
      'innerwear',
      'vest',
      'banyan',
      'banian',
      'brief',
      'briefs',
      'boxer',
      'boxers',
      'boxer shorts',
      'cotton vest',
      'undergarments',
    ],
    priceFrom: null,
    styleIds: [],
  },
  {
    categorySlug: 'men',
    slug: 't-shirts',
    label: 'T-shirts',
    seoDescription:
      'Heavyweight 200 GSM combed cotton crew-neck tees and everyday plain solid t-shirts.',
    searchTerms: [
      't-shirt',
      't shirt',
      'tshirt',
      'tshirts',
      'crew neck',
      'cotton t-shirt',
      'plain t-shirt',
      'half sleeve',
      'solid tee',
      'round neck',
    ],
    priceFrom: null,
    styleIds: ['cat-mn-01'],
  },
  {
    categorySlug: 'men',
    slug: 'shorts-track-pants',
    label: 'Shorts & Track Pants',
    seoDescription:
      'Double-knit cotton lounge shorts, interlock track pants, and breathable home trousers.',
    searchTerms: [
      'shorts',
      'lounge shorts',
      'gym shorts',
      'bermudas',
      'track pant',
      'track pants',
      'joggers',
      'sweatpants',
      'cotton pajamas',
      'pajamas',
      'pyjama',
      'lounge pants',
    ],
    priceFrom: null,
    styleIds: ['cat-mn-02', 'cat-mn-03'],
  },
  {
    categorySlug: 'men',
    slug: 'gym-wear',
    label: 'Gym Wear',
    seoDescription:
      'Moisture-wicking dryfit t-shirts, workout shorts, and flexible gym training apparel.',
    searchTerms: [
      'gym wear',
      'active wear',
      'sports tee',
      'dryfit',
      'workout shorts',
      'training pants',
      'cotton gym wear',
    ],
    priceFrom: null,
    styleIds: [],
  },
  {
    categorySlug: 'men',
    slug: 'thermals',
    label: 'Thermals',
    seoDescription:
      'Warm ribbed cotton-rich thermal tops, long johns, and winter base layers.',
    searchTerms: [
      'thermal',
      'thermals',
      'thermal top',
      'thermal set',
      'long johns',
      'winter wear',
      'cotton thermals',
    ],
    priceFrom: null,
    styleIds: [],
  },
  {
    categorySlug: 'men',
    slug: 'socks-handkerchiefs',
    label: 'Socks & Handkerchiefs',
    seoDescription:
      'Fine woven cotton handkerchiefs, business socks, and cushioned sports ankle socks.',
    searchTerms: [
      'socks',
      'cotton socks',
      'formal socks',
      'handkerchief',
      'handkerchiefs',
      'hanky',
      'hankies',
      'rumal',
      'cotton handkerchief',
    ],
    priceFrom: null,
    styleIds: [],
  },

  // ==========================================
  // WOMEN
  // ==========================================
  {
    categorySlug: 'women',
    slug: 'nightsuits',
    label: 'Nightsuits',
    seoDescription:
      'Pure double-gauze muslin notched-collar pajama sets and soft cotton sleep shirts.',
    searchTerms: [
      'nightsuit',
      'night suit',
      'night suits',
      'pajama set',
      'pajama',
      'pyjama',
      'muslin nightsuit',
      'notched collar',
      'sleep shirt',
      'cotton nightwear',
      'loungewear',
    ],
    priceFrom: null,
    styleIds: ['cat-wm-01'],
  },
  {
    categorySlug: 'women',
    slug: 'leggings-tights',
    label: 'Leggings & Tights',
    seoDescription:
      'Opaque four-way stretch cotton lycra churidars, ankle leggings, and comfort tights.',
    searchTerms: [
      'legging',
      'leggings',
      'tights',
      'cotton lycra',
      'churidar',
      'ankle length',
      'stretch leggings',
      'opaque leggings',
    ],
    priceFrom: null,
    styleIds: ['cat-wm-02'],
  },
  {
    categorySlug: 'women',
    slug: 'tops-kaftans',
    label: 'Tops & Kaftans',
    ageOptions: ['S', 'M', 'L', 'XL', 'XXL', 'Free size'],
    seoDescription:
      'Airy cotton slub lounge tops, relaxed summer kaftans, and tunic tops for women.',
    searchTerms: [
      'kaftan',
      'kaftans',
      'caftan',
      'lounge top',
      'cotton top',
      'tunic',
      'slub cotton',
      'free size top',
      'short kaftan',
    ],
    priceFrom: null,
    styleIds: ['cat-wm-03'],
  },
  {
    categorySlug: 'women',
    slug: 't-shirts',
    label: 'T-shirts',
    seoDescription:
      'Breathable combed cotton crew-neck tees, solid casual tops, and daily wear t-shirts.',
    searchTerms: [
      't-shirt',
      't shirt',
      'tshirt',
      'cotton t-shirt',
      'crew neck',
      'plain t-shirt',
      'casual tee',
    ],
    priceFrom: null,
    styleIds: [],
  },
  {
    categorySlug: 'women',
    slug: 'gym-wear',
    label: 'Gym Wear',
    seoDescription:
      'Flexible yoga pants, cycling shorts, dryfit sports tops, and workout basics.',
    searchTerms: [
      'gym wear',
      'active wear',
      'yoga pants',
      'tights',
      'cycling shorts',
      'workout top',
    ],
    priceFrom: null,
    styleIds: [],
  },
  {
    categorySlug: 'women',
    slug: 'innerwear',
    label: 'Innerwear',
    seoDescription:
      'Anti-chafing slip shorts, breathable cotton camisoles, slips, and everyday inner basics.',
    searchTerms: [
      'innerwear',
      'slip',
      'camisole',
      'anti chafing shorts',
      'slip shorts',
      'petticoat',
      'cotton bloomers',
    ],
    priceFrom: null,
    styleIds: ['cat-wm-04'],
  },
  {
    categorySlug: 'women',
    slug: 'socks-thermals',
    label: 'Socks & Thermals',
    seoDescription:
      'Cotton everyday ankle socks, winter thermals, and soft thermal leggings.',
    searchTerms: [
      'socks',
      'cotton socks',
      'thermal',
      'thermals',
      'thermal top',
      'thermal leggings',
      'winter innerwear',
    ],
    priceFrom: null,
    styleIds: [],
  },
];

// ==========================================
// CATALOGUE HELPER FUNCTIONS
// ==========================================

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getSub(categorySlug: string, subSlug: string): Subcategory | undefined {
  return SUBCATEGORIES.find((s) => s.categorySlug === categorySlug && s.slug === subSlug);
}

export function subsOf(categorySlug: string): Subcategory[] {
  return SUBCATEGORIES.filter((s) => s.categorySlug === categorySlug);
}

export function stylesOf(subOrCategorySlug: Subcategory | string, subSlug?: string): CatalogueItem[] {
  let sub: Subcategory | undefined;

  if (typeof subOrCategorySlug === 'object') {
    sub = subOrCategorySlug;
  } else if (subSlug) {
    sub = getSub(subOrCategorySlug, subSlug);
  }

  if (!sub || !sub.styleIds || sub.styleIds.length === 0) {
    return [];
  }

  return sub.styleIds
    .map((id) => CATALOGUE_ITEMS.find((item) => item.id === id))
    .filter((item): item is CatalogueItem => item !== undefined);
}

export function allSubcategories(): Subcategory[] {
  return [...SUBCATEGORIES];
}

export function ageOptionsFor(categorySlug: string, subSlug?: string): string[] {
  if (subSlug) {
    const sub = getSub(categorySlug, subSlug);
    if (sub && sub.ageOptions && sub.ageOptions.length > 0) {
      return sub.ageOptions;
    }
  }

  const category = getCategory(categorySlug);
  return category ? category.ageOptions : [];
}

export function isReady(sub: Subcategory): boolean {
  return Boolean(sub.photo || (sub.styleIds && sub.styleIds.length > 0));
}

export function subByStyleId(styleId: string): Subcategory | undefined {
  return SUBCATEGORIES.find((s) => s.styleIds && s.styleIds.includes(styleId));
}

