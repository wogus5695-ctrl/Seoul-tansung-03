import React from 'react';

interface DevelopmentImageSlotProps {
  category: string;
  recommendedRatio: string; // e.g. "16:9", "4:3", "1:1"
  label: string;
  status?: string;
  className?: string;
  aspectClass?: string; // e.g. "aspect-[4/3]", "aspect-[16/9]"
}

export function DevelopmentImageSlot({
  category,
  recommendedRatio,
  label,
  status = 'WAITING_FOR_USER_ASSET',
  className = '',
  aspectClass = 'aspect-[4/3]',
}: DevelopmentImageSlotProps) {
  return (
    <div
      role="img"
      aria-label={`${category} - ${label} (${status})`}
      className={`w-full ${aspectClass} rounded-lg bg-[#FAF8F5] border border-dashed border-[#E7D9C1] flex flex-col items-center justify-center p-6 text-center select-none transition-colors hover:border-[#A3B18A] ${className}`}
    >
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E7D9C1]/50 text-[11px] font-medium text-[#5C5549] tracking-wider uppercase mb-2">
        <span>{category}</span>
        <span>•</span>
        <span>{recommendedRatio}</span>
      </div>

      <p className="text-sm font-medium text-[#3E443B] mb-1">{label}</p>

      <div className="flex items-center gap-1.5 text-[11px] text-[#5C5549]/80 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A3B18A] animate-pulse" />
        <span>{status}</span>
      </div>
    </div>
  );
}
