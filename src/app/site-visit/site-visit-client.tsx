"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  Shield,
  MapPin,
  ArrowRight,
} from "lucide-react";

interface ProjectOption {
  id: string;
  name: string;
  slug: string;
  location: string;
}

interface SiteVisitClientProps {
  projects: ProjectOption[];
  defaultPhone?: string;
  defaultAddress?: string;
}

export default function SiteVisitClient({
  projects,
  defaultPhone = "080085 32333",
  defaultAddress = "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
}: SiteVisitClientProps) {
  const searchParams = useSearchParams();
  const preselectedProjectId = searchParams.get("project") || (projects[0]?.id ?? "");

  const [projectId, setProjectId] = useState(preselectedProjectId);
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTimeSlot, setVisitTimeSlot] = useState("10:00 AM - 11:30 AM");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<{
    id: string;
    projectName: string;
    visitDate: string;
    visitTimeSlot: string;
  } | null>(null);

  const timeSlots = [
    "10:00 AM - 11:30 AM",
    "11:30 AM - 01:00 PM",
    "02:30 PM - 04:00 PM",
    "04:00 PM - 05:30 PM",
  ];

  // Get tomorrow's date as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!projectId || !visitorName.trim() || !visitorPhone.trim() || !visitDate || !visitTimeSlot) {
      setError("Please complete all required fields (Development, Name, Phone, Date, and Time).");
      return;
    }

    const digits = visitorPhone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please enter a valid 10-digit telephone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/site-visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          visitorName,
          visitorPhone,
          visitorEmail: visitorEmail || undefined,
          visitDate,
          visitTimeSlot,
          notes: notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to schedule site visit");
      }

      const selectedProject = projects.find((p) => p.id === projectId);

      setSuccessData({
        id: data.visit.id,
        projectName: selectedProject?.name || "ARC Avenue Development",
        visitDate,
        visitTimeSlot,
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-[#0C0E10] text-[#F4F1EA] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Page Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880]">
            <span>PRIVATE ON-SITE BRIEFING</span>
            <span>//</span>
            <span>BAHADURPALLY</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Schedule a Personal Site Visit
          </h1>
          <p className="text-xs sm:text-sm text-[#8C8983] leading-relaxed font-light">
            Walk the active construction site with our chief engineers. Inspect structural framing,
            ongoing finishes, and review physical architectural blueprints.
          </p>
        </div>

        {/* Confirmation State or Form */}
        {successData ? (
          <div className="bg-[#14171C] border border-emerald-500/40 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Your Site Visit Request Has Been Received
              </h2>
              <p className="text-xs sm:text-sm text-[#CCC7BC] max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{visitorName}</strong>. Our engineering
                desk has scheduled your private appointment for:
              </p>
            </div>

            <div className="bg-[#0E1013] border border-white/10 rounded-xl p-6 max-w-md mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#8C8983]">Development:</span>
                <span className="font-bold text-white">{successData.projectName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#8C8983]">Appointment Date:</span>
                <span className="font-mono text-[#C5A880]">{successData.visitDate}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#8C8983]">Time Slot:</span>
                <span className="font-mono text-white">{successData.visitTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8983]">Site Address:</span>
                <span className="text-right text-[#8C8983] max-w-[65%]">
                  HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8C8983]">
              A verification SMS and WhatsApp location pin will be transmitted to{" "}
              <strong className="text-white">{visitorPhone}</strong> shortly.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  setSuccessData(null);
                  setVisitorName("");
                  setVisitorPhone("");
                  setVisitorEmail("");
                  setNotes("");
                }}
                className="px-6 py-2.5 bg-[#1E232B] hover:bg-[#282F3A] border border-white/10 text-xs font-semibold text-white rounded transition-colors"
              >
                Schedule Another Visit
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  defaultAddress
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                Get Directions on Maps
              </a>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#121519] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8"
          >
            {error && (
              <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300">
                {error}
              </div>
            )}

            {/* Step 1: Select Development */}
            <div className="space-y-4">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#C5A880]">
                1. Select Development
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProjectId(p.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      projectId === p.id
                        ? "bg-[#1E242C] border-[#C5A880] shadow-md shadow-[#C5A880]/15"
                        : "bg-[#16191E] border-white/5 hover:border-white/20 text-[#8C8983]"
                    }`}
                  >
                    <div className="font-serif font-bold text-sm text-white">{p.name}</div>
                    <div className="text-xs text-[#8C8983] truncate mt-1 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-[#C5A880] shrink-0" />
                      <span>{p.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Time Slot */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#C5A880]">
                2. Preferred Schedule
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="block text-xs text-[#8C8983] mb-2 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Inspection Date *</span>
                  </span>
                  <input
                    type="date"
                    min={minDateString}
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    required
                    className="w-full bg-[#181C22] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <span className="block text-xs text-[#8C8983] mb-2 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Preferred Time Slot *</span>
                  </span>
                  <select
                    value={visitTimeSlot}
                    onChange={(e) => setVisitTimeSlot(e.target.value)}
                    className="w-full bg-[#181C22] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#C5A880]">
                3. Visitor Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#8C8983] mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C8983] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="e.g. Vikram Reddy"
                      required
                      className="w-full bg-[#181C22] border border-white/10 focus:border-[#C5A880] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#8C8983] mb-1">Phone Number (10 Digits) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C8983] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder="098480 12345"
                      required
                      className="w-full bg-[#181C22] border border-white/10 focus:border-[#C5A880] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#8C8983] mb-1">Email Address (Optional)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C8983] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      placeholder="vikram.reddy@example.com"
                      className="w-full bg-[#181C22] border border-white/10 focus:border-[#C5A880] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#8C8983] mb-1">
                    Specific Areas of Interest or Queries (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Interested in high-floor 3 BHK units, sample finishes, or structural rebar review..."
                    className="w-full bg-[#181C22] border border-white/10 focus:border-[#C5A880] rounded-lg p-3 text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-[#8C8983]">
                <Shield className="w-4 h-4 text-[#C5A880]" />
                <span>Zero obligation. Direct engineer-led walkthrough.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A880] hover:bg-[#B38F5B] disabled:opacity-50 text-[#0C0E10] text-xs font-bold uppercase tracking-widest rounded transition-all shadow-xl hover:scale-105"
              >
                {loading ? "Scheduling Appointment..." : "Confirm Site Visit Request"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
