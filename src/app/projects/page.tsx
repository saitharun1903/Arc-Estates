import { getProjects } from "@/lib/data-service";
import ProjectsClient from "./projects-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Developments Portfolio | ARC AVENUE Builders & Construction Hyderabad",
  description:
    "Explore ARC Avenue's architectural residential developments in Bahadurpally, Hyderabad. High-rise sky residences, courtyard villas, and commercial landmarks.",
};

export default async function ProjectsPage() {
  const projectsRaw = await getProjects();

  const projects = projectsRaw.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    tagline: p.tagline,
    description: p.description,
    location: p.location,
    status: p.status,
    projectType: p.projectType,
    heroImage: p.heroImage,
    areaRange: p.areaRange,
    bedrooms: p.bedrooms,
    priceRange: p.priceRange,
    completionYear: p.completionYear,
    totalUnits: p.totalUnits,
    constructionProgress: p.constructionProgress,
    demo: p.demo,
  }));

  return <ProjectsClient initialProjects={projects} />;
}
