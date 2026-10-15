import React from 'react';
import BulkOrderForm from '@/components/BulkOrderForm';
import { GraduationCap, Trophy, Gift, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Bulk Clothing & Uniform Orders (MOQ 50)',
  description:
    'Custom school uniforms, cricket whites, academy jerseys, and institutional clothing in Mumbai since 1994. Bulk manufacturing with minimum 50 pieces by Warden & Sons.',
  alternates: {
    canonical: '/bulk-orders',
  },
};

export default function BulkOrdersPage() {
  const capabilities = [
    {
      title: 'School Uniforms & Pinafores',
      desc: 'Durable, colorfast poly-cotton and pure cotton shirts, skirts, shorts, and trousers tailored to school guidelines.',
      icon: GraduationCap,
    },
    {
      title: 'Academy Sports & Cricket Whites',
      desc: 'Breathable dryfit micro-polyester jerseys and reinforced cricket whites built to withstand intense coaching drills.',
      icon: Trophy,
    },
    {
      title: 'Annual Day & Event T-Shirts',
      desc: 'Vibrant 180 GSM cotton screen-printed tees for sports day houses, school clubs, festivals, and cultural events.',
      icon: Gift,
    },
  ];

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          Institutional Tailoring • Since 1994
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4332] tracking-tight">
          Custom Bulk &amp; School Uniforms
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Warden &amp; Sons partners with Mumbai schools, sports academies, and educational foundations to manufacture high-grade uniforms with a <strong>minimum order of 50 pieces</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Information Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#EBE7DF] p-7 shadow-xs space-y-6">
            <h2 className="font-serif font-bold text-xl text-[#1B4332]">
              Production Capabilities
            </h2>

            <div className="space-y-4">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.title} className="flex gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center shrink-0 text-[#1B4332]">
                      <Icon className="w-5 h-5 text-[#D4A574]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">{cap.title}</h3>
                      <p className="text-xs text-[#666666] leading-relaxed mt-0.5">{cap.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#EBE7DF] space-y-2 text-xs text-[#1B4332]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Custom embroidery, pocket crests, and screen-printing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Fabric swatches delivered to your school desk</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Strict batch-level quality control in Maharashtra</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1B4332] text-white rounded-3xl p-6 shadow-sm space-y-2">
            <h3 className="font-serif font-bold text-base text-[#D4A574]">
              Urgent Uniform Requirement?
            </h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              Call our B2B desk directly at <a href="tel:+919920751567" className="underline font-bold">+91 99207 51567</a> or message us on WhatsApp with your deadline and specifications.
            </p>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="lg:col-span-7">
          <BulkOrderForm />
        </div>
      </div>
    </div>
  );
}
