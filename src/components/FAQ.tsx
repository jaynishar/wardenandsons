'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How does WhatsApp shopping work if there is no online payment checkout?',
    answer:
      'We believe children’s clothing deserves personal care. You can browse our sample catalog online, add items to your bag, and click "Send Order on WhatsApp". Our family team at Kemps Corner receives your exact list, checks live inventory, sends real photographs of colors, and provides our official UPI QR or bank link for direct settlement.',
  },
  {
    question: 'How do you ensure the right fit and sizing for my child?',
    answer:
      'Kids grow quickly, and sizes vary across brands. When you order on WhatsApp, you can share your child’s age, height, and current fit preferences. Our store assistants will lay a physical measuring tape flat on the garment to send you chest, length, and waist dimensions before dispatch.',
  },
  {
    question: 'What delivery options do you offer across Mumbai and India?',
    answer:
      'For South Bombay and suburban Mumbai, we offer same-day or next-day local courier delivery (or store pickup from Kemps Corner). We also ship across India via trusted express air couriers within 2–4 business days.',
  },
  {
    question: 'Can I visit the physical store at Kemps Corner directly?',
    answer:
      'Yes, absolutely! We love welcoming families. We are located at Kemps Corner, South Mumbai (near Pedder Road flyover). Store hours are Monday to Saturday from 10:30 AM to 8:30 PM (Sunday closed).',
  },
  {
    question: 'What is your exchange policy?',
    answer:
      'We offer a hassle-free 7-day exchange on all unworn items with tags intact. You can exchange directly at our store or arrange a courier exchange via WhatsApp.',
  },
  {
    question: 'Do you take custom school uniform or bulk B2B orders?',
    answer:
      'Yes! Warden & Sons has been manufacturing high-quality cotton school uniforms, sports kits, and corporate event shirts since 1994. Bulk orders start at a minimum of 50 pieces. You can submit our Bulk Order form or message us on WhatsApp.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={faq.question}
            className="bg-white rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-xs transition-all"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-[#D4A574] shrink-0" />
                <span className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A]">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#1B4332]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-[#EBE7DF]/60 bg-[#FAF8F5]/50 animate-in fade-in duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}

      <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF] text-center mt-6">
        <p className="text-xs text-[#666666]">
          Have a specific question not listed here?{' '}
          <a
            href="https://wa.me/919920751567"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#1B4332] underline hover:text-[#D4A574] inline-flex items-center gap-1 ml-1"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Ask on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
