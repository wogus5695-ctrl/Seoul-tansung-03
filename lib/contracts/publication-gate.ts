/**
 * Production Publication & Canonical Gate (Phase 6-A Foundation)
 *
 * Strict Pre-Publication Contract:
 * - All production canonicals must be absolute HTTPS URLs without tracking query params.
 * - Production origin must be an official HTTPS custom domain (not localhost, not preview).
 * - INDEXABLE promotion requires ALL 11 criteria to pass, with explicit user approval gate.
 */

import { ApprovalStatusType } from '../manifest/seoul-region-manifest';
import { PublicationState } from '../types/regions';
import { ServiceKeyword } from '../types/intents';
import { buildCanonicalUrl } from '../url/url-builder';
import { SITE_CONFIG } from '../config/site-config';

/**
 * Normalizes query string and pathname for canonical URLs:
 * - Keeps strictly the dynamic parameter 'k'
 * - Strips duplicate query parameters (first valid wins)
 * - Strips all tracking parameters (utm_*, fbclid, gclid, _ga, etc.)
 * - Strips fragments (#...)
 * - Enforces clean trailing slash policy: '/?k=...'
 * - Normalizes percent-encoded / unencoded dynamic keys
 */
export function normalizeCanonicalQuery(rawSearchOrPath: string): string {
  if (!rawSearchOrPath || rawSearchOrPath.trim().length === 0) {
    return '/';
  }

  // 1. Strip fragment
  const withoutFragment = rawSearchOrPath.split('#')[0].trim();

  // 2. Extract pathname and query
  const questionIndex = withoutFragment.indexOf('?');
  if (questionIndex === -1) {
    return '/';
  }

  const queryString = withoutFragment.slice(questionIndex + 1);
  const searchParams = new URLSearchParams(queryString);

  // 3. Extract and normalize dynamic key 'k'
  const rawKey = searchParams.get('k');
  if (!rawKey || rawKey.trim().length === 0) {
    return '/';
  }

  let decodedKey: string;
  try {
    decodedKey = decodeURIComponent(rawKey).trim();
  } catch {
    decodedKey = rawKey.trim();
  }

  const normalizedEncodedKey = encodeURIComponent(decodedKey);

  // Canonical format is strictly '/?k={encodedKey}'
  return `/?k=${normalizedEncodedKey}`;
}

/**
 * Checks whether an origin is valid for preview/local environments.
 */
export function isPreviewOriginValid(origin?: string | null): boolean {
  if (!origin || origin.trim().length === 0) return false;
  const trimmed = origin.trim();
  return trimmed.startsWith('http://') || trimmed.startsWith('https://');
}

/**
 * Checks whether an origin is ready for production publication:
 * - Must exist
 * - Must start with 'https://'
 * - Must not be localhost or loopback
 * - Must not be a preview-only domain (*.vercel.app or containing 'preview')
 */
export function isProductionOriginReady(origin?: string | null): boolean {
  if (!origin || origin.trim().length === 0) return false;
  const trimmed = origin.trim();

  if (!trimmed.startsWith('https://')) return false;
  if (trimmed.includes('localhost') || trimmed.includes('127.0.0.1')) return false;
  if (trimmed.includes('.vercel.app') || trimmed.includes('preview')) return false;

  try {
    const u = new URL(trimmed);
    return u.protocol === 'https:' && Boolean(u.hostname) && !u.hostname.includes('localhost');
  } catch {
    return false;
  }
}

export interface ProductionCanonicalGateResult {
  readonly isReady: boolean;
  readonly canonicalUrl: string | null;
  readonly previewCanonicalValid: boolean;
  readonly productionCanonicalReady: boolean;
  readonly issues: readonly string[];
}

/**
 * Evaluates production canonical readiness for a specific dynamic region + service keyword.
 */
export function evaluateProductionCanonicalGate(
  siteOrigin: string | null | undefined,
  keywordRegionName: string,
  serviceKeyword: ServiceKeyword
): ProductionCanonicalGateResult {
  const issues: string[] = [];

  if (!keywordRegionName || !serviceKeyword) {
    issues.push('INVALID_INPUT: Region or ServiceKeyword is missing.');
    return {
      isReady: false,
      canonicalUrl: null,
      previewCanonicalValid: false,
      productionCanonicalReady: false,
      issues,
    };
  }

  const previewValid = isPreviewOriginValid(siteOrigin);
  const productionReady = isProductionOriginReady(siteOrigin);

  if (!siteOrigin || siteOrigin.trim().length === 0) {
    issues.push('SITE_ORIGIN_MISSING: Production SITE_ORIGIN is not configured.');
  } else {
    const trimmed = siteOrigin.trim();
    if (!trimmed.startsWith('https://')) {
      issues.push('INSECURE_ORIGIN: Production SITE_ORIGIN must start with https://.');
    }
    if (trimmed.includes('localhost') || trimmed.includes('127.0.0.1')) {
      issues.push('LOCALHOST_NOT_ALLOWED: localhost cannot be used as production origin.');
    }
    if (trimmed.includes('.vercel.app') || trimmed.includes('preview')) {
      issues.push('PREVIEW_DOMAIN_NOT_ALLOWED: Preview domains cannot be used as production canonical origin.');
    }
  }

  const canonicalResult = buildCanonicalUrl(keywordRegionName, serviceKeyword, siteOrigin);
  if (!canonicalResult.isSuccess || !canonicalResult.canonicalUrl) {
    issues.push(`CANONICAL_BUILD_FAILED: ${canonicalResult.error || 'Failed to generate absolute canonical URL.'}`);
  }

  const isReady = productionReady && issues.length === 0 && Boolean(canonicalResult.canonicalUrl);

  return {
    isReady,
    canonicalUrl: canonicalResult.canonicalUrl,
    previewCanonicalValid: previewValid,
    productionCanonicalReady: productionReady,
    issues,
  };
}

