import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getActiveRegions } from '../lib/contracts/regions-contract';
import { validateDynamicRoute } from '../lib/url/url-builder';
import { buildDynamicMetadata } from '../lib/seo/dynamic-metadata';
import { DynamicLandingPage } from '../components/dynamic/DynamicLandingPage';
import { HeroSection } from '../components/sections/HeroSection';
import { WallCheckSection } from '../components/sections/WallCheckSection';
import { BeforeAfterSection } from '../components/sections/BeforeAfterSection';
import { ResidentialSpacesSection } from '../components/sections/ResidentialSpacesSection';
import { DecisionGuideSection } from '../components/sections/DecisionGuideSection';
import { HowAllcareWorksSection } from '../components/sections/HowAllcareWorksSection';
import { FaqSection } from '../components/sections/FaqSection';
import { FinalCtaSection } from '../components/sections/FinalCtaSection';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const rawKey = typeof resolvedParams.k === 'string' ? resolvedParams.k : undefined;

  // If no dynamic keyword param, layout default metadata applies
  if (!rawKey) {
    return {};
  }

  const activeRegions = getActiveRegions();
  const validation = validateDynamicRoute(rawKey, activeRegions);

  if (!validation.isValid || !validation.region || !validation.intent) {
    return {
      title: '페이지를 찾을 수 없습니다 | 올케어',
      robots: { index: false, follow: false },
    };
  }

  return buildDynamicMetadata(validation.region, validation.intent);
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const rawKey = typeof resolvedParams.k === 'string' ? resolvedParams.k : undefined;

  // 1. If no query parameter, render frozen Main Page
  if (!rawKey) {
    return (
      <main className="flex-1 flex flex-col">
        {/* 02 HERO */}
        <HeroSection />

        {/* 03 WALL CHECK VISUAL (1 Large Visual + Dark Gradient Overlay) */}
        <WallCheckSection />

        {/* 04 BEFORE & AFTER (Primary Visual Evidence - 3 Cases / Scroll Snap) */}
        <BeforeAfterSection />

        {/* 05 RESIDENTIAL SPACES (1 Large Space Visual + 3 Typographic Points) */}
        <ResidentialSpacesSection />

        {/* 06 DECISION GUIDE (Connected Flow Diagram - Merged Condition & Estimate) */}
        <DecisionGuideSection />

        {/* 07 HOW ALLCARE WORKS (Cohesive Timeline on Deep Olive - Merged Standard, Process & Trust) */}
        <HowAllcareWorksSection />

        {/* 08 FAQ (5 Purchase-Decision Questions) */}
        <FaqSection />

        {/* 09 FINAL CONSULTATION (Background Visual CTA) */}
        <FinalCtaSection />
      </main>
    );
  }

  // 2. Validate Dynamic Route Key
  const activeRegions = getActiveRegions();
  const validation = validateDynamicRoute(rawKey, activeRegions);

  // 3. Strict 404 policy for invalid/unknown route keys
  if (!validation.isValid || !validation.region || !validation.intent) {
    notFound();
  }

  // 4. Render SSR Dynamic Landing Page
  return (
    <DynamicLandingPage
      region={validation.region}
      intent={validation.intent}
    />
  );
}
