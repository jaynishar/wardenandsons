import React from 'react';
import { ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function GoogleReviewsBlock() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <div className="border-t border-border-soft pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-lg sm:text-xl font-bold text-forest">
            Customer Reviews
          </h2>
          <p className="text-xs text-muted mt-1">
            See feedback from South Mumbai families shopping at our Kemps Corner store.
          </p>
        </div>

        <a
          href={BUSINESS_CONFIG.location.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-forest hover:text-forest-dark border-b border-forest/40 pb-0.5 hover:border-forest transition-all"
        >
          <span>Read our reviews on Google</span>
          <ExternalLink className="w-3.5 h-3.5 text-muted" />
        </a>
      </div>
    </section>
  );
}
