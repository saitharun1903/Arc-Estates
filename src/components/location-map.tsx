"use client";

import React from "react";
import { MapPin, Navigation, Phone, MessageSquare, ExternalLink } from "lucide-react";

interface LocationMapProps {
  address?: string;
  phone?: string;
  whatsapp?: string;
}

export default function LocationMap({
  address = "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
  phone = "080085 32333",
  whatsapp = "+918008532333",
}: LocationMapProps) {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "ARC AVENUE HOME Doolapally Rd beside KNR Apartments Bahadurpally Hyderabad Telangana 500043"
  )}`;

  const cleanPhone = phone.replace(/\s+/g, "");
  const cleanWhatsApp = whatsapp.replace(/[^0-9]/g, "");

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono tracking-[0.25em] text-accent uppercase">
              <span>LOCATION &amp; SITE OFFICE</span>
              <span>//</span>
              <span>HYDERABAD CORRIDOR</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground mt-2">
              Visit Our Registered Site Office
            </h2>
          </div>
          <p className="text-sm text-foreground-muted max-w-md font-light leading-relaxed">
            Positioned at the epicenter of North Hyderabad’s infrastructure surge. Connect with our
            chief structural directors and inspect active construction on site.
          </p>
        </div>

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Details & Directions Card */}
          <div className="lg:col-span-5 bg-card border border-border rounded-xl p-8 flex flex-col justify-between space-y-8 shadow-md">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 border border-accent flex items-center justify-center text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-foreground">ARC AVENUE</h3>
                  <p className="text-xs font-mono text-accent">Corporate &amp; Project Office</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-foreground-secondary">
                <p className="leading-relaxed font-light">{address}</p>
                <div className="p-3.5 rounded bg-surface-elevated border border-border text-xs text-foreground-muted space-y-1">
                  <div className="font-mono text-[11px] text-accent uppercase tracking-wider">
                    Landmark Navigation Guide
                  </div>
                  <div>Directly beside KNR Apartments on Doolapally Road.</div>
                  <div>7 Minutes from Outer Ring Road (ORR Exit 5).</div>
                  <div>12 Minutes from Tech Mahindra Bahadurpally Campus.</div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-border">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 bg-accent hover:bg-accent-hover text-accent-foreground font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center justify-center space-x-2 py-3 px-3 border border-border hover:border-accent text-xs font-semibold text-foreground rounded transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>Call Office</span>
                </a>

                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=Hello%20ARC%20Avenue,%20I%20am%20heading%20to%20your%20Bahadurpally%20site.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 py-3 px-3 bg-[#1BD741]/10 hover:bg-[#1BD741]/20 border border-[#1BD741]/40 text-[#1BD741] text-xs font-semibold rounded transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Architectural Map Frame with Directions Mockup */}
          <div className="lg:col-span-7 bg-card border border-border rounded-xl overflow-hidden shadow-md relative min-h-[380px] flex items-center justify-center group">
            {/* Embed / Styled Map Canvas */}
            <div className="absolute inset-0 bg-surface-muted bg-blueprint-grid">
              {/* Satellite / Stylized Map Background */}
              <div
                className="w-full h-full opacity-60 bg-cover bg-center grayscale contrast-125"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')",
                }}
              />
            </div>

            {/* Tint overlay adapted to background */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/70" />

            {/* Visual Pin & Radar Effect */}
            <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4 max-w-sm">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent ring-4 ring-accent/30 animate-pulse">
                  <MapPin className="w-8 h-8" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface/95 backdrop-blur-md border border-border text-xs shadow-lg">
                <div className="font-serif font-bold text-sm text-foreground">ARC AVENUE HEADQUARTERS</div>
                <div className="text-[11px] text-accent font-mono mt-0.5">Bahadurpally, Hyderabad</div>
                <div className="text-[10px] text-foreground-muted mt-2">
                  Doolapally Rd, beside KNR Apartments, Telangana 500043
                </div>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center space-x-1 text-accent hover:underline font-mono text-[11px]"
                >
                  <span>Open in Navigation App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
