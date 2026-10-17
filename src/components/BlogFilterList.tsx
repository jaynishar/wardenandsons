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
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        post.category.toLowerCase() === selectedCategory.toLowerCase() ||
        post.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 font-sans">
      {/* Filters & Search Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white border border-border-soft p-6 rounded-2xl shadow-xs">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border-soft text-xs font-sans focus:outline-none focus:ring-2 focus:ring-forest bg-bg-cream/40 focus:bg-white"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
        </div>

        {/* Category Filter Desktop view scroll bar */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none scroll-smooth">
          <span className="text-xs font-bold text-gray-500 shrink-0 font-sans hidden md:inline">Filters:</span>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors min-h-[38px] cursor-pointer active:scale-[0.98] ${
                  selectedCategory === cat
                    ? 'bg-forest text-white'
                    : 'bg-bg-cream text-forest border border-border-soft hover:bg-forest/5'
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-border-soft rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-[10px] text-gold font-bold uppercase tracking-wider">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-forest line-clamp-2 hover:text-gold transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-muted line-clamp-3 leading-relaxed font-sans">
                  {post.excerpt}
                </p>
                <div className="flex items-center space-x-4 pt-2 text-[10px] text-gray-400 font-semibold font-sans">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {post.author}
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6 pt-3 border-t border-border-soft">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-forest hover:text-gold inline-flex items-center gap-1 transition-colors"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-border-soft rounded-2xl shadow-xs">
          <p className="text-muted text-sm font-sans">No parenting articles found matching your query.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-xs font-bold text-gold hover:underline mt-2 cursor-pointer active:scale-[0.98]"
          >
            Clear Filters & Search
          </button>
        </div>
      )}
    </div>
  );
}
