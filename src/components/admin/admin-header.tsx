"use client";

import React from "react";
import Link from "next/link";
import { Plus, Bell, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export default function AdminHeader({
  title,
  subtitle,
  actionText,
  actionHref,
  onActionClick,
}: AdminHeaderProps) {
  return (
    <header className="p-6 border-b border-white/10 bg-[#111317] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#F4F1EA]">{title}</h1>
        {subtitle && <p className="text-xs text-[#8C8983] mt-0.5 font-mono">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-3">
        {actionText && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] text-xs font-bold uppercase tracking-wider rounded transition-colors shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{actionText}</span>
          </Link>
        )}

        {actionText && onActionClick && !actionHref && (
          <button
            onClick={onActionClick}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] text-xs font-bold uppercase tracking-wider rounded transition-colors shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{actionText}</span>
          </button>
        )}

        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#181C22] border border-white/10 text-xs text-[#CCC7BC]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-[11px]">Authorized Staff</span>
        </div>
      </div>
    </header>
  );
}
