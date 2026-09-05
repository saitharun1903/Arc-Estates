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
      className="py-28 sm:py-36 px-4 sm:px-6 lg:px-12 section-ivory bg-[#FAF8F5] text-[#161513] border-b border-[#E8E3D8] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#A88656]">
            CLOSING CHAPTER // DIRECT ENGAGEMENT
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#161513] leading-[1.05]">
            Let&apos;s Build <br />
            <span className="text-[#A88656] italic font-light font-serif">Your Next Address.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A453E] font-light max-w-xl">
            Whether inquiring about prospective acquisitions, scheduling an engineering walkthrough, or reviewing architectural blueprints, our advisory desk is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Physical Presence & Direct Lines */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#FFFFFF] border border-[#E8E3D8] space-y-6 shadow-md">
              <span className="text-xs font-mono uppercase tracking-widest text-[#A88656] block">
                HEADQUARTERS &amp; SITE OFFICE
              </span>

              <div className="space-y-4 text-xs font-light">
                <div className="flex items-start space-x-3 text-[#4A453E]">
                  <MapPin className="w-5 h-5 text-[#7A756B] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{address}</span>
                </div>
                <div className="flex items-center space-x-3 text-[#4A453E]">
                  <Phone className="w-5 h-5 text-[#7A756B] shrink-0" />
                  <a
                    href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                    className="hover:text-[#161513] transition-colors font-mono font-medium text-sm text-[#161513]"
                  >
                    {phoneNumber}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-[#4A453E]">
                  <Mail className="w-5 h-5 text-[#7A756B] shrink-0" />
                  <a
                    href={`mailto:${emailAddress}`}
                    className="hover:text-[#161513] transition-colors font-mono"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E3D8] flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20ARC%20Avenue,%20I%20am%20inquiring%20about%20your%20developments.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#7E8D79]/15 hover:bg-[#7E8D79]/25 border border-[#7E8D79]/40 text-[#5B6D56] text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5 font-medium"
                >
                  <span>WhatsApp Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://maps.app.goo.gl/kX7D8dJz9U1gYJ927"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#F5F2EB] hover:bg-[#EDE8DF] border border-[#DDD7CC] text-[#161513] text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5 font-medium"
                >
                  <span>Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8E3D8] text-xs space-y-2 shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#A88656]">
                OPERATING SCHEDULE
              </span>
              <p className="text-[#161513] font-serif font-normal text-sm">
                Monday to Sunday: 09:30 AM – 06:30 PM (IST)
              </p>
              <p className="text-[#7A756B]">
                Site tours operate daily with prior appointment for private engineering briefing.
              </p>
            </div>
          </div>

          {/* Right: Direct Conversation Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-2xl bg-[#FFFFFF] border border-[#E8E3D8] shadow-xl space-y-8">
              {submitted ? (
                <div className="p-10 rounded-2xl bg-[#7E8D79]/10 border border-[#7E8D79]/40 text-center space-y-4 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-[#7E8D79] mx-auto" />
                  <h3 className="font-serif text-3xl font-normal text-[#161513]">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-[#4A453E] max-w-md mx-auto leading-relaxed">
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
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#C9A86A] text-[#121315] text-xs font-bold font-mono uppercase tracking-wider hover:bg-[#D8B77D] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#A88656]">
                      DIRECT ADVISORY FORM
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#161513]">
                      Start a Conversation
                    </h3>
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#7A756B]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-4 py-3 rounded-lg bg-[#FAF8F5] border border-[#DDD7CC] focus:border-[#A88656] text-[#161513] text-xs placeholder:text-[#9E988E] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#7A756B]">
                        Telephone Number (10 Digits) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 098480 12345"
                        className="w-full px-4 py-3 rounded-lg bg-[#FAF8F5] border border-[#DDD7CC] focus:border-[#A88656] text-[#161513] text-xs placeholder:text-[#9E988E] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#7A756B]">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rajesh@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF8F5] border border-[#DDD7CC] focus:border-[#A88656] text-[#161513] text-xs placeholder:text-[#9E988E] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#7A756B]">
                      Message / Development Inquiry
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify typology preferences, square footage requirements, or scheduling availability..."
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF8F5] border border-[#DDD7CC] focus:border-[#A88656] text-[#161513] text-xs placeholder:text-[#9E988E] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-[#C9A86A] hover:bg-[#D8B77D] disabled:opacity-50 text-[#121315] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_18px_rgba(201,168,106,0.25)] flex items-center justify-center space-x-2 cursor-pointer"
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
