import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const visits = await prisma.siteVisit.findMany({
      include: {
        project: {
          select: { name: true, slug: true, location: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ visits });
  } catch (error) {
    console.error("Site Visits GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch site visits" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectId,
      visitorName,
      visitorPhone,
      visitorEmail,
      visitDate,
      visitTimeSlot,
      notes,
    } = body;

    if (!projectId || !visitorName || !visitorPhone || !visitDate || !visitTimeSlot) {
      return NextResponse.json(
        { error: "Please fill in all mandatory booking fields (Project, Date, Time, Name, Phone)." },
        { status: 400 }
      );
    }

    const digits = visitorPhone.replace(/\D/g, "");
    if (digits.length < 10) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit telephone number." },
        { status: 400 }
      );
    }

    // Prevent duplicate booking for same phone, project, and date
    const existing = await prisma.siteVisit.findFirst({
      where: {
        projectId,
        visitorPhone: visitorPhone.trim(),
        visitDate,
        status: { in: ["Pending", "Confirmed"] },
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "A site visit is already scheduled for this telephone number on the selected date. Our team will contact you shortly.",
        },
        { status: 409 }
      );
    }

    // Auto-create or link Lead in CRM
    const lead = await prisma.lead.create({
      data: {
        name: visitorName.trim(),
        phone: visitorPhone.trim(),
        email: visitorEmail?.trim() || null,
        projectId,
        source: "Site Visit",
        status: "Site Visit",
        interest: `Requested on-site walk-through on ${visitDate} (${visitTimeSlot})`,
        notes: notes?.trim() || null,
      },
    });

    const visit = await prisma.siteVisit.create({
      data: {
        projectId,
        visitorName: visitorName.trim(),
        visitorPhone: visitorPhone.trim(),
        visitorEmail: visitorEmail?.trim() || null,
        visitDate,
        visitTimeSlot,
        notes: notes?.trim() || null,
        status: "Pending",
        leadId: lead.id,
      },
      include: {
        project: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json({ success: true, visit }, { status: 201 });
  } catch (error) {
    console.error("Site Visits POST Error:", error);
    return NextResponse.json({ error: "Failed to schedule site visit." }, { status: 500 });
  }
}
