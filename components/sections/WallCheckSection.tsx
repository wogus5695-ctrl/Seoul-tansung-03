import React from 'react';
import Image from 'next/image';
import { Container } from '../layout/Container';

const CHECK_POINTS = [
  {
    num: '01',
    title: '도막 들뜸',
    desc: '페인트가 부풀거나 가루처럼 떨어지는 상태',
  },
  {
    num: '02',
    title: '균열',
    desc: '벽체나 창호 모서리에 실금이 발생한 상태',
  },
  {
    num: '03',
    title: '오염 / 곰팡이',
    desc: '벽면이나 모서리에 검은 얼룩 또는 오염 흔적이 확인되는 상태',
  },
  {
    num: '04',
    title: '습기 흔적',
    desc: '벽면이나 창가 주변에 습기 자국이 확인되는 상태',
  },
];

export function WallCheckSection() {
  return (
    <section
      aria-labelledby="wall-check-heading"
      className="w-full relative overflow-hidden bg-[#2D322A] text-[#F5F3EE] py-20 sm:py-28 border-y border-[#3E443B]"
    >
      {/* Background Visual Layer with Real Image & Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/allcare/sections/wall-check-bg.jpg"
          alt="베란다 벽면 노후 도막 및 상태 확인 배경"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Gradient Overlay for Maximum Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D322A]/90 via-[#2D322A]/80 to-[#242822]/95" />
      </div>

      {/* Foreground Content Container */}
      <Container className="relative z-10 space-y-12 sm:space-y-16">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold text-[#A3B18A] tracking-wider uppercase">
            WALL CHECK POINTS
          </p>
          <h2
            id="wall-check-heading"
            className="text-token-display font-bold text-[#F5F3EE] text-balance leading-tight"
          >
            이런 벽면 상태가 보이시나요?
          </h2>
          <p className="text-token-body text-[#E7D9C1]/90 max-w-xl text-pretty leading-relaxed">
            같은 탄성코트 시공이라도 기존 벽면 상태에 따라 필요한 작업 범위가 달라질 수 있습니다.
          </p>
        </div>

        {/* 4 Check Points Overlay Grid (Clean typography, no separate image cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-[#E7D9C1]/20">
          {CHECK_POINTS.map((point) => (
            <div key={point.num} className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#A3B18A] tracking-widest">
                {point.num}
              </span>
              <h3 className="text-base font-semibold text-[#F5F3EE]">
                {point.title}
              </h3>
              <p className="text-xs text-[#E7D9C1]/80 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
