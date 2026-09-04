"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, BedDouble, Maximize2 } from "lucide-react";
import { ProjectCardData } from "@/components/project-card";

interface InteractiveProjectIndexProps {
  projects: ProjectCardData[];
}

export default function InteractiveProjectIndex({ projects }: InteractiveProjectIndexProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] || projects[0];

  if (!projects || projects.length === 0) return null;

  return (
    <section id="index" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#090B0D] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880]">
              <span>04 // THE PLACES</span>
              <span>•</span>
              <span>PROJECT DIRECTORY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F4F1EA]">
              Architectural Index
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8C8983] max-w-sm font-light leading-relaxed">
            Hover or select a development to reveal architectural perspectives, location specifications, and live availability.
          </p>
        </div>

        {/* Interactive Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typographic Project List */}
          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
            {projects.map((project, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={`group py-6 sm:py-8 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-85"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-xs text-[#C5A880] tracking-widest">
                        0{idx + 1}
                      </span>
                      <h3
                        className={`font-serif text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight transition-colors duration-300 ${
                          isActive ? "text-white" : "text-[#D8D4CA] group-hover:text-white"
                        }`}
                      >
                        {project.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#8C8983] pl-8 sm:pl-9">
                      <span className="font-mono text-[#C5A880] uppercase tracking-wider text-[11px]">
                        {project.projectType}
                      </span>
                      <span>•</span>
                      <span>{project.bedrooms}</span>
                      <span>•</span>
                      <span className="font-mono text-white/90">{project.priceRange}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pl-8 sm:pl-0 shrink-0">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border ${
                        project.status.toLowerCase() === "ready to move"
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                          : project.status.toLowerCase() === "upcoming"
                          ? "border-blue-500/30 text-blue-300 bg-blue-500/10"
                          : "border-amber-500/30 text-amber-300 bg-amber-500/10"
                      }`}
                    >
                      {project.status}
                    </span>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded bg-white/5 hover:bg-[#C5A880] text-xs font-mono uppercase tracking-wider text-white hover:text-[#0C0E10] transition-all duration-300 group/btn"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: High-Res Architectural Preview Window */}
          <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/11] rounded-lg overflow-hidden border border-white/10 bg-[#121519] shadow-2xl">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  activeIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={project.heroImage}
                  alt={project.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E10] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-6 left-6 right-6 space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-[#C5A880]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-mono">{project.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#CCC7BC] border-t border-white/10 pt-2 font-mono text-[11px]">
                    <span>{project.areaRange}</span>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-[#C5A880] hover:text-white uppercase tracking-wider flex items-center space-x-1"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}