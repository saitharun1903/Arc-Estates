"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar, Compass, Layers, Ruler, Sparkles, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CRAFTSMANSHIP_PHASES } from "@/data/craftsmanship-phases";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS = [Compass, Layers, Ruler, Sparkles, ShieldCheck];

export default function ConstructionJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imgError, setImgError] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isManualRef = useRef(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const current = CRAFTSMANSHIP_PHASES[activeStep];
  const StepIcon = ICONS[activeStep] || Compass;

  // Preload next phase images
  useEffect(() => {
    CRAFTSMANSHIP_PHASES.forEach((phase) => {
      const img = new window.Image();
      img.src = phase.image;
    });
  }, []);

  // Signature Moment #3: Scroll-Driven Construction Timeline Progression
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || !sectionRef.current) return;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        end: "bottom 35%",
        onUpdate: (self) => {
          if (isManualRef.current) return;
          const numPhases = CRAFTSMANSHIP_PHASES.length;
          const targetStep = Math.min(
            Math.floor(self.progress * numPhases),
            numPhases - 1
          );
          if (targetStep >= 0 && targetStep < numPhases) {
            setActiveStep((prev) => (prev !== targetStep ? targetStep : prev));
          }
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: sectionRef }
  );

  const handleStepSelect = (idx: number) => {
    if (idx === activeStep) return;
    isManualRef.current = true;
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    setIsTransitioning(true);
    setImgError(false);
    setActiveStep(idx);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);

    // Allow scroll to resume updating after 3s of idle user interaction
    manualTimeoutRef.current = setTimeout(() => {
      isManualRef.current = false;
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#0A0C0E] dark:bg-[#0A0C0E] light:bg-[#F8F6F0] border-t border-white/10 dark:border-white/10 light:border-[#DDD7CC] relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 dark:border-white/10 light:border-[#DDD7CC] pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono tracking-[0.25em] text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] uppercase">
              <span>CIVIL METHODOLOGY</span>
              <span>//</span>
              <span>HOW WE BUILD</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              The Craft Journey
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] max-w-md font-light leading-relaxed">
            Every ARC Avenue residence evolves through a deliberate five-stage physical process—from initial solar alignment to key handover.
          </p>
        </div>

        {/* Phase Timeline Selector */}
        {/* Desktop: 5 connected timeline tabs | Mobile: smooth horizontal scroll */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
          {CRAFTSMANSHIP_PHASES.map((phase, idx) => {
            const isCurrent = idx === activeStep;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => handleStepSelect(idx)}
                className={`flex-1 min-w-[140px] sm:min-w-0 p-4 rounded-xl border text-left transition-all duration-300 relative group cursor-pointer ${
                  isCurrent
                    ? "bg-[#14171C] dark:bg-[#14171C] light:bg-[#FFFFFF] border-[#C5A880] dark:border-[#C5A880] light:border-[#9E7D4C] shadow-md"
                    : "bg-[#0E1013] dark:bg-[#0E1013] light:bg-[#EFECE5] border-white/5 dark:border-white/5 light:border-[#DDD7CC] hover:border-white/20 dark:hover:border-white/20 light:hover:border-[#C5A880]/60"
                }`}
              >
                {/* Active Indicator Micro-line */}
                {isCurrent && (
                  <div className="absolute top-0 left-4 right-4 h-[2px] bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#9E7D4C] rounded-full" />
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wider transition-colors ${
                      isCurrent
                        ? "text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] font-bold"
                        : "text-[#8C8983] dark:text-[#8C8983] light:text-[#7A756D] group-hover:text-white dark:group-hover:text-white light:group-hover:text-[#181A1D]"
                    }`}
                  >
                    PHASE {phase.phase}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isCurrent
                        ? "bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#9E7D4C]"
                        : "bg-white/10 dark:bg-white/10 light:bg-[#DDD7CC]"
                    }`}
                  />
                </div>

                <div
                  className={`text-xs sm:text-sm font-medium transition-colors ${
                    isCurrent
                      ? "text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]"
                      : "text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] group-hover:text-[#CCC7BC] dark:group-hover:text-[#CCC7BC] light:group-hover:text-[#181A1D]"
                  }`}
                >
                  {phase.shortTabTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Phase Content Showcase Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#101317] dark:bg-[#101317] light:bg-[#FAF8F5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300">
          {/* Left Column: Synchronized Phase Information */}
          <div
            key={`info-${current.id}`}
            className={`lg:col-span-5 space-y-6 transition-opacity duration-300 ${
              isTransitioning ? "opacity-40" : "opacity-100"
            }`}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
                <StepIcon className="w-3.5 h-3.5" />
                <span>STAGE {current.phase} OF 05</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                {current.title}
              </h3>
              <p className="text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#7A756D] uppercase tracking-wider">
                {current.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#CCC7BC] dark:text-[#CCC7BC] light:text-[#4A4740] leading-relaxed font-light">
              {current.shortDescription}
            </p>

            {/* Supporting Points */}
            <div className="space-y-3 pt-2 border-t border-white/10 dark:border-white/10 light:border-[#DDD7CC]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8983] dark:text-[#8C8983] light:text-[#7A756D] block">
                STAGE SPECIFICATIONS:
              </span>
              <ul className="space-y-2.5">
                {current.details.map((detail, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-xs text-[#E6E2D8] dark:text-[#E6E2D8] light:text-[#38352F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-light">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contextual CTA */}
            <div className="pt-2">
              <Link
                href="/site-visit"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#9E7D4C] hover:bg-[#D4B58C] text-[#0C0E10] text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-md group/cta"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Walk Active Site In Person</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Large Relevant Architectural Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 dark:border-white/10 light:border-[#DDD7CC] bg-[#0E1013] dark:bg-[#0E1013] light:bg-[#EAE6DE] shadow-xl group">
              {/* Image Container with Smooth Crossfade and Scale */}
              <div
                key={`img-${current.id}`}
                className={`w-full h-full relative transition-all duration-600 ease-out ${
                  isTransitioning ? "opacity-20 scale-[0.98]" : "opacity-100 scale-100"
                }`}
              >
                {!imgError ? (
                  <img
                    src={current.image}
                    alt={`${current.title} — ARC Avenue Craftsmanship`}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-3 bg-[#16191E]">
                    <StepIcon className="w-10 h-10 text-[#C5A880]" />
                    <div className="font-serif text-lg text-white">{current.title}</div>
                    <p className="text-xs text-[#8C8983] max-w-xs">{current.caption}</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70" />
              </div>

              {/* Verified Phase Caption Capsule */}
              <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-3.5 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between text-xs text-white">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-wider font-semibold">
                    PHASE {current.phase} PROTOCOL
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-[11px] text-white/90 truncate font-light">
                    {current.caption}
                  </span>
                </div>
                <span className="hidden sm:inline font-mono text-[10px] text-white/60 uppercase tracking-widest shrink-0">
                  Bahadurpally HQ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
