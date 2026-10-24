import React from 'react';
import BulkOrderForm from '@/components/BulkOrderForm';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import SchoolsServedSection from '@/components/SchoolsServedSection';
import TrustMarquee from '@/components/TrustMarquee';
import { GraduationCap, Trophy, Gift, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/config/business';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  path: '/bulk-orders',
  title: { absolute: "School Uniforms & Bulk Orders, South Mumbai | Warden & Sons" },
  description: "Custom school uniforms, sports house t-shirts, and bulk cotton children's clothing in South Mumbai. Get direct WhatsApp quotes and fabric swatches.",
});

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
      desc: 'Combed cotton screen-printed tees for sports day houses, school clubs, festivals, and cultural gatherings.',
      icon: Gift,
    },
  ];

  return (
    <div className="bg-white font-sans text-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-14">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: getCanonicalUrl('/') },
            { name: 'Bulk Orders', url: getCanonicalUrl('/bulk-orders') },
          ]}
        />

        {/* Editorial Header */}
        <header className="space-y-4 my-8">
          <h1 className="text-[32px] sm:text-5xl lg:text-[66px] font-black tracking-tight text-[var(--ink)] leading-[1.05]">
            School Uniforms &amp; Bulk Orders
          </h1>
          <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed max-w-3xl">
            Warden &amp; Sons partners with South Mumbai schools, sports academies, and educational foundations to manufacture high-grade cotton uniforms and custom event apparel.
          </p>
          <div className="pt-2">
            <a
              href="#bulk-form"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-[var(--ink)] text-white text-base font-bold hover:bg-[var(--blue)] transition-colors cursor-pointer"
            >
              Request institutional quote
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-10">
          {/* Left Column: Capabilities & Desk Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--surface)] p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-black text-[var(--ink)] tracking-tight">
                Production Capabilities
              </h2>

              <div className="space-y-6">
                {capabilities.map(cap => {
                  const Icon = cap.icon;
                  return (
                    <div key={cap.title} className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-white flex items-center justify-center shrink-0 border-2 border-[var(--ink)] text-[var(--ink)]">
                        <Icon className="w-5 h-5 text-[var(--ink)]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-base text-[var(--ink)] leading-snug">
                          {cap.title}
                        </h3>
                        <p className="text-base text-[var(--ink)]/75 leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t-2 border-[var(--ink)]/15 space-y-3 text-base text-[var(--ink)]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[var(--whatsapp)] shrink-0" />
                  <span className="font-medium">Custom embroidery, pocket crests, and screen-printing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[var(--whatsapp)] shrink-0" />
                  <span className="font-medium">Fabric swatches shared directly with your committee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[var(--whatsapp)] shrink-0" />
                  <span className="font-medium">Flexible batch sizes and quality-controlled stitching</span>
                </div>
              </div>
            </div>

            {/* Direct Desk Callout */}
            <div className="bg-[var(--ink)] text-white p-6 sm:p-8 space-y-3">
              <h3 className="font-black text-xl text-white tracking-tight">
                Speak directly with the store desk
              </h3>
              <p className="text-base text-white/80 leading-relaxed">
                Call our Kemps Corner store desk at{' '}
                <a href={BUSINESS_CONFIG.phone.telLink} className="underline font-bold text-white hover:text-[var(--yellow)]">
                  {BUSINESS_CONFIG.phone.display}
                </a>{' '}
                or message us on WhatsApp with your quantities and delivery deadline.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div id="bulk-form" className="lg:col-span-7">
            <BulkOrderForm />
          </div>
        </div>

        {/* Optional Schools & Academies */}
        <SchoolsServedSection />
      </div>

      <TrustMarquee />
    </div>
  );
}
