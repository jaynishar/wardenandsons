import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://wardenandsons.com';

  // Static URLs
  const staticRoutes = [
    '',
    '/about',
    '/shop',
    '/shop/newborn',
    '/shop/boys',
    '/shop/girls',
    '/shop/men',
    '/shop/women',
    '/whatsapp-shopping',
    '/video-shopping',
    '/bulk-orders',
    '/visit-us',
    '/blog',
    '/contact',
    '/reviews',
    '/privacy-policy',
    '/terms',
    '/shipping-returns',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/shop') || route === '/video-shopping' || route === '/whatsapp-shopping' ? 0.8 : 0.6,
  }));

  // Dynamic Blog URLs
  const blogPosts = getBlogPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
