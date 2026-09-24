import React from 'react';
import { Container } from '../layout/Container';

const WORK_STEPS = [
  {
    step: '01',
    title: '상태 확인',
    desc: '베란다 벽면의 도막 노후도와 결로 취약 부위를 먼저 살핍니다.',
  },
  {
    step: '02',
    title: '작업 범위 안내',
    desc: '불필요한 과잉 시공 없이, 현장 상태에 필요한 구역만 투명하게 설명합니다.',
  },
  {
    step: '03',
    title: '보양 · 바탕면 준비',
    desc: '샷시 비닐 보양 후 들뜬 페인트 스크래핑 및 균열 퍼티 보수를 진행합니다.',
  },
  {
    step: '04',
    title: '탄성코트 작업',
    desc: '확인된 작업 범위에 따라 탄성코트 작업을 진행합니다.',
  },
  {
    step: '05',
    title: '마감 확인',
    desc: '보양재를 정돈하고 도막 부착 상태 검수 후 환기 요령을 안내합니다.',
  },
];

export function HowAllcareWorksSection() {
  return (
    <section
      aria-labelledby="how-works-heading"
      className="w-full py-20 sm:py-28 bg-[#2D322A] text-[#F5F3EE] border-y border-[#3E443B]"
    >
      <Container className="space-y-14 sm:space-y-20">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 text-left sm:text-center sm:mx-auto">
          <p className="text-xs font-semibold text-[#A3B18A] tracking-wider uppercase">
            WORK TIMELINE
          </p>
          <h2
            id="how-works-heading"
            className="text-token-h1 font-semibold text-[#F5F3EE] text-balance leading-tight"
          >
            확인부터 마감까지, 이렇게 진행합니다
          </h2>
          <p className="text-token-body text-[#E7D9C1]/90 max-w-xl mx-auto leading-relaxed">
            시공 전 점검 기준과 실제 작업 흐름을 투명하게 안내합니다.
          </p>
        </div>

        {/* Timeline Structure (Eliminates 13 separate card boxes) */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Connected Line */}
          <div className="hidden lg:block absolute top-6 left-10 right-10 h-0.5 bg-[#4F5844] z-0" />

          {/* Mobile Vertical Connected Line */}
          <div className="lg:hidden absolute top-6 bottom-6 left-5 w-0.5 bg-[#4F5844] z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {WORK_STEPS.map((step) => (
              <div
                key={step.step}
                className="flex lg:flex-col items-start lg:items-center text-left lg:text-center gap-4 lg:gap-3.5"
              >
                {/* Timeline Step Dot */}
                <span className="flex-shrink-0 w-11 h-11 rounded-full bg-[#3E443B] border-2 border-[#A3B18A] text-xs font-bold font-mono text-[#F5F3EE] flex items-center justify-center shadow-sm">
                  {step.step}
                </span>

                <div className="space-y-1.5 pt-0.5 lg:pt-0">
                  <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#F5F3EE]">
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] sm:text-[15px] leading-[1.7] text-[#E7D9C1]/90 max-w-[220px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unified Trust Statement Banner (Single statement, no separate cards) */}
        <div className="max-w-2xl mx-auto p-6 rounded-xl bg-[#3E443B]/80 border border-[#E7D9C1]/20 text-center space-y-2">
          <p className="text-sm font-semibold text-[#F5F3EE] leading-relaxed">
            &ldquo;필요하지 않은 작업을 먼저 권하기보다, 현재 상태와 실제 필요한 작업 범위를 설명하는 것을 우선합니다.&rdquo;
          </p>
          <p className="text-[11px] text-[#A3B18A] tracking-wider uppercase">
            ALLCARE PROCESS TRANSPARENCY
          </p>
        </div>
      </Container>
    </section>
  );
}
