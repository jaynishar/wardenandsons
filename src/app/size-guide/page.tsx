import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Ruler, MessageSquare, ArrowRight, HelpCircle } from 'lucide-react';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';
import { BUSINESS_CONFIG } from '@/config/business';

export const metadata: Metadata = buildPageMetadata({
  path: '/size-guide',
  title: { absolute: 'Kids Clothes Size Chart by Age (0-16Y) | Warden & Sons' },
  description:
    'Accurate kids clothing size chart by age, chest, and height. Find what size for age 2-16 or ask our desk for counter measurements.',
});

export default function SizeGuidePage() {
  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Size Guide', url: getCanonicalUrl('/size-guide') },
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white px-3.5 py-1.5 rounded-full border border-gold/30 inline-flex items-center gap-1.5">
          <Ruler className="w-3.5 h-3.5 text-gold" />
          <span>Fitting & Measurement Guide</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          Kids Clothes Size Chart by Age
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          Wondering what size for age 4 or which age matches size S, M, or L? Children grow fast,
          and sizing varies between Indian and international brands. Use our pure cotton kids
          clothing size by age guide below, or message our Kemps Corner store desk for live
          measuring tape verification.
        </p>
      </div>

      {/* Direct Quick-Answer Q&A Cards (Targeting Top GSC Queries) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-border-soft shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-forest font-serif font-bold text-base">
            <HelpCircle className="w-4 h-4 text-gold shrink-0" />
            <h3>What Size for Age 4 or 5?</h3>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            For children aged <strong className="text-forest">4 to 5 Years</strong>, the standard fit is <strong className="text-forest">Size XS</strong> or numbered <strong className="text-forest">Size 22–24</strong> (Chest: 22–24 in, Height: 38–43 in).
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border-soft shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-forest font-serif font-bold text-base">
            <HelpCircle className="w-4 h-4 text-gold shrink-0" />
            <h3>S Size Age for Kids?</h3>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            In children’s clothing, <strong className="text-forest">Size S (Small)</strong> matches <strong className="text-forest">6 to 7 Years</strong> or numbered <strong className="text-forest">Size 26</strong> (Chest: 24–26 in, Height: 43–48 in).
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border-soft shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-forest font-serif font-bold text-base">
            <HelpCircle className="w-4 h-4 text-gold shrink-0" />
            <h3>M Size for Which Age?</h3>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            In kids’ wear, <strong className="text-forest">Size M (Medium)</strong> fits children aged <strong className="text-forest">8 to 9 Years</strong> or numbered <strong className="text-forest">Size 28–30</strong> (Chest: 26–28 in, Height: 48–53 in).
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border-soft shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-forest font-serif font-bold text-base">
            <HelpCircle className="w-4 h-4 text-gold shrink-0" />
            <h3>L &amp; XL Size for Which Age?</h3>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            In youth sizing, <strong className="text-forest">Size L</strong> fits <strong className="text-forest">10 to 12 Years</strong> (Chest: 28–30 in, Size 32), while <strong className="text-forest">Size XL</strong> fits <strong className="text-forest">13 to 16 Years</strong> (Chest: 30–32 in, Size 34–36).
          </p>
        </div>
      </div>

      {/* Primary Kids Size Chart Table (Boys, Girls & Youth) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-border-soft shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-soft pb-5">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-gold block mb-1">
              Boys, Girls & Juniors (2 – 16 Years)
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              Children’s Clothing Size Chart by Age
            </h2>
          </div>
          <p className="text-xs text-muted max-w-md">
            Values reflect garment chest dimensions and average child body parameters. For 100%
            cotton garments, we advise taking one size larger if in between measurements.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-forest/20 text-forest font-serif">
                <th className="py-3 px-3 sm:px-4 font-bold">Age Group</th>
                <th className="py-3 px-3 sm:px-4 font-bold">Standard Size Label</th>
                <th className="py-3 px-3 sm:px-4 font-bold">Height (Inches)</th>
                <th className="py-3 px-3 sm:px-4 font-bold">Weight (kg)</th>
                <th className="py-3 px-3 sm:px-4 font-bold">Chest (Inches)</th>
                <th className="py-3 px-3 sm:px-4 font-bold">India / Numbered Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft text-near-black">
              <tr className="hover:bg-bg-cream/40 transition-colors">
                <td className="py-3 px-3 sm:px-4 font-semibold">2 – 3 Years</td>
                <td className="py-3 px-3 sm:px-4 text-forest font-medium">Toddler / 2-3Y</td>
                <td className="py-3 px-3 sm:px-4 text-muted">34 – 38 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">14 – 16 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">21 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">Size 20</td>
              </tr>
              <tr className="hover:bg-bg-cream/40 transition-colors bg-bg-cream/20">
                <td className="py-3 px-3 sm:px-4 font-semibold">4 – 5 Years</td>
                <td className="py-3 px-3 sm:px-4 text-forest font-medium">
                  XS (Extra Small) / 4-5Y
                </td>
                <td className="py-3 px-3 sm:px-4 text-muted">38 – 43 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">16 – 20 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">23 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">Size 22 – 24</td>
              </tr>
              <tr className="hover:bg-bg-cream/40 transition-colors">
                <td className="py-3 px-3 sm:px-4 font-semibold">6 – 7 Years</td>
                <td className="py-3 px-3 sm:px-4 text-forest font-medium">S (Small) / 6-7Y</td>
                <td className="py-3 px-3 sm:px-4 text-muted">43 – 48 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">20 – 25 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">25 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">Size 26</td>
              </tr>
              <tr className="hover:bg-bg-cream/40 transition-colors bg-bg-cream/20">
                <td className="py-3 px-3 sm:px-4 font-semibold">8 – 9 Years</td>
                <td className="py-3 px-3 sm:px-4 text-forest font-medium">M (Medium) / 8-9Y</td>
                <td className="py-3 px-3 sm:px-4 text-muted">48 – 53 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">25 – 30 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">27 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">Size 28 – 30</td>
              </tr>
              <tr className="hover:bg-bg-cream/40 transition-colors">
                <td className="py-3 px-3 sm:px-4 font-semibold">10 – 12 Years</td>
                <td className="py-3 px-3 sm:px-4 text-forest font-medium">L (Large) / 10-12Y</td>
                <td className="py-3 px-3 sm:px-4 text-muted">53 – 58 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">30 – 38 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">29 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">Size 32</td>
              </tr>
              <tr className="hover:bg-bg-cream/40 transition-colors bg-bg-cream/20">
                <td className="py-3 px-3 sm:px-4 font-semibold">13 – 16 Years</td>
                <td className="py-3 px-3 sm:px-4 text-forest font-medium">
                  XL (Extra Large) / 13-16Y
                </td>
                <td className="py-3 px-3 sm:px-4 text-muted">58 – 64 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">38 – 50 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">31 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">Size 34 – 36</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Newborn & Infant Sizing Table */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-border-soft shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-soft pb-5">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-gold block mb-1">
              Newborns & Infants (0 – 24 Months)
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              Baby Clothes Size Chart by Age & Weight
            </h2>
          </div>
          <p className="text-xs text-muted max-w-md">
            For newborn jhablas, onesies, and muslin swaddles. Diaper-rise room is built into all
            garments.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-forest/20 text-forest font-serif">
                <th className="py-3 px-3 sm:px-4 font-bold">Age Range</th>
                <th className="py-3 px-3 sm:px-4 font-bold">Height (Inches)</th>
                <th className="py-3 px-3 sm:px-4 font-bold">Weight (kg)</th>
                <th className="py-3 px-3 sm:px-4 font-bold">Chest (Inches)</th>
                <th className="py-3 px-3 sm:px-4 font-bold">Recommended Style</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft text-near-black">
              <tr className="hover:bg-bg-cream/40 transition-colors">
                <td className="py-3 px-3 sm:px-4 font-semibold">0 – 3 Months</td>
                <td className="py-3 px-3 sm:px-4 text-muted">20 – 24 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">3.0 – 5.5 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">16 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">
                  Tie-up cotton jhablas, front-open onesies
                </td>
              </tr>
              <tr className="hover:bg-bg-cream/40 transition-colors bg-bg-cream/20">
                <td className="py-3 px-3 sm:px-4 font-semibold">3 – 6 Months</td>
                <td className="py-3 px-3 sm:px-4 text-muted">24 – 27 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">5.5 – 7.5 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">17 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">
                  Snap-crotch rompers, muslin swaddles
                </td>
              </tr>
              <tr className="hover:bg-bg-cream/40 transition-colors">
                <td className="py-3 px-3 sm:px-4 font-semibold">6 – 12 Months</td>
                <td className="py-3 px-3 sm:px-4 text-muted">27 – 30 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">7.5 – 10.0 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">18 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">
                  Crawling sets, cotton play tees, sleepsuits
                </td>
              </tr>
              <tr className="hover:bg-bg-cream/40 transition-colors bg-bg-cream/20">
                <td className="py-3 px-3 sm:px-4 font-semibold">12 – 18 Months</td>
                <td className="py-3 px-3 sm:px-4 text-muted">30 – 32 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">10.0 – 12.0 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">19 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">
                  Two-piece playwear, hosiery nightsuits
                </td>
              </tr>
              <tr className="hover:bg-bg-cream/40 transition-colors">
                <td className="py-3 px-3 sm:px-4 font-semibold">18 – 24 Months</td>
                <td className="py-3 px-3 sm:px-4 text-muted">32 – 34 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">12.0 – 14.0 kg</td>
                <td className="py-3 px-3 sm:px-4 font-medium">20 in</td>
                <td className="py-3 px-3 sm:px-4 text-muted">
                  Dresses with bloomers, shorts & tees
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sizing Tips & Practical Advice */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-border-soft space-y-3">
          <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest font-bold">
            1
          </div>
          <h3 className="font-serif font-bold text-forest text-lg">The &ldquo;Always Size Up&rdquo; Rule</h3>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            If your child falls exactly between two sizes or is experiencing a growth spurt, always
            pick the larger size. A slightly loose cotton garment provides better airflow in
            Mumbai’s humidity and lasts much longer.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border-soft space-y-3">
          <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest font-bold">
            2
          </div>
          <h3 className="font-serif font-bold text-forest text-lg">Natural Cotton Shrinkage</h3>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Pure 100% combed cotton and double-gauze muslin naturally contract by about 3–5% upon
            initial laundering. Warden & Sons fabrics are pre-shrunk, but generous sizing guarantees
            relaxed comfort after multiple washes.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border-soft space-y-3">
          <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest font-bold">
            3
          </div>
          <h3 className="font-serif font-bold text-forest text-lg">Comfortable Waistbands</h3>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Our boys’ joggers, shorts, and girls’ leggings feature soft internal elastic with
            functional drawstrings. This allows an adjustable fit around the waist even as your
            child gains height.
          </p>
        </div>
      </section>

      {/* WhatsApp Counter Tape Verification CTA */}
      <div className="bg-forest text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest-dark relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-gold block mb-1">
            Zero-Guesswork Size Service
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
            Still Not Sure of the Size? Let Our Counter Measure Live
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            Avoid exchange trips. When ordering via WhatsApp, simply tell us your child’s current
            age, height, or chest measurement. Our shop team at Kemps Corner will pull the physical
            garment from the rack and measure it with a tape before packing.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="size_guide"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white text-whatsapp" />
              <span>Ask Size on WhatsApp ({BUSINESS_CONFIG.phone.display})</span>
            </a>

            <Link
              href="/shop/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all active:scale-[0.98]"
            >
              <span>Explore Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
