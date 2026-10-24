import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubcategoryTile from '@/components/SubcategoryTile';
import { TrustMarquee } from '@/components/TrustMarquee';
import { CategorySlug } from '@/lib/products';
import { subsOf, getCategory } from '@/data/catalogue';
import { BUSINESS_CONFIG } from '@/config/business';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const validCategories: CategorySlug[] = ['newborn', 'boys', 'girls', 'men', 'women'];

export async function generateStaticParams() {
  return validCategories.map((cat) => ({
    category: cat,
  }));
}

interface CategoryEditorial {
  titleTag: string;
  metaDesc: string;
  heading: string;
  subheading: string;
  ageLine: string;
  fabricText: string;
  ageText: string;
  sizingText: string;
  relatedSlugs: CategorySlug[];
}

const CATEGORY_EDITORIALS: Record<CategorySlug, CategoryEditorial> = {
  newborn: {
    titleTag: 'Newborn Baby Clothes & Swaddles Mumbai | Warden & Sons',
    metaDesc:
      'Breathable combed cotton jhablas, onesies, rompers, and muslin swaddles for babies 0-24M. Request live photos from our Kemps Corner store racks.',
    heading: 'Newborn & Infant Clothes (0–24 Months)',
    subheading: 'Cotton basics, muslin swaddles, and everyday comfort for babies.',
    ageLine: '0–24 months',
    fabricText:
      'Crafted from combed cotton and double-layer open-weave muslin. Soft fabrics suited for Mumbai’s humid coastal weather. Seams are stitched flat and care tags are placed away from sensitive newborn skin.',
    ageText:
      'Sized carefully for infants from birth up to 24 months across 0-3M, 3-6M, 6-12M, 12-18M, and 18-24M stages. Generous diaper-rise room is built into all onesies and rompers.',
    sizingText:
      'Babies grow quickly during the first six months. We suggest taking one size larger for sleepsuits to allow comfortable layering over cloth nappies. On WhatsApp, simply mention your baby’s age or approximate weight, and our shop team will verify dimensions with a physical measuring tape before packing.',
    relatedSlugs: ['boys', 'girls', 'women'],
  },
  boys: {
    titleTag: "Boys' Clothes, 0-16 Years, Mumbai | Warden & Sons",
    metaDesc:
      'Durable combed cotton t-shirts, cargo shorts, cricket whites, and nightsuits for boys 0-16 years. Check counter tape sizing directly on WhatsApp.',
    heading: 'Boys Playwear & Clothes (0–16 Years)',
    subheading: 'Breathable cotton t-shirts, shorts, track pants, and nightsuits.',
    ageLine: '0–16 years',
    fabricText:
      'High-durability 180 to 220 GSM single-jersey cotton for t-shirts, reinforced cotton twill for cargo shorts, and 100% combed hosiery cotton for nightwear. Breathable everyday fabrics keep boys cool while playing outdoors in Mumbai’s heat.',
    ageText:
      'Full coverage from toddlers (0-2Y), junior boys (2-8Y), to older boys and teenagers (8-16Y). Available across standard Indian numbered sizes 20, 22-24, 26, 28-30, 32, and 34-36. Tops feature reinforced collar ribbing and double-needle hems.',
    sizingText:
      'Active boys need room through the shoulders and chest. For shorts and joggers, our waistbands feature soft ribbed elastic with functional drawstrings. When sending your Request List on WhatsApp, tell us your boy’s age and approximate height, and we will measure flat chest and length dimensions for you.',
    relatedSlugs: ['girls', 'newborn', 'men'],
  },
  girls: {
    titleTag: "Girls' Clothes, 0-16 Years, Mumbai | Warden & Sons",
    metaDesc:
      'Breathable cotton frocks, daily casual tops, leggings, and notched-collar nightsuits for girls 0-16 years. View current shop racks on WhatsApp.',
    heading: 'Girls Clothing & Sleepwear (0–16 Years)',
    subheading: 'Airy cotton dresses, comfortable nightsuits, tops, and leggings.',
    ageLine: '0–16 years',
    fabricText:
      'Woven from fine combed cotton poplins, breezy cambric, and soft knit ribbing. Pre-washed fabrics stay soft after repeat laundering and keep cool in warm weather. Party and casual dresses include full cotton linings with zero scratching tulle touching the skin.',
    ageText:
      'Available across toddler (0-2Y), young girls (2-7Y), pre-teens (8-12Y), and teenage girls (13-16Y). Clean silhouettes with practical pockets and durable button closures.',
    sizingText:
      'For dresses, check shoulder-to-knee length. Our nightsuits are cut with a comfortable, relaxed fit for sleeping. Share your daughter’s height and chest measurement on WhatsApp, and our Kemps Corner store desk will confirm flat measurements directly.',
    relatedSlugs: ['boys', 'newborn', 'women'],
  },
  men: {
    titleTag: "Men's Cotton Loungewear & Basics | Warden & Sons",
    metaDesc:
      'Comfortable combed cotton crewneck t-shirts, lounge shorts, and woven pajama sets for men. Message our Kemps Corner shop desk for measurements.',
    heading: 'Men’s Cotton Loungewear & Basics',
    subheading: 'Combed cotton t-shirts, boxer shorts, and classic pajama sets.',
    ageLine: 'Sizes S – XXL',
    fabricText:
      'Constructed with 100% combed long-staple cotton jerseys and woven poplins. Pre-shrunk to prevent size loss in standard machine washing, ensuring airflow and all-day comfort in tropical temperatures.',
    ageText:
      'Available in adult sizes from Small to 3XL across solid crewneck t-shirts, relaxed lounge shorts, and traditional button-down pajama sets.',
    sizingText:
      'Cut with a comfortable, straight drape rather than slim tailoring. If you prefer extra ease for lounging at home, select your usual collar or chest size. Our store team will gladly measure chest and waist dimensions on our counter tape.',
    relatedSlugs: ['women', 'boys'],
  },
  women: {
    titleTag: "Women's Muslin Sleepwear & Basics | Warden & Sons",
    metaDesc:
      'Lightweight cotton kaftans, maternity-friendly nighties, and soft muslin sleepwear for women. Chat with our Kemps Corner shop for current prints.',
    heading: 'Women’s Muslin Sleepwear & Basics',
    subheading: 'Pure cotton nighties, kaftans, and relaxed loungewear.',
    ageLine: 'Sizes S – XXL',
    fabricText:
      'Fine woven mulmul cotton, premium open-weave muslins, and breathable combed cotton knits. Hand-selected for ease of movement, soft skin feel, and durability across daily home wear.',
    ageText:
      'Available across Free Size loungewear (fitting up to 44-inch bust comfortably) and graded sizes from Medium up to 3XL.',
    sizingText:
      'Our kaftans and nightdresses feature relaxed, generous cuts. For maternity and nursing wear, our front-button plackets offer practical day-to-day ease. Inquire directly on WhatsApp to see current prints available at our store.',
    relatedSlugs: ['newborn', 'girls', 'men'],
  },
  bulk: {
    titleTag: 'School Uniforms & Bulk Orders Mumbai | Warden & Sons',
    metaDesc:
      'School uniforms, sports sets, and custom institutional bulk apparel in South Mumbai. Inquire with our Kemps Corner store desk.',
    heading: 'School Uniforms & Bulk Orders',
    subheading: 'Custom school uniforms, sports kits, and institutional bulk orders.',
    ageLine: 'All school sizes',
    fabricText:
      'Durable drill cottons, wrinkle-resistant polyester-viscose blends, and combed cotton knits stitched to institutional requirements.',
    ageText:
      'Available across all standard school age brackets from kindergarten through high school.',
    sizingText:
      'We supply Cathedral, Bombay Scottish, St. Mary’s and sports teams across South Mumbai. Message us directly for customized bulk specs and pricing.',
    relatedSlugs: ['boys', 'girls', 'newborn'],
  },
};

