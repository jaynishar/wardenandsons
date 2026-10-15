import React from 'react';
import type { Metadata } from 'next';
import { MessageSquare, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export const metadata: Metadata = {
  title: 'Delivery, Pickup & Exchanges',
  description:
    'Learn how delivery, store pickup at Kemps Corner, and size exchanges are coordinated directly with Warden & Sons Kids Wear.',
  alternates: {
    canonical: '/shipping-returns',
  },
};

export default function ShippingReturnsPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-3xl mx-auto px-4 sm:px-6">
      <div className="space-y-3 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          Store Policies &amp; Fulfillment
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1B4332]">
          Delivery, Pickup &amp; Exchanges
        </h1>
        <p className="text-xs text-[#666666]">
          Warden &amp; Sons Kids Wear • Kemps Corner, South Mumbai
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#444] leading-relaxed">
        <section className="bg-white p-6 rounded-2xl border border-[#EBE7DF] space-y-3 shadow-xs">
          <h2 className="font-serif font-bold text-base text-[#1B4332]">
            1. Personalized WhatsApp Ordering
          </h2>
          <p>
            Because Warden &amp; Sons carries a large, rotating physical inventory at our Kemps Corner boutique, all product selections made through this website serve as a <strong>request enquiry</strong>.
          </p>
          <p>
            When you send your request on WhatsApp, our store team personally checks current stock, sends live photographs of available prints, confirms sizes with measuring tape dimensions, and verifies current pricing.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-[#EBE7DF] space-y-3 shadow-xs">
          <h2 className="font-serif font-bold text-base text-[#1B4332]">
            2. Local Delivery &amp; In-Store Pickup
          </h2>
          <p>
            We offer two convenient ways to receive your garments:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Store Pickup at Kemps Corner:</strong> You are welcome to collect your verified package directly from our store during opening hours (Monday to Saturday, 10:30 AM – 8:30 PM).
            </li>
            <li>
              <strong>Doorstep Delivery (Mumbai &amp; Pan-India):</strong> We coordinate delivery via local courier services across Mumbai and express courier services across India. Exact delivery timelines and courier charges are confirmed directly during your WhatsApp conversation based on your address and urgency.
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-[#EBE7DF] space-y-3 shadow-xs">
          <h2 className="font-serif font-bold text-base text-[#1B4332]">
            3. Size Exchanges
          </h2>
          <p>
            We make every effort to avoid sizing issues by measuring garments with a tape measure flat on the table before dispatch. If an unworn garment with original tags requires an exchange:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Exchanges can be done directly by visiting our Kemps Corner store.
            </li>
            <li>
              For customers outside South Mumbai, please message our WhatsApp desk with your order details and requested replacement size to coordinate courier exchange options.
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-[#EBE7DF] space-y-3 shadow-xs">
          <h2 className="font-serif font-bold text-base text-[#1B4332]">
            4. Custom Bulk &amp; School Uniforms
          </h2>
          <p>
            Custom tailored school uniforms and embroidered institution kits are made to order based on agreed measurements and specifications. Advance details and production timelines are confirmed with the school or institution prior to manufacturing.
          </p>
        </section>

        <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EBE7DF] text-center space-y-3">
          <p className="text-xs text-[#666666]">
            Have a specific delivery or exchange question? Our store team is here to assist you:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-xs hover:bg-[#20ba59]"
            >
              <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Ask on WhatsApp: {BUSINESS_CONFIG.phone.display}</span>
            </a>
            <a
              href={BUSINESS_CONFIG.location.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#EBE7DF] text-[#1A1A1A] font-bold text-xs shadow-xs hover:bg-gray-50"
            >
              <MapPin className="w-4 h-4 text-[#D4A574]" />
              <span>Visit Kemps Corner Store</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
