'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits.' })
    .regex(/^[0-9+\s-]{10,15}$/, { message: 'Please enter a valid phone number.' }),
  message: z.string().min(5, { message: 'Message must be at least 5 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    const whatsappMessage = [
      `Hello Warden & Sons! I have a general enquiry from your website:`,
      ``,
      `• Name: ${data.name}`,
      `• Phone: ${data.phone}`,
      `• Email: ${data.email}`,
      `• Message: ${data.message}`,
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
            Enquiry Dispatched!
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] max-w-sm mx-auto leading-relaxed">
            Your message was generated and redirected to our WhatsApp store desk. Our family team will reply shortly.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs font-bold text-[#1B4332] bg-[#FAF8F5] border border-[#1B4332] px-6 py-2.5 rounded-full hover:bg-[#1B4332] hover:text-white transition-all cursor-pointer"
          >
            Send Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D4A574]" />
              Full Name
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="e.g. Anandita Merchant"
              className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
            />
            {errors.name && <p className="text-[11px] font-semibold text-red-500">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D4A574]" />
                WhatsApp / Phone Number
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
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="e.g. anandita@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
              />
              {errors.email && <p className="text-[11px] font-semibold text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#D4A574]" />
              Your Message or Sizing Question
            </label>
            <textarea
              {...register('message')}
              rows={4}
              placeholder="Tell us what you are looking for (e.g. size guidance, baby gift sets, store visit timings)..."
              className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white resize-none"
            />
            {errors.message && <p className="text-[11px] font-semibold text-red-500">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[48px] bg-[#1B4332] hover:bg-[#143527] text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Send Enquiry to WhatsApp Desk</span>
          </button>
        </form>
      )}
    </div>
  );
}
