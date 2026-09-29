import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { Container } from '../../components/layout/Container';
import { OFFICIAL_SITE_ORIGIN } from '../../lib/config/site-config';
import { getActiveRegions } from '../../lib/contracts/regions-contract';
import { SEARCH_INTENTS } from '../../lib/contracts/intents-contract';
import { buildPublicHref } from '../../lib/url/url-builder';
import { RegionItem } from '../../lib/types/regions';

export const metadata: Metadata = {
  metadataBase: new URL(OFFICIAL_SITE_ORIGIN),
  title: '서울 탄성코트 전체 지역 및 시공안내 | 올케어',
  description:
    '올케어에서 제공하는 서울 25개 자치구 317개 지역별 탄성코트, 베란다탄성코트, 세탁실탄성코트, 아파트탄성코트, 탄성코트시공, 탄성코트업체 안내 페이지 모음입니다.',
  alternates: {
    canonical: `${OFFICIAL_SITE_ORIGIN}/sitemap-seoul`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface SeoulSitemapPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SeoulSitemapPage({ searchParams }: SeoulSitemapPageProps = {}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const isSecretAccess = resolvedParams.access === 'allcare' || resolvedParams.key === 'allcare';

  // Check HTTP User-Agent for search engine crawlers (Googlebot, Naver Yeti, Bingbot, etc.)
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';

  const isBot = /googlebot|yeti|naverbot|bingbot|slurp|duckduckbot|baiduspider|daum|facebookexternalhit|twitterbot|semrushbot|ahrefsbot|bytespider/i.test(userAgent);
  const isDevOrTest = process.env.NODE_ENV !== 'production';

  // If a general human visitor or competitor accesses directly without secret access key, return 404 (Not Found)
  if (!isBot && !isSecretAccess && !isDevOrTest) {
    notFound();
  }

  const allRegions = getActiveRegions(false);
  const approvedRegions = allRegions.filter(
    (r) => r.id !== 'seoul-eunpyeong-sinsa' && r.publicationState !== 'PUBLISHED_NOINDEX'
  );

  // Group by sigugun / parent GU
  const guMap = new Map<string, RegionItem[]>();
  for (const r of approvedRegions) {
    const guName = r.sigugun || r.displayName;
    if (!guMap.has(guName)) guMap.set(guName, []);
    guMap.get(guName)!.push(r);
  }

  const guList = Array.from(guMap.entries());

  return (
    <main className="flex-1 py-12 sm:py-16 bg-[#FAF8F5]">
      <Container className="max-w-5xl mx-auto space-y-10">
        <div className="space-y-3 border-b border-[#E7D9C1] pb-6">
          <p className="text-xs font-bold tracking-widest text-[#6B755D] uppercase">
            SEOUL REGIONAL DIRECTORY (317 REGIONS / 1,902 PAGES)
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3E443B]">
            서울 탄성코트 지역 안내
          </h1>
          <p className="text-sm text-[#5C5549] leading-relaxed">
            올케어에서 제공하는 서울 25개 자치구 317개 지역별 탄성코트, 베란다탄성코트, 세탁실탄성코트, 아파트탄성코트, 탄성코트시공, 탄성코트업체 안내 페이지 모음입니다.
          </p>
        </div>

        <div className="space-y-8">
          {guList.map(([guName, regions]) => (
            <section
              key={guName}
              className="bg-white rounded-xl border border-[#E7D9C1] p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-3">
                <h2 className="text-lg font-bold text-[#3E443B] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4F5844]"></span>
                  {guName} ({regions.length}개 지역 / {regions.length * 6}개 안내 페이지)
                </h2>
                <span className="text-xs font-semibold text-[#6B755D] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#EFE8DC]">
                  {guName} 전체 공개
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regions.map((region) => (
                  <div
                    key={region.id}
                    className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#EFE8DC] space-y-2"
                  >
                    <div className="text-sm font-bold text-[#3E443B]">
                      📍 {region.displayName}
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {SEARCH_INTENTS.map((intent) => {
                        const href = buildPublicHref(region.keywordRegionName, intent.serviceKeyword);
                        return (
                          <Link
                            key={intent.serviceKeyword}
                            href={href}
                            className="inline-block px-2 py-1 bg-white hover:bg-[#4F5844] text-[#5C5549] hover:text-white rounded border border-[#E3D9C9] transition-colors"
                          >
                            {region.keywordRegionName} {intent.serviceKeyword}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="text-xs text-[#756E61] pt-4 border-t border-[#E7D9C1]">
          ※ 본 디렉토리에 공개된 317개 서울 지역(1,902개 안내 페이지)은 한국부동산원 공식 공동주택 데이터 및 정합성이 검증된 전체 공개 대상입니다.
        </div>
      </Container>
    </main>
  );
}
