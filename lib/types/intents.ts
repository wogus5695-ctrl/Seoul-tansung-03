/**
 * Search Intent Contract Types
 *
 * Defines the 6 core intents for elastic coating services.
 * Strictly separates internal ID from public URL service keyword.
 */

export type SearchIntentId =
  | 'elastic-coating'
  | 'elastic-coating-installation'
  | 'balcony-elastic-coating'
  | 'laundry-elastic-coating'
  | 'apartment-elastic-coating'
  | 'elastic-coating-company';

export type ServiceKeyword =
  | '탄성코트'
  | '탄성코트시공'
  | '베란다탄성코트'
  | '세탁실탄성코트'
  | '아파트탄성코트'
  | '탄성코트업체';

export type ContentStatus =
  | 'PLACEHOLDER'  // 계약/테스트 검증용 샘플 콘텐츠 (INDEXABLE 불가)
  | 'DRAFT'        // 마케팅 초안 작성 중
  | 'APPROVED';    // 사용자 최종 승인 완료 (INDEXABLE 가능)

export interface IntentFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface SearchIntentItem {
  readonly id: SearchIntentId;
  readonly serviceKeyword: ServiceKeyword;
  readonly contentStatus: ContentStatus;
  readonly userIntent: string;
  readonly primaryProblem: string;
  readonly decisionTopics: readonly string[];

  readonly searcherQuestion?: string;     // Primary user search question
  readonly problemH2Template?: (keywordRegionName: string) => string; // Differentiated H2 for problem section

  // Dynamic Metadata & Headline Templates (Strict Exact Prefix Rule)
  readonly titleTemplate: (keywordRegionName: string) => string;
  readonly descriptionTemplate: (keywordRegionName: string) => string;
  readonly h1Template: (keywordRegionName: string) => string;
  readonly heroIntroTemplate: (keywordRegionName: string) => string;

  // Intent-specific FAQs (Sample / Contract verification)
  readonly faqItems: readonly IntentFaqItem[];

  // Cross-intent navigation in the same region
  readonly relatedIntentIds: readonly SearchIntentId[];
}
