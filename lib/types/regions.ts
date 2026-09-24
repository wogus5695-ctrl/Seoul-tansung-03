/**
 * Region Expansion & Hierarchy Contract Types
 *
 * Supports multi-tier administrative division (SIDO, CITY, GU, GUN, DONG).
 * Separates UI display name (displayName), SEO dynamic keyword (keywordRegionName),
 * unique route identifier (routeKey), and internal ID.
 */

export type RegionType = 'SIDO' | 'CITY' | 'GU' | 'GUN' | 'DONG';

export type PublicationState = 'DRAFT' | 'PUBLISHED_NOINDEX' | 'INDEXABLE';

export type DisambiguationStatus =
  | 'NOT_REQUIRED'              // 고유한 지명으로 충돌 없음 (displayName === keywordRegionName)
  | 'REQUIRES_DISAMBIGUATION'   // 동명 지명 충돌 발견되어 사용자 승인 대기 중 (INDEXABLE 불가)
  | 'APPROVED';                 // 사용자 승인을 거친 보정 키워드가 적용됨 (INDEXABLE 가능)

export type RegionSource = 'fixture' | 'production';
export type RolloutStage = 'pilot' | 'full';

export interface RegionItem {
  readonly id: string;                     // e.g. 'seoul-gangnam-samseong' (Internal Absolute Unique ID)
  readonly regionType: RegionType;          // SIDO | CITY | GU | GUN | DONG
  readonly parentRegionId?: string;        // e.g. 'seoul-gangnam'
  readonly canonicalName: string;          // e.g. '서울특별시 강남구 삼성동'
  readonly displayName: string;            // e.g. '중앙동' (UI 표시용 순수 지역명)
  readonly keywordRegionName: string;      // e.g. '안산중앙동' 또는 '중앙동' (Public Dynamic Key 및 SEO H1/Title용)
  readonly routeKey: string;               // e.g. 'ansan-jungang' 또는 '중앙동' (Globally Unique Public Route Key)
  readonly sido: string;                   // e.g. '경기'
  readonly sigugun?: string;               // e.g. '안산시 단원구'
  readonly dong?: string;                  // e.g. '중앙동'
  readonly nearbyRegionIds: string[];      // 인접 지역 내부 링크용
  readonly disambiguationKey?: string;     // e.g. 'ansan' vs 'seongnam'
  readonly disambiguationStatus: DisambiguationStatus;
  readonly source: RegionSource;           // 'fixture' (synthetic test) vs 'production' (real region)
  readonly rolloutStage?: RolloutStage;    // Operational stage: 'pilot' vs 'full'
  readonly isSyntheticFixture: boolean;    // Explicit synthetic fixture flag
  /** @deprecated Use rolloutStage: 'pilot' | 'full' and source: 'fixture' | 'production' instead */
  readonly isPilot?: boolean;
  readonly publicationState: PublicationState;
  readonly isServiceAreaApproved?: boolean; // Production Structured Data areaServed gate
}
