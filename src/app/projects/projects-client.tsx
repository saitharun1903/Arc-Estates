"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Layers, ShieldCheck, ArrowUpRight } from "lucide-react";
import { sortProjectsCanonically, getProjectNumber } from "@/lib/projects-order";

interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  location: string;
  status: string;
  projectType: string;
  heroImage: string;
  areaRange: string;
  bedrooms: string;
  priceRange: string;
  completionYear: string;
  totalUnits: string;
  constructionProgress: number;
  demo?: boolean;
}

interface ProjectsClientProps {
  initialProjects: ProjectItem[];
}

// Architectural portfolio metadata
const ARCHITECTURAL_METADATA: Record<string, {
  exhibitionSubtitle: string;
  structuralGrid: string;
  daylightAxis: string;
  materialPalette: string;
  chapterNumber: string;
  secondaryImage: string;
  philosophy: string;
}> = {
  "arc-vista": {
    exhibitionSubtitle: "Contemporary High-Rise Living",
    structuralGrid: "RCC Monolithic Shear Wall (Zone II Seismic)",
    daylightAxis: "East-West Solar Orientation · Sunset Balconies",
    materialPalette: "Italian Botticino Marble, Cast Bronze, Acoustic DGU",
    chapterNumber: "01",
    secondaryImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    philosophy: "Designed around vertical serenity and uncompromised daylight apertures. Cantilevered floor plates shield interior spaces from harsh western sun while framing continuous green horizons toward the ORR corridor.",
  },
  "arc-haven": {
    exhibitionSubtitle: "Private Residential Enclave",
    structuralGrid: "Isolated RCC Frame · Handcrafted Concrete",
    daylightAxis: "Zenith Open-to-Sky Lightwells · Cross-Ventilated",
    materialPalette: "Greek Thassos Marble, Teak Parquet, Raw Concrete",
    chapterNumber: "02",
    secondaryImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    philosophy: "A reinterpretation of traditional Indian courtyard living for contemporary privacy. Standalone villa forms wrap around quiet water reflection pools, filtering natural breezes through every living tier.",
  },
  "arc-terrace": {
    exhibitionSubtitle: "Stepped Garden Residences",
    structuralGrid: "Stepped Cantilevered Slabs · Aerated Blocks",
    daylightAxis: "North-Facing Apertures · Breezeway Infiltration",
    materialPalette: "Exposed Architectural Terracotta, Timber Pergolas",
    chapterNumber: "03",
    secondaryImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    philosophy: "Human-scale architectural density. Cascading terraces create private hanging gardens for each home, blurring the boundary between interior sanctuaries and lush external canopies.",
  },
  "arc-origin": {
    exhibitionSubtitle: "Foundational Architectural Statement",
    structuralGrid: "Post-Tensioned Monolithic Concrete Skeleton",
    daylightAxis: "Double-Skin High SHGC Thermal Solar Facade",
    materialPalette: "Thermally Insulated Low-E Curtain Glass, Fluted Stone",
    chapterNumber: "04",
    secondaryImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1400&q=80",
    philosophy: "A civic architectural beacon along Bahadurpally's central spine. Featuring a triple-height pedestrian colonnade and acoustic glass envelope engineered for corporate and retail longevity.",
  },
};

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [activeExhibitionIndex, setActiveExhibitionIndex] = useState(0);

  // Map developments with default fallbacks and ensure canonical sort
  const projects = sortProjectsCanonically(
    initialProjects.length > 0 ? initialProjects : [
      {
        id: "vista",
        name: "ARC Vista",
        slug: "arc-vista",
        tagline: "High-Rise Architectural Sky Residences",
        description: "ARC Vista is a towering testament to modern structural elegance in Bahadurpally.",
        location: "Bahadurpally Corridor, Hyderabad",
        status: "Ongoing",
        projectType: "Sky Residences",
        heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85",
        areaRange: "2,150 - 3,450 sq.ft",
        bedrooms: "3 & 4 BHK",
        priceRange: "₹1.85 Cr - ₹3.10 Cr",
        completionYear: "December 2026",
        totalUnits: "72 Ultra-Spacious Units",
        constructionProgress: 65,
      }
    ]
  );

  const currentExhibition = projects[activeExhibitionIndex] || projects[0];
  const meta = ARCHITECTURAL_METADATA[currentExhibition.slug] || {
    exhibitionSubtitle: currentExhibition.tagline,
    structuralGrid: "Engineered Monolithic Concrete",
    daylightAxis: "East-West Solar Axis",
    materialPalette: "Architectural Marble, Acoustic Glazing",
    chapterNumber: getProjectNumber(currentExhibition.slug),
    secondaryImage: currentExhibition.heroImage,
    philosophy: currentExhibition.description,
  };

  return (
    <div className="bg-[#080A0C] dark:bg-[#080A0C] light:bg-[#F8F6F0] text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] min-h-screen transition-colors duration-300">
      {/* 1. MINIMAL HERO */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-white/10 dark:border-white/10 light:border-[#DDD7CC]">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.35em] text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]">
            <span>PORTFOLIO ARCHIVE</span>
            <span>//</span>
            <span>HYDERABAD CORRIDOR</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
            THE PLACES WE BUILD.
          </h1>
          <p className="text-base sm:text-lg text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53] font-light leading-relaxed max-w-2xl">
            Four deliberate architectural interventions across Hyderabad&apos;s northern corridor.
          </p>
        </div>
      </section>

      {/* 2. INTERACTIVE ARCHITECTURAL EXHIBITION STAGE */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Exhibition Controls / Project Selector */}
          <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 border-b border-white/10 light:border-[#DDD7CC] -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 sm:pb-6">
            {projects.map((proj, idx) => {
              const isActive = idx === activeExhibitionIndex;
              const pMeta = ARCHITECTURAL_METADATA[proj.slug];
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveExhibitionIndex(idx)}
                  className={`text-left p-4 rounded-xl transition-all duration-300 border flex flex-col justify-between space-y-3 min-w-[210px] sm:min-w-0 shrink-0 active:scale-[0.98] ${
                    isActive
                      ? "bg-[#1C1A17] light:bg-[#EAE6DE] border-[#C9A86A] light:border-[#A88858] shadow-lg"
                      : "bg-[#131210] light:bg-[#F2EFEB] border-white/5 light:border-[#DDD7CC] opacity-60 hover:opacity-90"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#C9A86A] light:text-[#A88858] tracking-widest font-semibold">
                      {getProjectNumber(proj.slug)}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] light:bg-[#A88858]" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-serif text-base sm:text-lg font-medium text-[#FBF9F5] light:text-[#181A1D]">
                      {proj.name}
                    </h2>
                    <p className="text-[11px] font-mono text-[#8E887E] light:text-[#5F5B53] truncate">
                      {pMeta?.exhibitionSubtitle || proj.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Exhibition Stage Canvas (75% Visual / 25% Information) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1C1A17] light:bg-[#EFECE5] border border-white/10 light:border-[#DDD7CC] rounded-2xl p-4 sm:p-8 overflow-hidden shadow-2xl">
            {/* Visual Canvas (8 Cols) */}
            <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden group">
              <div
                key={currentExhibition.id}
                className="w-full h-full bg-cover bg-center transition-all duration-700 transform scale-100 group-hover:scale-105"
                style={{ backgroundImage: `url(${currentExhibition.heroImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Architectural HUD Badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between text-white">
                <div className="space-y-1">
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#C9A86A] uppercase">
                    {meta.chapterNumber} // {currentExhibition.location}
                  </div>
                  <div className="font-serif text-xl sm:text-3xl font-medium tracking-tight">
                    {currentExhibition.name}
                  </div>
                </div>

                <div className="hidden sm:block text-right font-mono text-xs opacity-75">
                  <div>{currentExhibition.totalUnits}</div>
                  <div>Delivery: {currentExhibition.completionYear}</div>
                </div>
              </div>
            </div>

            {/* Architectural Intelligence Panel (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 h-full py-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#C9A86A] light:text-[#A88858]">
                    {currentExhibition.projectType}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FBF9F5] light:text-[#181A1D]">
                    {meta.exhibitionSubtitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8E887E] light:text-[#5F5B53] leading-relaxed font-light">
                    {meta.philosophy}
                  </p>
                </div>

                {/* Grounded Technical Attributes */}
                <div className="space-y-3 pt-4 border-t border-white/10 light:border-[#DDD7CC] text-xs font-mono">
                  <div>
                    <span className="text-[#8E887E] light:text-[#656056] block text-[10px] uppercase tracking-wider">Structural Grid</span>
                    <span className="text-[#DDD8CE] light:text-[#181A1D]">{meta.structuralGrid}</span>
                  </div>
                  <div>
                    <span className="text-[#8E887E] light:text-[#656056] block text-[10px] uppercase tracking-wider">Daylight & Solar Axis</span>
                    <span className="text-[#DDD8CE] light:text-[#181A1D]">{meta.daylightAxis}</span>
                  </div>
                  <div>
                    <span className="text-[#8E887E] light:text-[#656056] block text-[10px] uppercase tracking-wider">Material System</span>
                    <span className="text-[#DDD8CE] light:text-[#181A1D]">{meta.materialPalette}</span>
                  </div>
                </div>
              </div>

              {/* Direct Link to Project Detail */}
              <Link
                href={`/projects/${currentExhibition.slug}`}
                className="inline-flex items-center justify-between w-full min-h-[46px] px-5 py-3.5 rounded-xl bg-[#C9A86A] text-[#131210] hover:bg-[#D8B77D] font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 group shadow-md active:scale-[0.98]"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL PROJECT CHAPTERS (ASYMMETRIC PORTFOLIO SPREADS) */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-32">
        <div className="border-b border-white/10 dark:border-white/10 light:border-[#DDD7CC] pb-8">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]">
            DETAILED MONOGRAPHS
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] mt-2">
            Architectural Chapters
          </h2>
        </div>

        {/* Chapter 01: ARC Vista (Large Image Left, Editorial Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-white/10 light:border-[#DDD7CC] group">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80)" }}
            />
            <div className="absolute top-4 left-4 font-mono text-xs px-3 py-1 bg-black/70 backdrop-blur text-[#C5A880] rounded">
              CHAPTER 01 // HIGH-RISE
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] tracking-widest uppercase">
                BAHADURPALLY CORRIDOR · DECEMBER 2026
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                ARC Vista
              </h3>
              <p className="text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53]">
                Sky Residences · 72 Private Units · 2,150 - 3,450 SQ.FT
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53] leading-relaxed font-light">
              Rising over Bahadurpally, ARC Vista incorporates an advanced RCC shear wall structural frame. Every residence features 8-foot cantilevered sunset terraces, eliminating thermal bridging while maximizing continuous airflow from the adjacent reserve greenery.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 dark:border-white/10 light:border-[#DDD7CC] text-xs font-mono">
              <div>
                <span className="text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] block text-[10px]">ACOUSTIC SYSTEM</span>
                <span className="text-[#DDD8CE] dark:text-[#DDD8CE] light:text-[#181A1D]">Double-Glazed DGU</span>
              </div>
              <div>
                <span className="text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] block text-[10px]">FACING ORIENTATION</span>
                <span className="text-[#DDD8CE] dark:text-[#DDD8CE] light:text-[#181A1D]">East &amp; North-East</span>
              </div>
            </div>

            <Link
              href="/projects/arc-vista"
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] hover:text-white light:hover:text-[#181A1D] transition-colors group"
            >
              <span>Explore ARC Vista Floor Plans &amp; Specs</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Chapter 02: ARC Haven (Editorial Left, Panoramic Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] tracking-widest uppercase">
                GUNDLAPOCHAMPALLY LINK · AUGUST 2026
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                ARC Haven
              </h3>
              <p className="text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53]">
                Courtyard Villas · 36 Standalone Estates · 3,800 - 5,200 SQ.FT
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53] leading-relaxed font-light">
              Centering on an open-to-sky water court, each Haven villa is an introspective sanctuary. Natural zenith illumination washes down into living salons, complemented by private elevators, solar net-metering arrays, and handcrafted exposed concrete feature masonry.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 dark:border-white/10 light:border-[#DDD7CC] text-xs font-mono">
              <div>
                <span className="text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] block text-[10px]">ENERGY SYSTEM</span>
                <span className="text-[#DDD8CE] dark:text-[#DDD8CE] light:text-[#181A1D]">5kW Rooftop Solar PV</span>
              </div>
              <div>
                <span className="text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] block text-[10px]">PRIVATE AMENITY</span>
                <span className="text-[#DDD8CE] dark:text-[#DDD8CE] light:text-[#181A1D]">Reflecting Water Pool</span>
              </div>
            </div>

            <Link
              href="/projects/arc-haven"
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] hover:text-white light:hover:text-[#181A1D] transition-colors group"
            >
              <span>Explore ARC Haven Floor Plans &amp; Specs</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-white/10 light:border-[#DDD7CC] order-1 lg:order-2 group">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80)" }}
            />
            <div className="absolute top-4 left-4 font-mono text-xs px-3 py-1 bg-black/70 backdrop-blur text-[#C5A880] rounded">
              CHAPTER 02 // COURTYARD ENCLAVE
            </div>
          </div>
        </div>

        {/* Chapter 03: ARC Terrace (Cinematic Wide Spread) */}
        <div className="space-y-8">
          <div className="relative aspect-[21/9] sm:aspect-[24/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-white/10 light:border-[#DDD7CC] group">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-between text-white">
              <div className="inline-flex items-center space-x-3 text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                <span>CHAPTER 03</span>
                <span>//</span>
                <span>READY FOR OCCUPANCY</span>
              </div>

              <div className="max-w-xl space-y-3">
                <h3 className="font-serif text-3xl sm:text-5xl font-light">
                  ARC Terrace
                </h3>
                <p className="text-xs sm:text-sm text-[#DDD8CE] font-light leading-relaxed">
                  Cascading cantilevered outdoor terraces near Tech Mahindra Bahadurpally. Designed for low-density human habitation with dedicated green pergolas.
                </p>
                <div className="pt-2">
                  <Link
                    href="/projects/arc-terrace"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#C5A880] hover:text-black text-xs font-mono uppercase tracking-wider transition-all duration-300"
                  >
                    <span>View Completed Residences</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 04: ARC Origin (Dual-Image Architectural Study) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/10 dark:border-white/10 light:border-[#DDD7CC]">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80)" }}
              />
            </div>
            <div className="aspect-[3/4] rounded-xl overflow-hidden border border-white/10 dark:border-white/10 light:border-[#DDD7CC] mt-8">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80)" }}
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] tracking-widest uppercase">
                DOOLAPALLY ARTERIAL · LAUNCHING Q1 2026
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                ARC Origin
              </h3>
              <p className="text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53]">
                Commercial &amp; Retail Landmark · 32 Corporate Bays
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53] leading-relaxed font-light">
              Marking the physical threshold of Bahadurpally&apos;s commercial emergence. Origin combines a high-performance double-skin glass curtain wall with shaded pedestrian breezeways and high-capacity destination elevators.
            </p>

            <Link
              href="/projects/arc-origin"
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] hover:text-white light:hover:text-[#181A1D] transition-colors group"
            >
              <span>Explore Commercial Architecture</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM DIRECTORY ACTION STRIP */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10 dark:border-white/10 light:border-[#DDD7CC] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] uppercase tracking-widest">
            LOOKING FOR SPECIFIC INVENTORY UNITS?
          </div>
          <p className="text-sm text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53]">
            Browse available 2, 3, and 4 BHK units with exact floor levels and orientation filters.
          </p>
        </div>

        <Link
          href="/properties"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-[#EAE6DE] hover:bg-[#C5A880] dark:hover:bg-[#C5A880] light:hover:bg-[#A88858] text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] hover:text-[#0C0E10] font-mono text-xs uppercase tracking-wider transition-all duration-300 border border-white/10 dark:border-white/10 light:border-[#DDD7CC]"
        >
          <span>Open Property Discovery</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
