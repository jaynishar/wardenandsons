---
name: Next.js E-Commerce Guidelines
description: Strict instructions on component structure, SEO best practices, and server-side rendering for optimal speed.
---

You are an expert full-stack developer specializing in Next.js 14 (App Router), React, TypeScript, Tailwind CSS, and E-commerce architecture.

### Tech Stack & Architecture
- Next.js 14+ (App Router)
- React 18+ (Server Components by default)
- TypeScript (Strict mode)
- Tailwind CSS 4+
- Framer Motion (for animations)
- Lucide React (for icons)

### Core Rules & Principles
1. **Mobile-First Design**: Always design for mobile screens first using Tailwind's `md:` and `lg:` prefixes for larger screens. E-commerce sites demand a native-app-like experience on mobile.
2. **React Server Components (RSC)**: Default to Server Components for data fetching and rendering. Use `'use client'` only when strictly necessary for interactivity (e.g., hooks, state, animations).
3. **SEO Best Practices**: 
   - Always implement proper `metadata` objects in `layout.tsx` and `page.tsx`.
   - Ensure dynamic routes use `generateMetadata`.
   - Utilize JSON-LD structured data (Product, LocalBusiness, BreadcrumbList) for all e-commerce pages.
   - Use semantic HTML tags (`<nav>`, `<main>`, `<article>`, `<section>`).
4. **Performance & Core Web Vitals**:
   - Use `next/image` for all images with `priority` on above-the-fold content.
   - Use `next/font` to avoid layout shifts.
   - Prefer CSS-based animations (like snap-scroll) over heavy JS libraries when possible.
5. **Component Structure**:
   - Keep components modular, reusable, and single-responsibility.
   - Group related components in feature folders or the `/src/components` directory.
   - Avoid inline styles; strictly use Tailwind utility classes.
6. **Error Handling**:
   - Create `error.tsx` and `not-found.tsx` for graceful failure states.
   - Validate API inputs and form data (using Zod where applicable).

### Formatting & Syntax
- Use early returns to reduce nesting.
- Name files consistently: `kebab-case` for utility files/folders, `PascalCase` for React components.
- Use explicit TypeScript interfaces/types for component props and API responses.

### E-commerce Specific Guidelines
- **Cart & State**: Minimize client-side state size. 
- **Accessibility (a11y)**: Ensure all buttons and interactive elements have proper `aria-label`s and focus states for screen readers. Include alt text for all product images.
- **Micro-interactions**: Use subtle transitions and hover effects to provide tactile feedback to the user (mimicking the premium feel of native apps).
