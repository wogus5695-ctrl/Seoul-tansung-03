/**
 * Region Dataset Validator (Phase 4-C1)
 *
 * Preflight audit validator to verify any production region dataset before publication.
 * Enforces schema integrity, route uniqueness, disambiguation status, parent hierarchy,
 * publication state invariants, and search intent alignment.
 */

import { RegionItem, RegionType, PublicationState, DisambiguationStatus } from '../types/regions';
import { SEARCH_INTENTS } from '../contracts/intents-contract';
import { isProductionOriginReady, isPreviewOriginValid } from '../contracts/publication-gate';

export interface RegionValidationIssue {
  readonly code: string;
  readonly severity: 'ERROR' | 'WARNING';
  readonly message: string;
  readonly regionId?: string;
}

export interface RegionDatasetValidationReport {
  readonly isValid: boolean;
  readonly regionCount: number;
  readonly expectedUrlCount: number;
  readonly intentCount: number;
  readonly errors: RegionValidationIssue[];
  readonly warnings: RegionValidationIssue[];
  readonly summary: {
    readonly duplicateRegionIds: string[];
    readonly duplicateRoutes: string[];
    readonly duplicateDynamicKeys: string[];
    readonly invalidParents: string[];
    readonly invalidRegionTypes: string[];
    readonly disambiguationPending: string[];
    readonly invalidPublicationStates: string[];
    readonly previewCanonicalValid: boolean;
    readonly productionCanonicalReady: boolean;
    readonly canonicalReady: boolean;
  };
}

const VALID_REGION_TYPES: readonly RegionType[] = ['SIDO', 'CITY', 'GU', 'GUN', 'DONG'];
const VALID_PUBLICATION_STATES: readonly PublicationState[] = ['DRAFT', 'PUBLISHED_NOINDEX', 'INDEXABLE'];
const VALID_DISAMBIGUATION_STATUSES: readonly DisambiguationStatus[] = ['NOT_REQUIRED', 'REQUIRES_DISAMBIGUATION', 'APPROVED'];
const KNOWN_SIDO_ROOTS = new Set([
  'seoul', 'gyeonggi', 'incheon', 'busan', 'daegu', 'gwangju',
  'daejeon', 'ulsan', 'sejong', 'gangwon', 'chungbuk', 'chungnam',
  'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju'
]);

