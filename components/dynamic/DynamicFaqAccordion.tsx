'use client';

import React, { useState } from 'react';
import { IntentFaqItem } from '../../lib/types/intents';

interface DynamicFaqAccordionProps {
  readonly items: readonly IntentFaqItem[];
}

export function DynamicFaqAccordion({ items }: DynamicFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `faq-btn-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className="rounded-xl border border-[#E7D9C1] bg-[#FAF8F5] transition-all overflow-hidden"
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(idx)}
                className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 hover:bg-[#F5F3EE]/80 transition-colors"
              >
                <span className="font-semibold text-sm sm:text-base text-[#3E443B] leading-snug">
                  {item.question}
                </span>
                <span
                  className={`w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-[#E7D9C1]/40 text-[#5C5549] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#4F5844] text-[#F5F3EE]' : ''
                  }`}
                  aria-hidden="true"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5C5549] leading-relaxed border-t border-[#E7D9C1]/40 bg-[#FAF8F5] ${
                isOpen ? 'block' : 'hidden'
              }`}
            >
              <p className="whitespace-pre-line text-pretty">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
