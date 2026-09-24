/**
 * Quality Gate & Publication Eligibility Evaluator
 *
 * Enforces strict criteria before promoting any dynamic page to INDEXABLE status.
 * Prevents indexing pages with unverified claims, missing domain, collision routes,
 * or placeholder marketing content.
 */

import { QualityGateEvaluationInput, QualityGateIssue, QualityGateResult } from '../types/publication';

export function evaluateQualityGate(input: QualityGateEvaluationInput): QualityGateResult {
  const errors: QualityGateIssue[] = [];
  const warnings: QualityGateIssue[] = [];

  // 1. Regional validity & disambiguation
  if (!input.regionValid) {
    errors.push({ code: 'INVALID_REGION', message: 'Region is not recognized in the dataset.' });
  }

  if (!input.regionDisambiguationValid) {
    errors.push({
      code: 'REGION_DISAMBIGUATION_REQUIRED',
      message: 'Region requires user-approved disambiguation before it can be indexed.',
    });
  }

  if (!input.noRegionCollision) {
    errors.push({
      code: 'REGION_COLLISION',
      message: 'Region collides with another region and lacks disambiguation.',
    });
  }

  // 2. Public route & dynamic key uniqueness
  if (!input.publicRouteUnique || !input.routeUnique) {
    errors.push({
      code: 'PUBLIC_ROUTE_COLLISION',
      message: 'Public dynamic route key collides with another region keyword combination.',
    });
  }

  // 3. Search intent validity
  if (!input.intentValid) {
    errors.push({ code: 'INVALID_INTENT', message: 'Search intent is invalid or unrecognized.' });
  }

  // 4. Production Domain & Absolute Canonical
  if (!input.siteOriginConfigured) {
    errors.push({
      code: 'SITE_ORIGIN_UNCONFIGURED',
      message: 'Production SITE_ORIGIN is not configured; cannot produce absolute canonical URL for indexing.',
    });
  }

  if (!input.absoluteCanonicalValid) {
    errors.push({
      code: 'ABSOLUTE_CANONICAL_INVALID',
      message: 'Absolute canonical URL is invalid or unresolvable.',
    });
  }

  // 5. Metadata & Structural content
  if (!input.metadataComplete) {
    errors.push({ code: 'INCOMPLETE_METADATA', message: 'Dynamic metadata templates are missing or incomplete.' });
  }

  if (!input.requiredContentComplete) {
    errors.push({ code: 'INCOMPLETE_CONTENT', message: 'Required decision and problem content is incomplete.' });
  }

  // 6. Content Status (PLACEHOLDER content blocks INDEXABLE)
  if (input.contentStatus === 'PLACEHOLDER') {
    errors.push({
      code: 'PLACEHOLDER_CONTENT_NOT_ALLOWED',
      message: 'Content is marked as PLACEHOLDER. Final approved marketing copy is required for INDEXABLE.',
    });
  }

  // 7. Claim Safety (Zero tolerance for UNVERIFIED_CLAIM)
  if (input.unverifiedClaimCount > 0) {
    errors.push({
      code: 'UNVERIFIED_CLAIMS_PRESENT',
      message: `Contains ${input.unverifiedClaimCount} UNVERIFIED_CLAIM item(s). Must be zero for indexing.`,
    });
  }

  // 8. Image Assets (Required assets must be READY)
  if (!input.requiredAssetsReady) {
    errors.push({
      code: 'REQUIRED_ASSETS_WAITING',
      message: 'One or more REQUIRED image assets are waiting for user asset upload.',
    });
  }

  // 9. Non-fatal internal links warning
  if (!input.internalLinksValid) {
    warnings.push({
      code: 'INTERNAL_LINKS_DEGRADED',
      message: 'Internal link targets could not all be validated.',
    });
  }

  // Fatal errors that force state back to DRAFT
  const fatalCodes = new Set([
    'INVALID_REGION',
    'INVALID_INTENT',
    'PUBLIC_ROUTE_COLLISION',
    'REGION_DISAMBIGUATION_REQUIRED',
    'REGION_COLLISION',
  ]);

  const hasFatalErrors = errors.some((e) => fatalCodes.has(e.code));

  if (hasFatalErrors) {
    return {
      isEligibleForIndex: false,
      targetState: 'DRAFT',
      errors,
      warnings,
    };
  }

  if (errors.length > 0) {
    return {
      isEligibleForIndex: false,
      targetState: 'PUBLISHED_NOINDEX',
      errors,
      warnings,
    };
  }

  return {
    isEligibleForIndex: true,
    targetState: 'INDEXABLE',
    errors: [],
    warnings,
  };
}
