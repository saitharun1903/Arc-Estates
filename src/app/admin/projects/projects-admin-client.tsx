"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/admin-header";
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Star,
  Shield,
  Layers,
} from "lucide-react";

interface AdminProjectItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  location: string;
  status: string;
  projectType: string;
  heroImage: string;
  areaRange: string;
  bedrooms: string;
  priceRange: string;
  featured: boolean;
  demo: boolean;
  constructionProgress: number;
  _count: {
    properties: number;
    leads: number;
    siteVisits: number;
  };
}

interface ProjectsAdminClientProps {
  initialProjects: AdminProjectItem[];
}

export default function ProjectsAdminClient({ initialProjects }: ProjectsAdminClientProps) {
  const [projects, setProjects] = useState<AdminProjectItem[]>(initialProjects);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This will remove related floor plans and properties.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentFeatured }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, featured: !currentFeatured } : p))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <AdminHeader
        title="Developments Portfolio Management"
        subtitle="Manage master project dossiers, construction milestones, floor plans, and pricing"
        actionText="Add New Development"
        actionHref="/admin/projects/new"
      />

      <div className="px-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#12151A] border border-white/10 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Image Header */}
                <div className="relative aspect-[16/9] bg-[#161920]">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.heroImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151A] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/70 border border-white/10 text-[#C5A880]">
                      {project.status}
                    </span>

                    {project.demo && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/70 text-[#8C8983] border border-white/10">
                        DEMO PROJECT
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-mono font-bold text-white bg-[#0C0E10]/90 px-2.5 py-1 rounded border border-white/10">
                      {project.priceRange}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white">{project.name}</h3>
                      <p className="text-xs text-[#C5A880] font-mono">{project.projectType}</p>
                    </div>
                    <button
                      onClick={() => handleToggleFeatured(project.id, project.featured)}
                      className={`p-1.5 rounded transition-colors ${
                        project.featured
                          ? "text-amber-400 bg-amber-500/10"
                          : "text-[#5A5853] hover:text-white"
                      }`}
                      title={project.featured ? "Featured on Home" : "Set as Featured"}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <p className="text-xs text-[#8C8983] line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  <div className="p-3 rounded-lg bg-[#161920] border border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between text-[#8C8983]">
                      <span>Progress:</span>
                      <span className="font-mono text-white">{project.constructionProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#0C0E10] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C5A880] rounded-full"
                        style={{ width: `${project.constructionProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-[#8C8983] pt-1">
                      <span>{project._count.properties} Units Listed</span>
                      <span>{project._count.siteVisits} Visits Booked</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 border-t border-white/5 bg-[#14171D] flex items-center justify-between text-xs">
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="text-[#C5A880] hover:underline flex items-center space-x-1"
                >
                  <span>View Public Page</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="p-1.5 text-white hover:bg-white/10 rounded"
                    title="Edit Project"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleDelete(project.id, project.name)}
                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
