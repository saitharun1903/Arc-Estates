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
  const projectName = property.project?.name || "ARC AVENUE";
  const orientation = property.facing
    ? `${property.facing.toUpperCase()} ORIENTATION`
    : "SOLAR ORIENTED";

  return (
    <div className="bg-[#101317] dark:bg-[#101317] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] rounded-xl overflow-hidden hover:border-[#C5A880]/60 dark:hover:border-[#C5A880]/60 light:hover:border-[#9E7D4C]/60 transition-all duration-300 flex flex-col group shadow-sm hover:shadow-md">
      {/* 1. Large Editorial Photograph */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#181C22]">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ backgroundImage: `url(${property.featuredImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
      </div>

      {/* 2. Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          {/* Project Mono Label */}
          <div className="text-[11px] font-mono tracking-widest text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] uppercase">
            {projectName} // BAHADURPALLY
          </div>

          {/* Residence Typology Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] group-hover:text-[#C5A880] dark:group-hover:text-[#C5A880] light:group-hover:text-[#9E7D4C] transition-colors leading-snug">
            {property.title}
          </h3>

          {/* Clean Line Specs */}
          <p className="text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] pt-1">
            {property.bedrooms} BHK · {property.areaSqFt.toLocaleString()} SQ.FT · {orientation}
          </p>
        </div>

        {/* Valuation and Understated Action */}
        <div className="pt-4 border-t border-white/5 dark:border-white/5 light:border-[#EAE6DE] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] block uppercase tracking-wider">
              Valuation
            </span>
            <span className="font-mono text-base font-semibold text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              {property.price}
            </span>
          </div>

          <Link
            href={`/projects/${projectSlug}`}
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] hover:text-white dark:hover:text-white light:hover:text-[#181A1D] transition-colors group/link"
          >
            <span>VIEW PROPERTY</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
