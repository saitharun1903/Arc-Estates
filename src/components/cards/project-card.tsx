"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

export interface ProjectCardData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  location: string;
  status: string;
  projectType: string;
  heroImage: string;
  areaRange: string;
  bedrooms: string;
  priceRange: string;
  demo?: boolean;
}

interface ProjectCardProps {
  project: ProjectCardData;
  index?: number;
  className?: string;
}

export default function ProjectCard({ project, index = 1, className = "" }: ProjectCardProps) {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div
      className={`group relative bg-[#101317] dark:bg-[#101317] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] rounded-xl overflow-hidden hover:border-[#C5A880]/60 dark:hover:border-[#C5A880]/60 light:hover:border-[#9E7D4C]/60 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md ${className}`}
    >
      {/* Top Header: Small Sans/Mono Metadata */}
      <div className="p-6 pb-4 flex items-baseline justify-between border-b border-white/5 dark:border-white/5 light:border-[#EAE6DE]">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] tracking-widest font-semibold">
            {formattedIndex}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58]">
            {project.projectType}
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58]">
          {project.status}
        </span>
      </div>

      {/* Dominant Architectural Photography */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#181C22]">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] group-hover:text-[#C5A880] dark:group-hover:text-[#C5A880] light:group-hover:text-[#9E7D4C] transition-colors leading-snug">
            {project.name}
          </h3>
          <p className="text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] tracking-wide">
            {project.bedrooms} · {project.areaRange}
          </p>
          <div className="flex items-center space-x-1.5 text-xs text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] pt-1">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
        </div>

        {/* Card Footer: Valuation & Clear Action */}
        <div className="pt-4 border-t border-white/5 dark:border-white/5 light:border-[#EAE6DE] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] uppercase tracking-wider block">
              Valuation
            </span>
            <span className="font-mono text-sm font-semibold text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              {project.priceRange}
            </span>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] hover:text-white dark:hover:text-white light:hover:text-[#181A1D] transition-colors group/btn"
          >
            <span>VIEW PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
