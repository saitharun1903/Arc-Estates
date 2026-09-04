"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/admin-header";
import { Plus, Trash2, Home, BedDouble, Bath, Maximize2, X, Check } from "lucide-react";

interface AdminPropertyItem {
  id: string;
  title: string;
  unitNumber?: string | null;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  price: string;
  status: string;
  floor?: string | null;
  facing?: string | null;
  featuredImage: string;
  projectName?: string;
  demo?: boolean;
}

interface ProjectOption {
  id: string;
  name: string;
}

interface PropertiesAdminClientProps {
  initialProperties: AdminPropertyItem[];
  projects: ProjectOption[];
}

export default function PropertiesAdminClient({
  initialProperties,
  projects,
}: PropertiesAdminClientProps) {
  const [properties, setProperties] = useState<AdminPropertyItem[]>(initialProperties);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    projectId: projects[0]?.id || "",
    unitNumber: "",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2150,
    price: "₹1.85 Cr",
    status: "Available",
    floor: "5th Floor",
    facing: "East",
    featuredImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    demo: false,
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property unit from inventory?")) return;
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.property) {
        const proj = projects.find((p) => p.id === form.projectId);
        setProperties([
          {
            ...data.property,
            projectName: proj?.name || "ARC Project",
          },
          ...properties,
        ]);
        setModalOpen(false);
        setForm({
          title: "",
          projectId: projects[0]?.id || "",
          unitNumber: "",
          propertyType: "Apartment",
          bedrooms: 3,
          bathrooms: 3,
          areaSqFt: 2150,
          price: "₹1.85 Cr",
          status: "Available",
          floor: "5th Floor",
          facing: "East",
          featuredImage:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
          demo: false,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <AdminHeader
        title="Property Inventory Manager"
        subtitle="Manage available, reserved, and sold units across all ARC developments"
        actionText="Add Inventory Unit"
        onActionClick={() => setModalOpen(true)}
      />

      <div className="px-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="bg-[#12151A] border border-white/10 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] bg-[#161920]">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${prop.featuredImage})` }}
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-[#C5A880] border border-white/10">
                      {prop.propertyType}
                    </span>
                    {prop.unitNumber && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C5A880] text-black font-bold">
                        {prop.unitNumber}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs font-mono font-bold text-white bg-[#0C0E10]/90 px-2.5 py-1 rounded border border-white/10">
                      {prop.price}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[10px] font-mono uppercase text-[#C5A880]">
                    {prop.projectName}
                  </div>
                  <h3 className="font-serif font-bold text-base text-white">{prop.title}</h3>
                  <div className="text-xs text-[#8C8983] font-mono">
                    {prop.floor} • {prop.facing} Facing
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-xs text-[#CCC7BC] font-mono">
                    <div className="flex items-center space-x-1">
                      <BedDouble className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{prop.bedrooms} BHK</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bath className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{prop.bathrooms} Bath</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{prop.areaSqFt} sft</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-white/5 bg-[#14171D] flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-semibold">{prop.status}</span>
                <button
                  onClick={() => handleDelete(prop.id)}
                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  title="Delete unit"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Unit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#14171C] border border-white/15 rounded-xl p-6 w-full max-w-xl space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="font-serif font-bold text-lg text-white">Add Inventory Residence</h4>
              <button onClick={() => setModalOpen(false)} className="text-[#8C8983] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Title / Listing Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ARC Vista - Unit 804 (East Facing)"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Development *
                  </label>
                  <select
                    value={form.projectId}
                    onChange={(e) => setForm({ ...form, projectId: e.target.value })}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Unit Number
                  </label>
                  <input
                    type="text"
                    placeholder="V-804"
                    value={form.unitNumber}
                    onChange={(e) => setForm({ ...form, unitNumber: e.target.value })}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Typology
                  </label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Price *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="₹1.95 Cr"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={form.bedrooms}
                    onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={form.bathrooms}
                    onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Area (sq.ft)
                  </label>
                  <input
                    type="number"
                    value={form.areaSqFt}
                    onChange={(e) => setForm({ ...form, areaSqFt: Number(e.target.value) })}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={form.featuredImage}
                    onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-white/10 text-xs text-[#CCC7BC] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#C5A880] hover:bg-[#B38F5B] text-[#0C0E10] text-xs font-bold uppercase tracking-wider rounded"
                >
                  {loading ? "Adding..." : "Add to Inventory"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
