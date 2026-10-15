'use client';

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { Container } from '../layout/Container';
import { CUSTOMER_REVIEWS, CustomerReview } from '../../lib/data/customer-reviews';

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function CustomerReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const totalReviews = CUSTOMER_REVIEWS.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive breakpoint detector
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Autoplay rotation timer (5 seconds)
  useEffect(() => {
    if (!isPlaying || isHovered || isFocused || prefersReducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, isFocused, prefersReducedMotion, nextSlide]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const isAutoPlayingActive = isPlaying && !isHovered && !isFocused && !prefersReducedMotion;

  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className="w-full py-16 sm:py-24 bg-[#F4F1EB] border-y border-[#E7D9C1]/70"
    >
      <Container className="space-y-10 sm:space-y-12 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl text-left">
            <p className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
              CUSTOMER FEEDBACK
            </p>
            <h2
              id="customer-reviews-heading"
              className="text-token-h1 text-[#3E443B] text-balance leading-tight"
            >
              고객이 전하는 올케어 이야기
            </h2>
            <p className="text-token-body text-[#5C5549] leading-relaxed">
              상담과 시공 과정에서 자주 들었던 고객 의견을 이해하기 쉽게 재구성한 내용입니다.
            </p>
          </div>

          {/* Controls Header */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="이전 고객 후기 보기"
                className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E7D9C1] text-[#3E443B] flex items-center justify-center hover:bg-[#3E443B] hover:text-[#F5F3EE] hover:border-[#3E443B] transition-all focus-visible:outline-2 focus-visible:outline-[#3E443B]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="다음 고객 후기 보기"
                className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E7D9C1] text-[#3E443B] flex items-center justify-center hover:bg-[#3E443B] hover:text-[#F5F3EE] hover:border-[#3E443B] transition-all focus-visible:outline-2 focus-visible:outline-[#3E443B]"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Main Section Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* LEFT: Customer Feedback Summary Card (33% width on Desktop) */}
          <div className="lg:col-span-4 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E7D9C1] shadow-sm flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold text-[#5C5549] bg-[#E7D9C1]/50 px-3 py-1 rounded-md uppercase tracking-wider">
                고객 상담 안내
              </span>

              <div className="space-y-2 pt-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[#3E443B]">
                  자주 전해주시는<br />고객 이야기
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#5C5549] leading-relaxed pt-2 border-t border-[#E7D9C1]/60">
                상담과 시공 과정에서 자주 들었던 고객 의견을 이해하기 쉽게 재구성한 내용입니다.
              </p>
            </div>

            <div className="text-[11px] text-[#8C8375] pt-2 border-t border-[#E7D9C1]/60">
              ※ 실제 고객 상담 과정의 피드백을 바탕으로 재구성된 안내입니다.
            </div>
          </div>

          {/* RIGHT: Review Cards Carousel (67% width on Desktop) */}
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="올케어 고객 의견 슬라이더"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="lg:col-span-8 relative w-full overflow-hidden select-none lg:h-[436px]"
          >
            {/* Card Track */}
            <div
              aria-live={isAutoPlayingActive ? 'off' : 'polite'}
              className={`flex ${
                isDesktop
                  ? 'flex-col gap-4 transition-transform duration-500 ease-in-out'
                  : 'flex-row gap-4 transition-transform duration-500 ease-in-out'
              }`}
              style={{
                transform: isDesktop
                  ? `translateY(calc(-${currentIndex} * (210px + 1rem)))`
                  : `translateX(calc(-${currentIndex} * (100% + 1rem)))`,
              }}
            >
              {[...CUSTOMER_REVIEWS, CUSTOMER_REVIEWS[0]].map((review: CustomerReview, idx: number) => {
                const reviewIndex = idx % totalReviews;
                const isActive = idx === currentIndex;
                const isNextActive = isDesktop && idx === currentIndex + 1;
                const isVisibleInDOM = isActive || isNextActive;

                return (
                  <article
                    key={idx === totalReviews ? `wrap-${review.id}` : review.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${totalReviews}개 중 ${reviewIndex + 1}번째 의견`}
                    aria-hidden={!isVisibleInDOM}
                    className={`w-full flex-shrink-0 bg-[#FAF8F5] p-6 sm:p-7 rounded-2xl border border-[#E7D9C1] shadow-sm flex flex-col justify-between space-y-3 text-left ${
                      isDesktop ? 'h-[210px]' : 'min-h-[220px]'
                    }`}
                  >
                    <div className="space-y-2">
                      {/* Top Header Line: Category Tag, Speech Bubble Icon */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-[#4F5844] bg-[#E7D9C1]/50 px-2.5 py-0.5 rounded">
                            고객 상담 의견
                          </span>
                        </div>

                        {/* Speech Bubble / Quote Icon (Decorative) */}
                        <svg
                          className="w-5 h-5 text-[#A3B18A]/70 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M4.5 3.75a3 3 0 00-3 3v9a3 3 0 003 3h2.25v3.19a.75.75 0 001.248.563L11.59 18.75h7.91a3 3 0 003-3v-9a3 3 0 00-3-3h-15z" />
                        </svg>
                      </div>

                      {/* Headline */}
                      <h3 className="text-base sm:text-lg font-bold text-[#3E443B] leading-snug pt-1">
                        {review.headline}
                      </h3>

                      {/* Body Copy */}
                      <p className="text-sm text-[#5C5549] leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {review.body}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carousel Bottom Controller Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Mobile Previous / Next Buttons */}
          <div className="flex sm:hidden items-center justify-between w-full">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="이전 고객 후기 보기"
              className="px-4 py-2 rounded-lg bg-[#FAF8F5] border border-[#E7D9C1] text-xs font-semibold text-[#3E443B] flex items-center gap-1 hover:bg-[#3E443B] hover:text-[#F5F3EE] transition-all"
            >
              ← 이전
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="다음 고객 후기 보기"
              className="px-4 py-2 rounded-lg bg-[#FAF8F5] border border-[#E7D9C1] text-xs font-semibold text-[#3E443B] flex items-center gap-1 hover:bg-[#3E443B] hover:text-[#F5F3EE] transition-all"
            >
              다음 →
            </button>
          </div>

          {/* Indicator Dots */}
          <div
            role="tablist"
            aria-label="고객 후기 목록 인디케이터"
            className="flex items-center gap-2 overflow-x-auto py-1 max-w-full justify-center"
          >
            {CUSTOMER_REVIEWS.map((review: CustomerReview, index: number) => {
              const isSelected = index === currentIndex;
              return (
                <button
                  key={review.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`${totalReviews}개 중 ${index + 1}번째 후기 선택`}
                  onClick={() => goToSlide(index)}
                  className={`transition-all rounded-full focus-visible:outline-2 focus-visible:outline-[#3E443B] ${
                    isSelected
                      ? 'w-6 h-2 bg-[#4F5844]'
                      : 'w-2 h-2 bg-[#D1C7B7] hover:bg-[#A89F91]'
                  }`}
                />
              );
            })}
          </div>

          {/* Autoplay Pause / Play Control */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? '자동 넘김 일시정지' : '자동 넘김 시작'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E7D9C1] text-xs font-medium text-[#5C5549] hover:bg-[#EFE8DC] transition-colors focus-visible:outline-2 focus-visible:outline-[#3E443B]"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isAutoPlayingActive ? 'bg-[#4F5844] animate-pulse' : 'bg-[#A89F91]'
                }`}
              />
              <span>{isPlaying ? '자동 전환 중' : '일시정지됨'}</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
