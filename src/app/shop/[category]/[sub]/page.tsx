import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubcategoryHero from '@/components/SubcategoryHero';
import { Marker } from '@/components/ui/Marker';
import {
  allSubcategories,
  getCategory,
  getSub,
  subsOf,
  stylesOf,
  isReady,
} from '@/data/catalogue';
import { BUSINESS_CONFIG } from '@/config/business';
import { getCanonicalUrl, buildPageMetadata } from '@/config/site';

interface SubCategoryPageProps {
  params: Promise<{ category: string; sub: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return allSubcategories().map((s) => ({
    category: s.categorySlug,
    sub: s.slug,
  }));
}

export async function generateMetadata({ params }: SubCategoryPageProps): Promise<Metadata> {
  const { category: catSlug, sub: subSlug } = await params;
  const category = getCategory(catSlug);
  const sub = getSub(catSlug, subSlug);

  if (!category || !sub) {
    return {
      title: 'Not Found',
    };
  }

  const titleString = `${sub.label} for ${category.label} | Warden & Sons`;
  const ready = isReady(sub);

  const baseMetadata = buildPageMetadata({
    path: `/shop/${catSlug}/${subSlug}`,
    title: { absolute: titleString },
    description: sub.seoDescription,
  });

  if (!ready) {
    baseMetadata.robots = { index: false, follow: true };
  }

  return baseMetadata;
}

export default async function SubcategoryPage({ params }: SubCategoryPageProps) {
  const { category: catSlug, sub: subSlug } = await params;
  const category = getCategory(catSlug);
  const sub = getSub(catSlug, subSlug);

  if (!category || !sub) {
    return notFound();
  }

  const featuredStyles = stylesOf(sub);
  const siblings = subsOf(catSlug).filter((s) => s.slug !== subSlug);

  // Subtitle strictly max 25 words
  const subtitleWords = sub.seoDescription.split(/\s+/).slice(0, 22).join(' ') + '.';

  const askMessage = `Hi Warden & Sons! I'm interested in ${sub.label} for ${category.label}. Could you please share available options and sizing from your Kemps Corner store?`;
  const askUrl = BUSINESS_CONFIG.whatsappUrl(askMessage);

  return (
    <div className="py-6 sm:py-10">
      <Container>
        <Breadcrumbs
          items={[
            { name: 'Home', url: getCanonicalUrl('/') },
            { name: 'Shop', url: getCanonicalUrl('/shop') },
            { name: category.label, url: getCanonicalUrl(`/shop/${catSlug}`) },
            { name: sub.label, url: getCanonicalUrl(`/shop/${catSlug}/${subSlug}`) },
          ]}
        />

        {/* Header */}
        <div className="pt-2 pb-6 sm:pb-8 border-b border-[var(--line)] space-y-3">
          <h1 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] tracking-tight">
            {sub.label} for {category.label}
          </h1>
          <p className="text-base text-[var(--ink-soft)] max-w-2xl leading-relaxed">
            {subtitleWords}
          </p>
        </div>

        {/* Interactive Hero, Age Chips, Add to List & Featured Styles */}
        <div className="py-8 sm:py-12 space-y-12">
          <SubcategoryHero
            sub={sub}
            category={category}
            featuredStyles={featuredStyles}
          />

          {/* Assistance & Ask on WhatsApp Line */}
          <div className="p-4 sm:p-5 rounded-[6px] bg-[var(--paper)] border border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-sm font-medium text-[var(--ink)]">
                Have a question about {sub.label.toLowerCase()} or need custom measurements?
              </p>
              <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                Our shop desk checks live racks and confirms measurements with a physical tape.
              </p>
            </div>
            <a
              href={askUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="product"
              data-track-category={catSlug}
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] bg-[var(--ink)] text-[var(--ivory)] hover:bg-[#203155] transition-colors shrink-0"
            >
              Ask on WhatsApp &rarr;
            </a>
          </div>

          {/* More in <Category> Sibling Subcategories Row */}
          {siblings.length > 0 && (
            <div className="pt-6 border-t border-[var(--line)] space-y-4">
              <div className="flex items-center gap-2">
                <Marker color="yellow" />
                <h2 className="font-display text-xs uppercase tracking-widest text-[var(--ink-soft)] font-medium">
                  More in {category.label}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={`/shop/${catSlug}/${sibling.slug}/`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--ink-soft)] text-xs sm:text-sm font-medium text-[var(--ink)] transition-colors"
                  >
                    <span>{sibling.label}</span>
                    <span className="text-[10px] text-[var(--ink-soft)] font-normal">
                      ({sibling.styleIds.length > 0 ? `${sibling.styleIds.length} styles` : 'Enquire'})
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
