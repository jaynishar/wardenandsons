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
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { BUSINESS_CONFIG } from '@/config/business';

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalItems = getTotalItems();

  const buildWhatsAppMessage = (): string => {
    const lines: string[] = [
      'Hello Warden & Sons Kids Wear!',
      '',
      'I would like to enquire about the following from your catalogue:',
      '',
    ];

    items.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.name}`);
      if (item.quantity > 1) {
        lines.push(`   Quantity: ${item.quantity}`);
      }
      if (item.ageGroup && item.ageGroup.trim()) {
        lines.push(`   Age / Group: ${item.ageGroup.trim()}`);
      }
      if (item.size && item.size.trim()) {
        lines.push(`   Size: ${item.size.trim()}`);
      }
      if (item.preferredColor && item.preferredColor.trim()) {
        lines.push(`   Preferred colour/style: ${item.preferredColor.trim()}`);
      }
      if (item.styleNotes && item.styleNotes.trim()) {
        lines.push(`   Notes: ${item.styleNotes.trim()}`);
      }
      lines.push('');
    });

    if (customerName.trim()) {
      lines.push(`Customer Name: ${customerName.trim()}`);
    }
    if (additionalNotes.trim()) {
      lines.push(`Additional requirements: ${additionalNotes.trim()}`);
    }

    lines.push('');
    lines.push(
      'Please share suitable available options with photographs, and confirm current pricing and availability.'
    );
    lines.push('');
    lines.push('Thank you!');

    return lines.join('\n');
  };

  const handleOpenWhatsApp = () => {
    if (items.length === 0) return;

    const message = buildWhatsAppMessage();
    const url = BUSINESS_CONFIG.whatsappUrl(message);

    // Open WhatsApp in a new tab/window without clearing request list
    window.open(url, '_blank', 'noopener,noreferrer');
    setWhatsappTriggered(true);
  };

  const handleCopyMessage = async () => {
    if (items.length === 0) return;

    const message = buildWhatsAppMessage();
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = message;
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
    if (window.confirm('Are you sure you want to clear your current request list?')) {
      clearCart();
      setWhatsappTriggered(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full sm:max-w-lg bg-white h-full max-h-screen shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#EBE7DF] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-white flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-[#D4A574]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-[#1B4332] leading-tight">
                Request List
              </h2>
              <p className="text-[11px] text-[#666666]">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for enquiry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                onClick={handleClearRequest}
                className="text-xs text-gray-500 hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1 cursor-pointer"
                title="Clear all selections"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition-colors cursor-pointer"
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
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center mx-auto text-[#D4A574]">
                <ClipboardList className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  Your request list is empty
                </h3>
                <p className="text-xs text-[#666666] max-w-xs mx-auto leading-relaxed">
                  Browse our catalogue and tap &quot;Add to Request&quot; on any department or representative garment. You can specify age, size, and preferences before sending to our Kemps Corner shop.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-2 text-xs font-bold text-[#1B4332] bg-[#FAF8F5] border border-[#1B4332] px-6 py-2.5 rounded-full hover:bg-[#1B4332] hover:text-white transition-all cursor-pointer"
              >
                Browse Catalogue
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#EBE7DF] text-[11px] text-[#666666] leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#D4A574] shrink-0 mt-0.5" />
                <span>
                  <strong>Catalogue Note:</strong> Warden &amp; Sons carries rotating physical inventory. Prices, sizes, and live photos are verified directly on WhatsApp before any purchase is completed.
                </span>
              </div>

              {items.map((item) => {
                const isExpanded = expandedItemId === item.id;

                return (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white rounded-2xl border border-[#EBE7DF] shadow-xs space-y-3"
                  >
                    {/* Item Summary Row */}
                    <div className="flex gap-3.5 items-center">
                      <div className="relative w-16 h-18 bg-[#FAF8F5] rounded-xl overflow-hidden shrink-0 border border-[#EBE7DF]">
                        <Image
                          src={item.image || '/store_front.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#D4A574] font-bold uppercase tracking-wider block">
                          {item.subCategory || item.category}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-[#1A1A1A] line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-[#1B4332] font-semibold mt-0.5">
                          Price confirmed on WhatsApp
                        </p>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-1.5 bg-[#FAF8F5] rounded-lg border border-[#EBE7DF] px-1 py-0.5 shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-black cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1 min-w-[16px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-black cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Custom Preferences */}
                    <div className="pt-1 border-t border-[#EBE7DF]/70">
                      <button
                        type="button"
                        onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                        className="w-full flex items-center justify-between text-[11px] font-semibold text-[#1B4332] hover:text-[#D4A574] transition-colors py-1 cursor-pointer"
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
                              onChange={(e) =>
                                updateItemDetails(item.id, { ageGroup: e.target.value })
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#EBE7DF] bg-[#FAF8F5] text-xs focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-gray-600 block mb-1">
                              Size (Optional)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Size 22, Medium, 3-6M"
                              value={item.size || ''}
                              onChange={(e) =>
                                updateItemDetails(item.id, { size: e.target.value })
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#EBE7DF] bg-[#FAF8F5] text-xs focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
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
                              onChange={(e) =>
                                updateItemDetails(item.id, { preferredColor: e.target.value })
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#EBE7DF] bg-[#FAF8F5] text-xs focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
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
                              onChange={(e) =>
                                updateItemDetails(item.id, { styleNotes: e.target.value })
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg border border-[#EBE7DF] bg-[#FAF8F5] text-xs focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Optional Customer Contact & Message */}
              <div className="bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF] p-4 space-y-3">
                <h4 className="font-serif font-bold text-xs text-[#1B4332] uppercase tracking-wider">
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
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#EBE7DF] bg-white text-xs focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
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
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#EBE7DF] bg-white text-xs focus:outline-none focus:ring-1 focus:ring-[#1B4332] resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="border-t border-[#EBE7DF] p-5 sm:p-6 bg-[#FAF8F5] space-y-3">
            {/* Primary WhatsApp Action */}
            <button
              onClick={handleOpenWhatsApp}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
              <span>Send Enquiry on WhatsApp (+91 99207 51567)</span>
            </button>

            {/* Copy Fallback Button */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-[#EBE7DF] bg-white text-gray-700 hover:text-black hover:bg-gray-50 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1B4332]" />
                    <span className="text-[#1B4332]">Enquiry Copied!</span>
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
                className="py-2.5 px-3 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Clear Request
              </button>
            </div>

            {/* Post-trigger Recovery Guidance */}
            {whatsappTriggered && (
              <div className="p-3 bg-white rounded-xl border border-[#D4A574]/40 text-[11px] text-[#666666] leading-relaxed space-y-1">
                <p className="font-semibold text-[#1B4332]">
                  WhatsApp opened in another window?
                </p>
                <p>
                  Remember to click <strong>Send</strong> in WhatsApp. Your selections remain saved here until you decide to clear them.
                </p>
                <p className="text-gray-500 text-[10px]">
                  Did not open? Click &quot;Copy Enquiry Text&quot; above and paste directly to <strong>+91 99207 51567</strong>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
