import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Home } from "lucide-react";

export const metadata = {
  title: "404 — Project Not Found | ARC AVENUE",
  description: "The requested architectural specification or project could not be found in our active registry.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0C0E10] dark:bg-[#0C0E10] light:bg-[#F8F6F0] text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] transition-colors duration-300">
      <div className="max-w-2xl w-full text-center space-y-8 py-16">
        {/* Monogram Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#C5A880]/30 dark:border-[#C5A880]/30 light:border-[#C5A880]/50 bg-[#121519] dark:bg-[#121519] light:bg-[#EFECE5] shadow-xl">
          <span className="font-serif text-2xl font-light text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
            A
          </span>
        </div>

        {/* Eyebrow */}
        <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.25em] uppercase text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
          <span>404</span>
          <span>//</span>
          <span>RECORD NOT FOUND</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
          Project Not Found
        </h1>

        {/* Editorial Subtext */}
        <p className="text-base sm:text-lg text-[#A29E95] dark:text-[#A29E95] light:text-[#585B62] max-w-lg mx-auto leading-relaxed">
          The architectural specification, property record, or page you requested does not exist in our active registry or has been archived.
        </p>

        {/* Navigation Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-sm text-xs font-mono uppercase tracking-[0.2em] font-medium bg-[#C5A880] text-[#0C0E10] hover:bg-[#D4BC96] transition-colors duration-200 shadow-lg"
          >
            <Compass className="w-4 h-4" />
            <span>BACK TO PROJECTS</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-sm text-xs font-mono uppercase tracking-[0.2em] font-medium border border-[#262A30] dark:border-[#262A30] light:border-[#D8D4CC] bg-[#101317] dark:bg-[#101317] light:bg-[#FFFFFF] text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] hover:border-[#C5A880]/50 transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            <span>RETURN HOME</span>
          </Link>
        </div>

        {/* Registered Office Reference */}
        <div className="pt-12 border-t border-[#1C1F24] dark:border-[#1C1F24] light:border-[#E5E0D8]">
          <p className="text-xs font-mono text-[#78756E] dark:text-[#78756E] light:text-[#7A7D85]">
            ARC AVENUE // BAHADURPALLY CORRIDOR, HYDERABAD • TELEPHONE: 080085 32333
          </p>
        </div>
      </div>
    </div>
  );
}
