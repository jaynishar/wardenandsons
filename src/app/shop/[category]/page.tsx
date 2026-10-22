import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Ruler } from 'lucide-react';
import { getCatalogueItemsByCategory, CategorySlug } from '@/lib/products';
import ShopCatalog from '@/components/ShopCatalog';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/config/site';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const validCategories: CategorySlug[] = ['newborn', 'boys', 'girls', 'men', 'women', 'bulk'];

export async function generateStaticParams() {
  return validCategories.map(cat => ({
    category: cat,
  }));
}

interface CategoryEditorial {
  titleTag: string;
  metaDesc: string;
  heading: string;
  subheading: string;
  fabricText: string;
  ageText: string;
  sizingText: string;
}

const CATEGORY_EDITORIALS: Record<CategorySlug, CategoryEditorial> = {
  newborn: {
    titleTag: 'Newborn Baby Clothes & Swaddles Mumbai | Warden & Sons',
    metaDesc:
      'Breathable combed cotton jhablas, onesies, and muslin swaddles for babies 0-24M. Request live photos from our Kemps Corner racks.',
    heading: 'Newborn & Infant Clothes (0–24 Months)',
    subheading: 'Pure cotton basics, muslin swaddles, and everyday comfort for babies.',
    fabricText:
      'Crafted from 100% combed cotton and double-layer open-weave muslin. All garments use azo-free dyes that prevent skin irritation and prickly heat in Mumbai’s humid coastal weather. Seams are stitched flat and care tags are placed away from sensitive newborn skin.',
    ageText:
      'Sized carefully for infants from birth up to 24 months across 0-3M, 3-6M, 6-12M, 12-18M, and 18-24M stages. Generous diaper-rise room is built into all onesies and rompers.',
    sizingText:
      'Babies grow quickly during the first six months. We suggest taking one size larger for sleepsuits to allow comfortable layering over cloth nappies. On WhatsApp, simply mention your baby’s age or approximate weight, and our shop team will verify dimensions with a physical measuring tape before packing.',
  },
  boys: {
    titleTag: 'Boys Cotton Clothes (0-16Y) | Kemps Corner | Warden & Sons',
    metaDesc:
      "Durable 100% cotton boys' tees, cricket whites & nightsuits (0-16Y). WhatsApp our Kemps Corner store for tape measurements.",
    heading: 'Boys Playwear & Clothes (0–16 Years)',
    subheading: 'Breathable cotton t-shirts, shorts, track pants, and nightsuits.',
    fabricText:
      'High-durability 180 to 220 GSM single-jersey cotton for t-shirts, reinforced cotton twill for cargo shorts, and 100% combed hosiery cotton for nightwear. Built without synthetic polyester blends so boys stay cool while playing outdoors in Mumbai’s heat.',
    ageText:
      'Full coverage from toddlers (0-2Y), junior boys (2-8Y), to older boys and teenagers (8-16Y). Available across standard Indian numbered sizes 20, 22-24, 26, 28-30, 32, and 34-36. All garments feature reinforced collar ribbing and double-needle hems.',
    sizingText:
      'Active boys need room through the shoulders and chest. For shorts and joggers, our waistbands feature soft ribbed elastic with functional drawstrings. When sending your Request List on WhatsApp, tell us your boy’s age and approximate height, and we will measure flat chest and length dimensions for you.',
  },
  girls: {
    titleTag: 'Girls Cotton Dresses & Sleepwear (0-16Y) | Warden & Sons',
    metaDesc:
      'Soft cotton frocks, daily tops, and notched-collar nightsuits for girls. Check current prints and sizes directly on WhatsApp.',
    heading: 'Girls Clothing & Sleepwear (0–16 Years)',
    subheading: 'Airy cotton dresses, comfortable nightsuits, tops, and leggings.',
    fabricText:
      'Woven from fine combed cotton poplins, breezy cambric, and soft knit ribbing. Pre-washed fabrics stay soft after repeat laundering and keep cool in warm weather. Party and casual dresses include full cotton linings with zero scratching tulle touching the skin.',
    ageText:
      'Available across toddler (0-2Y), young girls (2-7Y), pre-teens (8-12Y), and teenage girls (13-16Y). Clean silhouettes with practical pockets and durable button closures.',
    sizingText:
      'For dresses, check shoulder-to-knee length. Our nightsuits are cut with a comfortable, relaxed fit for sleeping. Share your daughter’s height and chest measurement on WhatsApp, and our Kemps Corner store desk will confirm flat measurements directly.',
  },
  men: {
    titleTag: "Men's Cotton Loungewear & Basics | Warden & Sons",
    metaDesc:
      'Breathable combed cotton crewneck t-shirts, lounge shorts, and pajama sets. Confirm your size with our Kemps Corner store desk.',
    heading: 'Men’s Cotton Loungewear & Basics',
    subheading: 'Combed cotton t-shirts, boxer shorts, and classic pajama sets.',
    fabricText:
      'Constructed with 100% combed long-staple cotton jerseys and woven poplins. Pre-shrunk to prevent size loss in standard machine washing, ensuring airflow and all-day comfort in tropical temperatures.',
    ageText:
      'Available in adult sizes from Small to 3XL across solid crewneck t-shirts, relaxed lounge shorts, and traditional button-down pajama sets.',
    sizingText:
      'Cut with a comfortable, straight drape rather than slim tailoring. If you prefer extra ease for lounging at home, select your usual collar or chest size. Our store team will gladly measure chest and waist dimensions on our counter tape.',
  },
  women: {
    titleTag: "Women's Muslin Sleepwear & Basics | Warden & Sons",
    metaDesc:
      'Double-gauze muslin night suits, everyday tops, and cotton leggings for women. Message our shop desk for live availability.',
    heading: 'Women’s Muslin Sleepwear & Basics',
    subheading: 'Airy double-gauze muslin pajama sets, nightdresses, and cotton tops.',
    fabricText:
      'Soft double-gauze breathable cotton muslin and combed cotton knits. Extremely gentle on the skin, highly absorbent, and designed for comfortable sleep and daily home wear.',
    ageText:
      'Offered in sizes XS through XXL across coordinated pajama sets, buttoned sleep shirts, and lightweight cotton casuals.',
    sizingText:
      'Muslin fabrics have a natural, relaxed drape that softens with every wash. Let us know on WhatsApp whether you prefer a loose or standard fit, and our team will measure armhole, chest, and pant outseam lengths for you.',
  },
  bulk: {
    titleTag: 'School Uniforms & Bulk Cotton Apparel | Warden & Sons',
    metaDesc:
      "Custom school uniforms, sports jerseys, and bulk cotton children's wear. Request direct WhatsApp quotes and fabric trial swatches.",
    heading: 'School Uniforms & Bulk Orders',
    subheading: 'Custom school uniforms, sports house t-shirts, and group garments.',
    fabricText:
      'Heavy-duty colorfast cotton drills, breathable pique knits for sports polos, and pre-shrunk twills engineered for daily school use and institutional laundering without fading.',
    ageText:
      'Complete sizing ranges from nursery and primary grades through secondary classes (sizes 20 to 42). We supply shirts, skirts, shorts, pinafores, and sports sets.',
    sizingText:
      'We supply size sample sets and clear measurement charts for schools, parent groups, and sports teams. Send your design, fabric, and quantity requirements on WhatsApp for direct quotes and production timelines.',
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!validCategories.includes(category as CategorySlug)) {
    return {
      title: 'Category Not Found',
    };
  }

  const editorial = CATEGORY_EDITORIALS[category as CategorySlug];

  return {
    title: { absolute: editorial.titleTag },
    description: editorial.metaDesc,
    alternates: {
      canonical: getCanonicalUrl(`/shop/${category}`),
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!validCategories.includes(category as CategorySlug)) {
    return notFound();
  }

  const editorial = CATEGORY_EDITORIALS[category as CategorySlug];
  const products = getCatalogueItemsByCategory(category as CategorySlug);

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Shop by Age', url: getCanonicalUrl('/shop') },
          { name: editorial.heading, url: getCanonicalUrl(`/shop/${category}`) },
        ]}
      />

      {/* Zara-Style Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          {editorial.heading}
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">{editorial.subheading}</p>
      </div>

      {/* Helpful Fabric, Age & Sizing Copy (150-250 words) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-cream/50 p-6 md:p-8 rounded-2xl border border-border-soft text-xs sm:text-sm text-muted leading-relaxed">
        <div className="space-y-2">
          <h2 className="font-bold text-near-black text-sm uppercase tracking-wider font-mono">
            Fabric & Comfort
          </h2>
          <p>{editorial.fabricText}</p>
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-near-black text-sm uppercase tracking-wider font-mono">
            Age & Fit Range
          </h2>
          <p>{editorial.ageText}</p>
        </div>
        <div className="space-y-2">
          <h2 className="font-bold text-near-black text-sm uppercase tracking-wider font-mono">
            Sizing & WhatsApp Check
          </h2>
          <p>{editorial.sizingText}</p>
          <div className="pt-2">
            <Link
              href="/size-guide"
              className="inline-flex items-center gap-1.5 font-bold text-forest hover:text-gold transition-colors text-xs underline"
            >
              <Ruler className="w-3.5 h-3.5 text-gold" />
              <span>Not sure of the size? See our Size Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Interactive Catalog */}
      <ShopCatalog
        products={products}
        initialCategory={category}
        categoryTitle={editorial.heading}
      />

      {/* Category-Specific In-Depth Contextual Section for Boys */}
      {category === 'boys' && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-border-soft shadow-xs space-y-6 text-near-black">
          <div className="space-y-2 border-b border-border-soft pb-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-gold block">
              Boutique Sizing & Fabrics • Kemps Corner
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              Boys’ Cotton Clothing, Sizing &amp; Fabrics
            </h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Serving South Mumbai families since 1994, Warden &amp; Sons stocks genuine, durable cotton basics for boys from toddlers through teenagers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-forest">
                Age Brackets &amp; Numbered Sizes Carried
              </h3>
              <ul className="space-y-2 text-muted">
                <li>
                  <strong className="text-near-black">Toddler Boys (2 – 3 Years):</strong> Sized as Toddler / 2-3Y or Indian Size 20 (Chest: ~21 in). Designed with roomy elastic pull-on waists and soft necklines for easy dressing.
                </li>
                <li>
                  <strong className="text-near-black">Young Boys (4 – 7 Years):</strong> Sized as XS (4-5Y, Size 22–24) and S (6-7Y, Size 26, Chest: 23–25 in). Built for active daily kindergarten and primary school play.
                </li>
                <li>
                  <strong className="text-near-black">Juniors (8 – 12 Years):</strong> Sized as M (8-9Y, Size 28–30) and L (10-12Y, Size 32, Chest: 27–29 in). Includes coaching cricket whites, sports coordinate sets, and school uniform drill shorts.
                </li>
                <li>
                  <strong className="text-near-black">Teenagers (13 – 16 Years):</strong> Sized as XL (13-16Y, Size 34–36, Chest: 30–32 in). Features durable cotton track pants, crew-neck tees, and relaxed sleepwear.
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/size-guide"
                  className="font-bold text-forest hover:text-gold transition-colors inline-flex items-center gap-1.5 underline"
                >
                  <Ruler className="w-3.5 h-3.5 text-gold" />
                  <span>Compare complete chest &amp; height dimensions in our Size Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-forest">
                Authentic Fabrics Built for Mumbai Climate
              </h3>
              <p className="text-muted">
                Every garment in our boys’ department is selected for durability and breathability. Our everyday t-shirts use heavyweight 180–220 GSM combed cotton that withstands regular washing without losing collar shape. For sports and turf play, moisture-wicking dryfit microfibers keep boys cool, while cricket academy kits use specialized poly-cotton twill designed for morning training at Oval, Azad, and Shivaji Park maidaans.
              </p>
              <div className="bg-bg-cream/60 rounded-2xl p-4 border border-border-soft space-y-2">
                <h4 className="font-serif font-bold text-sm text-forest">
                  In-Store Fittings &amp; WhatsApp Home Service
                </h4>
                <p className="text-muted text-xs">
                  Prefer in-person fitting? Stop by our <Link href="/visit-us" className="font-bold text-forest underline hover:text-gold">Kemps Corner store near Pedder Road flyover</Link> to inspect fabrics, check sizes, or pick up custom school uniforms. Ordering remotely? See <Link href="/how-it-works" className="font-bold text-forest underline hover:text-gold">how WhatsApp catalogue ordering works</Link> with flat tape measurements verified before you confirm.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
