/**
 * Recovery Portfolio Single Source of Truth (SSOT)
 * Phase 6-H2B-A Implementation
 *
 * Defines the frozen 15-URL Recovery Architecture:
 * - 15 Verified Regions (5 Autonomous GUs + 10 Residential DONGs)
 * - 1 Primary Search Intent ('탄성코트')
 * - Verified public housing statistics (한국부동산원 2026.08.31 기준)
 * - Deterministic adjacent recovery navigation mappings
 */

import { ServiceKeyword } from '../types/intents';

export const RECOVERY_ENABLED = true;
export const RECOVERY_PRIMARY_INTENT: ServiceKeyword = '탄성코트';
export const RECOVERY_PRIMARY_INTENT_ID = 'elastic-coating';

export const RECOVERY_REGION_IDS = [
  // 5 Autonomous GUs
  'seoul-gangnam-gu',
  'seoul-seocho-gu',
  'seoul-eunpyeong-gu',
  'seoul-gangseo-gu',
  'seoul-seongdong-gu',
  // 10 Residential DONGs
  'seoul-eunpyeong-bulgwang',
  'seoul-eunpyeong-갈현동',
  'seoul-gangseo-마곡동',
  'seoul-gangseo-가양동',
  'seoul-seongdong-성수동',
  'seoul-gwangjin-자양동',
  'seoul-jongno-창신동',
  'seoul-jongno-숭인동',
  'seoul-nowon-상계동',
  'seoul-yangcheon-목동',
] as const;

export type RecoveryRegionId = typeof RECOVERY_REGION_IDS[number];

export interface RecoveryRegionProfile {
  readonly id: RecoveryRegionId;
  readonly name: string;
  readonly type: 'GU' | 'DONG';
  readonly parentGu: string;
  readonly units: number;
  readonly households: number;
  readonly validDates: number;
  readonly aptCount: number;
  readonly rowCount: number;
  readonly multiCount: number;
  readonly aptShare: string;
  readonly rowShare: string;
  readonly multiShare: string;
  readonly villaShare: string;
  readonly over20Count: number;
  readonly over20Share: string;
  readonly relatedRecoveryRegionIds: readonly RecoveryRegionId[];
}

