import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { getCanonicalUrl } from '@/config/site';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

function getGitLastMod(relativeFilePath: string, fallbackDate: string = '2026-10-23'): string {
  try {
    const fullPath = path.join(process.cwd(), relativeFilePath);
    if (fs.existsSync(fullPath)) {
      const gitDate = execSync(`git log -1 --format=%cs -- "${relativeFilePath}"`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim();
      if (gitDate && /^\d{4}-\d{2}-\d{2}$/.test(gitDate)) {
        return gitDate;
      }
      const stats = fs.statSync(fullPath);
      return stats.mtime.toISOString().split('T')[0];
    }
  } catch {
    // fallback if git is unavailable in environment
  }
  return fallbackDate;
}

const STATIC_ROUTE_FILES: Record<string, string> = {
  '': 'src/app/page.tsx',
  '/shop': 'src/app/shop/page.tsx',
  '/shop/newborn': 'src/app/shop/[category]/page.tsx',
  '/shop/boys': 'src/app/shop/[category]/page.tsx',
  '/shop/girls': 'src/app/shop/[category]/page.tsx',
  '/shop/men': 'src/app/shop/[category]/page.tsx',
  '/shop/women': 'src/app/shop/[category]/page.tsx',
  '/size-guide': 'src/app/size-guide/page.tsx',
  '/how-it-works': 'src/app/how-it-works/page.tsx',
  '/about': 'src/app/about/page.tsx',
  '/visit-us': 'src/app/visit-us/page.tsx',
  '/bulk-orders': 'src/app/bulk-orders/page.tsx',
  '/blog': 'src/app/blog/page.tsx',
  '/contact': 'src/app/contact/page.tsx',
  '/shipping-returns': 'src/app/shipping-returns/page.tsx',
  '/privacy-policy': 'src/app/privacy-policy/page.tsx',
  '/terms': 'src/app/terms/page.tsx',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Canonical indexable static routes (with Next.js trailingSlash: true)
  const staticEntries: MetadataRoute.Sitemap = Object.entries(STATIC_ROUTE_FILES).map(
    ([routePath, filePath]) => ({
      url: getCanonicalUrl(routePath),
      lastModified: getGitLastMod(filePath),
    })
  );

  // Dynamic Blog entries with real lastmod (git date or MDX frontmatter date)
  const blogPosts = getBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map(post => {
    const mdxPath = `src/content/blog/${post.slug}.mdx`;
    const fallbackDate = post.date ? new Date(post.date).toISOString().split('T')[0] : '2026-10-23';
    return {
      url: getCanonicalUrl(`/blog/${post.slug}`),
      lastModified: getGitLastMod(mdxPath, fallbackDate),
    };
  });

  return [...staticEntries, ...blogEntries];
}
