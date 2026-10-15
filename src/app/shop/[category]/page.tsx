import { notFound } from 'next/navigation';
import { getProductsByCategory } from '@/lib/products';
import ShopCatalog from '@/components/ShopCatalog';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const validCategories = ['newborn', 'boys', 'girls', 'men', 'women'];

export async function generateStaticParams() {
  return validCategories.map((cat) => ({
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
    default:
      return 'Shop Category';
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!validCategories.includes(category)) {
    return {
      title: 'Category Not Found',
    };
  }

  const name = getCategoryDisplayName(category);

  return {
    title: `${name} | Sample Catalog`,
    description: `Shop our 100% pure cotton collection of ${name}. Add items to your bag and order directly on WhatsApp from Warden & Sons, Kemps Corner.`,
    alternates: {
      canonical: `/shop/${category}`,
    },
  };
}

type CategoryType = 'newborn' | 'boys' | 'girls' | 'men' | 'women';

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!validCategories.includes(category)) {
    return notFound();
  }

  const products = getProductsByCategory(category as CategoryType);
  const displayName = getCategoryDisplayName(category);

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          Department Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4332] tracking-tight">
          {displayName}
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Pre-washed, azo-free cotton garments crafted for sensitive skin. Select items and quantities, then send your order on WhatsApp to confirm live colors and sizes.
        </p>
      </div>

      {/* Main Interactive Catalog */}
      <ShopCatalog
        products={products}
        initialCategory={category}
        categoryTitle={displayName}
      />
    </div>
  );
}
