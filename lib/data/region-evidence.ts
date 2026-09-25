/**
 * Region Evidence Single Source of Truth Repository (Phase 6-C0C-1)
 *
 * NON-NEGOTIABLE POLICY:
 * - Real user-supplied evidence only.
 * - Zero fake/mock/synthetic items in production dataset.
 * - Current count is strictly 0 until verified data is supplied.
 */

import { RegionEvidenceItem } from '../types/evidence';
import { ServiceKeyword } from '../types/intents';

/**
 * Production Region Evidence Records (Strictly empty at initialization).
 * Real evidence items will be populated in Phase 6-C0C-2 upon user submission.
 */
export const PRODUCTION_REGION_EVIDENCE: readonly RegionEvidenceItem[] = [];

/**
 * Retrieves all verified evidence items for a given region and optional search intent keyword.
 */
export function getRegionEvidence(
  regionId: string,
  intentKeyword?: ServiceKeyword,
  dataset: readonly RegionEvidenceItem[] = PRODUCTION_REGION_EVIDENCE
): readonly RegionEvidenceItem[] {
  if (!regionId) return [];

  const regionMatched = dataset.filter((item) => item.regionId === regionId);
  if (!intentKeyword) return regionMatched;

  return regionMatched.filter((item) =>
    item.serviceIntentApplicability.includes(intentKeyword)
  );
}

/**
 * Evaluates whether a specific region + search intent pair possesses verified evidence.
 */
export function hasRegionEvidence(
  regionId: string,
  intentKeyword: ServiceKeyword,
  dataset: readonly RegionEvidenceItem[] = PRODUCTION_REGION_EVIDENCE
): boolean {
  return getRegionEvidence(regionId, intentKeyword, dataset).length > 0;
}
