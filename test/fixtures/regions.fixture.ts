/**
 * Test Region Fixtures (Strictly separated from Production Dataset)
 *
 * Synthetic test fixtures for verifying same-name region collision,
 * disambiguation status, and route isolation.
 */

import { RegionItem } from '../../lib/types/regions';

export const TEST_REGIONS: readonly RegionItem[] = [
  {
    id: 'seoul',
    regionType: 'SIDO',
    canonicalName: '서울특별시',
    displayName: '서울',
    keywordRegionName: '서울',
    routeKey: '서울',
    sido: '서울',
    nearbyRegionIds: ['gyeonggi', 'incheon'],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'INDEXABLE',
  },
  {
    id: 'seoul-gangnam',
    regionType: 'GU',
    parentRegionId: 'seoul',
    canonicalName: '서울특별시 강남구',
    displayName: '강남구',
    keywordRegionName: '강남구',
    routeKey: '강남구',
    sido: '서울',
    sigugun: '강남구',
    nearbyRegionIds: ['seoul-seocho', 'seoul-songpa'],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'INDEXABLE',
  },
  {
    id: 'test-dong',
    regionType: 'DONG',
    parentRegionId: 'seoul-gangnam',
    canonicalName: '테스트특별시 테스트구 테스트동',
    displayName: '테스트동',
    keywordRegionName: '테스트동',
    routeKey: '테스트동',
    sido: '테스트',
    sigugun: '테스트구',
    dong: '테스트동',
    nearbyRegionIds: ['test-sample-dong'],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'INDEXABLE',
  },
  {
    id: 'test-sample-dong',
    regionType: 'DONG',
    parentRegionId: 'seoul-gangnam',
    canonicalName: '테스트특별시 테스트구 샘플동',
    displayName: '샘플동',
    keywordRegionName: '샘플동',
    routeKey: '샘플동',
    sido: '테스트',
    sigugun: '테스트구',
    dong: '샘플동',
    nearbyRegionIds: ['test-dong'],
    disambiguationStatus: 'NOT_REQUIRED',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'INDEXABLE',
  },
];

/**
 * Synthetic Test Fixture: Same-Name Region Collision
 * City A has '중앙동' and City B has '중앙동'. Both have keywordRegionName '중앙동'.
 * This must be caught by validatePublicDynamicKeyUniqueness.
 */
export const SYNTHETIC_COLLISION_REGIONS: readonly RegionItem[] = [
  {
    id: 'city-a-jungang',
    regionType: 'DONG',
    parentRegionId: 'city-a',
    canonicalName: '가상시 A구 중앙동',
    displayName: '중앙동',
    keywordRegionName: '중앙동', // Colliding public keyword
    routeKey: 'city-a-jungang',
    sido: '가상',
    sigugun: 'A구',
    dong: '중앙동',
    nearbyRegionIds: [],
    disambiguationStatus: 'REQUIRES_DISAMBIGUATION',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'DRAFT',
  },
  {
    id: 'city-b-jungang',
    regionType: 'DONG',
    parentRegionId: 'city-b',
    canonicalName: '가상시 B구 중앙동',
    displayName: '중앙동',
    keywordRegionName: '중앙동', // Colliding public keyword
    routeKey: 'city-b-jungang',
    sido: '가상',
    sigugun: 'B구',
    dong: '중앙동',
    nearbyRegionIds: [],
    disambiguationStatus: 'REQUIRES_DISAMBIGUATION',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'DRAFT',
  },
];

/**
 * Synthetic Test Fixture: User-Approved Disambiguated Regions
 * User reviewed the collision and approved differentiated keywords:
 * 'A시중앙동' vs 'B시중앙동'
 */
export const SYNTHETIC_APPROVED_DISAMBIGUATED_REGIONS: readonly RegionItem[] = [
  {
    id: 'city-a-jungang',
    regionType: 'DONG',
    parentRegionId: 'city-a',
    canonicalName: '가상시 A구 중앙동',
    displayName: '중앙동',
    keywordRegionName: 'A시중앙동', // Approved disambiguated keyword
    routeKey: 'city-a-jungang',
    sido: '가상',
    sigugun: 'A구',
    dong: '중앙동',
    nearbyRegionIds: [],
    disambiguationKey: 'city-a',
    disambiguationStatus: 'APPROVED',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'INDEXABLE',
  },
  {
    id: 'city-b-jungang',
    regionType: 'DONG',
    parentRegionId: 'city-b',
    canonicalName: '가상시 B구 중앙동',
    displayName: '중앙동',
    keywordRegionName: 'B시중앙동', // Approved disambiguated keyword
    routeKey: 'city-b-jungang',
    sido: '가상',
    sigugun: 'B구',
    dong: '중앙동',
    nearbyRegionIds: [],
    disambiguationKey: 'city-b',
    disambiguationStatus: 'APPROVED',
    source: 'fixture',
    isSyntheticFixture: true,
    isPilot: true,
    publicationState: 'INDEXABLE',
  },
];
