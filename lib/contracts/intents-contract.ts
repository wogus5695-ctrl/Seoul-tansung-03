/**
 * Search Intent Contract Implementations (Phase 4-B Intent-Differentiated)
 *
 * All 6 intents adhere to the Exact Dynamic Keyword Prefix Rule:
 * Title, Description, H1, Hero Intro all lead with {keywordRegionName serviceKeyword}.
 *
 * INTENT DIFFERENTIATION PRINCIPLES (Phase 4-B):
 * - Primary searcher questions are distinctly formulated for each intent.
 * - Non-repetitive descriptions: tailored openings instead of monotonous "{keyword}가 필요하신가요?".
 * - Custom problemH2Template for intent-specific primary H2 headings.
 * - Strictly zero unverified claims (결로 방지, 곰팡이 차단, 단열, 직영팀, A/S 보장 등 배제).
 * - Focused on pre-purchase decision criteria: 현장 벽면 상태 점검, 보양, 바탕면 정리, 작업 범위 판단.
 * - 30 distinct, verified FAQs across the 6 intents.
 */

import { SearchIntentId, SearchIntentItem, ServiceKeyword } from '../types/intents';

export const SEARCH_INTENTS: readonly SearchIntentItem[] = [
  {
    id: 'elastic-coating',
    serviceKeyword: '탄성코트',
    contentStatus: 'PLACEHOLDER',
    searcherQuestion: '현재 벽면 상태에서 탄성코트가 필요한가?',
    userIntent: '우리 집에 탄성코트 작업이 필요한지 벽면과 기존 도막 상태를 확인하고자 함',
    primaryProblem: '기존 도막의 들뜸, 표면 박리 및 벽면 오염·습기 흔적',
    decisionTopics: [
      '도막 들뜸 및 박리 부위 확인',
      '벽면 균열 및 못 자국 등 보수 필요성 점검',
      '외벽 접점부 습기 흔적과 작업 범위 판단',
    ],
    problemH2Template: (region) => `${region} 탄성코트, 시공 전 어떤 벽면 상태를 먼저 살펴봐야 할까요?`,
    titleTemplate: (region) => `${region} 탄성코트 현장 벽면 점검 및 시공 안내 | 올케어`,
    descriptionTemplate: (region) =>
      `${region} 탄성코트 시공 전, 기존 도막의 들뜸과 균열, 벽면 오염 및 습기 흔적을 먼저 살펴 필요한 작업 범위를 안내합니다.`,
    h1Template: (region) => `${region} 탄성코트`,
    heroIntroTemplate: (region) =>
      `${region} 탄성코트 시공 전, 베란다 벽면의 들뜸과 균열, 습기 흔적을 살펴 필요한 작업 범위부터 정직하게 확인합니다.`,
    faqItems: [
      {
        id: 'ec-faq-1',
        question: '기존 페인트가 들뜨거나 벗겨진 곳이 있는데 그대로 시공하나요?',
        answer: '들뜨거나 벗겨진 기존 도막을 정리하고 필요한 바탕면 보수를 진행한 후 작업을 진행합니다.',
      },
      {
        id: 'ec-faq-2',
        question: '일반 페인트 재도장과 탄성코트 작업은 어떤 차이가 있나요?',
        answer: '기존 벽면의 들뜸이나 균열 부위를 먼저 정리하고 주거 공간 베란다 환경에 적합한 탄성코트 도막을 형성하는 작업입니다.',
      },
      {
        id: 'ec-faq-3',
        question: '벽면에 오염이나 곰팡이 흔적이 남아있을 때는 어떻게 하나요?',
        answer: '오염 부위의 상태를 확인하여 표면 정리와 밑작업을 거친 후 시공을 진행합니다.',
      },
      {
        id: 'ec-faq-4',
        question: '습기가 자주 머무는 벽면은 어떻게 점검하나요?',
        answer: '외벽 접점부나 창가 주변의 습기 흔적을 먼저 점검하고, 환기 환경과 함께 필요한 시공 범위를 안내합니다.',
      },
      {
        id: 'ec-faq-5',
        question: '시공 상담 전 벽면 사진은 어떻게 준비하면 좋나요?',
        answer: '전체적인 공간 모습과 들뜸, 균열, 오염이 있는 부위의 근접 사진을 함께 준비해 주시면 원활한 상담이 가능합니다.',
      },
    ],
    relatedIntentIds: [
      'elastic-coating-installation',
      'balcony-elastic-coating',
      'laundry-elastic-coating',
      'apartment-elastic-coating',
      'elastic-coating-company',
    ],
  },
  {
    id: 'elastic-coating-installation',
    serviceKeyword: '탄성코트시공',
    contentStatus: 'PLACEHOLDER',
    searcherQuestion: '탄성코트 시공은 어떤 순서로 진행되는가?',
    userIntent: '탄성코트 시공 과정의 기초 보양과 바탕면 준비 기준을 확인하고자 함',
    primaryProblem: '작업 전 바탕면 정리 및 시설물 보양 생략으로 인한 마감 완성도 저하',
    decisionTopics: [
      '시설물 및 바닥 마스킹 보양 범위',
      '들뜬 도막 정리 및 균열 보수 필요성 점검',
      '탄성코트 작업 단계와 마감 후 관리 안내',
    ],
    problemH2Template: (region) => `${region} 탄성코트시공, 단계별 기본 공정과 준비 사항은 무엇일까요?`,
    titleTemplate: (region) => `${region} 탄성코트시공 작업 공정 및 바탕면 준비 안내 | 올케어`,
    descriptionTemplate: (region) =>
      `${region} 탄성코트시공 순서와 준비 과정이 궁금하신가요? 시설물 보양부터 바탕면 정리, 탄성코트 작업과 환기 요령까지의 단계별 공정을 안내합니다.`,
    h1Template: (region) => `${region} 탄성코트시공`,
    heroIntroTemplate: (region) =>
      `${region} 탄성코트시공 과정에서 확인해야 할 시설물 보양과 바탕면 정리, 기본 작업 단계를 안내합니다.`,
    faqItems: [
      {
        id: 'eci-faq-1',
        question: '시공 당일 작업 단계는 어떻게 진행되나요?',
        answer: '현장 상태 확인 후 시설물 보양, 필요한 바탕면 정리 및 보수, 탄성코트 작업, 보양재 정리 순으로 진행됩니다.',
      },
      {
        id: 'eci-faq-2',
        question: '창호나 보일러 등 주변 시설물은 어떻게 보호하나요?',
        answer: '작업 공간 내 샷시, 계량기, 수전 등을 마스킹 테이프로 감싸 페인트가 묻지 않도록 보호합니다.',
      },
      {
        id: 'eci-faq-3',
        question: '벽면의 못 자국이나 틈새 균열도 작업 전 메워지나요?',
        answer: '상태 점검 후 메꿈이 필요한 균열과 홈은 보수 작업을 거쳐 바탕면을 정돈합니다.',
      },
      {
        id: 'eci-faq-4',
        question: '시공 후 도막 건조를 위해 어떻게 관리해야 하나요?',
        answer: '시공 직후 계절과 날씨에 맞춰 안내해 드리는 환기 수칙에 따라 자연 통풍으로 도막을 안정화합니다.',
      },
      {
        id: 'eci-faq-5',
        question: '비가 오거나 기온이 낮아도 시공이 가능한가요?',
        answer: '내부 온도가 너무 낮거나 습도가 과도하게 높은 날은 건조 환경을 고려하여 일정을 조율할 수 있습니다.',
      },
    ],
    relatedIntentIds: [
      'elastic-coating',
      'balcony-elastic-coating',
      'laundry-elastic-coating',
      'apartment-elastic-coating',
      'elastic-coating-company',
    ],
  },
  {
    id: 'balcony-elastic-coating',
    serviceKeyword: '베란다탄성코트',
    contentStatus: 'PLACEHOLDER',
    searcherQuestion: '베란다 탄성코트를 할 때 무엇을 확인해야 하는가?',
    userIntent: '베란다 창호 주변과 외벽 접점의 습기 흔적 및 시공 조건을 확인하고자 함',
    primaryProblem: '창호 주변 및 외벽 접점부의 습기 흔적과 기존 도막의 국소 박리',
    decisionTopics: [
      '창호 주변 실리콘 및 틈새 노후 상태 확인',
      '외벽과 맞닿는 코너 부위 습기 흔적 점검',
      '우수관 주변 등 좁은 틈새 작업 조건 검토',
    ],
    problemH2Template: (region) => `${region} 베란다탄성코트, 창호 주변과 외벽 접점의 확인 포인트는 무엇일까요?`,
    titleTemplate: (region) => `${region} 베란다탄성코트 창호 주변 및 외벽 접점 점검 | 올케어`,
    descriptionTemplate: (region) =>
      `${region} 베란다탄성코트 작업을 위해 창호 주변 틈새와 외벽 접점부의 습기 흔적, 도막 상태를 꼼꼼히 확인하고 시공 정보를 제공합니다.`,
    h1Template: (region) => `${region} 베란다탄성코트`,
    heroIntroTemplate: (region) =>
      `${region} 베란다탄성코트 시공 전, 외벽과 맞닿는 코너 부위와 창호 주변의 습기 흔적부터 꼼꼼히 확인합니다.`,
    faqItems: [
      {
        id: 'bec-faq-1',
        question: '창호(샷시) 주변 실리콘이 노후된 경우 어떻게 하나요?',
        answer: '창틀 틈새와 실리콘 주변의 노후 상태를 확인하여 필요한 밑작업 범위를 사전에 안내합니다.',
      },
      {
        id: 'bec-faq-2',
        question: '외벽과 맞닿는 베란다 모서리에 습기 흔적이 많은데 괜찮을까요?',
        answer: '외벽 접점부는 온도차로 습기가 생기기 쉬운 곳이므로 벽면 건조 상태를 확인하고 시공합니다.',
      },
      {
        id: 'bec-faq-3',
        question: '우수관(배수 파이프) 뒷면 좁은 공간도 시공 범위에 포함되나요?',
        answer: '작업 도구가 들어가는 범위 내에서 최대한 고르게 작업이 진행되도록 현장을 살핍니다.',
      },
      {
        id: 'bec-faq-4',
        question: '선반이나 블라인드가 설치되어 있는 경우 어떻게 하나요?',
        answer: '원활한 작업을 위해 탈거 가능한 부착물은 사전 협의 후 분리하거나 보양 후 진행합니다.',
      },
      {
        id: 'bec-faq-5',
        question: '베란다에 짐이 보관되어 있는 상태에서도 작업이 가능한가요?',
        answer: '벽면과의 작업 동선 확보를 위해 짐을 중앙으로 모아두시거나 사전에 이동해 주셔야 합니다.',
      },
    ],
    relatedIntentIds: [
      'elastic-coating',
      'elastic-coating-installation',
      'laundry-elastic-coating',
      'apartment-elastic-coating',
      'elastic-coating-company',
    ],
  },
  {
    id: 'laundry-elastic-coating',
    serviceKeyword: '세탁실탄성코트',
    contentStatus: 'PLACEHOLDER',
    searcherQuestion: '세탁실 탄성코트는 일반 베란다와 무엇이 다른가?',
    userIntent: '세탁기·건조기 설치 공간과 좁은 배관 주변 벽면 상태 및 작업 환경 확인',
    primaryProblem: '대형 가전 후면의 협소한 통풍 공간 및 배관 주변 습기 정체',
    decisionTopics: [
      '가전 설치 전 공실 상태 시공 우선성 검토',
      '배관 연결부 주변의 벽면 상태 및 틈새 점검',
      '환기창 크기와 공기 흐름에 따른 건조 환경 확인',
    ],
    problemH2Template: (region) => `${region} 세탁실탄성코트, 대형 가전 공간과 배관 주변의 점검 기준은 무엇일까요?`,
    titleTemplate: (region) => `${region} 세탁실탄성코트 배관 주변 및 가전 공간 점검 | 올케어`,
    descriptionTemplate: (region) =>
      `${region} 세탁실탄성코트는 좁은 배관 틈새와 대형 가전 설치 공간, 환기 환경을 고려하여 맞춤 작업 계획을 수립합니다.`,
    h1Template: (region) => `${region} 세탁실탄성코트`,
    heroIntroTemplate: (region) =>
      `${region} 세탁실탄성코트 작업은 대형 가전이 놓이는 자리와 좁은 배관 벽면의 상태를 사전에 확인하여 계획합니다.`,
    faqItems: [
      {
        id: 'lec-faq-1',
        question: '세탁기나 건조기가 이미 설치되어 있어도 시공이 가능한가요?',
        answer: '가전 뒤쪽 벽면 작업 공간이 확보되어야 하므로, 공실 상태이거나 가전 이동이 가능한지 사전에 확인합니다.',
      },
      {
        id: 'lec-faq-2',
        question: '세탁실 창문이 작아 환기가 부족한 구조는 어떻게 하나요?',
        answer: '작업 후 자연 통풍 및 서큘레이터 활용 등 현장 조건에 맞는 건조 관리 방법을 안내합니다.',
      },
      {
        id: 'lec-faq-3',
        question: '바닥 배수구 및 걸레받이 라인 분리는 어떻게 진행되나요?',
        answer: '물 사용이 잦은 바닥 경계선은 보양 테이프로 라인을 깔끔하게 구분하여 작업합니다.',
      },
      {
        id: 'lec-faq-4',
        question: '가스계량기나 보일러 연통 주변도 안전하게 작업되나요?',
        answer: '안전 점검 표식 부위와 연통 연결부는 보양재로 감싸 안전에 지장이 없도록 시공합니다.',
      },
      {
        id: 'lec-faq-5',
        question: '세탁실 시공 후 가전제품은 언제 다시 연결할 수 있나요?',
        answer: '도막이 충분히 마르는 양생 시간을 거친 후 가전을 원위치하시는 것을 권장합니다.',
      },
    ],
    relatedIntentIds: [
      'elastic-coating',
      'elastic-coating-installation',
      'balcony-elastic-coating',
      'apartment-elastic-coating',
      'elastic-coating-company',
    ],
  },
  {
    id: 'apartment-elastic-coating',
    serviceKeyword: '아파트탄성코트',
    contentStatus: 'PLACEHOLDER',
    searcherQuestion: '아파트 탄성코트는 언제, 어떤 공간을 확인해야 하는가?',
    userIntent: '신축 입주 전 공실 상태 점검 또는 구축 아파트 리모델링 벽면 상태 점검',
    primaryProblem: '입주 전후 일정 조율 및 세대 연식에 따른 벽면 상태 차이',
    decisionTopics: [
      '타 인테리어 공정 및 입주 일정과의 순서 조율',
      '신축 세대 점검 및 구축 세대 노후 도막 정리 범위',
      '시공 대상 공간(발코니, 다용도실 등)의 상태 확인',
    ],
    problemH2Template: (region) => `${region} 아파트탄성코트, 신축·구축 세대별 일정과 작업 범위는 어떻게 다를까요?`,
    titleTemplate: (region) => `${region} 아파트탄성코트 입주 전후 벽면 점검 및 일정 안내 | 올케어`,
    descriptionTemplate: (region) =>
      `${region} 아파트탄성코트 일정을 준비 중이신가요? 신축 입주 전 공실 점검부터 구축 세대 노후 도막 정리까지 세대별 작업 기준을 안내합니다.`,
    h1Template: (region) => `${region} 아파트탄성코트`,
    heroIntroTemplate: (region) =>
      `${region} 아파트탄성코트 시공은 첫 입주 세대의 공실 점검부터 연식이 있는 아파트의 노후 도막 정리까지 세대별 상황에 맞춰 진행됩니다.`,
    faqItems: [
      {
        id: 'aec-faq-1',
        question: '입주 청소나 타 인테리어 공정과 어떤 순서로 진행해야 하나요?',
        answer: '작업 중 분진 발생 및 도막 건조 시간을 감안하여 통상 입주 청소 전 작업을 권장합니다.',
      },
      {
        id: 'aec-faq-2',
        question: '신축 아파트인데도 탄성코트 작업을 진행하는 이유가 무엇인가요?',
        answer: '입주 전 공실 상태에서 발코니 벽면을 미리 정돈하고 관리 편의성을 높이기 위해 진행합니다.',
      },
      {
        id: 'aec-faq-3',
        question: '구축 아파트의 노후된 벽면이나 균열도 점검 후 보수되나요?',
        answer: '들뜬 페인트를 긁어내고 표면 균열을 메우는 밑작업 필요 여부를 현장 상태에 따라 점검합니다.',
      },
      {
        id: 'aec-faq-4',
        question: '아파트 관리사무소에 사전 공사 신고가 필요한가요?',
        answer: '장비 가동 소음이 일부 발생할 수 있으므로 단지별 관리 규정을 사전에 확인하시는 것이 좋습니다.',
      },
      {
        id: 'aec-faq-5',
        question: '거주 중인 아파트에서도 시공이 가능한가요?',
        answer: '가구 및 생활 짐의 이동 가능 여부와 작업 동선 확보 상태를 상담 시 확인 후 진행 여부를 안내합니다.',
      },
    ],
    relatedIntentIds: [
      'elastic-coating',
      'elastic-coating-installation',
      'balcony-elastic-coating',
      'laundry-elastic-coating',
      'elastic-coating-company',
    ],
  },
  {
    id: 'elastic-coating-company',
    serviceKeyword: '탄성코트업체',
    contentStatus: 'PLACEHOLDER',
    searcherQuestion: '탄성코트 업체를 선택할 때 무엇을 확인해야 하는가?',
    userIntent: '시공 범위와 밑작업 기준, 견적 확인 사항을 투명하게 확인하고자 함',
    primaryProblem: '사전 현장 점검 소홀 및 시공 범위 불명확으로 인한 상담 혼선',
    decisionTopics: [
      '상담 시 바탕면 정리 및 보수 범위 포함 여부 확인',
      '현장 벽면 사진을 바탕으로 한 구체적인 작업 상담',
      '시공 후 환기 및 도막 관리 안내 여부 확인',
    ],
    problemH2Template: (region) => `${region} 탄성코트업체, 상담 전 확인해야 할 필수 기준과 견적 항목은 무엇일까요?`,
    titleTemplate: (region) => `${region} 탄성코트업체 시공 범위 확인 및 견적 기준 안내 | 올케어`,
    descriptionTemplate: (region) =>
      `${region} 탄성코트업체 선정 시 필수 확인 사항인 사업자 정보, 바탕면 보수 포함 여부, 투명한 견적 기준을 정리해 드립니다.`,
    h1Template: (region) => `${region} 탄성코트업체`,
    heroIntroTemplate: (region) =>
      `${region} 탄성코트업체 선택 전, 시공 범위와 밑작업 포함 여부, 상담 시 확인해야 할 기본 사항을 투명하게 안내합니다.`,
    faqItems: [
      {
        id: 'ecc-faq-1',
        question: '견적 상담 시 어떤 정보를 미리 전달하면 좋나요?',
        answer: '아파트 구조, 시공할 공간(발코니, 세탁실 등), 현재 벽면 상태 사진을 보내주시면 원활한 상담이 가능합니다.',
      },
      {
        id: 'ecc-faq-2',
        question: '현장 상황에 따라 추가 작업이 필요한 경우는 언제인가요?',
        answer: '기존 도막의 대량 박리로 인한 집중 스크래핑, 광범위한 균열 보수, 짐 이동 등이 필요한 경우 사전에 협의합니다.',
      },
      {
        id: 'ecc-faq-3',
        question: '견적 비교 시 확인해야 할 주요 항목은 무엇인가요?',
        answer: '단순 도포 작업만 포함된 것인지, 바탕면 정리 및 균열 보수가 견적에 포함되어 있는지 확인하시는 것이 좋습니다.',
      },
      {
        id: 'ecc-faq-4',
        question: '시공 후 사후 관리 안내는 어떻게 이루어지나요?',
        answer: '작업 완료 후 도막 건조 및 환기 관리 수칙을 상세히 안내해 드립니다.',
      },
      {
        id: 'ecc-faq-5',
        question: '사업자 정보는 어디에서 확인할 수 있나요?',
        answer: '홈페이지 하단에 상호명, 대표자명, 사업자등록번호가 투명하게 공개되어 있습니다.',
      },
    ],
    relatedIntentIds: [
      'elastic-coating',
      'elastic-coating-installation',
      'balcony-elastic-coating',
      'laundry-elastic-coating',
      'apartment-elastic-coating',
    ],
  },
];

export const SERVICE_KEYWORDS: readonly ServiceKeyword[] = SEARCH_INTENTS.map(
  (intent) => intent.serviceKeyword
);

export function getSearchIntentById(id: SearchIntentId): SearchIntentItem | undefined {
  return SEARCH_INTENTS.find((intent) => intent.id === id);
}

export function getSearchIntentByKeyword(keyword: string): SearchIntentItem | undefined {
  return SEARCH_INTENTS.find((intent) => intent.serviceKeyword === keyword);
}

export function isValidServiceKeyword(keyword: string): keyword is ServiceKeyword {
  return SEARCH_INTENTS.some((intent) => intent.serviceKeyword === keyword);
}
