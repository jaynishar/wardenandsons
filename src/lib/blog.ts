import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  author: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  content: string;
  readTime: string;
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '').replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        date: data.date || '',
        author: data.author || 'Warden Editorial',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '/images/blog/placeholder.jpg',
        category: data.category || 'General',
        tags: data.tags || [],
        content,
        readTime: data.readTime || '3 min read',
      } as BlogPost;
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const mdxPath = path.join(blogDirectory, `${slug}.mdx`);
    const mdPath = path.join(blogDirectory, `${slug}.md`);
    let fullPath = '';

    if (fs.existsSync(mdxPath)) {
      fullPath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
      fullPath = mdPath;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      metaTitle: data.metaTitle || '',
      metaDescription: data.metaDescription || '',
      date: data.date || '',
      author: data.author || 'Warden Editorial',
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '/images/blog/placeholder.jpg',
      category: data.category || 'General',
      tags: data.tags || [],
      content,
      readTime: data.readTime || '3 min read',
    } as BlogPost;
  } catch (error) {
    console.error(`Error getting blog post by slug: ${slug}`, error);
    return null;
  }
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  const allPosts = getBlogPosts();
  return allPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}
