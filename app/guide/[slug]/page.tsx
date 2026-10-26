import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '../../../components/layout/Container';
import { getGuideBySlug, getAllGuides } from '../../../lib/data/guides-data';
import { SITE_CONFIG, OFFICIAL_SITE_ORIGIN } from '../../../lib/config/site-config';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuides().map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: '가이드를 찾을 수 없습니다 | 올케어',
      robots: { index: false, follow: false },
    };
  }

  const origin = SITE_CONFIG.siteOrigin || OFFICIAL_SITE_ORIGIN;
  const canonicalUrl = `${origin}/guide/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: guide.publishedAt,
      siteName: SITE_CONFIG.brandName,
      locale: 'ko_KR',
      images: [
        {
          url: `${origin}/images/allcare/og-thumbnail.jpg`,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.brandName} ${guide.h1}`,
        },
      ],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const origin = SITE_CONFIG.siteOrigin || OFFICIAL_SITE_ORIGIN;
  const canonicalUrl = `${origin}/guide/${guide.slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: origin,
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/images/allcare/logo-allcare.png`,
      },
    },
  };

  return (
    <main className="flex-1 bg-[#FAF8F5]">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-[#E7D9C1]/60 bg-white/70 backdrop-blur-xs">
        <Container className="py-3">
          <ol className="flex items-center space-x-2 text-xs text-[#756E61]">
            <li>
              <Link href="/" className="hover:text-[#4F5844] transition-colors">
                홈
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-[#5C5549] font-medium">{guide.category}</span>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#1B1A18] font-semibold truncate max-w-[200px] sm:max-w-md">
              {guide.h1}
            </li>
          </ol>
        </Container>
      </nav>

      <article className="py-12 sm:py-16">
        <Container className="max-w-3xl space-y-10">
          {/* Header */}
          <header className="space-y-4 border-b border-[#E7D9C1] pb-8 text-left">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EFE8DC] text-[#4F5844]">
                {guide.category}
              </span>
              <time dateTime={guide.publishedAt} className="text-xs text-[#756E61]">
                2026.10 기준 점검 가이드
              </time>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1B1A18] leading-tight break-keep">
              {guide.h1}
            </h1>
            <p className="text-sm sm:text-base text-[#5C5549] leading-relaxed break-keep bg-white p-5 rounded-lg border border-[#E7D9C1]">
              {guide.intro}
            </p>
          </header>

          {/* Body Sections */}
          <div className="space-y-10 text-left">
            {guide.sections.map((section, idx) => (
              <section key={idx} className="space-y-3.5">
                <h2 className="text-lg sm:text-xl font-bold text-[#3E443B] break-keep border-l-3 border-[#4F5844] pl-3">
                  {section.h2}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-[#4A4740] leading-relaxed break-keep">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* Practical Checklist */}
          <section
            aria-labelledby="checklist-heading"
            className="p-6 rounded-xl bg-white border border-[#E7D9C1] space-y-4 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F5844]" />
              <h2 id="checklist-heading" className="text-base sm:text-lg font-bold text-[#1B1A18]">
                {guide.checklistTitle}
              </h2>
            </div>
            <ul className="space-y-2.5 text-sm sm:text-base text-[#3E443B]">
              {guide.checklistItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#4F5844] font-bold select-none shrink-0">✓</span>
                  <span className="break-keep">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Limitation / Caution Note */}
          <section
            aria-labelledby="limitation-heading"
            className="p-5 rounded-lg bg-[#F5F2EB] border border-[#E7D9C1] text-left space-y-2"
          >
            <h2 id="limitation-heading" className="text-xs font-bold text-[#6B755D] uppercase tracking-wider">
              {guide.limitationTitle}
            </h2>
            <p className="text-xs text-[#756E61] leading-relaxed break-keep">
              {guide.limitationNote}
            </p>
          </section>

          {/* Related Internal Navigation */}
          <section aria-labelledby="related-heading" className="pt-6 border-t border-[#E7D9C1] text-left space-y-4">
            <h2 id="related-heading" className="text-sm font-bold text-[#1B1A18]">
              관련 시공 정보 및 디렉토리
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guide.relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="p-4 rounded-lg bg-white border border-[#E7D9C1] hover:border-[#4F5844] hover:bg-[#FAF8F5] transition-all block group"
                >
                  <p className="text-sm font-bold text-[#3E443B] group-hover:text-[#4F5844] break-keep">
                    {link.title}
                  </p>
                  <p className="text-xs text-[#756E61] pt-1 break-keep">
                    {link.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Consultation CTA Banner */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-[#4F5844] to-[#3E443B] text-white text-left sm:text-center space-y-3">
            <h3 className="text-lg font-bold">우리 집 베란다 벽면 상태 점검이 필요하신가요?</h3>
            <p className="text-xs sm:text-sm text-[#E7D9C1] break-keep">
              벽면 사진 1~2장을 전달해 주시면 도막 들뜸 및 바탕면 보수 필요 여부를 사전에 상세히 상담해 드립니다.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-start sm:justify-center gap-3">
              <a
                href={SITE_CONFIG.phoneHref || `tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#3E443B] text-sm font-bold hover:bg-[#FAF8F5] transition-colors shadow-sm"
                aria-label={`전화 상담 ${SITE_CONFIG.phone}`}
              >
                <svg className="w-4 h-4 shrink-0 text-[#4F5844]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>전화 문의</span>
              </a>
              {SITE_CONFIG.kakaoConsultUrl && (
                <a
                  href={SITE_CONFIG.kakaoConsultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF8F5] text-[#3E443B] text-sm font-bold hover:bg-white transition-colors border border-[#E7D9C1] shadow-sm"
                  aria-label="카카오톡 채널 문의하기"
                >
                  <svg className="w-4 h-4 shrink-0 text-[#4F5844]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4.5 3.75a3 3 0 00-3 3v9a3 3 0 003 3h2.25v3.19a.75.75 0 001.248.563L11.59 18.75h7.91a3 3 0 003-3v-9a3 3 0 00-3-3h-15z" />
                  </svg>
                  <span>카카오톡 문의</span>
                </a>
              )}
            </div>
          </div>
        </Container>
      </article>
    </main>
  );
}
