import React from 'react';
import { MessageSquare, ShieldCheck, HelpCircle, Truck, CreditCard } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Buying Guide',
  description: 'Shop kids clothes on WhatsApp directly from Warden & Sons, Kemps Corner. Learn how to buy from Mumbai or anywhere in India with personal service.',
  alternates: {
    canonical: '/whatsapp-shopping',
  },
};

export default function WhatsAppShoppingPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center space-y-4 mb-12">
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
          💬 Primary Sales Channel
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary-800 leading-tight">
          How to Buy Kids' Clothes on WhatsApp
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Skip the hassle of automated websites. Chat directly with our Kemps Corner store assistants to get real-time stock, live size measures, and fast home delivery.
        </p>
      </div>

      {/* Steps */}
      <section className="space-y-8 bg-white border border-primary-100 p-8 rounded-3xl shadow-sm">
        <h2 className="font-heading text-2xl font-bold text-primary-800 text-center mb-6">
          Our Simple 5-Step Shopping Process
        </h2>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800">Click to Chat</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Click our official WhatsApp click-to-chat link: <a href="https://wa.me/message/NBG6MFUV3EXYG1" target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold underline hover:text-green-500">https://wa.me/message/NBG6MFUV3EXYG1</a> or save our number <a href="tel:+919920751567" className="text-primary-800 font-bold underline hover:text-accent-500">+91 99207 51567</a> and send us a text.
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-t border-primary-50 pt-6">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800">Share What You Need</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Tell us your requirements, child’s age, and preferences (e.g. *"Looking for cotton rompers for a 6-month-old girl"* or *"Need dryfit football jerseys for an 8-year-old boy"*).
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-t border-primary-50 pt-6">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800">Receive Stock Photos & Videos</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Our store assistants will browse shelves and send you photos and close-up videos of actual stock. We can measure chest sizes or lengths live with a tape to make sure it fits.
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-t border-primary-50 pt-6">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white font-bold flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800">Secure Digital Payment</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Confirm your selected items. We will calculate the total. You can pay securely via UPI (Google Pay, PhonePe, Paytm), NetBanking, or Bank Transfer.
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-t border-primary-50 pt-6">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white font-bold flex items-center justify-center shrink-0">
              5
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800">Doorstep Delivery</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                We pack your items with love. South Bombay orders are delivered same-day or next-day via local couriers. Suburbs and Pan-India orders are shipped via Blue Dart or Delhivery with tracking.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-6">
          <a
            href="https://wa.me/message/NBG6MFUV3EXYG1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
            id="whatsapp-guide-cta"
          >
            <MessageSquare className="w-5 h-5" /> Start Shopping on WhatsApp
          </a>
        </div>
      </section>

      {/* Sourcing details & Logistics */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 space-y-3">
          <div className="flex items-center gap-2 text-primary-800 font-bold">
            <CreditCard className="w-5 h-5 text-accent-500" />
            <h4 className="font-heading">Secure Payments</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            We support all major payment methods. Send your payments safely via standard Indian UPI apps, netbanking transfer, or credit cards. You will receive an official digital invoice immediately.
          </p>
        </div>

        <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 space-y-3">
          <div className="flex items-center gap-2 text-primary-800 font-bold">
            <Truck className="w-5 h-5 text-accent-500" />
            <h4 className="font-heading">Transparent Shipping</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Local deliveries inside South Bombay (Colaba to Worli) are charged on actuals via Dunzo/Borzo. Pan-India shipping is charged at a flat rate of ₹99, or free for orders above ₹2,500.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16 space-y-6">
        <h2 className="font-heading text-2xl font-bold text-primary-800 text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-accent-500" /> WhatsApp Sizing FAQ
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-primary-50 shadow-sm">
            <h4 className="font-heading font-bold text-sm text-slate-800">What if the size doesn’t fit my child?</h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-2 font-sans">
              We offer easy size exchanges. Send the garment back to our Kemps Corner store in its original condition within 7 days, and we will send the required size or offer store credit.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-primary-50 shadow-sm">
            <h4 className="font-heading font-bold text-sm text-slate-800">Are the prices higher on WhatsApp?</h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-2 font-sans">
              No, not at all! You pay the exact same fair retail price as shown on our physical store tags at Kemps Corner. There are no hidden markups.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-primary-50 shadow-sm">
            <h4 className="font-heading font-bold text-sm text-slate-800">Can I request close-up fabric videos?</h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-2 font-sans">
              Yes, absolutely! We encourage you to ask for close-up video clips so you can verify the stretch, softness, thickness (GSM), and finish of our cotton fabrics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
