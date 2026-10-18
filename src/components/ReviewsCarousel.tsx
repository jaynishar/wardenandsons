'use client';

import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function ReviewsCarousel() {
  return (
    <div className="relative max-w-4xl mx-auto px-6 py-8 bg-bg-cream border border-border-soft rounded-2xl shadow-xs text-center font-sans space-y-4">
      {/* Decorative Stars Header */}
      <div className="flex justify-center items-center space-x-1 text-gold">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-gold" />
        ))}
      </div>

      <div className="space-y-2 max-w-2xl mx-auto">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-forest">
          {BUSINESS_CONFIG.establishment.displayText}
        </h3>
        <p className="text-xs sm:text-sm text-muted leading-relaxed italic">
          &ldquo;Our boutique has dressed generations of South Mumbai children through personal
          family relationships, honest cotton quality, and word-of-mouth trust.&rdquo;
        </p>
      </div>

      <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
        <a
          href={BUSINESS_CONFIG.location.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-forest hover:bg-forest-dark text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all inline-flex items-center gap-1.5"
          id="reviews-carousel-google-review-cta"
        >
          <Star className="w-3.5 h-3.5 text-gold fill-gold" />
          <span>Leave a Review on Google Maps</span>
        </a>
        <a
          href={BUSINESS_CONFIG.phone.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-border-soft text-near-black hover:bg-gray-50 text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all inline-flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-whatsapp" />
          <span>Share Feedback on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
