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
      setIsDesktop(window.innerWidth >= 640);
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
      <Container className="space-y-10 sm:space-y-14 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl text-left">
            <p className="text-xs font-semibold text-[#5C5549] tracking-wider uppercase">
              CUSTOMER REVIEWS
            </p>
            <h2
              id="customer-reviews-heading"
              className="text-token-h1 text-[#3E443B] text-balance leading-tight"
            >
              시공 과정에서 자주 들은 이야기
            </h2>
            <p className="text-token-body text-[#5C5549] leading-relaxed">
              상담과 시공 과정에서 자주 들었던 고객 의견을 이해하기 쉽게 재구성했습니다.
            </p>
          </div>

          {/* Desktop/Tablet Controls Header */}
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

        {/* Carousel Region */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="올케어 고객 후기 슬라이더"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full overflow-hidden select-none"
        >
          {/* Card Track (Renders all 9 review cards in SSR HTML) */}
          <div
            aria-live={isAutoPlayingActive ? 'off' : 'polite'}
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(calc(-${currentIndex} * (${isDesktop ? '50% + 0.75rem' : '100% + 1.5rem'})))`,
            }}
          >
            {CUSTOMER_REVIEWS.map((review: CustomerReview, idx: number) => {
              const isActive = idx === currentIndex;
              return (
                <article
                  key={review.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${totalReviews}개 중 ${idx + 1}번째 후기`}
                  aria-hidden={!isActive && (!isDesktop || idx !== (currentIndex + 1) % totalReviews)}
                  className="w-full sm:w-[calc(50%-0.75rem)] flex-shrink-0 bg-[#FAF8F5] p-6 sm:p-8 rounded-xl border border-[#E7D9C1] shadow-sm flex flex-col justify-between space-y-4 min-h-[220px]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-block text-[11px] font-bold text-[#5C5549] bg-[#E7D9C1]/50 px-2.5 py-1 rounded-md">
                        {review.category}
                      </span>
                      <span className="text-xs font-mono font-medium text-[#A89F91]">
                        0{idx + 1} / 0{totalReviews}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#3E443B] leading-snug">
                      {review.headline}
                    </h3>
                    <p className="text-sm sm:text-base text-[#5C5549] leading-relaxed">
                      {review.body}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E7D9C1]/40 flex items-center justify-between text-[11px] text-[#A89F91]">
                    <span>ALLCARE CUSTOMER EXPERIENCE</span>
                    <span className="font-mono">{review.id}</span>
                  </div>
                </article>
              );
            })}
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

          {/* Dot Indicators */}
          <div className="flex items-center gap-2" aria-label="후기 선택">
            {CUSTOMER_REVIEWS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`고객 후기 ${idx + 1}로 이동`}
                aria-current={currentIndex === idx ? 'true' : 'false'}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#3E443B] ${
                  currentIndex === idx
                    ? 'w-7 bg-[#3E443B]'
                    : 'w-2 bg-[#E7D9C1] hover:bg-[#A3B18A]'
                }`}
              />
            ))}
          </div>

          {/* Autoplay Toggle & Numeric Counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-[#5C5549]">
              0{currentIndex + 1} <span className="text-[#A89F91]">/</span> 0{totalReviews}
            </span>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? '슬라이드 자동 이동 일시정지' : '슬라이드 자동 이동 시작'}
              className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E7D9C1] text-[11px] font-semibold text-[#5C5549] hover:bg-[#3E443B] hover:text-[#F5F3EE] transition-colors focus-visible:outline-2 focus-visible:outline-[#3E443B] flex items-center gap-1.5"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isAutoPlayingActive
                    ? 'bg-[#A3B18A] animate-pulse'
                    : 'bg-[#A89F91]'
                }`}
              />
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
