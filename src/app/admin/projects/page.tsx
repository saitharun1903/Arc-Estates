import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProjectsAdminClient from "./projects-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const projectsRaw = await prisma.project.findMany({
    include: {
      _count: {
        select: { properties: true, leads: true, siteVisits: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const projects = projectsRaw.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    tagline: p.tagline,
    location: p.location,
    status: p.status,
    projectType: p.projectType,
    heroImage: p.heroImage,
    areaRange: p.areaRange,
    bedrooms: p.bedrooms,
    priceRange: p.priceRange,
    featured: p.featured,
    demo: p.demo,
    constructionProgress: p.constructionProgress,
    _count: p._count,
  }));

  return <ProjectsAdminClient initialProjects={projects} />;
}
