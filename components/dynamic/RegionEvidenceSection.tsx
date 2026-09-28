import React from 'react';
import Image from 'next/image';
import { RegionItem } from '../../lib/types/regions';
import { SearchIntentItem } from '../../lib/types/intents';
import { getRegionEvidence } from '../../lib/data/region-evidence';
import { EvidenceTier } from '../../lib/types/evidence';

interface RegionEvidenceSectionProps {
  readonly region: RegionItem;
  readonly intent: SearchIntentItem;
}

const TIER_LABELS: Record<EvidenceTier, { label: string; badgeClass: string }> = {
  TIER_A: {
    label: '올케어 실제 시공 현장 실증',
    badgeClass: 'bg-[#4F5844] text-[#FAF8F5]',
  },
  TIER_B: {
    label: '실제 현장 상태 점검 자료',
    badgeClass: 'bg-[#6B755D] text-[#FAF8F5]',
  },
  TIER_C: {
    label: '공식 공개 주거 데이터 (TIER_C)',
    badgeClass: 'bg-[#E7D9C1] text-[#3E443B]',
  },
};

/**
 * Region Evidence Section (Phase 6-C0C-2B)
 *
 * NON-NEGOTIABLE RENDERING RULES:
 * - If no evidence exists for this region + intent: returns NULL (0 DOM nodes).
 * - Never renders placeholders, empty boxes, or "준비중" banners.
 * - Renders ONLY verified facts without inferred/unproven causes.
 * - Displays compact data insight block for Tier-C public housing statistics.
 */
