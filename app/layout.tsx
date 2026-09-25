import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { MobileFixedCTA } from '../components/common/MobileFixedCTA';
import { SITE_CONFIG, OFFICIAL_SITE_ORIGIN } from '../lib/config/site-config';

const scoreDream = localFont({
  src: [
    {
      path: './fonts/SCDream4.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SCDream5.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SCDream6.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/SCDream7.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-score-dream',
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'sans-serif',
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteOrigin || OFFICIAL_SITE_ORIGIN),
  title: `${SITE_CONFIG.brandName} | ${SITE_CONFIG.businessCategory}`,
  description:
    '베란다와 세탁실의 기존 벽면 상태를 확인하고 필요한 작업 범위와 탄성코트 시공 정보를 안내하는 올케어입니다.',
  alternates: {
    canonical: '/',
  },
  verification: {
    other: {
      'naver-site-verification': SITE_CONFIG.naverSiteVerification || '5be6e2d1aa00ee4b34febe66bb5f81e88a8600bd',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: `${SITE_CONFIG.brandName} | ${SITE_CONFIG.businessCategory}`,
    description:
      '베란다와 세탁실의 기존 벽면 상태를 확인하고 필요한 작업 범위와 탄성코트 시공 정보를 안내하는 올케어입니다.',
    url: '/',
    images: [
      {
        url: '/images/allcare/og-thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.brandName} 탄성코트 전문 시공 대표 썸네일`,
      },
    ],
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.brandName} | ${SITE_CONFIG.businessCategory}`,
    description:
      '베란다와 세탁실의 기존 벽면 상태를 확인하고 필요한 작업 범위와 탄성코트 시공 정보를 안내하는 올케어입니다.',
    images: ['/images/allcare/og-thumbnail.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`h-full antialiased ${scoreDream.variable}`}>
      <body className={`min-h-full flex flex-col bg-[#F5F3EE] text-[#3E443B] font-sans ${scoreDream.className}`}>
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <MobileFixedCTA />
      </body>
    </html>
  );
}
