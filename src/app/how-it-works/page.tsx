import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardList, MessageSquare, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import FAQ from '@/components/FAQ';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { BUSINESS_CONFIG } from '@/config/business';
import { getCanonicalUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'How to Buy on WhatsApp | Simple 3-Step Guide',
  description:
    'Select children’s clothing items for your Request List, then send them to our Kemps Corner store on WhatsApp for sizes and photos.',
  alternates: {
    canonical: getCanonicalUrl('/how-it-works'),
  },
};

export default function HowItWorksPage() {
  const detailedSteps = [
    {
      step: '01',
      title: 'Browse Catalogue & Build Request List',
      description:
        'Explore our digital catalogue of pure combed cotton and muslin kidswear. Choose your preferred categories and items. Adding items to your Request List stores them safely on your device.',
      icon: ClipboardList,
      details: [
        'Explore Newborn (0-24M), Boys (0-16Y), Girls (0-16Y), Men & Women basics',
        'Add items without creating an account or providing sensitive data',
        'Specify optional age, size, and colour preferences per item',
      ],
    },
    {
      step: '02',
      title: 'Review & Send Request on WhatsApp',
      description:
        'Click "Send Enquiry on WhatsApp" from your Request List. A clear, itemized message is generated for you to review and send directly to our Kemps Corner store desk.',
      icon: MessageSquare,
      details: [
        `Direct link opens WhatsApp with our official business number (${BUSINESS_CONFIG.phone.display})`,
        'No online payment gateway or credit card required',
        'Convenient "Copy Enquiry Text" fallback included',
      ],
    },
    {
      step: '03',
      title: 'Live Photos, Sizing & Confirmation',
      description:
        'Our shop team checks real-time racks, sends you photographs of currently available prints, and confirms measurements with a measuring tape. Once approved, the shop completes payment and fulfills delivery or store pickup directly.',
      icon: Truck,
      details: [
        'Precise chest & length dimensions verified by physical tape',
        'Direct UPI QR or bank payment options confirmed with the shop',
        'Doorstep delivery across Mumbai & pan-India or pickup at Kemps Corner',
      ],
    },
  ];

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 font-sans">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'How It Works', url: getCanonicalUrl('/how-it-works') },
        ]}
      />
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
          Personal • Thoughtful • Trustworthy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          How WhatsApp Catalogue Shopping Works
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          We combine the ease of digital catalogue browsing with the authentic warmth, live
          measuring-tape sizing, and personal care of our South Bombay shop.
        </p>
      </div>

      {/* 3 Detailed Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {detailedSteps.map(s => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="bg-white rounded-3xl border border-border-soft p-7 sm:p-8 flex flex-col justify-between shadow-xs space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-forest text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-gold/40">{s.step}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-near-black leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{s.description}</p>
              </div>

              <div className="pt-4 border-t border-border-soft space-y-2">
                {s.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-forest">
                    <ShieldCheck className="w-4 h-4 text-whatsapp shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp CTA Card */}
      <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 max-w-4xl mx-auto shadow-xl">
        <div className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto">
          <MessageSquare className="w-7 h-7 text-whatsapp" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold">
            Ready to Explore the Catalogue?
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 max-w-md mx-auto leading-relaxed">
            Browse our shop categories, add items to your Request List, and send it
            over. No payment until you approve photos and sizing!
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-forest hover:bg-bg-cream font-bold text-xs shadow-md transition-all hover:scale-102"
          >
            <span>Explore Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={BUSINESS_CONFIG.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="how_it_works_cta"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-xs shadow-md transition-all hover:scale-102"
          >
            <MessageSquare className="w-4 h-4 fill-white text-whatsapp" />
            <span>Chat with Store ({BUSINESS_CONFIG.phone.display})</span>
          </a>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest">Everything You Need to Know</h2>
        </div>
        <FAQ />
      </div>
    </div>
  );
}
