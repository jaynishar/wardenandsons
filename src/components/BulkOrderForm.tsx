'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Building2,
  User,
  Phone,
  Mail,
  MessageSquare,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

const bulkSchema = z.object({
  organization: z.string().min(2, { message: 'School or organization name required.' }),
  contactPerson: z.string().min(2, { message: 'Contact person name required.' }),
  phone: z.string().min(8, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Valid email required.' }).optional().or(z.literal('')),
  quantity: z.string().min(1, { message: 'Please specify approximate quantity required.' }),
  category: z.string().min(1, { message: 'Please select garment type.' }),
  details: z.string().min(3, { message: 'Please share your design or fabric requirements.' }),
});

type BulkFormValues = z.infer<typeof bulkSchema>;

export default function BulkOrderForm() {
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BulkFormValues>({
    resolver: zodResolver(bulkSchema),
    defaultValues: {
      organization: '',
      contactPerson: '',
      phone: '',
      email: '',
      quantity: '',
      category: '',
      details: '',
    },
  });

  const buildMessage = (data: BulkFormValues): string => {
    const lines = [
      'Hello Warden & Sons! I have a bulk/institutional enquiry:',
      '',
      `• Organization: ${data.organization.trim()}`,
      `• Contact Person: ${data.contactPerson.trim()}`,
      `• Phone: ${data.phone.trim()}`,
    ];

    if (data.email && data.email.trim()) {
      lines.push(`• Email: ${data.email.trim()}`);
    }

    lines.push(`• Garment Category: ${data.category}`);
    lines.push(`• Estimated Quantity: ${data.quantity}`);
    lines.push(`• Requirements & Deadlines: ${data.details.trim()}`);
    lines.push('');
    lines.push('Please let us know availability, fabric swatches, and quotation details.');
    lines.push('');
    lines.push('Thank you!');

    return lines.join('\n');
  };

  const onSubmit = (data: BulkFormValues) => {
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

          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl font-bold text-forest">
              Bulk Enquiry Ready in WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
              Your bulk uniform specifications have been formatted. Please tap <strong>Send</strong>{' '}
              in WhatsApp to deliver the enquiry directly to our store desk.
            </p>
          </div>

          {/* Fallback Copy Area */}
          <div className="bg-bg-cream rounded-2xl border border-border-soft p-4 space-y-3 max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-forest uppercase tracking-wider">
                Prefilled Message
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-gold transition-colors cursor-pointer"
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
            <pre className="text-[11px] text-muted whitespace-pre-wrap font-sans bg-white p-3 rounded-xl border border-border-soft/80 max-h-40 overflow-y-auto">
              {generatedMessage}
            </pre>
            <p className="text-[10px] text-gray-500 italic">
              Did WhatsApp not open? Copy the message above and send directly to{' '}
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
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-near-black flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-gold" />
                School or Organization <span className="text-red-500">*</span>
              </label>
              <input
                {...register('organization')}
                type="text"
                placeholder="e.g. Cathedral & John Connon / Local Academy"
                className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
              />
              {errors.organization && (
                <p className="text-[11px] font-semibold text-red-500">
                  {errors.organization.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-near-black flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold" />
                Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                {...register('contactPerson')}
                type="text"
                placeholder="e.g. Ramesh Kothari"
                className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
              />
              {errors.contactPerson && (
                <p className="text-[11px] font-semibold text-red-500">
                  {errors.contactPerson.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-near-black flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold" />
                Phone / WhatsApp Number <span className="text-red-500">*</span>
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
                placeholder="e.g. admin@school.edu"
                className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
              />
              {errors.email && (
                <p className="text-[11px] font-semibold text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-near-black block">
                Garment Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
              >
                <option value="">Select garment category</option>
                <option value="School Uniforms (Shirts, Pinafores, Skirts, Trousers)">
                  School Uniforms (Shirts, Pinafores, Trousers)
                </option>
                <option value="Cricket Whites & Academy Kits">Cricket Whites & Academy Kits</option>
                <option value="Dryfit Sports Jersey & Shorts">
                  Dryfit Sports Jerseys & Shorts
                </option>
                <option value="Annual Day / Sports Day Event T-Shirts">
                  Annual Day / Sports Day Event T-Shirts
                </option>
                <option value="Hospital / Nursery Swaddle Bundles">
                  Hospital / Nursery Swaddle Bundles
                </option>
                <option value="Custom Cotton Embroidery & Other Apparel">
                  Custom Cotton Embroidery & Other Apparel
                </option>
              </select>
              {errors.category && (
                <p className="text-[11px] font-semibold text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-near-black block">
                Approximate Quantity <span className="text-red-500">*</span>
              </label>
              <input
                {...register('quantity')}
                type="text"
                placeholder="e.g. 25 pieces, 100 sets"
                className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
              />
              {errors.quantity && (
                <p className="text-[11px] font-semibold text-red-500">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-near-black block">
              Design, Colors & Fabric Specifications <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('details')}
              rows={4}
              placeholder="Tell us about school colors, crest embroidery, fabric preference (pure cotton, poly-cotton blend, dryfit), or target delivery deadline..."
              className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white resize-none"
            />
            {errors.details && (
              <p className="text-[11px] font-semibold text-red-500">{errors.details.message}</p>
            )}
          </div>

          <div className="bg-bg-cream p-3 rounded-xl border border-border-soft text-[11px] text-gray-600 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>
              Submitting opens WhatsApp with your prefilled specifications. Our shop team will reply
              directly with quotations and fabric sample options.
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[48px] bg-forest hover:bg-forest-dark text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-whatsapp" />
            <span>Send Bulk Enquiry on WhatsApp</span>
          </button>
        </form>
      )}
    </div>
  );
}
