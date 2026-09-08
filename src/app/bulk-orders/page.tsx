import React from 'react';
import BulkOrderForm from '@/components/BulkOrderForm';
import { ShieldCheck, Sparkles, Truck, GraduationCap, Trophy, Gift } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Bulk Clothing & Uniform Orders',
  description: 'Need custom school uniforms, sports kits, event t-shirts, or corporate gifting packages in Mumbai? Send your bulk enquiries to Warden & Sons.',
  alternates: {
    canonical: '/bulk-orders',
  },
};

export default function BulkOrdersPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Side */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
              🎒 Custom Tailoring & Manufacturing
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary-800 leading-tight">
              School Uniforms & Bulk Orders in Mumbai
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
              From high-quality school uniforms and cricket whites for local academies to custom printed event t-shirts and corporate newborn gift hampers, we manufacture custom garments tailored specifically for Mumbai’s weather and washing patterns.
            </p>
          </div>

          {/* Sourcing Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-primary-50 p-5 rounded-2xl border border-primary-100 space-y-2.5">
              <div className="text-primary-800"><GraduationCap className="w-6 h-6" /></div>
              <h3 className="font-heading font-bold text-sm text-primary-800">School Uniforms</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Shirts, shorts, trousers, pinafores, and socks designed for local Mumbai school curriculums.
              </p>
            </div>

            <div className="bg-primary-50 p-5 rounded-2xl border border-primary-100 space-y-2.5">
              <div className="text-primary-800"><Trophy className="w-6 h-6" /></div>
              <h3 className="font-heading font-bold text-sm text-primary-800">Sports & Club Kits</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Sweat-wicking dry-fit jerseys, gym shorts, and custom reinforced cricket whites for academies.
              </p>
            </div>

            <div className="bg-primary-50 p-5 rounded-2xl border border-primary-100 space-y-2.5">
              <div className="text-primary-800"><Gift className="w-6 h-6" /></div>
              <h3 className="font-heading font-bold text-sm text-primary-800">Corporate & Events</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Custom screen-printed t-shirts, anniversary fits, and custom newborn welcome baskets.
              </p>
            </div>
          </div>

          {/* Sourcing standards */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-primary-800">Our Bulk Sourcing Quality Standards:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-2 text-xs">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-slate-600 font-sans">
                  <strong>Azo-Free Premium Dyes:</strong> We use safe dyestuffs that prevent chemical irritation on active skin.
                </span>
              </div>
              <div className="flex gap-2 text-xs">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-slate-600 font-sans">
                  <strong>180 GSM Pure Cotton:</strong> Standard weight for high-durability and breathability under daily washing.
                </span>
              </div>
              <div className="flex gap-2 text-xs">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-slate-600 font-sans">
                  <strong>Reinforced Double-Stitching:</strong> Prevents premature ripping at pocket corners, collars, and waistbands.
                </span>
              </div>
              <div className="flex gap-2 text-xs">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-slate-600 font-sans">
                  <strong>Local Sizing Assistance:</strong> Sizing trials and physical sample blocks provided before printing.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="lg:col-span-5 relative lg:sticky lg:top-28">
          <BulkOrderForm />
        </div>
      </div>
    </div>
  );
}
