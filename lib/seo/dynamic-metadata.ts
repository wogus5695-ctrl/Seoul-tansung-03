import type { Metadata } from 'next';
import { RegionItem } from '../types/regions';
import { SearchIntentItem } from '../types/intents';
import { SITE_CONFIG, OFFICIAL_SITE_ORIGIN } from '../config/site-config';
import { shouldEmitAreaServed } from '../contracts/regions-contract';
import { buildCanonicalUrl, buildPublicHref } from '../url/url-builder';
import { buildDynamicTitle } from '../contracts/intents-contract';

import { isRecoveryDynamicPage } from '../config/recovery-config';

export { buildDynamicTitle };

/**
 * Builds SSR Metadata for a dynamic keyword landing page.
 *
 * CONTRACT INVARIANTS:
 * - Title strictly starts with Exact Dynamic Keyword: {keywordRegionName} {serviceKeyword}
 * - Meta Description strictly starts with Exact Dynamic Keyword
 * - Canonical is built using the hardened buildCanonicalUrl contract
 * - Phase 6-H2B Recovery Architecture:
 *   - Exactly 15 Recovery URLs (15 regions x 탄성코트) emit { index: true, follow: true }
 *   - 1,887 Approved Non-Recovery URLs emit { index: false, follow: true }
 *   - 6 Collision Hold URLs emit { index: false, follow: false, nocache: true }
 */
export function buildDynamicMetadata(
  region: RegionItem,
  intent: SearchIntentItem,
  siteOrigin: string | null = SITE_CONFIG.siteOrigin
): Metadata {
  const regionLabel = region.displayName || region.keywordRegionName;
  const exactKeyword = `${regionLabel} ${intent.serviceKeyword}`;
  const title = intent.titleTemplate(regionLabel);
  const description = intent.descriptionTemplate(regionLabel);

  const canonicalResult = buildCanonicalUrl(
    region.keywordRegionName,
    intent.serviceKeyword,
    siteOrigin
  );

  const isCollisionHold = region.id === 'seoul-eunpyeong-sinsa' || region.publicationState === 'PUBLISHED_NOINDEX';
  const isStrictBlock = isCollisionHold || !canonicalResult.isSuccess;
  const isRecoveryIndexable = !isStrictBlock && isRecoveryDynamicPage(region.id, intent.serviceKeyword);

  const publicHref = buildPublicHref(region.keywordRegionName, intent.serviceKeyword);

  return {
    metadataBase: new URL(siteOrigin || OFFICIAL_SITE_ORIGIN),
    title,
    description,
    alternates: {
      canonical: canonicalResult.canonicalUrl || publicHref,
    },
    robots: isStrictBlock
      ? { index: false, follow: false, nocache: true }
      : isRecoveryIndexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
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
  const regionLabel = region.displayName || region.keywordRegionName;
  const exactKeyword = `${regionLabel} ${intent.serviceKeyword}`;
  const canonicalResult = buildCanonicalUrl(
    region.keywordRegionName,
    intent.serviceKeyword,
    siteOrigin
  );
  const cleanOrigin = siteOrigin ? siteOrigin.replace(/\/$/, '') : OFFICIAL_SITE_ORIGIN;
  const pageUrl = canonicalResult.canonicalUrl || `${cleanOrigin}${buildPublicHref(region.keywordRegionName, intent.serviceKeyword)}`;

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
            name: regionLabel,
          },
        }
      : {}),
    description: intent.descriptionTemplate(regionLabel),
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
        item: `${cleanOrigin}/`,
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

  // Phase 6-P1B Image Discovery Pilot Layer
  // Strictly isolated to exactly 2 Gu-level dynamic landing pages:
  // 1. 동작구 탄성코트 (seoul-dongjak-gu x 탄성코트)
  // 2. 금천구 베란다탄성코트 (seoul-geumcheon-gu x 베란다탄성코트)
  const isImagePilotPage =
    (region.id === 'seoul-dongjak-gu' && intent.serviceKeyword === '탄성코트') ||
    (region.id === 'seoul-geumcheon-gu' && intent.serviceKeyword === '베란다탄성코트');

  if (isImagePilotPage) {
    const itemListSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: '올케어 탄성코트 시공 전후 비교 사진',
      numberOfItems: 6,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'ImageObject',
            name: '베란다 탄성코트 시공 전 벽면 상태',
            contentUrl: `${cleanOrigin}/images/allcare/before-after/ba-01-before.jpg`,
            description: '베란다 탄성코트 도포 전 기존 벽면 상태',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'ImageObject',
            name: '베란다 탄성코트 시공 후 벽면 상태',
            contentUrl: `${cleanOrigin}/images/allcare/before-after/ba-01-after.png`,
            description: '베란다 탄성코트 도포 후 정돈된 벽면 상태',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'ImageObject',
            name: '세탁실 탄성코트 시공 전 벽면 상태',
            contentUrl: `${cleanOrigin}/images/allcare/before-after/ba-02-before.jpg`,
            description: '세탁실 탄성코트 도포 전 기존 벽면 상태',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'ImageObject',
            name: '세탁실 탄성코트 시공 후 벽면 상태',
            contentUrl: `${cleanOrigin}/images/allcare/before-after/ba-02-after.png`,
            description: '세탁실 탄성코트 도포 후 정돈된 벽면 상태',
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'ImageObject',
            name: '다용도실 탄성코트 시공 전 벽면 상태',
            contentUrl: `${cleanOrigin}/images/allcare/before-after/ba-03-before.jpg`,
            description: '다용도실 탄성코트 도포 전 기존 벽면 상태',
          },
        },
        {
          '@type': 'ListItem',
          position: 6,
          item: {
            '@type': 'ImageObject',
            name: '다용도실 탄성코트 시공 후 벽면 상태',
            contentUrl: `${cleanOrigin}/images/allcare/before-after/ba-03-after.jpg`,
            description: '다용도실 탄성코트 도포 후 정돈된 벽면 상태',
          },
        },
      ],
    };

    const representativeImageSchema = {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      name: '올케어 주거 공간 시공 사례 전경',
      contentUrl: `${cleanOrigin}/images/allcare/og-thumbnail.jpg`,
      description: '베란다 벽면 탄성코트 시공이 완료된 주거 공간 전경',
      width: 1200,
      height: 630,
      representativeOfPage: true,
    };

    return [serviceSchema, breadcrumbSchema, faqSchema, itemListSchema, representativeImageSchema];
  }

  return [serviceSchema, breadcrumbSchema, faqSchema];
}
