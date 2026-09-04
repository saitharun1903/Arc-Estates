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
    <div className="relative rounded-2xl overflow-hidden bg-[#101317] dark:bg-[#101317] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] shadow-lg group">
      {useGlow && (
        <GlowBorder
          glowColor="#C5A880"
          tailColor="rgba(197, 168, 128, 0.3)"
          borderWidth={1.5}
          speed={10}
          rounded={16}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch p-6 sm:p-8">
        {/* Large Architectural Canvas */}
        <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-[#181C22]">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${project.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Floating Badge */}
          <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest px-3 py-1 rounded bg-black/70 backdrop-blur text-[#C5A880] uppercase flex items-center space-x-2">
            <span className="font-bold">{formattedIndex}</span>
            <span>•</span>
            <span>FLAGSHIP DEVELOPMENT</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="text-xs font-mono opacity-80">{project.bedrooms} Sky Residences</div>
            <div className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
              {project.name}
            </div>
          </div>
        </div>

        {/* Information & Action Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 py-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] tracking-widest font-semibold">
                  {formattedIndex}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58]">
                  {project.projectType}
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                {project.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] leading-relaxed font-light">
                {project.tagline}
              </p>
            </div>

            {/* Architectural Intelligence */}
            <div className="space-y-3 pt-3 border-t border-white/5 dark:border-white/5 light:border-[#EAE6DE] text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] block">Structural Grid</span>
                <span className="text-[#DDD8CE] dark:text-[#DDD8CE] light:text-[#181A1D]">{structuralGrid}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] block">Daylight Aperture</span>
                <span className="text-[#DDD8CE] dark:text-[#DDD8CE] light:text-[#181A1D]">{daylightAxis}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] block">Spatial Range</span>
                <span className="text-[#DDD8CE] dark:text-[#DDD8CE] light:text-[#181A1D]">{project.areaRange}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/5 dark:border-white/5 light:border-[#EAE6DE] flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] block uppercase">
                Guide Valuation
              </span>
              <div className="font-mono text-lg font-bold text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                {project.priceRange}
              </div>
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#9E7D4C] text-[#0C0E10] dark:text-[#0C0E10] light:text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#D4B58C] transition-all shadow-md group/btn"
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
