"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/admin-header";
import { Plus, Trash2, HelpCircle, X, Check } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQsAdminClientProps {
  initialFaqs: FAQItem[];
}

export default function FAQsAdminClient({ initialFaqs }: FAQsAdminClientProps) {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer, category }),
      });

      const data = await res.json();
      if (res.ok && data.faq) {
        setFaqs([...faqs, data.faq]);
        setModalOpen(false);
        setQuestion("");
        setAnswer("");
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
        title="Knowledge Base & FAQs"
        subtitle="Manage frequently asked questions regarding construction, bookings, and legal clearances"
        actionText="Add New FAQ"
        onActionClick={() => setModalOpen(true)}
      />

      <div className="px-6 max-w-5xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-5 rounded-xl bg-[#12151A] border border-white/10 space-y-2 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1C2026] text-[#C5A880] uppercase">
                  {faq.category}
                </span>
                <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                  {faq.question}
                </h4>
              </div>
            </div>
            <p className="text-xs text-[#CCC7BC] leading-relaxed pt-1 font-light">{faq.answer}</p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#14171C] border border-white/15 rounded-xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="font-serif font-bold text-base text-white">Add FAQ Entry</h4>
              <button onClick={() => setModalOpen(false)} className="text-[#8C8983] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                >
                  <option value="General">General</option>
                  <option value="Construction">Construction Quality</option>
                  <option value="Booking">Site Visit & Booking</option>
                  <option value="Legal">Legal & Clearances</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. What is the ceiling height in ARC Vista sky residences?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#8C8983] mb-1">
                  Detailed Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide precise architectural and engineering details..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full bg-[#0C0E10] border border-white/10 rounded-lg p-2.5 text-xs text-white resize-none"
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
                  {loading ? "Adding..." : "Add FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
