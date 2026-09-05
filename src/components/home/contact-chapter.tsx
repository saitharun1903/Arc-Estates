"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, ArrowUpRight } from "lucide-react";

interface ContactChapterProps {
  settings?: {
    companyName?: string;
    address?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
}

export default function ContactChapter({ settings }: ContactChapterProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const address =
    settings?.address ||
    "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043";
  const phoneNumber = settings?.phone || "080085 32333";
  const whatsappNumber = settings?.whatsapp || "+918008532333";
  const emailAddress = settings?.email || "connect@arcavenue.in";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("Please provide your full name and phone number.");
      return;
    }

    const digits = phone.replace(/D/g, "");
    if (digits.length < 10) {
      setError("Please provide a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          message: message || "Direct inquiry initiated from Homepage Contact Chapter.",
          source: "Homepage Contact Chapter",
          interest: "Residential Inquiry",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit enquiry. Please call our desk directly.");
      }
    } catch {
      setError("Network exception occurred. Please call our desk directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-28 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#0C0E10] text-[#F4F1EA] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880]">
            CLOSING CHAPTER // DIRECT ENGAGEMENT
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            Let&apos;s Build <br />
            <span className="text-[#C5A880] italic font-light font-serif">Your Next Address.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#8C8983] font-light max-w-xl">
            Whether inquiring about prospective acquisitions, scheduling an engineering walkthrough, or reviewing architectural blueprints, our advisory desk is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Physical Presence & Direct Lines */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#121519] border border-white/10 space-y-6 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] block">
                HEADQUARTERS &amp; SITE OFFICE
              </span>

              <div className="space-y-4 text-xs font-light">
                <div className="flex items-start space-x-3 text-[#CCC7BC]">
                  <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{address}</span>
                </div>
                <div className="flex items-center space-x-3 text-[#CCC7BC]">
                  <Phone className="w-5 h-5 text-[#C5A880] shrink-0" />
                  <a
                    href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                    className="hover:text-white transition-colors font-mono font-medium text-sm"
                  >
                    {phoneNumber}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-[#CCC7BC]">
                  <Mail className="w-5 h-5 text-[#C5A880] shrink-0" />
                  <a
                    href={`mailto:${emailAddress}`}
                    className="hover:text-white transition-colors font-mono"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20ARC%20Avenue,%20I%20am%20inquiring%20about%20your%20developments.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-600/50 text-emerald-300 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5"
                >
                  <span>WhatsApp Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://maps.app.goo.gl/kX7D8dJz9U1gYJ927"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded bg-[#1C2026] hover:bg-[#252B33] border border-white/15 text-white/80 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5"
                >
                  <span>Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#14171C] border border-white/10 text-xs space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C5A880]">
                OPERATING SCHEDULE
              </span>
              <p className="text-white font-serif font-bold text-sm">
                Monday to Sunday: 09:30 AM – 06:30 PM (IST)
              </p>
              <p className="text-[#8C8983]">
                Site tours operate daily with prior appointment for private engineering briefing.
              </p>
            </div>
          </div>

          {/* Right: Direct Conversation Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-2xl bg-[#121519] border border-white/10 shadow-2xl space-y-8">
              {submitted ? (
                <div className="p-10 rounded-xl bg-emerald-950/40 border border-emerald-700/60 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="font-serif text-3xl font-bold text-white">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-[#CCC7BC] max-w-md mx-auto leading-relaxed">
                    Thank you. Our chief advisory desk on Doolapally Road will review your request and connect with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setPhone("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="mt-4 px-6 py-2.5 rounded bg-[#C5A880] text-[#0A0C0E] text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#B38F5B] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880]">
                      DIRECT ADVISORY FORM
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Start a Conversation
                    </h3>
                  </div>

                  {error && (
                    <div className="p-3.5 rounded bg-rose-950/60 border border-rose-700/60 text-rose-300 text-xs font-mono">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-4 py-3 rounded-lg bg-[#0C0E10] border border-white/15 focus:border-[#C5A880] text-white text-xs placeholder:text-white/30 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                        Telephone Number (10 Digits) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 098480 12345"
                        className="w-full px-4 py-3 rounded-lg bg-[#0C0E10] border border-white/15 focus:border-[#C5A880] text-white text-xs placeholder:text-white/30 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rajesh@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#0C0E10] border border-white/15 focus:border-[#C5A880] text-white text-xs placeholder:text-white/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                      Message / Development Inquiry
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify typology preferences, square footage requirements, or scheduling availability..."
                      className="w-full px-4 py-3 rounded-lg bg-[#0C0E10] border border-white/15 focus:border-[#C5A880] text-white text-xs placeholder:text-white/30 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-[#C5A880] hover:bg-[#B38F5B] disabled:opacity-50 text-[#0A0C0E] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(197,168,128,0.2)] hover:scale-[1.01] flex items-center justify-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? "Submitting Inquiry..." : "Start a Conversation"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
