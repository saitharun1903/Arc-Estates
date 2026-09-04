import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "default",
          companyName: "ARC AVENUE",
          tagline: "Real Estate Builders & Construction Company",
          address:
            "HOME, Doolapally Rd, beside KNR Apartments, Bahadurpally, Hyderabad, Telangana 500043",
          phone: "080085 32333",
          whatsapp: "+918008532333",
          email: "connect@arcavenue.in",
          googleRating: "5.0",
          googleReviewsCount: "14",
          heroHeadline: "BUILDING SPACES THAT MOVE PEOPLE.",
          heroSubhead: "Real Estate Builders & Construction Company — Bahadurpally, Hyderabad",
        },
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Settings GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updated = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: body,
      create: {
        id: "default",
        ...body,
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Settings PUT Error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
