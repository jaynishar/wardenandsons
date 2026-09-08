'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EditorialHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col md:flex-row overflow-hidden bg-[#F9F9F9]">
      {/* Left Content - Asymmetrical */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 pt-32 pb-16 md:py-0 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-gray-500">
            Est. 1994 • Kemps Corner
          </p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] tracking-tighter mb-8 text-black">
            The<br />
            <span className="italic font-light text-gray-400">Cotton</span><br />
            Edit.
          </h1>
          <p className="max-w-sm text-sm text-gray-600 mb-10 leading-relaxed">
            South Bombay’s premier destination for pure, breathable kidswear. Curated for comfort, designed for the modern family.
          </p>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-4 border-b border-black pb-2 text-xs font-bold uppercase tracking-widest hover:text-gray-500 hover:border-gray-500 transition-all"
          >
            Explore Collection 
            <motion.span
              className="inline-block"
              whileHover={{ x: 5 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Right Content - Full Bleed Image with offset */}
      <div className="flex-1 relative w-full h-[60vh] md:h-auto md:w-[50vw]">
        <motion.div 
          className="absolute inset-0 md:inset-y-12 md:right-12 md:left-0 overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/store_front.jpg"
            alt="Warden & Sons Storefront"
            fill
            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        
        {/* Floating Badge */}
        <motion.div 
          className="absolute bottom-[-20px] left-[-20px] md:bottom-24 md:left-[-40px] w-32 h-32 bg-black rounded-full flex items-center justify-center text-white z-20 hidden md:flex"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-center">
            100% Pure<br/>Cotton
          </span>
        </motion.div>
      </div>
    </section>
  );
}
