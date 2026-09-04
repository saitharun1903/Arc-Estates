"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingActions from "@/components/floating-actions";
import AIChatDrawer from "@/components/ai-chat-drawer";
import VoiceAgentModal from "@/components/voice-agent-modal";
import SiteVisitModal from "@/components/site-visit-modal";
import PageIntro from "@/components/ui/page-intro";
import { usePathname } from "next/navigation";

interface SettingsData {
  companyName: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  googleRating: string;
  googleReviewsCount: string;
  heroHeadline: string;
  heroSubhead: string;
}

interface LayoutClientWrapperProps {
  children: React.ReactNode;
  settings: SettingsData;
}

export default function LayoutClientWrapper({
  children,
  settings,
}: LayoutClientWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  const [aiOpen, setAiOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [visitProjectSlug, setVisitProjectSlug] = useState("arc-vista");

  // Global listener for site visit concierge modal triggers
  useEffect(() => {
    const handleOpenVisit = (e: Event) => {
      const customEv = e as CustomEvent<{ projectSlug?: string }>;
      if (customEv.detail?.projectSlug) {
        setVisitProjectSlug(customEv.detail.projectSlug);
      }
      setVisitModalOpen(true);
    };

    window.addEventListener("open-site-visit", handleOpenVisit);
    return () => {
      window.removeEventListener("open-site-visit", handleOpenVisit);
    };
  }, []);

  // If in admin dashboard, let the admin layout handle its own chrome
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Cinematic First-Load Page Intro */}
      <PageIntro />

      <Navbar
        companyPhone={settings.phone}
        onOpenAI={() => setAiOpen(true)}
      />

      <main className="flex-1">{children}</main>

      <Footer settings={settings} />

      {/* Unified Floating Advisory Launcher with GlowBorder */}
      <FloatingActions
        whatsapp={settings.whatsapp}
        phone={settings.phone}
        onOpenAI={() => setAiOpen(true)}
        onOpenVoicePreview={() => setVoiceOpen(true)}
      />

      {/* Interactive AI Property Consultant Drawer */}
      <AIChatDrawer
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
      />

      {/* VoiceOps Staged Preview Modal */}
      <VoiceAgentModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        phone={settings.phone}
      />

      {/* 5-Step Site Visit Concierge Modal */}
      <SiteVisitModal
        isOpen={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
        defaultProject={visitProjectSlug}
      />
    </>
  );
}
