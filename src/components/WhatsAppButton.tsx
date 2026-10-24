'use client';

import React, { useEffect, useState } from 'react';
import { IconWhatsApp } from '@/components/icons';
import { BUSINESS_CONFIG } from '@/config/business';
import { trackWhatsAppClick } from '@/lib/analytics';
import { useListStore } from '@/lib/list-store';
import { useSearchStore } from '@/lib/search-store';

export interface WhatsAppButtonProps {
  variant?: 'floating' | 'inline' | 'hero' | 'bar';
  message?: string;
  location: string;
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  variant = 'inline',
  message,
  location,
  className = '',
  children,
}: WhatsAppButtonProps) {
  const [hasOtherDialog, setHasOtherDialog] = useState(false);

  const isListOpen = useListStore((s) => s.isListOpen);
  const addSheetTarget = useListStore((s) => s.addSheetTarget);
  const isSearchOpen = useSearchStore((s) => s.isOpen);

  // Monitor DOM for open modal dialogs to prevent FAB overlap
  useEffect(() => {
    if (variant !== 'floating' || typeof window === 'undefined') return;

    const checkDialogs = () => {
      const dialogs = document.querySelectorAll('[role="dialog"]');
      const consent = document.querySelector('[aria-label="Privacy and Cookie Choices"]');
      setHasOtherDialog(dialogs.length > 0 || Boolean(consent));
    };

    const observer = new MutationObserver(checkDialogs);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state'],
    });

    checkDialogs();
    return () => observer.disconnect();
  }, [variant]);

  const shouldHideFloating =
    isListOpen || Boolean(addSheetTarget) || isSearchOpen || hasOtherDialog;

  const handleClick = () => {
    trackWhatsAppClick({ button_location: location });
  };

  const url = message
    ? BUSINESS_CONFIG.whatsappUrl(message)
    : BUSINESS_CONFIG.phone.whatsappUrl;

  // 1. FLOATING 56x56 TILE
  if (variant === 'floating') {
    if (shouldHideFloating) return null;

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        data-track="whatsapp_click"
        data-track-location={location}
        aria-label="Chat on WhatsApp"
        className={`fixed z-[var(--z-fab,40)] right-4 bottom-[calc(var(--bar-h,64px)+env(safe-area-inset-bottom)+16px)] md:right-6 md:bottom-6 w-14 h-14 min-w-[56px] min-h-[56px] bg-[var(--wa)] text-white rounded-none flex items-center justify-center hover:opacity-95 active:scale-[0.98] transition-transform duration-[140ms] cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2 ${className}`}
      >
        <IconWhatsApp size={28} />
      </a>
    );
  }

  // 2. HERO VARIANT (52px flat button, 20px glyph)
  if (variant === 'hero') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        data-track="whatsapp_click"
        data-track-location={location}
        className={`h-[52px] px-8 inline-flex items-center justify-center gap-2 font-sans font-medium text-[15px] bg-white border-2 border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--surface)] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--blue)] ${className}`}
      >
        <IconWhatsApp size={20} className="text-[var(--wa)]" />
        <span>{children || 'Chat on WhatsApp'}</span>
      </a>
    );
  }

  // 3. BAR VARIANT (Full width / wide bar)
  if (variant === 'bar') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        data-track="whatsapp_click"
        data-track-location={location}
        className={`w-full min-h-[52px] px-6 inline-flex items-center justify-center gap-2 font-sans font-medium text-sm sm:text-base bg-[var(--wa)] text-white hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-3 focus-visible:outline-[var(--wa)] ${className}`}
      >
        <IconWhatsApp size={20} />
        <span>{children || 'Message on WhatsApp'}</span>
      </a>
    );
  }

  // 4. INLINE DEFAULT
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-track="whatsapp_click"
      data-track-location={location}
      className={`inline-flex items-center gap-1.5 text-sm font-medium text-[var(--wa)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--wa)] ${className}`}
    >
      <IconWhatsApp size={18} />
      <span>{children || 'WhatsApp'}</span>
    </a>
  );
}

export default WhatsAppButton;
