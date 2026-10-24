import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import SchoolsServedSection from '@/components/SchoolsServedSection';
import { COPY_DECK } from '@/content/copy';
import { BUSINESS_CONFIG } from '@/config/business';
import reviewsData from '@/data/reviews.json';

export default function StoreStrip() {
  const reviews = reviewsData.slice(0, 2);

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="space-y-8">
          {/* Store Intro & Location Line */}
          <div className="border-b border-[var(--line)] pb-8 space-y-4">
            <p className="text-base text-[var(--ink)] max-w-2xl leading-relaxed">
              Family-run kids clothing store at Kemps Corner since 1994. Newborn essentials, everyday kidswear, nightwear, sportswear, school uniforms and a few family basics.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <p className="text-sm text-[var(--ink-soft)]">
                {COPY_DECK.store.line}
              </p>
              <Link
                href="/visit-us/"
                data-track="directions_click"
                className="text-xs uppercase tracking-wider text-[var(--ink)] font-medium underline underline-offset-4 hover:text-[var(--blue)] transition-colors self-start sm:self-auto shrink-0"
              >
                Directions to store &rarr;
              </Link>
            </div>
          </div>

          {/* Two Real Customer Reviews */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xs uppercase tracking-widest text-[var(--ink-soft)] font-medium">
                Customer reviews
              </h2>
              <a
                href={BUSINESS_CONFIG.location.googleBusinessShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions_click"
                className="text-xs uppercase tracking-wider text-[var(--ink)] font-medium underline underline-offset-4 hover:text-[var(--blue)] transition-colors"
              >
                View on Google &rarr;
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[var(--paper)] border border-[var(--line)] rounded-[6px] p-5 space-y-3"
                >
                  <p className="text-sm text-[var(--ink)] leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="text-xs text-[var(--ink-soft)]">
                    <span className="font-medium text-[var(--ink)]">{review.author}</span>
                    {' · '}
                    <span>{review.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Trust & Schools Served (renders nothing when empty) */}
          <SchoolsServedSection />
        </div>
      </Container>
    </section>
  );
}
