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
      className={`group relative bg-[#181714] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C9A86A]/50 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl ${className}`}
    >
      {/* Top Header: Small Sans/Mono Metadata */}
      <div className="p-6 pb-4 flex items-baseline justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs text-[#C9A86A] tracking-widest font-semibold">
            {formattedIndex}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E887E]">
            {project.projectType}
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E887E]">
          {project.status}
        </span>
      </div>

      {/* Dominant Architectural Photography */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1A17]">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#FBF9F5] group-hover:text-[#C9A86A] transition-colors leading-snug">
            {project.name}
          </h3>
          <p className="text-xs font-mono text-[#8E887E] tracking-wide">
            {project.bedrooms} · {project.areaRange}
          </p>
          <div className="flex items-center space-x-1.5 text-xs text-[#8E887E] pt-1">
            <MapPin className="w-3.5 h-3.5 text-[#8E887E] group-hover:text-[#C9A86A] transition-colors shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
        </div>

        {/* Card Footer: Valuation & Clear Action */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#8E887E] uppercase tracking-wider block">
              Valuation
            </span>
            <span className="font-mono text-sm font-semibold text-[#C9A86A]">
              {project.priceRange}
            </span>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#C9A86A] hover:text-[#D8B77D] transition-colors group/btn font-medium"
          >
            <span>VIEW PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
