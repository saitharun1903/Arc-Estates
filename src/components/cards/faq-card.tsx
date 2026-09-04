"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQCardProps {
  index: number | string;
  category: string;
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
}

export default function FAQCard({
  index,
  category,
  question,
  answer,
  isOpen: controlledIsOpen,
  onToggle,
  defaultOpen = false,
}: FAQCardProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };
  const formattedIndex = typeof index === "number" ? String(index).padStart(2, "0") : index;

  return (
    <div className="rounded-xl bg-[#101317] dark:bg-[#101317] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] overflow-hidden transition-colors shadow-sm">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-[#FAF8F5] transition-colors"
      >
        <div className="flex items-baseline space-x-3.5">
          <span className="font-mono text-xs text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] font-semibold shrink-0">
            {formattedIndex}
          </span>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] block">
              {category}
            </span>
            <h4 className="font-serif text-base sm:text-lg font-medium text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
              {question}
            </h4>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#8C8983] shrink-0 transition-transform duration-300 mt-1 ${
            isOpen ? "rotate-180 text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#CCC7BC] dark:text-[#CCC7BC] light:text-[#4A4D53] leading-relaxed font-light border-t border-white/5 dark:border-white/5 light:border-[#EAE6DE] animate-fade-in pl-11">
          {answer}
        </div>
      )}
    </div>
  );
}
