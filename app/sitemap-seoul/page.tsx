import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '../../components/layout/Container';
import { OFFICIAL_SITE_ORIGIN } from '../../lib/config/site-config';
import { buildPublicHref } from '../../lib/url/url-builder';

const PILOT_ITEMS = [
  { regionName: '강남구', serviceKeyword: '탄성코트', displayName: '강남구 탄성코트' },
  { regionName: '불광동', serviceKeyword: '탄성코트', displayName: '불광동 탄성코트' },
  { regionName: '마곡동', serviceKeyword: '탄성코트', displayName: '마곡동 탄성코트' },
  { regionName: '성수동', serviceKeyword: '탄성코트', displayName: '성수동 탄성코트' },
  { regionName: '창신동', serviceKeyword: '탄성코트', displayName: '창신동 탄성코트' },
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(OFFICIAL_SITE_ORIGIN),
  title: '서울 탄성코트 지역 안내 | 올케어',
  description:
    '올케어에서 현재 공개 중인 서울 탄성코트 지역별 안내 페이지입니다. 지역별 공개 공동주택 데이터와 시공 전 확인할 항목을 함께 확인할 수 있습니다.',
  alternates: {
    canonical: `${OFFICIAL_SITE_ORIGIN}/sitemap-seoul`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SeoulSitemapPage() {
  return (
    <main className="flex-1 py-12 sm:py-16 bg-[#FAF8F5]">
      <Container className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-3 border-b border-[#E7D9C1] pb-6">
          <p className="text-xs font-bold tracking-widest text-[#6B755D] uppercase">
            REGIONAL DIRECTORY
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3E443B]">
            서울 탄성코트 지역 안내
          </h1>
          <p className="text-sm text-[#5C5549] leading-relaxed">
            올케어에서 현재 공개 중인 서울 탄성코트 지역별 안내 페이지입니다. 지역별 공개 공동주택 데이터와 시공 전 확인할 항목을 함께 확인할 수 있습니다.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E7D9C1] p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-[#3E443B] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F5844]"></span>
            현재 검증 공개 중인 서울 지역 (5개 Pilot)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {PILOT_ITEMS.map((item) => {
              const href = buildPublicHref(item.regionName, item.serviceKeyword);
              return (
                <Link
                  key={item.displayName}
                  href={href}
                  className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAF8F5] border border-[#EFE8DC] hover:border-[#6B755D] text-[#3E443B] font-semibold text-sm transition-all group"
                >
                  <span>{item.displayName}</span>
                  <span className="text-xs font-normal text-[#6B755D] group-hover:translate-x-0.5 transition-transform">
                    보러가기 &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="text-xs text-[#756E61] pt-4 border-t border-[#E7D9C1]">
          ※ 본 안내 페이지에 등록된 5개 지역은 한국부동산원 공식 공동주택 식별 데이터 검증이 완료된 시범 공개 지역입니다.
        </div>
      </Container>
    </main>
  );
}