export const RECOVERY_REGIONS_PROFILES: Record<RecoveryRegionId, RecoveryRegionProfile> = {
  'seoul-gangnam-gu': {
    id: 'seoul-gangnam-gu',
    name: '강남구',
    type: 'GU',
    parentGu: '강남구',
    units: 4421,
    households: 168588,
    validDates: 4385,
    aptCount: 718,
    rowCount: 385,
    multiCount: 3282,
    aptShare: '16.2%',
    rowShare: '8.7%',
    multiShare: '74.2%',
    villaShare: '82.9%',
    over20Count: 3038,
    over20Share: '69.3%',
    relatedRecoveryRegionIds: ['seoul-seocho-gu', 'seoul-seongdong-gu'],
  },
  'seoul-seocho-gu': {
    id: 'seoul-seocho-gu',
    name: '서초구',
    type: 'GU',
    parentGu: '서초구',
    units: 4256,
    households: 126891,
    validDates: 4246,
    aptCount: 783,
    rowCount: 450,
    multiCount: 3013,
    aptShare: '18.4%',
    rowShare: '10.6%',
    multiShare: '70.8%',
    villaShare: '81.4%',
    over20Count: 2569,
    over20Share: '60.5%',
    relatedRecoveryRegionIds: ['seoul-gangnam-gu', 'seoul-gangseo-gu'],
  },
  'seoul-eunpyeong-gu': {
    id: 'seoul-eunpyeong-gu',
    name: '은평구',
    type: 'GU',
    parentGu: '은평구',
    units: 8850,
    households: 146166,
    validDates: 8828,
    aptCount: 573,
    rowCount: 324,
    multiCount: 7931,
    aptShare: '6.5%',
    rowShare: '3.7%',
    multiShare: '89.6%',
    villaShare: '93.3%',
    over20Count: 5299,
    over20Share: '60.0%',
    relatedRecoveryRegionIds: ['seoul-eunpyeong-bulgwang', 'seoul-eunpyeong-갈현동'],
  },
  'seoul-gangseo-gu': {
    id: 'seoul-gangseo-gu',
    name: '강서구',
    type: 'GU',
    parentGu: '강서구',
    units: 7753,
    households: 185053,
    validDates: 7717,
    aptCount: 710,
    rowCount: 214,
    multiCount: 6793,
    aptShare: '9.2%',
    rowShare: '2.8%',
    multiShare: '87.6%',
    villaShare: '90.4%',
    over20Count: 4564,
    over20Share: '59.1%',
    relatedRecoveryRegionIds: ['seoul-gangseo-마곡동', 'seoul-gangseo-가양동'],
  },
  'seoul-seongdong-gu': {
    id: 'seoul-seongdong-gu',
    name: '성동구',
    type: 'GU',
    parentGu: '성동구',
    units: 1558,
    households: 75366,
    validDates: 1553,
    aptCount: 182,
    rowCount: 91,
    multiCount: 1280,
    aptShare: '11.7%',
    rowShare: '5.8%',
    multiShare: '82.2%',
    villaShare: '88.0%',
    over20Count: 1044,
    over20Share: '67.2%',
    relatedRecoveryRegionIds: ['seoul-seongdong-성수동', 'seoul-gangnam-gu'],
  },
  'seoul-eunpyeong-bulgwang': {
    id: 'seoul-eunpyeong-bulgwang',
    name: '불광동',
    type: 'DONG',
    parentGu: '은평구',
    units: 1447,
    households: 20294,
    validDates: 1442,
    aptCount: 52,
    rowCount: 67,
    multiCount: 1323,
    aptShare: '3.6%',
    rowShare: '4.6%',
    multiShare: '91.4%',
    villaShare: '96.1%',
    over20Count: 949,
    over20Share: '65.8%',
    relatedRecoveryRegionIds: ['seoul-eunpyeong-gu', 'seoul-eunpyeong-갈현동'],
  },
  'seoul-eunpyeong-갈현동': {
    id: 'seoul-eunpyeong-갈현동',
    name: '갈현동',
    type: 'DONG',
    parentGu: '은평구',
    units: 1142,
    households: 12851,
    validDates: 1138,
    aptCount: 40,
    rowCount: 41,
    multiCount: 1057,
    aptShare: '3.5%',
    rowShare: '3.6%',
    multiShare: '92.6%',
    villaShare: '96.1%',
    over20Count: 608,
    over20Share: '53.4%',
    relatedRecoveryRegionIds: ['seoul-eunpyeong-gu', 'seoul-eunpyeong-bulgwang'],
  },
  'seoul-gangseo-마곡동': {
    id: 'seoul-gangseo-마곡동',
    name: '마곡동',
    type: 'DONG',
    parentGu: '강서구',
    units: 95,
    households: 16057,
    validDates: 94,
    aptCount: 37,
    rowCount: 3,
    multiCount: 54,
    aptShare: '38.9%',
    rowShare: '3.2%',
    multiShare: '56.8%',
    villaShare: '60.0%',
    over20Count: 46,
    over20Share: '48.9%',
    relatedRecoveryRegionIds: ['seoul-gangseo-gu', 'seoul-gangseo-가양동'],
  },
  'seoul-gangseo-가양동': {
    id: 'seoul-gangseo-가양동',
    name: '가양동',
    type: 'DONG',
    parentGu: '강서구',
    units: 79,
    households: 19410,
    validDates: 78,
    aptCount: 27,
    rowCount: 4,
    multiCount: 47,
    aptShare: '34.2%',
    rowShare: '5.1%',
    multiShare: '59.5%',
    villaShare: '64.6%',
    over20Count: 49,
    over20Share: '62.8%',
    relatedRecoveryRegionIds: ['seoul-gangseo-gu', 'seoul-gangseo-마곡동'],
  },
  'seoul-seongdong-성수동': {
    id: 'seoul-seongdong-성수동',
    name: '성수동',
    type: 'DONG',
    parentGu: '성동구',
    units: 315,
    households: 14092,
    validDates: 315,
    aptCount: 45,
    rowCount: 40,
    multiCount: 230,
    aptShare: '14.3%',
    rowShare: '12.7%',
    multiShare: '73.0%',
    villaShare: '85.7%',
    over20Count: 186,
    over20Share: '59.0%',
    relatedRecoveryRegionIds: ['seoul-seongdong-gu', 'seoul-gwangjin-자양동'],
  },
  'seoul-gwangjin-자양동': {
    id: 'seoul-gwangjin-자양동',
    name: '자양동',
    type: 'DONG',
    parentGu: '광진구',
    units: 1146,
    households: 24081,
    validDates: 1143,
    aptCount: 82,
    rowCount: 70,
    multiCount: 991,
    aptShare: '7.2%',
    rowShare: '6.1%',
    multiShare: '86.5%',
    villaShare: '92.6%',
    over20Count: 477,
    over20Share: '41.7%',
    relatedRecoveryRegionIds: ['seoul-seongdong-성수동', 'seoul-gangnam-gu'],
  },
  'seoul-jongno-창신동': {
    id: 'seoul-jongno-창신동',
    name: '창신동',
    type: 'DONG',
    parentGu: '종로구',
    units: 274,
    households: 4444,
    validDates: 273,
    aptCount: 27,
    rowCount: 10,
    multiCount: 236,
    aptShare: '9.9%',
    rowShare: '3.6%',
    multiShare: '86.1%',
    villaShare: '89.8%',
    over20Count: 253,
    over20Share: '92.7%',
    relatedRecoveryRegionIds: ['seoul-jongno-숭인동', 'seoul-seongdong-gu'],
  },
  'seoul-jongno-숭인동': {
    id: 'seoul-jongno-숭인동',
    name: '숭인동',
    type: 'DONG',
    parentGu: '종로구',
    units: 240,
    households: 4304,
    validDates: 239,
    aptCount: 37,
    rowCount: 16,
    multiCount: 186,
    aptShare: '15.4%',
    rowShare: '6.7%',
    multiShare: '77.5%',
    villaShare: '84.2%',
    over20Count: 160,
    over20Share: '66.9%',
    relatedRecoveryRegionIds: ['seoul-jongno-창신동', 'seoul-seongdong-gu'],
  },
  'seoul-nowon-상계동': {
    id: 'seoul-nowon-상계동',
    name: '상계동',
    type: 'DONG',
    parentGu: '노원구',
    units: 914,
    households: 69494,
    validDates: 890,
    aptCount: 107,
    rowCount: 90,
    multiCount: 693,
    aptShare: '11.7%',
    rowShare: '9.8%',
    multiShare: '75.8%',
    villaShare: '85.7%',
    over20Count: 663,
    over20Share: '74.5%',
    relatedRecoveryRegionIds: ['seoul-jongno-창신동', 'seoul-seongdong-gu'],
  },
  'seoul-yangcheon-목동': {
    id: 'seoul-yangcheon-목동',
    name: '목동',
    type: 'DONG',
    parentGu: '양천구',
    units: 1837,
    households: 42141,
    validDates: 1825,
    aptCount: 132,
    rowCount: 66,
    multiCount: 1627,
    aptShare: '7.2%',
    rowShare: '3.6%',
    multiShare: '88.6%',
    villaShare: '92.2%',
    over20Count: 1007,
    over20Share: '55.2%',
    relatedRecoveryRegionIds: ['seoul-gangseo-gu', 'seoul-gangseo-가양동'],
  },
};

