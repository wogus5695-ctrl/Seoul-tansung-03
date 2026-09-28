import React from 'react';
import Link from 'next/link';
import { Container } from '../layout/Container';
import { RegionItem } from '../../lib/types/regions';
import { SearchIntentItem } from '../../lib/types/intents';
import { SEARCH_INTENTS } from '../../lib/contracts/intents-contract';
import { buildPublicHref } from '../../lib/url/url-builder';

interface RelatedIntentLinksSectionProps {
  readonly region: RegionItem;
  readonly currentIntent: SearchIntentItem;
}

export function RelatedIntentLinksSection({
  region,
  currentIntent,
}: RelatedIntentLinksSectionProps) {
  // Filter out the current intent so only other 5 related intents are listed
  const otherIntents = SEARCH_INTENTS.filter((item) => item.id !== currentIntent.id);

  return (
    <section
      aria-labelledby="related-intents-heading"
      className="w-full py-6 sm:py-8 bg-[#FAF8F5] border-t border-[#E7D9C1]"
    >
      <Container className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p
            id="related-intents-heading"
            className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase"
          >
            [{region.keywordRegionName} 다른 시공 정보]
          </p>
          <span className="text-[11px] text-[#756E61]">
            공간과 시공 목적에 따라 알맞은 시공 안내를 확인하세요.
          </span>
        </div>

        {/* Compact SSR Inline Navigation Links */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {otherIntents.map((item) => {
            const href = buildPublicHref(region.keywordRegionName, item.serviceKeyword);
            const label = item.serviceKeyword;

            return (
              <Link
                key={item.id}
                href={href}
                className="px-3 py-1.5 rounded-md bg-[#F5F3EE] border border-[#E7D9C1] hover:border-[#4F5844] hover:bg-[#E7D9C1]/40 text-xs font-medium text-[#3E443B] transition-colors inline-flex items-center gap-1.5"
              >
                <span>{label}</span>
                <svg className="w-3 h-3 text-[#5C5549]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

