import prisma from "@/lib/db";
import {
  CANONICAL_PROJECTS,
  CANONICAL_PROPERTIES,
  CANONICAL_SETTINGS,
  CANONICAL_FAQS,
  CanonicalProject,
  CanonicalProperty,
  CanonicalSettings,
  CanonicalFAQ,
} from "./canonical-data";
import { sortProjectsCanonically } from "./projects-order";

/**
 * Robust site settings fetcher.
 * Always resolves to valid settings even if the database is uninitialized or unreachable.
 */
export async function getSiteSettings(): Promise<CanonicalSettings> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (settings) {
      return {
        companyName: settings.companyName || CANONICAL_SETTINGS.companyName,
        tagline: settings.tagline || CANONICAL_SETTINGS.tagline,
        address: settings.address || CANONICAL_SETTINGS.address,
        phone: settings.phone || CANONICAL_SETTINGS.phone,
        whatsapp: settings.whatsapp || CANONICAL_SETTINGS.whatsapp,
        email: settings.email || CANONICAL_SETTINGS.email,
        googleRating: settings.googleRating || CANONICAL_SETTINGS.googleRating,
        googleReviewsCount: settings.googleReviewsCount || CANONICAL_SETTINGS.googleReviewsCount,
        heroHeadline: settings.heroHeadline || CANONICAL_SETTINGS.heroHeadline,
        heroSubhead: settings.heroSubhead || CANONICAL_SETTINGS.heroSubhead,
        aboutSnippet: settings.aboutSnippet || CANONICAL_SETTINGS.aboutSnippet,
        whyArcPoints: settings.whyArcPoints || CANONICAL_SETTINGS.whyArcPoints,
        instagramUrl: settings.instagramUrl || CANONICAL_SETTINGS.instagramUrl,
        linkedinUrl: settings.linkedinUrl || CANONICAL_SETTINGS.linkedinUrl,
        facebookUrl: settings.facebookUrl || CANONICAL_SETTINGS.facebookUrl,
        youtubeUrl: settings.youtubeUrl || CANONICAL_SETTINGS.youtubeUrl,
      };
    }
  } catch (error) {
    console.warn("Database unavailable, using canonical site settings:", error);
  }

  return CANONICAL_SETTINGS;
}

/**
 * Robust projects fetcher.
 * Guaranteed to return the canonical projects list if database queries fail.
 */
export async function getProjects(): Promise<CanonicalProject[]> {
  try {
    const rawProjects = await prisma.project.findMany({
      include: {
        floorPlans: true,
        brochures: true,
      },
      orderBy: { createdAt: "asc" },
    });

    if (rawProjects && rawProjects.length > 0) {
      const mapped: CanonicalProject[] = rawProjects.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        tagline: p.tagline,
        description: p.description,
        location: p.location,
        status: p.status,
        projectType: p.projectType,
        heroImage: p.heroImage,
        galleryImages: p.galleryImages,
        areaRange: p.areaRange,
        bedrooms: p.bedrooms,
        totalUnits: p.totalUnits,
        priceRange: p.priceRange,
        completionYear: p.completionYear,
        featured: p.featured,
        demo: p.demo,
        constructionProgress: p.constructionProgress,
        amenities: p.amenities,
        specifications: p.specifications,
        progressMilestones: p.progressMilestones || "[]",
        floorPlans: p.floorPlans.map((fp) => ({
          id: fp.id,
          name: fp.name,
          bhk: fp.bhk,
          areaSqFt: fp.areaSqFt,
          facing: fp.facing,
          imageUrl: fp.imageUrl,
          description: fp.description,
          demo: fp.demo,
        })),
        brochures: p.brochures?.map((b) => ({
          id: b.id,
          title: b.title,
          fileUrl: b.fileUrl,
          fileSize: b.fileSize,
        })),
      }));

      return sortProjectsCanonically(mapped);
    }
  } catch (error) {
    console.warn("Database unavailable, using canonical projects:", error);
  }

  return sortProjectsCanonically(CANONICAL_PROJECTS);
}

/**
 * Robust project by slug fetcher.
 * Guaranteed to return project details or fallback to canonical project if database is unavailable.
 */
export async function getProjectBySlug(slug: string): Promise<CanonicalProject | null> {
  try {
    const p = await prisma.project.findUnique({
      where: { slug },
      include: {
        floorPlans: true,
        brochures: true,
        properties: true,
      },
    });

    if (p) {
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        tagline: p.tagline,
        description: p.description,
        location: p.location,
        status: p.status,
        projectType: p.projectType,
        heroImage: p.heroImage,
        galleryImages: p.galleryImages,
        areaRange: p.areaRange,
        bedrooms: p.bedrooms,
        totalUnits: p.totalUnits,
        priceRange: p.priceRange,
        completionYear: p.completionYear,
        featured: p.featured,
        demo: p.demo,
        constructionProgress: p.constructionProgress,
        amenities: p.amenities,
        specifications: p.specifications,
        progressMilestones: p.progressMilestones || "[]",
        floorPlans: p.floorPlans.map((fp) => ({
          id: fp.id,
          name: fp.name,
          bhk: fp.bhk,
          areaSqFt: fp.areaSqFt,
          facing: fp.facing,
          imageUrl: fp.imageUrl,
          description: fp.description,
          demo: fp.demo,
        })),
        brochures: p.brochures?.map((b) => ({
          id: b.id,
          title: b.title,
          fileUrl: b.fileUrl,
          fileSize: b.fileSize,
        })),
      };
    }
  } catch (error) {
    console.warn(`Database unavailable for project slug "${slug}", checking canonical projects:`, error);
  }

  const found = CANONICAL_PROJECTS.find((p) => p.slug === slug);
  return found || null;
}

/**
 * Robust properties fetcher.
 */
export async function getProperties(): Promise<CanonicalProperty[]> {
  try {
    const rawProps = await prisma.property.findMany({
      include: {
        project: {
          select: { name: true, slug: true, location: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (rawProps && rawProps.length > 0) {
      return rawProps.map((p) => ({
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
        demo: p.demo,
        project: p.project,
      }));
    }
  } catch (error) {
    console.warn("Database unavailable, using canonical properties:", error);
  }

  return CANONICAL_PROPERTIES;
}

/**
 * Robust FAQs fetcher.
 */
export async function getFAQs(): Promise<CanonicalFAQ[]> {
  try {
    const rawFaqs = await prisma.fAQ.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });

    if (rawFaqs && rawFaqs.length > 0) {
      return rawFaqs.map((f) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        category: f.category,
      }));
    }
  } catch (error) {
    console.warn("Database unavailable, using canonical FAQs:", error);
  }

  return CANONICAL_FAQS;
}
