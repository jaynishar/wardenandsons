'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import Garment, { GarmentName } from '@/components/Garment';
import { useAddToList } from '@/lib/list-store';
import { IconPlus } from '@/components/icons';
import type { TileColor } from '@/data/specimens';
import { Specimen } from '@/components/Specimen';

interface SubcategorySnapItem {
  categorySlug: string;
  subSlug: string;
  label: string;
  age: string;
  garment: GarmentName;
  color: TileColor;
  photo?: string | null;
}

const FEATURED_SUBCATEGORIES: SubcategorySnapItem[] = [
  {
    categorySlug: 'newborn',
    subSlug: 'bodysuits-jhablas',
    label: 'Cotton Jhablas',
    age: '0–24M',
    garment: 'jhabla',
    color: 'yellow',
    photo: '/products/nb-bodysuit.webp',
  },
  {
    categorySlug: 'newborn',
    subSlug: 'swaddles-blankets',
    label: 'Muslin Swaddles',
    age: '0–12M',
    garment: 'swaddle',
    color: 'red',
    photo: '/products/nb-swaddle.webp',
  },
  {
    categorySlug: 'boys',
    subSlug: 'shorts-joggers-cargos',
    label: 'Cargo Shorts',
    age: '0–16Y',
    garment: 'shorts',
    color: 'yellow',
    photo: '/products/by-cargos.webp',
  },
  {
    categorySlug: 'girls',
    subSlug: 'dresses-frocks',
    label: 'Cotton Frocks',
    age: '0–16Y',
    garment: 'frock',
    color: 'red',
    photo: '/products/gl-dress.webp',
  },
  {
    categorySlug: 'boys',
    subSlug: 'nightwear',
    label: 'Nightwear Sets',
    age: '0–16Y',
    garment: 'nightsuit',
    color: 'ink',
    photo: '/products/by-nightsuit.webp',
  },
  {
    categorySlug: 'bulk',
    subSlug: 'school-uniforms',
    label: 'School Uniforms',
    age: 'All Sizes',
    garment: 'uniform',
    color: 'blue',
    photo: '/products/bk-uniform.webp',
  },
];

