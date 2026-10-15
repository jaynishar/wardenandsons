import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles, MessageSquare, Phone, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/config/business';

export const metadata: Metadata = {
  title: 'Our Heritage | Kemps Corner, South Mumbai',
  description:
    'The story of Warden & Sons Kids Wear, serving South Bombay families at Kemps Corner for over 30 years. Read about our pure cotton philosophy and neighborhood roots.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const values = [
    {
      title: '100% Pure Combed Cotton',
      description:
        'We select breathable cottons and airy muslins. Pre-shrunk and chemical-free, crafted specially for Mumbai’s tropical humidity.',
      icon: ShieldCheck,
    },
    {
      title: 'Three Decades of Family Trust',
      description:
        'Serving Kemps Corner for over 30 years. Parents who wore our garments as infants now bring their own children to our boutique.',
      icon: Heart,
    },
    {
      title: 'Bespoke WhatsApp Attention',
      description:
        'No automated bot replies. Every customer chat and size measurement is personally checked with a physical tape by our shop team.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 font-sans">
      {/* Intro Heading */}
      <section className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          {BUSINESS_CONFIG.establishment.displayText}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4332] tracking-tight">
          Dressing South Bombay’s Children For Generations
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          From our neighborhood boutique at Kemps Corner to families across Mumbai. Discover how our family business preserves comfort, trust, and craftsmanship.
        </p>
      </section>

      {/* Story & Store Photo Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="relative h-[340px] sm:h-[460px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="/store_front.jpg"
              alt="Inside Warden & Sons Kids Wear boutique at Kemps Corner, Mumbai"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5 text-[#1A1A1A]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574]">
            Our Kemps Corner Story
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332] leading-snug">
            Where Quality Meets Family Warmth
          </h2>
          <div className="space-y-3.5 text-xs sm:text-sm text-[#666666] leading-relaxed">
            <p>
              For over three decades, Warden &amp; Sons has welcomed families in the historic retail avenue of <strong>Kemps Corner, South Mumbai</strong>. Our founding purpose was simple: to create a welcoming neighborhood space where parents could find pure, soft, honest cotton clothing for their little ones without the noise of corporate department stores.
            </p>
            <p>
              Over 30 years, South Mumbai has transformed, but our core philosophy has not wavered. We inspect every seam, avoid scratchy synthetic polyester in everyday sleepwear, and keep our relationships personal and transparent.
            </p>
            <p>
              Today, we are honored to dress the children and grandchildren of our earliest customers. Whether you walk into our Kemps Corner shop or message us on WhatsApp from across India, you will always be treated as a welcomed family neighbor.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B4332] text-white hover:bg-[#143527] font-bold text-xs shadow-xs"
            >
              <span>Browse Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#EBE7DF] text-[#1A1A1A] hover:bg-[#FAF8F5] font-bold text-xs shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Say Hello on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-white rounded-3xl border border-[#EBE7DF] p-8 sm:p-12 shadow-xs space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574]">
            Core Principles
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332]">
            Why Mumbai Parents Trust Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF] space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1B4332] text-white flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#D4A574]" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">{v.title}</h3>
                <p className="text-xs text-[#666666] leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Visit Store Callout */}
      <section className="bg-[#FAF8F5] rounded-3xl border border-[#EBE7DF] p-8 sm:p-10 text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="font-serif text-2xl font-bold text-[#1B4332]">
          Experience Our Boutique in Person
        </h3>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed max-w-lg mx-auto">
          We are located at Kemps Corner, near Pedder Road Flyover. Drop in between 10:30 AM and 8:30 PM (Mon–Sat) to feel our fabric quality firsthand.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/visit-us"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-[#1B4332] text-white text-xs font-bold shadow-xs hover:bg-[#143527]"
          >
            <span>View Map &amp; Directions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={BUSINESS_CONFIG.phone.telLink}
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-white border border-[#EBE7DF] text-[#1A1A1A] text-xs font-bold shadow-xs hover:bg-gray-50"
          >
            <Phone className="w-4 h-4 text-[#D4A574]" />
            <span>Call: {BUSINESS_CONFIG.phone.display}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
