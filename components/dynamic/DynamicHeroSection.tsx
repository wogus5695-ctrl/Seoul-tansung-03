import React from 'react';
import Link from 'next/link';
import { Container } from '../layout/Container';
import { HeroSlider } from '../ui/HeroSlider';
import { SITE_CONFIG } from '../../lib/config/site-config';
import { RegionItem } from '../../lib/types/regions';
import { SearchIntentItem } from '../../lib/types/intents';

interface DynamicHeroSectionProps {
  readonly region: RegionItem;
  readonly intent: SearchIntentItem;
}

export function DynamicHeroSection({ region, intent }: DynamicHeroSectionProps) {
  const exactKeyword = `${region.keywordRegionName} ${intent.serviceKeyword}`;

  return (
    <section
      aria-labelledby="dynamic-hero-heading"
      className="w-full py-12 sm:py-20 lg:py-24 overflow-hidden border-b border-[#E7D9C1]/40"
    >
      <Container>
        {/* Breadcrumb Navigation (2-level: 홈 > {exactKeyword}) */}
        <nav aria-label="브레드크럼" className="mb-6 sm:mb-8">
          <ol className="flex items-center gap-2 text-xs text-[#756E61]">
            <li>
              <Link href="/" className="hover:text-[#3E443B] transition-colors">
                홈
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#A89F91]">/</li>
            <li aria-current="page" className="font-semibold text-[#3E443B]">
              {exactKeyword}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Text Content (PC 45% / MO Top) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7D9C1]/50 text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
              <span>{region.keywordRegionName} 시공 안내 · {SITE_CONFIG.brandNameEn}</span>
            </div>

            {/* Exact Dynamic Keyword H1 */}
            <h1
              id="dynamic-hero-heading"
              className="text-token-display text-[#3E443B] font-bold tracking-tight text-balance leading-tight"
            >
              {exactKeyword}
            </h1>

            {/* Intent-specific Hero Intro */}
            <p className="text-token-h3 text-[#3E443B]/90 font-medium leading-relaxed text-pretty">
              {intent.heroIntroTemplate(region.keywordRegionName)}
            </p>

            <p className="text-token-body text-[#5C5549] leading-relaxed max-w-lg text-pretty">
              {intent.descriptionTemplate(region.keywordRegionName)}
            </p>

            {/* CTA Container */}
            <div className="pt-2 flex flex-wrap gap-3">
              {SITE_CONFIG.phoneHref && (
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="px-6 py-3.5 rounded-md bg-[#4F5844] text-[#F5F3EE] font-semibold text-sm hover:bg-[#3E443B] transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{region.keywordRegionName} 전화 상담 문의 ({SITE_CONFIG.phone})</span>
                </a>
              )}
            </div>
          </div>

          {/* Tall Visual Panel (PC 55% / MO Bottom) */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <HeroSlider />
          </div>
        </div>
      </Container>
    </section>
  );
}
