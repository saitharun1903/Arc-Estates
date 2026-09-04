"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import GlowBorder from "@/components/ui/glow-border";

interface RecommendationCardProps {
  project: {
    id: string;
    name: string;
    slug: string;
    bedrooms: string;
    priceRange: string;
    location?: string;
    heroImage: string;
    tagline?: string;
    status?: string;
  };
  reason?: string;
  onSelect?: () => void;
}

export default function RecommendationCard({
  project,
  reason = "Optimized for seismic monolithic structural safety and natural cross-ventilation in Bahadurpally.",
  onSelect,
}: RecommendationCardProps) {
  const displayLocation = project.location || "Bahadurpally, Hyderabad";
  return (
    <div className="relative rounded-xl bg-[#121519] dark:bg-[#121519] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] p-4 shadow-md space-y-3 group">
      <GlowBorder
        glowColor="#C5A880"
        tailColor="rgba(197, 168, 128, 0.25)"
        borderWidth={1}
        speed={12}
        rounded={12}
      />

      <div className="flex items-start gap-3">
        <div
          className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0 border border-white/10 dark:border-white/10 light:border-[#DDD7CC]"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-base font-semibold text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] truncate">
              {project.name}
            </h4>
            <span className="font-mono text-xs text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] font-semibold">
              {project.priceRange}
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58]">
            {project.bedrooms} · {displayLocation}
          </div>
        </div>
      </div>

      {/* Why It May Suit You Section */}
      <div className="p-2.5 rounded-lg bg-white/5 dark:bg-white/5 light:bg-[#F2EFEB] text-[11px] text-[#CCC7BC] dark:text-[#CCC7BC] light:text-[#383B40] leading-relaxed font-light space-y-1">
        <div className="flex items-center space-x-1.5 text-[9px] font-mono uppercase tracking-widest text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
          <Sparkles className="w-3 h-3" />
          <span>WHY IT MAY SUIT YOU</span>
        </div>
        <p>{reason}</p>
      </div>

      <Link
        href={`/projects/${project.slug}`}
        onClick={onSelect}
        className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] hover:underline pt-1"
      >
        <span>VIEW PROJECT</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
