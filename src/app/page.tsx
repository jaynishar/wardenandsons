import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Box, Video } from 'lucide-react';

export const revalidate = 3600;

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white text-black uppercase font-sans tracking-tight pb-16 md:pb-0 overflow-x-hidden border-x border-black max-w-[1600px] mx-auto">
      
      {/* 1. Brutalist Marquee Banner */}
      <div className="marquee-container text-[10px] sm:text-xs font-mono font-bold tracking-widest bg-black text-white py-2">
        <div className="marquee-content">
          <span>WARDEN & SONS — SOUTH BOMBAY'S PREMIER KIDSWEAR EST. 1994 • PREMIUM 180 GSM COTTON • CUSTOM B2B UNIFORMS • </span>
          <span>WARDEN & SONS — SOUTH BOMBAY'S PREMIER KIDSWEAR EST. 1994 • PREMIUM 180 GSM COTTON • CUSTOM B2B UNIFORMS • </span>
          <span>WARDEN & SONS — SOUTH BOMBAY'S PREMIER KIDSWEAR EST. 1994 • PREMIUM 180 GSM COTTON • CUSTOM B2B UNIFORMS • </span>
        </div>
      </div>

      {/* 2. Hero Section - Spreadsheet Grid Style */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-black">
        <div className="relative h-[60vh] md:h-[85vh] border-r border-black p-4 flex flex-col justify-between group">
          <div className="absolute inset-0 z-0 p-4 pb-16">
            <div className="relative w-full h-full bg-gray-200 overflow-hidden">
               <Image src="/store_front.jpg" alt="Collection" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300" priority />
            </div>
          </div>
          <div className="relative z-10 flex justify-between w-full font-mono text-xs font-bold">
            <span>[001]</span>
            <span>INVENTORY</span>
          </div>
          <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-4">THE<br/>COTTON<br/>EDIT.</h1>
            <Link href="/shop" className="inline-flex items-center justify-between w-full border border-black bg-white px-4 py-3 hover:bg-black hover:text-white transition-colors text-sm font-bold">
              <span>SHOP COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right side sub-grid */}
        <div className="grid grid-rows-2 h-[60vh] md:h-[85vh]">
          <div className="border-b border-black p-4 flex flex-col justify-between group relative">
             <div className="absolute inset-0 z-0 p-4 pb-12">
               <div className="relative w-full h-full overflow-hidden">
                 <Image src="/brand_logo.jpg" alt="Newborn" fill className="object-cover" />
               </div>
             </div>
             <div className="relative z-10 flex justify-between font-mono text-xs font-bold">
               <span>[002]</span>
               <span>NEWBORN (0-24M)</span>
             </div>
             <Link href="/shop/newborn" className="relative z-10 inline-flex items-center justify-between w-full border border-black bg-white px-4 py-3 hover:bg-black hover:text-white transition-colors text-sm font-bold mt-auto">
                <span>VIEW NEWBORN</span>
                <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
          
          <div className="grid grid-cols-2">
            <div className="border-r border-black p-4 flex flex-col justify-between">
              <span className="font-mono text-xs font-bold mb-4">[003] BOYS</span>
              <p className="text-sm leading-tight mb-4 lowercase normal-case tracking-normal">Premium essentials designed for everyday durability. Ages 2-16.</p>
              <Link href="/shop/boys" className="mt-auto border-b-2 border-black inline-block w-fit text-sm font-bold pb-1 hover:text-gray-500">EXPLORE BOYS ↗</Link>
            </div>
            <div className="p-4 flex flex-col justify-between bg-gray-100">
              <span className="font-mono text-xs font-bold mb-4">[004] GIRLS</span>
              <p className="text-sm leading-tight mb-4 lowercase normal-case tracking-normal">Comfortable playwear and premium dresses. Ages 2-16.</p>
              <Link href="/shop/girls" className="mt-auto border-b-2 border-black inline-block w-fit text-sm font-bold pb-1 hover:text-gray-500">EXPLORE GIRLS ↗</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tech/Utilitarian Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-black divide-y md:divide-y-0 md:divide-x divide-black text-center text-sm font-mono font-bold">
        <div className="p-6 uppercase">100% Breathable Cotton</div>
        <div className="p-6 uppercase bg-black text-white">Free Shipping Over ₹2000</div>
        <div className="p-6 uppercase">Est. 1994 — Kemps Corner</div>
      </section>

      {/* 4. Live Video Shopping - Brutalist Block */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-black">
        <div className="p-8 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-black">
          <span className="font-mono text-xs font-bold mb-8 block">[005] PERSONAL SHOPPER</span>
          <h2 className="text-5xl font-bold tracking-tighter leading-[0.9] mb-6">VIRTUAL<br/>SHOWROOM.</h2>
          <p className="text-sm mb-8 max-w-sm lowercase normal-case tracking-normal">Book a private video walkthrough of our boutique. Expert sizing advice from our staff, tailored directly to your requirements.</p>
          <Link href="/video-shopping" className="flex items-center gap-3 border border-black bg-black text-white px-6 py-4 text-sm font-bold hover:bg-white hover:text-black transition-colors w-fit">
            <Video className="w-4 h-4" /> BOOK APPOINTMENT
          </Link>
        </div>
        <div className="relative min-h-[40vh] md:min-h-0 bg-gray-200">
          <Image src="/store_front.jpg" alt="Showroom" fill className="object-cover mix-blend-multiply opacity-80" />
        </div>
      </section>

      {/* 5. B2B / Custom Orders */}
      <section className="p-8 md:p-16 flex flex-col items-center text-center bg-gray-100 border-b border-black">
        <Box className="w-12 h-12 mb-6" />
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">BEYOND RETAIL.</h2>
        <p className="text-sm mb-8 max-w-md mx-auto lowercase normal-case tracking-normal">We manufacture premium custom school uniforms and corporate kits using our signature quality fabrics. Minimum order 50 pieces.</p>
        <Link href="/b2b" className="border border-black px-8 py-4 text-sm font-bold bg-white hover:bg-black hover:text-white transition-colors uppercase">
          SUBMIT B2B INQUIRY
        </Link>
      </section>
    </div>
  );
}
