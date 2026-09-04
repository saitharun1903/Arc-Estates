"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/admin-header";
import {
  Users,
  Search,
  Phone,
  Mail,
  Edit,
  Trash2,
  Filter,
  MessageSquare,
  Check,
  X,
  FileText,
} from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  interest?: string | null;
  project?: { name: string; slug: string } | null;
  budget?: string | null;
  propertyType?: string | null;
  bedrooms?: string | null;
  source: string;
  status: string;
  notes?: string | null;
  createdAt: string;
}

interface LeadsClientProps {
  initialLeads: LeadItem[];
}

export default function LeadsClient({ initialLeads }: LeadsClientProps) {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");

  // Notes Modal state
  const [editingLead, setEditingLead] = useState<LeadItem | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const statuses = [
    "ALL",
    "New",
    "Contacted",
    "Qualified",
    "Site Visit",
    "Interested",
    "Converted",
    "Lost",
  ];

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== "ALL" && lead.status !== statusFilter) return false;
    if (sourceFilter !== "ALL" && lead.source !== sourceFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        (lead.email && lead.email.toLowerCase().includes(q)) ||
        (lead.interest && lead.interest.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openNoteEditor = (lead: LeadItem) => {
    setEditingLead(lead);
    setNoteContent(lead.notes || "");
  };

  const handleSaveNote = async () => {
    if (!editingLead) return;
    setSavingNote(true);
    try {
      const res = await fetch(`/api/leads/${editingLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: noteContent }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === editingLead.id ? { ...l, notes: noteContent } : l
          )
        );
        setEditingLead(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm("Are you sure you wish to delete this lead record?")) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <AdminHeader
        title="Customer Leads & Enquiries CRM"
        subtitle={`Tracking ${leads.length} total customer prospects across web, AI consultant, and direct channels`}
      />

      <div className="px-6 max-w-7xl mx-auto space-y-6">
        {/* Filter Controls Bar */}
        <div className="p-4 bg-[#14171C] border border-white/10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C8983] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by prospect name, phone, or email..."
              className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto overflow-x-auto">
            <div className="flex items-center space-x-1.5 text-xs text-[#8C8983] shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#181C23] border border-white/10 text-xs text-white rounded-lg px-3 py-2 focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-[#181C23] border border-white/10 text-xs text-white rounded-lg px-3 py-2 focus:outline-none"
            >
              <option value="ALL">All Sources</option>
              <option value="Website">Website</option>
              <option value="AI Assistant">AI Assistant</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Site Visit">Site Visit</option>
              <option value="Contact Form">Contact Form</option>
              <option value="Callback Request">Callback Request</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-[#12151A] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#161920] border-b border-white/5 text-[#8C8983] font-mono uppercase text-[10px]">
                <tr>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Requirement & Interest</th>
                  <th className="p-4">Source</th>
                  <th className="p-4">Funnel Status</th>
                  <th className="p-4">Internal Notes</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Contact */}
                    <td className="p-4">
                      <div className="font-semibold text-white text-sm">{lead.name}</div>
                      <div className="text-[#C5A880] font-mono mt-0.5">{lead.phone}</div>
                      {lead.email && <div className="text-[11px] text-[#8C8983]">{lead.email}</div>}
                    </td>

                    {/* Interest & Project */}
                    <td className="p-4 max-w-xs">
                      {lead.project && (
                        <span className="inline-block text-[10px] font-mono text-[#C5A880] px-2 py-0.5 rounded bg-[#1A1E24] border border-white/5 mb-1">
                          {lead.project.name}
                        </span>
                      )}
                      <p className="text-[#CCC7BC] text-xs line-clamp-2 leading-relaxed">
                        {lead.interest || "General real estate inquiry"}
                      </p>
                      {(lead.budget || lead.bedrooms) && (
                        <div className="text-[10px] text-[#8C8983] font-mono mt-1">
                          {lead.bedrooms && `${lead.bedrooms} • `}
                          {lead.budget && `Budget: ${lead.budget}`}
                        </div>
                      )}
                    </td>

                    {/* Source */}
                    <td className="p-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181C22] text-[#CCC7BC] border border-white/5">
                        {lead.source}
                      </span>
                      <div className="text-[9px] text-[#787570] font-mono mt-1">
                        {lead.createdAt}
                      </div>
                    </td>

                    {/* Funnel Status Dropdown */}
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="bg-[#181C23] border border-white/10 text-[11px] font-mono text-white rounded px-2.5 py-1.5 focus:outline-none focus:border-[#C5A880]"
                      >
                        {statuses
                          .filter((s) => s !== "ALL")
                          .map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                      </select>
                    </td>

                    {/* Notes preview */}
                    <td className="p-4 max-w-xs">
                      {lead.notes ? (
                        <p className="text-[11px] text-[#8C8983] italic line-clamp-2">
                          “{lead.notes}”
                        </p>
                      ) : (
                        <span className="text-[11px] text-[#5A5853]">No notes added</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <a
                          href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                          className="p-1.5 text-[#C5A880] hover:bg-[#C5A880]/15 rounded"
                          title="Call Lead"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={`https://wa.me/${lead.phone.replace(
                            /[^0-9]/g,
                            ""
                          )}?text=Hello%20${encodeURIComponent(
                            lead.name
                          )},%20this%20is%20ARC%20Avenue%20following%20up%20on%20your%20property%20inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-[#1BD741] hover:bg-[#1BD741]/15 rounded"
                          title="WhatsApp Prospect"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => openNoteEditor(lead)}
                          className="p-1.5 text-[#CCC7BC] hover:bg-white/10 rounded"
                          title="Edit Internal Notes"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                          title="Delete Lead Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Note Editor Modal */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#14171C] border border-white/15 rounded-xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="font-serif font-bold text-base text-white">
                Agent Notes — {editingLead.name}
              </h4>
              <button
                onClick={() => setEditingLead(null)}
                className="text-[#8C8983] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <textarea
              rows={5}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Record phone call summaries, client preferences, budget flexibility, or scheduled site tours..."
              className="w-full bg-[#0C0E10] border border-white/10 focus:border-[#C5A880] rounded-lg p-3 text-xs text-white focus:outline-none resize-none"
            />

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setEditingLead(null)}
                className="px-4 py-2 border border-white/10 hover:border-white/30 text-xs text-[#CCC7BC] rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                disabled={savingNote}
                className="px-5 py-2 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] text-xs font-bold uppercase tracking-wider rounded"
              >
                {savingNote ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
