import React from 'react';
import type { Metadata } from 'next';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = buildPageMetadata({
  path: '/privacy-policy',
  title: { absolute: 'Customer Privacy Policy & WhatsApp Care | Warden & Sons' },
  description:
    'Read the customer privacy policy of Warden & Sons Kids Wear. How we protect your personal contact details, phone numbers, and WhatsApp enquiries.',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-16 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Privacy Policy', url: getCanonicalUrl('/privacy-policy') },
        ]}
      />
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-forest mb-2">
          Privacy Policy
        </h1>
        <p className="editorial-label text-muted mb-8">Last Updated: October 24, 2026</p>

        <div className="text-xs sm:text-sm text-near-black/80 leading-relaxed space-y-6">
          <p>
            At <strong>Warden & Sons Kids Wear</strong>, located at Kemps Corner, South Mumbai, we
            value the trust of our customers. This privacy policy describes how we collect, use, and
            protect your personal information when you visit our store, use our website, or purchase
            items via our WhatsApp or video call channels.
          </p>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            1. Information We Collect
          </h2>
          <p>
            We collect personal details that you actively share with us to process your orders or
            book appointments, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Contact Details:</strong> Your full name, telephone/mobile number, email
              address, and physical shipping address.
            </li>
            <li>
              <strong>Order Preferences:</strong> Categories of interest, child’s age, required
              sizes, and specific garment selections.
            </li>
            <li>
              <strong>Payment Information:</strong> Transaction details, UPI payment references, and
              payment receipt screenshots shared via WhatsApp. We do not store or process credit
              card details directly.
            </li>
          </ul>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            2. How We Use Your Details
          </h2>
          <p>
            Your information is utilized solely to provide our customized neighborhood retail
            service:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>To compile and process your WhatsApp and online cart purchases.</li>
            <li>To schedule and execute live video call shopping sessions.</li>
            <li>
              To coordinate doorstep shipping and local courier dispatch (e.g. Borzo, Dunzo, Blue
              Dart).
            </li>
            <li>
              To answer customer service questions, sizing exchanges, and bulk Uniform orders.
            </li>
          </ul>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            3. Phone Callback Requests (&ldquo;Prefer a call?&rdquo;)
          </h2>
          <p>
            When you use our optional website callback request form (&ldquo;Prefer a call?&rdquo;), we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>What is collected:</strong> Your 10-digit mobile phone number, optional name, preferred callback window (Morning, Afternoon, or Evening), and a list summary of garment categories and sub-categories you selected. We never collect or store children&apos;s ages, notes, or personal identifiers in callback requests.
            </li>
            <li>
              <strong>Why it is collected:</strong> Solely to ring you back to discuss product availability, sizing, and pricing for your specific inquiry.
            </li>
            <li>
              <strong>Where it is stored:</strong> Records are transmitted securely over HTTPS to a private, access-controlled Google Sheet managed directly by the Warden &amp; Sons shop team. The sheet is not public, and numbers are never sold, rented, or shared with third-party telemarketers.
            </li>
            <li>
              <strong>Retention:</strong> TODO: owner confirms how long numbers are kept
            </li>
            <li>
              <strong>How to ask for deletion:</strong> You may request immediate erasure of your phone number and callback records at any time by messaging us on WhatsApp (+91 99207 51567) or visiting our Kemps Corner store desk.
            </li>
          </ul>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            4. Third-Party Sharing
          </h2>
          <p>
            We do not sell, trade, or distribute your personal data. We share your information only
            with trusted third-party service providers essential for logistics:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Delivery Services:</strong> Sharing address details and contact numbers with
              local couriers or shipping companies to deliver your clothes.
            </li>
            <li>
              <strong>Payment Gateways:</strong> Safe digital transaction references to verify UPI
              payments.
            </li>
          </ul>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            5. Data Security
          </h2>
          <p>
            We store customer details on secure offline files and encrypted business devices to
            prevent unauthorized access. We encourage you to only send orders and screenshots to our
            official business WhatsApp number: <strong>+91 99207 51567</strong>.
          </p>

          <h2 className="font-serif font-bold text-base text-forest uppercase mt-8 mb-2">
            6. Your Choices & Access
          </h2>
          <p>
            You have the right to request access to the information we hold about you, request
            corrections, or request complete removal of your address records from our logs. To make
            a request, contact us on WhatsApp or write to us through our contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
