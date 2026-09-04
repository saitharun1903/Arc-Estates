import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: string;
}

export default function StatCard({ title, value, subtext, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-[#14171C] border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-[#8C8983]">
          {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4">
        <div className="font-serif text-3xl font-bold text-[#F4F1EA]">{value}</div>
        {subtext && (
          <div className="text-xs text-[#8C8983] mt-1 flex items-center justify-between">
            <span>{subtext}</span>
            {trend && <span className="font-mono text-[#C5A880] text-[11px]">{trend}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
