'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_CONFIG } from '@/config/business';
import reviewsData from '@/data/reviews.json';

export default function ReviewsSection() {
  return (
    <section className="py-14 sm:py-20 font-sans">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="text-[12px] uppercase tracking-wider text-[var(--terracotta)] font-medium">
              Verified Word of Mouth
            </span>
            <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] tracking-tight mt-1">
              From Kemps Corner Families
            </h2>
          </div>
          <a
            href={BUSINESS_CONFIG.location.googleBusinessShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--ink)] hover:text-[var(--terracotta)] inline-flex items-center gap-1 group focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
          >
            <span>Read all reviews on Google (4.8★)</span>
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>

        {/* 3 Editorial Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviewsData.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[var(--line)] rounded-md p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[var(--ink)] transition-colors"
            >
              <div>
                {/* 5-Star Row */}
                <div role="img" className="flex items-center gap-1 text-[var(--yellow)] mb-4" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-sans font-normal text-[15px] text-[var(--ink)] leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </blockquote>
              </div>

              {/* Author & Verification Tag */}
              <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-[13px] text-[var(--muted)]">
                <span className="font-semibold text-[var(--ink)]">{rev.author}</span>
                <span className="text-[12px] text-[var(--muted)]">{rev.source}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
