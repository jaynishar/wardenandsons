'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Building, Phone, Calendar, Layers, Clipboard, CheckCircle2 } from 'lucide-react';

const bulkSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  orgName: z.string().min(2, { message: 'School or Organization name is required.' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits.' })
    .regex(/^[0-9+\s-]{10,15}$/, { message: 'Please enter a valid phone number.' }),
  garmentType: z.string().min(1, { message: 'Please select a garment type.' }),
  quantity: z
    .string()
    .min(1, { message: 'Estimated quantity is required.' })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Quantity must be a positive number.',
    }),
  deadline: z.string().min(1, { message: 'Target delivery deadline is required.' }),
  details: z.string().min(5, { message: 'Please provide some details about your order.' }),
});

type BulkFormValues = z.infer<typeof bulkSchema>;

export default function BulkOrderForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BulkFormValues>({
    resolver: zodResolver(bulkSchema),
    defaultValues: {
      garmentType: '',
    },
  });

  const onSubmit = async (data: BulkFormValues) => {
    console.log('Bulk Order captured:', data);

    const message = `Hello Warden & Sons! I have a Custom Bulk Order Enquiry.
Name: ${data.name}
School/Org: ${data.orgName}
Phone: ${data.phone}
Garment Type: ${data.garmentType}
Est. Quantity: ${data.quantity}
Deadline: ${data.deadline}
Details: ${data.details}`;

    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/919920751567?text=${encodedMessage}`;
    setWhatsappLink(link);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-white border border-green-200 rounded-3xl p-8 shadow-md text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-2xl text-slate-800">Enquiry Submitted!</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-sm mx-auto">
            Your bulk order details have been captured. To discuss fabric selections, timelines, and special pricing directly with our tailoring coordinators, please click the button below to message us on WhatsApp.
          </p>
        </div>
        <div className="pt-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            💬 Contact Bulk Desk on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-primary-100 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
      <div className="border-b border-primary-50 pb-4">
        <h3 className="font-heading font-bold text-xl text-primary-800">Send Bulk Enquiry</h3>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Minimum Order Quantities (MOQ) apply based on customization.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
            <User className="w-3.5 h-3.5" /> Contact Person Name
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Enter contact name"
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
          />
          {errors.name && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.name.message}</p>}
        </div>

        {/* Organization / School */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
            <Building className="w-3.5 h-3.5" /> School / Organization Name
          </label>
          <input
            {...register('orgName')}
            type="text"
            placeholder="e.g. Cathedral School, Bombay Gymkhana"
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
          />
          {errors.orgName && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.orgName.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
            <Phone className="w-3.5 h-3.5" /> Mobile Number
          </label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="e.g. 9920751567"
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
          />
          {errors.phone && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.phone.message}</p>}
        </div>

        {/* Garment Type */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
            <Layers className="w-3.5 h-3.5" /> Garment Category
          </label>
          <select
            {...register('garmentType')}
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
          >
            <option value="">Select category</option>
            <option value="School Uniforms">School Uniforms (Everyday / Blazers / Ties)</option>
            <option value="Sports Kits">Sports Uniforms (Cricket Whites / Football Kits)</option>
            <option value="Event T-Shirts">Printed Event T-Shirts (All Sizes)</option>
            <option value="Corporate Gift Hamper">Corporate Newborn Gift Hampers</option>
            <option value="Custom Family Festival Sets">Coordinated Family Outfits</option>
          </select>
          {errors.garmentType && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.garmentType.message}</p>}
        </div>

        {/* Quantity & Deadline Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
              <Clipboard className="w-3.5 h-3.5" /> Est. Quantity (Pieces)
            </label>
            <input
              {...register('quantity')}
              type="text"
              placeholder="e.g. 50"
              className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
            />
            {errors.quantity && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.quantity.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
              <Calendar className="w-3.5 h-3.5" /> Target Deadline
            </label>
            <input
              {...register('deadline')}
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
            />
            {errors.deadline && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.deadline.message}</p>}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 font-sans">Requirements & Custom Details</label>
          <textarea
            {...register('details')}
            placeholder="e.g. Need 100 sets of cricket whites with customized club embroidery for ages 6 to 14. Target deadline is before school session opens."
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white resize-none"
          />
          {errors.details && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.details.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-800 hover:bg-primary-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors text-xs uppercase tracking-wider font-sans focus:outline-none focus:ring-4 focus:ring-primary-300 min-h-[44px] cursor-pointer"
        >
          {isSubmitting ? 'Sending Request...' : 'Send Bulk Request'}
        </button>
      </form>
    </div>
  );
}
