import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { getFAQs } from "@/lib/data-service";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: "asc" },
    });
    if (faqs && faqs.length > 0) {
      return NextResponse.json({ faqs });
    }
  } catch (error) {
    console.warn("FAQs GET DB query failed, using canonical fallback:", error);
  }

  const fallbackFaqs = await getFAQs();
  return NextResponse.json({ faqs: fallbackFaqs });
}

export async function POST(req: NextRequest) {
  try {
    const session = getAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { question, answer, category = "General" } = await req.json();

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required." },
        { status: 400 }
      );
    }

    const faq = await prisma.fAQ.create({
      data: { question, answer, category },
    });

    return NextResponse.json({ success: true, faq }, { status: 201 });
  } catch (error) {
    console.error("FAQ POST Error:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
