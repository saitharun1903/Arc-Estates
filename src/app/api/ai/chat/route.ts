import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAIProvider } from "@/lib/ai/provider";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { history = [], message, sessionId = "session-guest" } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "A message string is required." },
        { status: 400 }
      );
    }

    const provider = getAIProvider();
    const response = await provider.processChat(history, message);

    // If a phone number / lead was detected, auto-capture into CRM
    if (response.extractedLead?.phone) {
      try {
        await prisma.lead.create({
          data: {
            name: response.extractedLead.name || "AI Inquirer",
            phone: response.extractedLead.phone,
            budget: response.extractedLead.budget || null,
            propertyType: response.extractedLead.propertyType || null,
            bedrooms: response.extractedLead.bedrooms || null,
            interest: response.extractedLead.interest || message,
            source: "AI Assistant",
            status: "New",
            notes: "Lead captured automatically by ARC Avenue AI Property Consultant.",
          },
        });
      } catch (leadErr) {
        console.error("Auto-lead capture error (ignored to preserve chat flow):", leadErr);
      }
    }

    // Save dialogue in AI Conversation logs for admin auditing
    try {
      let conversation = await prisma.aIConversation.findFirst({
        where: { visitorSessionId: sessionId },
      });

      if (!conversation) {
        conversation = await prisma.aIConversation.create({
          data: {
            visitorSessionId: sessionId,
            summary: `Query about: ${message.slice(0, 80)}`,
          },
        });
      }

      await prisma.aIMessage.createMany({
        data: [
          {
            conversationId: conversation.id,
            sender: "user",
            text: message,
          },
          {
            conversationId: conversation.id,
            sender: "assistant",
            text: response.message,
          },
        ],
      });
    } catch (convoErr) {
      console.error("AI Conversation log error:", convoErr);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("AI Chat API Error:", error);
    return NextResponse.json(
      {
        message:
          "Thank you for contacting ARC Avenue. For immediate architectural guidance, please contact our direct desk at 080085 32333.",
      },
      { status: 200 }
    );
  }
}
