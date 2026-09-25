/**
 * Allcare Site Configuration (Single Source of Truth)
 *
 * IMPORTANT:
 * Do not populate unverified contact information or fake domains.
 * Items not provided by the user must remain null or UNCONFIGURED.
 */

export const OFFICIAL_SITE_ORIGIN = 'https://www.allcaretan.co.kr';
export const OFFICIAL_SITE_HOST = 'www.allcaretan.co.kr';

/**
 * Resolves the production-safe site origin:
 * - Checks if rawEnvOrigin is provided
 * - Must be valid HTTPS URL
 * - Must have an approved production host (strictly 'www.allcaretan.co.kr')
 * - Rejects http://, localhost, 127.0.0.1, vercel.app, non-www allcaretan.co.kr
 * - If invalid or absent, returns OFFICIAL_SITE_ORIGIN as SSOT fallback
 */
export function resolveSiteOrigin(rawEnvOrigin?: string | null): string {
  if (!rawEnvOrigin || typeof rawEnvOrigin !== 'string' || rawEnvOrigin.trim().length === 0) {
    return OFFICIAL_SITE_ORIGIN;
  }

  const trimmed = rawEnvOrigin.trim().replace(/\/+$/, '');

  // Must start with https://
  if (!trimmed.startsWith('https://')) {
    return OFFICIAL_SITE_ORIGIN;
  }

  // Must not contain invalid hosts / keywords
  if (
    trimmed.includes('localhost') ||
    trimmed.includes('127.0.0.1') ||
    trimmed.includes('vercel.app') ||
    trimmed.includes('preview')
  ) {
    return OFFICIAL_SITE_ORIGIN;
  }

  try {
    const parsed = new URL(trimmed);
    // Must be https
    if (parsed.protocol !== 'https:') {
      return OFFICIAL_SITE_ORIGIN;
    }
    // Reject non-www allcaretan.co.kr
    if (parsed.hostname === 'allcaretan.co.kr') {
      return OFFICIAL_SITE_ORIGIN;
    }
    // If valid hostname matches official host
    if (parsed.hostname === OFFICIAL_SITE_HOST) {
      return `${parsed.protocol}//${parsed.hostname}`;
    }
    // Any other unauthorized domain falls back to official origin
    return OFFICIAL_SITE_ORIGIN;
  } catch {
    return OFFICIAL_SITE_ORIGIN;
  }
}

export interface SiteConfig {
  readonly brandName: string;
  readonly brandNameEn: string;
  readonly businessName: string;
  readonly businessCategory: string;

  // Business & Contact details
  readonly siteOrigin: string;
  readonly phone: string | null;
  readonly phoneHref: string | null;
  readonly kakaoConsultUrl: string | null;
  readonly businessNumber: string | null;
  readonly representativeName: string | null;
  readonly address: string | null;
  readonly asPolicy: string | null;
  readonly naverSiteVerification: string | null;
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

  // Configured via environment variable with strict fallback to OFFICIAL_SITE_ORIGIN
  siteOrigin: resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_ORIGIN),

  // Official contact information provided in Phase 3-E1
  phone: '010-8492-6900',
  phoneHref: 'tel:01084926900',
  kakaoConsultUrl: null, // 추후 연결 예정 (임의 링크 생성 금지)
  businessNumber: '405-15-02677',
  representativeName: '김재현',
  address: null, // 미제공 (임의 생성 금지)
  asPolicy: null,
  naverSiteVerification: '5be6e2d1aa00ee4b34febe66bb5f81e88a8600bd',
};

/**
 * Checks if live consultation contacts are configured.
 * Used by CTA components to prevent rendering fake contact buttons.
 */
export function isContactConfigured(config: SiteConfig = SITE_CONFIG): boolean {
  return Boolean(config.phone || config.kakaoConsultUrl);
}

/**
 * Returns the site origin.
 */
export function getSiteOrigin(config: SiteConfig = SITE_CONFIG): string {
  return config.siteOrigin;
}
