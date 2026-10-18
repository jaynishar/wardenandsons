import React from 'react';
import { getBreadcrumbSchema } from '@/lib/schema';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = getBreadcrumbSchema(items);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
