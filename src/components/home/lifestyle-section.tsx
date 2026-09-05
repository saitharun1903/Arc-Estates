"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Compass, HeartHandshake, TrendingUp, MapPin, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LifestyleSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      id: "living",
      title: "Pure Living Comfort",
      badge: "SPATIAL SERENITY",
      headline: "Residences that breathe with sunrise light and silent corridors.",
      description:
        "Every master suite and living lounge at Arc Avenue is sculpted around human circadian rhythms. Wide cantilevered balconies capture natural cool breezes from the surrounding reserve while framing unhindered horizon views toward the Outer Ring Road.",
      metrics: [
        { label: "Balcony Depth", val: "8.5 FT" },
        { label: "Ceiling Clear Height", val: "10.6 FT" },
        { label: "Acoustic Attenuation", val: "STC 50" },
      ],
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
      icon: Sparkles,
    },
    {
      id: "location",
      title: "Northern Corridor Connectivity",
      badge: "ORR & TECH HUBS",
      headline: "Minutes from Gandipet ORR, Tech Centers, and Premier Academies.",
      description:
        "Situated on Doolapally Road in Bahadurpally, ARC Avenue strikes the perfect balance between urban accessibility and secluded privacy. Seamless arterial access puts Gachibowli, HITEC City, and Shamirpet biotech valleys within straightforward reach.",
      metrics: [
        { label: "ORR Exit 5", val: "6 MINS" },
        { label: "Mahindra University", val: "4 MINS" },
        { label: "Kompally Junction", val: "10 MINS" },
      ],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
      icon: MapPin,
    },
    {
      id: "community",
      title: "Private Studio Community",
      badge: "LOW-DENSITY CULTURE",
      headline: "A deliberate circle of design-conscious homeowners.",
      description:
        "We reject massive thousand-unit complexes where individuals become anonymous numbers. Our developments feature limited collections of residences, ensuring private elevator access, personalized concierge service, and lasting neighborhood pride.",
      metrics: [
        { label: "Density Ratio", val: "Low Unit Count" },
        { label: "Elevators", val: "High-Speed Private" },
        { label: "Clubhouse Space", val: "12,000 SQ.FT" },
      ],
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      icon: HeartHandshake,
    },
    {
      id: "investment",
      title: "Enduring Capital Appreciation",
      badge: "LONG-TERM ASSET",
      headline: "Quality architecture retains premium valuation decade after decade.",
      description:
        "By employing monolithic concrete pouring, durable natural stone facades, and pressure-tested German plumbing lines, ARC Avenue developments avoid the rapid maintenance degradation typical of speculative builders.",
      metrics: [
        { label: "Corridor Growth", val: "High Capital Yield" },
        { label: "Clearances", val: "100% RERA & HMDA" },
        { label: "Structural Warranty", val: "10 Years" },
      ],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      icon: TrendingUp,
    },
  ];

  const current = pillars[activeTab];

  return (
    <section
      ref={sectionRef}
      id="lifestyle"
      className="py-28 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#0A0C0E] text-[#F4F1EA] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header & Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880]">
              LIFESTYLE // HUMAN SCALE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              The Architecture of Living.
            </h2>
            <p className="text-sm sm:text-base text-[#8C8983] font-light">
              Explore how intentional space planning, daylight circulation, and location geometry shape life across our Bahadurpally residences.
            </p>
          </div>

          {/* Interactive Pillars Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {pillars.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeTab === idx
                    ? "bg-[#C5A880] text-[#0A0C0E] font-bold shadow-[0_0_15px_rgba(197,168,128,0.3)]"
                    : "bg-[#14171A] border border-white/10 text-white/60 hover:text-white hover:border-white/30"
                }`}
              >
                {p.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Showcase (Image & Floating Metrics) */}
          <div
            ref={imageRef}
            className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
            data-cursor="view"
          >
            <div
              key={current.id}
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105 animate-fade-in"
              style={{ backgroundImage: `url('${current.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0E]/90 via-transparent to-transparent" />

            {/* Bottom Floating Metrics */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#121519]/80 backdrop-blur-md border border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[10px] font-mono text-[#8C8983] uppercase tracking-wider block">
                      {m.label}
                    </span>
                    <span className="text-sm sm:text-base font-serif font-bold text-white block">
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Narrative Details */}
          <div ref={contentRef} className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#C5A880]">
                <span>{current.badge}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-snug">
                {current.headline}
              </h3>
              <p className="text-xs sm:text-sm text-[#A09D96] font-light leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="pt-2 flex items-center space-x-4">
              <Link
                href="/projects"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#B38F5B] text-[#0A0C0E] text-xs font-bold uppercase tracking-wider transition-all duration-300"
              >
                <span>Explore Developments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/site-visit"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-white/20 hover:border-white text-white text-xs font-semibold tracking-wider transition-all duration-300"
              >
                <span>Book Site Walkthrough</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
