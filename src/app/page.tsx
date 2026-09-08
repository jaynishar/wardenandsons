import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import { getBlogPosts } from '@/lib/blog';
import { MapPin, Phone, MessageSquare, Video, ShieldCheck, HeartHandshake, Compass, Calendar, ArrowRight } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default function HomePage() {
  const allPosts = getBlogPosts();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <div className="flex flex-col gap-16 md:gap-24 overflow-x-hidden font-sans">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-warm-bg pt-10 pb-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-primary-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
              🧸 South Bombay Landmark Since 1994
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary-800 leading-tight">
              South Bombay’s Trusted <br />
              <span className="text-accent-500">Kidswear Boutique</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Welcome to <strong>Warden & Sons</strong> at Kemps Corner. For over 30 years, we have dressed South Mumbai’s children in premium, 100% natural, breathable cotton garments. From newborns to teenagers, experience warm, personalized neighborhood service.
            </p>
            
            {/* Primary Mobile-First CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <a
                href="https://wa.me/message/NBG6MFUV3EXYG1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.03] min-h-[44px]"
                id="hero-whatsapp-cta"
              >
                <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
              </a>
              <Link
                href="/video-shopping"
                className="bg-accent-500 hover:bg-accent-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.03] min-h-[44px]"
                id="hero-video-cta"
              >
                <Video className="w-5 h-5" /> Book Free Video Shopping
              </Link>
              <Link
                href="/visit-us"
                className="bg-primary-800 hover:bg-primary-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.03] min-h-[44px]"
                id="hero-directions-cta"
              >
                <MapPin className="w-5 h-5" /> Get Directions
              </Link>
            </div>
          </div>

          {/* Hero Storefront Image */}
          <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[380px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/store_front.jpg"
              alt="Warden & Sons Kids Wear Storefront at Kemps Corner, South Mumbai"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-16 relative z-10">
        <div className="bg-white border border-primary-100 rounded-2xl shadow-xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl font-heading font-bold text-primary-800">32+ Years</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">In Business</div>
          </div>
          <div className="space-y-1 border-l border-primary-50">
            <div className="text-3xl font-heading font-bold text-primary-800">Kemps Corner</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">South Bombay Landmark</div>
          </div>
          <div className="space-y-1 border-l border-primary-50">
            <div className="text-3xl font-heading font-bold text-accent-500">4.9 ★ Rating</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Google Reviews</div>
          </div>
          <div className="space-y-1 border-l border-primary-50">
            <div className="text-3xl font-heading font-bold text-primary-800">100% Cotton</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pre-Shrunk & Safe</div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Shop Our Catalog By Category</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Discover breathable fabrics tailored specifically for Mumbai’s warm and humid coastal climate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Newborns */}
          <Link
            href="/shop/newborn"
            className="group relative h-[320px] rounded-2xl overflow-hidden shadow-md border border-primary-100 bg-primary-900 flex flex-col justify-end p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-primary-800/20 group-hover:bg-primary-800/10 transition-colors" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] text-accent-400 uppercase tracking-widest font-bold">Ages 0 - 24 Months</span>
              <h3 className="font-heading font-bold text-xl text-white">Newborn & Infant</h3>
              <p className="text-xs text-primary-200 line-clamp-2">Swaddles, onesies, rompers, bathrobes & bibs.</p>
            </div>
          </Link>

          {/* Boys */}
          <Link
            href="/shop/boys"
            className="group relative h-[320px] rounded-2xl overflow-hidden shadow-md border border-primary-100 bg-primary-800 flex flex-col justify-end p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-primary-800/25 group-hover:bg-primary-800/15 transition-colors" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] text-accent-400 uppercase tracking-widest font-bold">Ages 0 - 16 Years</span>
              <h3 className="font-heading font-bold text-xl text-white">Boys Clothing</h3>
              <p className="text-xs text-primary-100 line-clamp-2">T-shirts, shirts, shorts, nightwear, & sportswear.</p>
            </div>
          </Link>

          {/* Girls */}
          <Link
            href="/shop/girls"
            className="group relative h-[320px] rounded-2xl overflow-hidden shadow-md border border-primary-100 bg-accent-600 flex flex-col justify-end p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-accent-700/20 group-hover:bg-accent-700/10 transition-colors" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] text-accent-200 uppercase tracking-widest font-bold">Ages 0 - 16 Years</span>
              <h3 className="font-heading font-bold text-xl text-white">Girls Clothing</h3>
              <p className="text-xs text-accent-100 line-clamp-2">Tops, cotton dresses, shorts, nightsuits & sportswear.</p>
            </div>
          </Link>

          {/* Men */}
          <Link
            href="/shop/men"
            className="group relative h-[320px] rounded-2xl overflow-hidden shadow-md border border-primary-100 bg-slate-700 flex flex-col justify-end p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-slate-800/25 group-hover:bg-slate-800/15 transition-colors" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Loungewear & Basics</span>
              <h3 className="font-heading font-bold text-xl text-white">Men’s Basics</h3>
              <p className="text-xs text-slate-200 line-clamp-2">180 GSM t-shirts, gym shorts, thermals, & socks.</p>
            </div>
          </Link>

          {/* Women */}
          <Link
            href="/shop/women"
            className="group relative h-[320px] rounded-2xl overflow-hidden shadow-md border border-primary-100 bg-slate-800 flex flex-col justify-end p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/20 transition-colors" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] text-accent-400 uppercase tracking-widest font-bold">Loungewear & Basics</span>
              <h3 className="font-heading font-bold text-xl text-white">Women’s Basics</h3>
              <p className="text-xs text-slate-300 line-clamp-2">Night suits, leggings, gym tees, & handkerchiefs.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. How To Shop With Us */}
      <section className="bg-warm-neutral py-16 px-4 sm:px-6 lg:px-8 border-y border-primary-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">How To Shop With Us</h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              We focus on traditional relationships and personalized customer attention. Choose the channel that fits you best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 1. Visit Store */}
            <div className="bg-white border border-primary-50 p-6 rounded-2xl shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary-800">1. Visit Store Offline</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Walk into our historic Kemps Corner shop in South Bombay. Feel the soft cotton fabrics and inspect the sizes in person.
              </p>
              <Link href="/visit-us" className="text-xs font-bold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1">
                View Location Map <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. WhatsApp Orders */}
            <div className="bg-white border border-primary-50 p-6 rounded-2xl shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary-800">2. Order on WhatsApp</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Text us on WhatsApp. Our staff sends pictures/videos of the latest stock, measures sizes live, and ships to your doorstep.
              </p>
              <Link href="/whatsapp-shopping" className="text-xs font-bold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1">
                How WhatsApp Buying Works <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3. Video Call Shopping */}
            <div className="bg-white border border-primary-50 p-6 rounded-2xl shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-red-100 text-accent-500 rounded-full flex items-center justify-center mx-auto">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary-800">3. Video Call Shop</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Schedule a live video call. A personal shopper walks you through shelves. Free service with same-day South Bombay delivery.
              </p>
              <Link href="/video-shopping" className="text-xs font-bold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1">
                Book Video Appointment <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 4. Limited Online Store */}
            <div className="bg-white border border-primary-50 p-6 rounded-2xl shadow-sm text-center space-y-4">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary-800">4. Limited Online Shop</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Browse our basic essentials catalog right here. Pay securely online. Standard shipping fees shown clearly at checkout.
              </p>
              <Link href="/shop" className="text-xs font-bold text-accent-500 hover:text-accent-600 inline-flex items-center gap-1">
                Browse Online Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Custom Bulk Clothing Banner */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-primary-800 to-primary-900 rounded-3xl overflow-hidden shadow-xl p-8 md:p-12 text-white">
          <div className="absolute right-0 top-0 bottom-0 opacity-10 hidden lg:block w-1/3 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-white to-transparent" />
          
          <div className="max-w-2xl space-y-6">
            <span className="inline-block bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              🎒 Uniforms & Event T-Shirts
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
              Need Custom Uniforms or Bulk Clothing Orders?
            </h2>
            <p className="text-sm md:text-base text-primary-100 leading-relaxed">
              We specialize in custom manufacturing for South Bombay schools, sports clubs (cricket whites, football jerseys), corporates, and community festivals. High-grade 180 GSM cotton and sweat-wicking dry-fit fabrics.
            </p>
            <div className="pt-2">
              <Link
                href="/bulk-orders"
                className="bg-white hover:bg-primary-50 text-primary-800 font-bold px-6 py-3 rounded-lg shadow-md transition-colors inline-flex items-center gap-2 min-h-[44px]"
              >
                🎒 Send Bulk Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why South Bombay Families Choose Us (Trust/USP) */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-800">
            Why South Bombay Families Choose Warden & Sons
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            In an era of generic D2C brands, we remain committed to classic boutique service, local trust, and chemical-free, natural fabrics.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-100 text-primary-800 rounded-lg flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-primary-800">Pre-Shrunk 100% Pure Cotton</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Delicate skin deserves gentle touch. We hand-select pre-washed cottons that resist shrinking, bleeding, and trapping sweat, avoiding painful skin rashes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-100 text-primary-800 rounded-lg flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-primary-800">Live Sizing Verification</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Never worry about wrong fits. Tell us your child's height, and our store assistants will measure the chest or length in inches live with a tape before delivery.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary-100 text-primary-800 rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-primary-800">Local Heritage & Proximity</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Located in Kemps Corner, we are a short distance away from Malabar Hill, Breach Candy, Pedder Road, and Altamount Road. Get fast local doorstep delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Local trust visual mockup */}
        <div className="bg-primary-50 border border-primary-100 rounded-3xl p-8 space-y-6">
          <h3 className="font-heading font-bold text-xl text-primary-800 text-center">Our Sourcing Standards</h3>
          <div className="space-y-4 text-xs font-semibold">
            <div className="flex justify-between border-b border-primary-100 pb-2">
              <span className="text-slate-600">Material Base</span>
              <span className="text-primary-800">100% Combed Cotton, Muslin & Microfiber Dryfit</span>
            </div>
            <div className="flex justify-between border-b border-primary-100 pb-2">
              <span className="text-slate-600">GSM Standard (Basics)</span>
              <span className="text-primary-800">180 GSM (Opaque, durable weight)</span>
            </div>
            <div className="flex justify-between border-b border-primary-100 pb-2">
              <span className="text-slate-600">Chemical Testing</span>
              <span className="text-primary-800">Azo-free dyes, completely infant safe</span>
            </div>
            <div className="flex justify-between border-b border-primary-100 pb-2">
              <span className="text-slate-600">Stitching Quality</span>
              <span className="text-primary-800">Reinforced double-needled seams</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-600">Exchange Window</span>
              <span className="text-primary-800">Easy local sizing swap within 7 days</span>
            </div>
          </div>
          <div className="text-center pt-2">
            <Link
              href="/about"
              className="bg-primary-800 hover:bg-primary-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-md transition-colors"
            >
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Google Reviews Carousel */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">What South Bombay Parents Say</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Read real feedback from neighbors living in Altamount Road, Malabar Hill, and Breach Candy.
          </p>
        </div>
        <ReviewsCarousel />
      </section>

      {/* 8. Latest From The Blog */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div className="text-center sm:text-left space-y-2">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Latest Parenting & Clothing Guides</h2>
            <p className="text-slate-600 text-sm font-sans">Learn about sizes, weather-safe fabrics, and local South Bombay guides.</p>
          </div>
          <Link
            href="/blog"
            className="border-2 border-primary-800 text-primary-800 hover:bg-primary-50 font-bold text-sm px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-1 min-h-[44px]"
          >
            Browse All Blog Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article key={post.slug} className="bg-white border border-primary-50 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="p-6 space-y-3">
                <span className="text-[10px] text-accent-500 font-bold uppercase tracking-wider">
                  {post.category} • {post.readTime}
                </span>
                <h3 className="font-heading font-bold text-lg text-primary-800 line-clamp-2 hover:text-accent-500">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 font-sans leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-primary-50">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-primary-800 hover:text-accent-500 inline-flex items-center gap-1"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. Visit Us & Map Band */}
      <section className="bg-primary-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              🗺️ Find Us at Kemps Corner
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
              Visit Our Retail Store In South Mumbai
            </h2>
            <p className="text-sm text-primary-100 leading-relaxed font-sans">
              We are located at <strong>Kemps Corner</strong>, South Bombay. We are easily accessible from Pedder Road, Altamount Road, Breach Candy, Nepean Sea Road, and Malabar Hill.
            </p>
            <ul className="space-y-3 text-xs text-primary-200">
              <li className="flex gap-2">
                <MapPin className="w-5 h-5 text-accent-500 shrink-0" />
                <span>Warden & Sons Kids Wear, Kemps Corner, Mumbai, Maharashtra 400036</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-5 h-5 text-accent-500 shrink-0" />
                <a href="tel:+919920751567" className="hover:text-white transition-colors">
                  Call Store: +91 99207 51567
                </a>
              </li>
              <li className="flex gap-2">
                <MessageSquare className="w-5 h-5 text-accent-500 shrink-0" />
                <a href="https://wa.me/919920751567" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp Support: +91 99207 51567
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Warden+%26+Sons+Kids+Wear+Kemps+Corner+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs px-6 py-3 rounded-lg shadow-md transition-colors inline-flex items-center gap-2 min-h-[44px]"
                id="homepage-get-directions-cta"
              >
                🗺️ Open in Google Maps
              </a>
            </div>
          </div>

          {/* Map Embed Container */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary-800">
            <div className="map-container">
              {/* Center Map on Kemps Corner */}
              <iframe
                title="Warden & Sons Kids Wear Kemps Corner Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.844393080757!2d72.80332827598816!3d18.960416982218086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce074e0d9b4b%3A0xe2bc1e5f8cb4d70b!2sKemps%20Corner%2C%20Malabar%20Hill%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
