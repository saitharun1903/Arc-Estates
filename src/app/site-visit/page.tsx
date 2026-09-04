import { getProjects, getSiteSettings } from "@/lib/data-service";
import SiteVisitClient from "./site-visit-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Schedule Site Visit | ARC AVENUE Builders Bahadurpally",
  description:
    "Book a private site visit and structural engineering tour of ARC Avenue projects in Bahadurpally, Hyderabad.",
};

export default async function SiteVisitPage() {
  const [projectsRaw, settings] = await Promise.all([
    getProjects(),
    getSiteSettings(),
  ]);

  const projects = projectsRaw.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    location: p.location,
  }));

  return (
    <SiteVisitClient
      projects={projects}
      defaultPhone={settings?.phone || "080085 32333"}
      defaultAddress={settings?.address}
    />
  );
}
