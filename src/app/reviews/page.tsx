import React from 'react';
import { Star, MessageSquare, HeartHandshake, MapPin } from 'lucide-react';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/config/business';

export const metadata: Metadata = {
  title: 'Customer Feedback & Boutique Trust',
  description:
    'Warden & Sons Kids Wear at Kemps Corner, South Mumbai. Share your experience, leave a Google review, or send feedback to our family store desk.',
  alternates: {
    canonical: '/reviews',
  },
};

export default function ReviewsPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] text-[#D4A574] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-[#D4A574]/30">
          ★ Kemps Corner, South Mumbai
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#1B4332] leading-tight">
          Customer Stories &amp; Neighborhood Trust
        </h1>
        <p className="text-sm md:text-base text-[#666666] max-w-2xl mx-auto leading-relaxed">
          For over 30 years, Warden &amp; Sons has grown through word-of-mouth recommendations from parents, grandparents, and schools across South Bombay.
        </p>
      </div>

      {/* Trust & Heritage Banner */}
      <div className="bg-[#FAF8F5] border border-[#EBE7DF] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="space-y-2 max-w-xl">
          <div className="flex justify-center md:justify-start items-center space-x-1 text-[#D4A574]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#D4A574]" />
            ))}
          </div>
          <h2 className="font-serif font-bold text-2xl text-[#1B4332]">
            Three Decades of Family Relationships
          </h2>
          <p className="text-xs text-[#666666] leading-relaxed">
            We value genuine relationships over automated ratings. If you have visited our store or ordered via WhatsApp, we would love to hear your authentic feedback.
          </p>
        </div>

        <a
          href={BUSINESS_CONFIG.location.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-xs transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
          id="reviews-page-google-leave-review-cta"
        >
          <Star className="w-4 h-4 text-[#D4A574] fill-[#D4A574]" />
          <span>Leave a Review on Google Maps</span>
        </a>
      </div>

      {/* Honest Commitment Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#EBE7DF] p-6 rounded-2xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#1B4332] flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
            Generational Continuity
          </h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            Many parents who visit us today were brought to Warden &amp; Sons as infants by their own parents. We continue to dress each generation with pure cotton care.
          </p>
        </div>

        <div className="bg-white border border-[#EBE7DF] p-6 rounded-2xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#1B4332] flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
            Real Measuring Tape Checks
          </h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            We measure every piece live before shipping to ensure perfect fits. No generic size chart guesses or return hassles for busy parents.
          </p>
        </div>

        <div className="bg-white border border-[#EBE7DF] p-6 rounded-2xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] text-[#1B4332] flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
            Direct Family Communication
          </h3>
          <p className="text-xs text-[#666666] leading-relaxed">
            Every WhatsApp message and telephone call is answered directly by our store team at Kemps Corner, ensuring warm and knowledgeable service.
          </p>
        </div>
      </div>

      {/* Feedback CTA */}
      <div className="bg-white border border-[#EBE7DF] p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 bg-[#FAF8F5] text-[#1B4332] rounded-full flex items-center justify-center mx-auto border border-[#EBE7DF]">
          <HeartHandshake className="w-6 h-6 text-[#D4A574]" />
        </div>
        <h3 className="font-serif font-bold text-2xl text-[#1B4332]">
          Share Your Suggestions with Us
        </h3>
        <p className="text-xs text-[#666666] leading-relaxed max-w-md mx-auto">
          Have ideas on new prints, sizing requirements, or school uniforms? Send our family team a note directly on WhatsApp.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <a
            href={BUSINESS_CONFIG.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
            <span>Send Feedback on WhatsApp</span>
          </a>
          <a
            href={BUSINESS_CONFIG.location.googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[#EBE7DF] text-[#1A1A1A] hover:bg-[#FAF8F5] font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#D4A574]" />
            <span>Visit Kemps Corner Store</span>
          </a>
        </div>
      </div>
    </div>
  );
}
