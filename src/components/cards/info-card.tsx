"use client";

import React from "react";

interface InfoCardProps {
  index: string;
  label?: string;
  title?: string;
  value: string;
  subtext?: string;
  detail?: string;
  className?: string;
}

export default function InfoCard({
  index,
  label,
  title,
  value,
  subtext,
  detail,
  className = "",
}: InfoCardProps) {
  const displayLabel = label || title || "";
  const displaySubtext = subtext || detail;

  return (
    <div
      className={`p-5 rounded-xl bg-[#101317] dark:bg-[#101317] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] space-y-1.5 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] uppercase tracking-wider">
        <span>{index} // {displayLabel}</span>
      </div>
      <div className="font-serif text-lg sm:text-xl font-medium text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] truncate">
        {value}
      </div>
      {displaySubtext && (
        <div className="text-[11px] font-mono text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] truncate">
          {displaySubtext}
        </div>
      )}
    </div>
  );
}
