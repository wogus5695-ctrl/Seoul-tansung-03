import { NextResponse } from 'next/server';
import { OFFICIAL_SITE_ORIGIN } from '../../lib/config/site-config';
import { PILOT_INDEXABLE_KEYS } from '../../lib/contracts/publication-gate';

export async function GET() {
  const origin = OFFICIAL_SITE_ORIGIN;

  const dynamicUrls = PILOT_INDEXABLE_KEYS.map((key) => {
    return `${origin}/?k=${encodeURIComponent(key)}`;
  });

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
