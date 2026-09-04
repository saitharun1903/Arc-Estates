import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AIConversationsClient from "./ai-conversations-client";

export const dynamic = "force-dynamic";

export default async function AdminAIConversationsPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const conversationsRaw = await prisma.aIConversation.findMany({
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const conversations = conversationsRaw.map((c) => ({
    id: c.id,
    visitorSessionId: c.visitorSessionId,
    visitorName: c.visitorName,
    visitorPhone: c.visitorPhone,
    leadCaptured: c.leadCaptured,
    summary: c.summary,
    createdAt: c.createdAt.toISOString().split("T")[0],
    messages: c.messages.map((m) => ({
      id: m.id,
      sender: m.sender,
      text: m.text,
      createdAt: m.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    })),
  }));

  return <AIConversationsClient conversations={conversations} />;
}
