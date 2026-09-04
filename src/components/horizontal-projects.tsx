"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Maximize2, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectCardData } from "@/components/project-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalProjectsProps {
  projects: ProjectCardData[];
}

export default function HorizontalProjects({ projects }: HorizontalProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 1024;
      if (prefersReducedMotion || isMobile) return;

      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      const tween = gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalScroll * 1.2}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressLineRef.current) {
              progressLineRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative bg-[#090B0D] border-y border-white/10 overflow-hidden"
    >
      {/* Pinned Viewport Frame */}
      <div className="min-h-screen flex flex-col justify-between py-10 sm:py-14 px-4 sm:px-8 lg:px-14">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880]">
              <span>HORIZONTAL SHOWCASE</span>
              <span>//</span>
              <span>PORTFOLIO GALLERIA</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F4F1EA]">
              Selected Developments
            </h2>
          </div>

          <div className="flex items-center space-x-6 text-xs text-[#8C8983] font-mono">
            <span className="hidden sm:inline">HYDERABAD • BAHADURPALLY</span>
            <Link
              href="/projects"
              className="text-[#C5A880] hover:text-white uppercase tracking-wider flex items-center space-x-1"
            >
              <span>All Projects ({projects.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Horizontal Track (Glides as user scrolls) */}
        <div className="my-auto py-8 overflow-x-auto lg:overflow-visible no-scrollbar">
          <div
            ref={trackRef}
            className="flex items-center space-x-8 sm:space-x-12 w-max will-change-transform"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="w-[320px] sm:w-[480px] lg:w-[580px] bg-[#111317] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#C5A880]/60 transition-all duration-500 shadow-2xl flex flex-col"
              >
                {/* Visual Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#16191E]">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${project.heroImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white">
                      0{index + 1} • {project.status}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#111317]/80 backdrop-blur-md border border-[#C5A880]/30 text-[10px] font-mono uppercase tracking-wider text-[#C5A880]">
                      {project.projectType}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 text-xs font-mono text-[#8C8983]">
                      <MapPin className="w-3 h-3 text-[#C5A880]" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white group-hover:text-[#C5A880] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#8C8983] line-clamp-2 leading-relaxed font-light">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Specification Row */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                    <div className="flex items-center space-x-2 text-[#CCC7BC]">
                      <BedDouble className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{project.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#CCC7BC]">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{project.areaRange}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#8C8983] block">
                        Investment From
                      </span>
                      <span className="font-mono text-sm font-semibold text-[#C5A880]">
                        {project.priceRange}
                      </span>
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="px-5 py-2.5 rounded-lg bg-[#191D24] hover:bg-[#C5A880] text-white hover:text-[#0C0E10] text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 group/btn"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Architectural Progress Track */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-[#8C8983]">
          <span className="hidden sm:inline uppercase tracking-widest text-[10px]">
            Scroll Vertically To Traverse Galleria
          </span>
          <div className="flex items-center space-x-3 w-full sm:w-64">
            <span className="text-[10px]">01</span>
            <div className="h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressLineRef}
                className="h-full bg-[#C5A880] w-full transform origin-left scale-x-0 transition-transform duration-100"
              />
            </div>
            <span className="text-[10px]">0{projects.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
