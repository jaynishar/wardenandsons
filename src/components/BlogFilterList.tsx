'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogFilterListProps {
  posts: BlogPost[];
}

const categories = [
  'All',
  'Newborn',
  'Boys',
  'Girls',
  'Nightwear',
  'Sportswear',
  'Winterwear',
  'Shopping Guides',
  'Local Guides',
  'Bulk Orders',
];

export default function BlogFilterList({ posts }: BlogFilterListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        post.category.toLowerCase() === selectedCategory.toLowerCase() ||
        post.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 font-sans">
      {/* Filters & Search Row */}
      <div className="bg-[var(--surface)] p-6 space-y-4 md:space-y-0 md:flex md:gap-6 md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search articles and guides..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[var(--ink)] text-sm text-[var(--ink)] placeholder:text-[var(--ink)]/50 focus:outline-none"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[var(--ink)]/50 pointer-events-none" />
        </div>

        {/* Category Filter Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-sm font-bold text-[var(--ink)] shrink-0 hidden lg:inline mr-1">
            Category:
          </span>
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm px-3.5 py-2 whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--ink)] text-white font-bold'
                    : 'bg-white text-[var(--ink)] border-2 border-[var(--ink)]/20 hover:border-[var(--ink)] font-semibold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map(post => (
            <article
              key={post.slug}
              className="bg-[var(--surface)] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:translate-y-[-2px] transition-transform"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[13px] font-bold">
                  <span className="text-[var(--blue)]">{post.category}</span>
                  <span className="text-[var(--ink)]/60 font-medium">{post.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--ink)] tracking-tight leading-snug hover:text-[var(--red)] transition-colors">
                  <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-[var(--ink)]/75 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[13px] text-[var(--ink)]/60 font-medium pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> {post.author}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-[var(--ink)]/15">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="text-sm font-bold text-[var(--ink)] hover:text-[var(--red)] inline-flex items-center gap-1.5 transition-colors"
                >
                  Read full guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[var(--surface)] p-8 space-y-4">
          <p className="text-[var(--ink)] text-base font-medium">
            No parenting articles found matching your query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-sm font-bold text-[var(--blue)] underline cursor-pointer"
          >
            Clear filters &amp; search
          </button>
        </div>
      )}
    </div>
  );
}
