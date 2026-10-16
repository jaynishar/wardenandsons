'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, MessageSquare, Heart } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#EBE7DF] text-[#1A1A1A] font-sans">
      {/* Top Boutique Contact Banner */}
      <div className="bg-[#1B4332] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#D4A574]">
              Visit or Message Our Kemps Corner Store
            </h3>
            <p className="text-xs sm:text-sm text-gray-200">
              Need size assistance, newborn gift wrapping, or school uniform quotes?
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
              WhatsApp: {BUSINESS_CONFIG.phone.display}
            </a>
            <a
              href={BUSINESS_CONFIG.phone.telLink}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#1B4332] hover:bg-[#FAF8F5] text-xs font-bold shadow-xs transition-all"
            >
              <Phone className="w-4 h-4" />
              Call Store Desk
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Authentic Unclipped Logo Container */}
              <div className="relative w-14 h-10 rounded-md overflow-hidden bg-white border border-[#D4A574]/40 shrink-0 p-0.5 shadow-2xs">
                <Image
                  src="/brand_logo.jpg"
                  alt="Warden & Sons Official Crest"
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#1B4332] leading-none">
                  Warden & Sons
                </h4>
                <span className="text-[10px] uppercase font-bold text-[#D4A574] tracking-widest mt-0.5 block">
                  Kids Wear • Kemps Corner
                </span>
              </div>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed">
              South Mumbai’s neighborhood boutique for breathable cotton children’s wear, school uniforms, and family comfort basics.
            </p>
            <div className="pt-1 flex items-center gap-1 text-[11px] text-[#1B4332] font-semibold">
              <Heart className="w-3.5 h-3.5 text-[#D4A574] fill-[#D4A574]" />
              <span>{BUSINESS_CONFIG.establishment.displayText}</span>
            </div>
          </div>

          {/* Department Categories */}
          <div className="space-y-3">
            <h5 className="font-serif font-bold text-sm text-[#1B4332] uppercase tracking-wider">
              Departments
            </h5>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <Link href="/shop/newborn" className="hover:text-[#1B4332] transition-colors">
                  Newborn & Infants (0-24M)
                </Link>
              </li>
              <li>
                <Link href="/shop/boys" className="hover:text-[#1B4332] transition-colors">
                  Boys Playwear & Sports (0-16Y)
                </Link>
              </li>
              <li>
                <Link href="/shop/girls" className="hover:text-[#1B4332] transition-colors">
                  Girls Dresses & Sleepwear (0-16Y)
                </Link>
              </li>
              <li>
                <Link href="/shop/men" className="hover:text-[#1B4332] transition-colors">
                  Men’s Basics & Lounge
                </Link>
              </li>
              <li>
                <Link href="/shop/women" className="hover:text-[#1B4332] transition-colors">
                  Women’s Muslin Sleepwear & Basics
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-[#1B4332] transition-colors text-[#D4A574] font-bold">
                  🎒 Custom School Uniforms & Bulk Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Information */}
          <div className="space-y-3">
            <h5 className="font-serif font-bold text-sm text-[#1B4332] uppercase tracking-wider">
              Store Information
            </h5>
            <ul className="space-y-2 text-xs text-[#666666]">
              <li>
                <Link href="/how-it-works" className="hover:text-[#1B4332] transition-colors">
                  How WhatsApp Requests Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#1B4332] transition-colors">
                  Our Boutique Heritage
                </Link>
              </li>
              <li>
                <Link href="/visit-us" className="hover:text-[#1B4332] transition-colors">
                  Kemps Corner Store & Directions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#1B4332] transition-colors">
                  Contact Store Desk
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-[#1B4332] transition-colors">
                  Delivery & Exchange Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Location & Timings */}
          <div className="space-y-3">
            <h5 className="font-serif font-bold text-sm text-[#1B4332] uppercase tracking-wider">
              Kemps Corner Atelier
            </h5>
            <div className="space-y-2.5 text-xs text-[#666666]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A574] shrink-0 mt-0.5" />
                <span>
                  {BUSINESS_CONFIG.location.fullAddress}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#D4A574] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1A1A1A]">{BUSINESS_CONFIG.hours.display}</p>
                  <p className="text-gray-400">Sunday: {BUSINESS_CONFIG.hours.sunday}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#D4A574] shrink-0" />
                <a href={BUSINESS_CONFIG.phone.telLink} className="font-semibold text-[#1B4332] hover:underline">
                  {BUSINESS_CONFIG.phone.display}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-[#EBE7DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} Warden & Sons Kids Wear. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Kemps Corner, South Mumbai</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
