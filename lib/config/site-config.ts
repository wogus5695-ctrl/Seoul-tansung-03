/**
 * Allcare Site Configuration (Single Source of Truth)
 *
 * IMPORTANT:
 * Do not populate unverified contact information or fake domains.
 * Items not provided by the user must remain null or UNCONFIGURED.
 */

export interface SiteConfig {
  readonly brandName: string;
  readonly brandNameEn: string;
  readonly businessName: string;
  readonly businessCategory: string;

  // Business & Contact details
  readonly siteOrigin: string | null;
  readonly phone: string | null;
  readonly phoneHref: string | null;
  readonly kakaoConsultUrl: string | null;
  readonly businessNumber: string | null;
  readonly representativeName: string | null;
  readonly address: string | null;
  readonly asPolicy: string | null;
}

if (typeof process !== 'undefined' && process.loadEnvFile && !process.env.NEXT_PUBLIC_SITE_ORIGIN) {
  try {
    process.loadEnvFile();
  } catch {
    // Ignore when running in environments without .env file
  }
}

export const SITE_CONFIG: SiteConfig = {
  brandName: '올케어',
  brandNameEn: 'ALLCARE',
  businessName: '올케어서비스',
  businessCategory: '탄성코트 전문 시공',

  // Configured via environment variable or remains null. Fake production domains are prohibited.
  siteOrigin: process.env.NEXT_PUBLIC_SITE_ORIGIN || null,

  // Official contact information provided in Phase 3-E1
  phone: '010-8492-6900',
  phoneHref: 'tel:01084926900',
  kakaoConsultUrl: null, // 추후 연결 예정 (임의 링크 생성 금지)
  businessNumber: '405-15-02677',
  representativeName: '김재현',
  address: null, // 미제공 (임의 생성 금지)
  asPolicy: null,
};

/**
 * Checks if live consultation contacts are configured.
 * Used by CTA components to prevent rendering fake contact buttons.
 */
export function isContactConfigured(config: SiteConfig = SITE_CONFIG): boolean {
  return Boolean(config.phone || config.kakaoConsultUrl);
}

/**
 * Returns the site origin if configured, or null.
 */
export function getSiteOrigin(config: SiteConfig = SITE_CONFIG): string | null {
  return config.siteOrigin;
}