export default function CategoryTiles() {
  const { openAddSheet } = useAddToList();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Section Heading */}
        <div className="flex items-baseline justify-between mb-8 sm:mb-10">
          <h2 className="font-sans font-medium text-2xl sm:text-3xl text-[var(--ink)] tracking-tight">
            Shop by category
          </h2>
          <Link
            href="/shop/"
            className="text-sm font-sans font-medium text-[var(--blue)] hover:underline underline-offset-4"
          >
            View all &rarr;
          </Link>
        </div>

        {/* Category Hierarchy Grid: Kids double, Adults smaller, Uniforms wide band */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {/* Newborn - Double Size */}
          <Link
            href="/shop/newborn/"
            className="col-span-2 row-span-2 group block bg-[var(--yellow)] text-[var(--ink)] p-6 sm:p-8 relative overflow-hidden transition-all focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
          >
            <div className="h-full flex flex-col justify-between min-h-[300px] sm:min-h-[380px]">
              <div>
                <h3 className="font-sans font-medium text-2xl sm:text-4xl">
                  Newborn
                </h3>
                <p className="text-sm font-medium opacity-80 mt-1">
                  0–24 Months
                </p>
              </div>
              <div className="w-full flex-1 flex items-center justify-center py-6">
                <Garment
                  name="jhabla"
                  className="w-full h-full max-h-[220px] object-contain transition-transform duration-300 group-hover:scale-105 text-[var(--ink)]"
                  aria-label="Newborn Jhabla"
                />
              </div>
              <div className="text-sm font-medium flex items-center justify-between">
                <span>Combed cotton essentials</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </Link>

          {/* Boys */}
          <Link
            href="/shop/boys/"
            className="col-span-1 group block bg-[var(--blue)] text-white p-5 sm:p-6 relative overflow-hidden transition-all focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
          >
            <div className="h-full flex flex-col justify-between min-h-[170px] sm:min-h-[200px]">
              <div>
                <h3 className="font-sans font-medium text-xl sm:text-2xl">Boys</h3>
                <p className="text-sm opacity-85 mt-0.5">0–16 Years</p>
              </div>
              <div className="w-full flex-1 flex items-center justify-center py-2">
                <Garment
                  name="tshirt"
                  className="w-full h-full max-h-[90px] object-contain transition-transform duration-300 group-hover:scale-105 text-white"
                  aria-label="Boys T-Shirt"
                />
              </div>
              <span className="text-sm opacity-90">&rarr;</span>
            </div>
          </Link>

          {/* Girls */}
          <Link
            href="/shop/girls/"
            className="col-span-1 group block bg-[var(--red)] text-white p-5 sm:p-6 relative overflow-hidden transition-all focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
          >
            <div className="h-full flex flex-col justify-between min-h-[170px] sm:min-h-[200px]">
              <div>
                <h3 className="font-sans font-medium text-xl sm:text-2xl">Girls</h3>
                <p className="text-sm opacity-85 mt-0.5">0–16 Years</p>
              </div>
              <div className="w-full flex-1 flex items-center justify-center py-2">
                <Garment
                  name="frock"
                  className="w-full h-full max-h-[90px] object-contain transition-transform duration-300 group-hover:scale-105 text-white"
                  aria-label="Girls Frock"
                />
              </div>
              <span className="text-sm opacity-90">&rarr;</span>
            </div>
          </Link>

          {/* Men - Smaller */}
          <Link
            href="/shop/men/"
            className="col-span-1 group block bg-[var(--ink)] text-white p-5 sm:p-6 relative overflow-hidden transition-all focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
          >
            <div className="h-full flex flex-col justify-between min-h-[150px] sm:min-h-[170px]">
              <div>
                <h3 className="font-sans font-medium text-lg sm:text-xl">Men</h3>
                <p className="text-sm opacity-80 mt-0.5">Sizes S–XXL</p>
              </div>
              <div className="w-full flex-1 flex items-center justify-center py-1">
                <Garment
                  name="tshirt"
                  className="w-full h-full max-h-[75px] object-contain transition-transform duration-300 group-hover:scale-105 text-white"
                  aria-label="Men Cotton Basics"
                />
              </div>
              <span className="text-sm opacity-90">&rarr;</span>
            </div>
          </Link>

          {/* Women - Smaller */}
          <Link
            href="/shop/women/"
            className="col-span-1 group block bg-[var(--red)] text-white p-5 sm:p-6 relative overflow-hidden transition-all focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
          >
            <div className="h-full flex flex-col justify-between min-h-[150px] sm:min-h-[170px]">
              <div>
                <h3 className="font-sans font-medium text-lg sm:text-xl">Women</h3>
                <p className="text-sm opacity-80 mt-0.5">Sizes S–XXL</p>
              </div>
              <div className="w-full flex-1 flex items-center justify-center py-1">
                <Garment
                  name="kaftan"
                  className="w-full h-full max-h-[75px] object-contain transition-transform duration-300 group-hover:scale-105 text-white"
                  aria-label="Women Kaftan"
                />
              </div>
              <span className="text-sm opacity-90">&rarr;</span>
            </div>
          </Link>

          {/* Uniforms & Bulk - Wide Band */}
          <Link
            href="/bulk-orders/"
            className="col-span-2 md:col-span-4 group block bg-[var(--blue)] text-white p-6 sm:p-8 relative overflow-hidden transition-all focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-sans font-medium text-xl sm:text-2xl">
                  School Uniforms & Bulk Orders
                </h3>
                <p className="text-sm opacity-90 max-w-xl">
                  Serving Cathedral, Bombay Scottish, St. Mary’s and sports teams across South Mumbai.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Garment
                  name="uniform"
                  className="w-16 h-20 object-contain text-white"
                  aria-label="School Uniform"
                />
                <span className="h-[44px] px-6 inline-flex items-center justify-center font-sans font-medium text-sm bg-white text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-white transition-colors">
                  Inquire
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Featured essentials grid: 2 col phone, 3 col tablet, 6 col desktop */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-sans font-medium text-[var(--ink)]">
              Popular essentials
            </h3>
            <span className="text-sm text-[var(--muted)]">
              Daily South Mumbai favourites
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_SUBCATEGORIES.map((sub) => (
              <div
                key={`${sub.categorySlug}-${sub.subSlug}`}
                className="bg-[var(--surface)] p-3 flex flex-col justify-between"
              >
                <Link
                  href={`/shop/${sub.categorySlug}/${sub.subSlug}/`}
                  className="block group"
                >
                  <Specimen
                    category={sub.categorySlug}
                    sub={sub.subSlug}
                    garment={sub.garment}
                    color={sub.color}
                    photo={sub.photo}
                    label={sub.label}
                    ageRange={sub.age}
                    aspect="4:5"
                    showCaption={false}
                  />
                  <div className="pt-2">
                    <h4 className="font-sans font-medium text-sm text-[var(--ink)] truncate group-hover:text-[var(--blue)]">
                      {sub.label}
                    </h4>
                    <p className="text-sm text-[var(--muted)]">{sub.age}</p>
                  </div>
                </Link>

                <div className="pt-3 mt-2 flex items-center justify-between">
                  <Link
                    href={`/shop/${sub.categorySlug}/${sub.subSlug}/`}
                    className="text-sm font-medium text-[var(--ink)] hover:underline"
                  >
                    Details
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openAddSheet({ categorySlug: sub.categorySlug, subSlug: sub.subSlug });
                    }}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                    aria-label={`Add ${sub.label} to list`}
                  >
                    <IconPlus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
