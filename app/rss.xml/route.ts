import { NextResponse } from 'next/server';
import { OFFICIAL_SITE_ORIGIN, SITE_CONFIG } from '../../lib/config/site-config';
import { getAllGuides } from '../../lib/data/guides-data';

export async function GET() {
  const origin = SITE_CONFIG.siteOrigin || OFFICIAL_SITE_ORIGIN;
  const guides = getAllGuides();

  const buildDate = 'Mon, 26 Oct 2026 09:00:00 +0900';

  const itemsXml = guides
    .map((guide) => {
      const guideUrl = `${origin}/guide/${guide.slug}`;
      const escapedTitle = escapeXml(guide.title);
      const escapedDesc = escapeXml(guide.description);

      // Full semantic article body representation for RSS readers
      const sectionsHtml = guide.sections
        .map(
          (s) =>
            `<h2>${s.h2}</h2>${s.paragraphs.map((p) => `<p>${p}</p>`).join('')}`
        )
        .join('');

      const checklistHtml = `<h2>${guide.checklistTitle}</h2><ul>${guide.checklistItems
        .map((item) => `<li>${item}</li>`)
        .join('')}</ul>`;

      const limitationHtml = `<p><strong>${guide.limitationTitle}</strong><br/>${guide.limitationNote}</p>`;

      const fullArticleHtml = `<h1>${guide.h1}</h1><p>${guide.intro}</p>${sectionsHtml}${checklistHtml}${limitationHtml}`;

      return `    <item>
      <title>${escapedTitle}</title>
      <link>${guideUrl}</link>
      <guid isPermaLink="true">${guideUrl}</guid>
      <pubDate>${guide.publishedAtRfc822}</pubDate>
      <description>${escapedDesc}</description>
      <category>${escapeXml(guide.category)}</category>
      <author>${escapeXml(SITE_CONFIG.brandName)}</author>
      <content:encoded><![CDATA[${fullArticleHtml}]]></content:encoded>
    </item>`;
    })
    .join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.brandName)} 탄성코트 시공 가이드</title>
    <link>${origin}</link>
    <description>베란다 탄성코트 시공 전 도막 점검, 재시공, 견적 작업 범위 및 공간 비움·보양 체크리스트 전문 가이드</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
