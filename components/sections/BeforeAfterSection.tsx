'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Container } from '../layout/Container';

interface CasePhoto {
  src: string;
  alt: string;
  objectPosition?: string;
}

interface CaseItem {
  id: string;
  tag: string;
  title: string;
  before: CasePhoto;
  after: CasePhoto;
}

const CASES: readonly CaseItem[] = [
  {
    id: 'case-01',
    tag: 'CASE 01',
    title: '베란다 탄성코트 시공 전 / 후',
    before: {
      src: '/images/allcare/before-after/ba-01-before.jpg',
      alt: '탄성코트 시공 전 베란다 벽면 상태',
      objectPosition: 'center center',
    },
    after: {
      src: '/images/allcare/before-after/ba-01-after.png',
      alt: '탄성코트 시공 후 정돈된 베란다 벽면',
      objectPosition: 'center center',
    },
  },
  {
    id: 'case-02',
    tag: 'CASE 02',
    title: '세탁실 탄성코트 시공 전 / 후',
    before: {
      src: '/images/allcare/before-after/ba-02-before.jpg',
      alt: '탄성코트 시공 전 세탁실 벽면 상태',
      objectPosition: 'center center',
    },
    after: {
      src: '/images/allcare/before-after/ba-02-after.png',
      alt: '탄성코트 시공 후 정돈된 세탁실 벽면',
      objectPosition: 'center center',
    },
  },
  {
    id: 'case-03',
    tag: 'CASE 03',
    title: '다용도 공간 탄성코트 시공 전 / 후',
    before: {
      src: '/images/allcare/before-after/ba-03-before.jpg',
      alt: '탄성코트 시공 전 다용도 공간 벽면 상태',
      // Focus on wall surface and crack area rather than worker
      objectPosition: 'center 30%',
    },
    after: {
      src: '/images/allcare/before-after/ba-03-after.jpg',
      alt: '탄성코트 시공 후 정돈된 다용도 공간 벽면',
      objectPosition: 'center center',
    },
  },
];

export function BeforeAfterSection() {
  const [activeCaseId, setActiveCaseId] = useState<string>('case-01');
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASES.find((c) => c.id === activeCaseId) || CASES[0];

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const cardStep = container.offsetWidth * 0.86;
    if (cardStep > 0) {
      const idx = Math.round(scrollLeft / cardStep);
      const clamped = Math.min(Math.max(0, idx), CASES.length - 1);
      if (clamped !== activeMobileIndex) {
        setActiveMobileIndex(clamped);
      }
    }
  };

  const scrollToCase = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardStep = container.offsetWidth * 0.86;
    container.scrollTo({
      left: index * cardStep,
      behavior: 'smooth',
    });
    setActiveMobileIndex(index);
  };

  return (
    <section aria-labelledby="before-after-heading" className="w-full py-16 sm:py-24 bg-[#FAF8F5]">
      <Container className="space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
              VISUAL EVIDENCE
            </p>
            <h2 id="before-after-heading" className="text-token-h1 text-[#3E443B]">
              BEFORE & AFTER
            </h2>
            <p className="text-token-body text-[#5C5549] max-w-lg">
              시공 전 상태와 마감 후 공간의 변화를 확인해보세요.
            </p>
          </div>

          {/* Desktop Case Switcher Tabs */}
          <div className="hidden sm:flex items-center gap-2 p-1 rounded-lg bg-[#F5F3EE] border border-[#E7D9C1]">
            {CASES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCaseId(item.id)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeCaseId === item.id
                    ? 'bg-[#3E443B] text-[#F5F3EE] shadow-sm'
                    : 'text-[#5C5549] hover:text-[#3E443B]'
                }`}
              >
                {item.tag}
              </button>
            ))}
          </div>
        </div>

        {/* DESKTOP VIEW: Primary Large Case Display (4:3 ratio) */}
        <div className="hidden sm:block space-y-4">
          <div className="flex items-center justify-between text-xs text-[#5C5549] px-1">
            <span className="font-semibold text-[#3E443B]">{activeCase.title}</span>
            <span className="font-mono">{activeCase.tag}</span>
          </div>

          <div className="grid grid-cols-2 gap-6 items-start">
            {/* BEFORE */}
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#5C5549] bg-[#E7D9C1]/50 px-2 py-0.5 rounded">
                BEFORE (시공 전)
              </span>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F3EE] border border-[#E7D9C1] shadow-sm">
                <Image
                  src={activeCase.before.src}
                  alt={activeCase.before.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 600px"
                  className="object-cover"
                  style={{ objectPosition: activeCase.before.objectPosition ?? 'center center' }}
                />
              </div>
            </div>

            {/* AFTER */}
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#3E443B] bg-[#A3B18A]/40 px-2 py-0.5 rounded">
                AFTER (시공 후)
              </span>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F3EE] border border-[#E7D9C1] shadow-sm">
                <Image
                  src={activeCase.after.src}
                  alt={activeCase.after.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 600px"
                  className="object-cover"
                  style={{ objectPosition: activeCase.after.objectPosition ?? 'center center' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Horizontal Scroll Snap with Peek Layout & Hidden Scrollbars (4:3 ratio) */}
        <div className="block sm:hidden space-y-3">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleMobileScroll}
            tabIndex={0}
            aria-label="시공 전후 사례 수평 스크롤"
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4 scroll-smooth focus-visible:outline-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {CASES.map((c) => (
              <div
                key={c.id}
                className="snap-center shrink-0 w-[86vw] max-w-[340px] bg-[#F5F3EE] p-3 sm:p-4 rounded-xl border border-[#E7D9C1] space-y-2.5"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-[#5C5549] uppercase">
                    {c.tag}
                  </span>
                  <h3 className="text-xs font-bold text-[#3E443B] truncate">
                    {c.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  {/* Before */}
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-[#5C5549]">BEFORE</span>
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#E7D9C1]">
                      <Image
                        src={c.before.src}
                        alt={c.before.alt}
                        fill
                        sizes="320px"
                        className="object-cover"
                        style={{ objectPosition: c.before.objectPosition ?? 'center center' }}
                      />
                    </div>
                  </div>

                  {/* After */}
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-[#3E443B]">AFTER</span>
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#E7D9C1]">
                      <Image
                        src={c.after.src}
                        alt={c.after.alt}
                        fill
                        sizes="320px"
                        className="object-cover"
                        style={{ objectPosition: c.after.objectPosition ?? 'center center' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Case Indicator (Replaces native scrollbar) */}
          <div className="flex items-center justify-between px-1 pt-1">
            {/* Dot indicators */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {CASES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToCase(idx)}
                  aria-label={`사례 ${idx + 1}로 이동`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeMobileIndex === idx
                      ? 'w-6 bg-[#3E443B]'
                      : 'w-2 bg-[#E7D9C1] hover:bg-[#A3B18A]'
                  }`}
                />
              ))}
            </div>

            {/* Numeric counter */}
            <div className="text-[11px] font-mono font-bold text-[#3E443B]">
              <span>0{activeMobileIndex + 1}</span>
              <span className="text-[#A89F91] mx-1">/</span>
              <span className="text-[#5C5549]">0{CASES.length}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
