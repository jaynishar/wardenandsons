'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, MessageSquare, Heart, ExternalLink } from 'lucide-react';
import ReplyPromise from '@/components/ReplyPromise';
import { BUSINESS_CONFIG } from '@/config/business';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleOpenConsent = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ws:open_consent_banner'));
    }
  };

  return (
    <footer className="bg-white border-t border-border-soft text-near-black font-sans pb-32 md:pb-0">
      {/* Top Boutique Contact Banner */}
      <div className="bg-forest text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold">
              Visit or Message Our Kemps Corner Store
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">
              Need size assistance, newborn gift wrapping, or school uniform quotes?
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="footer"
              data-track-category="footer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white text-whatsapp" />
              WhatsApp: {BUSINESS_CONFIG.phone.display}
            </a>
            <a
              href={BUSINESS_CONFIG.phone.telLink}
              data-track="call_click"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-forest hover:bg-bg-cream text-xs font-bold shadow-xs transition-all"
            >
              <Phone className="w-4 h-4" />
              Call Store Desk
            </a>
            <ReplyPromise className="text-gray-200 text-xs w-full text-center md:text-right" />
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Authentic Unclipped Logo Container */}
              <div className="relative w-14 h-10 rounded-md overflow-hidden bg-white border border-gold/40 shrink-0 p-0.5 shadow-2xs">
                <Image
                  src="/brand_logo.webp"
                  alt="Warden & Sons Official Crest"
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-forest leading-none">
                  Warden &amp; Sons
                </h4>
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest mt-0.5 block">
                  Kids Wear • Kemps Corner
                </span>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              South Mumbai’s neighborhood shop for breathable cotton children’s wear, school
              uniforms, and family comfort basics.
            </p>
            <div className="pt-1 flex items-center gap-1 text-[11px] text-forest font-semibold">
              <Heart className="w-3.5 h-3.5 text-gold fill-gold" />
              <span>{BUSINESS_CONFIG.establishment.displayText}</span>
            </div>
          </div>

          {/* Department Categories */}
          <div className="space-y-3">
            <h5 className="font-serif font-bold text-sm text-forest uppercase tracking-wider">
              Departments
            </h5>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="/shop/newborn/" className="hover:text-forest transition-colors">
                  Newborn &amp; Infants (0-24M)
                </Link>
              </li>
              <li>
                <Link href="/shop/boys/" className="hover:text-forest transition-colors">
                  Boys Playwear &amp; Sports (0-16Y)
                </Link>
              </li>
              <li>
                <Link href="/shop/girls/" className="hover:text-forest transition-colors">
                  Girls Dresses &amp; Sleepwear (0-16Y)
                </Link>
              </li>
              <li>
                <Link href="/shop/men/" className="hover:text-forest transition-colors">
                  Men’s Basics &amp; Lounge
                </Link>
              </li>
              <li>
                <Link href="/shop/women/" className="hover:text-forest transition-colors">
                  Women’s Muslin Sleepwear &amp; Basics
                </Link>
              </li>
              <li>
                <Link
                  href="/bulk-orders/"
                  className="hover:text-forest transition-colors text-gold font-bold"
                >
                  Custom School Uniforms &amp; Bulk Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Information */}
          <div className="space-y-3">
            <h5 className="font-serif font-bold text-sm text-forest uppercase tracking-wider">
              Store Information
            </h5>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link href="/how-it-works/" className="hover:text-forest transition-colors">
                  How WhatsApp Ordering Works
                </Link>
              </li>
              <li>
                <Link href="/size-guide/" className="hover:text-forest transition-colors">
                  Measuring Tape &amp; Sizing Chart
                </Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-forest transition-colors">
                  Our Kemps Corner Heritage
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns/" className="hover:text-forest transition-colors">
                  Delivery &amp; Exchange Information
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="hover:text-forest transition-colors">
                  Blog &amp; Sizing Guides
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy/" className="hover:text-forest transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-forest transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenConsent}
                  className="text-left hover:text-forest transition-colors cursor-pointer"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>

          {/* Kemps Corner Store Location & Timings */}
          <div className="space-y-3">
            <h5 className="font-serif font-bold text-sm text-forest uppercase tracking-wider">
              Kemps Corner Store
            </h5>
            <div className="space-y-2.5 text-xs text-muted">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <a
                  href={BUSINESS_CONFIG.location.googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="directions_click"
                  className="hover:underline"
                >
                  {BUSINESS_CONFIG.location.fullAddress}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-near-black">{BUSINESS_CONFIG.hours.display}</p>
                  <p className="text-gray-400">Open all 7 days of the week</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <div className="flex flex-col">
                  <a
                    href={BUSINESS_CONFIG.phone.telLink}
                    data-track="call_click"
                    className="font-semibold text-forest hover:underline"
                  >
                    {BUSINESS_CONFIG.phone.display}
                  </a>
                  {BUSINESS_CONFIG.phone.landline && (
                    <span className="text-[11px] text-gray-400">
                      Landline: {BUSINESS_CONFIG.phone.landline}
                    </span>
                  )}
                </div>
              </div>
              <div className="pt-1.5">
                <a
                  href={BUSINESS_CONFIG.location.googleBusinessShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="directions_click"
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-forest hover:text-gold transition-colors"
                >
                  <span>Google Business Profile (4.8 ★)</span>
                  <ExternalLink className="w-3 h-3 text-gold" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} Warden &amp; Sons Kids Wear. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <Link href="/privacy-policy/" className="hover:text-forest transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms/" className="hover:text-forest transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-300">•</span>
            <button
              type="button"
              onClick={handleOpenConsent}
              className="hover:text-forest transition-colors cursor-pointer"
            >
              Cookie Preferences
            </button>
            <span className="text-gray-300">•</span>
            <span>Kemps Corner, South Mumbai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
