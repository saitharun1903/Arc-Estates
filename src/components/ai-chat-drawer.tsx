"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { X, Send, Bot, User, ArrowRight, Calendar, MessageSquare, Sparkles, ExternalLink } from "lucide-react";
import { ChatMessage } from "@/lib/ai/types";
import { RecommendationCard } from "@/components/cards";

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSiteVisit?: (slug?: string) => void;
}

export default function AIChatDrawer({ isOpen, onClose, onBookSiteVisit }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Welcome to ARC Avenue. I am your personal architectural and property advisor. How can I assist you with our verified residential and commercial developments in Bahadurpally, Hyderabad?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Explore 3 & 4 BHK Sky Residences",
    "Tell me about ARC Haven Courtyard Villas",
    "Which projects are Ready to Move?",
    "Can I schedule a site visit?",
    "Connect with team on WhatsApp",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleOpenSiteVisitModal = (slug = "arc-vista") => {
    if (onBookSiteVisit) {
      onBookSiteVisit(slug);
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-site-visit", {
          detail: { projectSlug: slug },
        })
      );
    }
    onClose();
  };

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || loading) return;

    // Direct WhatsApp shortcut
    if (messageText.toLowerCase().includes("whatsapp")) {
      window.open(
        "https://wa.me/918008532333?text=Hello%20ARC%20Avenue,%20I%20am%20exploring%20your%20properties%20in%20Bahadurpally.",
        "_blank"
      );
      return;
    }

    const userMsg: ChatMessage = {
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: [...messages, userMsg],
          message: messageText,
        }),
      });

      if (!res.ok) throw new Error("Failed to process message with Gemini");
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        metadata: {
          recommendedProjects: data.recommendedProjects,
          suggestAction: data.suggestAction,
          actionProjectSlug: data.actionProjectSlug,
        },
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat drawer error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "ARC Concierge is temporarily unavailable. You can still explore our verified developments or connect directly with our advisory desk at 080085 32333.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          metadata: {
            suggestAction: "whatsapp",
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg h-full bg-surface border-l border-border flex flex-col shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-surface-elevated">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-semibold text-sm text-foreground">
                  ARC Avenue Concierge
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-foreground-muted font-mono">
                Real-time property advisor • Bahadurpally
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-foreground-muted hover:text-foreground rounded hover:bg-surface-muted transition-colors"
            aria-label="Close Concierge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-blueprint-dots">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-start space-x-2 max-w-[92%] sm:max-w-[88%]">
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-surface-muted border border-accent/40 flex items-center justify-center text-accent shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground font-medium rounded-br-none shadow-sm"
                      : "bg-surface-elevated border border-border text-foreground rounded-bl-none shadow-md"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* Project Recommendation Cards inside assistant message */}
                  {msg.metadata?.recommendedProjects && msg.metadata.recommendedProjects.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border space-y-2.5">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-accent flex items-center justify-between">
                        <span>Recommended Developments</span>
                        <span>{msg.metadata.recommendedProjects.length} Verified Match</span>
                      </div>
                      {msg.metadata.recommendedProjects.map((proj) => (
                        <RecommendationCard
                          key={proj.id}
                          project={proj}
                          reason={
                            proj.slug === "arc-vista"
                              ? "RCC shear wall construction with 8-ft cantilevered sunset terraces and high thermal protection."
                              : proj.slug === "arc-haven"
                              ? "Introspective privacy with central open-to-sky water court and 5kW solar net-metering."
                              : proj.slug === "arc-terrace"
                              ? "Ready-to-move low-density stepped garden residences near Tech Mahindra."
                              : "Prime commercial and retail connectivity along the Doolapally arterial corridor."
                          }
                          onSelect={onClose}
                        />
                      ))}
                    </div>
                  )}

                  {/* Dynamic Action CTAs */}
                  {msg.metadata?.suggestAction === "book_site_visit" && (
                    <div className="mt-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleOpenSiteVisitModal(msg.metadata?.actionProjectSlug || "arc-vista")}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground font-mono font-bold text-xs uppercase tracking-wider rounded hover:bg-accent-hover transition-colors shadow-md"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Schedule Site Inspection →</span>
                      </button>
                    </div>
                  )}

                  {msg.metadata?.suggestAction === "whatsapp" && (
                    <div className="mt-3 pt-2">
                      <a
                        href="https://wa.me/918008532333?text=Hello%20ARC%20Avenue,%20I%20am%20exploring%20your%20properties%20via%20ARC%20Concierge."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1BD741] text-black font-mono font-bold text-xs uppercase tracking-wider rounded hover:bg-[#18C33B] transition-colors shadow-md"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Talk on WhatsApp →</span>
                      </a>
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-accent/30 border border-accent flex items-center justify-center text-accent shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
              <span className="text-[9px] text-foreground-muted mt-1 font-mono px-8">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {/* Understated, Premium Loading State */}
          {loading && (
            <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-surface-elevated border border-accent/30 max-w-[85%] animate-pulse">
              <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest uppercase text-accent">
                  ARC CONCIERGE
                </span>
                <span className="text-xs text-foreground-secondary font-mono">
                  Analyzing requirements &amp; verified portfolio data...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-3 py-2 border-t border-border bg-surface flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt)}
              className="text-[11px] px-3 py-1.5 rounded-full bg-surface-elevated text-foreground-secondary hover:text-foreground hover:border-accent border border-border whitespace-nowrap transition-colors select-none font-mono"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-3 border-t border-border bg-surface-elevated flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about floor plans, budget, visits..."
            className="flex-1 bg-background border border-border focus:border-accent rounded px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground-muted focus:outline-none transition-colors font-sans"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 bg-accent hover:bg-accent-hover disabled:opacity-40 text-accent-foreground font-bold rounded transition-colors shrink-0 shadow-sm"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
