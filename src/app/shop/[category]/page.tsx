import { notFound } from 'next/navigation';
import { getCatalogueItemsByCategory, CategorySlug } from '@/lib/products';
import ShopCatalog from '@/components/ShopCatalog';
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

function getCategoryDisplayName(cat: string): string {
  switch (cat) {
    case 'newborn':
      return 'Newborns & Infants (0-24M)';
    case 'boys':
      return 'Boys Playwear & Sports (0-16Y)';
    case 'girls':
      return 'Girls Clothing & Sleepwear (0-16Y)';
    case 'men':
      return 'Men’s Basics & Loungewear';
    case 'women':
      return 'Women’s Muslin Sleepwear & Basics';
    case 'bulk':
      return 'School Uniforms & Bulk Apparel';
    default:
      return 'Shop Category';
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!validCategories.includes(category as CategorySlug)) {
    return {
      title: 'Category Not Found',
    };
  }

  const name = getCategoryDisplayName(category);

  return {
    title: `${name} | Catalogue Preview`,
    description: `Explore representative offerings of ${name}. Add items to your request list and enquire directly on WhatsApp with Warden & Sons, Kemps Corner.`,
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

  const products = getCatalogueItemsByCategory(category as CategorySlug);
  const displayName = getCategoryDisplayName(category);

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
          Department Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          {displayName}
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          Pre-washed, azo-free cotton garments crafted for sensitive skin. Select items for your
          Request List, then send your enquiry on WhatsApp to confirm live colors, sizes, and
          pricing.
        </p>
      </div>

      {/* Main Interactive Catalog */}
      <ShopCatalog products={products} initialCategory={category} categoryTitle={displayName} />
    </div>
  );
}
