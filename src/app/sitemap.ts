import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { getCanonicalUrl } from '@/config/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Canonical indexable static routes (with Next.js trailingSlash: true)
  const staticRoutes: { path: string; changeFrequency: 'weekly' | 'monthly'; priority: number }[] = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/shop', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/shop/newborn', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/shop/boys', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/shop/girls', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/shop/men', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/shop/women', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/shop/bulk', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/visit-us', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/bulk-orders', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/whatsapp-shopping', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/video-shopping', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/reviews', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/shipping-returns', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/privacy-policy', changeFrequency: 'monthly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'monthly', priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: getCanonicalUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic Blog entries with factual post dates from frontmatter
  const blogPosts = getBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: getCanonicalUrl(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date).toISOString().split('T')[0] : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
