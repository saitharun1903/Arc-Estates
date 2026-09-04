"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  Building2,
  User,
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

const PROJECTS = [
  { id: "arc-vista", name: "ARC Vista Sky Residences", type: "High-Rise • 3 & 4 BHK" },
  { id: "arc-haven", name: "ARC Haven Luxury Villas", type: "Courtyard Villas • 4 & 5 BHK" },
  { id: "arc-terrace", name: "ARC Terrace Residences", type: "Boutique Terraced • Ready to Move" },
  { id: "arc-origin", name: "ARC Origin Commercial", type: "Retail & Commercial Landmark" },
];

const TIME_SLOTS = [
  { time: "10:30 AM", label: "Morning Daylight Inspection", desc: "Best for natural airflow & spatial orientation" },
  { time: "02:30 PM", label: "Midday Structural Review", desc: "Inspect concrete framing & civil joinery" },
  { time: "05:00 PM", label: "Sunset Ambient Tour", desc: "Experience terrace sunset & Bahadurpally horizon" },
];

export default function SiteVisitModal({
  isOpen,
  onClose,
  defaultProject = "arc-vista",
}: SiteVisitModalProps) {
  const [step, setStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:30 AM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setConfirmed(false);
      setErrorMsg("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    setErrorMsg("");
    if (step === 1 && !selectedProject) {
      setErrorMsg("Please select a development.");
      return;
    }
    if (step === 2 && !selectedDate) {
      setErrorMsg("Please select an inspection date.");
      return;
    }
    if (step === 3 && !selectedTime) {
      setErrorMsg("Please select a preferred time slot.");
      return;
    }
    if (step === 4) {
      if (!name.trim()) {
        setErrorMsg("Please provide your full name.");
        return;
      }
      if (phone.replace(/\D/g, "").length < 10) {
        setErrorMsg("Please enter a valid 10-digit phone number.");
        return;
      }
      handleSubmit();
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/site-visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          projectSlug: selectedProject,
          visitDate: selectedDate,
          timeSlot: selectedTime,
          notes: notes.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to reserve site visit. Please try again.");
      }

      setConfirmed(true);
      setStep(5);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const chosenProjectObj = PROJECTS.find((p) => p.id === selectedProject);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col space-y-6 text-foreground"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-accent">
              <Sparkles className="w-3 h-3" />
              <span>ARC PRIVATE CONCIERGE</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
              Schedule Site Briefing
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Dots */}
        {!confirmed && (
          <div className="flex items-center justify-between px-1">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center space-x-2 flex-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                    step === s
                      ? "bg-accent text-accent-foreground"
                      : step > s
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                      : "bg-surface-muted text-foreground-muted border border-border"
                  }`}
                >
                  {step > s ? "✓" : `0${s}`}
                </div>
                {s < 4 && (
                  <div
                    className={`h-[1px] flex-1 mr-2 transition-colors ${
                      step > s ? "bg-emerald-500/40" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Step Content */}
        <div className="min-h-[260px] flex flex-col justify-center">
          {/* STEP 1: Development Selection */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted block">
                01 • Select Development
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {PROJECTS.map((proj) => {
                  const isSelected = selectedProject === proj.id;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setSelectedProject(proj.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-surface-elevated border-accent shadow-sm"
                          : "bg-surface-muted border-border hover:border-accent/40 text-foreground-muted"
                      }`}
                    >
                      <div>
                        <div className={`text-sm font-semibold ${isSelected ? "text-foreground" : "text-foreground-secondary"}`}>
                          {proj.name}
                        </div>
                        <div className="text-[11px] font-mono text-foreground-muted">{proj.type}</div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-accent bg-accent" : "border-border"
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Date Selection */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted block">
                02 • Select Inspection Date
              </span>
              <div className="space-y-3">
                <label className="text-xs text-foreground-secondary block">
                  Choose your preferred date for site inspection in Bahadurpally:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-input border border-input-border focus:border-accent rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none transition-colors"
                />
                <p className="text-[11px] text-foreground-muted leading-relaxed">
                  Our project engineers host private walk-throughs Monday through Sunday between 10:00 AM and 6:30 PM.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Time Slot */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted block">
                03 • Select Time Slot
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between ${
                        isSelected
                          ? "bg-surface-elevated border-accent shadow-sm"
                          : "bg-surface-muted border-border hover:border-accent/40 text-foreground-muted"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span className={`text-sm font-semibold ${isSelected ? "text-foreground" : "text-foreground-secondary"}`}>
                            {slot.time} — {slot.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-foreground-muted font-light">{slot.desc}</p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 shrink-0 ${
                          isSelected ? "border-accent bg-accent" : "border-border"
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Contact Details */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted block">
                04 • Visitor Information
              </span>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-foreground-muted uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Venkat Reddy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-input border border-input-border focus:border-accent rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none placeholder:text-foreground-muted/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-foreground-muted uppercase mb-1">
                    Phone Number (WhatsApp Preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-input border border-input-border focus:border-accent rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none placeholder:text-foreground-muted/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-foreground-muted uppercase mb-1">
                    Special Inquiries (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Exploring 4 BHK corner unit or villa plot orientation"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-input border border-input-border focus:border-accent rounded-xl px-4 py-2 text-xs text-foreground focus:outline-none placeholder:text-foreground-muted/60"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Confirmation */}
          {step === 5 && confirmed && (
            <div className="text-center space-y-4 py-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-semibold text-foreground">
                  Site Visit Reserved
                </h4>
                <p className="text-xs text-foreground-secondary max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-foreground">{name}</strong>. Our project leadership at
                  Bahadurpally has logged your appointment.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-muted border border-border text-xs font-mono text-left space-y-1.5 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Development:</span>
                  <span className="text-foreground font-semibold">{chosenProjectObj?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Date:</span>
                  <span className="text-accent font-semibold">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-muted">Time:</span>
                  <span className="text-foreground font-semibold">{selectedTime}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/918008532333?text=Hello%20ARC%20Avenue,%20I%20have%20scheduled%20a%20site%20visit%20for%20${encodeURIComponent(
                    chosenProjectObj?.name || ""
                  )}%20on%20${selectedDate}%20at%20${selectedTime}.%20My%20name%20is%20${encodeURIComponent(name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#1BD741] hover:bg-[#18C23A] text-black font-semibold text-xs rounded-lg shadow-lg transition-colors"
                >
                  <span>Dispatch Itinerary on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {step > 1 && step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="flex items-center space-x-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              disabled={submitting}
              onClick={handleNext}
              className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-accent-foreground text-xs uppercase tracking-wider font-bold rounded-lg transition-colors flex items-center space-x-1.5 disabled:opacity-50"
            >
              <span>{submitting ? "Booking..." : step === 4 ? "Confirm Appointment" : "Next Step"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-surface-elevated hover:bg-surface-muted text-xs font-semibold text-foreground border border-border rounded-lg transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
