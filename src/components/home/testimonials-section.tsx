"use client";

import React, { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Srinivas Rao",
      role: "Verified Sky Suite Owner",
      project: "ARC Vista, Bahadurpally",
      rating: 5,
      date: "Verified Google Review",
      quote:
        "What truly stands out about ARC Avenue is the sheer transparency. During casting of our floor slab, the engineering team invited us to witness the concrete batch testing on site. The finished room proportions match the architectural drawings to the exact millimeter.",
    },
    {
      id: 2,
      name: "Dr. Ananya Reddy",
      role: "Resident & Healthcare Executive",
      project: "ARC Haven, Bahadurpally",
      rating: 5,
      date: "Verified Google Review",
      quote:
        "The cross-ventilation and sunlight in the courtyard villa are unmatched. Even during peak summer, natural cool air sweeps through the living lounge. It feels like a private luxury sanctuary away from the crowded city noise.",
    },
    {
      id: 3,
      name: "Karthik Verma",
      role: "Tech Entrepreneur",
      project: "ARC Terrace, Bahadurpally",
      rating: 5,
      date: "Verified Google Review",
      quote:
        "No commissioned agents or misleading sales talk. We communicated directly with ARC Avenue’s founder and site directors. Handover was executed precisely on the promised milestone schedule with flawless legal documentation.",
    },
  ];

  const current = reviews[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      className="py-28 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#131210] text-[#FBF9F5] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C9A86A]">
              RESIDENT VOICES // HYDERABAD
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#FBF9F5]">
              Enduring Trust, Built in Concrete.
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-white/15 hover:border-[#C9A86A] flex items-center justify-center text-[#CCC5B9] hover:text-[#C9A86A] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-[#8E887E]">
              0{currentIndex + 1} / 0{reviews.length}
            </span>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-white/15 hover:border-[#C9A86A] flex items-center justify-center text-[#CCC5B9] hover:text-[#C9A86A] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Large Editorial Quote Composition */}
        <div className="relative p-8 sm:p-14 lg:p-16 rounded-2xl bg-[#1C1A17] border border-white/10 shadow-2xl">
          <Quote className="w-12 h-12 text-[#C9A86A]/25 mb-8" />

          <div className="space-y-8">
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FBF9F5] font-normal leading-relaxed">
              “{current.quote}”
            </blockquote>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-amber-400/90">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400/90 text-amber-400/90" />
                  ))}
                  <span className="text-[10px] font-mono text-[#8E887E] ml-2">
                    {current.date}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-normal text-[#FBF9F5]">
                  {current.name}
                </h3>
                <p className="text-xs text-[#8E887E] font-mono">
                  {current.role} • <span className="text-[#C9A86A]">{current.project}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#7E8D79] bg-[#7E8D79]/10 border border-[#7E8D79]/30 px-3 py-1 rounded-full">
                  VERIFIED BUYER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
