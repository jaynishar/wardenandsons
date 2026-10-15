import React from 'react';
import BulkOrderForm from '@/components/BulkOrderForm';
import { GraduationCap, Trophy, Gift, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/config/business';

export const metadata: Metadata = {
  title: 'Custom School Uniforms & Bulk Enquiries',
  description:
    'Custom school uniforms, cricket whites, sports academy jerseys, and institutional clothing in Mumbai. Bespoke tailoring by Warden & Sons, Kemps Corner.',
  alternates: {
    canonical: '/bulk-orders',
  },
};

export default function BulkOrdersPage() {
  const capabilities = [
    {
      title: 'School Uniforms & Pinafores',
      desc: 'Durable, colorfast poly-cotton and pure cotton shirts, skirts, shorts, and trousers tailored to school dress codes.',
      icon: GraduationCap,
    },
    {
      title: 'Academy Sports & Cricket Whites',
      desc: 'Breathable dryfit micro-polyester jerseys and reinforced cricket whites built to withstand intense coaching drills.',
      icon: Trophy,
    },
    {
      title: 'Annual Day & Event Apparel',
      desc: 'Vibrant combed cotton screen-printed tees for sports day houses, school clubs, festivals, and cultural gatherings.',
      icon: Gift,
    },
  ];

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          Institutional Tailoring • South Mumbai
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4332] tracking-tight">
          Custom School Uniforms &amp; Bulk Apparel
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Warden &amp; Sons partners with Mumbai schools, sports academies, and educational foundations to manufacture high-grade cotton uniforms and bespoke event apparel.
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
                <span>Fabric swatches shared directly with your committee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Flexible batch sizes and quality-controlled stitching</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1B4332] text-white rounded-3xl p-6 shadow-xs space-y-2">
            <h3 className="font-serif font-bold text-base text-[#D4A574]">
              Urgent Uniform Requirement?
            </h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              Call our store desk directly at{' '}
              <a href={BUSINESS_CONFIG.phone.telLink} className="underline font-bold">
                {BUSINESS_CONFIG.phone.display}
              </a>{' '}
              or message us on WhatsApp with your specifications.
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
