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
    <div className="relative rounded-2xl overflow-hidden bg-[#181714] dark:bg-[#181714] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] p-8 sm:p-12 shadow-xl">
      <GlowBorder
        glowColor="#C9A86A"
        tailColor="rgba(201, 168, 106, 0.28)"
        borderWidth={1.5}
        speed={9}
        rounded={16}
      />

      <div className="relative z-10 max-w-2xl space-y-6">
        <div className="inline-flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.3em] text-[#C9A86A] dark:text-[#C9A86A] light:text-[#A88656] font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>BAHADURPALLY SITE OFFICE</span>
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-3xl sm:text-5xl font-normal text-[#FBF9F5] dark:text-[#FBF9F5] light:text-[#1A1815] tracking-tight">
            Experience the Space in Person.
          </h3>
          <p className="text-sm sm:text-base text-[#8E887E] dark:text-[#8E887E] light:text-[#615E58] leading-relaxed font-light">
            Walk through physical floor plates, verify concrete finish quality, and inspect daylight orientations across ARC Avenue developments.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/site-visit"
            onClick={handleClick}
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#C9A86A] dark:bg-[#C9A86A] light:bg-[#A88656] text-[#131210] dark:text-[#131210] light:text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#D8B77D] light:hover:bg-[#967445] transition-all shadow-md group"
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
