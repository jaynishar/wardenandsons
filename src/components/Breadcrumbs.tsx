import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
      <nav aria-label="Breadcrumb" className={`font-sans py-2 sm:py-3 ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.url || index} className="flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-gold/60 shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    className="text-forest font-semibold truncate max-w-[220px] sm:max-w-sm md:max-w-lg inline-block"
                    aria-current="page"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-forest transition-colors text-muted hover:underline"
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
