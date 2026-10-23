'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageSquare,
  ClipboardList,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'motion/react';
import { useCartStore } from '@/store/cart';
import { BUSINESS_CONFIG } from '@/config/business';
import ReplyPromise from '@/components/ReplyPromise';
import { formatWhatsAppRequestMessage, buildWhatsAppRequestUrl } from '@/lib/whatsapp';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    updateItemDetails,
    clearCart,
    getTotalItems,
  } = useCartStore();

  const [customerName, setCustomerName] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [whatsappTriggered, setWhatsappTriggered] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReduced = useReducedMotion();
  const shouldReduceMotion = Boolean(prefersReduced);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!mounted) return null;

  const totalItems = getTotalItems();

  const currentMessage = formatWhatsAppRequestMessage({
    items,
    customerName,
    notes: additionalNotes,
  });

  const whatsappUrl = buildWhatsAppRequestUrl(currentMessage);

  const handleCopyMessage = async () => {
    if (items.length === 0) return;

    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = currentMessage;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Clipboard write failed
    }
  };

  const handleClearRequest = () => {
    if (
      typeof window !== 'undefined' &&
      window.confirm('Are you sure you want to clear your current request list?')
    ) {
      clearCart();
      setWhatsappTriggered(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-drawer-title"
          >
            {/* Backdrop with fade animation */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Container (slide from right on desktop, bottom sheet on mobile) */}
            <m.div
              initial={shouldReduceMotion ? false : isMobile ? { y: '100%' } : { x: '100%' }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : isMobile ? { y: '100%' } : { x: '100%' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: 'spring',
                      damping: 26,
                      stiffness: 260,
                    }
              }
              className="relative w-full max-h-[90vh] rounded-t-3xl sm:rounded-none sm:max-w-lg sm:h-full sm:max-h-screen bg-white shadow-2xl flex flex-col z-10 overflow-hidden font-sans"
            >
              {/* Mobile handle indicator */}
              <div className="w-12 h-1 bg-border-soft rounded-full mx-auto my-2 sm:hidden shrink-0" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-soft bg-bg-cream">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-forest text-white flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h2
                      id="request-drawer-title"
                      className="font-serif font-bold text-lg text-forest leading-tight"
                    >
                      Request List
                    </h2>
                    <p className="text-[11px] text-muted">
                      {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for enquiry
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {items.length > 0 && (
                    <button
                      onClick={handleClearRequest}
                      className="min-h-[44px] px-3 py-2 text-xs text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Clear all selections"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Clear</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="min-w-[44px] min-h-[44px] rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Close Request List"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-bg-cream border border-border-soft flex items-center justify-center mx-auto text-gold">
                      <ClipboardList className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-near-black">
                        Your request list is empty
                      </h3>
                      <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                        Browse our catalogue and tap &quot;Add to Request&quot; on any item. You can specify age, size, and preferences before sending to our Kemps Corner shop.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-2 min-h-[44px] text-xs font-bold text-forest bg-bg-cream border border-forest px-6 py-2.5 rounded-full hover:bg-forest hover:text-white transition-all cursor-pointer"
                    >
                      Browse Catalogue
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    <div className="bg-bg-cream p-3 rounded-xl border border-border-soft text-[11px] text-muted leading-relaxed flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>
                        <strong>Catalogue Note:</strong> Warden & Sons carries rotating physical
                        inventory. Prices, sizes, and live photos are verified directly on WhatsApp
                        before any purchase is completed.
                      </span>
                    </div>

                    {items.map(item => {
                      const isExpanded = expandedItemId === item.id;
                      const hasRealImage = Boolean(
                        item.image &&
                        item.image !== '/store_front.jpg' &&
                        item.image !== '/brand_logo.jpg' &&
                        item.image !== '/brand_logo.webp',
                      );

                      return (
                        <div
                          key={item.id}
                          className="p-3.5 bg-white rounded-2xl border border-border-soft shadow-xs space-y-3"
                        >
                          {/* Item Summary Row */}
                          <div className="flex gap-3.5 items-center">
                            <div className="relative w-16 h-18 bg-bg-cream rounded-xl overflow-hidden shrink-0 border border-border-soft flex items-center justify-center">
                              {hasRealImage ? (
                                <Image
                                  src={item.image!}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              ) : (
                                <Sparkles className="w-5 h-5 text-gold" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] text-gold font-bold uppercase tracking-wider block">
                                {item.subCategory || item.category}
                              </span>
                              <h4 className="font-serif font-bold text-sm text-near-black line-clamp-1">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-forest font-semibold mt-0.5">
                                Price confirmed on WhatsApp
                              </p>
                            </div>

                            {/* Quantity & Delete (All targets >= 44x44px) */}
                            <div className="flex flex-col items-end justify-between gap-1 shrink-0">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="flex items-center bg-bg-cream rounded-lg border border-border-soft shadow-2xs">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600 hover:text-black cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-bold px-1 min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600 hover:text-black cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Expand/Collapse Custom Preferences */}
                          <div className="pt-1 border-t border-border-soft/70">
                            <button
                              type="button"
                              onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                              className="w-full min-h-[44px] flex items-center justify-between text-[11px] font-semibold text-forest hover:text-gold transition-colors py-1 cursor-pointer"
                            >
                              <span>
                                {item.size || item.preferredColor || item.styleNotes
                                  ? 'Edit Specific Requirements (Age, Size, Colour, Notes)'
                                  : '+ Add Specific Requirements (Age, Size, Colour, Notes)'}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                                <div>
                                  <label className="text-[10px] font-bold text-gray-600 block mb-1">
                                    Age / Age Group (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. 6 Months, 4 Years"
                                    value={item.ageGroup || ''}
                                    onChange={e =>
                                      updateItemDetails(item.id, { ageGroup: e.target.value })
                                    }
                                    className="w-full px-2.5 py-2 rounded-lg border border-border-soft bg-bg-cream text-xs focus:outline-none focus:ring-1 focus:ring-forest"
                                  />
                                </div>

                                <div>
                                  <label className="text-[10px] font-bold text-gray-600 block mb-1">
                                    Size (Optional, &quot;Not sure&quot; is fine)
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Size 22, 3-6M, or Not sure"
                                    value={item.size || ''}
                                    onChange={e =>
                                      updateItemDetails(item.id, { size: e.target.value })
                                    }
                                    className="w-full px-2.5 py-2 rounded-lg border border-border-soft bg-bg-cream text-xs focus:outline-none focus:ring-1 focus:ring-forest"
                                  />
                                </div>

                                <div>
                                  <label className="text-[10px] font-bold text-gray-600 block mb-1">
                                    Preferred Colour / Style (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Light Blue, Plain White"
                                    value={item.preferredColor || ''}
                                    onChange={e =>
                                      updateItemDetails(item.id, { preferredColor: e.target.value })
                                    }
                                    className="w-full px-2.5 py-2 rounded-lg border border-border-soft bg-bg-cream text-xs focus:outline-none focus:ring-1 focus:ring-forest"
                                  />
                                </div>

                                <div>
                                  <label className="text-[10px] font-bold text-gray-600 block mb-1">
                                    Notes for Store (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Loose fit for summer"
                                    value={item.styleNotes || ''}
                                    onChange={e =>
                                      updateItemDetails(item.id, { styleNotes: e.target.value })
                                    }
                                    className="w-full px-2.5 py-2 rounded-lg border border-border-soft bg-bg-cream text-xs focus:outline-none focus:ring-1 focus:ring-forest"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Optional Customer Contact & Message */}
                    <div className="bg-bg-cream rounded-2xl border border-border-soft p-4 space-y-3">
                      <h4 className="font-serif font-bold text-xs text-forest uppercase tracking-wider">
                        Enquiry Details (Optional)
                      </h4>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700 block">
                          Your Name (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Priya Shah"
                          value={customerName}
                          onChange={e => setCustomerName(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-border-soft bg-white text-xs focus:outline-none focus:ring-1 focus:ring-forest"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-700 block">
                          Additional Instructions or Questions (Optional)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Please share photos of all available pastel shades..."
                          value={additionalNotes}
                          onChange={e => setAdditionalNotes(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-border-soft bg-white text-xs focus:outline-none focus:ring-1 focus:ring-forest resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              {items.length > 0 && (
                <div className="border-t border-border-soft p-5 sm:p-6 bg-bg-cream space-y-3">
                  {/* Primary WhatsApp Action (Regular Outbound Anchor, min 48px height) */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setWhatsappTriggered(true)}
                    data-track="whatsapp_click"
                    data-track-location="request_list"
                    data-track-category="request_list"
                    data-track-items-count={items.length}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5 fill-white text-whatsapp" />
                    <span>Send Enquiry on WhatsApp (+91 99207 51567)</span>
                  </a>
                  <ReplyPromise className="pt-1 text-center" />

                  {/* Copy Fallback & Clear Action Buttons (min 44px height) */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-border-soft bg-white text-gray-700 hover:text-black hover:bg-gray-50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-forest" />
                          <span className="text-forest">Enquiry Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-gray-500" />
                          <span>Copy Enquiry Text</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleClearRequest}
                      className="min-h-[44px] py-2.5 px-3 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Clear Request
                    </button>
                  </div>

                  {/* Post-trigger Recovery Guidance */}
                  {whatsappTriggered && (
                    <div className="p-3 bg-white rounded-xl border border-gold/40 text-[11px] text-muted leading-relaxed space-y-1">
                      <p className="font-semibold text-forest">
                        WhatsApp opened in another window?
                      </p>
                      <p>
                        Remember to click <strong>Send</strong> in WhatsApp. Your selections remain
                        saved here until you decide to clear them.
                      </p>
                      <p className="text-gray-500 text-[10px]">
                        Did not open? Click &quot;Copy Enquiry Text&quot; above and paste directly
                        to <strong>{BUSINESS_CONFIG.phone.display}</strong>.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