const categoryDisplayNames: Record<string, string> = {
  newborn: 'Newborn',
  boys: 'Boys',
  girls: 'Girls',
  men: 'Men',
  women: 'Women',
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!validCategories.includes(category as CategorySlug)) {
    return {
      title: 'Category Not Found',
    };
  }

  const editorial = CATEGORY_EDITORIALS[category as CategorySlug];

  return buildPageMetadata({
    path: `/shop/${category}`,
    title: { absolute: editorial.titleTag },
    description: editorial.metaDesc,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!validCategories.includes(category as CategorySlug)) {
    return notFound();
  }

  const editorial = CATEGORY_EDITORIALS[category as CategorySlug];
  const subcategories = subsOf(category);
  const displayName =
    categoryDisplayNames[category] || (category.charAt(0).toUpperCase() + category.slice(1));

  const askMessage = `Hi Warden & Sons! I'm browsing ${editorial.heading} on your website and can't find what I'm looking for. Can you check live racks?`;
  const askUrl = BUSINESS_CONFIG.whatsappUrl(askMessage);

  return (
    <div className="py-6 sm:py-10 font-sans">
      <Container>
        <Breadcrumbs
          items={[
            { name: 'Home', url: getCanonicalUrl('/') },
            { name: 'Shop', url: getCanonicalUrl('/shop') },
            { name: displayName, url: getCanonicalUrl(`/shop/${category}`) },
          ]}
        />

        {/* Category Header */}
        <div className="pt-2 pb-6 sm:pb-8 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="font-sans font-medium text-4xl sm:text-5xl lg:text-[66px] leading-[1.05] text-[var(--ink)] tracking-tight">
              {editorial.heading}
            </h1>
            <span className="text-sm font-medium text-[var(--muted)]">
              {editorial.ageLine}
            </span>
          </div>
          <p className="text-base sm:text-lg text-[var(--ink)] max-w-2xl leading-relaxed">
            {editorial.subheading}
          </p>
        </div>

        {/* Sub-category Tiles Grid (2 cols mobile, 3 tablet, 4 desktop) */}
        <div className="py-6 sm:py-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {subcategories.map((sub) => (
              <SubcategoryTile key={sub.slug} sub={sub} />
            ))}
          </div>

          {/* Assistance & Cross-Category Navigation */}
          <div className="space-y-4 pt-4">
            <div className="p-6 bg-white border border-[var(--line)] rounded-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
              <p className="text-base text-[var(--ink)] font-medium">
                Can&apos;t see what you need? Inquire with our Kemps Corner store desk on WhatsApp
              </p>
              <a
                href={askUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="category"
                data-track-category={category}
                className="h-[46px] px-6 inline-flex items-center justify-center text-[13px] font-sans font-medium bg-[var(--ink)] text-white hover:bg-[var(--blue)] active:scale-[0.98] transition-all rounded-sm shrink-0"
              >
                Message shop desk &rarr;
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-sm font-medium text-[var(--ink)]">Other departments:</span>
              {editorial.relatedSlugs.map((relSlug) => {
                const relCategory = getCategory(relSlug);
                if (!relCategory) return null;
                return (
                  <Link
                    key={relSlug}
                    href={`/shop/${relSlug}/`}
                    className="px-4 py-2 bg-[var(--surface)] text-sm font-medium text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
                  >
                    {relCategory.label} ({relCategory.ageLine})
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Long SEO Guidance Accordions */}
          <div className="pt-8 space-y-4">
            <h2 className="font-sans text-sm font-medium text-[var(--muted)] mb-3">
              Fabric, sizing &amp; store guidance
            </h2>

            <details className="group bg-white border border-[var(--line)] rounded-md p-5 select-none shadow-xs">
              <summary className="flex items-center justify-between cursor-pointer font-sans font-medium text-base sm:text-lg text-[var(--ink)] list-none">
                <span>Fabric &amp; Comfort</span>
                <span className="text-sm text-[var(--muted)] group-open:rotate-180 transition-transform">
                  &darr;
                </span>
              </summary>
              <div className="pt-3 text-base text-[var(--ink)] leading-relaxed">
                <p>{editorial.fabricText}</p>
              </div>
            </details>

            <details className="group bg-white border border-[var(--line)] rounded-md p-5 select-none shadow-xs">
              <summary className="flex items-center justify-between cursor-pointer font-sans font-medium text-base sm:text-lg text-[var(--ink)] list-none">
                <span>Age &amp; Fit Range</span>
                <span className="text-sm text-[var(--muted)] group-open:rotate-180 transition-transform">
                  &darr;
                </span>
              </summary>
              <div className="pt-3 text-base text-[var(--ink)] leading-relaxed">
                <p>{editorial.ageText}</p>
              </div>
            </details>

            <details className="group bg-white border border-[var(--line)] rounded-md p-5 select-none shadow-xs">
              <summary className="flex items-center justify-between cursor-pointer font-sans font-medium text-base sm:text-lg text-[var(--ink)] list-none">
                <span>Sizing &amp; WhatsApp Check</span>
                <span className="text-sm text-[var(--muted)] group-open:rotate-180 transition-transform">
                  &darr;
                </span>
              </summary>
              <div className="pt-3 text-base text-[var(--ink)] leading-relaxed space-y-3">
                <p>{editorial.sizingText}</p>
                <div>
                  <Link
                    href="/size-guide/"
                    className="font-medium text-[var(--blue)] hover:underline text-sm inline-flex items-center gap-1"
                  >
                    <span>View complete size chart in our Size Guide</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </details>

            {/* Boys In-Depth Contextual Details */}
            {category === 'boys' && (
              <>
                <details className="group bg-white border border-[var(--line)] rounded-md p-5 select-none shadow-xs">
                  <summary className="flex items-center justify-between cursor-pointer font-sans font-medium text-base sm:text-lg text-[var(--ink)] list-none">
                    <span>Age Brackets &amp; Numbered Sizes Carried</span>
                    <span className="text-sm text-[var(--muted)] group-open:rotate-180 transition-transform">
                      &darr;
                    </span>
                  </summary>
                  <div className="pt-3 text-base text-[var(--ink)] leading-relaxed">
                    <ul className="space-y-2">
                      <li>
                        <strong className="text-[var(--ink)]">Toddler Boys (2 – 3 Years):</strong> Sized as Toddler / 2-3Y or Indian Size 20 (Chest: ~21 in). Designed with roomy elastic pull-on waists and soft necklines for easy dressing.
                      </li>
                      <li>
                        <strong className="text-[var(--ink)]">Young Boys (4 – 7 Years):</strong> Sized as XS (4-5Y, Size 22–24) and S (6-7Y, Size 26, Chest: 23–25 in). Built for active daily kindergarten and primary school play.
                      </li>
                      <li>
                        <strong className="text-[var(--ink)]">Juniors (8 – 12 Years):</strong> Sized as M (8-9Y, Size 28–30) and L (10-12Y, Size 32, Chest: 27–29 in). Includes coaching cricket whites, sports coordinate sets, and school uniform drill shorts.
                      </li>
                      <li>
                        <strong className="text-[var(--ink)]">Teenagers (13 – 16 Years):</strong> Sized as XL (13-16Y, Size 34–36, Chest: 30–32 in). Features durable cotton track pants, crew-neck tees, and relaxed sleepwear.
                      </li>
                    </ul>
                  </div>
                </details>

                <details className="group bg-white border border-[var(--line)] rounded-md p-5 select-none shadow-xs">
                  <summary className="flex items-center justify-between cursor-pointer font-sans font-medium text-base sm:text-lg text-[var(--ink)] list-none">
                    <span>Authentic Fabrics Built for Mumbai Climate</span>
                    <span className="text-sm text-[var(--muted)] group-open:rotate-180 transition-transform">
                      &darr;
                    </span>
                  </summary>
                  <div className="pt-3 text-base text-[var(--ink)] leading-relaxed space-y-3">
                    <p>
                      Every garment in our boys’ department is selected for durability and breathability. Our everyday t-shirts use heavyweight 180–220 GSM combed cotton that withstands regular washing without losing collar shape. For sports and turf play, moisture-wicking dryfit microfibers keep boys cool, while cricket academy kits use specialized poly-cotton twill designed for morning training at Oval, Azad, and Shivaji Park maidaans.
                    </p>
                    <p>
                      Prefer in-person fitting? Stop by our{' '}
                      <Link
                        href="/visit-us/"
                        className="text-[var(--blue)] underline font-medium"
                      >
                        Kemps Corner store near Pedder Road flyover
                      </Link>{' '}
                      to inspect fabrics, check sizes, or pick up custom school uniforms. Ordering remotely? See{' '}
                      <Link
                        href="/how-it-works/"
                        className="text-[var(--blue)] underline font-medium"
                      >
                        how WhatsApp catalogue ordering works
                      </Link>{' '}
                      with flat tape measurements verified before you confirm.
                    </p>
                  </div>
                </details>
              </>
            )}
          </div>
        </div>
      </Container>

      {/* Brand Trust Strip */}
      <div className="mt-12 sm:mt-16">
        <TrustMarquee />
      </div>
    </div>
  );
}
