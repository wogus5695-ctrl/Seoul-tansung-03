import React from 'react';
import { Container } from '../layout/Container';


const PROCESS_STEPS = [
  {
    step: '01',
    title: '현장 벽면 상태 확인',
    desc: '기존 페인트의 들뜸, 균열 부위, 습기 흔적을 살펴 필요한 작업 범위를 파악합니다.',
  },
  {
    step: '02',
    title: '시설물 보호 및 보양',
    desc: '작업 공간 주변의 창호, 배관, 수전, 바닥 등을 마스킹 테이프로 보호합니다.',
  },
  {
    step: '03',
    title: '바탕면 정리 & 보수',
    desc: '들뜬 도막을 긁어내어 정리하고 균열 부위 등 필요한 면 보수를 진행합니다.',
  },
  {
    step: '04',
    title: '탄성코트 작업',
    desc: '작업 공간의 벽면과 모서리 등 필요한 부위에 맞춰 탄성코트 작업을 진행합니다.',
  },
  {
    step: '05',
    title: '보양재 정리 & 환기 안내',
    desc: '보양재를 정리하고, 작업 후 도막이 안정될 수 있는 환기 및 기본 관리 수칙을 안내합니다.',
  },
];

export function IntentWorkGuideSection() {

  return (
    <section
      aria-labelledby="intent-guide-heading"
      className="w-full py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E7D9C1]"
    >
      <Container className="space-y-12">
        <div className="max-w-2xl text-left space-y-3">
          <p className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
            WORK PROCESS · 올케어 작업 과정
          </p>
          <h2
            id="intent-guide-heading"
            className="text-token-h2 text-[#3E443B] font-bold tracking-tight text-balance leading-snug"
          >
            작업은 이렇게 진행됩니다
          </h2>
          <p className="text-token-body text-[#5C5549] leading-relaxed text-pretty">
            현장 상태 확인부터 시설물 보양, 바탕면 정리, 탄성코트 작업, 작업 후 안내까지의 기본 진행 순서입니다.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((s) => (
            <div
              key={s.step}
              className="p-5 rounded-xl bg-[#F5F3EE] border border-[#E7D9C1]/80 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#4F5844] tracking-wider">
                  STEP {s.step}
                </span>
                <h3 className="text-sm font-bold text-[#3E443B] leading-snug">
                  {s.title}
                </h3>
              </div>
              <p className="text-xs text-[#5C5549] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
