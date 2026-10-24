import React from 'react';
import { Container } from '@/components/ui/Container';
import { COPY_DECK } from '@/content/copy';
import { buildVideoCallUrl } from '@/lib/whatsapp';

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-2xl mb-8 sm:mb-12">
          <h2 className="font-sans font-medium text-2xl sm:text-3xl text-[var(--ink)] tracking-tight">
            {COPY_DECK.how.heading}
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] mt-1">
            No checkout carts. We verify fit and stock personally over WhatsApp.
          </p>
        </div>

        {/* 3 stages: Pick, Send on WhatsApp, We reply */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Stage 1 */}
          <div className="bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between border-t-4 border-[var(--yellow)]">
            <div>
              <span className="font-sans text-3xl font-light text-[var(--ink)]">
                1
              </span>
              <h3 className="font-sans font-medium text-lg sm:text-xl text-[var(--ink)] mt-3">
                {COPY_DECK.how.step1Title}
              </h3>
              <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
                {COPY_DECK.how.step1Desc}
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between border-t-4 border-[var(--blue)]">
            <div>
              <span className="font-sans text-3xl font-light text-[var(--ink)]">
                2
              </span>
              <h3 className="font-sans font-medium text-lg sm:text-xl text-[var(--ink)] mt-3">
                {COPY_DECK.how.step2Title}
              </h3>
              <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
                {COPY_DECK.how.step2Desc}
              </p>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-[var(--surface)] p-6 sm:p-8 flex flex-col justify-between border-t-4 border-[var(--red)]">
            <div>
              <span className="font-sans text-3xl font-light text-[var(--ink)]">
                3
              </span>
              <h3 className="font-sans font-medium text-lg sm:text-xl text-[var(--ink)] mt-3">
                {COPY_DECK.how.step3Title}
              </h3>
              <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
                {COPY_DECK.how.step3Desc}
              </p>
            </div>
            <div className="mt-6 pt-2">
              <a
                href={buildVideoCallUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="video_call"
                className="text-sm font-medium text-[var(--blue)] hover:underline inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
              >
                <span>{COPY_DECK.how.videoChip || COPY_DECK.video.chip}</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
