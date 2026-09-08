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
  const [whatsappLink, setWhatsappLink] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>();

  const onSubmit = async (data: ContactFormValues) => {
    console.log('Contact form submitted:', data);

    const whatsappMessage = `Hello Warden & Sons! I have a General Enquiry.
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Message: ${data.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
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
          <h3 className="font-heading font-bold text-2xl text-slate-800">Message Sent!</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-sm mx-auto">
            Your enquiry was captured. To receive an instant response from our store coordinators on duty, click the button below to message us directly on WhatsApp.
          </p>
        </div>
        <div className="pt-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            💬 Chat with Store on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-primary-100 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
      <div className="border-b border-primary-50 pb-4">
        <h3 className="font-heading font-bold text-xl text-primary-800">Write to Us</h3>
        <p className="text-xs text-slate-500 font-sans mt-1">
          Have general feedback or an offline inventory check request? Fill out our form.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
            <User className="w-3.5 h-3.5" /> Full Name
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
          />
          {errors.name && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
            <Mail className="w-3.5 h-3.5" /> Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
          />
          {errors.email && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.email.message}</p>}
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

        {/* Message */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 font-sans">Your Message</label>
          <textarea
            {...register('message')}
            placeholder="Enter your enquiry details"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white resize-none"
          />
          {errors.message && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-800 hover:bg-primary-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors text-xs uppercase tracking-wider font-sans focus:outline-none focus:ring-4 focus:ring-primary-300 min-h-[44px] cursor-pointer"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
