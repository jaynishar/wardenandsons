import React from 'react';
import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the terms of service of Warden & Sons Kids Wear. Learn about our retail pricing, ordering, custom uniform production, and exchange guidelines.',
  alternates: {
    canonical: getCanonicalUrl('/terms'),
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="py-12 md:py-16 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-forest mb-2">
          Terms of Service
        </h1>
        <p className="editorial-label text-muted mb-8">Last Updated: July 23, 2026</p>

        <div className="text-xs sm:text-sm text-near-black/80 leading-relaxed space-y-6">
          <p>
            Welcome to <strong>Warden & Sons Kids Wear</strong>. By using this website, placing
            orders via our WhatsApp channels, or scheduling live video shopping appointments, you
            agree to comply with and be bound by the following terms of service. Please review them
            carefully.
          </p>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            1. Retail Pricing & Accuracy
          </h2>
          <p>
            All pricing listed on our category pages, WhatsApp chats, or quote forms is in Indian
            Rupees (INR) and inclusive of local GST. We endeavor to keep prices accurate, but we
            reserve the right to correct any pricing errors due to typing or fabric catalog updates.
          </p>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            2. Sizing Sourcing disclaimer
          </h2>
          <p>
            Because children grow rapidly, sizes vary between designs and garment types (cotton
            sleepwear vs. microfiber sportswear). Sizing references are guidelines. We recommend
            asking our team to measure garments live with a tape measure before dispatch. Size
            exchanges are governed by our shipping and exchange policies.
          </p>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            3. Custom Bulk Uniform Production
          </h2>
          <p>
            Custom bulk orders for schools, clubs, or events require a written confirmation of
            designs, dimensions, fabric samples, and quantities.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              A non-refundable advance of 50% is required to initiate bulk material sourcing and
              tailoring.
            </li>
            <li>
              Estimated delivery times are guidelines and may vary depending on local monsoon
              weather or fabric milling schedules.
            </li>
            <li>
              Custom printed or embroidered garments are unique and cannot be exchanged or returned
              once manufactured.
            </li>
          </ul>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            4. Payment & Verification
          </h2>
          <p>
            Payments for WhatsApp and phone orders must be completed via UPI, bank transfer, or
            online payment link before dispatch. Orders will only be processed and dispatched once
            payment is verified and a transaction screenshot or reference code is received.
          </p>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            5. Governing Law
          </h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of
            India, and any disputes relating to these terms shall be subject to the exclusive
            jurisdiction of the courts of Mumbai.
          </p>
        </div>
      </div>
    </div>
  );
}
