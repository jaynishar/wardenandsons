import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Compass, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visit Us | Store Locator & Map',
  description: 'Find Warden & Sons Kids Wear at Kemps Corner, South Mumbai. View store hours, phone numbers, and get directions on Google Maps.',
  alternates: {
    canonical: '/visit-us',
  },
};

export default function VisitUsPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
          📍 Kemps Corner Shop Locator
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary-800 leading-tight">
          Visit Our Store in South Bombay
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Drop by our neighborhood boutique to browse our collection, check fabric textures, and get personal assistance from our family members.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Card */}
        <div className="lg:col-span-5 bg-white border border-primary-100 p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
          <div className="border-b border-primary-50 pb-4">
            <h2 className="font-heading font-bold text-xl text-primary-800">Store Directory</h2>
            <p className="text-xs text-slate-500 font-sans mt-1">Warden & Sons Kids Wear (Retail Store)</p>
          </div>

          <div className="space-y-5 text-xs text-slate-600 leading-relaxed font-sans">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Shop Address:</strong>
                <p className="mt-1">
                  Kemps Corner, South Mumbai (South Bombay),<br />
                  Mumbai, Maharashtra 400036, India
                </p>
              </div>
            </div>

            <div className="flex gap-3 border-t border-primary-50 pt-4">
              <Clock className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Opening Hours:</strong>
                <p className="mt-1">
                  Monday to Saturday: 10:30 AM - 8:30 PM<br />
                  Sunday: Closed (Store Closed)
                </p>
              </div>
            </div>

            <div className="flex gap-3 border-t border-primary-50 pt-4">
              <Phone className="w-5 h-5 text-accent-500 shrink-0" />
              <div>
                <strong className="text-slate-800">Phone & Orders:</strong>
                <p className="mt-1">
                  <a href="tel:+919920751567" className="text-primary-800 hover:text-accent-500 font-bold underline">
                    +91 99207 51567
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-3 border-t border-primary-50 pt-4">
              <MessageSquare className="w-5 h-5 text-green-600 shrink-0" />
              <div>
                <strong className="text-slate-800">WhatsApp Buying Desk:</strong>
                <p className="mt-1">
                  <a href="https://wa.me/message/NBG6MFUV3EXYG1" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-500 font-bold underline">
                    Chat on WhatsApp (Click here)
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-primary-50">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Warden+%26+Sons+Kids+Wear+Kemps+Corner+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors text-xs uppercase tracking-wider font-sans focus:outline-none flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
              id="visit-us-google-maps-cta"
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        </div>

        {/* Map Embed Side */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-primary-100 relative bg-primary-50">
            <div className="map-container">
              <iframe
                title="Warden & Sons Kids Wear Kemps Corner Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.844393080757!2d72.80332827598816!3d18.960416982218086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce074e0d9b4b%3A0xe2bc1e5f8cb4d70b!2sKemps%20Corner%2C%20Malabar%20Hill%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

          {/* Landmarks / Directions guidance */}
          <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 space-y-3">
            <h4 className="font-heading font-bold text-sm text-primary-800 flex items-center gap-1">
              <Compass className="w-5 h-5 text-accent-500" /> Proximity & Landmarks:
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Our store is located in the upscale commercial neighborhood of Kemps Corner. We are close to the Pedder Road flyover, Altamount Road (one of Mumbai's most exclusive residential avenues), Breach Candy, and Nepean Sea Road. Landmark proximity includes Shalimar Hotel and various local cafes. If you have trouble finding us, please call our desk at <a href="tel:+919920751567" className="font-bold underline text-primary-800">+91 99207 51567</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
