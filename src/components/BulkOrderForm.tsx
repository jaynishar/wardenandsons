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
      `• Organization: ${data.organization}`,
      `• Contact: ${data.contactPerson}`,
      `• Phone: ${data.phone}`,
      data.email ? `• Email: ${data.email}` : null,
      `• Category: ${data.category}`,
      `• Approx Quantity: ${data.quantity}`,
      `• Specifications: ${data.details}`,
      '',
      `Sent via ${attribution}`,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const onSubmit = async (data: BulkFormValues) => {
    trackFormSubmit('bulk_orders', data.category);

    trackWhatsAppClick({
      button_location: 'bulk_orders',
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
      // Graceful fallback
    }
  };

  const handleNewEnquiry = () => {
    reset();
    setGeneratedMessage('');
    setWhatsappOpened(false);
  };

  return (
    <div className="bg-white border border-[var(--line)] rounded-md p-6 sm:p-10 font-sans shadow-xs">
      {whatsappOpened ? (
        <div className="py-6 space-y-6">
          <div className="w-14 h-14 bg-[var(--wa)] text-white rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="w-7 h-7" />
          </div>

          <div className="text-center space-y-2 max-w-md mx-auto">
            <h3 className="font-sans font-medium text-2xl text-[var(--ink)]">Enquiry Ready for WhatsApp</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              We have generated your custom quote summary. It should open automatically on WhatsApp.
              If it did not launch, you can copy the text below and message our store team directly.
            </p>
          </div>

          {/* Generated Message Box */}
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-md p-5 space-y-3 max-w-lg mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--ink)]">
                Summary Preview
              </span>
              <button
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)] hover:text-[var(--terracotta)] underline cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[var(--wa)]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Message</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs sm:text-sm text-[var(--ink)] whitespace-pre-wrap font-sans bg-white border border-[var(--line)] rounded-sm p-4 max-h-48 overflow-y-auto">
              {generatedMessage}
            </pre>
            <p className="text-xs text-[var(--muted)]">
              Did WhatsApp not open? Copy the message above and send it to{' '}
              <strong>{BUSINESS_CONFIG.phone.display}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={BUSINESS_CONFIG.whatsappUrl(generatedMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[48px] px-7 inline-flex items-center justify-center gap-2 bg-[var(--wa)] hover:bg-[var(--wa-hover)] text-white text-sm font-medium rounded-sm transition-all cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Re-open WhatsApp</span>
            </a>
            <button
              onClick={handleNewEnquiry}
              className="h-[48px] px-7 text-sm font-medium text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--ink)] hover:text-white rounded-sm border border-[var(--line)] transition-all cursor-pointer"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="mb-2">
            <h2 className="font-sans font-medium text-2xl text-[var(--ink)]">
              Request a Bulk Quote
            </h2>
            <p className="text-sm text-[var(--muted)] mt-1 font-normal">
              Share details for school uniforms, institutional wear, or bulk order quantities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[var(--terracotta)]" />
                School or Organization <span className="text-red-500">*</span>
              </label>
              <input
                {...register('organization')}
                type="text"
                placeholder="e.g. Activity High School / Trust"
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--line)] rounded-sm text-sm font-sans focus:outline-none focus:border-[var(--ink)] transition-colors"
              />
              {errors.organization && (
                <p className="text-xs text-red-500">
                  {errors.organization.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)] flex items-center gap-1.5">
                <User className="w-4 h-4 text-[var(--terracotta)]" />
                Contact Person Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('contactPerson')}
                type="text"
                placeholder="e.g. Ramesh Mehta"
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--line)] rounded-sm text-sm font-sans focus:outline-none focus:border-[var(--ink)] transition-colors"
              />
              {errors.contactPerson && (
                <p className="text-xs text-red-500">
                  {errors.contactPerson.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)] flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[var(--terracotta)]" />
                WhatsApp / Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="e.g. 9820012345"
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--line)] rounded-sm text-sm font-sans focus:outline-none focus:border-[var(--ink)] transition-colors"
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)] flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[var(--terracotta)]" />
                Email Address (Optional)
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="e.g. ramesh@organization.org"
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--line)] rounded-sm text-sm font-sans focus:outline-none focus:border-[var(--ink)] transition-colors"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)]">
                Garment Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register('category')}
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--line)] rounded-sm text-sm font-sans focus:outline-none focus:border-[var(--ink)] transition-colors"
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
                <p className="text-xs text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[var(--ink)]">
                Approximate Quantity Required <span className="text-red-500">*</span>
              </label>
              <input
                {...register('quantity')}
                type="text"
                placeholder="e.g. 50 sets, 200 t-shirts"
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--line)] rounded-sm text-sm font-sans focus:outline-none focus:border-[var(--ink)] transition-colors"
              />
              {errors.quantity && (
                <p className="text-xs text-red-500">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-[var(--ink)]">
              Detailed Requirements, Sizes &amp; Deadlines <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('details')}
              rows={4}
              placeholder="Please specify size ranges (e.g. 4-12 years), fabric preferences (100% combed cotton, drill, matty), target completion date, or any specific design guidelines..."
              className="w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--line)] rounded-sm text-sm font-sans focus:outline-none focus:border-[var(--ink)] resize-none transition-colors"
            />
            {errors.details && (
              <p className="text-xs text-red-500">{errors.details.message}</p>
            )}
          </div>

          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-sm p-3.5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[var(--terracotta)] shrink-0 mt-0.5" />
            <span className="text-xs text-[var(--muted)] leading-relaxed">
              Submitting generates a structured quotation enquiry sent directly to our Kemps Corner
              store manager on WhatsApp ({BUSINESS_CONFIG.phone.display}). You can review before sending.
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[48px] bg-[var(--ink)] hover:bg-[var(--blue)] text-white font-medium px-6 text-sm flex items-center justify-center gap-2 cursor-pointer transition-all rounded-sm shadow-xs"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Send Bulk Enquiry on WhatsApp</span>
          </button>
        </form>
      )}
    </div>
  );
}
