import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ContentAdminClient from "./content-admin-client";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  const initialContent = {
    heroHeadline: settings?.heroHeadline || "BUILDING SPACES THAT MOVE PEOPLE.",
    heroSubhead:
      settings?.heroSubhead ||
      "Real Estate Builders & Construction Company — Bahadurpally, Hyderabad",
    aboutSnippet:
      settings?.aboutSnippet ||
      "At ARC Avenue, architectural precision converges with structural integrity. We engineer enduring residential environments rooted in timeless design, verified craftsmanship, and unwavering transparency.",
    tagline: settings?.tagline || "Real Estate Builders & Construction Company",
  };

  return <ContentAdminClient initialContent={initialContent} />;
}
