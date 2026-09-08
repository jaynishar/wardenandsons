import { notFound } from 'next/navigation'; // next/navigation
import { getProductsByCategory } from '@/lib/products';
import CategoryFilterList from '@/components/CategoryFilterList';
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
      return 'Boys Clothing (0-16Y)';
    case 'girls':
      return 'Girls Clothing (0-16Y)';
    case 'men':
      return 'Men\'s Basics & Comfort';
    case 'women':
      return 'Women\'s Basics & Comfort';
    default:
      return 'Shop';
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
    title: `${name} | Warden & Sons Kids Wear`,
    description: `Shop our premium, weather-breathable collection of ${name}. Buy cotton swaddles, t-shirts, nightwear, and activewear at Warden & Sons, Kemps Corner.`,
    alternates: {
      canonical: `/shop/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!validCategories.includes(category)) {
    return notFound();
  }

  const products = getProductsByCategory(category as any);
  const displayName = getCategoryDisplayName(category);

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
          🛍️ Category Catalog
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary-800 leading-tight">
          {displayName}
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Below is our current stock listing. Since our shelves rotate daily, contact us on WhatsApp or book a video call to see the newest prints and confirm fits.
        </p>
      </div>

      {/* Interactive Products Grid with filters */}
      <CategoryFilterList products={products} category={category} />
    </div>
  );
}
