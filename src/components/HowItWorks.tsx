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
    <section className="bg-white border-y border-[#EBE7DF] py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
            Personalized Neighborhood Shopping
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B4332]">
            How WhatsApp Catalogue Shopping Works
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            No rigid automated checkouts or guessing sizes online. Experience personal service from an authentic South Mumbai family boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-[#EBE7DF] flex flex-col justify-between space-y-4 hover:border-[#D4A574]/50 transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 text-[#D4A574]" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-[#D4A574]/40">
                    0{s.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#1B4332]">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
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
