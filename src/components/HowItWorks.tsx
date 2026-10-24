'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { COPY_DECK } from '@/content/copy';
import { buildVideoCallUrl } from '@/lib/whatsapp';
import { IconWhatsApp } from '@/components/icons';

export default function HowItWorks() {
  return (
    <section className="py-14 sm:py-20 bg-[var(--surface)] font-sans border-y border-[var(--line)]">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-14">
          <span className="text-[12px] uppercase tracking-wider text-[var(--terracotta)] font-medium">
            Personal Boutique Service
          </span>
          <h2 className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] tracking-tight mt-1">
            {COPY_DECK.how.heading}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[var(--muted)] mt-2 leading-relaxed font-normal">
            We do not use impersonal automated checkouts. Every garment is hand-inspected and verified for fit with physical measuring tape by our Kemps Corner store desk.
          </p>
        </div>

        {/* 3-Step Luxury Retail Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Step 1 */}
          <div className="bg-white border border-[var(--line)] rounded-md p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[var(--ink)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-light text-[var(--terracotta)]">
                  01
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)] bg-[var(--surface)] px-2 py-0.5 rounded-sm">
                  Online
                </span>
              </div>
              <h3 className="font-sans font-medium text-lg sm:text-xl text-[var(--ink)]">
                {COPY_DECK.how.step1Title}
              </h3>
              <p className="text-[13px] text-[var(--muted)] mt-2 leading-relaxed font-normal">
                {COPY_DECK.how.step1Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[var(--line)] text-[12px] text-[var(--muted)]">
              No account creation or card entry needed.
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-[var(--line)] rounded-md p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[var(--ink)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-light text-[var(--terracotta)]">
                  02
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--wa)] bg-emerald-50 px-2 py-0.5 rounded-sm">
                  WhatsApp
                </span>
              </div>
              <h3 className="font-sans font-medium text-lg sm:text-xl text-[var(--ink)]">
                {COPY_DECK.how.step2Title}
              </h3>
              <p className="text-[13px] text-[var(--muted)] mt-2 leading-relaxed font-normal">
                {COPY_DECK.how.step2Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[var(--line)] text-[12px] text-[var(--muted)]">
              Live rack photographs and measuring tape check.
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-[var(--line)] rounded-md p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[var(--ink)] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-light text-[var(--terracotta)]">
                  03
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)] bg-[var(--surface)] px-2 py-0.5 rounded-sm">
                  Mumbai
                </span>
              </div>
              <h3 className="font-sans font-medium text-lg sm:text-xl text-[var(--ink)]">
                {COPY_DECK.how.step3Title}
              </h3>
              <p className="text-[13px] text-[var(--muted)] mt-2 leading-relaxed font-normal">
                {COPY_DECK.how.step3Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[var(--line)]">
              <a
                href={buildVideoCallUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="video_call"
                className="text-[13px] font-medium text-[var(--wa)] hover:underline inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
              >
                <IconWhatsApp size={15} />
                <span>{COPY_DECK.how.videoChip || 'Schedule a WhatsApp Video Call'}</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
