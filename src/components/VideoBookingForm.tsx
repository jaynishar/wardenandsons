'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Clock, User, Phone, Tag, CheckCircle2 } from 'lucide-react';
import { FEATURES } from '@/config/features';

const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits.' })
    .regex(/^[0-9+\s-]{10,15}$/, { message: 'Please enter a valid phone number.' }),
  category: z.string().min(1, { message: 'Please select a category of interest.' }),
  date: z.string().min(1, { message: 'Preferred date is required.' }),
  time: z.string().min(1, { message: 'Preferred time slot is required.' }),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function VideoBookingForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      category: '',
      time: '',
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    // Simulate API or log lead
    console.log('Booking lead captured:', data);
    
    // Construct WhatsApp pre-filled text
    const message = `Hello Warden & Sons! I would like to book a Video Shopping Session.
Name: ${data.name}
Phone: ${data.phone}
Category: ${data.category}
Date: ${data.date}
Time: ${data.time}
Notes: ${data.notes || 'None'}`;
    
    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/919920751567?text=${encodedMessage}`;
    setWhatsappLink(link);
    setIsSuccess(true);
  };

  const isFree = FEATURES.videoShoppingBookingFee === 0;

  if (isSuccess) {
    return (
      <div className="bg-white border border-green-200 rounded-3xl p-8 shadow-md text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-2xl text-slate-800">Booking Enquiry Sent!</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-sm mx-auto">
            Your details have been successfully captured. To confirm your slot immediately with our store team and reserve your personal shopper, click the WhatsApp button below.
          </p>
        </div>
        <div className="pt-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            💬 Confirm Slot on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-primary-100 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
      <div className="flex justify-between items-center border-b border-primary-50 pb-4">
        <h3 className="font-heading font-bold text-xl text-primary-800">Book Live Session</h3>
        
        {/* Dynamic Feature Flagged Badge */}
        {isFree ? (
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1.5 rounded-full uppercase tracking-wider">
            🎁 100% FREE RIGHT NOW
          </span>
        ) : (
          <span className="bg-accent-100 text-accent-700 text-[10px] font-bold px-2.5 py-1.5 rounded-full uppercase tracking-wider">
            🎟️ Booking Fee: ₹{FEATURES.videoShoppingBookingFee}
          </span>
        )}
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

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
            <Phone className="w-3.5 h-3.5" /> Mobile Number (WhatsApp preferred)
          </label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="e.g. 9920751567"
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
          />
          {errors.phone && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.phone.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
            <Tag className="w-3.5 h-3.5" /> Category of Interest
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
          >
            <option value="">Select a category</option>
            <option value="Newborns (0-24M)">Newborns / Infants (0-24M)</option>
            <option value="Boys Wear (0-16Y)">Boys Wear (0-16Y)</option>
            <option value="Girls Wear (0-16Y)">Girls Wear (0-16Y)</option>
            <option value="Men Basics">Men&apos;s Basics & Undershirts</option>
            <option value="Women Basics">Women&apos;s Basics & Loungewear</option>
          </select>
          {errors.category && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.category.message}</p>}
        </div>

        {/* Date and Time (Grid) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
              <Calendar className="w-3.5 h-3.5" /> Preferred Date
            </label>
            <input
              {...register('date')}
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
            />
            {errors.date && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.date.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1 font-sans">
              <Clock className="w-3.5 h-3.5" /> Preferred Time
            </label>
            <select
              {...register('time')}
              className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white"
            >
              <option value="">Select a slot</option>
              <option value="11:00 AM - 1:00 PM">Morning (11:00 AM - 1:00 PM)</option>
              <option value="1:00 PM - 3:00 PM">Mid-day (1:00 PM - 3:00 PM)</option>
              <option value="3:00 PM - 5:00 PM">Afternoon (3:00 PM - 5:00 PM)</option>
              <option value="5:00 PM - 7:30 PM">Evening (5:00 PM - 7:30 PM)</option>
            </select>
            {errors.time && <p className="text-[10px] font-bold text-red-500 font-sans">{errors.time.message}</p>}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 font-sans">Special requests (optional)</label>
          <textarea
            {...register('notes')}
            placeholder="e.g. I want to see cotton swaddles in light yellow, or boy joggers size 6Y"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-primary-100 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-primary-500 bg-warm-bg/30 focus:bg-white resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors text-xs uppercase tracking-wider font-sans focus:outline-none focus:ring-4 focus:ring-accent-300 min-h-[44px] cursor-pointer"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </button>

        {!isFree && (
          <p className="text-[10px] text-slate-400 text-center font-sans mt-2">
            * Note: The booking fee is fully adjustable against any purchases you make during the video session.
          </p>
        )}
      </form>
    </div>
  );
}
