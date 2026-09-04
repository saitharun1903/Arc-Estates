import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import TestimonialsAdminClient from "./testimonials-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <TestimonialsAdminClient initialTestimonials={testimonials} />;
}
