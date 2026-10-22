import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { getCanonicalUrl } from '@/config/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Canonical indexable static routes (with Next.js trailingSlash: true)
  const staticPaths: string[] = [
    '',
    '/shop',
    '/shop/newborn',
    '/shop/boys',
    '/shop/girls',
    '/shop/men',
    '/shop/women',
    '/shop/bulk',
    '/size-guide',
    '/how-it-works',
    '/about',
    '/visit-us',
    '/bulk-orders',
    '/blog',
    '/contact',
    '/shipping-returns',
    '/privacy-policy',
    '/terms',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(path => ({
    url: getCanonicalUrl(path),
    lastModified: '2026-10-22',
  }));

  // Dynamic Blog entries with factual publication dates from MDX frontmatter
  const blogPosts = getBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: getCanonicalUrl(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date).toISOString().split('T')[0] : undefined,
  }));

  return [...staticEntries, ...blogEntries];
}
