import React from 'react';
import { Container } from '@/components/ui/Container';
import { COPY_DECK } from '@/content/copy';
import { buildVideoCallUrl } from '@/lib/whatsapp';

export default function HowItWorks() {
  return (
    <section className="py-6 sm:py-8 border-b border-[var(--line)]">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-display text-base sm:text-lg text-[var(--ink)]">
            {COPY_DECK.how.line}
          </p>
          <a
            href={buildVideoCallUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="video_call"
            data-track-category="video_call"
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 text-sm font-medium rounded-full bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink-soft)] transition-colors shrink-0"
          >
            {COPY_DECK.video.chip}
          </a>
        </div>
      </Container>
    </section>
  );
}
