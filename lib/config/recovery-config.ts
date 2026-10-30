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

export const BASE_RECOVERY_INTENT: ServiceKeyword = '탄성코트';

export const BASE_RECOVERY_REGION_IDS = [
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

export type BaseRecoveryRegionId = typeof BASE_RECOVERY_REGION_IDS[number];

/**
 * Phase 6-I0B-1 Yangcheon South Cohort Expansion SSOT
 * Exactly 4 regions x 2 authorized search intents ('탄성코트', '베란다탄성코트')
 */
export const YANGCHEON_COHORT_REGION_IDS = [
  'seoul-yangcheon-gu',
  'seoul-yangcheon-목동',
  'seoul-yangcheon-신월동',
  'seoul-yangcheon-sinjeong',
] as const;

export type YangcheonCohortRegionId = typeof YANGCHEON_COHORT_REGION_IDS[number];

export const YANGCHEON_COHORT_INTENTS: readonly ServiceKeyword[] = [
  '탄성코트',
  '베란다탄성코트',
] as const;

/**
 * Phase 6-K1A Guro-Gu P1 South Cohort Expansion SSOT
 * Exactly 8 regions x 2 authorized search intents ('탄성코트', '베란다탄성코트')
 */
export const GURO_COHORT_REGION_IDS = [
  'seoul-guro-gu',
  'seoul-guro-신도림동',
  'seoul-guro-구로동',
  'seoul-guro-고척동',
  'seoul-guro-개봉동',
  'seoul-guro-오류동',
  'seoul-guro-천왕동',
  'seoul-guro-항동',
] as const;

export type GuroCohortRegionId = typeof GURO_COHORT_REGION_IDS[number];

export const GURO_COHORT_INTENTS: readonly ServiceKeyword[] = [
  '탄성코트',
  '베란다탄성코트',
] as const;

/**
 * Phase 6-M1A Yeongdeungpo-Gu P1 South Cohort Expansion SSOT
 * Exactly 9 regions x 2 authorized search intents ('탄성코트', '베란다탄성코트')
 */
export const YEONGDEUNGPO_COHORT_REGION_IDS = [
  'seoul-yeongdeungpo-gu',
  'seoul-yeongdeungpo-영등포동',
  'seoul-yeongdeungpo-당산동',
  'seoul-yeongdeungpo-문래동',
  'seoul-yeongdeungpo-신길동',
  'seoul-yeongdeungpo-대림동',
  'seoul-yeongdeungpo-양평동',
  'seoul-yeongdeungpo-여의동',
  'seoul-yeongdeungpo-도림동',
] as const;

export type YeongdeungpoCohortRegionId = typeof YEONGDEUNGPO_COHORT_REGION_IDS[number];

export const YEONGDEUNGPO_COHORT_INTENTS: readonly ServiceKeyword[] = [
  '탄성코트',
  '베란다탄성코트',
] as const;

/**
 * Phase 6-P1B Dongjak-Gu South Cohort Expansion SSOT
 * Exactly 9 regions x 2 authorized search intents ('탄성코트', '베란다탄성코트')
 */
export const DONGJAK_COHORT_REGION_IDS = [
  'seoul-dongjak-gu',
  'seoul-dongjak-노량진동',
  'seoul-dongjak-상도동',
  'seoul-dongjak-흑석동',
  'seoul-dongjak-사당동',
  'seoul-dongjak-대방동',
  'seoul-dongjak-신대방동',
  'seoul-dongjak-본동',
  'seoul-dongjak-동작동',
] as const;

export type DongjakCohortRegionId = typeof DONGJAK_COHORT_REGION_IDS[number];

export const DONGJAK_COHORT_INTENTS: readonly ServiceKeyword[] = [
  '탄성코트',
  '베란다탄성코트',
] as const;

/**
 * Phase 6-P1B Geumcheon-Gu South Cohort Expansion SSOT
 * Exactly 4 regions x 2 authorized search intents ('탄성코트', '베란다탄성코트')
 */
export const GEUMCHEON_COHORT_REGION_IDS = [
  'seoul-geumcheon-gu',
  'seoul-geumcheon-가산동',
  'seoul-geumcheon-독산동',
  'seoul-geumcheon-시흥동',
] as const;

export type GeumcheonCohortRegionId = typeof GEUMCHEON_COHORT_REGION_IDS[number];

export const GEUMCHEON_COHORT_INTENTS: readonly ServiceKeyword[] = [
  '탄성코트',
  '베란다탄성코트',
] as const;

/**
 * Phase 6-Q1B Gangseo-Gu P1 South Cohort Expansion SSOT
 * Exactly 7 regions x 2 authorized search intents ('탄성코트', '베란다탄성코트')
 * Note: 강서구, 마곡동, 가양동 already exist in BASE_RECOVERY_REGION_IDS (탄성코트 only).
 * This cohort enables both intents for all 7 Gangseo regions.
 */
export const GANGSEO_COHORT_REGION_IDS = [
  'seoul-gangseo-gu',
  'seoul-gangseo-마곡동',
  'seoul-gangseo-가양동',
  'seoul-gangseo-화곡동',
  'seoul-gangseo-등촌동',
  'seoul-gangseo-염창동',
  'seoul-gangseo-발산동',
] as const;

export type GangseoCohortRegionId = typeof GANGSEO_COHORT_REGION_IDS[number];

export const GANGSEO_COHORT_INTENTS: readonly ServiceKeyword[] = [
  '탄성코트',
  '베란다탄성코트',
] as const;

/**
 * Phase 6-Q1B Gwanak-Gu P1 South Cohort Expansion SSOT
 * Exactly 4 regions x 2 authorized search intents ('탄성코트', '베란다탄성코트')
 * Approved canonical dongs: 봉천동, 신림동, 남현동
 * Disallowed: 삼성동, 신사동, 신원동, 서원동, 조원동 (collision risk or SEO overlap)
 */
export const GWANAK_COHORT_REGION_IDS = [
  'seoul-gwanak-gu',
  'seoul-gwanak-봉천동',
  'seoul-gwanak-신림동',
  'seoul-gwanak-남현동',
] as const;

export type GwanakCohortRegionId = typeof GWANAK_COHORT_REGION_IDS[number];

export const GWANAK_COHORT_INTENTS: readonly ServiceKeyword[] = [
  '탄성코트',
  '베란다탄성코트',
] as const;

/**
 * Phase 6-Q1B Seocho-Gu P1 South Cohort Expansion SSOT
 * Exactly 5 regions x 2 authorized search intents ('탄성코트', '베란다탄성코트')
 * Note: 서초구 already exists in BASE_RECOVERY_REGION_IDS (탄성코트 only).
 * This cohort enables both intents for all 5 Seocho regions.
 * Disallowed: 신원동, 잠원동 (동명이의 risk or P2 hold)
 */
export const SEOCHO_COHORT_REGION_IDS = [
  'seoul-seocho-gu',
  'seoul-seocho-서초동',
  'seoul-seocho-반포동',
  'seoul-seocho-방배동',
  'seoul-seocho-양재동',
] as const;

export type SeochoCohortRegionId = typeof SEOCHO_COHORT_REGION_IDS[number];

export const SEOCHO_COHORT_INTENTS: readonly ServiceKeyword[] = [
  '탄성코트',
  '베란다탄성코트',
] as const;

export const RECOVERY_REGION_IDS = [
  ...BASE_RECOVERY_REGION_IDS,
  'seoul-yangcheon-gu',
  'seoul-yangcheon-신월동',
  'seoul-yangcheon-sinjeong',
  ...GURO_COHORT_REGION_IDS,
  ...YEONGDEUNGPO_COHORT_REGION_IDS,
  ...DONGJAK_COHORT_REGION_IDS,
  ...GEUMCHEON_COHORT_REGION_IDS,
  // Phase 6-Q1B: Gangseo (new DONGs only; GU+마곡동+가양동 already in BASE)
  'seoul-gangseo-화곡동',
  'seoul-gangseo-등촌동',
  'seoul-gangseo-염창동',
  'seoul-gangseo-발산동',
  // Phase 6-Q1B: Gwanak
  ...GWANAK_COHORT_REGION_IDS,
  // Phase 6-Q1B: Seocho (new DONGs only; GU already in BASE)
  'seoul-seocho-서초동',
  'seoul-seocho-반포동',
  'seoul-seocho-방배동',
  'seoul-seocho-양재동',
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
  'seoul-yangcheon-gu': {
    id: 'seoul-yangcheon-gu',
    name: '양천구',
    type: 'GU',
    parentGu: '양천구',
    units: 5258,
    households: 135633,
    validDates: 5230,
    aptCount: 504,
    rowCount: 223,
    multiCount: 4503,
    aptShare: '9.6%',
    rowShare: '4.2%',
    multiShare: '85.6%',
    villaShare: '89.9%',
    over20Count: 3454,
    over20Share: '66.0%',
    relatedRecoveryRegionIds: ['seoul-gangseo-gu', 'seoul-yangcheon-목동'],
  },
  'seoul-yangcheon-신월동': {
    id: 'seoul-yangcheon-신월동',
    name: '신월동',
    type: 'DONG',
    parentGu: '양천구',
    units: 2292,
    households: 39175,
    validDates: 2283,
    aptCount: 213,
    rowCount: 118,
    multiCount: 1952,
    aptShare: '9.3%',
    rowShare: '5.1%',
    multiShare: '85.2%',
    villaShare: '90.3%',
    over20Count: 1712,
    over20Share: '75.0%',
    relatedRecoveryRegionIds: ['seoul-yangcheon-목동', 'seoul-gangseo-gu'],
  },
  'seoul-yangcheon-sinjeong': {
    id: 'seoul-yangcheon-sinjeong',
    name: '양천구 신정동',
    type: 'DONG',
    parentGu: '양천구',
    units: 1129,
    households: 54317,
    validDates: 1122,
    aptCount: 159,
    rowCount: 39,
    multiCount: 924,
    aptShare: '14.1%',
    rowShare: '3.5%',
    multiShare: '81.8%',
    villaShare: '85.3%',
    over20Count: 735,
    over20Share: '65.5%',
    relatedRecoveryRegionIds: ['seoul-yangcheon-목동', 'seoul-yangcheon-신월동'],
  },
  'seoul-guro-gu': {
    id: 'seoul-guro-gu',
    name: '구로구',
    type: 'GU',
    parentGu: '구로구',
    units: 4307,
    households: 126443,
    validDates: 4276,
    aptCount: 769,
    rowCount: 278,
    multiCount: 3229,
    aptShare: '17.9%',
    rowShare: '6.5%',
    multiShare: '75.0%',
    villaShare: '81.4%',
    over20Count: 2873,
    over20Share: '67.2%',
    relatedRecoveryRegionIds: ['seoul-yangcheon-gu', 'seoul-guro-신도림동', 'seoul-guro-구로동'],
  },
  'seoul-guro-신도림동': {
    id: 'seoul-guro-신도림동',
    name: '신도림동',
    type: 'DONG',
    parentGu: '구로구',
    units: 55,
    households: 11052,
    validDates: 54,
    aptCount: 28,
    rowCount: 10,
    multiCount: 16,
    aptShare: '50.9%',
    rowShare: '18.2%',
    multiShare: '29.1%',
    villaShare: '47.3%',
    over20Count: 36,
    over20Share: '66.7%',
    relatedRecoveryRegionIds: ['seoul-guro-gu', 'seoul-guro-구로동', 'seoul-yangcheon-목동'],
  },
  'seoul-guro-구로동': {
    id: 'seoul-guro-구로동',
    name: '구로동',
    type: 'DONG',
    parentGu: '구로구',
    units: 1454,
    households: 34268,
    validDates: 1449,
    aptCount: 539,
    rowCount: 38,
    multiCount: 872,
    aptShare: '37.1%',
    rowShare: '2.6%',
    multiShare: '60.0%',
    villaShare: '62.6%',
    over20Count: 1187,
    over20Share: '81.9%',
    relatedRecoveryRegionIds: ['seoul-guro-gu', 'seoul-guro-신도림동', 'seoul-guro-고척동'],
  },
  'seoul-guro-고척동': {
    id: 'seoul-guro-고척동',
    name: '고척동',
    type: 'DONG',
    parentGu: '구로구',
    units: 375,
    households: 15646,
    validDates: 373,
    aptCount: 42,
    rowCount: 31,
    multiCount: 300,
    aptShare: '11.2%',
    rowShare: '8.3%',
    multiShare: '80.0%',
    villaShare: '88.3%',
    over20Count: 235,
    over20Share: '63.0%',
    relatedRecoveryRegionIds: ['seoul-guro-gu', 'seoul-guro-개봉동', 'seoul-yangcheon-신월동'],
  },
  'seoul-guro-개봉동': {
    id: 'seoul-guro-개봉동',
    name: '개봉동',
    type: 'DONG',
    parentGu: '구로구',
    units: 1290,
    households: 28636,
    validDates: 1279,
    aptCount: 51,
    rowCount: 36,
    multiCount: 1192,
    aptShare: '4.0%',
    rowShare: '2.8%',
    multiShare: '92.4%',
    villaShare: '95.2%',
    over20Count: 718,
    over20Share: '56.1%',
    relatedRecoveryRegionIds: ['seoul-guro-gu', 'seoul-guro-고척동', 'seoul-guro-오류동'],
  },
  'seoul-guro-오류동': {
    id: 'seoul-guro-오류동',
    name: '오류동',
    type: 'DONG',
    parentGu: '구로구',
    units: 447,
    households: 13813,
    validDates: 440,
    aptCount: 50,
    rowCount: 47,
    multiCount: 343,
    aptShare: '11.2%',
    rowShare: '10.5%',
    multiShare: '76.7%',
    villaShare: '87.2%',
    over20Count: 270,
    over20Share: '61.4%',
    relatedRecoveryRegionIds: ['seoul-guro-gu', 'seoul-guro-천왕동', 'seoul-guro-개봉동'],
  },
  'seoul-guro-천왕동': {
    id: 'seoul-guro-천왕동',
    name: '천왕동',
    type: 'DONG',
    parentGu: '구로구',
    units: 16,
    households: 6332,
    validDates: 16,
    aptCount: 13,
    rowCount: 0,
    multiCount: 3,
    aptShare: '81.3%',
    rowShare: '0.0%',
    multiShare: '18.8%',
    villaShare: '18.8%',
    over20Count: 0,
    over20Share: '0.0%',
    relatedRecoveryRegionIds: ['seoul-guro-gu', 'seoul-guro-오류동', 'seoul-guro-항동'],
  },
  'seoul-guro-항동': {
    id: 'seoul-guro-항동',
    name: '항동',
    type: 'DONG',
    parentGu: '구로구',
    units: 42,
    households: 6142,
    validDates: 42,
    aptCount: 16,
    rowCount: 9,
    multiCount: 17,
    aptShare: '38.1%',
    rowShare: '21.4%',
    multiShare: '40.5%',
    villaShare: '61.9%',
    over20Count: 20,
    over20Share: '47.6%',
    relatedRecoveryRegionIds: ['seoul-guro-gu', 'seoul-guro-천왕동', 'seoul-guro-오류동'],
  },
  'seoul-yeongdeungpo-gu': {
    id: 'seoul-yeongdeungpo-gu',
    name: '영등포구',
    type: 'GU',
    parentGu: '영등포구',
    units: 2068,
    households: 98150,
    validDates: 2053,
    aptCount: 289,
    rowCount: 72,
    multiCount: 1692,
    aptShare: '14.0%',
    rowShare: '3.5%',
    multiShare: '81.8%',
    villaShare: '85.3%',
    over20Count: 1062,
    over20Share: '51.7%',
    relatedRecoveryRegionIds: ['seoul-guro-gu', 'seoul-yangcheon-gu', 'seoul-yeongdeungpo-당산동'],
  },
  'seoul-yeongdeungpo-영등포동': {
    id: 'seoul-yeongdeungpo-영등포동',
    name: '영등포동',
    type: 'DONG',
    parentGu: '영등포구',
    units: 247,
    households: 11655,
    validDates: 246,
    aptCount: 39,
    rowCount: 7,
    multiCount: 200,
    aptShare: '15.8%',
    rowShare: '2.8%',
    multiShare: '81.0%',
    villaShare: '83.8%',
    over20Count: 80,
    over20Share: '32.5%',
    relatedRecoveryRegionIds: ['seoul-yeongdeungpo-gu', 'seoul-yeongdeungpo-당산동', 'seoul-yeongdeungpo-문래동'],
  },
  'seoul-yeongdeungpo-당산동': {
    id: 'seoul-yeongdeungpo-당산동',
    name: '당산동',
    type: 'DONG',
    parentGu: '영등포구',
    units: 243,
    households: 16660,
    validDates: 243,
    aptCount: 58,
    rowCount: 6,
    multiCount: 179,
    aptShare: '23.9%',
    rowShare: '2.5%',
    multiShare: '73.7%',
    villaShare: '76.1%',
    over20Count: 79,
    over20Share: '32.5%',
    relatedRecoveryRegionIds: ['seoul-yeongdeungpo-gu', 'seoul-yeongdeungpo-양평동', 'seoul-yeongdeungpo-문래동'],
  },
  'seoul-yeongdeungpo-문래동': {
    id: 'seoul-yeongdeungpo-문래동',
    name: '문래동',
    type: 'DONG',
    parentGu: '영등포구',
    units: 38,
    households: 8468,
    validDates: 38,
    aptCount: 31,
    rowCount: 2,
    multiCount: 5,
    aptShare: '81.6%',
    rowShare: '5.3%',
    multiShare: '13.2%',
    villaShare: '18.4%',
    over20Count: 26,
    over20Share: '68.4%',
    relatedRecoveryRegionIds: ['seoul-yeongdeungpo-gu', 'seoul-yeongdeungpo-당산동', 'seoul-guro-신도림동'],
  },
  'seoul-yeongdeungpo-신길동': {
    id: 'seoul-yeongdeungpo-신길동',
    name: '신길동',
    type: 'DONG',
    parentGu: '영등포구',
    units: 643,
    households: 24988,
    validDates: 642,
    aptCount: 56,
    rowCount: 15,
    multiCount: 571,
    aptShare: '8.7%',
    rowShare: '2.3%',
    multiShare: '88.8%',
    villaShare: '91.1%',
    over20Count: 401,
    over20Share: '62.5%',
    relatedRecoveryRegionIds: ['seoul-yeongdeungpo-gu', 'seoul-yeongdeungpo-대림동', 'seoul-yeongdeungpo-도림동'],
  },
  'seoul-yeongdeungpo-대림동': {
    id: 'seoul-yeongdeungpo-대림동',
    name: '대림동',
    type: 'DONG',
    parentGu: '영등포구',
    units: 494,
    households: 12504,
    validDates: 490,
    aptCount: 34,
    rowCount: 27,
    multiCount: 429,
    aptShare: '6.9%',
    rowShare: '5.5%',
    multiShare: '86.8%',
    villaShare: '92.3%',
    over20Count: 293,
    over20Share: '59.8%',
    relatedRecoveryRegionIds: ['seoul-yeongdeungpo-gu', 'seoul-yeongdeungpo-신길동', 'seoul-guro-구로동'],
  },
  'seoul-yeongdeungpo-양평동': {
    id: 'seoul-yeongdeungpo-양평동',
    name: '양평동',
    type: 'DONG',
    parentGu: '영등포구',
    units: 227,
    households: 10542,
    validDates: 221,
    aptCount: 38,
    rowCount: 5,
    multiCount: 178,
    aptShare: '16.7%',
    rowShare: '2.2%',
    multiShare: '78.4%',
    villaShare: '80.6%',
    over20Count: 77,
    over20Share: '34.8%',
    relatedRecoveryRegionIds: ['seoul-yeongdeungpo-gu', 'seoul-yeongdeungpo-당산동', 'seoul-yeongdeungpo-문래동'],
  },
  'seoul-yeongdeungpo-여의동': {
    id: 'seoul-yeongdeungpo-여의동',
    name: '여의도동',
    type: 'DONG',
    parentGu: '영등포구',
    units: 26,
    households: 10409,
    validDates: 25,
    aptCount: 25,
    rowCount: 0,
    multiCount: 0,
    aptShare: '96.2%',
    rowShare: '0.0%',
    multiShare: '0.0%',
    villaShare: '0.0%',
    over20Count: 23,
    over20Share: '92.0%',
    relatedRecoveryRegionIds: ['seoul-yeongdeungpo-gu', 'seoul-yeongdeungpo-영등포동', 'seoul-yeongdeungpo-신길동'],
  },
  'seoul-yeongdeungpo-도림동': {
    id: 'seoul-yeongdeungpo-도림동',
    name: '도림동',
    type: 'DONG',
    parentGu: '영등포구',
    units: 150,
    households: 2924,
    validDates: 148,
    aptCount: 8,
    rowCount: 10,
    multiCount: 130,
    aptShare: '5.3%',
    rowShare: '6.7%',
    multiShare: '86.7%',
    villaShare: '93.3%',
    over20Count: 83,
    over20Share: '56.1%',
    relatedRecoveryRegionIds: ['seoul-yeongdeungpo-gu', 'seoul-yeongdeungpo-문래동', 'seoul-guro-신도림동'],
  },
  'seoul-dongjak-gu': {
    id: 'seoul-dongjak-gu',
    name: '동작구',
    type: 'GU',
    parentGu: '동작구',
    units: 4301,
    households: 100564,
    validDates: 4285,
    aptCount: 254,
    rowCount: 329,
    multiCount: 3702,
    aptShare: '5.9%',
    rowShare: '7.6%',
    multiShare: '86.1%',
    villaShare: '93.7%',
    over20Count: 2541,
    over20Share: '59.3%',
    relatedRecoveryRegionIds: ['seoul-yeongdeungpo-gu', 'seoul-seocho-gu', 'seoul-dongjak-상도동'],
  },
  'seoul-dongjak-노량진동': {
    id: 'seoul-dongjak-노량진동',
    name: '노량진동',
    type: 'DONG',
    parentGu: '동작구',
    units: 165,
    households: 6427,
    validDates: 163,
    aptCount: 12,
    rowCount: 23,
    multiCount: 128,
    aptShare: '7.3%',
    rowShare: '13.9%',
    multiShare: '77.6%',
    villaShare: '91.5%',
    over20Count: 129,
    over20Share: '79.1%',
    relatedRecoveryRegionIds: ['seoul-dongjak-gu', 'seoul-dongjak-상도동', 'seoul-dongjak-본동'],
  },
  'seoul-dongjak-상도동': {
    id: 'seoul-dongjak-상도동',
    name: '상도동',
    type: 'DONG',
    parentGu: '동작구',
    units: 1938,
    households: 36234,
    validDates: 1932,
    aptCount: 88,
    rowCount: 178,
    multiCount: 1666,
    aptShare: '4.5%',
    rowShare: '9.2%',
    multiShare: '86.0%',
    villaShare: '95.1%',
    over20Count: 1099,
    over20Share: '56.9%',
    relatedRecoveryRegionIds: ['seoul-dongjak-gu', 'seoul-dongjak-노량진동', 'seoul-dongjak-사당동'],
  },
  'seoul-dongjak-흑석동': {
    id: 'seoul-dongjak-흑석동',
    name: '흑석동',
    type: 'DONG',
    parentGu: '동작구',
    units: 83,
    households: 9414,
    validDates: 83,
    aptCount: 15,
    rowCount: 14,
    multiCount: 54,
    aptShare: '18.1%',
    rowShare: '16.9%',
    multiShare: '65.1%',
    villaShare: '81.9%',
    over20Count: 47,
    over20Share: '56.6%',
    relatedRecoveryRegionIds: ['seoul-dongjak-gu', 'seoul-dongjak-상도동', 'seoul-dongjak-동작동'],
  },
  'seoul-dongjak-사당동': {
    id: 'seoul-dongjak-사당동',
    name: '사당동',
    type: 'DONG',
    parentGu: '동작구',
    units: 1322,
    households: 21553,
    validDates: 1316,
    aptCount: 61,
    rowCount: 58,
    multiCount: 1197,
    aptShare: '4.6%',
    rowShare: '4.4%',
    multiShare: '90.5%',
    villaShare: '94.9%',
    over20Count: 783,
    over20Share: '59.5%',
    relatedRecoveryRegionIds: ['seoul-dongjak-gu', 'seoul-dongjak-상도동', 'seoul-dongjak-대방동'],
  },
  'seoul-dongjak-대방동': {
    id: 'seoul-dongjak-대방동',
    name: '대방동',
    type: 'DONG',
    parentGu: '동작구',
    units: 388,
    households: 10693,
    validDates: 387,
    aptCount: 36,
    rowCount: 21,
    multiCount: 330,
    aptShare: '9.3%',
    rowShare: '5.4%',
    multiShare: '85.1%',
    villaShare: '90.5%',
    over20Count: 233,
    over20Share: '60.2%',
    relatedRecoveryRegionIds: ['seoul-dongjak-gu', 'seoul-dongjak-신대방동', 'seoul-yeongdeungpo-신길동'],
  },
  'seoul-dongjak-신대방동': {
    id: 'seoul-dongjak-신대방동',
    name: '신대방동',
    type: 'DONG',
    parentGu: '동작구',
    units: 320,
    households: 11577,
    validDates: 319,
    aptCount: 30,
    rowCount: 20,
    multiCount: 269,
    aptShare: '9.4%',
    rowShare: '6.3%',
    multiShare: '84.1%',
    villaShare: '90.3%',
    over20Count: 193,
    over20Share: '60.5%',
    relatedRecoveryRegionIds: ['seoul-dongjak-gu', 'seoul-dongjak-대방동', 'seoul-guro-구로동'],
  },
  'seoul-dongjak-본동': {
    id: 'seoul-dongjak-본동',
    name: '본동',
    type: 'DONG',
    parentGu: '동작구',
    units: 40,
    households: 3141,
    validDates: 40,
    aptCount: 8,
    rowCount: 1,
    multiCount: 31,
    aptShare: '20.0%',
    rowShare: '2.5%',
    multiShare: '77.5%',
    villaShare: '80.0%',
    over20Count: 22,
    over20Share: '55.0%',
    relatedRecoveryRegionIds: ['seoul-dongjak-gu', 'seoul-dongjak-노량진동', 'seoul-dongjak-흑석동'],
  },
  'seoul-dongjak-동작동': {
    id: 'seoul-dongjak-동작동',
    name: '동작동',
    type: 'DONG',
    parentGu: '동작구',
    units: 45,
    households: 1525,
    validDates: 45,
    aptCount: 4,
    rowCount: 14,
    multiCount: 27,
    aptShare: '8.9%',
    rowShare: '31.1%',
    multiShare: '60.0%',
    villaShare: '91.1%',
    over20Count: 35,
    over20Share: '77.8%',
    relatedRecoveryRegionIds: ['seoul-dongjak-gu', 'seoul-dongjak-사당동', 'seoul-dongjak-흑석동'],
  },
  'seoul-geumcheon-gu': {
    id: 'seoul-geumcheon-gu',
    name: '금천구',
    type: 'GU',
    parentGu: '금천구',
    units: 2781,
    households: 61825,
    validDates: 2769,
    aptCount: 192,
    rowCount: 174,
    multiCount: 2403,
    aptShare: '6.9%',
    rowShare: '6.3%',
    multiShare: '86.4%',
    villaShare: '92.7%',
    over20Count: 1312,
    over20Share: '47.4%',
    relatedRecoveryRegionIds: ['seoul-guro-gu', 'seoul-geumcheon-독산동', 'seoul-geumcheon-가산동'],
  },
  'seoul-geumcheon-가산동': {
    id: 'seoul-geumcheon-가산동',
    name: '가산동',
    type: 'DONG',
    parentGu: '금천구',
    units: 187,
    households: 6033,
    validDates: 186,
    aptCount: 24,
    rowCount: 7,
    multiCount: 155,
    aptShare: '12.8%',
    rowShare: '3.7%',
    multiShare: '82.9%',
    villaShare: '86.6%',
    over20Count: 73,
    over20Share: '39.2%',
    relatedRecoveryRegionIds: ['seoul-geumcheon-gu', 'seoul-geumcheon-독산동', 'seoul-guro-구로동'],
  },
  'seoul-geumcheon-독산동': {
    id: 'seoul-geumcheon-독산동',
    name: '독산동',
    type: 'DONG',
    parentGu: '금천구',
    units: 1281,
    households: 26484,
    validDates: 1274,
    aptCount: 92,
    rowCount: 49,
    multiCount: 1133,
    aptShare: '7.2%',
    rowShare: '3.8%',
    multiShare: '88.4%',
    villaShare: '92.3%',
    over20Count: 570,
    over20Share: '44.7%',
    relatedRecoveryRegionIds: ['seoul-geumcheon-gu', 'seoul-geumcheon-가산동', 'seoul-geumcheon-시흥동'],
  },
  'seoul-geumcheon-시흥동': {
    id: 'seoul-geumcheon-시흥동',
    name: '시흥동',
    type: 'DONG',
    parentGu: '금천구',
    units: 1313,
    households: 29308,
    validDates: 1309,
    aptCount: 76,
    rowCount: 118,
    multiCount: 1115,
    aptShare: '5.8%',
    rowShare: '9.0%',
    multiShare: '84.9%',
    villaShare: '93.9%',
    over20Count: 669,
    over20Share: '51.1%',
    relatedRecoveryRegionIds: ['seoul-geumcheon-gu', 'seoul-geumcheon-독산동', 'seoul-guro-항동'],
  },
  // Phase 6-Q1B: Gangseo New DONGs
  'seoul-gangseo-화곡동': {
    id: 'seoul-gangseo-화곡동',
    name: '화곡동',
    type: 'DONG',
    parentGu: '강서구',
    units: 4982,
    households: 98624,
    validDates: 4953,
    aptCount: 329,
    rowCount: 108,
    multiCount: 4527,
    aptShare: '6.6%',
    rowShare: '2.2%',
    multiShare: '90.9%',
    villaShare: '93.3%',
    over20Count: 3012,
    over20Share: '60.8%',
    relatedRecoveryRegionIds: ['seoul-gangseo-gu', 'seoul-gangseo-등촌동', 'seoul-gangseo-염창동'],
  },
  'seoul-gangseo-등촌동': {
    id: 'seoul-gangseo-등촌동',
    name: '등촌동',
    type: 'DONG',
    parentGu: '강서구',
    units: 601,
    households: 23985,
    validDates: 597,
    aptCount: 93,
    rowCount: 21,
    multiCount: 484,
    aptShare: '15.5%',
    rowShare: '3.5%',
    multiShare: '80.5%',
    villaShare: '84.2%',
    over20Count: 368,
    over20Share: '61.6%',
    relatedRecoveryRegionIds: ['seoul-gangseo-gu', 'seoul-gangseo-화곡동', 'seoul-gangseo-염창동'],
  },
  'seoul-gangseo-염창동': {
    id: 'seoul-gangseo-염창동',
    name: '염창동',
    type: 'DONG',
    parentGu: '강서구',
    units: 543,
    households: 19296,
    validDates: 540,
    aptCount: 59,
    rowCount: 20,
    multiCount: 462,
    aptShare: '10.9%',
    rowShare: '3.7%',
    multiShare: '85.1%',
    villaShare: '88.8%',
    over20Count: 323,
    over20Share: '59.9%',
    relatedRecoveryRegionIds: ['seoul-gangseo-gu', 'seoul-gangseo-등촌동', 'seoul-gangseo-화곡동'],
  },
  'seoul-gangseo-발산동': {
    id: 'seoul-gangseo-발산동',
    name: '발산동',
    type: 'DONG',
    parentGu: '강서구',
    units: 447,
    households: 12683,
    validDates: 445,
    aptCount: 61,
    rowCount: 18,
    multiCount: 365,
    aptShare: '13.6%',
    rowShare: '4.0%',
    multiShare: '81.7%',
    villaShare: '85.7%',
    over20Count: 231,
    over20Share: '52.0%',
    relatedRecoveryRegionIds: ['seoul-gangseo-gu', 'seoul-gangseo-등촌동', 'seoul-gangseo-마곡동'],
  },
  // Phase 6-Q1B: Gwanak Cohort
  'seoul-gwanak-gu': {
    id: 'seoul-gwanak-gu',
    name: '관악구',
    type: 'GU',
    parentGu: '관악구',
    units: 6673,
    households: 147089,
    validDates: 6630,
    aptCount: 333,
    rowCount: 318,
    multiCount: 5996,
    aptShare: '5.0%',
    rowShare: '4.8%',
    multiShare: '89.9%',
    villaShare: '94.7%',
    over20Count: 4107,
    over20Share: '62.0%',
    relatedRecoveryRegionIds: ['seoul-gwanak-봉천동', 'seoul-gwanak-신림동', 'seoul-dongjak-gu'],
  },
  'seoul-gwanak-봉천동': {
    id: 'seoul-gwanak-봉천동',
    name: '봉천동',
    type: 'DONG',
    parentGu: '관악구',
    units: 2697,
    households: 56432,
    validDates: 2677,
    aptCount: 107,
    rowCount: 104,
    multiCount: 2479,
    aptShare: '4.0%',
    rowShare: '3.9%',
    multiShare: '91.9%',
    villaShare: '95.8%',
    over20Count: 1679,
    over20Share: '62.7%',
    relatedRecoveryRegionIds: ['seoul-gwanak-gu', 'seoul-gwanak-신림동', 'seoul-gwanak-남현동'],
  },
  'seoul-gwanak-신림동': {
    id: 'seoul-gwanak-신림동',
    name: '신림동',
    type: 'DONG',
    parentGu: '관악구',
    units: 3247,
    households: 72511,
    validDates: 3224,
    aptCount: 193,
    rowCount: 166,
    multiCount: 2877,
    aptShare: '5.9%',
    rowShare: '5.1%',
    multiShare: '88.6%',
    villaShare: '93.8%',
    over20Count: 2103,
    over20Share: '65.2%',
    relatedRecoveryRegionIds: ['seoul-gwanak-gu', 'seoul-gwanak-봉천동', 'seoul-dongjak-사당동'],
  },
  'seoul-gwanak-남현동': {
    id: 'seoul-gwanak-남현동',
    name: '남현동',
    type: 'DONG',
    parentGu: '관악구',
    units: 729,
    households: 18146,
    validDates: 729,
    aptCount: 33,
    rowCount: 48,
    multiCount: 640,
    aptShare: '4.5%',
    rowShare: '6.6%',
    multiShare: '87.8%',
    villaShare: '94.5%',
    over20Count: 325,
    over20Share: '44.6%',
    relatedRecoveryRegionIds: ['seoul-gwanak-gu', 'seoul-gwanak-봉천동', 'seoul-seocho-gu'],
  },
  // Phase 6-Q1B: Seocho New DONGs
  'seoul-seocho-서초동': {
    id: 'seoul-seocho-서초동',
    name: '서초동',
    type: 'DONG',
    parentGu: '서초구',
    units: 596,
    households: 28019,
    validDates: 594,
    aptCount: 168,
    rowCount: 69,
    multiCount: 358,
    aptShare: '28.2%',
    rowShare: '11.6%',
    multiShare: '60.1%',
    villaShare: '71.6%',
    over20Count: 338,
    over20Share: '57.0%',
    relatedRecoveryRegionIds: ['seoul-seocho-gu', 'seoul-seocho-반포동', 'seoul-seocho-방배동'],
  },
  'seoul-seocho-반포동': {
    id: 'seoul-seocho-반포동',
    name: '반포동',
    type: 'DONG',
    parentGu: '서초구',
    units: 437,
    households: 27617,
    validDates: 435,
    aptCount: 157,
    rowCount: 45,
    multiCount: 233,
    aptShare: '35.9%',
    rowShare: '10.3%',
    multiShare: '53.3%',
    villaShare: '63.8%',
    over20Count: 348,
    over20Share: '80.0%',
    relatedRecoveryRegionIds: ['seoul-seocho-gu', 'seoul-seocho-서초동', 'seoul-gangnam-gu'],
  },
  'seoul-seocho-방배동': {
    id: 'seoul-seocho-방배동',
    name: '방배동',
    type: 'DONG',
    parentGu: '서초구',
    units: 2082,
    households: 44694,
    validDates: 2076,
    aptCount: 302,
    rowCount: 236,
    multiCount: 1539,
    aptShare: '14.5%',
    rowShare: '11.3%',
    multiShare: '74.0%',
    villaShare: '85.4%',
    over20Count: 1493,
    over20Share: '71.9%',
    relatedRecoveryRegionIds: ['seoul-seocho-gu', 'seoul-seocho-서초동', 'seoul-dongjak-사당동'],
  },
  'seoul-seocho-양재동': {
    id: 'seoul-seocho-양재동',
    name: '양재동',
    type: 'DONG',
    parentGu: '서초구',
    units: 1141,
    households: 26561,
    validDates: 1141,
    aptCount: 156,
    rowCount: 100,
    multiCount: 883,
    aptShare: '13.7%',
    rowShare: '8.8%',
    multiShare: '77.4%',
    villaShare: '86.1%',
    over20Count: 390,
    over20Share: '34.2%',
    relatedRecoveryRegionIds: ['seoul-seocho-gu', 'seoul-seocho-방배동', 'seoul-gangnam-gu'],
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

/**
 * Phase 6-K1A Centralized Publication Gate SSOT
 * Evaluates whether a given region + search intent qualifies for INDEXABLE status.
 *
 * Rules:
 * 1. Base Recovery Portfolio: Exactly 15 original regions x '탄성코트' only.
 * 2. Yangcheon South Cohort: Exactly 4 Yangcheon regions x ['탄성코트', '베란다탄성코트'].
 * 3. Guro P1 South Cohort: Exactly 8 Guro P1 regions x ['탄성코트', '베란다탄성코트'].
 * 4. All other region/intent combinations return strictly false (NOINDEX).
 */
export function isIndexableDynamicPage(regionId: string, serviceKeyword: string): boolean {
  if (!RECOVERY_ENABLED) return false;

  // 7. Gangseo P1 South Cohort (7 regions x 2 intents = 14 URLs)
  // Checked BEFORE Base rule to supersede Base's 탄성코트-only restriction
  // for the 3 overlapping regions (강서구, 마곡동, 가양동).
  if (GANGSEO_COHORT_REGION_IDS.includes(regionId as GangseoCohortRegionId)) {
    return GANGSEO_COHORT_INTENTS.includes(serviceKeyword as typeof GANGSEO_COHORT_INTENTS[number]);
  }

  // 8. Seocho P1 South Cohort (5 regions x 2 intents = 10 URLs)
  // Checked BEFORE Base rule to supersede Base's 탄성코트-only restriction
  // for the overlapping region (서초구).
  if (SEOCHO_COHORT_REGION_IDS.includes(regionId as SeochoCohortRegionId)) {
    return SEOCHO_COHORT_INTENTS.includes(serviceKeyword as typeof SEOCHO_COHORT_INTENTS[number]);
  }

  // 1. Base Recovery Portfolio (15 regions x '탄성코트' = 15 URLs)
  // Note: 강서구/마곡동/가양동/서초구 are handled by their cohort rules above.
  if (
    BASE_RECOVERY_REGION_IDS.includes(regionId as BaseRecoveryRegionId) &&
    serviceKeyword === BASE_RECOVERY_INTENT
  ) {
    return true;
  }

  // 2. Yangcheon South Cohort (4 regions x 2 intents = 8 URLs; 목동-탄성코트 is in both sets)
  if (YANGCHEON_COHORT_REGION_IDS.includes(regionId as YangcheonCohortRegionId)) {
    return YANGCHEON_COHORT_INTENTS.includes(serviceKeyword as typeof YANGCHEON_COHORT_INTENTS[number]);
  }

  // 3. Guro P1 South Cohort (8 regions x 2 intents = 16 URLs)
  if (GURO_COHORT_REGION_IDS.includes(regionId as GuroCohortRegionId)) {
    return GURO_COHORT_INTENTS.includes(serviceKeyword as typeof GURO_COHORT_INTENTS[number]);
  }

  // 4. Yeongdeungpo P1 South Cohort (9 regions x 2 intents = 18 URLs)
  if (YEONGDEUNGPO_COHORT_REGION_IDS.includes(regionId as YeongdeungpoCohortRegionId)) {
    return YEONGDEUNGPO_COHORT_INTENTS.includes(serviceKeyword as typeof YEONGDEUNGPO_COHORT_INTENTS[number]);
  }

  // 5. Dongjak South Cohort (9 regions x 2 intents = 18 URLs)
  if (DONGJAK_COHORT_REGION_IDS.includes(regionId as DongjakCohortRegionId)) {
    return DONGJAK_COHORT_INTENTS.includes(serviceKeyword as typeof DONGJAK_COHORT_INTENTS[number]);
  }

  // 6. Geumcheon South Cohort (4 regions x 2 intents = 8 URLs)
  if (GEUMCHEON_COHORT_REGION_IDS.includes(regionId as GeumcheonCohortRegionId)) {
    return GEUMCHEON_COHORT_INTENTS.includes(serviceKeyword as typeof GEUMCHEON_COHORT_INTENTS[number]);
  }

  // 9. Gwanak P1 South Cohort (4 regions x 2 intents = 8 URLs)
  if (GWANAK_COHORT_REGION_IDS.includes(regionId as GwanakCohortRegionId)) {
    return GWANAK_COHORT_INTENTS.includes(serviceKeyword as typeof GWANAK_COHORT_INTENTS[number]);
  }

  return false;
}

/** Legacy alias for backwards compatibility */
export function isRecoveryDynamicPage(regionId: string, serviceKeyword: string): boolean {
  return isIndexableDynamicPage(regionId, serviceKeyword);
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
