import React from 'react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_CONFIG } from '@/config/business';
import reviewsData from '@/data/reviews.json';

export default function ReviewsSection() {
  // Use first 2 reviews verbatim from reviews.json
  const reviews = reviewsData.slice(0, 2);

  return (
    <section className="py-12 sm:py-16 border-b border-[var(--ink)]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[var(--muted)]">
              Customer Voices
            </span>
            <h2 className="font-sans font-medium text-2xl sm:text-3xl text-[var(--ink)] tracking-tight mt-1">
              From Kemps Corner families
            </h2>
          </div>
          <a
            href={BUSINESS_CONFIG.location.googleBusinessShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-sans font-medium text-[var(--blue)] hover:underline underline-offset-4 inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
          >
            <span>View on Google</span>
            <span>&rarr;</span>
          </a>
        </div>

        {/* Two large quote blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between"
            >
              <blockquote className="font-sans font-normal text-lg sm:text-xl text-[var(--ink)] leading-snug">
                &ldquo;{rev.text}&rdquo;
              </blockquote>
              <div className="mt-6 pt-4 border-t border-[var(--ink)]/15 flex items-center justify-between text-xs text-[var(--muted)]">
                <span className="font-medium text-[var(--ink)]">{rev.author}</span>
                <span>{rev.source}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
