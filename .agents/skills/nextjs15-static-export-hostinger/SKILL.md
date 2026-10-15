---
name: Next.js 15 Static Export & Hostinger Deployment
description: Configuration, build rules, client-side routing, and zero-server architecture for Next.js 15 static export deployed to Hostinger.
---

# Next.js 15 Static Export & Hostinger Deployment

Complete operational guide for static export (`output: 'export'`) with Next.js 15 App Router.

## 1. `next.config.ts` Configuration
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static HTML export unless using custom loader
  },
};

export default nextConfig;
```

---

## 2. Dynamic Route Rules (`generateStaticParams`)
Every dynamic route folder (such as `/shop/[category]`) MUST implement `generateStaticParams()` to allow Next.js to pre-render every page into static HTML during `npm run build`:

```typescript
export async function generateStaticParams() {
  return [
    { category: 'newborn' },
    { category: 'boys' },
    { category: 'girls' },
    { category: 'men' },
    { category: 'women' },
  ];
}
```

---

## 3. Client State & Hydration Safety
- When using Zustand with `persist` middleware in Next.js, always protect against SSR/SSG hydration mismatch.
- Use a custom hook or `useEffect` to ensure cart state is only rendered after mount:
```typescript
const [isMounted, setIsMounted] = useState(false);
useEffect(() => {
  setIsMounted(true);
}, []);
```

---

## 4. Hostinger `.htaccess` for Clean URLs
Place an `.htaccess` file in `/public` so it gets copied to `out/` on build:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Rewrite HTML files to pretty URLs
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
  
  # Enable Gzip / Brotli compression
  <IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
  </IfModule>
</IfModule>
```
