"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react";
import { FAQCard } from "@/components/cards";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQClientProps {
  faqs: FAQItem[];
  phone?: string;
  whatsapp?: string;
}

export default function FAQClient({
  faqs,
  phone = "080085 32333",
  whatsapp = "+918008532333",
}: FAQClientProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const categories = ["ALL", "General", "Construction", "Booking", "Legal"];

  const filteredFaqs = faqs.filter((faq) => {
    if (activeCategory === "ALL") return true;
    return faq.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-[#0C0E10] dark:bg-[#0C0E10] light:bg-[#F8F6F0] text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
            <span>KNOWLEDGE DESK</span>
            <span>//</span>
            <span>FAQ & CLEARANCES</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] leading-relaxed font-light">
            Answers regarding our architectural design process, engineering standards, statutory
            compliance, and site visit scheduling in Bahadurpally.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#9E7D4C] text-[#0C0E10] font-bold shadow"
                  : "bg-[#14171C] dark:bg-[#14171C] light:bg-[#EFECE5] text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] hover:text-white dark:hover:text-white light:hover:text-[#181A1D] border border-white/5 dark:border-white/5 light:border-[#DDD7CC]"
              }`}
            >
              {cat === "ALL" ? "All Questions" : cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion List with FAQCard */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, i) => (
            <FAQCard
              key={faq.id}
              index={String(i + 1).padStart(2, "0")}
              category={faq.category}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="p-8 rounded-2xl bg-[#14171C] dark:bg-[#14171C] light:bg-[#EFECE5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] text-center space-y-4 shadow-xl">
          <h3 className="font-serif text-xl font-medium text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
            Have a specific structural or legal query?
          </h3>
          <p className="text-xs text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] max-w-md mx-auto font-light leading-relaxed">
            Our civil engineers and customer relationship directors in Bahadurpally are available for
            one-on-one briefings.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#9E7D4C] hover:bg-[#D4B58C] text-[#0C0E10] text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-colors shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Office ({phone})</span>
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20ARC%20Avenue,%20I%20have%20a%20question.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 dark:text-emerald-400 light:text-emerald-700 text-xs font-mono font-semibold rounded-xl transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
