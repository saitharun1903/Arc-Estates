"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Calendar,
  MessageSquareCode,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Layers,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import HeroSection from "@/components/hero-section";
import ArchitectureVision from "@/components/home/architecture-vision";
import LifestyleSection from "@/components/home/lifestyle-section";
import WhyArcBento from "@/components/home/why-arc-bento";
import TestimonialsSection from "@/components/home/testimonials-section";
import ContactChapter from "@/components/home/contact-chapter";
import { ProjectCard, FeaturedProjectCard, SiteVisitCard, ProjectCardData } from "@/components/cards";
import LocationMap from "@/components/location-map";
import AIChatDrawer from "@/components/ai-chat-drawer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HomeClientProps {
  projects: ProjectCardData[];
  settings: {
    companyName: string;
    tagline: string;
    address: string;
    phone: string;
    whatsapp: string;
    googleRating: string;
    googleReviewsCount: string;
    heroHeadline: string;
    heroSubhead: string;
    aboutSnippet: string;
  };
}

export default function HomeClient({ projects, settings }: HomeClientProps) {
  const [aiOpen, setAiOpen] = useState(false);

  // Animation Refs
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const thesisSectionRef = useRef<HTMLElement>(null);
  const thesisLineRef = useRef<HTMLDivElement>(null);
  const thesisQuoteRef = useRef<HTMLQuoteElement>(null);
  const thesisImageRef = useRef<HTMLDivElement>(null);

  const projectsSectionRef = useRef<HTMLElement>(null);
  const projectsLineRef = useRef<HTMLDivElement>(null);
  const projectsHeaderRef = useRef<HTMLDivElement>(null);
  const flagshipCardRef = useRef<HTMLDivElement>(null);
  const secondaryGridRef = useRef<HTMLDivElement>(null);

  const discoverSectionRef = useRef<HTMLElement>(null);
  const discoverHeaderRef = useRef<HTMLDivElement>(null);
  const discoverCardRef = useRef<HTMLDivElement>(null);

  // Conversational Property Finder State
  const [finderType, setFinderType] = useState("ALL");
  const [finderBhk, setFinderBhk] = useState("ALL");
  const [finderStatus, setFinderStatus] = useState("ALL");
  const [animatedCount, setAnimatedCount] = useState(projects.length);

  const filteredProjects = projects.filter((p) => {
    if (finderType !== "ALL" && !p.projectType.toLowerCase().includes(finderType.toLowerCase())) {
      return false;
    }
    if (finderBhk !== "ALL" && !p.bedrooms.includes(finderBhk)) {
      return false;
    }
    if (finderStatus !== "ALL" && p.status !== finderStatus) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    setAnimatedCount(filteredProjects.length);
  }, [filteredProjects.length]);

  // Integrated Scroll Motion Choreography
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // 1. Thesis / Statement Section
      if (thesisSectionRef.current) {
        const thesisTl = gsap.timeline({
          scrollTrigger: {
            trigger: thesisSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power2.out" },
        });

        if (thesisLineRef.current) {
          thesisTl.fromTo(
            thesisLineRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.8 },
            0
          );
        }

        if (thesisQuoteRef.current) {
          thesisTl.fromTo(
            thesisQuoteRef.current,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.9 },
            0.15
          );
        }

        if (thesisImageRef.current) {
          thesisTl.fromTo(
            thesisImageRef.current,
            { opacity: 0, scale: 0.96 },
            { opacity: 1, scale: 1, duration: 0.9 },
            0.25
          );
        }
      }

      // 2. Featured Projects Section
      if (projectsSectionRef.current) {
        const projTl = gsap.timeline({
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power2.out" },
        });

        if (projectsLineRef.current) {
          projTl.fromTo(
            projectsLineRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.8 },
            0
          );
        }

        if (projectsHeaderRef.current) {
          projTl.fromTo(
            projectsHeaderRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.1
          );
        }

        if (flagshipCardRef.current) {
          projTl.fromTo(
            flagshipCardRef.current,
            { opacity: 0, y: 35, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
            0.2
          );
        }

        if (secondaryGridRef.current) {
          projTl.fromTo(
            secondaryGridRef.current.children,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" },
            0.35
          );
        }
      }

      // 3. Property Discovery Section
      if (discoverSectionRef.current) {
        const discTl = gsap.timeline({
          scrollTrigger: {
            trigger: discoverSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power2.out" },
        });

        if (discoverHeaderRef.current) {
          discTl.fromTo(
            discoverHeaderRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            0
          );
        }

        if (discoverCardRef.current) {
          discTl.fromTo(
            discoverCardRef.current,
            { opacity: 0, y: 24, scale: 0.99 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" },
            0.15
          );
        }
      }
    },
    { scope: pageContainerRef }
  );

  const handleOpenVisitModal = (slug = "arc-vista") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-site-visit", {
          detail: { projectSlug: slug },
        })
      );
    }
  };

  // Canonical Project References
  const vista = projects.find((p) => p.slug === "arc-vista") || projects[0];
  const haven = projects.find((p) => p.slug === "arc-haven") || projects[1];
  const terrace = projects.find((p) => p.slug === "arc-terrace") || projects[2];
  const origin = projects.find((p) => p.slug === "arc-origin") || projects[3];

  return (
    <div ref={pageContainerRef} className="space-y-0 bg-[#0C0E10] text-[#F4F1EA]">
      {/* 1. CINEMATIC 3D ARCHITECTURAL OPENING & HERO */}
      <HeroSection
        onOpenAI={() => setAiOpen(true)}
        headline={settings.heroHeadline}
        subhead={settings.heroSubhead}
      />

      {/* 2. THE THESIS / EDITORIAL STATEMENT */}
      <section
        ref={thesisSectionRef}
        className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-background border-b border-border relative overflow-hidden transition-colors duration-300"
      >
        <div ref={thesisLineRef} className="max-w-6xl mx-auto h-[1px] bg-border mb-12 sm:mb-16 origin-left" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              <span>BUILDING PHILOSOPHY // NORTHERN CORRIDOR</span>
            </div>

            <blockquote
              ref={thesisQuoteRef}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.15]"
            >
              “Good spaces don&apos;t ask for attention. <br />
              <span className="italic text-[#C5A880]">They earn it.</span>”
            </blockquote>

            <p className="text-sm sm:text-base md:text-lg text-foreground-secondary max-w-2xl leading-relaxed font-light">
              We build residences and commercial landmarks in Bahadurpally shaped around how people actually live: how natural daylight enters the living suite, how breeze circulates through open breezeways, and how solid engineering outlasts passing trends.
            </p>

            <div className="pt-2 flex items-center space-x-4 text-xs font-mono text-foreground-muted uppercase tracking-wider">
              <span>Bahadurpally Corridor</span>
              <span>•</span>
              <span>Direct Developer Presence</span>
              <span>•</span>
              <span>Zero Intermediary Barriers</span>
            </div>
          </div>

          <div
            ref={thesisImageRef}
            className="lg:col-span-4 relative aspect-[3/4] rounded-2xl overflow-hidden border border-border shadow-2xl group"
            data-cursor="view"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
              alt="ARC Estates Architectural Detail"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 text-[10.5px] font-mono text-foreground-muted uppercase tracking-wider">
              Bahadurpally • Natural Light Axis &amp; Concrete Detail
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DEVELOPMENTS (Asymmetric Showcase) */}
      <section
        id="projects"
        ref={projectsSectionRef}
        className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-background border-b border-border space-y-16 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <div ref={projectsLineRef} className="h-[1px] w-full bg-border origin-left" />
          <div ref={projectsHeaderRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/40">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                <span>PORTFOLIO ARCHIVE // 4 DEVELOPMENTS</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
                Featured Developments
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-foreground-muted max-w-sm font-light leading-relaxed">
              Monolithic shear walls, open-to-sky lightwells, and human-scale density across Hyderabad&apos;s northern corridor.
            </p>
          </div>

          {/* Flagship Presentation Card (01 ARC Vista) */}
          {vista && (
            <div ref={flagshipCardRef}>
              <FeaturedProjectCard
                project={vista}
                index={1}
                structuralGrid="RCC Monolithic Shear Wall (Zone II Seismic)"
                daylightAxis="East-West Solar Orientation · Sunset Balconies"
              />
            </div>
          )}

          {/* Secondary Developments (02 ARC Haven, 03 ARC Terrace, 04 ARC Origin) */}
          <div ref={secondaryGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {haven && <ProjectCard project={haven} index={2} />}
            {terrace && <ProjectCard project={terrace} index={3} />}
            {origin && <ProjectCard project={origin} index={4} />}
          </div>

          <div className="pt-4 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C5A880] hover:text-[#B38F5B] transition-colors group"
            >
              <span>Explore All Developments</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURE SECTION (Designed with Intention) */}
      <ArchitectureVision />

      {/* 5. FLOATING PROPERTY DISCOVERY INTERFACE */}
      <section
        id="discover"
        ref={discoverSectionRef}
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#0E1013] border-t border-b border-white/10 relative"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <div ref={discoverHeaderRef} className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              PROPERTY DISCOVERY // REAL-TIME INVENTORY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Find Your Place in Bahadurpally
            </h2>
            <p className="text-sm text-[#8C8983] max-w-xl mx-auto font-light">
              Select your typology preferences below to immediately discover matching residences across our active developments.
            </p>
          </div>

          <div
            ref={discoverCardRef}
            className="p-8 sm:p-12 rounded-2xl bg-[#14171D] border border-white/10 shadow-2xl space-y-8 backdrop-blur-md"
          >
            <div className="font-serif text-xl sm:text-2xl md:text-3xl text-[#CCC7BC] leading-relaxed">
              <span>“I am exploring </span>
              <span className="relative inline-block mx-1">
                <select
                  value={finderType}
                  onChange={(e) => setFinderType(e.target.value)}
                  className="appearance-none bg-[#1C2027] border-b-2 border-[#C5A880] text-white font-serif font-semibold px-3 py-1 pr-6 rounded focus:outline-none cursor-pointer"
                >
                  <option value="ALL">residential or commercial</option>
                  <option value="High-Rise">a sky residence</option>
                  <option value="Villa">a courtyard villa</option>
                  <option value="Boutique">a boutique terrace</option>
                  <option value="Commercial">commercial space</option>
                </select>
              </span>
              <span> with </span>
              <span className="relative inline-block mx-1">
                <select
                  value={finderBhk}
                  onChange={(e) => setFinderBhk(e.target.value)}
                  className="appearance-none bg-[#1C2027] border-b-2 border-[#C5A880] text-white font-serif font-semibold px-3 py-1 pr-6 rounded focus:outline-none cursor-pointer"
                >
                  <option value="ALL">any configuration</option>
                  <option value="2 BHK">2 bedrooms</option>
                  <option value="3">3 bedrooms</option>
                  <option value="4">4 bedrooms</option>
                  <option value="5 BHK">5 bedrooms</option>
                </select>
              </span>
              <span> that is </span>
              <span className="relative inline-block mx-1">
                <select
                  value={finderStatus}
                  onChange={(e) => setFinderStatus(e.target.value)}
                  className="appearance-none bg-[#1C2027] border-b-2 border-[#C5A880] text-white font-serif font-semibold px-3 py-1 pr-6 rounded focus:outline-none cursor-pointer"
                >
                  <option value="ALL">available now or under build</option>
                  <option value="Ready to Move">ready for possession</option>
                  <option value="Ongoing">under active construction</option>
                  <option value="Upcoming">an upcoming launch</option>
                </select>
              </span>
              <span>.”</span>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#8C8983]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  Found{" "}
                  <strong className="text-[#C5A880] font-bold text-sm">
                    {animatedCount}
                  </strong>{" "}
                  matching developments
                </span>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                {(finderType !== "ALL" || finderBhk !== "ALL" || finderStatus !== "ALL") && (
                  <button
                    onClick={() => {
                      setFinderType("ALL");
                      setFinderBhk("ALL");
                      setFinderStatus("ALL");
                    }}
                    className="text-xs text-[#8C8983] hover:text-white underline font-mono"
                  >
                    Reset Filter
                  </button>
                )}
                <Link
                  href="/properties"
                  className="block px-6 py-3 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0A0C0E] text-xs font-mono uppercase tracking-wider font-bold rounded-full transition-colors text-center shadow-lg"
                  data-cursor="explore"
                >
                  Browse Floor Plans →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LIFESTYLE SECTION (The Architecture of Living) */}
      <LifestyleSection />

      {/* 7. WHY ARC ESTATES (Interactive Bento Composition) */}
      <WhyArcBento />

      {/* 8. TESTIMONIALS SECTION (Resident Voices) */}
      <TestimonialsSection />

      {/* 9. DIGITAL ADVISORY & SITE VISIT SECTION */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#0A0C0E] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Card A: Gemini AI Concierge */}
          <div
            id="concierge"
            className="p-8 sm:p-12 rounded-2xl bg-[#121519] border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#C5A880]/50 transition-all duration-300 shadow-xl"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIGITAL ADVISORY // GROUNDED IN REAL DATA</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                ARC AI Property Concierge
              </h3>
              <p className="text-xs sm:text-sm text-[#8C8983] leading-relaxed font-light">
                Consult our verified AI assistant regarding real-time unit pricing, floor plate specifications, construction milestones, and statutory clearances across our Bahadurpally portfolio.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setAiOpen(true)}
                className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#181C22] hover:bg-[#20252D] border border-white/15 hover:border-[#C5A880] text-xs font-mono uppercase tracking-[0.18em] text-white rounded-full transition-all duration-300 shadow-sm"
              >
                <span>Consult AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
              </button>
            </div>
          </div>

          {/* Card B: Personal On-Site Walkthrough */}
          <div id="visit" className="flex">
            <SiteVisitCard onOpenModal={() => handleOpenVisitModal("arc-vista")} />
          </div>
        </div>
      </section>

      {/* 10. CLOSING CHAPTER: CONTACT & HEADQUARTERS */}
      <ContactChapter settings={settings} />

      {/* 11. MAP & LOCATION SECTION */}
      <LocationMap
        address={settings.address}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />

      {/* Standalone AI Concierge Drawer */}
      <AIChatDrawer isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
