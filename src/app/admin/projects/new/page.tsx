"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/admin-header";
import { ArrowLeft, Save, Building2, Upload } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    location: "Doolapally Road, Bahadurpally, Hyderabad",
    status: "Ongoing",
    projectType: "Residential High-Rise",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    areaRange: "2,000 - 3,500 sq.ft",
    bedrooms: "3 & 4 BHK",
    totalUnits: "48 Signature Units",
    priceRange: "₹1.90 Cr - ₹3.20 Cr",
    completionYear: "December 2026",
    constructionProgress: 35,
    featured: false,
    demo: false, // New projects created by client default to real!
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create project");

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save development");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <AdminHeader
        title="Add New Development"
        subtitle="Publish a new residential or commercial project to the live public platform"
      />

      <div className="px-6 max-w-4xl mx-auto space-y-6">
        <Link
          href="/admin/projects"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#8C8983] hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects List</span>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-[#12151A] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6"
        >
          {error && (
            <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ARC Pinnacle"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Architectural Tagline *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ultra-Luxury Sky Residences Overlooking Bahadurpally Greens"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Project Description *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe spatial orientation, daylight design, balcony dimensions, and finishes..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg p-3 text-sm text-white focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Project Typology
              </label>
              <select
                value={form.projectType}
                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 text-sm text-white rounded-lg px-3 py-2.5 focus:outline-none"
              >
                <option value="Residential High-Rise">Residential High-Rise</option>
                <option value="Luxury Gated Villas">Luxury Gated Villas</option>
                <option value="Boutique Residences">Boutique Residences</option>
                <option value="Commercial & Retail">Commercial & Retail</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 text-sm text-white rounded-lg px-3 py-2.5 focus:outline-none"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Upcoming">Upcoming Launch</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Bedrooms Config
              </label>
              <input
                type="text"
                placeholder="3 & 4 BHK"
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Area Range
              </label>
              <input
                type="text"
                placeholder="2,150 - 3,450 sq.ft"
                value={form.areaRange}
                onChange={(e) => setForm({ ...form, areaRange: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Price Range
              </label>
              <input
                type="text"
                placeholder="₹1.85 Cr - ₹3.10 Cr"
                value={form.priceRange}
                onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Total Units
              </label>
              <input
                type="text"
                placeholder="72 Sky Residences"
                value={form.totalUnits}
                onChange={(e) => setForm({ ...form, totalUnits: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Location & Landmarks
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Hero Image URL
              </label>
              <input
                type="url"
                required
                value={form.heroImage}
                onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Construction Progress ({form.constructionProgress}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={form.constructionProgress}
                onChange={(e) =>
                  setForm({ ...form, constructionProgress: Number(e.target.value) })
                }
                className="w-full accent-[#C5A880]"
              />
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded bg-[#181C23] border-white/20 text-[#C5A880]"
              />
              <label htmlFor="featured" className="text-xs text-white cursor-pointer">
                Feature on Homepage Carousel
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
            <Link
              href="/admin/projects"
              className="px-5 py-2.5 border border-white/10 hover:border-white/30 text-xs text-[#CCC7BC] rounded"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] text-xs font-bold uppercase tracking-wider rounded shadow flex items-center space-x-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{loading ? "Publishing..." : "Publish Project"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
