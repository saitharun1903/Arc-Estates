"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquareCode,
  Phone,
  X,
  Sparkles,
  ArrowUpRight,
  ChevronUp,
} from "lucide-react";

interface FloatingActionsProps {
  whatsapp?: string;
  phone?: string;
  onOpenAI: () => void;
  onOpenVoicePreview?: () => void;
}

export default function FloatingActions({
  whatsapp = "+918008532333",
  phone = "080085 32333",
  onOpenAI,
  onOpenVoicePreview,
}: FloatingActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const cleanWhatsApp = whatsapp.replace(/[^0-9]/g, "");
  const cleanPhone = phone.replace(/\s+/g, "");

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 pb-[env(safe-area-inset-bottom,0px)] pr-[env(safe-area-inset-right,0px)] z-50">
      {/* Expanded Popover Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[320px] max-w-[320px] bg-[#1C1A17] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-slide-up space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#C9A86A] font-semibold">
                ARC ADVISORY DESK
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-[#8E887E] hover:text-[#FBF9F5] hover:bg-white/5 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action 1: AI Concierge */}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenAI();
            }}
            className="w-full text-left p-3 rounded-xl bg-[#131210] hover:bg-[#252320] border border-white/10 hover:border-[#C9A86A] transition-all flex items-start space-x-3 group min-h-[44px]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C9A86A]/15 flex items-center justify-center text-[#C9A86A] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
              <MessageSquareCode className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#FBF9F5] tracking-wide">
                  ARC AI Concierge
                </span>
                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#C9A86A]/15 text-[#C9A86A] font-medium">
                  Instant
                </span>
              </div>
              <p className="text-[11px] text-[#8E887E] mt-0.5 leading-relaxed">
                Inquire about floor plans, pricing &amp; unit availability
              </p>
            </div>
          </button>

          {/* Action 2: WhatsApp Advisory */}
          <a
            href={`https://wa.me/${cleanWhatsApp}?text=Hello%20ARC%20Estates,%20I%20am%20exploring%20your%20properties%20in%20Bahadurpally.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full text-left p-3 rounded-xl bg-[#131210] hover:bg-[#252320] border border-white/10 hover:border-[#1BD741]/40 transition-all flex items-start space-x-3 group min-h-[44px]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1BD741]/15 flex items-center justify-center text-[#1BD741] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2 1.042.928 1.488 1.037 1.705 1.139.144.068.275.05.376-.065.13-.148.549-.64.694-.857.145-.217.29-.18.491-.106.202.074 1.284.606 1.505.717.221.111.368.167.422.261.054.094.054.544-.09.949z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#FBF9F5] tracking-wide">
                  WhatsApp Direct
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8E887E] group-hover:text-[#FBF9F5] transition-colors" />
              </div>
              <p className="text-[11px] text-[#8E887E] mt-0.5 leading-relaxed">
                Direct line to site engineers &amp; project leadership
              </p>
            </div>
          </a>

          {/* Action 3: Direct Phone Call */}
          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#131210] hover:bg-[#252320] border border-white/10 text-xs text-[#CCC5B9] hover:text-[#FBF9F5] transition-colors min-h-[44px]"
          >
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span className="font-mono text-[11px]">{phone}</span>
            </div>
            <span className="text-[10px] uppercase font-mono text-[#8E887E]">Direct Call</span>
          </a>
        </div>
      )}

      {/* Primary Unified Trigger Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Open ARC Advisory Concierge"
          className="relative z-10 flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-[#1C1A17] hover:bg-[#252320] border border-[#C9A86A]/40 hover:border-[#C9A86A] text-[#FBF9F5] shadow-2xl transition-all select-none min-h-[44px] min-w-[44px]"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-[#C9A86A]/20 flex items-center justify-center text-[#C9A86A]">
              {isOpen ? (
                <X className="w-3.5 h-3.5" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
            </div>
            {!isOpen && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#1C1A17]" />
            )}
          </div>

          <div className="text-left hidden sm:block pr-1">
            <div className="text-xs font-semibold tracking-wide text-[#FBF9F5]">
              ARC Concierge
            </div>
            <div className="text-[10px] text-[#C9A86A] font-mono leading-none mt-0.5">
              Advisory &amp; Inquiries
            </div>
          </div>

          <ChevronUp
            className={`w-3.5 h-3.5 text-[#8E887E] transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
