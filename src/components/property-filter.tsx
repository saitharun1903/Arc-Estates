"use client";

import React from "react";
import { Search, RotateCcw } from "lucide-react";

export interface FilterState {
  search: string;
  propertyType: string;
  bedrooms: string;
  status: string;
}

interface PropertyFilterProps {
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
  currentFilters: FilterState;
}

export default function PropertyFilter({
  onFilterChange,
  totalResults,
  currentFilters,
}: PropertyFilterProps) {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...currentFilters, [key]: value });
  };

  const handleReset = () => {
    onFilterChange({
      search: "",
      propertyType: "ALL",
      bedrooms: "ALL",
      status: "ALL",
    });
  };

  const hasActiveFilters =
    Boolean(currentFilters.search) ||
    currentFilters.propertyType !== "ALL" ||
    currentFilters.bedrooms !== "ALL";

  return (
    <div className="space-y-4">
      {/* Search and Category Filter Bar */}
      <div className="bg-[#1C1A17] light:bg-[#EFECE5] border border-white/10 light:border-[#DDD7CC] rounded-2xl p-3.5 sm:p-5 shadow-lg space-y-3.5 sm:space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8E887E] light:text-[#656056] absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={currentFilters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search residences, typologies, configurations..."
            className="w-full bg-[#131210] light:bg-[#FAF8F5] border border-white/10 light:border-[#DDD7CC] focus:border-[#C9A86A] light:focus:border-[#A88656] rounded-xl pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[#FBF9F5] light:text-[#181A1D] placeholder-[#8E887E] light:placeholder-[#858076] focus:outline-none transition-colors"
          />
        </div>

        {/* Responsive Filter Tracks */}
        <div className="space-y-3 pt-0.5">
          {/* Typology Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap pb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E887E] light:text-[#656056] shrink-0 mr-1">
              Typology:
            </span>
            {[
              { id: "ALL", label: "All Typologies" },
              { id: "Apartment", label: "Sky Residences" },
              { id: "Villa", label: "Courtyard Villas" },
              { id: "Penthouse", label: "Penthouses" },
            ].map((t) => {
              const active = currentFilters.propertyType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => updateFilter("propertyType", t.id)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap shrink-0 transition-all active:scale-[0.98] ${
                    active
                      ? "bg-[#C9A86A] text-[#131210] font-semibold shadow-sm"
                      : "bg-[#131210] light:bg-[#E4DFD5] text-[#8E887E] light:text-[#5F5B53] hover:text-[#FBF9F5] hover:bg-[#252320]"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Bedroom Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap pb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E887E] light:text-[#656056] shrink-0 mr-1">
              Bedrooms:
            </span>
            {[
              { id: "ALL", label: "All" },
              { id: "2", label: "2 BHK" },
              { id: "3", label: "3 BHK" },
              { id: "4", label: "4 BHK+" },
            ].map((b) => {
              const active = currentFilters.bedrooms === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => updateFilter("bedrooms", b.id)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap shrink-0 transition-all active:scale-[0.98] ${
                    active
                      ? "bg-[#C9A86A] text-[#131210] font-semibold shadow-sm"
                      : "bg-[#131210] light:bg-[#E4DFD5] text-[#8E887E] light:text-[#5F5B53] hover:text-[#FBF9F5] hover:bg-[#252320]"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result Count and Reset Strip */}
      <div className="flex items-center justify-between px-1 text-xs font-mono text-[#8E887E] light:text-[#656056]">
        <span>
          Showing <strong className="text-[#FBF9F5] light:text-[#181A1D]">{totalResults}</strong> available residences
        </span>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-1 text-[#C9A86A] light:text-[#A88656] hover:underline transition-colors min-h-[36px] py-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
