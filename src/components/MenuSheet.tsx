/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { IconClose, IconWhatsApp } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Marker } from '@/components/ui/Marker';
import ReplyPromise from '@/components/ReplyPromise';
import { BUSINESS_CONFIG } from '@/config/business';

export interface MenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MenuSheet({ open, onOpenChange }: MenuSheetProps) {
  const close = () => onOpenChange(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-none transition-opacity" />

        {/* Content sliding from left */}
        <Dialog.Content
          aria-describedby="menu-sheet-description"
          className="fixed inset-y-0 left-0 z-50 w-full max-w-[320px] bg-[var(--ivory)] border-r border-[var(--line)] p-6 shadow-xl flex flex-col justify-between overflow-y-auto focus:outline-none"
        >
          <div className="space-y-6">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
              <Dialog.Title className="flex items-center gap-2">
                <div className="w-8 h-6 rounded-[3px] bg-white border border-[var(--line)] shrink-0 p-0.5 overflow-hidden">
                  <img
                    src="/brand_logo.webp"
                    alt="Warden & Sons"
                    width={32}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-display font-semibold text-base text-[var(--ink)]">
                  Warden &amp; Sons
                </span>
              </Dialog.Title>

              <Dialog.Close
                aria-label="Close menu"
                className="p-2 text-[var(--ink)] hover:text-[var(--ink-soft)] rounded-[4px] focus-visible:outline-2 focus-visible:outline-[var(--blue)] cursor-pointer"
              >
                <IconClose size={20} />
              </Dialog.Close>
            </div>

            <p id="menu-sheet-description" className="sr-only">
              Navigation menu for Warden &amp; Sons kids wear departments and boutique services.
            </p>

            {/* Nav Groups */}
            <nav aria-label="Mobile side navigation" className="space-y-6">
              {/* Group: Kids */}
              <div>
                <p className="label-upper text-[var(--ink-soft)] mb-2 flex items-center gap-1.5">
                  <Marker color="blue" />
                  <span>Kids</span>
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/shop/newborn/"
                      onClick={close}
                      className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Newborn (0-24M)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/boys/"
                      onClick={close}
                      className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Boys (2-16Y)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/girls/"
                      onClick={close}
                      className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Girls (2-16Y)
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Group: Family */}
              <div>
                <p className="label-upper text-[var(--ink-soft)] mb-2 flex items-center gap-1.5">
                  <Marker color="yellow" />
                  <span>Family</span>
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/shop/men/"
                      onClick={close}
                      className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Men Basics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/women/"
                      onClick={close}
                      className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Women Basics
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Group: Bulk Orders */}
              <div>
                <p className="label-upper text-[var(--ink-soft)] mb-2 flex items-center gap-1.5">
                  <Marker color="red" />
                  <span>Uniforms &amp; Institutions</span>
                </p>
                <Link
                  href="/bulk-orders/"
                  onClick={close}
                  className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                >
                  Uniforms &amp; Bulk Orders
                </Link>
              </div>

              {/* Group: Boutique Information */}
              <div className="pt-2 border-t border-[var(--line)]">
                <p className="label-upper text-[var(--ink-soft)] mb-2">Boutique</p>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="/how-it-works/"
                      onClick={close}
                      className="block py-1.5 text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/"
                      onClick={close}
                      className="block py-1.5 text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      About Our Heritage
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/visit-us/"
                      onClick={close}
                      className="block py-1.5 text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Visit Kemps Corner Store
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/"
                      onClick={close}
                      className="block py-1.5 text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Blog &amp; Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shipping-returns/"
                      onClick={close}
                      className="block py-1.5 text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Delivery &amp; Exchanges
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact/"
                      onClick={close}
                      className="block py-1.5 text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Contact Store
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Bottom WhatsApp CTA */}
          <div className="pt-6 border-t border-[var(--line)] mt-6">
            <Button
              variant="whatsapp"
              fullWidth
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              data-track="whatsapp_click"
              data-track-location="header"
              data-track-category="header"
              onClick={close}
            >
              <span className="flex items-center gap-2">
                <IconWhatsApp size={18} />
                <span>Chat on WhatsApp</span>
              </span>
            </Button>
            <ReplyPromise className="text-xs text-[var(--ink-soft)] text-center mt-2.5 block" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MenuSheet;
