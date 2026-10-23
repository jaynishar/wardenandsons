import React from 'react';
import Link from 'next/link';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function HowItWorks() {
  const steps = [
    {
      title: '1. Add to Request',
      description: (
        <>
          Browse our shop by age including our{' '}
          <Link href="/shop/boys/" className="underline font-semibold text-forest hover:text-gold">
            boys playwear &amp; nightsuits (0–16Y)
          </Link>
          . Add items to your Request List without creating an account.
        </>
      ),
    },
    {
      title: '2. Send on WhatsApp',
      description:
        'Click send to open WhatsApp with your prefilled list directly to our Kemps Corner shop desk.',
    },
    {
      title: '3. Photos & Flat Sizing',
      description:
        'Our shop team checks live racks, measures dimensions flat with a tape, and confirms pricing.',
    },
  ];

  return (
    <section className="border-y border-border-soft bg-white py-10 md:py-14 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-1">
              Simple 3-Step Process
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-forest">
              How to Buy
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted max-w-md">
            Our South Mumbai shop has operated by phone and counter since 1994. Read our full guide on{' '}
            <Link href="/how-it-works/" className="font-semibold text-forest underline hover:text-gold">
              how WhatsApp catalogue ordering works
            </Link>{' '}
            or visit our{' '}
            <Link href="/visit-us/" className="font-semibold text-forest underline hover:text-gold">
              Kemps Corner store
            </Link>
            .
          </p>
        </div>

        {/* 3 Steps in Clean Editorial Minimalist Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2 pb-6 border-b border-border-soft">
          {steps.map(s => (
            <div key={s.title} className="space-y-2">
              <h3 className="font-serif font-bold text-base text-near-black tracking-tight">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile-First WhatsApp Action Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted text-center sm:text-left">
            Have a custom question or ready list? Chat directly with our shop counter:
          </p>
          <a
            href={BUSINESS_CONFIG.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="page"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4 text-whatsapp" />
            <span>Send us your list on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold" />
          </a>
        </div>
      </div>
    </section>
  );
}
