'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

interface DepartmentCard {
  slug: string;
  name: string;
  age: string;
  description: string;
  image: string;
  href: string;
  featuredStaples: string;
}

const DEPARTMENTS: DepartmentCard[] = [
  {
    slug: 'newborn',
    name: 'Newborn & Infants',
    age: '0–24 Months',
    description: 'Combed cotton jhablas, open-weave muslin swaddles, rompers, and hooded baby towels.',
    image: '/categories/newborn.webp',
    href: '/shop/newborn/',
    featuredStaples: 'Jhablas · Swaddles · Rompers',
  },
  {
    slug: 'boys',
    name: 'Boys’ Wear',
    age: '0–16 Years',
    description: 'Everyday cotton t-shirts, reinforced cargo shorts, cricket whites, and hosiery nightsuits.',
    image: '/categories/boys.webp',
    href: '/shop/boys/',
    featuredStaples: 'T-Shirts · Cargos · Nightsuits',
  },
  {
    slug: 'girls',
    name: 'Girls’ Wear',
    age: '0–16 Years',
    description: 'Airy cotton and muslin summer frocks, comfortable notched-collar nightsuits, and leggings.',
    image: '/categories/girls.webp',
    href: '/shop/girls/',
    featuredStaples: 'Frocks · Nightwear · Leggings',
  },
  {
    slug: 'bulk',
    name: 'School Uniforms & Bulk',
    age: 'Schools & Teams',
    description: 'Cathedral, JB Petit, and St. Mary’s school uniforms, dryfit house tees, and cricket kits.',
    image: '/categories/bulk.webp',
    href: '/bulk-orders/',
    featuredStaples: 'Cathedral · St. Mary’s · Cricket Whites',
  },
  {
    slug: 'men',
    name: 'Men’s Loungewear',
    age: 'Sizes S – XXL',
    description: 'Heavyweight cotton crewneck t-shirts, boxer shorts, and woven poplin sleep pajamas.',
    image: '/categories/men.webp',
    href: '/shop/men/',
    featuredStaples: 'Crew Tees · Boxers · Pajamas',
  },
  {
    slug: 'women',
    name: 'Women’s Muslin Sleepwear',
    age: 'Sizes S – XXL',
    description: 'Breezy double-layer muslin nightwear sets, cotton Lycra stretch leggings, and slub tops.',
    image: '/categories/women.webp',
    href: '/shop/women/',
    featuredStaples: 'Muslin Sets · Tops · Leggings',
  },
];

export default function CategoryTiles() {
  return (
    <section className="py-12 sm:py-16 bg-[var(--surface)] font-sans border-y border-[var(--line)]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-[12px] uppercase tracking-wider text-[var(--muted)] font-medium">
              Departments &amp; Collections
            </span>
            <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] tracking-tight mt-1">
              Shop by Department
            </h2>
          </div>
          <Link
            href="/shop/"
            className="text-sm font-medium text-[var(--ink)] hover:text-[var(--terracotta)] inline-flex items-center gap-1 group"
          >
            <span>View all collections</span>
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* 6-Card Department Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.slug}
              href={dept.href}
              className="group block bg-white border border-[var(--line)] rounded-md overflow-hidden hover:border-[var(--ink)] transition-all duration-300 shadow-xs"
            >
              {/* Photo Container with 16:10 / 4:3 Ratio */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dept.image}
                  alt={dept.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute top-3 right-3 bg-[var(--ink)] text-white text-[11px] font-medium px-2.5 py-1 rounded-sm">
                  {dept.age}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-[var(--terracotta)] font-medium">
                  {dept.featuredStaples}
                </div>
                <h3 className="font-sans font-medium text-xl text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors">
                  {dept.name}
                </h3>
                <p className="text-[13px] text-[var(--muted)] leading-relaxed font-normal">
                  {dept.description}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-[13px] font-medium text-[var(--ink)] group-hover:underline underline-offset-4">
                  <span>Explore department</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
