import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '../../lib/config/site-config';
import { Container } from '../layout/Container';

const NAV_LINKS = [
  { label: '벽면 상태 확인', href: '#wall-check-heading' },
  { label: 'BEFORE & AFTER', href: '#before-after-heading' },
  { label: '공간별 확인', href: '#spaces-heading' },
  { label: '작업 기준', href: '#decision-heading' },
  { label: '진행 흐름', href: '#how-works-heading' },
  { label: 'FAQ', href: '#faq-heading' },
];

export function Header() {
  return (
    <header className="w-full bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E7D9C1] sticky top-0 z-40 transition-all">
      <Container className="h-16 flex items-center justify-between">
        {/* Official Brand Logo (Horizontal Signature) */}
        <Link href="/" className="flex items-center group py-1" aria-label="올케어 홈">
          <Image
            src="/images/allcare/allcare-signature.png"
            alt="올케어"
            width={1024}
            height={380}
            className="w-[130px] sm:w-[155px] lg:w-[170px] h-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="메인 메뉴" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-[#5C5549] hover:text-[#3E443B] transition-colors tracking-tight"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Right Action: Phone + Kakao Contact CTAs */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {SITE_CONFIG.phoneHref ? (
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center gap-1 sm:gap-1.5 text-xs font-semibold text-[#F5F3EE] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#4F5844] hover:bg-[#3E443B] transition-colors shadow-sm"
              aria-label={`전화 상담 ${SITE_CONFIG.phone}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="hidden sm:inline">전화 상담</span>
              <span className="sm:hidden">전화</span>
            </a>
          ) : (
            <a
              href="#final-cta-heading"
              className="text-xs font-semibold text-[#3E443B] px-3 py-1.5 rounded-full bg-[#E7D9C1]/50 hover:bg-[#E7D9C1] transition-colors"
            >
              상담 안내
            </a>
          )}
          {SITE_CONFIG.kakaoConsultUrl && (
            <a
              href={SITE_CONFIG.kakaoConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-1.5 text-xs font-semibold text-[#3E443B] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#4F5844]/40 transition-colors shadow-sm"
              aria-label="카카오톡 채널 문의하기"
            >
              <svg className="w-3.5 h-3.5 text-[#4F5844]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.5 3.75a3 3 0 00-3 3v9a3 3 0 003 3h2.25v3.19a.75.75 0 001.248.563L11.59 18.75h7.91a3 3 0 003-3v-9a3 3 0 00-3-3h-15z" />
              </svg>
              <span className="hidden sm:inline">카카오톡</span>
              <span className="sm:hidden">카톡</span>
            </a>
          )}
        </div>
      </Container>
    </header>
  );
}
