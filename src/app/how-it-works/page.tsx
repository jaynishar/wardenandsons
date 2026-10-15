import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingBag, MessageSquare, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'How It Works | WhatsApp Shopping Guide',
  description:
    'Learn how WhatsApp shopping works at Warden & Sons Kids Wear Kemps Corner. Browse samples, generate an itemized WhatsApp order, verify live photos and get doorstep delivery.',
  alternates: {
    canonical: '/how-it-works',
  },
};

export default function HowItWorksPage() {
  const detailedSteps = [
    {
      step: '01',
      title: 'Browse Samples & Build Your Bag',
      description:
        'Explore our digital catalog of pure combed cotton and muslin kidswear. Choose your preferred categories, styles, and approximate quantities. Adding items to your bag stores them safely on your device.',
      icon: ShoppingBag,
      details: [
        'Explore Newborn (0-24M), Boys (0-16Y), Girls (0-16Y), Men & Women basics',
        'Add items without creating an account or entering passwords',
        'Transparent sample prices in INR',
      ],
    },
    {
      step: '02',
      title: '1-Click WhatsApp Order Dispatch',
      description:
        'Click "Send Order on WhatsApp" in your shopping bag. Enter your name and delivery preference. A perfectly formatted, itemized order message is prepared and delivered right to our Kemps Corner desk (+91 99207 51567).',
      icon: MessageSquare,
      details: [
        'Instant deep link opens your official WhatsApp app',
        'No credit card details entered on website',
        'Clear item list with estimated totals',
      ],
    },
    {
      step: '03',
      title: 'Live Photo Verification & Doorstep Dispatch',
      description:
        'Our family members check real-time store racks, send you live photographs of current prints, and lay a measuring tape to confirm exact garment dimensions. We dispatch via express courier or keep ready for store pickup.',
      icon: Truck,
      details: [
        'Precise chest & length measurements verified by tape',
        'Convenient payment via UPI QR (GPay/PhonePe/Paytm) or Netbanking',
        'Fast courier dispatch across Mumbai & pan-India',
      ],
    },
  ];

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          Simple • Personal • Trustworthy
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4332] tracking-tight">
          How WhatsApp Shopping Works
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          We combine the speed of online catalog browsing with the authentic warmth and custom sizing of South Bombay’s favorite boutique.
        </p>
      </div>

      {/* 3 Detailed Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {detailedSteps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="bg-white rounded-3xl border border-[#EBE7DF] p-7 sm:p-8 flex flex-col justify-between shadow-xs space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 text-[#D4A574]" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-[#D4A574]/40">
                    {s.step}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EBE7DF] space-y-2">
                {s.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#1B4332]">
                    <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp CTA Card */}
      <div className="bg-[#1B4332] text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 max-w-4xl mx-auto shadow-xl">
        <div className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto">
          <MessageSquare className="w-7 h-7 text-[#25D366]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A574]">
            Ready to Try It Out?
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 max-w-md mx-auto leading-relaxed">
            Browse our catalog, add a few favorites, and send your list over. No payment commitment until you approve the photos!
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#1B4332] hover:bg-[#FAF8F5] font-bold text-xs shadow-md transition-all hover:scale-102"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/919920751567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all hover:scale-102"
          >
            <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
            <span>Chat with Store (+91 99207 51567)</span>
          </a>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1B4332]">
            Everything You Need to Know
          </h2>
        </div>
        <FAQ />
      </div>
    </div>
  );
}
