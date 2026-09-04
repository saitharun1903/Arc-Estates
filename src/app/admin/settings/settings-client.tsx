"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/admin-header";
import { Save, CheckCircle2, Phone, MessageSquare, MapPin, Star, Shield } from "lucide-react";

interface SettingsData {
  companyName: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  googleRating: string;
  googleReviewsCount: string;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  facebookUrl?: string | null;
  youtubeUrl?: string | null;
}

interface SettingsClientProps {
  initialSettings: SettingsData;
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [form, setForm] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    setError("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update site configuration");
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <AdminHeader
        title="Company Information & Contact Channels"
        subtitle="Manage phone numbers, WhatsApp routing, registered site address, and Google ratings"
      />

      <div className="px-6 max-w-4xl mx-auto space-y-6">
        <form
          onSubmit={handleSubmit}
          className="bg-[#12151A] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6"
        >
          {saved && (
            <div className="p-3.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Contact details and WhatsApp configuration updated live on public site!</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* General Identity */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] border-b border-white/5 pb-2">
                Brand Identity
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#8C8983] mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8C8983] mb-1">Company Tagline</label>
                  <input
                    type="text"
                    required
                    value={form.tagline}
                    onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                    className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] border-b border-white/5 pb-2">
                Telephony & WhatsApp Desks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#8C8983] mb-1 flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-[#C5A880]" />
                    <span>Office Phone</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8C8983] mb-1 flex items-center space-x-1">
                    <MessageSquare className="w-3 h-3 text-[#1BD741]" />
                    <span>WhatsApp Number *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8C8983] mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] border-b border-white/5 pb-2">
                Registered Site Address
              </h3>
              <div>
                <label className="block text-xs text-[#8C8983] mb-1">Full Location Address</label>
                <textarea
                  rows={2}
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg p-3 text-sm text-white focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Trust & Google Rating */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5A880] border-b border-white/5 pb-2">
                Google Business Profile Ratings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#8C8983] mb-1">Rating Score</label>
                  <input
                    type="text"
                    value={form.googleRating}
                    onChange={(e) => setForm({ ...form, googleRating: e.target.value })}
                    className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8C8983] mb-1">Total Google Reviews Count</label>
                  <input
                    type="text"
                    value={form.googleReviewsCount}
                    onChange={(e) => setForm({ ...form, googleReviewsCount: e.target.value })}
                    className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] text-xs font-bold uppercase tracking-wider rounded shadow flex items-center space-x-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{loading ? "Saving Settings..." : "Save Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
