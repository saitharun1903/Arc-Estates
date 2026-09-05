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

  useEffect(() => {
    // Disable on touch / mobile devices
    if (typeof window === "undefined") return;
    const hasTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (hasTouch) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hovered element for cursor type
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr === "view") {
        setCursorType("view");
      } else if (cursorAttr === "explore") {
        setCursorType("explore");
      } else if (cursorAttr === "3d") {
        setCursorType("3d");
      } else if (target.closest("a, button, input, select, textarea, [role='button']")) {
        setCursorType("link");
      } else {
        setCursorType("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth trailing ring animation loop
    const updateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

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
  }, [isVisible]);

  if (isTouch) return null;

  const isExpanded = cursorType === "view" || cursorType === "explore" || cursorType === "3d";
  const isLink = cursorType === "link";

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,background-color] duration-150 ${
          isExpanded
            ? "w-0 h-0 opacity-0"
            : isLink
            ? "w-2 h-2 bg-[#C5A880]"
            : "w-1.5 h-1.5 bg-[#F4F1EA]"
        }`}
      />

      {/* Smooth Fluid Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 backdrop-blur-[1px] ${
          cursorType === "3d"
            ? "w-16 h-16 bg-[#C5A880]/15 border-[#C5A880]/80 shadow-[0_0_20px_rgba(197,168,128,0.25)]"
            : cursorType === "view"
            ? "w-16 h-16 bg-[#0A0C0E]/80 border-[#C5A880] shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            : cursorType === "explore"
            ? "w-20 h-20 bg-[#C5A880]/90 border-white/20 text-[#0C0E10]"
            : isLink
            ? "w-9 h-9 border-[#C5A880]/60 bg-[#C5A880]/10 scale-110"
            : "w-8 h-8 border-white/30 bg-transparent"
        }`}
      >
        {cursorType === "view" && (
          <span className="text-[9px] font-mono tracking-[0.2em] font-bold text-[#C5A880] uppercase select-none">
            VIEW
          </span>
        )}
        {cursorType === "explore" && (
          <span className="text-[9px] font-mono tracking-[0.2em] font-bold text-[#0C0E10] uppercase select-none">
            EXPLORE
          </span>
        )}
        {cursorType === "3d" && (
          <span className="text-[8px] font-mono tracking-[0.2em] font-bold text-[#C5A880] uppercase select-none">
            ORBIT
          </span>
        )}
      </div>
    </div>
  );
}
