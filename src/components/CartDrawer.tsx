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
  Sparkles,
} from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence, useReducedMotion } from 'motion/react';
import { useCartStore, RequestItem } from '@/store/cart';
import { BUSINESS_CONFIG } from '@/config/business';
import ReplyPromise from '@/components/ReplyPromise';
import { formatWhatsAppRequestMessage, buildWhatsAppRequestUrl } from '@/lib/whatsapp';
import { trackViewCart, trackRemoveFromCart, trackWhatsAppClick } from '@/lib/analytics';

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

  // Track viewing the cart drawer
  useEffect(() => {
    if (isOpen) {
      trackViewCart(items.length);
    }
  }, [isOpen, items.length]);

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
  const rawMessage = formatWhatsAppRequestMessage({
    items,
    customerName,
    notes: additionalNotes,
  });
  const whatsappUrl = buildWhatsAppRequestUrl(rawMessage);

  const handleCopyMessage = async () => {
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(rawMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = rawMessage;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handleClearRequest = () => {
    if (window.confirm('Are you sure you want to clear all items from your request list?')) {
      clearCart();
      setCustomerName('');
      setAdditionalNotes('');
      setWhatsappTriggered(false);
    }
  };

  const handleRemoveItem = (item: RequestItem) => {
    trackRemoveFromCart({
      id: item.productId || item.id,
      name: item.name,
      category: item.category,
    });
    removeItem(item.id);
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Backdrop */}
            <m.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              aria-hidden="true"
            />

            {/* Slide-over Drawer Panel */}
            <m.div
              initial={shouldReduceMotion ? false : isMobile ? { y: '100%' } : { x: '100%' }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: '100%' } : { x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`absolute bg-white shadow-2xl flex flex-col ${
                isMobile
                  ? 'inset-x-0 bottom-0 max-h-[90vh] rounded-t-3xl border-t border-border-soft'
                  : 'inset-y-0 right-0 max-w-md w-full border-l border-border-soft'
              }`}
              role="dialog"
              aria-modal="true"
              aria-label="Your Request List"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-border-soft flex items-center justify-between bg-bg-cream/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-forest text-white flex items-center justify-center">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-near-black">
                      Your Request List
                    </h2>
                    <p className="text-[11px] text-muted font-medium">
                      {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-white transition-colors cursor-pointer"
                  aria-label="Close request list"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                {/* How it Works Micro-banner */}
                <div className="bg-bg-cream rounded-2xl p-4 border border-border-soft text-xs text-muted leading-relaxed space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-forest font-bold">
                    <span className="w-2 h-2 rounded-full bg-whatsapp" />
                    <span>How WhatsApp Ordering Works</span>
                  </div>
                  <p>
                    Review your items below and tap &quot;Send Enquiry on WhatsApp&quot;. Our Kemps
                    Corner team will confirm sizes with a measuring tape, share real garment photos,
                    and verify availability.
                  </p>
                </div>

                {/* Empty State */}
                {items.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-bg-cream border border-border-soft flex items-center justify-center mx-auto text-muted">
                      <ClipboardList className="w-8 h-8 opacity-40" />
                    </div>
                    <p className="font-serif font-bold text-base text-near-black">
                      Your request list is empty
                    </p>
                    <p className="text-xs text-muted max-w-xs mx-auto">
                      Explore our newborn layette, playwear, and cotton basics, and tap &quot;Add to
                      Request&quot; to build an enquiry.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="min-h-[44px] px-5 py-2.5 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-dark transition-colors cursor-pointer"
                      >
                        Explore Catalogue
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Items List */}
                    <div className="space-y-3">
                      {items.map(item => {
                        const isExpanded = expandedItemId === item.id;
                        return (
                          <div
                            key={item.id}
                            className="p-4 rounded-2xl border border-border-soft bg-white shadow-xs space-y-3"
                          >
                            <div className="flex gap-3">
                              {/* Product Thumbnail */}
                              <div className="relative w-16 h-20 rounded-xl bg-bg-cream overflow-hidden shrink-0 border border-border-soft flex items-center justify-center">
                                {item.image ? (
                                  <Image
                                    src={item.image}
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
                                  onClick={() => handleRemoveItem(item)}
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
                            <div className="pt-2 border-t border-border-soft/60">
                              <button
                                type="button"
                                onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                                className="w-full flex items-center justify-between text-[11px] font-semibold text-muted hover:text-forest transition-colors py-1 cursor-pointer"
                              >
                                <span>
                                  {item.size || item.preferredColor || item.styleNotes
                                    ? 'Preferences Added ✓'
                                    : '+ Add size, color, or notes'}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                )}
                              </button>

                              {isExpanded && (
                                <div className="pt-3 space-y-2.5 animate-in fade-in duration-200">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="text-[10px] font-semibold text-gray-600 block mb-1">
                                        Child Age / Size
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="e.g. 4-5 Years"
                                        value={item.size || ''}
                                        onChange={e =>
                                          updateItemDetails(item.id, { size: e.target.value })
                                        }
                                        className="w-full px-2.5 py-1.5 rounded-lg border border-border-soft bg-bg-cream text-xs focus:outline-none focus:ring-1 focus:ring-forest"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[10px] font-semibold text-gray-600 block mb-1">
                                        Color / Print
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="e.g. Pastel Yellow / Stripes"
                                        value={item.preferredColor || ''}
                                        onChange={e =>
                                          updateItemDetails(item.id, {
                                            preferredColor: e.target.value,
                                          })
                                        }
                                        className="w-full px-2.5 py-1.5 rounded-lg border border-border-soft bg-bg-cream text-xs focus:outline-none focus:ring-1 focus:ring-forest"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-[10px] font-semibold text-gray-600 block mb-1">
                                      Garment Notes
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="e.g. Needs relaxed fit for hot weather"
                                      value={item.styleNotes || ''}
                                      onChange={e =>
                                        updateItemDetails(item.id, { styleNotes: e.target.value })
                                      }
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-border-soft bg-bg-cream text-xs focus:outline-none focus:ring-1 focus:ring-forest"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Optional Customer Name & Message Note */}
                    <div className="bg-bg-cream rounded-2xl p-4 border border-border-soft space-y-3">
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
                    onClick={() => {
                      setWhatsappTriggered(true);
                      trackWhatsAppClick({
                        button_location: 'request_list',
                        category: 'request_list',
                        enquiry_type: 'request_list',
                        items_count: items.length,
                      });
                    }}
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
