import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./project-detail-client";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) return { title: "Project Not Found | ARC AVENUE" };

  return {
    title: `${project.name} | ARC AVENUE Real Estate Hyderabad`,
    description: project.description.slice(0, 160),
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.description.slice(0, 160),
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const [projectRaw, settingsRaw] = await Promise.all([
    prisma.project.findUnique({
      where: { slug: params.slug },
      include: {
        floorPlans: true,
        brochures: true,
        properties: true,
      },
    }),
    prisma.siteSettings.findUnique({
      where: { id: "default" },
    }),
  ]);

  if (!projectRaw) {
    notFound();
  }

  let parsedAmenities: string[] = [];
  try {
    parsedAmenities = JSON.parse(projectRaw.amenities);
  } catch {
    parsedAmenities = [];
  }

  let parsedSpecs: Array<{ category: string; items: string[] }> = [];
  try {
    parsedSpecs = JSON.parse(projectRaw.specifications);
  } catch {
    parsedSpecs = [];
  }

  let parsedGallery: string[] = [];
  try {
    parsedGallery = JSON.parse(projectRaw.galleryImages);
  } catch {
    parsedGallery = [];
  }

  let parsedMilestones: Array<{ phase: string; date: string; status: string }> = [];
  if (projectRaw.progressMilestones) {
    try {
      parsedMilestones = JSON.parse(projectRaw.progressMilestones);
    } catch {
      parsedMilestones = [];
    }
  }

  const project = {
    id: projectRaw.id,
    name: projectRaw.name,
    slug: projectRaw.slug,
    tagline: projectRaw.tagline,
    description: projectRaw.description,
    location: projectRaw.location,
    status: projectRaw.status,
    projectType: projectRaw.projectType,
    heroImage: projectRaw.heroImage,
    galleryImages: parsedGallery,
    areaRange: projectRaw.areaRange,
    bedrooms: projectRaw.bedrooms,
    totalUnits: projectRaw.totalUnits,
    priceRange: projectRaw.priceRange,
    completionYear: projectRaw.completionYear,
    constructionProgress: projectRaw.constructionProgress,
    amenities: parsedAmenities,
    specifications: parsedSpecs,
    progressMilestones: parsedMilestones,
    floorPlans: projectRaw.floorPlans.map((fp) => ({
      id: fp.id,
      name: fp.name,
      bhk: fp.bhk,
      areaSqFt: fp.areaSqFt,
      facing: fp.facing,
      imageUrl: fp.imageUrl,
      description: fp.description,
      demo: fp.demo,
    })),
    brochures: projectRaw.brochures.map((b) => ({
      id: b.id,
      title: b.title,
      fileUrl: b.fileUrl,
      fileSize: b.fileSize,
    })),
    demo: projectRaw.demo,
  };

  const settings = {
    phone: settingsRaw?.phone || "080085 32333",
    whatsapp: settingsRaw?.whatsapp || "+918008532333",
    address: settingsRaw?.address || "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
  };

  return <ProjectDetailClient project={project} settings={settings} />;
}
