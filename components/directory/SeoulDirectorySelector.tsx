'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegionItem } from '../../lib/types/regions';
import { buildPublicHref } from '../../lib/url/url-builder';
import { RECOVERY_PRIMARY_INTENT } from '../../lib/config/recovery-config';

interface SeoulDirectorySelectorProps {
  readonly regions: readonly RegionItem[];
}

export function SeoulDirectorySelector({ regions }: SeoulDirectorySelectorProps) {
  const router = useRouter();
  const [selectedGu, setSelectedGu] = useState<string>('');
  const [selectedDong, setSelectedDong] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique GUs
  const guNames = Array.from(
    new Set(regions.map((r) => r.sigugun || r.displayName))
  ).sort();

  // Filter Dongs by selected GU
  const availableDongs = selectedGu
    ? regions.filter((r) => (r.sigugun || r.displayName) === selectedGu && r.regionType === 'DONG')
    : [];

  const handleGuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGu(e.target.value);
    setSelectedDong('');
  };

  const handleNavigate = () => {
    const targetRegion = selectedDong
      ? regions.find((r) => r.displayName === selectedDong && (r.sigugun || r.displayName) === selectedGu)
      : regions.find((r) => r.regionType === 'GU' && (r.sigugun || r.displayName) === selectedGu);

    if (targetRegion) {
      const href = buildPublicHref(targetRegion.keywordRegionName, RECOVERY_PRIMARY_INTENT);
      router.push(href);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().replace(/\s+/g, '');
    const matched = regions.find(
      (r) =>
        r.displayName.replace(/\s+/g, '').includes(query) ||
        r.keywordRegionName.replace(/\s+/g, '').includes(query)
    );

    if (matched) {
      const href = buildPublicHref(matched.keywordRegionName, RECOVERY_PRIMARY_INTENT);
      router.push(href);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E7D9C1] p-6 shadow-sm space-y-5 text-left">
      <div className="border-b border-[#EFE8DC] pb-3">
        <h2 className="text-base sm:text-lg font-bold text-[#3E443B]">
          서울 전체 동별 시공 안내 검색 및 선택
        </h2>
        <p className="text-xs sm:text-sm text-[#756E61] pt-1">
          자치구와 동을 선택하시거나 지역명을 직접 검색하시면 해당 지역 시공 안내 페이지로 바로 이동합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Dropdown Selector */}
        <div className="md:col-span-4 space-y-1">
          <label htmlFor="gu-select" className="text-xs font-semibold text-[#5C5549] block">
            1. 자치구 선택
          </label>
          <select
            id="gu-select"
            value={selectedGu}
            onChange={handleGuChange}
            className="w-full px-3 py-2.5 rounded-lg border border-[#E7D9C1] bg-[#FAF8F5] text-xs sm:text-sm text-[#3E443B] focus:outline-none focus:border-[#4F5844]"
          >
            <option value="">자치구를 선택하세요</option>
            {guNames.map((gu) => (
              <option key={gu} value={gu}>
                {gu}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-5 space-y-1">
          <label htmlFor="dong-select" className="text-xs font-semibold text-[#5C5549] block">
            2. 상세 동 선택 (선택 시 해당 동으로 이동)
          </label>
          <select
            id="dong-select"
            value={selectedDong}
            onChange={(e) => setSelectedDong(e.target.value)}
            disabled={!selectedGu}
            className="w-full px-3 py-2.5 rounded-lg border border-[#E7D9C1] bg-[#FAF8F5] text-xs sm:text-sm text-[#3E443B] focus:outline-none focus:border-[#4F5844] disabled:opacity-50"
          >
            <option value="">{selectedGu ? `${selectedGu} 전체 (구 단위)` : '자치구를 먼저 선택하세요'}</option>
            {availableDongs.map((d) => (
              <option key={d.id} value={d.displayName}>
                {d.displayName}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <button
            type="button"
            onClick={handleNavigate}
            disabled={!selectedGu}
            className="w-full py-2.5 px-4 rounded-lg bg-[#4F5844] text-[#FAF8F5] font-semibold text-xs sm:text-sm hover:bg-[#3E443B] transition-colors disabled:opacity-40"
          >
            시공안내 이동 →
          </button>
        </div>
      </div>

      {/* Direct Name Search */}
      <form onSubmit={handleSearchSubmit} className="pt-2 border-t border-[#F0EAE1]">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="동 이름 검색 (예: 불광동, 성수동, 역삼동 등)"
            className="flex-1 px-3.5 py-2 rounded-lg border border-[#E7D9C1] bg-[#FAF8F5] text-xs sm:text-sm text-[#3E443B] focus:outline-none focus:border-[#4F5844]"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#FAF8F5] border border-[#E7D9C1] text-[#3E443B] font-semibold text-xs sm:text-sm hover:bg-[#E7D9C1]/50 transition-colors"
          >
            검색
          </button>
        </div>
      </form>
    </div>
  );
}
