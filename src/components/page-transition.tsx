"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
      }, 150);

      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Architectural Progress Indicator */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none transition-all duration-300 ease-out ${
          isTransitioning
            ? "opacity-100 scale-x-100 bg-gradient-to-r from-[#C9A86A]/40 via-[#C9A86A] to-[#D8B77D]"
            : "opacity-0 scale-x-0"
        }`}
        style={{ transformOrigin: "left center" }}
      />

      {/* Content wrapper with subtle smooth architectural fade */}
      <div
        className={`transition-all duration-300 ease-out ${
          isTransitioning
            ? "opacity-80 translate-y-1"
            : "opacity-100 translate-y-0"
        }`}
      >
        {displayChildren}
      </div>
    </div>
  );
}
