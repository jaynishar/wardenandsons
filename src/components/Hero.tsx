'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { BUSINESS_CONFIG } from '@/config/business';
import { IconWhatsApp } from '@/components/icons';

interface LookbookItem {
  id: string;
  tabLabel: string;
  title: string;
  categorySlug: string;
  age: string;
  image: string;
  href: string;
  fabric: string;
  description: string;
}

const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'newborn',
    tabLabel: 'Newborn (0–24M)',
    title: 'Combed Cotton Newborn Basics',
    categorySlug: 'newborn',
    age: '0–24 Months',
    image: '/products/nb-bodysuit.webp',
    href: '/shop/newborn/',
    fabric: '100% Combed Cotton',
    description: 'Envelope necklines, flat anti-chafing seams, and nickel-free snaps for delicate newborn skin.',
  },
  {
    id: 'boys',
    tabLabel: 'Boys (0–16Y)',
    title: 'Durable Boys Playwear & Shorts',
    categorySlug: 'boys',
    age: '0–16 Years',
    image: '/products/by-cargos.webp',
    href: '/shop/boys/',
    fabric: 'Breathable Cotton Twill & Hosiery',
    description: 'Rugged cargo shorts, maidan cricket whites, and pre-washed cotton tees made for active days.',
  },
  {
    id: 'girls',
    tabLabel: 'Girls (0–16Y)',
    title: 'Airy Muslin Frocks & Loungewear',
    categorySlug: 'girls',
    age: '0–16 Years',
    image: '/products/gl-dress.webp',
    href: '/shop/girls/',
    fabric: 'Pure Cotton Cambric & Muslin',
    description: 'Gentle breezy frocks, stretch leggings, and notched-collar nightsuits with zero itchy tulle.',
  },
  {
    id: 'uniforms',
    tabLabel: 'School Uniforms',
    title: 'South Mumbai School Uniforms',
    categorySlug: 'bulk',
    age: 'Ages 3–18',
    image: '/products/bk-uniform.webp',
    href: '/bulk-orders/',
    fabric: 'Heavyweight Durable Poly-Viscose & Cotton',
    description: 'Tailored school uniforms, sports day dryfit kits, and cricket whites made to institutional standards.',
  },
];

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = LOOKBOOK_ITEMS[activeIdx];

  return (
    <section className="pt-6 sm:pt-10 pb-12 sm:pb-16 font-sans">
      <Container>
        {/* Main Hero Lookbook Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Heritage Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--surface)] border border-[var(--line)] rounded-sm text-[12px] font-medium tracking-wide uppercase text-[var(--muted)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--terracotta)]" aria-hidden="true" />
              <span>Est. 1994 · Kemps Corner, South Mumbai</span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-4">
              <h1 className="font-sans font-medium text-[var(--ink)] text-4xl sm:text-5xl lg:text-[62px] leading-[1.05] tracking-tight">
                Pure Cottons for Mumbai Children
              </h1>
              <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-xl font-normal">
                Breathable combed cottons, gentle muslin swaddles, daily playwear, and bespoke school uniforms — curated for Mumbai’s humid coastal climate. Serving South Mumbai families for over 30 years.
              </p>
            </div>

            {/* Primary & WhatsApp CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/shop/"
                className="h-[50px] px-8 inline-flex items-center justify-center font-medium text-[14px] tracking-wide bg-[var(--ink)] text-white hover:bg-[var(--blue)] active:scale-[0.98] transition-all cursor-pointer rounded-sm shadow-xs"
              >
                Explore Collections
              </Link>
              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="hero"
                className="h-[50px] px-7 inline-flex items-center justify-center gap-2 font-medium text-[14px] tracking-wide bg-white border border-[var(--line)] text-[var(--ink)] hover:border-[var(--wa)] hover:text-[var(--wa)] active:scale-[0.98] transition-all cursor-pointer rounded-sm"
              >
                <IconWhatsApp size={18} className="text-[var(--wa)]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Department Quick Switcher Tabs */}
            <div className="pt-2">
              <p className="text-[12px] uppercase tracking-wider text-[var(--muted)] font-medium mb-3">
                Featured Departments
              </p>
              <div className="flex flex-wrap gap-2">
                {LOOKBOOK_ITEMS.map((item, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`px-3.5 py-2 text-[13px] font-medium transition-all cursor-pointer rounded-sm border ${
                        isActive
                          ? 'bg-[var(--surface)] border-[var(--ink)] text-[var(--ink)] shadow-xs'
                          : 'bg-white border-[var(--line)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {item.tabLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Fashion Photography Lookbook */}
          <div className="lg:col-span-5">
            <div className="relative group bg-[var(--surface)] border border-[var(--line)] rounded-md overflow-hidden p-3 transition-all duration-300">
              {/* Product Photo Canvas */}
              <Link
                href={active.href}
                className="block relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image}
                  alt={active.title}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Fabric Badge */}
                <div aria-hidden="true" className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium text-[var(--ink)] border border-[var(--line)] rounded-sm">
                  {active.fabric}
                </div>

                {/* Age Range Badge */}
                <div aria-hidden="true" className="absolute top-3 right-3 bg-[var(--ink)] text-white px-2.5 py-1 text-[11px] font-medium rounded-sm">
                  {active.age}
                </div>

                {/* Bottom Editorial Caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--ink)]/85 via-[var(--ink)]/40 to-transparent p-5 text-white">
                  <p className="font-sans font-medium text-lg leading-snug">
                    {active.title}
                  </p>
                  <p className="text-[13px] text-white/80 line-clamp-1 mt-0.5">
                    {active.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-white group-hover:underline underline-offset-4">
                    <span>Explore Department</span>
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 3-Pillar Heritage Strip Under Hero */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[var(--line)] grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          <div className="flex items-start gap-3.5">
            <span className="text-[var(--terracotta)] font-mono text-base font-medium">01</span>
            <div>
              <p className="text-[14px] font-semibold text-[var(--ink)] tracking-tight">
                Kemps Corner Heritage
              </p>
              <p className="text-[13px] text-[var(--muted)] leading-relaxed mt-1">
                Serving South Mumbai families for over 30 years from Shop No. 7, Haji Habib Building.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="text-[var(--terracotta)] font-mono text-base font-medium">02</span>
            <div>
              <p className="text-[14px] font-semibold text-[var(--ink)] tracking-tight">
                100% Coastal Cottons
              </p>
              <p className="text-[13px] text-[var(--muted)] leading-relaxed mt-1">
                Breathable combed cottons, open-weave muslin, and flat anti-chafing seams for humid weather.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="text-[var(--terracotta)] font-mono text-base font-medium">03</span>
            <div>
              <p className="text-[14px] font-semibold text-[var(--ink)] tracking-tight">
                WhatsApp Desk &amp; Sizing
              </p>
              <p className="text-[13px] text-[var(--muted)] leading-relaxed mt-1">
                Send your child’s age and height for live rack photos and counter tape measurements.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
