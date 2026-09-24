import type { Metadata } from 'next';
import { RegionItem } from '../types/regions';
import { SearchIntentItem } from '../types/intents';
import { SITE_CONFIG } from '../config/site-config';
import { shouldEmitAreaServed } from '../contracts/regions-contract';
import { buildCanonicalUrl, buildPublicHref } from '../url/url-builder';

/**
 * Builds SSR Metadata for a dynamic keyword landing page.
 *
 * CONTRACT INVARIANTS:
 * - Title strictly starts with Exact Dynamic Keyword: {keywordRegionName} {serviceKeyword}
 * - Meta Description strictly starts with Exact Dynamic Keyword
 * - Canonical is built using the hardened buildCanonicalUrl contract
 * - Test fixture and draft regions strictly emit NOINDEX
 */
export function buildDynamicMetadata(
  region: RegionItem,
  intent: SearchIntentItem,
  siteOrigin: string | null = SITE_CONFIG.siteOrigin
): Metadata {
  const exactKeyword = `${region.keywordRegionName} ${intent.serviceKeyword}`;
  const title = intent.titleTemplate(region.keywordRegionName);
  const description = intent.descriptionTemplate(region.keywordRegionName);

  const canonicalResult = buildCanonicalUrl(
    region.keywordRegionName,
    intent.serviceKeyword,
    siteOrigin
  );

  // In Phase 4-A, all test fixtures and unverified regions must be NOINDEX
  const isProductionIndexable =
    process.env.NODE_ENV === 'production' &&
    region.publicationState === 'INDEXABLE' &&
    canonicalResult.isSuccess;

  const publicHref = buildPublicHref(region.keywordRegionName, intent.serviceKeyword);

  return {
    metadataBase: new URL(siteOrigin || 'http://localhost:3000'),
    title,
    description,
    alternates: {
      canonical: canonicalResult.canonicalUrl || publicHref,
    },
    robots: isProductionIndexable
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
      url: canonicalResult.canonicalUrl || publicHref,
      images: [
        {
          url: '/images/allcare/og-thumbnail.jpg',
          width: 1200,
          height: 630,
          alt: `${exactKeyword} - ${SITE_CONFIG.brandName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/allcare/og-thumbnail.jpg'],
    },
  };
}

/**
 * Builds JSON-LD structured data for the dynamic page:
 * - Service schema
 * - BreadcrumbList schema
 * - FAQPage schema (5 intent-specific Q&A pairs)
 *
 * SAFETY RULE:
 * No fake addresses, ratings, reviews, or fake office locations.
 */
export function buildDynamicJsonLd(
  region: RegionItem,
  intent: SearchIntentItem,
  siteOrigin: string | null = SITE_CONFIG.siteOrigin
) {
  const exactKeyword = `${region.keywordRegionName} ${intent.serviceKeyword}`;
  const canonicalResult = buildCanonicalUrl(
    region.keywordRegionName,
    intent.serviceKeyword,
    siteOrigin
  );
  const cleanOrigin = siteOrigin ? siteOrigin.replace(/\/$/, '') : '';
  const pageUrl = canonicalResult.canonicalUrl || (cleanOrigin ? `${cleanOrigin}${buildPublicHref(region.keywordRegionName, intent.serviceKeyword)}` : buildPublicHref(region.keywordRegionName, intent.serviceKeyword));

  const emitAreaServed = shouldEmitAreaServed(region);

  const serviceSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: exactKeyword,
    serviceType: intent.serviceKeyword,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      legalName: SITE_CONFIG.businessName,
      telephone: SITE_CONFIG.phone || undefined,
    },
    ...(emitAreaServed
      ? {
          areaServed: {
            '@type': 'AdministrativeArea',
            name: region.displayName || region.keywordRegionName,
          },
        }
      : {}),
    description: intent.descriptionTemplate(region.keywordRegionName),
    url: pageUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: cleanOrigin ? `${cleanOrigin}/` : '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: exactKeyword,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: intent.faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return [serviceSchema, breadcrumbSchema, faqSchema];
}
