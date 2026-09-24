/**
 * Central Image Registry (PHASE 3-B2 COMPRESSED ASSET PLAN)
 *
 * NON-NEGOTIABLE ASSET POLICY:
 * - All production photos must be supplied directly by the user.
 * - AI generation, external stock, and web scraping are strictly prohibited.
 * - Hero Image and SERP Candidate Image are maintained independently.
 * - If a REQUIRED asset is in 'WAITING_FOR_USER_ASSET', production readiness FAILS.
 */

import { ImageAssetSlot } from '../types/images';

/**
 * Initial Central Image Registry Slots (Compressed Visual Narrative Structure)
 * Total: 11 Slots (7 REQUIRED, 4 OPTIONAL)
 * All slots default to 'WAITING_FOR_USER_ASSET' until the user supplies real assets.
 */
export const HERO_SLIDES = [
  {
    id: 'hero-slide-1',
    src: '/images/allcare/hero/hero-01.png',
    altText: '탄성코트 시공이 완료된 주거 공간 벽면',
    width: 1086,
    height: 1448,
  },
  {
    id: 'hero-slide-2',
    src: '/images/allcare/hero/hero-02.png',
    altText: '탄성코트 시공이 완료된 주거 공간 벽면 (세탁실/베란다)',
    width: 1086,
    height: 1448,
  },
  {
    id: 'hero-slide-3',
    src: '/images/allcare/hero/hero-03.png',
    altText: '탄성코트 시공이 완료된 주거 공간 벽면 (코너 마감)',
    width: 1086,
    height: 1448,
  },
] as const;

/**
 * Initial Central Image Registry Slots (Compressed Visual Narrative Structure)
 * Total: 11 Slots (7 REQUIRED, 4 OPTIONAL)
 * Phase 3-C: 10 Main Visual Assets READY with actual user-provided files.
 * SERP_CANDIDATE intentionally kept WAITING_FOR_USER_ASSET per policy.
 */
