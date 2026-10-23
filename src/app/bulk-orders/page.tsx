import React from 'react';
import BulkOrderForm from '@/components/BulkOrderForm';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { GraduationCap, Trophy, Gift, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/config/business';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  path: '/bulk-orders',
  title: { absolute: 'Custom School Uniforms & Bulk Apparel | Warden & Sons' },
  description:
    'Custom school uniforms, sports kits, and bulk cotton children’s apparel in South Mumbai. Quality fabric and direct WhatsApp quotes.',
});

export default function BulkOrdersPage() {
  const capabilities = [
    {
      title: 'School Uniforms & Pinafores',
      desc: 'Durable, colorfast poly-cotton and pure cotton shirts, skirts, shorts, and trousers made to school dress codes.',
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
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Bulk Orders', url: getCanonicalUrl('/bulk-orders') },
        ]}
      />
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
          Uniforms & Bulk Orders • South Mumbai
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          Custom School Uniforms & Bulk Apparel
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          Warden & Sons partners with Mumbai schools, sports academies, and educational foundations
          to manufacture high-grade cotton uniforms and custom event apparel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Information Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-border-soft p-7 shadow-xs space-y-6">
            <h2 className="font-serif font-bold text-xl text-forest">Production Capabilities</h2>

            <div className="space-y-4">
              {capabilities.map(cap => {
                const Icon = cap.icon;
                return (
                  <div key={cap.title} className="flex gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-bg-cream border border-border-soft flex items-center justify-center shrink-0 text-forest">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-near-black">{cap.title}</h3>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">{cap.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-border-soft space-y-2 text-xs text-forest">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                <span>Custom embroidery, pocket crests, and screen-printing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                <span>Fabric swatches shared directly with your committee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                <span>Flexible batch sizes and quality-controlled stitching</span>
              </div>
            </div>
          </div>

          <div className="bg-forest text-white rounded-3xl p-6 shadow-xs space-y-2">
            <h3 className="font-serif font-bold text-base text-gold">
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
