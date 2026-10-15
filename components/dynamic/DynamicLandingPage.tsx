import React from 'react';
import { RegionItem } from '../../lib/types/regions';
import { SearchIntentItem } from '../../lib/types/intents';
import { buildDynamicJsonLd } from '../../lib/seo/dynamic-metadata';
import { DynamicTitleSync } from './DynamicTitleSync';
import { HeroSection } from '../sections/HeroSection';
import { WallCheckSection } from '../sections/WallCheckSection';
import { BeforeAfterSection } from '../sections/BeforeAfterSection';
import { ResidentialSpacesSection } from '../sections/ResidentialSpacesSection';
import { DecisionGuideSection } from '../sections/DecisionGuideSection';
import { HowAllcareWorksSection } from '../sections/HowAllcareWorksSection';
import { FaqSection } from '../sections/FaqSection';
import { RelatedIntentLinksSection } from './RelatedIntentLinksSection';
import { FinalCtaSection } from '../sections/FinalCtaSection';

interface DynamicLandingPageProps {
  readonly region: RegionItem;
  readonly intent: SearchIntentItem;
}

export function DynamicLandingPage({ region, intent }: DynamicLandingPageProps) {
  const jsonLdData = buildDynamicJsonLd(region, intent);

  return (
    <main className="flex-1 flex flex-col">
      {/* Dynamic Browser Tab Title Client-Side Synchronization (Phase 6-G2A) */}
      <DynamicTitleSync
        keywordRegionName={region.keywordRegionName}
        serviceKeyword={intent.serviceKeyword}
      />

      {/* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 02 HERO */}
      <HeroSection dynamic={{ region, intent }} />

      {/* 03 WALL CHECK POINTS */}
      <WallCheckSection dynamic={{ region, intent }} />

      {/* 04 BEFORE & AFTER */}
      <BeforeAfterSection showDisclaimer />

      {/* 05 RESIDENTIAL SPACES (Distributed Regional Typology Context) */}
      <ResidentialSpacesSection dynamic={{ region, intent }} />

      {/* 06 DECISION FLOW & DISTRIBUTED LOCAL FACT CHECK */}
      <DecisionGuideSection dynamic={{ region, intent }} />

      {/* 07 WORK TIMELINE */}
      <HowAllcareWorksSection />

      {/* 08 CUSTOMER REVIEWS UNMOUNTED PER PHASE 6-H2B RECOVERY CONTRACT */}

      {/* 09 FAQ (Intent-specific FAQs with Region Context Safe Adapter) */}
      <FaqSection items={intent.faqItems} dynamic={{ region, intent }} />

      {/* 08-B Related Search Intent & Recovery Regional Navigation */}
      <RelatedIntentLinksSection region={region} currentIntent={intent} />

      {/* 09 FINAL CONSULTATION CTA */}
      <FinalCtaSection dynamic={{ region, intent }} />
    </main>
  );
}
