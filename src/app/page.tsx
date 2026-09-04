import { getProjects, getSiteSettings } from "@/lib/data-service";
import HomeClient from "./home-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projectsRaw, settings] = await Promise.all([
    getProjects(),
    getSiteSettings(),
  ]);

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
    demo: p.demo,
  }));

  return <HomeClient projects={projects} settings={settings} />;
}
