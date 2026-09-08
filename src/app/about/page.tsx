import React from 'react';
import Image from 'next/image';
import Link from 'next/image';
import { ShieldCheck, HeartHandshake, Compass, Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Learn about the heritage of Warden & Sons Kids Wear, serving South Bombay families at Kemps Corner since 1994. Read about our neighborhood values.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 font-sans space-y-16">
      {/* Intro Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-[10px] text-accent-500 font-bold uppercase tracking-widest bg-primary-50 px-3 py-1.5 rounded-full">
          Established 1994 • Kemps Corner
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary-800 max-w-3xl mx-auto leading-tight">
          Dressing South Bombay’s Families For Generations
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          At Warden & Sons, we believe that children’s wear should be warm, comfortable, and chemical-free. Read about our journey from a local boutique to a trusted South Mumbai institution.
        </p>
      </section>

      {/* Story & Image Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src="/store_front.jpg"
            alt="Inside Warden & Sons Kids Wear Boutique in South Mumbai"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>

        <div className="space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-800">
            Our Heritage at Kemps Corner
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Warden & Sons Kids Wear was founded in 1994 in the historic shopping district of <strong>Kemps Corner, South Mumbai</strong>. Our goal was simple: to create a cozy, neighborhood clothing boutique where local parents could find soft, high-quality garments for their children without the hassle of navigating large commercial department stores.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Over the last three decades, our family business has grown alongside the families we serve. We have seen toddlers who once wore our cotton rompers grow up, get married, and walk back into our boutique to select newborn sets for their own babies. This beautiful circle of trust is what defines us.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            We are not a cold, automated corporate D2C brand or a venture-backed tech company. We are a family of retail experts who take pride in checking every thread, measuring sizes live with a tape, and answering every WhatsApp chat personally.
          </p>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="bg-warm-neutral py-16 px-4 sm:px-6 lg:px-8 border-y border-primary-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">The Values That Guide Us</h2>
            <p className="text-slate-600 text-xs max-w-md mx-auto">
              Our business operations are built around these four core values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-50 text-center space-y-3">
              <div className="w-12 h-12 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-primary-800">100% Pure Comfort</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                We select premium, organic-grade cottons and light, open-weave muslins. Every garment is pre-washed and chemical-safe.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-50 text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-primary-800">Uncompromising Trust</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                We don't use high-pressure sales tactics. If a garment is not the right size or fit for your child, we will gladly exchange it.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-50 text-center space-y-3">
              <div className="w-12 h-12 bg-red-100 text-accent-500 rounded-full flex items-center justify-center mx-auto">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-primary-800">Local Preservation</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                We support local Indian textile manufacturers and weavers. Our bulk school orders are tailored right here in Maharashtra.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-50 text-center space-y-3">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-primary-800">Bespoke Attention</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Whether you walk in, text us on WhatsApp, or hop on a video shopping call, you will be treated with personal warmth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-800">
          Experience Warden & Sons Today
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Need a quick gift for a friend’s baby shower in Malabar Hill or new cotton basics for your kids? Let us serve you with the best.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <a
            href="https://wa.me/message/NBG6MFUV3EXYG1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white font-bold text-xs px-6 py-3.5 rounded-lg shadow-md transition-colors"
          >
            💬 Chat on WhatsApp
          </a>
          <a
            href="tel:+919920751567"
            className="bg-primary-800 hover:bg-primary-700 text-white font-bold text-xs px-6 py-3.5 rounded-lg shadow-md transition-colors"
          >
            📞 Call Store: +91 99207 51567
          </a>
        </div>
      </section>
    </div>
  );
}
