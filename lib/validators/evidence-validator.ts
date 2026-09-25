/**
 * Region Evidence Dataset Validator (Phase 6-C0C-1)
 *
 * Enforces strict validation on incoming region evidence items:
 * - Region ID must exist in approved production dataset
 * - Applicable intents must be valid ServiceKeywords
 * - Valid Tier ('TIER_A' | 'TIER_B' | 'TIER_C')
 * - Source Name and verifiedAt date required
 * - Facts must not be empty
 * - Zero unverified performance/warranty claims
 * - Image assets must point to valid project image paths
 * - Evidence IDs must be globally unique
 */

import { RegionEvidenceItem } from '../types/evidence';
import { RegionItem } from '../types/regions';
import { SERVICE_KEYWORDS } from '../contracts/intents-contract';
import { validateClaimSafety } from '../guards/claim-guard';

export interface EvidenceValidationIssue {
  readonly evidenceId: string;
  readonly code:
    | 'DUPLICATE_EVIDENCE_ID'
    | 'UNKNOWN_REGION_ID'
    | 'EMPTY_INTENT_APPLICABILITY'
    | 'UNKNOWN_INTENT_KEYWORD'
    | 'INVALID_TIER'
    | 'MISSING_SOURCE'
    | 'INVALID_VERIFIED_DATE'
    | 'EMPTY_FACTS'
    | 'INVALID_IMAGE_PATH'
    | 'UNVERIFIED_CLAIM_IN_FACTS';
  readonly message: string;
}

export interface EvidenceValidationResult {
  readonly isValid: boolean;
  readonly totalChecked: number;
  readonly issues: readonly EvidenceValidationIssue[];
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function validateRegionEvidenceItem(
  item: RegionEvidenceItem,
  validRegions: readonly RegionItem[]
): EvidenceValidationIssue[] {
  const issues: EvidenceValidationIssue[] = [];

  // 1. Region existence
  const regionExists = validRegions.some((r) => r.id === item.regionId);
  if (!regionExists) {
    issues.push({
      evidenceId: item.evidenceId,
      code: 'UNKNOWN_REGION_ID',
      message: `Region ID '${item.regionId}' does not exist in production regions dataset.`,
    });
  }

  // 2. Intent applicability
  if (!item.serviceIntentApplicability || item.serviceIntentApplicability.length === 0) {
    issues.push({
      evidenceId: item.evidenceId,
      code: 'EMPTY_INTENT_APPLICABILITY',
      message: `Evidence '${item.evidenceId}' must specify at least one applicable service intent.`,
    });
  } else {
    for (const kw of item.serviceIntentApplicability) {
      if (!SERVICE_KEYWORDS.includes(kw)) {
        issues.push({
          evidenceId: item.evidenceId,
          code: 'UNKNOWN_INTENT_KEYWORD',
          message: `Unknown service keyword '${kw}' in intent applicability.`,
        });
      }
    }
  }

  // 3. Tier validation
  if (!['TIER_A', 'TIER_B', 'TIER_C'].includes(item.evidenceTier)) {
    issues.push({
      evidenceId: item.evidenceId,
      code: 'INVALID_TIER',
      message: `Invalid evidence tier '${item.evidenceTier}'. Must be TIER_A, TIER_B, or TIER_C.`,
    });
  }

  // 4. Source name
  if (!item.sourceName || item.sourceName.trim().length === 0) {
    issues.push({
      evidenceId: item.evidenceId,
      code: 'MISSING_SOURCE',
      message: `Source name is required for evidence '${item.evidenceId}'.`,
    });
  }

  // 5. Verified date format
  if (!item.verifiedAt || !DATE_REGEX.test(item.verifiedAt) || isNaN(Date.parse(item.verifiedAt))) {
    issues.push({
      evidenceId: item.evidenceId,
      code: 'INVALID_VERIFIED_DATE',
      message: `verifiedAt must be a valid ISO date string 'YYYY-MM-DD', received: '${item.verifiedAt}'.`,
    });
  }

  // 6. Facts non-empty
  const facts = item.facts;
  const hasFactProperty =
    facts &&
    (Boolean(facts.housingType) ||
      Boolean(facts.complexName) ||
      Boolean(facts.observedCondition) ||
      Boolean(facts.workScope) ||
      Boolean(facts.publicMetric) ||
      (Array.isArray(facts.notes) && facts.notes.length > 0));

  if (!hasFactProperty) {
    issues.push({
      evidenceId: item.evidenceId,
      code: 'EMPTY_FACTS',
      message: `Evidence '${item.evidenceId}' must contain at least one objective fact property.`,
    });
  }

  // 7. Claim safety within facts
  if (facts) {
    const textPool = [
      facts.housingType,
      facts.complexName,
      facts.observedCondition,
      facts.workScope,
      facts.publicMetric,
      ...(facts.notes || []),
    ]
      .filter(Boolean)
      .join(' ');

    const claimValidation = validateClaimSafety({
      id: item.evidenceId,
      category: 'VERIFIED_FACT',
      statement: textPool,
      sourceType: 'FIELD_LOG',
      verifiedAt: item.verifiedAt,
    });
    if (!claimValidation.isSafe) {
      issues.push({
        evidenceId: item.evidenceId,
        code: 'UNVERIFIED_CLAIM_IN_FACTS',
        message: `Evidence contains unverified claims: ${claimValidation.reason || 'Prohibited assertion'}`,
      });
    }
  }

  // 8. Image asset path check (strictly internal /images/ assets)
  if (item.imageAssets && Array.isArray(item.imageAssets)) {
    for (const img of item.imageAssets) {
      if (!img.startsWith('/images/')) {
        issues.push({
          evidenceId: item.evidenceId,
          code: 'INVALID_IMAGE_PATH',
          message: `Image path '${img}' must start with '/images/'.`,
        });
      }
    }
  }

  return issues;
}

export function validateRegionEvidenceDataset(
  dataset: readonly RegionEvidenceItem[],
  validRegions: readonly RegionItem[]
): EvidenceValidationResult {
  const issues: EvidenceValidationIssue[] = [];
  const seenIds = new Set<string>();

  for (const item of dataset) {
    // Uniqueness
    if (seenIds.has(item.evidenceId)) {
      issues.push({
        evidenceId: item.evidenceId,
        code: 'DUPLICATE_EVIDENCE_ID',
        message: `Duplicate evidence ID '${item.evidenceId}' detected in dataset.`,
      });
    }
    seenIds.add(item.evidenceId);

    // Item validation
    const itemIssues = validateRegionEvidenceItem(item, validRegions);
    issues.push(...itemIssues);
  }

  return {
    isValid: issues.length === 0,
    totalChecked: dataset.length,
    issues,
  };
}
