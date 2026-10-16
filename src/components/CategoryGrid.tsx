import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Trophy } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  age: string;
  description: string;
  itemTags: string[];
  themeColor: string;
  accentBg: string;
}

const categories: CategoryItem[] = [
  {
    id: 'newborn',
    name: 'Newborns & Infants',
    age: '0 – 24 Months',
    description: 'Breathable cotton swaddles, bodysuits, sleepsuits, jhablas, rompers, bathrobes & hooded towels.',
    itemTags: ['Bodysuits', 'Swaddles', 'Sleepsuits', 'Towels'],
    themeColor: 'text-[#1B4332]',
    accentBg: 'from-[#FAF8F5] to-[#EFECE6]',
  },
  {
    id: 'boys',
    name: 'Boys’ Wear',
    age: '0 – 16 Years',
    description: 'Everyday cotton tees, sports coordinate sets, nightsuits, cargo joggers, and cricket whites.',
    itemTags: ['Cotton Tees', 'Dryfit Sets', 'Nightwear', 'Cargos'],
    themeColor: 'text-[#1B4332]',
    accentBg: 'from-[#EFECE6] to-[#FAF8F5]',
  },
  {
    id: 'girls',
    name: 'Girls’ Wear',
    age: '0 – 16 Years',
    description: 'Airy muslin dresses, hosiery pajama nightsuits, stretch leggings, and light denim shackets.',
    itemTags: ['Muslin Dresses', 'Nightsuits', 'Leggings', 'Tops'],
    themeColor: 'text-[#1B4332]',
    accentBg: 'from-[#FAF8F5] to-[#EFECE6]',
  },
  {
    id: 'men',
    name: 'Men’s Basics & Loungewear',
    age: 'Sizes S – XXL',
    description: 'Cotton crew tees, double-knit gym shorts, track pants, and comfortable sleep pajamas.',
    itemTags: ['Crew Tees', 'Gym Shorts', 'Track Pants', 'Pajamas'],
    themeColor: 'text-[#1B4332]',
    accentBg: 'from-[#EFECE6] to-[#FAF8F5]',
  },
  {
    id: 'women',
    name: 'Women’s Basics & Loungewear',
    age: 'Sizes S – XXL',
    description: 'Double-layer muslin pajama sets, opaque cotton Lycra leggings, relaxed lounge tops, and kaftans.',
    itemTags: ['Muslin Sets', 'Opaque Leggings', 'Lounge Tops'],
    themeColor: 'text-[#1B4332]',
    accentBg: 'from-[#FAF8F5] to-[#EFECE6]',
  },
  {
    id: 'bulk',
    name: 'Custom Uniforms & Bulk Orders',
    age: 'Schools & Teams',
    description: 'Bespoke school uniform tailoring, cricket academy whites, athletic jerseys, and institutional apparel.',
    itemTags: ['School Uniforms', 'Cricket Whites', 'Sports Kits', 'Embroidery'],
    themeColor: 'text-[#1B4332]',
    accentBg: 'from-[#FAF8F5] to-[#EFECE6]',
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 font-sans">
      <div className="text-center space-y-3 mb-10 md:mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          Curated Department Collections
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B4332]">
          Explore by Category
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] max-w-xl mx-auto leading-relaxed">
          Select a department to view representative styles and fabric details. All garments are available for personalized WhatsApp enquiries and Kemps Corner store pickup.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.id === 'bulk' ? '/bulk-orders' : `/shop/${cat.id}`}
            className="group bg-white rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            {/* Editorial Category Visual Header */}
            <div className={`relative h-44 sm:h-48 bg-gradient-to-br ${cat.accentBg} p-6 flex flex-col justify-between border-b border-[#EBE7DF]/80`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B4332] bg-white/90 px-3 py-1 rounded-full shadow-2xs border border-[#EBE7DF]">
                  {cat.age}
                </span>
                <span className="text-[#D4A574]">
                  {cat.id === 'bulk' ? <Trophy className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                </span>
              </div>
              
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#D4A574] block">
                  Department
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1B4332] mt-0.5 group-hover:text-[#D4A574] transition-colors">
                  {cat.name}
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-[#666666] leading-relaxed">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.itemTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-[#FAF8F5] text-[#1B4332] border border-[#EBE7DF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-[#EBE7DF] flex items-center justify-between text-xs font-bold text-[#1B4332] group-hover:text-[#D4A574] transition-colors">
                <span>View Department</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
