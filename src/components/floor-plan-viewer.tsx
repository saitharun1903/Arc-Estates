"use client";

import React, { useState, useRef } from "react";
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, Download, Compass, ShieldCheck } from "lucide-react";

export interface FloorPlanItem {
  id: string;
  name: string;
  bhk: string;
  areaSqFt: string;
  facing: string;
  imageUrl: string;
  description?: string | null;
  demo?: boolean;
}

interface FloorPlanViewerProps {
  floorPlans: FloorPlanItem[];
  projectName: string;
}

export default function FloorPlanViewer({ floorPlans, projectName }: FloorPlanViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!floorPlans || floorPlans.length === 0) {
    return (
      <div className="p-12 text-center bg-[#101317] dark:bg-[#101317] light:bg-[#F2EFEB] border border-white/10 dark:border-white/10 light:border-[#DED9CF] rounded-xl text-[#8C8983] light:text-[#656056] text-sm">
        Architectural floor plans are undergoing municipal validation. Contact the consultation desk for CAD drawings.
      </div>
    );
  }

  const current = floorPlans[selectedIndex];

  // Map image URL if still old or fallback to SVG
  let blueprintSrc = current.imageUrl;
  if (!blueprintSrc || !blueprintSrc.endsWith('.svg')) {
    const n = (current.name + ' ' + current.bhk).toLowerCase();
    if (n.includes('4 bhk') || n.includes('4b') || n.includes('penthouse')) {
      blueprintSrc = '/plans/arc-vista-4bhk.svg';
    } else if (n.includes('haven') || n.includes('villa')) {
      blueprintSrc = '/plans/arc-haven-villa.svg';
    } else if (n.includes('terrace')) {
      blueprintSrc = '/plans/arc-terrace-3bhk.svg';
    } else {
      blueprintSrc = '/plans/arc-vista-3bhk.svg';
    }
  }

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="space-y-4">
      {/* Top Bar: Clean Typographic Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 dark:border-white/10 light:border-[#E2DDD4] pb-4">
        <div className="flex items-center space-x-2 overflow-x-auto py-1">
          {floorPlans.map((plan, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={plan.id}
                onClick={() => {
                  setSelectedIndex(idx);
                  setZoomLevel(1);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center space-x-3 border ${
                  isActive
                    ? "bg-[#C5A880] text-[#0C0E10] font-semibold border-[#C5A880] shadow-sm"
                    : "bg-[#121519] dark:bg-[#121519] light:bg-[#EFECE5] text-[#8C8983] light:text-[#656056] border-white/10 dark:border-white/10 light:border-[#D5CFC4] hover:text-white light:hover:text-[#181A1D]"
                }`}
              >
                <span>0{idx + 1}</span>
                <span className="font-sans font-medium">{plan.name}</span>
                <span className="opacity-70 text-[10px]">({plan.areaSqFt})</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-[#101317] dark:bg-[#101317] light:bg-[#EFECE5] border border-white/10 dark:border-white/10 light:border-[#D5CFC4] rounded-lg p-1 space-x-1">
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-[#8C8983] light:text-[#656056] hover:text-white light:hover:text-[#181A1D] hover:bg-white/5 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-[#C5A880] light:text-[#A88858] px-2 min-w-[40px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-[#8C8983] light:text-[#656056] hover:text-white light:hover:text-[#181A1D] hover:bg-white/5 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={handleResetZoom}
                className="p-1.5 text-[#8C8983] light:text-[#656056] hover:text-white light:hover:text-[#181A1D] rounded transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-[#101317] dark:bg-[#101317] light:bg-[#EFECE5] border border-white/10 dark:border-white/10 light:border-[#D5CFC4] text-[#8C8983] light:text-[#656056] hover:text-white light:hover:text-[#181A1D] rounded-lg transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <a
            href={blueprintSrc}
            download={`${projectName}-${current.name}.svg`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-2 bg-white/5 dark:bg-white/5 light:bg-[#E6E1D7] hover:bg-[#C5A880] light:hover:bg-[#A88858] hover:text-[#0C0E10] text-[#E2DDD2] light:text-[#181A1D] text-xs font-mono rounded-lg border border-white/10 dark:border-white/10 light:border-[#D5CFC4] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CAD SVG</span>
          </a>
        </div>
      </div>

      {/* Blueprint Stage Canvas (Occupies 85%+ of Visual Area) */}
      <div
        ref={containerRef}
        className={`relative rounded-xl border border-white/10 dark:border-white/10 light:border-[#D5CFC4] overflow-hidden transition-all bg-[#080A0C] dark:bg-[#080A0C] light:bg-[#FAF8F5] text-[#DDD8CE] dark:text-[#DDD8CE] light:text-[#181A1D] ${
          isFullscreen
            ? "fixed inset-0 z-50 rounded-none border-none p-6 flex flex-col justify-between"
            : "min-h-[520px] sm:min-h-[640px] flex flex-col justify-between p-4 sm:p-6"
        }`}
      >
        {/* Floating Architectural Annotation HUD */}
        <div className="flex items-center justify-between pointer-events-none z-10 text-xs font-mono opacity-80 mb-2">
          <div className="flex items-center space-x-3">
            <span className="text-[#C5A880] light:text-[#A88858] font-semibold tracking-wider">
              {current.name.toUpperCase()}
            </span>
            <span>•</span>
            <span className="text-[#8C8983] light:text-[#656056]">{current.facing}</span>
            <span>•</span>
            <span className="text-[#8C8983] light:text-[#656056]">{current.areaSqFt}</span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-[11px] text-[#C5A880] light:text-[#A88858]">
            <Compass className="w-3.5 h-3.5" />
            <span>VASTU COMPLIANT VECTOR CAD</span>
          </div>
        </div>

        {/* CAD Blueprint Drawing Stage */}
        <div className="flex-1 flex items-center justify-center overflow-auto p-2 sm:p-4">
          <div
            className="transition-transform duration-200 origin-center max-w-full max-h-full flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Direct Vector SVG Rendering */}
            <img
              src={blueprintSrc}
              alt={`${current.name} Architectural CAD Blueprint`}
              className="max-h-[500px] sm:max-h-[580px] w-auto object-contain select-none filter contrast-105"
              draggable={false}
            />
          </div>
        </div>

        {/* Blueprint Footer / Specifications Bar */}
        <div className="pt-3 border-t border-white/5 dark:border-white/5 light:border-[#E8E4DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#8C8983] light:text-[#656056] font-mono">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>RERA Approved Layout</span>
            </span>
            <span>Scale 1:50</span>
            <span className="hidden sm:inline">RCC Monolithic Grid Compliant</span>
          </div>

          <div className="flex items-center space-x-3">
            <span>Scroll or pinch to inspect structural dimensions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
