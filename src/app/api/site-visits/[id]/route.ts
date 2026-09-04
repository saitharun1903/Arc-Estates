import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(
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
    const { status, notes } = body;

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const visit = await prisma.siteVisit.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, visit });
  } catch (error) {
    console.error("Site Visit PATCH Error:", error);
    return NextResponse.json({ error: "Failed to update visit" }, { status: 500 });
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
    await prisma.siteVisit.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Site Visit DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete visit" }, { status: 500 });
  }
}
