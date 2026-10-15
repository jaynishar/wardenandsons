'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building2, User, Phone, Mail, Package, MessageSquare, CheckCircle2 } from 'lucide-react';

const bulkSchema = z.object({
  organization: z.string().min(2, { message: 'School or company name required.' }),
  contactPerson: z.string().min(2, { message: 'Contact person name required.' }),
  phone: z
    .string()
    .min(10, { message: 'Valid 10-digit phone required.' })
    .regex(/^[0-9+\s-]{10,15}$/, { message: 'Enter a valid phone number.' }),
  email: z.string().email({ message: 'Valid email required.' }),
  quantity: z.string().min(1, { message: 'Please specify estimated quantity.' }),
  category: z.string().min(1, { message: 'Please select uniform or product type.' }),
  details: z.string().min(5, { message: 'Please provide design or fabric requirements.' }),
});

type BulkFormValues = z.infer<typeof bulkSchema>;

export default function BulkOrderForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BulkFormValues>({
    resolver: zodResolver(bulkSchema),
  });

  const onSubmit = (data: BulkFormValues) => {
    const whatsappMessage = [
      `*WARDEN & SONS — B2B / BULK ORDER ENQUIRY*`,
      `-----------------------------------------`,
      `• Organization: ${data.organization}`,
      `• Contact Person: ${data.contactPerson}`,
      `• Phone: ${data.phone}`,
      `• Email: ${data.email}`,
      `• Category: ${data.category}`,
      `• Estimated Quantity: ${data.quantity} (Min. 50 pcs)`,
      `• Specific Details: ${data.details}`,
      `-----------------------------------------`,
      `Please provide bulk quotation and fabric swatch availability.`,
    ].join('\n');

    const url = `https://wa.me/919920751567?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');

    setIsSuccess(true);
    reset();
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EBE7DF] p-6 sm:p-8 shadow-xs">
      {isSuccess ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-[#1B4332]/10 text-[#1B4332] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1B4332]">
            Bulk Enquiry Received!
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] max-w-sm mx-auto leading-relaxed">
            Your bulk uniform specifications have been routed to our B2B production desk. Our team will share quotations and sample swatches on WhatsApp.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs font-bold text-[#1B4332] bg-[#FAF8F5] border border-[#1B4332] px-6 py-2.5 rounded-full hover:bg-[#1B4332] hover:text-white transition-all cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EBE7DF] flex items-center gap-3">
            <Package className="w-5 h-5 text-[#D4A574] shrink-0" />
            <p className="text-xs text-[#1B4332] font-semibold">
              Note: Bulk production has a minimum order quantity (MOQ) of <strong>50 pieces</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#D4A574]" />
                Institution / School Name
              </label>
              <input
                {...register('organization')}
                type="text"
                placeholder="e.g. Cathedral & John Connon / Local Academy"
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
              />
              {errors.organization && (
                <p className="text-[11px] font-semibold text-red-500">{errors.organization.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D4A574]" />
                Contact Person Name
              </label>
              <input
                {...register('contactPerson')}
                type="text"
                placeholder="e.g. Ramesh Kothari"
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
              />
              {errors.contactPerson && (
                <p className="text-[11px] font-semibold text-red-500">{errors.contactPerson.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D4A574]" />
                WhatsApp / Mobile Number
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="e.g. 9920751567"
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
              />
              {errors.phone && <p className="text-[11px] font-semibold text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4A574]" />
                Official Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="e.g. admin@school.edu"
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
              />
              {errors.email && <p className="text-[11px] font-semibold text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A] block">Uniform / Garment Type</label>
              <select
                {...register('category')}
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
              >
                <option value="">Select garment category</option>
                <option value="School Uniforms (Shirts, Pinafores, Skirts, Trousers)">
                  School Uniforms (Shirts, Skirts, Trousers)
                </option>
                <option value="Cricket Whites & Academy Kits">
                  Cricket Whites &amp; Academy Kits
                </option>
                <option value="Dryfit Sports Jersey & Shorts Quad-Sets">
                  Dryfit Sports Jersey &amp; Shorts Quad-Sets
                </option>
                <option value="Annual Day / Sports Day Event T-Shirts">
                  Annual Day / Sports Day Event T-Shirts
                </option>
                <option value="Hospital / Nursery Swaddle Bundles">
                  Hospital / Nursery Swaddle Bundles
                </option>
                <option value="Custom Corporate Gifting & Embroidery">
                  Custom Corporate Gifting &amp; Embroidery
                </option>
              </select>
              {errors.category && (
                <p className="text-[11px] font-semibold text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A] block">Estimated Quantity</label>
              <select
                {...register('quantity')}
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
              >
                <option value="">Select quantity bracket</option>
                <option value="50 - 100 Pieces">50 – 100 Pieces</option>
                <option value="100 - 250 Pieces">100 – 250 Pieces</option>
                <option value="250 - 500 Pieces">250 – 500 Pieces</option>
                <option value="500 - 1000 Pieces">500 – 1,000 Pieces</option>
                <option value="1000+ Pieces">1,000+ Pieces</option>
              </select>
              {errors.quantity && (
                <p className="text-[11px] font-semibold text-red-500">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1A1A] block">Design &amp; Fabric Specifications</label>
            <textarea
              {...register('details')}
              rows={4}
              placeholder="Specify fabric preferences (e.g. 100% combed cotton, 180 GSM, poly-cotton blend), school colors, crest embroidery requirements, or required delivery deadline..."
              className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white resize-none"
            />
            {errors.details && <p className="text-[11px] font-semibold text-red-500">{errors.details.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[48px] bg-[#1B4332] hover:bg-[#143527] text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Send Bulk Enquiry on WhatsApp</span>
          </button>
        </form>
      )}
    </div>
  );
}
