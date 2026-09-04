"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/admin-header";
import { Save, CheckCircle2 } from "lucide-react";

interface ContentData {
  heroHeadline: string;
  heroSubhead: string;
  aboutSnippet: string;
  tagline: string;
}

interface ContentAdminClientProps {
  initialContent: ContentData;
}

export default function ContentAdminClient({ initialContent }: ContentAdminClientProps) {
  const [form, setForm] = useState(initialContent);
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

      if (!res.ok) throw new Error("Failed to update website content");
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to save content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <AdminHeader
        title="Public Website Copy & Narrative"
        subtitle="Manage brand copy, hero headlines, architectural philosophy, and editorial text"
      />

      <div className="px-6 max-w-4xl mx-auto space-y-6">
        <form
          onSubmit={handleSubmit}
          className="bg-[#12151A] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6"
        >
          {saved && (
            <div className="p-3.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Website copy successfully updated and live on public site!</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Company Architectural Tagline
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Hero Display Headline
              </label>
              <input
                type="text"
                value={form.heroHeadline}
                onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Hero Subheading / Location Text
              </label>
              <input
                type="text"
                value={form.heroSubhead}
                onChange={(e) => setForm({ ...form, heroSubhead: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Brand Editorial Mission / Philosophy Statement
              </label>
              <textarea
                rows={4}
                value={form.aboutSnippet}
                onChange={(e) => setForm({ ...form, aboutSnippet: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg p-3 text-sm text-white focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] text-xs font-bold uppercase tracking-wider rounded shadow flex items-center space-x-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{loading ? "Saving Copy..." : "Save & Update Public Website"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
