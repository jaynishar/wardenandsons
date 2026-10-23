import React from 'react';
import { getBlogPosts } from '@/lib/blog';
import BlogFilterList from '@/components/BlogFilterList';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
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
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Blog', url: getCanonicalUrl('/blog') },
        ]}
      />
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
          Warden & Sons Library
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary-800 leading-tight">
          Parenting & Sizing Guides
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Expert advice on dressing kids in Mumbai, understanding cotton GSM weights, baby
          swaddling, and school uniform guides.
        </p>
      </div>

      {/* Interactive Blog List Component */}
      <BlogFilterList posts={posts} />
    </div>
  );
}
