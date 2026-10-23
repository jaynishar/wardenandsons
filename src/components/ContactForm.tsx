'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Phone, Mail, MessageSquare, Copy, Check, AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';
import { trackFormSubmit, trackWhatsAppClick } from '@/lib/analytics';
import { getWhatsAppAttributionLabel } from '@/lib/attribution';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name.' }),
  phone: z.string().optional().or(z.literal('')),
  email: z.string().email({ message: 'Please enter a valid email.' }).optional().or(z.literal('')),
  message: z.string().min(5, { message: 'Please write a brief question or requirement.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const buildMessage = (data: ContactFormValues): string => {
    const attribution = getWhatsAppAttributionLabel('contact form');
    const lines = [
      'Hello Warden & Sons Kids Wear!',
      '',
      `Customer Name: ${data.name.trim()}`,
    ];

    if (data.phone && data.phone.trim()) {
      lines.push(`Contact Phone: ${data.phone.trim()}`);
    }
    if (data.email && data.email.trim()) {
      lines.push(`Email: ${data.email.trim()}`);
    }

    lines.push('');
    lines.push(`Message: ${data.message.trim()}`);
    lines.push('');
    lines.push('Please let me know how best to proceed. Thank you!');
    lines.push('');
    lines.push(`(Sent from the website, ${attribution})`);

    return lines.join('\n');
  };

  const onSubmit = (data: ContactFormValues) => {
    // 1. Fire verified form submission and qualified lead event (Zero PII passed)
    trackFormSubmit('contact_form', 'general_inquiry');
    trackWhatsAppClick({
      button_location: 'footer',
      category: 'contact',
      enquiry_type: 'general',
    });

    const message = buildMessage(data);
    setGeneratedMessage(message);

    const url = BUSINESS_CONFIG.whatsappUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setWhatsappOpened(true);
  };

  const handleCopyMessage = async () => {
    if (!generatedMessage) return;
    try {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(generatedMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = generatedMessage;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleNewEnquiry = () => {
    setWhatsappOpened(false);
    setGeneratedMessage('');
    reset();
  };

  return (
    <div className="bg-white rounded-3xl border border-border-soft p-6 sm:p-8 shadow-xs font-sans">
      {whatsappOpened ? (
        <div className="py-8 space-y-6">
          <div className="w-14 h-14 bg-whatsapp/10 text-whatsapp rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="w-7 h-7" />
          </div>

          <div className="text-center space-y-2 max-w-md mx-auto">
            <h3 className="font-serif font-bold text-xl text-forest">Enquiry Ready for WhatsApp</h3>
            <p className="text-xs text-muted leading-relaxed">
              We have compiled your question into a direct message for our Kemps Corner store. If
              WhatsApp did not launch automatically, you can copy the text below and send it
              directly.
            </p>
          </div>

          {/* Generated Message Box */}
          <div className="bg-bg-cream rounded-2xl p-4 border border-border-soft space-y-3 max-w-lg mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-forest uppercase tracking-wider">
                Message Preview
              </span>
              <button
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-gold transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-whatsapp" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Message</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] text-muted whitespace-pre-wrap font-sans bg-white p-3 rounded-xl border border-border-soft/80 max-h-36 overflow-y-auto">
              {generatedMessage}
            </pre>
            <p className="text-[10px] text-gray-500 italic">
              Did WhatsApp not launch? Copy the message above and paste it directly into a chat with{' '}
              <strong>{BUSINESS_CONFIG.phone.display}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={BUSINESS_CONFIG.whatsappUrl(generatedMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-white text-xs font-bold shadow-xs transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white text-whatsapp" />
              <span>Re-open WhatsApp</span>
            </a>
            <button
              onClick={handleNewEnquiry}
              className="w-full sm:w-auto text-xs font-bold text-forest bg-bg-cream border border-forest px-6 py-3 rounded-xl hover:bg-forest hover:text-white transition-all cursor-pointer"
            >
              Start Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-near-black flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="e.g. Anandita Merchant"
              className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
            />
            {errors.name && (
              <p className="text-[11px] font-semibold text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-near-black flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold" />
                WhatsApp / Phone (Optional)
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="e.g. 9920751567"
                className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
              />
              {errors.phone && (
                <p className="text-[11px] font-semibold text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-near-black flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gold" />
                Email Address (Optional)
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="e.g. anandita@example.com"
                className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
              />
              {errors.email && (
                <p className="text-[11px] font-semibold text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-near-black flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-gold" />
              Your Question or Sizing Query <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('message')}
              rows={4}
              placeholder="Tell us what you are looking for (e.g. newborn hampers, school uniform sizing, or boutique visit timings)..."
              className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white resize-none"
            />
            {errors.message && (
              <p className="text-[11px] font-semibold text-red-500">{errors.message.message}</p>
            )}
          </div>

          <div className="bg-bg-cream p-3 rounded-xl border border-border-soft text-[11px] text-gray-600 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>
              Submitting opens a prefilled message directly on WhatsApp (
              {BUSINESS_CONFIG.phone.display}). You can review and edit before sending.
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[48px] bg-forest hover:bg-forest-dark text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-whatsapp" />
            <span>Open Enquiry in WhatsApp</span>
          </button>
        </form>
      )}
    </div>
  );
}
