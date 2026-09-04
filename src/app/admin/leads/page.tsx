import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LeadsClient from "./leads-client";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const leadsRaw = await prisma.lead.findMany({
    include: {
      project: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const leads = leadsRaw.map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email,
    interest: l.interest,
    project: l.project,
    budget: l.budget,
    propertyType: l.propertyType,
    bedrooms: l.bedrooms,
    source: l.source,
    status: l.status,
    notes: l.notes,
    createdAt: l.createdAt.toISOString().split("T")[0],
  }));

  return <LeadsClient initialLeads={leads} />;
}
