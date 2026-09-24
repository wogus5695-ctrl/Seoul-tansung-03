/**
 * Claim Guard (Safety Enforcement Module)
 *
 * Enforces a strict 3-Tier Claim Safety Hierarchy:
 *
 * Tier 1 (Primary): ClaimStatus & Evidence State
 *   - Only claims categorized as VERIFIED_FACT, GENERAL_GUIDANCE, BUSINESS_POLICY,
 *     PRODUCT_SPEC, or CASE_EVIDENCE may be considered for production.
 *   - UNVERIFIED_CLAIM is strictly blocked.
 *
 * Tier 2 (Secondary): Source & Verification Metadata
 *   - Factual and technical claims (VERIFIED_FACT, PRODUCT_SPEC) require documented
 *     source verification (sourceType, sourceRef).
 *
 * Tier 3 (Tertiary Lint): Prohibited Phrase Detection
 *   - Pattern detector against misleading causal assertions (e.g. "결로 해결 100%").
 *   - Note: Lack of prohibited phrases does NOT grant safety if Tier 1 or Tier 2 fails.
 */

import { ClaimItem, ClaimStatus } from '../types/claims';

const PRODUCTION_SAFE_CATEGORIES: ReadonlySet<ClaimStatus> = new Set<ClaimStatus>([
  'VERIFIED_FACT',
  'GENERAL_GUIDANCE',
  'BUSINESS_POLICY',
  'PRODUCT_SPEC',
  'CASE_EVIDENCE',
]);

/**
 * Filter out any claim that is UNVERIFIED_CLAIM from the array.
 * Defensive fallback filter.
 */
export function filterProductionSafeClaims(claims: readonly ClaimItem[]): ClaimItem[] {
  return claims.filter((claim) => PRODUCTION_SAFE_CATEGORIES.has(claim.category));
}

/**
 * Returns true if the collection contains ZERO unverified claims.
 */
export function assertNoUnverifiedClaims(claims: readonly ClaimItem[]): boolean {
  return claims.every((claim) => PRODUCTION_SAFE_CATEGORIES.has(claim.category));
}

/**
 * Validates whether an individual claim item satisfies the 3-Tier safety policy.
 */
export function validateClaimSafety(claim: ClaimItem): {
  isSafe: boolean;
  tierFailed?: 1 | 2 | 3;
  reason?: string;
} {
  // Tier 1: ClaimStatus & Evidence State
  if (claim.category === 'UNVERIFIED_CLAIM' || !PRODUCTION_SAFE_CATEGORIES.has(claim.category)) {
    return {
      isSafe: false,
      tierFailed: 1,
      reason: `[Tier 1] Claim [${claim.id}] is categorized as UNVERIFIED_CLAIM and cannot be rendered in production.`,
    };
  }

  // Tier 2: Source Verification Metadata (for VERIFIED_FACT and PRODUCT_SPEC)
  if (claim.category === 'VERIFIED_FACT' || claim.category === 'PRODUCT_SPEC') {
    if (!claim.sourceType || claim.sourceType === 'NONE') {
      return {
        isSafe: false,
        tierFailed: 2,
        reason: `[Tier 2] Factual claim [${claim.id}] lacks a documented sourceType.`,
      };
    }
  }

  // Tier 3: Prohibited Phrase Lint
  const prohibitedPhrases = [
    '결로 해결',
    '결로 완벽 해결',
    '결로 방지',
    '곰팡이 박멸',
    '곰팡이 방지',
    '곰팡이 100%',
    '곰팡이 완벽 차단',
    '라돈 차단',
    '단열 극대화',
    '프리미엄 단열 도막',
    '단열 도막',
    '고단열',
    '에어로겔',
    '과학적 단열 도막',
    '세라믹 효과',
    '단열 성능',
    '항균',
    '완벽 해결',
    '100%',
    '표준 시공',
    '공식 공정',
    '5단계 표준',
  ];

  for (const phrase of prohibitedPhrases) {
    if (claim.statement.includes(phrase)) {
      return {
        isSafe: false,
        tierFailed: 3,
        reason: `[Tier 3] Claim [${claim.id}] contains prohibited unverified causal assertion: "${phrase}".`,
      };
    }
  }

  return { isSafe: true };
}
