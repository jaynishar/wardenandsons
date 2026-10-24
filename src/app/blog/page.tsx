import React from 'react';
import { getBlogPosts } from '@/lib/blog';
import BlogFilterList from '@/components/BlogFilterList';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import TrustMarquee from '@/components/TrustMarquee';
import type { Metadata } from 'next';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  path: '/blog',
  title: { absolute: "Parenting Guides & Cotton Care Advice | Warden & Sons" },
  description: "Practical parenting guides on pure cotton babywear, kids clothing size charts, gentle fabric care, and local shopping advice in South Mumbai.",
});

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <div className="bg-white font-sans text-[var(--ink)]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Blog', url: getCanonicalUrl('/blog') },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 space-y-10">
        {/* Editorial Header */}
        <header className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[var(--red)]" />
            <span className="text-sm font-bold text-[var(--ink)]">
              Store Library · Sizing &amp; Fabric Advice
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[66px] font-black tracking-tight text-[var(--ink)] leading-[1.05]">
            Parenting, Sizing &amp; Pure Cotton Guides
          </h1>
          <p className="text-base sm:text-lg text-[var(--ink)]/80 leading-relaxed max-w-2xl">
            Practical advice from our Kemps Corner shop floor on dressing kids in Mumbai humidity, understanding cotton weaves, swaddling newborns, and choosing durable school essentials.
          </p>
        </header>

        {/* Interactive Blog List Component */}
        <BlogFilterList posts={posts} />
      </div>

      <TrustMarquee />
    </div>
  );
}
