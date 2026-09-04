import prisma from "@/lib/db";

export interface ProjectKnowledge {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  location: string;
  status: string; // Ongoing, Ready to Move, Upcoming
  projectType: string;
  priceRange: string;
  bedrooms: string;
  areaRange: string;
  totalUnits: string;
  completionYear: string;
  heroImage: string;
  amenities: string[];
  specifications: Array<{ category: string; items: string[] }>;
  constructionProgress: number;
  milestones: Array<{ phase: string; status: string; date: string }>;
  floorPlans: Array<{ name: string; bhk: string; areaSqFt: string; facing: string }>;
}

export interface CompanyKnowledge {
  companyName: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  googleRating: string;
  googleReviewsCount: string;
}

export async function getCompanyKnowledge(): Promise<CompanyKnowledge> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });
    return {
      companyName: settings?.companyName || "ARC AVENUE",
      tagline: settings?.tagline || "Real Estate Builders & Construction Company",
      address: settings?.address || "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
      phone: settings?.phone || "080085 32333",
      whatsapp: settings?.whatsapp || "+918008532333",
      email: settings?.email || "connect@arcavenue.in",
      googleRating: settings?.googleRating || "5.0",
      googleReviewsCount: settings?.googleReviewsCount || "14",
    };
  } catch {
    return {
      companyName: "ARC AVENUE",
      tagline: "Real Estate Builders & Construction Company",
      address: "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
      phone: "080085 32333",
      whatsapp: "+918008532333",
      email: "connect@arcavenue.in",
      googleRating: "5.0",
      googleReviewsCount: "14",
    };
  }
}

export async function getVerifiedProjects(): Promise<ProjectKnowledge[]> {
  try {
    const rawProjects = await prisma.project.findMany({
      include: {
        floorPlans: {
          select: {
            name: true,
            bhk: true,
            areaSqFt: true,
            facing: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return rawProjects.map((p) => {
      let amenities: string[] = [];
      try {
        amenities = JSON.parse(p.amenities);
      } catch {
        amenities = [];
      }

      let specifications: Array<{ category: string; items: string[] }> = [];
      try {
        specifications = JSON.parse(p.specifications);
      } catch {
        specifications = [];
      }

      let milestones: Array<{ phase: string; status: string; date: string }> = [];
      try {
        if (p.progressMilestones) milestones = JSON.parse(p.progressMilestones);
      } catch {
        milestones = [];
      }

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        tagline: p.tagline,
        description: p.description,
        location: p.location,
        status: p.status,
        projectType: p.projectType,
        priceRange: p.priceRange,
        bedrooms: p.bedrooms,
        areaRange: p.areaRange,
        totalUnits: p.totalUnits,
        completionYear: p.completionYear,
        heroImage: p.heroImage,
        amenities,
        specifications,
        constructionProgress: p.constructionProgress,
        milestones,
        floorPlans: p.floorPlans,
      };
    });
  } catch (error) {
    console.error("Failed to fetch verified projects from database:", error);
    return [];
  }
}

/**
 * Builds factual, grounded markdown context for Gemini model grounding.
 */
export async function buildPropertyContextForGemini(userQuery?: string): Promise<string> {
  const [company, projects] = await Promise.all([
    getCompanyKnowledge(),
    getVerifiedProjects(),
  ]);

  let context = `### VERIFIED ARC AVENUE COMPANY DATA:\n`;
  context += `- Company: ${company.companyName} (${company.tagline})\n`;
  context += `- Office Address: ${company.address}\n`;
  context += `- Phone: ${company.phone}\n`;
  context += `- WhatsApp: ${company.whatsapp}\n`;
  context += `- Verified Google Rating: ${company.googleRating} Stars (${company.googleReviewsCount} Reviews)\n`;
  context += `- Proximity: 7 Minutes from ORR Exit 5, Bahadurpally elevation 580M\n\n`;

  context += `### VERIFIED DEVELOPMENTS PORTFOLIO (ONLY RECOMMEND FROM THIS LIST):\n`;
  for (const p of projects) {
    context += `#### DEVELOPMENT: ${p.name} (slug: "${p.slug}")\n`;
    context += `- Typology: ${p.projectType}\n`;
    context += `- Status: ${p.status} (Possession: ${p.completionYear})\n`;
    context += `- Configuration / BHK: ${p.bedrooms}\n`;
    context += `- Price Range: ${p.priceRange}\n`;
    context += `- Area: ${p.areaRange}\n`;
    context += `- Location: ${p.location}\n`;
    context += `- Units: ${p.totalUnits}\n`;
    context += `- Civil Progress: ${p.constructionProgress}% complete\n`;
    context += `- Overview: ${p.description}\n`;
    if (p.amenities.length > 0) {
      context += `- Key Amenities: ${p.amenities.slice(0, 6).join(", ")}\n`;
    }
    if (p.floorPlans.length > 0) {
      context += `- Verified Floor Plans: ${p.floorPlans.map((fp) => `${fp.name} (${fp.areaSqFt}, ${fp.facing})`).join("; ")}\n`;
    }
    context += `\n`;
  }

  return context;
}
