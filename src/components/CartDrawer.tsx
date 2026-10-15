'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } =
    useCartStore();

  const [customerName, setCustomerName] = useState('');
  const [deliveryPreference, setDeliveryPreference] = useState<'Store Pickup (Kemps Corner)' | 'Home Delivery'>(
    'Home Delivery'
  );
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formError, setFormError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleProceedToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setFormError('Please enter your name so our store team can assist you.');
      return;
    }

    setFormError('');

    const itemLines = items
      .map((item, idx) => `${idx + 1}. ${item.name} - ₹${item.price} × ${item.quantity}`)
      .join('\n');

    const message = [
      `Hello Warden & Sons! I'd like to place an order:`,
      ``,
      itemLines,
      ``,
      `Total Items: ${totalItems}`,
      `Estimated Total: ₹${totalPrice}`,
      ``,
      `Name: ${customerName.trim()}`,
      `Delivery: ${deliveryPreference}`,
      ``,
      `Please share availability & photos. Thank you!`,
    ].join('\n');

    const url = `https://wa.me/919920751567?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(url, '_blank');

    // Clear cart and close drawer
    clearCart();
    setShowCheckoutForm(false);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => {
          setIsOpen(false);
          setShowCheckoutForm(false);
        }}
        aria-hidden="true"
      />

      {/* Drawer Container (Desktop: Slide Right, Mobile: Slide Up / Bottom Sheet) */}
      <div className="relative w-full sm:max-w-md bg-white h-full sm:h-full max-h-[92vh] sm:max-h-full rounded-t-3xl sm:rounded-none shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom-6 sm:slide-in-from-right duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EBE7DF] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1B4332]" />
            <h2 className="font-serif font-bold text-lg text-[#1B4332]">
              Shopping Bag ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              setShowCheckoutForm(false);
            }}
            className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-black transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EBE7DF] flex items-center justify-center mx-auto text-[#D4A574]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Your bag is empty</h3>
              <p className="text-xs text-[#666666] max-w-xs mx-auto leading-relaxed">
                Browse our Kemps Corner catalog and add pure cotton babywear, boys &amp; girls outfits to your order.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-2 text-xs font-bold text-[#1B4332] bg-[#FAF8F5] border border-[#1B4332] px-5 py-2.5 rounded-full hover:bg-[#1B4332] hover:text-white transition-all cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF] items-center"
                >
                  <div className="relative w-18 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-[#EBE7DF]">
                    <Image
                      src={item.image || '/store_front.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#1A1A1A] truncate">{item.name}</h4>
                    <p className="text-[11px] text-[#D4A574] font-semibold uppercase tracking-wider mt-0.5">
                      {item.subCategory || item.category}
                    </p>
                    <p className="text-sm font-bold text-[#1B4332] mt-1">₹{item.price}</p>
                  </div>

                  <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-[#EBE7DF] px-1 py-0.5 shadow-xs">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1 min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & WhatsApp Checkout */}
        {items.length > 0 && (
          <div className="border-t border-[#EBE7DF] p-6 bg-[#FAF8F5] space-y-4">
            {/* Total Summary */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#666666]">
                <span>Total Items</span>
                <span>{totalItems} items</span>
              </div>
              <div className="flex justify-between items-baseline font-bold">
                <span className="font-serif text-base text-[#1A1A1A]">Estimated Total</span>
                <span className="font-serif text-2xl text-[#1B4332]">₹{totalPrice}</span>
              </div>
              <p className="text-[11px] text-gray-500 italic">
                *Final availability and photo verification confirmed via WhatsApp chat.
              </p>
            </div>

            {/* Step 1 or Step 2 Checkout Form */}
            {!showCheckoutForm ? (
              <button
                onClick={() => setShowCheckoutForm(true)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
                Send Order on WhatsApp
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <form onSubmit={handleProceedToWhatsApp} className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A1A1A] block">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Shah"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#EBE7DF] bg-white text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1A1A1A] block">Delivery Preference</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryPreference('Home Delivery')}
                      className={`py-2 px-3 rounded-lg border font-medium text-center transition-all ${
                        deliveryPreference === 'Home Delivery'
                          ? 'bg-[#1B4332] text-white border-[#1B4332]'
                          : 'bg-white text-gray-700 border-[#EBE7DF]'
                      }`}
                    >
                      🚚 Home Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryPreference('Store Pickup (Kemps Corner)')}
                      className={`py-2 px-3 rounded-lg border font-medium text-center transition-all ${
                        deliveryPreference === 'Store Pickup (Kemps Corner)'
                          ? 'bg-[#1B4332] text-white border-[#1B4332]'
                          : 'bg-white text-gray-700 border-[#EBE7DF]'
                      }`}
                    >
                      🏬 Store Pickup
                    </button>
                  </div>
                </div>

                {formError && <p className="text-xs text-red-600 font-semibold">{formError}</p>}

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="py-3 px-4 rounded-xl border border-[#EBE7DF] bg-white text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
                    Send to WhatsApp Store (+91 99207 51567)
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
