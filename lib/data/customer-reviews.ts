export interface CustomerReview {
  id: string;
  category: string;
  headline: string;
  body: string;
  regionLabel: string;
  maskedName: string;
  rating: number;
  disclosureLabel: string;
}

export const CUSTOMER_REVIEWS: readonly CustomerReview[] = [
  {
    id: 'review-01',
    category: '서비스 상담',
    headline: '처음부터 설명을 잘해주셔서 믿고 맡길 수 있었어요.',
    body: '처음에는 어떤 작업이 필요한지 잘 몰랐는데 벽 상태부터 하나씩 설명해주셨어요. 질문도 여러 번 드렸는데 자세히 답해주셔서 부담 없이 진행할 수 있었습니다.',
    regionLabel: '서울 은평구',
    maskedName: '김*현',
    rating: 5,
    disclosureLabel: '재구성 후기',
  },
  {
    id: 'review-02',
    category: '작업 과정',
    headline: '작업하는 과정을 보니까 꼼꼼하다는 느낌이 들었어요.',
    body: '바로 칠하는 게 아니라 들뜬 부분이랑 벽 상태를 먼저 확인하고 정리해주시더라고요. 작업 전에 준비하는 과정부터 신경 쓰는 게 보여서 만족했습니다.',
    regionLabel: '서울 강서구',
    maskedName: '박*민',
    rating: 5,
    disclosureLabel: '재구성 후기',
  },
  {
    id: 'review-03',
    category: '보양 · 정리',
    headline: '주변 보양부터 마무리 정리까지 깔끔했습니다.',
    body: '시공하면서 주변이 지저분해질까 걱정했는데 작업 전에 보양을 꼼꼼히 해주셨어요. 끝나고 정리된 상태도 깔끔해서 전체적으로 만족스러웠습니다.',
    regionLabel: '서울 노원구',
    maskedName: '이*영',
    rating: 5,
    disclosureLabel: '재구성 후기',
  },
  {
    id: 'review-04',
    category: '마감 만족',
    headline: '마감하고 나니까 벽면이 정말 깔끔해졌어요.',
    body: '기존 벽면이 얼룩도 있고 보기 좋지 않았는데 시공 후에는 전체적으로 정돈된 느낌이 확실히 들었습니다. 가까이서 봐도 마감이 깔끔해서 마음에 들었어요.',
    regionLabel: '서울 송파구',
    maskedName: '정*수',
    rating: 5,
    disclosureLabel: '재구성 후기',
  },
  {
    id: 'review-05',
    category: '공간 변화',
    headline: '벽 하나 바뀌었는데 공간 분위기가 훨씬 달라졌네요.',
    body: '처음에는 탄성코트만으로 얼마나 달라질까 했는데 작업하고 나니 공간이 훨씬 밝고 깨끗해 보렸습니다. 새로 정리한 집 같은 느낌이 들어 만족했어요.',
    regionLabel: '서울 마포구',
    maskedName: '최*진',
    rating: 5,
    disclosureLabel: '재구성 후기',
  },
  {
    id: 'review-06',
    category: '재시공',
    headline: '오래된 벽이라 걱정했는데 결과가 생각보다 좋았습니다.',
    body: '기존 페인트가 오래되고 군데군데 들떠 있어서 걱정했는데 작업 전에 상태를 먼저 봐주시고 필요한 부분을 정리해주셨어요. 마감 후에는 훨씬 깔끔해졌습니다.',
    regionLabel: '서울 성동구',
    maskedName: '윤*호',
    rating: 5,
    disclosureLabel: '재구성 후기',
  },
  {
    id: 'review-07',
    category: '첫 상담 · 안내',
    headline: '몰라서 걱정이었는데, 자세히 설명해주셔서 안심했어요!',
    body: '탄성코트를 처음 맡겨보는 거라 뭘 확인해야 하는지 잘 몰랐어요. 작업 전에 벽 상태랑 필요한 과정부터 차근차근 설명해주셔서 어렵지 않게 이해할 수 있었고, 진행하는 동안도 훨씬 안심됐습니다.',
    regionLabel: '서울 서초구',
    maskedName: '한*은',
    rating: 5,
    disclosureLabel: '재구성 후기',
  },
  {
    id: 'review-08',
    category: '견적 · 비용',
    headline: '설명 들은 작업 범위와 결과를 보면 만족스러운 비용이었어요.',
    body: '처음 견적만 보고 결정하기보다 어떤 작업이 포함되는지 설명을 듣고 진행했습니다. 끝난 상태까지 확인하고 나니 작업 내용이나 결과 대비 만족스럽게 느껴졌습니다.',
    regionLabel: '서울 강동구',
    maskedName: '오*준',
    rating: 5,
    disclosureLabel: '재구성 후기',
  },
  {
    id: 'review-09',
    category: '사후관리 · A/S',
    headline: '시공 후 관리랑 A/S까지 설명해주셔서 안심됐어요.',
    body: '작업이 끝나고 마감 상태를 같이 확인했고 이후 관리 방법도 안내받았습니다. A/S 적용 기준도 설명해주셔서 혹시 문제가 생겼을 때 어떻게 확인하면 되는지 이해하기 쉬웠어요.',
    regionLabel: '서울 양천구',
    maskedName: '임*아',
    rating: 5,
    disclosureLabel: '재구성 후기',
  },
];
