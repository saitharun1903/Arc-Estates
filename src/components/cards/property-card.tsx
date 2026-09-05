"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface PropertyItemData {
  id: string;
  title: string;
  propertyType: string;
  bedrooms: number;
  areaSqFt: number;
  price: string;
  facing?: string | null;
  featuredImage: string;
  project?: {
    name: string;
    slug: string;
    location: string;
  } | null;
}

interface PropertyCardProps {
  property: PropertyItemData;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const projectSlug = property.project?.slug || "arc-vista";
  const projectName = property.project?.name || "ARC ESTATES";
  const orientation = property.facing
    ? `${property.facing.toUpperCase()} ORIENTATION`
    : "SOLAR ORIENTED";

  return (
    <div className="bg-[#1C1A17] light:bg-[#FFFFFF] border border-white/10 light:border-[#DDD7CC] rounded-xl overflow-hidden hover:border-[#C9A86A]/60 light:hover:border-[#9E7D4C]/60 transition-all duration-300 flex flex-col group shadow-sm hover:shadow-md">
      {/* 1. Large Editorial Photograph */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#131210]">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ backgroundImage: `url(${property.featuredImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
      </div>

      {/* 2. Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 sm:space-y-5">
        <div className="space-y-2">
          {/* Project Mono Label */}
          <div className="text-[10.5px] font-mono tracking-widest text-[#C9A86A] light:text-[#9E7D4C] uppercase">
            {projectName} // BAHADURPALLY
          </div>

          {/* Residence Typology Title */}
          <h3 className="font-serif text-lg sm:text-2xl font-light text-[#FBF9F5] light:text-[#181A1D] group-hover:text-[#C9A86A] light:group-hover:text-[#9E7D4C] transition-colors leading-snug">
            {property.title}
          </h3>

          {/* Clean Line Specs */}
          <p className="text-xs font-mono text-[#8E887E] light:text-[#615E58] pt-1">
            {property.bedrooms} BHK · {property.areaSqFt.toLocaleString()} SQ.FT · {orientation}
          </p>
        </div>

        {/* Valuation and Accessible Action Button */}
        <div className="pt-4 border-t border-white/10 light:border-[#EAE6DE] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-[#8E887E] light:text-[#615E58] block uppercase tracking-wider">
              Valuation
            </span>
            <span className="font-mono text-sm sm:text-base font-semibold text-[#FBF9F5] light:text-[#181A1D]">
              {property.price}
            </span>
          </div>

          <Link
            href={`/projects/${projectSlug}`}
            className="inline-flex items-center justify-center space-x-1.5 min-h-[44px] px-3.5 sm:px-4 py-2 rounded-lg bg-[#C9A86A]/10 border border-[#C9A86A]/40 text-[#E8D8B8] light:text-[#8E6D3B] light:bg-[#C9A86A]/15 text-xs font-mono uppercase tracking-wider hover:bg-[#C9A86A] hover:text-[#131210] active:scale-[0.98] transition-all group/link shrink-0"
          >
            <span>VIEW RESIDENCE</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
