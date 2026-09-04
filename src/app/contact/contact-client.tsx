"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Navigation,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import LocationMap from "@/components/location-map";
import { ContactCard } from "@/components/cards";

interface ContactClientProps {
  settings: {
    companyName: string;
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
  };
}

export default function ContactClient({ settings }: ContactClientProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isCallbackRequest, setIsCallbackRequest] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("Please provide your name and phone number.");
      return;
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please provide a valid 10-digit telephone number.");
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
          message: isCallbackRequest
            ? `[URGENT CALLBACK REQUEST] ${message}`
            : message || "General enquiry submitted from Contact page.",
          source: isCallbackRequest ? "Callback Request" : "Contact Form",
          interest: isCallbackRequest ? "Requested immediate phone consultation" : "General Project Inquiries",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try calling directly.");
    } finally {
      setLoading(false);
    }
  };

  const cleanPhone = settings.phone.replace(/\s+/g, "");
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, "");

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-[#0C0E10] dark:bg-[#0C0E10] light:bg-[#F8F6F0] text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] min-h-screen space-y-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C]">
            <span>DIRECT ENGAGEMENT</span>
            <span>//</span>
            <span>HYDERABAD DESK</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
            Connect with ARC Avenue
          </h1>
          <p className="text-sm sm:text-base text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] leading-relaxed font-light">
            Whether inquiring about prospective acquisitions, scheduling an engineering walkthrough,
            or reviewing construction documentation, our advisory desk is at your service.
          </p>
        </div>

        {/* Contact Grid: Details vs Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Channels & Editorial Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-xl bg-[#101317] dark:bg-[#101317] light:bg-[#FAF8F5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] space-y-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] block">
                  PHYSICAL PRESENCE
                </span>
                <h3 className="font-serif text-2xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                  Registered Site Office
                </h3>
              </div>

              <div className="space-y-4 text-xs font-light text-[#CCC7BC] dark:text-[#CCC7BC] light:text-[#4A4740]">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] block font-medium">Headquarters & Project HQ</strong>
                    <span>{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#C5A880] dark:text-[#C5A880] light:text-[#9E7D4C] shrink-0" />
                  <div>
                    <strong className="text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] block font-medium">Operating Hours</strong>
                    <span>Monday to Sunday: 09:30 AM – 06:30 PM (IST)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Communication Channels with ContactCard */}
            <div className="grid grid-cols-1 gap-4">
              <ContactCard
                label="01 // TELEPHONE DIRECT"
                title="Office Telephone"
                detail={settings.phone}
                href={`tel:${cleanPhone}`}
              />
              <ContactCard
                label="02 // INSTANT MESSAGING"
                title="Live WhatsApp Desk"
                detail="Connect instantly for blueprints & brochures"
                href={`https://wa.me/${cleanWhatsApp}?text=Hello%20ARC%20Avenue,%20I%20would%20like%20to%20connect%20with%20an%20advisor.`}
                isExternal={true}
              />
              <ContactCard
                label="03 // OFFICIAL DISPATCH"
                title="Direct Correspondence"
                detail={settings.email}
                href={`mailto:${settings.email}`}
              />
            </div>
          </div>

          {/* Right Column: Contact & Callback Form */}
          <div className="lg:col-span-7 bg-[#101317] dark:bg-[#101317] light:bg-[#FAF8F5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] rounded-xl p-8 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                  Message Dispatched to Advisory Desk
                </h3>
                <p className="text-xs sm:text-sm text-[#CCC7BC] dark:text-[#CCC7BC] light:text-[#615E58] max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong className="text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">{name}</strong>. A senior ARC Avenue
                  relationship manager has received your submission and will contact you via{" "}
                  <strong className="text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">{phone}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setPhone("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="px-6 py-2.5 bg-white/10 dark:bg-white/10 light:bg-[#EFECE5] hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-[#E4DFD5] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] text-xs font-mono text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] rounded-lg transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-light text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D]">
                    Send an Enquiry or Request Callback
                  </h3>
                  <p className="text-xs text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] mt-1 font-light">
                    Your details are held under strict confidentiality.
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      required
                      className="w-full bg-[#181C22] dark:bg-[#181C22] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] focus:border-[#C5A880] rounded-xl px-4 py-2.5 text-sm text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] mb-1">Phone Number (10 Digits) *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="098480 12345"
                      required
                      className="w-full bg-[#181C22] dark:bg-[#181C22] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] focus:border-[#C5A880] rounded-xl px-4 py-2.5 text-sm text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rajesh@example.com"
                      className="w-full bg-[#181C22] dark:bg-[#181C22] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] focus:border-[#C5A880] rounded-xl px-4 py-2.5 text-sm text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-[#8C8983] dark:text-[#8C8983] light:text-[#615E58] mb-1">Message or Queries</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what typology or project in Bahadurpally you are inquiring about..."
                      className="w-full bg-[#181C22] dark:bg-[#181C22] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#DDD7CC] focus:border-[#C5A880] rounded-xl p-3 text-sm text-[#F4F1EA] dark:text-[#F4F1EA] light:text-[#181A1D] focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Urgent Callback Checkbox */}
                <div className="flex items-center space-x-2.5 text-xs text-[#CCC7BC] dark:text-[#CCC7BC] light:text-[#615E58]">
                  <input
                    type="checkbox"
                    id="callback"
                    checked={isCallbackRequest}
                    onChange={(e) => setIsCallbackRequest(e.target.checked)}
                    className="rounded bg-[#181C22] dark:bg-[#181C22] light:bg-[#FFFFFF] border-white/20 dark:border-white/20 light:border-[#DDD7CC] text-[#C5A880] focus:ring-0"
                  />
                  <label htmlFor="callback" className="cursor-pointer">
                    This is an urgent callback request. Please have an advisor call within 30 minutes.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-[#C5A880] dark:bg-[#C5A880] light:bg-[#9E7D4C] hover:bg-[#D4B58C] disabled:opacity-50 text-[#0C0E10] text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Submitting..." : "Send Message to ARC Avenue"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Integrated Location Section */}
        <LocationMap
          address={settings.address}
          phone={settings.phone}
          whatsapp={settings.whatsapp}
        />
      </div>
    </div>
  );
}
