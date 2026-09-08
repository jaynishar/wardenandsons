'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Mail, Clock, MessageSquare, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-dark text-white font-sans mt-auto border-t-4 border-accent-500">
      {/* Top CTA Footer Band */}
      <div className="bg-primary-900 border-b border-primary-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-bold text-lg text-white">Have Questions or Need a Custom Size?</h3>
            <p className="text-xs text-primary-200 mt-1">Chat directly with our family members at Kemps Corner on WhatsApp</p>
          </div>
          <a
            href="https://wa.me/message/NBG6MFUV3EXYG1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105 min-h-[44px]"
            id="footer-whatsapp-cta"
          >
            <MessageSquare className="w-5 h-5" /> Chat on WhatsApp Now
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info & Local SEO NAP */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-white">Warden & Sons</span>
              <span className="text-[10px] text-accent-400 uppercase font-bold tracking-widest mt-0.5">Kids Wear • South Bombay</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We are a warm, family-run neighborhood boutique. Serving the families of South Mumbai since 1994, we focus on 100% natural, breathable cotton garments for newborns, boys, girls, and daily basics.
            </p>
            <div className="flex items-center space-x-1.5 text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400" />
              <span className="text-xs text-slate-300 font-semibold ml-1">4.9 on Google Business</span>
            </div>
            <a
              href="https://g.page/r/CRi_iIq4yd6gEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-semibold text-accent-400 hover:text-accent-300 transition-colors py-1.5 focus:outline-none"
            >
              ⭐ Leave Us a Google Review
            </a>
          </div>

          {/* Contact Details & NAP */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent-400 border-b border-slate-700 pb-2 mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4.5 h-4.5 text-accent-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Warden & Sons Kids Wear</strong><br />
                  Kemps Corner, South Mumbai,<br />
                  Mumbai, Maharashtra 400036
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4.5 h-4.5 text-accent-500 shrink-0" />
                <a href="tel:+919920751567" className="hover:text-white transition-colors">
                  +91 99207 51567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4.5 h-4.5 text-accent-500 shrink-0" />
                <a href="https://wa.me/919920751567" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4.5 h-4.5 text-accent-500 shrink-0 mt-0.5" />
                <span>
                  Mon - Sat: 10:30 AM - 8:30 PM<br />
                  Sunday: Closed (Family Time)
                </span>
              </li>
            </ul>
          </div>

          {/* Shop Categories Quicklinks */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent-400 border-b border-slate-700 pb-2 mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/shop/newborn" className="hover:text-accent-400 transition-colors">
                  Newborn & Infants (0-24M)
                </Link>
              </li>
              <li>
                <Link href="/shop/boys" className="hover:text-accent-400 transition-colors">
                  Boys Wear (0-16Y)
                </Link>
              </li>
              <li>
                <Link href="/shop/girls" className="hover:text-accent-400 transition-colors">
                  Girls Wear (0-16Y)
                </Link>
              </li>
              <li>
                <Link href="/shop/men" className="hover:text-accent-400 transition-colors">
                  Men's Basics & Innerwear
                </Link>
              </li>
              <li>
                <Link href="/shop/women" className="hover:text-accent-400 transition-colors">
                  Women's Basics & Innerwear
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-accent-400 transition-colors font-semibold text-accent-500">
                  🎒 Custom Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Sitemap */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-accent-400 border-b border-slate-700 pb-2 mb-4">
              Our Website
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-accent-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-400 transition-colors">Our Story</Link>
              </li>
              <li>
                <Link href="/whatsapp-shopping" className="hover:text-accent-400 transition-colors">WhatsApp Order Guide</Link>
              </li>
              <li>
                <Link href="/video-shopping" className="hover:text-accent-400 transition-colors">Book Video Shopping</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent-400 transition-colors">Blog & Guides</Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-accent-400 transition-colors">Google Reviews</Link>
              </li>
              <li>
                <Link href="/visit-us" className="hover:text-accent-400 transition-colors">Store Locator & Directions</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-400 transition-colors">Contact Form</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Local SEO Footnote */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Warden & Sons Kids Wear. All Rights Reserved. Located at Kemps Corner, South Bombay, Mumbai.</p>
          <div className="flex space-x-4">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/shipping-returns" className="hover:underline">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
