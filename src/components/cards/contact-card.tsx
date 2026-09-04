"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ContactCardProps {
  label: string;
  title: string;
  detail: string;
  href: string;
  isExternal?: boolean;
}

export default function ContactCard({
  label,
  title,
  detail,
  href,
  isExternal = false,
}: ContactCardProps) {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="p-6 rounded-xl bg-[#101317] dark:bg-[#101317] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] hover:border-[#C5A880]/60 dark:hover:border-[#C5A880]/60 light:hover:border-[#9E7D4C]/60 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-sm group"
    >
      <div className="space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
          {label}
        </span>
        <h4 className="font-serif text-lg font-medium text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
          {title}
        </h4>
        <p className="text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58]">
          {detail}
        </p>
      </div>

      <div className="inline-flex items-center space-x-1 text-xs font-mono uppercase tracking-wider text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] group-hover:underline">
        <span>Connect</span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
}
