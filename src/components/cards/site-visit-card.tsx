"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, MapPin } from "lucide-react";
import GlowBorder from "@/components/ui/glow-border";

interface SiteVisitCardProps {
  onOpenModal?: () => void;
}

export default function SiteVisitCard({ onOpenModal }: SiteVisitCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onOpenModal) {
      e.preventDefault();
      onOpenModal();
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#101317] dark:bg-[#101317] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] p-8 sm:p-12 shadow-xl">
      <GlowBorder
        glowColor="#C5A880"
        tailColor="rgba(197, 168, 128, 0.35)"
        borderWidth={1.5}
        speed={9}
        rounded={16}
      />

      <div className="relative z-10 max-w-2xl space-y-6">
        <div className="inline-flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
          <MapPin className="w-3.5 h-3.5" />
          <span>BAHADURPALLY SITE OFFICE</span>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-3xl sm:text-5xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] tracking-tight">
            Experience the Space in Person.
          </h3>
          <p className="text-sm sm:text-base text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] leading-relaxed font-light">
            Walk through physical floor plates, verify concrete finish quality, and inspect daylight orientations across ARC Avenue developments.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/site-visit"
            onClick={handleClick}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#9E7D4C] text-[#0C0E10] dark:text-[#0C0E10] light:text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#D4B58C] transition-all shadow-md group"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Site Inspection</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
