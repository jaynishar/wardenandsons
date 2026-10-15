'use client';

import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function ReviewsCarousel() {
  return (
    <div className="relative max-w-4xl mx-auto px-6 py-8 bg-[#FAF8F5] border border-[#EBE7DF] rounded-2xl shadow-xs text-center font-sans space-y-4">
      {/* Decorative Stars Header */}
      <div className="flex justify-center items-center space-x-1 text-[#D4A574]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#D4A574]" />
        ))}
      </div>

      <div className="space-y-2 max-w-2xl mx-auto">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1B4332]">
          {BUSINESS_CONFIG.establishment.displayText}
        </h3>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed italic">
          &ldquo;Our boutique has dressed generations of South Mumbai children through personal family relationships, honest cotton quality, and word-of-mouth trust.&rdquo;
        </p>
      </div>

      <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
        <a
          href={BUSINESS_CONFIG.location.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all inline-flex items-center gap-1.5"
          id="reviews-carousel-google-review-cta"
        >
          <Star className="w-3.5 h-3.5 text-[#D4A574] fill-[#D4A574]" />
          <span>Leave a Review on Google Maps</span>
        </a>
        <a
          href={BUSINESS_CONFIG.phone.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-[#EBE7DF] text-[#1A1A1A] hover:bg-gray-50 text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all inline-flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
          <span>Share Feedback on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
