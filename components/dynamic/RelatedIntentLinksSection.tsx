import React from 'react';
import Link from 'next/link';
import { Container } from '../layout/Container';
import { RegionItem } from '../../lib/types/regions';
import { SearchIntentItem } from '../../lib/types/intents';
import { buildPublicHref } from '../../lib/url/url-builder';
import {
  isRecoveryDynamicPage,
  getRelatedRecoveryRegions,
  RECOVERY_PRIMARY_INTENT,
} from '../../lib/config/recovery-config';

interface RelatedIntentLinksSectionProps {
  readonly region: RegionItem;
  readonly currentIntent: SearchIntentItem;
}

const SUB_INTENT_CHECKPOINTS = [
  {
    title: '시공 공정',
    desc: '시설물 보양과 들뜬 도막 정리 및 퍼티 밑작업 기본 공정 확인',
  },
  {
    title: '베란다 공간',
    desc: '외벽 접점 모서리와 창틀 실리콘 주변의 도막 상태 점검',
  },
  {
    title: '세탁실 공간',
    desc: '배관 주변 환기 환경 및 시공 장비의 원활한 작업 동선 점검',
  },
  {
    title: '아파트 단지',
    desc: '입주 전 공실 상태 또는 기존 마감재 상태에 맞춘 작업 일정 조율',
  },
  {
    title: '업체 비교',
    desc: '단순 단가 외 기본 바탕면 정리 포함 여부 및 사후 안내 기준 확인',
  },
];

export function RelatedIntentLinksSection({
  region,
  currentIntent,
}: RelatedIntentLinksSectionProps) {
  const isRecovery = isRecoveryDynamicPage(region.id, currentIntent.serviceKeyword);
  const relatedRecoveryRegions = isRecovery ? getRelatedRecoveryRegions(region.id) : [];

  return (
    <section
      aria-labelledby="related-intents-heading"
      className="w-full py-8 sm:py-10 bg-[#FAF8F5] border-t border-[#E7D9C1]"
    >
      <Container className="space-y-6 text-left">
        {/* On-Page Sub-Intent Informational Checkpoints (Absorbing the 5 sub-intents on-page without crawl links) */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3
              id="related-intents-heading"
              className="text-xs font-bold text-[#6B755D] tracking-wider uppercase"
            >
              주요 시공 유형별 사전 점검 포인트
            </h3>
            <span className="text-[11px] text-[#756E61]">
              공간과 시공 목적에 따라 현장에서 중점 확인하는 체크포인트입니다.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
            {SUB_INTENT_CHECKPOINTS.map((item) => (
              <div
                key={item.title}
                className="p-3.5 rounded-lg bg-[#F5F3EE] border border-[#E7D9C1] space-y-1"
              >
                <div className="text-xs font-bold text-[#3E443B] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3B18A]" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-[#5C5549] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Regional Navigation: Strictly 2-3 Indexable Recovery URLs */}
        {relatedRecoveryRegions.length > 0 && (
          <div className="pt-4 border-t border-[#EFE8DC] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#5C5549]">
                다른 서울 지역 탄성코트 안내
              </span>
              <span className="text-[11px] text-[#756E61]">
                올케어가 시공하는 다른 주요 지역의 안내 페이지로 이동할 수 있습니다.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {relatedRecoveryRegions.map((target) => {
                const href = buildPublicHref(target.name, RECOVERY_PRIMARY_INTENT);
                return (
                  <Link
                    key={target.id}
                    href={href}
                    className="px-3.5 py-1.5 rounded-md bg-[#FAF8F5] border border-[#E7D9C1] hover:border-[#4F5844] hover:bg-[#E7D9C1]/40 text-xs font-medium text-[#3E443B] transition-colors inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{target.name} {RECOVERY_PRIMARY_INTENT}</span>
                    <svg className="w-3 h-3 text-[#5C5549]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
