import React from 'react';
import { isContactConfigured, SITE_CONFIG } from '../../lib/config/site-config';

export function MobileFixedCTA() {
  // STRICT RULE: If contact information is unconfigured, do not render fake buttons
  if (!isContactConfigured()) {
    return null;
  }

  return (
    <aside
      aria-label="빠른 상담 안내"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm border-t border-[#E7D9C1] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
    >
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {SITE_CONFIG.phone && (
          <a
            href={SITE_CONFIG.phoneHref || `tel:${SITE_CONFIG.phone}`}
            className="bg-[#4F5844] text-[#F5F3EE] py-3 rounded-md text-center text-sm font-semibold hover:bg-[#3E443B] transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
            aria-label={`전화 상담 ${SITE_CONFIG.phone}`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>전화 문의</span>
          </a>
        )}
        {SITE_CONFIG.kakaoConsultUrl && (
          <a
            href={SITE_CONFIG.kakaoConsultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#3E443B] border border-[#4F5844]/40 py-3 rounded-md text-center text-sm font-semibold hover:bg-[#FAF8F5] transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
            aria-label="카카오톡 채널 문의하기"
          >
            <svg className="w-4 h-4 shrink-0 text-[#4F5844]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.5 3.75a3 3 0 00-3 3v9a3 3 0 003 3h2.25v3.19a.75.75 0 001.248.563L11.59 18.75h7.91a3 3 0 003-3v-9a3 3 0 00-3-3h-15z" />
            </svg>
            <span>카카오톡 문의</span>
          </a>
        )}
      </div>
    </aside>
  );
}
