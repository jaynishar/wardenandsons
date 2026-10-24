'use client';

import React from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { IconClose } from '@/components/icons';
import { Logo } from '@/components/Logo';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import ReplyPromise from '@/components/ReplyPromise';

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
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-none dialog-overlay" />

        {/* Content sliding from left */}
        <Dialog.Content
          aria-describedby="menu-sheet-description"
          className="fixed inset-y-0 left-0 z-50 w-full max-w-[320px] bg-white border-r border-[var(--ink)] p-6 shadow-xl flex flex-col justify-between overflow-y-auto focus:outline-none sheet-left font-sans"
        >
          <div className="space-y-6">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--surface)]">
              <Dialog.Title className="flex items-center gap-2">
                <Logo height={32} />
              </Dialog.Title>

              <Dialog.Close
                aria-label="Close menu"
                className="p-2 text-[var(--ink)] hover:text-[var(--muted)] rounded-none focus-visible:outline-2 focus-visible:outline-[var(--blue)] cursor-pointer"
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
                <p className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold mb-2">
                  Kids
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/shop/newborn/"
                      onClick={close}
                      className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Newborn (0–24M)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/boys/"
                      onClick={close}
                      className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Boys (0–16Y)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/girls/"
                      onClick={close}
                      className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Girls (0–16Y)
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Group: Family */}
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold mb-2">
                  Family
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/shop/men/"
                      onClick={close}
                      className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Men (S–XXL)
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop/women/"
                      onClick={close}
                      className="block py-2 text-base font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Women (S–XXL)
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Group: Services & Information */}
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold mb-2">
                  Services
                </p>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="/bulk-orders/"
                      onClick={close}
                      className="block py-1.5 font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Uniforms &amp; Bulk Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/how-it-works/"
                      onClick={close}
                      className="block py-1.5 font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      How WhatsApp Ordering Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/size-guide/"
                      onClick={close}
                      className="block py-1.5 font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Size &amp; Measurement Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/visit-us/"
                      onClick={close}
                      className="block py-1.5 font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      Visit Kemps Corner Store
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/"
                      onClick={close}
                      className="block py-1.5 font-medium text-[var(--ink)] hover:text-[var(--blue)] transition-colors"
                    >
                      About Warden &amp; Sons
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Sheet Footer Action */}
          <div className="pt-6 border-t border-[var(--surface)] space-y-3">
            <WhatsAppButton variant="bar" location="menu_sheet">
              Chat on WhatsApp
            </WhatsAppButton>
            <ReplyPromise className="justify-center" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MenuSheet;
