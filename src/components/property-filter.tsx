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
      <div className="bg-[#101317] dark:bg-[#101317] light:bg-[#EFECE5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={currentFilters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search residences, typologies, configurations..."
            className="w-full bg-[#181C22] dark:bg-[#181C22] light:bg-[#FAF8F5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] focus:border-[#C5A880] dark:focus:border-[#C5A880] light:focus:border-[#A88858] rounded-xl pl-11 pr-4 py-3 text-sm text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] placeholder-[#8C8983] dark:placeholder-[#8C8983] light:placeholder-[#858076] focus:outline-none transition-colors"
          />
        </div>

        {/* Minimal Pill Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Typology Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] mr-1 hidden sm:inline">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    active
                      ? "bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#A88858] text-[#0C0E10] font-semibold shadow-sm"
                      : "bg-[#181C22] dark:bg-[#181C22] light:bg-[#E4DFD5] text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53] hover:text-white light:hover:text-[#181A1D]"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Bedroom Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] mr-1 hidden sm:inline">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    active
                      ? "bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#A88858] text-[#0C0E10] font-semibold shadow-sm"
                      : "bg-[#181C22] dark:bg-[#181C22] light:bg-[#E4DFD5] text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53] hover:text-white light:hover:text-[#181A1D]"
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
      <div className="flex items-center justify-between px-2 text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#656056]">
        <span>
          Showing <strong className="text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">{totalResults}</strong> available residences
        </span>

        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-1 text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] hover:underline transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
