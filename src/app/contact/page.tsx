import React from 'react';
import ContactForm from '@/components/ContactForm';
import { Phone, MapPin, MessageSquare, Clock, Star } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Warden & Sons Kids Wear',
  description: 'Get in touch with Warden & Sons Kids Wear. Reach out for sizing support, bulk uniforms, or visit our Kemps Corner store in South Mumbai.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
          📞 Customer Support Desk
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary-800 leading-tight">
          Get in Touch With Us
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Have a question about fabric stretch, stock levels, custom sizing, or school uniforms? Reach out to our family members directly.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Columns */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-primary-800">Support Channels</h2>
            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              Choose the fastest channel to reach us. WhatsApp is recommended for immediate stock validations and live sizing pictures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 space-y-2 font-sans text-xs">
              <Phone className="w-5 h-5 text-accent-500" />
              <h3 className="font-heading font-bold text-slate-800">Phone Support</h3>
              <p className="text-slate-500">Call us during store hours.</p>
              <a href="tel:+919920751567" className="font-bold text-primary-800 hover:underline block pt-1">
                +91 99207 51567
              </a>
            </div>

            <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 space-y-2 font-sans text-xs">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <h3 className="font-heading font-bold text-slate-800">WhatsApp Chat</h3>
              <p className="text-slate-500">Fastest way to get options.</p>
              <a href="https://wa.me/message/NBG6MFUV3EXYG1" target="_blank" rel="noopener noreferrer" className="font-bold text-green-600 hover:underline block pt-1">
                Chat Live (Click here)
              </a>
            </div>

            <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 space-y-2 font-sans text-xs">
              <MapPin className="w-5 h-5 text-accent-500" />
              <h3 className="font-heading font-bold text-slate-800">Physical Store</h3>
              <p className="text-slate-500">Walk into our boutique.</p>
              <span className="text-primary-800 font-bold block pt-1">
                Kemps Corner, South Mumbai
              </span>
            </div>

            <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 space-y-2 font-sans text-xs">
              <Clock className="w-5 h-5 text-accent-500" />
              <h3 className="font-heading font-bold text-slate-800">Operating Hours</h3>
              <p className="text-slate-500">Mon - Sat: 10:30 AM - 8:30 PM</p>
              <span className="text-slate-500 block">Sunday: Closed</span>
            </div>
          </div>

          {/* Feedback & Review card */}
          <div className="bg-warm-neutral p-6 rounded-2xl border border-primary-50 space-y-4 text-center sm:text-left">
            <h3 className="font-heading font-bold text-lg text-primary-800">Satisfied with our service?</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              We appreciate the feedback from our neighbors in South Bombay. If you've shopped with us, please support our local business by sharing a Google Business review.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://g.page/r/CRi_iIq4yd6gEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-800 hover:bg-primary-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5"
              >
                ⭐ Leave Us a Google Review
              </a>
              <div className="flex items-center space-x-0.5 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-500" />
                ))}
                <span className="text-[11px] text-slate-500 font-semibold ml-1.5">(4.9/5.0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="lg:col-span-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
