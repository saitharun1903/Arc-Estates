import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const source = searchParams.get("source");

    const where: Record<string, unknown> = {};
    if (status && status !== "ALL") where.status = status;
    if (source && source !== "ALL") where.source = source;

    const leads = await prisma.lead.findMany({
      where,
      include: {
        project: {
          select: { name: true, slug: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Leads GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      interest,
      projectId,
      budget,
      propertyType,
      bedrooms,
      message,
      source = "Website",
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    // Phone validation (at least 10 digits)
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit telephone number." },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        interest: interest || null,
        projectId: projectId || null,
        budget: budget || null,
        propertyType: propertyType || null,
        bedrooms: bedrooms || null,
        message: message || null,
        source,
        status: "New",
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Leads POST Error:", error);
    return NextResponse.json({ error: "Failed to submit lead enquiry." }, { status: 500 });
  }
}
