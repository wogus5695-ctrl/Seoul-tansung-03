import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '../../components/layout/Container';
import { OFFICIAL_SITE_ORIGIN } from '../../lib/config/site-config';
import { getActiveRegions } from '../../lib/contracts/regions-contract';
import { buildPublicHref } from '../../lib/url/url-builder';
import {
  RECOVERY_REGION_IDS,
  RECOVERY_REGIONS_PROFILES,
  RECOVERY_PRIMARY_INTENT,
} from '../../lib/config/recovery-config';
import { SeoulDirectorySelector } from '../../components/directory/SeoulDirectorySelector';

export const metadata: Metadata = {
  metadataBase: new URL(OFFICIAL_SITE_ORIGIN),
  title: '서울 탄성코트 주요 지역 및 시공안내 | 올케어',
  description:
    '올케어에서 제공하는 서울 주요 15개 지역별 공식 공동주택 통계 및 탄성코트 시공 안내 페이지 모음입니다.',
  alternates: {
    canonical: `${OFFICIAL_SITE_ORIGIN}/sitemap-seoul`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function SeoulSitemapPage() {
  const allRegions = getActiveRegions(false);
  const approvedRegions = allRegions.filter(
    (r) => r.id !== 'seoul-eunpyeong-sinsa' && r.publicationState !== 'PUBLISHED_NOINDEX'
  );

  const recoveryProfiles = RECOVERY_REGION_IDS.map((id) => RECOVERY_REGIONS_PROFILES[id]);

  const guProfiles = recoveryProfiles.filter((p) => p.type === 'GU');
  const dongProfiles = recoveryProfiles.filter((p) => p.type === 'DONG');

  return (
    <main className="flex-1 py-12 sm:py-16 bg-[#FAF8F5]">
      <Container className="max-w-5xl mx-auto space-y-10">
        {/* Header Block */}
        <div className="space-y-3 border-b border-[#E7D9C1] pb-6 text-left">
          <p className="text-xs font-bold tracking-widest text-[#6B755D] uppercase">
            SEOUL RECOVERY DIRECTORY (15 PRIMARY REGIONS)
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3E443B]">
            서울 탄성코트 주요 지역 안내
          </h1>
          <p className="text-sm text-[#5C5549] leading-relaxed max-w-2xl">
            올케어에서 제공하는 서울 주요 15개 지역별 공식 공동주택 통계와 탄성코트 시공 안내입니다.
            각 지역별 주거 현황과 사전 벽면 점검 기준을 확인하실 수 있습니다.
          </p>
        </div>

        {/* Primary Crawlable Recovery Grid: Exactly 15 Links */}
        <section
          aria-labelledby="recovery-hub-heading"
          className="bg-white rounded-xl border border-[#E7D9C1] p-6 sm:p-8 shadow-sm space-y-6 text-left"
        >
          <div className="border-b border-[#EFE8DC] pb-3">
            <h2 id="recovery-hub-heading" className="text-lg font-bold text-[#3E443B] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F5844]" />
              주요 15개 지역 시공 안내 바로가기 (15개 공식 안내 페이지)
            </h2>
            <p className="text-xs sm:text-sm text-[#756E61] pt-1">
              아래 15개 주요 자치구 및 동별 상세 페이지에서 세부 시공 가이드를 확인하실 수 있습니다.
            </p>
          </div>

          {/* 5 Autonomous Districts (GU) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#6B755D] uppercase tracking-wider">
              1. 주요 자치구 안내 (5개 구)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {guProfiles.map((profile) => {
                const href = buildPublicHref(profile.name, RECOVERY_PRIMARY_INTENT);
                return (
                  <Link
                    key={profile.id}
                    href={href}
                    className="p-4 rounded-lg bg-[#FAF8F5] border border-[#EFE8DC] hover:border-[#4F5844] hover:bg-[#F5F2EB] transition-all block group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#3E443B] group-hover:text-[#4F5844]">
                        {profile.name} {RECOVERY_PRIMARY_INTENT}
                      </span>
                      <span className="text-[11px] font-semibold text-[#6B755D] bg-[#EFE8DC] px-2 py-0.5 rounded">
                        자치구
                      </span>
                    </div>
                    <p className="text-xs text-[#756E61] pt-1.5">
                      등록 공동주택 {profile.units.toLocaleString()}개 단위 현황 및 점검 가이드
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 10 Residential DONGs */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-[#6B755D] uppercase tracking-wider">
              2. 주요 동 단위 안내 (10개 동)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dongProfiles.map((profile) => {
                const href = buildPublicHref(profile.name, RECOVERY_PRIMARY_INTENT);
                return (
                  <Link
                    key={profile.id}
                    href={href}
                    className="p-4 rounded-lg bg-[#FAF8F5] border border-[#EFE8DC] hover:border-[#4F5844] hover:bg-[#F5F2EB] transition-all block group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#3E443B] group-hover:text-[#4F5844]">
                        {profile.name} {RECOVERY_PRIMARY_INTENT}
                      </span>
                      <span className="text-[11px] font-semibold text-[#6B755D] bg-[#EFE8DC] px-2 py-0.5 rounded">
                        {profile.parentGu}
                      </span>
                    </div>
                    <p className="text-xs text-[#756E61] pt-1.5">
                      등록 공동주택 {profile.units.toLocaleString()}개 단위 현황 및 점검 가이드
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* User Interactive Directory (Zero hidden crawl links) */}
        <section aria-labelledby="all-directory-heading">
          <SeoulDirectorySelector regions={approvedRegions} />
        </section>

        <div className="text-xs text-[#756E61] pt-4 border-t border-[#E7D9C1] text-left">
          ※ 공개된 통계는 한국부동산원 공동주택 식별정보 공개자료(2026.08 기준)를 바탕으로 작성되었으며,
          특정 세대의 탄성코트 시공 필요성은 실제 현장 벽면 점검을 통해 판단합니다.
        </div>
      </Container>
    </main>
  );
}
