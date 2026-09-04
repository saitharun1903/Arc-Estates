"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/admin-header";
import { ArrowLeft, Save, Building2 } from "lucide-react";
import Link from "next/link";

interface ProjectData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  location: string;
  status: string;
  projectType: string;
  heroImage: string;
  areaRange: string;
  bedrooms: string;
  totalUnits: string;
  priceRange: string;
  completionYear: string;
  constructionProgress: number;
  featured: boolean;
  demo: boolean;
}

interface EditProjectClientProps {
  project: ProjectData;
}

export default function EditProjectClient({ project }: EditProjectClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(project);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update project");

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save project updates");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <AdminHeader
        title={`Edit Development — ${project.name}`}
        subtitle="Modify specifications, price range, construction timeline, and public visibility"
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
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none font-mono text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Architectural Tagline *
              </label>
              <input
                type="text"
                required
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
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 focus:border-[#C5A880] rounded-lg p-3 text-sm text-white focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Project Typology
              </label>
              <input
                type="text"
                value={form.projectType}
                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 text-sm text-white rounded-lg px-3 py-2.5 focus:outline-none"
              />
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
                Price Range
              </label>
              <input
                type="text"
                value={form.priceRange}
                onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Bedrooms Config
              </label>
              <input
                type="text"
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                className="w-full bg-[#181C23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C8983] mb-1">
                Location Address
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

            <div className="flex items-center space-x-6 pt-6">
              <label className="flex items-center space-x-2 text-xs text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded bg-[#181C23] border-white/20 text-[#C5A880]"
                />
                <span>Featured on Home</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.demo}
                  onChange={(e) => setForm({ ...form, demo: e.target.checked })}
                  className="rounded bg-[#181C23] border-white/20 text-[#C5A880]"
                />
                <span>Flag as Demo Project</span>
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
              <span>{loading ? "Saving Changes..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