export const INITIAL_IMAGE_REGISTRY: readonly ImageAssetSlot[] = [
  // 1. HERO_MAIN (REQUIRED) - READY
  {
    id: 'HERO_MAIN',
    category: 'HERO',
    requirement: 'REQUIRED',
    status: 'READY',
    src: '/images/allcare/hero/hero-01.png',
    altText: '탄성코트 시공이 완료된 주거 공간 벽면',
    recommendedDimensions: { width: 1086, height: 1448 },
    note: '메인 상단 단일 고해상도 비주얼 (사용자 제공 필수 실사, PC/MO 반응형 맞춤)',
  },
  // 2. WALL_CHECK_BACKGROUND (REQUIRED) - READY
  {
    id: 'WALL_CHECK_BACKGROUND',
    category: 'PROBLEM',
    requirement: 'REQUIRED',
    status: 'READY',
    src: '/images/allcare/sections/wall-check-bg.jpg',
    altText: '베란다 벽면 노후 도막 및 상태 확인 배경',
    recommendedDimensions: { width: 4032, height: 3024 },
    note: '벽면 상태 확인 섹션 대형 배경 비주얼 (사용자 제공 필수 실사)',
  },
  // 3. BEFORE_AFTER_01_BEFORE (REQUIRED) - READY
  {
    id: 'BEFORE_AFTER_01_BEFORE',
    category: 'BEFORE',
    requirement: 'REQUIRED',
    status: 'READY',
    src: '/images/allcare/before-after/ba-01-before.jpg',
    altText: '탄성코트 시공 전 베란다 벽면 상태',
    recommendedDimensions: { width: 4032, height: 3024 },
    note: '대표 Case 01 Before 실사 (1-B.JPG)',
  },
  // 4. BEFORE_AFTER_01_AFTER (REQUIRED) - READY
  {
    id: 'BEFORE_AFTER_01_AFTER',
    category: 'AFTER',
    requirement: 'REQUIRED',
    status: 'READY',
    src: '/images/allcare/before-after/ba-01-after.png',
    altText: '탄성코트 시공 후 정돈된 베란다 벽면',
    recommendedDimensions: { width: 1448, height: 1086 },
    note: '대표 Case 01 After 실사 (1-A.png)',
  },
  // 5. BEFORE_AFTER_02_BEFORE (OPTIONAL) - READY
  {
    id: 'BEFORE_AFTER_02_BEFORE',
    category: 'BEFORE',
    requirement: 'OPTIONAL',
    status: 'READY',
    src: '/images/allcare/before-after/ba-02-before.jpg',
    altText: '탄성코트 시공 전 세탁실 벽면 상태',
    recommendedDimensions: { width: 4032, height: 3024 },
    note: '선택 Case 02 Before 실사 (2-B.JPG)',
  },
  // 6. BEFORE_AFTER_02_AFTER (OPTIONAL) - READY
  {
    id: 'BEFORE_AFTER_02_AFTER',
    category: 'AFTER',
    requirement: 'OPTIONAL',
    status: 'READY',
    src: '/images/allcare/before-after/ba-02-after.png',
    altText: '탄성코트 시공 후 정돈된 세탁실 벽면',
    recommendedDimensions: { width: 1448, height: 1086 },
    note: '선택 Case 02 After 실사 (2-A.png)',
  },
  // 7. BEFORE_AFTER_03_BEFORE (OPTIONAL) - READY
  {
    id: 'BEFORE_AFTER_03_BEFORE',
    category: 'BEFORE',
    requirement: 'OPTIONAL',
    status: 'READY',
    src: '/images/allcare/before-after/ba-03-before.jpg',
    altText: '탄성코트 시공 전 다용도 공간 벽면 상태',
    recommendedDimensions: { width: 4032, height: 3024 },
    note: '선택 Case 03 Before 실사 (3-B.JPG, 벽면 중심 포커스)',
  },
  // 8. BEFORE_AFTER_03_AFTER (OPTIONAL) - READY
  {
    id: 'BEFORE_AFTER_03_AFTER',
    category: 'AFTER',
    requirement: 'OPTIONAL',
    status: 'READY',
    src: '/images/allcare/before-after/ba-03-after.jpg',
    altText: '탄성코트 시공 후 정돈된 다용도 공간 벽면',
    recommendedDimensions: { width: 4032, height: 3024 },
    note: '선택 Case 03 After 실사 (3-A.JPG)',
  },
  // 9. SPACE_MAIN (REQUIRED) - READY
  {
    id: 'SPACE_MAIN',
    category: 'SPACE',
    requirement: 'REQUIRED',
    status: 'READY',
    src: '/images/allcare/sections/residential-spaces.jpg',
    altText: '올케어 주거 공간 대표 시공 벽면',
    recommendedDimensions: { width: 5712, height: 4284 },
    note: '주거 공간 섹션 대표 1종 실사 (RESIDENTIAL SPACES.JPG)',
  },
  // 10. FINAL_CTA_BACKGROUND (REQUIRED) - READY
  {
    id: 'FINAL_CTA_BACKGROUND',
    category: 'HERO',
    requirement: 'REQUIRED',
    status: 'READY',
    src: '/images/allcare/sections/final-cta-bg.jpg',
    altText: '올케어 상담 섹션 배경 주거 공간',
    recommendedDimensions: { width: 4032, height: 3024 },
    note: '하단 상담 섹션 대형 배경 비주얼 (Final CTA.JPG)',
  },
  // 11. SERP_CANDIDATE (REQUIRED) - READY (Phase 3-E1)
  {
    id: 'SERP_CANDIDATE',
    category: 'SERP_CANDIDATE',
    requirement: 'REQUIRED',
    status: 'READY',
    src: '/images/allcare/og-thumbnail.jpg',
    altText: '올케어 탄성코트 전문 시공 대표 썸네일',
    recommendedDimensions: { width: 1200, height: 630 },
    note: 'SERP / Social Preview Candidate Image (검색결과 노출 보장 아님, 1200x630 마스터 규격)',
  },
];

export interface ProductionReadinessResult {
  readonly isReady: boolean;
  readonly missingRequiredSlots: string[];
  readonly optionalWaitingSlots: string[];
}

/**
 * Checks whether all REQUIRED image assets are READY for production.
 * If any REQUIRED asset is WAITING_FOR_USER_ASSET or DISABLED, isReady = false.
 */
