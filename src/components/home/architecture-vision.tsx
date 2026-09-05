"use client";

import React, { useRef } from "react";
import { Compass, ShieldCheck, Ruler, Layers, Cpu, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArchitectureVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || !sectionRef.current) return;

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (diagramRef.current) {
        gsap.fromTo(
          diagramRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: diagramRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const pillars = [
    {
      num: "01",
      title: "Solar & Daylight Geometry",
      subtitle: "Bioclimatic Orientation",
      desc: "Every residence is positioned along east-west solar paths. Cantilevered floor slabs shield interiors from harsh afternoon radiation while maximizing natural morning illumination.",
      metric: "100% Daylight Saturation",
      icon: Compass,
    },
    {
      num: "02",
      title: "Monolithic Structural Integrity",
      subtitle: "Fe-550D Rebar + M40 Concrete",
      desc: "Zone-II seismic rated engineering utilizing high-ductility rebar and calibrated monolithic shear walls. Rigid quality testing guarantees zero structural compromise.",
      metric: "Fe-550D High-Ductility Rebar",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "Acoustic Separation",
      subtitle: "Multi-Layered Wall Assemblies",
      desc: "Acoustically decoupled boundary walls prevent sound transmission between sky suites, securing private sanctuaries isolated from external ambient corridor noise.",
      metric: "48dB Acoustic Decoupling",
      icon: Layers,
    },
    {
      num: "04",
      title: "Spatial Rectilinearity",
      subtitle: "Zero Awkward Columns",
      desc: "Columns are embedded strictly within perimeter wall depths. Living spaces, bedrooms, and kitchens deliver pure rectangular volume for seamless interior customization.",
      metric: "100% Usable Carpet Area",
      icon: Ruler,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="py-28 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#0C0E10] text-[#F4F1EA] border-b border-white/10 relative overflow-hidden"
    >
      {/* Background Subtle Blueprint Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span>ARCHITECTURAL METHODOLOGY // BAHADURPALLY</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Designed with Intention. <br />
            <span className="text-[#C5A880] italic font-light font-serif">Every line. Every material. Every space.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9A968D] font-light leading-relaxed max-w-2xl">
            We abandon superficial ornamentation in favor of architectural honesty: authentic materials, structural longevity, and residences shaped around human daily living.
          </p>
        </div>

        {/* Technical Blueprint Visual Diagram Card */}
        <div
          ref={diagramRef}
          className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-white/15 bg-[#121519] shadow-2xl group"
        >
          {/* Architectural Drawing Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0E10]/95 via-[#0C0E10]/70 to-transparent" />

          {/* Technical Blueprint Overlay Callouts */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>SPECIFICATION BLUEPRINT // LEVEL SECTION 04</span>
              </div>
              <span className="text-[10px] font-mono text-white/40">
                TOLERANCE: ±1.5MM • MONOLITHIC CASTING
              </span>
            </div>

            <div className="max-w-md space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                Cantilevered Floor Plates &amp; Thermal Buffer Balconies
              </h3>
              <p className="text-xs text-[#CCC7BC] leading-relaxed font-light">
                Extended concrete overhangs cast calculated shade onto floor-to-ceiling glass assemblies, reducing solar heat gain by 32% while preserving uninterrupted horizon panoramas.
              </p>
            </div>

            {/* Micro Blueprint Technical Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-[10px] text-white/40 block">SLAB THICKNESS</span>
                <span className="text-[#C5A880] font-semibold">200mm Post-Tensioned</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block">CONCRETE GRADE</span>
                <span className="text-[#C5A880] font-semibold">M40 Self-Compacting</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block">FACADE GLAZING</span>
                <span className="text-[#C5A880] font-semibold">Low-E Acoustic DGU</span>
              </div>
              <div>
                <span className="text-[10px] text-white/40 block">WARRANTY</span>
                <span className="text-[#C5A880] font-semibold">10-Year Structural</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="p-8 rounded-xl bg-[#13161A] border border-white/10 space-y-5 flex flex-col justify-between hover:border-[#C5A880]/60 transition-all duration-300 shadow-lg group hover:translate-y-[-4px]"
                data-cursor="explore"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-light text-[#C5A880]/50 group-hover:text-[#C5A880] transition-colors">
                      {p.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#A09D96]">
                      {p.subtitle}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-white group-hover:text-[#C5A880] transition-colors">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#8C8983] leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-[#C5A880]">
                  {p.metric}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
