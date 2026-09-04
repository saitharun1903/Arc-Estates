import React from "react";
import Link from "next/link";
import { ShieldCheck, Ruler, Layers, CheckCircle2, Wrench, Microscope, HardHat, Calendar, ArrowRight } from "lucide-react";
import ConstructionJourney from "@/components/construction-journey";

export const metadata = {
  title: "Construction & Craftsmanship Rigor | ARC AVENUE Hyderabad",
  description:
    "Discover ARC Avenue's engineering quality standards, structural safety protocols, and transparent 5-stage construction methodology in Bahadurpally.",
};

export default function ConstructionPage() {
  const qaChecks = [
    {
      category: "Structural Integrity",
      checks: [
        "Certified compressive break testing on concrete batches at regular intervals",
        "Strict structural rebar tying and spacing verification before every slab pour",
        "Laser-verified plumb and vertical alignment across all primary column lines",
        "Monolithic joint inspection ensuring smooth, uncompromised structural continuity",
      ],
    },
    {
      category: "Moisture & Weather Protection",
      checks: [
        "Multi-stage waterproofing membranes applied to all subterranean footings",
        "Standing water test on all terrace slabs and wet areas prior to finishing",
        "Protective perimeter drainage detailing around ground-level structures",
        "Weather-sealed exterior facade treatments designed for monsoon durability",
      ],
    },
    {
      category: "Finishing & Services Regimen",
      checks: [
        "Hydrostatic pressure trials on all concealed plumbing lines prior to plastering",
        "Electrical loop insulation and load testing across all internal distribution circuits",
        "Acoustic perimeter checks on all exterior window frames and balcony sliders",
        "Precision surface inspection ensuring true rectilinear planes on walls and joinery",
      ],
    },
  ];

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-[#0C0E10] dark:bg-[#0C0E10] light:bg-[#F8F6F0] text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
            <span>ENGINEERING PHILOSOPHY</span>
            <span>//</span>
            <span>BAHADURPALLY</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
            Construction Craftsmanship
          </h1>
          <p className="text-sm sm:text-base text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] leading-relaxed font-light">
            We treat structural engineering not as a background utility, but as the foundational soul
            of every home. We eliminate cosmetic concealments in favor of verifiable civil rigor.
          </p>
        </div>

        {/* 5-Phase Construction Journey Component */}
        <ConstructionJourney />

        {/* Civil Audit & Verification Section */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 dark:border-white/10 light:border-[#DDD7CC] pb-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] mb-1">
                CIVIL AUDIT REGIMEN
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                Quality Verification Standards
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] max-w-md font-light leading-relaxed">
              Conducted by project engineers and verified at every concrete pour, joint completion, and service installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qaChecks.map((group, idx) => (
              <div
                key={idx}
                className="bg-[#101317] dark:bg-[#101317] light:bg-[#FAF8F5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] rounded-xl p-6 space-y-4 shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 dark:bg-[#C5A880]/15 light:bg-[#9E7D4C]/15 flex items-center justify-center text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
                  <HardHat className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-medium text-lg text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">{group.category}</h3>
                <ul className="space-y-2.5 text-xs text-[#CCC7BC] dark:text-[#CCC7BC] light:text-[#4A4740]">
                  {group.checks.map((chk, i) => (
                    <li key={i} className="flex items-start space-x-2.5 leading-relaxed font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] shrink-0 mt-0.5" />
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Physical Inspection CTA Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#101317] dark:bg-[#101317] light:bg-[#FAF8F5] border border-[#C5A880]/40 dark:border-[#C5A880]/40 light:border-[#9E7D4C]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              Inspect Active Construction On-Site
            </h3>
            <p className="text-xs sm:text-sm text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] font-light leading-relaxed">
              We encourage prospective owners to tour active construction sites in Bahadurpally. See our
              rebar tying, concrete testing, and aluminum formwork in person.
            </p>
          </div>

          <Link
            href="/site-visit"
            className="shrink-0 inline-flex items-center space-x-2 px-7 py-3.5 bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#9E7D4C] hover:bg-[#D4B58C] text-[#0C0E10] text-xs font-mono font-bold uppercase tracking-wider rounded-xl shadow-md transition-all group"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Structural Tour</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
