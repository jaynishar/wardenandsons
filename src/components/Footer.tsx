'use client';

import React from 'react';
import Link from 'next/link';
import { IconPhone, IconWhatsApp, IconPin } from '@/components/icons';
import ReplyPromise from '@/components/ReplyPromise';
import { BUSINESS_CONFIG } from '@/config/business';
import { Logo } from '@/components/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleOpenConsent = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ws:open_consent_banner'));
    }
  };

  return (
    <footer
      aria-label="Site footer"
      className="bg-[var(--surface)] text-[var(--ink)] font-sans border-t border-[var(--line)] pb-[calc(4.5rem+var(--sab))] md:pb-12 pt-14 sm:pt-16"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8 space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Store Address (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              aria-label="Warden & Sons Kids Wear Home"
              className="inline-block focus-visible:outline-2 focus-visible:outline-[var(--blue)] py-1"
            >
              <Logo variant="full" height={48} className="w-auto h-11 sm:h-12 object-contain" />
            </Link>

            <p className="text-[13px] text-[var(--muted)] leading-relaxed max-w-sm font-normal">
              Quality children’s cotton wear, newborn essentials, and school uniforms in Kemps Corner, South Mumbai. Serving families for over 30 years.
            </p>

            <div className="pt-1 text-[13px] text-[var(--muted)] space-y-1">
              <p className="font-medium text-[var(--ink)]">
                {BUSINESS_CONFIG.location.shopNumber}, {BUSINESS_CONFIG.location.building}
              </p>
              <p>{BUSINESS_CONFIG.location.streetAddress}, Kemps Corner, Mumbai 400036</p>
              <p className="text-[12px] opacity-80">Open Daily: 9:00 AM – 9:00 PM IST</p>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_CONFIG.location.googleBusinessShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions_click"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--ink)] hover:text-[var(--terracotta)] underline underline-offset-4"
              >
                <IconPin size={15} />
                <span>Google Business Profile &amp; Directions</span>
              </a>
            </div>
          </div>

          {/* Contact & Hours (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[14px] text-[var(--ink)] font-semibold uppercase tracking-wider">
              Store Desk &amp; Inquiries
            </p>
            <div className="space-y-2.5 text-[13px]">
              <div className="flex items-center gap-2">
                <IconPhone size={15} className="text-[var(--muted)] shrink-0" />
                <a
                  href={BUSINESS_CONFIG.phone.telLink}
                  data-track="call_click"
                  className="hover:text-[var(--terracotta)] transition-colors"
                >
                  {BUSINESS_CONFIG.phone.display}
                </a>
              </div>
              {BUSINESS_CONFIG.phone.landline && (
                <p className="text-[12px] text-[var(--muted)] pl-6">
                  Landline: {BUSINESS_CONFIG.phone.landline}
                </p>
              )}
              <div className="flex items-center gap-2 pt-1">
                <IconWhatsApp size={16} className="text-[var(--wa)] shrink-0" />
                <a
                  href={BUSINESS_CONFIG.phone.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  data-track-location="footer"
                  data-track-category="footer"
                  className="text-[var(--wa)] font-medium hover:underline"
                >
                  WhatsApp Consultation Desk
                </a>
              </div>
              <ReplyPromise className="text-[12px] text-[var(--muted)] pl-6 block" />
              <div className="pt-2 pl-6">
                <a
                  href="https://www.instagram.com/wardenandsonskidswear/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[var(--muted)] hover:text-[var(--ink)] hover:underline"
                >
                  Instagram: @wardenandsonskidswear
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[14px] text-[var(--ink)] font-semibold uppercase tracking-wider">
              Explore
            </p>
            <div className="grid grid-cols-1 gap-y-2 text-[13px] text-[var(--muted)]">
              <Link href="/shop/" className="hover:text-[var(--ink)] transition-colors">
                All Collections
              </Link>
              <Link href="/shop/newborn/" className="hover:text-[var(--ink)] transition-colors">
                Newborn (0–24M)
              </Link>
              <Link href="/shop/boys/" className="hover:text-[var(--ink)] transition-colors">
                Boys (0–16Y)
              </Link>
              <Link href="/shop/girls/" className="hover:text-[var(--ink)] transition-colors">
                Girls (0–16Y)
              </Link>
              <Link href="/bulk-orders/" className="hover:text-[var(--ink)] transition-colors">
                School Uniforms &amp; Bulk
              </Link>
              <Link href="/visit-us/" className="hover:text-[var(--ink)] transition-colors">
                Store Location &amp; Hours
              </Link>
              <Link href="/how-it-works/" className="hover:text-[var(--ink)] transition-colors">
                How It Works
              </Link>
              <Link href="/about/" className="hover:text-[var(--ink)] transition-colors">
                Our Story
              </Link>
              <Link href="/contact/" className="hover:text-[var(--ink)] transition-colors">
                Contact Desk
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[var(--muted)] pt-8 border-t border-[var(--line)]">
          <p>© {currentYear} Warden &amp; Sons Kids Wear. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy-policy/" className="hover:text-[var(--ink)] transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms/" className="hover:text-[var(--ink)] transition-colors">
              Terms of Service
            </Link>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={handleOpenConsent}
              className="hover:text-[var(--ink)] transition-colors cursor-pointer"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
