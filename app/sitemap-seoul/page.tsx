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
  YANGCHEON_COHORT_REGION_IDS,
  RecoveryRegionId,
} from '../../lib/config/recovery-config';
import { SeoulDirectorySelector } from '../../components/directory/SeoulDirectorySelector';

export const metadata: Metadata = {
  metadataBase: new URL(OFFICIAL_SITE_ORIGIN),
  title: '서울 탄성코트 주요 지역 및 시공안내 | 올케어',
  description:
    '올케어에서 제공하는 서울 주요 22개 공식 안내 페이지(15개 기존 지역 및 양천 남부 코호트)별 공식 공동주택 통계 및 탄성코트·베란다탄성코트 시공 안내 모음입니다.',
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

  // Yangcheon Balcony Special Cohort Profiles (4 regions x 베란다탄성코트)
  const yangcheonBalconyProfiles = YANGCHEON_COHORT_REGION_IDS.map(
    (id) => RECOVERY_REGIONS_PROFILES[id as RecoveryRegionId]
  );

  return (
    <main className="flex-1 py-12 sm:py-16 bg-[#FAF8F5]">
      <Container className="max-w-5xl mx-auto space-y-10">
        {/* Header Block */}
        <div className="space-y-3 border-b border-[#E7D9C1] pb-6 text-left">
          <p className="text-xs font-bold tracking-widest text-[#6B755D] uppercase">
            SEOUL RECOVERY & COHORT DIRECTORY (22 PRIMARY PAGES)
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3E443B]">
            서울 탄성코트 주요 지역 안내
          </h1>
          <p className="text-sm text-[#5C5549] leading-relaxed max-w-2xl">
            올케어에서 제공하는 서울 주요 22개 공식 안내 페이지(15개 기존 지역 및 양천 남부 코호트)별 공식 공동주택 통계와 탄성코트·베란다탄성코트 시공 안내입니다.
            각 지역별 주거 현황과 사전 벽면 점검 기준을 확인하실 수 있습니다.
          </p>
        </div>

        {/* Primary Crawlable Recovery Grid: Exactly 22 Links */}
        <section
          aria-labelledby="recovery-hub-heading"
          className="bg-white rounded-xl border border-[#E7D9C1] p-6 sm:p-8 shadow-sm space-y-8 text-left"
        >
          <div className="border-b border-[#EFE8DC] pb-3">
            <h2 id="recovery-hub-heading" className="text-lg font-bold text-[#3E443B] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F5844]" />
              주요 공식 시공 안내 바로가기 (22개 공식 안내 페이지)
            </h2>
            <p className="text-xs sm:text-sm text-[#756E61] pt-1">
              아래 22개 주요 자치구 및 동별 상세 페이지에서 세부 시공 가이드를 확인하실 수 있습니다.
            </p>
          </div>

          {/* 1. 6 Autonomous Districts (GU) - 탄성코트 */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#6B755D] uppercase tracking-wider">
              1. 주요 자치구 탄성코트 안내 (6개 구)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {guProfiles.map((profile) => {
                const targetRegion = allRegions.find((r) => r.id === profile.id);
                const keywordName = targetRegion ? targetRegion.keywordRegionName : profile.name;
                const href = buildPublicHref(keywordName, RECOVERY_PRIMARY_INTENT);
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

          {/* 2. 12 Residential DONGs - 탄성코트 */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-[#6B755D] uppercase tracking-wider">
              2. 주요 동 단위 탄성코트 안내 (12개 동)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dongProfiles.map((profile) => {
                const targetRegion = allRegions.find((r) => r.id === profile.id);
                const keywordName = targetRegion ? targetRegion.keywordRegionName : profile.name;
                const href = buildPublicHref(keywordName, RECOVERY_PRIMARY_INTENT);
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

          {/* 3. Yangcheon South Cohort - 베란다탄성코트 (4개 안내 페이지) */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-[#6B755D] uppercase tracking-wider">
              3. 양천 남부 코호트 베란다탄성코트 안내 (4개 안내 페이지)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {yangcheonBalconyProfiles.map((profile) => {
                const targetRegion = allRegions.find((r) => r.id === profile.id);
                const keywordName = targetRegion ? targetRegion.keywordRegionName : profile.name;
                const href = buildPublicHref(keywordName, '베란다탄성코트');
                return (
                  <Link
                    key={`balcony-${profile.id}`}
                    href={href}
                    className="p-4 rounded-lg bg-[#FAF8F5] border border-[#EFE8DC] hover:border-[#4F5844] hover:bg-[#F5F2EB] transition-all block group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#3E443B] group-hover:text-[#4F5844]">
                        {profile.name} 베란다탄성코트
                      </span>
                      <span className="text-[11px] font-semibold text-[#6B755D] bg-[#EFE8DC] px-2 py-0.5 rounded">
                        베란다
                      </span>
                    </div>
                    <p className="text-xs text-[#756E61] pt-1.5">
                      외벽 접점부 및 창호 주변 집중 점검 가이드
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

        {/* Informational Guides Section (Semantically isolated from Dynamic Regional Grid) */}
        <section aria-labelledby="guide-links-heading" className="pt-6 border-t border-[#E7D9C1] text-left space-y-3">
          <h2 id="guide-links-heading" className="text-xs font-bold text-[#6B755D] uppercase tracking-wider">
            탄성코트 시공 전 참고 가이드
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/guide/balcony-coating-checklist"
              className="p-3.5 rounded-lg bg-white border border-[#E7D9C1] hover:border-[#4F5844] hover:bg-[#FAF8F5] transition-all block group"
            >
              <p className="text-xs font-bold text-[#3E443B] group-hover:text-[#4F5844] break-keep">
                베란다 탄성코트 시공 전 기존 도막에서 확인할 항목
              </p>
              <p className="text-[11px] text-[#756E61] pt-1">
                기존 도막 들뜸, 미세 균열 및 공간 비움 원칙 점검
              </p>
            </Link>
            <Link
              href="/guide/old-apartment-balcony-recoating-guide"
              className="p-3.5 rounded-lg bg-white border border-[#E7D9C1] hover:border-[#4F5844] hover:bg-[#FAF8F5] transition-all block group"
            >
              <p className="text-xs font-bold text-[#3E443B] group-hover:text-[#4F5844] break-keep">
                구축 아파트 베란다 탄성코트 재시공 전 확인할 항목
              </p>
              <p className="text-[11px] text-[#756E61] pt-1">
                다층 도막 축적, 보수 흔적 점검 및 밑작업 중요성 안내
              </p>
            </Link>
          </div>
        </section>

        <div className="text-xs text-[#756E61] pt-4 border-t border-[#E7D9C1] text-left">
          ※ 공개된 통계는 한국부동산원 공동주택 식별정보 공개자료(2026.08 기준)를 바탕으로 작성되었으며,
          특정 세대의 탄성코트 시공 필요성은 실제 현장 벽면 점검을 통해 판단합니다.
        </div>
      </Container>
    </main>
  );
}
