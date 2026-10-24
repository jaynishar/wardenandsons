import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubcategoryHero from '@/components/SubcategoryHero';
import { TrustMarquee } from '@/components/TrustMarquee';
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
    <div className="py-6 sm:py-10 font-sans">
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
        <div className="pt-2 pb-6 sm:pb-8 space-y-3">
          <h1 className="font-sans font-medium text-4xl sm:text-5xl lg:text-[66px] leading-[1.05] text-[var(--ink)] tracking-tight">
            {sub.label} for {category.label}
          </h1>
          <p className="text-base sm:text-lg text-[var(--ink)] max-w-2xl leading-relaxed">
            {subtitleWords}
          </p>
        </div>

        {/* Interactive Hero, Age Chips, Add to List & Featured Styles */}
        <div className="py-6 sm:py-10 space-y-12">
          <SubcategoryHero
            sub={sub}
            category={category}
            featuredStyles={featuredStyles}
          />

          {/* Assistance & Ask on WhatsApp Line */}
          <div className="p-5 bg-[var(--surface)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-base font-medium text-[var(--ink)]">
                Have a question about {sub.label.toLowerCase()} or need custom measurements?
              </p>
              <p className="text-sm text-[var(--muted)] mt-0.5">
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
              className="h-[48px] px-6 inline-flex items-center justify-center text-sm font-sans font-medium bg-[var(--ink)] text-white hover:bg-[var(--blue)] transition-colors shrink-0"
            >
              Ask on WhatsApp &rarr;
            </a>
          </div>

          {/* More in <Category> Sibling Subcategories Row */}
          {siblings.length > 0 && (
            <div className="pt-6 space-y-4">
              <h2 className="font-sans text-sm font-medium text-[var(--muted)]">
                More in {category.label}
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={`/shop/${catSlug}/${sibling.slug}/`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface)] text-sm font-medium text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
                  >
                    <span>{sibling.label}</span>
                    <span className="text-xs text-[var(--muted)] font-normal">
                      ({sibling.styleIds.length > 0 ? `${sibling.styleIds.length} styles` : 'Enquire'})
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Brand Trust Strip */}
      <div className="mt-12 sm:mt-16">
        <TrustMarquee />
      </div>
    </div>
  );
}
