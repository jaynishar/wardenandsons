'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/Logo';
import { Garment } from '@/components/Garment';
import { BUSINESS_CONFIG } from '@/config/business';
import { Ticker1994 } from '@/components/Ticker1994';
import type { GarmentName } from '@/components/Garment';
import type { TileColor } from '@/data/specimens';

interface HeroCategory {
  slug: string;
  label: string;
  age: string;
  garment: GarmentName;
  color: TileColor;
  href: string;
}

const HERO_CATEGORIES: HeroCategory[] = [
  { slug: 'newborn', label: 'Newborn', age: '0–24M', garment: 'jhabla', color: 'yellow', href: '/shop/newborn/' },
  { slug: 'boys', label: 'Boys', age: '0–16Y', garment: 'tshirt', color: 'blue', href: '/shop/boys/' },
  { slug: 'girls', label: 'Girls', age: '0–16Y', garment: 'frock', color: 'red', href: '/shop/girls/' },
  { slug: 'men', label: 'Men', age: 'S–XXL', garment: 'tshirt', color: 'ink', href: '/shop/men/' },
  { slug: 'women', label: 'Women', age: 'S–XXL', garment: 'kaftan', color: 'red', href: '/shop/women/' },
  { slug: 'uniforms', label: 'Uniforms & Bulk', age: 'Schools', garment: 'uniform', color: 'blue', href: '/bulk-orders/' },
];

export default function Hero() {
  const [activeSlug, setActiveSlug] = useState('newborn');
  const active = HERO_CATEGORIES.find((c) => c.slug === activeSlug) || HERO_CATEGORIES[0];

  const colorStyles: Record<TileColor, { bg: string; fg: string }> = {
    red: { bg: 'bg-[var(--red)]', fg: 'text-white' },
    blue: { bg: 'bg-[var(--blue)]', fg: 'text-white' },
    yellow: { bg: 'bg-[var(--yellow)]', fg: 'text-[var(--ink)]' },
    ink: { bg: 'bg-[var(--ink)]', fg: 'text-white' },
  };

  const { bg, fg } = colorStyles[active.color];

  return (
    <section className="pt-6 sm:pt-10 pb-8 sm:pb-12 border-b border-[var(--ink)] font-sans">
      <Container>
        {/* Top-left Big Logo with 0-400ms tiles-drop stagger */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Warden & Sons Kids Wear Home"
            className="inline-block animate-tiles-drop"
          >
            <Logo
              variant="full"
              height={52}
              className="w-[70%] sm:w-[45%] md:w-[28%] max-w-[280px] h-auto object-contain"
            />
          </Link>
          <Ticker1994 />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              {/* Masked overflow line-by-line rise (200-700ms) */}
              <div className="overflow-hidden">
                <h1 className="animate-masked-rise font-sans font-medium text-[var(--ink)] text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight max-w-xl text-balance">
                  Kids Clothes in Kemps Corner, South Mumbai
                </h1>
              </div>
              <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-lg">
                Breathable combed cotton basics, nightwear and uniforms. Pick items, send on WhatsApp.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/shop/"
                className="h-[52px] px-8 inline-flex items-center justify-center font-sans font-medium text-[15px] bg-[var(--ink)] text-white hover:bg-[var(--blue)] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
              >
                Shop
              </Link>
              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="hero"
                className="h-[52px] px-8 inline-flex items-center justify-center font-sans font-medium text-[15px] bg-white border-2 border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--surface)] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Large Specimen Tile: Opens like a shutter (400-1200ms) */}
          <div className="lg:col-span-5">
            <Link
              href={active.href}
              className="block group"
              aria-label={`Explore ${active.label} collection`}
            >
              <div
                className={`animate-shutter relative w-full aspect-[4/5] max-w-md mx-auto ${bg} ${fg} transition-colors duration-200 flex items-center justify-center p-8 sm:p-12 overflow-hidden shadow-none hover-lift`}
              >
                <Garment
                  name={active.garment}
                  className={`w-full h-full max-h-[75%] transition-transform duration-300 group-hover:scale-105 ${fg}`}
                  aria-label={active.label}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs tracking-wide uppercase font-medium">
                  <span>{active.label}</span>
                  <span>{active.age}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Category Picker directly below hero: 160ms slide, 200ms color ease */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-[var(--surface)]">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
            role="tablist"
            aria-label="Category specimen picker"
          >
            {HERO_CATEGORIES.map((cat) => {
              const isActive = cat.slug === activeSlug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSlug(cat.slug)}
                  className={`px-4 py-2 text-sm font-sans whitespace-nowrap transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)] ${
                    isActive
                      ? 'bg-[var(--ink)] text-white font-medium'
                      : 'bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
