import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        floorPlans: true,
        properties: true,
        brochures: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Project GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...body,
        constructionProgress: body.constructionProgress !== undefined ? Number(body.constructionProgress) : undefined,
        featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
        demo: body.demo !== undefined ? Boolean(body.demo) : undefined,
        galleryImages: typeof body.galleryImages === "object" ? JSON.stringify(body.galleryImages) : body.galleryImages,
        amenities: typeof body.amenities === "object" ? JSON.stringify(body.amenities) : body.amenities,
        specifications: typeof body.specifications === "object" ? JSON.stringify(body.specifications) : body.specifications,
      },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error("Project PUT Error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
