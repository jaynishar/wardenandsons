import React from 'react';
import { Star, ExternalLink, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';
import reviewsData from '@/data/reviews.json';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  source: string;
}

export default function GoogleReviewsBlock() {
  // TODO: Store owner to confirm that customer reviews in src/data/reviews.json are verbatim Google reviews
  const reviews: Review[] = reviewsData;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 font-sans">
      <div className="border-t border-border-soft pt-12 space-y-8">
        {/* Header & Google Rating Summary */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-forest">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span>4.8 Rating on Google</span>
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-[11px] text-muted flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold" />
                Kemps Corner, South Mumbai
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              What South Mumbai Families Say
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl">
              Authentic reviews from families shopping children’s everyday wear and school uniforms at our Kemps Corner shop.
            </p>
          </div>

          <a
            href={BUSINESS_CONFIG.location.googleBusinessShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="directions_click"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-gold transition-colors shrink-0"
          >
            <span>View all reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold" />
          </a>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-border-soft p-6 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-xs text-near-black leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-border-soft/60 flex items-center justify-between text-[11px] text-muted">
                <span className="font-semibold text-forest">{review.author}</span>
                <span className="text-gray-400">{review.source}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Prominent Link to All Google Reviews */}
        <div className="pt-2 text-center">
          <a
            href={BUSINESS_CONFIG.location.googleBusinessShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="directions_click"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border-soft bg-white hover:bg-bg-cream text-forest font-bold text-xs shadow-2xs transition-all hover:scale-[1.01]"
          >
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span>View all reviews on Google (4.8 ★)</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold" />
          </a>
        </div>
      </div>
    </section>
  );
}
