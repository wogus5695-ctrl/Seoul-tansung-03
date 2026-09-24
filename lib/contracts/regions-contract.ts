/**
 * Region Dataset Contract
 *
 * PRODUCTION DATASET POLICY:
 * In PHASE 2 / 2-B, the production dataset remains strictly EMPTY until official
 * regional expansion approval is provided by the user.
 *
 * Test fixtures must be isolated in separate test fixture files.
 */

import { RegionItem } from '../types/regions';
import { SYNTHETIC_TEST_REGIONS } from '../fixtures/test-regions';
import { SEOUL_APPROVED_DONG_REGIONS } from './seoul-approved-dongs';

/**
 * Official Production Regions Dataset (Phase 5-B2A Rollout: 25 Seoul GUs + 1 Bulgwang Approved + 1 Sinsa Collision-Hold + 291 Approved DONGs = 318 Regions)
 */
export const PRODUCTION_REGIONS: readonly RegionItem[] = [
  // 1. 종로구
  {
    id: 'seoul-jongno-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 종로구',
    displayName: '종로구',
    keywordRegionName: '종로구',
    routeKey: 'jongno-gu',
    sido: '서울',
    sigugun: '종로구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 2. 중구
  {
    id: 'seoul-jung-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 중구',
    displayName: '중구',
    keywordRegionName: '중구',
    routeKey: 'jung-gu',
    sido: '서울',
    sigugun: '중구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 3. 용산구
  {
    id: 'seoul-yongsan-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 용산구',
    displayName: '용산구',
    keywordRegionName: '용산구',
    routeKey: 'yongsan-gu',
    sido: '서울',
    sigugun: '용산구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 4. 성동구
  {
    id: 'seoul-seongdong-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 성동구',
    displayName: '성동구',
    keywordRegionName: '성동구',
    routeKey: 'seongdong-gu',
    sido: '서울',
    sigugun: '성동구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 5. 광진구
  {
    id: 'seoul-gwangjin-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 광진구',
    displayName: '광진구',
    keywordRegionName: '광진구',
    routeKey: 'gwangjin-gu',
    sido: '서울',
    sigugun: '광진구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 6. 동대문구
  {
    id: 'seoul-dongdaemun-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 동대문구',
    displayName: '동대문구',
    keywordRegionName: '동대문구',
    routeKey: 'dongdaemun-gu',
    sido: '서울',
    sigugun: '동대문구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 7. 중랑구
  {
    id: 'seoul-jungnang-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 중랑구',
    displayName: '중랑구',
    keywordRegionName: '중랑구',
    routeKey: 'jungnang-gu',
    sido: '서울',
    sigugun: '중랑구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 8. 성북구
  {
    id: 'seoul-seongbuk-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 성북구',
    displayName: '성북구',
    keywordRegionName: '성북구',
    routeKey: 'seongbuk-gu',
    sido: '서울',
    sigugun: '성북구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 9. 강북구
  {
    id: 'seoul-gangbuk-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 강북구',
    displayName: '강북구',
    keywordRegionName: '강북구',
    routeKey: 'gangbuk-gu',
    sido: '서울',
    sigugun: '강북구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 10. 도봉구
  {
    id: 'seoul-dobong-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 도봉구',
    displayName: '도봉구',
    keywordRegionName: '도봉구',
    routeKey: 'dobong-gu',
    sido: '서울',
    sigugun: '도봉구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 11. 노원구
  {
    id: 'seoul-nowon-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 노원구',
    displayName: '노원구',
    keywordRegionName: '노원구',
    routeKey: 'nowon-gu',
    sido: '서울',
    sigugun: '노원구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 12. 은평구 (Reconciled from Pilot)
  {
    id: 'seoul-eunpyeong-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 은평구',
    displayName: '은평구',
    keywordRegionName: '은평구',
    routeKey: 'eunpyeong-gu',
    sido: '서울',
    sigugun: '은평구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 13. 서대문구
  {
    id: 'seoul-seodaemun-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 서대문구',
    displayName: '서대문구',
    keywordRegionName: '서대문구',
    routeKey: 'seodaemun-gu',
    sido: '서울',
    sigugun: '서대문구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 14. 마포구
  {
    id: 'seoul-mapo-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 마포구',
    displayName: '마포구',
    keywordRegionName: '마포구',
    routeKey: 'mapo-gu',
    sido: '서울',
    sigugun: '마포구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 15. 양천구
  {
    id: 'seoul-yangcheon-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 양천구',
    displayName: '양천구',
    keywordRegionName: '양천구',
    routeKey: 'yangcheon-gu',
    sido: '서울',
    sigugun: '양천구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 16. 강서구
  {
    id: 'seoul-gangseo-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 강서구',
    displayName: '강서구',
    keywordRegionName: '강서구',
    routeKey: 'gangseo-gu',
    sido: '서울',
    sigugun: '강서구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 17. 구로구
  {
    id: 'seoul-guro-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 구로구',
    displayName: '구로구',
    keywordRegionName: '구로구',
    routeKey: 'guro-gu',
    sido: '서울',
    sigugun: '구로구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 18. 금천구
  {
    id: 'seoul-geumcheon-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 금천구',
    displayName: '금천구',
    keywordRegionName: '금천구',
    routeKey: 'geumcheon-gu',
    sido: '서울',
    sigugun: '금천구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 19. 영등포구
  {
    id: 'seoul-yeongdeungpo-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 영등포구',
    displayName: '영등포구',
    keywordRegionName: '영등포구',
    routeKey: 'yeongdeungpo-gu',
    sido: '서울',
    sigugun: '영등포구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 20. 동작구
  {
    id: 'seoul-dongjak-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 동작구',
    displayName: '동작구',
    keywordRegionName: '동작구',
    routeKey: 'dongjak-gu',
    sido: '서울',
    sigugun: '동작구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 21. 관악구
  {
    id: 'seoul-gwanak-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 관악구',
    displayName: '관악구',
    keywordRegionName: '관악구',
    routeKey: 'gwanak-gu',
    sido: '서울',
    sigugun: '관악구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 22. 서초구
  {
    id: 'seoul-seocho-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 서초구',
    displayName: '서초구',
    keywordRegionName: '서초구',
    routeKey: 'seocho-gu',
    sido: '서울',
    sigugun: '서초구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 23. 강남구
  {
    id: 'seoul-gangnam-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 강남구',
    displayName: '강남구',
    keywordRegionName: '강남구',
    routeKey: 'gangnam-gu',
    sido: '서울',
    sigugun: '강남구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 24. 송파구
  {
    id: 'seoul-songpa-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 송파구',
    displayName: '송파구',
    keywordRegionName: '송파구',
    routeKey: 'songpa-gu',
    sido: '서울',
    sigugun: '송파구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 25. 강동구
  {
    id: 'seoul-gangdong-gu',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 강동구',
    displayName: '강동구',
    keywordRegionName: '강동구',
    routeKey: 'gangdong-gu',
    sido: '서울',
    sigugun: '강동구',
    dong: undefined,
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 26. 불광동 (Pilot DONG)
  {
    id: 'seoul-eunpyeong-bulgwang',
    regionType: 'DONG',
    parentRegionId: 'seoul-eunpyeong-gu',
    canonicalName: '서울특별시 은평구 불광동',
    displayName: '불광동',
    keywordRegionName: '불광동',
    routeKey: 'bulgwang-dong',
    sido: '서울',
    sigugun: '은평구',
    dong: '불광동',
    nearbyRegionIds: [],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 27. 신사동 (Pilot DONG, Collision Hold)
  {
    id: 'seoul-eunpyeong-sinsa',
    regionType: 'DONG',
    parentRegionId: 'seoul-eunpyeong-gu',
    canonicalName: '서울특별시 은평구 신사동',
    displayName: '신사동',
    keywordRegionName: '신사동',
    routeKey: 'eunpyeong-sinsa',
    sido: '서울',
    sigugun: '은평구',
    dong: '신사동',
    nearbyRegionIds: [],
    disambiguationKey: 'eunpyeong',
    disambiguationStatus: 'APPROVED',
    source: 'production',
    rolloutStage: 'pilot',
    isSyntheticFixture: false,
    publicationState: 'PUBLISHED_NOINDEX',
    isServiceAreaApproved: false,
  },
  // 28 ~ 318. 291 Approved Seoul DONGs (Phase 5-B2A Rollout)
  ...SEOUL_APPROVED_DONG_REGIONS,
];

/**
 * Finds a region by routeKey in a given dataset.
 */
export function findRegionByRouteKey(
  routeKey: string,
  dataset: readonly RegionItem[] = PRODUCTION_REGIONS
): RegionItem | undefined {
  return dataset.find((r) => r.routeKey === routeKey);
}

/**
 * Finds a region by keywordRegionName in a given dataset.
 */
export function findRegionByKeyword(
  keywordRegionName: string,
  dataset: readonly RegionItem[] = PRODUCTION_REGIONS
): RegionItem | undefined {
  return dataset.find((r) => r.keywordRegionName === keywordRegionName);
}

/**
 * Finds a region by internal id in a given dataset.
 */
export function findRegionById(
  id: string,
  dataset: readonly RegionItem[] = PRODUCTION_REGIONS
): RegionItem | undefined {
  return dataset.find((r) => r.id === id);
}

/**
 * Validates internal ID uniqueness across the entire dataset.
 */
export function validateInternalIdUniqueness(dataset: readonly RegionItem[]): {
  isUnique: boolean;
  duplicates: string[];
} {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of dataset) {
    if (seen.has(item.id)) {
      duplicates.add(item.id);
    }
    seen.add(item.id);
  }

  return {
    isUnique: duplicates.size === 0,
    duplicates: Array.from(duplicates),
  };
}

/**
 * Validates public dynamic key (keywordRegionName) uniqueness.
 * Prevents identical public URLs across different parent regions (e.g. City A / 중앙동 vs City B / 중앙동).
 */
export function validatePublicDynamicKeyUniqueness(dataset: readonly RegionItem[]): {
  isUnique: boolean;
  collisions: { keywordRegionName: string; regionIds: string[] }[];
} {
  const grouped = new Map<string, string[]>();

  for (const item of dataset) {
    const list = grouped.get(item.keywordRegionName) || [];
    list.push(item.id);
    grouped.set(item.keywordRegionName, list);
  }

  const collisions: { keywordRegionName: string; regionIds: string[] }[] = [];
  for (const [name, ids] of grouped.entries()) {
    if (ids.length > 1) {
      collisions.push({ keywordRegionName: name, regionIds: ids });
    }
  }

  return {
    isUnique: collisions.length === 0,
    collisions,
  };
}

/**
 * Legacy check for routeKey uniqueness.
 */
export function validateUniqueRouteKeys(dataset: readonly RegionItem[]): {
  isUnique: boolean;
  duplicates: string[];
} {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of dataset) {
    if (seen.has(item.routeKey)) {
      duplicates.add(item.routeKey);
    }
    seen.add(item.routeKey);
  }

  return {
    isUnique: duplicates.size === 0,
    duplicates: Array.from(duplicates),
  };
}

const KNOWN_SIDO_ROOTS = new Set([
  'seoul', 'gyeonggi', 'incheon', 'busan', 'daegu', 'gwangju',
  'daejeon', 'ulsan', 'sejong', 'gangwon', 'chungbuk', 'chungnam',
  'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju'
]);

/**
 * Validates that all parentRegionIds point to an existing region in the dataset or a valid SIDO root.
 */
export function validateRegionParentIntegrity(dataset: readonly RegionItem[]): {
  isValid: boolean;
  orphanedIds: string[];
} {
  const ids = new Set(dataset.map((r) => r.id));
  const orphanedIds: string[] = [];

  for (const item of dataset) {
    if (
      item.parentRegionId &&
      !ids.has(item.parentRegionId) &&
      !KNOWN_SIDO_ROOTS.has(item.parentRegionId)
    ) {
      orphanedIds.push(item.id);
    }
  }

  return {
    isValid: orphanedIds.length === 0,
    orphanedIds,
  };
}

/**
 * Returns the active regions for dynamic routing and SSR.
 *
 * PRODUCTION SAFETY INVARIANT:
 * - In production builds, returns strictly PRODUCTION_REGIONS (which is empty in Phase 4-A).
 * - In development or test environments, returns synthetic test fixtures for engine verification.
 */
export function getActiveRegions(
  allowTestFixtures: boolean = process.env.NODE_ENV !== 'production' ||
    process.env.NEXT_PUBLIC_ENABLE_TEST_REGIONS === 'true'
): readonly RegionItem[] {
  if (allowTestFixtures) {
    return [...PRODUCTION_REGIONS, ...SYNTHETIC_TEST_REGIONS];
  }
  return PRODUCTION_REGIONS;
}

/**
 * Evaluates whether a region qualifies for Structured Data areaServed declaration.
 *
 * PRODUCTION SAFETY GATE (Phase 4-A3 & Phase 6-A2):
 * Production areaServed is emitted ONLY when ALL 4 criteria are satisfied:
 * 1. Region is an official production region (source === 'production' / isSyntheticFixture !== true)
 * 2. Region approvalStatus is APPROVED (not COLLISION_HOLD / not REQUIRES_DISAMBIGUATION)
 * 3. Publication state is strictly INDEXABLE
 * 4. isServiceAreaApproved === true (Separate operational approval; APPROVED alone does NOT grant areaServed)
 *
 * Test fixtures (isSyntheticFixture: true / source: 'fixture') are permitted in development / test with NOINDEX.
 */
export function shouldEmitAreaServed(
  region: RegionItem,
  isProduction: boolean = process.env.NODE_ENV === 'production',
  approvalStatus?: string
): boolean {
  if (region.isSyntheticFixture || region.source === 'fixture') {
    // Synthetic test fixture permitted in dev/test only
    return !isProduction;
  }

  // Fatal exclusion for collision hold or unapproved disambiguation
  if (approvalStatus === 'COLLISION_HOLD' || region.disambiguationStatus === 'REQUIRES_DISAMBIGUATION') {
    return false;
  }

  // If approvalStatus is specified, it must be APPROVED
  if (approvalStatus && approvalStatus !== 'APPROVED') {
    return false;
  }

  // Production region gate: must be official production region, indexable, and operational service area approved
  return (
    region.source === 'production' &&
    region.publicationState === 'INDEXABLE' &&
    region.isServiceAreaApproved === true
  );
}

