/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import { IconPhone, IconWhatsApp, IconPin } from '@/components/icons';
import ReplyPromise from '@/components/ReplyPromise';
import { BUSINESS_CONFIG } from '@/config/business';
import { COPY_DECK } from '@/content/copy';

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
      className="bg-[var(--paper)] border-t border-[var(--line)] text-[var(--ink)] font-body pb-[calc(4.5rem+var(--sab))] md:pb-12 pt-12"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-[var(--line)]">
          {/* Brand & Store Address */}
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded-[3px] bg-white border border-[var(--line)] shrink-0 p-0.5 overflow-hidden">
                <img
                  src="/brand_logo.webp"
                  alt="Warden & Sons Official Crest"
                  width={40}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display font-semibold text-lg text-[var(--ink)] block leading-none">
                  Warden &amp; Sons
                </span>
                <span className="label-upper text-[10px] text-[var(--ink-soft)] mt-0.5 block">
                  Kids Wear · Kemps Corner, Mumbai
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
              {COPY_DECK.store.line}
            </p>

            <div className="pt-1">
              <a
                href={BUSINESS_CONFIG.location.googleBusinessShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="directions_click"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--blue)] hover:underline"
              >
                <IconPin size={14} />
                <span>Google Business Profile (4.8 ★)</span>
              </a>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3 max-w-xs">
            <p className="label-upper text-[var(--ink)] font-semibold">Store Desk</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <IconPhone size={16} className="text-[var(--ink-soft)] shrink-0" />
                <a
                  href={BUSINESS_CONFIG.phone.telLink}
                  data-track="call_click"
                  className="hover:text-[var(--blue)] hover:underline"
                >
                  {BUSINESS_CONFIG.phone.display}
                </a>
              </div>
              {BUSINESS_CONFIG.phone.landline && (
                <p className="text-xs text-[var(--ink-soft)] pl-6">
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
                  WhatsApp Store Desk
                </a>
              </div>
              <ReplyPromise className="text-xs text-[var(--ink-soft)] pl-6 block" />
              <div className="pt-1 pl-6">
                <a
                  href="https://www.instagram.com/wardenandsonskidswear/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] hover:underline"
                >
                  Instagram: @wardenandsonskidswear
                </a>
              </div>
            </div>
          </div>

          {/* Non-orphan Navigation Links */}
          <div className="space-y-3">
            <p className="label-upper text-[var(--ink)] font-semibold">Explore</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-[var(--ink-soft)]">
              <Link href="/shop/newborn/" className="hover:text-[var(--ink)] hover:underline">
                Newborn
              </Link>
              <Link href="/how-it-works/" className="hover:text-[var(--ink)] hover:underline">
                How It Works
              </Link>
              <Link href="/shop/boys/" className="hover:text-[var(--ink)] hover:underline">
                Boys
              </Link>
              <Link href="/about/" className="hover:text-[var(--ink)] hover:underline">
                About Heritage
              </Link>
              <Link href="/shop/girls/" className="hover:text-[var(--ink)] hover:underline">
                Girls
              </Link>
              <Link href="/visit-us/" className="hover:text-[var(--ink)] hover:underline">
                Visit Kemps Corner
              </Link>
              <Link href="/bulk-orders/" className="hover:text-[var(--ink)] hover:underline">
                Uniforms &amp; Bulk
              </Link>
              <Link href="/size-guide/" className="hover:text-[var(--ink)] hover:underline">
                Size Guide
              </Link>
              <Link href="/blog/" className="hover:text-[var(--ink)] hover:underline">
                Blog
              </Link>
              <Link href="/contact/" className="hover:text-[var(--ink)] hover:underline">
                Contact
              </Link>
              <Link href="/shipping-returns/" className="hover:text-[var(--ink)] hover:underline">
                Delivery &amp; Exchanges
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--ink-soft)] pt-2">
          <p>© {currentYear} Warden &amp; Sons Kids Wear. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
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
