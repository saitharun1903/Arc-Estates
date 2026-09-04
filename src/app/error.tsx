"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, Compass } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception for debugging
    console.error("Application render error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-24 bg-[#0C0E10] text-[#F4F1EA]">
      <div className="max-w-lg w-full text-center space-y-8 p-10 rounded-2xl border border-white/10 bg-[#121519]/80 backdrop-blur-xl shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C5A880]">
            EXPERIENCE INTERRUPTED
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Architectural Continuity Restoring
          </h1>
          <p className="text-xs sm:text-sm text-[#8C8983] leading-relaxed max-w-md mx-auto">
            Our architectural portal encountered an unexpected state. We are preserving your session while our systems reconcile.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-[#555] pt-1">
              Reference: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] text-xs font-bold uppercase tracking-wider transition-all duration-300"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload View</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded border border-white/20 hover:border-white text-white text-xs font-semibold tracking-wider transition-all duration-300"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
