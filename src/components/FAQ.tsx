import React from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How does WhatsApp enquiry and ordering work?',
    answer:
      'Warden & Sons carries a wide, rotating physical inventory at Kemps Corner. You can browse our representative catalogue online, add items to your Request List, specify any size or colour preferences, and click "Send Enquiry on WhatsApp". Our shop team receives your list, checks live availability, sends real photographs and dimensions, confirms current prices, and arranges fulfillment directly.',
  },
  {
    question: 'How do you ensure the right fit and sizing for my child?',
    answer:
      'Children grow quickly, and fits vary between garments. When you send your request on WhatsApp, you can mention your child’s age, approximate height, and fit preference. Our store team will lay a physical measuring tape flat across chest, waist, and length dimensions and share photos before you complete any purchase.',
  },
  {
    question: 'What delivery and pickup options do you offer?',
    answer:
      'Customers in South Mumbai and across the city can pick up ready packages directly from our Kemps Corner store or have orders delivered via local couriers. For orders across India, courier shipping is coordinated directly during your WhatsApp conversation based on your address and timeline.',
  },
  {
    question: 'Can I visit the physical boutique at Kemps Corner in person?',
    answer:
      'Yes, absolutely! We love welcoming families into our boutique. We are located at Kemps Corner, South Mumbai (near the Pedder Road flyover). Store hours are Monday to Saturday from 10:30 AM to 8:30 PM (Sunday closed).',
  },
  {
    question: 'How do exchanges work if a size doesn’t fit?',
    answer:
      'Because every piece is personally verified before dispatch, sizing mismatches are rare. If an unworn garment with tags intact needs an exchange, you can exchange it directly at our Kemps Corner boutique or coordinate an exchange with our store team on WhatsApp.',
  },
  {
    question: 'Do you take custom school uniform or bulk institutional enquiries?',
    answer:
      'Yes! Warden & Sons has provided cotton school uniforms, sports kits, and customized event apparel for South Mumbai schools and institutions for over 30 years. Contact our store team via the Bulk Enquiries form or directly on WhatsApp with your design and quantity requirements.',
  },
];

export default function FAQ() {
  return (
    <div className="space-y-4 max-w-3xl mx-auto font-sans">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group bg-white rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-xs transition-colors"
        >
          <summary className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none list-none select-none">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-[#D4A574] shrink-0" />
              <span className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A]">
                {faq.question}
              </span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-500 shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:text-[#1B4332]" />
          </summary>

          <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-[#EBE7DF]/60 bg-[#FAF8F5]/50">
            {faq.answer}
          </div>
        </details>
      ))}

      <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF] text-center mt-6">
        <p className="text-xs text-[#666666]">
          Have a specific question not listed here?{' '}
          <a
            href={BUSINESS_CONFIG.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#1B4332] underline hover:text-[#D4A574] inline-flex items-center gap-1 ml-1"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" /> Ask on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
