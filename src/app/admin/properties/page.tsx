import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import PropertiesAdminClient from "./properties-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const [propertiesRaw, projectsRaw] = await Promise.all([
    prisma.property.findMany({
      include: {
        project: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const properties = propertiesRaw.map((p) => ({
    id: p.id,
    title: p.title,
    unitNumber: p.unitNumber,
    propertyType: p.propertyType,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    areaSqFt: p.areaSqFt,
    price: p.price,
    status: p.status,
    floor: p.floor,
    facing: p.facing,
    featuredImage: p.featuredImage,
    projectName: p.project?.name,
    demo: p.demo,
  }));

  return (
    <PropertiesAdminClient
      initialProperties={properties}
      projects={projectsRaw}
    />
  );
}
