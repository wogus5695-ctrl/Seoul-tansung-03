import { NextResponse } from 'next/server';
import { OFFICIAL_SITE_ORIGIN, SITE_CONFIG } from '../../lib/config/site-config';
import { getAllGuides } from '../../lib/data/guides-data';
import { getAllKeywordGuides } from '../../lib/data/keyword-guides-data';
import { getDynamicRssItems } from '../../lib/data/dynamic-rss-data';

export async function GET() {
  const origin = SITE_CONFIG.siteOrigin || OFFICIAL_SITE_ORIGIN;
  const pillarGuides = getAllGuides();
  const keywordGuides = getAllKeywordGuides();

  const buildDate = 'Tue, 27 Oct 2026 17:30:00 +0900';

  // 1. Long-form Informational Pillar Guides (4 items - Always preserved)
  const pillarXmlItems = pillarGuides.map((guide) => renderGuideXmlItem(guide, origin));

  // 2. Keyword Guides (18 items - 1 Dynamic = 1 Guide = 1 RSS)
  const keywordXmlItems = keywordGuides.map((guide) => renderGuideXmlItem(guide, origin));

  // 3. Direct Short Dynamic Keyword RSS Items (Phase 6-N1A: 0 items, gated)
  const dynamicRssItems = getDynamicRssItems(origin);
  const dynamicXmlItems = dynamicRssItems.map((item) => {
    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <description>${escapeXml(item.description)}</description>
      <category>${escapeXml(item.category)}</category>
      <author>${escapeXml(item.author)}</author>
      <content:encoded><![CDATA[${item.contentEncoded}]]></content:encoded>
    </item>`;
  });

  const allItemsXml = [...pillarXmlItems, ...keywordXmlItems, ...dynamicXmlItems].join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.brandName)} 탄성코트 시공 가이드</title>
    <link>${origin}</link>
    <description>베란다 탄성코트 시공 전 도막 점검, 재시공, 견적 작업 범위 및 공간 비움·보양 체크리스트 전문 가이드</description>
    <language>ko</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>
${allItemsXml}
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

function renderGuideXmlItem(
  guide: {
    readonly slug: string;
    readonly title: string;
    readonly description: string;
    readonly publishedAtRfc822: string;
    readonly category: string;
    readonly h1: string;
    readonly intro: string;
    readonly sections: readonly { readonly h2: string; readonly paragraphs: readonly string[] }[];
    readonly checklistTitle: string;
    readonly checklistItems: readonly string[];
    readonly limitationTitle: string;
    readonly limitationNote: string;
  },
  origin: string
): string {
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
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
