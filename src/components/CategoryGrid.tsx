import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  age: string;
  description: string;
  image: string;
  itemTags: string[];
}

const categories: CategoryItem[] = [
  {
    id: 'newborn',
    name: 'Newborns & Infants',
    age: '0 - 24 Months',
    description: 'Ultra-soft combed cotton swaddles, bodysuits, sleepsuits, rompers, bathrobes & hooded towels.',
    image: '/store_front.jpg',
    itemTags: ['Bodysuits', 'Swaddles', 'Sleepsuits', 'Towels'],
  },
  {
    id: 'boys',
    name: 'Boys Clothing',
    age: '0 - 16 Years',
    description: 'Everyday 180 GSM tees, dryfit sports quad-sets, nightsuits, cargo joggers, and cricket whites.',
    image: '/store_front.jpg',
    itemTags: ['180 GSM Tees', 'Dryfit Sets', 'Nightwear', 'Cargos'],
  },
  {
    id: 'girls',
    name: 'Girls Clothing',
    age: '0 - 16 Years',
    description: 'Airy muslin dresses, hosiery pajama nightsuits, stretch leggings, and light denim jackets.',
    image: '/store_front.jpg',
    itemTags: ['Muslin Dresses', 'Nightsuits', 'Leggings', 'Tops'],
  },
  {
    id: 'men',
    name: 'Men’s Basics & Comfort',
    age: 'Sizes S - XXL',
    description: 'Heavyweight plain cotton crew tees, double-knit gym shorts, track pants, and sleep pajamas.',
    image: '/store_front.jpg',
    itemTags: ['Heavyweight Tees', 'Gym Shorts', 'Track Pants'],
  },
  {
    id: 'women',
    name: 'Women’s Basics & Comfort',
    age: 'Sizes S - XXL',
    description: 'Double-layer muslin pajama sets, opaque cotton Lycra leggings, free-size lounge tops, and kaftans.',
    image: '/store_front.jpg',
    itemTags: ['Muslin Sets', 'Opaque Leggings', 'Lounge Tops'],
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center space-y-3 mb-10 md:mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          Curated Department Collections
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B4332]">
          Explore by Category
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] max-w-xl mx-auto leading-relaxed">
          Select a category to view sample styles, fabric details, and sample pricing. All garments are available for personalized WhatsApp ordering and South Mumbai store pickup.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat, idx) => (
          <Link
            key={cat.id}
            href={`/shop/${cat.id}`}
            className={`group bg-white rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
              idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            <div className="relative h-56 sm:h-64 bg-[#FAF8F5] overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4A574] bg-black/40 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                  {cat.age}
                </span>
                <h3 className="font-serif text-xl font-bold mt-1.5 drop-shadow-xs">
                  {cat.name}
                </h3>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-[#666666] leading-relaxed">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.itemTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#1B4332] border border-[#EBE7DF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-[#EBE7DF] flex items-center justify-between text-xs font-bold text-[#1B4332] group-hover:text-[#D4A574] transition-colors">
                <span>View {cat.name}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
