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
import { trackFormSubmit, trackWhatsAppClick } from '@/lib/analytics';
import { getWhatsAppAttributionLabel } from '@/lib/attribution';

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
    const attribution = getWhatsAppAttributionLabel('bulk order form');
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
    lines.push('');
    lines.push(`(Sent from the website, ${attribution})`);

    return lines.join('\n');
  };

  const onSubmit = (data: BulkFormValues) => {
    // 1. Fire verified form submission and qualified lead event (Zero PII passed)
    trackFormSubmit('bulk_order', data.category);
    trackWhatsAppClick({
      button_location: 'product',
      category: data.category,
      enquiry_type: 'bulk',
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
              We have generated your custom quote summary. It should open automatically on WhatsApp.
              If it did not launch, you can copy the text below and message our store team directly.
            </p>
          </div>

          {/* Generated Message Box */}
          <div className="bg-bg-cream rounded-2xl p-4 border border-border-soft space-y-3 max-w-lg mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-forest uppercase tracking-wider">
                Summary Preview
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
              Did WhatsApp not open? Copy the message above and send it to{' '}
              <strong>{BUSINESS_CONFIG.phone.display}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={BUSINESS_CONFIG.whatsappUrl(generatedMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
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
                placeholder="e.g. Activity High School / Private Trust"
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
                Contact Person Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('contactPerson')}
                type="text"
                placeholder="e.g. Ramesh Mehta"
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
                WhatsApp / Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="e.g. 9820012345"
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
                placeholder="e.g. ramesh@organization.org"
                className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
              />
              {errors.email && (
                <p className="text-[11px] font-semibold text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-near-black">
                Garment Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
              >
                <option value="">Select garment type...</option>
                <option value="School Uniforms (Shirts/Pinafores/Skirts)">
                  School Uniforms (Shirts / Pinafores / Skirts)
                </option>
                <option value="Sports Track Pants & Polos">Sports Track Pants &amp; Polos</option>
                <option value="Cotton T-Shirts (Screen-Printed / Embroidered)">
                  Cotton T-Shirts (Screen-Printed / Embroidered)
                </option>
                <option value="Lab Coats & Aprons">Lab Coats &amp; Aprons</option>
                <option value="Annual Day / Drama Costumes">Annual Day / Drama Costumes</option>
                <option value="Hospital Layettes / Newborn Bundles">
                  Hospital Layettes / Newborn Bundles
                </option>
                <option value="Other Custom Apparel">Other Custom Apparel</option>
              </select>
              {errors.category && (
                <p className="text-[11px] font-semibold text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-near-black">
                Approximate Quantity Required <span className="text-red-500">*</span>
              </label>
              <input
                {...register('quantity')}
                type="text"
                placeholder="e.g. 50 sets, 200 t-shirts"
                className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white"
              />
              {errors.quantity && (
                <p className="text-[11px] font-semibold text-red-500">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-near-black">
              Detailed Requirements, Sizes &amp; Deadlines <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('details')}
              rows={4}
              placeholder="Please specify size ranges (e.g. 4-12 years), fabric preferences (100% combed cotton, drill, matty), target completion date, or any specific design guidelines..."
              className="w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-cream text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest focus:bg-white resize-none"
            />
            {errors.details && (
              <p className="text-[11px] font-semibold text-red-500">{errors.details.message}</p>
            )}
          </div>

          <div className="bg-bg-cream p-3 rounded-xl border border-border-soft text-[11px] text-gray-600 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <span>
              Submitting generates a structured quotation enquiry sent directly to our Kemps Corner
              store manager on WhatsApp ({BUSINESS_CONFIG.phone.display}). You can review before
              sending.
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
