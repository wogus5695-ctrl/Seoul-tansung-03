import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '../../components/layout/Container';
import { OFFICIAL_SITE_ORIGIN } from '../../lib/config/site-config';
import { getActiveRegions } from '../../lib/contracts/regions-contract';
import { buildPublicHref } from '../../lib/url/url-builder';
import { isIndexableDynamicPage } from '../../lib/config/recovery-config';

export const metadata: Metadata = {
  metadataBase: new URL(OFFICIAL_SITE_ORIGIN),
  title: '경기 탄성코트 주요 시별 시공안내 | 올케어',
  description:
    '올케어에서 제공하는 경기도 28개 시별 56개 공식 안내 페이지별 탄성코트 및 베란다탄성코트 시공 안내 모음입니다.',
  alternates: {
    canonical: `${OFFICIAL_SITE_ORIGIN}/sitemap-gyeonggi`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface CityLinkItem {
  readonly regionId: string;
  readonly name: string;
  readonly keyword: string;
  readonly href: string;
  readonly intent: '탄성코트' | '베란다탄성코트';
}

interface CityGroup {
  readonly city: string;
  readonly elastic: CityLinkItem[];
  readonly balcony: CityLinkItem[];
}

const GYEONGGI_CITY_ORDER = [
  '고양시',
  '과천시',
  '광명시',
  '광주시',
  '구리시',
  '군포시',
  '김포시',
  '남양주시',
  '동두천시',
  '부천시',
  '성남시',
  '수원시',
  '시흥시',
  '안산시',
  '안성시',
  '안양시',
  '양주시',
  '여주시',
  '오산시',
  '용인시',
  '의왕시',
  '의정부시',
  '이천시',
  '파주시',
  '평택시',
  '포천시',
  '하남시',
  '화성시',
];

export default async function GyeonggiSitemapPage() {
  const allRegions = getActiveRegions(false);
  const approvedRegions = allRegions.filter(
    (r) => r.sido === '경기' && r.publicationState !== 'PUBLISHED_NOINDEX'
  );

  const cityMap = new Map<string, CityGroup>();
  for (const c of GYEONGGI_CITY_ORDER) {
    cityMap.set(c, { city: c, elastic: [], balcony: [] });
  }

  for (const region of approvedRegions) {
    const cityName = region.displayName;
    const targetGroup = cityMap.get(cityName);
    if (!targetGroup) continue;

    for (const intent of ['탄성코트', '베란다탄성코트'] as const) {
      if (isIndexableDynamicPage(region.id, intent)) {
        const href = buildPublicHref(region.keywordRegionName, intent);
        const linkItem: CityLinkItem = {
          regionId: region.id,
          name: cityName,
          keyword: `${cityName} ${intent}`,
          href,
          intent,
        };
        if (intent === '탄성코트') {
          targetGroup.elastic.push(linkItem);
        } else {
          targetGroup.balcony.push(linkItem);
        }
      }
    }
  }

  const cityGroups = Array.from(cityMap.values()).filter(
    (g) => g.elastic.length > 0 || g.balcony.length > 0
  );

  return (
    <main className="flex-1 py-12 sm:py-16 bg-[#FAF8F5]">
      <Container className="max-w-5xl mx-auto space-y-10">
        {/* Reciprocal Region Navigation Bar */}
        <nav aria-label="수도권 지역별 안내" className="flex items-center gap-2 text-xs font-medium text-[#756E61]">
          <Link href="/sitemap-seoul" className="hover:text-[#4F5844] hover:underline px-2.5 py-1 rounded transition-colors">
            서울 지역 안내
          </Link>
          <span className="text-[#C5BBAA]">|</span>
          <span className="font-bold text-[#3E443B] bg-[#EFE8DC] px-2.5 py-1 rounded">경기 지역 안내</span>
          <span className="text-[#C5BBAA]">|</span>
          <Link href="/sitemap-incheon" className="hover:text-[#4F5844] hover:underline px-2.5 py-1 rounded transition-colors">
            인천 지역 안내
          </Link>
        </nav>

        {/* Header Block */}
        <div className="space-y-3 border-b border-[#E7D9C1] pb-6 text-left">
          <p className="text-xs font-bold tracking-widest text-[#6B755D] uppercase">
            GYEONGGI REGIONAL DIRECTORY (56 PRIMARY PAGES)
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3E443B]">
            경기 탄성코트 주요 지역 안내
          </h1>
          <p className="text-sm text-[#5C5549] leading-relaxed max-w-2xl">
            올케어에서 제공하는 경기도 28개 시별 56개 공식 안내 페이지별
            탄성코트 및 베란다탄성코트 시공 안내입니다. 각 지역별 상세 페이지에서 사전 벽면 점검 기준과 시공 가이드를 확인하실 수 있습니다.
          </p>
        </div>

        {/* Primary Crawlable City Text Directory: Exactly 56 Links */}
        <section
          aria-labelledby="gyeonggi-hub-heading"
          className="bg-white rounded-xl border border-[#E7D9C1] p-6 sm:p-8 shadow-sm space-y-6 text-left"
        >
          <div className="border-b border-[#EFE8DC] pb-3">
            <h2 id="gyeonggi-hub-heading" className="text-lg font-bold text-[#3E443B] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F5844]" />
              주요 공식 시공 안내 바로가기 (56개 공식 안내 페이지)
            </h2>
            <p className="text-xs sm:text-sm text-[#756E61] pt-1">
              아래 시별 시공 의도 안내 링크에서 세부 시공 가이드를 확인하실 수 있습니다.
            </p>
          </div>

          {/* Compact City-Based Text Directory (Mobile single-col, Desktop 2-cols) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cityGroups.map((group) => (
              <div
                key={group.city}
                className="p-4 rounded-lg bg-[#FAF8F5] border border-[#EFE8DC] space-y-3 text-left"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#3E443B] flex items-center gap-2 border-b border-[#EFE8DC] pb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6B755D]" />
                  {group.city}
                </h3>

                {/* 탄성코트 intent links */}
                {group.elastic.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-[#6B755D] block">탄성코트</span>
                    <div className="flex flex-wrap items-center text-xs sm:text-sm leading-relaxed">
                      {group.elastic.map((link, idx) => (
                        <React.Fragment key={link.href}>
                          <Link
                            href={link.href}
                            className="text-[#3E443B] hover:text-[#4F5844] hover:underline transition-colors"
                          >
                            {link.keyword}
                          </Link>
                          {idx < group.elastic.length - 1 && (
                            <span className="text-[#C5BBAA] mx-1.5 select-none">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {/* 베란다탄성코트 intent links */}
                {group.balcony.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-[#EFE8DC]">
                    <span className="text-xs font-semibold text-[#6B755D] block">베란다탄성코트</span>
                    <div className="flex flex-wrap items-center text-xs sm:text-sm leading-relaxed">
                      {group.balcony.map((link, idx) => (
                        <React.Fragment key={link.href}>
                          <Link
                            href={link.href}
                            className="text-[#3E443B] hover:text-[#4F5844] hover:underline transition-colors"
                          >
                            {link.keyword}
                          </Link>
                          {idx < group.balcony.length - 1 && (
                            <span className="text-[#C5BBAA] mx-1.5 select-none">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Informational Guides Section */}
        <section aria-labelledby="guide-links-heading" className="pt-6 border-t border-[#E7D9C1] text-left space-y-3">
          <h2 id="guide-links-heading" className="text-xs font-bold text-[#6B755D] uppercase tracking-wider">
            탄성코트 시공 전 참고 가이드
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/guide/balcony-coating-checklist"
              className="p-3.5 rounded-lg bg-white border border-[#E7D9C1] hover:border-[#4F5844] hover:bg-[#FAF8F5] transition-all block group"
            >
              <p className="text-xs font-bold text-[#3E443B] group-hover:text-[#4F5844] break-keep">
                베란다 탄성코트 시공 전 기존 도막에서 확인할 항목
              </p>
              <p className="text-[11px] text-[#756E61] pt-1">
                기존 도막 들뜸, 미세 균열 및 공간 비움 원칙 점검
              </p>
            </Link>
            <Link
              href="/guide/old-apartment-balcony-recoating-guide"
              className="p-3.5 rounded-lg bg-white border border-[#E7D9C1] hover:border-[#4F5844] hover:bg-[#FAF8F5] transition-all block group"
            >
              <p className="text-xs font-bold text-[#3E443B] group-hover:text-[#4F5844] break-keep">
                구축 아파트 베란다 탄성코트 재시공 전 확인할 항목
              </p>
              <p className="text-[11px] text-[#756E61] pt-1">
                다층 도막 축적, 보수 흔적 점검 및 밑작업 중요성 안내
              </p>
            </Link>
            <Link
              href="/guide/elastic-coating-estimate-work-scope-guide"
              className="p-3.5 rounded-lg bg-white border border-[#E7D9C1] hover:border-[#4F5844] hover:bg-[#FAF8F5] transition-all block group"
            >
              <p className="text-xs font-bold text-[#3E443B] group-hover:text-[#4F5844] break-keep">
                탄성코트 견적 전 확인할 작업 범위와 밑작업 항목
              </p>
              <p className="text-[11px] text-[#756E61] pt-1">
                견적 산출 전 현장 점검 항목 및 밑작업 포함 여부 확인 요령
              </p>
            </Link>
            <Link
              href="/guide/elastic-coating-preparation-protection-checklist"
              className="p-3.5 rounded-lg bg-white border border-[#E7D9C1] hover:border-[#4F5844] hover:bg-[#FAF8F5] transition-all block group"
            >
              <p className="text-xs font-bold text-[#3E443B] group-hover:text-[#4F5844] break-keep">
                탄성코트 시공 전 공간 비움·보양 범위 체크리스트
              </p>
              <p className="text-[11px] text-[#756E61] pt-1">
                시공 당일 원활한 작업을 위한 공간 정리 및 시설물 보양 점검
              </p>
            </Link>
          </div>
        </section>

        <div className="text-xs text-[#756E61] pt-4 border-t border-[#E7D9C1] text-left">
          ※ 공개된 통계는 한국부동산원 공동주택 식별정보 공개자료(2026.08 기준)를 바탕으로 작성되었으며,
          특정 세대의 탄성코트 시공 필요성은 실제 현장 벽면 점검을 통해 판단합니다.
        </div>
      </Container>
    </main>
  );
}
