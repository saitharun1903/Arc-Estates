import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import FAQsAdminClient from "./faqs-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminFAQsPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const faqsRaw = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });

  const faqs = faqsRaw.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
  }));

  return <FAQsAdminClient initialFaqs={faqs} />;
}
