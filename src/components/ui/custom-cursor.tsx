"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "link" | "view" | "explore" | "3d">("default");
  const [isTouch, setIsTouch] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);
  const currentCursorTypeRef = useRef<"default" | "link" | "view" | "explore" | "3d">("default");
  const isVisibleRef = useRef(false);
  const lastTargetRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (hasTouch) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Avoid redundant DOM hierarchy scans if mouse is on the same target
      if (e.target === lastTargetRef.current) return;
      lastTargetRef.current = e.target;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      let newType: "default" | "link" | "view" | "explore" | "3d" = "default";
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr === "view") {
        newType = "view";
      } else if (cursorAttr === "explore") {
        newType = "explore";
      } else if (cursorAttr === "3d") {
        newType = "3d";
      } else if (target.closest("a, button, input, select, textarea, [role='button']")) {
        newType = "link";
      }

      if (newType !== currentCursorTypeRef.current) {
        currentCursorTypeRef.current = newType;
        setCursorType(newType);
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });

    // Smooth trailing ring animation loop (Passive 60fps interpolation)
    const updateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(updateRing);
    };

    animFrameId.current = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (isTouch) return null;

  const isExpanded = cursorType === "view" || cursorType === "explore" || cursorType === "3d";
  const isLink = cursorType === "link";

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,background-color] duration-150 will-change-transform ${
          isExpanded
            ? "w-0 h-0 opacity-0"
            : isLink
            ? "w-2 h-2 bg-[#C5A880]"
            : "w-1.5 h-1.5 bg-[#C5A880]/90"
        }`}
      />

      {/* Fluid Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none transition-[width,height,border-color,background-color] duration-200 will-change-transform ${
          cursorType === "3d"
            ? "w-16 h-16 border border-[#56CCF2]/60 bg-[#061B2E]/40 text-[#56CCF2] shadow-[0_0_15px_rgba(86,204,242,0.2)]"
            : cursorType === "view"
            ? "w-14 h-14 border border-[#C5A880] bg-[#C5A880]/20 text-white"
            : cursorType === "explore"
            ? "w-16 h-16 border border-[#C5A880] bg-[#C5A880]/25 text-[#0A0C0E] font-bold"
            : isLink
            ? "w-10 h-10 border border-[#C5A880]/80 bg-[#C5A880]/10"
            : "w-7 h-7 border border-[#C5A880]/30 bg-transparent"
        }`}
      >
        {cursorType === "3d" && (
          <span className="text-[7.5px] font-mono tracking-widest uppercase font-bold text-center leading-none">
            DRAG
          </span>
        )}
        {cursorType === "view" && (
          <span className="text-[8px] font-mono tracking-wider uppercase font-semibold text-white">
            VIEW
          </span>
        )}
        {cursorType === "explore" && (
          <span className="text-[7.5px] font-mono tracking-widest uppercase text-white font-bold">
            OPEN
          </span>
        )}
      </div>
    </div>
  );
}
