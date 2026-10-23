import React from 'react';
import Link from 'next/link';
import { IconChevron } from '@/components/icons';
import { getBreadcrumbSchema } from '@/lib/schema';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function Breadcrumbs({
  items,
  className = '',
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  const schema = getBreadcrumbSchema(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className={`font-body text-sm py-2 sm:py-3 ${className}`.trim()}>
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[var(--ink-soft)]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.url || index} className="flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <IconChevron
                    direction="right"
                    size={12}
                    className="text-[var(--ink-soft)] opacity-60 shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="text-[var(--ink)] font-medium truncate max-w-[220px] sm:max-w-sm md:max-w-lg inline-block"
                    aria-current="page"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors hover:underline underline-offset-2"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
