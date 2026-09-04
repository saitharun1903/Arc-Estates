import prisma from "@/lib/db";
import { sortProjectsCanonically } from "@/lib/projects-order";
import HomeClient from "./home-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projectsRaw, settingsRaw] = await Promise.all([
    prisma.project.findMany(),
    prisma.siteSettings.findUnique({
      where: { id: "default" },
    }),
  ]);

  const projects = sortProjectsCanonically(
    projectsRaw.map((p) => ({
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
    }))
  );

  const settings = {
    companyName: settingsRaw?.companyName || "ARC AVENUE",
    tagline: settingsRaw?.tagline || "Real Estate Builders & Construction Company",
    address:
      settingsRaw?.address ||
      "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
    phone: settingsRaw?.phone || "080085 32333",
    whatsapp: settingsRaw?.whatsapp || "+918008532333",
    googleRating: settingsRaw?.googleRating || "5.0",
    googleReviewsCount: settingsRaw?.googleReviewsCount || "14",
    heroHeadline: settingsRaw?.heroHeadline || "BUILDING SPACES THAT MOVE PEOPLE.",
    heroSubhead:
      settingsRaw?.heroSubhead ||
      "Real Estate Builders & Construction Company — Bahadurpally, Hyderabad",
    aboutSnippet:
      settingsRaw?.aboutSnippet ||
      "At ARC Avenue, architectural precision converges with structural integrity. We engineer enduring residential environments rooted in timeless design, verified craftsmanship, and unwavering transparency.",
  };

  return <HomeClient projects={projects} settings={settings} />;
}
