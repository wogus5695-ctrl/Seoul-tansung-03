/**
 * Pilot Local Insights Single Source of Truth (Phase 6-H1A)
 *
 * Implements the verified, frozen Tier-C public housing data contracts for exactly 5 Pilot Regions.
 *
 * NON-NEGOTIABLE CONTRACTS:
 * - Exactly 5 Pilot Regions supported: 강남구, 불광동, 마곡동, 성수동, 창신동.
 * - Controls (서초구, 갈현동, 가양동, 자양동, 숭인동) and all other 307 regions return strictly null (Zero-DOM).
 * - Collision Hold regions return strictly null.
 * - Source: 한국부동산원 공동주택 단지 식별정보 공개자료 (2026.08.31 기준).
 * - Terminology: '공동주택 등록 단위' (단지 단독 표기 배제).
 * - Claim safety: Zero unsupported causal assertions or marketing labels.
 */

import { ServiceKeyword } from '../types/intents';

export interface LocalInsightData {
  readonly factText: string;
  readonly limitationText: string;
  readonly checkpointText: string;
  readonly sourceLabel: string;
}

export interface PilotLocalInsightProfile {
  readonly regionId: string;
  readonly regionName: string;
  readonly factText: string;
  readonly limitationText: string;
  readonly intentCheckpoints: Record<ServiceKeyword, string>;
  readonly sourceLabel: string;
}

const COMMON_LIMITATION_NOTE =
  '※ 공개 데이터의 건물 연식이나 주거 유형만으로 개별 세대의 탄성코트 시공 필요성을 판단할 수는 없습니다.';

const COMMON_SOURCE_LABEL =
  '출처: 한국부동산원 공동주택 식별정보 공개자료 · 2026.08 기준';

const COMMON_INTENT_CHECKPOINTS: Record<ServiceKeyword, string> = {
  '탄성코트':
    '실제 시공 전에는 기존 벽면 도막의 들뜸·박리 흔적과 미세 균열 등 바탕면 상태를 우선 점검하여 필요한 보수 범위를 판단하는 것이 중요합니다.',
  '탄성코트시공':
    '시공 전 낡은 도막 스크래핑, 균열 퍼티 메꿈 등 기초 밑작업 공정과 창틀·시설물 보양 범위가 견적에 충실히 포함되었는지 확인하세요.',
  '베란다탄성코트':
    '베란다 시공 시 외벽 접점 모서리의 습기 흔적, 창틀 실리콘 노후 상태 및 바탕면 건조 여부를 집중적으로 확인해야 합니다.',
  '세탁실탄성코트':
    '세탁실 점검 시 배관 주변의 고습 환경과 벽면 곰팡이 오염 상태를 확인하고, 원활한 뿜칠 작업을 위한 최소 작업 동선 확보 여부를 사전에 살펴야 합니다.',
  '아파트탄성코트':
    '아파트 단지 시공 시 신축 세대의 공실 예방 도막인지, 구축 세대의 노후 마감재 재정비인지에 맞춰 필요한 밑작업 공정과 일정을 조율해야 합니다.',
  '탄성코트업체':
    '전문 업체 비교 시 단순 단가 외에 들뜬 바탕면 정리와 퍼티 보수가 기본 공정에 포함되는지, 사후 A/S 보장 기준이 명시되는지 확인하세요.',
};

export const PILOT_LOCAL_INSIGHT_PROFILES: readonly PilotLocalInsightProfile[] = [
  // 1. 강남구
  {
    regionId: 'seoul-gangnam-gu',
    regionName: '강남구',
    factText:
      '한국부동산원 공동주택 식별정보 공개자료(2026.08 기준)에 따르면, 강남구 내 등록된 공동주택은 4,421개 단위(총 168,588세대)이며, 사용승인일이 확인된 단위 중 20년 이상 경과 비율은 69.3%입니다.',
    limitationText: COMMON_LIMITATION_NOTE,
    intentCheckpoints: COMMON_INTENT_CHECKPOINTS,
    sourceLabel: COMMON_SOURCE_LABEL,
  },
  // 2. 불광동
  {
    regionId: 'seoul-eunpyeong-bulgwang',
    regionName: '불광동',
    factText:
      '한국부동산원 공동주택 식별정보 공개자료(2026.08 기준)에 따르면, 불광동 내 등록된 공동주택 1,447개 단위 중 다세대·연립 비중은 96.1%이며, 사용승인일 확인 단위 중 20년 이상 경과 비율은 65.8%입니다.',
    limitationText: COMMON_LIMITATION_NOTE,
    intentCheckpoints: COMMON_INTENT_CHECKPOINTS,
    sourceLabel: COMMON_SOURCE_LABEL,
  },
  // 3. 마곡동
  {
    regionId: 'seoul-gangseo-마곡동',
    regionName: '마곡동',
    factText:
      '한국부동산원 공동주택 식별정보 공개자료(2026.08 기준)에 따르면, 마곡동 내 등록된 공동주택 95개 단위 중 아파트 비중은 38.9%(다세대 56.8%)이며, 사용승인일 확인 단위 중 20년 이상 경과 비율은 48.9%입니다.',
    limitationText: COMMON_LIMITATION_NOTE,
    intentCheckpoints: COMMON_INTENT_CHECKPOINTS,
    sourceLabel: COMMON_SOURCE_LABEL,
  },
  // 4. 성수동
  {
    regionId: 'seoul-seongdong-성수동',
    regionName: '성수동',
    factText:
      '한국부동산원 공동주택 식별정보 공개자료(2026.08 기준)에 따르면, 성수동 내 등록된 공동주택은 315개 단위(총 14,092세대)이며, 사용승인일이 확인된 단위 중 20년 이상 경과 비율은 59.0%입니다.',
    limitationText: COMMON_LIMITATION_NOTE,
    intentCheckpoints: COMMON_INTENT_CHECKPOINTS,
    sourceLabel: COMMON_SOURCE_LABEL,
  },
  // 5. 창신동
  {
    regionId: 'seoul-jongno-창신동',
    regionName: '창신동',
    factText:
      '한국부동산원 공동주택 식별정보 공개자료(2026.08 기준)에 따르면, 창신동 내 등록된 공동주택 274개 단위 중 다세대·연립 비중은 89.8%이며, 사용승인일 확인 단위 중 20년 이상 경과 비율은 92.7%입니다.',
    limitationText: COMMON_LIMITATION_NOTE,
    intentCheckpoints: COMMON_INTENT_CHECKPOINTS,
    sourceLabel: COMMON_SOURCE_LABEL,
  },
];

const PILOT_MAP = new Map<string, PilotLocalInsightProfile>(
  PILOT_LOCAL_INSIGHT_PROFILES.map((p) => [p.regionId, p])
);

/**
 * Returns verified Local Insight data strictly for the 5 Pilot regions.
 * Returns null (Zero-DOM) for Controls, non-pilots, collision-hold, and undefined inputs.
 */
export function getLocalInsight(
  regionId?: string,
  serviceKeyword?: ServiceKeyword
): LocalInsightData | null {
  if (!regionId || !serviceKeyword) {
    return null;
  }

  const profile = PILOT_MAP.get(regionId);
  if (!profile) {
    return null;
  }

  const checkpoint = profile.intentCheckpoints[serviceKeyword];
  if (!checkpoint) {
    return null;
  }

  return {
    factText: profile.factText,
    limitationText: profile.limitationText,
    checkpointText: checkpoint,
    sourceLabel: profile.sourceLabel,
  };
}
