import React from 'react';
import { ClipboardList, MessageSquare, Truck, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Browse & Add to Request List',
      description:
        'Explore our catalogue of 100% pure cotton kidswear, nightsuits, and department basics. Add representative items to your request list.',
      icon: ClipboardList,
    },
    {
      step: '2',
      title: 'Review & Open WhatsApp',
      description:
        'Specify any age, size, or colour preferences, then click "Send Enquiry on WhatsApp". A complete request message is prefilled for you to review and send.',
      icon: MessageSquare,
    },
    {
      step: '3',
      title: 'Live Photos & Confirmation',
      description:
        'Our Kemps Corner shop team shares live photos of current prints, verifies measurements with a measuring tape, confirms pricing, and arranges delivery or store pickup directly.',
      icon: Truck,
    },
  ];

  return (
    <section className="bg-white border-y border-border-soft py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="editorial-label text-gold bg-bg-cream px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
            Personalized Neighborhood Shopping
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest">
            How WhatsApp Catalogue Shopping Works
          </h2>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            No rigid automated checkouts or guessing sizes online. Experience personal service from an authentic South Mumbai family boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-bg-cream rounded-2xl p-6 sm:p-7 border border-border-soft flex flex-col justify-between space-y-4 hover:border-gold/50 transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-forest text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-gold/40">
                    0{s.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-lg text-near-black">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-forest">
                  <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                  <span>Personal boutique care guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
