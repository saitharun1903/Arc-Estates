"use client";

import React from "react";
import { X, Mic, AudioWaveform, Sparkles, CheckCircle2, Phone } from "lucide-react";

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone?: string;
}

export default function VoiceAgentModal({
  isOpen,
  onClose,
  phone = "080085 32333",
}: VoiceAgentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-[#121519] border border-[#C5A880]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle architectural background pattern */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8C8983] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Voice AI Visualization */}
        <div className="text-center space-y-6 relative z-10 pt-2">
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            {/* Pulsing architectural circles */}
            <div className="absolute inset-0 rounded-full border border-[#C5A880]/30 animate-ping opacity-30" />
            <div className="absolute inset-2 rounded-full border border-[#C5A880]/50 animate-pulse" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1E232B] to-[#2B323D] border border-[#C5A880] flex items-center justify-center text-[#C5A880] shadow-lg shadow-[#C5A880]/20">
              <Mic className="w-7 h-7" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/40 text-[#C5A880] text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VoiceOps Architecture Preview</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F1EA]">
              Talk to ARC Avenue
            </h3>
            <p className="text-sm text-[#CCC7BC] max-w-sm mx-auto mt-2 leading-relaxed">
              Our ultra-low-latency Voice AI agent is currently in private testing. Speak naturally
              to explore project typologies, query structural specs, and schedule site inspections.
            </p>
          </div>

          {/* Staged Capabilities Checklist */}
          <div className="bg-[#181C22] border border-white/10 rounded-xl p-4 text-left space-y-2.5 text-xs text-[#CCC7BC]">
            <div className="font-mono text-[10px] uppercase text-[#C5A880] tracking-wider mb-1">
              Engineered Capabilities
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Real-time bidirectional acoustic conversation stream</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Automated floor plan delivery via WhatsApp instantly after call</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct CRM integration with executive dispatch</span>
            </div>
          </div>

          {/* Fallback to direct phone */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] font-semibold text-xs uppercase tracking-wider rounded transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Senior Consultant ({phone})</span>
            </a>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 border border-white/10 hover:border-white/30 text-xs text-[#CCC7BC] hover:text-white rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
