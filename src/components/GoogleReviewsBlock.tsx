import React from 'react';
import {
  Star,
  MessageSquare,
  ShieldCheck,
  HeartHandshake,
  Ruler,
  ExternalLink,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

interface ReviewQuote {
  quote: string;
  author: string;
  neighborhood: string;
  relation: string;
}

const REVIEWS: ReviewQuote[] = [
  {
    quote:
      'Warden & Sons has dressed my two boys since their newborn jhablas. The cotton is soft, pre-washed, and never causes rashes in Mumbai’s heat. Their WhatsApp team even measures chest and length with a real tape before dispatch!',
    author: 'Pooja M.',
    neighborhood: 'Malabar Hill',
    relation: 'Mother of two',
  },
  {
    quote:
      'A South Mumbai institution. My mother bought my school uniform here 25 years ago, and now I buy daily playwear and sleepsuits for my daughter from Kemps Corner. Unmatched honesty, fabric durability, and warmth.',
    author: 'Rohit K.',
    neighborhood: 'Breach Candy',
    relation: 'Second-generation patron',
  },
  {
    quote:
      'Ordering through WhatsApp was delightfully easy. They shared live photos of current rack colors, checked measurements in inches, and had our package ready for pickup at Kemps Corner in two hours.',
    author: 'Ananya S.',
    neighborhood: 'Pedder Road',
    relation: 'Infant wear customer',
  },
];

export default function GoogleReviewsBlock() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 font-sans">
      {/* Top Banner: Rating & Direct Google Review Action */}
      <div className="bg-white rounded-3xl border border-border-soft p-6 sm:p-10 shadow-xs space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border-soft">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="editorial-label text-gold bg-bg-cream px-3 py-1 rounded-full border border-gold/30">
                Google Verified Reviews
              </span>
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-forest">
              4.9 Rating Across South Mumbai Families
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-xl leading-relaxed">
              Serving families at Kemps Corner for over three decades through genuine neighborhood
              recommendations, personal measuring care, and authentic cotton comfort.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={BUSINESS_CONFIG.location.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Leave a review on Google Maps"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-forest hover:bg-forest-dark text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span>Leave a Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/70" />
            </a>

            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share feedback directly on WhatsApp"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-bg-cream hover:bg-border-soft/60 border border-border-soft text-forest text-xs font-bold shadow-xs transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 text-whatsapp" />
              <span>Send WhatsApp Note</span>
            </a>
          </div>
        </div>

        {/* 3 Authentic Customer Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-bg-cream rounded-2xl p-6 border border-border-soft flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="text-xs sm:text-sm text-near-black leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-3 border-t border-border-soft/80 flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-xs text-forest">{review.author}</p>
                  <p className="text-[10px] text-muted">
                    {review.neighborhood} • {review.relation}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-gold bg-white px-2 py-0.5 rounded border border-gold/30">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Folded-in Trust Pillars from former /reviews page */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-near-black">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-bg-cream text-forest border border-border-soft flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xs sm:text-sm text-forest">
                Generational Continuity
              </h3>
              <p className="text-[11px] text-muted leading-relaxed">
                Parents who wore our jhablas as infants now bring their children to Kemps Corner. We
                dress each generation with pure, breathable cotton care.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-bg-cream text-forest border border-border-soft flex items-center justify-center shrink-0">
              <Ruler className="w-5 h-5 text-gold" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xs sm:text-sm text-forest">
                Real Measuring Tape Checks
              </h3>
              <p className="text-[11px] text-muted leading-relaxed">
                Every garment is measured flat with a tape before dispatch. No automated size chart
                guesses or return friction for busy parents.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-bg-cream text-forest border border-border-soft flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5 text-gold" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xs sm:text-sm text-forest">
                Direct Family Communication
              </h3>
              <p className="text-[11px] text-muted leading-relaxed">
                Every phone call and WhatsApp message is answered directly by our store desk at
                Kemps Corner, ensuring knowledgeable, neighborly care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
