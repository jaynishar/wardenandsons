import React from 'react';
import { ShoppingBag, MessageSquare, Truck, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Browse & Add to Bag',
      description:
        'Explore our sample catalog of 100% pure cotton kidswear, nightsuits, and family basics. Add items and quantities to your bag.',
      icon: ShoppingBag,
    },
    {
      step: '2',
      title: 'Send on WhatsApp',
      description:
        'Click "Send Order on WhatsApp". Your complete order list is automatically formatted and delivered directly to our store phone.',
      icon: MessageSquare,
    },
    {
      step: '3',
      title: 'Live Photos & Delivery',
      description:
        'Our family team shares live photos of available colors, confirms sizes with a measuring tape, and dispatches via fast delivery or store pickup.',
      icon: Truck,
    },
  ];

  return (
    <section className="bg-white border-y border-[#EBE7DF] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
            Personalized Neighborhood Shopping
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B4332]">
            How WhatsApp Shopping Works
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            No impersonal carts, no rigid returns. Experience the warmth of shopping with an authentic South Bombay family boutique from the comfort of your home.
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
                  <div className="w-12 h-12 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-sm">
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
                  <span>Personalized service guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
