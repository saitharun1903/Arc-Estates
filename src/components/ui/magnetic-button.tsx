"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // 0.1 to 0.35
  maxDistance?: number; // max pixels e.g. 8
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.22,
  maxDistance = 8,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distRelX = (e.clientX - centerX) * strength;
      const distRelY = (e.clientY - centerY) * strength;

      // Clamp to max distance
      const clampX = Math.max(-maxDistance, Math.min(maxDistance, distRelX));
      const clampY = Math.max(-maxDistance, Math.min(maxDistance, distRelY));

      gsap.to(el, {
        x: clampX,
        y: clampY,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Subtle parallax on inner content
      gsap.to(inner, {
        x: clampX * 0.5,
        y: clampY * 0.5,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeave = () => {
      gsap.to([el, inner], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength, maxDistance]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`inline-block will-change-transform ${className}`}
    >
      <div ref={innerRef} className="will-change-transform h-full w-full">
        {children}
      </div>
    </div>
  );
}
