import { getSiteSettings, getProjects } from "@/lib/data-service";

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
  const settings = await getSiteSettings();
  return {
    companyName: settings.companyName,
    tagline: settings.tagline,
    address: settings.address,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    googleRating: settings.googleRating,
    googleReviewsCount: settings.googleReviewsCount,
  };
}

export async function getVerifiedProjects(): Promise<ProjectKnowledge[]> {
  try {
    const rawProjects = await getProjects();

    return rawProjects.map((p) => {
      let amenities: string[] = [];
      try {
        amenities = typeof p.amenities === "string" ? JSON.parse(p.amenities) : (p.amenities || []);
      } catch {
        amenities = [];
      }

      let specifications: Array<{ category: string; items: string[] }> = [];
      try {
        specifications = typeof p.specifications === "string" ? JSON.parse(p.specifications) : (p.specifications || []);
      } catch {
        specifications = [];
      }

      let milestones: Array<{ phase: string; status: string; date: string }> = [];
      try {
        if (p.progressMilestones) {
          milestones = typeof p.progressMilestones === "string" ? JSON.parse(p.progressMilestones) : p.progressMilestones;
        }
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
        floorPlans: p.floorPlans.map((fp) => ({
          name: fp.name,
          bhk: fp.bhk,
          areaSqFt: fp.areaSqFt,
          facing: fp.facing,
        })),
      };
    });
  } catch (error) {
    console.error("Failed to fetch verified projects:", error);
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
