import React from 'react';
import { Star, MessageSquare, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Reviews & Testimonials',
  description: 'Read what South Bombay families say about Warden & Sons Kids Wear. See our 4.9-star rating reviews and leave your feedback.',
  alternates: {
    canonical: '/reviews',
  },
};

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
}

const allReviews: Review[] = [
  {
    id: 1,
    name: 'Priyanka Doshi',
    location: 'Altamount Road, South Mumbai',
    rating: 5,
    date: 'June 2026',
    text: 'Warden & Sons is our go-to shop for newborn clothes. The muslin swaddles and cotton bodysuits are incredibly soft and hold up well to constant washing. The team on WhatsApp is so helpful with sizing!',
  },
  {
    id: 2,
    name: 'Vikram Merchant',
    location: 'Breach Candy, South Bombay',
    rating: 5,
    date: 'May 2026',
    text: 'Bought cricket whites and sportswear for my son’s academy practice at CCI. Excellent dry-fit fabric quality. Far better than the cheap synthetics sold online. Great local shop.',
  },
  {
    id: 3,
    name: 'Dr. Neha Shah',
    location: 'Pedder Road, Mumbai',
    rating: 5,
    date: 'July 2026',
    text: 'The video shopping service is a savior for working moms. I booked a call, selected matching nightsuits and shirts, and had them delivered to my home the same afternoon. High-quality personal touch!',
  },
  {
    id: 4,
    name: 'Saira Contractor',
    location: 'Colaba, South Mumbai',
    rating: 5,
    date: 'April 2026',
    text: 'We ordered custom family t-shirts for my parents’ 50th anniversary trip. The print was clean, and the 180 GSM cotton fabric felt very premium. The kids looked so cute in their matching sizes!',
  },
  {
    id: 5,
    name: 'Rohan Salvi',
    location: 'Malabar Hill, South Bombay',
    rating: 5,
    date: 'June 2026',
    text: 'Excellent school uniform fabric quality. The stitching is reinforced and doesn\'t tear at the seams during sports. Very satisfied with the customer service at the Kemps Corner store.',
  },
  {
    id: 6,
    name: 'Meera Gokhale',
    location: 'Nepean Sea Road, South Bombay',
    rating: 5,
    date: 'March 2026',
    text: 'We are buying clothes for our children here since their newborn days. Now they are teenagers. Sizing is always perfect because they adjust fits in the shop for us if requested. Warm family environment.',
  },
  {
    id: 7,
    name: 'Amit Singhal',
    location: 'Worli, South Mumbai',
    rating: 5,
    date: 'February 2026',
    text: 'Excellent plain cotton t-shirts (180 GSM) for adults as well. Picked up five colors for everyday wear. Super soft, breathable, and doesn’t shrink in hot machine washes. Highly recommended!',
  },
  {
    id: 8,
    name: 'Fiona D’Souza',
    location: 'Cuffe Parade, Mumbai',
    rating: 5,
    date: 'January 2026',
    text: 'The newborn gift hampers are beautifully curated. I had them shipped to a friend in Malabar Hill directly from WhatsApp. She was thrilled with the soft blankets and towels. Great service.',
  },
];

export default function ReviewsPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
          ★ Google Business Rating 4.9
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary-800 leading-tight">
          What South Bombay Families Say About Us
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Over three decades, we have dressed thousands of children in South Mumbai. Read honest feedback from our valued neighbors.
        </p>
      </div>

      {/* Review Metrics */}
      <div className="bg-warm-neutral border border-primary-50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="space-y-2">
          <div className="flex justify-center md:justify-start items-center space-x-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5.5 h-5.5 fill-yellow-500" />
            ))}
          </div>
          <h2 className="font-heading font-bold text-2xl text-primary-800">4.9 / 5.0 Google Business Rating</h2>
          <p className="text-xs text-slate-500 font-sans">Based on 150+ reviews verified on Google Maps</p>
        </div>

        <a
          href="https://g.page/r/CRi_iIq4yd6gEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent-500 hover:bg-accent-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          id="reviews-page-google-leave-review-cta"
        >
          ⭐ Write a Google Review
        </a>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-primary-50 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-heading font-bold text-primary-800 text-base">{review.name}</h3>
                <p className="text-[10px] text-slate-400 font-sans uppercase font-bold tracking-wider mt-0.5">
                  {review.location}
                </p>
              </div>
              <div className="flex items-center space-x-0.5 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-500" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-sans italic">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="text-[10px] text-slate-400 text-right font-sans">
              Reviewed: {review.date}
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="bg-primary-50 border border-primary-100 p-8 rounded-3xl text-center space-y-4">
        <div className="w-12 h-12 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center mx-auto">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-xl text-primary-800">Become Part of Our Store Story</h3>
        <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-sm mx-auto">
          Have you shopped at Warden & Sons at Kemps Corner? Send us your suggestions on WhatsApp or leave a review to help us continue providing warm neighborhood customer service.
        </p>
        <div className="pt-2">
          <a
            href="https://wa.me/message/NBG6MFUV3EXYG1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white font-bold text-xs px-6 py-3 rounded-lg shadow-md transition-colors inline-flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" /> Share Feedback on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
