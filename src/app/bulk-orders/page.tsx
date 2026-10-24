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
    <div className="bg-[var(--bg)] font-sans text-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-14">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: getCanonicalUrl('/') },
            { name: 'Bulk Orders', url: getCanonicalUrl('/bulk-orders') },
          ]}
        />

        {/* Editorial Header */}
        <header className="space-y-4 my-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--surface)] border border-[var(--line)] rounded-sm text-[12px] font-medium tracking-wide uppercase text-[var(--muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--terracotta)]" aria-hidden="true" />
            <span>Institutional Manufacturing · Kemps Corner</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--ink)] leading-[1.05]">
            School Uniforms &amp; Bulk Orders
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-3xl font-normal">
            Warden &amp; Sons partners with South Mumbai schools, sports academies, and educational foundations to manufacture high-grade cotton uniforms and custom event apparel with precise institutional specifications.
          </p>
          <div className="pt-2">
            <a
              href="#bulk-form"
              className="inline-flex items-center justify-center px-7 py-3 bg-[var(--ink)] text-white text-[14px] font-medium rounded-sm hover:bg-[var(--blue)] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
            >
              Request Institutional Quote
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-10">
          {/* Left Column: Capabilities & Desk Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[var(--line)] rounded-md p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-medium text-[var(--ink)] tracking-tight">
                Production Capabilities
              </h2>

              <div className="space-y-6">
                {capabilities.map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <div key={cap.title} className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-[var(--surface)] rounded-sm flex items-center justify-center shrink-0 border border-[var(--line)] text-[var(--ink)]">
                        <Icon className="w-5 h-5 text-[var(--terracotta)]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium text-base text-[var(--ink)] leading-snug">
                          {cap.title}
                        </h3>
                        <p className="text-[13px] text-[var(--muted)] leading-relaxed font-normal">
                          {cap.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-[var(--line)] space-y-3 text-[13px] text-[var(--ink)]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--wa)] shrink-0" />
                  <span>Custom embroidery, pocket crests, and screen-printing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--wa)] shrink-0" />
                  <span>Fabric swatches shared directly with your committee</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--wa)] shrink-0" />
                  <span>Flexible batch sizes and quality-controlled stitching</span>
                </div>
              </div>
            </div>

            {/* Direct Desk Callout */}
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-md p-6 sm:p-8 space-y-3">
              <h3 className="font-medium text-lg text-[var(--ink)] tracking-tight">
                Speak directly with our store desk
              </h3>
              <p className="text-[13px] text-[var(--muted)] leading-relaxed font-normal">
                Call our Kemps Corner store desk at{' '}
                <a href={BUSINESS_CONFIG.phone.telLink} className="underline font-semibold text-[var(--ink)] hover:text-[var(--terracotta)]">
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
