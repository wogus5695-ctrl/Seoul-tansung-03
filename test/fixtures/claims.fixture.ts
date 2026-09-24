/**
 * Test Claim Fixtures
 */

import { ClaimItem } from '../../lib/types/claims';

export const TEST_CLAIMS: readonly ClaimItem[] = [
  {
    id: 'claim-01',
    category: 'VERIFIED_FACT',
    statement: '도막 시공 전 기존 박리된 페인트를 긁어내는 게링 밑작업을 선행합니다.',
    sourceType: 'DOCUMENT',
    sourceRef: 'ALLCARE_WORK_MANUAL_V1',
    verifiedAt: '2026-09-20',
  },
  {
    id: 'claim-02',
    category: 'GENERAL_GUIDANCE',
    statement: '환기가 불량하고 외벽 온도차가 큰 공간은 주기적인 환기 관리가 필요합니다.',
    sourceType: 'USER_DIRECT',
  },
  {
    id: 'claim-03',
    category: 'UNVERIFIED_CLAIM',
    statement: '탄성코트를 시공하면 결로 해결 100% 보장됩니다.',
  },
  {
    id: 'claim-04',
    category: 'VERIFIED_FACT',
    statement: '도막이 들뜨는 부위는 단순 덧칠 시 재박리가 발생할 수 있어 바탕면 정리가 필수적입니다.',
    sourceType: 'FIELD_LOG',
  },
];
