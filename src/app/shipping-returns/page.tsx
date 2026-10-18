import React from 'react';
import type { Metadata } from 'next';
import { MessageSquare, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';
import { getCanonicalUrl } from '@/config/site';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Delivery, Store Pickup & Size Exchanges',
  description:
    'Mumbai doorstep delivery, store pickup at Kemps Corner, and straightforward size exchanges handled directly on WhatsApp.',
  alternates: {
    canonical: getCanonicalUrl('/shipping-returns'),
  },
};

export default function ShippingReturnsPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-3xl mx-auto px-4 sm:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Delivery & Exchanges', url: getCanonicalUrl('/shipping-returns') },
        ]}
      />
      <div className="space-y-3 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-bg-cream px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
          Store Policies & Fulfillment
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-forest">
          Delivery, Pickup & Exchanges
        </h1>
        <p className="text-xs text-muted">Warden & Sons Kids Wear • Kemps Corner, South Mumbai</p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-muted leading-relaxed">
        <section className="bg-white p-6 rounded-2xl border border-border-soft space-y-3 shadow-xs">
          <h2 className="font-serif font-bold text-base text-forest">
            1. Personalized WhatsApp Ordering
          </h2>
          <p>
            Because Warden & Sons carries a large, rotating physical inventory at our Kemps Corner
            boutique, all product selections made through this website serve as a{' '}
            <strong>request enquiry</strong>.
          </p>
          <p>
            When you send your request on WhatsApp, our store team personally checks current stock,
            sends live photographs of available prints, confirms sizes with measuring tape
            dimensions, and verifies current pricing.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-border-soft space-y-3 shadow-xs">
          <h2 className="font-serif font-bold text-base text-forest">
            2. Local Delivery & In-Store Pickup
          </h2>
          <p>We offer two convenient ways to receive your garments:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Store Pickup at Kemps Corner:</strong> You are welcome to collect your
              verified package directly from our store during opening hours (Monday to Saturday,
              10:30 AM – 8:30 PM).
            </li>
            <li>
              <strong>Doorstep Delivery (Mumbai & Pan-India):</strong> We coordinate delivery via
              local courier services across Mumbai and express courier services across India. Exact
              delivery timelines and courier charges are confirmed directly during your WhatsApp
              conversation based on your address and urgency.
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-border-soft space-y-3 shadow-xs">
          <h2 className="font-serif font-bold text-base text-forest">3. Size Exchanges</h2>
          <p>
            We make every effort to avoid sizing issues by measuring garments with a tape measure
            flat on the table before dispatch. If an unworn garment with original tags requires an
            exchange:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Exchanges can be done directly by visiting our Kemps Corner store.</li>
            <li>
              For customers outside South Mumbai, please message our WhatsApp desk with your order
              details and requested replacement size to coordinate courier exchange options.
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-border-soft space-y-3 shadow-xs">
          <h2 className="font-serif font-bold text-base text-forest">
            4. Custom Bulk & School Uniforms
          </h2>
          <p>
            Custom school uniforms and embroidered institution kits are made to order based
            on agreed measurements and specifications. Advance details and production timelines are
            confirmed with the school or institution prior to manufacturing.
          </p>
        </section>

        <div className="bg-bg-cream p-6 rounded-2xl border border-border-soft text-center space-y-3">
          <p className="text-xs text-muted">
            Have a specific delivery or exchange question? Our store team is here to assist you:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="shipping_returns"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-whatsapp text-white font-bold text-xs shadow-xs hover:bg-whatsapp/90"
            >
              <MessageSquare className="w-4 h-4 fill-white text-whatsapp" />
              <span>Ask on WhatsApp: {BUSINESS_CONFIG.phone.display}</span>
            </a>
            <a
              href={BUSINESS_CONFIG.location.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-border-soft text-near-black font-bold text-xs shadow-xs hover:bg-gray-50"
            >
              <MapPin className="w-4 h-4 text-gold" />
              <span>Visit Kemps Corner Store</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
