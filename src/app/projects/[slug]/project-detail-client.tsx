"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Maximize2,
  Calendar,
  Building,
  CheckCircle2,
  Download,
  Phone,
  MessageSquare,
  ArrowLeft,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import FloorPlanViewer from "@/components/floor-plan-viewer";
import LocationMap from "@/components/location-map";
import { InfoCard } from "@/components/cards";

interface ProjectDetailClientProps {
  project: {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    location: string;
    status: string;
    projectType: string;
    heroImage: string;
    galleryImages: string[];
    areaRange: string;
    bedrooms: string;
    totalUnits: string;
    priceRange: string;
    completionYear: string;
    constructionProgress: number;
    amenities: string[];
    specifications: Array<{ category: string; items: string[] }>;
    progressMilestones?: Array<{ phase: string; date: string; status: string }>;
    floorPlans: Array<{
      id: string;
      name: string;
      bhk: string;
      areaSqFt: string;
      facing: string;
      imageUrl: string;
      description?: string | null;
      demo?: boolean;
    }>;
    brochures: Array<{
      id: string;
      title: string;
      fileUrl: string;
      fileSize?: string | null;
    }>;
    demo?: boolean;
  };
  settings: {
    phone: string;
    whatsapp: string;
    address: string;
  };
}

// Architectural metadata fallback
const STRUCTURAL_MAP: Record<string, string> = {
  "arc-vista": "RCC Monolithic Shear Wall (Zone II Seismic)",
  "arc-haven": "Isolated RCC Column Footings · Solid Masonry",
  "arc-terrace": "Stepped Cantilevered Slabs · Aerated Blocks",
  "arc-origin": "Post-Tensioned Monolithic Skeleton · DGU Facade",
};

