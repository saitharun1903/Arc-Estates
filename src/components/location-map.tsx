"use client";

import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Phone,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { officeLocation } from "@/lib/location";

interface LocationMapProps {
  title?: string;
  subtitle?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  className?: string;
}

export default function LocationMap({
  title = "Visit ARC Avenue",
  subtitle = "Our office is located on Doolapally Road, Bahadurpally, Hyderabad. Call us or send a WhatsApp message to plan your visit.",
  address = officeLocation.address,
  phone = officeLocation.phone,
  whatsapp = officeLocation.whatsapp,
  className = "",
}: LocationMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Determine Google Maps URLs
  const isDefaultOffice = address === officeLocation.address;
  const directionsUrl = isDefaultOffice
    ? officeLocation.googleMapsDirectionsUrl
    : officeLocation.getDirectionsUrlForAddress(address);
  const embedUrl = isDefaultOffice
    ? officeLocation.googleMapsEmbedUrl
    : officeLocation.getEmbedUrlForAddress(address);

  const cleanPhone = phone.replace(/\s+/g, "");
  const cleanWhatsApp = whatsapp.replace(/[^0-9]/g, "");

  return (
    <section
      className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#131210] dark:bg-[#131210] light:bg-[#F8F6F1] text-[#FBF9F5] dark:text-[#FBF9F5] light:text-[#1A1815] border-t border-[#2D2B26] dark:border-[#2D2B26] light:border-[#E5E0D8] transition-colors duration-300 ${className}`}
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Section Header with Natural, Honest Copy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2D2B26] dark:border-[#2D2B26] light:border-[#E5E0D8] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.25em] text-[#C9A86A] dark:text-[#C9A86A] light:text-[#A88656] uppercase font-semibold">
              <span>LOCATION &amp; OFFICE</span>
              <span>//</span>
              <span>BAHADURPALLY, HYDERABAD</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FBF9F5] dark:text-[#FBF9F5] light:text-[#1A1815]">
              {title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8E887E] dark:text-[#8E887E] light:text-[#7D776C] max-w-md font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Info, Right Real Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Office Information & Structured Contact Actions */}
          <div className="lg:col-span-5 bg-[#181714] dark:bg-[#181714] light:bg-[#FFFFFF] border border-[#2D2B26] dark:border-[#2D2B26] light:border-[#DDD7CC] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-6">
              {/* Monogram / Header Badge */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#22201C] dark:bg-[#22201C] light:bg-[#F4F1EA] border border-[#C9A86A]/30 dark:border-[#C9A86A]/30 light:border-[#A88656]/50 flex items-center justify-center text-[#C9A86A] dark:text-[#C9A86A] light:text-[#A88656] shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#FBF9F5] dark:text-[#FBF9F5] light:text-[#1A1815]">
                    {officeLocation.name}
                  </h3>
                  <p className="text-xs font-mono text-[#C9A86A] dark:text-[#C9A86A] light:text-[#A88656] mt-0.5">
                    {officeLocation.tagline}
                  </p>
                </div>
              </div>

              {/* Verified Office Address */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#8E887E] dark:text-[#8E887E] light:text-[#7D776C]">
                  Verified Address
                </div>
                <p className="text-sm text-[#CCC5B9] dark:text-[#CCC5B9] light:text-[#4E4942] leading-relaxed font-light">
                  {address}
                </p>
              </div>

              {/* Simple Landmark Reference (Honest, Unembellished) */}
              <div className="p-3.5 rounded-xl bg-[#1C1A17] dark:bg-[#1C1A17] light:bg-[#F8F6F1] border border-[#2D2B26] dark:border-[#2D2B26] light:border-[#E5E0D8] text-xs text-[#8E887E] dark:text-[#8E887E] light:text-[#615E58] space-y-1 font-mono">
                <div className="text-[10px] uppercase tracking-wider text-[#C9A86A] dark:text-[#C9A86A] light:text-[#A88656]">
                  Location Guide
                </div>
                <div className="font-sans text-xs text-[#CCC5B9] dark:text-[#CCC5B9] light:text-[#4E4942]">
                  Beside KNR Apartments on Doolapally Road, Bahadurpally.
                </div>
              </div>
            </div>

            {/* Structured Action Hierarchy: 1. Directions, 2. Call, 3. WhatsApp */}
            <div className="space-y-3 pt-4 border-t border-[#2D2B26] dark:border-[#2D2B26] light:border-[#E5E0D8]">
              {/* Primary Action: Directions */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open ARC Avenue office location in Google Maps for directions"
                className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-4 bg-[#C9A86A] hover:bg-[#D8B77D] dark:bg-[#C9A86A] dark:hover:bg-[#D8B77D] light:bg-[#A88656] light:hover:bg-[#967445] text-[#131210] font-mono text-xs font-semibold uppercase tracking-[0.15em] rounded-full transition-colors duration-200 shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>

              {/* Secondary Actions: Call & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${cleanPhone}`}
                  aria-label="Call ARC Avenue office"
                  className="inline-flex items-center justify-center space-x-2 py-3 px-3 bg-[#22201C] dark:bg-[#22201C] light:bg-[#F4F1EA] hover:bg-[#2A2722] dark:hover:bg-[#2A2722] light:hover:bg-[#ECE8E0] border border-[#2D2B26] dark:border-[#2D2B26] light:border-[#DDD7CC] hover:border-[#C9A86A]/50 text-xs font-mono uppercase tracking-wider text-[#FBF9F5] dark:text-[#FBF9F5] light:text-[#1A1815] rounded-xl transition-colors duration-200"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A86A] dark:text-[#C9A86A] light:text-[#A88656]" />
                  <span>Call Office</span>
                </a>

                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=Hello%20ARC%20Avenue,%20I%20would%20like%20to%20visit%20your%20office%20in%20Bahadurpally.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact ARC Avenue via WhatsApp"
                  className="inline-flex items-center justify-center space-x-2 py-3 px-3 bg-[#7E8D79]/15 hover:bg-[#7E8D79]/25 border border-[#7E8D79]/30 hover:border-[#7E8D79]/60 text-[#99A894] dark:text-[#99A894] light:text-[#5B6D56] text-xs font-mono uppercase tracking-wider rounded-xl transition-colors duration-200"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Real Interactive Google Map */}
          <div className="lg:col-span-7 bg-[#181714] dark:bg-[#181714] light:bg-[#FFFFFF] border border-[#2D2B26] dark:border-[#2D2B26] light:border-[#DDD7CC] rounded-2xl overflow-hidden shadow-sm relative min-h-[360px] sm:min-h-[420px] flex items-center justify-center">
            {/* Loading Architectural Skeleton */}
            {!mapLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#181714] dark:bg-[#181714] light:bg-[#F8F6F0] space-y-3">
                <div className="w-8 h-8 rounded-full border-2 border-[#C9A86A]/30 border-t-[#C9A86A] animate-spin" />
                <div className="text-xs font-mono text-[#8E887E] uppercase tracking-wider">
                  Loading Map...
                </div>
              </div>
            )}

            {/* Real Google Maps Embed Iframe */}
            <iframe
              title="ARC Avenue Office Location Map"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
              className="w-full h-full min-h-[360px] sm:min-h-[420px] rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
