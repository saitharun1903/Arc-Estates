import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminOverviewClient from "./overview-client";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [
    totalLeads,
    newLeads,
    totalVisits,
    pendingVisits,
    activeProjects,
    totalProperties,
    aiConversations,
    recentLeadsRaw,
    upcomingVisitsRaw,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "New" } }),
    prisma.siteVisit.count(),
    prisma.siteVisit.count({ where: { status: "Pending" } }),
    prisma.project.count(),
    prisma.property.count(),
    prisma.aIConversation.count(),
    prisma.lead.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.siteVisit.findMany({
      take: 5,
      include: {
        project: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = {
    totalLeads,
    newLeads,
    totalVisits,
    pendingVisits,
    activeProjects,
    totalProperties,
    aiConversations,
  };

  const recentLeads = recentLeadsRaw.map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    source: l.source,
    status: l.status,
    interest: l.interest,
    createdAt: l.createdAt.toISOString().split("T")[0],
  }));

  const upcomingVisits = upcomingVisitsRaw.map((v) => ({
    id: v.id,
    visitorName: v.visitorName,
    visitorPhone: v.visitorPhone,
    visitDate: v.visitDate,
    visitTimeSlot: v.visitTimeSlot,
    status: v.status,
    projectName: v.project?.name || "ARC Development",
  }));

  return (
    <AdminOverviewClient
      stats={stats}
      recentLeads={recentLeads}
      upcomingVisits={upcomingVisits}
    />
  );
}
