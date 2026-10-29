import { ServiceKeyword } from '../types/intents';
import { GuideSection, GuideArticle, getGuideBySlug } from './guides-data';
import { PRODUCTION_REGIONS } from '../contracts/regions-contract';
import { buildPublicHref } from '../url/url-builder';
import { OFFICIAL_SITE_ORIGIN, SITE_CONFIG } from '../config/site-config';

export const KEYWORD_GUIDE_PUBDATE = '2026-10-27T17:30:00+09:00';
export const KEYWORD_GUIDE_PUBDATE_RFC822 = 'Tue, 27 Oct 2026 17:30:00 +0900';

export const DONGJAK_GEUMCHEON_GUIDE_PUBDATE = '2026-10-29T11:10:00+09:00';
export const DONGJAK_GEUMCHEON_GUIDE_PUBDATE_RFC822 = 'Thu, 29 Oct 2026 11:10:00 +0900';

export interface KeywordGuideEntry {
  readonly id: string;
  readonly regionId: string;
  readonly serviceKeyword: ServiceKeyword;
  readonly slug: string;
  readonly title: string;
  readonly h1: string;
  readonly description: string;
  readonly category: string;
  readonly publishedAt: string;
  readonly publishedAtRfc822: string;
  readonly intro: string;
  readonly sections: readonly GuideSection[];
  readonly checklistTitle: string;
  readonly checklistItems: readonly string[];
  readonly limitationTitle: string;
  readonly limitationNote: string;
  readonly relatedGuideSlugs: readonly string[];
}

