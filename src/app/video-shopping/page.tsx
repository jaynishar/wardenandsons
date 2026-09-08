import React from 'react';
import VideoBookingForm from '@/components/VideoBookingForm';
import { Video, Award, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Call Shopping Booking',
  description: 'Book a free video call shopping session with Warden & Sons Kids Wear. A personal shopper will walk you through our Kemps Corner store live.',
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
            <span className="inline-flex items-center gap-1 bg-accent-100 text-accent-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
              📹 Live Virtual Walkthrough
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary-800 leading-tight">
              Personal Video Call Shopping
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Can't make it to Kemps Corner? Shop virtually! Our dedicated store shoppers will walk you through the racks live on video call, verify fabric texture, measure sizes live, and deliver to your home.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-primary-100 text-primary-800 rounded-lg flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-primary-800">Touch & Feel by Proxy</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  We show fabrics up close, test elastic waist stretches, and verify fabric weights under the camera for you.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-primary-100 text-primary-800 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-primary-800">Perfect Sizing Check</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Our store assistant can lay a tape measure flat on any shirt or pants to check exact dimensions against your kid's fits.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-primary-100 text-primary-800 rounded-lg flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-primary-800">Coordinate Outfits Live</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Coordinate sibling matchings or pair shorts with matching printed tops directly on our review table during the call.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-primary-100 text-primary-800 rounded-lg flex items-center justify-center shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-primary-800">No App Installation</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  No complex setups needed. We call you directly on WhatsApp Video, Google Meet, or Zoom at your scheduled time.
                </p>
              </div>
            </div>
          </div>

          {/* Simple Step Guidelines */}
          <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 space-y-4">
            <h4 className="font-heading font-bold text-sm text-primary-800">How It Works on Call Day:</h4>
            <ol className="list-decimal pl-5 text-xs text-slate-600 space-y-2 leading-relaxed font-sans">
              <li>Our team sends a text on WhatsApp 5 minutes before to confirm you are ready.</li>
              <li>We initiate a video call and show you curated selections based on your interests.</li>
              <li>Once you confirm items, we share a UPI payment invoice link.</li>
              <li>South Bombay orders are dispatched for same-day delivery. Pan-India orders are shipped within 24 hours.</li>
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
