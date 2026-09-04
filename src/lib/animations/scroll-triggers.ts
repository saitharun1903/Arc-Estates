import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered safely on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if the user has requested reduced motion.
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Checks if current viewport is a mobile/small tablet device.
 */
export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

/**
 * Creates an architectural section reveal:
 * - Line divider expands (scaleX 0 -> 1)
 * - Eyebrow appears
 * - Heading rises (y: 24 -> 0)
 * - Content settles (y: 16 -> 0)
 */
export function createSectionReveal(
  section: HTMLElement,
  options: {
    line?: HTMLElement | null;
    eyebrow?: HTMLElement | null;
    heading?: HTMLElement | null;
    content?: HTMLElement | null;
    start?: string;
  } = {}
) {
  if (isReducedMotion()) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: options.start || "top 82%",
      toggleActions: "play none none reverse",
    },
    defaults: { ease: "power2.out" },
  });

  if (options.line) {
    tl.fromTo(
      options.line,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.75 },
      0
    );
  }

  if (options.eyebrow) {
    tl.fromTo(
      options.eyebrow,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.1
    );
  }

  if (options.heading) {
    tl.fromTo(
      options.heading,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.65 },
      0.18
    );
  }

  if (options.content) {
    tl.fromTo(
      options.content,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.3
    );
  }

  return tl;
}

/**
 * Creates a subtle architectural image parallax (5-12% relative movement).
 * Transform-only: translateY.
 */
export function createParallaxEffect(
  imageElement: HTMLElement,
  container: HTMLElement,
  intensity = 8
) {
  if (isReducedMotion() || isMobileViewport()) return null;

  return gsap.fromTo(
    imageElement,
    { yPercent: -intensity },
    {
      yPercent: intensity,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    }
  );
}

/**
 * Creates an architectural clip-path aperture reveal for key imagery.
 * inset(5% 5% 5% 5%) -> inset(0% 0% 0% 0%) + scale settle (1.06 -> 1.00).
 */
export function createClipReveal(
  imageContainer: HTMLElement,
  options: {
    trigger?: HTMLElement;
    start?: string;
    duration?: number;
    delay?: number;
  } = {}
) {
  if (isReducedMotion()) return null;

  const innerImg = imageContainer.querySelector("img") || imageContainer;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: options.trigger || imageContainer,
      start: options.start || "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  tl.fromTo(
    imageContainer,
    { clipPath: "inset(5% 5% 5% 5%)", opacity: 0.8 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: options.duration || 0.85,
      ease: "power2.out",
      delay: options.delay || 0,
    },
    0
  );

  if (innerImg && innerImg !== imageContainer) {
    tl.fromTo(
      innerImg,
      { scale: 1.06 },
      {
        scale: 1,
        duration: options.duration || 0.95,
        ease: "power2.out",
      },
      0
    );
  }

  return tl;
}

/**
 * Creates staggered entrance animation for a collection of cards or items.
 */
export function createStaggerCards(
  cards: HTMLElement[],
  container: HTMLElement,
  options: {
    start?: string;
    stagger?: number;
    yDistance?: number;
    duration?: number;
  } = {}
) {
  if (isReducedMotion()) return null;

  const yDist = isMobileViewport() ? 16 : (options.yDistance || 28);

  return gsap.fromTo(
    cards,
    { opacity: 0, y: yDist },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.6,
      stagger: options.stagger || 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start: options.start || "top 82%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

export { gsap, ScrollTrigger };
