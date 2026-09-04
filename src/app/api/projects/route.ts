import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { getProjects } from "@/lib/data-service";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        floorPlans: true,
        brochures: true,
        _count: {
          select: { properties: true, leads: true, siteVisits: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (projects && projects.length > 0) {
      return NextResponse.json({ projects });
    }
  } catch (error) {
    console.warn("Projects GET DB query failed, using canonical fallback:", error);
  }

  const fallbackProjects = await getProjects();
  return NextResponse.json({ projects: fallbackProjects });
}

export async function POST(req: NextRequest) {
  try {
    const session = getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      slug,
      tagline,
      description,
      location,
      status = "Ongoing",
      projectType = "Residential",
      heroImage,
      galleryImages = "[]",
      areaRange,
      bedrooms,
      totalUnits,
      priceRange,
      completionYear,
      featured = false,
      amenities = "[]",
      specifications = "[]",
      constructionProgress = 50,
      demo = false,
    } = body;

    if (!name || !tagline || !description || !location || !heroImage) {
      return NextResponse.json(
        { error: "Name, tagline, description, location, and hero image are required." },
        { status: 400 }
      );
    }

    const finalSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const project = await prisma.project.create({
      data: {
        name,
        slug: finalSlug,
        tagline,
        description,
        location,
        status,
        projectType,
        heroImage,
        galleryImages: typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages),
        areaRange: areaRange || "1,500 - 3,000 sq.ft",
        bedrooms: bedrooms || "3 & 4 BHK",
        totalUnits: totalUnits || "40 Units",
        priceRange: priceRange || "Contact for Pricing",
        completionYear: completionYear || "2026",
        featured: Boolean(featured),
        amenities: typeof amenities === "string" ? amenities : JSON.stringify(amenities),
        specifications: typeof specifications === "string" ? specifications : JSON.stringify(specifications),
        constructionProgress: Number(constructionProgress) || 0,
        demo: Boolean(demo),
      },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Project Create Error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
