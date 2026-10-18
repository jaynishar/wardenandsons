import React from 'react';
import { Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';
import { BUSINESS_CONFIG } from '@/config/business';
import { getCanonicalUrl } from '@/config/site';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Contact Our Kemps Corner Store in Mumbai',
  description:
    'Get in touch with Warden & Sons Kids Wear at Kemps Corner, South Mumbai. Send sizing queries, newborn questions, or visit our shop.',
  alternates: {
    canonical: getCanonicalUrl('/contact'),
  },
};

export default function ContactPage() {
  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 font-sans">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Contact', url: getCanonicalUrl('/contact') },
        ]}
      />
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white px-3.5 py-1.5 rounded-full border border-gold/30 inline-block">
          We Are Here To Help
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          Contact Our Store Desk
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          Have questions regarding infant sizes, fabric softness, or custom orders? Reach out via
          form or chat directly on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Contact Information Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-border-soft p-7 shadow-xs space-y-6">
            <h2 className="font-serif font-bold text-xl text-forest">Kemps Corner Store</h2>

            <div className="space-y-4 text-xs sm:text-sm text-muted">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-near-black">Store Address</p>
                  <p>{BUSINESS_CONFIG.location.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-near-black">Store Hours</p>
                  <p>{BUSINESS_CONFIG.hours.display}</p>
                  <p className="text-forest font-semibold text-xs mt-0.5">
                    Open all 7 days of the week
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-near-black">Store Desk Phone</p>
                  <a
                    href={BUSINESS_CONFIG.phone.telLink}
                    className="text-forest font-bold hover:underline"
                  >
                    {BUSINESS_CONFIG.phone.display}
                  </a>
                  {BUSINESS_CONFIG.phone.landline && (
                    <span className="block text-xs text-muted">
                      Landline: {BUSINESS_CONFIG.phone.landline}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-whatsapp shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-near-black">WhatsApp Ordering</p>
                  <a
                    href={BUSINESS_CONFIG.phone.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-whatsapp font-bold hover:underline"
                  >
                    {BUSINESS_CONFIG.phone.display} (Click to Chat)
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border-soft">
              <a
                href={BUSINESS_CONFIG.phone.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white text-whatsapp" />
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
