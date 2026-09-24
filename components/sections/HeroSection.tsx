import React from 'react';
import { Container } from '../layout/Container';
import { HeroSlider } from '../ui/HeroSlider';
import { isContactConfigured, SITE_CONFIG } from '../../lib/config/site-config';

export function HeroSection() {
  const hasContact = isContactConfigured();
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <section aria-labelledby="hero-heading" className="w-full py-16 sm:py-24 lg:py-28 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Text Content (PC 42% / MO Order: Eyebrow -> H1 -> Description -> CTA -> Slider) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7D9C1]/50 text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
              <span>{SITE_CONFIG.brandNameEn} ELASTIC COATING</span>
            </div>

            <h1
              id="hero-heading"
              className="text-token-display text-[#3E443B] font-bold tracking-tight text-balance leading-tight"
            >
              공간의 상태부터 확인하는<br className="hidden sm:inline" /> {SITE_CONFIG.brandName} 탄성코트
            </h1>

            <p className="text-token-body text-[#5C5549] leading-relaxed max-w-md text-pretty">
              베란다와 세탁실의 벽면 상태를 먼저 살펴보고 필요한 작업 범위부터 정직하게 안내합니다.
            </p>

            {/* CTA Container */}
            {hasContact ? (
              <div className="pt-2 flex flex-wrap gap-3">
                {SITE_CONFIG.phone && (
                  <a
                    href={SITE_CONFIG.phoneHref || `tel:${SITE_CONFIG.phone}`}
                    className="px-6 py-3.5 rounded-md bg-[#4F5844] text-[#F5F3EE] font-semibold text-sm hover:bg-[#3E443B] transition-colors shadow-sm inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>전화 상담 문의 ({SITE_CONFIG.phone})</span>
                  </a>
                )}
                {SITE_CONFIG.kakaoConsultUrl && (
                  <a
                    href={SITE_CONFIG.kakaoConsultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-md bg-[#A3B18A] text-[#3E443B] font-semibold text-sm hover:bg-[#8F9E77] transition-colors shadow-sm"
                  >
                    카카오톡 문의
                  </a>
                )}
              </div>
            ) : isDev ? (
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#FAF8F5] border border-[#E7D9C1] text-xs text-[#5C5549]">
                  <span className="w-2 h-2 rounded-full bg-[#A3B18A]" />
                  <span>상담 채널 등록 준비 중 (개발 환경 안내)</span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Tall Vertical Visual Panel (PC 58% / MO Second) */}
          <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
            <HeroSlider />
          </div>
        </div>
      </Container>
    </section>
  );
}
