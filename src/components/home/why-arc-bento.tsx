"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Star, ShieldCheck, MapPin, Users, Award, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyArcBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || !bentoRef.current) return;

      gsap.fromTo(
        bentoRef.current.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="why-arc"
      className="py-28 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#0C0E10] text-[#F4F1EA] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880]">
            <span>FOUNDATIONAL REPUTATION</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Why Discerning Homeowners Choose Arc Avenue.
          </h2>
          <p className="text-sm sm:text-base text-[#8C8983] font-light max-w-xl">
            In an industry dominated by speculative volume, we treat residential development as architectural craftsmanship.
          </p>
        </div>

        {/* Bento Grid Composition */}
        <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          {/* Bento Item 1: Verified Google Reviews & Rating (Large Span) */}
          <div className="lg:col-span-8 p-8 sm:p-12 rounded-2xl bg-[#121519] border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-[#C5A880]/60 transition-all duration-500 shadow-xl">
            <div className="space-y-4 z-10">
              <div className="flex items-center space-x-2 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-mono font-bold text-white ml-2">5.0 / 5.0 RATING</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold max-w-lg leading-snug">
                Verified 5.0-Star Client Satisfaction Across Hyderabad
              </h3>
              <p className="text-xs sm:text-sm text-[#A09D96] max-w-xl font-light leading-relaxed">
                Backed by 14 public, independent Google reviews from registered property owners and visiting architects who have personally inspected our construction quality in Bahadurpally.
              </p>
            </div>

            <div className="pt-8 flex items-center justify-between z-10 border-t border-white/10 mt-6">
              <span className="text-xs font-mono text-[#C5A880]">PUBLICLY AUDITED ON GOOGLE MAPS</span>
              <a
                href="https://maps.app.goo.gl/kX7D8dJz9U1gYJ927"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs font-mono text-white hover:text-[#C5A880] transition-colors"
              >
                <span>Read Live Reviews</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Subtle Architectural BG watermark */}
            <div className="absolute right-[-40px] bottom-[-40px] font-serif text-[180px] font-bold text-white/[0.02] select-none pointer-events-none">
              5.0
            </div>
          </div>

          {/* Bento Item 2: Northern Corridor Focus (Stat Card) */}
          <div className="lg:col-span-4 p-8 sm:p-10 rounded-2xl bg-[#14171C] border border-white/10 flex flex-col justify-between group hover:border-[#C5A880]/60 transition-all duration-500 shadow-xl">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-4xl sm:text-5xl font-serif font-bold text-white block">
                100%
              </span>
              <h4 className="font-serif text-xl font-bold text-white">
                Bahadurpally Corridor Presence
              </h4>
              <p className="text-xs text-[#8C8983] leading-relaxed font-light">
                Our primary corporate office sits right on Doolapally Road, moments away from every active project site for direct, daily executive supervision.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 text-[11px] font-mono text-[#C5A880]">
              DAILY CHIEF ENGINEER ON-SITE
            </div>
          </div>

          {/* Bento Item 3: Direct Developer Delivery (No Brokers) */}
          <div className="lg:col-span-4 p-8 sm:p-10 rounded-2xl bg-[#14171C] border border-white/10 flex flex-col justify-between group hover:border-[#C5A880]/60 transition-all duration-500 shadow-xl">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-4xl sm:text-5xl font-serif font-bold text-white block">
                0
              </span>
              <h4 className="font-serif text-xl font-bold text-white">
                Intermediary Barriers
              </h4>
              <p className="text-xs text-[#8C8983] leading-relaxed font-light">
                Direct engagement from your initial floor-plan briefing to final key handover. No commissioned brokers, inflated markups, or third-party misrepresentations.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 text-[11px] font-mono text-[#C5A880]">
              DIRECT DEVELOPER TRANSPARENCY
            </div>
          </div>

          {/* Bento Item 4: Verified Structural Quality (Span 8) */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-2xl bg-[#121519] border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-[#C5A880]/60 transition-all duration-500 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Audited Batch Quality Materials
                </h4>
                <p className="text-xs text-[#8C8983] leading-relaxed font-light">
                  Every truckload of cement, rebar, and aggregate arrives with certified chemical composition and tensile test certificates. We reject materials that fail automated batch stress tests.
                </p>
                <div className="pt-2">
                  <Link
                    href="/craftsmanship"
                    className="inline-flex items-center space-x-1 text-xs font-mono text-[#C5A880] hover:underline"
                  >
                    <span>Inspect 5-Stage Engineering Protocol</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-lg bg-[#181C22] border border-white/5 space-y-1">
                  <span className="text-[10px] text-white/40 block">CONCRETE TESTING</span>
                  <span className="text-white font-bold block">Cube Crushing 28-Day</span>
                  <span className="text-[#C5A880] text-[10px]">Verified Strength</span>
                </div>
                <div className="p-4 rounded-lg bg-[#181C22] border border-white/5 space-y-1">
                  <span className="text-[10px] text-white/40 block">STEEL STANDARD</span>
                  <span className="text-white font-bold block">Fe-550D TMT</span>
                  <span className="text-[#C5A880] text-[10px]">Anti-Corrosive Coated</span>
                </div>
                <div className="p-4 rounded-lg bg-[#181C22] border border-white/5 space-y-1">
                  <span className="text-[10px] text-white/40 block">WATERPROOFING</span>
                  <span className="text-white font-bold block">Elastomeric Membrane</span>
                  <span className="text-[#C5A880] text-[10px]">10-Year Guarantee</span>
                </div>
                <div className="p-4 rounded-lg bg-[#181C22] border border-white/5 space-y-1">
                  <span className="text-[10px] text-white/40 block">PLUMBING LINES</span>
                  <span className="text-white font-bold block">Multi-Layer CPVC</span>
                  <span className="text-[#C5A880] text-[10px]">15-Bar Tested</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
