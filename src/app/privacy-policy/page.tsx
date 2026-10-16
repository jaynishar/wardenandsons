import React from 'react';
import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the privacy policy of Warden & Sons Kids Wear. Learn how we handle customer details, payments, and order tracking securely.',
  alternates: {
    canonical: getCanonicalUrl('/privacy-policy'),
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-800 mb-6">
        Privacy Policy
      </h1>
      <p className="text-xs text-slate-400 mb-8 font-sans">Last Updated: July 23, 2026</p>
      
      <div className="prose text-xs text-slate-600 leading-relaxed font-sans space-y-6">
        <p>
          At <strong>Warden & Sons Kids Wear</strong>, located at Kemps Corner, South Mumbai, we value the trust of our customers. This privacy policy describes how we collect, use, and protect your personal information when you visit our store, use our website, or purchase items via our WhatsApp or video call channels.
        </p>

        <h2 className="font-heading font-bold text-sm text-slate-800 uppercase mt-8 mb-2">1. Information We Collect</h2>
        <p>
          We collect personal details that you actively share with us to process your orders or book appointments, including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Contact Details:</strong> Your full name, telephone/mobile number, email address, and physical shipping address.</li>
          <li><strong>Order Preferences:</strong> Categories of interest, child’s age, required sizes, and specific garment selections.</li>
          <li><strong>Payment Information:</strong> Transaction details, UPI payment references, and payment receipt screenshots shared via WhatsApp. We do not store or process credit card details directly.</li>
        </ul>

        <h2 className="font-heading font-bold text-sm text-slate-800 uppercase mt-8 mb-2">2. How We Use Your Details</h2>
        <p>
          Your information is utilized solely to provide our customized neighborhood retail service:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>To compile and process your WhatsApp and online cart purchases.</li>
          <li>To schedule and execute live video call shopping sessions.</li>
          <li>To coordinate doorstep shipping and local courier dispatch (e.g. Borzo, Dunzo, Blue Dart).</li>
          <li>To answer customer service questions, sizing exchanges, and bulk Uniform orders.</li>
        </ul>

        <h2 className="font-heading font-bold text-sm text-slate-800 uppercase mt-8 mb-2">3. Third-Party Sharing</h2>
        <p>
          We do not sell, trade, or distribute your personal data. We share your information only with trusted third-party service providers essential for logistics:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Delivery Services:</strong> Sharing address details and contact numbers with local couriers or shipping companies to deliver your clothes.</li>
          <li><strong>Payment Gateways:</strong> Safe digital transaction references to verify UPI payments.</li>
        </ul>

        <h2 className="font-heading font-bold text-sm text-slate-800 uppercase mt-8 mb-2">4. Data Security</h2>
        <p>
          We store customer details on secure offline files and encrypted business devices to prevent unauthorized access. We encourage you to only send orders and screenshots to our official business WhatsApp number: <strong>+91 99207 51567</strong>.
        </p>

        <h2 className="font-heading font-bold text-sm text-slate-800 uppercase mt-8 mb-2">5. Your Choices & Access</h2>
        <p>
          You have the right to request access to the information we hold about you, request corrections, or request complete removal of your address records from our logs. To make a request, contact us on WhatsApp or write to us through our contact page.
        </p>
      </div>
    </div>
  );
}