export function evaluateImageProductionReadiness(
  registry: readonly ImageAssetSlot[] = INITIAL_IMAGE_REGISTRY
): ProductionReadinessResult {
  const missingRequired: string[] = [];
  const optionalWaiting: string[] = [];

  for (const slot of registry) {
    if (slot.requirement === 'REQUIRED') {
      if (slot.status !== 'READY' || !slot.src) {
        missingRequired.push(slot.id);
      }
    } else {
      if (slot.status === 'WAITING_FOR_USER_ASSET') {
        optionalWaiting.push(slot.id);
      }
    }
  }

  return {
    isReady: missingRequired.length === 0,
    missingRequiredSlots: missingRequired,
    optionalWaitingSlots: optionalWaiting,
  };
}

/**
 * Evaluates whether all Main Page visual assets (Hero, Wall Check, B/A 01, Space, Final CTA) are READY.
 * Distinguishes Phase 3-C Main Visual readiness from full site production readiness (which includes SERP).
 */
export function evaluateMainVisualReadiness(
  registry: readonly ImageAssetSlot[] = INITIAL_IMAGE_REGISTRY
): { isReady: boolean; readySlots: string[]; waitingSlots: string[] } {
  const mainVisualSlotIds = [
    'HERO_MAIN',
    'WALL_CHECK_BACKGROUND',
    'BEFORE_AFTER_01_BEFORE',
    'BEFORE_AFTER_01_AFTER',
    'SPACE_MAIN',
    'FINAL_CTA_BACKGROUND',
  ];
  const waitingSlots: string[] = [];
  const readySlots: string[] = [];

  for (const id of mainVisualSlotIds) {
    const slot = registry.find((s) => s.id === id);
    if (!slot || slot.status !== 'READY' || !slot.src) {
      waitingSlots.push(id);
    } else {
      readySlots.push(id);
    }
  }

  return {
    isReady: waitingSlots.length === 0,
    readySlots,
    waitingSlots,
  };
}

export interface BeforeAfterCaseReadiness {
  readonly caseId: string;
  readonly beforeSlotId: string;
  readonly afterSlotId: string;
  readonly isBeforeReady: boolean;
  readonly isAfterReady: boolean;
  readonly isCaseActive: boolean; // Both before AND after must be READY in production
}

/**
 * Evaluates Before/After cases against production pair completeness rule.
 * Both Before and After must be READY for a case to be displayed in production.
 * In development, cases are always active with development placeholder slots.
 */
export function evaluateBeforeAfterCases(
  registry: readonly ImageAssetSlot[] = INITIAL_IMAGE_REGISTRY,
  isProduction: boolean = process.env.NODE_ENV === 'production'
): readonly BeforeAfterCaseReadiness[] {
  const cases = [
    { caseId: 'case-01', before: 'BEFORE_AFTER_01_BEFORE', after: 'BEFORE_AFTER_01_AFTER' },
    { caseId: 'case-02', before: 'BEFORE_AFTER_02_BEFORE', after: 'BEFORE_AFTER_02_AFTER' },
    { caseId: 'case-03', before: 'BEFORE_AFTER_03_BEFORE', after: 'BEFORE_AFTER_03_AFTER' },
  ];

  return cases.map((c) => {
    const bSlot = registry.find((s) => s.id === c.before);
    const aSlot = registry.find((s) => s.id === c.after);
    const isBeforeReady = Boolean(bSlot && bSlot.status === 'READY' && bSlot.src);
    const isAfterReady = Boolean(aSlot && aSlot.status === 'READY' && aSlot.src);

    const isCaseActive = isProduction ? (isBeforeReady && isAfterReady) : true;

    return {
      caseId: c.caseId,
      beforeSlotId: c.before,
      afterSlotId: c.after,
      isBeforeReady,
      isAfterReady,
      isCaseActive,
    };
  });
}

/**
 * Gets a specific slot by its ID.
 */
export function getImageSlotById(
  id: string,
  registry: readonly ImageAssetSlot[] = INITIAL_IMAGE_REGISTRY
): ImageAssetSlot | undefined {
  return registry.find((slot) => slot.id === id);
}
