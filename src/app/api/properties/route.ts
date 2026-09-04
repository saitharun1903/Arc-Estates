import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const propertyType = searchParams.get("propertyType");
    const bedrooms = searchParams.get("bedrooms");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (propertyType && propertyType !== "ALL") where.propertyType = propertyType;
    if (bedrooms && bedrooms !== "ALL") where.bedrooms = Number(bedrooms);
    if (status && status !== "ALL") where.status = status;

    const properties = await prisma.property.findMany({
      where,
      include: {
        project: {
          select: { name: true, slug: true, location: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ properties });
  } catch (error) {
    console.error("Properties GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      projectId,
      unitNumber,
      propertyType,
      bedrooms,
      bathrooms,
      areaSqFt,
      price,
      status = "Available",
      floor,
      facing,
      featuredImage,
      demo = false,
    } = body;

    if (!title || !propertyType || !bedrooms || !price || !featuredImage) {
      return NextResponse.json(
        { error: "Title, property type, bedrooms, price, and image are required." },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        title,
        projectId: projectId || null,
        unitNumber,
        propertyType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms) || Number(bedrooms),
        areaSqFt: Number(areaSqFt) || 1500,
        price,
        status,
        floor,
        facing,
        featuredImage,
        demo: Boolean(demo),
      },
    });

    return NextResponse.json({ success: true, property }, { status: 201 });
  } catch (error) {
    console.error("Property POST Error:", error);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
