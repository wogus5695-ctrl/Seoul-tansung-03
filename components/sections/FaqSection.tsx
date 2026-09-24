'use client';

import React, { useState } from 'react';
import { Container } from '../layout/Container';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const MAIN_FAQS: FaqItem[] = [
  {
    id: 'main-faq-1',
    question: '탄성코트 시공 전에 기존 벽면 상태를 왜 확인해야 하나요?',
    answer:
      '벽면에 들뜬 페인트나 균열이 있는 상태에서 도포하면 도막이 오래 유지되지 못하고 다시 일어날 수 있습니다. 기존 도막의 부착 상태와 결로 취약 부위를 먼저 파악해야 알맞은 밑작업 범위를 결정할 수 있습니다.',
  },
  {
    id: 'main-faq-2',
    question: '기존 페인트가 들떠 있어도 바로 탄성코트를 시공할 수 있나요?',
    answer:
      '들뜨거나 부식된 기존 도막을 그대로 두고 뿜칠하면 조기 박리 하자가 발생합니다. 올케어는 들뜬 부분을 깨끗이 긁어내는 게링(스크래핑)과 균열 퍼티 평탄화 밑작업을 반드시 선행한 후 시공을 진행합니다.',
  },
  {
    id: 'main-faq-3',
    question: '베란다와 세탁실은 확인해야 하는 부분이 다른가요?',
    answer:
      '베란다는 외부 기온차에 노출되는 창호 주변 실리콘과 외벽 접점의 결로 환경을 중점 점검하며, 세탁실은 대형 가전(세탁기·건조기) 가동 시 발생하는 고습 환경과 좁은 배관 주변의 통풍 상태를 먼저 살핍니다.',
  },
  {
    id: 'main-faq-4',
    question: '시공 범위는 어떤 기준으로 정해지나요?',
    answer:
      '발코니 전체를 일괄 시공하기보다 고객님의 거주 형태(신축 입주 전, 거주 중 리모델링)와 실제 벽면 오염 구역, 가전 설치 환경 등을 종합적으로 고려하여 꼭 필요한 공간을 중심으로 협의합니다.',
  },
  {
    id: 'main-faq-5',
    question: '상담할 때 어떤 사진을 준비하면 도움이 되나요?',
    answer:
      '시공을 원하시는 베란다나 세탁실의 전체적인 구조 사진 1장과, 페인트가 들뜨거나 곰팡이 및 균열이 보이는 문제 부위의 근접 사진 1~2장을 전달해 주시면 더욱 정확하고 상세한 상담이 가능합니다.',
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('main-faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section aria-labelledby="faq-heading" className="w-full py-16 bg-[#FAF8F5] border-y border-[#E7D9C1]/60">
      <Container className="space-y-10 max-w-3xl">
        <div className="text-left sm:text-center space-y-2">
          <p className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
            FAQ
          </p>
          <h2 id="faq-heading" className="text-token-h1 text-[#3E443B]">
            자주 묻는 질문
          </h2>
          <p className="text-token-body text-[#5C5549]">
            탄성코트 시공 전 소비자가 가장 많이 확인하는 핵심 질문입니다.
          </p>
        </div>

        <div className="space-y-3">
          {MAIN_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#F5F3EE] rounded-lg border border-[#E7D9C1] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-[#3E443B] text-[15.5px] sm:text-[16.5px] leading-[1.5] hover:text-[#4F5844] transition-colors focus-visible:outline-2 focus-visible:outline-[#4F5844]"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-[#E7D9C1]/60 text-[#3E443B] flex items-center justify-center text-sm transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ↓
                  </span>
                </button>

                {/* SSR Friendly: Content stays in DOM, toggled via styling */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`px-5 pb-5 pt-1 text-[15px] sm:text-[16px] text-[#5C5549] leading-[1.75] font-normal ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
