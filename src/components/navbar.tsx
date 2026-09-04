"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Calendar, ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

interface NavbarProps {
  companyPhone?: string;
  onOpenAI?: () => void;
}

export default function Navbar({
  companyPhone = "080085 32333",
  onOpenAI,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll detection for seamless hero-to-scrolled transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open, restore cleanly on close
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.style.overflow = originalOverflow;
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Projects", href: "/projects", number: "01", sub: "Developments" },
    { name: "Properties", href: "/properties", number: "02", sub: "Residences" },
    { name: "Craftsmanship", href: "/craftsmanship", number: "03", sub: "Engineering" },
    { name: "About", href: "/about", number: "04", sub: "Studio & Ethos" },
    { name: "Contact", href: "/contact", number: "05", sub: "Site Desk" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out animate-nav-fade-in ${
          scrolled
            ? "bg-[#0A0C0E]/95 backdrop-blur-md border-b border-white/[0.08] py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-[#0A0C0E]/85 via-[#0A0C0E]/40 to-transparent border-b border-white/[0.03] py-3.5 sm:py-4.5 xl:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 xl:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">
            {/* ARC AVENUE Brand Hierarchy */}
            <Link
              href="/"
              className="group flex items-center space-x-2 sm:space-x-3 select-none shrink-0"
              aria-label="ARC Avenue Homepage"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded border border-[#C5A880]/50 light:border-[#9E7D4C]/60 flex items-center justify-center bg-[#14171A] light:bg-[#FAF8F5] group-hover:border-[#C5A880] transition-colors duration-300 shadow-inner shrink-0">
                <span className="font-serif font-semibold text-sm sm:text-base text-[#C5A880] light:text-[#9E7D4C] select-none">
                  A
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-base sm:text-xl xl:text-2xl font-medium tracking-[0.16em] sm:tracking-[0.2em] text-[#F4F1EA] light:text-[#181A1D] group-hover:text-white light:group-hover:text-[#0C0E10] transition-colors duration-300 whitespace-nowrap leading-none">
                  ARC AVENUE
                </span>
                <span className="hidden sm:block text-[8px] sm:text-[9px] uppercase tracking-[0.24em] text-[#8C8983] light:text-[#6B6862] group-hover:text-[#C5A880]/90 light:group-hover:text-[#9E7D4C] transition-colors duration-300 font-mono whitespace-nowrap mt-1 leading-none">
                  Bahadurpally • Hyderabad
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Centered, Architectural Underline) */}
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-7 2xl:gap-8">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`group relative py-1.5 px-0.5 text-[10.5px] xl:text-xs font-mono uppercase tracking-[0.14em] xl:tracking-[0.18em] transition-all duration-300 whitespace-nowrap shrink-0 ${
                      active
                        ? "text-[#F4F1EA] light:text-[#181A1D] font-medium"
                        : "text-[#B8B4AA] light:text-[#4A4740] hover:text-white light:hover:text-[#181A1D]"
                    }`}
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                      {link.name}
                    </span>

                    {/* Architectural measurement line expanding outward from center */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-[#C5A880] light:bg-[#9E7D4C] transition-all duration-300 ease-out pointer-events-none ${
                        active
                          ? "w-full opacity-100 shadow-[0_0_8px_rgba(197,168,128,0.5)]"
                          : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 shrink-0">
              <ThemeToggle variant="navbar" />

              {onOpenAI && (
                <button
                  type="button"
                  onClick={onOpenAI}
                  className="h-8.5 xl:h-9 inline-flex items-center space-x-1.5 xl:space-x-2 px-3 xl:px-3.5 rounded-full border border-white/10 light:border-black/15 hover:border-[#C5A880]/60 bg-[#121519]/80 light:bg-[#EFECE5] hover:bg-[#181C22] light:hover:bg-[#E5E1D8] text-[#CCC7BC] light:text-[#181A1D] hover:text-white light:hover:text-[#181A1D] transition-all duration-300 shadow-sm hover:shadow-[0_0_16px_rgba(197,168,128,0.18)] group shrink-0 whitespace-nowrap select-none cursor-pointer"
                  aria-label="Open AI Property Concierge"
                >
                  <span className="relative flex h-2 w-2 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[9.5px] xl:text-[10.5px] tracking-[0.14em] uppercase text-[#CCC7BC] light:text-[#181A1D] group-hover:text-[#F4F1EA] light:group-hover:text-[#181A1D] transition-colors">
                    AI Concierge
                  </span>
                </button>
              )}

              <Link
                href="/site-visit"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("open-site-visit", {
                        detail: { projectSlug: "arc-vista" },
                      })
                    );
                  }
                }}
                className="h-8.5 xl:h-9 inline-flex items-center space-x-1.5 xl:space-x-2 px-3.5 xl:px-5 bg-[#C5A880] hover:bg-[#D4B992] light:bg-[#9E7D4C] light:hover:bg-[#88693B] text-[#0C0E10] light:text-white text-[10.5px] xl:text-xs font-mono uppercase tracking-[0.14em] xl:tracking-[0.15em] font-semibold rounded-[3px] transition-all duration-300 shadow-md hover:shadow-[0_4px_18px_rgba(197,168,128,0.3)] hover:-translate-y-0.5 group shrink-0 whitespace-nowrap select-none"
              >
                <Calendar className="w-3.5 h-3.5 text-[#0C0E10] light:text-white transition-transform duration-300 group-hover:scale-110" />
                <span>Book Visit</span>
                <ArrowUpRight className="w-3 h-3 text-[#0C0E10]/70 light:text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Mobile / Tablet Actions (< 1024px) */}
            <div className="flex lg:hidden items-center space-x-1.5 sm:space-x-2.5 shrink-0">
              {onOpenAI && (
                <button
                  type="button"
                  onClick={onOpenAI}
                  className="h-8 px-2.5 rounded-full border border-white/10 light:border-black/15 hover:border-[#C5A880]/50 bg-[#14171A] light:bg-[#EFECE5] text-[#C5A880] light:text-[#9E7D4C] flex items-center space-x-1.5 transition-colors shrink-0"
                  aria-label="Open AI Concierge"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[9.5px] tracking-wider uppercase text-[#CCC7BC] light:text-[#181A1D]">
                    AI
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="h-8 px-2.5 sm:px-3 rounded border border-white/10 light:border-black/15 hover:border-[#C5A880]/50 bg-[#14171A] light:bg-[#EFECE5] text-[#F4F1EA] light:text-[#181A1D] flex items-center space-x-1.5 font-mono text-[10.5px] uppercase tracking-wider transition-colors shrink-0"
                aria-label="Open Navigation Menu"
                id="mobile-nav-toggle"
              >
                <Menu className="w-3.5 h-3.5 text-[#C5A880] light:text-[#9E7D4C]" />
                <span>MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Editorial Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-editorial-overlay"
          className="fixed inset-0 z-[60] bg-[#0A0C0E] text-[#F4F1EA] flex flex-col justify-between overflow-y-auto overflow-x-hidden animate-overlay-in"
          style={{ overscrollBehavior: "contain" }}
        >
          {/* Subtle architectural blueprint background */}
          <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

          {/* Top Bar with Brand & Close Button */}
          <div className="relative z-10 px-5 sm:px-8 py-5 border-b border-white/[0.08] flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2.5"
            >
              <div className="w-7 h-7 rounded border border-[#C5A880]/60 flex items-center justify-center bg-[#14171A]">
                <span className="font-serif font-semibold text-sm text-[#C5A880]">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-medium tracking-[0.18em] text-[#F4F1EA]">
                  ARC AVENUE
                </span>
                <span className="text-[7.5px] uppercase tracking-[0.2em] text-[#8C8983] font-mono">
                  Bahadurpally • Hyderabad
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="h-9 px-3 rounded border border-white/15 hover:border-[#C5A880] bg-[#14171A] text-xs font-mono uppercase tracking-widest flex items-center space-x-1.5 text-[#CCC7BC] hover:text-white transition-colors"
              aria-label="Close navigation overlay"
              id="mobile-nav-close"
            >
              <X className="w-4 h-4 text-[#C5A880]" />
              <span>CLOSE</span>
            </button>
          </div>

          {/* Editorial Navigation Body */}
          <div className="relative z-10 px-5 sm:px-8 py-8 flex-1 flex flex-col justify-center max-w-xl mx-auto w-full space-y-4 sm:space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A880] mb-2">
              NAVIGATION // RESIDENTIAL & COMMERCIAL
            </div>

            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-between py-2 sm:py-3 border-b border-white/[0.06] transition-all"
                >
                  <div className="flex items-baseline space-x-4">
                    <span className="font-mono text-xs text-[#C5A880] tracking-widest">
                      {link.number}
                    </span>
                    <div className="flex flex-col">
                      <span
                        className={`font-serif text-2xl sm:text-3xl tracking-wide transition-colors ${
                          active
                            ? "text-[#C5A880] font-semibold"
                            : "text-[#F4F1EA] group-hover:text-[#C5A880]"
                        }`}
                      >
                        {link.name}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#8C8983]">
                        {link.sub}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                      active ? "text-[#C5A880]" : "text-[#8C8983] group-hover:text-[#C5A880]"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Overlay Bottom Actions & Direct Contact */}
          <div className="relative z-10 px-5 sm:px-8 py-6 border-t border-white/[0.08] bg-[#0E1013]/90 space-y-4 max-w-xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {onOpenAI && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAI();
                  }}
                  className="w-full py-3 px-4 rounded border border-white/10 hover:border-[#C5A880]/60 bg-[#14171A] text-[#CCC7BC] hover:text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span>AI Property Concierge</span>
                </button>
              )}

              <Link
                href="/site-visit"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("open-site-visit", {
                        detail: { projectSlug: "arc-vista" },
                      })
                    );
                  }
                }}
                className="w-full py-3 px-4 rounded bg-[#C5A880] hover:bg-[#D4B992] text-[#0C0E10] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Site Visit</span>
              </Link>
            </div>

            {/* Mobile Theme Switcher */}
            <ThemeToggle variant="mobile" />

            {/* Direct Telephone & Office address */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] font-mono text-[#8C8983]">
              <a
                href={`tel:${companyPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center space-x-1.5 hover:text-[#C5A880] transition-colors"
              >
                <Phone className="w-3 h-3 text-[#C5A880]" />
                <span>Site Desk: {companyPhone}</span>
              </a>
              <span className="text-[10px] tracking-wider text-[#6B6964]">
                Site Office: Bahadurpally, Hyderabad
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}