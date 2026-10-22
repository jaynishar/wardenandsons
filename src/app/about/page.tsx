import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles, MessageSquare, Phone, ArrowRight } from 'lucide-react';
import GoogleReviewsBlock from '@/components/GoogleReviewsBlock';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/config/business';
import { getCanonicalUrl } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: 'About Our Shop: 30 Years in Kemps Corner | Warden & Sons' },
  description:
    'Serving South Mumbai families at Kemps Corner since 1994 with pure cotton children’s clothing, honest sizing, and personal care.',
  alternates: {
    canonical: getCanonicalUrl('/about'),
  },
};

export default function AboutPage() {
  const values = [
    {
      title: 'Breathable Natural Cotton',
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
      title: 'Personal WhatsApp Attention',
      description:
        'No automated bot replies. Every customer chat and size measurement is personally checked with a physical tape by our shop team.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 font-sans">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Our Heritage', url: getCanonicalUrl('/about') },
        ]}
      />
      {/* Intro Heading */}
      <section className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
          {BUSINESS_CONFIG.establishment.displayText}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          Dressing South Mumbai’s Children For Generations
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          From our neighborhood boutique at Kemps Corner to families across Mumbai. Discover how our
          family business preserves comfort, trust, and craftsmanship.
        </p>
      </section>

      {/* Story & Store Photo Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="relative h-[340px] sm:h-[460px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="/store_front.webp"
              alt="Inside Warden & Sons Kids Wear boutique at Kemps Corner, Mumbai"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5 text-near-black">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            Our Kemps Corner Story
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest leading-snug">
            Where Quality Meets Family Warmth
          </h2>
          <div className="space-y-3.5 text-xs sm:text-sm text-muted leading-relaxed">
            <p>
              For over three decades, Warden & Sons has welcomed families in the historic retail
              avenue of <strong>Kemps Corner, South Mumbai</strong>. Our founding purpose was
              simple: to create a welcoming neighborhood space where parents could find pure, soft,
              honest cotton clothing for their little ones without the noise of corporate department
              stores.
            </p>
            <p>
              Over 30 years, South Mumbai has transformed, but our core philosophy has not wavered.
              We inspect every seam, avoid scratchy synthetic polyester in everyday sleepwear, and
              keep our relationships personal and transparent.
            </p>
            <p>
              Today, we are honored to dress the children and grandchildren of our earliest
              customers. Whether you walk into our Kemps Corner shop or message us on WhatsApp from
              across India, you will always be treated as a welcomed family neighbor.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest text-white hover:bg-forest-dark font-bold text-xs shadow-xs"
            >
              <span>Browse Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-border-soft text-near-black hover:bg-bg-cream font-bold text-xs shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-whatsapp" />
              <span>Say Hello on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-white rounded-3xl border border-border-soft p-8 sm:p-12 shadow-xs space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            Core Principles
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Why Mumbai Parents Trust Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(v => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="p-6 bg-bg-cream rounded-2xl border border-border-soft space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-forest text-white flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif font-bold text-base text-near-black">{v.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social Proof & Folded-in Reviews */}
      <GoogleReviewsBlock />

      {/* Visit Store Callout */}
      <section className="bg-bg-cream rounded-3xl border border-border-soft p-8 sm:p-10 text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="font-serif text-2xl font-bold text-forest">
          Visit Our Kemps Corner Shop
        </h3>
        <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-lg mx-auto">
          We are located at Haji Habib Building near St. Stephen’s Church, Kemps Corner. Drop in between 9:00 AM and
          9:00 PM (Monday–Sunday) to feel our cotton quality firsthand.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/visit-us"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-forest text-white text-xs font-bold shadow-xs hover:bg-forest-dark"
          >
            <span>View Map & Directions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={BUSINESS_CONFIG.phone.telLink}
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-white border border-border-soft text-near-black text-xs font-bold shadow-xs hover:bg-gray-50"
          >
            <Phone className="w-4 h-4 text-gold" />
            <span>Call: {BUSINESS_CONFIG.phone.display}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
