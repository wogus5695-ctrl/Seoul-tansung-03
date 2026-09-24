import React from 'react';
import { Container } from '../layout/Container';
import { SearchIntentItem } from '../../lib/types/intents';
import { DynamicFaqAccordion } from './DynamicFaqAccordion';

interface DynamicFaqSectionProps {
  readonly intent: SearchIntentItem;
}

export function DynamicFaqSection({ intent }: DynamicFaqSectionProps) {

  return (
    <section
      aria-labelledby="dynamic-faq-heading"
      className="w-full py-16 sm:py-24 bg-[#F5F3EE] border-t border-[#E7D9C1]"
    >
      <Container className="max-w-3xl">
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <p className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
            FAQ · 자주 묻는 질문
          </p>
          <h2
            id="dynamic-faq-heading"
            className="text-token-h2 text-[#3E443B] font-bold tracking-tight text-balance"
          >
            자주 묻는 질문
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5549] max-w-lg mx-auto leading-relaxed text-pretty">
            시공 전 확인사항과 도막 관리 기준, 고객님께서 가장 궁금해하시는 핵심 내용을 정리했습니다.
          </p>
        </div>

        {/* 5 Intent-specific FAQs */}
        <DynamicFaqAccordion items={intent.faqItems} />
      </Container>
    </section>
  );
}
