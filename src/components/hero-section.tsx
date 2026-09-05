"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, Layers, Box, Sparkles, Compass, ShieldCheck, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Dynamically import 3D canvas with ssr: false for flawless hydration
const ArchitecturalCanvas = dynamic(
  () => import("@/components/3d/architectural-canvas"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#131210] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 rounded-full border border-[#C9A86A]/30 border-t-[#C9A86A] animate-spin" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#C9A86A] uppercase">
            INITIALIZING 3D ENVIRONMENT
          </span>
        </div>
      </div>
    ),
  }
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  onOpenAI: () => void;
  headline?: string;
  subhead?: string;
}

export default function HeroSection({
  onOpenAI,
  headline = "BUILT FOR THE WAY YOU LIVE.",
  subhead = "Architectural Real Estate & Construction Studio — Bahadurpally, Hyderabad",
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsBarRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const [blueprintMode, setBlueprintMode] = useState(false);
  const scrollProgressRef = useRef(0);
  const [assemblyComplete, setAssemblyComplete] = useState(false);

  // GSAP ScrollTrigger Integration for 3D Camera & Text Handoff
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
        },
      });

      // Smooth text exit animation on scroll
      if (contentOverlayRef.current) {
        gsap.to(contentOverlayRef.current, {
          y: -80,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "65% top",
            scrub: true,
          },
        });
      }

      return () => {
        st.kill();
      };
    },
    { scope: containerRef }
  );

  // Initial Content Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          [titleLine1Ref.current, titleLine2Ref.current],
          { opacity: 0, y: 35, clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.1,
            stagger: 0.18,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          metricsBarRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          controlsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.0, ease: "power1.out" },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen h-[100svh] overflow-hidden bg-[#131210] text-[#FBF9F5] select-none"
      aria-label="Arc Estates 3D Architectural Showcase"
    >
      {/* Interactive 3D WebGL Architectural Environment */}
      <div className="absolute inset-0 z-0">
        <ArchitecturalCanvas
          blueprintMode={blueprintMode}
          scrollProgressRef={scrollProgressRef}
          onAssemblyComplete={() => setAssemblyComplete(true)}
        />
      </div>

      {/* Cinematic Vignette & Ambient Architectural Overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#131210] via-transparent to-[#131210]/60" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(19,18,16,0.65)_100%)]" />

      {/* Hero Foreground Content Overlay */}
      <div
        ref={contentOverlayRef}
        className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-28 pb-10 pointer-events-none"
      >
        {/* Top Architectural Coordinate Eyebrow */}
        <div ref={eyebrowRef} className="opacity-0 space-y-1.5 pt-2 pointer-events-auto">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1 rounded-full bg-[#1C1A17]/85 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C9A86A]">
              ARC ESTATES // RESIDENTIAL ARCHITECTURE
            </span>
            <span className="text-white/30 font-mono text-[9px] hidden sm:inline">•</span>
            <span className="text-[9px] font-mono tracking-wider text-[#8E887E] hidden sm:inline">
              BAHADURPALLY, HYDERABAD
            </span>
          </div>
        </div>

        {/* Center Editorial Title & Narrative */}
        <div className="max-w-3xl space-y-6 my-auto pointer-events-auto">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-[#FBF9F5] leading-[1.05]">
            <span ref={titleLine1Ref} className="block opacity-0">
              BUILT FOR
            </span>
            <span
              ref={titleLine2Ref}
              className="block opacity-0 text-[#C9A86A] italic font-light font-serif tracking-normal"
            >
              THE WAY YOU LIVE.
            </span>
          </h1>

          <p
            ref={metaRef}
            className="opacity-0 text-sm sm:text-base lg:text-lg text-[#CCC5B9] max-w-2xl font-light leading-relaxed drop-shadow"
          >
            {subhead}
          </p>

          {/* Key Metric Indicators Pill */}
          <div
            ref={metricsBarRef}
            className="opacity-0 flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs font-mono text-[#8E887E]"
          >
            <div className="flex items-center space-x-1.5">
              <Box className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>4 Flagship Projects</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>2,400 – 5,200 SQ.FT</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>Verified Structural Quality</span>
            </div>
          </div>

          {/* Action Call-to-Actions */}
          <div ref={ctaRef} className="opacity-0 flex flex-wrap items-center gap-3 pt-3">
            <Link
              href="/projects"
              className="group inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#C9A86A] hover:bg-[#D8B77D] text-[#131210] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,106,0.28)] hover:shadow-[0_6px_28px_rgba(201,168,106,0.42)] hover:scale-[1.02]"
              data-cursor="explore"
            >
              <span>Explore Developments</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/site-visit"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full border border-white/15 hover:border-[#C9A86A] bg-[#1C1A17]/70 hover:bg-[#22201C]/90 text-[#FBF9F5] text-xs font-medium tracking-wider backdrop-blur-md transition-all duration-300"
            >
              <span>Schedule Site Visit</span>
            </Link>

            <button
              onClick={onOpenAI}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-full border border-white/10 hover:border-[#C9A86A]/60 bg-[#1C1A17]/70 text-[#C9A86A] text-xs font-mono tracking-wider backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Concierge</span>
            </button>
          </div>
        </div>

        {/* Bottom 3D Controller & Mode Switcher Bar */}
        <div
          ref={controlsRef}
          className="opacity-0 flex items-center justify-between pt-4 border-t border-white/10 text-xs pointer-events-auto"
        >
          {/* 3D Interaction Notice */}
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono text-[#8E887E]">
            <span className="w-2 h-2 rounded-full bg-[#7E8D79] animate-pulse" />
            <span className="hidden sm:inline">3D INTERACTIVE ARCHITECTURE</span>
            <span className="sm:hidden">3D VIEW</span>
            <span className="text-white/20">•</span>
            <span className="text-[#CCC5B9]/70">DRAG TO ROTATE MODEL</span>
          </div>

          {/* Blueprint Mode Switcher */}
          <button
            onClick={() => setBlueprintMode((prev) => !prev)}
            className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 backdrop-blur-md ${
              blueprintMode
                ? "bg-[#0A1622] border-[#56CCF2] text-[#56CCF2] shadow-[0_0_15px_rgba(86,204,242,0.3)]"
                : "bg-[#1C1A17]/80 border-white/15 text-[#C9A86A] hover:border-[#C9A86A]"
            }`}
            aria-pressed={blueprintMode}
            title="Toggle Architectural Blueprint Mode"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{blueprintMode ? "Blueprint Mode: Active" : "View Blueprint Mode"}</span>
          </button>

          {/* Scroll Down Hint */}
          <div className="hidden md:flex items-center space-x-2 text-[10px] font-mono text-[#8E887E]">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3 h-3 text-[#C9A86A] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
