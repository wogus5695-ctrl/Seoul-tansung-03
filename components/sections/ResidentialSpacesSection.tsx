import React from 'react';
import { Container } from '../layout/Container';
import Image from 'next/image';
import { RegionItem } from '../../lib/types/regions';
import { SearchIntentItem } from '../../lib/types/intents';
import { getRecoveryProfile } from '../../lib/config/recovery-config';

const SPACES = [
  {
    name: '베란다',
    focus: '창호 주변과 외벽에 접한 벽면의 기존 도막과 습기 흔적을 확인합니다.',
  },
  {
    name: '세탁실',
    focus: '배관 주변과 세탁기·건조기 설치 공간의 벽면 상태와 작업 여건을 확인합니다.',
  },
  {
    name: '다용도 공간',
    focus: '사용 환경과 기존 마감 상태에 따라 확인해야 할 작업 범위를 살펴봅니다.',
  },
];

interface DynamicSpacesProps {
  region: RegionItem;
  intent: SearchIntentItem;
}

interface ResidentialSpacesSectionProps {
  dynamic?: DynamicSpacesProps;
}

export function ResidentialSpacesSection({ dynamic }: ResidentialSpacesSectionProps = {}) {
  const recoveryProfile = dynamic ? getRecoveryProfile(dynamic.region.id) : null;

  return (
    <section aria-labelledby="spaces-heading" className="w-full py-16 sm:py-24 bg-[#F5F3EE]">
      <Container className="space-y-10 sm:space-y-14">
        <div className="max-w-xl space-y-2 text-left">
          <p className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
            RESIDENTIAL SPACES
          </p>
          <h2 id="spaces-heading" className="text-token-h1 text-[#3E443B]">
            공간마다 확인해야 할 부분이 다릅니다
          </h2>
          <p className="text-token-body text-[#5C5549]">
            같은 집이라도 공간의 위치와 용도에 따라 확인해야 할 벽면 상태와 작업 환경이 달라질 수 있습니다.
          </p>
        </div>

        {/* 1 Large Visual + 3 Text Points Layout (Eliminates 3 separate card boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Large Visual Slot (60%) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E7D9C1] shadow-sm">
              <Image
                src="/images/allcare/sections/residential-spaces.jpg"
                alt="올케어 주거 공간 대표 시공 벽면"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right: 3 Clean Typographic Points (40%) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {SPACES.map((space, idx) => (
              <div
                key={space.name}
                className={`pb-5 space-y-1.5 ${
                  idx < SPACES.length - 1 ? 'border-b border-[#E7D9C1]' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3B18A]" />
                  <h3 className="text-base font-bold text-[#3E443B]">
                    {space.name}
                  </h3>
                </div>
                <p className="text-token-small text-[#5C5549] leading-relaxed pl-3.5">
                  {space.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 6-H2B Distributed Local Typology Context (Strictly Non-Causal) */}
        {recoveryProfile && (
          <div className="pt-6 border-t border-[#E7D9C1] text-left max-w-3xl mx-auto space-y-1.5">
            <p className="text-xs sm:text-sm text-[#3E443B] leading-relaxed">
              한국부동산원 공개 데이터에 따르면 {recoveryProfile.name} 등록 공동주택 {recoveryProfile.units.toLocaleString()}개 단위 중 아파트 비중은 {recoveryProfile.aptShare}, 다세대·연립 비중은 {recoveryProfile.villaShare}입니다.
            </p>
            <p className="text-xs text-[#756E61] leading-relaxed">
              공간 구조나 주거 유형과 무관하게, 베란다와 세탁실의 실제 시공 구역은 벽면 도막 상태와 보양 필요 범위를 점검하여 결정합니다.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
