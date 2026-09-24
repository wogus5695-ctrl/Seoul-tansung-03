import React from 'react';
import { BeforeAfterSection } from '../sections/BeforeAfterSection';
import { Container } from '../layout/Container';

export function DynamicBeforeAfterSection() {
  return (
    <div className="relative">
      <BeforeAfterSection />
      {/* Evidence Integrity Disclaimer per Section 19 & 20 */}
      <div className="bg-[#FAF8F5] pb-8 -mt-6 sm:-mt-10">
        <Container>
          <p className="text-[11px] text-[#756E61] text-center border-t border-[#E7D9C1]/40 pt-4">
            ※ 위 시공 사진은 올케어 제공 시공 전·후 사진이며, 현장 조건 및 벽면 상태에 따라 실제 작업 결과는 차이가 있을 수 있습니다.
          </p>
        </Container>
      </div>
    </div>
  );
}
