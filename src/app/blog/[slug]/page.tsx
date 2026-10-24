import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from '@/lib/blog';
import { marked } from 'marked';
import { Calendar, User, Clock, ArrowLeft, MessageSquare, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import JsonLd from '@/components/JsonLd';
import { getBlogPostingSchema } from '@/lib/schema';
import TrustMarquee from '@/components/TrustMarquee';

import { getCanonicalUrl, buildPageMetadata } from '@/config/site';
import { BUSINESS_CONFIG } from '@/config/business';
import { getAuthorBox } from '@/lib/owner-inputs';

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

  const postTitle = post.metaTitle || post.title;
  const postDesc = post.metaDescription || post.excerpt;

  return buildPageMetadata({
    path: `/blog/${post.slug}`,
    title: { absolute: postTitle },
    description: postDesc,
    type: 'article',
    publishedTime: post.date,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  // Parse markdown content safely on the server side
  const htmlContent = await marked.parse(post.content);

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  const blogSchema = getBlogPostingSchema(post);
  const authorBox = getAuthorBox();

  return (
    <div className="bg-white font-sans text-[var(--ink)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 font-sans">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: getCanonicalUrl('/') },
            { name: 'Blog', url: getCanonicalUrl('/blog') },
            { name: post.title, url: getCanonicalUrl(`/blog/${post.slug}`) },
          ]}
        />
        <JsonLd schema={blogSchema} />

        <article className="mt-6">
          {/* Post Header */}
          <header className="space-y-4 mb-10 pb-8 border-b-2 border-[var(--ink)]/15">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] leading-[1.08]">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--ink)]/75 font-medium">
              <span className="bg-[var(--blue)] text-white text-xs font-bold px-2.5 py-1">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[var(--ink)]/70" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[var(--ink)]/70" /> By {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[var(--ink)]/70" /> {post.readTime}
              </span>
            </div>
          </header>

          {/* Post Content rendering static HTML */}
          <div
            className="prose prose-neutral max-w-none text-base text-[var(--ink)]/85 leading-relaxed font-sans space-y-4 [&_hr]:border-0 [&_hr]:h-0 [&_hr]:my-8 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-[var(--ink)] [&_h2]:scroll-mt-20 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[var(--ink)]"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Back button */}
          <div className="mt-10 pt-6 border-t-2 border-[var(--ink)]/15">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--ink)] hover:text-[var(--red)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back
              to all guides
            </Link>
          </div>

          {/* Optional Author Box (controlled via owner-inputs) */}
          {authorBox && (
            <div className="mt-12 p-6 sm:p-8 bg-[var(--surface)] border-2 border-[var(--ink)] flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--ink)] text-white font-black text-lg flex items-center justify-center shrink-0">
                {authorBox.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-base text-[var(--ink)]">{authorBox.name}</h3>
                <p className="text-base text-[var(--ink)]/75 leading-relaxed">{authorBox.bio}</p>
              </div>
            </div>
          )}

          {/* WhatsApp Support footer band inside article */}
          <div className="bg-[var(--surface)] border-2 border-[var(--ink)] p-6 sm:p-8 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h2 className="font-black text-base text-[var(--ink)]">
                Have questions or looking for specific sizes?
              </h2>
              <p className="text-base text-[var(--ink)]/75">
                Chat directly with our Kemps Corner store desk on WhatsApp for fabric details and home delivery.
              </p>
            </div>
            <a
              href={BUSINESS_CONFIG.phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0F7B4F] text-white font-bold text-sm px-6 py-3.5 border-2 border-[#0F7B4F] flex items-center gap-2 shrink-0 transition-opacity hover:opacity-95"
            >
              <MessageSquare className="w-4 h-4 text-white" /> Chat on WhatsApp
            </a>
          </div>
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="bg-[var(--surface)] p-8 sm:p-12 mt-16 space-y-8">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)] tracking-tight">
                Related Parenting &amp; Sizing Guides
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(rPost => (
                <article
                  key={rPost.slug}
                  className="bg-white p-6 flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-transform border-2 border-[var(--ink)]/15"
                >
                  <div className="space-y-3">
                    <span className="text-xs text-[var(--blue)] font-bold">
                      {rPost.category}
                    </span>
                    <h3 className="font-black text-base text-[var(--ink)] leading-snug line-clamp-2 hover:text-[var(--red)] transition-colors">
                      <Link href={`/blog/${rPost.slug}/`}>{rPost.title}</Link>
                    </h3>
                    <p className="text-sm text-[var(--ink)]/75 line-clamp-2 leading-relaxed">
                      {rPost.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t-2 border-[var(--ink)]/15">
                    <Link
                      href={`/blog/${rPost.slug}/`}
                      className="text-sm font-bold text-[var(--ink)] hover:text-[var(--red)] inline-flex items-center gap-1.5 transition-colors"
                    >
                      Read guide <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <TrustMarquee />
    </div>
  );
}
