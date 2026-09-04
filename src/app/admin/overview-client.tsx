"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  CalendarCheck,
  Building2,
  Home,
  Bot,
  Plus,
  ArrowUpRight,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import StatCard from "@/components/admin/stat-card";
import AdminHeader from "@/components/admin/admin-header";

interface OverviewProps {
  stats: {
    totalLeads: number;
    newLeads: number;
    totalVisits: number;
    pendingVisits: number;
    activeProjects: number;
    totalProperties: number;
    aiConversations: number;
  };
  recentLeads: Array<{
    id: string;
    name: string;
    phone: string;
    source: string;
    status: string;
    interest?: string | null;
    createdAt: string;
  }>;
  upcomingVisits: Array<{
    id: string;
    visitorName: string;
    visitorPhone: string;
    visitDate: string;
    visitTimeSlot: string;
    status: string;
    projectName: string;
  }>;
}

export default function AdminOverviewClient({
  stats,
  recentLeads,
  upcomingVisits,
}: OverviewProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "contacted":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "qualified":
      case "site visit":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "converted":
      case "confirmed":
      case "completed":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <AdminHeader
        title="Operations Dashboard"
        subtitle="Real-time performance indicators, active enquiries, and site visit schedules"
        actionText="Add New Project"
        actionHref="/admin/projects/new"
      />

      <div className="px-6 space-y-8 max-w-7xl mx-auto">
        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Inquiries & Leads"
            value={stats.totalLeads}
            subtext={`${stats.newLeads} pending initial contact`}
            icon={Users}
            trend="+18% this month"
          />
          <StatCard
            title="Scheduled Site Visits"
            value={stats.totalVisits}
            subtext={`${stats.pendingVisits} pending confirmation`}
            icon={CalendarCheck}
            trend="Active Queue"
          />
          <StatCard
            title="Active Developments"
            value={stats.activeProjects}
            subtext="Bahadurpally Corridor"
            icon={Building2}
            trend="4 Flagship"
          />
          <StatCard
            title="AI Inquiries Captured"
            value={stats.aiConversations}
            subtext="Automated consultant stream"
            icon={Bot}
            trend="24/7 Live"
          />
        </div>

        {/* Fast Quick Actions Row */}
        <div className="p-4 rounded-xl bg-[#14171C] border border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8C8983]">
            Fast Operations Shortcuts:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/projects/new"
              className="px-3 py-1.5 rounded bg-[#1E232B] hover:bg-[#282F3A] border border-white/10 text-xs text-white flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Add Project</span>
            </Link>
            <Link
              href="/admin/properties"
              className="px-3 py-1.5 rounded bg-[#1E232B] hover:bg-[#282F3A] border border-white/10 text-xs text-white flex items-center space-x-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Manage Inventory</span>
            </Link>
            <Link
              href="/admin/leads"
              className="px-3 py-1.5 rounded bg-[#1E232B] hover:bg-[#282F3A] border border-white/10 text-xs text-white flex items-center space-x-1.5 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Lead CRM Funnel</span>
            </Link>
            <Link
              href="/admin/settings"
              className="px-3 py-1.5 rounded bg-[#C5A880]/15 hover:bg-[#C5A880]/25 border border-[#C5A880]/40 text-xs text-[#C5A880] flex items-center space-x-1.5 transition-colors"
            >
              <span>Edit Company Info / Phone</span>
            </Link>
          </div>
        </div>

        {/* Dual Panels: Recent Leads & Upcoming Site Visits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Recent Leads Table */}
          <div className="lg:col-span-7 bg-[#12151A] border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-white">Recent Customer Inquiries</h3>
                <p className="text-[11px] text-[#8C8983] font-mono">Lead capture from Web, AI & WhatsApp</p>
              </div>
              <Link
                href="/admin/leads"
                className="text-xs text-[#C5A880] hover:underline flex items-center space-x-1"
              >
                <span>View All Leads</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#161920] border-b border-white/5 text-[#8C8983] font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Prospect</th>
                    <th className="p-3.5">Source</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5">
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-[11px] text-[#8C8983] font-mono">{lead.phone}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-[#1A1E24] text-[#CCC7BC] border border-white/5 font-mono text-[10px]">
                          {lead.source}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getStatusBadge(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <a
                          href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center space-x-1 text-[#C5A880] hover:underline"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Upcoming Site Visits */}
          <div className="lg:col-span-5 bg-[#12151A] border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-white">Upcoming Site Inspections</h3>
                <p className="text-[11px] text-[#8C8983] font-mono">Bahadurpally project visits</p>
              </div>
              <Link
                href="/admin/site-visits"
                className="text-xs text-[#C5A880] hover:underline flex items-center space-x-1"
              >
                <span>Full Schedule</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 space-y-3">
              {upcomingVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="p-3.5 rounded-lg bg-[#161920] border border-white/5 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{visit.visitorName}</span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border ${getStatusBadge(
                        visit.status
                      )}`}
                    >
                      {visit.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#8C8983] flex items-center justify-between font-mono">
                    <span>{visit.projectName}</span>
                    <span className="text-[#C5A880]">{visit.visitDate}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-[10px] text-[#787570]">{visit.visitTimeSlot}</span>
                    <a
                      href={`https://wa.me/${visit.visitorPhone.replace(
                        /[^0-9]/g,
                        ""
                      )}?text=Hello%20${encodeURIComponent(
                        visit.visitorName
                      )},%20confirming%20your%20site%20visit%20to%20${encodeURIComponent(
                        visit.projectName
                      )}%20on%20${encodeURIComponent(visit.visitDate)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-[#1BD741] hover:underline"
                    >
                      WhatsApp Confirm →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
