"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/admin-header";
import {
  CalendarCheck,
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  Building,
  CheckCircle2,
  XCircle,
  Trash2,
  Filter,
} from "lucide-react";

interface SiteVisitItem {
  id: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail?: string | null;
  visitDate: string;
  visitTimeSlot: string;
  notes?: string | null;
  status: string;
  projectName: string;
  projectSlug: string;
}

interface SiteVisitsClientProps {
  initialVisits: SiteVisitItem[];
}

export default function SiteVisitsClient({ initialVisits }: SiteVisitsClientProps) {
  const [visits, setVisits] = useState<SiteVisitItem[]>(initialVisits);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const statuses = ["ALL", "Pending", "Confirmed", "Completed", "Cancelled"];

  const filteredVisits = visits.filter((v) => {
    if (statusFilter !== "ALL" && v.status !== statusFilter) return false;
    return true;
  });

  const handleStatusChange = async (visitId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/site-visits/${visitId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setVisits((prev) =>
          prev.map((v) => (v.id === visitId ? { ...v, status: newStatus } : v))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (visitId: string) => {
    if (!confirm("Are you sure you want to cancel and delete this site visit?")) return;
    try {
      const res = await fetch(`/api/site-visits/${visitId}`, { method: "DELETE" });
      if (res.ok) {
        setVisits((prev) => prev.filter((v) => v.id !== visitId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <AdminHeader
        title="Site Visit Inspection Schedule"
        subtitle="Manage prospective buyer appointments, engineer walk-throughs, and status updates"
      />

      <div className="px-6 max-w-7xl mx-auto space-y-6">
        {/* Filter bar */}
        <div className="p-4 bg-[#14171C] border border-white/10 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-xs text-[#8C8983]">Filter Status:</span>
            <div className="flex items-center space-x-1">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    statusFilter === s
                      ? "bg-[#C5A880] text-[#0C0E10] font-bold"
                      : "text-[#8C8983] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <span className="text-xs font-mono text-[#8C8983]">
            Showing {filteredVisits.length} appointments
          </span>
        </div>

        {/* Site Visits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVisits.map((visit) => (
            <div
              key={visit.id}
              className="bg-[#12151A] border border-white/10 rounded-xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header: Project & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#C5A880] font-bold uppercase tracking-wider flex items-center space-x-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>{visit.projectName}</span>
                  </span>

                  <select
                    value={visit.status}
                    onChange={(e) => handleStatusChange(visit.id, e.target.value)}
                    className="bg-[#181C23] border border-white/10 text-[11px] font-mono text-white rounded px-2 py-1 focus:outline-none focus:border-[#C5A880]"
                  >
                    {statuses
                      .filter((s) => s !== "ALL")
                      .map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Visitor Info */}
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    {visit.visitorName}
                  </h3>
                  <div className="text-xs font-mono text-[#C5A880]">{visit.visitorPhone}</div>
                  {visit.visitorEmail && (
                    <div className="text-[11px] text-[#8C8983]">{visit.visitorEmail}</div>
                  )}
                </div>

                {/* Date & Time Slot */}
                <div className="p-3 rounded-lg bg-[#161920] border border-white/5 space-y-1.5 text-xs text-[#CCC7BC]">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span className="font-mono text-white">{visit.visitDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{visit.visitTimeSlot}</span>
                  </div>
                </div>

                {/* Visitor Notes */}
                {visit.notes && (
                  <p className="text-xs text-[#8C8983] italic bg-[#0C0E10] p-2.5 rounded border border-white/5">
                    “{visit.notes}”
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <a
                    href={`tel:${visit.visitorPhone.replace(/\s+/g, "")}`}
                    className="p-2 rounded bg-[#181C23] border border-white/10 text-[#C5A880] hover:text-white transition-colors"
                    title="Call Visitor"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`https://wa.me/${visit.visitorPhone.replace(
                      /[^0-9]/g,
                      ""
                    )}?text=Hello%20${encodeURIComponent(
                      visit.visitorName
                    )},%20confirming%20your%20site%20visit%20to%20${encodeURIComponent(
                      visit.projectName
                    )}%20on%20${encodeURIComponent(visit.visitDate)}%20at%20${encodeURIComponent(
                      visit.visitTimeSlot
                    )}.%20Our%20engineers%20look%20forward%20to%20welcoming%20you.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-[#1BD741]/10 border border-[#1BD741]/30 text-[#1BD741] hover:bg-[#1BD741]/20 transition-colors"
                    title="WhatsApp Confirmation"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={() => handleDelete(visit.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  title="Cancel & Delete Visit"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
