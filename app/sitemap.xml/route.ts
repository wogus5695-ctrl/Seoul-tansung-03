import { NextResponse } from 'next/server';
import { OFFICIAL_SITE_ORIGIN } from '../../lib/config/site-config';
import { getActiveRegions } from '../../lib/contracts/regions-contract';
import { SEARCH_INTENTS } from '../../lib/contracts/intents-contract';
import { buildPublicHref } from '../../lib/url/url-builder';

export async function GET() {
  const origin = OFFICIAL_SITE_ORIGIN;
  const regions = getActiveRegions(false); // Official production dataset (318 regions)

  const dynamicUrls: string[] = [];

  for (const region of regions) {
    // Exclude collision hold region (은평구 신사동) or any non-indexable region
    if (region.id === 'seoul-eunpyeong-sinsa' || region.publicationState === 'PUBLISHED_NOINDEX') {
      continue;
    }
    for (const intent of SEARCH_INTENTS) {
      const href = buildPublicHref(region.keywordRegionName, intent.serviceKeyword);
      dynamicUrls.push(`${origin}${href}`);
    }
  }

  const staticUrls = [`${origin}/`, `${origin}/sitemap-seoul`];
  const allUrls = [...staticUrls, ...dynamicUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
