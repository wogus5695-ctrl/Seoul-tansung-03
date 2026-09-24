/**
 * Seoul Region Master Manifest (Phase 5-A4 Reconciled)
 *
 * Single Canonical Region Record per manifest entry.
 * Mutually exclusive final approval statuses:
 * - 'APPROVED'
 * - 'MICRO_REVIEW'
 * - 'SPECIAL_REVIEW'
 * - 'COLLISION_HOLD'
 */

export type SourceMembershipType = 'GU' | 'ADMIN' | 'LEGAL' | 'NORMALIZED_GROUP' | 'COLLISION';
export type ApprovalStatusType = 'APPROVED' | 'MICRO_REVIEW' | 'SPECIAL_REVIEW' | 'COLLISION_HOLD';
export type CollisionStatusType = 'NONE' | 'HOLD';

export interface RegionManifestRecord {
  readonly regionRecordId: string;
  readonly parentGu: string;
  readonly canonicalName: string;
  readonly officialAdminNames: readonly string[];
  readonly officialLegalNames: readonly string[];
  readonly publicCandidate: string;
  readonly sourceMembership: readonly SourceMembershipType[];
  readonly isNormalizedAdmin: boolean;
  readonly isLegalOnly: boolean;
  readonly isMicroLegal: boolean;
  readonly isSpecialReview: boolean;
  readonly collisionGroup: string | null;
  readonly collisionStatus: CollisionStatusType;
  readonly approvalStatus: ApprovalStatusType;
  readonly routeKeyCandidate: string;
  readonly includeInApprovedSet: boolean;
  readonly excludeReason: string | null;
}

