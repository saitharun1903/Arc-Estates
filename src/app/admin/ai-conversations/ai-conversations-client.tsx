"use client";

import React, { useState } from "react";
import AdminHeader from "@/components/admin/admin-header";
import { Bot, User, MessageSquare, Clock, CheckCircle2 } from "lucide-react";

interface AIConvoItem {
  id: string;
  visitorSessionId: string;
  visitorName?: string | null;
  visitorPhone?: string | null;
  leadCaptured: boolean;
  summary?: string | null;
  createdAt: string;
  messages: Array<{
    id: string;
    sender: string;
    text: string;
    createdAt: string;
  }>;
}

interface AIConversationsClientProps {
  conversations: AIConvoItem[];
}

export default function AIConversationsClient({
  conversations,
}: AIConversationsClientProps) {
  const [selectedConvo, setSelectedConvo] = useState<AIConvoItem | null>(
    conversations[0] || null
  );

  return (
    <div className="space-y-6 pb-16">
      <AdminHeader
        title="AI Property Consultant Transcripts"
        subtitle="Review prospective customer questions, automated lead qualifications, and chat history"
      />

      <div className="px-6 max-w-7xl mx-auto space-y-6">
        {conversations.length === 0 ? (
          <div className="p-16 text-center bg-[#12151A] border border-white/10 rounded-2xl space-y-3">
            <Bot className="w-10 h-10 text-[#8C8983] mx-auto opacity-40" />
            <h3 className="font-serif text-lg text-white">No conversation sessions logged yet</h3>
            <p className="text-xs text-[#8C8983]">
              Visitor interactions with the AI Property Consultant on the public site will appear here in real-time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Conversations List */}
            <div className="lg:col-span-5 bg-[#12151A] border border-white/10 rounded-xl overflow-hidden shadow-xl divide-y divide-white/5">
              <div className="p-4 bg-[#161920] border-b border-white/5 text-xs font-mono text-[#8C8983] uppercase tracking-wider">
                Active Dialogue Sessions ({conversations.length})
              </div>
              {conversations.map((convo) => {
                const isSelected = selectedConvo?.id === convo.id;
                return (
                  <button
                    key={convo.id}
                    onClick={() => setSelectedConvo(convo)}
                    className={`w-full p-4 text-left transition-colors flex flex-col space-y-2 ${
                      isSelected
                        ? "bg-[#1E242C] border-l-2 border-[#C5A880]"
                        : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#C5A880] truncate max-w-[200px]">
                        {convo.visitorName || convo.visitorSessionId}
                      </span>
                      <span className="text-[10px] font-mono text-[#787570]">
                        {convo.createdAt}
                      </span>
                    </div>

                    <p className="text-xs text-[#CCC7BC] line-clamp-2">
                      {convo.summary || "Inquiry on properties & pricing"}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-[#8C8983] pt-1">
                      <span>{convo.messages.length} messages</span>
                      {convo.leadCaptured && (
                        <span className="text-emerald-400 flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Lead Captured</span>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Conversation Transcript Panel */}
            <div className="lg:col-span-7 bg-[#12151A] border border-white/10 rounded-xl overflow-hidden shadow-xl flex flex-col min-h-[500px]">
              {selectedConvo ? (
                <>
                  <div className="p-4 bg-[#161920] border-b border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-serif font-bold text-sm text-white">
                        Session Transcript: {selectedConvo.visitorSessionId}
                      </div>
                      <div className="text-[10px] font-mono text-[#8C8983]">
                        Captured on {selectedConvo.createdAt}
                      </div>
                    </div>
                    {selectedConvo.visitorPhone && (
                      <span className="text-xs font-mono text-[#C5A880]">
                        Tel: {selectedConvo.visitorPhone}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 overflow-y-auto space-y-4 max-h-[600px]">
                    {selectedConvo.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          msg.sender === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div className="flex items-start space-x-2 max-w-[85%]">
                          {msg.sender === "assistant" && (
                            <div className="w-6 h-6 rounded-full bg-[#1C2026] text-[#C5A880] flex items-center justify-center shrink-0 mt-1">
                              <Bot className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <div
                            className={`p-3 rounded-xl text-xs leading-relaxed ${
                              msg.sender === "user"
                                ? "bg-[#C5A880] text-[#0C0E10] font-medium"
                                : "bg-[#181C23] border border-white/5 text-[#E6E2D8]"
                            }`}
                          >
                            {msg.text}
                          </div>
                          {msg.sender === "user" && (
                            <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shrink-0 mt-1">
                              <User className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-12 text-center text-[#8C8983] text-xs">
                  Select a session from the left to view transcript.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
