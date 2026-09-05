"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FooterProps {
  settings?: {
    companyName?: string;
    tagline?: string;
    address?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    googleRating?: string;
    googleReviewsCount?: string;
  };
}

export default function Footer({ settings }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || !footerRef.current) return;

      if (topLineRef.current) {
        gsap.fromTo(
          topLineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              once: true,
            },
          }
        );
      }

      if (colsRef.current) {
        gsap.from(colsRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            once: true,
          },
        });
      }
    },
    { scope: footerRef }
  );

  const companyName = settings?.companyName || "ARC ESTATES";
  const tagline = settings?.tagline || "Real Estate Builders & Construction Company";
  const address =
    settings?.address ||
    "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043";
  const phone = settings?.phone || "080085 32333";
  const whatsapp = settings?.whatsapp || "+918008532333";
  const email = settings?.email || "connect@arcavenue.in";

  return (
    <footer ref={footerRef} className="bg-footer border-t border-border text-foreground-secondary relative overflow-hidden transition-colors duration-300">
      <div ref={topLineRef} className="absolute top-0 left-0 right-0 h-[1px] bg-accent/40 origin-left" />
      <div className="absolute inset-0 bg-blueprint-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div ref={colsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-border">
          {/* Col 1: Brand Identity & Contact */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block select-none">
              <span className="font-serif text-3xl font-semibold tracking-wider text-foreground">
                {companyName}
              </span>
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent mt-1 font-mono">
                {tagline}
              </p>
            </Link>

            <p className="text-xs sm:text-sm text-foreground-muted max-w-md leading-relaxed font-light">
              We design and construct enduring residential high-rises and private villa estates in
              Hyderabad’s northern corridor, governed by architectural integrity and uncompromising civil standards.
            </p>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 text-xs font-light">
              <div className="flex items-start space-x-3 text-foreground-secondary">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">{address}</span>
              </div>
              <div className="flex items-center space-x-3 text-foreground-secondary">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-foreground transition-colors font-mono">
                  {phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-foreground-secondary">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-foreground transition-colors font-mono">
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Developments */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-foreground font-semibold">
              Developments
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/projects/arc-vista" className="hover:text-accent transition-colors flex items-center justify-between group">
                  <span className="text-foreground-secondary group-hover:text-accent">ARC Vista</span>
                  <span className="text-[10px] uppercase font-mono text-foreground-muted">Sky Residences</span>
                </Link>
              </li>
              <li>
                <Link href="/projects/arc-haven" className="hover:text-accent transition-colors flex items-center justify-between group">
                  <span className="text-foreground-secondary group-hover:text-accent">ARC Haven</span>
                  <span className="text-[10px] uppercase font-mono text-foreground-muted">Courtyard Villas</span>
                </Link>
              </li>
              <li>
                <Link href="/projects/arc-terrace" className="hover:text-accent transition-colors flex items-center justify-between group">
                  <span className="text-foreground-secondary group-hover:text-accent">ARC Terrace</span>
                  <span className="text-[10px] uppercase font-mono text-foreground-muted">Ready to Move</span>
                </Link>
              </li>
              <li>
                <Link href="/projects/arc-origin" className="hover:text-accent transition-colors flex items-center justify-between group">
                  <span className="text-foreground-secondary group-hover:text-accent">ARC Origin</span>
                  <span className="text-[10px] uppercase font-mono text-foreground-muted">Commercial Hub</span>
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/projects" className="text-accent hover:underline text-xs flex items-center space-x-1 font-mono">
                  <span>View All Projects</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Architectural Practice */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-foreground font-semibold">
              Architecture
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/properties" className="hover:text-accent transition-colors text-foreground-secondary">
                  Property Discovery
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship" className="hover:text-accent transition-colors text-foreground-secondary">
                  5-Stage Craft
                </Link>
              </li>
              <li>
                <Link href="/site-visit" className="hover:text-accent transition-colors text-foreground-secondary">
                  Book Site Visit
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors text-foreground-secondary">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors text-foreground-secondary">
                  FAQ & Clearances
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Action */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-foreground font-semibold">
              Inquiries
            </h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20ARC%20Avenue,%20I%20am%20inquiring%20about%20your%20developments.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 px-3 bg-surface hover:bg-surface-elevated border border-border text-xs font-semibold text-foreground rounded transition-colors shadow-sm"
              >
                WhatsApp Advisor
              </a>
              <Link
                href="/site-visit"
                className="block w-full text-center py-2.5 px-3 bg-accent hover:bg-accent-hover text-accent-foreground text-xs font-semibold uppercase tracking-wider rounded-full transition-colors shadow-sm"
              >
                Schedule Visit
              </Link>
              <Link
                href="/admin"
                className="block w-full text-center py-2 px-3 border border-border hover:border-accent text-[10px] font-mono text-foreground-muted hover:text-foreground rounded transition-colors"
              >
                Staff Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Closing Signature Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between text-xs text-foreground-muted space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} ARC ESTATES. Bahadurpally, Hyderabad, Telangana.</p>
          <div className="font-serif italic text-sm tracking-wider text-accent">
            “Built with Intention.”
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/faq" className="hover:text-foreground transition-colors text-[11px]">
              Privacy & Legal
            </Link>
            <Link href="/admin" className="hover:text-foreground transition-colors text-[11px]">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
