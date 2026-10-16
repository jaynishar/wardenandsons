'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, User, Phone, Tag, MessageSquare, Copy, Check } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(8, { message: 'Please enter a valid phone number.' }),
  category: z.string().min(1, { message: 'Please select a department of interest.' }),
  date: z.string().min(1, { message: 'Preferred date is required.' }),
  time: z.string().min(1, { message: 'Preferred time slot is required.' }),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function VideoBookingForm() {
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      category: '',
      date: '',
      time: '',
      notes: '',
    },
  });

  const buildMessage = (data: BookingFormValues): string => {
    const lines = [
      'Hello Warden & Sons! I would like to schedule a Video Call Shopping session:',
      '',
      `• Name: ${data.name.trim()}`,
      `• Phone: ${data.phone.trim()}`,
      `• Department of Interest: ${data.category}`,
      `• Preferred Date: ${data.date}`,
      `• Preferred Time: ${data.time}`,
    ];

    if (data.notes && data.notes.trim()) {
      lines.push(`• Specific Items to View: ${data.notes.trim()}`);
    }

    lines.push('');
    lines.push('Please confirm if this slot is available. Thank you!');

    return lines.join('\n');
  };

  const onSubmit = (data: BookingFormValues) => {
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

  const handleNewBooking = () => {
    setWhatsappOpened(false);
    setGeneratedMessage('');
    reset();
  };

  return (
    <div className="bg-white border border-[#EBE7DF] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-[#EBE7DF] pb-4">
        <div>
          <h3 className="font-serif font-bold text-xl text-[#1B4332]">
            Schedule Video Walkthrough
          </h3>
          <p className="text-xs text-[#666666] mt-0.5">
            Live via WhatsApp Video from Kemps Corner
          </p>
        </div>
      </div>

      {whatsappOpened ? (
        <div className="py-6 space-y-5 text-center">
          <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h4 className="font-serif font-bold text-lg text-[#1B4332]">
              Booking Enquiry Formatted in WhatsApp
            </h4>
            <p className="text-xs text-[#666666] max-w-sm mx-auto leading-relaxed">
              Please click <strong>Send</strong> in WhatsApp to share your preferred slot with our Kemps Corner store desk.
            </p>
          </div>

          <div className="bg-[#FAF8F5] rounded-2xl border border-[#EBE7DF] p-4 space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#1B4332] uppercase tracking-wider">
                Prefilled Slot Request
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] hover:text-[#D4A574] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] text-[#555] whitespace-pre-wrap font-sans bg-white p-3 rounded-xl border border-[#EBE7DF]/80 max-h-36 overflow-y-auto">
              {generatedMessage}
            </pre>
            <p className="text-[10px] text-gray-500 italic">
              Did WhatsApp not launch? Copy the text above and send directly to{' '}
              <strong>{BUSINESS_CONFIG.phone.display}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <a
              href={BUSINESS_CONFIG.whatsappUrl(generatedMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-xs transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Re-open WhatsApp</span>
            </a>
            <button
              onClick={handleNewBooking}
              className="w-full sm:w-auto text-xs font-bold text-[#1B4332] bg-[#FAF8F5] border border-[#1B4332] px-5 py-2.5 rounded-xl hover:bg-[#1B4332] hover:text-white transition-all cursor-pointer"
            >
              New Slot Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1 font-sans">
              <User className="w-3.5 h-3.5 text-[#D4A574]" /> Full Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="e.g. Meera Doshi"
              className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
            />
            {errors.name && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1 font-sans">
              <Phone className="w-3.5 h-3.5 text-[#D4A574]" /> WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="e.g. 9920751567"
              className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
            />
            {errors.phone && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.phone.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1 font-sans">
              <Tag className="w-3.5 h-3.5 text-[#D4A574]" /> Department of Interest <span className="text-red-500">*</span>
            </label>
            <select
              {...register('category')}
              className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
            >
              <option value="">Select a department</option>
              <option value="Newborns & Infants (0-24M)">Newborns & Infants (0-24M)</option>
              <option value="Boys Wear (0-16Y)">Boys Wear (0-16Y)</option>
              <option value="Girls Wear (0-16Y)">Girls Wear (0-16Y)</option>
              <option value="Men's Basics">Men’s Basics & Loungewear</option>
              <option value="Women's Muslin Basics">Women’s Muslin Basics</option>
              <option value="Multiple Departments">Multiple Departments / Family Gifting</option>
            </select>
            {errors.category && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.category.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1 font-sans">
                <Calendar className="w-3.5 h-3.5 text-[#D4A574]" /> Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                {...register('date')}
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
              />
              {errors.date && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.date.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1 font-sans">
                <Clock className="w-3.5 h-3.5 text-[#D4A574]" /> Preferred Time <span className="text-red-500">*</span>
              </label>
              <select
                {...register('time')}
                className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white"
              >
                <option value="">Select slot</option>
                <option value="11:00 AM - 1:00 PM">Morning (11:00 AM – 1:00 PM)</option>
                <option value="1:00 PM - 3:00 PM">Mid-day (1:00 PM – 3:00 PM)</option>
                <option value="3:00 PM - 5:00 PM">Afternoon (3:00 PM – 5:00 PM)</option>
                <option value="5:00 PM - 7:30 PM">Evening (5:00 PM – 7:30 PM)</option>
              </select>
              {errors.time && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.time.message}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1A1A1A] font-sans">
              Specific styles or colors to view (Optional)
            </label>
            <textarea
              {...register('notes')}
              placeholder="e.g. Show me yellow newborn swaddles, or size 6Y boys cotton shorts..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[#EBE7DF] bg-[#FAF8F5] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1B4332] hover:bg-[#143527] text-white font-bold py-3.5 px-4 rounded-xl shadow-xs transition-all text-xs uppercase tracking-wider font-sans focus:outline-none min-h-[44px] cursor-pointer flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Send Slot Request via WhatsApp</span>
          </button>
        </form>
      )}
    </div>
  );
}
