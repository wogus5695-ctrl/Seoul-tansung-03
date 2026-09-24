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
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm border-t border-[#E7D9C1] p-3 sm:hidden"
    >
      <div className="flex gap-2 max-w-md mx-auto">
        {SITE_CONFIG.phone && (
          <a
            href={SITE_CONFIG.phoneHref || `tel:${SITE_CONFIG.phone}`}
            className="flex-1 bg-[#4F5844] text-[#F5F3EE] py-3 rounded-md text-center text-sm font-semibold hover:bg-[#3E443B] transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>전화 상담 ({SITE_CONFIG.phone})</span>
          </a>
        )}
        {SITE_CONFIG.kakaoConsultUrl && (
          <a
            href={SITE_CONFIG.kakaoConsultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#A3B18A] text-[#3E443B] py-3 rounded-md text-center text-sm font-semibold hover:bg-[#8F9E77] transition-colors"
          >
            카카오톡 상담
          </a>
        )}
      </div>
    </aside>
  );
}
