"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/admin-header";
import { Plus, Star, X } from "lucide-react";

interface TestimonialItem {
  id: string;
  clientName: string;
  role?: string | null;
  content: string;
  rating: number;
  projectMentioned?: string | null;
  demo: boolean;
}

interface TestimonialsAdminClientProps {
  initialTestimonials: TestimonialItem[];
}

export default function TestimonialsAdminClient({
  initialTestimonials,
}: TestimonialsAdminClientProps) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [clientName, setClientName] = useState("");
  const [role, setRole] = useState("Homeowner");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [projectMentioned, setProjectMentioned] = useState("ARC Vista");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName, role, content, rating, projectMentioned }),
      });

      const data = await res.json();
      if (res.ok && data.testimonial) {
        setTestimonials([data.testimonial, ...testimonials]);
        setModalOpen(false);
        setClientName("");
        setContent("");
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
        title="Client Reviews & Trust Testimonials"
        subtitle="Manage homeowner feedback, consultant assessments, and trust credentials"
        actionText="Add Testimonial"
        onActionClick={() => setModalOpen(true)}
      />

      <div className="px-6 max-w-5xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-xl bg-[#12151A] border border-white/10 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  {t.projectMentioned && (
                    <span className="text-[10px] font-mono text-[#C5A880] px-2 py-0.5 rounded bg-[#1C2026]">
                      {t.projectMentioned}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#CCC7BC] leading-relaxed italic">
                  “{t.content}”
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="font-bold text-white">{t.clientName}</span>
                <span className="text-[#8C8983]">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#14171C] border border-white/15 rounded-xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="font-serif font-bold text-base text-white">Add Client Review</h4>
              <button onClick={() => setModalOpen(false)} className="text-[#8C8983] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Rao"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Resident, ARC Haven"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Project Mentioned
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ARC Vista"
                    value={projectMentioned}
                    onChange={(e) => setProjectMentioned(e.target.value)}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                    Rating (1-5 Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                  Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Review statement regarding build quality, transparency, or architectural finish..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2 text-xs text-white resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
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
                  {loading ? "Adding..." : "Add Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
