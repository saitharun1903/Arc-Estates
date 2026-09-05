"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Sparkles, MapPin, Building2 } from "lucide-react";

interface ProjectsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const megaMenuProjects = [
  {
    number: "01",
    name: "ARC Vista",
    slug: "arc-vista",
    typology: "Sky Residences",
    specs: "3 & 4 BHK · 2,850 - 4,200 SQ.FT",
    valuation: "From ₹1.45 Cr",
    status: "Ready to Move",
    location: "Bahadurpally Corridor",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    tagline: "Monolithic shear walls & sunset view balconies",
  },
  {
    number: "02",
    name: "ARC Haven",
    slug: "arc-haven",
    typology: "Courtyard Villas",
    specs: "3 BHK · 2,400 - 3,100 SQ.FT",
    valuation: "From ₹1.10 Cr",
    status: "Ongoing",
    location: "Doolapally Road",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    tagline: "Internal private garden court & lightwells",
  },
  {
    number: "03",
    name: "ARC Terrace",
    slug: "arc-terrace",
    typology: "Boutique Terraces",
    specs: "2 & 3 BHK · 1,650 - 2,200 SQ.FT",
    valuation: "From ₹85 Lakhs",
    status: "Ongoing",
    location: "Near ORR Exit 5",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    tagline: "Stepped green terraces with low-density living",
  },
  {
    number: "04",
    name: "ARC Origin",
    slug: "arc-origin",
    typology: "Commercial Landmark",
    specs: "Retail & Grade-A Workspaces",
    valuation: "From ₹65 Lakhs",
    status: "Upcoming",
    location: "Main Arterial Junction",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    tagline: "High-visibility retail frontage & executive suites",
  },
];

export default function ProjectsMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: ProjectsMegaMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 right-0 pt-2.5 px-4 sm:px-6 lg:px-8 z-50 pointer-events-auto"
      role="region"
      aria-label="Projects Mega Menu"
    >
      <div className="max-w-7xl mx-auto rounded-2xl bg-[#121315]/96 backdrop-blur-2xl border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.65)] overflow-hidden animate-nav-fade-in">
        {/* Top Eyebrow Bar */}
        <div className="px-6 py-3 border-b border-white/[0.06] bg-[#16171B]/60 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2 text-[#C9A86A]">
            <Building2 className="w-3.5 h-3.5" />
            <span className="uppercase tracking-[0.2em] font-semibold text-[11px]">
              ARC ESTATES PORTFOLIO ARCHIVE // 4 ACTIVE DEVELOPMENTS
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-[#8E887E]">
            <span>BAHADURPALLY • HYDERABAD</span>
            <span>•</span>
            <span className="text-[#CCC5B9]">100% RERA &amp; HMDA COMPLIANT</span>
          </div>
        </div>

        {/* 4 Projects Showcase Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {megaMenuProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              onClick={onClose}
              className="group relative rounded-xl overflow-hidden bg-[#18191C] border border-white/[0.06] hover:border-[#C9A86A]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-sm hover:shadow-xl"
            >
              {/* Project Visual */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1E22]">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18191C] via-transparent to-transparent opacity-80" />

                {/* Micro Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5 px-2 py-0.5 rounded bg-[#121315]/85 backdrop-blur border border-white/10 text-[9px] font-mono text-[#C9A86A]">
                  <span className="font-semibold">{project.number}</span>
                  <span className="opacity-50">/</span>
                  <span>{project.status}</span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#8E887E]">
                    {project.typology}
                  </div>
                  <h4 className="font-serif text-lg font-normal text-[#FBF9F5] group-hover:text-[#C9A86A] transition-colors leading-snug flex items-center justify-between">
                    <span>{project.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8E887E] group-hover:text-[#C9A86A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h4>
                  <p className="text-[11px] text-[#8E887E] font-light line-clamp-1">
                    {project.tagline}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-[10.5px] text-[#CCC5B9] font-medium">
                    {project.valuation}
                  </span>
                  <span className="text-[9.5px] text-[#8E887E] flex items-center space-x-1">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>Bahadurpally</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Action Footer Bar */}
        <div className="px-6 py-4 border-t border-white/[0.06] bg-[#16171B]/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3 text-xs text-[#8E887E] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Direct Site Office: Doolapally Road, beside KNR Apartments</span>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/properties"
              onClick={onClose}
              className="text-xs font-mono uppercase tracking-wider text-[#CCC5B9] hover:text-[#C9A86A] transition-colors py-1.5 px-3"
            >
              Browse Specific Floor Plans →
            </Link>

            <Link
              href="/site-visit"
              onClick={() => {
                onClose();
                if (typeof window !== "undefined") {
                  window.dispatchEvent(
                    new CustomEvent("open-site-visit", {
                      detail: { projectSlug: "arc-vista" },
                    })
                  );
                }
              }}
              className="h-8.5 px-4 rounded-full bg-[#C9A86A] hover:bg-[#D8B77D] text-[#121315] font-mono text-[11px] font-bold uppercase tracking-wider inline-flex items-center space-x-1.5 transition-all shadow-sm hover:shadow-[0_4px_16px_rgba(201,168,106,0.3)]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Walkthrough</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
