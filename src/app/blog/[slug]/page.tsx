import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation'; // In Next 15, notFound is imported from next/navigation
import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import { marked } from 'marked';
import { Calendar, User, Clock, ArrowLeft, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

import { SITE_URL, getCanonicalUrl } from '@/config/site';
import { BUSINESS_CONFIG } from '@/config/business';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const postCanonical = getCanonicalUrl(`/blog/${post.slug}`);

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: postCanonical,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: postCanonical,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${SITE_URL}/brand_logo.jpg`,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [`${SITE_URL}/brand_logo.jpg`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    // Return Next.js not found page
    return notFound();
  }

  // Parse markdown content safely on the server side
  const htmlContent = await marked.parse(post.content);

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  // Compile BlogPosting Schema dynamically
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}/brand_logo.jpg`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: BUSINESS_CONFIG.name,
      url: getCanonicalUrl('/'),
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand_logo.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getCanonicalUrl(`/blog/${post.slug}`),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="py-12 md:py-20 font-sans">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-800 hover:text-accent-500 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back
            to blog
          </Link>

          {/* Post Header */}
          <header className="space-y-4 mb-8 border-b border-primary-50 pb-8">
            <span className="inline-block bg-primary-100 text-primary-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-800 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold font-sans">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> By {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </header>

          {/* Post Content rendering static HTML */}
          <div
            className="prose text-xs sm:text-sm text-slate-700 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* WhatsApp Support footer band inside article */}
          <div className="bg-primary-50 border border-primary-100 p-6 rounded-2xl shadow-sm mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-heading font-bold text-sm text-primary-800">
                Like something mentioned in this guide?
              </h4>
              <p className="text-[11px] text-slate-500 font-sans">
                Chat on WhatsApp to request sizes or home delivery details.
              </p>
            </div>
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 shrink-0"
            >
              <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="bg-warm-neutral border-t border-primary-50 py-16 mt-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-10">
              <h2 className="font-heading text-2xl font-bold text-primary-800 text-center">
                Related Parenting Guides
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(rPost => (
                  <article
                    key={rPost.slug}
                    className="bg-white border border-primary-50 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
                  >
                    <div className="p-6 space-y-3">
                      <span className="text-[10px] text-accent-500 font-bold uppercase tracking-wider">
                        {rPost.category}
                      </span>
                      <h3 className="font-heading font-bold text-base text-primary-800 line-clamp-2 hover:text-accent-500">
                        <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans">
                        {rPost.excerpt}
                      </p>
                    </div>
                    <div className="px-6 pb-6 pt-2 border-t border-primary-50">
                      <Link
                        href={`/blog/${rPost.slug}`}
                        className="text-xs font-bold text-primary-800 hover:text-accent-500 inline-flex items-center gap-1"
                      >
                        Read Full Guide <span className="text-xs">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
