"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Home,
  CalendarCheck,
  Bot,
  FileText,
  HelpCircle,
  MessageSquareQuote,
  Settings,
  ExternalLink,
  LogOut,
  Shield,
} from "lucide-react";

interface AdminSidebarProps {
  onLogout?: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Leads & Enquiries", href: "/admin/leads", icon: Users },
    { label: "Site Visit Schedule", href: "/admin/site-visits", icon: CalendarCheck },
    { label: "Projects Portfolio", href: "/admin/projects", icon: Building2 },
    { label: "Property Inventory", href: "/admin/properties", icon: Home },
    { label: "AI Conversations", href: "/admin/ai-conversations", icon: Bot },
    { label: "Website Copy", href: "/admin/content", icon: FileText },
    { label: "FAQs Management", href: "/admin/faqs", icon: HelpCircle },
    { label: "Client Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Company Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (e) {
      console.error(e);
      window.location.href = "/admin/login";
    }
  };

  return (
    <aside className="w-64 bg-[#0F1114] border-r border-white/10 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center text-[#C5A880] font-serif font-bold text-sm">
            A
          </div>
          <div>
            <div className="font-serif font-bold text-sm text-white tracking-wider">
              ARC AVENUE
            </div>
            <div className="text-[9px] font-mono text-[#C5A880] tracking-widest uppercase">
              Operations Console
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? "bg-[#C5A880] text-[#0C0E10] font-semibold shadow-md shadow-[#C5A880]/15"
                    : "text-[#8C8983] hover:text-[#F4F1EA] hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[#0C0E10]" : "text-[#8C8983]"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs text-[#8C8983] hover:text-white rounded hover:bg-white/5 transition-colors"
        >
          <span className="flex items-center space-x-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </span>
          <span className="text-[10px] font-mono text-[#C5A880]">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
