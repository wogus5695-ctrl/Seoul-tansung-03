/**
 * Synthetic Test Region Fixtures (Strictly separated from Production Dataset)
 *
 * Used exclusively for Dynamic Keyword Engine validation, SSR verification,
 * and testing without populating the empty production regions dataset.
 *
 * Production Region Dataset Policy:
 * In Phase 4-A / 4-A2, PRODUCTION_REGIONS remains strictly EMPTY.
 * Synthetic test regions are active only in development and test environments
 * and use visibly non-existent fixture names ("테스트동", "샘플동").
 */

import { RegionItem } from '../types/regions';

export const SYNTHETIC_TEST_REGIONS: readonly RegionItem[] = [
  {
    id: 'test-sido',
    regionType: 'SIDO',
    canonicalName: '테스트특별시',
    displayName: '테스트시',
    keywordRegionName: '테스트시',
    routeKey: '테스트시',
    sido: '테스트시',
    nearbyRegionIds: ['test-gu'],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'DRAFT', // Strictly DRAFT
  },
  {
    id: 'test-gu',
    regionType: 'GU',
    parentRegionId: 'test-sido',
    canonicalName: '테스트특별시 테스트구',
    displayName: '테스트구',
    keywordRegionName: '테스트구',
    routeKey: '테스트구',
    sido: '테스트시',
    sigugun: '테스트구',
    nearbyRegionIds: ['test-dong'],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'DRAFT', // Strictly DRAFT
  },
  {
    id: 'test-dong',
    regionType: 'DONG',
    parentRegionId: 'test-gu',
    canonicalName: '테스트특별시 테스트구 테스트동',
    displayName: '테스트동',
    keywordRegionName: '테스트동',
    routeKey: '테스트동',
    sido: '테스트시',
    sigugun: '테스트구',
    dong: '테스트동',
    nearbyRegionIds: ['test-sample-dong'],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'DRAFT', // Strictly DRAFT
  },
  {
    id: 'test-sample-dong',
    regionType: 'DONG',
    parentRegionId: 'test-gu',
    canonicalName: '테스트특별시 테스트구 샘플동',
    displayName: '샘플동',
    keywordRegionName: '샘플동',
    routeKey: '샘플동',
    sido: '테스트시',
    sigugun: '테스트구',
    dong: '샘플동',
    nearbyRegionIds: ['test-dong'],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'DRAFT', // Strictly DRAFT
  },
];
