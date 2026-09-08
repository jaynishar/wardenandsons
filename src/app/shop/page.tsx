import React from 'react';
import Link from 'next/link';
import { MessageSquare, Video, ShieldCheck, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Categories Catalog',
  description: 'Browse our kids clothing catalog categories by age and gender. Buy newborn baby clothes, boys playwear, girls dresses, and basics at Warden & Sons.',
  alternates: {
    canonical: '/shop',
  },
};

const shopCategories = [
  {
    id: 'newborn',
    name: 'Newborns & Infants',
    size: '0 - 24 Months',
    description: 'Ultra-soft, organic-grade cotton swaddles, bodysuits, sleepsuits, onesies, rompers, bathrobes & bibs designed for sensitive baby skin.',
    items: 'Bodysuits, Onesies, Rompers, Dresses, Towels, Bathrobes, Swaddles, Blankets, Caps, Mittens, Booties, Bibs',
    bgColor: 'bg-primary-900',
    textColor: 'text-primary-100',
  },
  {
    id: 'boys',
    name: 'Boys Clothing',
    size: '0 - 16 Years',
    description: 'Durable playwear, sporty activewear, matching sets, and school basics. Breathable, cotton-rich layers that handle active play.',
    items: 'T-Shirts (plain/printed/fancy), Shirts, Shorts, Bottoms (jeans/joggers/cargos), Nightwear, Quad Sets, Sportswear, Swimwear, Innerwear, Socks, Winterwear',
    bgColor: 'bg-primary-800',
    textColor: 'text-primary-100',
  },
  {
    id: 'girls',
    name: 'Girls Clothing',
    size: '0 - 16 Years',
    description: 'Pretty everyday tops, lightweight dresses, cozy nightsuits, and sporty activewear coordinate sets in soft combed cotton colors.',
    items: 'Tops (plain/printed/fancy), Shirts, Shorts, Bottoms, Nightwear, Quad Sets, Sportswear, Swimwear, Innerwear, Socks, Caps, Goggles, Winterwear',
    bgColor: 'bg-accent-600',
    textColor: 'text-accent-100',
  },
  {
    id: 'men',
    name: 'Men’s Daily Basics',
    size: 'S - XXL Sizes',
    description: 'High-quality everyday undershirts, lounge shorts, plain t-shirts, and socks. Focus on premium 180 GSM cotton weights.',
    items: 'Innerwear, Sports/Gym wear, Shorts, Track Pants, Plain T-Shirts (180 GSM), Socks, Thermals, Handkerchiefs',
    bgColor: 'bg-slate-700',
    textColor: 'text-slate-100',
  },
  {
    id: 'women',
    name: 'Women’s Daily Basics',
    size: 'Free Size & S - XL',
    description: 'Ultra-soft cotton leggings, tights, night suits, and loungewear. Relaxed fit options built for humid coastal heat.',
    items: 'Innerwear, Night Suits (cotton & muslin), Tights, Leggings, Gym Wear, Free-size Tops, Plain T-Shirts (180 GSM), Socks, Thermals, Handkerchiefs',
    bgColor: 'bg-slate-800',
    textColor: 'text-slate-100',
  },
];

export default function ShopIndexPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
          🛍️ Warden & Sons Catalog
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary-800 leading-tight">
          Browse Our Shop Categories
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Select a category below to browse catalog details. Sizing is customized, and purchase is completed easily via WhatsApp or live video calls.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shopCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-primary-50 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className={`p-6 ${cat.bgColor} text-white space-y-2`}>
              <span className="text-[10px] text-accent-400 font-bold uppercase tracking-widest">
                {cat.size}
              </span>
              <h2 className="font-heading font-bold text-2xl text-white">{cat.name}</h2>
            </div>
            
            <div className="p-6 flex-grow space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{cat.description}</p>
              
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-sans">Popular Styles:</span>
                <p className="text-[11px] text-primary-800 font-semibold font-sans leading-relaxed">
                  {cat.items}
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-primary-50 grid grid-cols-2 gap-3 bg-warm-bg/25">
              <Link
                href={`/shop/${cat.id}`}
                className="bg-primary-800 hover:bg-primary-700 text-white font-bold text-xs py-3 px-4 rounded-xl text-center shadow-sm transition-colors flex items-center justify-center min-h-[44px]"
              >
                Browse Items
              </Link>
              <a
                href="https://wa.me/message/NBG6MFUV3EXYG1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white font-bold text-xs py-3 px-4 rounded-xl text-center shadow-sm transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                💬 Buy on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Shop Info Band */}
      <section className="bg-primary-50 p-8 rounded-3xl border border-primary-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
        <div className="space-y-4">
          <h2 className="font-heading text-2xl font-bold text-primary-800">
            Dressing Kids Comfortably in Mumbai
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Because Mumbai’s humidity is consistently high, our garments avoid polyester and scratchy synthetics that trap heat. We prioritize 180 GSM combed cottons and light muslin weaves that dry rapidly and prevent heat rashes on delicate skin.
          </p>
          <div className="flex gap-4 pt-2">
            <Link
              href="/video-shopping"
              className="bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 min-h-[44px]"
            >
              📹 Book Video Call Sizing
            </Link>
          </div>
        </div>

        <div className="space-y-4 text-xs font-semibold text-primary-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
            <span>Pre-shrunk, azo-free organic-dyed cotton base fabrics.</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
            <span>Stretchy hosiery bindings that don't bite active waists.</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
            <span>Easy exchange within 7 days at our Kemps Corner store.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
