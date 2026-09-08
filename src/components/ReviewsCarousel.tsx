'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
}

const reviewsData: Review[] = [
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
];

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [index]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0,
    }),
  };

  const activeReview = reviewsData[index];

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8 bg-warm-neutral border border-primary-100 rounded-2xl shadow-sm text-center">
      {/* Decorative Stars Header */}
      <div className="flex justify-center items-center space-x-1 text-yellow-500 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-6 h-6 fill-yellow-500" />
        ))}
      </div>

      {/* Review Box Wrapper */}
      <div className="relative min-h-[180px] md:min-h-[140px] flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeReview.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full"
          >
            <p className="font-sans text-sm md:text-base italic text-slate-dark leading-relaxed max-w-2xl mx-auto px-6">
              "{activeReview.text}"
            </p>
            <div className="mt-4">
              <h4 className="font-heading font-bold text-primary-800 text-sm md:text-base">
                {activeReview.name}
              </h4>
              <p className="text-[11px] md:text-xs text-accent-500 uppercase tracking-widest font-semibold mt-0.5">
                {activeReview.location} • {activeReview.date}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center items-center gap-6 mt-6">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full border border-primary-200 bg-white hover:bg-primary-50 text-primary-800 hover:text-accent-500 transition-colors shadow-sm cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Previous Review"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="p-2 rounded-full border border-primary-200 bg-white hover:bg-primary-50 text-primary-800 hover:text-accent-500 transition-colors shadow-sm cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Next Review"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Google Business Rating Footnote */}
      <div className="mt-8 pt-6 border-t border-primary-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xs text-left">
          <p className="font-sans text-slate-600">
            Rated <strong>4.9 / 5.0</strong> based on 150+ reviews on Google Maps.
          </p>
        </div>
        <a
          href="https://g.page/r/CRi_iIq4yd6gEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary-800 hover:bg-primary-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-300"
          id="reviews-carousel-google-review-cta"
        >
          ⭐ Leave Us a Google Review
        </a>
      </div>
    </div>
  );
}
