'use client';

import React, { useState, useEffect, useId } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import {
  getCategory,
  subsOf,
  ageOptionsFor,
  type Category,
  type Subcategory,
} from '@/data/catalogue';
import { COPY_DECK } from '@/content/copy';
import { BUSINESS_CONFIG } from '@/config/business';
import { buildWhatsAppRequestUrl } from '@/lib/whatsapp';
import {
  trackWhatsAppClick,
  trackDirectionsClick,
  trackPhoneClick,
} from '@/lib/analytics';
import { useAgeStore, type AgeBand } from '@/lib/age-store';
import { useListStore } from '@/lib/list-store';
import { useSearchStore } from '@/lib/search-store';
import {
  IconWhatsApp,
  IconClose,
  IconChevron,
  IconPin,
  IconPhone,
} from '@/components/icons';

type Step = 'greeting' | 'category' | 'adult' | 'uniforms' | 'visit';

export default function ChatHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('greeting');
  const [selectedCatSlug, setSelectedCatSlug] = useState<string>('boys');
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [adultTab, setAdultTab] = useState<'men' | 'women'>('men');
  const [hasOtherDialog, setHasOtherDialog] = useState(false);

  const titleId = useId();
  const descId = useId();

  // Listen to external store dialog states
  const isListOpen = useListStore((s) => s.isListOpen);
  const addSheetTarget = useListStore((s) => s.addSheetTarget);
  const isSearchOpen = useSearchStore((s) => s.isOpen);

  // Detect other open modal dialogs in the document to prevent overlapping
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkOtherDialogs = () => {
      const dialogs = document.querySelectorAll('[role="dialog"]');
      let foundOther = false;
      dialogs.forEach((d) => {
        if (!d.closest('#chat-helper-dialog')) {
          foundOther = true;
        }
      });
      // Also suppress trigger while cookie choices banner is displayed
      const consentBanner = document.querySelector('[aria-label="Privacy and Cookie Choices"]');
      if (consentBanner) {
        foundOther = true;
      }
      setHasOtherDialog(foundOther);
    };

    const observer = new MutationObserver(checkOtherDialogs);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state'],
    });

    checkOtherDialogs();
    return () => observer.disconnect();
  }, []);

  const shouldHideTrigger =
    isOpen ||
    isListOpen ||
    Boolean(addSheetTarget) ||
    isSearchOpen ||
    hasOtherDialog;

  const currentCategory: Category | undefined = getCategory(selectedCatSlug);

  // Filter matching subcategories for the selected category + age
  const matchingSubs: Subcategory[] = React.useMemo(() => {
    if (!currentCategory) return [];
    const allSubs = subsOf(currentCategory.slug);
    if (!selectedAge) return allSubs.slice(0, 4);

    const filtered = allSubs.filter((s) => {
      const opts = ageOptionsFor(currentCategory.slug, s.slug);
      return opts.includes(selectedAge);
    });

    // Fallback to first 4 if filter is empty (e.g., newborn all cover)
    return (filtered.length > 0 ? filtered : allSubs).slice(0, 4);
  }, [currentCategory, selectedAge]);

  const handleOpenCategory = (slug: string) => {
    setSelectedCatSlug(slug);
    setSelectedAge(null);
    setStep('category');
  };

  const handleSelectAge = (age: string) => {
    setSelectedAge(age);
    // Preselect in local device age store if valid band
    if (selectedCatSlug === 'newborn') {
      useAgeStore.getState().setAgeBand('newborn');
    } else {
      useAgeStore.getState().setAgeBand(age as AgeBand);
    }
  };

  const handleSubLinkClick = (ageToPreselect?: string | null) => {
    if (ageToPreselect) {
      if (selectedCatSlug === 'newborn') {
        useAgeStore.getState().setAgeBand('newborn');
      } else {
        useAgeStore.getState().setAgeBand(ageToPreselect as AgeBand);
      }
    }
    setIsOpen(false);
  };

  const handleWhatsAppSend = (message: string) => {
    trackWhatsAppClick({ button_location: 'chat_helper' });
    const url = buildWhatsAppRequestUrl(message, BUSINESS_CONFIG.phone.raw);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const resetToGreeting = () => {
    setStep('greeting');
    setSelectedAge(null);
  };

  return (
    <>
      {/* =========================================================================
          FLOATING TRIGGER BUTTON
          48px round button with WhatsApp green icon, bottom-right above mobile bottom bar.
          Strictly hidden while any dialog or sheet is open.
         ========================================================================= */}
      {false && !shouldHideTrigger && (
        <button
          type="button"
          onClick={() => {
            setStep('greeting');
            setIsOpen(true);
          }}
          aria-label="Open guided shopping helper"
          className="fixed bottom-[calc(var(--bar-h,64px)+env(safe-area-inset-bottom)+16px)] right-4 md:bottom-6 md:right-6 z-[var(--z-fab,40)] w-14 h-14 min-w-[56px] min-h-[56px] rounded-none bg-[#0F7B4F] text-white flex items-center justify-center shadow-none hover:bg-[#0c6340] active:scale-[0.98] transition-transform duration-[140ms] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)] focus-visible:outline-offset-2"
        >
          <IconWhatsApp size={28} />
        </button>
      )}

      {/* =========================================================================
          RADIX DIALOG PANEL
          Labelled, focus trapped, Esc closes, pure client-side logic.
         ========================================================================= */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 dialog-overlay backdrop-blur-none" />

          <Dialog.Content
            id="chat-helper-dialog"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="fixed bottom-[calc(4.5rem+var(--sab,0px)+8px)] right-4 left-4 sm:left-auto sm:w-[380px] max-h-[82vh] overflow-y-auto bg-[var(--ivory)] border border-[var(--line)] rounded-[8px] p-5 shadow-2xl z-50 focus:outline-none dialog-scale flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#0F7B4F] text-white flex items-center justify-center shrink-0">
                    <IconWhatsApp size={14} />
                  </div>
                  <div>
                    <Dialog.Title
                      id={titleId}
                      className="font-display font-medium text-base text-[var(--ink)] leading-tight"
                    >
                      Warden &amp; Sons Helper
                    </Dialog.Title>
                    <p id={descId} className="text-[11px] text-[var(--ink-soft)]">
                      Kemps Corner · Mumbai
                    </p>
                  </div>
                </div>

                <Dialog.Close
                  aria-label="Close guided helper"
                  className="p-1.5 -mr-1.5 text-[var(--ink-soft)] hover:text-[var(--ink)] rounded-[4px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--blue)]"
                >
                  <IconClose size={18} />
                </Dialog.Close>
              </div>

              {/* Step Content */}
              <div className="mt-4">
                {/* 1. GREETING STEP */}
                {step === 'greeting' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-[var(--paper)] border border-[var(--line)] rounded-[6px]">
                      <p className="text-sm text-[var(--ink)] font-medium">
                        {COPY_DECK.chat.greeting}
                      </p>
                      <p className="text-xs text-[var(--ink-soft)] mt-1">
                        Select a category below for instant suggestions or direct WhatsApp help:
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenCategory('newborn')}
                        className="p-2.5 rounded-[6px] bg-white border border-[var(--line)] text-sm font-medium text-[var(--ink)] hover:border-[var(--ink)] active:scale-[0.98] transition-all duration-[80ms] text-left cursor-pointer"
                      >
                        Newborn
                        <span className="block text-[11px] text-[var(--ink-soft)] font-normal">
                          0–24 months
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenCategory('boys')}
                        className="p-2.5 rounded-[6px] bg-white border border-[var(--line)] text-sm font-medium text-[var(--ink)] hover:border-[var(--ink)] active:scale-[0.98] transition-all duration-[80ms] text-left cursor-pointer"
                      >
                        Boys
                        <span className="block text-[11px] text-[var(--ink-soft)] font-normal">
                          2–16 years
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenCategory('girls')}
                        className="p-2.5 rounded-[6px] bg-white border border-[var(--line)] text-sm font-medium text-[var(--ink)] hover:border-[var(--ink)] active:scale-[0.98] transition-all duration-[80ms] text-left cursor-pointer"
                      >
                        Girls
                        <span className="block text-[11px] text-[var(--ink-soft)] font-normal">
                          2–16 years
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep('adult')}
                        className="p-2.5 rounded-[6px] bg-white border border-[var(--line)] text-sm font-medium text-[var(--ink)] hover:border-[var(--ink)] active:scale-[0.98] transition-all duration-[80ms] text-left cursor-pointer"
                      >
                        Men or Women
                        <span className="block text-[11px] text-[var(--ink-soft)] font-normal">
                          Sizes S–XXL
                        </span>
                      </button>
                    </div>

                    <div className="space-y-2 pt-1 border-t border-[var(--line)]">
                      <button
                        type="button"
                        onClick={() => setStep('uniforms')}
                        className="w-full p-2.5 rounded-[6px] bg-white border border-[var(--line)] text-sm font-medium text-[var(--ink)] hover:border-[var(--ink)] active:scale-[0.98] transition-all duration-[80ms] flex items-center justify-between cursor-pointer"
                      >
                        <span>School uniforms &amp; Bulk</span>
                        <IconChevron direction="right" size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep('visit')}
                        className="w-full p-2.5 rounded-[6px] bg-white border border-[var(--line)] text-sm font-medium text-[var(--ink)] hover:border-[var(--ink)] active:scale-[0.98] transition-all duration-[80ms] flex items-center justify-between cursor-pointer"
                      >
                        <span>Visit the store</span>
                        <IconChevron direction="right" size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. KIDS CATEGORY STEP (Newborn, Boys, Girls) */}
                {step === 'category' && currentCategory && (
                  <div className="space-y-4">
                    {/* Age prompt */}
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium">
                        {currentCategory.label} · Pick age:
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {currentCategory.ageOptions.map((age) => (
                          <button
                            key={age}
                            type="button"
                            onClick={() => handleSelectAge(age)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors duration-[80ms] active:scale-[0.98] ${
                              selectedAge === age
                                ? 'bg-[var(--ink)] text-[var(--ivory)]'
                                : 'bg-white border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)]'
                            }`}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Results after age selection */}
                    {selectedAge ? (
                      <div className="space-y-3 pt-2 border-t border-[var(--line)]">
                        <div className="flex items-center justify-between text-xs text-[var(--ink-soft)]">
                          <span>
                            Showing {currentCategory.label} for <strong className="text-[var(--ink)]">{selectedAge}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedAge(null)}
                            className="underline underline-offset-2 hover:text-[var(--ink)] cursor-pointer"
                          >
                            Change age
                          </button>
                        </div>

                        {/* Up to 4 matching sub-category links */}
                        <div className="space-y-1.5">
                          {matchingSubs.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/shop/${currentCategory.slug}/${sub.slug}/`}
                              onClick={() => handleSubLinkClick(selectedAge)}
                              className="p-2.5 rounded-[6px] bg-white border border-[var(--line)] text-sm text-[var(--ink)] font-medium hover:border-[var(--ink)] flex items-center justify-between transition-colors duration-[80ms]"
                            >
                              <span>{sub.label}</span>
                              <IconChevron direction="right" size={14} />
                            </Link>
                          ))}
                        </div>

                        {/* WhatsApp Send Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const msg = `Hi Warden & Sons! I am looking for ${currentCategory.label} clothes, age ${selectedAge}. (Sent from the website, chat helper)`;
                            handleWhatsAppSend(msg);
                          }}
                          className="w-full min-h-[48px] px-4 rounded-[4px] bg-[#0F7B4F] text-white hover:bg-[#0c6340] active:scale-[0.98] font-medium text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-[80ms]"
                        >
                          <IconWhatsApp size={18} />
                          <span>Send on WhatsApp</span>
                        </button>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-[var(--line)] text-xs text-[var(--ink-soft)]">
                        Choose an age above to see styles with sizes preselected or message our store.
                      </div>
                    )}
                  </div>
                )}

                {/* 3. ADULT STEP (Men or Women) */}
                {step === 'adult' && (
                  <div className="space-y-4">
                    {/* Tabs for Men / Women */}
                    <div className="flex rounded-[4px] border border-[var(--line)] overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => setAdultTab('men')}
                        className={`flex-1 py-2 text-xs font-medium cursor-pointer transition-colors ${
                          adultTab === 'men'
                            ? 'bg-[var(--ink)] text-[var(--ivory)]'
                            : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                        }`}
                      >
                        Men
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdultTab('women')}
                        className={`flex-1 py-2 text-xs font-medium cursor-pointer transition-colors ${
                          adultTab === 'women'
                            ? 'bg-[var(--ink)] text-[var(--ivory)]'
                            : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                        }`}
                      >
                        Women
                      </button>
                    </div>

                    {/* Subcategories list */}
                    <div className="space-y-1.5">
                      {subsOf(adultTab).slice(0, 5).map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/shop/${adultTab}/${sub.slug}/`}
                          onClick={() => handleSubLinkClick()}
                          className="p-2.5 rounded-[6px] bg-white border border-[var(--line)] text-sm text-[var(--ink)] font-medium hover:border-[var(--ink)] flex items-center justify-between transition-colors duration-[80ms]"
                        >
                          <span>{sub.label}</span>
                          <IconChevron direction="right" size={14} />
                        </Link>
                      ))}
                    </div>

                    {/* WhatsApp Action */}
                    <button
                      type="button"
                      onClick={() => {
                        const label = adultTab === 'men' ? 'Men' : 'Women';
                        const msg = `Hi Warden & Sons! I am looking for ${label} essentials. (Sent from the website, chat helper)`;
                        handleWhatsAppSend(msg);
                      }}
                      className="w-full min-h-[48px] px-4 rounded-[4px] bg-[#0F7B4F] text-white hover:bg-[#0c6340] active:scale-[0.98] font-medium text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-[80ms]"
                    >
                      <IconWhatsApp size={18} />
                      <span>Chat about {adultTab === 'men' ? 'Men' : 'Women'} on WhatsApp</span>
                    </button>
                  </div>
                )}

                {/* 4. SCHOOL UNIFORMS & BULK STEP */}
                {step === 'uniforms' && (
                  <div className="space-y-4">
                    <p className="text-sm text-[var(--ink)] leading-relaxed">
                      We supply school uniforms, sports kits, and institutional orders for schools and academies across South Mumbai.
                    </p>

                    <Link
                      href="/bulk-orders/"
                      onClick={() => setIsOpen(false)}
                      className="w-full min-h-[44px] px-4 rounded-[4px] bg-[var(--paper)] border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--line)] font-medium text-sm flex items-center justify-center text-center transition-colors"
                    >
                      View Uniforms &amp; Bulk Orders
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        const msg =
                          'Hi Warden & Sons! I am looking for school uniforms and bulk orders. (Sent from the website, chat helper)';
                        handleWhatsAppSend(msg);
                      }}
                      className="w-full min-h-[48px] px-4 rounded-[4px] bg-[#0F7B4F] text-white hover:bg-[#0c6340] active:scale-[0.98] font-medium text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-[80ms]"
                    >
                      <IconWhatsApp size={18} />
                      <span>Enquire on WhatsApp</span>
                    </button>
                  </div>
                )}

                {/* 5. VISIT THE STORE STEP */}
                {step === 'visit' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-[var(--paper)] border border-[var(--line)] rounded-[6px] space-y-1">
                      <p className="text-xs uppercase tracking-wider text-[var(--ink-soft)] font-medium">
                        Store Address
                      </p>
                      <p className="text-sm text-[var(--ink)] font-medium">
                        {COPY_DECK.store.line}
                      </p>
                    </div>

                    <a
                      href={BUSINESS_CONFIG.location.googleMapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackDirectionsClick({ location: 'chat_helper' })}
                      className="w-full min-h-[44px] px-4 rounded-[4px] bg-white border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)] font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <IconPin size={16} />
                      <span>Directions on Google Maps</span>
                    </a>

                    <a
                      href={BUSINESS_CONFIG.phone.telLink}
                      onClick={() => trackPhoneClick({ location: 'chat_helper' })}
                      className="w-full min-h-[44px] px-4 rounded-[4px] bg-white border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)] font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <IconPhone size={16} />
                      <span>Call Store ({BUSINESS_CONFIG.phone.display})</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Back to Options footer button when in sub-steps */}
            {step !== 'greeting' && (
              <div className="pt-3 mt-4 border-t border-[var(--line)]">
                <button
                  type="button"
                  onClick={resetToGreeting}
                  className="text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] font-medium flex items-center gap-1 cursor-pointer"
                >
                  <IconChevron direction="left" size={12} />
                  <span>Back to all options</span>
                </button>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
