import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SiteVisitsClient from "./site-visits-client";

export const dynamic = "force-dynamic";

export default async function AdminSiteVisitsPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const visitsRaw = await prisma.siteVisit.findMany({
    include: {
      project: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const visits = visitsRaw.map((v) => ({
    id: v.id,
    visitorName: v.visitorName,
    visitorPhone: v.visitorPhone,
    visitorEmail: v.visitorEmail,
    visitDate: v.visitDate,
    visitTimeSlot: v.visitTimeSlot,
    notes: v.notes,
    status: v.status,
    projectName: v.project?.name || "ARC Avenue Project",
    projectSlug: v.project?.slug || "",
  }));

  return <SiteVisitsClient initialVisits={visits} />;
}
