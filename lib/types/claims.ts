/**
 * Claim Safety Lifecycle & Verification Types
 *
 * UNVERIFIED_CLAIM must be strictly filtered out from production output.
 */

export type ClaimStatus =
  | 'VERIFIED_FACT'      // 공인 시험성적서, 사업자등록, 실측 데이터 기반 증빙 완료
  | 'GENERAL_GUIDANCE'   // 일반적인 건축 도장/주거 환경 상식 가이드
  | 'BUSINESS_POLICY'    // 사용자가 직접 확정한 상담/견적/작업 범위 정책
  | 'PRODUCT_SPEC'       // 제조사 공식 명시 제원 (확인된 경우)
  | 'CASE_EVIDENCE'      // 실제 현장 실사 사진 및 실측 기록이 존재하는 사례
  | 'UNVERIFIED_CLAIM';  // 검증 대기 상태 (프로덕션 렌더링 절대 차단)

export type ClaimSourceType = 'DOCUMENT' | 'USER_DIRECT' | 'TEST_REPORT' | 'FIELD_LOG' | 'NONE';

export interface ClaimItem {
  readonly id: string;
  readonly category: ClaimStatus;
  readonly statement: string;
  readonly sourceType?: ClaimSourceType;
  readonly sourceRef?: string;
  readonly verifiedAt?: string;
  readonly verificationNote?: string;
}
