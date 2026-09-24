/**
 * URL Builder (Single Source of Truth)
 *
 * Public URL format: /?k={keywordRegionName}-{serviceKeyword}
 * Example: /?k=삼성동-탄성코트
 *
 * Used uniformly across:
 * - Next.js Router
 * - Canonical Generator
 * - Sitemap Engine
 * - Hub Generator
 * - Breadcrumb Builder
 * - SSR Internal Links
 * - SearchAdvisor Export
 */

import { SITE_CONFIG } from '../config/site-config';
import { getSearchIntentByKeyword, isValidServiceKeyword, SEARCH_INTENTS } from '../contracts/intents-contract';
import { SearchIntentItem, ServiceKeyword } from '../types/intents';
import { RegionItem } from '../types/regions';

export interface ParsedDynamicKey {
  readonly regionName: string; // keywordRegionName
  readonly serviceKeyword: ServiceKeyword;
}

export interface RouteValidationResult {
  readonly isValid: boolean;
  readonly region?: RegionItem;
  readonly intent?: SearchIntentItem;
  readonly error?: 'MISSING_KEY' | 'MALFORMED_KEY' | 'UNKNOWN_REGION' | 'UNKNOWN_INTENT';
}

export interface CanonicalBuildResult {
  readonly isSuccess: boolean;
  readonly canonicalUrl: string | null;
  readonly error?: 'SITE_ORIGIN_UNCONFIGURED' | 'INVALID_INPUT';
}

/**
 * Normalizes URL keys by decoding percent-encoded characters safely.
 */
export function normalizeKey(rawKey: string): string {
  try {
    return decodeURIComponent(rawKey).trim();
  } catch {
    return rawKey.trim();
  }
}

/**
 * Builds the canonical dynamic key string using keywordRegionName: e.g. '삼성동-탄성코트'
 */
export function buildDynamicKey(keywordRegionName: string, serviceKeyword: ServiceKeyword): string {
  return `${keywordRegionName.trim()}-${serviceKeyword.trim()}`;
}

/**
 * Builds the public relative href for navigation: e.g. '/?k=삼성동-탄성코트'
 * Encodes dynamic key safely with encodeURIComponent.
 */
export function buildPublicHref(keywordRegionName: string, serviceKeyword: ServiceKeyword): string {
  const key = buildDynamicKey(keywordRegionName, serviceKeyword);
  return `/?k=${encodeURIComponent(key)}`;
}

/**
 * Parses a dynamic key (e.g. '삼성동-탄성코트' or encoded) into keywordRegionName and serviceKeyword.
 * Uses deterministic suffix matching against known ServiceKeywords.
 */
export function parseDynamicKey(rawKey: string): ParsedDynamicKey | null {
  if (!rawKey) return null;
  const decoded = normalizeKey(rawKey);

  for (const intent of SEARCH_INTENTS) {
    const suffix = `-${intent.serviceKeyword}`;
    if (decoded.endsWith(suffix)) {
      const regionName = decoded.slice(0, -suffix.length).trim();
      if (regionName.length > 0) {
        return {
          regionName,
          serviceKeyword: intent.serviceKeyword,
        };
      }
    }
  }

  return null;
}

/**
 * Validates a dynamic route key against known regions and intents.
 */
export function validateDynamicRoute(
  rawKey: string | undefined | null,
  validRegions: readonly RegionItem[]
): RouteValidationResult {
  if (!rawKey) {
    return { isValid: false, error: 'MISSING_KEY' };
  }

  const parsed = parseDynamicKey(rawKey);
  if (!parsed) {
    const decoded = normalizeKey(rawKey);
    const lastHyphenIndex = decoded.lastIndexOf('-');
    if (lastHyphenIndex > 0 && lastHyphenIndex < decoded.length - 1) {
      const candidateRegion = decoded.slice(0, lastHyphenIndex).trim();
      const candidateIntent = decoded.slice(lastHyphenIndex + 1).trim();
      if (!isValidServiceKeyword(candidateIntent)) {
        const region = validRegions.find(
          (r) =>
            r.keywordRegionName === candidateRegion ||
            r.routeKey === candidateRegion ||
            r.displayName === candidateRegion
        );
        if (region) {
          return { isValid: false, error: 'UNKNOWN_INTENT' };
        }
      }
    }
    return { isValid: false, error: 'MALFORMED_KEY' };
  }

  if (!isValidServiceKeyword(parsed.serviceKeyword)) {
    return { isValid: false, error: 'UNKNOWN_INTENT' };
  }

  const intent = getSearchIntentByKeyword(parsed.serviceKeyword);

  const region = validRegions.find(
    (r) =>
      r.keywordRegionName === parsed.regionName ||
      r.routeKey === parsed.regionName ||
      r.displayName === parsed.regionName
  );

  if (!region) {
    return { isValid: false, error: 'UNKNOWN_REGION' };
  }

  return {
    isValid: true,
    region,
    intent,
  };
}

/**
 * Builds an ABSOLUTE Canonical URL for dynamic pages.
 *
 * HARDENED CONTRACT:
 * - Returns ONLY absolute URL with scheme (e.g. https://domain.co.kr/?k=...).
 * - If SITE_ORIGIN is not configured, returns explicit failure ({ isSuccess: false, canonicalUrl: null }).
 * - NEVER outputs fake domains or relative paths as canonical URL.
 */
export function buildCanonicalUrl(
  keywordRegionName: string,
  serviceKeyword: ServiceKeyword,
  siteOriginOverride?: string | null
): CanonicalBuildResult {
  if (!keywordRegionName || !serviceKeyword) {
    return {
      isSuccess: false,
      canonicalUrl: null,
      error: 'INVALID_INPUT',
    };
  }

  const origin = siteOriginOverride ?? SITE_CONFIG.siteOrigin;

  if (!origin || origin.trim().length === 0) {
    return {
      isSuccess: false,
      canonicalUrl: null,
      error: 'SITE_ORIGIN_UNCONFIGURED',
    };
  }

  const cleanOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
  const href = buildPublicHref(keywordRegionName, serviceKeyword);

  return {
    isSuccess: true,
    canonicalUrl: `${cleanOrigin}${href}`,
  };
}
