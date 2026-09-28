import { NextResponse } from 'next/server';
import { OFFICIAL_SITE_ORIGIN } from '../../lib/config/site-config';

export async function GET() {
  const content = `User-agent: *
Allow: /

Sitemap: ${OFFICIAL_SITE_ORIGIN}/sitemap.xml
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
