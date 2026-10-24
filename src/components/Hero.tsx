import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import ReplyPromise from '@/components/ReplyPromise';
import { COPY_DECK } from '@/content/copy';
import { BUSINESS_CONFIG } from '@/config/business';

export default function Hero() {
  return (
    <section className="py-6 sm:py-10 lg:py-14 border-b border-[var(--line)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Mobile: Photo First (order-1 lg:order-2) */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <Photo
                src="/hero-editorial.webp"
                alt="Children's cotton everyday clothing collection at Warden & Sons, Kemps Corner"
                priority
                ratio="4/5"
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="w-full border border-[var(--line)]"
              />
            </div>
          </div>

          {/* Mobile: Text Second (order-2 lg:order-1) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <h1 className="font-display font-medium text-[var(--ink)] text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
                Kids Clothes in Kemps Corner, South Mumbai
              </h1>
              <p className="font-display text-lg sm:text-xl text-[var(--ink-soft)] font-medium tracking-tight">
                Breathable Cotton Comfort, Since 1994.
              </p>
              <p className="text-base text-[var(--ink-soft)] leading-relaxed max-w-xl">
                {COPY_DECK.hero.sub}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Button href="/shop/" variant="primary">
                {COPY_DECK.hero.shop}
              </Button>
              <Button
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="hero"
                data-track-category="hero"
              >
                {COPY_DECK.hero.chat}
              </Button>
            </div>

            <ReplyPromise className="justify-start text-left" />
          </div>
        </div>
      </Container>
    </section>
  );
}
