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
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroSection from "@/components/hero-section";
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

  const craftSectionRef = useRef<HTMLElement>(null);
  const craftHeaderRef = useRef<HTMLDivElement>(null);
  const craftGridRef = useRef<HTMLDivElement>(null);

  const advisorySectionRef = useRef<HTMLElement>(null);
  const advisoryGridRef = useRef<HTMLDivElement>(null);

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

      // 1. Signature Moment #4: Thesis / Building Philosophy Section
      if (thesisSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: thesisSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power2.out" },
        });

        if (thesisLineRef.current) {
          tl.fromTo(
            thesisLineRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.8 },
            0
          );
        }

        if (thesisQuoteRef.current) {
          tl.fromTo(
            thesisQuoteRef.current,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.75 },
            0.15
          );
        }

        if (thesisImageRef.current) {
          tl.fromTo(
            thesisImageRef.current,
            { clipPath: "inset(6% 6% 6% 6%)", opacity: 0.7 },
            { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.9, ease: "power2.out" },
            0.2
          );

          const imgEl = thesisImageRef.current.querySelector("img");
          if (imgEl) {
            tl.fromTo(
              imgEl,
              { scale: 1.08 },
              { scale: 1, duration: 1, ease: "power2.out" },
              0.2
            );

            // Subtle parallax on scroll
            gsap.fromTo(
              imgEl,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: thesisSectionRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              }
            );
          }
        }
      }

      // 2. Signature Moment #2: Featured Developments Section
      if (projectsSectionRef.current) {
        const projTl = gsap.timeline({
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: "top 82%",
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
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.65 },
            0.12
          );
        }

        if (flagshipCardRef.current) {
          projTl.fromTo(
            flagshipCardRef.current,
            { opacity: 0, y: 28, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power2.out" },
            0.25
          );
        }
      }

      // Secondary Projects 3-Card Stagger
      if (secondaryGridRef.current) {
        const cards = secondaryGridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: secondaryGridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Property Discovery Section
      if (discoverSectionRef.current) {
        const discTl = gsap.timeline({
          scrollTrigger: {
            trigger: discoverSectionRef.current,
            start: "top 82%",
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

      // 4. Construction Rigor 4-Card Stagger
      if (craftGridRef.current) {
        if (craftHeaderRef.current) {
          gsap.fromTo(
            craftHeaderRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: craftSectionRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        gsap.fromTo(
          craftGridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.09,
            ease: "power2.out",
            scrollTrigger: {
              trigger: craftGridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 5. Digital Advisory & Site Visit 2-Card Stagger
      if (advisoryGridRef.current) {
        gsap.fromTo(
          advisoryGridRef.current.children,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: advisoryGridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
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
    <div ref={pageContainerRef} className="space-y-0">
      {/* CHAPTER 01: THE OPENING (Hero) */}
      <HeroSection
        onOpenAI={() => setAiOpen(true)}
        headline={settings.heroHeadline}
        subhead={settings.heroSubhead}
      />

      {/* CHAPTER: THE STATEMENT (Editorial Thesis) */}
      <section ref={thesisSectionRef} className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-background border-b border-border relative overflow-hidden transition-colors duration-300">
        <div ref={thesisLineRef} className="max-w-6xl mx-auto h-[1px] bg-border mb-12 sm:mb-16 origin-left" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              <span>BUILDING PHILOSOPHY</span>
            </div>

            <blockquote ref={thesisQuoteRef} className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.15]">
              “Good spaces don’t ask for attention. <br />
              <span className="italic text-accent">They earn it.</span>”
            </blockquote>

            <p className="text-sm sm:text-base md:text-lg text-foreground-secondary max-w-2xl leading-relaxed font-light">
              We build homes and commercial landmarks in Bahadurpally shaped around how people actually live: how natural daylight reaches a living room, how breeze circulates through central corridors, and how solid engineering outlasts passing trends.
            </p>

            <div className="pt-2 flex items-center space-x-4 text-xs font-mono text-foreground-muted uppercase tracking-wider">
              <span>Bahadurpally Corridor</span>
              <span>•</span>
              <span>Direct Developer Presence</span>
            </div>
          </div>

          <div ref={thesisImageRef} className="lg:col-span-4 relative aspect-[3/4] rounded-lg overflow-hidden border border-border shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
              alt="ARC Avenue Architectural Detail"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 text-[10.5px] font-mono text-foreground-muted uppercase tracking-wider">
              Bahadurpally • Natural Light Axis &amp; Concrete Detail
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER: FEATURED DEVELOPMENTS (Asymmetric Architectural Portfolio) */}
      <section id="projects" ref={projectsSectionRef} className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-background border-b border-border space-y-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <div ref={projectsLineRef} className="h-[1px] w-full bg-border origin-left" />
          <div ref={projectsHeaderRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/40">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
                <span>PORTFOLIO ARCHIVE</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-foreground">
                Featured Developments
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-foreground-muted max-w-sm font-light leading-relaxed">
              Monolithic shear walls, open-to-sky lightwells, and human-scale density across Hyderabad&apos;s northern corridor.
            </p>
          </div>

          {/* Asymmetric Showcase: 1. Flagship Presentation Card (01 ARC Vista) */}
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

          {/* Asymmetric Showcase: 2. Secondary Developments in Editorial Cards (02, 03, 04) */}
          <div ref={secondaryGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {haven && (
              <ProjectCard
                project={haven}
                index={2}
              />
            )}
            {terrace && (
              <ProjectCard
                project={terrace}
                index={3}
              />
            )}
            {origin && (
              <ProjectCard
                project={origin}
                index={4}
              />
            )}
          </div>

          {/* Link to Dedicated Projects Archive */}
          <div className="pt-2 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-accent hover:text-accent-hover transition-colors group"
            >
              <span>Explore All Developments</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CHAPTER: PROPERTY DISCOVERY (Conversational Property Selector) */}
      <section id="discover" ref={discoverSectionRef} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-background-secondary border-t border-border relative transition-colors duration-300">
        <div className="max-w-5xl mx-auto space-y-10">
          <div ref={discoverHeaderRef} className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              PROPERTY DISCOVERY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-foreground">
              Find Your Place in Bahadurpally
            </h2>
            <p className="text-sm text-foreground-muted max-w-xl mx-auto font-light">
              Select your preferences below to immediately view matching residential and commercial opportunities.
            </p>
          </div>

          <div ref={discoverCardRef} className="p-8 sm:p-12 rounded-xl bg-card border border-border shadow-lg space-y-8">
            <div className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground-secondary leading-relaxed">
              <span>“I am exploring </span>
              <span className="relative inline-block mx-1">
                <select
                  value={finderType}
                  onChange={(e) => setFinderType(e.target.value)}
                  className="appearance-none bg-surface-elevated border-b border-accent text-foreground font-serif font-semibold px-3 py-1 pr-6 rounded focus:outline-none cursor-pointer"
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
                  className="appearance-none bg-surface-elevated border-b border-accent text-foreground font-serif font-semibold px-3 py-1 pr-6 rounded focus:outline-none cursor-pointer"
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
                  className="appearance-none bg-surface-elevated border-b border-accent text-foreground font-serif font-semibold px-3 py-1 pr-6 rounded focus:outline-none cursor-pointer"
                >
                  <option value="ALL">available now or in progress</option>
                  <option value="Ready to Move">ready for possession</option>
                  <option value="Ongoing">under active construction</option>
                  <option value="Upcoming">an upcoming launch</option>
                </select>
              </span>
              <span>.”</span>
            </div>

            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-foreground-muted">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>
                  Found{" "}
                  <strong className="text-accent font-bold text-sm">
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
                    className="text-xs text-foreground-muted hover:text-foreground underline font-mono"
                  >
                    Reset
                  </button>
                )}
                <Link
                  href="/properties"
                  className="block px-6 py-2.5 bg-accent hover:bg-accent-hover text-accent-foreground text-xs font-mono uppercase tracking-wider font-bold rounded-[3px] transition-colors text-center shadow-md"
                >
                  Browse Floor Plans →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER: CONSTRUCTION RIGOR (How Spaces Are Made) */}
      <section id="craft" ref={craftSectionRef} className="py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-background border-t border-border relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div ref={craftHeaderRef} className="max-w-3xl space-y-3">
            <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.25em] text-accent font-semibold">
              <span>CONSTRUCTION RIGOR</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-foreground">
              How Spaces Are Made
            </h2>
            <p className="text-sm sm:text-base text-foreground-muted font-light leading-relaxed">
              We replace marketing slogans with physical execution. This is how every ARC Avenue development moves from architectural blueprint to completed home.
            </p>
          </div>

          <div ref={craftGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-8 rounded-lg bg-card border border-border space-y-4 flex flex-col justify-between hover:border-accent/50 transition-all duration-300 shadow-sm">
              <div className="space-y-4">
                <span className="font-mono text-3xl font-light text-accent/40">01</span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                  Design &amp; Daylight
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-light">
                  Solar orientation mapping ensures all primary rooms receive natural light without harsh afternoon heat. Cross-ventilation breezeways reduce air conditioning dependency.
                </p>
              </div>
              <div className="pt-4 border-t border-border text-[11px] font-mono text-accent">
                Spatial Clarity
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-lg bg-card border border-border space-y-4 flex flex-col justify-between hover:border-accent/50 transition-all duration-300 shadow-sm">
              <div className="space-y-4">
                <span className="font-mono text-3xl font-light text-accent/40">02</span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                  Structural Build
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-light">
                  High-ductility Fe-550D rebar and calibrated ready-mix concrete. Precision formwork ensures smooth, rectilinear surfaces without column bulges or uneven plaster.
                </p>
              </div>
              <div className="pt-4 border-t border-border text-[11px] font-mono text-accent">
                Certified Materials
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-lg bg-card border border-border space-y-4 flex flex-col justify-between hover:border-accent/50 transition-all duration-300 shadow-sm">
              <div className="space-y-4">
                <span className="font-mono text-3xl font-light text-accent/40">03</span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                  Finish &amp; Services
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-light">
                  Concealed plumbing and electrical conduits pressure-tested before enclosing. Acoustic decoupling between shared walls ensures quiet, private residences.
                </p>
              </div>
              <div className="pt-4 border-t border-border text-[11px] font-mono text-accent">
                Pressure-Tested MEP
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-8 rounded-lg bg-card border border-border space-y-4 flex flex-col justify-between hover:border-accent/50 transition-all duration-300 shadow-sm">
              <div className="space-y-4">
                <span className="font-mono text-3xl font-light text-accent/40">04</span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                  Direct Delivery
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-light">
                  Clear statutory documentation, transparent milestone schedules, and direct developer communication with no intermediary barriers throughout possession.
                </p>
              </div>
              <div className="pt-4 border-t border-border text-[11px] font-mono text-accent">
                Direct Developer Access
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER: THE CONVERSATION & THE VISIT (AI Concierge + On-Site Briefing) */}
      <section ref={advisorySectionRef} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-background border-t border-border relative transition-colors duration-300">
        <div ref={advisoryGridRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Card A: Gemini AI Concierge */}
          <div id="concierge" className="p-8 sm:p-12 rounded-xl bg-card border border-border flex flex-col justify-between space-y-6 hover:border-accent/40 transition-all duration-300 shadow-md">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                <MessageSquareCode className="w-3.5 h-3.5" />
                <span>DIGITAL ADVISORY</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
                ARC AI Property Concierge
              </h3>
              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-light">
                Ask specific questions regarding floor plans, price breakdowns, structural materials, or current progress across our Bahadurpally developments.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setAiOpen(true)}
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-surface-elevated hover:bg-surface-muted border border-border hover:border-accent text-xs font-mono uppercase tracking-[0.18em] text-foreground rounded-[3px] transition-all duration-300 shadow-sm"
              >
                <span>Consult AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </button>
            </div>
          </div>

          {/* Card B: Personal On-Site Walkthrough (Editorial Site Visit Card) */}
          <div id="visit" className="flex">
            <SiteVisitCard onOpenModal={() => handleOpenVisitModal("arc-vista")} />
          </div>
        </div>
      </section>

      {/* CHAPTER: THE CONTACT & MAP */}
      <LocationMap
        address={settings.address}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
      />

      {/* Standalone AI Drawer Trigger */}
      <AIChatDrawer isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}