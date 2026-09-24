import React from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '../../lib/config/site-config';
import { Container } from '../layout/Container';

export function Footer() {
  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-[#E7D9C1] mt-auto py-12">
      <Container className="space-y-6 text-xs text-[#5C5549]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7D9C1]/50 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/allcare/official-allcare-logo.png"
                alt="allcare 로고"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <div className="space-y-0.5">
                <div className="font-bold text-sm text-[#3E443B]">{SITE_CONFIG.businessName}</div>
                <div className="text-[11px] font-semibold text-[#5C5549]">{SITE_CONFIG.brandNameEn}</div>
              </div>
            </div>
            <p className="text-xs text-[#5C5549] max-w-sm leading-relaxed">
              주거 공간의 벽면 상태를 먼저 살피고 정직한 시공 범위를 제안하는 탄성코트 전문 브랜드입니다.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <div className="text-xs font-semibold text-[#3E443B]">
              {SITE_CONFIG.businessCategory}
            </div>
            {SITE_CONFIG.phone && (
              <a
                href={SITE_CONFIG.phoneHref || `tel:${SITE_CONFIG.phone}`}
                className="text-sm font-bold text-[#4F5844] hover:text-[#3E443B] transition-colors inline-flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>문의전화 {SITE_CONFIG.phone}</span>
              </a>
            )}
          </div>
        </div>

        {/* Official business details */}
        <div className="space-y-1 text-token-caption leading-relaxed text-[#756E61]">
          <p>
            상호: {SITE_CONFIG.businessName}
            {SITE_CONFIG.representativeName && ` | 대표자: ${SITE_CONFIG.representativeName}`}
            {SITE_CONFIG.businessNumber && ` | 사업자등록번호: ${SITE_CONFIG.businessNumber}`}
          </p>
          {SITE_CONFIG.address && (
            <p>소재지: {SITE_CONFIG.address}</p>
          )}
          <p>© {new Date().getFullYear()} {SITE_CONFIG.businessName} ({SITE_CONFIG.brandNameEn}). All rights reserved. 본 사이트의 모든 콘텐츠 및 시공 자산은 올케어의 지적 재산입니다.</p>
        </div>
      </Container>
    </footer>
  );
}