export const KEYWORD_GUIDES: readonly KeywordGuideEntry[] = [
  // 1. 영등포구 탄성코트
  {
    id: 'kg-yeongdeungpo-gu-elastic',
    regionId: 'seoul-yeongdeungpo-gu',
    serviceKeyword: '탄성코트',
    slug: 'yeongdeungpo-gu-elastic-coating-surface-scope',
    title: '영등포구 탄성코트 기존 도막 상태와 작업 범위 확인 | 올케어 시공 가이드',
    h1: '영등포구 탄성코트 기존 도막 상태와 작업 범위 확인',
    description: '영등포구 탄성코트 시공 전 베란다 및 다용도실 벽면의 기존 페인트 들뜸, 균열 보수 필요성 및 전체 시공 범위를 판단하는 기준을 안내합니다.',
    category: '시공 점검 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '탄성코트 시공을 계획할 때는 기존 벽면에 칠해진 페인트와 바탕 콘크리트의 부착 안정성을 먼저 살펴보아야 합니다. 현장 벽면의 노후 상태와 균열 범위에 따라 필요한 밑작업 공정과 시공 면적이 달라지므로, 사전에 확인해야 할 기본 점검 포인트를 정리해 드립니다.',
    sections: [
      {
        h2: '1. 기존 도막의 들뜸 및 탈락 흔적 점검',
        paragraphs: [
          '외벽과 접한 벽면이나 창호 하단부는 기온 차이와 실내 습기의 영향을 직접 받습니다. 손으로 벽면을 가볍게 두드렸을 때 바스락거리는 소리가 나거나 들뜬 부위가 육안으로 관찰된다면 기존 도막이 바탕면에서 분리된 상태입니다.',
          '부실한 기존 칠을 스크래퍼로 긁어내지 않고 도포를 진행하면 새 도막이 함께 탈락할 수 있습니다. 따라서 탈락 가능성이 있는 부실 도막의 범위를 파악하여 긁어내기 작업이 선행되어야 합니다.',
        ],
      },
      {
        h2: '2. 콘크리트 미세 균열 및 바탕면 보수 범위 확인',
        paragraphs: [
          '베란다 벽체에 미세 실금이나 타공 자국이 있는 경우 도료 도포 전 퍼티 메꿈 공정이 필요합니다. 탄성코트는 일정한 신율을 지닌 기능성 마감재이지만 깊게 패인 틈을 완전히 메워주는 충전재가 아닙니다.',
          '균열 틈새를 평탄화하는 하도 및 보수 작업이 견적 공정에 적절히 포함되었는지 사전에 대조하는 것이 안정적인 마감을 위한 핵심입니다.',
        ],
      },
      {
        h2: '3. 시공 반경 내 집기 이동 및 공간 확보',
        paragraphs: [
          '고압 스프레이건을 사용하는 분사 작업 특성상 작업 공간 내부에 비산 방지 보양이 이뤄져야 합니다. 세탁기, 선반, 수납함 등 집기가 벽면에 밀착되어 있으면 분사 작업자의 안전한 작업 각도가 나오지 않으므로 충분한 이격 거리를 확보해야 합니다.',
        ],
      },
    ],
    checklistTitle: '시공 전 바탕면 점검 체크리스트',
    checklistItems: [
      '벽체 모서리나 창틀 하단에 들뜬 페인트 조각이 관찰되는가?',
      '콘크리트 표면에 눈에 띄는 헤어크랙이나 실금이 존재하는가?',
      '벽면 표면이 젖어있지 않고 건조 상태가 유지되고 있는가?',
      '시공 공간 내 이동 가능한 수납 소품이 모두 반출되었는가?',
    ],
    limitationTitle: '시공 안내 시 유의 사항',
    limitationNote: '※ 본 안내는 벽면 점검 시 필요한 일반적 기술 기준을 제시한 것입니다. 탄성코트는 결로 완화 보조 기능을 갖춘 기능성 도료 마감재이며, 건물의 구조적 누수나 단열재 미설치로 인한 하자를 근본적으로 대체하는 것은 아닙니다.',
    relatedGuideSlugs: ['balcony-coating-checklist', 'elastic-coating-estimate-work-scope-guide'],
  },

  // 2. 영등포동 탄성코트
  {
    id: 'kg-yeongdeungpo-dong-elastic',
    regionId: 'seoul-yeongdeungpo-영등포동',
    serviceKeyword: '탄성코트',
    slug: 'yeongdeungpo-dong-elastic-coating-peeling-check',
    title: '영등포동 탄성코트 벽면 들뜸·박리 상태 확인 | 올케어 시공 가이드',
    h1: '영등포동 탄성코트 벽면 들뜸·박리 상태 확인',
    description: '영등포동 탄성코트 시공을 준비할 때 기존 페인트의 들뜸과 박리 상태를 육안으로 확인하고 스크래핑 전처리 범위를 파악하는 기준을 설명합니다.',
    category: '바탕면 진단 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '영등포동 탄성코트 작업 전에는 벽면 전체의 페인트 박리 상태를 체계적으로 확인하는 것이 중요합니다. 오랜 기간 누적된 수성 페인트 도막이 부식되어 부스러지는 현상이 발생하면 도포 내구성이 저하되므로 철저한 사전 점검이 필요합니다.',
    sections: [
      {
        h2: '1. 스크래퍼 탈락 범위와 도막 두께 대조',
        paragraphs: [
          '벽면에 형성된 구형 도막이 여러 겹 겹쳐져 있는 경우, 물리적 충격 없이도 계면 박리가 일어날 수 있습니다. 손톱이나 단단한 헤라로 모서리를 가볍게 밀었을 때 쉽게 떨어져 나가는 부위는 전부 긁어내어 제거해야 합니다.',
          '박리된 단차 부위에는 평탄화 하도 프라이머 처리가 수반되어야 도막 분사 후 표면 굴곡이 매끄럽게 정돈됩니다.',
        ],
      },
      {
        h2: '2. 벽면 잔여 오염물 세척 및 건조 요건',
        paragraphs: [
          '도막이 벗겨진 콘크리트 표면에 곰팡이 오염이나 먼지가 고착되어 있다면 표면을 닦아내고 바짝 말려야 합니다. 수분이 남아있는 벽체에 탄성 도료를 올리면 건조 과정에서 기포가 형성될 수 있으므로 통풍을 통한 건조 상태 확보가 필수적입니다.',
        ],
      },
    ],
    checklistTitle: '도막 박리 상태 자체 점검표',
    checklistItems: [
      '가볍게 긁었을 때 가루처럼 부스러지며 떨어지는 도막이 있는가?',
      '박리 부위와 정상 부위 사이의 단차가 심하게 벌어져 있는가?',
      '도막 안쪽 콘크리트 표면에 습기나 얼룩이 묻어나지 않는가?',
      '벽면 모서리 코킹 실리콘이 경화되어 갈라지지 않았는가?',
    ],
    limitationTitle: '현장 시공 참고 안내',
    limitationNote: '※ 페인트 들뜸이 광범위한 현장은 긁어내기 작업으로 인해 표면 요철이 생길 수 있으며, 퍼티 작업 범위는 현장 방문 시 벽면 경도를 측정하여 최종 협의합니다.',
    relatedGuideSlugs: ['old-apartment-balcony-recoating-guide', 'balcony-coating-checklist'],
  },

  // 3. 당산동 탄성코트
  {
    id: 'kg-dangsan-dong-elastic',
    regionId: 'seoul-yeongdeungpo-당산동',
    serviceKeyword: '탄성코트',
    slug: 'dangsan-dong-elastic-coating-crack-repair',
    title: '당산동 탄성코트 미세 균열과 바탕면 보수 범위 판단 | 올케어 시공 가이드',
    h1: '당산동 탄성코트 미세 균열과 바탕면 보수 범위 판단',
    description: '당산동 탄성코트 시공 전 발코니 콘크리트 벽체의 미세 균열 크랙을 확인하고 적합한 보수 퍼티 공정 적용 범위를 검토하는 가이드입니다.',
    category: '바탕면 진단 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '당산동 탄성코트 시공 시 완성도 높은 마감을 얻기 위해서는 균열 보수 기준을 명확히 이해해야 합니다. 콘크리트 구조물의 온도 수축이나 건조 수축으로 인해 발생하는 실금은 도료 도포 전 꼼꼼한 보수가 선행되어야 마감면이 갈라지지 않습니다.',
    sections: [
      {
        h2: '1. 실금(헤어크랙)과 구조적 균열의 구별',
        paragraphs: [
          '표면 수성페인트에 얕게 발생한 미세 균열은 외부용 수성 퍼티를 충진하여 손쉽게 보수할 수 있습니다. 반면 콘크리트 모체까지 갈라진 깊은 균열은 탄성 실란트나 균열 보수 테이프를 병행 적용해야 합니다.',
          '시공 견적 산정 시 단순 분사만 포함된 것인지, 균열 메꿈 하도 밑작업이 포함된 것인지 확인하는 절차가 필요합니다.',
        ],
      },
      {
        h2: '2. 퍼티 건조 시간과 하도 부착력 확보',
        paragraphs: [
          '퍼티로 메꾼 바탕면은 충분한 건조 시간을 거쳐 수분이 증발해야 합니다. 덜 마른 퍼티 위에 탄성코트를 고압 분사하면 내부 가스로 인해 칠이 부풀어 오를 위험이 있으므로 건조 공정을 서두르지 않는 것이 중요합니다.',
        ],
      },
    ],
    checklistTitle: '균열 점검 핵심 체크리스트',
    checklistItems: [
      '벽체 중앙부에 사선이나 격자 형태의 균열선이 관찰되는가?',
      '창호 모서리 대각선 방향으로 크랙이 뻗어나가고 있는가?',
      '균열 틈새로 콘크리트 백화 가루나 물기가 배어나오지 않는가?',
      '보수용 퍼티 작업 후 충분히 양생할 수 있는 작업 일정이 확보되었는가?',
    ],
    limitationTitle: '균열 보수 유의 사항',
    limitationNote: '※ 탄성코트는 탄성 도막을 형성하여 미세 거동을 완화하지만, 건물 골조 자체의 심각한 구조적 침하나 지속적인 누수로 인한 크랙을 구조적으로 보강하는 것은 아닙니다.',
    relatedGuideSlugs: ['elastic-coating-estimate-work-scope-guide', 'balcony-coating-checklist'],
  },

  // 4. 문래동 탄성코트
  {
    id: 'kg-mullae-dong-elastic',
    regionId: 'seoul-yeongdeungpo-문래동',
    serviceKeyword: '탄성코트',
    slug: 'mullae-dong-elastic-coating-pipe-corner-check',
    title: '문래동 탄성코트 벽면 모서리·배관 주변 기존 도막 상태 확인 | 올케어 시공 가이드',
    h1: '문래동 탄성코트 벽면 모서리·배관 주변 기존 도막 상태 확인',
    description: '문래동 탄성코트 시공 전 우수관 및 배관 주변과 외벽 접촉 모서리의 도막 부식 상태를 점검하는 기준을 안내합니다.',
    category: '시공 점검 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '문래동 탄성코트 계획 시에는 시공 사각지대가 되기 쉬운 배관 뒤편과 벽면 코너부를 면밀히 관찰해야 합니다. 공기 순환이 상대적으로 정체되는 위치일수록 기존 페인트의 내구성이 먼저 약화되므로 작업 전 꼼꼼한 확인이 필요합니다.',
    sections: [
      {
        h2: '1. 우수관 및 가스 배관 주변의 칠 들뜸 점검',
        paragraphs: [
          '세탁실이나 베란다를 관통하는 우수관 배관 뒤쪽은 스프레이건 노즐의 진입 각도가 좁습니다. 배관에 가려진 벽면의 기존 페인트가 부식되어 있다면 배관 틈새로 손을 넣어 들뜬 부위를 긁어내야 합니다.',
          '배관 고정 브래킷 주변에 녹물이나 누수 흔적이 있다면 탄성코트 도포 전 방청 하도 페인트를 덧발라 녹물이 배어나오는 현상을 방지해야 합니다.',
        ],
      },
      {
        h2: '2. 천장 모서리 삼각 접점부 도막 밀착도 확인',
        paragraphs: [
          '외벽과 천장이 만나는 모서리는 온도 구배가 가장 큰 취약 지점입니다. 모서리 코킹이 들뜨거나 칠이 벗겨진 상태라면 실란트로 틈새 메꿈 보수를 진행한 후 도포해야 깨끗한 직선 마감이 나옵니다.',
        ],
      },
    ],
    checklistTitle: '배관 및 모서리 점검표',
    checklistItems: [
      '우수관 뒤편 벽면에 검은 얼룩이나 칠 들뜸이 숨어있지 않은가?',
      '배관 고정 철물 부위에 붉은 녹물이 번져있지 않은가?',
      '천장과 벽면 모서리 연결선에 벌어진 틈새가 없는가?',
      '스프레이 분사건이 진입할 수 있도록 배관 주변 물품이 치워졌는가?',
    ],
    limitationTitle: '시공 제약 사항 안내',
    limitationNote: '※ 배관과 벽체 사이 간격이 지나치게 좁아 분사 노즐 진입이 어려운 특수 구조는 부분 붓 터치 마감 등으로 대체될 수 있습니다.',
    relatedGuideSlugs: ['elastic-coating-preparation-protection-checklist', 'balcony-coating-checklist'],
  },

  // 5. 신길동 탄성코트
  {
    id: 'kg-singil-dong-elastic',
    regionId: 'seoul-yeongdeungpo-신길동',
    serviceKeyword: '탄성코트',
    slug: 'singil-dong-elastic-coating-moisture-dry-check',
    title: '신길동 탄성코트 습기 흔적과 바탕면 건조 상태 점검 | 올케어 시공 가이드',
    h1: '신길동 탄성코트 습기 흔적과 바탕면 건조 상태 점검',
    description: '신길동 탄성코트 시공 전 다용도실과 베란다 벽면의 잔여 습기와 건조 여부를 점검하고 전처리 기준을 확정하는 방법입니다.',
    category: '바탕면 진단 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '신길동 탄성코트 시공에서 도막의 오랜 내구성을 확보하기 위한 기본 전제 조건은 벽면의 완전한 건조입니다. 겉면은 말라 보여도 콘크리트 내부에 습기가 머물러 있으면 도료 안착에 부정적 영향을 미치므로 사전 확인 요령을 안내합니다.',
    sections: [
      {
        h2: '1. 벽면 잔여 수분 및 젖은 부위 육안 판별',
        paragraphs: [
          '세탁기 배수구나 외벽 하단 모서리는 평소 물기가 튀거나 습기가 머물기 쉽습니다. 벽면 색상이 다른 부위보다 짙은 회색을 띠거나 손으로 만졌을 때 차가운 축축함이 느껴진다면 시공 전 충분히 환기해야 합니다.',
          '습기가 남아있는 상태에서 도료를 도포하면 수분이 증발하지 못하고 갇혀 도막 표면의 주름이나 박리를 유발할 수 있습니다.',
        ],
      },
      {
        h2: '2. 시공 당일 자연 환기 환경 조성',
        paragraphs: [
          '작업 전날부터 창문을 적절히 열어두어 맞바람을 통한 공기 순환을 유도하는 것이 좋습니다. 선풍기를 벽면 쪽으로 틀어두어 바탕면의 습기를 최대한 날려주는 사전 준비가 품질 향상에 큰 도움이 됩니다.',
        ],
      },
    ],
    checklistTitle: '습기 및 건조 점검 체크리스트',
    checklistItems: [
      '벽면 표면을 티슈로 눌렀을 때 수분이 묻어나오지 않는가?',
      '걸레받이나 바닥 타일 접합부에 물고임이 없는가?',
      '작업 전날부터 창문을 열어 충분한 환기를 유지하였는가?',
      '보일러나 온풍기를 과도하게 틀어 급격한 온도차를 만들지 않았는가?',
    ],
    limitationTitle: '건조 관리 주의사항',
    limitationNote: '※ 시공 직후 인위적인 고온 난방을 가하면 표면만 급격히 말라 칠이 터질 수 있으므로, 임의 난방 대신 자연 통풍 환경을 유지해야 합니다.',
    relatedGuideSlugs: ['balcony-coating-checklist', 'old-apartment-balcony-recoating-guide'],
  },

  // 6. 대림동 탄성코트
  {
    id: 'kg-daerim-dong-elastic',
    regionId: 'seoul-yeongdeungpo-대림동',
    serviceKeyword: '탄성코트',
    slug: 'daerim-dong-elastic-coating-window-joint-check',
    title: '대림동 탄성코트 창호와 벽면 경계부 도막·실리콘 상태 확인 | 올케어 시공 가이드',
    h1: '대림동 탄성코트 창호와 벽면 경계부 도막·실리콘 상태 확인',
    description: '대림동 탄성코트 시공 전 샤시 창호 프레임과 콘크리트 벽체가 만나는 경계 실리콘 이격 및 도막 탈락을 점검하는 요령입니다.',
    category: '시공 점검 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '대림동 탄성코트 시공을 준비할 때는 창호 프레임 접합부의 상태 점검이 선행되어야 합니다. 창호 실리콘 코킹이 오래되어 벽면에서 떨어져 있으면 빗물 침투나 도막 박리의 원인이 되므로 사전 점검 기준을 정리해 드립니다.',
    sections: [
      {
        h2: '1. 창호 주변 실리콘 경화 및 탈락 점검',
        paragraphs: [
          '창호 샤시 프레임과 벽면 콘크리트 사이를 메우고 있는 실리콘이 자외선과 온도 변화로 경화되면 균열이 발생합니다. 실리콘이 들떠 있는 상태에서 그 위에 탄성코트를 덮으면 마감선이 쉽게 뜯어질 수 있습니다.',
          '벌어진 실리콘 부위는 칼로 정리한 후 전용 변성 실리콘으로 코킹 보수를 진행한 뒤 탄성코트를 도포해야 마감선의 접착력이 유지됩니다.',
        ],
      },
      {
        h2: '2. 창틀 마스킹 커버링 보양의 정밀도',
        paragraphs: [
          '샤시 프레임 표면에 페인트가 묻지 않도록 라인을 따라 마스킹 테이프를 붙여야 합니다. 직선 라인이 반듯하게 정돈되어야 시공 완료 후 테이프를 떼어냈을 때 선명하고 깔끔한 외관이 완성됩니다.',
        ],
      },
    ],
    checklistTitle: '창호 접합부 점검표',
    checklistItems: [
      '샤시 주변 실리콘이 찢어지거나 벽면에서 벌어진 틈이 있는가?',
      '창틀 실리콘 위에 기름기나 오염 물질이 두껍게 쌓여있지 않은가?',
      '비가 온 뒤 창틀 하부에 빗물이 스며든 흔적이 없는가?',
      '창문 손잡이와 잠금장치가 정상 작동하도록 보양 계획이 잡혔는가?',
    ],
    limitationTitle: '실리콘 보수 유의 사항',
    limitationNote: '※ 유성 실리콘(초산형/비초산형 일반 실리콘) 위에는 수성 도료가 부착되지 않으므로, 보수 시 반드시 도장 가능한 수성/변성 실란트를 사용해야 합니다.',
    relatedGuideSlugs: ['balcony-coating-checklist', 'elastic-coating-preparation-protection-checklist'],
  },

  // 7. 양평동 탄성코트
  {
    id: 'kg-yangpyeong-dong-elastic',
    regionId: 'seoul-yeongdeungpo-양평동',
    serviceKeyword: '탄성코트',
    slug: 'yangpyeong-dong-elastic-coating-recoat-scraping',
    title: '양평동 탄성코트 재도장 전 기존 도막 정리 기준 | 올케어 시공 가이드',
    h1: '양평동 탄성코트 재도장 전 기존 도막 정리 기준',
    description: '양평동 탄성코트 시공 전 과거 칠해진 탄성코트나 무늬코트 도막을 정리하고 재도장을 결정하는 기술적 기준을 안내합니다.',
    category: '재시공 진단 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '양평동 탄성코트 재도장을 고려하고 있다면 기존에 시공되어 있던 도료의 층간 부착력을 평가해야 합니다. 과거에 칠한 탄성코트나 바이오세라믹 도막이 노후되어 들뜨기 시작한 상태라면 신규 도포 전 밑작업 범위가 일반 신축보다 넓어집니다.',
    sections: [
      {
        h2: '1. 다층 도막 누적 현장의 박리 위험도',
        paragraphs: [
          '수성 페인트 위에 탄성코트를 여러 차례 덧칠한 다층 도막 구조는 자중(무게)으로 인해 통째로 탈락할 위험이 큽니다.',
          '전체 벽면 중 부착력이 상실된 구역은 스크래퍼와 와이어 브러시로 최대한 긁어내야 하며, 긁어낸 단차는 퍼티로 메워 완만한 경사를 만들어주어야 합니다.',
        ],
      },
      {
        h2: '2. 하도 프라이머(바인더) 침투 도포의 필요성',
        paragraphs: [
          '기존 탄성코트 도막 표면은 미세한 엠보싱 펄 질감이 있어 새 도료의 접착이 균일하지 않을 수 있습니다. 부착 증진을 위한 아크릴 에멀전 바인더 하도를 1차 도포하여 표면을 단단히 굳히는 전처리가 요구됩니다.',
        ],
      },
    ],
    checklistTitle: '재도장 전 도막 점검표',
    checklistItems: [
      '기존 도막을 테이프로 붙였다 뗐을 때 칠이 딸려 올라오지 않는가?',
      '과거 시공된 무늬코트나 탄성코트 껍질이 풍선처럼 부풀어 오른 곳이 있는가?',
      '도막 안쪽에 회색 가루나 곰팡이 오염이 고착되어 있지 않은가?',
      '기존 칠 긁어내기 공정이 포함된 견적 범위인지 확인하였는가?',
    ],
    limitationTitle: '재시공 작업 유의 사항',
    limitationNote: '※ 기존 도막 전체를 전면 강제 철거(올철거)하는 것은 콘크리트 면 파손 위험이 있어 권장되지 않으며, 부실하게 들뜬 부위를 선별 스크래핑하는 방식으로 진행됩니다.',
    relatedGuideSlugs: ['old-apartment-balcony-recoating-guide', 'elastic-coating-estimate-work-scope-guide'],
  },

  // 8. 여의도동 탄성코트
  {
    id: 'kg-yeouido-dong-elastic',
    regionId: 'seoul-yeongdeungpo-여의동',
    serviceKeyword: '탄성코트',
    slug: 'yeouido-dong-elastic-coating-primer-adhesion',
    title: '여의도동 탄성코트 재도장 전 기존 벽면 도막 상태와 하도 판단 | 올케어 시공 가이드',
    h1: '여의도동 탄성코트 재도장 전 기존 벽면 도막 상태와 하도 판단',
    description: '여의도동 탄성코트 시공 전 발코니 벽체의 노후 도막 부착력을 진단하고 프라이머 하도 공정 필요성을 검토하는 가이드입니다.',
    category: '바탕면 진단 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '여의도동 탄성코트 작업을 진행할 때는 베란다 벽면 바탕면의 노후 정도와 이전 도색 이력을 면밀히 확인해야 합니다. 페인트 층이 여러 번 덧발라진 벽면은 표면 부착력이 약화되어 있을 수 있으므로 하도 프라이머 적용 기준을 사전에 검토해야 합니다.',
    sections: [
      {
        h2: '1. 도막 노후화로 인한 분말화(초킹) 상태 진단',
        paragraphs: [
          '오랜 시간 햇빛과 실내 습기에 노출된 페인트는 표면 수지가 분해되어 하얀 가루가 손에 묻어나는 초킹(Chalking) 현상이 일어납니다.',
          '초킹이 발생한 가루 위에는 새 탄성 도료가 부착되지 않고 겉돌게 됩니다. 마른 걸레로 표면 분진을 털어낸 후 고침투성 하도 바인더를 먹여 바탕면을 단단한 피막으로 전환하는 과정이 선행되어야 합니다.',
        ],
      },
      {
        h2: '2. 하도 도포 후 양생 시간 확보',
        paragraphs: [
          '하도 프라이머는 콘크리트 깊숙이 침투하여 굳어야 하므로 도포 후 충분한 양생 시간을 두어야 합니다. 밑작업이 부실하면 최종 마감재의 수명이 급격히 단축되므로 공정 순서를 엄수해야 합니다.',
        ],
      },
    ],
    checklistTitle: '하도 진단 체크리스트',
    checklistItems: [
      '벽면을 손바닥으로 문질렀을 때 흰 페인트 가루가 묻어나는가?',
      '외벽 접합부 모서리에 칠이 얇게 벗겨져 콘크리트가 노출된 곳이 있는가?',
      '하도 프라이머 작업이 견적 내역에 정상적으로 명시되어 있는가?',
      '벽면 정리 후 발생한 분진 청소가 사전 완료되었는가?',
    ],
    limitationTitle: '시공 판단 유의 사항',
    limitationNote: '※ 도막 초킹 현상이 심한 벽면은 하도 프라이머를 충분히 도포해야 하므로, 일반적인 신축 현장 대비 작업 시간이 더 소요될 수 있습니다.',
    relatedGuideSlugs: ['old-apartment-balcony-recoating-guide', 'balcony-coating-checklist'],
  },

  // 9. 도림동 탄성코트
  {
    id: 'kg-dorim-dong-elastic',
    regionId: 'seoul-yeongdeungpo-도림동',
    serviceKeyword: '탄성코트',
    slug: 'dorim-dong-elastic-coating-masking-workspace',
    title: '도림동 탄성코트 보양 범위와 작업 공간 정리 | 올케어 시공 가이드',
    h1: '도림동 탄성코트 보양 범위와 작업 공간 정리',
    description: '도림동 탄성코트 시공 전 바닥 타일, 조명, 계량기 등 비도포 시설물 커버링 보양 범위와 원활한 분사를 위한 작업 동선 확보 요령을 설명합니다.',
    category: '시공 준비 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '도림동 탄성코트 시공은 분사 장비의 고압 뿜칠 공정으로 이뤄지므로 시설물 보양과 동선 정리가 핵심적인 사전 준비 단계입니다. 칠이 튀어서는 안 되는 시설물을 보호하고 작업자가 안정적으로 작업할 수 있는 환경을 갖추는 방법을 안내합니다.',
    sections: [
      {
        h2: '1. 시설물 커버링 마스킹의 표준 범위',
        paragraphs: [
          '베란다 바닥 타일, 수전, 가스계량기, 보일러 컨트롤러, 전등 스위치, 빨래 건조대 등은 비닐 커버링 테이프로 빈틈없이 감싸야 합니다.',
          '마스킹 테이프 접착선이 반듯하게 밀착되지 않으면 분사 압력에 의해 테이프가 들려 도료가 틈새로 번질 수 있습니다. 모서리 칼선 보양이 꼼꼼하게 이뤄졌는지 확인해야 합니다.',
        ],
      },
      {
        h2: '2. 뿜칠 호스 및 작업 반경 확보',
        paragraphs: [
          '콤프레셔와 연결된 분사 호스가 바닥을 지나다니므로 통행로에 장애물이 없어야 합니다. 세탁실 문틀 주변이나 통로에 잔여 물품이 놓여있지 않도록 작업 전 완전히 치워두는 것이 시공 품질과 안전에 직결됩니다.',
        ],
      },
    ],
    checklistTitle: '보양 및 공간 정리 체크리스트',
    checklistItems: [
      '베란다 바닥 타일 전체가 보양 비닐로 덮여 고정되었는가?',
      '보일러나 가스 배관이 있는 경우 해당 부위가 밀폐 보양되었는가?',
      '벽면에 부착된 콘센트와 스위치 커버가 마스킹되었는가?',
      '작업자가 분사건을 들고 자유롭게 이동할 수 있는 통로가 확보되었는가?',
    ],
    limitationTitle: '보양 작업 유의 사항',
    limitationNote: '※ 분사 완료 후 도막이 완전히 건조되기 전에 보양 테이프를 성급하게 떼어내면 도막 끝선이 늘어나거나 찢어질 수 있으므로, 테이프 제거 타이밍을 준수해야 합니다.',
    relatedGuideSlugs: ['elastic-coating-preparation-protection-checklist', 'balcony-coating-checklist'],
  },

  // 10. 영등포구 베란다탄성코트
  {
    id: 'kg-yeongdeungpo-gu-balcony',
    regionId: 'seoul-yeongdeungpo-gu',
    serviceKeyword: '베란다탄성코트',
    slug: 'yeongdeungpo-gu-balcony-coating-prep-checklist',
    title: '영등포구 베란다탄성코트 베란다 시공 전 공간 정리와 준비 체크 | 올케어 시공 가이드',
    h1: '영등포구 베란다탄성코트 베란다 시공 전 공간 정리와 준비 체크',
    description: '영등포구 베란다탄성코트 시공 전 공간 비움 원칙, 대형 가전 이동 협의, 보양 전처리 등 시공 전 필수 확인 체크리스트를 총괄 안내합니다.',
    category: '시공 점검 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '영등포구 베란다탄성코트 시공을 순조롭게 진행하기 위해서는 작업 당일 현장 준비가 차질 없이 이뤄져야 합니다. 공간 내 비치된 집기의 정리와 대형 가전 이동 협의 등 고객과 시공팀이 사전에 조율해야 할 핵심 체크리스트를 정리해 드립니다.',
    sections: [
      {
        h2: '1. 시공 공간 내 수납 물품 사전 반출 원칙',
        paragraphs: [
          '베란다 선반에 보관 중인 세제, 공구, 화분, 수납 바구니 등 모든 생활 집기는 시공 전날까지 다른 방이나 거실로 옮겨두어야 합니다.',
          '물건이 놓여있으면 분사 작업 시 비산 입자가 물품에 묻을 뿐 아니라, 해당 물건이 놓여있던 벽면 부위에는 도료가 도포되지 않아 마감 결손이 발생합니다.',
        ],
      },
      {
        h2: '2. 대형 가전 이동 및 배관 분리 사전 협의',
        paragraphs: [
          '세탁기나 건조기 등 배관이 연결된 대형 가전은 자체 이동 가능 여부와 작업자의 취급 범위를 사전 상담 시 명확히 확인해야 합니다.',
          '직렬 설치된 건조기나 배수 배관이 타이트하게 고정된 기기는 현장 여건에 따라 이동이 제한될 수 있으므로, 가전 뒤편 벽면 도포 범위와 보양 계획을 미리 조율하는 것이 안전합니다.',
        ],
      },
    ],
    checklistTitle: '베란다 공간 준비 체크리스트',
    checklistItems: [
      '베란다 및 세탁실 내부 수납 물품이 모두 반출되었는가?',
      '세탁기 배수 호스 주변 바닥 물기가 닦이고 건조되었는가?',
      '벽면 부착형 빨래건조대 줄이나 선반 소품이 정리되었는가?',
      '가전제품 이동 가능 범위에 대해 시공 담당자와 사전 협의가 끝났는가?',
    ],
    limitationTitle: '시공 공간 준비 안내',
    limitationNote: '※ 시공 작업자가 전기·배관 전문 기사가 아니므로, 특수 결합형 가전이나 복잡한 빌트인 기기의 철거 및 분리는 전문 서비스센터를 통해 사전 조치해 두셔야 합니다.',
    relatedGuideSlugs: ['elastic-coating-preparation-protection-checklist', 'balcony-coating-checklist'],
  },

  // 11. 영등포동 베란다탄성코트
  {
    id: 'kg-yeongdeungpo-dong-balcony',
    regionId: 'seoul-yeongdeungpo-영등포동',
    serviceKeyword: '베란다탄성코트',
    slug: 'yeongdeungpo-dong-balcony-coating-appliance-masking',
    title: '영등포동 베란다탄성코트 세탁기·건조기 주변 보양과 작업 범위 | 올케어 시공 가이드',
    h1: '영등포동 베란다탄성코트 세탁기·건조기 주변 보양과 작업 범위',
    description: '영등포동 베란다탄성코트 시공 시 세탁기와 건조기 뒷면 및 측면 보양 방법과 작업자가 안전하게 분사할 수 있는 이격 거리 기준을 설명합니다.',
    category: '시공 준비 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '영등포동 베란다탄성코트 시공 현장에서 가장 주의 깊게 다뤄지는 영역은 세탁기와 건조기가 설치된 세탁실 공간입니다. 대형 가전 주변의 보양 품질과 분사 가능 범위는 시공 전 확인해야 할 가장 중요한 기술적 협의 사항입니다.',
    sections: [
      {
        h2: '1. 세탁기·건조기 밀폐 보양과 분사 각도',
        paragraphs: [
          '가전을 작업 공간 밖으로 완전히 들어내지 못하는 경우, 가전 전체를 대형 비닐 커버링으로 빈틈없이 감싸 보호합니다.',
          '가전과 벽체 사이 작업 공간이 충분히 확보되어야 분사건의 노즐 각도가 형성되어 벽면에 균일한 두께로 도료를 얹을 수 있습니다. 간격이 좁을 경우 무리한 분사 대신 측면 도포로 범위가 조정될 수 있습니다.',
        ],
      },
      {
        h2: '2. 가전 후면 수전 배관 마스킹',
        paragraphs: [
          '세탁기 급수 호스와 연결된 수전 코브라 밸브는 물이 샐 위험이 있으므로 체결부를 철저히 테이핑해야 합니다. 배수구 주변으로 도료 분진이 유입되지 않도록 거름망 보양도 병행됩니다.',
        ],
      },
    ],
    checklistTitle: '세탁 가전 주변 점검표',
    checklistItems: [
      '세탁기 몸체 전체가 먼지와 도료로부터 빈틈없이 비닐 밀봉되었는가?',
      '벽면과 세탁기 사이에 작업자가 팔을 넣어 분사할 공간이 있는가?',
      '세탁기 상부에 건조기 등이 직렬 설치된 경우 결합부가 흔들림 없이 안전하게 고정되어 있는가?',
      '급수 밸브가 완전히 잠겨 물방울이 떨어지지 않는가?',
    ],
    limitationTitle: '가전 취급 주의 사항',
    limitationNote: '※ 좁은 세탁실 내에서 가전을 이동할 경우 바닥 타일이나 문틀 스크래치 위험이 있으므로, 가전 이동 여부는 현장 바닥 재질과 공간 폭을 확인하여 상호 협의 하에 진행합니다.',
    relatedGuideSlugs: ['elastic-coating-preparation-protection-checklist', 'balcony-coating-checklist'],
  },

  // 12. 당산동 베란다탄성코트
  {
    id: 'kg-dangsan-dong-balcony',
    regionId: 'seoul-yeongdeungpo-당산동',
    serviceKeyword: '베란다탄성코트',
    slug: 'dangsan-dong-balcony-coating-window-silicone-check',
    title: '당산동 베란다탄성코트 창호·실리콘 경계부 상태 점검 | 올케어 시공 가이드',
    h1: '당산동 베란다탄성코트 창호·실리콘 경계부 상태 점검',
    description: '당산동 베란다탄성코트 시공 전 샤시 창호 실리콘 코킹 상태와 모서리 이격 부위를 확인하고 테이핑 라인을 잡는 점검 가이드입니다.',
    category: '시공 점검 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '당산동 베란다탄성코트 시공에서 마감의 시각적 완성도와 내구성을 결정짓는 핵심 부위는 창호 프레임과 벽면이 만나는 실리콘 경계부입니다. 실리콘의 접착 상태에 따라 테이핑 라인이 달라지므로 점검 기준을 안내합니다.',
    sections: [
      {
        h2: '1. 실리콘 계면 곰팡이 오염 및 들뜸 확인',
        paragraphs: [
          '창틀 실리콘 위에 검은 곰팡이가 깊게 침착되어 있으면 표면을 닦아내더라도 실리콘 내부 포자가 남을 수 있습니다. 들뜨거나 삭은 실리콘은 부분 칼질을 통해 걷어내고 다시 코킹해야 탄성코트와의 접착선이 갈라지지 않습니다.',
          '실리콘 표면의 유분기나 습기는 마스킹 테이프의 접착을 방해하므로, 알코올이나 세정제로 표면을 닦아 건조시키는 전처리가 필요합니다.',
        ],
      },
      {
        h2: '2. 마감선 커팅 테이핑의 정확도',
        paragraphs: [
          '창틀 프레임 라인을 따라 미세하게 안쪽으로 테이프를 붙여 실리콘 모서리를 탄성코트가 살짝 덮어주는 방식으로 시공하면 경계면 들뜸을 방지하는 데 효과적입니다.',
        ],
      },
    ],
    checklistTitle: '창호 실리콘 점검 체크리스트',
    checklistItems: [
      '샤시 프레임 주변 실리콘이 손가락으로 눌렀을 때 탄성을 유지하고 있는가?',
      '실리콘 틈새로 찬바람이나 외풍이 새어 들어오지 않는가?',
      '실리콘 표면에 누렇게 변색된 기름때나 찌든 먼지가 없는가?',
      '유리창 모서리에 시공된 실리콘에 상처나 뜯김이 없는가?',
    ],
    limitationTitle: '창호 코킹 유의 사항',
    limitationNote: '※ 실리콘 전면 재코킹(외부 샤시 코킹 포함)은 별도의 창호 방수 공사 영역에 해당하며, 탄성코트 시공 시에는 도장 라인 유지를 위한 내부 실리콘 보수 위주로 진행됩니다.',
    relatedGuideSlugs: ['balcony-coating-checklist', 'elastic-coating-estimate-work-scope-guide'],
  },

  // 13. 문래동 베란다탄성코트
  {
    id: 'kg-mullae-dong-balcony',
    regionId: 'seoul-yeongdeungpo-문래동',
    serviceKeyword: '베란다탄성코트',
    slug: 'mullae-dong-balcony-coating-ceiling-crack-check',
    title: '문래동 베란다탄성코트 천장·배관 주변 균열과 도막 상태 확인 | 올케어 시공 가이드',
    h1: '문래동 베란다탄성코트 천장·배관 주변 균열과 도막 상태 확인',
    description: '문래동 베란다탄성코트 시공 전 상부 천장 슬래브와 관통 배관 주변의 크랙 및 페인트 부착 상태를 확인하는 기준을 안내합니다.',
    category: '바탕면 진단 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '문래동 베란다탄성코트 현장에서는 천장 부위의 벽면 상태를 꼼꼼히 점검해야 합니다. 상부층 배관 슬리브 관통부나 천장 슬래브 모서리는 미세 균열이 자주 생기는 구역이므로 시공 전 확인해야 할 포인트를 정리해 드립니다.',
    sections: [
      {
        h2: '1. 천장 배관 주변 원형 슬리브 크랙 점검',
        paragraphs: [
          '위층에서 내려오는 배수관이 천장을 관통하는 슬리브 주변은 진동과 온도 변화로 인해 원형 실금이 발생하기 쉽습니다.',
          '이 틈새를 방치하고 페인트만 도포하면 건조 후 균열선이 그대로 비쳐 나옵니다. 탄성 퍼티로 틈새를 꼼꼼히 메우고 평탄화한 후 분사해야 균일한 질감이 연출됩니다.',
        ],
      },
      {
        h2: '2. 천장 콘크리트 바탕면의 부착 강도 확인',
        paragraphs: [
          '천장 부위는 중력 방향으로 하중을 받기 때문에 벽면보다 칠의 탈락 위험이 더 큽니다. 막대나 도구로 천장 도막을 두드려 속이 빈 둔탁한 소리가 나는지 점검하고, 들뜬 부위는 꼼꼼히 긁어내야 합니다.',
        ],
      },
    ],
    checklistTitle: '천장 및 상부 배관 점검표',
    checklistItems: [
      '천장 배관 주변에 동심원 형태의 균열선이 관찰되는가?',
      '천장 콘크리트 표면에 물방울이 맺힌 흔적이나 갈색 얼룩이 없는가?',
      '손을 뻗어 두드렸을 때 껍질이 떨어져 내리는 페인트가 없는가?',
      '천장 전등 기구 주변의 보양 작업이 계획되어 있는가?',
    ],
    limitationTitle: '상부 누수 관련 주의사항',
    limitationNote: '※ 위층 배관 누수로 인해 천장 콘크리트가 젖어있는 상태라면 탄성코트 시공을 진행할 수 없으며, 상부층 배관 누수 보수 및 건조가 선행되어야 합니다.',
    relatedGuideSlugs: ['old-apartment-balcony-recoating-guide', 'balcony-coating-checklist'],
  },

  // 14. 신길동 베란다탄성코트
  {
    id: 'kg-singil-dong-balcony',
    regionId: 'seoul-yeongdeungpo-신길동',
    serviceKeyword: '베란다탄성코트',
    slug: 'singil-dong-balcony-coating-utility-moisture-check',
    title: '신길동 베란다탄성코트 다용도 공간의 습기 흔적과 도막 상태 확인 | 올케어 시공 가이드',
    h1: '신길동 베란다탄성코트 다용도 공간의 습기 흔적과 도막 상태 확인',
    description: '신길동 베란다탄성코트 시공 전 보일러실 및 세탁 다용도실의 습기 정체 상태와 기존 칠의 곰팡이 오염을 점검하는 요령입니다.',
    category: '바탕면 진단 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '신길동 베란다탄성코트 시공을 준비할 때는 다용도실과 보일러실 벽면의 통풍 여건과 습기 정체 흔적을 확인해야 합니다. 물 사용 빈도가 높은 공간인 만큼 도막의 초기 안착과 양생 환경을 올바르게 조성하는 것이 관건입니다.',
    sections: [
      {
        h2: '1. 보일러 배관 주변과 구석 코너의 습기 흔적',
        paragraphs: [
          '보일러 연통 관통부나 하부 난방 배관 분배기 주변은 온도차가 집중되는 영역입니다. 구석 모서리에 검은 얼룩이나 습기 번짐이 있다면 표면 오염을 닦아내고 바짝 말려야 합니다.',
          '오염된 바탕면 위에 바로 도료를 덮으면 얼룩 성분이 도막 위로 배어나올 수 있으므로, 하도 차폐 프라이머 공정이 필요한지 대조해야 합니다.',
        ],
      },
      {
        h2: '2. 시공 후 자연 통풍 경로 확보',
        paragraphs: [
          '밀폐된 다용도실은 창문 개방 각도가 좁을 수 있습니다. 방문과 베란다 창문을 동시에 열어 환기 경로를 만들어주어야 도막 내부의 수분이 원활히 증발합니다.',
        ],
      },
    ],
    checklistTitle: '다용도실 점검 체크리스트',
    checklistItems: [
      '보일러 분배기 주변 벽면에 결로 물방울이 맺혀있지 않은가?',
      '벽체 하단부에 축축한 습기가 올라오는 흔적이 없는가?',
      '세탁 세제나 선반 용품이 작업 공간에서 완전히 치워졌는가?',
      '시공 후 맞바람이 통할 수 있는 통풍 창문이 확보되어 있는가?',
    ],
    limitationTitle: '시공 환경 관리 안내',
    limitationNote: '※ 시공 당일 강우나 고습도 날씨가 지속될 경우 도막 건조 시간이 길어질 수 있으므로, 현장 습도 측정 결과에 따라 일정이 조정될 수 있습니다.',
    relatedGuideSlugs: ['balcony-coating-checklist', 'old-apartment-balcony-recoating-guide'],
  },

  // 15. 대림동 베란다탄성코트
  {
    id: 'kg-daerim-dong-balcony',
    regionId: 'seoul-yeongdeungpo-대림동',
    serviceKeyword: '베란다탄성코트',
    slug: 'daerim-dong-balcony-coating-frame-peeling-check',
    title: '대림동 베란다탄성코트 창틀 주변 기존 도막 박리 상태 점검 | 올케어 시공 가이드',
    h1: '대림동 베란다탄성코트 창틀 주변 기존 도막 박리 상태 점검',
    description: '대림동 베란다탄성코트 시공 전 샤시 창틀 하단부의 페인트 껍질 벗겨짐과 스크래핑 보수 범위를 확인하는 기술 가이드입니다.',
    category: '시공 점검 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '대림동 베란다탄성코트 시공 시 창틀 하단부는 외부 기후에 가장 취약한 위치입니다. 빗물이나 창호 결로수로 인해 도막이 불어나 들뜨는 현상이 잦으므로, 작업 전 박리 상태를 정밀하게 진단하는 요령을 안내합니다.',
    sections: [
      {
        h2: '1. 창틀 하부 도막 부풂(블리스터링) 현상 확인',
        paragraphs: [
          '창틀 아랫벽면 페인트가 물집처럼 부풀어 올라 있다면 내부 콘크리트와 페인트 사이의 결속이 깨진 상태입니다. 부풀어 오른 껍질을 터뜨리고 헤라로 밀어내어 들뜬 페인트를 완전히 털어내야 합니다.',
          '벗겨진 자리의 울퉁불퉁한 경계면은 방수 퍼티로 살을 채워 넣어 평탄하게 맞춘 뒤 건조시켜야 고른 도막 두께가 나옵니다.',
        ],
      },
      {
        h2: '2. 하부 타일 턱 실리콘 마감 확인',
        paragraphs: [
          '베란다 바닥 타일과 벽체가 만나는 걸레받이 턱 부분의 실리콘이 찢어져 있으면 바닥 청소 시 물이 벽면 속으로 스며듭니다. 탄성코트 시공 전 하부 실리콘 상태를 확인하고 보수 계획을 세워야 합니다.',
        ],
      },
    ],
    checklistTitle: '창틀 하부 박리 점검표',
    checklistItems: [
      '창틀 하단 벽면 페인트를 손으로 눌렀을 때 부스럭거리며 깨지는가?',
      '들뜬 페인트 안쪽에 거뭇한 곰팡이나 물자국이 관찰되는가?',
      '스크래퍼로 부실 도막을 긁어낼 범위가 사전에 확인되었는가?',
      '바닥 타일과 벽면 경계 실리콘에 벌어진 틈이 없는가?',
    ],
    limitationTitle: '밑작업 범위 안내',
    limitationNote: '※ 창틀 하부의 페인트 박리가 극심한 경우 퍼티 도포 및 건조 공정이 반복되므로, 작업 시간에 여유를 두고 일정을 조율해야 합니다.',
    relatedGuideSlugs: ['balcony-coating-checklist', 'elastic-coating-estimate-work-scope-guide'],
  },

  // 16. 양평동 베란다탄성코트
  {
    id: 'kg-yangpyeong-dong-balcony',
    regionId: 'seoul-yeongdeungpo-양평동',
    serviceKeyword: '베란다탄성코트',
    slug: 'yangpyeong-dong-balcony-coating-recoat-condition',
    title: '양평동 베란다탄성코트 기존 베란다 재시공 전 도막 상태 판단 | 올케어 시공 가이드',
    h1: '양평동 베란다탄성코트 기존 베란다 재시공 전 도막 상태 판단',
    description: '양평동 베란다탄성코트 시공을 계획할 때 기존에 칠해진 바이오세라믹 도막의 수명을 진단하고 덧칠 가능 여부를 판단하는 기준입니다.',
    category: '재시공 진단 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '양평동 베란다탄성코트 재시공은 신축 입주 시공과는 다른 기술적 접근이 필요합니다. 이미 기존에 탄성코트나 바이오세라믹이 칠해져 있는 베란다는 기존 칠의 부착 강도를 확인하여 전체 철거, 부분 긁어내기, 하도 도포 중 최적의 공정을 선택해야 합니다.',
    sections: [
      {
        h2: '1. 기존 탄성 도막의 부착 테스트 방법',
        paragraphs: [
          '벽면 여러 군데에 강력 접착 테이프를 붙였다가 떼어내는 간이 부착력 테스트를 진행합니다. 테이프에 기존 칠이 뜯겨 나온다면 바탕면 부착력이 한계에 달한 상태이므로 광범위한 스크래핑이 필요합니다.',
          '기존 칠이 견고하게 붙어있다면 들뜬 국소 부위만 정리하고 고접착 프라이머를 바른 뒤 덧도포하는 방식으로 안전하게 시공할 수 있습니다.',
        ],
      },
      {
        h2: '2. 펄 입자 및 기존 패턴 단차 보정',
        paragraphs: [
          '과거 제품의 펄 입자가 굵거나 거친 질감일 경우, 긁어낸 부위와 남아있는 부위의 경계 단차가 두드러질 수 있습니다. 퍼티 면처리로 완만하게 단차를 잡는 세심한 밑작업이 요구됩니다.',
        ],
      },
    ],
    checklistTitle: '베란다 재시공 자가 진단표',
    checklistItems: [
      '벽면을 손바닥으로 문질렀을 때 탄성 알갱이가 우수수 떨어지는가?',
      '기존 도막이 고무 껍질처럼 길게 벗겨지는 부위가 있는가?',
      '이전 시공 후 몇 년이 경과하였는지 시공 이력을 확인하였는가?',
      '밑작업에 소요되는 추가 보수 공정이 견적에 포함되었는가?',
    ],
    limitationTitle: '재시공 공정 유의 사항',
    limitationNote: '※ 바탕면 상태가 극도로 취약한 현장은 긁어내기 범위가 예상보다 넓어질 수 있으며, 이는 사전에 현장 상태를 보고 투명하게 안내해 드립니다.',
    relatedGuideSlugs: ['old-apartment-balcony-recoating-guide', 'elastic-coating-estimate-work-scope-guide'],
  },

  // 17. 여의도동 베란다탄성코트
  {
    id: 'kg-yeouido-dong-balcony',
    regionId: 'seoul-yeongdeungpo-여의동',
    serviceKeyword: '베란다탄성코트',
    slug: 'yeouido-dong-balcony-coating-corner-surface-check',
    title: '여의도동 베란다탄성코트 창호 주변·모서리·기존 도막 상태 점검 | 올케어 시공 가이드',
    h1: '여의도동 베란다탄성코트 창호 주변·모서리·기존 도막 상태 점검',
    description: '여의도동 베란다탄성코트 시공 전 외벽 접촉 모서리와 창호 주변 도막의 부착 상태를 점검하고 틈새 보수 전처리를 진행하는 요령입니다.',
    category: '시공 점검 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '여의도동 베란다탄성코트 시공에서는 창호 주변과 벽체가 교차하는 외벽 모서리의 도막 상태를 면밀히 점검해야 합니다. 외기와 바로 맞닿는 모서리 영역은 온도 변화 폭이 크므로 들뜬 칠을 확실히 정리하고 분사해야 도막이 오랜 시간 안정적으로 유지됩니다.',
    sections: [
      {
        h2: '1. 외벽 모서리 교차 접합부 균열 점검',
        paragraphs: [
          '창호 프레임, 외벽 콘크리트, 천장 슬래브가 교차하는 모서리는 수축 팽창에 의해 미세한 실금이 발생하기 쉽습니다.',
          '갈라진 모서리 틈새에 탄성 변성 실란트를 얇게 충진하여 틈을 메운 뒤 탄성코트를 도포해야 건조 후 갈라짐 현상을 예방할 수 있습니다.',
        ],
      },
      {
        h2: '2. 샷시 주변 기밀성과 누수 흔적 확인',
        paragraphs: [
          '비가 내릴 때 창틀 틈새로 미세한 빗물이 유입되는지 미리 확인해야 합니다. 누수로 인해 벽체가 젖어있다면 탄성 도료가 접착되지 않으므로, 창호 방수 상태 확인이 선행되어야 합니다.',
        ],
      },
    ],
    checklistTitle: '모서리 및 창호 점검표',
    checklistItems: [
      '외벽 모서리 구석에 실금이나 칠 갈라짐이 관찰되는가?',
      '창틀 실리콘 이음매 주변에 물자국이나 변색 흔적이 없는가?',
      '들뜬 구형 도막이 모서리를 따라 벗겨져 있지 않은가?',
      '작업 당일 창호 주변 환기 경로가 충분히 열릴 수 있는가?',
    ],
    limitationTitle: '시공 한계 안내',
    limitationNote: '※ 탄성코트는 외벽 창틀을 뚫고 들어오는 외부 빗물 누수를 막아주는 외부 방수 공사가 아니므로, 외부 코킹 하자가 의심될 경우 외부 방수 보수가 선행되어야 합니다.',
    relatedGuideSlugs: ['balcony-coating-checklist', 'old-apartment-balcony-recoating-guide'],
  },

  // 18. 도림동 베란다탄성코트
  {
    id: 'kg-dorim-dong-balcony',
    regionId: 'seoul-yeongdeungpo-도림동',
    serviceKeyword: '베란다탄성코트',
    slug: 'dorim-dong-balcony-coating-fixture-masking-safety',
    title: '도림동 베란다탄성코트 고정 시설물 주변 보양 범위와 작업 공간 확보 | 올케어 시공 가이드',
    h1: '도림동 베란다탄성코트 고정 시설물 주변 보양 범위와 작업 공간 확보',
    description: '도림동 베란다탄성코트 시공 전 보일러, 가스배관, 선반 브래킷 등 벽면 고정 시설물의 커버링 보양과 분사 안전거리 확보 기준을 설명합니다.',
    category: '시공 준비 가이드',
    publishedAt: KEYWORD_GUIDE_PUBDATE,
    publishedAtRfc822: KEYWORD_GUIDE_PUBDATE_RFC822,
    intro: '도림동 베란다탄성코트 시공을 준비할 때는 벽면에 부착된 다양한 시설물의 보양 범위를 명확히 확인해야 합니다. 분사 시 고압으로 비산하는 도료 입자로부터 기기를 보호하고, 벽면에는 균일한 두께로 도포될 수 있도록 작업 공간을 확보하는 요령을 안내합니다.',
    sections: [
      {
        h2: '1. 고정 부착 시설물 마스킹 기법',
        paragraphs: [
          '벽면에 고정된 가스보일러 본체나 연통, 벽걸이 선반 등 부착 시설물이 있는 경우 분리하지 않고 비닐로 정밀 마스킹합니다.',
          '시설물과 벽면이 맞닿는 테두리 라인을 따라 마스킹 테이프를 정밀하게 부착해야 분사 후 테이프를 제거했을 때 칼로 자른 듯 깨끗한 마감선이 나옵니다.',
        ],
      },
      {
        h2: '2. 작업자의 안전한 뿜칠 동선 확보',
        paragraphs: [
          '스프레이 분사는 도료 통과 콤프레셔 라인이 연결된 작업자가 일정 거리를 유지하며 이동해야 합니다. 바닥에 잔여 집기가 남아있으면 호스가 걸려 균일한 분사가 방해받으므로 바닥 비움이 철저해야 합니다.',
        ],
      },
    ],
    checklistTitle: '고정 시설물 보양 점검표',
    checklistItems: [
      '보일러나 배관 등 고정 시설물이 있는 경우 비닐로 안전하게 감싸졌는가?',
      '벽면에 고정된 선반의 물품이 모두 비워졌는가?',
      '벽면 콘센트와 스위치 박스에 도료 유입 방지 조치가 되었는가?',
      '작업자가 분사건을 수평으로 움직일 수 있는 바닥 공간이 확보되었는가?',
    ],
    limitationTitle: '보양 안내 사항',
    limitationNote: '※ 탈거 가능한 수납 선반은 작업 전 미리 떼어내 두시면 선반 뒤편 벽면까지 일체감 있게 도포할 수 있으므로, 선반 탈거 여부를 시공 전 조율하시기 바랍니다.',
    relatedGuideSlugs: ['elastic-coating-preparation-protection-checklist', 'balcony-coating-checklist'],
  },

  // 19. 동작구 탄성코트 (동작구 GU Guide)
  {
    id: 'kg-dongjak-gu-elastic',
    regionId: 'seoul-dongjak-gu',
    serviceKeyword: '탄성코트',
    slug: 'dongjak-gu-elastic-coating-surface-scope',
    title: '동작구 탄성코트 기존 도막 상태와 필요한 바탕면 정리 범위 확인 | 올케어 시공 가이드',
    h1: '동작구 탄성코트 기존 도막 상태와 필요한 바탕면 정리 범위 확인',
    description: '동작구 아파트 및 다세대 베란다 탄성코트 시공 전 기존 페인트 들뜸, 박리 상태를 육안 점검하고 바탕면 스크래핑 및 퍼티 보수 범위를 판단하는 기준을 설명합니다.',
    category: '시공 점검 가이드',
    publishedAt: DONGJAK_GEUMCHEON_GUIDE_PUBDATE,
    publishedAtRfc822: DONGJAK_GEUMCHEON_GUIDE_PUBDATE_RFC822,
    intro: '동작구 지역의 아파트와 빌라, 다세대 주택 베란다는 준공 연식과 환기 환경에 따라 기존 벽면 도막의 노후 상태가 다양합니다. 탄성코트 재도포를 진행하기 전 기존 수성 페인트의 부착력 저하 부위와 균열을 사전 점검하여 올바른 밑작업 범위를 설정하는 것이 중요합니다.',
    sections: [
      {
        h2: '1. 기존 수성 도막의 들뜸 및 탈락 흔적 점검',
        paragraphs: [
          '외벽과 직접 맞닿은 베란다 외벽면이나 창호 주변은 계절별 실내외 기온차로 인해 기존 페인트가 부풀거나 부스러지는 현상이 발생하기 쉽습니다. 손가락이나 스크래퍼 헤라로 가볍게 밀었을 때 쉽게 떨어져 나가는 부실 도막은 완전히 긁어내어 제거해야 합니다.',
          '부착력이 상실된 구형 도막 위에 그대로 탄성코트를 도포하면 신규 도막의 무게와 건조 장력으로 인해 기존 칠이 함께 떨어져 나갈 위험이 있으므로 들뜬 면적을 정확히 확인하는 것이 필수적입니다.',
        ],
      },
      {
        h2: '2. 콘크리트 미세 균열 및 바탕면 보수 범위 확인',
        paragraphs: [
          '베란다 벽체에 발생한 실금(헤어크랙)이나 선반 고정용 타공 자국 등은 분사 전 퍼티 메꿈 공정을 거쳐 평탄화해야 합니다. 탄성코트는 표면 탄성과 질감을 주는 기능성 도료이지만 구조적 단차나 깊은 균열을 메워주는 충전재는 아닙니다.',
          '시공 범위 내 균열과 요철 부위에 하도 및 바탕 정리가 충실히 반영되는지 사전에 확인하는 것이 매끄러운 마감 품질을 확보하는 핵심입니다.',
        ],
      },
      {
        h2: '3. 고압 분사 작업을 위한 공간 및 동선 확보',
        paragraphs: [
          '탄성코트는 전용 콤프레샤와 에어건을 사용해 균일하게 분사하는 공정입니다. 세탁기, 건조기, 선반 등 기존 수납 설비가 벽면에 밀착되어 있으면 분사 각도 확보가 어려우므로 작업 전 적정 작업 반경을 확보해 두어야 합니다.',
        ],
      },
    ],
    checklistTitle: '시공 전 바탕면 점검 체크리스트',
    checklistItems: [
      '베란다 외벽 모서리나 창틀 하단에 페인트 들뜸 흔적이 있는가?',
      '벽체 표면에 퍼티 보수가 필요한 균열이나 타공 구멍이 존재하는가?',
      '벽면 표면에 습기나 물기가 남아있지 않고 건조 상태인가?',
      '시공 구역 내 이동 가능한 수납물과 집기가 정리되었는가?',
    ],
    limitationTitle: '시공 안내 시 유의 사항',
    limitationNote: '※ 본 안내는 베란다 바탕면 점검 시 필요한 일반적 기술 기준을 제시한 것입니다. 탄성코트는 결로 완화 보조 기능을 갖춘 기능성 도료 마감재이며, 건물의 구조적 누수나 외벽 방수 결함, 단열재 미시공 하자를 근본적으로 대체하는 것은 아닙니다.',
    relatedGuideSlugs: ['balcony-coating-checklist', 'elastic-coating-estimate-work-scope-guide'],
  },

  // 20. 동작구 베란다탄성코트 (동작구 GU Guide)
  {
    id: 'kg-dongjak-gu-balcony',
    regionId: 'seoul-dongjak-gu',
    serviceKeyword: '베란다탄성코트',
    slug: 'dongjak-gu-balcony-coating-prep-workspace',
    title: '동작구 베란다탄성코트 시공 전 작업 공간 확보와 보양 범위 확인 | 올케어 시공 가이드',
    h1: '동작구 베란다탄성코트 시공 전 작업 공간 확보와 보양 범위 확인',
    description: '동작구 베란다 및 세탁실 탄성코트 시공 전 보일러, 수전, 가스배관 등 시설물 보양과 고압 분사를 위한 작업 동선 확보 기준을 안내합니다.',
    category: '시공 준비 가이드',
    publishedAt: DONGJAK_GEUMCHEON_GUIDE_PUBDATE,
    publishedAtRfc822: DONGJAK_GEUMCHEON_GUIDE_PUBDATE_RFC822,
    intro: '동작구 지역 베란다와 다용도실은 보일러, 가스계량기, 배수배관, 창호 등 다양한 설비가 집중되어 있습니다. 탄성코트 분사 작업 시 도료가 시설물에 튀지 않도록 철저한 비닐 보양을 진행하고, 원활한 분사 작업을 위한 사전 공간 확보 요령을 정리합니다.',
    sections: [
      {
        h2: '1. 보일러 및 배관 설비 주변 커버링 보양',
        paragraphs: [
          '가스보일러 본체와 연통 연결부, 수전, 가스계량기, 콘센트 등은 도료가 묻어서는 안 되는 주요 설비입니다. 전용 마스킹 테이프와 커버링 비닐을 사용해 도막 경계선이 깔끔하게 떨어지도록 정밀하게 밀착 보양해야 합니다.',
          '보양 라인이 비뚤어지거나 느슨하게 부착되면 분사 시 압력으로 인해 틈새로 도료가 유입될 수 있으므로 테이프 부착면의 먼지를 닦아내고 탄탄하게 밀봉해야 합니다.',
        ],
      },
      {
        h2: '2. 창호 및 샷시 실리콘 경계면 보호',
        paragraphs: [
          '창호 유리창과 알루미늄 또는 하이샷시 프레임, 실리콘 코킹 부위는 꼼꼼하게 차단 보양되어야 합니다. 특히 실리콘 경계면은 도료가 침범하지 않도록 직선 라인을 따라 정교하게 테이핑해야 시공 후 깔끔한 마감선이 나옵니다.',
        ],
      },
      {
        h2: '3. 작업 통로 및 분사 장비 반입 반경 확보',
        paragraphs: [
          '고압 호스와 분사 장비가 베란다 내부로 진입해야 하므로 현관에서 베란다까지 이어지는 실내 동선에 간섭물이 없어야 합니다. 세탁실 내 대형 가전이 벽면과 지나치게 가까운 경우 사전 점검을 통해 시공 가능 여부를 조율해야 합니다.',
        ],
      },
    ],
    checklistTitle: '시공 전 보양 및 환경 점검 체크리스트',
    checklistItems: [
      '보일러 본체 및 연통, 가스배관 주변에 보양 공간이 확보되었는가?',
      '샷시 창문과 방충망, 유리면에 도료 비산 방지 조치가 가능한가?',
      '세탁기와 건조기 주변으로 작업자가 진입할 수 있는 통로가 있는가?',
      '시공 후 충분한 자연 환기를 위한 창호 개방이 가능한 상태인가?',
    ],
    limitationTitle: '시공 안내 시 유의 사항',
    limitationNote: '※ 본 가이드는 보양 및 작업 공간 준비를 위한 실무 기준을 제시한 것입니다. 탄성코트 시공은 도료 분사 마감 공정이며, 배관 자체의 노후 누수나 창호 코킹 불량으로 인한 외부 빗물 유입은 사전 전문 설비 보수가 선행되어야 합니다.',
    relatedGuideSlugs: ['elastic-coating-preparation-protection-checklist', 'balcony-coating-checklist'],
  },

  // 21. 금천구 탄성코트 (금천구 GU Guide)
  {
    id: 'kg-geumcheon-gu-elastic',
    regionId: 'seoul-geumcheon-gu',
    serviceKeyword: '탄성코트',
    slug: 'geumcheon-gu-elastic-coating-crack-repair',
    title: '금천구 탄성코트 미세 균열 및 기존 도막 상태에 따른 보수 범위 확인 | 올케어 시공 가이드',
    h1: '금천구 탄성코트 미세 균열 및 기존 도막 상태에 따른 보수 범위 확인',
    description: '금천구 주거공간 탄성코트 시공 전 베란다 벽체의 미세 균열, 구형 페인트 탈락 상태를 점검하고 퍼티 메꿈 등 밑작업 필요 범위를 확인하는 기준을 제공합니다.',
    category: '바탕면 진단 가이드',
    publishedAt: DONGJAK_GEUMCHEON_GUIDE_PUBDATE,
    publishedAtRfc822: DONGJAK_GEUMCHEON_GUIDE_PUBDATE_RFC822,
    intro: '금천구 관내 주거시설 베란다는 건축 연도와 외기 노출 환경에 따라 벽면 콘크리트의 미세 크랙이나 기존 도막의 박리 양상이 다르게 나타납니다. 내구성 높은 탄성코트 마감을 구현하기 위해 시공 전 필수적으로 거쳐야 할 균열 진단과 보수 기준을 안내합니다.',
    sections: [
      {
        h2: '1. 콘크리트 미세 균열 및 실금의 유형 파악',
        paragraphs: [
          '창틀 모서리나 벽체 연결부에서 시작되는 미세 헤어크랙은 온도 변화에 따른 건축물의 수축·팽창 과정에서 흔히 발생합니다. 단순 표면 실금은 탄성 퍼티로 보수가 가능하지만, 단차가 심한 균열은 하도 프라이머와 보수재의 적절한 병행 처리가 필요합니다.',
          '육안으로 보이는 균열의 폭과 깊이를 사전에 확인하여 밑작업 공정에 필요한 부자재와 보수 시간을 확보해야 합니다.',
        ],
      },
      {
        h2: '2. 노후 수성 칠 박리 및 표면 가루 발생 상태 확인',
        paragraphs: [
          '기존 베란다 벽면에 도포된 페인트가 산화되어 손으로 문질렀을 때 흰 가루가 묻어나오거나(초킹 현상), 도막이 껍질처럼 벗겨지는 상태라면 접착력이 크게 저하된 것입니다.',
          '가루가 일어나는 벽면이나 부실 도막 부위는 스크래핑 후 바인더 하도 처리를 통해 바탕면 콘크리트를 단단하게 안정화시킨 뒤 도포를 진행해야 합니다.',
        ],
      },
      {
        h2: '3. 곰팡이 오염 부위의 멸균 및 건조 상태 확인',
        paragraphs: [
          '습기가 정체되기 쉬운 베란다 구석이나 가구 뒤편에 곰팡이가 번식한 흔적이 있다면 단순 덮기 방식이 아닌 곰팡이 제거 및 항균 처리가 선행되어야 합니다. 멸균 작업 후 벽면이 완전 건조된 상태에서 시공이 이루어져야 도막 내구성이 확보됩니다.',
        ],
      },
    ],
    checklistTitle: '시공 전 바탕면 진단 체크리스트',
    checklistItems: [
      '베란다 벽면에 손으로 문질렀을 때 하얀 가루나 페인트 조각이 묻어나는가?',
      '벽체 모서리나 창틀 주변에 퍼티 작업이 필요한 실금이 있는가?',
      '구석 벽면에 곰팡이 흔적이 남아있어 사전 멸균 처리가 필요한가?',
      '외벽 결로로 인한 축축한 습기가 완전히 마른 상태인가?',
    ],
    limitationTitle: '시공 안내 시 유의 사항',
    limitationNote: '※ 본 내용은 베란다 균열 및 도막 진단을 돕기 위한 기술적 가이드입니다. 탄성코트는 결로 완화 보조 기능을 갖춘 기능성 도료 마감재이며, 외벽 크랙 누수나 배관 결함 등 건물 구조 하자를 차단하는 공사는 아닙니다.',
    relatedGuideSlugs: ['old-apartment-balcony-recoating-guide', 'balcony-coating-checklist'],
  },

  // 22. 금천구 베란다탄성코트 (금천구 GU Guide)
  {
    id: 'kg-geumcheon-gu-balcony',
    regionId: 'seoul-geumcheon-gu',
    serviceKeyword: '베란다탄성코트',
    slug: 'geumcheon-gu-balcony-coating-fixture-masking',
    title: '금천구 베란다탄성코트 창호 주변과 고정 시설물 주변의 작업 가능 범위 및 보양 확인 | 올케어 시공 가이드',
    h1: '금천구 베란다탄성코트 창호 주변과 고정 시설물 주변의 작업 가능 범위 및 보양 확인',
    description: '금천구 베란다탄성코트 도포 전 창호 실리콘 코킹 부위, 계량기, 선반 등 고정 시설물 간섭 여부와 보양 테이핑 기준을 안내합니다.',
    category: '보양 및 환경 가이드',
    publishedAt: DONGJAK_GEUMCHEON_GUIDE_PUBDATE,
    publishedAtRfc822: DONGJAK_GEUMCHEON_GUIDE_PUBDATE_RFC822,
    intro: '금천구 아파트와 주택 베란다는 공간 활용을 위해 다양한 선반, 빨래건조대, 배관 설비가 설치되어 있는 경우가 많습니다. 베란다탄성코트 시공 전 고정 시설물과 창호 주변의 보양 작업이 어떻게 이루어지는지 알아두시면 공정 이해에 도움이 됩니다.',
    sections: [
      {
        h2: '1. 고정 선반 및 시설물 탈거와 밀착 보양 판단',
        paragraphs: [
          '벽면에 나사로 체결된 벽선반이나 옷걸이봉 등은 도포 전 분리 가능한 부품을 탈거하는 것이 벽면 전체의 일관된 마감을 위해 유리합니다. 분리가 불가능하거나 고정된 설비는 비닐과 마스킹 테이프로 틈새 없이 감싸는 보양 작업이 진행됩니다.',
          '계량기, 콘센트, 수도꼭지 등은 도료가 묻지 않도록 꼼꼼히 차단되며, 밸브 조작이나 안전 점검에 지장이 없도록 시공 후 비닐을 제거합니다.',
        ],
      },
      {
        h2: '2. 창틀 실리콘 코킹 상태와 마스킹 라인 점검',
        paragraphs: [
          '창호 샷시와 벽체가 만나는 조인트 부위의 실리콘이 노후되어 들뜨거나 갈라져 있다면 마스킹 전 상태를 점검해야 합니다. 불량 실리콘 위에 그대로 마스킹 테이프를 붙였다 떼어내면 기존 실리콘이 함께 떨어져 나갈 수 있으므로 주의가 필요합니다.',
        ],
      },
      {
        h2: '3. 시공 후 자연 환기 및 충분한 건조 여건 마련',
        paragraphs: [
          '탄성코트 분사 후에는 도막이 안정적으로 경화될 수 있도록 계절과 날씨에 맞춰 자연 환기가 이루어져야 합니다. 시공 직후 창문을 살짝 열어 통풍을 유도하고, 도막이 마르기 전까지 손으로 만지거나 물이 닿지 않도록 관리해야 합니다.',
        ],
      },
    ],
    checklistTitle: '시공 전 시설물 및 보양 점검 체크리스트',
    checklistItems: [
      '벽면에 부착된 분리 가능한 선반이나 소품을 미리 탈거해 두었는가?',
      '수도꼭지, 가스계량기, 보일러 컨트롤러 주변에 보양 테이핑이 가능한가?',
      '창호 실리콘 주변에 탈락이나 누수 흔적이 없는가?',
      '도포 후 건조를 위해 창문을 안전하게 열어둘 수 있는 환경인가?',
    ],
    limitationTitle: '시공 안내 시 유의 사항',
    limitationNote: '※ 본 가이드는 베란다 보양 작업 및 환경 점검을 돕기 위해 작성되었습니다. 탄성코트는 표면 도막 마감 공정이며, 기존 샷시 코킹의 노후 누수나 외부 빗물 침투 문제는 별도의 창호 코킹 방수 보수가 필요합니다.',
    relatedGuideSlugs: ['elastic-coating-preparation-protection-checklist', 'balcony-coating-checklist'],
  },
] as const;