export const COMMON_SOURCE_LABEL =
  '출처: 한국부동산원 공동주택 식별정보 공개자료 · 2026.08 기준';

export const COMMON_LIMITATION_NOTE =
  '※ 공개 데이터의 건물 연식이나 주거 유형만으로 개별 세대의 탄성코트 시공 필요성을 판단할 수는 없습니다.';

export const COMMON_CHECKPOINT_NOTE =
  '실제 시공 전에는 기존 도막의 들뜸·박리 흔적과 미세 균열 등 바탕면 상태를 우선 점검하여 필요한 보수 범위를 판단하는 것이 중요합니다.';

export function isRecoveryRegion(regionId: string): boolean {
  if (!RECOVERY_ENABLED) return false;
  return RECOVERY_REGION_IDS.includes(regionId as RecoveryRegionId);
}

export function isRecoveryIntent(serviceKeyword: string): boolean {
  if (!RECOVERY_ENABLED) return false;
  return serviceKeyword === RECOVERY_PRIMARY_INTENT;
}

export function isRecoveryDynamicPage(regionId: string, serviceKeyword: string): boolean {
  return isRecoveryRegion(regionId) && isRecoveryIntent(serviceKeyword);
}

export function getRecoveryProfile(regionId: string): RecoveryRegionProfile | undefined {
  if (!isRecoveryRegion(regionId)) return undefined;
  return RECOVERY_REGIONS_PROFILES[regionId as RecoveryRegionId];
}

export function getRelatedRecoveryRegions(regionId: string): readonly RecoveryRegionProfile[] {
  const profile = getRecoveryProfile(regionId);
  if (!profile) return [];
  return profile.relatedRecoveryRegionIds
    .map((id) => RECOVERY_REGIONS_PROFILES[id])
    .filter((p): p is RecoveryRegionProfile => Boolean(p));
}
