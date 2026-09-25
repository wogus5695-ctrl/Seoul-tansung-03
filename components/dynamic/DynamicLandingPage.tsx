import React from 'react';
import { RegionItem } from '../../lib/types/regions';
import { SearchIntentItem } from '../../lib/types/intents';
import { buildDynamicJsonLd } from '../../lib/seo/dynamic-metadata';
import { DynamicHeroSection } from './DynamicHeroSection';
import { IntentProblemSection } from './IntentProblemSection';
import { DynamicBeforeAfterSection } from './DynamicBeforeAfterSection';
import { RegionEvidenceSection } from './RegionEvidenceSection';
import { IntentWorkGuideSection } from './IntentWorkGuideSection';
import { RelatedIntentLinksSection } from './RelatedIntentLinksSection';
import { DynamicFaqSection } from './DynamicFaqSection';
import { FinalCtaSection } from '../sections/FinalCtaSection';

interface DynamicLandingPageProps {
  readonly region: RegionItem;
  readonly intent: SearchIntentItem;
}

export function DynamicLandingPage({ region, intent }: DynamicLandingPageProps) {
  const jsonLdData = buildDynamicJsonLd(region, intent);

  return (
    <main className="flex-1 flex flex-col">
      {/* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 01 Dynamic Hero (Exact H1 + Empathy Intro + CTA) */}
      <DynamicHeroSection region={region} intent={intent} />

      {/* 02 Intent-Specific Problem & Checkpoints */}
      <IntentProblemSection region={region} intent={intent} />

      {/* 03 Before & After Visual Evidence */}
      <DynamicBeforeAfterSection />

      {/* 03-B Verified Region Evidence (Phase 6-C0C-1) */}
      <RegionEvidenceSection region={region} intent={intent} />

      {/* 04 Work Process & Decision Standards */}
      <IntentWorkGuideSection />

      {/* 05 Related Search Intent Internal Links */}
      <RelatedIntentLinksSection region={region} currentIntent={intent} />

      {/* 06 5 Intent-Specific FAQ Accordions */}
      <DynamicFaqSection intent={intent} />

      {/* 07 Final Consultation CTA */}
      <FinalCtaSection />
    </main>
  );
}