export const SEOUL_GU_MANIFEST_RECORDS: readonly RegionManifestRecord[] = [
  {
    "regionRecordId": "seoul-gangnam-gu",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "강남구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangdong-gu",
    "parentGu": "강동구",
    "canonicalName": "서울특별시 강동구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "강동구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangdong-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangbuk-gu",
    "parentGu": "강북구",
    "canonicalName": "서울특별시 강북구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "강북구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangbuk-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-gu",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "강서구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-gu",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "관악구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwangjin-gu",
    "parentGu": "광진구",
    "canonicalName": "서울특별시 광진구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "광진구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwangjin-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-gu",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "구로구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-geumcheon-gu",
    "parentGu": "금천구",
    "canonicalName": "서울특별시 금천구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "금천구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-geumcheon-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-nowon-gu",
    "parentGu": "노원구",
    "canonicalName": "서울특별시 노원구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "노원구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-nowon-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dobong-gu",
    "parentGu": "도봉구",
    "canonicalName": "서울특별시 도봉구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "도봉구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dobong-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-gu",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "동대문구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongjak-gu",
    "parentGu": "동작구",
    "canonicalName": "서울특별시 동작구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "동작구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongjak-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-gu",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "마포구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-gu",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "서대문구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-gu",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "서초구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seocho-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-gu",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "성동구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-gu",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "성북구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-gu",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "송파구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yangcheon-gu",
    "parentGu": "양천구",
    "canonicalName": "서울특별시 양천구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "양천구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yangcheon-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yeongdeungpo-gu",
    "parentGu": "영등포구",
    "canonicalName": "서울특별시 영등포구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "영등포구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yeongdeungpo-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-gu",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "용산구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-gu",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "은평구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-gu",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "종로구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-gu",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "중구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jungnang-gu",
    "parentGu": "중랑구",
    "canonicalName": "서울특별시 중랑구",
    "officialAdminNames": [],
    "officialLegalNames": [],
    "publicCandidate": "중랑구",
    "sourceMembership": [
      "GU"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jungnang-gu",
    "includeInApprovedSet": true,
    "excludeReason": null
  }
];

export const SEOUL_DONG_MANIFEST_RECORDS: readonly RegionManifestRecord[] = [
  {
    "regionRecordId": "seoul-jongno-청운효자동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 청운효자동",
    "officialAdminNames": [
      "청운효자동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "청운효자동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%ec%b2%ad%ec%9a%b4%ed%9a%a8%ec%9e%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-사직동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 사직동",
    "officialAdminNames": [
      "사직동"
    ],
    "officialLegalNames": [
      "사직동"
    ],
    "publicCandidate": "사직동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%ec%82%ac%ec%a7%81%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-삼청동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 삼청동",
    "officialAdminNames": [
      "삼청동"
    ],
    "officialLegalNames": [
      "삼청동"
    ],
    "publicCandidate": "삼청동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%ec%82%bc%ec%b2%ad%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-부암동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 부암동",
    "officialAdminNames": [
      "부암동"
    ],
    "officialLegalNames": [
      "부암동"
    ],
    "publicCandidate": "부암동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%eb%b6%80%ec%95%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-평창동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 평창동",
    "officialAdminNames": [
      "평창동"
    ],
    "officialLegalNames": [
      "평창동"
    ],
    "publicCandidate": "평창동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%ed%8f%89%ec%b0%bd%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-무악동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 무악동",
    "officialAdminNames": [
      "무악동"
    ],
    "officialLegalNames": [
      "무악동"
    ],
    "publicCandidate": "무악동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%eb%ac%b4%ec%95%85%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-교남동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 교남동",
    "officialAdminNames": [
      "교남동"
    ],
    "officialLegalNames": [
      "교남동"
    ],
    "publicCandidate": "교남동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%ea%b5%90%eb%82%a8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-가회동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 가회동",
    "officialAdminNames": [
      "가회동"
    ],
    "officialLegalNames": [
      "가회동"
    ],
    "publicCandidate": "가회동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%ea%b0%80%ed%9a%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-종로",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 종로",
    "officialAdminNames": [
      "종로1·2·3·4가동",
      "종로5·6가동"
    ],
    "officialLegalNames": [
      "종로1가",
      "종로2가",
      "종로3가",
      "종로4가",
      "종로5가",
      "종로6가"
    ],
    "publicCandidate": "종로",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": true,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "SPECIAL_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%a2%85%eb%a1%9c",
    "includeInApprovedSet": false,
    "excludeReason": "SPECIAL_NORMALIZATION_POLICY_PENDING"
  },
  {
    "regionRecordId": "seoul-jongno-이화동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 이화동",
    "officialAdminNames": [
      "이화동"
    ],
    "officialLegalNames": [
      "이화동"
    ],
    "publicCandidate": "이화동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%ec%9d%b4%ed%99%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-혜화동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 혜화동",
    "officialAdminNames": [
      "혜화동"
    ],
    "officialLegalNames": [
      "혜화동"
    ],
    "publicCandidate": "혜화동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%ed%98%9c%ed%99%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-창신동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 창신동",
    "officialAdminNames": [
      "창신1동",
      "창신2동",
      "창신3동"
    ],
    "officialLegalNames": [
      "창신동"
    ],
    "publicCandidate": "창신동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%ec%b0%bd%ec%8b%a0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-숭인동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 숭인동",
    "officialAdminNames": [
      "숭인1동",
      "숭인2동"
    ],
    "officialLegalNames": [
      "숭인동"
    ],
    "publicCandidate": "숭인동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jongno-%ec%88%ad%ec%9d%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-소공동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 소공동",
    "officialAdminNames": [
      "소공동"
    ],
    "officialLegalNames": [
      "소공동"
    ],
    "publicCandidate": "소공동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ec%86%8c%ea%b3%b5%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-회현동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 회현동",
    "officialAdminNames": [
      "회현동"
    ],
    "officialLegalNames": [
      "회현동1가",
      "회현동2가",
      "회현동3가"
    ],
    "publicCandidate": "회현동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ed%9a%8c%ed%98%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-명동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 명동",
    "officialAdminNames": [
      "명동"
    ],
    "officialLegalNames": [
      "명동1가",
      "명동2가"
    ],
    "publicCandidate": "명동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%eb%aa%85%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-필동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 필동",
    "officialAdminNames": [
      "필동"
    ],
    "officialLegalNames": [
      "필동1가",
      "필동2가",
      "필동3가"
    ],
    "publicCandidate": "필동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ed%95%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-장충동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 장충동",
    "officialAdminNames": [
      "장충동"
    ],
    "officialLegalNames": [
      "장충동1가",
      "장충동2가"
    ],
    "publicCandidate": "장충동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ec%9e%a5%ec%b6%a9%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-광희동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 광희동",
    "officialAdminNames": [
      "광희동"
    ],
    "officialLegalNames": [
      "광희동1가",
      "광희동2가"
    ],
    "publicCandidate": "광희동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ea%b4%91%ed%9d%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-을지로동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 을지로동",
    "officialAdminNames": [
      "을지로동"
    ],
    "officialLegalNames": [
      "을지로1가",
      "을지로2가",
      "을지로6가",
      "을지로7가",
      "을지로3가",
      "을지로4가",
      "을지로5가"
    ],
    "publicCandidate": "을지로동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ec%9d%84%ec%a7%80%eb%a1%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-다산동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 다산동",
    "officialAdminNames": [
      "다산동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "다산동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%eb%8b%a4%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-약수동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 약수동",
    "officialAdminNames": [
      "약수동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "약수동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ec%95%bd%ec%88%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-청구동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 청구동",
    "officialAdminNames": [
      "청구동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "청구동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ec%b2%ad%ea%b5%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-신당동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 신당동",
    "officialAdminNames": [
      "신당동",
      "신당5동"
    ],
    "officialLegalNames": [
      "신당동"
    ],
    "publicCandidate": "신당동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ec%8b%a0%eb%8b%b9%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-동화동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 동화동",
    "officialAdminNames": [
      "동화동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "동화동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%eb%8f%99%ed%99%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-황학동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 황학동",
    "officialAdminNames": [
      "황학동"
    ],
    "officialLegalNames": [
      "황학동"
    ],
    "publicCandidate": "황학동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ed%99%a9%ed%95%99%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jung-중림동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 중림동",
    "officialAdminNames": [
      "중림동"
    ],
    "officialLegalNames": [
      "중림동"
    ],
    "publicCandidate": "중림동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jung-%ec%a4%91%eb%a6%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-후암동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 후암동",
    "officialAdminNames": [
      "후암동"
    ],
    "officialLegalNames": [
      "후암동"
    ],
    "publicCandidate": "후암동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ed%9b%84%ec%95%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-용산동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 용산동",
    "officialAdminNames": [
      "용산2가동"
    ],
    "officialLegalNames": [
      "용산동2가",
      "용산동4가",
      "용산동3가",
      "용산동5가",
      "용산동1가",
      "용산동6가"
    ],
    "publicCandidate": "용산동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": true,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "SPECIAL_REVIEW",
    "routeKeyCandidate": "seoul-yongsan-%ec%9a%a9%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SPECIAL_NORMALIZATION_POLICY_PENDING"
  },
  {
    "regionRecordId": "seoul-yongsan-남영동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 남영동",
    "officialAdminNames": [
      "남영동"
    ],
    "officialLegalNames": [
      "남영동"
    ],
    "publicCandidate": "남영동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%eb%82%a8%ec%98%81%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-청파동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 청파동",
    "officialAdminNames": [
      "청파동"
    ],
    "officialLegalNames": [
      "청파동1가",
      "청파동2가",
      "청파동3가"
    ],
    "publicCandidate": "청파동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%b2%ad%ed%8c%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-원효로동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 원효로동",
    "officialAdminNames": [
      "원효로1동",
      "원효로2동"
    ],
    "officialLegalNames": [
      "원효로1가",
      "원효로2가",
      "원효로3가",
      "원효로4가"
    ],
    "publicCandidate": "원효로동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": true,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "SPECIAL_REVIEW",
    "routeKeyCandidate": "seoul-yongsan-%ec%9b%90%ed%9a%a8%eb%a1%9c%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SPECIAL_NORMALIZATION_POLICY_PENDING"
  },
  {
    "regionRecordId": "seoul-yongsan-효창동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 효창동",
    "officialAdminNames": [
      "효창동"
    ],
    "officialLegalNames": [
      "효창동"
    ],
    "publicCandidate": "효창동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ed%9a%a8%ec%b0%bd%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-용문동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 용문동",
    "officialAdminNames": [
      "용문동"
    ],
    "officialLegalNames": [
      "용문동"
    ],
    "publicCandidate": "용문동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%9a%a9%eb%ac%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-한강로동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 한강로동",
    "officialAdminNames": [
      "한강로동"
    ],
    "officialLegalNames": [
      "한강로1가",
      "한강로2가",
      "한강로3가"
    ],
    "publicCandidate": "한강로동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ed%95%9c%ea%b0%95%eb%a1%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-이촌동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 이촌동",
    "officialAdminNames": [
      "이촌1동",
      "이촌2동"
    ],
    "officialLegalNames": [
      "이촌동"
    ],
    "publicCandidate": "이촌동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%9d%b4%ec%b4%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-이태원동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 이태원동",
    "officialAdminNames": [
      "이태원1동",
      "이태원2동"
    ],
    "officialLegalNames": [
      "이태원동"
    ],
    "publicCandidate": "이태원동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%9d%b4%ed%83%9c%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-한남동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 한남동",
    "officialAdminNames": [
      "한남동"
    ],
    "officialLegalNames": [
      "한남동"
    ],
    "publicCandidate": "한남동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ed%95%9c%eb%82%a8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-서빙고동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 서빙고동",
    "officialAdminNames": [
      "서빙고동"
    ],
    "officialLegalNames": [
      "서빙고동"
    ],
    "publicCandidate": "서빙고동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%84%9c%eb%b9%99%ea%b3%a0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-보광동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 보광동",
    "officialAdminNames": [
      "보광동"
    ],
    "officialLegalNames": [
      "보광동"
    ],
    "publicCandidate": "보광동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%eb%b3%b4%ea%b4%91%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-왕십리동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 왕십리동",
    "officialAdminNames": [
      "왕십리2동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "왕십리동",
    "sourceMembership": [
      "ADMIN",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ec%99%95%ec%8b%ad%eb%a6%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-왕십리도선동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 왕십리도선동",
    "officialAdminNames": [
      "왕십리도선동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "왕십리도선동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ec%99%95%ec%8b%ad%eb%a6%ac%eb%8f%84%ec%84%a0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-마장동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 마장동",
    "officialAdminNames": [
      "마장동"
    ],
    "officialLegalNames": [
      "마장동"
    ],
    "publicCandidate": "마장동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%eb%a7%88%ec%9e%a5%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-사근동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 사근동",
    "officialAdminNames": [
      "사근동"
    ],
    "officialLegalNames": [
      "사근동"
    ],
    "publicCandidate": "사근동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ec%82%ac%ea%b7%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-행당동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 행당동",
    "officialAdminNames": [
      "행당1동",
      "행당2동"
    ],
    "officialLegalNames": [
      "행당동"
    ],
    "publicCandidate": "행당동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ed%96%89%eb%8b%b9%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-응봉동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 응봉동",
    "officialAdminNames": [
      "응봉동"
    ],
    "officialLegalNames": [
      "응봉동"
    ],
    "publicCandidate": "응봉동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ec%9d%91%eb%b4%89%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-금호동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 금호동",
    "officialAdminNames": [
      "금호1가동",
      "금호2·3가동",
      "금호4가동"
    ],
    "officialLegalNames": [
      "금호동1가",
      "금호동2가",
      "금호동3가",
      "금호동4가"
    ],
    "publicCandidate": "금호동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": true,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ea%b8%88%ed%98%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-옥수동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 옥수동",
    "officialAdminNames": [
      "옥수동"
    ],
    "officialLegalNames": [
      "옥수동"
    ],
    "publicCandidate": "옥수동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ec%98%a5%ec%88%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-성수동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 성수동",
    "officialAdminNames": [
      "성수1가1동",
      "성수1가2동",
      "성수2가1동",
      "성수2가3동"
    ],
    "officialLegalNames": [
      "성수동1가",
      "성수동2가"
    ],
    "publicCandidate": "성수동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": true,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ec%84%b1%ec%88%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-송정동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 송정동",
    "officialAdminNames": [
      "송정동"
    ],
    "officialLegalNames": [
      "송정동"
    ],
    "publicCandidate": "송정동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ec%86%a1%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-용답동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 용답동",
    "officialAdminNames": [
      "용답동"
    ],
    "officialLegalNames": [
      "용답동"
    ],
    "publicCandidate": "용답동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ec%9a%a9%eb%8b%b5%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwangjin-중곡동",
    "parentGu": "광진구",
    "canonicalName": "서울특별시 광진구 중곡동",
    "officialAdminNames": [
      "중곡1동",
      "중곡2동",
      "중곡3동",
      "중곡4동"
    ],
    "officialLegalNames": [
      "중곡동"
    ],
    "publicCandidate": "중곡동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwangjin-%ec%a4%91%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwangjin-능동",
    "parentGu": "광진구",
    "canonicalName": "서울특별시 광진구 능동",
    "officialAdminNames": [
      "능동"
    ],
    "officialLegalNames": [
      "능동"
    ],
    "publicCandidate": "능동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwangjin-%eb%8a%a5%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwangjin-구의동",
    "parentGu": "광진구",
    "canonicalName": "서울특별시 광진구 구의동",
    "officialAdminNames": [
      "구의1동",
      "구의2동",
      "구의3동"
    ],
    "officialLegalNames": [
      "구의동"
    ],
    "publicCandidate": "구의동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwangjin-%ea%b5%ac%ec%9d%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwangjin-광장동",
    "parentGu": "광진구",
    "canonicalName": "서울특별시 광진구 광장동",
    "officialAdminNames": [
      "광장동"
    ],
    "officialLegalNames": [
      "광장동"
    ],
    "publicCandidate": "광장동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwangjin-%ea%b4%91%ec%9e%a5%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwangjin-자양동",
    "parentGu": "광진구",
    "canonicalName": "서울특별시 광진구 자양동",
    "officialAdminNames": [
      "자양1동",
      "자양2동",
      "자양3동",
      "자양4동"
    ],
    "officialLegalNames": [
      "자양동"
    ],
    "publicCandidate": "자양동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwangjin-%ec%9e%90%ec%96%91%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwangjin-화양동",
    "parentGu": "광진구",
    "canonicalName": "서울특별시 광진구 화양동",
    "officialAdminNames": [
      "화양동"
    ],
    "officialLegalNames": [
      "화양동"
    ],
    "publicCandidate": "화양동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwangjin-%ed%99%94%ec%96%91%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwangjin-군자동",
    "parentGu": "광진구",
    "canonicalName": "서울특별시 광진구 군자동",
    "officialAdminNames": [
      "군자동"
    ],
    "officialLegalNames": [
      "군자동"
    ],
    "publicCandidate": "군자동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwangjin-%ea%b5%b0%ec%9e%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-신설동",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구 신설동",
    "officialAdminNames": [
      "신설동"
    ],
    "officialLegalNames": [
      "신설동"
    ],
    "publicCandidate": "신설동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-%ec%8b%a0%ec%84%a4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-용두동",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구 용두동",
    "officialAdminNames": [
      "용두동"
    ],
    "officialLegalNames": [
      "용두동"
    ],
    "publicCandidate": "용두동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-%ec%9a%a9%eb%91%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-제기동",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구 제기동",
    "officialAdminNames": [
      "제기동"
    ],
    "officialLegalNames": [
      "제기동"
    ],
    "publicCandidate": "제기동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-%ec%a0%9c%ea%b8%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-전농동",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구 전농동",
    "officialAdminNames": [
      "전농1동",
      "전농2동"
    ],
    "officialLegalNames": [
      "전농동"
    ],
    "publicCandidate": "전농동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-%ec%a0%84%eb%86%8d%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-답십리동",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구 답십리동",
    "officialAdminNames": [
      "답십리1동",
      "답십리2동"
    ],
    "officialLegalNames": [
      "답십리동"
    ],
    "publicCandidate": "답십리동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-%eb%8b%b5%ec%8b%ad%eb%a6%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-장안동",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구 장안동",
    "officialAdminNames": [
      "장안1동",
      "장안2동"
    ],
    "officialLegalNames": [
      "장안동"
    ],
    "publicCandidate": "장안동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-%ec%9e%a5%ec%95%88%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-청량리동",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구 청량리동",
    "officialAdminNames": [
      "청량리동"
    ],
    "officialLegalNames": [
      "청량리동"
    ],
    "publicCandidate": "청량리동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-%ec%b2%ad%eb%9f%89%eb%a6%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-회기동",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구 회기동",
    "officialAdminNames": [
      "회기동"
    ],
    "officialLegalNames": [
      "회기동"
    ],
    "publicCandidate": "회기동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-%ed%9a%8c%ea%b8%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-휘경동",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구 휘경동",
    "officialAdminNames": [
      "휘경1동",
      "휘경2동"
    ],
    "officialLegalNames": [
      "휘경동"
    ],
    "publicCandidate": "휘경동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-%ed%9c%98%ea%b2%bd%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongdaemun-이문동",
    "parentGu": "동대문구",
    "canonicalName": "서울특별시 동대문구 이문동",
    "officialAdminNames": [
      "이문1동",
      "이문2동"
    ],
    "officialLegalNames": [
      "이문동"
    ],
    "publicCandidate": "이문동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongdaemun-%ec%9d%b4%eb%ac%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jungnang-면목동",
    "parentGu": "중랑구",
    "canonicalName": "서울특별시 중랑구 면목동",
    "officialAdminNames": [
      "면목본동",
      "면목2동",
      "면목3·8동",
      "면목4동",
      "면목5동",
      "면목7동"
    ],
    "officialLegalNames": [
      "면목동"
    ],
    "publicCandidate": "면목동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jungnang-%eb%a9%b4%eb%aa%a9%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jungnang-상봉동",
    "parentGu": "중랑구",
    "canonicalName": "서울특별시 중랑구 상봉동",
    "officialAdminNames": [
      "상봉1동",
      "상봉2동"
    ],
    "officialLegalNames": [
      "상봉동"
    ],
    "publicCandidate": "상봉동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jungnang-%ec%83%81%eb%b4%89%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jungnang-중화동",
    "parentGu": "중랑구",
    "canonicalName": "서울특별시 중랑구 중화동",
    "officialAdminNames": [
      "중화1동",
      "중화2동"
    ],
    "officialLegalNames": [
      "중화동"
    ],
    "publicCandidate": "중화동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jungnang-%ec%a4%91%ed%99%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jungnang-묵동",
    "parentGu": "중랑구",
    "canonicalName": "서울특별시 중랑구 묵동",
    "officialAdminNames": [
      "묵1동",
      "묵2동"
    ],
    "officialLegalNames": [
      "묵동"
    ],
    "publicCandidate": "묵동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jungnang-%eb%ac%b5%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jungnang-망우동",
    "parentGu": "중랑구",
    "canonicalName": "서울특별시 중랑구 망우동",
    "officialAdminNames": [
      "망우본동",
      "망우3동"
    ],
    "officialLegalNames": [
      "망우동"
    ],
    "publicCandidate": "망우동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jungnang-%eb%a7%9d%ec%9a%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jungnang-신내동",
    "parentGu": "중랑구",
    "canonicalName": "서울특별시 중랑구 신내동",
    "officialAdminNames": [
      "신내1동",
      "신내2동"
    ],
    "officialLegalNames": [
      "신내동"
    ],
    "publicCandidate": "신내동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-jungnang-%ec%8b%a0%eb%82%b4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-성북동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 성북동",
    "officialAdminNames": [
      "성북동"
    ],
    "officialLegalNames": [
      "성북동",
      "성북동1가"
    ],
    "publicCandidate": "성북동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ec%84%b1%eb%b6%81%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-삼선동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 삼선동",
    "officialAdminNames": [
      "삼선동"
    ],
    "officialLegalNames": [
      "삼선동1가",
      "삼선동2가",
      "삼선동3가",
      "삼선동4가",
      "삼선동5가"
    ],
    "publicCandidate": "삼선동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ec%82%bc%ec%84%a0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-동선동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 동선동",
    "officialAdminNames": [
      "동선동"
    ],
    "officialLegalNames": [
      "동선동1가",
      "동선동2가",
      "동선동3가",
      "동선동4가",
      "동선동5가"
    ],
    "publicCandidate": "동선동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%eb%8f%99%ec%84%a0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-돈암동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 돈암동",
    "officialAdminNames": [
      "돈암1동",
      "돈암2동"
    ],
    "officialLegalNames": [
      "돈암동"
    ],
    "publicCandidate": "돈암동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%eb%8f%88%ec%95%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-안암동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 안암동",
    "officialAdminNames": [
      "안암동"
    ],
    "officialLegalNames": [
      "안암동1가",
      "안암동2가",
      "안암동3가",
      "안암동4가",
      "안암동5가"
    ],
    "publicCandidate": "안암동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ec%95%88%ec%95%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-보문동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 보문동",
    "officialAdminNames": [
      "보문동"
    ],
    "officialLegalNames": [
      "보문동4가",
      "보문동5가",
      "보문동6가",
      "보문동7가",
      "보문동1가",
      "보문동2가",
      "보문동3가"
    ],
    "publicCandidate": "보문동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%eb%b3%b4%eb%ac%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-정릉동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 정릉동",
    "officialAdminNames": [
      "정릉1동",
      "정릉2동",
      "정릉3동",
      "정릉4동"
    ],
    "officialLegalNames": [
      "정릉동"
    ],
    "publicCandidate": "정릉동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ec%a0%95%eb%a6%89%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-길음동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 길음동",
    "officialAdminNames": [
      "길음1동",
      "길음2동"
    ],
    "officialLegalNames": [
      "길음동"
    ],
    "publicCandidate": "길음동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ea%b8%b8%ec%9d%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-종암동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 종암동",
    "officialAdminNames": [
      "종암동"
    ],
    "officialLegalNames": [
      "종암동"
    ],
    "publicCandidate": "종암동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ec%a2%85%ec%95%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-월곡동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 월곡동",
    "officialAdminNames": [
      "월곡1동",
      "월곡2동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "월곡동",
    "sourceMembership": [
      "ADMIN",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ec%9b%94%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-장위동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 장위동",
    "officialAdminNames": [
      "장위1동",
      "장위2동",
      "장위3동"
    ],
    "officialLegalNames": [
      "장위동"
    ],
    "publicCandidate": "장위동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ec%9e%a5%ec%9c%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-석관동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 석관동",
    "officialAdminNames": [
      "석관동"
    ],
    "officialLegalNames": [
      "석관동"
    ],
    "publicCandidate": "석관동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ec%84%9d%ea%b4%80%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangbuk-삼양동",
    "parentGu": "강북구",
    "canonicalName": "서울특별시 강북구 삼양동",
    "officialAdminNames": [
      "삼양동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "삼양동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangbuk-%ec%82%bc%ec%96%91%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangbuk-미아동",
    "parentGu": "강북구",
    "canonicalName": "서울특별시 강북구 미아동",
    "officialAdminNames": [
      "미아동"
    ],
    "officialLegalNames": [
      "미아동"
    ],
    "publicCandidate": "미아동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangbuk-%eb%af%b8%ec%95%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangbuk-송중동",
    "parentGu": "강북구",
    "canonicalName": "서울특별시 강북구 송중동",
    "officialAdminNames": [
      "송중동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "송중동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangbuk-%ec%86%a1%ec%a4%91%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangbuk-송천동",
    "parentGu": "강북구",
    "canonicalName": "서울특별시 강북구 송천동",
    "officialAdminNames": [
      "송천동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "송천동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangbuk-%ec%86%a1%ec%b2%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangbuk-삼각산동",
    "parentGu": "강북구",
    "canonicalName": "서울특별시 강북구 삼각산동",
    "officialAdminNames": [
      "삼각산동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "삼각산동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangbuk-%ec%82%bc%ea%b0%81%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangbuk-번동",
    "parentGu": "강북구",
    "canonicalName": "서울특별시 강북구 번동",
    "officialAdminNames": [
      "번1동",
      "번2동",
      "번3동"
    ],
    "officialLegalNames": [
      "번동"
    ],
    "publicCandidate": "번동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangbuk-%eb%b2%88%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangbuk-수유동",
    "parentGu": "강북구",
    "canonicalName": "서울특별시 강북구 수유동",
    "officialAdminNames": [
      "수유1동",
      "수유2동",
      "수유3동"
    ],
    "officialLegalNames": [
      "수유동"
    ],
    "publicCandidate": "수유동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangbuk-%ec%88%98%ec%9c%a0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangbuk-우이동",
    "parentGu": "강북구",
    "canonicalName": "서울특별시 강북구 우이동",
    "officialAdminNames": [
      "우이동"
    ],
    "officialLegalNames": [
      "우이동"
    ],
    "publicCandidate": "우이동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangbuk-%ec%9a%b0%ec%9d%b4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangbuk-인수동",
    "parentGu": "강북구",
    "canonicalName": "서울특별시 강북구 인수동",
    "officialAdminNames": [
      "인수동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "인수동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangbuk-%ec%9d%b8%ec%88%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dobong-쌍문동",
    "parentGu": "도봉구",
    "canonicalName": "서울특별시 도봉구 쌍문동",
    "officialAdminNames": [
      "쌍문1동",
      "쌍문2동",
      "쌍문3동",
      "쌍문4동"
    ],
    "officialLegalNames": [
      "쌍문동"
    ],
    "publicCandidate": "쌍문동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dobong-%ec%8c%8d%eb%ac%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dobong-방학동",
    "parentGu": "도봉구",
    "canonicalName": "서울특별시 도봉구 방학동",
    "officialAdminNames": [
      "방학1동",
      "방학2동",
      "방학3동"
    ],
    "officialLegalNames": [
      "방학동"
    ],
    "publicCandidate": "방학동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dobong-%eb%b0%a9%ed%95%99%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dobong-창동",
    "parentGu": "도봉구",
    "canonicalName": "서울특별시 도봉구 창동",
    "officialAdminNames": [
      "창1동",
      "창2동",
      "창3동",
      "창4동",
      "창5동"
    ],
    "officialLegalNames": [
      "창동"
    ],
    "publicCandidate": "창동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dobong-%ec%b0%bd%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dobong-도봉동",
    "parentGu": "도봉구",
    "canonicalName": "서울특별시 도봉구 도봉동",
    "officialAdminNames": [
      "도봉1동",
      "도봉2동"
    ],
    "officialLegalNames": [
      "도봉동"
    ],
    "publicCandidate": "도봉동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dobong-%eb%8f%84%eb%b4%89%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-nowon-월계동",
    "parentGu": "노원구",
    "canonicalName": "서울특별시 노원구 월계동",
    "officialAdminNames": [
      "월계1동",
      "월계2동",
      "월계3동"
    ],
    "officialLegalNames": [
      "월계동"
    ],
    "publicCandidate": "월계동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-nowon-%ec%9b%94%ea%b3%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-nowon-공릉동",
    "parentGu": "노원구",
    "canonicalName": "서울특별시 노원구 공릉동",
    "officialAdminNames": [
      "공릉1동",
      "공릉2동"
    ],
    "officialLegalNames": [
      "공릉동"
    ],
    "publicCandidate": "공릉동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-nowon-%ea%b3%b5%eb%a6%89%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-nowon-하계동",
    "parentGu": "노원구",
    "canonicalName": "서울특별시 노원구 하계동",
    "officialAdminNames": [
      "하계1동",
      "하계2동"
    ],
    "officialLegalNames": [
      "하계동"
    ],
    "publicCandidate": "하계동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-nowon-%ed%95%98%ea%b3%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-nowon-중계동",
    "parentGu": "노원구",
    "canonicalName": "서울특별시 노원구 중계동",
    "officialAdminNames": [
      "중계본동",
      "중계1동",
      "중계4동",
      "중계2·3동"
    ],
    "officialLegalNames": [
      "중계동"
    ],
    "publicCandidate": "중계동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-nowon-%ec%a4%91%ea%b3%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-nowon-상계동",
    "parentGu": "노원구",
    "canonicalName": "서울특별시 노원구 상계동",
    "officialAdminNames": [
      "상계1동",
      "상계2동",
      "상계3·4동",
      "상계5동",
      "상계6·7동",
      "상계8동",
      "상계9동",
      "상계10동"
    ],
    "officialLegalNames": [
      "상계동"
    ],
    "publicCandidate": "상계동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-nowon-%ec%83%81%ea%b3%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-녹번동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 녹번동",
    "officialAdminNames": [
      "녹번동"
    ],
    "officialLegalNames": [
      "녹번동"
    ],
    "publicCandidate": "녹번동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-%eb%85%b9%eb%b2%88%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-불광동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 불광동",
    "officialAdminNames": [
      "불광1동",
      "불광2동"
    ],
    "officialLegalNames": [
      "불광동"
    ],
    "publicCandidate": "불광동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-%eb%b6%88%ea%b4%91%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-갈현동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 갈현동",
    "officialAdminNames": [
      "갈현1동",
      "갈현2동"
    ],
    "officialLegalNames": [
      "갈현동"
    ],
    "publicCandidate": "갈현동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-%ea%b0%88%ed%98%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-구산동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 구산동",
    "officialAdminNames": [
      "구산동"
    ],
    "officialLegalNames": [
      "구산동"
    ],
    "publicCandidate": "구산동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-%ea%b5%ac%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-대조동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 대조동",
    "officialAdminNames": [
      "대조동"
    ],
    "officialLegalNames": [
      "대조동"
    ],
    "publicCandidate": "대조동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-%eb%8c%80%ec%a1%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-응암동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 응암동",
    "officialAdminNames": [
      "응암1동",
      "응암2동",
      "응암3동"
    ],
    "officialLegalNames": [
      "응암동"
    ],
    "publicCandidate": "응암동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-%ec%9d%91%ec%95%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-역촌동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 역촌동",
    "officialAdminNames": [
      "역촌동"
    ],
    "officialLegalNames": [
      "역촌동"
    ],
    "publicCandidate": "역촌동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-%ec%97%ad%ec%b4%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-신사동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 신사동",
    "officialAdminNames": [
      "신사1동",
      "신사2동"
    ],
    "officialLegalNames": [
      "신사동"
    ],
    "publicCandidate": "신사동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP",
      "COLLISION"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": "신사동",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-eunpyeong-%ec%8b%a0%ec%82%ac%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-eunpyeong-증산동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 증산동",
    "officialAdminNames": [
      "증산동"
    ],
    "officialLegalNames": [
      "증산동"
    ],
    "publicCandidate": "증산동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-%ec%a6%9d%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-수색동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 수색동",
    "officialAdminNames": [
      "수색동"
    ],
    "officialLegalNames": [
      "수색동"
    ],
    "publicCandidate": "수색동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-%ec%88%98%ec%83%89%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-eunpyeong-진관동",
    "parentGu": "은평구",
    "canonicalName": "서울특별시 은평구 진관동",
    "officialAdminNames": [
      "진관동"
    ],
    "officialLegalNames": [
      "진관동"
    ],
    "publicCandidate": "진관동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-eunpyeong-%ec%a7%84%ea%b4%80%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-천연동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 천연동",
    "officialAdminNames": [
      "천연동"
    ],
    "officialLegalNames": [
      "천연동"
    ],
    "publicCandidate": "천연동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ec%b2%9c%ec%97%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-충현동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 충현동",
    "officialAdminNames": [
      "충현동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "충현동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ec%b6%a9%ed%98%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-북아현동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 북아현동",
    "officialAdminNames": [
      "북아현동"
    ],
    "officialLegalNames": [
      "북아현동"
    ],
    "publicCandidate": "북아현동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%eb%b6%81%ec%95%84%ed%98%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-신촌동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 신촌동",
    "officialAdminNames": [
      "신촌동"
    ],
    "officialLegalNames": [
      "신촌동"
    ],
    "publicCandidate": "신촌동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ec%8b%a0%ec%b4%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-연희동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 연희동",
    "officialAdminNames": [
      "연희동"
    ],
    "officialLegalNames": [
      "연희동"
    ],
    "publicCandidate": "연희동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ec%97%b0%ed%9d%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-홍제동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 홍제동",
    "officialAdminNames": [
      "홍제1동",
      "홍제2동",
      "홍제3동"
    ],
    "officialLegalNames": [
      "홍제동"
    ],
    "publicCandidate": "홍제동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ed%99%8d%ec%a0%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-홍은동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 홍은동",
    "officialAdminNames": [
      "홍은1동",
      "홍은2동"
    ],
    "officialLegalNames": [
      "홍은동"
    ],
    "publicCandidate": "홍은동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ed%99%8d%ec%9d%80%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-남가좌동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 남가좌동",
    "officialAdminNames": [
      "남가좌1동",
      "남가좌2동"
    ],
    "officialLegalNames": [
      "남가좌동"
    ],
    "publicCandidate": "남가좌동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%eb%82%a8%ea%b0%80%ec%a2%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-북가좌동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 북가좌동",
    "officialAdminNames": [
      "북가좌1동",
      "북가좌2동"
    ],
    "officialLegalNames": [
      "북가좌동"
    ],
    "publicCandidate": "북가좌동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%eb%b6%81%ea%b0%80%ec%a2%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-공덕동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 공덕동",
    "officialAdminNames": [
      "공덕동"
    ],
    "officialLegalNames": [
      "공덕동"
    ],
    "publicCandidate": "공덕동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ea%b3%b5%eb%8d%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-아현동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 아현동",
    "officialAdminNames": [
      "아현동"
    ],
    "officialLegalNames": [
      "아현동"
    ],
    "publicCandidate": "아현동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%95%84%ed%98%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-도화동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 도화동",
    "officialAdminNames": [
      "도화동"
    ],
    "officialLegalNames": [
      "도화동"
    ],
    "publicCandidate": "도화동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%eb%8f%84%ed%99%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-용강동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 용강동",
    "officialAdminNames": [
      "용강동"
    ],
    "officialLegalNames": [
      "용강동"
    ],
    "publicCandidate": "용강동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%9a%a9%ea%b0%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-대흥동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 대흥동",
    "officialAdminNames": [
      "대흥동"
    ],
    "officialLegalNames": [
      "대흥동"
    ],
    "publicCandidate": "대흥동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%eb%8c%80%ed%9d%a5%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-염리동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 염리동",
    "officialAdminNames": [
      "염리동"
    ],
    "officialLegalNames": [
      "염리동"
    ],
    "publicCandidate": "염리동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%97%bc%eb%a6%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-신수동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 신수동",
    "officialAdminNames": [
      "신수동"
    ],
    "officialLegalNames": [
      "신수동"
    ],
    "publicCandidate": "신수동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%8b%a0%ec%88%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-서강동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 서강동",
    "officialAdminNames": [
      "서강동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "서강동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%84%9c%ea%b0%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-서교동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 서교동",
    "officialAdminNames": [
      "서교동"
    ],
    "officialLegalNames": [
      "서교동"
    ],
    "publicCandidate": "서교동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%84%9c%ea%b5%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-합정동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 합정동",
    "officialAdminNames": [
      "합정동"
    ],
    "officialLegalNames": [
      "합정동"
    ],
    "publicCandidate": "합정동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ed%95%a9%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-망원동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 망원동",
    "officialAdminNames": [
      "망원1동",
      "망원2동"
    ],
    "officialLegalNames": [
      "망원동"
    ],
    "publicCandidate": "망원동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%eb%a7%9d%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-연남동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 연남동",
    "officialAdminNames": [
      "연남동"
    ],
    "officialLegalNames": [
      "연남동"
    ],
    "publicCandidate": "연남동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%97%b0%eb%82%a8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-성산동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 성산동",
    "officialAdminNames": [
      "성산1동",
      "성산2동"
    ],
    "officialLegalNames": [
      "성산동"
    ],
    "publicCandidate": "성산동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%84%b1%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-상암동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 상암동",
    "officialAdminNames": [
      "상암동"
    ],
    "officialLegalNames": [
      "상암동"
    ],
    "publicCandidate": "상암동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%83%81%ec%95%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yangcheon-목동",
    "parentGu": "양천구",
    "canonicalName": "서울특별시 양천구 목동",
    "officialAdminNames": [
      "목1동",
      "목2동",
      "목3동",
      "목4동",
      "목5동"
    ],
    "officialLegalNames": [
      "목동"
    ],
    "publicCandidate": "목동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yangcheon-%eb%aa%a9%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yangcheon-신월동",
    "parentGu": "양천구",
    "canonicalName": "서울특별시 양천구 신월동",
    "officialAdminNames": [
      "신월1동",
      "신월2동",
      "신월3동",
      "신월4동",
      "신월5동",
      "신월6동",
      "신월7동"
    ],
    "officialLegalNames": [
      "신월동"
    ],
    "publicCandidate": "신월동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yangcheon-%ec%8b%a0%ec%9b%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yangcheon-신정동",
    "parentGu": "양천구",
    "canonicalName": "서울특별시 양천구 신정동",
    "officialAdminNames": [
      "신정1동",
      "신정2동",
      "신정3동",
      "신정4동",
      "신정6동",
      "신정7동"
    ],
    "officialLegalNames": [
      "신정동"
    ],
    "publicCandidate": "신정동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP",
      "COLLISION"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": "신정동",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-yangcheon-%ec%8b%a0%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-gangseo-염창동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 염창동",
    "officialAdminNames": [
      "염창동"
    ],
    "officialLegalNames": [
      "염창동"
    ],
    "publicCandidate": "염창동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%ec%97%bc%ec%b0%bd%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-등촌동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 등촌동",
    "officialAdminNames": [
      "등촌1동",
      "등촌2동",
      "등촌3동"
    ],
    "officialLegalNames": [
      "등촌동"
    ],
    "publicCandidate": "등촌동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%eb%93%b1%ec%b4%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-화곡동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 화곡동",
    "officialAdminNames": [
      "화곡본동",
      "화곡1동",
      "화곡2동",
      "화곡3동",
      "화곡4동",
      "화곡6동",
      "화곡8동"
    ],
    "officialLegalNames": [
      "화곡동"
    ],
    "publicCandidate": "화곡동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%ed%99%94%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-우장산동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 우장산동",
    "officialAdminNames": [
      "우장산동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "우장산동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%ec%9a%b0%ec%9e%a5%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-가양동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 가양동",
    "officialAdminNames": [
      "가양1동",
      "가양2동",
      "가양3동"
    ],
    "officialLegalNames": [
      "가양동"
    ],
    "publicCandidate": "가양동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%ea%b0%80%ec%96%91%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-발산동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 발산동",
    "officialAdminNames": [
      "발산1동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "발산동",
    "sourceMembership": [
      "ADMIN",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%eb%b0%9c%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-공항동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 공항동",
    "officialAdminNames": [
      "공항동"
    ],
    "officialLegalNames": [
      "공항동"
    ],
    "publicCandidate": "공항동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%ea%b3%b5%ed%95%ad%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-방화동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 방화동",
    "officialAdminNames": [
      "방화1동",
      "방화2동",
      "방화3동"
    ],
    "officialLegalNames": [
      "방화동"
    ],
    "publicCandidate": "방화동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%eb%b0%a9%ed%99%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-신도림동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 신도림동",
    "officialAdminNames": [
      "신도림동"
    ],
    "officialLegalNames": [
      "신도림동"
    ],
    "publicCandidate": "신도림동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ec%8b%a0%eb%8f%84%eb%a6%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-구로동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 구로동",
    "officialAdminNames": [
      "구로1동",
      "구로2동",
      "구로3동",
      "구로4동",
      "구로5동"
    ],
    "officialLegalNames": [
      "구로동"
    ],
    "publicCandidate": "구로동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ea%b5%ac%eb%a1%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-가리봉동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 가리봉동",
    "officialAdminNames": [
      "가리봉동"
    ],
    "officialLegalNames": [
      "가리봉동"
    ],
    "publicCandidate": "가리봉동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ea%b0%80%eb%a6%ac%eb%b4%89%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-고척동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 고척동",
    "officialAdminNames": [
      "고척1동",
      "고척2동"
    ],
    "officialLegalNames": [
      "고척동"
    ],
    "publicCandidate": "고척동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ea%b3%a0%ec%b2%99%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-개봉동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 개봉동",
    "officialAdminNames": [
      "개봉1동",
      "개봉2동",
      "개봉3동"
    ],
    "officialLegalNames": [
      "개봉동"
    ],
    "publicCandidate": "개봉동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ea%b0%9c%eb%b4%89%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-오류동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 오류동",
    "officialAdminNames": [
      "오류1동",
      "오류2동"
    ],
    "officialLegalNames": [
      "오류동"
    ],
    "publicCandidate": "오류동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ec%98%a4%eb%a5%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-항동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 항동",
    "officialAdminNames": [
      "항동"
    ],
    "officialLegalNames": [
      "항동"
    ],
    "publicCandidate": "항동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ed%95%ad%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-수궁동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 수궁동",
    "officialAdminNames": [
      "수궁동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "수궁동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ec%88%98%ea%b6%81%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-geumcheon-가산동",
    "parentGu": "금천구",
    "canonicalName": "서울특별시 금천구 가산동",
    "officialAdminNames": [
      "가산동"
    ],
    "officialLegalNames": [
      "가산동"
    ],
    "publicCandidate": "가산동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-geumcheon-%ea%b0%80%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-geumcheon-독산동",
    "parentGu": "금천구",
    "canonicalName": "서울특별시 금천구 독산동",
    "officialAdminNames": [
      "독산1동",
      "독산2동",
      "독산3동",
      "독산4동"
    ],
    "officialLegalNames": [
      "독산동"
    ],
    "publicCandidate": "독산동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-geumcheon-%eb%8f%85%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-geumcheon-시흥동",
    "parentGu": "금천구",
    "canonicalName": "서울특별시 금천구 시흥동",
    "officialAdminNames": [
      "시흥1동",
      "시흥2동",
      "시흥3동",
      "시흥4동",
      "시흥5동"
    ],
    "officialLegalNames": [
      "시흥동"
    ],
    "publicCandidate": "시흥동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-geumcheon-%ec%8b%9c%ed%9d%a5%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yeongdeungpo-영등포동",
    "parentGu": "영등포구",
    "canonicalName": "서울특별시 영등포구 영등포동",
    "officialAdminNames": [
      "영등포본동",
      "영등포동"
    ],
    "officialLegalNames": [
      "영등포동",
      "영등포동1가",
      "영등포동2가",
      "영등포동3가",
      "영등포동4가",
      "영등포동5가",
      "영등포동6가",
      "영등포동7가",
      "영등포동8가"
    ],
    "publicCandidate": "영등포동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yeongdeungpo-%ec%98%81%eb%93%b1%ed%8f%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yeongdeungpo-여의동",
    "parentGu": "영등포구",
    "canonicalName": "서울특별시 영등포구 여의동",
    "officialAdminNames": [
      "여의동"
    ],
    "officialLegalNames": [
      "여의도동"
    ],
    "publicCandidate": "여의동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yeongdeungpo-%ec%97%ac%ec%9d%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yeongdeungpo-당산동",
    "parentGu": "영등포구",
    "canonicalName": "서울특별시 영등포구 당산동",
    "officialAdminNames": [
      "당산1동",
      "당산2동"
    ],
    "officialLegalNames": [
      "당산동1가",
      "당산동2가",
      "당산동3가",
      "당산동4가",
      "당산동5가",
      "당산동6가",
      "당산동"
    ],
    "publicCandidate": "당산동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yeongdeungpo-%eb%8b%b9%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yeongdeungpo-도림동",
    "parentGu": "영등포구",
    "canonicalName": "서울특별시 영등포구 도림동",
    "officialAdminNames": [
      "도림동"
    ],
    "officialLegalNames": [
      "도림동"
    ],
    "publicCandidate": "도림동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yeongdeungpo-%eb%8f%84%eb%a6%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yeongdeungpo-문래동",
    "parentGu": "영등포구",
    "canonicalName": "서울특별시 영등포구 문래동",
    "officialAdminNames": [
      "문래동"
    ],
    "officialLegalNames": [
      "문래동1가",
      "문래동2가",
      "문래동3가",
      "문래동4가",
      "문래동5가",
      "문래동6가"
    ],
    "publicCandidate": "문래동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yeongdeungpo-%eb%ac%b8%eb%9e%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yeongdeungpo-양평동",
    "parentGu": "영등포구",
    "canonicalName": "서울특별시 영등포구 양평동",
    "officialAdminNames": [
      "양평1동",
      "양평2동"
    ],
    "officialLegalNames": [
      "양평동1가",
      "양평동2가",
      "양평동3가",
      "양평동4가",
      "양평동5가",
      "양평동6가",
      "양평동"
    ],
    "publicCandidate": "양평동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yeongdeungpo-%ec%96%91%ed%8f%89%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yeongdeungpo-신길동",
    "parentGu": "영등포구",
    "canonicalName": "서울특별시 영등포구 신길동",
    "officialAdminNames": [
      "신길1동",
      "신길3동",
      "신길4동",
      "신길5동",
      "신길6동",
      "신길7동"
    ],
    "officialLegalNames": [
      "신길동"
    ],
    "publicCandidate": "신길동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yeongdeungpo-%ec%8b%a0%ea%b8%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yeongdeungpo-대림동",
    "parentGu": "영등포구",
    "canonicalName": "서울특별시 영등포구 대림동",
    "officialAdminNames": [
      "대림1동",
      "대림2동",
      "대림3동"
    ],
    "officialLegalNames": [
      "대림동"
    ],
    "publicCandidate": "대림동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yeongdeungpo-%eb%8c%80%eb%a6%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongjak-노량진동",
    "parentGu": "동작구",
    "canonicalName": "서울특별시 동작구 노량진동",
    "officialAdminNames": [
      "노량진1동",
      "노량진2동"
    ],
    "officialLegalNames": [
      "노량진동"
    ],
    "publicCandidate": "노량진동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongjak-%eb%85%b8%eb%9f%89%ec%a7%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongjak-상도동",
    "parentGu": "동작구",
    "canonicalName": "서울특별시 동작구 상도동",
    "officialAdminNames": [
      "상도1동",
      "상도2동",
      "상도3동",
      "상도4동"
    ],
    "officialLegalNames": [
      "상도동",
      "상도1동"
    ],
    "publicCandidate": "상도동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongjak-%ec%83%81%eb%8f%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongjak-흑석동",
    "parentGu": "동작구",
    "canonicalName": "서울특별시 동작구 흑석동",
    "officialAdminNames": [
      "흑석동"
    ],
    "officialLegalNames": [
      "흑석동"
    ],
    "publicCandidate": "흑석동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongjak-%ed%9d%91%ec%84%9d%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongjak-사당동",
    "parentGu": "동작구",
    "canonicalName": "서울특별시 동작구 사당동",
    "officialAdminNames": [
      "사당1동",
      "사당2동",
      "사당3동",
      "사당4동",
      "사당5동"
    ],
    "officialLegalNames": [
      "사당동"
    ],
    "publicCandidate": "사당동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongjak-%ec%82%ac%eb%8b%b9%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongjak-대방동",
    "parentGu": "동작구",
    "canonicalName": "서울특별시 동작구 대방동",
    "officialAdminNames": [
      "대방동"
    ],
    "officialLegalNames": [
      "대방동"
    ],
    "publicCandidate": "대방동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongjak-%eb%8c%80%eb%b0%a9%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongjak-신대방동",
    "parentGu": "동작구",
    "canonicalName": "서울특별시 동작구 신대방동",
    "officialAdminNames": [
      "신대방1동",
      "신대방2동"
    ],
    "officialLegalNames": [
      "신대방동"
    ],
    "publicCandidate": "신대방동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongjak-%ec%8b%a0%eb%8c%80%eb%b0%a9%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-보라매동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 보라매동",
    "officialAdminNames": [
      "보라매동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "보라매동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%eb%b3%b4%eb%9d%bc%eb%a7%a4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-청림동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 청림동",
    "officialAdminNames": [
      "청림동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "청림동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ec%b2%ad%eb%a6%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-성현동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 성현동",
    "officialAdminNames": [
      "성현동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "성현동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ec%84%b1%ed%98%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-행운동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 행운동",
    "officialAdminNames": [
      "행운동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "행운동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ed%96%89%ec%9a%b4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-낙성대동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 낙성대동",
    "officialAdminNames": [
      "낙성대동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "낙성대동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%eb%82%99%ec%84%b1%eb%8c%80%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-청룡동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 청룡동",
    "officialAdminNames": [
      "청룡동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "청룡동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ec%b2%ad%eb%a3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-은천동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 은천동",
    "officialAdminNames": [
      "은천동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "은천동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ec%9d%80%ec%b2%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-중앙동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 중앙동",
    "officialAdminNames": [
      "중앙동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "중앙동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ec%a4%91%ec%95%99%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-인헌동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 인헌동",
    "officialAdminNames": [
      "인헌동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "인헌동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ec%9d%b8%ed%97%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-남현동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 남현동",
    "officialAdminNames": [
      "남현동"
    ],
    "officialLegalNames": [
      "남현동"
    ],
    "publicCandidate": "남현동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%eb%82%a8%ed%98%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-서원동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 서원동",
    "officialAdminNames": [
      "서원동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "서원동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ec%84%9c%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-신원동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 신원동",
    "officialAdminNames": [
      "신원동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "신원동",
    "sourceMembership": [
      "ADMIN",
      "COLLISION"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": "신원동",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-gwanak-%ec%8b%a0%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-gwanak-서림동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 서림동",
    "officialAdminNames": [
      "서림동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "서림동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ec%84%9c%eb%a6%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-신사동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 신사동",
    "officialAdminNames": [
      "신사동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "신사동",
    "sourceMembership": [
      "ADMIN",
      "COLLISION"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": "신사동",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-gwanak-%ec%8b%a0%ec%82%ac%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-gwanak-신림동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 신림동",
    "officialAdminNames": [
      "신림동"
    ],
    "officialLegalNames": [
      "신림동"
    ],
    "publicCandidate": "신림동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ec%8b%a0%eb%a6%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-난향동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 난향동",
    "officialAdminNames": [
      "난향동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "난향동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%eb%82%9c%ed%96%a5%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-조원동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 조원동",
    "officialAdminNames": [
      "조원동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "조원동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%ec%a1%b0%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-대학동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 대학동",
    "officialAdminNames": [
      "대학동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "대학동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%eb%8c%80%ed%95%99%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-삼성동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 삼성동",
    "officialAdminNames": [
      "삼성동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "삼성동",
    "sourceMembership": [
      "ADMIN",
      "COLLISION"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": "삼성동",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-gwanak-%ec%82%bc%ec%84%b1%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-gwanak-미성동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 미성동",
    "officialAdminNames": [
      "미성동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "미성동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%eb%af%b8%ec%84%b1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-난곡동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 난곡동",
    "officialAdminNames": [
      "난곡동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "난곡동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%eb%82%9c%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-서초동",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구 서초동",
    "officialAdminNames": [
      "서초1동",
      "서초2동",
      "서초3동",
      "서초4동"
    ],
    "officialLegalNames": [
      "서초동"
    ],
    "publicCandidate": "서초동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seocho-%ec%84%9c%ec%b4%88%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-잠원동",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구 잠원동",
    "officialAdminNames": [
      "잠원동"
    ],
    "officialLegalNames": [
      "잠원동"
    ],
    "publicCandidate": "잠원동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seocho-%ec%9e%a0%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-반포동",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구 반포동",
    "officialAdminNames": [
      "반포본동",
      "반포1동",
      "반포2동",
      "반포3동",
      "반포4동"
    ],
    "officialLegalNames": [
      "반포동"
    ],
    "publicCandidate": "반포동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seocho-%eb%b0%98%ed%8f%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-방배동",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구 방배동",
    "officialAdminNames": [
      "방배본동",
      "방배1동",
      "방배2동",
      "방배3동",
      "방배4동"
    ],
    "officialLegalNames": [
      "방배동"
    ],
    "publicCandidate": "방배동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seocho-%eb%b0%a9%eb%b0%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-양재동",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구 양재동",
    "officialAdminNames": [
      "양재1동",
      "양재2동"
    ],
    "officialLegalNames": [
      "양재동"
    ],
    "publicCandidate": "양재동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seocho-%ec%96%91%ec%9e%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-내곡동",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구 내곡동",
    "officialAdminNames": [
      "내곡동"
    ],
    "officialLegalNames": [
      "내곡동"
    ],
    "publicCandidate": "내곡동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seocho-%eb%82%b4%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-신사동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 신사동",
    "officialAdminNames": [
      "신사동"
    ],
    "officialLegalNames": [
      "신사동"
    ],
    "publicCandidate": "신사동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "COLLISION"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": "신사동",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-gangnam-%ec%8b%a0%ec%82%ac%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-gangnam-논현동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 논현동",
    "officialAdminNames": [
      "논현1동",
      "논현2동"
    ],
    "officialLegalNames": [
      "논현동"
    ],
    "publicCandidate": "논현동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%eb%85%bc%ed%98%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-압구정동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 압구정동",
    "officialAdminNames": [
      "압구정동"
    ],
    "officialLegalNames": [
      "압구정동"
    ],
    "publicCandidate": "압구정동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%ec%95%95%ea%b5%ac%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-청담동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 청담동",
    "officialAdminNames": [
      "청담동"
    ],
    "officialLegalNames": [
      "청담동"
    ],
    "publicCandidate": "청담동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%ec%b2%ad%eb%8b%b4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-삼성동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 삼성동",
    "officialAdminNames": [
      "삼성1동",
      "삼성2동"
    ],
    "officialLegalNames": [
      "삼성동"
    ],
    "publicCandidate": "삼성동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP",
      "COLLISION"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": "삼성동",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-gangnam-%ec%82%bc%ec%84%b1%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-gangnam-대치동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 대치동",
    "officialAdminNames": [
      "대치1동",
      "대치2동",
      "대치4동"
    ],
    "officialLegalNames": [
      "대치동"
    ],
    "publicCandidate": "대치동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%eb%8c%80%ec%b9%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-역삼동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 역삼동",
    "officialAdminNames": [
      "역삼1동",
      "역삼2동"
    ],
    "officialLegalNames": [
      "역삼동"
    ],
    "publicCandidate": "역삼동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%ec%97%ad%ec%82%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-도곡동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 도곡동",
    "officialAdminNames": [
      "도곡1동",
      "도곡2동"
    ],
    "officialLegalNames": [
      "도곡동"
    ],
    "publicCandidate": "도곡동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%eb%8f%84%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-개포동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 개포동",
    "officialAdminNames": [
      "개포1동",
      "개포2동",
      "개포3동",
      "개포4동"
    ],
    "officialLegalNames": [
      "개포동"
    ],
    "publicCandidate": "개포동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%ea%b0%9c%ed%8f%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-일원동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 일원동",
    "officialAdminNames": [
      "일원본동",
      "일원1동"
    ],
    "officialLegalNames": [
      "일원동"
    ],
    "publicCandidate": "일원동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%ec%9d%bc%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-수서동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 수서동",
    "officialAdminNames": [
      "수서동"
    ],
    "officialLegalNames": [
      "수서동"
    ],
    "publicCandidate": "수서동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%ec%88%98%ec%84%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-세곡동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 세곡동",
    "officialAdminNames": [
      "세곡동"
    ],
    "officialLegalNames": [
      "세곡동"
    ],
    "publicCandidate": "세곡동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%ec%84%b8%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-풍납동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 풍납동",
    "officialAdminNames": [
      "풍납1동",
      "풍납2동"
    ],
    "officialLegalNames": [
      "풍납동"
    ],
    "publicCandidate": "풍납동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ed%92%8d%eb%82%a9%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-거여동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 거여동",
    "officialAdminNames": [
      "거여1동",
      "거여2동"
    ],
    "officialLegalNames": [
      "거여동"
    ],
    "publicCandidate": "거여동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ea%b1%b0%ec%97%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-마천동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 마천동",
    "officialAdminNames": [
      "마천1동",
      "마천2동"
    ],
    "officialLegalNames": [
      "마천동"
    ],
    "publicCandidate": "마천동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%eb%a7%88%ec%b2%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-방이동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 방이동",
    "officialAdminNames": [
      "방이1동",
      "방이2동"
    ],
    "officialLegalNames": [
      "방이동"
    ],
    "publicCandidate": "방이동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%eb%b0%a9%ec%9d%b4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-오륜동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 오륜동",
    "officialAdminNames": [
      "오륜동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "오륜동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ec%98%a4%eb%a5%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-오금동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 오금동",
    "officialAdminNames": [
      "오금동"
    ],
    "officialLegalNames": [
      "오금동"
    ],
    "publicCandidate": "오금동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ec%98%a4%ea%b8%88%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-송파동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 송파동",
    "officialAdminNames": [
      "송파1동",
      "송파2동"
    ],
    "officialLegalNames": [
      "송파동"
    ],
    "publicCandidate": "송파동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ec%86%a1%ed%8c%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-석촌동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 석촌동",
    "officialAdminNames": [
      "석촌동"
    ],
    "officialLegalNames": [
      "석촌동"
    ],
    "publicCandidate": "석촌동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ec%84%9d%ec%b4%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-삼전동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 삼전동",
    "officialAdminNames": [
      "삼전동"
    ],
    "officialLegalNames": [
      "삼전동"
    ],
    "publicCandidate": "삼전동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ec%82%bc%ec%a0%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-가락동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 가락동",
    "officialAdminNames": [
      "가락본동",
      "가락1동",
      "가락2동"
    ],
    "officialLegalNames": [
      "가락동"
    ],
    "publicCandidate": "가락동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ea%b0%80%eb%9d%bd%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-문정동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 문정동",
    "officialAdminNames": [
      "문정1동",
      "문정2동"
    ],
    "officialLegalNames": [
      "문정동"
    ],
    "publicCandidate": "문정동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%eb%ac%b8%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-장지동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 장지동",
    "officialAdminNames": [
      "장지동"
    ],
    "officialLegalNames": [
      "장지동"
    ],
    "publicCandidate": "장지동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ec%9e%a5%ec%a7%80%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-위례동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 위례동",
    "officialAdminNames": [
      "위례동"
    ],
    "officialLegalNames": [],
    "publicCandidate": "위례동",
    "sourceMembership": [
      "ADMIN"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ec%9c%84%eb%a1%80%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-잠실동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 잠실동",
    "officialAdminNames": [
      "잠실본동",
      "잠실2동",
      "잠실3동",
      "잠실4동",
      "잠실6동",
      "잠실7동"
    ],
    "officialLegalNames": [
      "잠실동"
    ],
    "publicCandidate": "잠실동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ec%9e%a0%ec%8b%a4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangdong-강일동",
    "parentGu": "강동구",
    "canonicalName": "서울특별시 강동구 강일동",
    "officialAdminNames": [
      "강일동"
    ],
    "officialLegalNames": [
      "강일동"
    ],
    "publicCandidate": "강일동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangdong-%ea%b0%95%ec%9d%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangdong-상일동",
    "parentGu": "강동구",
    "canonicalName": "서울특별시 강동구 상일동",
    "officialAdminNames": [
      "상일1동",
      "상일2동"
    ],
    "officialLegalNames": [
      "상일동"
    ],
    "publicCandidate": "상일동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangdong-%ec%83%81%ec%9d%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangdong-명일동",
    "parentGu": "강동구",
    "canonicalName": "서울특별시 강동구 명일동",
    "officialAdminNames": [
      "명일1동",
      "명일2동"
    ],
    "officialLegalNames": [
      "명일동"
    ],
    "publicCandidate": "명일동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangdong-%eb%aa%85%ec%9d%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangdong-고덕동",
    "parentGu": "강동구",
    "canonicalName": "서울특별시 강동구 고덕동",
    "officialAdminNames": [
      "고덕1동",
      "고덕2동"
    ],
    "officialLegalNames": [
      "고덕동"
    ],
    "publicCandidate": "고덕동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangdong-%ea%b3%a0%eb%8d%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangdong-암사동",
    "parentGu": "강동구",
    "canonicalName": "서울특별시 강동구 암사동",
    "officialAdminNames": [
      "암사1동",
      "암사2동",
      "암사3동"
    ],
    "officialLegalNames": [
      "암사동"
    ],
    "publicCandidate": "암사동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangdong-%ec%95%94%ec%82%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangdong-천호동",
    "parentGu": "강동구",
    "canonicalName": "서울특별시 강동구 천호동",
    "officialAdminNames": [
      "천호1동",
      "천호2동",
      "천호3동"
    ],
    "officialLegalNames": [
      "천호동"
    ],
    "publicCandidate": "천호동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangdong-%ec%b2%9c%ed%98%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangdong-성내동",
    "parentGu": "강동구",
    "canonicalName": "서울특별시 강동구 성내동",
    "officialAdminNames": [
      "성내1동",
      "성내2동",
      "성내3동"
    ],
    "officialLegalNames": [
      "성내동"
    ],
    "publicCandidate": "성내동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangdong-%ec%84%b1%eb%82%b4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangdong-길동",
    "parentGu": "강동구",
    "canonicalName": "서울특별시 강동구 길동",
    "officialAdminNames": [
      "길동"
    ],
    "officialLegalNames": [
      "길동"
    ],
    "publicCandidate": "길동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangdong-%ea%b8%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangdong-둔촌동",
    "parentGu": "강동구",
    "canonicalName": "서울특별시 강동구 둔촌동",
    "officialAdminNames": [
      "둔촌1동",
      "둔촌2동"
    ],
    "officialLegalNames": [
      "둔촌동"
    ],
    "publicCandidate": "둔촌동",
    "sourceMembership": [
      "ADMIN",
      "LEGAL",
      "NORMALIZED_GROUP"
    ],
    "isNormalizedAdmin": true,
    "isLegalOnly": false,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangdong-%eb%91%94%ec%b4%8c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-jongno-청운동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 청운동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "청운동"
    ],
    "publicCandidate": "청운동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%b2%ad%ec%9a%b4%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-신교동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 신교동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "신교동"
    ],
    "publicCandidate": "신교동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%8b%a0%ea%b5%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-궁정동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 궁정동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "궁정동"
    ],
    "publicCandidate": "궁정동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b6%81%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-효자동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 효자동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "효자동"
    ],
    "publicCandidate": "효자동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%9a%a8%ec%9e%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-창성동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 창성동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "창성동"
    ],
    "publicCandidate": "창성동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%b0%bd%ec%84%b1%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-통의동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 통의동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "통의동"
    ],
    "publicCandidate": "통의동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%86%b5%ec%9d%98%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-적선동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 적선동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "적선동"
    ],
    "publicCandidate": "적선동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%a0%81%ec%84%a0%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-통인동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 통인동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "통인동"
    ],
    "publicCandidate": "통인동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%86%b5%ec%9d%b8%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-누상동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 누상동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "누상동"
    ],
    "publicCandidate": "누상동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%88%84%ec%83%81%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-누하동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 누하동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "누하동"
    ],
    "publicCandidate": "누하동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%88%84%ed%95%98%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-옥인동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 옥인동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "옥인동"
    ],
    "publicCandidate": "옥인동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%98%a5%ec%9d%b8%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-체부동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 체부동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "체부동"
    ],
    "publicCandidate": "체부동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%b2%b4%eb%b6%80%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-필운동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 필운동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "필운동"
    ],
    "publicCandidate": "필운동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%95%84%ec%9a%b4%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-내자동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 내자동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "내자동"
    ],
    "publicCandidate": "내자동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%82%b4%ec%9e%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-도염동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 도염동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "도염동"
    ],
    "publicCandidate": "도염동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%8f%84%ec%97%bc%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-당주동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 당주동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "당주동"
    ],
    "publicCandidate": "당주동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%8b%b9%ec%a3%bc%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-내수동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 내수동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "내수동"
    ],
    "publicCandidate": "내수동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%82%b4%ec%88%98%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-세종로",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 세종로",
    "officialAdminNames": [],
    "officialLegalNames": [
      "세종로"
    ],
    "publicCandidate": "세종로",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%84%b8%ec%a2%85%eb%a1%9c",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-신문로1가",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 신문로1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "신문로1가"
    ],
    "publicCandidate": "신문로1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%8b%a0%eb%ac%b8%eb%a1%9c1%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-신문로2가",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 신문로2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "신문로2가"
    ],
    "publicCandidate": "신문로2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%8b%a0%eb%ac%b8%eb%a1%9c2%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-청진동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 청진동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "청진동"
    ],
    "publicCandidate": "청진동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%b2%ad%ec%a7%84%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-서린동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 서린동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "서린동"
    ],
    "publicCandidate": "서린동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%84%9c%eb%a6%b0%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-수송동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 수송동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "수송동"
    ],
    "publicCandidate": "수송동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%88%98%ec%86%a1%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-중학동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 중학동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "중학동"
    ],
    "publicCandidate": "중학동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%a4%91%ed%95%99%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-공평동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 공평동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "공평동"
    ],
    "publicCandidate": "공평동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b3%b5%ed%8f%89%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-관훈동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 관훈동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "관훈동"
    ],
    "publicCandidate": "관훈동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b4%80%ed%9b%88%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-견지동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 견지동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "견지동"
    ],
    "publicCandidate": "견지동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b2%ac%ec%a7%80%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-와룡동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 와룡동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "와룡동"
    ],
    "publicCandidate": "와룡동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%99%80%eb%a3%a1%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-권농동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 권농동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "권농동"
    ],
    "publicCandidate": "권농동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b6%8c%eb%86%8d%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-운니동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 운니동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "운니동"
    ],
    "publicCandidate": "운니동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%9a%b4%eb%8b%88%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-익선동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 익선동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "익선동"
    ],
    "publicCandidate": "익선동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%9d%b5%ec%84%a0%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-경운동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 경운동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "경운동"
    ],
    "publicCandidate": "경운동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b2%bd%ec%9a%b4%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-관철동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 관철동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "관철동"
    ],
    "publicCandidate": "관철동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b4%80%ec%b2%a0%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-인사동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 인사동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "인사동"
    ],
    "publicCandidate": "인사동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%9d%b8%ec%82%ac%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-낙원동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 낙원동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "낙원동"
    ],
    "publicCandidate": "낙원동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%82%99%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-팔판동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 팔판동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "팔판동"
    ],
    "publicCandidate": "팔판동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%8c%94%ed%8c%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-안국동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 안국동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "안국동"
    ],
    "publicCandidate": "안국동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%95%88%ea%b5%ad%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-소격동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 소격동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "소격동"
    ],
    "publicCandidate": "소격동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%86%8c%ea%b2%a9%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-화동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 화동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "화동"
    ],
    "publicCandidate": "화동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%99%94%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-사간동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 사간동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "사간동"
    ],
    "publicCandidate": "사간동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%82%ac%ea%b0%84%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-송현동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 송현동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "송현동"
    ],
    "publicCandidate": "송현동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%86%a1%ed%98%84%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-재동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 재동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "재동"
    ],
    "publicCandidate": "재동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%9e%ac%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-계동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 계동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "계동"
    ],
    "publicCandidate": "계동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b3%84%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-원서동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 원서동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "원서동"
    ],
    "publicCandidate": "원서동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%9b%90%ec%84%9c%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-훈정동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 훈정동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "훈정동"
    ],
    "publicCandidate": "훈정동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%9b%88%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-묘동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 묘동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "묘동"
    ],
    "publicCandidate": "묘동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%ac%98%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-봉익동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 봉익동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "봉익동"
    ],
    "publicCandidate": "봉익동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%b4%89%ec%9d%b5%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-돈의동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 돈의동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "돈의동"
    ],
    "publicCandidate": "돈의동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%8f%88%ec%9d%98%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-장사동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 장사동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "장사동"
    ],
    "publicCandidate": "장사동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%9e%a5%ec%82%ac%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-관수동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 관수동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "관수동"
    ],
    "publicCandidate": "관수동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b4%80%ec%88%98%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-인의동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 인의동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "인의동"
    ],
    "publicCandidate": "인의동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%9d%b8%ec%9d%98%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-예지동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 예지동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "예지동"
    ],
    "publicCandidate": "예지동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%98%88%ec%a7%80%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-원남동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 원남동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "원남동"
    ],
    "publicCandidate": "원남동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%9b%90%eb%82%a8%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-연지동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 연지동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "연지동"
    ],
    "publicCandidate": "연지동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%97%b0%ec%a7%80%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-효제동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 효제동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "효제동"
    ],
    "publicCandidate": "효제동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%9a%a8%ec%a0%9c%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-연건동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 연건동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "연건동"
    ],
    "publicCandidate": "연건동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%97%b0%ea%b1%b4%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-충신동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 충신동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "충신동"
    ],
    "publicCandidate": "충신동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%b6%a9%ec%8b%a0%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-동숭동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 동숭동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동숭동"
    ],
    "publicCandidate": "동숭동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%8f%99%ec%88%ad%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-명륜1가",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 명륜1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "명륜1가"
    ],
    "publicCandidate": "명륜1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%aa%85%eb%a5%9c1%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-명륜2가",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 명륜2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "명륜2가"
    ],
    "publicCandidate": "명륜2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%aa%85%eb%a5%9c2%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-명륜3가",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 명륜3가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "명륜3가"
    ],
    "publicCandidate": "명륜3가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%aa%85%eb%a5%9c3%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-명륜4가",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 명륜4가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "명륜4가"
    ],
    "publicCandidate": "명륜4가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%eb%aa%85%eb%a5%9c4%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-평동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 평동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "평동"
    ],
    "publicCandidate": "평동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%8f%89%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-송월동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 송월동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "송월동"
    ],
    "publicCandidate": "송월동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%86%a1%ec%9b%94%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-홍파동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 홍파동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "홍파동"
    ],
    "publicCandidate": "홍파동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%99%8d%ed%8c%8c%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-교북동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 교북동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "교북동"
    ],
    "publicCandidate": "교북동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b5%90%eb%b6%81%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-행촌동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 행촌동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "행촌동"
    ],
    "publicCandidate": "행촌동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%96%89%ec%b4%8c%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-구기동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 구기동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "구기동"
    ],
    "publicCandidate": "구기동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ea%b5%ac%ea%b8%b0%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-홍지동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 홍지동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "홍지동"
    ],
    "publicCandidate": "홍지동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ed%99%8d%ec%a7%80%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jongno-신영동",
    "parentGu": "종로구",
    "canonicalName": "서울특별시 종로구 신영동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "신영동"
    ],
    "publicCandidate": "신영동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jongno-%ec%8b%a0%ec%98%81%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-무교동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 무교동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "무교동"
    ],
    "publicCandidate": "무교동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%ac%b4%ea%b5%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-다동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 다동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "다동"
    ],
    "publicCandidate": "다동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%8b%a4%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-태평로1가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 태평로1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "태평로1가"
    ],
    "publicCandidate": "태평로1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ed%83%9c%ed%8f%89%eb%a1%9c1%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-남대문로1가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 남대문로1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "남대문로1가"
    ],
    "publicCandidate": "남대문로1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%82%a8%eb%8c%80%eb%ac%b8%eb%a1%9c1%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-삼각동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 삼각동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "삼각동"
    ],
    "publicCandidate": "삼각동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%82%bc%ea%b0%81%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-수하동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 수하동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "수하동"
    ],
    "publicCandidate": "수하동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%88%98%ed%95%98%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-장교동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 장교동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "장교동"
    ],
    "publicCandidate": "장교동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%9e%a5%ea%b5%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-수표동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 수표동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "수표동"
    ],
    "publicCandidate": "수표동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%88%98%ed%91%9c%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-북창동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 북창동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "북창동"
    ],
    "publicCandidate": "북창동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%b6%81%ec%b0%bd%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-태평로2가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 태평로2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "태평로2가"
    ],
    "publicCandidate": "태평로2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ed%83%9c%ed%8f%89%eb%a1%9c2%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-남대문로2가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 남대문로2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "남대문로2가"
    ],
    "publicCandidate": "남대문로2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%82%a8%eb%8c%80%eb%ac%b8%eb%a1%9c2%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-남대문로3가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 남대문로3가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "남대문로3가"
    ],
    "publicCandidate": "남대문로3가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%82%a8%eb%8c%80%eb%ac%b8%eb%a1%9c3%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-남대문로4가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 남대문로4가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "남대문로4가"
    ],
    "publicCandidate": "남대문로4가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%82%a8%eb%8c%80%eb%ac%b8%eb%a1%9c4%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-남대문로5가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 남대문로5가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "남대문로5가"
    ],
    "publicCandidate": "남대문로5가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%82%a8%eb%8c%80%eb%ac%b8%eb%a1%9c5%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-봉래동1가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 봉래동1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "봉래동1가"
    ],
    "publicCandidate": "봉래동1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%b4%89%eb%9e%98%eb%8f%991%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-봉래동2가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 봉래동2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "봉래동2가"
    ],
    "publicCandidate": "봉래동2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%b4%89%eb%9e%98%eb%8f%992%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-충무로1가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 충무로1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "충무로1가"
    ],
    "publicCandidate": "충무로1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%b6%a9%eb%ac%b4%eb%a1%9c1%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-충무로2가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 충무로2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "충무로2가"
    ],
    "publicCandidate": "충무로2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%b6%a9%eb%ac%b4%eb%a1%9c2%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-남산동1가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 남산동1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "남산동1가"
    ],
    "publicCandidate": "남산동1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%82%a8%ec%82%b0%eb%8f%991%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-남산동2가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 남산동2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "남산동2가"
    ],
    "publicCandidate": "남산동2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%82%a8%ec%82%b0%eb%8f%992%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-남산동3가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 남산동3가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "남산동3가"
    ],
    "publicCandidate": "남산동3가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%82%a8%ec%82%b0%eb%8f%993%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-저동1가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 저동1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "저동1가"
    ],
    "publicCandidate": "저동1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%a0%80%eb%8f%991%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-충무로4가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 충무로4가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "충무로4가"
    ],
    "publicCandidate": "충무로4가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%b6%a9%eb%ac%b4%eb%a1%9c4%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-충무로5가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 충무로5가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "충무로5가"
    ],
    "publicCandidate": "충무로5가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%b6%a9%eb%ac%b4%eb%a1%9c5%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-인현동2가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 인현동2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "인현동2가"
    ],
    "publicCandidate": "인현동2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%9d%b8%ed%98%84%eb%8f%992%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-예관동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 예관동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "예관동"
    ],
    "publicCandidate": "예관동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%98%88%ea%b4%80%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-묵정동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 묵정동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "묵정동"
    ],
    "publicCandidate": "묵정동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%ac%b5%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-남학동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 남학동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "남학동"
    ],
    "publicCandidate": "남학동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%82%a8%ed%95%99%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-주자동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 주자동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "주자동"
    ],
    "publicCandidate": "주자동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%a3%bc%ec%9e%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-예장동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 예장동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "예장동"
    ],
    "publicCandidate": "예장동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%98%88%ec%9e%a5%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-쌍림동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 쌍림동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "쌍림동"
    ],
    "publicCandidate": "쌍림동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%8c%8d%eb%a6%bc%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-주교동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 주교동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "주교동"
    ],
    "publicCandidate": "주교동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%a3%bc%ea%b5%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-방산동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 방산동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "방산동"
    ],
    "publicCandidate": "방산동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%b0%a9%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-오장동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 오장동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "오장동"
    ],
    "publicCandidate": "오장동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%98%a4%ec%9e%a5%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-입정동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 입정동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "입정동"
    ],
    "publicCandidate": "입정동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%9e%85%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-산림동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 산림동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "산림동"
    ],
    "publicCandidate": "산림동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%82%b0%eb%a6%bc%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-충무로3가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 충무로3가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "충무로3가"
    ],
    "publicCandidate": "충무로3가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%b6%a9%eb%ac%b4%eb%a1%9c3%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-초동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 초동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "초동"
    ],
    "publicCandidate": "초동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%b4%88%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-인현동1가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 인현동1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "인현동1가"
    ],
    "publicCandidate": "인현동1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%9d%b8%ed%98%84%eb%8f%991%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-저동2가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 저동2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "저동2가"
    ],
    "publicCandidate": "저동2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%a0%80%eb%8f%992%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-흥인동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 흥인동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "흥인동"
    ],
    "publicCandidate": "흥인동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ed%9d%a5%ec%9d%b8%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-무학동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 무학동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "무학동"
    ],
    "publicCandidate": "무학동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%ac%b4%ed%95%99%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-서소문동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 서소문동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "서소문동"
    ],
    "publicCandidate": "서소문동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%84%9c%ec%86%8c%eb%ac%b8%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-정동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 정동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "정동"
    ],
    "publicCandidate": "정동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-순화동",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 순화동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "순화동"
    ],
    "publicCandidate": "순화동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%88%9c%ed%99%94%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-의주로1가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 의주로1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "의주로1가"
    ],
    "publicCandidate": "의주로1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%9d%98%ec%a3%bc%eb%a1%9c1%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-의주로2가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 의주로2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "의주로2가"
    ],
    "publicCandidate": "의주로2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%ec%9d%98%ec%a3%bc%eb%a1%9c2%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-충정로",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 충정로",
    "officialAdminNames": [],
    "officialLegalNames": [
      "충정로1가"
    ],
    "publicCandidate": "충정로",
    "sourceMembership": [
      "LEGAL",
      "COLLISION"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": "충정로",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-jung-%ec%b6%a9%ec%a0%95%eb%a1%9c",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-jung-만리동1가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 만리동1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "만리동1가"
    ],
    "publicCandidate": "만리동1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%a7%8c%eb%a6%ac%eb%8f%991%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-jung-만리동2가",
    "parentGu": "중구",
    "canonicalName": "서울특별시 중구 만리동2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "만리동2가"
    ],
    "publicCandidate": "만리동2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": true,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "MICRO_REVIEW",
    "routeKeyCandidate": "seoul-jung-%eb%a7%8c%eb%a6%ac%eb%8f%992%ea%b0%80",
    "includeInApprovedSet": false,
    "excludeReason": "MICRO_LEGAL_PARCEL"
  },
  {
    "regionRecordId": "seoul-yongsan-갈월동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 갈월동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "갈월동"
    ],
    "publicCandidate": "갈월동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ea%b0%88%ec%9b%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-동자동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 동자동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동자동"
    ],
    "publicCandidate": "동자동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%eb%8f%99%ec%9e%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-서계동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 서계동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "서계동"
    ],
    "publicCandidate": "서계동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%84%9c%ea%b3%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-신창동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 신창동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "신창동"
    ],
    "publicCandidate": "신창동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%8b%a0%ec%b0%bd%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-산천동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 산천동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "산천동"
    ],
    "publicCandidate": "산천동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%82%b0%ec%b2%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-청암동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 청암동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "청암동"
    ],
    "publicCandidate": "청암동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%b2%ad%ec%95%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-도원동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 도원동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "도원동"
    ],
    "publicCandidate": "도원동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%eb%8f%84%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-문배동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 문배동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "문배동"
    ],
    "publicCandidate": "문배동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%eb%ac%b8%eb%b0%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-신계동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 신계동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "신계동"
    ],
    "publicCandidate": "신계동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%8b%a0%ea%b3%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-동빙고동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 동빙고동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동빙고동"
    ],
    "publicCandidate": "동빙고동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%eb%8f%99%eb%b9%99%ea%b3%a0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yongsan-주성동",
    "parentGu": "용산구",
    "canonicalName": "서울특별시 용산구 주성동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "주성동"
    ],
    "publicCandidate": "주성동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yongsan-%ec%a3%bc%ec%84%b1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-상왕십리동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 상왕십리동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "상왕십리동"
    ],
    "publicCandidate": "상왕십리동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ec%83%81%ec%99%95%ec%8b%ad%eb%a6%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-하왕십리동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 하왕십리동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "하왕십리동"
    ],
    "publicCandidate": "하왕십리동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ed%95%98%ec%99%95%ec%8b%ad%eb%a6%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-홍익동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 홍익동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "홍익동"
    ],
    "publicCandidate": "홍익동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%ed%99%8d%ec%9d%b5%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongdong-도선동",
    "parentGu": "성동구",
    "canonicalName": "서울특별시 성동구 도선동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "도선동"
    ],
    "publicCandidate": "도선동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongdong-%eb%8f%84%ec%84%a0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-동소문동1가",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 동소문동1가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동소문동1가"
    ],
    "publicCandidate": "동소문동1가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%eb%8f%99%ec%86%8c%eb%ac%b8%eb%8f%991%ea%b0%80",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-동소문동2가",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 동소문동2가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동소문동2가"
    ],
    "publicCandidate": "동소문동2가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%eb%8f%99%ec%86%8c%eb%ac%b8%eb%8f%992%ea%b0%80",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-동소문동3가",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 동소문동3가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동소문동3가"
    ],
    "publicCandidate": "동소문동3가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%eb%8f%99%ec%86%8c%eb%ac%b8%eb%8f%993%ea%b0%80",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-동소문동4가",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 동소문동4가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동소문동4가"
    ],
    "publicCandidate": "동소문동4가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%eb%8f%99%ec%86%8c%eb%ac%b8%eb%8f%994%ea%b0%80",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-동소문동5가",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 동소문동5가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동소문동5가"
    ],
    "publicCandidate": "동소문동5가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%eb%8f%99%ec%86%8c%eb%ac%b8%eb%8f%995%ea%b0%80",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-동소문동6가",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 동소문동6가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동소문동6가"
    ],
    "publicCandidate": "동소문동6가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%eb%8f%99%ec%86%8c%eb%ac%b8%eb%8f%996%ea%b0%80",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-동소문동7가",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 동소문동7가",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동소문동7가"
    ],
    "publicCandidate": "동소문동7가",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%eb%8f%99%ec%86%8c%eb%ac%b8%eb%8f%997%ea%b0%80",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-하월곡동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 하월곡동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "하월곡동"
    ],
    "publicCandidate": "하월곡동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ed%95%98%ec%9b%94%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seongbuk-상월곡동",
    "parentGu": "성북구",
    "canonicalName": "서울특별시 성북구 상월곡동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "상월곡동"
    ],
    "publicCandidate": "상월곡동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seongbuk-%ec%83%81%ec%9b%94%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-충정로",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 충정로",
    "officialAdminNames": [],
    "officialLegalNames": [
      "충정로2가",
      "충정로3가"
    ],
    "publicCandidate": "충정로",
    "sourceMembership": [
      "LEGAL",
      "COLLISION"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": "충정로",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-seodaemun-%ec%b6%a9%ec%a0%95%eb%a1%9c",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-seodaemun-합동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 합동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "합동"
    ],
    "publicCandidate": "합동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ed%95%a9%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-미근동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 미근동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "미근동"
    ],
    "publicCandidate": "미근동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%eb%af%b8%ea%b7%bc%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-냉천동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 냉천동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "냉천동"
    ],
    "publicCandidate": "냉천동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%eb%83%89%ec%b2%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-옥천동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 옥천동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "옥천동"
    ],
    "publicCandidate": "옥천동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ec%98%a5%ec%b2%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-영천동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 영천동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "영천동"
    ],
    "publicCandidate": "영천동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ec%98%81%ec%b2%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-현저동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 현저동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "현저동"
    ],
    "publicCandidate": "현저동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ed%98%84%ec%a0%80%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-대현동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 대현동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "대현동"
    ],
    "publicCandidate": "대현동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%eb%8c%80%ed%98%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-대신동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 대신동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "대신동"
    ],
    "publicCandidate": "대신동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%eb%8c%80%ec%8b%a0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-봉원동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 봉원동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "봉원동"
    ],
    "publicCandidate": "봉원동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%eb%b4%89%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seodaemun-창천동",
    "parentGu": "서대문구",
    "canonicalName": "서울특별시 서대문구 창천동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "창천동"
    ],
    "publicCandidate": "창천동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seodaemun-%ec%b0%bd%ec%b2%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-신공덕동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 신공덕동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "신공덕동"
    ],
    "publicCandidate": "신공덕동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%8b%a0%ea%b3%b5%eb%8d%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-토정동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 토정동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "토정동"
    ],
    "publicCandidate": "토정동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ed%86%a0%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-마포동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 마포동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "마포동"
    ],
    "publicCandidate": "마포동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%eb%a7%88%ed%8f%ac%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-노고산동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 노고산동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "노고산동"
    ],
    "publicCandidate": "노고산동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%eb%85%b8%ea%b3%a0%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-현석동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 현석동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "현석동"
    ],
    "publicCandidate": "현석동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ed%98%84%ec%84%9d%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-구수동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 구수동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "구수동"
    ],
    "publicCandidate": "구수동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ea%b5%ac%ec%88%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-창전동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 창전동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "창전동"
    ],
    "publicCandidate": "창전동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%b0%bd%ec%a0%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-상수동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 상수동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "상수동"
    ],
    "publicCandidate": "상수동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%83%81%ec%88%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-하중동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 하중동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "하중동"
    ],
    "publicCandidate": "하중동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ed%95%98%ec%a4%91%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-신정동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 신정동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "신정동"
    ],
    "publicCandidate": "신정동",
    "sourceMembership": [
      "LEGAL",
      "COLLISION"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": "신정동",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-mapo-%ec%8b%a0%ec%a0%95%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-mapo-당인동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 당인동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "당인동"
    ],
    "publicCandidate": "당인동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%eb%8b%b9%ec%9d%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-동교동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 동교동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동교동"
    ],
    "publicCandidate": "동교동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%eb%8f%99%ea%b5%90%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-mapo-중동",
    "parentGu": "마포구",
    "canonicalName": "서울특별시 마포구 중동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "중동"
    ],
    "publicCandidate": "중동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-mapo-%ec%a4%91%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-마곡동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 마곡동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "마곡동"
    ],
    "publicCandidate": "마곡동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%eb%a7%88%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-내발산동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 내발산동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "내발산동"
    ],
    "publicCandidate": "내발산동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%eb%82%b4%eb%b0%9c%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-외발산동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 외발산동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "외발산동"
    ],
    "publicCandidate": "외발산동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%ec%99%b8%eb%b0%9c%ec%82%b0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-개화동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 개화동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "개화동"
    ],
    "publicCandidate": "개화동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%ea%b0%9c%ed%99%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-과해동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 과해동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "과해동"
    ],
    "publicCandidate": "과해동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%ea%b3%bc%ed%95%b4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-오곡동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 오곡동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "오곡동"
    ],
    "publicCandidate": "오곡동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%ec%98%a4%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangseo-오쇠동",
    "parentGu": "강서구",
    "canonicalName": "서울특별시 강서구 오쇠동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "오쇠동"
    ],
    "publicCandidate": "오쇠동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangseo-%ec%98%a4%ec%87%a0%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-궁동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 궁동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "궁동"
    ],
    "publicCandidate": "궁동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ea%b6%81%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-온수동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 온수동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "온수동"
    ],
    "publicCandidate": "온수동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ec%98%a8%ec%88%98%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-guro-천왕동",
    "parentGu": "구로구",
    "canonicalName": "서울특별시 구로구 천왕동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "천왕동"
    ],
    "publicCandidate": "천왕동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-guro-%ec%b2%9c%ec%99%95%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-yeongdeungpo-양화동",
    "parentGu": "영등포구",
    "canonicalName": "서울특별시 영등포구 양화동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "양화동"
    ],
    "publicCandidate": "양화동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-yeongdeungpo-%ec%96%91%ed%99%94%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongjak-본동",
    "parentGu": "동작구",
    "canonicalName": "서울특별시 동작구 본동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "본동"
    ],
    "publicCandidate": "본동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongjak-%eb%b3%b8%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-dongjak-동작동",
    "parentGu": "동작구",
    "canonicalName": "서울특별시 동작구 동작동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "동작동"
    ],
    "publicCandidate": "동작동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-dongjak-%eb%8f%99%ec%9e%91%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gwanak-봉천동",
    "parentGu": "관악구",
    "canonicalName": "서울특별시 관악구 봉천동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "봉천동"
    ],
    "publicCandidate": "봉천동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gwanak-%eb%b4%89%ec%b2%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-우면동",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구 우면동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "우면동"
    ],
    "publicCandidate": "우면동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seocho-%ec%9a%b0%eb%a9%b4%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-원지동",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구 원지동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "원지동"
    ],
    "publicCandidate": "원지동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seocho-%ec%9b%90%ec%a7%80%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-염곡동",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구 염곡동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "염곡동"
    ],
    "publicCandidate": "염곡동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-seocho-%ec%97%bc%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-seocho-신원동",
    "parentGu": "서초구",
    "canonicalName": "서울특별시 서초구 신원동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "신원동"
    ],
    "publicCandidate": "신원동",
    "sourceMembership": [
      "LEGAL",
      "COLLISION"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": "신원동",
    "collisionStatus": "HOLD",
    "approvalStatus": "COLLISION_HOLD",
    "routeKeyCandidate": "seoul-seocho-%ec%8b%a0%ec%9b%90%eb%8f%99",
    "includeInApprovedSet": false,
    "excludeReason": "SAME_NAME_CROSS_GU_COLLISION"
  },
  {
    "regionRecordId": "seoul-gangnam-자곡동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 자곡동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "자곡동"
    ],
    "publicCandidate": "자곡동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%ec%9e%90%ea%b3%a1%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-gangnam-율현동",
    "parentGu": "강남구",
    "canonicalName": "서울특별시 강남구 율현동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "율현동"
    ],
    "publicCandidate": "율현동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-gangnam-%ec%9c%a8%ed%98%84%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  },
  {
    "regionRecordId": "seoul-songpa-신천동",
    "parentGu": "송파구",
    "canonicalName": "서울특별시 송파구 신천동",
    "officialAdminNames": [],
    "officialLegalNames": [
      "신천동"
    ],
    "publicCandidate": "신천동",
    "sourceMembership": [
      "LEGAL"
    ],
    "isNormalizedAdmin": false,
    "isLegalOnly": true,
    "isMicroLegal": false,
    "isSpecialReview": false,
    "collisionGroup": null,
    "collisionStatus": "NONE",
    "approvalStatus": "APPROVED",
    "routeKeyCandidate": "seoul-songpa-%ec%8b%a0%ec%b2%9c%eb%8f%99",
    "includeInApprovedSet": true,
    "excludeReason": null
  }
];

export function getManifestCounts() {
  const dongs = SEOUL_DONG_MANIFEST_RECORDS;
  return {
    totalDongRecords: dongs.length,
    approvedDongRecords: dongs.filter((r) => r.approvalStatus === 'APPROVED').length,
    microReviewRecords: dongs.filter((r) => r.approvalStatus === 'MICRO_REVIEW').length,
    specialReviewRecords: dongs.filter((r) => r.approvalStatus === 'SPECIAL_REVIEW').length,
    collisionHoldRecords: dongs.filter((r) => r.approvalStatus === 'COLLISION_HOLD').length,
    totalGuRecords: SEOUL_GU_MANIFEST_RECORDS.length,
    approvedGuRecords: SEOUL_GU_MANIFEST_RECORDS.filter((r) => r.approvalStatus === 'APPROVED').length,
    totalApprovedRegions:
      SEOUL_GU_MANIFEST_RECORDS.filter((r) => r.approvalStatus === 'APPROVED').length +
      dongs.filter((r) => r.approvalStatus === 'APPROVED').length,
  };
}
