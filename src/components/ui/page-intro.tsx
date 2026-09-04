"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

type IntroState = "entering" | "animating" | "revealing" | "complete";

interface PageIntroProps {
  onComplete?: () => void;
}

export default function PageIntro({ onComplete }: PageIntroProps) {
  const pathname = usePathname();

  // If not on homepage, do not render intro at all
  if (pathname !== "/") {
    return null;
  }

  return <PageIntroInner onComplete={onComplete} />;
}

function PageIntroInner({ onComplete }: PageIntroProps) {
  const [introState, setIntroState] = useState<IntroState>("entering");
  const containerRef = useRef<HTMLDivElement>(null);
  const brandBoxRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const completedRef = useRef(false);

  // Safe completion routine - guaranteed to run cleanly and only once
  const completeIntro = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    try {
      sessionStorage.setItem("arc_intro_viewed", "true");
    } catch {
      // Ignore private browsing sessionStorage exceptions
    }

    // Inform hero and any other components that intro has finished
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("arc-intro-reveal"));
      window.dispatchEvent(new CustomEvent("arc-intro-complete"));
      document.body.style.overflow = "";
    }

    if (onComplete) onComplete();

    // Kill any active GSAP timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    // Force hide container via direct style to guarantee zero visual or interaction blockage
    if (containerRef.current) {
      containerRef.current.style.display = "none";
      containerRef.current.style.pointerEvents = "none";
    }

    setIntroState("complete");
  }, [onComplete]);

  // Initial check on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    let alreadyViewed = false;
    try {
      alreadyViewed = sessionStorage.getItem("arc_intro_viewed") === "true";
    } catch {
      alreadyViewed = false;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skipParam = window.location.search.includes("skip_intro=true");

    // If already viewed or user prefers reduced motion, complete immediately with zero delay
    if (alreadyViewed || prefersReducedMotion || skipParam) {
      completeIntro();
      return;
    }

    setIntroState("animating");

    // FAILSAFE: Hard timeout at 1200ms guarantees the homepage is ALWAYS reachable
    const failsafeTimer = setTimeout(() => {
      completeIntro();
    }, 1200);

    // INSTANT DISMISSAL: User click, touch, or keydown immediately dismisses the intro cleanly
    const handleUserDismiss = () => {
      completeIntro();
    };

    // TAB SWITCH: If user switches tabs, complete immediately so they never return to a frozen frame
    const handleVisibilityChange = () => {
      if (document.hidden) {
        completeIntro();
      }
    };

    window.addEventListener("click", handleUserDismiss, { once: true, passive: true });
    window.addEventListener("keydown", handleUserDismiss, { once: true, passive: true });
    window.addEventListener("touchstart", handleUserDismiss, { once: true, passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(failsafeTimer);
      window.removeEventListener("click", handleUserDismiss);
      window.removeEventListener("keydown", handleUserDismiss);
      window.removeEventListener("touchstart", handleUserDismiss);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [completeIntro]);

  // Animation Sequence (Total ~ 1.25s)
  useEffect(() => {
    if (introState !== "animating" || !containerRef.current || completedRef.current) return;

    const container = containerRef.current;
    const brandBox = brandBoxRef.current;
    const monogram = monogramRef.current;
    const title = titleRef.current;
    const line = lineRef.current;
    const location = locationRef.current;
    const tagline = taglineRef.current;

    // Initial state
    gsap.set(brandBox, { opacity: 0, y: 10 });
    gsap.set(monogram, { opacity: 0, scale: 0.94 });
    gsap.set(title, { opacity: 0, y: 8 });
    gsap.set(line, { scaleX: 0, transformOrigin: "center center" });
    gsap.set(location, { opacity: 0, y: 5 });
    gsap.set(tagline, { opacity: 0, y: 5 });

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroState("revealing");

        // Notify Hero component to begin coordinated reveal
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("arc-intro-reveal"));
        }

        // Smooth fade-out of the intro curtain (0.28s)
        gsap.to(container, {
          opacity: 0,
          duration: 0.28,
          ease: "power2.inOut",
          onComplete: () => {
            completeIntro();
          },
        });
      },
    });

    timelineRef.current = tl;

    // Timeline steps (Total duration ~ 0.8s before curtain fade):
    tl.to([brandBox, monogram], {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    })
      .to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(
        line,
        {
          scaleX: 1,
          duration: 0.28,
          ease: "expo.out",
        },
        "-=0.15"
      )
      .to(
        [location, tagline],
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.22,
          ease: "power2.out",
        },
        "-=0.18"
      )
      // Brief pause for brand registration
      .to({}, { duration: 0.15 })
      // Brand lifts and begins curtain reveal
      .to(brandBox, {
        y: -12,
        opacity: 0,
        duration: 0.20,
        ease: "power2.in",
      });

    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [introState, completeIntro]);

  if (introState === "complete") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0C0E] transition-opacity select-none ${
        introState === "revealing" ? "pointer-events-none" : ""
      }`}
      style={{
        width: "100vw",
        height: "100dvh",
        maxHeight: "100dvh",
      }}
      aria-hidden={introState === "revealing"}
    >
      {/* Subtle architectural blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-15 pointer-events-none" />

      {/* Centered Brand Presentation */}
      <div
        ref={brandBoxRef}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg w-full space-y-4"
      >
        {/* Monogram A */}
        <div
          ref={monogramRef}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded border border-[#C5A880]/60 flex items-center justify-center bg-[#14171A] shadow-lg shadow-[#C5A880]/10"
        >
          <span className="font-serif font-semibold text-lg sm:text-xl text-[#C5A880]">A</span>
        </div>

        {/* Wordmark */}
        <div className="space-y-1">
          <h1
            ref={titleRef}
            className="font-serif text-3xl sm:text-5xl font-normal tracking-[0.2em] text-[#F4F1EA]"
          >
            ARC AVENUE
          </h1>
          <p
            ref={locationRef}
            className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-[#8C8983]"
          >
            BAHADURPALLY • HYDERABAD
          </p>
        </div>

        {/* Thin Gold Hairline */}
        <div
          ref={lineRef}
          className="h-[1px] w-36 sm:w-52 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent"
        />

        <span
          ref={taglineRef}
          className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880]/80 uppercase"
        >
          BUILT WITH INTENTION
        </span>
      </div>
    </div>
  );
}
