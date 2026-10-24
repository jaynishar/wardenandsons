import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardList, MessageSquare, Truck, ArrowRight, ShieldCheck, Video } from 'lucide-react';
import FAQ from '@/components/FAQ';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { BUSINESS_CONFIG } from '@/config/business';
import { buildVideoCallUrl } from '@/lib/whatsapp';
import ReplyPromise from '@/components/ReplyPromise';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  path: '/how-it-works',
  title: { absolute: "How to Buy Kids Clothes on WhatsApp | Warden & Sons" },
  description: "Build a Request List online, view live rack photos on WhatsApp, and confirm tape measurements before paying. Follow 3 easy steps for home delivery.",
  imageAlt: 'How WhatsApp Catalogue Shopping Works | Warden & Sons',
});

export default function HowItWorksPage() {
  const detailedSteps = [
    {
      step: '1',
      title: 'Browse Catalogue & Build Request List',
      description:
        'Explore our digital catalogue of pure combed cotton and muslin kidswear. Select your preferred categories, styles, and age ranges. Adding items to your Request List stores them safely on your device without requiring an account or sign-in.',
      icon: ClipboardList,
      details: [
        'Explore collections across Newborns (0–24M), Boys (0–16Y), Girls (0–16Y), and family basics.',
        'Add items freely to your list without entering passwords or creating an account.',
        'Specify preferred age brackets, sizing, and colour notes for each clothing piece.',
      ],
    },
    {
      step: '2',
      title: 'Review & Send Request on WhatsApp',
      description:
        'Click "Send Enquiry on WhatsApp" directly from your Request List. A clear, itemized message is generated for you to review and send to our Kemps Corner shop counter in South Mumbai.',
      icon: MessageSquare,
      details: [
        `Direct link opens WhatsApp with our official store desk (+91 99207 51567).`,
        'No credit card details or online checkout payment gateways are required.',
        'A convenient "Copy Enquiry Text" fallback allows pasting into any messaging app.',
      ],
    },
    {
      step: '3',
      title: 'Live Photos, Sizing & Confirmation',
      description:
        'Our shop team checks real-time racks, sends you photographs of currently available prints, and confirms measurements with a physical measuring tape. Once approved, you complete payment and arrange delivery or store pickup.',
      icon: Truck,
      details: [
        'Precise chest, waist, and length dimensions are verified flat with a measuring tape.',
        'Convenient direct UPI QR or bank transfer options are confirmed directly with our shop desk.',
        'Doorstep courier delivery across Mumbai & pan-India or convenient pickup at Kemps Corner.',
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
        <span className="text-xs font-bold text-[var(--ink)]/60 inline-block">
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
              className="bg-white rounded-md border border-border-soft p-7 sm:p-8 flex flex-col justify-between shadow-xs space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-sm bg-forest text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-gold/40">{s.step}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-near-black leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{s.description}</p>
              </div>

              <div className="pt-4 border-t-2 border-[var(--ink)]/15 space-y-2">
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

      {/* In-Depth Explanation & Contextual Authority Section */}
      <section className="bg-white rounded-md p-6 sm:p-10 border border-border-soft shadow-xs space-y-6 text-near-black">
        <div className="space-y-2 border-b-2 border-[var(--ink)]/15 pb-4">
          <span className="text-[11px] font-sans uppercase tracking-widest text-gold block">
            Personal Care • Zero Friction
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Why Our WhatsApp Shopping Flow Protects Parents
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-3xl">
            Buying children’s clothing online from generic marketplaces often leads to ill-fitting garments, stiff synthetic blends, and frustrating return processes. Here is how our 30-year Kemps Corner store desk personalizes every order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed">
          <div className="space-y-2.5">
            <h3 className="font-serif font-bold text-base text-forest">
              1. Live Rack Checks &amp; Photos
            </h3>
            <p className="text-muted">
              Because our physical inventory rotates constantly with fresh cotton prints and seasonal styles, our shop team pulls real items directly from the boutique racks. We photograph currently available patterns and colorways in natural light so you know exactly what you are purchasing.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-serif font-bold text-base text-forest">
              2. Measuring Tape Accuracy
            </h3>
            <p className="text-muted">
              Children of the same age often have different heights and chest builds. Before anything is packed, our staff lays each garment flat and measures chest width, shoulder seams, and outseam lengths with a tape. You can cross-reference these numbers with our <Link href="/size-guide/" className="font-bold text-forest underline hover:text-gold">Kids Clothes Size Guide</Link> to ensure a comfortable fit.
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-serif font-bold text-base text-forest">
              3. Flexible Pickup or Delivery
            </h3>
            <p className="text-muted">
              After confirming sizes and pricing on WhatsApp, choose between fast Mumbai doorstep courier delivery or in-person pickup at our <Link href="/visit-us/" className="font-bold text-forest underline hover:text-gold">Kemps Corner store near St. Stephen’s Church</Link>. Looking specifically for boys&apos; playwear, cargo shorts, or cricket academy whites? Explore our <Link href="/shop/boys/" className="font-bold text-forest underline hover:text-gold">Boys’ Wear Collection (0–16 Years)</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Card */}
      <div className="bg-forest text-white rounded-md p-8 sm:p-12 text-center space-y-5 max-w-4xl mx-auto ">
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
            href="/shop/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-white text-forest hover:bg-bg-cream font-bold text-xs  transition-all hover:scale-102"
          >
            <span>Explore Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={BUSINESS_CONFIG.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="footer"
            data-track-category="footer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-xs  transition-all hover:scale-102"
          >
            <MessageSquare className="w-4 h-4 fill-white text-whatsapp" />
            <span>Chat with Store ({BUSINESS_CONFIG.phone.display})</span>
          </a>
          <a
            href={buildVideoCallUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="video_call"
            data-track-category="video_call"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-forest text-white hover:bg-forest-dark font-bold text-xs  transition-all hover:scale-102 cursor-pointer"
          >
            <Video className="w-4 h-4 text-gold" />
            <span>Request a free video call</span>
          </a>
        </div>
        <ReplyPromise className="text-muted text-xs text-center w-full mt-3" />
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[var(--ink)]/60 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest">Everything You Need to Know</h2>
        </div>
        <FAQ />
      </div>
    </div>
  );
}
