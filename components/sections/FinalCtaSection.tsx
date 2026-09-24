import React from 'react';
import Image from 'next/image';
import { Container } from '../layout/Container';
import { isContactConfigured, SITE_CONFIG } from '../../lib/config/site-config';

export function FinalCtaSection() {
  const hasContact = isContactConfigured();
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="w-full relative overflow-hidden bg-[#2D322A] text-[#F5F3EE] py-20 sm:py-28 border-t border-[#3E443B]"
    >
      {/* Background Visual Layer with Real Image & Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/allcare/sections/final-cta-bg.jpg"
          alt="올케어 상담 섹션 배경 주거 공간"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Gradient Overlay for Maximum Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D322A]/85 via-[#2D322A]/90 to-[#242822]/95" />
      </div>

      {/* Foreground Content */}
      <Container className="relative z-10 max-w-2xl text-center space-y-6">
        <p className="text-xs font-semibold text-[#A3B18A] tracking-wider uppercase">
          CONSULTATION
        </p>

        <h2
          id="final-cta-heading"
          className="text-token-h1 text-[#F5F3EE] font-semibold tracking-[-0.025em] break-keep text-balance max-w-lg mx-auto"
        >
          우리 집 벽면 상태부터<br className="hidden sm:inline" /> 확인해보세요
        </h2>

        <p className="text-token-body text-[#E7D9C1]/90 max-w-lg mx-auto leading-relaxed text-pretty">
          사진이나 현재 벽면 상태를 알려주시면 확인해야 할 부분과 필요한 작업 범위를 상담할 수 있습니다.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          {hasContact ? (
            <>
              {SITE_CONFIG.phone && (
                <a
                  href={SITE_CONFIG.phoneHref || `tel:${SITE_CONFIG.phone}`}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#4F5844] text-[#F5F3EE] font-semibold text-sm hover:bg-[#3E443B] transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>전화 상담 연결 ({SITE_CONFIG.phone})</span>
                </a>
              )}
              {SITE_CONFIG.kakaoConsultUrl && (
                <a
                  href={SITE_CONFIG.kakaoConsultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#A3B18A] text-[#3E443B] font-semibold text-sm hover:bg-[#8F9E77] transition-colors"
                >
                  카카오톡 상담하기
                </a>
              )}
            </>
          ) : isDev ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#3E443B]/80 border border-[#E7D9C1]/30 text-xs text-[#E7D9C1]">
              <span className="w-2 h-2 rounded-full bg-[#A3B18A]" />
              <span>상담 채널 등록 준비 중 (개발 환경 안내)</span>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
