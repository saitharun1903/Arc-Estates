"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
  headline = "BUILT WITH INTENTION.",
  subhead = "Real Estate Builders & Construction Company — Bahadurpally, Hyderabad",
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // 8-Step GSAP Hero Sequence (~1.5s total) + Scroll-Handoff Transition
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Step 1: Background scale settling
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 0.35, duration: 1.6, ease: "power2.out" },
        0
      );

      // Step 2 & 3: Eyebrow and hairlines
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.2
      );

      // Step 4 & 5: Headline lines rise
      tl.fromTo(
        titleLine1Ref.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.35
      );
      tl.fromTo(
        titleLine2Ref.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.48
      );

      // Step 6: Meta subtitle
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.65
      );

      // Step 7: CTAs rise
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.78
      );

      // Step 8: Scroll indicator float
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.95
      );

      gsap.to(scrollIndicatorRef.current, {
        y: 6,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.5,
      });

      // Signature Moment #1: Hero Scroll Exit & Chapter Hand-off
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Background subtle scale & parallax
      scrollTl.to(
        bgImageRef.current,
        {
          scale: 1.10,
          yPercent: 12,
          opacity: 0.16,
          ease: "none",
        },
        0
      );

      // Headline subtle upward movement and soft fade
      scrollTl.to(
        [titleLine1Ref.current, titleLine2Ref.current],
        {
          y: -40,
          opacity: 0.18,
          ease: "none",
        },
        0
      );

      // Eyebrow, subtitle, and CTAs gently fade out
      scrollTl.to(
        [eyebrowRef.current, metaRef.current, ctaRef.current, scrollIndicatorRef.current],
        {
          y: -28,
          opacity: 0,
          ease: "none",
        },
        0
      );
    },
    { scope: containerRef }
  );

  const handleOpenVisitModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-site-visit", {
          detail: { projectSlug: "arc-vista" },
        })
      );
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0C0E] dark:bg-[#0A0C0E] light:bg-[#F8F6F0] transition-colors duration-300"
    >
      {/* Full-width Architectural Image Background */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 opacity-30 scale-100 pointer-events-none select-none"
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
          alt="ARC Avenue Architectural Residences"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Layered Architectural Gradient Overlays & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C0E]/90 dark:from-[#0A0C0E]/90 light:from-[#F8F6F0]/90 via-[#0A0C0E]/75 dark:via-[#0A0C0E]/75 light:via-[#F8F6F0]/80 to-[#0A0C0E] dark:to-[#0A0C0E] light:to-[#F8F6F0] pointer-events-none transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0C0E_85%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0C0E_85%)] light:bg-[radial-gradient(ellipse_at_center,transparent_0%,#F8F6F0_85%)] pointer-events-none transition-colors duration-300" />
      <div className="absolute inset-0 bg-blueprint-grid opacity-15 light:opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#C5A880]/5 dark:bg-[#C5A880]/5 light:bg-[#A88858]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10 text-center flex flex-col items-center space-y-6 sm:space-y-8">
        {/* Brand & Category Hierarchy */}
        <div ref={eyebrowRef} className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#C5A880] dark:to-[#C5A880] light:to-[#A88858]" />
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] select-none whitespace-nowrap">
              ARC AVENUE
            </span>
            <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#C5A880] dark:to-[#C5A880] light:to-[#A88858]" />
          </div>
          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] select-none">
            REAL ESTATE BUILDERS &amp; CONSTRUCTION • BAHADURPALLY, HYDERABAD
          </p>
        </div>

        {/* Main Architectural Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-normal tracking-tight text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] leading-[0.98] max-w-4xl select-none">
          <span ref={titleLine1Ref} className="block">
            BUILDING
          </span>
          <span ref={titleLine2Ref} className="block italic text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]">
            FOR LIVING.
          </span>
        </h1>

        {/* Small Supporting Line */}
        <p
          ref={metaRef}
          className="text-xs sm:text-sm md:text-base text-[#CCC7BC] dark:text-[#CCC7BC] light:text-[#5F5B53] max-w-xl mx-auto leading-relaxed font-light font-mono tracking-wide"
        >
          Builders &amp; Construction • Bahadurpally, Hyderabad
        </p>

        {/* Clean Editorial CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md pt-2"
        >
          <a
            href="#projects"
            className="h-12 inline-flex items-center justify-center w-full sm:w-auto px-8 bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#A88858] hover:bg-[#D4B992] dark:hover:bg-[#D4B992] light:hover:bg-[#967644] text-[#0C0E10] text-xs font-mono uppercase tracking-[0.2em] font-bold rounded-[3px] shadow-lg transition-all duration-300 text-center whitespace-nowrap select-none group"
          >
            <span>Explore Projects</span>
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          <button
            type="button"
            onClick={handleOpenVisitModal}
            className="h-12 inline-flex items-center justify-center w-full sm:w-auto px-7 border border-white/20 dark:border-white/20 light:border-[#DDD7CC] hover:border-[#C5A880] dark:hover:border-[#C5A880] light:hover:border-[#A88858] bg-[#14171C]/80 dark:bg-[#14171C]/80 light:bg-[#FAF8F5]/90 hover:bg-[#1E232B] dark:hover:bg-[#1E232B] light:hover:bg-[#EAE6DE] text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] text-xs font-mono uppercase tracking-[0.18em] font-medium rounded-[3px] transition-all duration-300 text-center whitespace-nowrap select-none group"
          >
            <span>Book a Visit</span>
            <span className="ml-2 text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 text-[#787570] dark:text-[#787570] light:text-[#858076] hover:text-[#C5A880] dark:hover:text-[#C5A880] light:hover:text-[#A88858] transition-colors cursor-pointer select-none"
        onClick={() => {
          const nextSection = document.getElementById("projects") || document.getElementById("hero");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
          }
        }}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.25em]">Scroll to Explore</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]" />
      </div>
    </section>
  );
}
