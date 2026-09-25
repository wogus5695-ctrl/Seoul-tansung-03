/**
 * Region Evidence Data Model & Tier Contracts (Phase 6-C0C-1)
 *
 * Strict Provenance Architecture:
 * - TIER_A: Actual Allcare job site cases verified with real photos/work order
 * - TIER_B: Direct user-supplied consultation and site assessment records
 * - TIER_C: Official public housing/building data with transparent source and date
 *
 * NOTE: Administrative metadata alone (TIER_D) does NOT satisfy content evidence.
 */

import { ServiceKeyword } from './intents';

export type EvidenceTier = 'TIER_A' | 'TIER_B' | 'TIER_C';

export type EvidenceSourceType =
  | 'ACTUAL_JOB_CASE'
  | 'USER_VERIFIED_ASSET'
  | 'OFFICIAL_PUBLIC_DATA';

export interface RegionEvidenceFacts {
  /** Building or complex type (e.g. '아파트', '빌라', '주상복합') */
  readonly housingType?: string;
  /** Actual building complex name if verified (e.g. '불광 롯데캐슬') */
  readonly complexName?: string;
  /** Observed wall/surface condition before work (strictly objective fact) */
  readonly observedCondition?: string;
  /** Actual work scope or surface preparation performed */
  readonly workScope?: string;
  /** Official public housing/building metric with unit if Tier C */
  readonly publicMetric?: string;
  /** Concrete verified notes (strictly zero unverified claims) */
  readonly notes?: readonly string[];
}

export interface RegionEvidenceItem {
  readonly evidenceId: string;
  readonly regionId: string; // e.g. 'seoul-eunpyeong-bulgwang'
  readonly evidenceTier: EvidenceTier;
  readonly sourceType: EvidenceSourceType;
  readonly sourceName: string; // e.g. '올케어 시공 관리 시스템', '국토교통부 건축데이터'
  readonly sourceUrl?: string;
  readonly verifiedAt: string; // ISO 8601 YYYY-MM-DD
  readonly serviceIntentApplicability: readonly ServiceKeyword[];
  readonly facts: RegionEvidenceFacts;
  readonly imageAssets?: readonly string[];
  readonly caseDate?: string; // YYYY-MM-DD
  readonly caseType?: string; // e.g. '베란다 결로 도막 박리 보수 및 탄성코트 재시공'
}
