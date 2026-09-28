/**
 * Region Evidence Single Source of Truth Repository (Phase 6-C0C-2B)
 *
 * NON-NEGOTIABLE POLICY:
 * - Real verified evidence only.
 * - Exactly 5 Pilot Regions populated with Tier-C Official Public Housing Data (2026.08.31).
 * - All other 313 regions remain strictly 0 evidence records.
 */

import { RegionEvidenceItem } from '../types/evidence';
import { ServiceKeyword } from '../types/intents';

const ALL_SIX_INTENTS: readonly ServiceKeyword[] = [
  '탄성코트',
  '탄성코트시공',
  '베란다탄성코트',
  '세탁실탄성코트',
  '아파트탄성코트',
  '탄성코트업체',
];

const COMMON_LIMITATION_NOTE =
  '공개 데이터베이스 등록 기준이며, 건물 연식만으로 개별 세대의 시공 필요성을 판단할 수 없습니다.';

/**
 * Verified Tier-C Public Housing Data Evidence Records for 5 Pilot Regions.
 * Data Source: 한국부동산원 공동주택 단지 식별정보_기본정보_20260831 (EUC-KR)
 */
export const PRODUCTION_REGION_EVIDENCE: readonly RegionEvidenceItem[] = [
  // 1. 강남구
  {
    evidenceId: 'ev-tierc-seoul-gangnam-gu',
    regionId: 'seoul-gangnam-gu',
    evidenceTier: 'TIER_C',
    sourceType: 'OFFICIAL_PUBLIC_DATA',
    sourceName: '한국부동산원',
    verifiedAt: '2026-08-31',
    serviceIntentApplicability: ALL_SIX_INTENTS,
    facts: {
      publicMetric:
        '공개 데이터 등록 공동주택 4,421개 (세대수 168,588, 사용승인일 확인 4,385개 중 20년 이상 69.3%)',
      publicHousingMetrics: {
        registeredUnits: 4421,
        households: 168588,
        housingTypes: {
          apartment: 718,
          rowHouse: 385,
          multiFamily: 3282,
          unknown: 36,
        },
        validApprovalDates: 4385,
        missingOrInvalidApprovalDates: 36,
        ageBuckets: {
          under10: 605,
          '10to19': 742,
          '20to29': 2064,
          '30plus': 974,
        },
        share20Plus: 69.3,
        mappingConfidence: 'HIGH',
        dataQuality: 'HIGH',
      },
      limitationNote: COMMON_LIMITATION_NOTE,
      intentCheckpoints: {
        '탄성코트':
          '강남구 내 공동주택 시공 전, 기존 발코니 도막의 들뜸·박리·미세 균열 및 오염 흔적 등 바탕면 상태를 우선 점검하세요.',
        '탄성코트시공':
          '강남구 지역 시공 시 기존 들뜬 도막 스크래핑, 균열 보수, 퍼티 작업 및 창틀·배관 주변 보양 범위를 명확히 확인하세요.',
        '베란다탄성코트':
          '강남구 베란다 시공 전 창틀 접점, 벽면 결로 흔적, 외벽 접촉 모서리 및 하부 도막 박리 여부를 점검해야 합니다.',
        '세탁실탄성코트':
          '강남구 세탁실 환경 점검 시 배관 주변 고습 흔적, 환기 조건, 벽면 곰팡이 발생 여부 및 바탕면 건조 상태를 확인하세요.',
        '아파트탄성코트':
          '강남구 아파트 단지 입주 전/재시공 시 기존 마감재 종류, 균열 및 벽면 바탕면 보수 필요 구간을 사전 확인하세요.',
        '탄성코트업체':
          '강남구 전문 업체 선정 시 단순 견적 비교 외 바탕면 하공정 보수 포함 여부와 상세 시공 공정 설명을 반드시 확인하세요.',
      },
    },
  },
  // 2. 불광동
  {
    evidenceId: 'ev-tierc-seoul-eunpyeong-bulgwang',
    regionId: 'seoul-eunpyeong-bulgwang',
    evidenceTier: 'TIER_C',
    sourceType: 'OFFICIAL_PUBLIC_DATA',
    sourceName: '한국부동산원',
    verifiedAt: '2026-08-31',
    serviceIntentApplicability: ALL_SIX_INTENTS,
    facts: {
      publicMetric:
        '공개 데이터 등록 공동주택 1,447개 (세대수 20,294, 사용승인일 확인 1,442개 중 20년 이상 65.8%)',
      publicHousingMetrics: {
        registeredUnits: 1447,
        households: 20294,
        housingTypes: {
          apartment: 52,
          rowHouse: 67,
          multiFamily: 1323,
          unknown: 5,
        },
        validApprovalDates: 1442,
        missingOrInvalidApprovalDates: 5,
        ageBuckets: {
          under10: 180,
          '10to19': 313,
          '20to29': 331,
          '30plus': 618,
        },
        share20Plus: 65.8,
        mappingConfidence: 'HIGH',
        dataQuality: 'HIGH',
      },
      limitationNote: COMMON_LIMITATION_NOTE,
      intentCheckpoints: {
        '탄성코트':
          '불광동 지역 공동주택 시공 전, 기존 벽면 도막 박리, 변색 및 바탕면 모서리 균열 상태를 정밀 확인하세요.',
        '탄성코트시공':
          '불광동 작업 전 바탕면 구도막 제거, 퍼티 평탄화, 코킹 균열 보수 등 기초 작업 범위를 사전 점검하세요.',
        '베란다탄성코트':
          '불광동 베란다 시공 시 외벽 접촉 모서리, 창틀 실리콘 접점 및 하부 결로 오염 구간을 면밀히 확인하세요.',
        '세탁실탄성코트':
          '불광동 세탁실 시공 전 배관 누수 여부, 상부 환기 상태, 벽면 습기 채움 및 곰팡이 포자 제거 여부를 점검하세요.',
        '아파트탄성코트':
          '불광동 아파트 시공 시 입주 전 마감재 상태, 발코니 창틀 접합부 및 기존 도막 인장력을 확인해야 합니다.',
        '탄성코트업체':
          '불광동 업체 비교 시 바탕면 밑작업 공정, 보양 작업 디테일 및 사후 하자 보수 조건 명시 여부를 체크하세요.',
      },
    },
  },
  // 3. 마곡동
  {
    evidenceId: 'ev-tierc-seoul-gangseo-magok',
    regionId: 'seoul-gangseo-마곡동',
    evidenceTier: 'TIER_C',
    sourceType: 'OFFICIAL_PUBLIC_DATA',
    sourceName: '한국부동산원',
    verifiedAt: '2026-08-31',
    serviceIntentApplicability: ALL_SIX_INTENTS,
    facts: {
      publicMetric:
        '공개 데이터 등록 공동주택 95개 (세대수 16,057, 사용승인일 확인 94개 중 20년 이상 48.9%)',
      publicHousingMetrics: {
        registeredUnits: 95,
        households: 16057,
        housingTypes: {
          apartment: 37,
          rowHouse: 3,
          multiFamily: 54,
          unknown: 1,
        },
        validApprovalDates: 94,
        missingOrInvalidApprovalDates: 1,
        ageBuckets: {
          under10: 21,
          '10to19': 27,
          '20to29': 26,
          '30plus': 20,
        },
        share20Plus: 48.9,
        mappingConfidence: 'HIGH',
        dataQuality: 'HIGH',
      },
      limitationNote: COMMON_LIMITATION_NOTE,
      intentCheckpoints: {
        '탄성코트':
          '마곡동 주거 공간 시공 전, 신축/준신축 또는 구축 벽면 마감재의 접착 상태 및 들뜸 유무를 먼저 점검하세요.',
        '탄성코트시공':
          '마곡동 시공 전 모서리 코킹 부위, 벽면 분진 제거, 퍼티 보수 및 비닐 보양 공정을 꼼꼼히 확인하세요.',
        '베란다탄성코트':
          '마곡동 베란다 시공 시 창호 주변 결로 흔적, 실리콘 마감 상태 및 외벽 접촉면 미세 균열을 정밀 점검하세요.',
        '세탁실탄성코트':
          '마곡동 세탁실 시공 전 세탁기 배관 주변 통풍 상태, 벽면 은폐 구간 곰팡이 유무 및 건조 상태를 확인하세요.',
        '아파트탄성코트':
          '마곡동 아파트 단지 입주 전 발코니 수성페인트 마감 상태 및 미세 크랙 보수 범위를 사전 확인하세요.',
        '탄성코트업체':
          '마곡동 업체 선정 시 시공 자재 사양, 기본 밑작업 포함 여부 및 투명한 공정 설명을 반드시 확인하세요.',
      },
    },
  },
  // 4. 성수동
  {
    evidenceId: 'ev-tierc-seoul-seongdong-seongsu',
    regionId: 'seoul-seongdong-성수동',
    evidenceTier: 'TIER_C',
    sourceType: 'OFFICIAL_PUBLIC_DATA',
    sourceName: '한국부동산원',
    verifiedAt: '2026-08-31',
    serviceIntentApplicability: ALL_SIX_INTENTS,
    facts: {
      publicMetric:
        '공개 데이터 등록 공동주택 315개 (세대수 14,092, 사용승인일 확인 315개 중 20년 이상 59.0%)',
      publicHousingMetrics: {
        registeredUnits: 315,
        households: 14092,
        housingTypes: {
          apartment: 45,
          rowHouse: 40,
          multiFamily: 230,
          unknown: 0,
        },
        validApprovalDates: 315,
        missingOrInvalidApprovalDates: 0,
        ageBuckets: {
          under10: 36,
          '10to19': 93,
          '20to29': 93,
          '30plus': 93,
        },
        share20Plus: 59.0,
        mappingConfidence: 'HIGH',
        dataQuality: 'HIGH',
      },
      limitationNote: COMMON_LIMITATION_NOTE,
      intentCheckpoints: {
        '탄성코트':
          '성수동 주거 단지 시공 전, 기존 도막 손상, 모서리 박리 및 바탕면 오염 상태를 사전 점검하세요.',
        '탄성코트시공':
          '성수동 시공 진행 시 들뜬 바탕면 샌딩·스크래핑, 균열 코킹, 보양 범위 및 마감 횟수를 사전 확인하세요.',
        '베란다탄성코트':
          '성수동 베란다 시공 전 외벽 접합부, 창틀 실리콘 오염, 우수관 주변 도막 결함 여부를 확인하세요.',
        '세탁실탄성코트':
          '성수동 세탁실 시공 전 배관 고습 환경, 하부 도막 상태 및 벽면 곰팡이 사전 제거 공정을 체크하세요.',
        '아파트탄성코트':
          '성수동 아파트 단지 입주/리모델링 시 기존 발코니 마감재 상태 및 바탕면 크랙 보수 구간을 확인하세요.',
        '탄성코트업체':
          '성수동 업체 선택 시 자재 검증, 바탕면 샌딩·퍼티 포함 여부 및 하자 보수 기준을 정밀 확인하세요.',
      },
    },
  },
  // 5. 창신동
  {
    evidenceId: 'ev-tierc-seoul-jongno-changsin',
    regionId: 'seoul-jongno-창신동',
    evidenceTier: 'TIER_C',
    sourceType: 'OFFICIAL_PUBLIC_DATA',
    sourceName: '한국부동산원',
    verifiedAt: '2026-08-31',
    serviceIntentApplicability: ALL_SIX_INTENTS,
    facts: {
      publicMetric:
        '공개 데이터 등록 공동주택 274개 (세대수 4,444, 사용승인일 확인 273개 중 20년 이상 92.7%)',
      publicHousingMetrics: {
        registeredUnits: 274,
        households: 4444,
        housingTypes: {
          apartment: 27,
          rowHouse: 10,
          multiFamily: 236,
          unknown: 1,
        },
        validApprovalDates: 273,
        missingOrInvalidApprovalDates: 1,
        ageBuckets: {
          under10: 11,
          '10to19': 9,
          '20to29': 163,
          '30plus': 90,
        },
        share20Plus: 92.7,
        mappingConfidence: 'HIGH',
        dataQuality: 'HIGH',
      },
      limitationNote: COMMON_LIMITATION_NOTE,
      intentCheckpoints: {
        '탄성코트':
          '창신동 지역 시공 전, 기존 수성페인트 도막의 노후화·탈락 및 바탕면 미세 균열을 먼저 점검하세요.',
        '탄성코트시공':
          '창신동 시공 시 취약 도막 전면 제거, 퍼티 2차 보수, 곰팡이 방지 처리 및 보양 여부를 필수 확인하세요.',
        '베란다탄성코트':
          '창신동 베란다 시공 전 창틀 접점 부식, 모서리 박리, 노후 외벽 접촉면 균열 상태를 면밀히 점검하세요.',
        '세탁실탄성코트':
          '창신동 세탁실 점검 시 배관 누수 여부, 벽면 노후 도막 들뜸 및 하부 환기 상태를 확인해야 합니다.',
        '아파트탄성코트':
          '창신동 아파트 시공 시 구축 도막 마감 상태, 크랙 퍼티 보수 및 발코니 바탕면 강도를 체크하세요.',
        '탄성코트업체':
          '창신동 업체 선정 시 밑작업(스크래핑/퍼티/보양)의 세부 공정 포함 여부와 사후 A/S 조건을 확인하세요.',
      },
    },
  },
];

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