/**
 * Retrieves a Keyword Guide entry by its slug.
 */
export function getKeywordGuideBySlug(slug: string): KeywordGuideEntry | undefined {
  return KEYWORD_GUIDES.find((g) => g.slug === slug);
}

/**
 * Retrieves all Keyword Guide entries.
 */
export function getAllKeywordGuides(): readonly KeywordGuideEntry[] {
  return KEYWORD_GUIDES;
}

/**
 * Finds a Keyword Guide matching a specific region and service keyword.
 */
export function getKeywordGuideForDynamic(
  regionId: string,
  serviceKeyword: ServiceKeyword
): KeywordGuideEntry | undefined {
  return KEYWORD_GUIDES.find(
    (g) => g.regionId === regionId && g.serviceKeyword === serviceKeyword
  );
}

/**
 * Converts a KeywordGuideEntry into the standard GuideArticle interface.
 * Safely derives canonical, related links (with 1:1 dynamic landing link first).
 */
export function toGuideArticle(entry: KeywordGuideEntry, _origin?: string): GuideArticle {
  const region = PRODUCTION_REGIONS.find((r) => r.id === entry.regionId);
  const regionName = region?.keywordRegionName || region?.displayName || '지역';
  const dynamicHref = buildPublicHref(regionName, entry.serviceKeyword);

  // 1:1 primary dynamic landing link
  const primaryDynamicLink = {
    title: `${regionName} ${entry.serviceKeyword} 공식 시공 안내 및 견적 기준`,
    href: dynamicHref,
    desc: '올케어 공식 서비스 범위, 사전 점검 요령 및 A/S 접수 기준 확인',
  };

  // 2~3 related guides from pillar / other keyword guides
  const secondaryGuideLinks = entry.relatedGuideSlugs
    .map((slug) => {
      const pillar = getGuideBySlug(slug);
      if (pillar) {
        return {
          title: pillar.h1,
          href: `/guide/${pillar.slug}`,
          desc: pillar.description.slice(0, 45) + '...',
        };
      }
      const kw = getKeywordGuideBySlug(slug);
      if (kw) {
        return {
          title: kw.h1,
          href: `/guide/${kw.slug}`,
          desc: kw.description.slice(0, 45) + '...',
        };
      }
      return null;
    })
    .filter((l): l is { title: string; href: string; desc: string } => l !== null);

  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    publishedAt: entry.publishedAt,
    publishedAtRfc822: entry.publishedAtRfc822,
    h1: entry.h1,
    intro: entry.intro,
    sections: entry.sections,
    checklistTitle: entry.checklistTitle,
    checklistItems: entry.checklistItems,
    limitationTitle: entry.limitationTitle,
    limitationNote: entry.limitationNote,
    relatedLinks: [primaryDynamicLink, ...secondaryGuideLinks],
  };
}

/**
 * Returns any guide (Pillar or Keyword) by slug as a normalized GuideArticle.
 */
export function getAnyGuideBySlug(slug: string, origin?: string): GuideArticle | undefined {
  const pillar = getGuideBySlug(slug);
  if (pillar) return pillar;

  const kw = getKeywordGuideBySlug(slug);
  if (kw) {
    const siteOrigin = origin || SITE_CONFIG.siteOrigin || OFFICIAL_SITE_ORIGIN;
    return toGuideArticle(kw, siteOrigin);
  }

  return undefined;
}

/**
 * Returns all guide slugs (4 Pillar + 22 Keyword = 26 total).
 */
export function getAllGuideSlugs(): string[] {
  const pillarSlugs = ['balcony-coating-checklist', 'old-apartment-balcony-recoating-guide', 'elastic-coating-estimate-work-scope-guide', 'elastic-coating-preparation-protection-checklist'];
  const keywordSlugs = KEYWORD_GUIDES.map((g) => g.slug);
  return [...pillarSlugs, ...keywordSlugs];
}
