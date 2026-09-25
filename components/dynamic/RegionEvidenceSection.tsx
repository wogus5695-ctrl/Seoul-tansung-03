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
    label: '공식 공개 주거 데이터',
    badgeClass: 'bg-[#E7D9C1] text-[#3E443B]',
  },
};

/**
 * Region Evidence Section (Phase 6-C0C-1)
 *
 * NON-NEGOTIABLE RENDERING RULES:
 * - If no evidence exists for this region + intent: returns NULL (0 DOM nodes).
 * - Never renders placeholders, empty boxes, or "준비중" banners.
 * - Renders ONLY verified facts without inferred/unproven causes.
 */
export function RegionEvidenceSection({ region, intent }: RegionEvidenceSectionProps) {
  const evidenceList = getRegionEvidence(region.id, intent.serviceKeyword);

  // Strict null return if no evidence exists for this region + intent
  if (!evidenceList || evidenceList.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={`${region.displayName} 실제 현장 점검 및 시공 사례`}
      className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-b border-[#E7D9C1]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 mb-10 text-center">
          <p className="text-xs font-semibold tracking-wider text-[#6B755D] uppercase">
            Verified Local Evidence
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-[#3E443B]">
            {region.displayName} 현장 확인 실증 자료
          </h2>
          <p className="text-sm text-[#5C5549] max-w-xl mx-auto leading-relaxed">
            추정이나 과장 없이, 올케어가 직접 확인하거나 공식 출처를 통해 검증된 해당 지역의 실제 작업 사례 및 주거 현장 정보를 안내합니다.
          </p>
        </div>

        <div className="space-y-6">
          {evidenceList.map((item) => {
            const tierInfo = TIER_LABELS[item.evidenceTier] || TIER_LABELS.TIER_A;
            const facts = item.facts;

            return (
              <div
                key={item.evidenceId}
                className="bg-white rounded-lg border border-[#E7D9C1] p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Header: Tier Badge & Source Provenance */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EAE1] pb-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded ${tierInfo.badgeClass}`}>
                      {tierInfo.label}
                    </span>
                    {facts.complexName && (
                      <span className="text-sm font-bold text-[#3E443B]">
                        {facts.complexName}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#756E61] flex items-center gap-2">
                    <span>출처: {item.sourceName}</span>
                    <span>•</span>
                    <span>검증일: {item.verifiedAt}</span>
                  </div>
                </div>

                {/* Facts Grid */}
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
                      <span className="font-medium text-[#3E443B]">{facts.observedCondition}</span>
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

                {/* Verified Images if provided */}
                {item.imageAssets && item.imageAssets.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-[#6B755D] block mb-3">
                      현장 실증 사진
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {item.imageAssets.map((imgSrc, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded overflow-hidden border border-[#E7D9C1]">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
