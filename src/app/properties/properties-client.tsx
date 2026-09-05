"use client";

import React, { useState } from "react";
import PropertyFilter, { FilterState } from "@/components/property-filter";
import { PropertyCard, PropertyItemData } from "@/components/cards";

interface PropertyItem extends PropertyItemData {
  status: string;
  bathrooms: number;
  floor?: string | null;
  unitNumber?: string | null;
  demo?: boolean;
}

interface PropertiesClientProps {
  initialProperties: PropertyItem[];
}

export default function PropertiesClient({ initialProperties }: PropertiesClientProps) {
  const [properties] = useState<PropertyItem[]>(initialProperties);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    propertyType: "ALL",
    bedrooms: "ALL",
    status: "ALL",
  });

  const filtered = properties.filter((p) => {
    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchProject = p.project?.name.toLowerCase().includes(q) || false;
      const matchLocation = p.project?.location.toLowerCase().includes(q) || false;
      if (!matchTitle && !matchProject && !matchLocation) return false;
    }

    // Property Type
    if (filters.propertyType !== "ALL") {
      const type = p.propertyType.toLowerCase();
      const target = filters.propertyType.toLowerCase();
      if (!type.includes(target) && target !== "all") return false;
    }

    // Bedrooms
    if (filters.bedrooms !== "ALL") {
      const targetBed = Number(filters.bedrooms);
      if (targetBed === 4) {
        if (p.bedrooms < 4) return false;
      } else {
        if (p.bedrooms !== targetBed) return false;
      }
    }

    return true;
  });

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-12 bg-[#121315] text-[#FAF8F5] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Minimal Editorial Header */}
        <div className="space-y-4 max-w-3xl border-b border-white/10 dark:border-white/10 light:border-[#DDD7CC] pb-8">
          <div className="inline-flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.35em] text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
            <span>INVENTORY CATALOGUE</span>
            <span>//</span>
            <span>BAHADURPALLY CORRIDOR</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
            Property Discovery
          </h1>
          <p className="text-base sm:text-lg text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] leading-relaxed font-light">
            Specific residences, typologies, and floor orientations across ARC Avenue developments.
          </p>
        </div>

        {/* Refined Minimal Filter Bar */}
        <PropertyFilter
          currentFilters={filters}
          onFilterChange={(newFilters) => setFilters(newFilters)}
          totalResults={filtered.length}
        />

        {/* Editorial Property Cards Grid */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center bg-[#18191C] border border-white/10 rounded-xl space-y-3 shadow-sm">
            <h3 className="font-serif text-lg font-medium text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              No residences match your criteria
            </h3>
            <p className="text-xs text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58]">
              Clear filters or search for another typology to explore active residences.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
