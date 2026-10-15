import React from 'react';
import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Store Desk',
  description:
    'Get in touch with Warden & Sons Kids Wear Kemps Corner. Send sizing questions, newborn gift queries, or visit us in South Mumbai.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4A574] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A574]/30 inline-block">
          We Are Here To Help
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B4332] tracking-tight">
          Contact Our Store Desk
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Have questions regarding infant sizes, fabric softness, or custom orders? Reach out via form or chat directly on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Contact Information Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#EBE7DF] p-7 shadow-xs space-y-6">
            <h2 className="font-serif font-bold text-xl text-[#1B4332]">
              Kemps Corner Atelier
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#666666]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4A574] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1A1A1A]">Store Address</p>
                  <p>Kemps Corner, South Mumbai, Mumbai, Maharashtra 400036</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D4A574] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1A1A1A]">Store Hours</p>
                  <p>Monday – Saturday: 10:30 AM – 8:30 PM</p>
                  <p className="text-red-600 font-semibold text-xs mt-0.5">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4A574] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1A1A1A]">Store Desk Phone</p>
                  <a href="tel:+919920751567" className="text-[#1B4332] font-bold hover:underline">
                    +91 99207 51567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1A1A1A]">WhatsApp Ordering</p>
                  <a
                    href="https://wa.me/919920751567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-bold hover:underline"
                  >
                    +91 99207 51567 (Click to Chat)
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EBE7DF]">
              <a
                href="https://wa.me/919920751567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Immediate WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