export default function ProjectDetailClient({
  project,
  settings,
}: ProjectDetailClientProps) {
  const [activeNav, setActiveNav] = useState("overview");

  const navSections = [
    { id: "overview", label: "Overview" },
    { id: "plans", label: "CAD Blueprints" },
    { id: "specs", label: "Specifications" },
    { id: "amenities", label: "Amenities" },
    { id: "progress", label: "Construction Progress" },
    { id: "location", label: "Location" },
  ];

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const structuralSystem =
    STRUCTURAL_MAP[project.slug] || "Reinforced Concrete Frame Structure";

  return (
    <div className="bg-[#121315] text-[#FAF8F5] min-h-screen transition-colors duration-300">
      {/* Back Button */}
      <div className="pt-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] hover:text-[#C5A880] dark:hover:text-[#C5A880] light:hover:text-[#A88858] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO MONOGRAPHS</span>
        </Link>
      </div>

      {/* Project Hero Header */}
      <section className="pt-6 pb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-3 text-xs font-mono uppercase tracking-[0.35em] text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]">
              <span>MONOGRAPH</span>
              <span>//</span>
              <span>{project.projectType}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              {project.name}
            </h1>

            <p className="text-base sm:text-lg text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53] font-light max-w-2xl">
              {project.tagline}
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#656056]">
              <MapPin className="w-4 h-4 text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] shrink-0" />
              <span>{project.location}</span>
            </div>
          </div>

          {/* Valuations & Action Console */}
          <div className="bg-[#101317] dark:bg-[#101317] light:bg-[#EFECE5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] rounded-2xl p-6 shrink-0 flex flex-col justify-between space-y-4 sm:min-w-[300px] shadow-xl">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] block">
                Portfolio Valuation
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-medium text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                {project.priceRange}
              </div>
            </div>

            <div className="flex flex-col space-y-2.5 pt-2">
              <Link
                href={`/site-visit?project=${project.id}`}
                className="w-full text-center py-3 px-4 bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#A88858] hover:bg-[#D4B58C] text-[#0C0E10] text-xs font-mono font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Schedule Site Inspection
              </Link>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20ARC%20Avenue,%20I%20am%20inquiring%20about%20${encodeURIComponent(
                  project.name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 px-4 bg-white/5 dark:bg-white/5 light:bg-[#FAF8F5] hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-[#E4DFD5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] text-xs font-mono uppercase tracking-wider rounded-xl transition-colors"
              >
                Direct Concierge Inquiry
              </a>
            </div>
          </div>
        </div>

        {/* Hero Architectural Image Showcase */}
        <div className="relative aspect-[21/9] sm:aspect-[24/10] rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 light:border-[#DDD7CC] shadow-2xl">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${project.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
        </div>
      </section>

      {/* 4-FACT ARCHITECTURAL SUMMARY BAR */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoCard
            index="01"
            title="Typology"
            value={project.projectType}
            detail={project.bedrooms}
          />
          <InfoCard
            index="02"
            title="Residences"
            value={String(project.totalUnits)}
            detail={project.areaRange}
          />
          <InfoCard
            index="03"
            title="Structural System"
            value={structuralSystem}
            detail="Monolithic Grid"
          />
          <InfoCard
            index="04"
            title="Timeline"
            value={String(project.completionYear)}
            detail={`${project.status} (${project.constructionProgress}%)`}
          />
        </div>
      </section>

      {/* Sticky Sub-Navigation Bar */}
      <div className="sticky top-[68px] z-30 bg-[#121315]/90 backdrop-blur-md border-y border-white/10 px-4 sm:px-6 lg:px-12 mt-12">
        <div className="max-w-7xl mx-auto flex items-center space-x-8 overflow-x-auto no-scrollbar py-3 text-xs">
          {navSections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`font-mono uppercase tracking-wider py-1 transition-colors whitespace-nowrap ${
                activeNav === item.id
                  ? "text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] font-semibold border-b-2 border-[#C5A880] dark:border-[#C5A880] light:border-[#A88858]"
                  : "text-[#8C8983] dark:text-[#8C8983] light:text-[#656056] hover:text-[#F4F1EA] dark:hover:text-[#F4F1EA] light:hover:text-[#181A1D]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 space-y-24">
        {/* SECTION: Overview & Architectural Concept */}
        <section id="overview" className="space-y-8 scroll-mt-28">
          <div className="space-y-3 max-w-4xl">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]">
              SPATIAL PHILOSOPHY
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              Architectural Concept &amp; Environmental Synthesis
            </h2>
            <p className="text-base sm:text-lg text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53] leading-relaxed font-light pt-2">
              {project.description}
            </p>
          </div>

          {/* Magazine-Style Multi-Aspect Gallery Grid */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="space-y-4 pt-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#8C8983] dark:text-[#8C8983] light:text-[#656056]">
                PHOTOGRAPHIC STUDY
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {project.galleryImages.map((img, i) => {
                  const spanClass =
                    i === 0
                      ? "md:col-span-8 aspect-[16/10]"
                      : i === 1
                      ? "md:col-span-4 aspect-[4/5]"
                      : "md:col-span-6 aspect-[16/10]";
                  return (
                    <div
                      key={i}
                      className={`relative rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 light:border-[#DDD7CC] group shadow-md ${spanClass}`}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* SECTION: CAD Blueprints & Floor Plans (Occupies 85%+ of canvas) */}
        <section id="plans" className="space-y-8 scroll-mt-28 border-t border-white/10 dark:border-white/10 light:border-[#DDD7CC] pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] mb-1">
                2D VECTOR CAD BLUEPRINTS
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                Architectural Floor Plans
              </h2>
            </div>
            {project.brochures && project.brochures.length > 0 && (
              <a
                href={project.brochures[0].fileUrl}
                download
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#101317] dark:bg-[#101317] light:bg-[#EFECE5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] hover:border-[#C5A880] dark:hover:border-[#C5A880] light:hover:border-[#A88858] text-xs font-mono text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]" />
                <span>Download Architectural Dossier</span>
              </a>
            )}
          </div>

          <FloorPlanViewer floorPlans={project.floorPlans} projectName={project.name} />
        </section>

        {/* SECTION: Grounded Construction Specifications */}
        <section id="specs" className="space-y-8 scroll-mt-28 border-t border-white/10 dark:border-white/10 light:border-[#DDD7CC] pt-16">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]">
              ENGINEERING RIGOR
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              Construction Specifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.specifications.map((spec, i) => (
              <div
                key={i}
                className="bg-[#101317] dark:bg-[#101317] light:bg-[#EFECE5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] rounded-2xl p-6 space-y-4 shadow-sm"
              >
                <h3 className="font-serif font-medium text-lg text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]">
                  {spec.category}
                </h3>
                <ul className="space-y-2.5 text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#5F5B53]">
                  {spec.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 leading-relaxed">
                      <span className="text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Curated Amenities */}
        <section id="amenities" className="space-y-8 scroll-mt-28 border-t border-white/10 dark:border-white/10 light:border-[#DDD7CC] pt-16">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]">
              AMENITIES &amp; ENVIRONMENT
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              Engineered Inclusions
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.amenities.map((amenity, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#101317] dark:bg-[#101317] light:bg-[#EFECE5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] flex items-center space-x-3 text-xs font-mono text-[#DDD8CE] dark:text-[#DDD8CE] light:text-[#181A1D]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Construction Telemetry & Milestones */}
        <section id="progress" className="space-y-8 scroll-mt-28 border-t border-white/10 dark:border-white/10 light:border-[#DDD7CC] pt-16">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858]">
              CONSTRUCTION TELEMETRY
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              Physical Progress ({project.constructionProgress}% Completed)
            </h2>
          </div>

          {/* Progress Bar */}
          <div className="p-6 bg-[#18191C] border border-white/10 rounded-2xl space-y-4 shadow-sm">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#8E887E]">Superstructure &amp; Finishes</span>
              <span className="text-[#C9A86A] font-bold">{project.constructionProgress}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#121315] rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#8C6D3F] to-[#C9A86A] rounded-full transition-all duration-1000"
                style={{ width: `${project.constructionProgress}%` }}
              />
            </div>
          </div>

          {/* Milestone timeline if provided */}
          {project.progressMilestones && project.progressMilestones.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {project.progressMilestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#101317] dark:bg-[#101317] light:bg-[#EFECE5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] space-y-1.5 text-xs font-mono"
                >
                  <div className="text-[#C5A880] dark:text-[#C5A880] light:text-[#A88858] text-[10px] uppercase tracking-wider">{milestone.date}</div>
                  <div className="font-serif text-sm font-medium text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">{milestone.phase}</div>
                  <div className="text-[#8C8983] dark:text-[#8C8983] light:text-[#656056]">{milestone.status}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION: Location */}
        <section id="location" className="space-y-8 scroll-mt-28 border-t border-white/10 dark:border-white/10 light:border-[#DDD7CC] pt-16">
          <LocationMap
            title={`Location & Accessibility — ${project.name}`}
            subtitle={`Situated in ${project.location}. Connect with our advisory desk or get direct navigation to inspect the site in person.`}
            address={project.location}
            phone={settings.phone}
            whatsapp={settings.whatsapp}
          />
        </section>
      </div>
    </div>
  );
}
