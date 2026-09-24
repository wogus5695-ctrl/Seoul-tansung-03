import React from 'react';
import { Container } from '../layout/Container';

const DECISION_STEPS = [
  {
    step: '01',
    title: '벽면 상태',
    description: '도막 들뜸, 균열, 오염이나 습기 흔적을 확인합니다.',
  },
  {
    step: '02',
    title: '작업 환경',
    description: '공간 구조와 가전·시설물, 작업 접근 조건을 확인합니다.',
  },
  {
    step: '03',
    title: '필요한 보수',
    description: '기존 도막 정리나 균열 보수 등 사전에 필요한 작업 범위를 확인합니다.',
  },
  {
    step: '04',
    title: '작업 범위',
    description: '확인된 상태와 환경을 바탕으로 실제 필요한 작업 구역을 정리합니다.',
  },
];

export function DecisionGuideSection() {
  return (
    <section aria-labelledby="decision-heading" className="w-full py-16 sm:py-24 bg-[#FAF8F5] border-y border-[#E7D9C1]">
      <Container className="space-y-12">
        <div className="max-w-xl text-left sm:text-center sm:mx-auto space-y-2">
          <p className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
            DECISION FLOW
          </p>
          <h2 id="decision-heading" className="text-token-h1 text-[#3E443B] font-semibold break-keep text-balance">
            작업 범위는 무엇을 보고<br className="hidden sm:inline" /> 결정할까요?
          </h2>
          <p className="text-token-body text-[#5C5549] text-pretty">
            벽면 상태부터 작업 환경과 필요한 보수까지, 시공 범위를 합리적으로 판단하는 단계별 흐름입니다.
          </p>
        </div>

        {/* Connected Diagram Structure (Eliminates repeated card boxes) */}
        <div className="relative max-w-4xl mx-auto">
          {/* Desktop Horizontal Connector Line */}
          <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-[#E7D9C1] z-0" />

          {/* Mobile Vertical Connector Line */}
          <div className="md:hidden absolute top-6 bottom-6 left-6 w-0.5 bg-[#E7D9C1] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {DECISION_STEPS.map((item) => (
              <div
                key={item.step}
                className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-3"
              >
                {/* Step Circle Node */}
                <span className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F5F3EE] border-2 border-[#A3B18A] text-xs font-bold font-mono text-[#3E443B] flex items-center justify-center shadow-sm">
                  {item.step}
                </span>

                <div className="space-y-1 pt-1 md:pt-0">
                  <h3 className="text-sm font-bold text-[#3E443B]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5C5549] leading-relaxed max-w-[200px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-[#5C5549] max-w-md mx-auto">
            ※ 올케어는 일률적인 평수 기준이 아닌, 실제 벽면 상태와 보수 소요에 근거하여 합리적인 작업 범위를 제안합니다.
          </p>
        </div>
      </Container>
    </section>
  );
}
