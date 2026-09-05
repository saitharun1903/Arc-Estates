"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import GlowBorder from "@/components/ui/glow-border";
import { ProjectCardData } from "./project-card";

interface FeaturedProjectCardProps {
  project: ProjectCardData;
  index?: number;
  structuralGrid?: string;
  daylightAxis?: string;
  useGlow?: boolean;
}

export default function FeaturedProjectCard({
  project,
  index = 1,
  structuralGrid = "RCC Monolithic Shear Wall (Zone II)",
  daylightAxis = "East-West Solar Path · Sunset Terraces",
  useGlow = true,
}: FeaturedProjectCardProps) {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#181714] border border-white/10 shadow-xl group hover:border-[#C9A86A]/40 transition-all duration-300">
      {useGlow && (
        <GlowBorder
          glowColor="#C9A86A"
          tailColor="rgba(201, 168, 106, 0.22)"
          borderWidth={1.5}
          speed={10}
          rounded={16}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch p-6 sm:p-8">
        {/* Large Architectural Canvas */}
        <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-[#1C1A17]">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${project.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          {/* Floating Badge */}
          <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest px-3 py-1 rounded bg-black/75 backdrop-blur text-[#C9A86A] uppercase flex items-center space-x-2">
            <span className="font-bold">{formattedIndex}</span>
            <span>•</span>
            <span>FLAGSHIP DEVELOPMENT</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-[#FBF9F5]">
            <div className="text-xs font-mono opacity-80">{project.bedrooms} Sky Residences</div>
            <div className="font-serif text-2xl sm:text-3xl font-normal tracking-tight">
              {project.name}
            </div>
          </div>
        </div>

        {/* Information & Action Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 py-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs text-[#C9A86A] tracking-widest font-semibold">
                  {formattedIndex}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8E887E]">
                  {project.projectType}
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#FBF9F5]">
                {project.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#8E887E] leading-relaxed font-light">
                {project.tagline}
              </p>
            </div>

            {/* Architectural Intelligence */}
            <div className="space-y-3 pt-3 border-t border-white/5 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase text-[#8E887E] block">Structural Grid</span>
                <span className="text-[#CCC5B9]">{structuralGrid}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#8E887E] block">Daylight Aperture</span>
                <span className="text-[#CCC5B9]">{daylightAxis}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#8E887E] block">Spatial Range</span>
                <span className="text-[#CCC5B9]">{project.areaRange}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#8E887E] block uppercase">
                Guide Valuation
              </span>
              <div className="font-mono text-lg font-bold text-[#C9A86A]">
                {project.priceRange}
              </div>
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#C9A86A] hover:bg-[#D8B77D] text-[#131210] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(201,168,106,0.25)] group/btn"
            >
              <span>Explore Architecture</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
