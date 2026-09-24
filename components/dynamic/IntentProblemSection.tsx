import React from 'react';
import { Container } from '../layout/Container';
import { SearchIntentItem } from '../../lib/types/intents';
import { RegionItem } from '../../lib/types/regions';

interface IntentProblemSectionProps {
  readonly region: RegionItem;
  readonly intent: SearchIntentItem;
}

export function IntentProblemSection({ region, intent }: IntentProblemSectionProps) {
  const exactKeyword = `${region.keywordRegionName} ${intent.serviceKeyword}`;

  return (
    <section
      aria-labelledby="intent-problem-heading"
      className="w-full py-16 sm:py-24 bg-[#FAF8F5]"
    >
      <Container className="space-y-12">
        <div className="max-w-2xl text-left space-y-4">
          <p className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
            CHECKPOINT · 시공 전 필수 점검
          </p>
          <h2
            id="intent-problem-heading"
            className="text-token-h2 text-[#3E443B] font-bold tracking-tight text-balance leading-snug"
          >
            {intent.problemH2Template
              ? intent.problemH2Template(region.keywordRegionName)
              : `${exactKeyword}, 어떤 점을 먼저 확인해야 할까요?`}
          </h2>
          <p className="text-token-body text-[#5C5549] leading-relaxed text-pretty">
            {intent.userIntent}
          </p>
        </div>

        {/* Primary Problem Highlight Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F3EE] border border-[#E7D9C1] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#4F5844] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#79BC37]" />
            <span>핵심 점검 대상</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#3E443B] leading-snug text-pretty">
            {intent.primaryProblem}
          </h3>
          <p className="text-xs sm:text-sm text-[#5C5549] leading-relaxed">
            단순히 페인트를 덧칠하기 전에 기존 도막의 들뜸이나 오염 상태를 면밀히 살피고,
            벽면 상태에 맞춰 바탕면 정리와 균열 보수 필요 여부를 사전에 확인해야 합니다.
          </p>
        </div>

        {/* 3 Decision Topics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {intent.decisionTopics.map((topic, idx) => (
            <div
              key={topic}
              className="p-6 rounded-xl bg-[#FAF8F5] border border-[#E7D9C1] space-y-3 shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#E7D9C1]/50 text-[#3E443B] font-bold text-xs flex items-center justify-center">
                0{idx + 1}
              </div>
              <h4 className="text-sm font-semibold text-[#3E443B] leading-snug">
                {topic}
              </h4>
              <p className="text-xs text-[#5C5549] leading-relaxed">
                벽면의 습기 흔적과 기존 도막 상태를 확인하여 세대별 현장에 적합한 작업 범위를 사전에 안내합니다.
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
