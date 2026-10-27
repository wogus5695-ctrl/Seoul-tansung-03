import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '../../components/layout/Container';
import { getAllGuides } from '../../lib/data/guides-data';
import { getAllKeywordGuides } from '../../lib/data/keyword-guides-data';
import { OFFICIAL_SITE_ORIGIN, SITE_CONFIG } from '../../lib/config/site-config';

export const metadata: Metadata = {
  title: '탄성코트 시공 가이드 디렉터리 | 올케어',
  description:
    '올케어에서 제공하는 베란다 탄성코트 시공 전 도막 점검, 준비 체크리스트, 재시공 판단 기준 및 지역별 시공 가이드 모음입니다.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_CONFIG.siteOrigin || OFFICIAL_SITE_ORIGIN}/guide`,
  },
};

export default function GuideIndexPage() {
  const pillarGuides = getAllGuides();
  const keywordGuides = getAllKeywordGuides();

  // Group keyword guides by District and then Intent
  const yeongdeungpoElastic = keywordGuides.filter(
    (g) => g.regionId.startsWith('seoul-yeongdeungpo-') && g.serviceKeyword === '탄성코트'
  );
  const yeongdeungpoBalcony = keywordGuides.filter(
    (g) => g.regionId.startsWith('seoul-yeongdeungpo-') && g.serviceKeyword === '베란다탄성코트'
  );

  return (
    <main className="flex-1 py-12 sm:py-16 bg-[#FAF8F5]">
      <Container className="max-w-4xl mx-auto space-y-10">
        {/* Header Block */}
        <div className="space-y-3 border-b border-[#E7D9C1] pb-6 text-left">
          <p className="text-xs font-bold tracking-widest text-[#6B755D] uppercase">
            ALLCARE INFORMATION & TECHNICAL GUIDES
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3E443B]">
            탄성코트 시공 가이드 디렉터리
          </h1>
          <p className="text-sm text-[#5C5549] leading-relaxed max-w-2xl">
            베란다와 다용도실의 기존 도막 상태 점검, 균열 보수 기준, 가전 보양 및 공간 비움 수칙 등
            탄성코트 시공 전 소비자가 알아야 할 전문 기술 가이드와 지역별 점검 안내입니다.
          </p>
        </div>

        {/* Section 1: Pillar Information Guides (4 Guides) */}
        <section aria-labelledby="pillar-guides-heading" className="bg-white rounded-xl border border-[#E7D9C1] p-6 sm:p-8 shadow-sm space-y-5 text-left">
          <div className="border-b border-[#EFE8DC] pb-3">
            <h2 id="pillar-guides-heading" className="text-lg font-bold text-[#3E443B] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F5844]" />
              시공 핵심 점검 가이드 (4개)
            </h2>
            <p className="text-xs text-[#756E61] pt-1">
              시공 전 도막 점검, 재시공 주기, 견적 범위 및 공간 준비에 관한 종합 안내서입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pillarGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guide/${guide.slug}`}
                className="p-4 rounded-lg bg-[#FAF8F5] border border-[#EFE8DC] hover:border-[#4F5844] hover:bg-white transition-all block group"
              >
                <span className="text-[11px] font-semibold text-[#6B755D] block mb-1">
                  {guide.category}
                </span>
                <p className="text-sm font-bold text-[#3E443B] group-hover:text-[#4F5844] break-keep">
                  {guide.h1}
                </p>
                <p className="text-xs text-[#756E61] pt-1 line-clamp-2 break-keep">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Regional Keyword Guides Directory */}
        <section aria-labelledby="keyword-guides-heading" className="bg-white rounded-xl border border-[#E7D9C1] p-6 sm:p-8 shadow-sm space-y-6 text-left">
          <div className="border-b border-[#EFE8DC] pb-3">
            <h2 id="keyword-guides-heading" className="text-lg font-bold text-[#3E443B] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F5844]" />
              지역별 시공 전 점검 가이드 (18개)
            </h2>
            <p className="text-xs text-[#756E61] pt-1">
              각 지역별 현장 여건과 벽면 특성에 따른 세부 점검 가이드 디렉터리입니다.
            </p>
          </div>

          {/* District: 영등포구 */}
          <div className="p-5 rounded-lg bg-[#FAF8F5] border border-[#EFE8DC] space-y-5">
            <h3 className="text-base font-bold text-[#3E443B] flex items-center gap-2 border-b border-[#EFE8DC] pb-2">
              <span className="w-2 h-2 rounded-full bg-[#6B755D]" />
              영등포구 시공 점검 가이드
            </h3>

            {/* Intent 1: 탄성코트 (9 guides) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#6B755D] block uppercase">
                탄성코트 시공 점검 (9개)
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {yeongdeungpoElastic.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guide/${guide.slug}`}
                      className="p-2.5 rounded bg-white border border-[#EFE8DC] hover:border-[#4F5844] hover:text-[#4F5844] text-xs font-medium text-[#3E443B] transition-colors block break-keep"
                    >
                      {guide.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Intent 2: 베란다탄성코트 (9 guides) */}
            <div className="space-y-2 pt-2 border-t border-[#EFE8DC]">
              <span className="text-xs font-bold text-[#6B755D] block uppercase">
                베란다탄성코트 시공 점검 (9개)
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {yeongdeungpoBalcony.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guide/${guide.slug}`}
                      className="p-2.5 rounded bg-white border border-[#EFE8DC] hover:border-[#4F5844] hover:text-[#4F5844] text-xs font-medium text-[#3E443B] transition-colors block break-keep"
                    >
                      {guide.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Back Link to Service Hub */}
        <div className="text-center pt-2">
          <Link
            href="/sitemap-seoul"
            className="text-xs text-[#756E61] hover:text-[#4F5844] hover:underline"
          >
            ← 서울 지역별 공식 시공 안내 디렉터리(/sitemap-seoul) 바로가기
          </Link>
        </div>
      </Container>
    </main>
  );
}
