import React from 'react';
import VideoBookingForm from '@/components/VideoBookingForm';
import { Video, Award, Clock, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Call Shopping Session',
  description:
    'Book a video call shopping walkthrough with Warden & Sons Kids Wear. Our Kemps Corner store team will show you current racks and live sizing dimensions.',
  alternates: {
    canonical: '/video-shopping',
  },
};

export default function VideoShoppingPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Side */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-1 bg-[#FAF8F5] text-[#D4A574] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-[#D4A574]/30">
              📹 Live Kemps Corner Walkthrough
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#1B4332] leading-tight">
              Personal Video Call Shopping
            </h1>
            <p className="text-sm md:text-base text-[#666666] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Can&apos;t make it to Kemps Corner in person? Shop virtually! Our store team will walk you through the racks live on WhatsApp video, verify fabric texture, check dimensions with a measuring tape, and arrange delivery to your home.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#FAF8F5] text-[#1B4332] border border-[#EBE7DF] rounded-xl flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#D4A574]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">See Fabrics Up Close</h3>
                <p className="text-xs text-[#666666] leading-relaxed mt-1">
                  We show cotton weaves and muslins up close under store lighting and stretch waistbands so you can evaluate comfort before buying.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#FAF8F5] text-[#1B4332] border border-[#EBE7DF] rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#D4A574]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Tape Measure Sizing Check</h3>
                <p className="text-xs text-[#666666] leading-relaxed mt-1">
                  Our shop team will lay a physical measuring tape flat across garments to verify chest and length against your child&apos;s current fit.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#FAF8F5] text-[#1B4332] border border-[#EBE7DF] rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#D4A574]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Coordinate Matching Outfits</h3>
                <p className="text-xs text-[#666666] leading-relaxed mt-1">
                  Coordinate sibling matchings or pair bottoms with matching printed tops directly on our review table during the call.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#FAF8F5] text-[#1B4332] border border-[#EBE7DF] rounded-xl flex items-center justify-center shrink-0">
                <Video className="w-5 h-5 text-[#D4A574]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">Convenient WhatsApp Video</h3>
                <p className="text-xs text-[#666666] leading-relaxed mt-1">
                  No complex app downloads required. We call you directly on WhatsApp Video at your scheduled time.
                </p>
              </div>
            </div>
          </div>

          {/* Simple Step Guidelines */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EBE7DF] space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#1B4332]">How It Works on Call Day:</h4>
            <ol className="list-decimal pl-5 text-xs text-[#666666] space-y-2 leading-relaxed">
              <li>Our team sends a WhatsApp confirmation a few minutes prior to your selected slot.</li>
              <li>We initiate a video call and show you live boutique selections based on your interests.</li>
              <li>Once you approve the pieces and dimensions, our shop confirms pricing and coordinates direct delivery or store pickup.</li>
            </ol>
          </div>
        </div>

        {/* Booking Form Widget Side */}
        <div className="lg:col-span-5 relative lg:sticky lg:top-28">
          <VideoBookingForm />
        </div>
      </div>
    </div>
  );
}
