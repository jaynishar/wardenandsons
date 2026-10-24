'use client';

import React from 'react';
import Link from 'next/link';
import { IconPhone, IconWhatsApp, IconPin } from '@/components/icons';
import ReplyPromise from '@/components/ReplyPromise';
import { BUSINESS_CONFIG } from '@/config/business';
import { COPY_DECK } from '@/content/copy';
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
      className="bg-[var(--surface)] text-[var(--ink)] font-sans border-t-2 border-[var(--ink)] pb-[calc(4.5rem+var(--sab))] md:pb-12 pt-14"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand & Store Address */}
          <div className="space-y-4 max-w-sm">
            <Link
              href="/"
              aria-label="Warden & Sons Kids Wear Home"
              className="inline-block focus-visible:outline-3 focus-visible:outline-[var(--blue)]"
            >
              <Logo variant="full" height={56} className="w-auto h-12 sm:h-14 object-contain" />
            </Link>

            <p className="text-[14px] text-[var(--muted)] leading-relaxed">
              {COPY_DECK.visit.addressLine1}, {COPY_DECK.visit.addressLine2}. {COPY_DECK.visit.hoursDefault}.
            </p>

            <div>
              <a
                href={BUSINESS_CONFIG.location.googleBusinessShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions_click"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--blue)] hover:underline"
              >
                <IconPin size={16} />
                <span>Google Business Profile</span>
              </a>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3 max-w-xs">
            <p className="text-[15px] text-[var(--ink)] font-semibold">Store desk</p>
            <div className="space-y-2 text-[14px]">
              <div className="flex items-center gap-2">
                <IconPhone size={16} className="text-[var(--muted)] shrink-0" />
                <a
                  href={BUSINESS_CONFIG.phone.telLink}
                  data-track="call_click"
                  className="hover:text-[var(--blue)] hover:underline"
                >
                  {BUSINESS_CONFIG.phone.display}
                </a>
              </div>
              {BUSINESS_CONFIG.phone.landline && (
                <p className="text-[13px] text-[var(--muted)] pl-6">
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
                  WhatsApp store desk
                </a>
              </div>
              <ReplyPromise className="text-[13px] text-[var(--muted)] pl-6 block" />
              <div className="pt-1 pl-6">
                <a
                  href="https://www.instagram.com/wardenandsonskidswear/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[var(--muted)] hover:text-[var(--ink)] hover:underline"
                >
                  Instagram: @wardenandsonskidswear
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <p className="text-[15px] text-[var(--ink)] font-semibold">Categories and guide</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[14px] text-[var(--muted)]">
              <Link href="/shop/newborn/" className="hover:text-[var(--ink)] hover:underline">
                Newborn
              </Link>
              <Link href="/how-it-works/" className="hover:text-[var(--ink)] hover:underline">
                How it works
              </Link>
              <Link href="/shop/boys/" className="hover:text-[var(--ink)] hover:underline">
                Boys
              </Link>
              <Link href="/about/" className="hover:text-[var(--ink)] hover:underline">
                About us
              </Link>
              <Link href="/shop/girls/" className="hover:text-[var(--ink)] hover:underline">
                Girls
              </Link>
              <Link href="/visit-us/" className="hover:text-[var(--ink)] hover:underline">
                Visit store
              </Link>
              <Link href="/bulk-orders/" className="hover:text-[var(--ink)] hover:underline">
                Uniforms &amp; bulk
              </Link>
              <Link href="/size-guide/" className="hover:text-[var(--ink)] hover:underline">
                Size guide
              </Link>
              <Link href="/blog/" className="hover:text-[var(--ink)] hover:underline">
                Blog
              </Link>
              <Link href="/contact/" className="hover:text-[var(--ink)] hover:underline">
                Contact
              </Link>
              <Link href="/shipping-returns/" className="hover:text-[var(--ink)] hover:underline">
                Delivery &amp; returns
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[var(--muted)] pt-8 border-t border-[var(--ink)]/10">
          <p>© {currentYear} Warden &amp; Sons Kids Wear. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy-policy/" className="hover:text-[var(--ink)] hover:underline">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms/" className="hover:text-[var(--ink)] hover:underline">
              Terms of Service
            </Link>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={handleOpenConsent}
              className="hover:text-[var(--ink)] hover:underline cursor-pointer"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