export function RegionEvidenceSection({ region, intent }: RegionEvidenceSectionProps) {
  const evidenceList = getRegionEvidence(region.id, intent.serviceKeyword);

  // Strict null return if no evidence exists for this region + intent (Zero-DOM for non-pilot regions)
  if (!evidenceList || evidenceList.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={`${region.displayName} 공동주택 데이터 및 시공 전 체크포인트`}
      className="py-10 sm:py-14 bg-[#FAF8F5] border-t border-b border-[#E7D9C1]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header Block */}
        <div className="text-center space-y-2">
          <p className="text-xs font-bold tracking-widest text-[#6B755D] uppercase">
            LOCAL DATA CHECK
          </p>
          <h2 className="text-lg sm:text-xl font-bold text-[#3E443B]">
            {region.displayName} 공동주택 데이터로 보는 시공 전 체크포인트
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5549] max-w-xl mx-auto leading-relaxed">
            한국부동산원 공식 수집 지표를 바탕으로 객관적인 통계와 시공 의도별 점검 가이드를 안내합니다.
          </p>
        </div>

        {/* Evidence List */}
        <div className="space-y-6">
          {evidenceList.map((item) => {
            const tierInfo = TIER_LABELS[item.evidenceTier] || TIER_LABELS.TIER_A;
            const facts = item.facts;
            const metrics = facts.publicHousingMetrics;
            const checkpoint =
              facts.intentCheckpoints?.[intent.serviceKeyword] || facts.observedCondition;

            return (
              <div
                key={item.evidenceId}
                className="bg-white rounded-xl border border-[#E7D9C1] p-5 sm:p-7 shadow-sm space-y-6"
              >
                {/* Header: Tier Badge & Provenance */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EAE1] pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold px-2.5 py-0.5 rounded ${tierInfo.badgeClass}`}>
                      {tierInfo.label}
                    </span>
                    {facts.complexName && (
                      <span className="font-bold text-[#3E443B]">{facts.complexName}</span>
                    )}
                    <span className="font-medium text-[#6B755D]">
                      {region.canonicalName}
                    </span>
                  </div>
                  <div className="text-[#756E61]">
                    출처: {item.sourceName} (기준: {item.verifiedAt.slice(0, 7).replace('-', '.')})
                  </div>
                </div>

                {/* Structured Metrics Grid (Compact 4 Cards) */}
                {metrics && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-[#EFE8DC] text-center">
                        <span className="text-xs text-[#6B755D] block mb-1 font-medium">
                          공동주택 등록 단위
                        </span>
                        <span className="text-base sm:text-lg font-bold text-[#3E443B]">
                          {metrics.registeredUnits.toLocaleString()}개
                        </span>
                      </div>
                      <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-[#EFE8DC] text-center">
                        <span className="text-xs text-[#6B755D] block mb-1 font-medium">
                          총 세대수
                        </span>
                        <span className="text-base sm:text-lg font-bold text-[#3E443B]">
                          {metrics.households.toLocaleString()}세대
                        </span>
                      </div>
                      <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-[#EFE8DC] text-center">
                        <span className="text-xs text-[#6B755D] block mb-1 font-medium">
                          사용승인일 확인
                        </span>
                        <span className="text-base sm:text-lg font-bold text-[#3E443B]">
                          {metrics.validApprovalDates.toLocaleString()}개
                        </span>
                      </div>
                      <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-[#EFE8DC] text-center">
                        <span className="text-xs text-[#6B755D] block mb-1 font-medium">
                          20년 이상 비율
                        </span>
                        <span className="text-base sm:text-lg font-bold text-[#4F5844]">
                          {metrics.share20Plus.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Housing Types Breakdown Single Line */}
                    <div className="px-3 py-2 bg-[#FAF8F5] rounded border border-[#EFE8DC] text-xs text-[#5C5549] flex flex-wrap justify-between items-center gap-2">
                      <span className="font-semibold text-[#3E443B]">주택 유형 분포:</span>
                      <span>
                        아파트 {metrics.housingTypes.apartment.toLocaleString()}개 · 다세대{' '}
                        {metrics.housingTypes.multiFamily.toLocaleString()}개 · 연립{' '}
                        {metrics.housingTypes.rowHouse.toLocaleString()}개
                        {metrics.housingTypes.unknown > 0 &&
                          ` · 기타/미분류 ${metrics.housingTypes.unknown}개`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Legacy/General Facts Grid (if metrics omitted or Tier A/B) */}
                {!metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {facts.housingType && (
                      <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#EFE8DC]">
                        <span className="text-xs font-semibold text-[#6B755D] block mb-1">
                          주거 형태
                        </span>
                        <span className="font-medium text-[#3E443B]">{facts.housingType}</span>
                      </div>
                    )}

                    {facts.observedCondition && (
                      <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#EFE8DC]">
                        <span className="text-xs font-semibold text-[#6B755D] block mb-1">
                          시공 전 확인 상태
                        </span>
                        <span className="font-medium text-[#3E443B]">
                          {facts.observedCondition}
                        </span>
                      </div>
                    )}

                    {facts.workScope && (
                      <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#EFE8DC] sm:col-span-2">
                        <span className="text-xs font-semibold text-[#6B755D] block mb-1">
                          진행된 작업 범위
                        </span>
                        <span className="font-medium text-[#3E443B]">{facts.workScope}</span>
                      </div>
                    )}

                    {facts.publicMetric && (
                      <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#EFE8DC] sm:col-span-2">
                        <span className="text-xs font-semibold text-[#6B755D] block mb-1">
                          공식 주거 지표
                        </span>
                        <span className="font-medium text-[#3E443B]">{facts.publicMetric}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* FACT / LIMITATION / CHECKPOINT Card Grid */}
                {metrics && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    {/* FACT & LIMITATION Block */}
                    <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#EFE8DC] space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-[#3E443B]">
                        <span className="w-2 h-2 rounded-full bg-[#6B755D]"></span>
                        DATA FACT & LIMITATION
                      </div>
                      <p className="text-[#5C5549] leading-relaxed">{facts.publicMetric}</p>
                      {facts.limitationNote && (
                        <p className="text-xs text-[#756E61] pt-1.5 border-t border-[#EFE8DC] leading-relaxed">
                          ※ {facts.limitationNote}
                        </p>
                      )}
                    </div>

                    {/* CHECKPOINT Block (Intent-Specific) */}
                    {checkpoint && (
                      <div className="bg-[#F5F2EB] p-4 rounded-lg border border-[#E7D9C1] space-y-2">
                        <div className="flex items-center gap-1.5 font-bold text-[#4F5844]">
                          <span className="w-2 h-2 rounded-full bg-[#4F5844]"></span>
                          {region.displayName} {intent.serviceKeyword} 시공 체크포인트
                        </div>
                        <p className="text-[#3E443B] font-medium leading-relaxed">{checkpoint}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Verified Images if provided */}
                {item.imageAssets && item.imageAssets.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-[#6B755D] block mb-3">
                      현장 실증 사진
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {item.imageAssets.map((imgSrc, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-[4/3] rounded overflow-hidden border border-[#E7D9C1]"
                        >
                          <Image
                            src={imgSrc}
                            alt={`${region.displayName} 현장 실증 사진 ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Data Note Disclaimer */}
                <div className="text-[11px] text-[#8C8375] text-right border-t border-[#F0EAE1] pt-3">
                  ※ 본 지표는 한국부동산원 공동주택 식별정보(2026.08) 공개 데이터 등록 기준입니다.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
