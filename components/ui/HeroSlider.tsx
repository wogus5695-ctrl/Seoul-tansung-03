'use client';

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { HERO_SLIDES } from '../../lib/contracts/image-registry';

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

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const totalSlides = HERO_SLIDES.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Auto rotation timer
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

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="올케어 대표 시공 비주얼 슬라이더"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="relative w-full aspect-[3/4] sm:aspect-[3/4] lg:aspect-auto lg:h-[620px] xl:h-[680px] rounded-xl overflow-hidden bg-[#2D322A] select-none shadow-none border-0"
    >
      {/* Visual Slides (Cross Fade) */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${totalSlides}개 중 ${idx + 1}번째 슬라이드`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.altText}
              fill
              priority={idx === 0}
              loading={idx === 0 ? 'eager' : 'lazy'}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 680px"
              className="object-cover object-center"
            />
            {/* Subtle Gradient Vignette on Edges for Photographic Elegance */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D322A]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* Minimalist Glassmorphism Controller Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Indicators + Numeric Counter */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#2D322A]/75 backdrop-blur-md border border-[#E7D9C1]/30 pointer-events-auto">
          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5" aria-label="슬라이드 선택">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`슬라이드 ${idx + 1}로 이동`}
                aria-current={currentSlide === idx ? 'true' : 'false'}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white ${
                  currentSlide === idx
                    ? 'w-6 bg-[#FAF8F5]'
                    : 'w-2 bg-[#FAF8F5]/40 hover:bg-[#FAF8F5]/70'
                }`}
              />
            ))}
          </div>

          <span className="w-px h-3 bg-[#FAF8F5]/20" />

          {/* Slide Number */}
          <span className="text-[11px] font-mono font-medium text-[#FAF8F5]">
            0{currentSlide + 1} <span className="text-[#FAF8F5]/40">/</span> 0{totalSlides}
          </span>
        </div>

        {/* Play/Pause Control Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? '슬라이드 자동 회전 일시정지' : '슬라이드 자동 회전 시작'}
          className="px-3 py-1.5 rounded-full bg-[#2D322A]/75 backdrop-blur-md border border-[#E7D9C1]/30 text-[11px] font-semibold text-[#FAF8F5] pointer-events-auto hover:bg-[#2D322A] transition-colors focus-visible:outline-2 focus-visible:outline-white flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#A3B18A] animate-pulse" />
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>
      </div>
    </div>
  );
}