export function validateRegionDataset(
  dataset: readonly RegionItem[],
  siteOrigin?: string | null
): RegionDatasetValidationReport {
  const errors: RegionValidationIssue[] = [];
  const warnings: RegionValidationIssue[] = [];

  const seenIds = new Set<string>();
  const duplicateIds = new Set<string>();

  const seenRoutes = new Set<string>();
  const duplicateRoutes = new Set<string>();

  const dynamicKeyMap = new Map<string, string[]>();

  const invalidParents: string[] = [];
  const invalidRegionTypes: string[] = [];
  const disambiguationPending: string[] = [];
  const invalidPublicationStates: string[] = [];

  // Build ID lookup set
  const allIds = new Set(dataset.map((r) => r.id));

  for (const region of dataset) {
    // 1. Duplicate ID
    if (seenIds.has(region.id)) {
      duplicateIds.add(region.id);
      errors.push({
        code: 'DUPLICATE_REGION_ID',
        severity: 'ERROR',
        message: `Region ID "${region.id}" is duplicated in dataset.`,
        regionId: region.id,
      });
    }
    seenIds.add(region.id);

    // 2. Duplicate Route Key
    if (seenRoutes.has(region.routeKey)) {
      duplicateRoutes.add(region.routeKey);
      errors.push({
        code: 'DUPLICATE_ROUTE_KEY',
        severity: 'ERROR',
        message: `Route key "${region.routeKey}" is duplicated in dataset.`,
        regionId: region.id,
      });
    }
    seenRoutes.add(region.routeKey);

    // 3. Dynamic Key (keywordRegionName) tracking for collision
    const existing = dynamicKeyMap.get(region.keywordRegionName) || [];
    existing.push(region.id);
    dynamicKeyMap.set(region.keywordRegionName, existing);

    // 4. Region Type Validation
    if (!VALID_REGION_TYPES.includes(region.regionType)) {
      invalidRegionTypes.push(region.id);
      errors.push({
        code: 'INVALID_REGION_TYPE',
        severity: 'ERROR',
        message: `Region has unrecognized regionType: "${region.regionType}". Expected SIDO, CITY, GU, GUN, or DONG.`,
        regionId: region.id,
      });
    }

    // 5. Parent Integrity
    if (
      region.parentRegionId &&
      !allIds.has(region.parentRegionId) &&
      !KNOWN_SIDO_ROOTS.has(region.parentRegionId)
    ) {
      invalidParents.push(region.id);
      errors.push({
        code: 'INVALID_PARENT_REGION',
        severity: 'ERROR',
        message: `parentRegionId "${region.parentRegionId}" does not exist in dataset.`,
        regionId: region.id,
      });
    }

    // 6. Disambiguation Status Check
    if (!VALID_DISAMBIGUATION_STATUSES.includes(region.disambiguationStatus)) {
      errors.push({
        code: 'INVALID_DISAMBIGUATION_STATUS',
        severity: 'ERROR',
        message: `Unrecognized disambiguationStatus: "${region.disambiguationStatus}".`,
        regionId: region.id,
      });
    } else if (region.disambiguationStatus === 'REQUIRES_DISAMBIGUATION') {
      disambiguationPending.push(region.id);
      // Warning if PUBLISHED_NOINDEX, Error if INDEXABLE
      if (region.publicationState === 'INDEXABLE') {
        errors.push({
          code: 'DISAMBIGUATION_PENDING_INDEXABLE_BLOCKED',
          severity: 'ERROR',
          message: `Region requires user disambiguation approval before INDEXABLE promotion.`,
          regionId: region.id,
        });
      } else {
        warnings.push({
          code: 'DISAMBIGUATION_PENDING',
          severity: 'WARNING',
          message: `Region is pending disambiguation approval.`,
          regionId: region.id,
        });
      }
    }

    // 7. Publication State Invariant
    if (!VALID_PUBLICATION_STATES.includes(region.publicationState)) {
      invalidPublicationStates.push(region.id);
      errors.push({
        code: 'INVALID_PUBLICATION_STATE',
        severity: 'ERROR',
        message: `Unrecognized publicationState: "${region.publicationState}".`,
        regionId: region.id,
      });
    }

    // 8. Service Area Safety Invariant
    if (region.source === 'production' && region.isServiceAreaApproved && region.publicationState !== 'INDEXABLE') {
      warnings.push({
        code: 'SERVICE_AREA_NOT_INDEXABLE',
        severity: 'WARNING',
        message: `Region has isServiceAreaApproved=true but publicationState="${region.publicationState}". areaServed will NOT emit until INDEXABLE.`,
        regionId: region.id,
      });
    }

    // 9. Synthetic Fixture Flag Isolation
    if (region.source === 'production' && region.isSyntheticFixture) {
      errors.push({
        code: 'PRODUCTION_FIXTURE_CONFLICT',
        severity: 'ERROR',
        message: `Region cannot have source="production" and isSyntheticFixture=true concurrently.`,
        regionId: region.id,
      });
    }
  }

  // Check Dynamic Key Collisions
  const duplicateDynamicKeys: string[] = [];
  for (const [key, ids] of dynamicKeyMap.entries()) {
    if (ids.length > 1) {
      duplicateDynamicKeys.push(key);
      errors.push({
        code: 'DYNAMIC_KEY_COLLISION',
        severity: 'ERROR',
        message: `Dynamic keyword "${key}" collides across multiple regions: ${ids.join(', ')}. Disambiguation required.`,
      });
    }
  }

  // Canonical Readiness Semantics (Phase 4-C3 & Phase 6-A)
  const previewCanonicalValid = isPreviewOriginValid(siteOrigin);
  const productionCanonicalReady = isProductionOriginReady(siteOrigin);

  if (!productionCanonicalReady) {
    warnings.push({
      code: 'PRODUCTION_ORIGIN_NOT_CONFIGURED',
      severity: 'WARNING',
      message: 'Production HTTPS SITE_ORIGIN is not configured. INDEXABLE canonical URLs pending.',
    });
  }

  // Block INDEXABLE promotion if production canonical is not ready
  for (const region of dataset) {
    if (region.publicationState === 'INDEXABLE' && !productionCanonicalReady) {
      errors.push({
        code: 'INDEXABLE_CANONICAL_BLOCKED',
        severity: 'ERROR',
        message: `Region "${region.id}" is marked INDEXABLE but production canonical origin is not ready.`,
        regionId: region.id,
      });
    }
  }

  // Intent count audit
  const intentCount = SEARCH_INTENTS.length;
  if (intentCount !== 6) {
    errors.push({
      code: 'INVALID_INTENT_COUNT',
      severity: 'ERROR',
      message: `Expected exactly 6 search intents, but found ${intentCount}.`,
    });
  }

  const expectedUrlCount = dataset.length * intentCount;

  return {
    isValid: errors.length === 0,
    regionCount: dataset.length,
    expectedUrlCount,
    intentCount,
    errors,
    warnings,
    summary: {
      duplicateRegionIds: Array.from(duplicateIds),
      duplicateRoutes: Array.from(duplicateRoutes),
      duplicateDynamicKeys,
      invalidParents,
      invalidRegionTypes,
      disambiguationPending,
      invalidPublicationStates,
      previewCanonicalValid,
      productionCanonicalReady,
      canonicalReady: productionCanonicalReady,
    },
  };
}
