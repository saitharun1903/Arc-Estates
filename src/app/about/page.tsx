import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Ruler, ArrowRight, MapPin, Building } from "lucide-react";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Architectural Philosophy & About | ARC AVENUE Hyderabad",
  description:
    "Learn about ARC Avenue's vision, design principles, and commitment to architectural integrity in Bahadurpally, Hyderabad.",
};

export default async function AboutPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-[#0C0E10] text-[#F4F1EA]">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880]">
            <span>FOUNDATIONAL VISION</span>
            <span>//</span>
            <span>ESTABLISHED IN HYDERABAD</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Architectural Precision. <br />
            Structural Longevity.
          </h1>
          <p className="text-sm sm:text-base text-[#8C8983] leading-relaxed font-light">
            ARC Avenue was founded on a singular conviction: that real estate in Hyderabad deserved
            a studio culture—where architectural aesthetics and civil engineering work in total
            unison rather than commercial compromise.
          </p>
        </div>

        {/* Core Narrative / Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-snug">
              Creating Spaces People Truly Desire to Live In
            </h2>
            <p className="text-sm sm:text-base text-[#CCC7BC] leading-relaxed font-light">
              Too often, modern housing prioritizes unit packing over human living comfort. We design
              from the inside out: beginning with how sunrise daylight enters a master suite, how
              natural breeze circulates through central living corridors, and how quiet balconies
              preserve private views.
            </p>
            <p className="text-sm sm:text-base text-[#CCC7BC] leading-relaxed font-light">
              Headquartered on Doolapally Road in Bahadurpally, our proximity to our active
              developments ensures direct, daily supervisory presence by our leadership team.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <Link
                href="/projects"
                className="px-6 py-3 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                Explore Portfolio
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-white/20 hover:border-white text-xs font-semibold text-white rounded transition-colors"
              >
                Connect With Us
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E10] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0E1013]/90 backdrop-blur-md border border-white/10 text-xs">
              <span className="font-serif font-bold text-white block">Corporate Presence</span>
              <span className="text-[11px] text-[#8C8983]">
                HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <section className="space-y-8 border-t border-white/10 pt-16">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880]">
              GUIDING PRINCIPLES
            </div>
            <h3 className="font-serif text-3xl font-bold text-white">How We Build</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-xl bg-[#121519] border border-white/10 space-y-4">
              <Compass className="w-6 h-6 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-lg text-white">Spatial Truth</h4>
              <p className="text-xs text-[#8C8983] leading-relaxed">
                We design usable, rectilinear spaces without awkward column intrusions. What you see
                in our architectural blueprints is exactly what is delivered on site.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-[#121519] border border-white/10 space-y-4">
              <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-lg text-white">Uncompromised Materials</h4>
              <p className="text-xs text-[#8C8983] leading-relaxed">
                From high-ductility Fe-550D rebar to certified low-VOC interior coats, every raw
                material must pass strict batch quality checks before deployment.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-[#121519] border border-white/10 space-y-4">
              <Ruler className="w-6 h-6 text-[#C5A880]" />
              <h4 className="font-serif font-bold text-lg text-white">Direct Accountability</h4>
              <p className="text-xs text-[#8C8983] leading-relaxed">
                No bureaucratic layers. Registered buyers have direct communication channels with our
                project managers and chief engineers throughout the construction cycle.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
