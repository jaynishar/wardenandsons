import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping, Returns & Exchanges',
  description: 'Read the shipping, exchange, and return policies of Warden & Sons Kids Wear. Learn about local South Bombay deliveries and pan-India shipping.',
  alternates: {
    canonical: '/shipping-returns',
  },
};

export default function ShippingReturnsPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-800 mb-6">
        Shipping & Exchanges
      </h1>
      <p className="text-xs text-slate-400 mb-8 font-sans">Last Updated: July 23, 2026</p>

      <div className="prose text-xs text-slate-600 leading-relaxed font-sans space-y-6">
        <p>
          At <strong>Warden & Sons Kids Wear</strong> at Kemps Corner, South Mumbai, we want to make sure your children are dressed comfortably. Because we sell items offline, on WhatsApp, and select items online, we have outlined our delivery and exchange policies below.
        </p>

        <h2 className="font-heading font-bold text-sm text-slate-800 uppercase mt-8 mb-2">1. Delivery Zones & Timelines</h2>
        
        <h3 className="font-heading font-bold text-xs text-slate-800 mt-4 mb-1">South Mumbai (Colaba to Worli):</h3>
        <p>
          We offer **same-day or next-day delivery** via local courier services (Dunzo or Borzo) for orders placed before 4:00 PM. Delivery charges are calculated on actuals based on the courier service rate. Free delivery options are available for orders above ₹3,000.
        </p>

        <h3 className="font-heading font-bold text-xs text-slate-800 mt-4 mb-1">Mumbai Suburbs & Rest of India:</h3>
        <p>
          Orders are dispatched within 24 hours of payment verification. We ship via premium express partners (Blue Dart, Delhivery). Delivery typically takes 2 to 5 business days. A flat shipping fee of ₹99 applies, which is waived for orders above ₹2,500.
        </p>

        <h2 className="font-heading font-bold text-sm text-slate-800 uppercase mt-8 mb-2">2. Returns Policy</h2>
        <p>
          As a boutique retail store, we do not offer cash refunds. However, we offer **easy exchanges** or store credit notes that are valid for 6 months.
        </p>

        <h2 className="font-heading font-bold text-sm text-slate-800 uppercase mt-8 mb-2">3. Exchange Guidelines</h2>
        <p>
          If a garment does not fit your child or is not of the desired print, you can exchange it within 7 days of receiving the order:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The item must be completely unworn, unwashed, and in its original packing with tags attached.</li>
          <li>You can exchange the item by walking into our Kemps Corner store directly.</li>
          <li>For WhatsApp or online orders, you can ship the item back to our store address (shipping charges to be borne by the customer). We will ship the replacement size back to you free of charge.</li>
        </ul>

        <h2 className="font-heading font-bold text-sm text-slate-800 uppercase mt-8 mb-2">4. Exclusions</h2>
        <p>
          Please note that the following items are strictly non-exchangeable for hygiene and tailoring reasons:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Innerwear, underwear, and socks.</li>
          <li>Custom tailored garments and school uniforms with custom names or embroidery.</li>
          <li>Items purchased during end-of-season sales.</li>
        </ul>

        <h2 className="font-heading font-bold text-sm text-slate-800 uppercase mt-8 mb-2">5. Damaged Items</h2>
        <p>
          Every item undergoes individual quality checks before packaging. In the rare event that you receive a damaged garment, please notify our WhatsApp desk within 24 hours of receipt with a photo of the defect. We will arrange a replacement immediately.
        </p>
      </div>
    </div>
  );
}
