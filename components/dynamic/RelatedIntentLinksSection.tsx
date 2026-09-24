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
      className="w-full py-12 sm:py-16 bg-[#F5F3EE] border-t border-[#E7D9C1]"
    >
      <Container className="space-y-6">
        <div className="space-y-2 text-left">
          <p className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
            RELATED SERVICES · 관련 시공 안내
          </p>
          <h2
            id="related-intents-heading"
            className="text-token-h2 text-[#3E443B] font-bold tracking-tight"
          >
            함께 확인하면 좋은 시공 정보
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5549]">
            공간과 시공 목적에 따라 필요한 맞춤형 정보를 함께 확인해보세요.
          </p>
        </div>

        {/* Real SSR <a href> links for SEO crawlability and internal link equity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {otherIntents.map((item) => {
            const href = buildPublicHref(region.keywordRegionName, item.serviceKeyword);
            const label = `${region.keywordRegionName} ${item.serviceKeyword}`;

            return (
              <Link
                key={item.id}
                href={href}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E7D9C1] hover:border-[#4F5844] hover:bg-[#FAF8F5] transition-all group flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#5C5549] group-hover:text-[#4F5844] transition-colors">
                    {item.serviceKeyword}
                  </span>
                  <div className="text-sm font-bold text-[#3E443B]">
                    {label} 안내
                  </div>
                  <p className="text-[11px] text-[#756E61] line-clamp-1">
                    {item.userIntent}
                  </p>
                </div>
                <span className="w-7 h-7 rounded-full bg-[#E7D9C1]/40 text-[#5C5549] group-hover:bg-[#4F5844] group-hover:text-[#F5F3EE] flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