export interface PublicationGateInput {
  readonly regionId: string;
  readonly regionApprovalStatus: ApprovalStatusType;
  readonly publicationStateTransitionApproved: boolean;
  readonly productionCanonicalReady: boolean;
  readonly businessSSOTValid: boolean;
  readonly claimGuardPass: boolean;
  readonly dynamicContentValid: boolean;
  readonly metadataValid: boolean;
  readonly internalLinksValid: boolean;
  readonly requiredAssetsValid: boolean;
  readonly serviceAreaApproved: boolean;
  readonly userPublicationApproval: boolean; // CRITICAL: Explicit user approval gate
}

export interface PublicationGateResult {
  readonly isIndexable: boolean;
  readonly targetPublicationState: PublicationState;
  readonly blockingReasons: readonly string[];
}

/**
 * Strict Publication Gate (Phase 6-A Contract):
 * All 11 criteria must be satisfied to promote a region or URL to INDEXABLE.
 *
 * SAFETY INVARIANT:
 * Even if all 10 technical criteria pass, if userPublicationApproval === false,
 * INDEXABLE promotion is strictly blocked.
 */
export function evaluatePublicationGate(input: PublicationGateInput): PublicationGateResult {
  const blockingReasons: string[] = [];

  // 1. Regional Approval Status
  if (input.regionApprovalStatus === 'COLLISION_HOLD') {
    blockingReasons.push('COLLISION_HOLD_REGION: Regions on collision hold cannot be promoted to INDEXABLE.');
  } else if (input.regionApprovalStatus !== 'APPROVED') {
    blockingReasons.push(`UNAPPROVED_REGION: Region status "${input.regionApprovalStatus}" is not APPROVED.`);
  }

  // 2. Publication state transition approval
  if (!input.publicationStateTransitionApproved) {
    blockingReasons.push('STATE_TRANSITION_NOT_APPROVED: Publication state transition has not been officially approved.');
  }

  // 3. Production Canonical Ready
  if (!input.productionCanonicalReady) {
    blockingReasons.push('PRODUCTION_CANONICAL_NOT_READY: Valid HTTPS production origin is not configured.');
  }

  // 4. Business SSOT
  if (!input.businessSSOTValid) {
    blockingReasons.push('BUSINESS_SSOT_INVALID: Business SSOT verification failed.');
  }

  // 5. Claim Guard
  if (!input.claimGuardPass) {
    blockingReasons.push('CLAIM_GUARD_FAILED: Unverified claims or performance claims detected.');
  }

  // 6. Dynamic Content
  if (!input.dynamicContentValid) {
    blockingReasons.push('DYNAMIC_CONTENT_INVALID: Required dynamic content sections are invalid.');
  }

  // 7. Metadata
  if (!input.metadataValid) {
    blockingReasons.push('METADATA_INVALID: Dynamic title, description, or robots metadata is invalid.');
  }

  // 8. Internal Links
  if (!input.internalLinksValid) {
    blockingReasons.push('INTERNAL_LINKS_INVALID: Internal links or related intent links are invalid.');
  }

  // 9. Required Assets
  if (!input.requiredAssetsValid) {
    blockingReasons.push('REQUIRED_ASSETS_INVALID: Required image or logo assets are missing.');
  }

  // 10. Service Area Approved
  if (!input.serviceAreaApproved) {
    blockingReasons.push('SERVICE_AREA_NOT_APPROVED: Structured data service area has not been approved.');
  }

  // 11. CRITICAL: User Explicit Publication Approval Gate
  if (!input.userPublicationApproval) {
    blockingReasons.push('USER_APPROVAL_PENDING: Explicit user publication approval is required for INDEXABLE status.');
  }

  const isIndexable = blockingReasons.length === 0;

  return {
    isIndexable,
    targetPublicationState: isIndexable ? 'INDEXABLE' : 'PUBLISHED_NOINDEX',
    blockingReasons,
  };
}

/**
 * Returns the single source of truth origin from SITE_CONFIG.
 */
export function getPublicationOrigin(): {
  siteOrigin: string | null;
  isConfigured: boolean;
  isProductionReady: boolean;
  isPreviewValid: boolean;
} {
  const origin = SITE_CONFIG.siteOrigin;
  return {
    siteOrigin: origin,
    isConfigured: Boolean(origin && origin.trim().length > 0),
    isProductionReady: isProductionOriginReady(origin),
    isPreviewValid: isPreviewOriginValid(origin),
  };
}
