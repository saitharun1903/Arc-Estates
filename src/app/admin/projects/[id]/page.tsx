import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import EditProjectClient from "./edit-project-client";

export const dynamic = "force-dynamic";

export default async function AdminEditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) notFound();

  return (
    <EditProjectClient
      project={{
        id: project.id,
        name: project.name,
        slug: project.slug,
        tagline: project.tagline,
        description: project.description,
        location: project.location,
        status: project.status,
        projectType: project.projectType,
        heroImage: project.heroImage,
        areaRange: project.areaRange,
        bedrooms: project.bedrooms,
        totalUnits: project.totalUnits,
        priceRange: project.priceRange,
        completionYear: project.completionYear,
        constructionProgress: project.constructionProgress,
        featured: project.featured,
        demo: project.demo,
      }}
    />
  );
}
